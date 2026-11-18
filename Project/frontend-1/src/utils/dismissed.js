// Notifications the visitor closed with ✕ stay off for the rest of this visit, on every page.
// Kept in memory only (not localStorage or sessionStorage): a refresh or reopening the site starts fresh,
// and every notification behaves normally again.
const off = new Set();
const subs = new Set();
export const isOff = (kind) => off.has(kind);
export function turnOff(kind) {
  off.add(kind);
  subs.forEach((fn) => fn(kind));
}
export function onTurnOff(fn) {
  subs.add(fn);
  return () => subs.delete(fn);
}

// Per-visit counters and flags (how many times a prompt showed, whether the greeting played, ...).
const mem = new Map();
export const visit = {
  get: (k, d) => (mem.has(k) ? mem.get(k) : d),
  set: (k, v) => { mem.set(k, v); },
};
