import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useReducer, useRef } from 'react';
import { readState, writeState } from './lib/storage.js';
import { complete, saveValues } from './lib/bridge.js';
import { sound } from './lib/sound.js';
import { rewardOf } from './lib/rewards.js';

const Ctx = createContext(null);

/**
 * State the build-time pre-render used — the first client render must match it for hydration.
 *   completed: { slug: timestamp }    items finished (reward earned once)
 *   seen:      { slug: timestamp }    rewards already delivered to the header wallet by the animation
 *   started:   { slug: timestamp }    items opened at least once
 */
export const PRERENDER_STATE = { lang: 'en', theme: 'light', sound: true, answers: {}, completed: {}, seen: {}, started: {}, log: [] };

function initial(boot = {}) {
  const saved = readState() || {};
  const completed = boot.completed || {};
  const c = (typeof window !== 'undefined' && window.MHO_CONFIG) || {};
  return {
    // the member area passes the language and light / dark mode chosen in its header
    lang: c.lang || 'en',
    theme: c.theme === 'dark' ? 'dark' : 'light',
    sound: false,
    answers: boot.answers || {},
    completed,
    seen: { ...completed },
    started: { ...saved.started, ...completed },
    log: [],
  };
}

function reducer(s, a) {
  switch (a.type) {
    case 'lang': return { ...s, lang: a.lang };
    case 'theme': return { ...s, theme: a.theme };
    case 'sound': return { ...s, sound: a.on };
    case 'started': return s.started[a.slug] ? s : { ...s, started: { ...s.started, [a.slug]: Date.now() } };
    case 'answers':
      return { ...s, answers: { ...s.answers, [a.slug]: { ...(s.answers[a.slug] || {}), ...a.values } } };
    case 'hydrate':
      return { ...s, answers: { ...s.answers, [a.slug]: a.values } };
    case 'replaceAnswers':
      return { ...s, answers: { ...s.answers, [a.slug]: a.values } };
    case 'complete': {
      if (s.completed[a.slug]) return s;
      const r = rewardOf(a.slug);
      return {
        ...s,
        completed: { ...s.completed, [a.slug]: Date.now() },
        log: [{ slug: a.slug, ...r, ts: Date.now() }, ...s.log].slice(0, 40),
      };
    }
    /** rewards delivered (animation landed in the wallet) */
    case 'seen': {
      const ids = (Array.isArray(a.slugs) ? a.slugs : [a.slugs]).filter((x) => s.completed[x] && !s.seen[x]);
      if (!ids.length) return s;
      return { ...s, seen: { ...s.seen, ...Object.fromEntries(ids.map((x) => [x, Date.now()])) } };
    }
    case 'collected': return { ...s, seen: { ...s.completed, ...s.seen } };
    case 'restore': return a.state;
    default: return s;
  }
}

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function StoreProvider({ children, boot, hydrating = false }) {
  const [state, rawDispatch] = useReducer(reducer, undefined, () => (hydrating || typeof window === 'undefined' ? PRERENDER_STATE : initial(boot)));
  const latest = useRef(state);
  latest.current = state;
  const dispatch = useCallback((action) => {
    if (action.type === 'answers' || action.type === 'replaceAnswers') {
      const before = latest.current.answers[action.slug] || {};
      const changed = Object.fromEntries(Object.entries(action.values).filter(([k, v]) => JSON.stringify(before[k]) !== JSON.stringify(v)));
      saveValues(changed);
    }
    if (action.type === 'complete') {
      const r = rewardOf(action.slug);
      complete(action.slug, r.pts, r.qs);
    }
    rawDispatch(action);
  }, []);

  // After hydrating the pre-rendered HTML, swap in the visitor's saved state before the browser paints.
  useIsoLayoutEffect(() => {
    if (hydrating) {
      const real = initial();
      if (JSON.stringify(real) !== JSON.stringify(PRERENDER_STATE)) dispatch({ type: 'restore', state: real });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (state !== PRERENDER_STATE) writeState(state); }, [state]);
  useEffect(() => { sound.setEnabled(state.sound); }, [state.sound]);
  useEffect(() => { sound.setLanguage(state.lang); }, [state.lang]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);

/** First name for the greeting: mount option / config → ?name= → their own answers → '' */
export function firstNameOf(state, propName) {
  const clean = (s) => (typeof s === 'string' ? s.trim().split(/\s+/)[0].slice(0, 30) : '');
  if (propName) return clean(propName);
  const c = typeof window !== 'undefined' && window.MHO_CONFIG && window.MHO_CONFIG.user;
  if (c && c.firstName) return clean(c.firstName);
  try {
    const q = new URLSearchParams(location.search).get('name');
    if (q && /^[\p{L}\p{M}' .-]{1,40}$/u.test(q)) return clean(q);
  } catch { /* ignore */ }
  const b = state.answers.basic || {};
  return clean(b['fullname::parts']?.first) || clean(b.fullname);
}
