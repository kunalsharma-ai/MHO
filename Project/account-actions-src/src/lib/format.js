export const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const fmtDateTime = (iso) =>
  new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

const ID_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I

/** MHO-DEL-YYYYMMDD-XXXXX. Production IDs must be generated (and de-duplicated) on the server. */
export function makeRequestId(date = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  const buf = new Uint32Array(5);
  if (globalThis.crypto?.getRandomValues) crypto.getRandomValues(buf);
  else for (let i = 0; i < 5; i++) buf[i] = Math.floor(Math.random() * 1e9);
  let tail = '';
  buf.forEach((v) => { tail += ID_CHARS[v % ID_CHARS.length]; });
  return `MHO-DEL-${date.getFullYear()}${p(date.getMonth() + 1)}${p(date.getDate())}-${tail}`;
}

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const cx = (...a) => a.filter(Boolean).join(' ');

export const safeStorage = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode etc. */ }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  },
};
