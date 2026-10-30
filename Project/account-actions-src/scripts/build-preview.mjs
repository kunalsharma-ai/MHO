// Builds ONE self-contained HTML file (JS, CSS and logo inlined) for reviewing the design:
//   preview/mho-account-actions-preview.html    open directly in any browser
import * as esbuild from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { common, fontsLink } from './shared.mjs';

const res = await esbuild.build({
  ...common,
  entryPoints: ['src/preview/main.preview.jsx'],
  outdir: 'out',
  write: false,
  minify: true,
  loader: { ...common.loader, '.webp': 'dataurl', '.png': 'dataurl', '.svg': 'dataurl' },
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
});
const js = res.outputFiles.find((f) => f.path.endsWith('.js')).text.replace(/<\/script/gi, '<\\/script');
const css = res.outputFiles.find((f) => f.path.endsWith('.css')).text.replace(/<\/style/gi, '<\\/style');

const body = `<div id="root"></div>\n<script>${js}</script>`;
const head = `<title>MHO Account Actions</title>
<meta name="claude:viewport-fit-sides" content="cover">
${fontsLink}
<style>html,body{margin:0;background:#06141C}${css}</style>`;

await mkdir('preview', { recursive: true });
await writeFile('preview/mho-account-actions-preview.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head}
</head>
<body>
${body}
</body>
</html>
`);
// Fragment variant (no html/head/body), used for hosted previews that supply their own document shell.
await writeFile('preview/fragment.html', `${head}\n${body}\n`);
console.log('Preview written to preview/mho-account-actions-preview.html');
