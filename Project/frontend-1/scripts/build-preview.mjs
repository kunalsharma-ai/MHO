// Builds a SINGLE self-contained HTML preview (dist-preview/myfrequentrewards-preview.html)
// for stakeholder review: hash routing, inlined CSS/JS/images, labelled preview data, simulated form success.
// NOT for production deployment — production uses `npm run build` (clean URLs + prerendered HTML).
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile, writeFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'dist-preview');
const reviews = await readFile(path.join(root, 'public/data/reviews.json'), 'utf8');

process.env.VITE_ROUTER = 'hash';
process.env.VITE_DEMO_MODE = 'true';
process.env.VITE_REVIEWS_FEED_URL = 'data:application/json;base64,' + Buffer.from(reviews).toString('base64');

await rm(out, { recursive: true, force: true });
await build({
  root,
  configFile: false,
  plugins: [react()],
  logLevel: 'warn',
  build: { outDir: out, assetsInlineLimit: 100000000, cssCodeSplit: false, rollupOptions: { output: { inlineDynamicImports: true } } },
});

let html = await readFile(path.join(out, 'index.html'), 'utf8');
const assets = path.join(out, 'assets');
for (const f of await readdir(assets)) {
  const code = await readFile(path.join(assets, f), 'utf8');
  if (f.endsWith('.css')) html = html.replace(new RegExp(`<link rel="stylesheet"[^>]*${f}">`), () => `<style>${code}</style>`);
  if (f.endsWith('.js')) {
    html = html.replace(new RegExp(`<script type="module" crossorigin src="/assets/${f}"></script>`), '');
    html = html.replace('</body>', () => `<script type="module">${code.replace(/<\/script/g, '<\\/script')}</script></body>`);
  }
}
// Blog cover paths are built from slugs at runtime → map them to inlined data URIs
const covers = {};
for (const f of await readdir(path.join(root, 'public/images/blog'))) {
  covers[f.replace('.webp', '')] = 'data:image/webp;base64,' + (await readFile(path.join(root, 'public/images/blog', f))).toString('base64');
}
html = html.replace(/`\/images\/blog\/\$\{(\w+)\.slug\}\.webp`/g, (m, v) => `window.__MFR_COVERS[${v}.slug]`);
html = html.replace('<script type="module">', () => `<script>window.__MFR_COVERS=${JSON.stringify(covers)}</script><script type="module">`);
// Inline every /images/... and favicon reference as a data URI
const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
const cache = new Map();
html = await replaceAsync(html, /\/(images\/[a-z0-9_\-/.]+\.(?:webp|png|jpg|svg)|favicon[a-z0-9\-.]*\.(?:ico|png)|apple-touch-icon\.png)/gi, async (m, p) => {
  if (!cache.has(p)) {
    try {
      const buf = await readFile(path.join(root, 'public', p));
      cache.set(p, `data:${MIME[path.extname(p)]};base64,${buf.toString('base64')}`);
    } catch { cache.set(p, m); }
  }
  return cache.get(p);
});
html = html.replace(/<!--app-head-->/, '<title>MyFrequentRewards — Website Preview</title>').replace('<!--app-html-->', '').replace(/<link rel="manifest"[^>]*>/, '');
const file = path.join(out, 'myfrequentrewards-preview.html');
await writeFile(file, html);
console.log(`Preview written: ${file} (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB)`);

async function replaceAsync(str, re, fn) {
  const jobs = [];
  str.replace(re, (...a) => { jobs.push(fn(...a)); return a[0]; });
  const res = await Promise.all(jobs);
  return str.replace(re, () => res.shift());
}
