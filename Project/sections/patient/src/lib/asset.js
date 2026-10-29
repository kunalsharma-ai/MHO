import { cfg } from './config.js';

export const asset = (path) => {
  if (typeof window === 'undefined') return path;
  const inl = window.__MHO_ASSETS__;
  if (inl && inl[path]) return inl[path];
  const base = cfg().assetBase || '';
  return base ? base.replace(/\/?$/, '/') + path : path;
};
/** country flag (ISO 3166-1 alpha-2) */
export const countryFlag = (cc) => asset('images/flags/c/' + String(cc || 'xx').toLowerCase() + '.webp');
