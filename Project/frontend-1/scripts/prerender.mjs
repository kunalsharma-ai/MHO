// Static prerendering (SSG) — the last step of `npm run build`:
//
//   vite build                                         → dist/            (browser bundle + dist/index.html)
//   vite build --ssr src/entry-server.jsx --outDir dist-ssr → dist-ssr/   (Node renderer, temporary)
//   node scripts/prerender.mjs                         → dist/<route>/index.html for every page and blog post,
//                                                        dist/404.html, dist/sitemap.xml, dist/robots.txt,
//                                                        dist/llms.txt, dist/llms-full.txt
//
// Each page gets its own <title>, meta description, canonical URL, Open Graph and JSON-LD, plus the real
// rendered content, so search engines and social previews see every page without running JavaScript.
// The browser then hydrates the page (src/main.jsx).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { writeLlms } from './llms.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.resolve(ROOT, process.env.PRERENDER_DIST || 'dist');
const SSR_DIR = path.resolve(ROOT, process.env.PRERENDER_SSR || 'dist-ssr');

const templatePath = path.join(DIST, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('✖ dist/index.html not found — run `vite build` first (npm run build does this).');
  process.exit(1);
}
const template = fs.readFileSync(templatePath, 'utf8');
for (const marker of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) {
    console.error(`✖ ${marker} placeholder missing from index.html — prerendering needs it.`);
    process.exit(1);
  }
}

const entry = ['entry-server.js', 'entry-server.mjs'].map((f) => path.join(SSR_DIR, f)).find((f) => fs.existsSync(f));
if (!entry) {
  console.error('✖ Server bundle not found — run `vite build --ssr src/entry-server.jsx --outDir dist-ssr` first.');
  process.exit(1);
}
const server = await import(pathToFileURL(entry).href);
const SITE_URL = String(server.SITE_URL || 'https://www.myhealthopinions.com').replace(/\/+$/, '');

// 1. Pages
const routes = server.getPrerenderRoutes();
let count = 0;
for (const route of routes) {
  const { html, head } = await server.render(route);
  const page = template.replace('<!--app-head-->', () => head).replace('<!--app-html-->', () => html);
  const file = route === '/404' ? path.join(DIST, '404.html') : path.join(DIST, route, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
  count++;
}

// 2. sitemap.xml + robots.txt (for the canonical domain in VITE_SITE_URL)
const today = new Date().toISOString().slice(0, 10);
const urls = server.getSitemapEntries();
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) =>
        `  <url><loc>${SITE_URL}${u.path}</loc><lastmod>${u.lastmod || today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
    ),
    '</urlset>',
    '',
  ].join('\n')
);
fs.writeFileSync(path.join(DIST, 'robots.txt'), ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n'));

// 3. llms.txt + llms-full.txt (guides for AI assistants, see scripts/llms.mjs)
const llmsPosts = writeLlms({ DIST, SITE_URL, server });

// 4. Clean up the temporary server bundle (it is not deployed).
fs.rmSync(SSR_DIR, { recursive: true, force: true });

const entryJs = (template.match(/<script[^>]+src="([^"]+\.js)"/) || [])[1];
const kb = entryJs && fs.existsSync(path.join(DIST, entryJs)) ? ` · entry JS ${(fs.statSync(path.join(DIST, entryJs)).size / 1024).toFixed(0)} KB` : '';
console.log(`✔ Prerendered ${count} pages · sitemap ${urls.length} URLs for ${SITE_URL} · llms.txt (+${llmsPosts} articles in llms-full.txt)${kb}`);
