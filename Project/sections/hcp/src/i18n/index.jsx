import { PROFILE_BY_SLUG } from '../lib/engine.js';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from './en.js';
import { LANG_BY_CODE } from './languages.js';
import { loadJSON } from '../lib/loader.js';
import { hostEl } from '../lib/host.js';

const cache = { en };
const I18nCtx = createContext(null);

function interpolate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
}

export function I18nProvider({ lang, children }) {
  const [dict, setDict] = useState(cache[lang] || en);
  const [ready, setReady] = useState(Boolean(cache[lang]));

  useEffect(() => {
    let alive = true;
    const meta = LANG_BY_CODE[lang] || LANG_BY_CODE.en;
    const h = hostEl();
    h.lang = lang;
    h.dir = meta.dir;
    if (cache[lang]) { setDict(cache[lang]); setReady(true); return; }
    setReady(false);
    loadJSON(`locales/${lang}.json`)
      .then((d) => { cache[lang] = d; if (alive) { setDict(d); setReady(true); } })
      .catch(() => { if (alive) { setDict(en); setReady(true); } });
    return () => { alive = false; };
  }, [lang]);

  const api = useMemo(() => {
    const t = (key, vars) => interpolate(dict.ui?.[key] ?? en.ui[key] ?? key, vars);
    const list = (key) => t(key).split('|');
    const q = (name, fallback) => dict.questions?.[name] ?? en.questions[name] ?? fallback;
    const o = (label) => dict.options?.[label] ?? en.options[label] ?? label;
    const p = (slug, field = 'name') => dict.profiles?.[slug]?.[field] ?? en.profiles[slug]?.[field] ?? (field === 'name' ? PROFILE_BY_SLUG[slug]?.name : undefined) ?? slug;
    let df = null;
    try { df = new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : lang, { day: 'numeric', month: 'short', year: 'numeric' }); } catch { /* old browser */ }
    const fmtDate = (ts) => (df ? df.format(new Date(ts)) : new Date(ts).toDateString());
    let nf = null;
    try { nf = new Intl.NumberFormat(lang === 'zh' ? 'zh-CN' : lang); } catch { /* old browser */ }
    const fmtNum = (n) => (nf ? nf.format(n) : String(n));
    return { t, list, q, o, p, lang, ready, fmtDate, fmtNum };
  }, [dict, lang, ready]);

  return <I18nCtx.Provider value={api}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
