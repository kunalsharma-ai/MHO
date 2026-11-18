// Site-wide dark mode (header and footer switches).
//
// The site's light design lives in thousands of rules with fixed colours, so dark mode is applied by a
// recolouring pass rather than a second stylesheet, and nothing is inverted: photos, logos, videos and
// illustrated people keep their real colours. For every element the pass reads its computed colours and:
//   • light surfaces (white / near-white cards, panels, pages, pastel washes) become deep navy-violet
//     surfaces of the same hue, so a soft-blue card becomes a deep-blue card;
//   • dark text sitting on those surfaces becomes light text of the same hue (headings near-white,
//     muted copy stays a softer grey), while brand-coloured text and buttons keep their colours;
//   • light borders become faint light lines; light gradient stops darken stop by stop;
//   • surfaces that are already dark (footer, video band, dark heroes) and everything on them stay as they are.
// Each element remembers the effective background behind it, so text is only lightened where the
// surface behind it is dark. New content (route changes, pop-ups) and class changes are handled as they
// happen. Every change is an inline style that is undone exactly when switching back to light.
// `data-mode` is separate from `data-theme`, which the language picker uses for its aurora grade.

const KEY = 'mho.mode';
const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'BR', 'META', 'LINK', 'HEAD', 'IMG', 'VIDEO', 'CANVAS', 'IFRAME', 'PICTURE', 'OBJECT', 'EMBED', 'SOURCE']);
const ART = '.persona, .flag, [data-keep-colors], [data-mode-skip]'; // keep real colours (and their insides)
// Text that sits on a coloured shape drawn by a sibling (the menu's sliding pill): keep its own colour.
const KEEP_TEXT = '.nav-link[aria-current], .nav-link.is-active, .nav-link.active';
const SVG_SHAPES = new Set(['path', 'rect', 'circle', 'ellipse', 'polygon', 'polyline', 'line', 'text', 'tspan']);
const PAGE_DARK = { h: 240, s: 0.32, l: 0.065 }; // page background in dark mode (#0c0d17-ish)

export function getMode() {
  try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
}

/* ---------------- colour maths ---------------- */
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
function srgbFromOklab(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3; const m = m_ ** 3; const s = s_ ** 3;
  const lin = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  return lin.map((v) => clamp(v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055) * 255);
}
/** Parse one CSS colour function into { r, g, b, a } (0–255, alpha 0–1). */
function parseFn(fn, body) {
  const [main, alphaPart] = body.split('/');
  const p = main.trim().split(/[\s,]+/).filter(Boolean);
  const num = (x) => parseFloat(x) / (String(x).includes('%') ? 100 : 1);
  let a = alphaPart !== undefined ? num(alphaPart.trim()) : 1;
  if (fn === 'rgb' || fn === 'rgba') {
    if (p.length > 3 && alphaPart === undefined) a = parseFloat(p[3]);
    return { r: +p[0], g: +p[1], b: +p[2], a };
  }
  if (fn === 'color' && p[0] === 'srgb') return { r: num(p[1]) * 255, g: num(p[2]) * 255, b: num(p[3]) * 255, a };
  if (fn === 'oklab') { const [r, g, b] = srgbFromOklab(num(p[0]), parseFloat(p[1]), parseFloat(p[2])); return { r, g, b, a }; }
  if (fn === 'oklch') { const h = (parseFloat(p[2]) * Math.PI) / 180; const C = parseFloat(p[1]); const [r, g, b] = srgbFromOklab(num(p[0]), C * Math.cos(h), C * Math.sin(h)); return { r, g, b, a }; }
  return null;
}
const COLOR_RE = /(rgba?|color|oklab|oklch)\(([^()]*)\)/g;
const parse = (str) => { const m = /(rgba?|color|oklab|oklch)\(([^()]*)\)/.exec(String(str)); return m ? parseFn(m[1], m[2]) : null; };

function toHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b); const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: h * 60, s, l };
}
function css({ h, s, l }, a = 1) {
  const r = (n) => Math.round(n * 1000) / 10;
  return a >= 1 ? `hsl(${Math.round(h)} ${r(s)}% ${r(l)}%)` : `hsl(${Math.round(h)} ${r(s)}% ${r(l)}% / ${Math.round(a * 1000) / 1000})`;
}
/** Colourfulness 0–1 (HSL saturation exaggerates near-whites, so neutrality is judged by chroma). */
const chroma = ({ r, g, b }) => (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
/** Perceived lightness 0–1. */
const lightness = ({ r, g, b }) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;

/** Is this a light surface colour that should turn dark? (whites, near-whites, pastels) */
const isLightSurface = (c) => { const L = lightness(c); return L > 0.86 || (L > 0.74 && chroma(c) < 0.3); };
/** Dark-mode version of a light surface: same hue, deep and calm. */
function darkSurface(c) {
  const { h, s } = toHsl(c);
  const L = lightness(c);
  if (chroma(c) < 0.05) return { ...PAGE_DARK, l: PAGE_DARK.l + (1 - L) * 0.45 + (L < 0.97 ? 0.035 : 0) };
  return { h, s: clamp(s * 0.55, 0.18, 0.5), l: clamp(0.1 + (1 - L) * 0.35, 0.1, 0.2) };
}
/** Soft decorative glows (blurred blobs) become coloured light, not dark smudges. */
function glow(c) {
  const { h, s } = toHsl(c);
  return chroma(c) < 0.05 ? { h: 250, s: 0.6, l: 0.32 } : { h, s: clamp(s, 0.55, 0.9), l: 0.4 };
}
/** Should this text colour be lightened on a dark surface? */
const isDarkText = (c) => { const L = lightness(c); return L < 0.42 || (L < 0.58 && chroma(c) < 0.25); };
function lightText(c) {
  const { h, s } = toHsl(c);
  const L = lightness(c);
  // ink → near-white, body text → light grey, muted → soft grey; keep a hint of the hue
  const neutral = chroma(c) < 0.08;
  return { h: neutral ? 235 : h, s: clamp(neutral ? 0.18 : s * 0.55, 0, 0.6), l: clamp(0.95 - L * 0.55, 0.66, 0.95) };
}

/* ---------------- the pass ---------------- */
const writes = new Map(); // el → [{ prop, value, priority }] (original inline values, to undo)
const ctx = new WeakMap(); // el → { bg: effective background lightness behind its content, color: orig computed color, out: final color }
let observer = null;
let queued = new Set();
let checks = new Set();
let raf = 0;
let active = false;
let settle = [];

// Recoloured elements must not animate their colours: a paused or restarted colour transition (the animation
// gate pauses off-screen motion) would leave a card stuck on its light colour. Movement transitions stay.
const KEEP_TRANSITIONS = 'transform, opacity, box-shadow, filter, translate, scale, rotate, clip-path, width, height, left, top, right, bottom';
function set(el, prop, value) {
  if (!writes.has(el)) {
    writes.set(el, [{ prop: 'transition-property', value: el.style.getPropertyValue('transition-property'), priority: el.style.getPropertyPriority('transition-property') }]);
    el.style.setProperty('transition-property', KEEP_TRANSITIONS, 'important');
  }
  const list = writes.get(el);
  if (!list.some((w) => w.prop === prop)) list.push({ prop, value: el.style.getPropertyValue(prop), priority: el.style.getPropertyPriority(prop) });
  el.style.setProperty(prop, value, 'important');
}
function undo(el) {
  const list = writes.get(el);
  if (!list) return;
  for (const w of list) {
    if (w.value) el.style.setProperty(w.prop, w.value, w.priority);
    else el.style.removeProperty(w.prop);
  }
  writes.delete(el);
}
function undoTree(root) {
  undo(root);
  for (const el of root.querySelectorAll('*')) if (writes.has(el)) undo(el);
}

/** Recolour a gradient: light stops darken (surfaces) or, for gradient text, dark stops lighten. */
function recolourGradient(img, textClip) {
  let changed = false;
  const out = img.replace(COLOR_RE, (m, fn, body) => {
    const c = parseFn(fn, body);
    if (!c) return m;
    if (textClip ? isDarkText(c) : isLightSurface(c) && c.a > 0.3) { changed = true; return css(textClip ? lightText(c) : darkSurface(c), c.a); }
    return m;
  });
  return changed ? out : null;
}

/** Process an element and its subtree. `bg` = lightness of the surface behind it; `pc` = parent's context. */
function processTree(root, bg, pc) {
  // Read everything first (no writes in between, so the browser computes styles once).
  const items = [];
  const collect = (el, depth) => {
    if (!(el instanceof Element) || SKIP.has(el.tagName.toUpperCase())) return;
    if (el.matches(ART)) return;
    items.push({ el, cs: getComputedStyle(el), depth });
    for (const c of el.children) collect(c, depth + 1);
  };
  collect(root, 0);
  const snap = items.map(({ el, cs, depth }) => ({
    el, depth,
    svg: el instanceof SVGElement,
    tag: el.tagName.toLowerCase(),
    color: cs.color, bgc: cs.backgroundColor, bgi: cs.backgroundImage, clip: cs.backgroundClip === 'text' || cs.webkitBackgroundClip === 'text',
    bt: cs.borderTopColor, br: cs.borderRightColor, bb: cs.borderBottomColor, bl: cs.borderLeftColor, bw: cs.borderTopWidth !== '0px' || cs.borderBottomWidth !== '0px' || cs.borderLeftWidth !== '0px' || cs.borderRightWidth !== '0px',
    fill: cs.fill, stroke: cs.stroke, outline: cs.outlineColor, blur: /blur\(/.test(cs.filter),
  }));
  // Then decide and write, walking the snapshot with a stack of parent contexts.
  const stack = [pc || { bg, color: null, out: null }];
  for (const it of snap) {
    stack.length = it.depth + 1;
    const parent = stack[it.depth];
    let surface = parent.bg;
    const el = it.el;

    if (it.svg && it.tag !== 'svg') {
      if (!SVG_SHAPES.has(it.tag)) { stack[it.depth + 1] = parent; continue; }
      const f = parse(it.fill);
      if (f && f.a > 0) {
        if (surface < 0.5 && it.tag !== 'text' && it.tag !== 'tspan' && isLightSurface(f) && chroma(f) < 0.15) set(el, 'fill', css(darkSurface(f), f.a));
        else if (surface < 0.5 && (it.tag === 'text' || it.tag === 'tspan') && isDarkText(f)) set(el, 'fill', css(lightText(f), f.a));
      }
      stack[it.depth + 1] = parent;
      continue;
    }

    // blurred decorative blobs: turn pale glows into deeper coloured glows instead of dark patches
    if (it.blur) {
      const bc = parse(it.bgc);
      if (bc && bc.a > 0 && isLightSurface(bc)) set(el, 'background-color', css(glow(bc), bc.a * 0.55));
      if (it.bgi && it.bgi.includes('gradient')) {
        const g = it.bgi.replace(COLOR_RE, (m, fn, body) => { const c = parseFn(fn, body); return c && c.a > 0 && isLightSurface(c) ? css(glow(c), c.a * 0.55) : m; });
        if (g !== it.bgi) set(el, 'background-image', g);
      }
      stack[it.depth + 1] = parent;
      continue;
    }
    // background
    const bgc = parse(it.bgc);
    if (bgc && bgc.a > 0.35 && isLightSurface(bgc)) {
      const d = darkSurface(bgc);
      set(el, 'background-color', css(d, bgc.a));
      if (bgc.a > 0.6) surface = d.l;
    } else if (bgc && bgc.a > 0.6) {
      surface = lightness(bgc);
    }
    if (it.bgi && it.bgi !== 'none' && it.bgi.includes('gradient')) {
      if (it.clip) {
        const g = surface < 0.5 ? recolourGradient(it.bgi, true) : null;
        if (g) set(el, 'background-image', g);
      } else {
        const stops = [...it.bgi.matchAll(COLOR_RE)].map((m) => parseFn(m[1], m[2])).filter((c) => c && c.a > 0.6);
        const g = recolourGradient(it.bgi, false);
        if (g) set(el, 'background-image', g);
        if (stops.length) {
          const avgLight = stops.reduce((s, c) => s + (isLightSurface(c) ? 0.12 : lightness(c)), 0) / stops.length;
          surface = avgLight;
        }
      }
    }
    // text
    const col = parse(it.color);
    let out = it.color;
    if (col && surface < 0.5 && isDarkText(col) && !el.matches(KEEP_TEXT)) out = css(lightText(col), col.a);
    // (always written: buttons and many components set their own colour instead of inheriting it)
    if (out !== it.color) set(el, 'color', out);
    // borders and outlines
    if (it.bw) {
      for (const [side, v] of [['top', it.bt], ['right', it.br], ['bottom', it.bb], ['left', it.bl]]) {
        const c = parse(v);
        if (c && c.a > 0.2 && lightness(c) > 0.78 && surface < 0.5) set(el, `border-${side}-color`, `rgba(255, 255, 255, ${Math.min(0.14, c.a * 0.14).toFixed(3)})`);
      }
    }
    const node = { bg: surface, color: it.color, out };
    ctx.set(el, node);
    stack[it.depth + 1] = node;
  }
}

// While undoing and re-reading colours, CSS transitions must not run: otherwise the browser reports a colour
// half-way back to the light value, and cards and buttons end up stuck light or patchy.
function frozen(fn) {
  const root = document.documentElement;
  root.classList.add('dm-measure');
  try { fn(); } finally {
    void root.offsetWidth; // apply the final colours with transitions still off
    root.classList.remove('dm-measure');
    try {
      for (const a of document.getAnimations()) if (a.transitionProperty && /^(background|color|border)/.test(a.transitionProperty)) a.finish();
    } catch { /* older browsers */ }
  }
}

function contextFor(el) {
  for (let p = el.parentElement; p; p = p.parentElement) {
    if (p.matches(ART)) return null;
    const c = ctx.get(p);
    if (c) return c;
  }
  return { bg: PAGE_DARK.l, color: null, out: null };
}

function flush() {
  raf = 0;
  if (!active) { queued.clear(); checks.clear(); return; }
  const list = [...queued, ...checks];
  queued = new Set();
  checks = new Set();
  // only the outermost changed nodes
  const roots = list.filter((el) => el.isConnected && !list.some((o) => o !== el && o.isConnected && o.contains(el)));
  observer?.disconnect();
  frozen(() => {
    for (const el of roots) {
      const pc = contextFor(el);
      if (!pc) continue;
      undoTree(el);
      processTree(el, pc.bg, pc);
    }
  });
  observe();
}
const schedule = () => { if (!raf) raf = requestAnimationFrame(flush); };
const onTransitionEnd = (e) => {
  // A colour finished transitioning (often from a value read mid-transition). Re-check, unless we wrote that
  // property ourselves (our own writes animate too, and must not loop).
  const prop = e.propertyName;
  if (!/^(background|color|border)/.test(prop) || !(e.target instanceof Element)) return;
  const mine = writes.get(e.target);
  if (mine && mine.some((w) => w.prop.split('-')[0] === prop.split('-')[0])) return;
  checks.add(e.target);
  schedule();
};
function observe() {
  if (!observer) {
    observer = new MutationObserver((recs) => {
      for (const r of recs) {
        if (r.type === 'childList') { for (const n of r.addedNodes) if (n.nodeType === 1) queued.add(n); }
        else if (r.target.nodeType === 1) checks.add(r.target);
      }
      if (queued.size || checks.size) schedule();
    });
  }
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
}

export function applyMode(mode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (mode === 'dark') {
    root.setAttribute('data-mode', 'dark');
    active = true;
    observer?.disconnect();
    frozen(() => {
      for (const el of [...writes.keys()]) undo(el);
      processTree(document.body, PAGE_DARK.l, { bg: PAGE_DARK.l, color: null, out: null });
    });
    observe();
    document.addEventListener('transitionend', onTransitionEnd, true);
    // one more full pass once entrance animations and late-loading sections have settled
    settle.forEach(clearTimeout);
    const repass = () => {
      if (!active) return;
      observer?.disconnect();
      frozen(() => {
        for (const el of [...writes.keys()]) undo(el);
        processTree(document.body, PAGE_DARK.l, { bg: PAGE_DARK.l, color: null, out: null });
      });
      observe();
    };
    settle = [setTimeout(repass, 700), setTimeout(repass, 2200)];
  } else {
    active = false;
    root.removeAttribute('data-mode');
    observer?.disconnect();
    document.removeEventListener('transitionend', onTransitionEnd, true);
    settle.forEach(clearTimeout);
    frozen(() => { for (const el of [...writes.keys()]) undo(el); });
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', mode === 'dark' ? '#0c0d17' : '#0B1E5B');
}

export function setMode(mode) {
  try { localStorage.setItem(KEY, mode); } catch { /* storage blocked */ }
  applyMode(mode);
  window.dispatchEvent(new CustomEvent('mho-mode-change', { detail: mode }));
}
