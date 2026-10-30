import en from './en.js';
import { loadUIJson } from '../lib/data.js';

/**
 * UI dictionaries. English is bundled; the other 11 fully translated languages are small JSON files
 * (data/ui/<lang>.json, generated from src/i18n/<lang>.js by the build) loaded on demand.
 * Missing keys fall back to English automatically.
 * Add / edit a language: edit src/i18n/<lang>.js and run the build.
 */
export const UI = { en };
export const UI_LANGS = ['zh', 'es', 'hi', 'ar', 'fr', 'de', 'pt', 'ja', 'ko', 'ru', 'it'];

export async function loadUI(lang) {
  if (UI[lang] || !UI_LANGS.includes(lang)) return UI[lang] || UI.en;
  try {
    UI[lang] = await loadUIJson(lang);
  } catch {
    return UI.en;
  }
  return UI[lang];
}
