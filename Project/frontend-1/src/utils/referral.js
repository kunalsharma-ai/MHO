const KEY = 'mho.referral';
const DAYS = 30;

const clean = (value) => {
  const v = String(value || '').trim();
  return /^[\w-]{1,64}$/.test(v) ? v : '';
};

export function rememberReferral(search) {
  let ref = '';
  try { ref = clean(new URLSearchParams(search || '').get('ref')); } catch { return; }
  if (!ref) return;
  try { localStorage.setItem(KEY, JSON.stringify({ ref, at: Date.now() })); } catch {}
}

export function referralCode(search) {
  let ref = '';
  try { ref = clean(new URLSearchParams(search ?? window.location.search).get('ref')); } catch {}
  if (ref) return ref;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && Date.now() - saved.at < DAYS * 24 * 60 * 60 * 1000) return clean(saved.ref);
  } catch {}
  return '';
}

export function forgetReferral() {
  try { localStorage.removeItem(KEY); } catch {}
}
