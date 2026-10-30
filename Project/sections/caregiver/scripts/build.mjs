#!/usr/bin/env node
/**
 * Production build (esbuild – one tiny dependency, builds in < 1 s).
 *
 *   npm run build            → dist/          (deploy this folder)
 *   npm run build:preview    → preview/mho-caregiver-dashboard-preview.html  (one self-contained file)
 *
 * What the build does
 *   • bundles + minifies src/ with code-splitting (profile flow & celebrations load on demand)
 *   • inlines the critical CSS into index.html (no render-blocking stylesheet request)
 *   • copies public/ → dist/ and writes a versioned service worker (sw.js)
 *   • adds hreflang links for all 12 languages
 */
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const PREVIEW = process.argv.includes('--preview');
const OUT = path.join(ROOT, PREVIEW ? '.preview-tmp' : 'dist');
const SITE = process.env.SITE_URL || 'https://caregivers.myhealthopinions.com/';
const LANGS = ['en', 'zh', 'es', 'hi', 'ar', 'fr', 'de', 'pt', 'ja', 'ko', 'ru', 'it'];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const result = await esbuild.build({
  entryPoints: [path.join(ROOT, 'src/main.jsx')],
  bundle: true,
  splitting: !PREVIEW,
  format: PREVIEW ? 'iife' : 'esm',
  outdir: path.join(OUT, 'assets'),
  entryNames: '[name]-[hash]',
  chunkNames: 'chunk-[hash]',
  minify: true,
  sourcemap: false,
  target: ['es2020'],
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'none',
  metafile: true,
  write: true,
  logLevel: 'warning',
});

const outputs = Object.keys(result.metafile.outputs).map((p) => path.relative(OUT, p).split(path.sep).join('/'));
const mainJs = outputs.find((o) => /assets\/main-.*\.js$/.test(o));
const mainCss = outputs.find((o) => /assets\/main-.*\.css$/.test(o));
const css = fs.readFileSync(path.join(OUT, mainCss), 'utf8');

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

