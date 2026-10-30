import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { optionLabel } from '../lib/display.js';
import { sfx, tap } from '../lib/sound.js';
import { upload } from '../lib/bridge.js';
import { emojiFor } from '../lib/optionEmoji.js';
import { PHONE } from '../lib/phone-meta.js';
import { currencyInfo } from '../lib/geo.js';
import { Flag, StateFlag } from './Flag.jsx';
import DatePicker from './DatePicker.jsx';
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/* ------------------------------------------------------------------ Other → please specify */
function Specify({ value, onChange, autoFocus }) {
  const { t } = useI18n();
  const ref = useRef(null);
  useEffect(() => { if (autoFocus) setTimeout(() => ref.current?.focus(), 60); }, [autoFocus]);
  return (
    <label className="specify">
      <span className="specify__lbl">✍️ {t('specifyOther')} <b aria-hidden="true">*</b></span>
      <input
        ref={ref}
        className="input"
        type="text"
        maxLength={120}
        value={value || ''}
        placeholder={t('specifyPlaceholder')}
        onChange={(e) => onChange(e.target.value)}
        aria-required="true"
      />
    </label>
  );
}

/* ------------------------------------------------------------------ currency of the answered country (income questions) */
export function CurrencyNote({ cc }) {
  const { t, lang } = useI18n();
  const info = useMemo(() => currencyInfo(cc, lang), [cc, lang]);
  if (!info) return null;
  return (
    <p className="cur-note">
      <Flag cc={cc} size={24} />
      <span>{t('incomeIn')} <b>{info.name}</b></span>
      <span className="cur-sym mono" aria-hidden="true">{info.symbol}</span>
      <span className="cur-code mono">{info.code}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ single / multi choice cards */
export function ChoiceField({ q, name, options, value, onChange, otherText, onOther, onAuto, get }) {
  const i18n = useI18n();
  const { t } = i18n;
  const multi = q.type === 'multi';
  const sel = multi ? (Array.isArray(value) ? value : []) : value;
  const otherOn = options.some((o) => o.other && (multi ? sel.includes(o.v) : sel === o.v));
  const many = options.length > 6;
  const emos = useMemo(() => emojiFor(name, options), [name, options]);

  const pick = (o) => {
    if (multi) {
      let next;
      if (sel.includes(o.v)) { next = sel.filter((x) => x !== o.v); sfx('deselect'); }
      else {
        tap(options.indexOf(o));
        if (o.exclusive) next = [o.v];
        else next = [...sel.filter((x) => !options.find((k) => k.v === x)?.exclusive), o.v];
      }
      onChange(next);
    } else {
      tap(options.indexOf(o));
      onChange(o.v);
      if (!o.other) onAuto?.(o.v);
    }
  };

  // letter-key shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input, textarea, select') || e.metaKey || e.ctrlKey || e.altKey) return;
      const i = LETTERS.indexOf(e.key.toUpperCase());
      if (i >= 0 && i < options.length) { e.preventDefault(); pick(options[i]); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const income = name === 'personal-income' || name === 'household-income';
  return (
    <div className="choices-wrap">
      {income && <CurrencyNote cc={get?.('country')} />}
      {multi && <p className="hint">☑️ {q.max ? t('selectUpTo', { n: q.max }) : t('selectMany')}{sel.length ? ` · ${t('selected', { n: sel.length })}` : ''}</p>}
      <div className={`choices${many ? ' choices--many' : ''}${options.length === 2 ? ' choices--duo' : ''}`} role={multi ? 'group' : 'radiogroup'} aria-label={i18n.q(name, q.label)}>
        {options.map((o, i) => {
          const on = multi ? sel.includes(o.v) : sel === o.v;
          const emo = emos[i];
          return (
            <button
              key={`${o.v}-${i}`}
              type="button"
              role={multi ? 'checkbox' : 'radio'}
              aria-checked={on}
              className={`choice${on ? ' is-on' : ''}`}
              style={{ '--d': `${Math.min(i, 12) * 30}ms` }}
              onClick={() => pick(o)}
            >
              <span className="choice__key" aria-hidden="true">{LETTERS[i] || '•'}</span>
              {emo && <span className="choice__emo" aria-hidden="true">{emo}</span>}
              <span className="choice__txt">{optionLabel(q, name, o, i18n, get)}</span>
              <span className="choice__tick" aria-hidden="true">{multi ? '✓' : ''}</span>
            </button>
          );
        })}
      </div>
      {otherOn && <Specify value={otherText} onChange={onOther} autoFocus />}
    </div>
  );
}

/* ------------------------------------------------------------------ searchable list (long option sets, countries, lazy lists) */
export function ComboField({ q, name, options, status, value, onChange, otherText, onOther, onAuto, get, pendingRef }) {
  const i18n = useI18n();
  const { t } = i18n;
  const [term, setTerm] = useState('');
  const [hi, setHi] = useState(0);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const isCountry = q.type === 'country';
  const isState = q.source === 'states';
  const free = status === 'free';
  const allowCustom = free || q.source === 'cities';

  const labelled = useMemo(() => options.map((o) => ({ ...o, text: optionLabel(q, name, o, i18n, get) })), [options, q, name, i18n, get]);
  const filtered = useMemo(() => {
    const s = term.trim().toLowerCase();
    const base = s ? labelled.filter((o) => o.text.toLowerCase().includes(s) || o.l.toLowerCase().includes(s) || String(o.v).toLowerCase() === s) : labelled;
    return base.slice(0, 120);
  }, [labelled, term]);
  const selected = labelled.find((o) => o.v === value);
  const otherOn = selected?.other;
  const emos = useMemo(() => (isCountry || isState ? null : emojiFor(name, options)), [isCountry, isState, name, options]);
  const emoOf = useMemo(() => { const m = new Map(); if (emos) options.forEach((o, i) => m.set(o.v, emos[i])); return m; }, [emos, options]);
  const lead = (o, big) => (isCountry ? <Flag cc={String(o.v)} size={big ? 26 : 24} /> : isState ? <StateFlag code={String(o.v)} size={big ? 30 : 26} /> : <span className="opt-emo" aria-hidden="true">{emoOf.get(o.v) || '•'}</span>);

  useEffect(() => { setHi(0); }, [term]);
  useEffect(() => { if (!free) setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 80); }, [free]);
  /* "Next" pressed while something is typed but not picked: use the only match, an exact match, or (cities / free
     lists) the typed text — so the flow never gets stuck on a typed-but-not-clicked answer */
  useEffect(() => {
    if (!pendingRef) return undefined;
    pendingRef.current = () => {
      const s = term.trim();
      if (!s) return undefined;
      const exact = filtered.find((o) => o.text.toLowerCase() === s.toLowerCase());
      if (exact) return exact.v;
      if (filtered.length === 1) return filtered[0].v;
      if (allowCustom && s.length > 1) return s;
      return undefined;
    };
    return () => { pendingRef.current = null; };
  });

  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${hi}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [hi]);

  const choose = (o) => {
    tap(filtered.indexOf(o));
    onChange(o.v);
    setTerm('');
    if (!o.other) onAuto?.(o.v);
  };

  if (status === 'loading') return <div className="skeleton" aria-busy="true">{t('loading')}</div>;

  if (free) {
    return (
      <input className="input input--lg" type="text" value={value || ''} maxLength={80} placeholder={t('specifyPlaceholder')}
        onChange={(e) => onChange(e.target.value)} autoFocus />
    );
  }

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(filtered.length - 1, h + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(0, h - 1)); }
    else if (e.key === 'Enter') {
      if (filtered[hi]) { e.preventDefault(); e.stopPropagation(); choose(filtered[hi]); }
      else if (allowCustom && term.trim().length > 1) { e.preventDefault(); e.stopPropagation(); onChange(term.trim()); setTerm(''); onAuto?.(term.trim()); }
    }
  };

  const income = name === 'personal-income' || name === 'household-income';
  return (
    <div className="combo">
      {income && <CurrencyNote cc={get?.('country')} />}
      {selected && (
        <div className="combo__sel">
          {lead(selected, true)}
          <span>{selected.text}</span><b className="combo__ok" aria-hidden="true">✓</b>
        </div>
      )}
      {!selected && value && <div className="combo__sel"><span>✔ {value}</span></div>}
      <div className="combo__search">
        <span aria-hidden="true">🔎</span>
        <input
          ref={inputRef}
          className="input"
          type="search"
          role="combobox"
          aria-expanded="true"
          aria-controls={`lb-${name}`}
          aria-activedescendant={filtered[hi] ? `opt-${name}-${hi}` : undefined}
          value={term}
          placeholder={t('search')}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={onKey}
        />
      </div>
      <ul className="combo__list" id={`lb-${name}`} role="listbox" ref={listRef} aria-label={i18n.q(name, q.label)}>
        {filtered.map((o, i) => (
          <li
            key={`${o.v}-${i}`}
            id={`opt-${name}-${i}`}
            data-i={i}
            role="option"
            aria-selected={o.v === value}
            className={`combo__opt${o.v === value ? ' is-on' : ''}${i === hi ? ' is-hi' : ''}`}
            onPointerEnter={() => setHi(i)}
            onClick={() => choose(o)}
          >
            {lead(o)}
            <span>{o.text}</span>
            {o.v === value && <b aria-hidden="true">✓</b>}
          </li>
        ))}
        {!filtered.length && (
          <li className="combo__empty">
            {allowCustom && term.trim().length > 1
              ? <button type="button" className="btn btn--card" onClick={() => { onChange(term.trim()); setTerm(''); onAuto?.(term.trim()); }}>{t('useTyped', { v: term.trim() })}</button>
              : t('noMatches')}
          </li>
        )}
      </ul>
      {otherOn && <Specify value={otherText} onChange={onOther} autoFocus />}
    </div>
  );
}

