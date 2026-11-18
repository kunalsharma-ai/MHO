// Client-side router (React context + History API). Hash mode is used only by the single-file preview.
// Public URLs always end with a trailing slash ("/about-us/") to match the prerendered folder structure,
// so every page has a real, crawlable URL. API: <Router>, <Link>, useRouter() → { path, navigate }.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ROUTER_MODE } from './config/env.js';

const MODE = ROUTER_MODE;
const RouterContext = createContext({ path: '/', navigate: () => {} });

/** "/about-us/" -> "/about-us", "/" -> "/" */
export function normalize(p = '/') {
  let path = p.split('?')[0].split('#')[0] || '/';
  if (!path.startsWith('/')) path = '/' + path;
  if (path.length > 1) path = path.replace(/\/+$/, '');
  return path || '/';
}

/** Canonical public href for an internal path. */
export function toHref(to) {
  const [base, hash] = to.split('#');
  const n = normalize(base);
  const pretty = n === '/' ? '/' : n + '/';
  if (MODE === 'hash') return '#' + pretty + (hash ? '?s=' + hash : '');
  return pretty + (hash ? '#' + hash : '');
}

function readLocation() {
  if (typeof window === 'undefined') return '/';
  if (MODE === 'hash') {
    const h = window.location.hash.slice(1) || '/';
    return normalize(h.split('?')[0]);
  }
  return normalize(window.location.pathname);
}

function readAnchor() {
  if (typeof window === 'undefined') return '';
  if (MODE === 'hash') {
    const m = window.location.hash.match(/\?s=([\w-]+)/);
    return m ? m[1] : '';
  }
  return window.location.hash.slice(1);
}

// The page fade-in (.page in base.css) plays only when moving between pages inside the site. On the first
// load the prerendered page is already on screen, and fading it in again hid the content and delayed paint.
function markNav() {
  try { document.documentElement.classList.add('spa-nav'); } catch { /* not in a browser */ }
}

export function Router({ initialPath = '/', children }) {
  const [path, setPath] = useState(() => (typeof window === 'undefined' ? normalize(initialPath) : readLocation()));

  useEffect(() => {
    const onChange = () => { markNav(); setPath(readLocation()); };
    window.addEventListener(MODE === 'hash' ? 'hashchange' : 'popstate', onChange);
    return () => window.removeEventListener(MODE === 'hash' ? 'hashchange' : 'popstate', onChange);
  }, []);

  const navigate = useCallback((to) => {
    const href = toHref(to);
    if (MODE === 'hash') window.location.hash = href.slice(1);
    else window.history.pushState({}, '', href);
    markNav();
    setPath(readLocation());
    const anchor = to.split('#')[1];
    requestAnimationFrame(() => {
      const el = anchor && document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    });
  }, []);

  // Scroll to an anchor on first load (e.g. /earn/#countries)
  useEffect(() => {
    const a = readAnchor();
    if (a) setTimeout(() => document.getElementById(a)?.scrollIntoView({ behavior: 'smooth' }), 300);
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

/** Current route path in the browser (works in history and hash mode). */
export const currentPath = readLocation;
/** Current in-page anchor ("/join/#hcp" or "#/join/?s=hcp" → "hcp"). */
export const currentAnchor = readAnchor;

export function Link({ to, children, onClick, className, ...rest }) {
  const { navigate, path } = useRouter();
  const isExternal = /^(https?:|mailto:|tel:)/.test(to);
  if (isExternal) {
    return (
      <a href={to} className={className} target={to.startsWith('http') ? '_blank' : undefined} rel={to.startsWith('http') ? 'noopener noreferrer' : undefined} {...rest}>
        {children}
      </a>
    );
  }
  const active = normalize(to.split('#')[0]) === path;
  return (
    <a
      href={toHref(to)}
      className={className}
      aria-current={active ? 'page' : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
