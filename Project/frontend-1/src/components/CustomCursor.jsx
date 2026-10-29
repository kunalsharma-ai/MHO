import { useEffect, useRef } from 'react';

// Branded cursor (desktop / mouse only):
//  • a gradient dot that sits exactly on the pointer (no lag),
//  • a glowing ring that follows on a fast spring (smooth, never sluggish),
//  • a short comet trail in brand colours,
//  • grows into a soft "magnet" over links & buttons, squeezes on click with a ripple,
//  • hands back the normal text cursor inside inputs, hides when the mouse leaves the window.
// Visible on light and dark sections (white core outline + dark halo). One rAF loop that sleeps when idle.
// Touch devices and prefers-reduced-motion users keep their normal cursor.
const TRAIL = 5;
const INTERACTIVE = 'a, button, [role="button"], [role="tab"], label, select, summary, .ct-topic, .bx-bar, .flag-deck li';
const TEXTY = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]';

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const trail = useRef([]);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const p = { x: -100, y: -100 };
    const r = { x: -100, y: -100 };
    const t = Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 }));
    let raf = 0;
    let running = false;

    const loop = () => {
      // ring: fast spring (catches up within a few frames)
      r.x += (p.x - r.x) * 0.42;
      r.y += (p.y - r.y) * 0.42;
      ring.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
      // trail: each particle chases the one in front of it
      let px = p.x;
      let py = p.y;
      let moving = Math.abs(p.x - r.x) + Math.abs(p.y - r.y) > 0.2;
      t.forEach((q, i) => {
        q.x += (px - q.x) * 0.5;
        q.y += (py - q.y) * 0.5;
        if (Math.abs(px - q.x) + Math.abs(py - q.y) > 0.2) moving = true;
        const el = trail.current[i];
        if (el) el.style.transform = `translate3d(${q.x}px, ${q.y}px, 0)`;
        px = q.x;
        py = q.y;
      });
      if (moving) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const wake = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e) => {
      p.x = e.clientX;
      p.y = e.clientY;
      dot.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`; // instant
      root.classList.remove('cursor-out');
      const target = e.target;
      const texty = target.closest && target.closest(TEXTY);
      const hot = !texty && target.closest && target.closest(INTERACTIVE);
      root.classList.toggle('cursor-text', Boolean(texty));
      root.classList.toggle('cursor-hot', Boolean(hot));
      wake();
    };
    const onDown = () => {
      root.classList.add('cursor-down');
      const rip = document.createElement('span');
      rip.className = 'cursor-ripple';
      rip.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      document.body.appendChild(rip);
      setTimeout(() => rip.remove(), 600);
    };
    const onUp = () => root.classList.remove('cursor-down');
    const onLeave = () => root.classList.add('cursor-out');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      root.classList.remove('has-cursor', 'cursor-hot', 'cursor-text', 'cursor-down', 'cursor-out');
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      {Array.from({ length: TRAIL }, (_, i) => (
        <span key={i} className="cursor-trail" style={{ '--i': i }} ref={(el) => (trail.current[i] = el)} />
      ))}
      <span className="cursor-ring" ref={ring}><i /></span>
      <span className="cursor-dot" ref={dot} />
    </div>
  );
}
