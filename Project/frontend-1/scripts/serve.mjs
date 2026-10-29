// Zero-dependency static server for testing the PRERENDERED build exactly like production:
//   /how-it-works  → dist/how-it-works/index.html
//   unknown path   → dist/404.html (HTTP 404)
// Usage: npm run build && npm run preview   (http://localhost:4173)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), process.argv[2] || 'dist');
const port = Number(process.env.PORT || 4173);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };

async function resolve(p) {
  const file = path.join(root, decodeURIComponent(p));
  if (!file.startsWith(root)) return null;
  for (const c of [file, path.join(file, 'index.html')]) {
    try { if ((await stat(c)).isFile()) return c; } catch { /* next */ }
  }
  return null;
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const file = await resolve(url.pathname);
  if (!file) {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    return res.end(await readFile(path.join(root, '404.html')));
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  res.end(await readFile(file));
}).listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
