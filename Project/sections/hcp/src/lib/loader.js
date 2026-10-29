// Fetches JSON from /public with an in-memory cache.
// The single-file preview build injects window.__MHO_INLINE__ = { 'data/states.json': {...}, ... }
// so the same code works with zero network requests.
import { base } from './asset.js';
import { sectionFile } from './bridge.js';
const memo = new Map();

export function loadJSON(path) {
  if (memo.has(path)) return memo.get(path);
  const inline = typeof window !== 'undefined' && window.__MHO_INLINE__;
  let p;
  if (inline && inline[path] !== undefined) {
    const v = inline[path];
    p = Promise.resolve(typeof v === 'string' ? JSON.parse(v) : v);
  } else if (/^data\/(states|ethnicity|income|joblevel)\.json$|^data\/cities\//.test(path)) {
    p = sectionFile(path.slice(5));
  } else {
    p = fetch(base() + path, { credentials: 'same-origin' }).then((r) => {
      if (!r.ok) throw new Error(`${r.status} ${path}`);
      return r.json();
    });
  }
  p = p.catch((e) => { memo.delete(path); throw e; });
  memo.set(path, p);
  return p;
}

/** Warm the cache when the browser is idle (never blocks first paint). */
export function prefetch(paths) {
  const run = () => paths.forEach((x) => loadJSON(x).catch(() => {}));
  if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 4000 });
  else setTimeout(run, 1500);
}
