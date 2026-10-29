import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { sound } from '../lib/sound.js';
import { safeStorage } from '../lib/format.js';
import { Icon } from '../components/Icon.jsx';

const AppCtx = createContext(null);
export const useApp = () => useContext(AppCtx);

function initialTheme(forced) {
  if (forced === 'light' || forced === 'dark') return forced;
  const saved = safeStorage.get('mho-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  const hostHint = document.documentElement.getAttribute('data-theme');
  if (hostHint === 'light' || hostHint === 'dark') return hostHint;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * Theme, sound, page mood (colour grading) and toasts.
 * Also installs the "sound on every click" listener on the app root.
 */
export function AppProvider({ children, rootRef, forcedTheme }) {
  const [theme, setThemeState] = useState(() => initialTheme(forcedTheme));
  const [soundOn, setSoundOn] = useState(() => safeStorage.get('mho-sound', true) !== false);
  const [mood, setMoodState] = useState('brand');
  const [toasts, setToasts] = useState([]);
  const lockRef = useRef(null);
  const baseRef = useRef('brand');

  useEffect(() => { sound.setEnabled(soundOn); safeStorage.set('mho-sound', soundOn); }, [soundOn]);
  useEffect(() => { safeStorage.set('mho-theme', theme); }, [theme]);

  const setTheme = useCallback((t) => { setThemeState(t); sound.play(t === 'dark' ? 'themeDark' : 'themeLight'); }, []);
  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);
  const toggleSound = useCallback(() => {
    setSoundOn((v) => { const nv = !v; sound.setEnabled(nv); if (nv) sound.play('toggle'); return nv; });
  }, []);

  /** setMood(k) previews a palette; setMood(null) returns to the locked or base mood */
  const setMood = useCallback((k) => setMoodState(k || lockRef.current || baseRef.current), []);
  const lockMood = useCallback((k) => { lockRef.current = k; setMoodState(k || baseRef.current); }, []);
  const setBaseMood = useCallback((k) => { baseRef.current = k; if (!lockRef.current) setMoodState(k); }, []);

  const toast = useCallback((msg, icon = 'spark') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t.slice(-1), { id, msg, icon }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  }, []);

  // Sound on every click. Elements can choose their sound with data-sfx="name" (or "none").
  useEffect(() => {
    const root = rootRef.current; if (!root) return;
    const onDown = () => sound.unlock();
    const onClick = (e) => {
      const el = e.target.closest?.('[data-sfx], button, a, [role="tab"], input, label, summary');
      if (!el) { sound.play('tap'); return; }
      if (el.disabled || el.getAttribute('aria-disabled') === 'true') { sound.play('tap'); return; }
      const name = el.dataset?.sfx;
      if (name === 'none') return;
      if (name) { sound.play(name); return; }
      if (el.matches('input[type="checkbox"], label')) { sound.play('check'); return; }
      if (el.matches('[role="tab"]')) { sound.play('tab'); return; }
      sound.play('tick');
    };
    root.addEventListener('pointerdown', onDown, { passive: true });
    root.addEventListener('click', onClick);
    return () => { root.removeEventListener('pointerdown', onDown); root.removeEventListener('click', onClick); };
  }, [rootRef]);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme, soundOn, toggleSound, mood, setMood, lockMood, setBaseMood, toast }),
    [theme, setTheme, toggleTheme, soundOn, toggleSound, mood, setMood, lockMood, setBaseMood, toast]);

  return (
    <AppCtx.Provider value={value}>
      {children}
      <div className="mho-toasts" aria-live="polite" role="status">
        {toasts.map((t) => <div className="mho-toast" key={t.id}><Icon name={t.icon} /><span>{t.msg}</span></div>)}
      </div>
    </AppCtx.Provider>
  );
}
