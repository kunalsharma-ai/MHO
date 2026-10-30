import { useEffect, useRef, useState, useCallback } from 'react';

/** true when the user asked the OS for reduced motion */
export function useReducedMotion() {
  const q = '(prefers-reduced-motion: reduce)';
  const [rm, setRm] = useState(() => typeof window !== 'undefined' && window.matchMedia?.(q).matches);
  useEffect(() => {
    const m = window.matchMedia?.(q); if (!m) return;
    const on = () => setRm(m.matches);
    m.addEventListener?.('change', on);
    return () => m.removeEventListener?.('change', on);
  }, []);
  return rm;
}

/** true on mouse/trackpad devices (hover effects and tilt are skipped on touch screens) */
export function useFinePointer() {
  const [fine] = useState(() => typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches);
  return fine;
}

/** Sets data-paused on the element while it is off screen so its CSS animations stop (saves CPU/battery). */
export function usePauseOffscreen() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.removeAttribute('data-paused'); else el.setAttribute('data-paused', '');
    }, { rootMargin: '120px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Locks page scroll while a modal is open, without the layout jumping (scrollbar compensation). */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const gap = window.innerWidth - html.clientWidth;
    const prev = { o: html.style.overflow, p: html.style.paddingRight };
    html.style.overflow = 'hidden';
    if (gap > 0) html.style.paddingRight = `${gap}px`;
    return () => { html.style.overflow = prev.o; html.style.paddingRight = prev.p; };
  }, [active]);
}

/** Keeps Tab focus inside `ref` and restores focus to the opener on close. */
export function useFocusTrap(ref, active, onEscape) {
  const escRef = useRef(onEscape);
  escRef.current = onEscape;
  useEffect(() => {
    if (!active) return;
    const opener = document.activeElement;
    const sel = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); escRef.current?.(); return; }
      if (e.key !== 'Tab' || !ref.current) return;
      const f = [...ref.current.querySelectorAll(sel)].filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      if (opener && opener.focus && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [active, ref]);
}

/** Countdown in whole seconds until `until` (ms timestamp). */
export function useCountdown(until) {
  const [left, setLeft] = useState(() => Math.max(0, Math.ceil((until - Date.now()) / 1000)));
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, Math.ceil((until - Date.now()) / 1000)));
    tick();
    if (until <= Date.now()) return;
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [until]);
  return left;
}

/** Stable callback that always sees the latest props/state. */
export function useEvent(fn) {
  const r = useRef(fn);
  r.current = fn;
  return useCallback((...a) => r.current(...a), []);
}
