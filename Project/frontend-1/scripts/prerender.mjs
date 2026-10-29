// Static Site Generation: renders every route to real HTML (title, meta, canonical, JSON-LD, content)
// so search engines and social previews see each page without running JavaScript.
// Also writes dist/sitemap.xml (and keeps public/sitemap.xml in sync).
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const { render, ALL_ROUTES, STATIC_ROUTES, BLOG_ROUTES, SITE_URL } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);

let count = 0;
for (const r of ALL_ROUTES) {
  const { html, head } = render(r.path);
  const page = template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"><!--app-html--></div>', () => `<div id="root" data-route="${r.path}">${html}</div>`);
  let out;
  if (r.path === '/') out = path.join(dist, 'index.html');
  else if (r.path === '/404') out = path.join(dist, '404.html');
  else out = path.join(dist, r.path.replace(/^\//, ''), 'index.html');
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, page);
  count++;
}

const today = new Date().toISOString().slice(0, 10);
const urls = [...STATIC_ROUTES, ...BLOG_ROUTES]
  .map(
    (r) => `  <url>\n    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>\n    <lastmod>${r.lastmod || today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  )
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await writeFile(path.join(root, 'public', 'sitemap.xml'), sitemap);

const robots = `# robots.txt — MyFrequentRewards\nUser-agent: *\nAllow: /\nDisallow: /login\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
await writeFile(path.join(dist, 'robots.txt'), robots);
await writeFile(path.join(root, 'public', 'robots.txt'), robots);

await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });

// Production safety: drop the orphaned preview-data chunk (it is never referenced unless VITE_DEMO_MODE=true).
if (process.env.VITE_DEMO_MODE !== 'true') {
  const { readdir } = await import('node:fs/promises');
  for (const f of await readdir(path.join(dist, 'assets'))) {
    if (f.startsWith('activityPreview')) await rm(path.join(dist, 'assets', f));
  }
}
console.log(`Prerendered ${count} routes · sitemap with ${STATIC_ROUTES.length + BLOG_ROUTES.length} URLs · robots.txt`);
