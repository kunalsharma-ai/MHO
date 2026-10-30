#!/usr/bin/env node
/**
 * Build (esbuild – builds in about a second).
 *
 *   npm run build            → dist/
 *        dist/embed/mho-patient-section.js        one <script> for any dashboard (React included, global window.MHOPatient)
 *        dist/embed/mho-patient-section.esm.js    ES module, React included
 *        dist/embed/mho-patient-section.react.js  ES module for React dashboards (react / react-dom NOT bundled)
 *        dist/index.html + assets/               the section inside a sample dashboard shell (demo / QA)
 *        dist/images, data, fonts, config.js      static files the section loads (point config.assetBase here)
 *   npm run build:preview    → preview/MHO-Patient-Dashboard-Preview.html (one self-contained file)
 *
 * CSS: src/styles/*.css are bundled, minified, SCOPED to .mho-app and their @keyframes prefixed (scripts/lib/scope-css.mjs),
 * then embedded in the JS and injected at mount, so the host dashboard is never affected.
 */
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { scopeAll } from './lib/scope-css.mjs';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const PREVIEW = process.argv.includes('--preview');
const OUT = path.join(ROOT, PREVIEW ? '.preview-tmp' : 'dist');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

/* ---------- 1. stylesheet → scoped string ---------- */
const cssRes = await esbuild.build({
  stdin: { contents: "@import './app.css';\n@import './dashboard.css';", resolveDir: path.join(ROOT, 'src/styles'), loader: 'css' },
  bundle: true, minify: true, write: false, logLevel: 'warning', target: ['chrome100', 'safari15', 'firefox100'],
});
const scoped = scopeAll(cssRes.outputFiles[0].text, '.mho-app');
const cssPlugin = {
  name: 'mho-css',
  setup(b) {
    b.onResolve({ filter: /^mho:css$/ }, () => ({ path: 'mho-css', namespace: 'mho' }));
    b.onLoad({ filter: /.*/, namespace: 'mho' }, () => ({ contents: 'export default ' + JSON.stringify(scoped), loader: 'js' }));
  },
};
const common = {
  bundle: true, minify: true, sourcemap: false, target: ['es2020'], jsx: 'automatic', loader: { '.js': 'jsx' },
  define: { 'process.env.NODE_ENV': '"production"', __MHO_VERSION__: JSON.stringify(pkg.version) }, legalComments: 'none', charset: 'utf8', logLevel: 'warning', plugins: [cssPlugin],
};

const banner = `/*! MyHealthOpinions patient dashboard section v${pkg.version} */`;
if (!PREVIEW) {
  fs.mkdirSync(path.join(OUT, 'embed'), { recursive: true });
  await esbuild.build({ ...common, entryPoints: [path.join(ROOT, 'src/embed.jsx')], format: 'iife', outfile: path.join(OUT, 'embed/mho-patient-section.js'), banner: { js: banner } });
  await esbuild.build({ ...common, entryPoints: [path.join(ROOT, 'src/embed.jsx')], format: 'esm', outfile: path.join(OUT, 'embed/mho-patient-section.esm.js'), banner: { js: banner } });
  await esbuild.build({ ...common, entryPoints: [path.join(ROOT, 'src/embed.jsx')], format: 'esm', outfile: path.join(OUT, 'embed/mho-patient-section.react.js'), external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/client'], banner: { js: banner } });
  fs.writeFileSync(path.join(OUT, 'embed/mho-patient-section.css'), '/* For reference only: the same CSS is embedded in the JS bundles and injected automatically. */\n' + scoped);
}

/* ---------- UI dictionaries: src/i18n/<lang>.js → data/ui/<lang>.json ---------- */
const uiDicts = {};
for (const f of fs.readdirSync(path.join(ROOT, 'src/i18n'))) {
  const m = /^([a-z]{2})\.js$/.exec(f);
  if (!m || m[1] === 'en') continue;
  uiDicts[m[1]] = (await import(url.pathToFileURL(path.join(ROOT, 'src/i18n', f)).href + '?t=' + Date.now())).default;
}

/* ---------- 2. demo page (section inside a sample dashboard shell) ---------- */
const mainRes = await esbuild.build({ ...common, entryPoints: [path.join(ROOT, 'src/main.jsx')], format: 'iife', write: false, outfile: 'main.js' });
const js = mainRes.outputFiles[0].text;
const shellCss = (await esbuild.transform(fs.readFileSync(path.join(ROOT, 'src/shell.css'), 'utf8'), { loader: 'css', minify: true })).code;
let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').replace('<!--SHELLCSS-->', () => `<style>${shellCss}</style>`);

function copyDir(src, dst, skip = () => false) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (skip(s)) continue;
    if (e.isDirectory()) copyDir(s, d, skip); else fs.copyFileSync(s, d);
  }
}
const kb = (n) => (n / 1024).toFixed(1) + ' KB';

