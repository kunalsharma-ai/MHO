// Form building blocks: Field, CountrySelect (flags + dial codes), PhoneInput, DobPicker (calendar),
// PasswordField (strength meter) and Captcha (canvas code + accessible maths alternative).
// Client-side checks improve UX only — the backend must validate everything again.
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { Flag } from './ui.jsx';
import { ALL_COUNTRIES, countryByCode } from '../data/countries.js';
import { passwordStrength } from '../utils/helpers.js';
import { MIN_AGE } from '../config/site.js';

export function Field({ label, error, hint, required, children, htmlFor, className = '', icon }) {
  return (
    <div className={`field ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={htmlFor}>
        {icon && <Icon name={icon} size={15} />}
        {label}
        {required ? <b aria-hidden="true">*</b> : <em> (optional)</em>}
      </label>
      {children}
      {error ? (
        <p className="field-error" role="alert" id={htmlFor ? `${htmlFor}-err` : undefined}>
          <Icon name="info" size={14} /> {error}
        </p>
      ) : hint ? (
        <p className="field-hint">{hint}</p>
      ) : null}
    </div>
  );
}

/* ---------- Country combobox ---------- */
export function CountrySelect({ id, value, onChange, showDial = false, placeholder = 'Select country', invalid, compact = false, list = ALL_COUNTRIES }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hi, setHi] = useState(0);
  const wrap = useRef(null);
  const listRef = useRef(null);
  const selected = value ? countryByCode(value) : null;
  const items = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? list.filter((c) => c.name.toLowerCase().includes(t) || c.dial.includes(t) || c.code === t) : list;
  }, [q, list]);

  useEffect(() => {
    if (!open) return;
    const close = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  useEffect(() => {
    listRef.current?.children[hi]?.scrollIntoView({ block: 'nearest' });
  }, [hi]);

  const choose = (c) => {
    onChange(c.code);
    setOpen(false);
    setQ('');
  };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(h + 1, items.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); items[hi] && choose(items[hi]); }
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className={`combo ${compact ? 'combo-compact' : ''} ${open ? 'is-open' : ''}`} ref={wrap}>
      <button
        type="button"
        id={id}
        className={`combo-btn ${invalid ? 'invalid' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        onClick={() => { setOpen((o) => !o); setHi(0); }}
      >
        {selected ? (
          <>
            <Flag code={selected.code} size={22} />
            <span className="combo-val">{compact ? selected.dial : selected.name}</span>
            {showDial && !compact && <span className="combo-dial">{selected.dial}</span>}
          </>
        ) : (
          <span className="combo-ph">{placeholder}</span>
        )}
        <Icon name="arrow" size={14} className="combo-chev" />
      </button>
      {open && (
        <div className="combo-pop">
          <div className="combo-search">
            <Icon name="search" size={16} />
            <input
              autoFocus
              value={q}
              onChange={(e) => { setQ(e.target.value); setHi(0); }}
              onKeyDown={onKey}
              placeholder="Search country or code"
              aria-label="Search countries"
            />
          </div>
          <ul role="listbox" ref={listRef} aria-label="Countries">
            {items.map((c, i) => (
              <li
                key={c.code}
                role="option"
                aria-selected={value === c.code}
                className={`${i === hi ? 'hi' : ''} ${value === c.code ? 'sel' : ''}`}
                onMouseEnter={() => setHi(i)}
                onClick={() => choose(c)}
              >
                <Flag code={c.code} size={20} />
                <span>{c.name}</span>
                {showDial && <em>{c.dial}</em>}
              </li>
            ))}
            {!items.length && <li className="combo-empty">No match</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

export function PhoneInput({ id, country, onCountry, value, onChange, invalid, required }) {
  return (
    <div className={`phone ${invalid ? 'invalid' : ''}`}>
      <CountrySelect id={`${id}-cc`} value={country} onChange={onCountry} showDial compact />
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d\s-]/g, ''))}
        placeholder="Mobile number"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-err` : undefined}
        required={required}
      />
    </div>
  );
}

/* ---------- Date of birth calendar ---------- */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const pad = (n) => String(n).padStart(2, '0');

export function DobPicker({ id, value, onChange, invalid }) {
  const now = new Date();
  const maxYear = now.getFullYear() - MIN_AGE;
  const minYear = now.getFullYear() - 100;
  const init = value ? value.split('-').map(Number) : [maxYear - 12, 1, 1];
  const [open, setOpen] = useState(false);
  const [y, setY] = useState(init[0]);
  const [m, setM] = useState(init[1]);
  const wrap = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(false);
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const days = new Date(y, m, 0).getDate();
  const first = new Date(y, m - 1, 1).getDay();
  const years = [];
  for (let yy = maxYear; yy >= minYear; yy--) years.push(yy);
  const display = value
    ? (() => {
        const [yy, mm, dd] = value.split('-').map(Number);
        return `${dd} ${MONTHS[mm - 1]} ${yy}`;
      })()
    : '';

  return (
    <div className={`dob ${open ? 'is-open' : ''}`} ref={wrap}>
      <button type="button" id={id} className={`dob-btn ${invalid ? 'invalid' : ''}`} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="dob-cake" aria-hidden="true"><Icon name="cake" size={18} /></span>
        <span className={display ? 'dob-val' : 'dob-ph'}>{display || 'Day · Month · Year'}</span>
        <Icon name="calendar" size={18} className="dob-cal" />
      </button>
      {open && (
        <div className="dob-pop" role="dialog" aria-label="Choose your date of birth">
          <div className="dob-head">
            <button type="button" aria-label="Previous month" onClick={() => (m === 1 ? (setM(12), setY(y - 1)) : setM(m - 1))} disabled={y <= minYear && m === 1}>
              <Icon name="arrowLeft" size={16} />
            </button>
            <select aria-label="Month" value={m} onChange={(e) => setM(Number(e.target.value))}>
              {MONTHS.map((mn, i) => <option key={mn} value={i + 1}>{mn}</option>)}
            </select>
            <select aria-label="Year" value={y} onChange={(e) => setY(Number(e.target.value))}>
              {years.map((yy) => <option key={yy} value={yy}>{yy}</option>)}
            </select>
            <button type="button" aria-label="Next month" onClick={() => (m === 12 ? (setM(1), setY(y + 1)) : setM(m + 1))} disabled={y >= maxYear && m === 12}>
              <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="dob-grid" role="grid">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className="dow" aria-hidden="true">{d}</span>)}
            {Array.from({ length: first }).map((_, i) => <span key={'b' + i} />)}
            {Array.from({ length: days }).map((_, i) => {
              const v = `${y}-${pad(m)}-${pad(i + 1)}`;
              return (
                <button
                  type="button"
                  key={v}
                  className={value === v ? 'sel' : ''}
                  aria-label={`${i + 1} ${MONTHS[m - 1]} ${y}`}
                  aria-pressed={value === v}
                  onClick={() => { onChange(v); setOpen(false); }}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <p className="dob-note"><Icon name="lock" size={12} /> Used for age validation only · {MIN_AGE}+ to join</p>
        </div>
      )}
    </div>
  );
}

/* ---------- Password ---------- */
const STRENGTH = ['Too weak', 'Weak', 'Fair', 'Strong', 'Excellent'];
export function PasswordField({ id, value, onChange, invalid, showMeter = true, autoComplete = 'new-password', placeholder = 'At least 8 characters' }) {
  const [show, setShow] = useState(false);
  const s = passwordStrength(value);
  return (
    <div className="pw">
      <div className={`pw-row ${invalid ? 'invalid' : ''}`}>
        <Icon name="lock" size={18} />
        <input id={id} type={show ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} placeholder={placeholder} aria-invalid={invalid || undefined} />
        <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? 'Hide password' : 'Show password'}>
          <Icon name={show ? 'eyeOff' : 'eye'} size={18} />
        </button>
      </div>
      {showMeter && value && (
        <div className={`pw-meter s${s}`} aria-live="polite">
          <span><i /><i /><i /><i /></span>
          <em>{STRENGTH[s]}</em>
        </div>
      )}
    </div>
  );
}

/* ---------- CAPTCHA ---------- */
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function makeCode() {
  let s = '';
  for (let i = 0; i < 5; i++) s += CHARS[Math.floor(Math.random() * CHARS.length)];
  return s;
}
function makeSum() {
  const a = 2 + Math.floor(Math.random() * 8);
  const b = 1 + Math.floor(Math.random() * 9);
  return { q: `${a} + ${b}`, a: String(a + b) };
}

/**
 * Visual CAPTCHA with an accessible maths alternative. Calls onChange(isValid).
 * `resetKey` — change it to force a new challenge (e.g. after a failed submit).
 * NOTE: client-side CAPTCHA deters casual bots only. For production, also verify a server-side
 * challenge (e.g. Cloudflare Turnstile or Google reCAPTCHA) — see README.
 */
export function Captcha({ onChange, invalid, resetKey = 0 }) {
  const uid = useId();
  const canvas = useRef(null);
  const [mode, setMode] = useState('image');
  const [code, setCode] = useState('');
  const [sum, setSum] = useState({ q: '', a: '' });
  const [input, setInput] = useState('');
  const [ok, setOk] = useState(false);

  const regen = () => {
    setCode(makeCode());
    setSum(makeSum());
    setInput('');
    setOk(false);
    onChange?.(false);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(regen, [resetKey]);

  useEffect(() => {
    const c = canvas.current;
    if (!c || !code || mode !== 'image') return;
    const dpr = window.devicePixelRatio || 1;
    const W = 170, H = 52;
    c.width = W * dpr;
    c.height = H * dpr;
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    const grd = g.createLinearGradient(0, 0, W, H);
    grd.addColorStop(0, '#eef2ff');
    grd.addColorStop(1, '#ecfeff');
    g.fillStyle = grd;
    g.fillRect(0, 0, W, H);
    for (let i = 0; i < 6; i++) {
      g.strokeStyle = `hsla(${Math.random() * 360},70%,55%,.45)`;
      g.lineWidth = 1 + Math.random() * 1.5;
      g.beginPath();
      g.moveTo(Math.random() * W, Math.random() * H);
      g.bezierCurveTo(Math.random() * W, Math.random() * H, Math.random() * W, Math.random() * H, Math.random() * W, Math.random() * H);
      g.stroke();
    }
    for (let i = 0; i < 40; i++) {
      g.fillStyle = `hsla(${Math.random() * 360},60%,50%,.35)`;
      g.fillRect(Math.random() * W, Math.random() * H, 2, 2);
    }
    const colors = ['#1e3a8a', '#b91c1c', '#047857', '#7c3aed', '#c2410c'];
    [...code].forEach((ch, i) => {
      g.save();
      g.translate(20 + i * 30, 34 + (Math.random() * 8 - 4));
      g.rotate((Math.random() - 0.5) * 0.6);
      g.font = `800 ${26 + Math.random() * 6}px Manrope, Inter, sans-serif`;
      g.fillStyle = colors[i % colors.length];
      g.fillText(ch, -8, 0);
      g.restore();
    });
  }, [code, mode]);

  const check = (v) => {
    setInput(v);
    const valid = mode === 'image' ? v.trim().toUpperCase() === code : v.trim() === sum.a;
    setOk(valid);
    onChange?.(valid);
  };

  return (
    <div className={`captcha ${ok ? 'is-ok' : ''} ${invalid ? 'invalid' : ''}`}>
      <div className="captcha-top">
        <span className="captcha-badge"><Icon name="shieldCheck" size={16} /> Human check</span>
        <button type="button" className="captcha-switch" onClick={() => { setMode(mode === 'image' ? 'math' : 'image'); setInput(''); setOk(false); onChange?.(false); }}>
          {mode === 'image' ? 'Use a maths question' : 'Use an image code'}
        </button>
      </div>
      <div className="captcha-body">
        {mode === 'image' ? (
          <canvas ref={canvas} className="captcha-canvas" style={{ width: 170, height: 52 }} role="img" aria-label="Security code image. Switch to the maths question if you cannot read it." />
        ) : (
          <div className="captcha-math" aria-live="polite">What is <b>{sum.q}</b>?</div>
        )}
        <button type="button" className="captcha-refresh" onClick={regen} aria-label="Get a new challenge">
          <Icon name="refresh" size={18} />
        </button>
        <input
          id={uid}
          value={input}
          onChange={(e) => check(e.target.value)}
          placeholder={mode === 'image' ? 'Type the code' : 'Answer'}
          aria-label={mode === 'image' ? 'Type the characters shown' : `Answer: what is ${sum.q}`}
          autoComplete="off"
          inputMode={mode === 'math' ? 'numeric' : 'text'}
          maxLength={6}
        />
        <span className="captcha-tick" aria-hidden="true"><Icon name="check" size={18} stroke={3} /></span>
      </div>
    </div>
  );
}
