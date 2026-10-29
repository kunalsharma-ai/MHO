// Validates a blog data file against the SEO spec. Usage: node scripts/check-blog-file.mjs src/data/blogs/part4a.js
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const file = path.resolve(process.argv[2]);
const mod = await import(pathToFileURL(file).href + '?t=' + Date.now());
const posts = Object.values(mod).find(Array.isArray);
const ROUTES = ['/', '/how-it-works', '/rewards-and-payouts', '/paid-surveys-for-consumers', '/paid-surveys-for-professionals', '/who-can-join', '/quality-and-data-security', '/about-us', '/faq', '/contact-us', '/blog', '/sign-up', '/privacy', '/gdpr', '/cookies', '/terms', '/profiling'];
const BANNED = [/\bpanel(ist)?s?\b/i, /swagbucks/i, /kashkick/i, /branded surveys/i, /paytm/i, /clinical/i, /drug trial/i, /free money instantly/i, /guarantee[ds]? (income|earnings)/i, /\bexample\b/i];
const strip = (t) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
let fail = 0;
for (const p of posts) {
  const errs = [];
  const all = [p.title, p.excerpt, ...p.sections.flatMap((s) => [s.h2 || '', ...(s.p || []), ...(s.list || [])]), ...p.faqs.flatMap((f) => [f.q, f.a])].join(' ');
  const words = strip(all).split(/\s+/).filter(Boolean).length;
  const links = [...all.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => m[2]);
  const internal = links.filter((h) => h.startsWith('/'));
  const external = links.filter((h) => h.startsWith('http'));
  if (p.metaTitle.length < 50 || p.metaTitle.length > 60) errs.push(`metaTitle ${p.metaTitle.length} chars (50–60)`);
  if (p.metaDescription.length < 140 || p.metaDescription.length > 160) errs.push(`metaDescription ${p.metaDescription.length} chars (140–160)`);
  if (words < 1550 || words > 2000) errs.push(`words ${words} (1550–2000)`);
  if (p.faqs.length < 6 || p.faqs.length > 8) errs.push(`faqs ${p.faqs.length} (6–8)`);
  if (new Set(internal).size < 5 || internal.length > 12) errs.push(`internal links ${internal.length} (unique ≥5, ≤12)`);
  if (external.length < 1 || external.length > 3) errs.push(`external links ${external.length} (1–3)`);
  if (p.slug.split('-').length < 3 || p.slug.split('-').length > 6) errs.push('slug must be 3–6 words');
  if ((p.secondaryKeywords || []).length < 5) errs.push('secondaryKeywords < 5');
  const chs = new Set(p.sections.map((s) => s.ch));
  [0, 1, 2, 3, 4].forEach((c) => !chs.has(c) && errs.push(`no section with ch ${c}`));
  p.sections.forEach((s, i) => { if (i > 0 && !s.h2) errs.push(`section ${i} missing h2`); if (typeof s.ch !== 'number') errs.push(`section ${i} missing ch`); });
  internal.forEach((h) => { if (!ROUTES.includes(h) && !/^\/blog\/[a-z0-9-]+$/.test(h)) errs.push('bad internal link ' + h); });
  BANNED.forEach((re) => { const m = all.match(re); if (m) errs.push('banned term: ' + m[0]); });
  console.log(`${errs.length ? '✗' : '✓'} ${p.slug} — ${words} words, ${p.faqs.length} FAQs, ${internal.length} internal, ${external.length} external${errs.length ? '\n    ' + errs.join('\n    ') : ''}`);
  if (errs.length) fail++;
}
process.exit(fail ? 1 : 0);
