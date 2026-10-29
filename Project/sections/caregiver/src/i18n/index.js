import en from './en.js';

/**
 * UI dictionaries. English is bundled; every other language is its own small
 * chunk (~10 KB) loaded on demand, so visitors only download their language.
 * Missing keys fall back to English automatically.
 * Add a language: create ./xx.js (copy en.js) and add it to LOADERS below.
 */
export const UI = { en };

const LOADERS = {
  zh: () => import('./zh.js'),
  es: () => import('./es.js'),
  hi: () => import('./hi.js'),
  ar: () => import('./ar.js'),
  fr: () => import('./fr.js'),
  de: () => import('./de.js'),
  pt: () => import('./pt.js'),
  ja: () => import('./ja.js'),
  ko: () => import('./ko.js'),
  ru: () => import('./ru.js'),
  it: () => import('./it.js'),
};

export async function loadUI(lang) {
  if (UI[lang] || !LOADERS[lang]) return UI[lang] || UI.en;
  try {
    UI[lang] = (await LOADERS[lang]()).default;
  } catch {
    return UI.en;
  }
  return UI[lang];
}
