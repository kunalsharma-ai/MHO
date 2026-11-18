// Site-wide dark mode (the footer switch).
//
// The site is designed in light colours across thousands of rules, so dark mode is done in one place:
// `html[data-mode="dark"]` gets `filter: invert(1) hue-rotate(180deg)` (light pages turn dark, hues stay
// close to the originals). This module then "counter-flips" everything that must not be inverted:
//   • photos, videos, maps, canvases, illustrated people (Persona) and logos keep their real colours;
//   • sections and cards that are already dark (footer, video band, dark heroes) stay dark;
//   • light cards inside those dark areas turn dark too.
// Each element's flip count (parity) is tracked, so nesting always resolves correctly. New content
// (route changes, pop-ups) is processed as it appears via a MutationObserver.
// `data-mode` is separate from `data-theme`, which the language picker uses for its aurora grade.

const KEY = 'mho.mode';
const FLIP = 'invert(1) hue-rotate(180deg)';
const ATTR = 'data-mflip';
const MEDIA = new Set(['IMG', 'VIDEO', 'CANVAS', 'IFRAME', 'PICTURE', 'OBJECT', 'EMBED']);
const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'BR', 'META', 'LINK', 'HEAD']);
const KEEP_SEL = '.persona, .flag, [data-keep-colors]';
// Shapes painted in the page's own background colour (section dividers): they must always match the page.
const PAGE_SEL = '.ab-hero-wave, .ch4-wave, [data-page-color]';

export function getMode() {
  try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
}

let observer = null;
let queued = new Set();
let raf = 0;

// Computed colours come back as rgb()/rgba(), or as color(srgb …), oklab(), oklch() or lab() when the
// stylesheet used color-mix() or modern spaces. Returns { l: perceived lightness 0–1, a: alpha }.
const COLOR_RE = /(rgba?|color|oklab|oklch|lab|lch)\(([^()]*)\)/g;
function parseOne(fn, body) {
  const [main, alphaPart] = body.split('/');
  const p = main.trim().split(/[\s,]+/).filter(Boolean);
  let a = alphaPart !== undefined ? parseFloat(alphaPart) : 1;
  if (String(alphaPart || '').includes('%')) a /= 100;
  const n = (x) => parseFloat(x);
  if (fn === 'rgb' || fn === 'rgba') {
    if (p.length > 3 && alphaPart === undefined) a = n(p[3]);
    return { l: (0.2126 * n(p[0]) + 0.7152 * n(p[1]) + 0.0722 * n(p[2])) / 255, a };
  }
  if (fn === 'color') {
    const v = p.slice(1).map(n); // color(srgb r g b), 0–1
    return { l: 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2], a };
  }
  if (fn === 'oklab' || fn === 'oklch') { const L = n(p[0]) / (p[0].includes('%') ? 100 : 1); return { l: L, a }; }
  if (fn === 'lab' || fn === 'lch') { return { l: n(p[0]) / 100, a }; }
  return null;
}
function colorsIn(str) {
  return [...String(str).matchAll(COLOR_RE)].map((m) => parseOne(m[1], m[2])).filter((c) => c && !Number.isNaN(c.l));
}

/** Luminance (0–1) of an element's own opaque background, or null when it has none worth judging. */
function bgLuminance(cs) {
  if (cs.backgroundClip === 'text' || cs.webkitBackgroundClip === 'text') return null;
  const img = cs.backgroundImage;
  if (img && img !== 'none' && img.includes('gradient')) {
    const cols = colorsIn(img).filter((c) => c.a > 0.55);
    if (cols.length >= 2) return cols.reduce((s, c) => s + c.l, 0) / cols.length;
  }
  const c = colorsIn(cs.backgroundColor)[0];
  if (c && c.a > 0.55) return c.l;
  return null;
}

