// Member portal next to this site.
//
// The logged-in area (dashboard, terms, surveys, admin …) is a separate Next.js app. Sign-up, login and
// forgot-password live in THIS site. Both are served on the same domain, so the login cookie works for both:
// this site answers everything except the portal's own URLs, which are passed on to the portal (PORTAL_URL).
// Neither app has to be changed. If PORTAL_URL is not set nothing is proxied.
//
// Used by vite.config.js (npm run dev) and server/index.mjs (npm run serve). With nginx / Traefik / a CDN in
// front, give the same path list to the proxy there instead (see PORTAL-INTEGRATION.md).
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';

// URLs that always belong to the portal.
export const PORTAL_PREFIXES = [
  '/member', '/admin', '/survey', '/face', '/testing',
  '/auth/terms', '/auth/parent-consent', '/auth/change-email', // NOT /auth/password: that page is this site's
  '/_next', '/imagesmfr',
];
// Public-folder folders both apps have. A file that exists in THIS site wins; anything else goes to the portal.
export const SHARED_PREFIXES = ['/images', '/css', '/videos'];

const under = (pathname, prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`);
export const isPortalPath = (pathname) => PORTAL_PREFIXES.some((p) => under(pathname, p));
export const isSharedPath = (pathname) => SHARED_PREFIXES.some((p) => under(pathname, p));

// Vite matches the whole request URL, query string included (e.g. /survey?name=welcome).
const regexOf = (prefixes) => `^(?:${prefixes.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?:[/?#]|$)`;

// Does this site's public folder have the file?
export function localFile(publicDir, urlPath) {
  try {
    const root = path.resolve(publicDir);
    const file = path.join(root, decodeURIComponent(urlPath.split(/[?#]/)[0]));
    return file.startsWith(root + path.sep) && fs.statSync(file).isFile();
  } catch {
    return false;
  }
}

// `server.proxy` for Vite (npm run dev).
export function portalProxy(target, { publicDir = 'public' } = {}) {
  if (!target) return undefined;
  const base = { target, changeOrigin: false, xfwd: true, secure: false };
  return {
    [regexOf(PORTAL_PREFIXES)]: { ...base, ws: true }, // ws: Next's hot reload socket (/_next/webpack-hmr)
    [regexOf(SHARED_PREFIXES)]: { ...base, bypass: (req) => (localFile(publicDir, req.url) ? req.url : undefined) },
  };
}

// Plain Node proxy (npm run serve): streams the request to the portal and the answer back, cookies included.
export function proxyToPortal(req, res, target) {
  const t = new URL(target);
  const client = t.protocol === 'https:' ? https : http;
  const headers = {
    ...req.headers,
    'x-forwarded-host': req.headers.host || '',
    'x-forwarded-proto': req.headers['x-forwarded-proto'] || 'http',
    'x-forwarded-for': [req.headers['x-forwarded-for'], req.socket.remoteAddress].filter(Boolean).join(', '),
  };
  const upstream = client.request({ hostname: t.hostname, port: t.port || (t.protocol === 'https:' ? 443 : 80), path: req.url, method: req.method, headers }, (r) => {
    res.writeHead(r.statusCode || 502, r.headers);
    r.pipe(res);
  });
  upstream.on('error', () => {
    if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end('The member area is not available right now. Please try again in a moment.');
  });
  req.pipe(upstream);
}
