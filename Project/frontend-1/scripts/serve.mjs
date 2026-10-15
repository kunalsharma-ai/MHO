// Minimal static server for testing the production build locally (mimics typical static hosting):
//   /about-us -> 301 /about-us/ ; /about-us/ -> dist/about-us/index.html ; unknown -> dist/404.html (HTTP 404)
//   node scripts/serve.mjs dist 4173
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'dist');
const port = Number(process.argv[3] || 4173);
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
};

http
  .createServer((req, res) => {
    let url = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    let file = path.join(root, url);
    if (!file.startsWith(root)) { res.writeHead(400); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!url.endsWith('/')) { res.writeHead(301, { Location: url + '/' }); return res.end(); }
      file = path.join(file, 'index.html');
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404, { 'Content-Type': types['.html'] });
      return fs.createReadStream(path.join(root, '404.html')).pipe(res);
    }
    const ext = path.extname(file);
    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': url.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
