#!/usr/bin/env node
/**
 * Dashboard embed build →  dist-embed/
 *   mho-profile-section.js   one script (React included), exposes window.MHOProfileSection.mount(el, options)
 *   mho-profile-section.css  every style scoped to .mho-pp (+ Inter @font-face)
 *   data/ images/ fonts/     question bank, translations, flags, illustrations
 *   example-dashboard.html   a demo dashboard page showing the section inside "My Profile"
 *   config.example.js        all options with comments
 * Serve the folder anywhere (same domain or a CDN with CORS for data/*.json) and pass its URL as assetBase.
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
  entryPoints: { 'mho-profile-section': path.join(ROOT, 'src/embed.jsx') },
  bundle: true, format: 'iife', outdir: OUT, minify: true, target: ['es2020'], jsx: 'automatic', loader: { '.js': 'jsx' },
  define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'none', logLevel: 'warning',
});

/* scoped CSS + fonts */
const fontFaces = (fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').match(/@font-face \{[^}]+\}/g) || []).join('\n');
const raw = fs.readFileSync(path.join(OUT, 'mho-profile-section.css'), 'utf8');
const scoped = scopeCss(raw, '.mho-pp');
const extra = `
/* the mount element is the section's root */
.mho-pp { display: block; position: relative; color: var(--ink); font-family: var(--f-body); font-size: 16px; line-height: 1.6; -webkit-font-smoothing: antialiased; text-align: start; }
.mho-pp button { cursor: pointer; }
`;
fs.writeFileSync(path.join(OUT, 'mho-profile-section.css'), `/* MyHealthOpinions · My Profile section v2.0 — all rules scoped to .mho-pp */\n${fontFaces}\n${scoped}\n${extra}`);

/* assets */
function copyDir(src, dst, skip = () => false) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (skip(s)) continue;
    if (e.isDirectory()) copyDir(s, d, skip); else fs.copyFileSync(s, d);
  }
}
const pub = path.join(ROOT, 'public');
copyDir(path.join(pub, 'data'), path.join(OUT, 'data'), (p) => p.endsWith('content-strings.en.json'));
copyDir(path.join(pub, 'images'), path.join(OUT, 'images'), (p) => p.includes(path.join('images', 'email')));
copyDir(path.join(pub, 'fonts'), path.join(OUT, 'fonts'));
for (const f of ['example-dashboard.html', 'config.example.js']) {
  const src = path.join(ROOT, 'embed', f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(OUT, f));
}
const kb = (f) => (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(1) + ' KB';
console.log('✔ dist-embed/mho-profile-section.js', kb('mho-profile-section.js'));
console.log('✔ dist-embed/mho-profile-section.css', kb('mho-profile-section.css'), '(scoped to .mho-pp)');
