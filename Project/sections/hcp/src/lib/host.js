/**
 * Where the section lives.
 *   • Stand-alone page (dist/): <html> carries theme / language / palette, reward flights go to <body>.
 *   • Embedded in your dashboard (dist-embed/, MHOProfileSection.mount(el)): the mount element carries them,
 *     so nothing leaks into the rest of your dashboard.
 */
let host = null;
export const setHost = (el) => { host = el || null; };
export const isEmbedded = () => !!host;
/** element that carries data-theme, data-lang, dir, lang and the --c1/--c2/--c3 palette */
export const hostEl = () => host || (typeof document !== 'undefined' ? document.documentElement : null);
/** element that receives flying reward tokens, toasts and bursts */
export const layerEl = () => host || document.body;
/** page-scroll lock (only the page itself; an embedded section never locks your dashboard's own scroll container) */
export function lockScroll(on) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('hcp-lock', !!on);
}
