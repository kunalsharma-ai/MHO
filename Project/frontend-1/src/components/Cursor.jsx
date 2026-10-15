// "Pulse comet" cursor (the original trail design, rebuilt for speed and visibility).
// - The real mouse pointer stays visible, so the cursor can never feel laggy, even on a busy page.
// - A glowing ring sits on the pointer, a short comet trail follows it, links/buttons make the ring
//   bloom orange, and every click throws a small burst of hearts.
// - White outline + glow keep it visible on light AND dark sections, above modals and the chat.
// - Desktop (fine pointer) only; off for touch screens and prefers-reduced-motion. Sleeps when idle.
import { useEffect, useRef } from 'react';

const TRAIL = 8;

export default function Cursor() {
  const ring = useRef(null);
  const trail = useRef([]);
  const fx = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    document.documentElement.classList.add('has-cursor');

    const pts = Array.from({ length: TRAIL }, () => ({ x: -200, y: -200 }));
    let mx = -200, my = -200, raf = 0, still = 0, hover = false;

    const loop = () => {
      if (ring.current) ring.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      let px = mx, py = my, moving = false;
      for (let i = 0; i < TRAIL; i++) {
        const p = pts[i];
        const k = 0.62 - i * 0.05;
        p.x += (px - p.x) * k;
        p.y += (py - p.y) * k;
        if (Math.abs(px - p.x) + Math.abs(py - p.y) > 0.4) moving = true;
        const el = trail.current[i];
        if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${1 - i / (TRAIL + 1)})`;
        px = p.x;
        py = p.y;
      }
      raf = moving || still++ < 3 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      still = 0;
      ring.current?.classList.remove('is-hidden');
      if (!raf) raf = requestAnimationFrame(loop);
      const t = e.target;
      const h = !!(t.closest && t.closest('a, button, [role="button"], [role="tab"], label, summary, select, .is-clickable'));
      if (h !== hover) {
        hover = h;
        ring.current?.classList.toggle('is-hover', h);
      }
    };
    const onDown = (e) => {
      ring.current?.classList.add('is-down');
      const host = fx.current;
      if (!host) return;
      const b = document.createElement('span');
      b.className = 'pc-burst';
      b.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      b.innerHTML = '<i></i><i></i><i></i><i></i><i></i><i></i>';
      host.appendChild(b);
      setTimeout(() => b.remove(), 700);
    };
    const onUp = () => ring.current?.classList.remove('is-down');
    const onLeave = () => ring.current?.classList.add('is-hidden');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="pc-layer" aria-hidden="true">
      {Array.from({ length: TRAIL }).map((_, i) => (
        <span key={i} className="pc-trail" ref={(el) => (trail.current[i] = el)} style={{ '--i': i }} />
      ))}
      <span className="pc-ring is-hidden" ref={ring}>
        <i className="pc-halo" />
        <i className="pc-dot" />
      </span>
      <span ref={fx} />
    </div>
  );
}
