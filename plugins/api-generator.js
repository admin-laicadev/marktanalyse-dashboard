import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const DATA_MODULES = [
  { file: 'competitors.js',  key: 'competitors',    export: 'competitors',    description: '19 Wettbewerber im DACH-Markt (Vergleichsportale, Matching-Plattformen, KI-Beratungsagenturen, Bildung)' },
  { file: 'painPoints.js',   key: 'painPoints',     export: 'painPoints',     description: '10 gewichtete Schmerzpunkte von KMU bei der Software-Auswahl' },
  { file: 'studies.js',      key: 'studies',        export: 'studies',        description: '12 Marktstudien von Bitkom, DIHK, KfW, Gartner, IDC, Forrester' },
  { file: 'news.js',         key: 'news',           export: null,             description: '52 News-Artikel + 6 Trend-Pain-Points zu Digitalsouveränität, DSGVO, KI-Regulierung' },
  { file: 'partners.js',     key: 'partners',       export: 'partners',       description: '20 potenzielle Medien- und Allianzpartner mit Reichweiten-Metriken' },
  { file: 'funding.js',      key: 'funding',        export: 'fundingPrograms', description: '20 Förderprogramme (Bund, Land, EU) für Startups und KMU' },
];

async function loadData() {
  const results = {};
  for (const mod of DATA_MODULES) {
    const filePath = path.resolve(ROOT, 'src/data', mod.file);
    const module = await import(`${filePath}?t=${Date.now()}`);
    if (mod.key === 'news') {
      results[mod.key] = {
        articles: module.newsArticles,
        painPoints: module.newsPainPoints,
      };
    } else {
      results[mod.key] = module[mod.export];
    }
  }
  return results;
}

function writeJson(outDir, filename, payload) {
  fs.writeFileSync(path.join(outDir, filename), JSON.stringify(payload, null, 2), 'utf-8');
}

function buildJsonFiles(data, outDir, generated) {
  fs.mkdirSync(outDir, { recursive: true });

  const index = { generated, endpoints: [] };

  for (const mod of DATA_MODULES) {
    const raw = data[mod.key];
    const count = mod.key === 'news'
      ? raw.articles.length + raw.painPoints.length
      : raw.length;

    const payload = mod.key === 'news'
      ? { articles: raw.articles, painPoints: raw.painPoints, meta: { articleCount: raw.articles.length, painPointCount: raw.painPoints.length, generated, source: `src/data/${mod.file}` } }
      : { data: raw, meta: { count, generated, source: `src/data/${mod.file}` } };

    writeJson(outDir, `${mod.key}.json`, payload);

    index.endpoints.push({
      key: mod.key,
      url: `./api/${mod.key}.json`,
      count,
      description: mod.description,
    });
  }

  // all.json
  const allPayload = {
    competitors: data.competitors,
    painPoints: data.painPoints,
    studies: data.studies,
    news: data.news,
    partners: data.partners,
    funding: data.funding,
    meta: {
      generated,
      counts: {
        competitors: data.competitors.length,
        painPoints: data.painPoints.length,
        studies: data.studies.length,
        newsArticles: data.news.articles.length,
        newsPainPoints: data.news.painPoints.length,
        partners: data.partners.length,
        funding: data.funding.length,
      },
    },
  };
  writeJson(outDir, 'all.json', allPayload);
  index.endpoints.unshift({ key: 'all', url: './api/all.json', description: 'Alle Datensätze kombiniert' });

  // index.json
  writeJson(outDir, 'index.json', index);
}

function buildLlmsTxt(data, buildDir, generated) {
  const c = data.competitors.length;
  const pp = data.painPoints.length;
  const st = data.studies.length;
  const na = data.news.articles.length;
  const pa = data.partners.length;
  const fu = data.funding.length;

  const content = `# Laica Marktanalyse Dashboard

> Marktanalyse-Dashboard für den deutschen KMU SaaS- und KI-Tool-Markt (DACH-Region).
> Enthält Wettbewerbsanalysen, Schmerzpunkte, Marktstudien, News, potenzielle Partner und Förderprogramme.
> Generiert: ${generated}

## API-Endpunkte (JSON)

- [Alle Daten](./api/all.json): Kompletter Datensatz in einer Datei
- [Wettbewerber](./api/competitors.json): ${c} Wettbewerber (Vergleichsportale, Matching-Plattformen, KI-Agenturen, Bildung)
- [Schmerzpunkte](./api/painPoints.json): ${pp} gewichtete KMU-Schmerzpunkte bei der Software-Auswahl
- [Marktstudien](./api/studies.json): ${st} Studien (Bitkom, DIHK, KfW, Gartner, IDC, Forrester)
- [News](./api/news.json): ${na} Artikel + ${data.news.painPoints.length} Trend-Pain-Points (Souveränität, DSGVO, KI-Regulierung)
- [Partner](./api/partners.json): ${pa} potenzielle Medien- und Allianzpartner mit Reichweiten-Metriken
- [Förderprogramme](./api/funding.json): ${fu} Programme (Bund, Land, EU)

## Vollständiger Kontext

- [Vollständiges Markdown](./llms-full.txt): Alle Daten als Markdown für LLM-Kontext-Aufnahme
`;

  fs.writeFileSync(path.join(buildDir, 'llms.txt'), content, 'utf-8');
}

