/**
 * Languages — the MyFrequentRewards language system, carried over to MyHealthOpinions.
 *
 *  • 12 FULLY translated languages (interface + every question and option, hand-checked), each with its own
 *    colour palette, instrument and signature melody.
 *  • 80 more languages from the MyFrequentRewards catalogue, translated at runtime (lib/autotranslate.js):
 *    your translation endpoint (config.translateEndpoint) or the browser's on-device translator; English
 *    is shown until a translation is available, so nothing ever breaks.
 *  • Choosing a language: searchable picker → full-screen colour wipe with the greeting and flag of the
 *    new language → its signature melody → a toast. (components/LanguagePicker.jsx, LangWipe.jsx)
 *
 * palette: [primary, secondary, tertiary]
 * sound:   instrument + musical scale (semitones from root) + motif (scale steps) – used for taps
 */
import { setRootAttrs, setRootVars } from './root.js';
import { EXTRA_LANGS } from './languages-extra.js';

export const LANGS = [
  {
    code: 'en', full: true, hi: 'Hello', name: 'English', native: 'English', flag: 'gb', dir: 'ltr',
    vibe: 'Aurora Teal (logo colours)',
    palette: ['#0F7EA8', '#F2611B', '#8B5CF6'],
    sound: { inst: 'chime', root: 523.25, scale: [0, 2, 4, 7, 9, 12, 14, 16], motif: [0, 2, 4, 5, 7], tempo: 0.085 },
  },
  {
    code: 'zh', full: true, hi: '你好', name: 'Chinese', native: '中文', flag: 'cn', dir: 'ltr',
    vibe: 'Lacquer & Gold',
    palette: ['#e3172d', '#f2a900', '#0a8f6a'],
    sound: { inst: 'guzheng', root: 392.0, scale: [0, 2, 4, 7, 9, 12, 14, 16, 19], motif: [4, 3, 2, 4, 6, 5], tempo: 0.11 },
  },
  {
    code: 'es', full: true, hi: '¡Hola!', name: 'Spanish', native: 'Español', flag: 'es', dir: 'ltr',
    vibe: 'Fiesta Sunset',
    palette: ['#ff5e1a', '#e6007e', '#ffb800'],
    sound: { inst: 'guitar', root: 329.63, scale: [0, 1, 4, 5, 7, 8, 10, 12], motif: [7, 6, 5, 4, 3, 1, 0], tempo: 0.075, strum: true },
  },
  {
    code: 'hi', full: true, hi: 'नमस्ते', name: 'Hindi', native: 'हिन्दी', flag: 'in', dir: 'ltr',
    vibe: 'Marigold Peacock',
    palette: ['#ff8a00', '#0b6fb3', '#d6246e'],
    sound: { inst: 'sitar', root: 277.18, scale: [0, 1, 4, 5, 7, 8, 11, 12], motif: [0, 1, 2, 4, 3, 2, 1, 0], tempo: 0.1, drone: true },
  },
  {
    code: 'ar', full: true, hi: 'مرحبا', name: 'Arabic', native: 'العربية', flag: 'ae', dir: 'rtl',
    vibe: 'Desert Oasis',
    palette: ['#00897b', '#c9a227', '#7b3fa0'],
    sound: { inst: 'oud', root: 293.66, scale: [0, 1, 4, 5, 7, 8, 10, 12], motif: [4, 3, 2, 1, 2, 0], tempo: 0.12 },
  },
  {
    code: 'fr', full: true, hi: 'Bonjour', name: 'French', native: 'Français', flag: 'fr', dir: 'ltr',
    vibe: 'Lavande Riviera',
    palette: ['#7b61ff', '#2f9df4', '#ff6f9f'],
    sound: { inst: 'accordion', root: 440.0, scale: [0, 2, 4, 5, 7, 9, 11, 12], motif: [0, 2, 4, 7, 4, 2], tempo: 0.12 },
  },
  {
    code: 'de', full: true, hi: 'Hallo', name: 'German', native: 'Deutsch', flag: 'de', dir: 'ltr',
    vibe: 'Black Forest Amber',
    palette: ['#2e7d32', '#ffa000', '#37474f'],
    sound: { inst: 'glockenspiel', root: 659.25, scale: [0, 2, 4, 5, 7, 9, 11, 12], motif: [0, 4, 7, 4, 0], tempo: 0.1 },
  },
  {
    code: 'pt', full: true, hi: 'Olá', name: 'Portuguese', native: 'Português', flag: 'br', dir: 'ltr',
    vibe: 'Tropicália',
    palette: ['#00a651', '#f7c600', '#0096d6'],
    sound: { inst: 'marimba', root: 349.23, scale: [0, 2, 4, 7, 9, 11, 12, 14], motif: [0, 2, 1, 3, 2, 4], tempo: 0.09, swing: true },
  },
  {
    code: 'ja', full: true, hi: 'こんにちは', name: 'Japanese', native: '日本語', flag: 'jp', dir: 'ltr',
    vibe: 'Sakura Indigo',
    palette: ['#ff6f91', '#2c3e9e', '#e5383b'],
    sound: { inst: 'koto', root: 440.0, scale: [0, 2, 3, 7, 8, 12, 14, 15], motif: [5, 4, 3, 2, 3, 0], tempo: 0.13 },
  },
  {
    code: 'ko', full: true, hi: '안녕하세요', name: 'Korean', native: '한국어', flag: 'kr', dir: 'ltr',
    vibe: 'Hanbok Neon',
    palette: ['#1e4fff', '#ff2e88', '#14c79a'],
    sound: { inst: 'gayageum', root: 370.0, scale: [0, 2, 5, 7, 9, 12, 14, 17], motif: [0, 2, 4, 3, 5, 4], tempo: 0.11, vibrato: true },
  },
  {
    code: 'ru', full: true, hi: 'Привет', name: 'Russian', native: 'Русский', flag: 'ru', dir: 'ltr',
    vibe: 'Winter Palace',
    palette: ['#3d5afe', '#8e24aa', '#c99a06'],
    sound: { inst: 'balalaika', root: 293.66, scale: [0, 2, 3, 5, 7, 8, 10, 12], motif: [0, 2, 4, 5, 4, 7], tempo: 0.09, tremolo: true },
  },
  {
    code: 'it', full: true, hi: 'Ciao', name: 'Italian', native: 'Italiano', flag: 'it', dir: 'ltr',
    vibe: 'Amalfi Citrus',
    palette: ['#f2b705', '#d35400', '#0277bd'],
    sound: { inst: 'mandolin', root: 392.0, scale: [0, 2, 4, 5, 7, 9, 11, 12], motif: [0, 4, 7, 9, 7, 12], tempo: 0.085, tremolo: true },
  },
];

