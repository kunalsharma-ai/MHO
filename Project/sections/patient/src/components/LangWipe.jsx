import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { LANG_BY_CODE } from '../lib/languages.js';
import { countryFlag } from '../lib/asset.js';
import { getLayer } from '../lib/root.js';

/** MyFrequentRewards language wipe: a short full-screen colour sweep in the new language's palette with its greeting and flag. */
export default function LangWipe({ lang }) {
  const prev = useRef(lang);
  const [shot, setShot] = useState(null);
  useEffect(() => {
    if (prev.current === lang) return undefined;
    prev.current = lang;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    setShot({ k: Date.now(), l: LANG_BY_CODE[lang] });
    const id = setTimeout(() => setShot(null), 1300);
    return () => clearTimeout(id);
  }, [lang]);
  if (!shot) return null;
  const { l } = shot;
  return createPortal(
    <div key={shot.k} className="lwipe" style={{ '--w1': l.palette[0], '--w2': l.palette[1], '--w3': l.palette[2] }} aria-hidden="true">
      <span className="lw-c c1" /><span className="lw-c c2" /><span className="lw-c c3" />
      <span className="lw-word" lang={l.code} dir={l.dir}><img src={countryFlag(l.flag)} width="56" height="42" alt="" />{l.hi || l.native}</span>
    </div>,
    getLayer()
  );
}
