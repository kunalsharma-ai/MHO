// MyFrequentRewards — reference Node.js server (zero dependencies, Node 18+).
// • Serves the prerendered site from ../dist (clean URLs, real 404s, long-cache assets).
// • Implements the live reviews pipeline used by the "Rate your experience" popup and the home testimonials:
//     POST /api/reviews            submit a review (validated, rate-limited, spam-filtered)
//     GET  /api/reviews            published reviews, newest first (public fields only — never emails)
//     GET  /api/admin/reviews      all reviews incl. pending           (Authorization: Bearer ADMIN_TOKEN)
//     POST /api/admin/reviews/:id  { "action": "publish" | "reject" | "delete" }
// • /api/login, /api/register and /api/contact return 501 until you connect them to the member system.
// Storage: a JSON file (fine for thousands of reviews). Swap saveAll/loadAll for a database when you grow.
// Usage:  npm run build && npm run serve        (see server/README.md for environment variables)
import { createServer } from 'node:http';
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isPortalPath, isSharedPath, localFile, proxyToPortal } from './portal-proxy.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ENV = process.env;
const PORT = Number(ENV.PORT || 8080);
const DIST = path.resolve(HERE, ENV.DIST_DIR || '../dist');
const DATA_DIR = path.resolve(HERE, ENV.DATA_DIR || './data');
const DB = path.join(DATA_DIR, 'reviews.json');
const AUTO_PUBLISH = (ENV.REVIEWS_AUTO_PUBLISH || 'true') !== 'false';
const ADMIN_TOKEN = ENV.ADMIN_TOKEN || '';
const ALLOWED_ORIGIN = ENV.ALLOWED_ORIGIN || '';
const TRUST_PROXY = ENV.TRUST_PROXY === 'true';
const IP_SALT = ENV.IP_SALT || 'change-me';
const PORTAL_URL = ENV.PORTAL_URL || ''; // the Next.js member portal (see server/portal-proxy.mjs); empty = not used
const PUBLIC_DIR = path.resolve(HERE, ENV.PUBLIC_DIR || '../public');

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2' };