function formatMarkdownSection(title, items, formatter) {
  const lines = [`## ${title}\n`];
  items.forEach((item, i) => {
    lines.push(formatter(item, i));
  });
  return lines.join('\n');
}

function buildLlmsFullTxt(data, buildDir, generated) {
  const sections = [];

  sections.push(`# Laica Marktanalyse Dashboard – Vollständige Daten\n\nGeneriert: ${generated}  \nSprache: Deutsch  \nKontext: Marktanalyse für KMU SaaS- und KI-Tool-Markt in DACH\n`);

  // Competitors
  sections.push(formatMarkdownSection(
    `Wettbewerber (${data.competitors.length})`,
    data.competitors,
    (c) => [
      `### ${c.id}. ${c.name}`,
      `- **Kategorie:** ${c.category}`,
      c.url ? `- **URL:** ${c.url}` : null,
      `- **Geschäftsmodell:** ${c.businessModel}`,
      `- **Preismodell:** ${c.pricing}`,
      c.coverage ? `- **Reichweite:** ${c.coverage}` : null,
      c.focus ? `- **Fokus:** ${c.focus}` : null,
      c.location ? `- **Standort:** ${c.location}` : null,
      c.customers ? `- **Kunden:** ${c.customers}` : null,
      `- **Relevanz für Laica:** ${c.relevance}`,
      `- **Relevanz-Einschätzung:** ${c.relevanceNote}`,
      c.strengths?.length ? `- **Stärken:** ${c.strengths.join(', ')}` : null,
      c.weaknesses?.length ? `- **Schwächen:** ${c.weaknesses.join(', ')}` : null,
      `- **Details:** ${c.details}`,
    ].filter(Boolean).join('\n'),
  ));

  // Pain Points
  sections.push(formatMarkdownSection(
    `Schmerzpunkte – KMU Software-Auswahl (${data.painPoints.length})`,
    data.painPoints,
    (p) => [
      `### ${p.id}. ${p.title} (Gewicht: ${p.weight})`,
      `- **Beschreibung:** ${p.description}`,
      `- **Gewünschte Lösung:** ${p.desiredSolution}`,
      `- **Laica-Relevanz:** ${p.laicaRelevance}`,
      p.sources?.length ? `- **Quellen:** ${p.sources.map(s => `${s.title} – "${s.quote}"`).join(' | ')}` : null,
      p.examples?.length ? `- **Beispiele:** ${p.examples.map(e => e.text).join(' | ')}` : null,
    ].filter(Boolean).join('\n'),
  ));

  // Studies
  sections.push(formatMarkdownSection(
    `Marktstudien (${data.studies.length})`,
    data.studies,
    (s) => [
      `### ${s.id}. ${s.title}`,
      `- **Herausgeber:** ${s.publisher}`,
      `- **Datum:** ${s.date}`,
      s.url ? `- **URL:** ${s.url}` : null,
      `- **Key Findings:** ${s.keyFindings.join(' | ')}`,
      `- **Kennzahlen:** ${s.keyNumbers.map(k => `${k.label}: ${k.value}`).join(', ')}`,
      `- **Relevanz:** ${s.relevance}`,
    ].filter(Boolean).join('\n'),
  ));

  // News – grouped by category
  const categoryLabels = {
    souveraenitaet: 'Digitale Souveränität',
    gaiax: 'Gaia-X',
    foerderung: 'Förderung',
    dsgvo: 'DSGVO',
    opensource: 'Open Source',
    kiverordnung: 'KI-Verordnung',
    cloud: 'Cloud',
    nis2: 'NIS2',
    verwaltung: 'Verwaltung',
  };

  const byCategory = {};
  data.news.articles.forEach(a => {
    const cat = categoryLabels[a.category] || a.category;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(a);
  });

  const newsLines = [`## News-Artikel (${data.news.articles.length} Artikel)\n`];
  Object.entries(byCategory).forEach(([cat, articles]) => {
    newsLines.push(`### ${cat}`);
    articles.forEach(a => {
      newsLines.push(`- **${a.date} | ${a.source}** – ${a.title}  \n  _"${a.quote}"_  \n  Sentiment: ${a.sentiment} | [Link](${a.url})`);
    });
    newsLines.push('');
  });

  if (data.news.painPoints?.length) {
    newsLines.push(`### Trend-Schmerzpunkte aus News (${data.news.painPoints.length})`);
    data.news.painPoints.forEach(p => {
      newsLines.push(`- **${p.title}** (Gewicht: ${p.weight}) – ${p.description}`);
    });
  }
  sections.push(newsLines.join('\n'));

  // Partners
  sections.push(formatMarkdownSection(
    `Potenzielle Partner (${data.partners.length})`,
    data.partners,
    (p) => [
      `### ${p.id}. ${p.name} (Phase ${p.phase})`,
      p.url ? `- **URL:** ${p.url}` : null,
      `- **Beschreibung:** ${p.description}`,
      `- **Plattformen:** ${p.platforms?.join(', ')}`,
      `- **Sentiment:** ${p.sentiment}`,
      `- **Scores:** Authority ${p.authorityScore} | Values Match ${p.valuesMatch} | Reach ${p.reachScore}`,
      p.values?.length ? `- **Werte:** ${p.values.join(', ')}` : null,
      p.whyAlliance ? `- **Warum Allianz:** ${p.whyAlliance}` : null,
    ].filter(Boolean).join('\n'),
  ));

  // Funding
  sections.push(formatMarkdownSection(
    `Förderprogramme (${data.funding.length})`,
    data.funding,
    (f) => [
      `### ${f.id}. ${f.name}${f.deadlineUrgent ? ' ⚠️ Deadline bald' : ''}`,
      `- **Anbieter:** ${f.provider}`,
      `- **Typ:** ${f.type}`,
      `- **Förderbetrag:** ${f.amount} €`,
      `- **Deadline:** ${f.deadline}`,
      f.url ? `- **Info:** ${f.url}` : null,
      f.applicationUrl ? `- **Antrag:** ${f.applicationUrl}` : null,
      `- **Beschreibung:** ${f.description}`,
      f.conditions?.length ? `- **Voraussetzungen:** ${f.conditions.join(' | ')}` : null,
      `- **Relevanz:** ${f.relevance}/10 – ${f.relevanceNote}`,
    ].filter(Boolean).join('\n'),
  ));

  fs.writeFileSync(path.join(buildDir, 'llms-full.txt'), sections.join('\n\n---\n\n'), 'utf-8');
}