/* ------------------------------------------------------------------ text-like inputs */
const ICON = { email: '✉️', url: '🔗', tel: '📞', text: '✏️', handle: '@', year: '📆', number: '#️⃣' };

export function TextField({ q, name, value, onChange, onEnter, get, onPicked }) {
  const { t } = useI18n();
  const ref = useRef(null);
  useEffect(() => { setTimeout(() => ref.current?.focus({ preventScroll: true }), 80); }, [name]);
  const masked = value && typeof value === 'object' && value.__masked;
  const v = masked ? '' : (value ?? '');
  const common = {
    ref,
    id: `f-${name}`,
    className: 'input input--lg',
    value: v,
    maxLength: q.max || (q.type === 'textarea' ? 500 : 200),
    placeholder: masked ? `${value.__masked} — ${t('uploadReplace')}` : (q.placeholder || ''),
    autoComplete: q.autocomplete || 'on',
    'aria-describedby': `err-${name}`,
    onChange: (e) => onChange(q.upper ? e.target.value.toUpperCase() : e.target.value),
    onKeyDown: (e) => { if (e.key === 'Enter' && q.type !== 'textarea') { e.preventDefault(); onEnter?.(); } },
  };

  if (q.type === 'textarea') {
    return (
      <div className="field">
        <textarea {...common} rows={4} />
        <span className="counter">{String(v).length}/{q.max || 500}</span>
      </div>
    );
  }
  if (q.type === 'date') {
    return <DatePicker name={name} value={typeof value === 'string' ? value : ''} onChange={onChange} minAge={q.minAge || 18} maxAge={q.maxAge || 100} onPicked={onPicked} />;
  }
  if (q.type === 'year' || q.type === 'number') {
    const min = q.type === 'year' ? (q.minYear || 1950) : q.min;
    const max = q.type === 'year' ? new Date().getFullYear() : q.max;
    const step = (d) => { sfx('click'); const n = Number(v || (q.type === 'year' ? max : min)) + d; onChange(String(Math.max(min, Math.min(max, n)))); };
    return (
      <div className="field field--num">
        <button type="button" className="stepper" onClick={() => step(-1)} aria-label="−">−</button>
        <input {...common} type="number" inputMode="numeric" min={min} max={max} onChange={(e) => onChange(e.target.value)} />
        <button type="button" className="stepper" onClick={() => step(1)} aria-label="+">+</button>
        {q.unit && <span className="field__unit">{q.unit}</span>}
      </div>
    );
  }
  const type = q.type === 'email' ? 'email' : q.type === 'url' ? 'url' : 'text';
  return (
    <div className={`field field--icon${q.prefix ? ' field--prefix' : ''}`}>
      <span className="field__icon" aria-hidden="true">{q.prefix || ICON[q.type] || '✏️'}</span>
      <input {...common} type={type} inputMode={q.inputmode || (type === 'email' ? 'email' : type === 'url' ? 'url' : undefined)} spellCheck={type === 'text'} />
      {q.max && type === 'text' && String(v).length > q.max * 0.7 && <span className="counter">{String(v).length}/{q.max}</span>}
    </div>
  );
}

