// Building blocks of the redesigned account screens (register, set / reset password, log in).
// Styles live in styles/account.css under the `acx-` prefix so they cannot collide with the site's other classes.
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { Logo } from './Brand.jsx';
import { API } from '../config/site.js';
import { apiRequest } from '../utils/helpers.js';

export const ACCOUNT = String(API.account || '/api/v1/account').replace(/\/$/, '');

/**
 * POST/GET to /api/v1/account/*: resolves to { ok, status, code, message, errors, data, row, body }.
 * The API sends `data` as an array ([] or [{ email }]); `row` is its first entry ({} when there is none).
 * A mail that could not go out is an error answer with code MAIL_NOT_SENT (never a flag inside data).
 */
export async function accountCall(method, path, body) {
  const res = await apiRequest(method, `${ACCOUNT}${path}`, body);
  const b = res.data || {};
  const row = Array.isArray(b.data) ? (b.data[0] || {}) : (b.data && typeof b.data === 'object' ? b.data : {});
  return { ok: res.ok && b.status !== 'error', status: res.status, code: b.code || '', message: b.message || '', errors: b.errors || {}, data: b.data, row, body: b };
}

export const NETWORK_ERROR = 'We could not reach the server. Check your connection and try again.';

/* ---------- Page shell ---------- */
/** Two-column account page: a compact brand panel (hidden on phones) and the form card. */
export function AccountShell({ tone = 'neutral', aside, children, wide = false }) {
  return (
    <main className={`acx acx-tone-${tone}`} id="main">
      <div className={`acx-grid ${wide ? 'is-wide' : ''}`}>
        <aside className="acx-aside" aria-hidden={aside ? undefined : 'true'}>
          <div className="acx-aside-in">
            <Logo onDark />
            {aside}
          </div>
          <div className="acx-orbs" aria-hidden="true"><i /><i /><i /></div>
        </aside>
        <section className="acx-card">{children}</section>
      </div>
    </main>
  );
}

