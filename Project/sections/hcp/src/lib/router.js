/**
 * Tiny router for the question flow overlay.
 *
 *   #/profile/<slug>              open a profile / survey
 *   #/profile/<slug>/edit/<q>     open at one question (edit an answer)
 *   #/review/<slug>               answers summary
 *   ?profile=<slug>               deep link from the reminder e-mail (converted to the hash on load)
 *
 * Stand-alone page → "hash" mode (back button works, links can be shared).
 * Embedded in your dashboard → "memory" mode by default (your dashboard's own router / URL is never touched);
 * pass MHOProfileSection.mount(el, { routing: 'hash' }) to use the hash there too.
 */
import { useSyncExternalStore } from 'react';

let mode = 'hash';
let mem = '';
const subs = new Set();
const emit = () => subs.forEach((f) => f());

export function setRouterMode(m) { mode = m === 'memory' ? 'memory' : 'hash'; emit(); }
export const routerMode = () => mode;

export function currentPath() {
  if (mode === 'memory' || typeof location === 'undefined') return mem;
  return (location.hash || '').replace(/^#\/?/, '');
}

export function go(path) {
  const p = String(path || '').replace(/^#?\/?/, '');
  if (mode === 'memory') { if (mem !== p) { mem = p; emit(); } return; }
  if (!p) {
    // back to the dashboard: drop the hash without adding a history entry for an empty hash
    if (location.hash) history.pushState(null, '', location.pathname + location.search);
    emit();
    return;
  }
  if (location.hash !== '#/' + p) location.hash = '/' + p;
}

function subscribe(fn) {
  subs.add(fn);
  const on = () => fn();
  if (typeof window !== 'undefined') { window.addEventListener('hashchange', on); window.addEventListener('popstate', on); }
  return () => {
    subs.delete(fn);
    if (typeof window !== 'undefined') { window.removeEventListener('hashchange', on); window.removeEventListener('popstate', on); }
  };
}

/** parsed route; `known` = list/set of valid slugs */
export function parseRoute(path, known) {
  const [kind, slug, sub, q] = String(path || '').split('/');
  const ok = known && (known.has ? known.has(slug) : known[slug]);
  if ((kind === 'profile' || kind === 'review') && ok) return { kind, slug, mode: sub, q: q ? decodeURIComponent(q) : undefined };
  return { kind: 'home' };
}

/** current path as React state ('' on the server so the pre-render is always the dashboard) */
export function usePath(enabled = true) {
  return useSyncExternalStore(subscribe, () => (enabled ? currentPath() : ''), () => '');
}
