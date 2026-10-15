// Production build:
//   1. bundle the browser app (code-split, minified, hashed)   -> dist/assets
//   2. bundle a server renderer                                -> .ssr/ (temporary)
//   3. prerender every route to static HTML (real content + per-page SEO head) -> dist/<route>/index.html
//   4. write sitemap.xml + robots.txt for PUBLIC_SITE_URL
//
// `--single-file` instead produces preview/MyHealthOpinions-preview.html: one self-contained HTML file
// (hash routing, inlined CSS/JS/images) that can be opened directly from disk for review.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import * as esbuild from 'esbuild';
import { ROOT, loadEnv, defines, copyDir, assetLoaders } from './shared.mjs';

const singleFile = process.argv.includes('--single-file');
const env = loadEnv('production');
const DIST = path.join(ROOT, 'dist');
const SSR = path.join(ROOT, '.ssr');
const template = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const t0 = Date.now();

if (singleFile) {
  await buildSingleFile();
} else {
  await buildProduction();
}
console.log(`\n✔ Done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

async function buildProduction() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.rmSync(SSR, { recursive: true, force: true });
  copyDir(path.join(ROOT, 'public'), DIST);

  // 1. Client bundle
  const client = await esbuild.build({
    entryPoints: { app: path.join(ROOT, 'src/main.jsx') },
    bundle: true,
    splitting: true,
    format: 'esm',
    target: ['es2020'],
    outdir: path.join(DIST, 'assets'),
    entryNames: '[name]-[hash]',
    chunkNames: 'chunks/[name]-[hash]',
    assetNames: '[name]-[hash]',
    publicPath: '/assets',
    loader: assetLoaders,
    jsx: 'automatic',
    minify: true,
    sourcemap: false,
    legalComments: 'none',
    metafile: true,
    define: defines({ env, mode: 'production', routerMode: 'history', previewForms: false }),
    logLevel: 'warning',
  });

  const outputs = client.metafile.outputs;
  const entryJs = Object.keys(outputs).find((f) => outputs[f].entryPoint && outputs[f].entryPoint.endsWith('src/main.jsx'));
  const entryCss = outputs[entryJs].cssBundle;
  const toUrl = (f) => '/' + path.relative(DIST, path.join(ROOT, f)).split(path.sep).join('/');
  const scripts = `<script type="module" src="${toUrl(entryJs)}"></script>`;
  const styles = entryCss ? `<link rel="stylesheet" href="${toUrl(entryCss)}">` : '';

  // 2. Server renderer (same source, Node target)
  await esbuild.build({
    entryPoints: [path.join(ROOT, 'src/entry-server.jsx')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: path.join(SSR, 'entry-server.mjs'),
    packages: 'external',
    loader: assetLoaders,
    assetNames: '[name]-[hash]',
    publicPath: '/assets',
    jsx: 'automatic',
    define: defines({ env, mode: 'production', routerMode: 'history', previewForms: false }),
    logLevel: 'warning',
  });

  // 3. Prerender
  const server = await import(pathToFileURL(path.join(SSR, 'entry-server.mjs')).href + `?t=${Date.now()}`);
  const routes = server.getPrerenderRoutes();
  let count = 0;
  for (const route of routes) {
    const { html, head } = await server.render(route);
    const page = template
      .replace('<!--app-head-->', () => head)
      .replace('<!--app-styles-->', () => styles)
      .replace('<!--app-html-->', () => html)
      .replace('<!--app-scripts-->', () => scripts);
    const file = route === '/404' ? path.join(DIST, '404.html') : path.join(DIST, route, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page);
    count++;
  }

  // 4. sitemap.xml + robots.txt
  const today = new Date().toISOString().slice(0, 10);
  const urls = server.getSitemapEntries();
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) =>
        `  <url><loc>${env.PUBLIC_SITE_URL}${u.path}</loc><lastmod>${u.lastmod || today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
    ),
    '</urlset>',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml);
  fs.writeFileSync(
    path.join(DIST, 'robots.txt'),
    [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${env.PUBLIC_SITE_URL}/sitemap.xml`,
      '',
    ].join('\n')
  );
  fs.rmSync(SSR, { recursive: true, force: true });

  const jsKb = (fs.statSync(path.join(ROOT, entryJs)).size / 1024).toFixed(0);
  console.log(`✔ Prerendered ${count} pages · sitemap ${urls.length} URLs · entry JS ${jsKb} KB (minified, before gzip)`);
}

async function buildSingleFile() {
  const OUT = path.join(ROOT, 'preview');
  fs.mkdirSync(OUT, { recursive: true });
  const res = await esbuild.build({
    entryPoints: [path.join(ROOT, 'src/main.jsx')],
    bundle: true,
    splitting: false,
    format: 'iife',
    target: ['es2020'],
    write: false,
    outdir: path.join(ROOT, '.preview-tmp'),
    loader: { ...Object.fromEntries(Object.keys(assetLoaders).map((k) => [k, 'dataurl'])) },
    jsx: 'automatic',
    minify: true,
    legalComments: 'none',
    define: defines({ env, mode: 'production', routerMode: 'hash', previewForms: true }),
    logLevel: 'warning',
  });
  const js = res.outputFiles.find((f) => f.path.endsWith('.js')).text.replace(/<\/script/gi, '<\\/script');
  const css = (res.outputFiles.find((f) => f.path.endsWith('.css'))?.text || '').replace(/<\/style/gi, '<\\/style');
  // public/ assets referenced by absolute URL are not needed by the preview (icons are inlined).
  const head = [
    '<title>MyHealthOpinions — Website Preview</title>',
    '<meta name="robots" content="noindex">',
    '<meta name="description" content="Single-file review preview of the MyHealthOpinions website. Not for deployment.">',
  ].join('\n    ');
  const page = template
    .replace('<!--app-head-->', () => head)
    .replace('<!--app-styles-->', () => `<style>${css}</style>`)
    .replace('<!--app-html-->', '')
    .replace('<!--app-scripts-->', () => `<script>${js}</script>`)
    .replace(/<link rel="(icon|apple-touch-icon|manifest)"[^>]*>\s*/g, '');
  const file = path.join(OUT, 'MyHealthOpinions-preview.html');
  fs.writeFileSync(file, page);
  console.log(`✔ Single-file preview: ${path.relative(ROOT, file)} (${(Buffer.byteLength(page) / 1024).toFixed(0)} KB)`);
}