/** Step indicator: numbered dots with labels; the current step is announced to screen readers. */
export function Steps({ steps, current }) {
  return (
    <ol className="acx-steps" aria-label="Registration steps">
      {steps.map((s, i) => (
        <li key={s} className={i < current ? 'done' : i === current ? 'now' : ''} aria-current={i === current ? 'step' : undefined}>
          <span className="acx-step-dot">{i < current ? <Icon name="check" size={12} stroke={3} /> : i + 1}</span>
          <span className="acx-step-label">{s}</span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Text field ---------- */
export function TextField({ id, label, value, onChange, error, required, optional, hint, type = 'text', autoComplete, inputMode, maxLength = 120, disabled, icon, ...rest }) {
  return (
    <div className={`acx-field ${error ? 'has-error' : ''} ${disabled ? 'is-disabled' : ''}`}>
      <label htmlFor={id}>
        {label} {required && <b aria-hidden="true">*</b>} {optional && <em>(optional)</em>}
      </label>
      <div className="acx-input">
        {icon && <Icon name={icon} size={17} />}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
          {...rest}
        />
      </div>
      {error ? <p className="acx-err" id={`${id}-err`} role="alert"><Icon name="info" size={13} /> {error}</p> : hint ? <p className="acx-hint" id={`${id}-hint`}>{hint}</p> : null}
    </div>
  );
}

/* ---------- Searchable select (countries with flags, states, cities) ---------- */
const MAX_SHOWN = 200;
/**
 * Accessible combobox: type to search, arrow keys to move, Enter to choose, Escape to close.
 * items: [{ value, label, flag?, emoji?, sub? }]. Long lists (cities) render the first 200 matches.
 */
export function SearchSelect({ id, label, items, value, onChange, error, required, placeholder = 'Select…', disabled, loading, emptyText = 'No matches', hint, allowFree = false }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hi, setHi] = useState(0);
  const wrap = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const listId = `${id}-list`;
  const selected = items.find((i) => i.value === value) || (allowFree && value ? { value, label: value } : null);
  const matches = useMemo(() => {
    const t = q.trim().toLowerCase();
    const all = t ? items.filter((i) => i.label.toLowerCase().includes(t) || String(i.value).toLowerCase() === t || (i.sub || '').includes(t)) : items;
    // names that start with the search first
    if (t) all.sort((a, b) => Number(!a.label.toLowerCase().startsWith(t)) - Number(!b.label.toLowerCase().startsWith(t)));
    return all;
  }, [q, items]);
  const shown = matches.slice(0, MAX_SHOWN);
  const free = allowFree && q.trim() && !items.some((i) => i.label.toLowerCase() === q.trim().toLowerCase());

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);
  useEffect(() => { listRef.current?.children[hi]?.scrollIntoView({ block: 'nearest' }); }, [hi, open]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const choose = (item) => { onChange(item.value); setOpen(false); setQ(''); };
  const total = shown.length + (free ? 1 : 0);
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(h + 1, total - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
    else if (e.key === 'Home') { e.preventDefault(); setHi(0); }
    else if (e.key === 'End') { e.preventDefault(); setHi(total - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (hi < shown.length) shown[hi] && choose(shown[hi]); else if (free) choose({ value: q.trim() }); }
    else if (e.key === 'Escape' || e.key === 'Tab') setOpen(false);
  };

  return (
    <div className={`acx-field ${error ? 'has-error' : ''} ${disabled ? 'is-disabled' : ''}`} ref={wrap}>
      <label id={`${id}-label`} htmlFor={id}>{label} {required && <b aria-hidden="true">*</b>}</label>
      <div className={`acx-combo ${open ? 'is-open' : ''}`}>
        <button
          type="button"
          id={id}
          className="acx-combo-btn"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${id}-label ${id}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          disabled={disabled}
          onClick={() => { setOpen((o) => !o); setHi(Math.max(0, items.findIndex((i) => i.value === value))); }}
          onKeyDown={(e) => { if (e.key === 'ArrowDown' && !open) { e.preventDefault(); setOpen(true); } }}
        >
          {selected ? (
            <span className="acx-combo-val">{selected.flag !== undefined && <FlagImg code={selected.flag} emoji={selected.emoji} />}<span>{selected.label}</span></span>
          ) : (
            <span className="acx-combo-ph">{loading ? 'Loading…' : placeholder}</span>
          )}
          <Icon name="arrow" size={14} className="acx-combo-chev" />
        </button>
        {open && (
          <div className="acx-combo-pop">
            <div className="acx-combo-search">
              <Icon name="search" size={16} />
              <input
                ref={inputRef}
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={total ? `${id}-opt-${hi}` : undefined}
                aria-label={`Search ${label.toLowerCase()}`}
                value={q}
                onChange={(e) => { setQ(e.target.value); setHi(0); }}
                onKeyDown={onKey}
                placeholder="Type to search"
              />
            </div>
            <ul role="listbox" id={listId} ref={listRef} aria-labelledby={`${id}-label`}>
              {shown.map((item, i) => (
                <li
                  key={item.value}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={item.value === value}
                  className={`${i === hi ? 'hi' : ''} ${item.value === value ? 'sel' : ''}`}
                  onMouseEnter={() => setHi(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(item)}
                >
                  {item.flag !== undefined && <FlagImg code={item.flag} emoji={item.emoji} />}
                  <span>{item.label}</span>
                  {item.sub && <em>{item.sub}</em>}
                </li>
              ))}
              {free && (
                <li id={`${id}-opt-${shown.length}`} role="option" aria-selected="false" className={hi === shown.length ? 'hi' : ''} onMouseDown={(e) => e.preventDefault()} onClick={() => choose({ value: q.trim() })}>
                  <Icon name="plus" size={14} /> <span>Use “{q.trim()}”</span>
                </li>
              )}
              {!total && <li className="acx-combo-empty" role="presentation">{emptyText}</li>}
              {matches.length > MAX_SHOWN && <li className="acx-combo-empty" role="presentation">Keep typing to narrow {matches.length.toLocaleString()} results</li>}
            </ul>
          </div>
        )}
      </div>
      {error ? <p className="acx-err" id={`${id}-err`} role="alert"><Icon name="info" size={13} /> {error}</p> : hint ? <p className="acx-hint">{hint}</p> : null}
    </div>
  );
}

/** Flag from the site's /flags set, falling back to the dataset's emoji when a file is missing. */
export function FlagImg({ code, emoji }) {
  const [broken, setBroken] = useState(false);
  if (!code) return null;
  if (broken) return <span className="acx-flag acx-flag-emoji" aria-hidden="true">{emoji || '🏳️'}</span>;
  return <img className="acx-flag" src={`/flags/${String(code).toLowerCase()}.webp`} alt="" width="22" height="16" loading="lazy" onError={() => setBroken(true)} />;
}

/* ---------- Server CAPTCHA ---------- */
/**
 * The API draws the challenge (letters as SVG paths) and checks the answer; each challenge can be used once.
 * value = { id, answer }. Bump `resetKey` after any submit so a fresh challenge is loaded.
 */
export function ServerCaptcha({ value, onChange, error, resetKey = 0 }) {
  const uid = useId();
  const [img, setImg] = useState('');
  const [state, setState] = useState('loading');
  const [why, setWhy] = useState('');
  const seq = useRef(0);
  const load = async (retried = false) => {
    const mine = ++seq.current;
    setState('loading');
    setWhy('');
    onChange({ id: '', answer: '' }); // an old id is never sent with a new picture
    const r = await accountCall('GET', '/captcha');
    if (mine !== seq.current) return; // a newer request (refresh button, resetKey) has taken over
    if (!r.ok || !r.data?.svg || !r.data?.id) {
      // One quiet retry covers a blip (cold API container, dropped connection) before showing the error.
      if (!retried && r.status !== 429) { setTimeout(() => { if (mine === seq.current) load(true); }, 1200); return; }
      setWhy(r.status === 429 ? (r.message || 'Too many requests. Please wait a minute and try again.')
        : r.status === 0 ? NETWORK_ERROR
          : r.status === 404 ? 'The security check is not available on the server right now. Please try again shortly.'
            : 'We could not load the security check. Please try again.');
      setState('error');
      return;
    }
    setImg(`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(r.data.svg)))}`);
    onChange({ id: r.data.id, answer: '' });
    setState('ready');
  };
  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [resetKey]);
  const busy = state === 'loading';
  return (
    <div className={`acx-field acx-captcha ${error || state === 'error' ? 'has-error' : ''}`}>
      <label htmlFor={`cap-${uid}`}>Security check <b aria-hidden="true">*</b></label>
      <div className="acx-captcha-row">
        <div className={`acx-captcha-img is-${state}`} aria-live="polite">
          {state === 'ready'
            ? <img src={img} alt="Security code: type the characters shown. Use the refresh button for a new code." width="180" height="60" />
            : state === 'error'
              ? <button type="button" className="acx-captcha-retry" onClick={() => load()}><Icon name="refresh" size={14} /> Load the code</button>
              : <span className="acx-spin" aria-label="Loading security check" />}
        </div>
        <button type="button" className="acx-icon-btn" onClick={() => load()} disabled={busy} aria-label="Show a new security code"><Icon name="refresh" size={18} /></button>
        <input
          id={`cap-${uid}`}
          className="acx-captcha-input"
          value={value?.answer || ''}
          onChange={(e) => onChange({ ...value, answer: e.target.value.slice(0, 8) })}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          placeholder="Type the code (any case)"
          disabled={state === 'error'}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || why ? `cap-${uid}-err` : undefined}
        />
      </div>
      {(error || why) && <p className="acx-err" id={`cap-${uid}-err`} role="alert"><Icon name="info" size={13} /> {why || error}</p>}
    </div>
  );
}

/* ---------- Password ---------- */
export const PW_RULES = [
  ['len', 'At least 8 characters', (p) => p.length >= 8],
  ['upper', 'A capital letter', (p) => /[A-Z]/.test(p)],
  ['lower', 'A small letter', (p) => /[a-z]/.test(p)],
  ['digit', 'A number', (p) => /\d/.test(p)],
  ['symbol', 'A symbol (e.g. ! @ #)', (p) => /[^A-Za-z0-9]/.test(p)],
];
/** Same policy as the API: 8+ characters and three of the four character kinds. */
export function passwordIssue(p, email = '') {
  if (!p) return 'Please create a password.';
  if (p.length < 8) return 'Use at least 8 characters.';
  if (PW_RULES.slice(1).filter(([, , t]) => t(p)).length < 3) return 'Use at least three of: capital letters, small letters, numbers, symbols.';
  const local = String(email).split('@')[0].toLowerCase();
  if (local.length >= 4 && p.toLowerCase().includes(local)) return 'Your password must not contain your email address.';
  return '';
}
const LEVELS = ['Too weak', 'Weak', 'Fair', 'Strong', 'Excellent'];
export function strengthOf(p) {
  if (!p) return 0;
  let s = PW_RULES.filter(([, , t]) => t(p)).length - 1;
  if (p.length >= 12) s += 1;
  if (p.length >= 16) s += 1;
  return Math.max(0, Math.min(4, s - 1));
}

export function PasswordInput({ id, label, value, onChange, error, autoComplete = 'new-password', meter = false, email = '' }) {
  const [show, setShow] = useState(false);
  const s = strengthOf(value);
  return (
    <div className={`acx-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label} <b aria-hidden="true">*</b></label>
      <div className="acx-input acx-pw">
        <Icon name="lock" size={17} />
        <input id={id} type={show ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} maxLength={128} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-err` : meter ? `${id}-meter` : undefined} />
        <button type="button" className="acx-eye" onClick={() => setShow((v) => !v)} aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show}>
          <Icon name={show ? 'eyeOff' : 'eye'} size={18} />
        </button>
      </div>
      {meter && (
        <div className="acx-meter" id={`${id}-meter`}>
          <div className={`acx-meter-bar s${value ? s : 'x'}`} aria-hidden="true"><i /><i /><i /><i /></div>
          <span aria-live="polite">{value ? `Strength: ${LEVELS[s]}` : 'Strength'}</span>
          <ul className="acx-rules">
            {PW_RULES.map(([k, text, t]) => (
              <li key={k} className={t(value) ? 'ok' : ''}><Icon name={t(value) ? 'check' : 'x'} size={12} stroke={3} /> {text}</li>
            ))}
          </ul>
          {passwordIssue(value, email) === '' && value && <p className="acx-hint">Meets the requirements.</p>}
        </div>
      )}
      {error && <p className="acx-err" id={`${id}-err`} role="alert"><Icon name="info" size={13} /> {error}</p>}
    </div>
  );
}

/* ---------- Alert ---------- */
export function Alert({ kind = 'error', children }) {
  if (!children) return null;
  return (
    <div className={`acx-alert acx-alert-${kind}`} role={kind === 'error' ? 'alert' : 'status'}>
      <Icon name={kind === 'error' ? 'info' : kind === 'ok' ? 'check' : 'mail'} size={18} />
      <div>{children}</div>
    </div>
  );
}
