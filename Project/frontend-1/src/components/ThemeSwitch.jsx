// Light / dark mode switch (footer). A day-sky track with clouds turns into a night sky with stars while the
// sun knob rolls across and becomes a crescent moon. The page change itself is revealed as a growing circle
// from the switch (View Transitions API where available), with a whoosh-and-chime sound (respects the
// header sound switch). The choice is remembered on this device. See utils/darkMode.js for how dark mode works.
import { useEffect, useState } from 'react';
import { applyMode, getMode, setMode } from '../utils/darkMode.js';

export default function ThemeSwitch() {
  const [mode, setM] = useState('light');
  useEffect(() => {
    const m = getMode();
    setM(m);
    if (m === 'dark') applyMode('dark');
    const h = (e) => setM(e.detail);
    window.addEventListener('mho-mode-change', h);
    return () => window.removeEventListener('mho-mode-change', h);
  }, []);

  const flip = (e) => {
    const next = mode === 'dark' ? 'light' : 'dark';
    import('../i18n/sounds.js').then((m) => m.playThemeSwitch(next === 'dark')).catch(() => {});
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) { setMode(next); return; }
    const r = e.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty('--vt-x', `${Math.round(r.left + r.width / 2)}px`);
    root.style.setProperty('--vt-y', `${Math.round(r.top + r.height / 2)}px`);
    root.classList.add('mode-vt');
    const t = document.startViewTransition(() => setMode(next));
    t.finished.finally(() => root.classList.remove('mode-vt'));
  };

  const dark = mode === 'dark';
  return (
    <button type="button" role="switch" aria-checked={dark} className={`tsw ${dark ? 'is-dark' : ''}`} onClick={flip} aria-label="Dark mode" data-mode-skip="">
      <span className="tsw-track" aria-hidden="true">
        <span className="tsw-stars"><i /><i /><i /><i /><i /><i /></span>
        <span className="tsw-clouds"><i /><i /></span>
        <span className="tsw-knob"><span className="tsw-crater" /><span className="tsw-crater" /><span className="tsw-crater" /></span>
      </span>
      <span className="tsw-tx" aria-hidden="true"><b>{dark ? 'Dark' : 'Light'}</b><small>{dark ? 'Switch to light' : 'Switch to dark'}</small></span>
    </button>
  );
}
