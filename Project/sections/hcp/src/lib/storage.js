const KEY = 'mho-hcp-v1';

export function readState() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

let timer = null;
export function writeState(state) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    try {
      const { answers, completed, seen, log, ...rest } = state;
      localStorage.setItem(KEY, JSON.stringify(rest));
    } catch { /* storage full / private mode — app keeps working in memory */ }
  }, 250);
}
