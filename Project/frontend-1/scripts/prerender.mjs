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
import Beasties from 'beasties';

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

// Critical CSS: the full stylesheet is ~580 KB, and loading it before the first paint cost about a second on
// phones. Each page gets only the rules its own prerendered markup uses inlined in <head>; the full sheet then
// loads without blocking the paint. src/main.jsx waits for it before hydrating, so elements that only appear
// once React runs (pop-ups, dock, menus) are never shown unstyled. Set PRERENDER_CRITICAL=0 to turn this off.
const critical = process.env.PRERENDER_CRITICAL !== '0'
  ? new Beasties({ path: DIST, publicPath: '/', preload: 'media', pruneSource: false, inlineFonts: true, preloadFonts: false, keyframes: 'critical', compress: true, mergeStylesheets: true, reduceInlineStyles: false, logLevel: 'warn' })
  : null;

// The two Latin font files every English page uses are preloaded, so text gets its final font before or right
// at the first paint instead of re-flowing a second later. Other scripts still load on demand (unicode-range).
const fontPreloads = fs.readdirSync(path.join(DIST, 'assets'))
  .filter((f) => /^(inter|manrope)-latin-wght-normal-[\w-]+\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join('');

// The page is complete and styled from its own HTML + critical CSS, so the full stylesheet and the app script
// (which hydrates the page and adds the interactive extras) are requested only once the first frame is on
// screen. They no longer compete with the first paint on slow phones and networks. Without JavaScript the
// <noscript> stylesheet still applies.
function deferAfterPaint(html) {
  const css = [];
  html = html.replace(/<link rel="stylesheet" crossorigin href="([^"]+\.css)" media="print" onload="this.media='all'">/g, (_, href) => {
    css.push(href);
    return '';
  });
  let js = '';
  html = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, (_, src) => {
    js = src;
    return '';
  });
  if (!js) return html;
  const loader =
    `<script>(function(){var d=document;function go(){` +
    css.map((h) => `var l=d.createElement('link');l.rel='stylesheet';l.href=${JSON.stringify(h)};l.crossOrigin='';l.setAttribute('data-full-css','');d.head.appendChild(l);`).join('') +
    `var s=d.createElement('script');s.type='module';s.crossOrigin='';s.src=${JSON.stringify(js)};d.head.appendChild(s);}` +
    `requestAnimationFrame(function(){setTimeout(go,0)})})()</script>`;
  return html.replace('</body>', () => loader + '</body>');
}

// 1. Pages
const routes = server.getPrerenderRoutes();
let count = 0;
for (const route of routes) {
  const { html, head } = await server.render(route);
  let page = template.replace('<!--app-head-->', () => fontPreloads + head).replace('<!--app-html-->', () => html);
  if (critical) page = await critical.process(page);
  page = deferAfterPaint(page);
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
fs.writeFileSync(
  path.join(DIST, 'robots.txt'),
  [
    '# Public site: open to search engines and AI assistants (see /llms.txt).',
    'User-agent: *',
    'Allow: /',
    // Signed-in areas of the member/admin app and the API: nothing to index there.
    'Disallow: /admin/',
    'Disallow: /member/',
    'Disallow: /api/',
    'Disallow: /survey/',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n')
);

// 3. llms.txt + llms-full.txt (guides for AI assistants, see scripts/llms.mjs)
const llmsPosts = writeLlms({ DIST, SITE_URL, server });

// 4. Clean up the temporary server bundle (it is not deployed).
fs.rmSync(SSR_DIR, { recursive: true, force: true });

const entryJs = (template.match(/<script[^>]+src="([^"]+\.js)"/) || [])[1];
const kb = entryJs && fs.existsSync(path.join(DIST, entryJs)) ? ` · entry JS ${(fs.statSync(path.join(DIST, entryJs)).size / 1024).toFixed(0)} KB` : '';
console.log(`✔ Prerendered ${count} pages · sitemap ${urls.length} URLs for ${SITE_URL} · llms.txt (+${llmsPosts} articles in llms-full.txt)${kb}`);
