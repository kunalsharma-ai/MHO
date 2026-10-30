/**
 * Languages: each one has its own flag, colour palette (light + dark),
 * text direction and a unique sound signature.
 *
 * palette: [primary, secondary, tertiary]
 * sound:   instrument + musical scale (semitones from root) + motif (scale steps)
 *
 * To add a language:
 *   1. add an entry here
 *   2. add UI strings in src/i18n/ui.js
 *   3. add public/data/i18n/<code>.json (question & option translations)
 *   4. add public/images/flags/<flag>.svg
 */
import { hostEl, isEmbedded } from './host.js';

export const LANGS = [
  {
    code: 'en', name: 'English', native: 'English', flag: 'gb', dir: 'ltr',
    vibe: 'Heart Ember (logo colours)',
    palette: ['#E8401C', '#116A8E', '#F5A623'],
    sound: { inst: 'chime', root: 523.25, scale: [0, 2, 4, 7, 9, 12, 14, 16], motif: [0, 2, 4, 5, 7], tempo: 0.085 },
  },
  {
    code: 'zh', name: 'Chinese', native: '中文', flag: 'cn', dir: 'ltr',
    vibe: 'Lacquer & Gold',
    palette: ['#e3172d', '#f2a900', '#0a8f6a'],
    sound: { inst: 'guzheng', root: 392.0, scale: [0, 2, 4, 7, 9, 12, 14, 16, 19], motif: [4, 3, 2, 4, 6, 5], tempo: 0.11 },
  },
  {
    code: 'es', name: 'Spanish', native: 'Español', flag: 'es', dir: 'ltr',
    vibe: 'Fiesta Sunset',
    palette: ['#ff5e1a', '#e6007e', '#ffb800'],
    sound: { inst: 'guitar', root: 329.63, scale: [0, 1, 4, 5, 7, 8, 10, 12], motif: [7, 6, 5, 4, 3, 1, 0], tempo: 0.075, strum: true },
  },
  {
    code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: 'in', dir: 'ltr',
    vibe: 'Marigold Peacock',
    palette: ['#ff8a00', '#0b6fb3', '#d6246e'],
    sound: { inst: 'sitar', root: 277.18, scale: [0, 1, 4, 5, 7, 8, 11, 12], motif: [0, 1, 2, 4, 3, 2, 1, 0], tempo: 0.1, drone: true },
  },
  {
    code: 'ar', name: 'Arabic', native: 'العربية', flag: 'ae', dir: 'rtl',
    vibe: 'Desert Oasis',
    palette: ['#00897b', '#c9a227', '#7b3fa0'],
    sound: { inst: 'oud', root: 293.66, scale: [0, 1, 4, 5, 7, 8, 10, 12], motif: [4, 3, 2, 1, 2, 0], tempo: 0.12 },
  },
  {
    code: 'fr', name: 'French', native: 'Français', flag: 'fr', dir: 'ltr',
    vibe: 'Lavande Riviera',
    palette: ['#7b61ff', '#2f9df4', '#ff6f9f'],
    sound: { inst: 'accordion', root: 440.0, scale: [0, 2, 4, 5, 7, 9, 11, 12], motif: [0, 2, 4, 7, 4, 2], tempo: 0.12 },
  },
  {
    code: 'de', name: 'German', native: 'Deutsch', flag: 'de', dir: 'ltr',
    vibe: 'Black Forest Amber',
    palette: ['#2e7d32', '#ffa000', '#37474f'],
    sound: { inst: 'glockenspiel', root: 659.25, scale: [0, 2, 4, 5, 7, 9, 11, 12], motif: [0, 4, 7, 4, 0], tempo: 0.1 },
  },
  {
    code: 'pt', name: 'Portuguese', native: 'Português', flag: 'br', dir: 'ltr',
    vibe: 'Tropicália',
    palette: ['#00a651', '#f7c600', '#0096d6'],
    sound: { inst: 'marimba', root: 349.23, scale: [0, 2, 4, 7, 9, 11, 12, 14], motif: [0, 2, 1, 3, 2, 4], tempo: 0.09, swing: true },
  },
  {
    code: 'ja', name: 'Japanese', native: '日本語', flag: 'jp', dir: 'ltr',
    vibe: 'Sakura Indigo',
    palette: ['#ff6f91', '#2c3e9e', '#e5383b'],
    sound: { inst: 'koto', root: 440.0, scale: [0, 2, 3, 7, 8, 12, 14, 15], motif: [5, 4, 3, 2, 3, 0], tempo: 0.13 },
  },
  {
    code: 'ko', name: 'Korean', native: '한국어', flag: 'kr', dir: 'ltr',
    vibe: 'Hanbok Neon',
    palette: ['#1e4fff', '#ff2e88', '#14c79a'],
    sound: { inst: 'gayageum', root: 370.0, scale: [0, 2, 5, 7, 9, 12, 14, 17], motif: [0, 2, 4, 3, 5, 4], tempo: 0.11, vibrato: true },
  },
  {
    code: 'ru', name: 'Russian', native: 'Русский', flag: 'ru', dir: 'ltr',
    vibe: 'Winter Palace',
    palette: ['#3d5afe', '#8e24aa', '#c99a06'],
    sound: { inst: 'balalaika', root: 293.66, scale: [0, 2, 3, 5, 7, 8, 10, 12], motif: [0, 2, 4, 5, 4, 7], tempo: 0.09, tremolo: true },
  },
  {
    code: 'it', name: 'Italian', native: 'Italiano', flag: 'it', dir: 'ltr',
    vibe: 'Amalfi Citrus',
    palette: ['#f2b705', '#d35400', '#0277bd'],
    sound: { inst: 'mandolin', root: 392.0, scale: [0, 2, 4, 5, 7, 9, 11, 12], motif: [0, 4, 7, 9, 7, 12], tempo: 0.085, tremolo: true },
  },
];

