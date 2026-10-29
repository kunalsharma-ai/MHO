import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/asset.js';
import { LANG_BY_CODE } from '../i18n/languages.js';

/**
 * Language transition — "diagnostic scan": a laser beam sweeps down the screen in the new language's colours,
 * leaving a scan grid behind it, while the greeting of the new language locks into focus in the centre.
 * ~1.1 s, skipped with prefers-reduced-motion.
 */
export default function LangWipe({ lang }) {
  const prev = useRef(lang);
  const [shot, setShot] = useState(null);
  useEffect(() => {
    if (prev.current === lang) return undefined;
    prev.current = lang;
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    setShot({ k: Date.now(), L: LANG_BY_CODE[lang] || LANG_BY_CODE.en });
    const id = setTimeout(() => setShot(null), 1250);
    return () => clearTimeout(id);
  }, [lang]);
  if (!shot) return null;
  const { L } = shot;
  return (
    <div key={shot.k} className="lscan" style={{ '--w1': L.dark.c1, '--w2': L.dark.c2, '--w3': L.dark.c3 }} aria-hidden="true">
      <i className="ls-veil" />
      <i className="ls-grid" />
      <i className="ls-beam" />
      <span className="ls-word" lang={L.code}>
        <img src={asset(`images/flags/${L.flag}.svg`)} width="44" height="44" alt="" />
        <b>{L.greet}</b>
        <small className="mono">{L.native} · {L.theme}</small>
      </span>
    </div>
  );
}
