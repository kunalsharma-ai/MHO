import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';

/** Rolls a number up/down smoothly (requestAnimationFrame, ~0.9s ease-out). */
export default function CountUp({ value, duration = 900, decimals = 0, prefix = '', className = '', start: startAt }) {
  const { fmtNum, lang } = useI18n();
  const [shown, setShown] = useState(startAt ?? value);
  const from = useRef(startAt ?? value);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    const b = value;
    if (a === b) return undefined;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const e = 1 - (1 - p) ** 3;
      setShown(a + (b - a) * e);
      if (p < 1) raf = requestAnimationFrame(tick); else from.current = b;
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); from.current = b; };
  }, [value, duration]);
  const text = decimals
    ? (() => { try { return new Intl.NumberFormat(lang, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(shown); } catch { return shown.toFixed(decimals); } })()
    : fmtNum(Math.round(shown));
  return <span className={`countup ${className}`}>{prefix}{text}</span>;
}
