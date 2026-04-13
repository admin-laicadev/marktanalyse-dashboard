import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

async function prerender() {
  const [
    { competitors },
    { painPoints },
    { studies },
    { newsPainPoints },
    { partners },
    { fundingPrograms },
  ] = await Promise.all([
    import('../src/data/competitors.js'),
    import('../src/data/painPoints.js'),
    import('../src/data/studies.js'),
    import('../src/data/news.js'),
    import('../src/data/partners.js'),
    import('../src/data/funding.js'),
  ]);

  const routes = [
    '/overview',
    '/competitors',
    ...competitors.map((c) => `/competitors/${c.id}`),
    '/pain-points',
    ...painPoints.map((p) => `/pain-points/${p.id}`),
    '/studies',
    ...studies.map((s) => `/studies/${s.id}`),
    '/news',
    ...newsPainPoints.map((pp) => `/news/pain-point/${pp.id}`),
    '/partners',
    ...partners.map((p) => `/partners/${p.id}`),
    '/funding',
    ...fundingPrograms.map((f) => `/funding/${f.id}`),
  ];

  const vite = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'warn',
  });

  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

  const template = fs.readFileSync(path.join(ROOT, 'build/index.html'), 'utf-8');

  let count = 0;
  for (const route of routes) {
    try {
      const appHtml = render(route);
      const html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );
      const dir = path.join(ROOT, 'build', route);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
      count++;
    } catch (e) {
      console.error(`[prerender] ✗ ${route}: ${e.message}`);
    }
  }

  await vite.close();
  console.log(`[prerender] Generated ${count}/${routes.length} static HTML pages\n`);
}

prerender().catch((e) => {
  console.error(e);
  process.exit(1);
});
