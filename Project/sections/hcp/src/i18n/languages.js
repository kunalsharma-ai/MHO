// Every language has its own flag, palette (light + dark), and sound signature.
// Palette keys: c1 primary, c2 secondary, c3 accent. bg/bg2 are page tints.
// Sound: scale = semitone offsets from root (Hz), wave = oscillator timbre,
// style = playback character used by src/lib/sound.js.

export const LANGUAGES = [
  {
    code: 'en', name: 'English', native: 'English', flag: 'gb', dir: 'ltr',
    theme: 'Clinical Aurora',
    light: { c1: '#0aa89b', c2: '#4f46e5', c3: '#ff6b6b', bg: '#f3fbfa', bg2: '#eef0ff' },
    dark:  { c1: '#2de2cf', c2: '#8b85ff', c3: '#ff8a8a', bg: '#061317', bg2: '#0d0f2a' },
    sound: { root: 523.25, scale: [0, 4, 7, 12, 16], wave: 'triangle', style: 'arp' },
  },
  {
    code: 'zh', name: 'Chinese', native: '简体中文', flag: 'cn', dir: 'ltr',
    theme: 'Imperial Jade',
    light: { c1: '#d62839', c2: '#0f9d76', c3: '#e8a400', bg: '#fff6f4', bg2: '#effaf5' },
    dark:  { c1: '#ff5a6a', c2: '#2fd6a4', c3: '#ffc93c', bg: '#1a0709', bg2: '#04170f' },
    sound: { root: 392.0, scale: [0, 2, 4, 7, 9, 12], wave: 'sine', style: 'gong' },
  },
  {
    code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: 'in', dir: 'ltr',
    theme: 'Saffron Monsoon',
    light: { c1: '#f26b00', c2: '#0e7490', c3: '#d6336c', bg: '#fff7ef', bg2: '#ecf8fb' },
    dark:  { c1: '#ff9a3d', c2: '#22c3e6', c3: '#ff5c95', bg: '#1a0d02', bg2: '#03161b' },
    sound: { root: 293.66, scale: [0, 1, 4, 7, 8, 12], wave: 'sawtooth', style: 'sitar' },
  },
  {
    code: 'es', name: 'Spanish', native: 'Español', flag: 'es', dir: 'ltr',
    theme: 'Sevilla Sunset',
    light: { c1: '#e11d48', c2: '#f59e0b', c3: '#7c3aed', bg: '#fff5f6', bg2: '#fff9ec' },
    dark:  { c1: '#ff4d73', c2: '#ffbf3c', c3: '#a78bfa', bg: '#1b0509', bg2: '#1a1203' },
    sound: { root: 329.63, scale: [0, 1, 4, 5, 7, 8], wave: 'triangle', style: 'guitar' },
  },
  {
    code: 'fr', name: 'French', native: 'Français', flag: 'fr', dir: 'ltr',
    theme: 'Riviera Lavender',
    light: { c1: '#7c4dff', c2: '#0ea5e9', c3: '#ec4899', bg: '#f7f4ff', bg2: '#eef8ff' },
    dark:  { c1: '#a98bff', c2: '#4cc9ff', c3: '#ff7ac0', bg: '#0f0820', bg2: '#04121c' },
    sound: { root: 440.0, scale: [0, 4, 7, 11, 14], wave: 'square', style: 'accordion' },
  },
  {
    code: 'de', name: 'German', native: 'Deutsch', flag: 'de', dir: 'ltr',
    theme: 'Bauhaus Precision',
    light: { c1: '#1d4ed8', c2: '#e3b505', c3: '#dc2626', bg: '#f3f6ff', bg2: '#fffbea' },
    dark:  { c1: '#5b8cff', c2: '#ffd43b', c3: '#ff5a5a', bg: '#050b1f', bg2: '#171302' },
    sound: { root: 659.25, scale: [0, 5, 7, 12, 17], wave: 'sine', style: 'glock' },
  },
  {
    code: 'ja', name: 'Japanese', native: '日本語', flag: 'jp', dir: 'ltr',
    theme: 'Sakura Night',
    light: { c1: '#e0457b', c2: '#4338ca', c3: '#65a30d', bg: '#fff4f8', bg2: '#f1f0ff' },
    dark:  { c1: '#ff7aa8', c2: '#8f86ff', c3: '#a3e635', bg: '#1a0610', bg2: '#0a0820' },
    sound: { root: 329.63, scale: [0, 1, 5, 7, 8, 12], wave: 'triangle', style: 'koto' },
  },
  {
    code: 'ar', name: 'Arabic', native: 'العربية', flag: 'sa', dir: 'rtl',
    theme: 'Desert Emerald',
    light: { c1: '#047857', c2: '#c8961a', c3: '#0891b2', bg: '#f1fbf6', bg2: '#fdf8ea' },
    dark:  { c1: '#22d39a', c2: '#f3c24d', c3: '#38d4f0', bg: '#03140d', bg2: '#181104' },
    sound: { root: 293.66, scale: [0, 1, 4, 5, 7, 8, 11], wave: 'triangle', style: 'oud' },
  },
  {
    code: 'pt', name: 'Portuguese', native: 'Português', flag: 'br', dir: 'ltr',
    theme: 'Amazon Carnival',
    light: { c1: '#15803d', c2: '#eab308', c3: '#0284c7', bg: '#f1fbf3', bg2: '#fffbe6' },
    dark:  { c1: '#3ee07a', c2: '#ffd43b', c3: '#38bdf8', bg: '#031608', bg2: '#171402' },
    sound: { root: 392.0, scale: [0, 2, 4, 7, 9, 12], wave: 'sine', style: 'marimba' },
  },
  {
    code: 'ru', name: 'Russian', native: 'Русский', flag: 'ru', dir: 'ltr',
    theme: 'Aurora Borealis',
    light: { c1: '#0e9fbf', c2: '#7c3aed', c3: '#2563eb', bg: '#f0fbfd', bg2: '#f5f0ff' },
    dark:  { c1: '#38e1ff', c2: '#a873ff', c3: '#6aa8ff', bg: '#02121a', bg2: '#0e0620' },
    sound: { root: 440.0, scale: [0, 2, 3, 7, 8, 12], wave: 'triangle', style: 'balalaika' },
  },
  {
    code: 'ko', name: 'Korean', native: '한국어', flag: 'kr', dir: 'ltr',
    theme: 'Seoul Neon',
    light: { c1: '#2563eb', c2: '#f43f5e', c3: '#14b8a6', bg: '#f2f6ff', bg2: '#fff2f4' },
    dark:  { c1: '#60a5ff', c2: '#ff5c7a', c3: '#2ee6cf', bg: '#030a1c', bg2: '#1c040a' },
    sound: { root: 349.23, scale: [0, 2, 5, 7, 9, 12], wave: 'sawtooth', style: 'neon' },
  },
  {
    code: 'it', name: 'Italian', native: 'Italiano', flag: 'it', dir: 'ltr',
    theme: 'Tuscan Terracotta',
    light: { c1: '#c2410c', c2: '#4d7c0f', c3: '#1d4ed8', bg: '#fff6f0', bg2: '#f4f9ec' },
    dark:  { c1: '#ff7a3d', c2: '#9be04a', c3: '#5b8cff', bg: '#1a0a03', bg2: '#0c1503' },
    sound: { root: 523.25, scale: [0, 4, 7, 9, 12], wave: 'triangle', style: 'mandolin' },
  },
];

export const LANG_BY_CODE = Object.fromEntries(LANGUAGES.map((l) => [l.code, l]));

export function detectLanguage() {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q && LANG_BY_CODE[q]) return q;
    for (const l of navigator.languages || [navigator.language]) {
      const c = String(l).slice(0, 2).toLowerCase();
      if (LANG_BY_CODE[c]) return c;
    }
  } catch { /* ignore */ }
  return 'en';
}

/** greeting shown in the language picker chips and in the scan-beam language transition */
const GREET = { en: 'Hello', zh: '你好', hi: 'नमस्ते', es: '¡Hola!', fr: 'Bonjour', de: 'Hallo', ja: 'こんにちは', ar: 'مرحبًا', pt: 'Olá', ru: 'Привет', ko: '안녕하세요', it: 'Ciao' };
LANGUAGES.forEach((l) => { l.greet = GREET[l.code] || 'Hello'; });
