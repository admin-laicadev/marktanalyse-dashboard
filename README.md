# Laica Market Analysis Dashboard

Marktanalyse-Dashboard für den deutschen KMU SaaS- und KI-Tool-Markt (DACH-Region). Enthält Wettbewerber, Pain Points, Marktstudien, News, strategische Partner und Förderprogramme.

**Live:** [marktanalyse-dashboard.vercel.app](https://marktanalyse-dashboard.vercel.app)

---

## Stack

- **React 19** + **Vite 8** + **Tailwind CSS v4**
- **React Router v7** — URL-basiertes Routing (jeder Eintrag hat eine eigene URL)
- **SSG via Vite SSR** — alle Routen werden als statisches HTML vorgerendert
- Kein Backend, keine Datenbank — alle Daten sind statische JS-Arrays in `src/data/`

---

## Setup

```bash
# Nach Clone (einmalig nötig wegen npm-Bug mit optionalen nativen Bindings)
rm -rf node_modules package-lock.json && npm install

npm run dev      # Dev-Server → http://localhost:5173
npm run build    # Produktions-Build + SSG-Prerender → build/
npm run preview  # Build-Vorschau lokal
npm run lint     # ESLint
```

---

## Projektstruktur

```
src/
├── App.jsx                    # Router-Konfiguration + Layout (Header, Footer)
├── entry-server.jsx           # SSR-Einstiegspunkt für das Prerender-Script
├── main.jsx                   # Client-Einstiegspunkt (hydrateRoot / createRoot)
├── components/
│   ├── TabNav.jsx             # Tab-Navigation (NavLink, aktiver Tab per URL)
│   ├── ExecutiveSummary.jsx   # Key-Zahlen oben auf jeder Seite
│   ├── CompetitorTab.jsx      # Listen-Ansicht Wettbewerber
│   ├── CompetitorDetail.jsx   # Detail-Seite /competitors/:id
│   ├── PainPointsTab.jsx      # Listen-Ansicht Pain Points
│   ├── PainPointDetail.jsx    # Detail-Seite /pain-points/:id
│   ├── StudiesTab.jsx         # Listen-Ansicht Studien
│   ├── StudyDetail.jsx        # Detail-Seite /studies/:id
│   ├── NewsTab.jsx            # Listen-Ansicht News + Pain-Point-Gruppen
│   ├── NewsPainPointDetail.jsx # Detail-Seite /news/pain-point/:id
│   ├── PartnersTab.jsx        # Listen-Ansicht Partner
│   ├── PartnerDetail.jsx      # Detail-Seite /partners/:id
│   ├── FundingTab.jsx         # Listen-Ansicht Förderprogramme
│   └── FundingDetail.jsx      # Detail-Seite /funding/:id
├── data/
│   ├── competitors.js         # 19 Wettbewerber
│   ├── painPoints.js          # 10 Pain Points
│   ├── studies.js             # 12 Marktstudien
│   ├── news.js                # 52 Artikel + 6 Pain-Point-Gruppen
│   ├── partners.js            # 20 strategische Partner
│   └── funding.js             # 20 Förderprogramme
plugins/
└── api-generator.js           # Vite-Plugin: generiert JSON-API + llms.txt bei Build
scripts/
└── prerender.js               # SSG: rendert alle 93 Routen zu statischem HTML
```

---

## Routen

| URL | Inhalt |
|-----|--------|
| `/competitors` | Alle Wettbewerber (filterbar nach Kategorie) |
| `/competitors/:id` | Wettbewerber-Detail |
| `/pain-points` | Alle Pain Points (sortiert nach Gewicht) |
| `/pain-points/:id` | Pain-Point-Detail |
| `/studies` | Alle Marktstudien |
| `/studies/:id` | Studien-Detail |
| `/news` | Alle News (filterbar nach Kategorie + Sentiment) |
| `/news/pain-point/:id` | Themengruppe mit zugehörigen Artikeln |
| `/partners` | Strategische Partner (nach Phase) |
| `/partners/:id` | Partner-Detail |
| `/funding` | Förderprogramme (nach Dringlichkeit) |
| `/funding/:id` | Förderprogram-Detail |

---

## Research: Daten aktualisieren oder erweitern

### Bestehende Daten aktualisieren

Einfach die entsprechende Datei in `src/data/` bearbeiten. Kein Neustart nötig — Vite HMR lädt die Änderung sofort.

**Wichtig:** IDs müssen eindeutig und stabil bleiben (sie sind Teil der URL).

---

### Datenschemata

#### `src/data/competitors.js`

```js
{
  id: number,              // eindeutig, stabil (URL: /competitors/:id)
  name: string,
  url: string,             // optional
  category: 'Vergleichsportale' | 'Matching-Plattformen' | 'KI-Beratungsagenturen' | 'Bildung & Geförderte Angebote',
  businessModel: string,
  pricing: string,
  focus: string,
  coverage: string,        // optional
  relevance: 'hoch' | 'mittel' | 'niedrig',
  relevanceNote: string,
  strengths: string[],     // optional
  weaknesses: string[],    // optional
  details: string,
}
```

#### `src/data/painPoints.js`

```js
{
  id: number,
  title: string,
  weight: number,          // 0–100, wird als % angezeigt
  description: string,
  desiredSolution: string,
  laicaRelevance: string,
  sources: [               // optional
    { title: string, url: string, quote: string }
  ],
  examples: [              // optional
    { text: string, source: string, url: string }
  ],
}
```

#### `src/data/studies.js`

```js
{
  id: number,
  title: string,
  publisher: string,
  date: string,
  url: string,
  keyFindings: string[],
  keyNumbers: [            // optional
    { label: string, value: string }
  ],
  relevance: string,
}
```

#### `src/data/news.js`

```js
// newsArticles — externe Links, keine eigene Detail-Seite
{
  id: number,
  title: string,
  url: string,             // externer Link
  source: string,
  date: string,            // Format: 'DD.MM.YYYY'
  quote: string,
  category: 'souveraenitaet' | 'gaiax' | 'foerderung' | 'dsgvo' | 'opensource' | 'kiverordnung' | 'cloud' | 'nis2' | 'verwaltung',
  sentiment: 'positiv' | 'neutral' | 'kritisch' | 'warnung',
}

// newsPainPoints — eigene Detail-Seite /news/pain-point/:id
{
  id: number,
  title: string,
  description: string,
  relatedArticleIds: number[],   // IDs aus newsArticles
}
```

#### `src/data/partners.js`

```js
{
  id: number,
  name: string,
  url: string,             // optional
  phase: 1 | 2 | 3,
  description: string,
  platforms: string[],
  sentiment: string,
  authorityScore: number,  // 0–100
  valuesMatch: number,     // 0–100
  reachScore: number,      // 0–100
  values: string[],        // optional
  whyAlliance: string,
  reach: {                 // Objekt mit Platform-Namen als Keys
    [platform: string]: { [metric: string]: string }
  },
  examples: [              // optional
    { title: string, url: string, excerpt: string }
  ],
}
```

#### `src/data/funding.js`

```js
{
  id: number,
  name: string,
  provider: string,
  type: 'bund' | 'land' | 'eu',
  amount: string,          // z.B. 'bis 200.000 €'
  deadline: string,        // Format: 'YYYY-MM-DD' oder 'Laufend'
  deadlineUrgent: boolean,
  url: string,             // optional
  applicationUrl: string,  // optional
  description: string,
  conditions: string[],    // optional
  relevance: number,       // 1–10
  relevanceNote: string,
  details: string,
}
```

---

### Neuen Tab hinzufügen

1. **Datei anlegen:** `src/data/newtab.js` mit exportiertem Array
2. **Listen-Komponente:** `src/components/NewTab.jsx` (am einfachsten einen bestehenden Tab als Vorlage nehmen)
3. **Detail-Komponente:** `src/components/NewTabDetail.jsx`
4. **Routen:** In `src/App.jsx` zwei `<Route>`-Einträge ergänzen:
   ```jsx
   <Route path="new-tab" element={<NewTab />} />
   <Route path="new-tab/:id" element={<NewTabDetail />} />
   ```
5. **Navigation:** In `src/components/TabNav.jsx` einen Eintrag zum `tabs`-Array ergänzen
6. **Prerender:** In `scripts/prerender.js` die neuen Routen zum `routes`-Array ergänzen

---

## Build & Deployment

### Wie der Build funktioniert

```
npm run build
  ├── vite build           → JS/CSS Bundle nach build/
  ├── api-generator        → build/api/*.json + build/llms.txt + build/llms-full.txt
  └── node scripts/prerender.js
        → 93 statische HTML-Dateien (eine pro Route)
        → jede Seite hat echten HTML-Inhalt, lesbar ohne JavaScript
```

### Vercel

Deployment ist über `vercel.json` konfiguriert — Vercel führt `npm run build` aus und deployt den `build/`-Ordner. Push auf `main` triggert automatisch einen neuen Deploy.

Der `build/`-Ordner ist **nicht** im Git-Repository (steht in `.gitignore`). Vercel baut selbst.

### Manueller Deploy-Check

```bash
npm run build && npm run preview
# → http://localhost:4173 — verhält sich wie Produktion
```

---

## LLM- und API-Zugang

Alle Daten sind ohne JavaScript zugänglich:

| Endpunkt | Inhalt |
|----------|--------|
| `/llms.txt` | Einstiegspunkt für LLMs (Links zu allen Daten) |
| `/llms-full.txt` | Alle Daten als Markdown (für LLM-Kontext) |
| `/api/all.json` | Kompletter Datensatz als JSON |
| `/api/competitors.json` | Nur Wettbewerber |
| `/api/painPoints.json` | Nur Pain Points |
| `/api/studies.json` | Nur Studien |
| `/api/news.json` | Nur News |
| `/api/partners.json` | Nur Partner |
| `/api/funding.json` | Nur Förderprogramme |
| `/competitors/1` | Statisches HTML für Wettbewerber #1 |
| `/studies/3` | Statisches HTML für Studie #3 |
| … | (alle 93 Routen als vorgerendertes HTML) |

JSON-LD (`application/ld+json`) ist in jedes HTML-Dokument eingebettet und beschreibt den Datensatz nach schema.org.
