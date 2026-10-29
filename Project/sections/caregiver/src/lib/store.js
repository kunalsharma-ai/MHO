/**
 * Minimal global store (no external state library) with localStorage persistence.
 * Use with the useStore(selector) hook.
 */
import { useSyncExternalStore } from 'react';
import { saveAnswer } from './bridge.js';

const KEY = 'mho.caregiver.v1';
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

const saved = load() || {};
let state = {
  answers: {},
  meta: { completed: {}, started: {} },
  lang: saved.lang || null,
  theme: saved.theme || null,
  muted: saved.muted ?? false,
  rid: saved.rid || null,
  // rewards already delivered in the Circle of Care ({ id: timestamp }) – the v1.3 name "gemSeen" is kept so nobody gets replays; bloomSeen = v1.2 name
  gemSeen: saved.gemSeen || saved.bloomSeen || {},
};

let t = null;
function persist() {
  clearTimeout(t);
  t = setTimeout(() => {
    try {
      const { answers, meta, ...rest } = state;
      localStorage.setItem(KEY, JSON.stringify(rest));
    } catch {}
  }, 200);
}

export const store = {
  get: () => state,
  set(patch) {
    state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) };
    persist();
    listeners.forEach((l) => l());
  },
  setAnswer(name, ans) {
    store.set((s) => ({ answers: { ...s.answers, [name]: ans } }));
    saveAnswer(name, ans);
  },
  markCompleted(id) {
    store.set((s) => ({ meta: { ...s.meta, completed: { ...s.meta.completed, [id]: Date.now() } } }));
  },
  markStarted(id) {
    if (state.meta.started?.[id]) return;
    store.set((s) => ({ meta: { ...s.meta, started: { ...(s.meta.started || {}), [id]: Date.now() } } }));
  },
  reset() {
    state = { ...state, answers: {}, meta: { completed: {}, started: {} }, gemSeen: {} };
    persist();
    listeners.forEach((l) => l());
  },
  subscribe(l) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useStore(sel = (s) => s) {
  return useSyncExternalStore(store.subscribe, () => sel(state), () => sel(state));
}

/* Respondent id from campaign link: ?rid=… or ?uid=… (kept for later submissions) */
try {
  const p = new URLSearchParams(location.search);
  const rid = p.get('rid') || p.get('uid');
  if (rid && /^[\w-]{1,80}$/.test(rid)) store.set({ rid });
} catch {}

window.addEventListener('pagehide', () => {
  try {
    const { answers, meta, ...rest } = state;
    localStorage.setItem(KEY, JSON.stringify(rest));
  } catch {}
});