function flipEl(el, cs) {
  const own = cs.filter && cs.filter !== 'none' ? cs.filter : '';
  el.style.setProperty('filter', own ? `${FLIP} ${own}` : FLIP);
  el.setAttribute(ATTR, own ? own : '1');
}
// Removing the inline filter restores any filter the element had from a stylesheet.
function unflip(el) {
  el.removeAttribute(ATTR);
  el.style.removeProperty('filter');
}

function parityOf(el) {
  let n = 1; // the root inversion
  for (let p = el.parentElement; p; p = p.parentElement) if (p.hasAttribute(ATTR)) n++;
  return n;
}

const isMediaLike = (el, cs) => MEDIA.has(el.tagName) || el.matches(KEEP_SEL) || (cs.backgroundImage.includes('url(') && !cs.backgroundImage.includes('gradient'));

/** Should this element be flipped, given whether it currently sits under an odd number of inversions? */
function decide(el, cs, odd) {
  // Pictures and illustrated people must show their real colours.
  if (isMediaLike(el, cs)) return odd;
  if (el.matches(PAGE_SEL)) return !odd;
  if (/blur\(/.test(cs.filter) || el.tagName === 'HTML' || el.tagName === 'BODY') return false;
  const L = bgLuminance(cs);
  if (L === null) return false;
  const shown = odd ? 1 - L : L; // how bright the background would look
  return shown > 0.55;
}

function walk(el, parity) {
  if (!(el instanceof Element) || SKIP.has(el.tagName)) return;
  if (el.hasAttribute(ATTR)) unflip(el);
  if (el.hasAttribute('data-mode-skip')) return; // designed for both modes (e.g. the switch itself)
  const cs = getComputedStyle(el);
  if (decide(el, cs, parity % 2 === 1)) { flipEl(el, cs); parity++; }
  if (MEDIA.has(el.tagName)) return;
  for (const c of el.children) walk(c, parity);
}

let checks = new Set();
function flush() {
  raf = 0;
  const list = [...queued];
  const cl = [...checks];
  queued = new Set();
  checks = new Set();
  for (const el of list) if (el.isConnected && !el.parentElement?.closest('[data-mode-skip]')) walk(el, parityOf(el));
  // An element whose class (or background transition) changed: re-walk it only if its decision flips.
  for (const el of cl) {
    if (!el.isConnected || SKIP.has(el.tagName) || el.closest('[data-mode-skip]')) continue;
    const odd = parityOf(el) % 2 === 1;
    if (decide(el, getComputedStyle(el), odd) !== el.hasAttribute(ATTR)) walk(el, parityOf(el));
  }
}
const schedule = () => { if (!raf) raf = requestAnimationFrame(flush); };
const onTransitionEnd = (e) => {
  if (/^background/.test(e.propertyName) && e.target instanceof Element) { checks.add(e.target); schedule(); }
};

export function applyMode(mode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (mode === 'dark') {
    root.setAttribute('data-mode', 'dark');
    walk(document.body, 1);
    if (!observer) {
      observer = new MutationObserver((recs) => {
        for (const r of recs) {
          if (r.type === 'childList') { for (const n of r.addedNodes) if (n.nodeType === 1) queued.add(n); }
          else if (r.target.nodeType === 1) checks.add(r.target);
        }
        if (queued.size || checks.size) schedule();
      });
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
      document.addEventListener('transitionend', onTransitionEnd, true);
    }
  } else {
    root.removeAttribute('data-mode');
    if (observer) { observer.disconnect(); observer = null; }
    document.removeEventListener('transitionend', onTransitionEnd, true);
    document.querySelectorAll(`[${ATTR}]`).forEach(unflip);
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', mode === 'dark' ? '#05070f' : '#0B1E5B');
}

export function setMode(mode) {
  try { localStorage.setItem(KEY, mode); } catch { /* storage blocked */ }
  applyMode(mode);
  window.dispatchEvent(new CustomEvent('mho-mode-change', { detail: mode }));
}

/** Re-run the pass (e.g. after a route change finished rendering). */
export function refreshMode() {
  if (document.documentElement.getAttribute('data-mode') === 'dark') walk(document.body, 1);
}
