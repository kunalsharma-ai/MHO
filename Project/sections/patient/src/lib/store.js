/**
 * Minimal global store (no state library) with localStorage persistence.
 * initStore() is called once by the mount function, after the configuration is known, so that
 * each signed-in dashboard user gets their own saved answers (key = storageKey + ':' + user.id).
 */
import { useSyncExternalStore } from 'react';
import { cfg } from './config.js';
import { saveAnswer } from './bridge.js';

let KEY = 'mho.patient.v1';
const listeners = new Set();
const blank = () => ({
  answers: {},
  meta: { completed: {}, started: {} },
  lang: null,
  theme: null,
  muted: null,
  rid: null,
  // rewards already delivered to the header by the animation ({ id: timestamp }); stampSeen = v1.1/v1.2 name
  delivered: {},
  // surveys whose unlock animation has been shown ({ id: timestamp })
  unlockSeen: {},
});
let state = blank();
let ready = false;

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function initStore() {
  if (ready) return;
  ready = true;
  const c = cfg();
  KEY = (c.storageKey || 'mho.patient.v1') + (c.user?.id ? ':' + c.user.id : '');
  const saved = load() || {};
  state = {
    ...blank(),
    answers: {},
    meta: { completed: {}, started: {} },
    lang: saved.lang || null,
    theme: saved.theme || null,
    muted: saved.muted ?? null,
    rid: saved.rid || null,
    delivered: saved.delivered || saved.stampSeen || saved.panelSeen || {},
    unlockSeen: saved.unlockSeen || {},
  };
  try {
    const p = new URLSearchParams(location.search);
    const rid = p.get('rid') || p.get('uid') || c.user?.id;
    if (rid && /^[\w-]{1,80}$/.test(rid)) state.rid = rid;
  } catch {}
  addEventListener('pagehide', save);
}

let t = null;
function save() { try { const { answers, meta, ...rest } = state; localStorage.setItem(KEY, JSON.stringify(rest)); } catch {} }
function persist() { clearTimeout(t); t = setTimeout(save, 200); }

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
  markCompleted(id) { store.set((s) => ({ meta: { ...s.meta, completed: { ...s.meta.completed, [id]: Date.now() } } })); },
  markStarted(id) {
    if (state.meta.started?.[id]) return;
    store.set((s) => ({ meta: { ...s.meta, started: { ...(s.meta.started || {}), [id]: Date.now() } } }));
  },
  markDelivered(ids) {
    const list = Array.isArray(ids) ? ids : [ids];
    if (!list.length) return;
    store.set((s) => ({ delivered: { ...s.delivered, ...Object.fromEntries(list.map((id) => [id, Date.now()])) } }));
  },
  markUnlockSeen(id) { store.set((s) => ({ unlockSeen: { ...s.unlockSeen, [id]: Date.now() } })); },
  reset() {
    state = { ...state, answers: {}, meta: { completed: {}, started: {} }, delivered: {}, unlockSeen: {} };
    persist();
    listeners.forEach((l) => l());
  },
  subscribe(l) { listeners.add(l); return () => listeners.delete(l); },
};

export function useStore(sel = (s) => s) {
  return useSyncExternalStore(store.subscribe, () => sel(state), () => sel(state));
}
