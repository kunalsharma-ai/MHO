import { memo, useEffect, useRef, useState } from 'react';
import { sound } from '../lib/sound.js';

/**
 * Rolling odometer counter: each digit is a vertical reel that spins to its new value (transform only).
 * <Counter value={150} format={(n) => nf.format(n)} />
 */
function Counter({ value, format = String, className = '', ticks = false, label }) {
  const [shown, setShown] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const from = prev.current;
    prev.current = value;
    if (from === value) return undefined;
    const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof value !== 'number' || typeof from !== 'number') { setShown(value); return undefined; }
    const steps = Math.max(1, Math.min(12, Math.abs(value - from)));
    let k = 0;
    const id = setInterval(() => {
      k++;
      setShown(k >= steps ? value : Math.round(from + ((value - from) * k) / steps));
      if (ticks && k % 2) sound.flap();
      if (k >= steps) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [value, ticks]);
  const text = format(shown);
  return (
    <span className={'odo ' + className} aria-label={label || format(value)} role="img">
      {[...text].map((ch, i) => {
        const d = /\d/.test(ch);
        return d ? (
          <span key={text.length - i} className="odo-d" aria-hidden="true">
            <span className="odo-reel" style={{ transform: `translateY(${-ch * 10}%)` }}>
              {'0123456789'.split('').map((n) => <i key={n}>{n}</i>)}
            </span>
          </span>
        ) : (
          <span key={'s' + (text.length - i)} className="odo-s" aria-hidden="true">{ch}</span>
        );
      })}
    </span>
  );
}
export default memo(Counter);
