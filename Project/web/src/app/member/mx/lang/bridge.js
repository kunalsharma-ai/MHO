// The member area speaks the website's 42 languages (languages.js). The profile questionnaires (Project/sections)
// carry full translations for 12 of them; for the others they stay in English.
const MAP = { en: "en", hi: "hi", es: "es", fr: "fr", de: "de", pt: "pt", it: "it", ar: "ar", "zh-CN": "zh", ja: "ja", ko: "ko", ru: "ru" };
export const SECTION_LANGS = new Set(Object.keys(MAP));
/** Language code to hand to a profile section ("zh-CN" → "zh"); English when the section has no translation. */
export const sectionLang = (code) => MAP[code] || "en";
