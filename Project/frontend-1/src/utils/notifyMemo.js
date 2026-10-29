

const KEY = 'mfr.signup.notify';
const TTL_MS = 3 * 24 * 60 * 60 * 1000;

// `res.data.user` may be an id string or a user object; accept both.
const idOf = (u) => {
  if (!u) return '';
  if (typeof u === 'string') return u;
  return String(u._id || u.id || '');
};

function readAll() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    const now = Date.now();
    return Object.fromEntries(
      Object.entries(raw).filter(([, e]) => e && Array.isArray(e.channels) && now - Number(e.at) < TTL_MS),
    );
  } catch {
    return {};
  }
}

function writeAll(map) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* storage blocked */
  }
}

/** notify: { dashboard: true, sms: false, ... } as held in the sign-up form. */
export function rememberNotify(user, notify) {
  const id = idOf(user);
  if (!id || !notify || typeof notify !== 'object') return;
  const all = readAll();
  all[id] = { at: Date.now(), channels: Object.keys(notify).filter((k) => notify[k]) };
  writeAll(all);
}

/** Returns an array of channel ids, e.g. ['dashboard', 'sms'] (empty when nothing is remembered). */
export function recallNotify(userId) {
  const entry = readAll()[String(userId || '')];
  return entry ? entry.channels : [];
}

export function forgetNotify(userId) {
  const all = readAll();
  delete all[String(userId || '')];
  writeAll(all);
}