/* ───────────── storage ───────────── */
let cache = null;
let writing = Promise.resolve();
async function loadAll() {
  if (cache) return cache;
  try {
    cache = JSON.parse(await readFile(DB, 'utf8'));
    if (!Array.isArray(cache)) cache = [];
  } catch {
    cache = [];
  }
  return cache;
}
function saveAll(list) {
  cache = list;
  writing = writing.then(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    const tmp = `${DB}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(list, null, 1));
    await rename(tmp, DB); // atomic replace
  });
  return writing;
}

/* ───────────── helpers ───────────── */
const json = (res, code, body, extra = {}) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra });
  res.end(JSON.stringify(body));
};
const clientIp = (req) => (TRUST_PROXY && String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()) || req.socket.remoteAddress || '';
const hashIp = (ip) => createHash('sha256').update(IP_SALT + ip).digest('hex').slice(0, 16); // store a hash, not the IP
async function readBody(req, limit = 10_000) {
  let size = 0;
  const chunks = [];
  for await (const c of req) {
    size += c.length;
    if (size > limit) throw Object.assign(new Error('Payload too large'), { code: 413 });
    chunks.push(c);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch {
    throw Object.assign(new Error('Invalid JSON'), { code: 400 });
  }
}
const clean = (s, n) => String(s ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n);
const PUBLIC = (r) => ({ id: r.id, name: r.name, iso: r.iso, country: r.country, company: r.company || '', rating: r.rating, text: r.text, createdAt: r.createdAt });

// Light spam / abuse screening. Anything suspicious is held for moderation instead of auto-published.
const BLOCKLIST = ['viagra', 'casino', 'crypto giveaway', 'loan offer', 'whatsapp me', 'telegram', 'bit.ly'];
function screen(text, company) {
  const all = `${text} ${company}`.toLowerCase();
  const reasons = [];
  if (/https?:\/\/|www\.|\.(com|in|net|org|xyz|ru)\b/i.test(all)) reasons.push('link');
  if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(all)) reasons.push('email-in-text');
  if (/(\+?\d[\d\s-]{8,}\d)/.test(all)) reasons.push('phone-in-text');
  if (BLOCKLIST.some((w) => all.includes(w))) reasons.push('blocklist');
  if (/(.)\1{6,}/.test(all)) reasons.push('repeated-chars');
  const letters = text.replace(/[^A-Za-z]/g, '');
  if (letters.length > 20 && letters.replace(/[^A-Z]/g, '').length / letters.length > 0.7) reasons.push('shouting');
  return reasons;
}

const hits = new Map(); // simple in-memory rate limit: max 3 reviews per IP-hash per hour
function rateLimited(key, max = 3, windowMs = 3600_000) {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= max) return true;
  arr.push(now);
  hits.set(key, arr);
  return false;
}

/* ───────────── API ───────────── */
async function postReview(req, res) {
  const b = await readBody(req);
  const errors = {};
  if (b.website) return json(res, 200, { ok: true, status: 'pending', id: randomUUID() }); // honeypot: pretend success
  const rating = Number(b.rating);
  const text = clean(b.text, 600);
  const name = clean(b.firstName || b.name, 40);
  const iso = clean(b.country || b.iso, 2).toUpperCase();
  const country = clean(b.countryName, 60);
  const company = clean(b.company, 60);
  const email = clean(b.email, 120).toLowerCase();
  if (!(rating >= 1 && rating <= 5 && Number.isInteger(rating))) errors.rating = 'Choose a rating from 1 to 5.';
  if (text.length < 20) errors.text = 'Please write at least 20 characters.';
  if (!/^[\p{L}][\p{L}\s.'-]{1,39}$/u.test(name)) errors.name = 'Please enter your first name.';
  if (!/^[A-Z]{2}$/.test(iso)) errors.country = 'Please choose your country.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Please enter a valid email.';
  if (b.consentPublish !== true) errors.consent = 'Consent is required to publish a review.';
  if (Object.keys(errors).length) return json(res, 422, { message: 'Please check the highlighted fields.', errors });

  const ipHash = hashIp(clientIp(req));
  if (rateLimited(ipHash)) return json(res, 429, { message: 'Too many reviews from this connection. Please try again later.' });
  const list = await loadAll();
  const emailHash = createHash('sha256').update(email).digest('hex');
  const recent = list.find((r) => r.emailHash === emailHash && Date.now() - new Date(r.createdAt).getTime() < 30 * 864e5);
  if (recent) return json(res, 409, { message: 'You have already reviewed us recently — thank you! You can update it after 30 days.' });

  const flags = screen(text, company);
  const status = AUTO_PUBLISH && !flags.length ? 'published' : 'pending';
  const review = {
    id: randomUUID(),
    name, iso, country, company, rating, text,
    highlights: Array.isArray(b.highlights) ? b.highlights.slice(0, 8).map((h) => clean(h, 40)) : [],
    email, emailHash, ipHash, page: clean(b.page, 120), flags, status,
    createdAt: new Date().toISOString(),
  };
  await saveAll([review, ...list]);
  return json(res, 201, { ok: true, id: review.id, status });
}

async function listPublished(res) {
  const list = await loadAll();
  return json(res, 200, list.filter((r) => r.status === 'published').slice(0, 60).map(PUBLIC), { 'Cache-Control': 'public, max-age=15' });
}

function isAdmin(req) {
  return Boolean(ADMIN_TOKEN) && req.headers.authorization === `Bearer ${ADMIN_TOKEN}`;
}
async function admin(req, res, id) {
  if (!isAdmin(req)) return json(res, 401, { message: 'Unauthorised' });
  const list = await loadAll();
  if (req.method === 'GET') return json(res, 200, list);
  const b = await readBody(req);
  const i = list.findIndex((r) => r.id === id);
  if (i < 0) return json(res, 404, { message: 'Not found' });
  if (b.action === 'delete') list.splice(i, 1);
  else if (b.action === 'publish' || b.action === 'reject') list[i] = { ...list[i], status: b.action === 'publish' ? 'published' : 'rejected', moderatedAt: new Date().toISOString() };
  else return json(res, 400, { message: 'action must be publish, reject or delete' });
  await saveAll(list);
  return json(res, 200, { ok: true });
}

/* ───────────── static site ───────────── */
async function resolveFile(p) {
  let rel;
  try { rel = decodeURIComponent(p); } catch { return null; }
  const file = path.join(DIST, rel);
  if (!file.startsWith(DIST)) return null;
  for (const c of [file, path.join(file, 'index.html')]) {
    try { if ((await stat(c)).isFile()) return c; } catch { /* next */ }
  }
  return null;
}
async function serveStatic(req, res, pathname) {
  const file = await resolveFile(pathname);
  const headers = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'SAMEORIGIN' };
  if (!file) {
    res.writeHead(404, { ...headers, 'Content-Type': TYPES['.html'] });
    return res.end(await readFile(path.join(DIST, '404.html')).catch(() => 'Not found'));
  }
  const ext = path.extname(file);
  const cacheCtl = pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : ext === '.html' ? 'no-cache' : 'public, max-age=86400';
  res.writeHead(200, { ...headers, 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': cacheCtl });
  return res.end(await readFile(file));
}

/* ───────────── router ───────────── */
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;
  try {
    if (p.startsWith('/api/')) {
      if (ALLOWED_ORIGIN) {
        res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Vary', 'Origin');
      }
      if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
      if (p === '/api/health') return json(res, 200, { ok: true });
      if (p === '/api/reviews' && req.method === 'GET') return await listPublished(res);
      if (p === '/api/reviews' && req.method === 'POST') return await postReview(req, res);
      const m = /^\/api\/admin\/reviews(?:\/([\w-]+))?$/.exec(p);
      if (m) return await admin(req, res, m[1]);
      if (['/api/login', '/api/register', '/api/contact'].includes(p)) return json(res, 501, { message: 'This endpoint is not connected yet. Connect it to the member system (see server/README.md).' });
      return json(res, 404, { message: 'Not found' });
    }
    // The member portal's own URLs (any method) go to the portal; shared folders only when this site has no such file.
    if (PORTAL_URL && (isPortalPath(p) || (isSharedPath(p) && !localFile(PUBLIC_DIR, p) && !(await resolveFile(p))))) return proxyToPortal(req, res, PORTAL_URL);
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { message: 'Method not allowed' });
    return await serveStatic(req, res, p);
  } catch (e) {
    return json(res, e.code && e.code >= 400 && e.code < 600 ? e.code : 500, { message: e.code ? e.message : 'Server error' });
  }
}).listen(PORT, () => console.log(`MyFrequentRewards server on http://localhost:${PORT} (site: ${DIST}, reviews auto-publish: ${AUTO_PUBLISH})`));
