/* Service worker: instant repeat visits. HTML = network-first, static assets = cache-first. */
const V = 'mho-hcp-v3.0.0'; // bump on every release: old caches (locales, data, images) are dropped on activate
const CORE = ['./', './index.html', './fonts/inter-var.woff2', './images/brand/mho-logo.png', './images/brand/mho-logo@2x.png', './images/brand/mho-heart.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(V).then((c) => c.put(req, copy)); return r; }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok && /\/(assets|fonts|images|flags|locales|data)\//.test(req.url)) { const copy = r.clone(); caches.open(V).then((c) => c.put(req, copy)); }
    return r;
  })));
});
