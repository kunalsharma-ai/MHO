import { useEffect, useRef, useState } from 'react';
import { asset } from '../lib/asset.js';
import { LANG_BY_CODE } from '../lib/languages.js';

/** MyFrequentRewards language transition: a full-screen colour sweep in the new language's palette with its greeting. */
export default function LangWipe({ lang }) {
  const prev = useRef(lang);
  const [shot, setShot] = useState(null);
  useEffect(() => {
    if (prev.current === lang) return undefined;
    prev.current = lang;
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    setShot({ k: Date.now(), m: LANG_BY_CODE[lang] });
    const id = setTimeout(() => setShot(null), 1300);
    return () => clearTimeout(id);
  }, [lang]);
  if (!shot) return null;
  const { m } = shot;
  return (
    <div key={shot.k} className={'lwipe lw-' + m.motion} style={{ '--w1': m.palette[0], '--w2': m.palette[1], '--w3': m.palette[2] }} aria-hidden="true">
      <span className="lw-c c1" /><span className="lw-c c2" /><span className="lw-c c3" />
      <span className="lw-word" lang={m.code}>
        <img src={asset(`images/flags/${m.flag}.svg`)} width="48" height="48" alt="" />
        {m.greet}
      </span>
    </div>
  );
}
