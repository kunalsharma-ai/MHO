#!/usr/bin/env node
/**
 * Dashboard embed build →  dist-embed/
 *   mho-hcp-section.js    one script (React included), exposes window.MHOProfileSection.mount(el, options)
 *   mho-hcp-section.css   every style scoped to .mho-hcp (+ Inter @font-face)
 *   data/ locales/ images/ fonts/   question-bank lookups, translations, flags, illustrations
 *   example-dashboard.html          a demo dashboard page with the section in its "My Profile" tab
 *   config.example.js               every option with comments
 * Serve the folder anywhere (same domain, or a CDN with CORS for data/*.json + locales/*.json) and pass its URL as assetBase.
 *   node scripts/build-embed.mjs
 */
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { scopeCss } from './scope-css.mjs';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'dist-embed');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

await esbuild.build({
  entryPoints: { 'mho-hcp-section': path.join(ROOT, 'src/embed.jsx') },
  bundle: true, format: 'iife', outdir: OUT, minify: true, target: ['es2020', 'chrome90', 'safari15', 'firefox90'], jsx: 'automatic',
  loader: { '.json': 'json' }, external: ['/fonts/*'],
  define: {
    'import.meta.env.BASE_URL': '"./"', 'import.meta.env.PROD': 'true', 'import.meta.env.DEV': 'false', 'import.meta.env.MODE': '"production"',
    'import.meta.env.VITE_API_BASE': JSON.stringify(process.env.VITE_API_BASE || ''), 'process.env.NODE_ENV': '"production"',
  },
  legalComments: 'none', logLevel: 'warning',
});

const raw = fs.readFileSync(path.join(OUT, 'mho-hcp-section.css'), 'utf8').replaceAll("url('/fonts/", "url('./fonts/").replaceAll('url(/fonts/', 'url(./fonts/');
const scoped = scopeCss(raw, '.mho-hcp');
const extra = `
/* the mount element is the section's root */
.mho-hcp { display: block; position: relative; color: var(--ink); font: 400 16px/1.6 var(--f-body); -webkit-font-smoothing: antialiased; text-align: start; overflow-x: clip; }
.mho-hcp .bgfx { overflow: clip; }
`;
fs.writeFileSync(path.join(OUT, 'mho-hcp-section.css'), `/* MyHealthOpinions · HCP My Profile section v3.0 — every rule scoped to .mho-hcp */\n${scoped}\n${extra}`);

function copyDir(src, dst, skip = () => false) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name); const d = path.join(dst, e.name);
    if (skip(s)) continue;
    if (e.isDirectory()) copyDir(s, d, skip); else fs.copyFileSync(s, d);
  }
}
const pub = path.join(ROOT, 'public');
for (const dir of ['data', 'locales', 'fonts']) copyDir(path.join(pub, dir), path.join(OUT, dir));
copyDir(path.join(pub, 'images'), path.join(OUT, 'images'), (p) => p.includes(path.join('images', 'email')) || /og-image|icon-512/.test(p));
for (const f of ['example-dashboard.html', 'config.example.js']) {
  const src = path.join(ROOT, 'embed', f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(OUT, f));
}
const kb = (f) => (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(1) + ' KB';
console.log('✔ dist-embed/mho-hcp-section.js', kb('mho-hcp-section.js'));
console.log('✔ dist-embed/mho-hcp-section.css', kb('mho-hcp-section.css'), '(scoped to .mho-hcp)');
