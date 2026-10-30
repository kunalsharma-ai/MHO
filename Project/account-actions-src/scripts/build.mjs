// Production build → dist/
//   dist/index.html                 standalone page (edit window.MHO_CONFIG or render it from your server template)
//   dist/assets/app-[hash].js|css   page bundle (React included)
//   dist/lib/index.js|css           ESM library for importing into an existing React dashboard (React external)
import * as esbuild from 'esbuild';
import { mkdir, rm, writeFile, readdir } from 'node:fs/promises';
import { common, fontsLink } from './shared.mjs';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });

// 1) Standalone page
const page = await esbuild.build({
  ...common,
  entryPoints: { app: 'src/main.jsx' },
  outdir: 'dist/assets',
  entryNames: '[name]-[hash]',
  assetNames: '[name]-[hash]',
  minify: true,
  sourcemap: true,
  metafile: true,
  define: { 'process.env.NODE_ENV': '"production"' },
});
const outs = Object.keys(page.metafile.outputs);
const js = outs.find((f) => /app-.*\.js$/.test(f)).replace('dist/', '');
const css = outs.find((f) => /app-.*\.css$/.test(f))?.replace('dist/', '');

await writeFile('dist/index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Account Center | MyHealthOpinions</title>
<meta name="robots" content="noindex, nofollow">
<meta name="csrf-token" content="{{CSRF_TOKEN}}">
${fontsLink}
${css ? `<link rel="stylesheet" href="./${css}">` : ''}
<style>html,body{margin:0;background:#06141C}</style>
</head>
<body>
<div id="mho-account-actions"></div>
<script>
  // Render these values from your server for the signed-in member.
  window.MHO_CONFIG = {
    apiBaseUrl: '/api',
    mock: false,
    user: { name: '{{USER_NAME}}', email: '{{USER_EMAIL}}', id: '{{USER_ID}}', points: 0, pointsValue: '' },
    links: { dashboard: '/dashboard', account: '/dashboard/account', support: '/contact' }
  };
</script>
<script src="./${js}" defer></script>
</body>
</html>
`);

// 2) Library build for an existing React app
await esbuild.build({
  ...common,
  entryPoints: { index: 'src/index.js' },
  outdir: 'dist/lib',
  format: 'esm',
  minify: false,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  assetNames: 'assets/[name]-[hash]',
});

console.log('\nBuilt:', (await readdir('dist/assets')).join(', '));