export function RangeField({ q, value, onChange }) {
  const v = value === undefined || value === '' ? Math.round((q.min + q.max) / 2) : Number(value);
  useEffect(() => { if (value === undefined || value === '') onChange(v); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="range">
      <output className="range__out" style={{ '--p': `${((v - q.min) / (q.max - q.min)) * 100}%` }}>{v}{q.unit}</output>
      <input type="range" min={q.min} max={q.max} step={q.step || 1} value={v} onChange={(e) => { onChange(Number(e.target.value)); }} onPointerUp={() => sfx('click')} />
      <div className="range__ends"><span>{q.min}{q.unit}</span><span>{q.max}{q.unit}</span></div>
    </div>
  );
}

export function FileField({ q, name, value, onChange }) {
  const { t } = useI18n();
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);
  const take = (file) => {
    if (!file) return;
    sfx('select');
    const meta = { name: file.name, size: file.size, type: file.type };
    if (file.type.startsWith('image/') && file.size < 5 * 1024 * 1024) {
      const r = new FileReader();
      r.onload = () => onChange({ ...meta, dataUrl: r.result });
      r.readAsDataURL(file);
    } else onChange(meta);
    upload(file, name);
  };
  return (
    <div
      className={`drop${drag ? ' is-drag' : ''}${value ? ' has-file' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files?.[0]); }}
    >
      <input ref={inputRef} type="file" accept={q.accept} className="sr-only" id={`f-${name}`} onChange={(e) => take(e.target.files?.[0])} />
      {value ? (
        <div className="drop__file">
          {value.dataUrl ? <img src={value.dataUrl} alt={value.name} width="72" height="72" /> : <span className="drop__doc" aria-hidden="true">📄</span>}
          <div><strong>{value.name}</strong><small>{(value.size / 1024 / 1024).toFixed(2)} MB</small></div>
          <button type="button" className="btn btn--card" onClick={() => inputRef.current?.click()}>{t('uploadReplace')}</button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => { sfx('deselect'); onChange(undefined); }}>{t('remove')}</button>
        </div>
      ) : (
        <label htmlFor={`f-${name}`} className="drop__cta">
          <span className="drop__icon" aria-hidden="true">☁️⬆️</span>
          <strong>{t('uploadCta')}</strong>
          <small>{t('uploadHint', { n: q.maxMB || 5 })}</small>
        </label>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ name: three boxes
 * First name (required) · Middle name (optional) · Last name (optional).
 * The answer keeps the v1 shape — `fullname` = "First Middle Last" (your backend keeps working) — and the parts are
 * stored next to it as `fullname::parts` = { first, middle, last }. Enter in any box continues (Tab moves between them).
 */
export const splitName = (v) => {
  const w = String(v || '').trim().split(/\s+/).filter(Boolean);
  if (!w.length) return { first: '', middle: '', last: '' };
  if (w.length === 1) return { first: w[0], middle: '', last: '' };
  if (w.length === 2) return { first: w[0], middle: '', last: w[1] };
  return { first: w[0], middle: w.slice(1, -1).join(' '), last: w[w.length - 1] };
};
export const joinName = (pt) => [pt.first, pt.middle, pt.last].map((x) => String(x || '').trim()).filter(Boolean).join(' ');

export function NameField({ name, parts, onChange, onEnter, bad }) {
  const { t } = useI18n();
  const pt = parts || { first: '', middle: '', last: '' };
  const r0 = useRef(null);
  useEffect(() => { const id = setTimeout(() => r0.current?.focus({ preventScroll: true }), 80); return () => clearTimeout(id); }, []);
  const set = (k) => (e) => onChange({ ...pt, [k]: e.target.value.replace(/\s{2,}/g, ' ') });
  const key = (e) => { if (e.key === 'Enter') { e.preventDefault(); onEnter?.(); } };
  const box = (k, label, emoji, req, ac, ref) => (
    <label className={'nm-box' + (bad === k ? ' bad' : '') + (String(pt[k] || '').trim() ? ' filled' : '')}>
      <span className="nm-lbl"><span aria-hidden="true">{emoji}</span> {label} {req ? <b className="req" aria-hidden="true">*</b> : <em>{t('optional')}</em>}</span>
      <input ref={ref} id={`f-${name}-${k}`} className="input input--lg" type="text" value={pt[k] || ''} maxLength={40} autoComplete={ac}
        required={req} aria-required={req} aria-invalid={bad === k || undefined} aria-describedby={`err-${name}`} onChange={set(k)} onKeyDown={key} />
    </label>
  );
  const full = joinName(pt);
  return (
    <div className="namef">
      <div className="nm-grid">
        {box('first', t('nameFirst'), '🙂', true, 'given-name', r0)}
        {box('middle', t('nameMiddle'), '🔤', false, 'additional-name')}
        {box('last', t('nameLast'), '🪪', false, 'family-name')}
      </div>
      {full && <p className="nm-preview"><span className="mono">ID</span> {full}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ phone with country flag · name · code
 * A country button (flag + calling code, defaults to the country answered earlier) that opens a searchable list of every
 * country (flag, name in the current language, +code), and the national number. Validated against that country's
 * number length. Stored as { dial, num, cc } — `dial` + `num` are the v1 fields, so nothing changes for your backend.
 */
let regionDn = {};
const regionName = (cc, lang) => {
  try { regionDn[lang] = regionDn[lang] || new Intl.DisplayNames([lang === 'zh' ? 'zh-CN' : lang], { type: 'region' }); return regionDn[lang].of(cc) || cc; } catch { return cc; }
};

export function PhoneField({ name, value, onChange, get, onEnter }) {
  const { t, lang } = useI18n();
  const home = get('country');
  const ccFromDial = (d) => Object.keys(PHONE).find((k) => PHONE[k].dial === String(d));
  const cc = (value?.cc && PHONE[value.cc] && value.cc) || (value?.dial && home && PHONE[home]?.dial === String(value.dial) && home)
    || (value?.dial && ccFromDial(value.dial)) || (PHONE[home] ? home : 'IN');
  const meta = PHONE[cc];
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState('');
  const [hi, setHi] = useState(0);
  const ref = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);
  useEffect(() => { const id = setTimeout(() => ref.current?.focus({ preventScroll: true }), 80); return () => clearTimeout(id); }, []);
  useEffect(() => { if (open) requestAnimationFrame(() => searchRef.current?.focus({ preventScroll: true })); }, [open]);
  // keep { dial, cc } in the answer even before typing, so the code shown is the code saved
  useEffect(() => { if (!value || value.cc !== cc || value.dial !== meta.dial) onChange({ dial: meta.dial, num: value?.num || '', cc }); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const list = useMemo(() => {
    const all = Object.keys(PHONE).map((c) => ({ c, n: regionName(c, lang), d: PHONE[c].dial }));
    all.sort((a, b) => (a.c === home ? -1 : b.c === home ? 1 : a.n.localeCompare(b.n, lang)));
    const s = term.trim().toLowerCase().replace(/^\+/, '');
    return s ? all.filter((x) => x.n.toLowerCase().includes(s) || x.c.toLowerCase() === s || x.d.startsWith(s) || regionName(x.c, 'en').toLowerCase().includes(s)) : all;
  }, [term, home, lang]);
  useEffect(() => setHi(0), [term]);
  useEffect(() => { listRef.current?.querySelector(`[data-i="${hi}"]`)?.scrollIntoView({ block: 'nearest' }); }, [hi]);

  const choose = (x) => { tap(2); onChange({ dial: x.d, num: value?.num || '', cc: x.c }); setOpen(false); setTerm(''); setTimeout(() => ref.current?.focus(), 30); };
  const n = meta.min === meta.max ? String(meta.min) : `${meta.min}–${meta.max}`;
  return (
    <div className="phonef">
      <div className={'phone' + (open ? ' open' : '')}>
        <button type="button" className="ph-cc" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}
          aria-label={`${t('phoneCountry')}: ${regionName(cc, lang)} +${meta.dial}`}>
          <Flag cc={cc} size={28} />
          <span className="ph-dial mono">+{meta.dial}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <input ref={ref} id={`f-${name}`} className="input input--lg" type="tel" inputMode="tel" autoComplete="tel-national" value={value?.num || ''}
          maxLength={18} aria-describedby={`err-${name}`} placeholder={'98765432109876'.slice(0, meta.max).replace(/^(\d{5})(\d)/, '$1 $2')}
          onChange={(e) => onChange({ dial: meta.dial, num: e.target.value.replace(/[^\d\s-]/g, ''), cc })}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onEnter?.(); } }} />
      </div>
      <p className="ph-country"><Flag cc={cc} size={20} /> <b>{regionName(cc, lang)}</b> <span className="mono">+{meta.dial}</span> <small>· {t('phoneDigits', { n })}</small></p>
      {open && (
        <div className="ph-pop">
          <div className="combo__search"><span aria-hidden="true">🔎</span>
            <input ref={searchRef} className="input" type="search" value={term} onChange={(e) => setTerm(e.target.value)} placeholder={t('phoneSearch')} aria-label={t('phoneSearch')}
              role="combobox" aria-expanded="true" aria-controls={`ph-${name}`} aria-activedescendant={list[hi] ? `ph-${name}-${list[hi].c}` : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); setOpen(false); ref.current?.focus(); }
                else if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(list.length - 1, h + 1)); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(0, h - 1)); }
                else if (e.key === 'Enter' && list[hi]) { e.preventDefault(); e.stopPropagation(); choose(list[hi]); }
              }} />
          </div>
          <ul className="combo__list ph-list" role="listbox" id={`ph-${name}`} ref={listRef} aria-label={t('phoneCountry')}>
            {list.map((x, i) => (
              <li key={x.c} id={`ph-${name}-${x.c}`} data-i={i} role="option" aria-selected={x.c === cc} className={'combo__opt' + (x.c === cc ? ' is-on' : '') + (i === hi ? ' is-hi' : '')}
                onPointerEnter={() => setHi(i)} onClick={() => choose(x)}>
                <Flag cc={x.c} size={24} /><span>{x.n}</span><b className="mono">+{x.d}</b>
              </li>
            ))}
            {!list.length && <li className="combo__empty">{t('noMatches')}</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
