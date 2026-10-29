import { useEffect, useId, useRef } from 'react';
import { useFinePointer, usePauseOffscreen, useReducedMotion } from '../hooks/index.js';
import { Icon } from './Icon.jsx';

const LAYERS = Array.from({ length: 12 }, (_, i) => i);
export const HEART_PATH = 'M50 88 C 22 68 3 50 3 28 C 3 13 14 3 28 3 C 38 3 45 9 50 17 C 55 9 62 3 72 3 C 86 3 97 13 97 28 C 97 50 78 68 50 88 Z';

/** Hero emblem: an extruded, beating 3D heart with a live ECG trace and orbiting "plus" sparkles. Pure CSS 3D. */
export function HeartEmblem() {
  const stage = usePauseOffscreen();
  const tilt = useRef(null);
  const fine = useFinePointer();
  const rm = useReducedMotion();
  const gid = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  useEffect(() => {
    const host = stage.current, t = tilt.current;
    if (!host || !t || !fine || rm) return;
    let raf = 0;
    const move = (e) => {
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; t.style.transform = `rotateX(${(-y * 18).toFixed(2)}deg) rotateY(${(x * 26).toFixed(2)}deg)`; });
    };
    const leave = () => { t.style.transform = ''; };
    host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave);
    return () => { host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, [fine, rm, stage]);

  return (
    <div className="hrt" ref={stage} aria-hidden="true">
      <div className="hrt-pulse"><i /><i /><i /></div>
      <div className="hrt-tilt" ref={tilt}>
        <div className="hrt-beat">
          {LAYERS.map((i) => <i key={i} className="hrt-layer" style={{ transform: `translateZ(${-i * 1.8}px)` }} />)}
          <svg className="hrt-face" viewBox="0 0 100 92">
            <defs>
              <linearGradient id={`${gid}g`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E53935" /><stop offset=".55" stopColor="#F97316" /><stop offset="1" stopColor="#FBBF24" /></linearGradient>
              <radialGradient id={`${gid}h`} cx=".3" cy=".25" r=".6"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
            </defs>
            <path d={HEART_PATH} fill={`url(#${gid}g)`} stroke="#fff" strokeWidth="3" />
            <path d={HEART_PATH} fill={`url(#${gid}h)`} />
            <path className="hrt-ecg" d="M8 46 H30 L36 34 L42 58 L50 18 L58 70 L64 46 H92" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="hrt-orbit"><span className="pl p1"><Icon name="plus" /></span><span className="pl p2"><Icon name="plus" /></span><span className="pl p3"><Icon name="spark" /></span></div>
      </div>
    </div>
  );
}
