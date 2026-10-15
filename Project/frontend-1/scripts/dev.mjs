// Local development server with rebuild-on-save and automatic browser reload.
//   npm run dev  ->  http://localhost:5173
// Client-side rendering only (no prerender) — use `npm run build && npm run preview` to test production output.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import * as esbuild from 'esbuild';
import { ROOT, loadEnv, defines, assetLoaders } from './shared.mjs';

const PORT = Number(process.env.PORT || 5173);
const env = loadEnv('development');
const OUT = path.join(ROOT, '.dev');
fs.rmSync(OUT, { recursive: true, force: true });

const ctx = await esbuild.context({
  entryPoints: { app: path.join(ROOT, 'src/main.jsx') },
  bundle: true,
  format: 'esm',
  splitting: true,
  outdir: path.join(OUT, 'assets'),
  publicPath: '/assets',
  loader: assetLoaders,
  jsx: 'automatic',
  sourcemap: 'inline',
  define: defines({ env, mode: 'development', routerMode: 'history', previewForms: true }),
  logLevel: 'info',
});
await ctx.watch();
const { port: esPort } = await ctx.serve({ servedir: OUT, port: PORT + 1000 });

const template = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const page = () =>
  template
    .replace('<!--app-head-->', '<title>MyHealthOpinions (dev)</title>')
    .replace('<!--app-styles-->', '<link rel="stylesheet" href="/assets/app.css">')
    .replace('<!--app-html-->', '')
    .replace(
      '<!--app-scripts-->',
      `<script type="module" src="/assets/app.js"></script>
<script>new EventSource('/esbuild').addEventListener('change', () => location.reload())</script>`
    );

const PUBLIC = path.join(ROOT, 'public');
http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    const pub = path.join(PUBLIC, url);
    if (url !== '/' && pub.startsWith(PUBLIC) && fs.existsSync(pub) && fs.statSync(pub).isFile()) {
      return fs.createReadStream(pub).pipe(res);
    }
    if (url.startsWith('/assets/') || url === '/esbuild') {
      const proxy = http.request({ hostname: '127.0.0.1', port: esPort, path: req.url, method: req.method, headers: req.headers }, (r) => {
        res.writeHead(r.statusCode, r.headers);
        r.pipe(res, { end: true });
      });
      return req.pipe(proxy, { end: true });
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(page());
  })
  .listen(PORT, () => console.log(`\n  ➜  MyHealthOpinions dev server: http://localhost:${PORT}\n`));
