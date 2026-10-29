// Local development server with the mock API: http://localhost:5173
import * as esbuild from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { common, fontsLink } from './shared.mjs';

await mkdir('.dev', { recursive: true });
await writeFile('.dev/index.html', `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>MHO Account Actions (dev)</title>
${fontsLink}<link rel="stylesheet" href="/main.preview.css"><style>html,body{margin:0;background:#06141C}</style></head>
<body><div id="root"></div><script src="/main.preview.js"></script>
<script>new EventSource('/esbuild').addEventListener('change', () => location.reload())</script></body></html>`);

const ctx = await esbuild.context({
  ...common,
  entryPoints: ['src/preview/main.preview.jsx'],
  outdir: '.dev',
  sourcemap: true,
  define: { 'process.env.NODE_ENV': '"development"' },
});
await ctx.watch();
const { port } = await ctx.serve({ servedir: '.dev', port: Number(process.env.PORT) || 5173 });
console.log(`\n  MHO Account Actions dev server → http://localhost:${port}\n  (mock API, demo password: Health@2026)\n`);
