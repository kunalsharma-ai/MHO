/**
 * i18n: UI strings are bundled (src/i18n/*.js) so the first paint is already
 * in the right language. Question & option texts are fetched per language
 * from public/data/i18n/<lang>.json (key = English text).
 */
import { createContext, useContext } from 'react';
import { UI } from '../i18n/index.js';

export const I18nCtx = createContext(null);

export function makeT(lang, content) {
  const ui = UI[lang] || UI.en;
  const nf = (() => {
    try { return new Intl.NumberFormat(lang === 'zh' ? 'zh-CN' : lang); } catch { return new Intl.NumberFormat('en'); }
  })();
  let regions = null;
  try { regions = new Intl.DisplayNames([lang === 'zh' ? 'zh-CN' : lang], { type: 'region' }); } catch {}

  const fill = (s, p) => (p ? s.replace(/\{(\w+)\}/g, (m, k) => (p[k] ?? m)) : s);
  const t = (key, p) => fill(ui[key] ?? UI.en[key] ?? key, p);

  /** translate content text (question / option label) */
  const tc = (s) => {
    if (s == null) return '';
    const hit = content[s];
    if (hit) return hit;
    let m = /^Up to (\d+)$/.exec(s);
    if (m) return t('fmt.upTo', { n: nf.format(+m[1]) });
    m = /^(\d+) and above$/.exec(s);
    if (m) return t('fmt.andAbove', { n: nf.format(+m[1]) });
    m = /^(\d{4,})-(\d{4,})$/.exec(s);
    if (m) return nf.format(+m[1]) + ' – ' + nf.format(+m[2]);
    return s;
  };
  /** country name from ISO code via Intl, fallback to English label */
  const country = (code, fallback) => {
    if (lang === 'en' && fallback && fallback !== code) return fallback;
    try { return regions?.of(code) || fallback; } catch { return fallback; }
  };
  return { lang, t, tc, country, nf };
}

export const useI18n = () => useContext(I18nCtx);
