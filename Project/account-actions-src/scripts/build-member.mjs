// Build of the page that the member area opens inside My Account → dist-member/
//   index.html · assets/app-[hash].js|css   (copy the folder to web/public/member/account-actions/)
import * as esbuild from 'esbuild';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { common, fontsLink } from './shared.mjs';

await rm('dist-member', { recursive: true, force: true });
await mkdir('dist-member/assets', { recursive: true });

const page = await esbuild.build({
  ...common,
  entryPoints: { app: 'src/member.jsx' },
  outdir: 'dist-member/assets',
  entryNames: '[name]-[hash]',
  assetNames: '[name]-[hash]',
  publicPath: './assets',
  minify: true,
  metafile: true,
  define: { 'process.env.NODE_ENV': '"production"' },
});
const outs = Object.keys(page.metafile.outputs);
const js = outs.find((f) => /app-.*\.js$/.test(f)).replace('dist-member/', '');
const css = outs.find((f) => /app-.*\.css$/.test(f))?.replace('dist-member/', '');

await writeFile('dist-member/index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Account Care | MyHealthOpinions</title>
<meta name="robots" content="noindex, nofollow">
${fontsLink}
${css ? `<link rel="stylesheet" href="./${css}">` : ''}
<style>html,body{margin:0}</style>
<script>try{var t=new URLSearchParams(location.search).get('theme');document.documentElement.style.background=t==='dark'?'#06141C':'#FFFFFF'}catch(e){}</script>
</head>
<body>
<div id="mho-account-actions"></div>
<script src="./${js}" defer></script>
<script src="/member/mho-translate.js" defer></script>
</body>
</html>
`);
