// /llms.txt and /llms-full.txt — plain-text guides to the site for AI assistants and LLM-based search
// (format: https://llmstxt.org). Called by scripts/prerender.mjs at the end of `npm run build`, so both files
// always match the live pages, blog posts, FAQ and the domain in VITE_SITE_URL. Nothing here is hand-edited:
// change the page data (src/seo/pages.js, src/data/*) and rebuild.
//
//   llms.txt       short index: what the site is, key facts, and a link + one-line summary for every page/post
//   llms-full.txt  the same plus the full FAQ and the full text of every blog article (Markdown)

import fs from 'node:fs';
import path from 'node:path';

const GROUPS = [
  ['Start here', ['/', '/how-it-works', '/rewards', '/join', '/faq']],
  ['Who it is for', ['/healthcare-professionals', '/caregivers', '/patients', '/earn']],
  ['Trust and company', ['/about-us', '/trust-safety', '/reviews', '/contact', '/profiling']],
  ['Legal', ['/privacy', '/gdpr', '/cookies', '/terms']],
];
const SKIP = new Set(['/404', '/login', '/sitemap', '/blog']);

const url = (site, p) => site + (p === '/' ? '/' : `${p}/`);
const line = (s) => String(s || '').replace(/\s+/g, ' ').trim();

export function writeLlms({ DIST, SITE_URL, server }) {
  const { PAGES, BLOGS, postCache, FAQ_GROUPS, SITE, PAYMENT_METHODS, COVERAGE } = server;
  if (!PAGES || !BLOGS) return 0;

  const methods = (PAYMENT_METHODS || []).map((m) => (m.countries ? `${m.name} (${m.countries.map((c) => c.toUpperCase()).join(', ')} only)` : m.name));
  const head = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} is a free online research community run by ${SITE.legalName} (Frequent Research). ` +
      'Healthcare professionals, family caregivers, patients and consumers take part in paid online surveys and market-research ' +
      'studies and receive a reward for every completed study. Joining is free; members never pay anything.',
    '',
    'Key facts:',
    `- Audience: healthcare professionals (doctors, nurses, pharmacists, allied health, lab, admin and support staff), caregivers, patients and consumers aged 18+.`,
    `- Coverage: ${(COVERAGE || []).length} countries. Payouts: ${methods.join(', ')}.`,
    '- Operator: Frequent Research Fieldwork Solutions Pvt. Ltd., New Delhi, India — ISO 9001, ISO 27001 and ISO 20252 certified, ESOMAR member.',
    '- Personal details are kept separate from survey answers; clients receive anonymised data. Members can request access or deletion (see Privacy and GDPR pages).',
    `- Contact: ${SITE.email} · ${SITE.phoneDisplay} · WhatsApp ${SITE.whatsappDisplay}.`,
    '- The site is available in 42 languages through the language switcher; the canonical content below is English.',
    '',
  ];

  const used = new Set();
  const pageLine = (p) => {
    const v = PAGES[p];
    used.add(p);
    return `- [${v.name}](${url(SITE_URL, p)}): ${line(v.description)}`;
  };
  const body = [];
  for (const [title, list] of GROUPS) {
    const rows = list.filter((p) => PAGES[p]).map(pageLine);
    if (rows.length) body.push(`## ${title}`, '', ...rows, '');
  }
  const rest = Object.keys(PAGES).filter((p) => !used.has(p) && !SKIP.has(p) && PAGES[p].sitemap !== false);
  if (rest.length) body.push('## More pages', '', ...rest.map(pageLine), '');

  const cats = [...new Set(BLOGS.map((b) => b.category))];
  body.push('## Blog', '', `- [Blog home](${url(SITE_URL, '/blog')}): ${line(PAGES['/blog']?.description)}`, '');
  for (const c of cats) {
    body.push(`### ${c}`, '');
    for (const b of BLOGS.filter((x) => x.category === c)) body.push(`- [${line(b.title)}](${url(SITE_URL, `/blog/${b.slug}`)}): ${line(b.metaDescription)}`);
    body.push('');
  }
  body.push('## Optional', '', `- [Full text for AI assistants](${SITE_URL}/llms-full.txt): this index plus the complete FAQ and every blog article`, `- [XML sitemap](${SITE_URL}/sitemap.xml)`, '');

  const short = [...head, ...body].join('\n');
  fs.writeFileSync(path.join(DIST, 'llms.txt'), short);

  // llms-full.txt
  const full = [short, '---', '', '# Frequently asked questions', ''];
  for (const g of FAQ_GROUPS || []) {
    full.push(`## ${g.title}`, '');
    for (const it of g.items || []) full.push(`### ${line(it.q)}`, '', line(it.a), '');
  }
  full.push('---', '', '# Blog articles', '');
  for (const b of BLOGS) {
    const post = postCache?.[b.slug];
    full.push(`## ${line(b.title)}`, '', `URL: ${url(SITE_URL, `/blog/${b.slug}`)}  `, `Category: ${b.category} · Published: ${b.date}${b.updated ? ` · Updated: ${b.updated}` : ''}`, '');
    if (post?.body) full.push(String(post.body).replace(/\r/g, '').replace(/^## /gm, '### ').trim(), '');
    full.push('');
  }
  fs.writeFileSync(path.join(DIST, 'llms-full.txt'), full.join('\n'));
  return BLOGS.length;
}
