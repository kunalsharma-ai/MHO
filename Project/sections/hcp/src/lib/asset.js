/**
 * Resolves a file in public/ (images, flags, data, locales).
 *   • stand-alone build: relative to the page (Vite/esbuild BASE_URL, "./" by default)
 *   • embed build: window.MHO_CONFIG.assetBase (set by MHOProfileSection.mount({ assetBase }))
 */
const envBase = (() => { try { return import.meta.env.BASE_URL || './'; } catch { return './'; } })();

export function base() {
  const c = typeof window !== 'undefined' && window.MHO_CONFIG;
  if (c && typeof c.assetBase === 'string' && c.assetBase) return c.assetBase.replace(/\/?$/, '/');
  return envBase;
}
export function asset(p) {
  const k = String(p).replace(/^\.?\//, '');
  // single-file preview: images are inlined as data URLs (window.__MHO_IMG__, see scripts/build-esbuild.mjs --single)
  const inl = typeof window !== 'undefined' && window.__MHO_IMG__;
  if (inl && inl[k]) return inl[k];
  return base() + k;
}
