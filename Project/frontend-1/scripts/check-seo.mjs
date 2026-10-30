// SEO audit of the production build. Run after `npm run build`:  npm run check:seo
// Checks every prerendered page for: title/description length, exactly one <h1>, heading order (no skipped levels), canonical, valid JSON-LD,
// primary keyword placement (title + H1/description + body) and that every sitemap URL exists.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const DIST = path.join(ROOT, 'dist');
if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}
// The canonical domain the build was made for (VITE_SITE_URL) — read from the home page's canonical link.
const homeHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const SITE_URL = ((homeHtml.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || 'https://www.myhealthopinions.com/').replace(/\/+$/, '');
const { PAGES } = await import(pathToFileURL(path.join(ROOT, 'src/seo/pages.js')).href);
const { BLOGS } = await import(pathToFileURL(path.join(ROOT, 'src/data/blogs/index.js')).href);

const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').toLowerCase();
const norm = (s) => s.toLowerCase().replace(/[’']/g, "'");

const targets = [
  ...Object.entries(PAGES).filter(([p]) => p !== '/404').map(([p, v]) => ({ route: p, file: p === '/' ? 'index.html' : `${p.slice(1)}/index.html`, primary: v.primary, noindex: (v.robots || '').includes('noindex') })),
  ...BLOGS.map((b) => ({ route: `/blog/${b.slug}`, file: `blog/${b.slug}/index.html`, primary: b.primary })),
];

let errors = 0, warnings = 0;
const err = (r, m) => { errors++; console.log(`  ✖ ${r}: ${m}`); };
const warn = (r, m) => { warnings++; console.log(`  ⚠ ${r}: ${m}`); };

for (const t of targets) {
  const file = path.join(DIST, t.file);
  if (!fs.existsSync(file)) { err(t.route, 'page not built'); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1s = html.match(/<h1[\s>][\s\S]*?<\/h1>/g) || [];
  const h1 = h1s.length ? strip(h1s[0]) : '';
  if (title.length < 30 || title.length > 65) warn(t.route, `title length ${title.length}`);
  if (desc.length < 120 || desc.length > 165) warn(t.route, `description length ${desc.length}`);
  if (h1s.length !== 1) err(t.route, `${h1s.length} <h1> elements`);
  // Heading structure: the page must start at <h1> and never skip a level going down (h2 → h4).
  const levels = [...(html.split('<body')[1] || '').matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  if (levels.length && levels[0] !== 1) err(t.route, `first heading is <h${levels[0]}>, expected <h1>`);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) { err(t.route, `heading level skipped: <h${levels[i - 1]}> → <h${levels[i]}> (heading #${i + 1})`); break; }
  }
  for (const m of html.matchAll(/<h([1-6])[^>]*>\s*<\/h\1>/g)) err(t.route, `empty <h${m[1]}>`);
  if (!t.noindex && !html.includes('<link rel="canonical"')) err(t.route, 'missing canonical');
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { err(t.route, 'invalid JSON-LD'); }
  }
  if (t.primary && !t.noindex) {
    const k = norm(t.primary);
    const body = strip(html.split('<body')[1] || '');
    const inTitle = norm(title).includes(k);
    const inLead = h1.includes(k) || norm(desc).includes(k);
    const count = body.split(k).length - 1;
    if (!inTitle) warn(t.route, `primary keyword "${t.primary}" not in <title>`);
    if (!inLead) warn(t.route, `primary keyword "${t.primary}" not in H1 or description`);
    if (count === 0) err(t.route, `primary keyword "${t.primary}" missing from page copy`);
  }
}

const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const rel = loc.replace(SITE_URL, '');
  const f = path.join(DIST, rel, 'index.html');
  if (!fs.existsSync(f)) err(rel, 'sitemap URL has no page');
}
const robots = fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) err('robots.txt', 'sitemap reference missing');

console.log(`\n${targets.length} pages checked · ${errors} error(s) · ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
