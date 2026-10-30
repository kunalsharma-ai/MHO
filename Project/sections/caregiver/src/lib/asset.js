/**
 * Resolves a public asset path.
 *   • single-file preview: images are embedded as data-URIs in window.__MHO_ASSETS__
 *   • embedded in a dashboard: files are served from MHO_CONFIG.assetBase (the URL of the dist-embed/ folder)
 *   • stand-alone site: the normal relative file
 */
export const asset = (path) => {
  if (typeof window === 'undefined') return path;
  const inl = window.__MHO_ASSETS__ && window.__MHO_ASSETS__[path];
  if (inl) return inl;
  const base = window.MHO_CONFIG && window.MHO_CONFIG.assetBase;
  return base ? base.replace(/\/?$/, '/') + path : path;
};
