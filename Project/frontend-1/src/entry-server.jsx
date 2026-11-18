// Server entry (Node only). Built by `vite build --ssr src/entry-server.jsx` and used by
// scripts/prerender.mjs to render every route to static HTML with its own <title>, meta description,
// canonical, Open Graph and JSON-LD, so search engines index real content.
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { PAGES } from './seo/pages.js';
import { getMeta, headString } from './seo/head.js';
import { BLOGS } from './data/blogs/index.js';
import { ALL_POSTS } from './data/blogs/posts/all.js';
import { seedPosts, postCache } from './data/blogs/postStore.js';
import { loaded } from './pages/registry.js';
import ALL_PAGES from './pages/all.js';
import { beginStyleCollection, endStyleCollection } from './jsx/atomic.js';
export { SITE_URL, SITE } from './config/site.js';
// Data the build scripts read (scripts/llms.mjs writes llms.txt / llms-full.txt from it).
export { PAGES, BLOGS, postCache };
export { FAQ_GROUPS } from './data/faqs.js';
export { PAYMENT_METHODS } from './data/rewards.js';
export { COVERAGE } from './data/countries.js';

Object.assign(loaded, ALL_PAGES);
seedPosts(ALL_POSTS);

export function getPrerenderRoutes() {
  return [...Object.keys(PAGES), ...BLOGS.map((b) => `/blog/${b.slug}`)];
}

export function getSitemapEntries() {
  const pages = Object.entries(PAGES)
    .filter(([p, v]) => v.sitemap !== false && p !== '/404')
    .map(([p, v]) => ({ path: p === '/' ? '/' : p + '/', changefreq: v.changefreq || 'monthly', priority: v.priority || '0.5' }));
  const posts = BLOGS.map((b) => ({ path: `/blog/${b.slug}/`, changefreq: 'monthly', priority: '0.7', lastmod: b.updated || b.date }));
  return [...pages, ...posts];
}

export async function render(route) {
  const slug = route.startsWith('/blog/') ? route.slice(6) : null;
  const meta = getMeta(route, { post: slug ? postCache[slug] : null });
  beginStyleCollection();
  const html = renderToString(<App initialPath={route} />);
  const styles = endStyleCollection(); // style props rendered as classes (src/jsx/atomic.js)
  return { html, head: headString(meta) + (styles ? '\n    ' + styles : ''), status: meta.status };
}
