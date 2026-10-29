// Browser registry: each page is its own chunk, downloaded on demand (and prefetched on hover/touch).
const LOADERS = import.meta.glob('../pages/*.jsx');
const cache = {};
const pending = {};

export const lazyPages = {
  get: (n) => cache[n],
  load(n) {
    if (cache[n]) return Promise.resolve(cache[n]);
    const key = `../pages/${n}.jsx`;
    if (!LOADERS[key]) return Promise.resolve(undefined);
    pending[n] = pending[n] || LOADERS[key]().then((m) => (cache[n] = m.default)).catch((e) => { delete pending[n]; throw e; });
    return pending[n];
  },
};