if (!PREVIEW) {
  fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(OUT, 'assets/main.js'), js);
  html = html.replace('<!--SCRIPTS-->', '<script src="assets/main.js"></script>');
  fs.writeFileSync(path.join(OUT, 'index.html'), html);
  copyDir(path.join(ROOT, 'public'), OUT, (p) => /content-strings\.en\.json$/.test(p) || /[\\/]images[\\/]email$/.test(p));
  fs.mkdirSync(path.join(OUT, 'data/ui'), { recursive: true });
  for (const [l, d] of Object.entries(uiDicts)) fs.writeFileSync(path.join(OUT, 'data/ui', l + '.json'), JSON.stringify(d));
  copyDir(path.join(ROOT, 'examples'), path.join(OUT, 'examples'));
  for (const f of ['embed/mho-patient-section.js', 'embed/mho-patient-section.esm.js', 'embed/mho-patient-section.react.js', 'assets/main.js', 'index.html'])
    console.log('✔ dist/' + f, kb(fs.statSync(path.join(OUT, f)).size));
  console.log('✔ scoped CSS', kb(scoped.length));
} else {
  /* ---------- single-file preview: JS, data, translations, flags, images, fonts inlined ---------- */
  const pub = path.join(ROOT, 'public');
  const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
  const inline = { patient: readJSON(path.join(pub, 'data/patient.json')), geo: {}, cities: {}, jobs: {}, i18n: {}, stateFlags: readJSON(path.join(pub, 'data/state-flags.json')), ui: uiDicts };
  for (const f of fs.readdirSync(path.join(pub, 'data/geo'))) if (f.endsWith('.json')) inline.geo[f.slice(0, -5)] = readJSON(path.join(pub, 'data/geo', f));
  for (const f of fs.readdirSync(path.join(pub, 'data/geo/cities'))) inline.cities[f.slice(0, -5)] = readJSON(path.join(pub, 'data/geo/cities', f));
  for (const f of fs.readdirSync(path.join(pub, 'data/jobs'))) inline.jobs[f.slice(0, -5)] = readJSON(path.join(pub, 'data/jobs', f));
  for (const f of fs.readdirSync(path.join(pub, 'data/i18n'))) if (f.endsWith('.json')) inline.i18n[f.slice(0, -5)] = readJSON(path.join(pub, 'data/i18n', f));
  const assets = {};
  const MIME = { svg: 'image/svg+xml', png: 'image/png', webp: 'image/webp', woff: 'font/woff' };
  const walk = (dir, rel) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name), r = rel + e.name;
      if (e.isDirectory()) { if (r !== 'images/email') walk(p, r + '/'); }
      else { const ext = e.name.split('.').pop(); if (MIME[ext] && !/og-image|icon-512|icon-192|apple-touch/.test(e.name)) assets[r] = `data:${MIME[ext]};base64,${fs.readFileSync(p).toString('base64')}`; }
    }
  };
  walk(path.join(pub, 'images'), 'images/');
  walk(path.join(pub, 'fonts'), 'fonts/');
  const config = fs.readFileSync(path.join(pub, 'config.js'), 'utf8');
  const safe = (s) => s.replace(/<\/script/gi, '<\\/script');
  html = html
    .replace('<script src="config.js"></script>', () => `<script>${safe(config)}</script>`)
    .replace('<!--SCRIPTS-->', () => `<script>window.__MHO_ASSETS__=${safe(JSON.stringify(assets))};window.__MHO_INLINE__=${safe(JSON.stringify(inline))};</script>\n<script>${safe(js)}</script>`)
    .replace(/<link rel="icon"[^>]*>\n?\s*/g, '')
    .replace('<head>', () => `<head>\n  <link rel="icon" href="${assets['images/brand/favicon.svg'] || ''}" />`)
    .replace(/src="images\/brand\/mho-logo\.png" srcset="[^"]*"/, () => `src="${assets['images/brand/mho-logo@2x.png']}"`);
  const dst = path.join(ROOT, 'preview');
  fs.mkdirSync(dst, { recursive: true });
  const file = path.join(dst, 'MHO-Patient-Dashboard-Preview.html');
  fs.writeFileSync(file, html);
  fs.rmSync(OUT, { recursive: true, force: true });
  console.log('✔ preview/MHO-Patient-Dashboard-Preview.html', (html.length / 1024 / 1024).toFixed(2) + ' MB (self-contained, open by double-click)');
}