/* ---------- pre-render the English first screen (SSG) for a fast First Contentful Paint ---------- */
async function prerender() {
  const tmp = path.join(ROOT, '.ssr-tmp.cjs');
  await esbuild.build({
    entryPoints: [path.join(ROOT, 'src/ssr.jsx')],
    bundle: true, platform: 'node', format: 'cjs', outfile: tmp, jsx: 'automatic', loader: { '.js': 'jsx' },
    define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'warning',
  });
  // minimal browser shims – only module-level code touches these during render
  const g = globalThis;
  g.window = g;
  g.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
  g.location = new URL(SITE);
  g.addEventListener = () => {};
  g.document = { documentElement: { style: { setProperty() {}, removeProperty() {} }, dataset: {}, classList: { toggle() {}, remove() {} } }, querySelector: () => null, baseURI: SITE };
  try {
    const mod = createRequire(import.meta.url)(tmp);
    return mod.render();
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}
// React adds <link rel=preload as=image> for every <img>; the header already preloads the logo, the rest would compete for bandwidth
// the single-file preview embeds images as data-URIs, so it renders on the client instead
const ssrHtml = PREVIEW ? '' : (await prerender()).replace(/<link rel="preload" as="image"[^>]*\/>/g, '');
html = html.replace('<!--SSR-->', () => ssrHtml);
html = html.replace('<!--HREFLANG-->', LANGS.map((l) => `<link rel="alternate" hreflang="${l === 'zh' ? 'zh-CN' : l}" href="${SITE}?lang=${l}" />`).join('\n  '));
html = html.replace('<!--STYLES-->', () => `<style>${css}</style>`);

/* copy public → out */
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

if (!PREVIEW) {
  html = html.replace('<!--SCRIPTS-->', `<script type="module" src="${mainJs}"></script>`);
  fs.writeFileSync(path.join(OUT, 'index.html'), html);
  fs.rmSync(path.join(OUT, mainCss));
  copyDir(path.join(ROOT, 'public'), OUT);
  fs.rmSync(path.join(OUT, 'data', 'content-strings.en.json'), { force: true });

  /* service worker: precache the app shell, runtime-cache data/images */
  const shell = ['./', 'index.html', 'config.js', mainJs, ...outputs.filter((o) => o.endsWith('.js') && o !== mainJs), 'data/caregiver.json', 'images/brand/mho-logo.png', 'images/brand/mho-logo@2x.png', 'fonts/inter-regular-latin.woff', 'fonts/inter-semibold-latin.woff', 'manifest.webmanifest'];
  const version = crypto.createHash('sha1').update(shell.join('|') + html).digest('hex').slice(0, 10);
  const sw = fs.readFileSync(path.join(ROOT, 'scripts/sw.template.js'), 'utf8')
    .replace('__VERSION__', version)
    .replace('__SHELL__', JSON.stringify(shell));
  fs.writeFileSync(path.join(OUT, 'sw.js'), sw);

  const size = (f) => (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(1) + ' KB';
  console.log('✔ dist/index.html', size('index.html'), '(critical CSS inlined)');
  for (const o of outputs.filter((o) => o.endsWith('.js'))) console.log('✔ dist/' + o, size(o));
  console.log('✔ service worker', version);
} else {
  /* ---------- single-file preview: inline JS, data, translations and images ---------- */
  const js = fs.readFileSync(path.join(OUT, mainJs), 'utf8');
  const pub = path.join(ROOT, 'public');
  const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
  const inline = { caregiver: readJSON(path.join(pub, 'data/caregiver.json')), geo: {}, cities: {}, i18n: {} };
  for (const f of fs.readdirSync(path.join(pub, 'data/geo'))) if (f.endsWith('.json')) inline.geo[f.slice(0, -5)] = readJSON(path.join(pub, 'data/geo', f));
  for (const f of fs.readdirSync(path.join(pub, 'data/geo/cities'))) inline.cities[f.slice(0, -5)] = readJSON(path.join(pub, 'data/geo/cities', f));
  const i18nDir = path.join(pub, 'data/i18n');
  if (fs.existsSync(i18nDir)) for (const f of fs.readdirSync(i18nDir)) if (f.endsWith('.json')) inline.i18n[f.slice(0, -5)] = readJSON(path.join(i18nDir, f));
  const assets = {};
  const walk = (dir, rel) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name), r = rel + e.name;
      if (e.isDirectory()) { if (r !== 'images/email') walk(p, r + '/'); } // e-mail PNGs are not used by the page
      else if (/\.(svg|png|webp)$/.test(e.name) && !/og-image|icon-512|apple-touch|images\/email/.test(path.join(dir, e.name))) {
        const mime = e.name.endsWith('.svg') ? 'image/svg+xml' : e.name.endsWith('.webp') ? 'image/webp' : 'image/png';
        assets[r] = `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`;
      }
    }
  };
  walk(path.join(pub, 'images'), 'images/');
  const config = fs.readFileSync(path.join(pub, 'config.js'), 'utf8').replace('disableSW: false', 'disableSW: true')
    // the preview shows the demo caregiver "Kunal" (PREVIEW_NAME=… to change it)
    .replace("user: { firstName: '', respondentId: '' }", `user: { firstName: ${JSON.stringify(process.env.PREVIEW_NAME || 'Kunal')}, respondentId: 'DEMO-CAREGIVER' }`);
  const safe = (s) => s.replace(/<\/script/gi, '<\\/script');
  html = html
    .replace('<script src="config.js"></script>', () => `<script>${safe(config)}</script>`)
    .replace('<!--SCRIPTS-->', () => `<script>window.__MHO_ASSETS__=${safe(JSON.stringify(assets))};window.__MHO_INLINE__=${safe(JSON.stringify(inline))};</script>\n<script>${safe(js)}</script>`)
    .replace(/<link rel="(icon|apple-touch-icon|manifest|preload)"[^>]*>\n?\s*/g, '')
    .replace('<head>', () => `<head>\n  <link rel="icon" href="${assets['images/brand/favicon.svg'] || ''}" />`)
    // self-hosted Inter → data URIs so the preview file works offline (Manrope still comes from Google Fonts when online)
    .replace(/url\(fonts\/([\w.-]+\.woff2?)\)/g, (m, f) => `url(data:font/${f.split('.').pop()};base64,${fs.readFileSync(path.join(pub, 'fonts', f)).toString('base64')})`);
  const dst = path.join(ROOT, 'preview');
  fs.mkdirSync(dst, { recursive: true });
  fs.writeFileSync(path.join(dst, 'mho-caregiver-dashboard-preview.html'), html);
  fs.rmSync(OUT, { recursive: true, force: true });
  console.log('✔ preview/mho-caregiver-dashboard-preview.html', (html.length / 1024 / 1024).toFixed(2) + ' MB (fully self-contained, open by double-click)');
}
