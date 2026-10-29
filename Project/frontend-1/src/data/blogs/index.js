import { PART1 } from './part1.js';
import { PART2 } from './part2.js';
import { PART3 } from './part3.js';
import { PART4A } from './part4a.js';
import { PART4B } from './part4b.js';
import { PART4C } from './part4c.js';
import { PART4D } from './part4d.js';
import { EXTRA_A } from './extra-a.js';
import { EXTRA_A2 } from './extra-a2.js';
import { EXTRA_A3 } from './extra-a3.js';
import { EXTRA_B } from './extra-b.js';
import { EXTRA_B2 } from './extra-b2.js';
import { EXTRA_B3 } from './extra-b3.js';
import { EXTRA_C } from './extra-c.js';
import { EXTRA_C2 } from './extra-c2.js';
import { EXTRA_D } from './extra-d.js';
import { EXTRA_D2 } from './extra-d2.js';
import { EXTRA_Z } from './extra-z.js';
import { EXTRA_Z2 } from './extra-z2.js';
import { EXTRA_Z3 } from './extra-z3.js';

// Each post = base article (part*.js) + long-form expansion layers (extra-*.js), in order.
const LAYERS = [
  [EXTRA_A, 1], [EXTRA_A2, 2], [EXTRA_A3, 3],
  [EXTRA_B, 1], [EXTRA_B2, 2], [EXTRA_B3, 3],
  [EXTRA_C, 1], [EXTRA_C2, 2],
  [EXTRA_D, 1], [EXTRA_D2, 2],
  [EXTRA_Z, 4], [EXTRA_Z2, 3], [EXTRA_Z3, 3],
];
// Chapters keep each article at 4–8 H2 sections; individual topics render as H3 underneath.
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const CHAPTERS = (kw) => [
  `${cap(kw)}: the essentials`,
  'Going deeper',
  'Your practical playbook',
  'Expert tips',
  'Key takeaways',
];
const MAX_FAQS = 8; // SEO spec: 5–8 FAQs (with FAQPage schema). Extra Q&As become a body section.
const MAX_SECONDARY = 8; // SEO spec: 3–8 secondary keywords

function merge(post) {
  // part1–3 posts are base articles (chapter 0) plus expansion layers; part4 posts carry their own `ch` per section.
  const sections = post.sections.map((sec) => ({ ...sec, ch: typeof sec.ch === 'number' ? sec.ch : 0 }));
  const faqs = [...post.faqs];
  const kws = [...(post.secondaryKeywords || [])];
  LAYERS.forEach(([L, ch]) => {
    const x = L[post.slug];
    if (!x) return;
    sections.push(...(x.sections || []).map((sec) => ({ ...sec, ch })));
    faqs.push(...(x.faqs || []));
    (x.keywords || []).forEach((k) => !kws.includes(k) && kws.push(k));
  });
  const extraQa = faqs.slice(MAX_FAQS);
  if (extraQa.length) sections.push({ h2: 'More quick answers', qa: extraQa, ch: 4 });
  const names = CHAPTERS(post.primaryKeyword);
  const chapters = names
    .map((title, i) => ({ title, sections: sections.filter((sec) => sec.ch === i) }))
    .filter((c) => c.sections.length);
  return {
    ...post,
    sections: chapters.flatMap((c) => c.sections),
    chapters,
    faqs: faqs.slice(0, MAX_FAQS),
    secondaryKeywords: kws.slice(0, MAX_SECONDARY),
    relatedKeywords: kws.slice(MAX_SECONDARY),
    cover: `/images/blog/${post.slug}.webp`,
  };
}

export const wordCount = (post) => {
  const txt = [
    post.title,
    post.excerpt,
    ...post.sections.flatMap((s) => [s.h2 || '', ...(s.p || []), ...(s.list || []), ...(s.qa || []).flatMap((q) => [q.q, q.a])]),
    ...post.faqs.flatMap((f) => [f.q, f.a]),
  ].join(' ');
  return txt.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').split(/\s+/).filter(Boolean).length;
};
const withReadTime = (p) => ({ ...p, readMins: Math.max(1, Math.round(wordCount(p) / 220)) });

export const BLOGS = [...PART1, ...PART2, ...PART3, ...PART4A, ...PART4B, ...PART4C, ...PART4D].map(merge).map((p) => withReadTime(p)).sort((a, b) => (a.date < b.date ? 1 : -1));

export const BLOG_CATEGORIES = ['All', ...Array.from(new Set(BLOGS.map((b) => b.category)))];

export const getBlog = (slug) => BLOGS.find((b) => b.slug === slug);

export const relatedBlogs = (post, n = 3) =>
  BLOGS.filter((b) => b.slug !== post.slug)
    .map((b) => ({ b, score: (b.category === post.category ? 2 : 0) + (b.trending ? 1 : 0) }))
    .sort((x, y) => y.score - x.score)
    .slice(0, n)
    .map((x) => x.b);

