// Turns React `style={{…}}` props on DOM elements into small generated CSS classes.
//
// Why: SEO auditors (and some CSPs) penalise inline `style="…"` attributes, and this site sets hundreds of them
// (animation indexes, colours, 3D transforms). The JSX runtime in ./jsx-runtime.js calls `styleToClass()` for
// every DOM element with a style object, and gets back a deterministic class name, e.g. `s1x9k2`.
//   • Prerender (Node): rules are collected per page and written into one <style id="mho-atomic"> in <head>.
//   • Browser: the same names are computed (so hydration matches) and new rules are added to a stylesheet.
// The selector repeats the class three times so it outranks ordinary component rules, the way an inline
// style would. Values follow React's own rules (numbers get "px" unless the property is unitless).
const IS_BROWSER = typeof document !== 'undefined';
// After this many distinct rules in one browser session (e.g. a value animated by state), fall back to plain
// inline styles so the stylesheet cannot grow without bound.
const CLIENT_LIMIT = 5000;

// Same list React uses (react-dom/src/shared/isUnitlessNumber.js).
const UNITLESS = new Set([
  'animationIterationCount', 'aspectRatio', 'borderImageOutset', 'borderImageSlice', 'borderImageWidth', 'boxFlex',
  'boxFlexGroup', 'boxOrdinalGroup', 'columnCount', 'columns', 'flex', 'flexGrow', 'flexPositive', 'flexShrink',
  'flexNegative', 'flexOrder', 'gridArea', 'gridRow', 'gridRowEnd', 'gridRowSpan', 'gridRowStart', 'gridColumn',
  'gridColumnEnd', 'gridColumnSpan', 'gridColumnStart', 'fontWeight', 'lineClamp', 'lineHeight', 'opacity', 'order',
  'orphans', 'scale', 'tabSize', 'widows', 'zIndex', 'zoom', 'fillOpacity', 'floodOpacity', 'stopOpacity',
  'strokeDasharray', 'strokeDashoffset', 'strokeMiterlimit', 'strokeOpacity', 'strokeWidth', 'MozAnimationIterationCount',
  'MozBoxFlex', 'MozBoxFlexGroup', 'MozLineClamp', 'msAnimationIterationCount', 'msFlex', 'msZoom', 'msFlexPositive',
  'msGridColumns', 'msGridRows', 'WebkitAnimationIterationCount', 'WebkitBoxFlex', 'WebKitBoxFlexGroup',
  'WebkitBoxOrdinalGroup', 'WebkitColumnCount', 'WebkitColumns', 'WebkitFlex', 'WebkitFlexGrow', 'WebkitFlexPositive',
  'WebkitFlexShrink', 'WebkitLineClamp',
]);

const cssName = (k) => (k.startsWith('--') ? k : k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()).replace(/^ms-/, '-ms-'));

function cssValue(k, v) {
  if (typeof v === 'number' && v !== 0 && !k.startsWith('--') && !UNITLESS.has(k)) return v + 'px';
  return String(v).trim();
}

// cyrb53: fast 53-bit string hash, so two different rules practically never share a name.
function hash(str) {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

/** css declarations → class name (shared by every page in this process). */
const known = new Map();
let collector = null; // Map(className → declarations) for the page being prerendered
let sheet = null;

const rule = (cls, decl) => `.${cls}.${cls}.${cls}{${decl}}`;

function insert(cls, decl) {
  if (!sheet) {
    const el = document.createElement('style');
    el.id = 'mho-atomic-live';
    document.head.appendChild(el);
    sheet = el.sheet;
  }
  try {
    sheet.insertRule(rule(cls, decl), sheet.cssRules.length);
    return true;
  } catch {
    return false; // a declaration the browser rejects: keep it inline, exactly as before
  }
}

/**
 * Returns the class name for a React style object, '' when the object is empty, or null when the style
 * should stay inline (browser rule limit reached, or the browser rejected the rule).
 */
export function styleToClass(style) {
  let decl = '';
  for (const k in style) {
    const v = style[k];
    if (v == null || typeof v === 'boolean' || v === '') continue;
    decl += `${cssName(k)}:${cssValue(k, v)};`;
  }
  if (!decl) return '';
  let cls = known.get(decl);
  if (!cls) {
    if (IS_BROWSER && known.size >= CLIENT_LIMIT) return null;
    cls = 's' + hash(decl);
    if (IS_BROWSER && !insert(cls, decl)) return null;
    known.set(decl, cls);
  }
  if (collector) collector.set(cls, decl);
  return cls;
}

/** Prerender only: start collecting the rules used by the next render. */
export function beginStyleCollection() {
  collector = new Map();
}

/** Prerender only: the collected rules as a <style> tag for <head> ('' if none). */
export function endStyleCollection() {
  const used = collector || new Map();
  collector = null;
  if (!used.size) return '';
  const css = [...used].map(([cls, decl]) => rule(cls, decl)).join('');
  return `<style id="mho-atomic">${css.replace(/</g, '\\3c ')}</style>`;
}
