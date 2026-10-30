// Fallback production build with esbuild (used when Vite isn't installed).
// The normal path for the team is `npm run build` (Vite). Both produce the same dist/ layout.
//   node scripts/build-esbuild.mjs            -> dist/  (multi-file, production)
//   node scripts/build-esbuild.mjs --single   -> preview/mho-hcp-preview.html (one self-contained file)
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const single = process.argv.includes('--single');
const OUT = path.join(ROOT, single ? '.preview-tmp' : 'dist');
const nodePaths = (process.env.NODE_PATH || '').split(':').filter(Boolean);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const result = await build({
  entryPoints: [path.join(ROOT, 'src/main.jsx')],
  bundle: true,
  splitting: !single,
  format: 'esm',
  outdir: path.join(OUT, 'assets'),
  entryNames: single ? 'app' : 'app-[hash]',
  chunkNames: 'chunk-[hash]',
  assetNames: '[name]-[hash]',
  minify: true,
  sourcemap: false,
  target: ['es2020', 'chrome90', 'safari15', 'firefox90'],
  jsx: 'automatic',
  loader: { '.json': 'json' },
  external: ['/fonts/*'],
  nodePaths,
  define: {
    'import.meta.env.BASE_URL': '"./"',
    'import.meta.env.PROD': 'true',
    'import.meta.env.DEV': 'false',
    'import.meta.env.MODE': '"production"',
    'import.meta.env.VITE_API_BASE': JSON.stringify(process.env.VITE_API_BASE || ''),
    'process.env.NODE_ENV': '"production"',
  },
  legalComments: 'none',
  metafile: true,
  logLevel: 'info',
});

const files = Object.keys(result.metafile.outputs).map((f) => path.relative(OUT, path.resolve(ROOT, f)));
const entryJs = files.find((f) => /assets\/app(-[^/]+)?\.js$/.test(f));
const entryCss = files.find((f) => /assets\/app(-[^/]+)?\.css$/.test(f));

// fonts referenced as /fonts/... → relative to the css file
const cssPath = path.join(OUT, entryCss);
fs.writeFileSync(cssPath, fs.readFileSync(cssPath, 'utf8').replaceAll('url(/fonts/', 'url(../fonts/').replaceAll("url('/fonts/", "url('../fonts/"));

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
  .replace('<script type="module" src="/src/main.jsx"></script>', `<script type="module" src="./${entryJs}"></script>`)
  .replace('</head>', `    <link rel="stylesheet" href="./${entryCss}" />\n  </head>`)
  .replaceAll('href="/fonts/', 'href="./fonts/');

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name); const d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

if (!single) {
  copyDir(path.join(ROOT, 'public'), OUT);
  fs.writeFileSync(path.join(OUT, 'index.html'), html);
  console.log('✓ dist/ ready:', entryJs, entryCss);
  process.env.VITE_BASE = './';
  await import('./prerender.mjs');
} else {
  // ---------- single self-contained preview file ----------
  const P = path.join(ROOT, 'public');
  const b64 = (f) => fs.readFileSync(path.join(P, f)).toString('base64');
  const mime = (f) => ({ '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2' })[path.extname(f)];
  let css = fs.readFileSync(cssPath, 'utf8')
    .replaceAll('url(../fonts/manrope-var.woff2)', `url(data:font/woff2;base64,${b64('fonts/manrope-var.woff2')})`)
    .replaceAll("url('../fonts/manrope-var.woff2')", `url(data:font/woff2;base64,${b64('fonts/manrope-var.woff2')})`)
    .replaceAll('url(../fonts/inter-var.woff2)', `url(data:font/woff2;base64,${b64('fonts/inter-var.woff2')})`)
    .replaceAll("url('../fonts/inter-var.woff2')", `url(data:font/woff2;base64,${b64('fonts/inter-var.woff2')})`);
  let js = fs.readFileSync(path.join(OUT, entryJs), 'utf8');

  // inline data + locales; images are served from a blob map by patching src/href at runtime
  const inline = {};
  const addJson = (rel) => { inline[rel] = fs.readFileSync(path.join(P, rel), 'utf8'); };
  for (const f of ['data/states.json', 'data/ethnicity.json', 'data/income.json', 'data/joblevel.json']) addJson(f);
  for (const f of fs.readdirSync(path.join(P, 'locales'))) addJson(`locales/${f}`);
  if (process.argv.includes('--with-cities')) for (const f of fs.readdirSync(path.join(P, 'data/cities'))) addJson(`data/cities/${f}`);
  const images = {};
  const walk = (dir) => {
    for (const e of fs.readdirSync(path.join(P, dir), { withFileTypes: true })) {
      const rel = path.join(dir, e.name);
      if (e.isDirectory()) walk(rel);
      else if (/\.(svg|webp|png)$/.test(e.name) && !/icon-512|og-image/.test(e.name)) images[rel] = `data:${mime(rel)};base64,${b64(rel)}`;
    }
  };
  walk('images');

  const imgPatch = `(function(){var M=window.__MHO_IMG__=${JSON.stringify(images)};function fix(el){['src','href'].forEach(function(a){var v=el.getAttribute&&el.getAttribute(a);if(!v)return;var k=v.replace(/^\\.?\\//,'');if(M[k])el.setAttribute(a,M[k]);});var ss=el.getAttribute&&el.getAttribute('srcset');if(ss&&ss.indexOf('data:')<0)el.setAttribute('srcset',ss.split(',').map(function(p){var t=p.trim().split(/\\s+/);var k=t[0].replace(/^\\.?\\//,'');return (M[k]||t[0])+(t[1]?' '+t[1]:'');}).join(', '));}
new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==='attributes')fix(m.target);m.addedNodes.forEach(function(n){if(n.nodeType===1){fix(n);n.querySelectorAll&&n.querySelectorAll('img,image,link').forEach(fix);}});});}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['src','href','srcset']});})();`;

  // NB: function replacers — the bundle contains `$&`, `$'` etc. which string replacements would expand.
  const inlineScript = `<script>window.__MHO_INLINE__=${JSON.stringify(inline).replace(/</g, '\\u003c')};${imgPatch}</script>\n<script type="module">${js.replace(/<\/script/g, '<\\/script')}</script>`;
  html = html
    .replace(/<link rel="preload"[^>]*>\s*/g, () => '')
    .replace(/<link rel="manifest"[^>]*>\s*/, () => '')
    .replace(`<link rel="stylesheet" href="./${entryCss}" />`, () => `<style>${css}</style>`)
    .replace(`<script type="module" src="./${entryJs}"></script>`, () => inlineScript)
    .replace('<script src="./config.js"></script>', () => `<script>${fs.readFileSync(path.join(P, 'config.js'), 'utf8')}</script>`)
    .replace('href="./favicon.ico"', () => `href="data:image/x-icon;base64,${b64('favicon.ico')}"`);
  fs.mkdirSync(path.join(ROOT, 'preview'), { recursive: true });
  const outFile = path.join(ROOT, 'preview', 'mho-hcp-preview.html');
  fs.writeFileSync(outFile, html);
  fs.rmSync(OUT, { recursive: true, force: true });
  console.log('✓ single-file preview:', outFile, `${(fs.statSync(outFile).size / 1024).toFixed(0)} KB`);
}
