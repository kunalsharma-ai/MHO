// Safe browser storage wrappers (private mode / blocked storage never breaks the page).
export const store = {
  get(key, fallback = null) {
    try {
      const v = window.localStorage.getItem(key);
      return v === null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  },
};

export const session = {
  get(key, fallback = null) {
    try {
      const v = window.sessionStorage.getItem(key);
      return v === null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  },
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
