#!/usr/bin/env node
/**
 * Dev server with live reload:  npm run dev  →  http://localhost:5173
 * Serves the section inside the sample dashboard shell (index.html), with the same scoped CSS as production.
 */
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { scopeAll } from './lib/scope-css.mjs';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '.dev');
const PORT = +(process.env.PORT || 5173);

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(ROOT, 'public'), OUT, { recursive: true });
fs.mkdirSync(path.join(OUT, 'data/ui'), { recursive: true });
for (const f of fs.readdirSync(path.join(ROOT, 'src/i18n'))) {
  const m = /^([a-z]{2})\.js$/.exec(f);
  if (m && m[1] !== 'en') fs.writeFileSync(path.join(OUT, 'data/ui', m[1] + '.json'), JSON.stringify((await import(url.pathToFileURL(path.join(ROOT, 'src/i18n', f)).href)).default));
}
const shell = fs.readFileSync(path.join(ROOT, 'src/shell.css'), 'utf8');
fs.writeFileSync(path.join(OUT, 'index.html'), fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
  .replace('<!--SHELLCSS-->', `<style>${shell}</style>`)
  .replace('<!--SCRIPTS-->', `<script src="assets/main.js"></script>\n  <script>new EventSource('/esbuild').addEventListener('change', () => location.reload())</script>`));

const cssPlugin = {
  name: 'mho-css',
  setup(b) {
    b.onResolve({ filter: /^mho:css$/ }, () => ({ path: 'mho-css', namespace: 'mho' }));
    b.onLoad({ filter: /.*/, namespace: 'mho' }, async () => {
      const r = await esbuild.build({ stdin: { contents: "@import './app.css';\n@import './dashboard.css';", resolveDir: path.join(ROOT, 'src/styles'), loader: 'css' }, bundle: true, write: false });
      return { contents: 'export default ' + JSON.stringify(scopeAll(r.outputFiles[0].text)), loader: 'js', watchFiles: ['app.css', 'dashboard.css'].map((f) => path.join(ROOT, 'src/styles', f)) };
    });
  },
};
const ctx = await esbuild.context({
  entryPoints: [path.join(ROOT, 'src/main.jsx')], bundle: true, format: 'iife', outfile: path.join(OUT, 'assets/main.js'), sourcemap: true,
  jsx: 'automatic', loader: { '.js': 'jsx' }, charset: 'utf8', define: { 'process.env.NODE_ENV': '"development"' }, logLevel: 'info', plugins: [cssPlugin],
});
await ctx.watch();
const { port } = await ctx.serve({ servedir: OUT, port: PORT });
console.log(`\n  ➜  MHO patient dashboard section (dev): http://localhost:${port}\n`);
