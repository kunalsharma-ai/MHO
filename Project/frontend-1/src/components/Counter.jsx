// Number that counts up when scrolled into view. Renders the final value on the server (SEO/no-JS).
import { useEffect, useState } from 'react';
import { useInView, useMounted } from './ui.jsx';

export default function Counter({ value, prefix = '', suffix = '', duration = 1400 }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const mounted = useMounted();
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!mounted) return;
    if (!inView) { setN(0); return; }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setN(value); return; }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, mounted, value, duration]);
  return (
    <span ref={ref} className="counter">
      {prefix}{n.toLocaleString('en-US')}{suffix}
    </span>
  );
}
