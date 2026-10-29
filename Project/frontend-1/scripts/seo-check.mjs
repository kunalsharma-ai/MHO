// Post-build SEO audit of every prerendered page in dist/.
// Checks: title 50–60 chars, meta description 140–160, exactly one H1, canonical, robots,
// JSON-LD present, image alt text, internal/external link counts, word count, FAQ count.
// Usage: npm run build && npm run seo:check
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');

async function walk(dir) {
  const out = [];
  for (const f of await readdir(dir)) {
    const p = path.join(dir, f);
    if ((await stat(p)).isDirectory()) { if (f !== 'assets') out.push(...(await walk(p))); }
    else if (f === 'index.html') out.push(p);
  }
  return out;
}

const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const rows = [];
let problems = 0;
for (const file of (await walk(dist)).sort()) {
  const html = await readFile(file, 'utf8');
  const route = '/' + path.relative(dist, path.dirname(file)).replace(/\\/g, '/');
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const main = (html.match(/<main[\s\S]*<\/main>/) || [''])[0];
  const h1 = (main.match(/<h1[\s>]/g) || []).length;
  const h2 = (main.match(/<h2[\s>]/g) || []).length;
  const ld = (html.match(/application\/ld\+json/g) || []).length;
  const imgs = main.match(/<img [^>]*>/g) || [];
  const noAlt = imgs.filter((i) => !/alt="/.test(i)).length;
  const links = main.match(/<a [^>]*href="([^"]+)"/g) || [];
  const internal = links.filter((l) => /href="\//.test(l)).length;
  const external = links.filter((l) => /href="https?:\/\//.test(l)).length;
  const words = strip(main).split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
  const faqs = (main.match(/class="faq-item"/g) || []).length;
  const noindex = robots.includes('noindex');
  const issues = [];
  if (!noindex) {
    if (title.length < 50 || title.length > 60) issues.push(`title ${title.length}`);
    if (desc.length < 140 || desc.length > 160) issues.push(`desc ${desc.length}`);
  }
  if (h1 !== 1) issues.push(`h1=${h1}`);
  if (!canonical) issues.push('no canonical');
  if (!ld) issues.push('no JSON-LD');
  if (noAlt) issues.push(`${noAlt} img without alt`);
  if (issues.length) problems++;
  rows.push({ route, title: title.length, desc: desc.length, h1, h2, words, faqs, internal, external, ld, noindex: noindex ? 'yes' : '', issues: issues.join('; ') || 'OK' });
}
console.table(rows);
console.log(problems ? `\n${problems} page(s) need attention.` : '\nAll pages pass the SEO checks.');
process.exitCode = problems ? 1 : 0;
