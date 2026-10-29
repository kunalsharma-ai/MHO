import { useCallback, useEffect, useState } from 'react';

// Returns [ref, inView]. `ref` is a callback ref, so it also works for elements that mount later
// (e.g. a section that renders only once its data arrives).
// once = true  → latch true after the first appearance (entrance animations).
// once = false → follow visibility (pause timers/animations while off-screen).
export default function useInView({ once = true, rootMargin = '0px 0px -10% 0px', threshold = 0.2 } = {}) {
  const [el, setEl] = useState(null);
  const [inView, setInView] = useState(false);
  const ref = useCallback((node) => setEl(node), []);
  useEffect(() => {
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [el, once, rootMargin, threshold]);
  return [ref, inView];
}