export const ALL_LANGS = [...LANGS, ...EXTRA_LANGS.map((l) => ({ ...l, full: false }))];
export const LANG_BY_CODE = Object.fromEntries(ALL_LANGS.map((l) => [l.code, l]));
export const isFull = (code) => !!LANG_BY_CODE[code]?.full;
/** BCP-47 tag for Intl APIs */
export const intlTag = (code) => (code === 'zh' ? 'zh-CN' : code);

/** map any browser / URL tag to a supported language code ('pt-BR' → 'pt', 'zh-Hant' → 'zh-TW', 'sv-SE' → 'sv') */
export function matchLang(tag) {
  if (!tag) return null;
  const t = String(tag).trim();
  if (LANG_BY_CODE[t]) return t;
  const low = t.toLowerCase();
  if (/^zh-(tw|hk|mo|hant)/.test(low)) return 'zh-TW';
  if (low.startsWith('zh')) return 'zh';
  const hit = ALL_LANGS.find((l) => l.code.toLowerCase() === low);
  if (hit) return hit.code;
  const base = low.split('-')[0];
  if (base === 'fil' || base === 'tl') return LANG_BY_CODE.fil ? 'fil' : null;
  return LANG_BY_CODE[base] ? base : null;
}

/** Pick the best language: ?lang= → saved → browser languages (fully translated ones first) → English */
export function detectLanguage(saved, preferred) {
  try {
    const q = matchLang(new URLSearchParams(location.search).get('lang'));
    if (q) return q;
  } catch {}
  if (saved && LANG_BY_CODE[saved]) return saved;
  const p = matchLang(preferred);
  if (p) return p;
  const list = (typeof navigator !== 'undefined' && (navigator.languages || [navigator.language])) || [];
  for (const l of list) { const m = matchLang(l); if (m && isFull(m)) return m; }
  return 'en';
}

/** Apply palette + direction to the section roots (never to the host page). */
export function applyLanguage(code) {
  const l = LANG_BY_CODE[code] || LANGS[0];
  setRootAttrs({ lang: intlTag(l.code), dir: l.dir, 'data-lang': l.code });
  setRootVars({ '--l1': l.palette[0], '--l2': l.palette[1], '--l3': l.palette[2] });
}
