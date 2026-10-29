import { LANG_BY_CODE } from '../i18n/languages.js';
import { hostEl, isEmbedded } from './host.js';

function hexToRgb(h) {
  const n = parseInt(h.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** Writes the language palette for the current light/dark mode into CSS custom properties. */
export function applyTheme(lang, mode) {
  const L = LANG_BY_CODE[lang] || LANG_BY_CODE.en;
  const p = L[mode] || L.light;
  const r = hostEl();
  if (!r) return;
  r.dataset.theme = mode;
  r.dataset.lang = L.code;
  r.style.setProperty('--c1', p.c1);
  r.style.setProperty('--c2', p.c2);
  r.style.setProperty('--c3', p.c3);
  r.style.setProperty('--c1-rgb', hexToRgb(p.c1));
  r.style.setProperty('--c2-rgb', hexToRgb(p.c2));
  r.style.setProperty('--c3-rgb', hexToRgb(p.c3));
  r.style.setProperty('--bg', p.bg);
  r.style.setProperty('--bg2', p.bg2);
  if (!isEmbedded()) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#0A1030');
  }
}