function buildJsonLd(data, generated) {
  const counts = {
    competitors: data.competitors.length,
    painPoints: data.painPoints.length,
    studies: data.studies.length,
    newsArticles: data.news.articles.length,
    partners: data.partners.length,
    funding: data.funding.length,
  };

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Laica Marktanalyse Dashboard',
    description: `Marktanalyse für den deutschen KMU SaaS- und KI-Tool-Markt (DACH-Region). Enthält ${counts.competitors} Wettbewerber, ${counts.painPoints} Schmerzpunkte, ${counts.studies} Marktstudien, ${counts.newsArticles} News-Artikel, ${counts.partners} Partner und ${counts.funding} Förderprogramme.`,
    keywords: ['KMU', 'SaaS', 'KI', 'DACH', 'Marktanalyse', 'Wettbewerber', 'Förderung', 'Digitalisierung'],
    inLanguage: 'de',
    dateModified: generated,
    distribution: [
      { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: '/api/all.json', name: 'Vollständiger Datensatz (JSON)' },
      { '@type': 'DataDownload', encodingFormat: 'text/markdown', contentUrl: '/llms-full.txt', name: 'Vollständiger Datensatz (Markdown)' },
      { '@type': 'DataDownload', encodingFormat: 'text/plain', contentUrl: '/llms.txt', name: 'LLM-Einstiegspunkt (llms.txt)' },
    ],
  });
}

export function apiGeneratorPlugin() {
  let _config;

  return {
    name: 'vite-plugin-api-generator',

    configResolved(config) {
      _config = config;
    },

    transformIndexHtml: {
      order: 'post',
      handler: () => [],  // populated in closeBundle after data is loaded
    },

    async closeBundle() {
      const buildDir = path.resolve(ROOT, _config.build.outDir || 'build');
      const apiDir = path.join(buildDir, 'api');
      const generated = new Date().toISOString().split('T')[0];

      let data;
      try {
        data = await loadData();
      } catch (e) {
        console.error('[api-generator] Failed to load data modules:', e.message);
        return;
      }

      buildJsonFiles(data, apiDir, generated);
      buildLlmsTxt(data, buildDir, generated);
      buildLlmsFullTxt(data, buildDir, generated);

      // Patch JSON-LD into the built index.html
      const indexPath = path.join(buildDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, 'utf-8');
        const jsonLd = `<script type="application/ld+json">${buildJsonLd(data, generated)}</script>`;
        html = html.replace('</head>', `  ${jsonLd}\n  </head>`);
        fs.writeFileSync(indexPath, html, 'utf-8');
      }

      const counts = {
        competitors: data.competitors.length,
        painPoints: data.painPoints.length,
        studies: data.studies.length,
        news: data.news.articles.length,
        partners: data.partners.length,
        funding: data.funding.length,
      };
      console.log(`\n[api-generator] Generated API files in ${path.relative(ROOT, apiDir)}/`);
      console.log(`  JSON endpoints: competitors(${counts.competitors}), painPoints(${counts.painPoints}), studies(${counts.studies}), news(${counts.news}), partners(${counts.partners}), funding(${counts.funding})`);
      console.log(`  llms.txt + llms-full.txt written to ${path.relative(ROOT, buildDir)}/`);
      console.log(`  JSON-LD injected into index.html\n`);
    },
  };
}
