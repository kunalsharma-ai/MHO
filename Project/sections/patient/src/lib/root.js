/**
 * The section lives inside a host dashboard, so it never touches <html>/<body> styling.
 * Every element that carries the design system has the class "mho-app" (the section root and the
 * overlay layer appended to <body> for dialogs). Language, direction, theme and palette are written
 * onto all of them, and all CSS is scoped to .mho-app at build time (scripts/lib/scope-css.mjs).
 */
const roots = new Set();
const attrs = { 'data-theme': 'light', 'data-lang': 'en', lang: 'en', dir: 'ltr' };
const vars = {};

function apply(el) {
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  for (const k in vars) el.style.setProperty(k, vars[k]);
}
export function registerRoot(el) {
  if (!el) return () => {};
  roots.add(el);
  apply(el);
  return () => roots.delete(el);
}
export function setRootAttrs(a) { Object.assign(attrs, a); roots.forEach(apply); }
export function setRootVars(v) { Object.assign(vars, v); roots.forEach(apply); }
export const rootAttr = (k) => attrs[k];
export const forEachRoot = (fn) => roots.forEach(fn);

let layer = null;
/** <div class="mho-app mho-layer"> on <body>: home for dialogs, the question flow, flights and toasts */
export function getLayer() {
  if (typeof document === 'undefined') return null;
  if (layer && layer.isConnected) return layer;
  layer = document.createElement('div');
  layer.className = 'mho-app mho-layer';
  document.body.appendChild(layer);
  registerRoot(layer);
  return layer;
}
/** lock the host page scroll while the full-screen question flow is open */
let locks = 0, prevOverflow = '';
export function lockScroll(on) {
  const b = document.documentElement;
  if (on) { if (!locks++) { prevOverflow = b.style.overflow; b.style.overflow = 'hidden'; } }
  else if (locks && !--locks) b.style.overflow = prevOverflow;
}
