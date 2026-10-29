#!/usr/bin/env node
/**
 * Tiny production-like static server with Brotli/Gzip + cache headers (no dependencies).
 *   node scripts/serve.mjs [dir=dist] [port=4173]
 * Use it to preview the build locally or to run scripts/perf.mjs realistically.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const dir = path.resolve(process.argv[2] || 'dist');
const port = +(process.argv[3] || process.env.PORT || 4173);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const cache = new Map();

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  let file = path.join(dir, p);
  if (!file.startsWith(dir)) { res.writeHead(403).end(); return; }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(dir, 'index.html');
  const ext = path.extname(file);
  const type = TYPES[ext] || 'application/octet-stream';
  const ae = req.headers['accept-encoding'] || '';
  const enc = /\bbr\b/.test(ae) ? 'br' : /gzip/.test(ae) ? 'gzip' : null;
  const compressible = /text|json|javascript|svg|xml|manifest/.test(type);
  const key = file + '|' + (compressible ? enc : '');
  let body = cache.get(key);
  if (!body) {
    body = fs.readFileSync(file);
    if (compressible && enc === 'br') body = zlib.brotliCompressSync(body, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } });
    else if (compressible && enc === 'gzip') body = zlib.gzipSync(body, { level: 9 });
    cache.set(key, body);
  }
  const immutable = /\/assets\//.test(file);
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : ext === '.html' || p.endsWith('config.js') || p.endsWith('sw.js') ? 'no-cache' : 'public, max-age=86400',
    ...(compressible && enc ? { 'Content-Encoding': enc, Vary: 'Accept-Encoding' } : {}),
  });
  res.end(body);
}).listen(port, () => console.log(`Serving ${dir} on http://localhost:${port}`));
