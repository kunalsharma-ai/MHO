/**
 * Where the section lives.
 *   • Stand-alone page (dist/): the <html> element holds theme / language / palette, flights go to <body>.
 *   • Embedded in your dashboard (dist-embed/, MHOProfileSection.mount(el)): the mount element holds them,
 *     so nothing leaks into the rest of your dashboard.
 */
let host = null;
export const setHost = (el) => { host = el || null; };
export const isEmbedded = () => !!host;
/** element that carries data-theme, data-lang, dir, lang and the --l1/--l2/--l3 palette */
export const hostEl = () => host || document.documentElement;
/** element that receives the flying reward tokens and their confetti */
export const layerEl = () => host || document.body;
