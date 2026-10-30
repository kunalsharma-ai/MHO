// Word count report for blog posts (body + FAQs). Usage: node scripts/wordcount.mjs
import fs from 'node:fs';
const dir = new URL('../src/data/blogs/posts/', import.meta.url);
let n = 0;
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'index.js' && f !== 'all.js').sort()) {
  const m = (await import(new URL(f, dir))).default;
  const body = m.body.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const faq = m.faqs.map((x) => x.q + ' ' + x.a).join(' ');
  const wb = body.split(/\s+/).filter(Boolean).length, wt = wb + faq.split(/\s+/).length;
  const internal = (m.body.match(/\]\(\//g) || []).length, external = (m.body.match(/\]\(https?:/g) || []).length;
  console.log(String(wt).padStart(5), 'words', `int ${internal} ext ${external} faq ${m.faqs.length}`, f, wt < 1500 || wt > 2000 ? '  <-- OUT OF RANGE' : '');
  n++;
}
console.log(n, 'posts');