/** greeting shown in the MyFrequentRewards-style language wipe + the colour-burst motion of each language */
const GREET = {
  en: ['Hello', 'float'], zh: ['你好', 'lantern'], es: ['¡Hola!', 'wave'], hi: ['नमस्ते', 'mandala'], ar: ['مرحبًا', 'drift'], fr: ['Bonjour', 'drift'],
  de: ['Hallo', 'bauhaus'], pt: ['Olá', 'samba'], ja: ['こんにちは', 'petals'], ko: ['안녕하세요', 'pop'], ru: ['Привет', 'zoom'], it: ['Ciao', 'wave'],
};
LANGS.forEach((l) => { l.greet = GREET[l.code][0]; l.motion = GREET[l.code][1]; });

export const LANG_BY_CODE = Object.fromEntries(LANGS.map((l) => [l.code, l]));

/** Pick the best language: ?lang= → saved → browser languages → English */
export function detectLanguage(saved) {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q && LANG_BY_CODE[q.toLowerCase()]) return q.toLowerCase();
  } catch {}
  if (saved && LANG_BY_CODE[saved]) return saved;
  const list = (typeof navigator !== 'undefined' && (navigator.languages || [navigator.language])) || [];
  for (const l of list) {
    const c = String(l || '').toLowerCase().split('-')[0];
    if (LANG_BY_CODE[c]) return c;
  }
  return 'en';
}

/** Apply palette + direction to <html>. Keeps first paint flicker-free (also done inline in index.html). */
export function applyLanguage(code) {
  const l = LANG_BY_CODE[code] || LANGS[0];
  const r = hostEl();
  r.lang = l.code === 'zh' ? 'zh-CN' : l.code;
  r.dir = l.dir;
  r.dataset.lang = l.code;
  r.style.setProperty('--l1', l.palette[0]);
  r.style.setProperty('--l2', l.palette[1]);
  r.style.setProperty('--l3', l.palette[2]);
  if (isEmbedded()) return;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', l.palette[0]);
}
