#!/usr/bin/env node
/**
 * Dev server with live reload:  npm run dev  →  http://localhost:5173
 */
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '.dev');
const PORT = +(process.env.PORT || 5173);

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(ROOT, 'public'), OUT, { recursive: true });

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
  .replace('<!--HREFLANG-->', '')
  .replace('<!--STYLES-->', '<link rel="stylesheet" href="assets/main.css" />')
  .replace('<!--SCRIPTS-->', `<script type="module" src="assets/main.js"></script>
  <script>new EventSource('/esbuild').addEventListener('change', () => location.reload())</script>`);
fs.writeFileSync(path.join(OUT, 'index.html'), html);

const ctx = await esbuild.context({
  entryPoints: [path.join(ROOT, 'src/main.jsx')],
  bundle: true,
  splitting: true,
  format: 'esm',
  outdir: path.join(OUT, 'assets'),
  sourcemap: true,
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  define: { 'process.env.NODE_ENV': '"development"' },
  logLevel: 'info',
});
await ctx.watch();
const { port } = await ctx.serve({ servedir: OUT, port: PORT });
console.log(`\n  ➜  MHO caregiver dev server: http://localhost:${port}\n`);
