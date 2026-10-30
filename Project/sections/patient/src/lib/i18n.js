/**
 * i18n: UI strings are bundled per language (src/i18n/*.js, loaded on demand). Question & option texts are
 * fetched per language from data/i18n/<lang>.json (key = English text). The 80 extra languages are
 * translated at runtime by lib/autotranslate.js (English is shown until a translation arrives).
 */
import { createContext, useContext } from 'react';
import { UI } from '../i18n/index.js';
import { isFull, intlTag } from './languages.js';
import { peek, request } from './autotranslate.js';

export const I18nCtx = createContext(null);

export function makeT(lang, content) {
  const full = isFull(lang);
  const ui = full ? UI[lang] || UI.en : UI.en;
  const tag = intlTag(lang);
  const nf = (() => { try { return new Intl.NumberFormat(tag); } catch { return new Intl.NumberFormat('en'); } })();
  let regions = null;
  try { regions = new Intl.DisplayNames([tag], { type: 'region' }); } catch {}

  const fill = (s, p) => (p ? s.replace(/\{(\w+)\}/g, (m, k) => (p[k] ?? m)) : s);
  const auto = (s) => {
    if (full || lang === 'en' || !s) return s;
    const hit = peek(s, lang);
    if (hit) return hit;
    request(s, lang);
    return s;
  };
  const t = (key, p) => fill(full ? ui[key] ?? UI.en[key] ?? key : auto(UI.en[key] ?? key), p);

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
    return auto(s);
  };
  /** country / region name from ISO code via Intl, fallback to the English label */
  const country = (code, fallback) => {
    if (lang === 'en' && fallback && fallback !== code) return fallback;
    try { return regions?.of(code) || fallback || code; } catch { return fallback || code; }
  };
  const date = (d, o = { day: 'numeric', month: 'short', year: 'numeric' }) => {
    try { return new Intl.DateTimeFormat(tag, o).format(d); } catch { return new Date(d).toDateString(); }
  };
  return { lang, tag, t, tc, country, nf, date, full };
}

export const useI18n = () => useContext(I18nCtx);
