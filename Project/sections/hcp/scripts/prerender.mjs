// Injects a static render of the home page into <div id="root"> of the built index.html and
// writes .gz / .br copies of text assets (for nginx gzip_static / brotli_static).
//   node scripts/prerender.mjs [distDir]      (runs automatically after `npm run build`)
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.resolve(ROOT, process.argv[2] || 'dist');
const tmp = path.join(ROOT, '.prerender-tmp.mjs');

await build({
  entryPoints: [path.join(ROOT, 'src/prerender.jsx')],
  bundle: true, platform: 'node', format: 'esm', outfile: tmp, jsx: 'automatic', logLevel: 'error',
  nodePaths: (process.env.NODE_PATH || '').split(':').filter(Boolean),
  define: { 'import.meta.env.BASE_URL': JSON.stringify(process.env.VITE_BASE || '/'), 'import.meta.env.PROD': 'true', 'import.meta.env.VITE_API_BASE': '""', 'process.env.NODE_ENV': '"production"' },
  external: ['react', 'react-dom', 'react-dom/server'],
});
const { render } = await import(pathToFileURL(tmp).href + `?t=${Date.now()}`);
const markup = render();
fs.rmSync(tmp, { force: true });

const indexFile = path.join(DIST, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');
html = html.replace(/<div id="root">[\s\S]*?<\/div>(\s*<noscript>)/, (_m, tail) => `<div id="root">${markup}</div>${tail}`);
fs.writeFileSync(indexFile, html);
console.log(`✓ prerendered home (${(markup.length / 1024).toFixed(0)} KB HTML) into ${path.relative(ROOT, indexFile)}`);

// precompress
let n = 0;
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (/\.(html|js|css|json|svg|txt|xml|webmanifest)$/.test(e.name) && fs.statSync(f).size > 1024) {
      const buf = fs.readFileSync(f);
      fs.writeFileSync(`${f}.gz`, zlib.gzipSync(buf, { level: 9 }));
      fs.writeFileSync(`${f}.br`, zlib.brotliCompressSync(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } }));
      n += 1;
    }
  }
};
walk(DIST);
console.log(`✓ precompressed ${n} files (.gz + .br)`);
