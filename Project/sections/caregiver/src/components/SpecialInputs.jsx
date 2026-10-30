import { useEffect, useMemo, useRef, useState } from 'react';
import { validate } from '../lib/validate.js';
import { sound } from '../lib/sound.js';
import { useI18n } from '../lib/i18n.js';
import { PHONE, MOBILE } from '../lib/phone-meta.js';
import { Flag } from './Flag.jsx';

/* ======================================================================= name: three boxes
 * First name (required) · Middle name (optional) · Last name (optional).
 * Stored as { v: "First Middle Last", parts: { first, middle, last } } — `v` keeps the old "Full Name"
 * field working for your backend; the parts are exported as fullname__first / __middle / __last.
 */
const splitName = (v) => {
  const w = String(v || '').trim().split(/\s+/).filter(Boolean);
  if (!w.length) return { first: '', middle: '', last: '' };
  if (w.length === 1) return { first: w[0], middle: '', last: '' };
  if (w.length === 2) return { first: w[0], middle: '', last: w[1] };
  return { first: w[0], middle: w.slice(1, -1).join(' '), last: w[w.length - 1] };
};

export function NameInput({ name, ans, onSubmit, fail, setErr, isLast }) {
  const { t } = useI18n();
  const init = ans?.parts || splitName(ans?.v);
  const [f, setF] = useState(init.first || '');
  const [m, setM] = useState(init.middle || '');
  const [l, setL] = useState(init.last || '');
  const [bad, setBad] = useState(null);
  const refs = [useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    const id = setTimeout(() => refs[0].current?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = () => {
    const first = f.trim(), middle = m.trim(), last = l.trim();
    let e = validate('fullname', first);
    if (!first) e = ['firstRequired'];
    if (e) { setBad(0); refs[0].current?.focus(); return fail(e); }
    for (const [k, v] of [[1, middle], [2, last]]) {
      const e2 = v ? validate('namepart', v) : null;
      if (e2) { setBad(k); refs[k].current?.focus(); return fail(e2); }
    }
    setBad(null);
    sound.tap(4);
    onSubmit({ v: [first, middle, last].filter(Boolean).join(' '), parts: { first, middle, last } });
  };
  const key = (k) => (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    submit(); // middle + last are optional, so Enter always continues (Tab moves between the boxes)
  };
  const field = (k, id, label, val, set, emoji, req, ac) => (
    <label className={'nm-field' + (bad === k ? ' bad' : '') + (val.trim() ? ' filled' : '')} style={{ '--k': k }}>
      <span className="nm-label"><span className="emo" aria-hidden="true">{emoji}</span>{label}{req ? <b className="req" aria-hidden="true">*</b> : <em>{t('run.optional')}</em>}</span>
      <input ref={refs[k]} id={'in-' + name + '-' + id} type="text" value={val} maxLength={40} autoComplete={ac} required={req}
        aria-required={req} aria-invalid={bad === k || undefined}
        onChange={(e) => { set(e.target.value); setErr(null); if (bad === k) setBad(null); }} onKeyDown={key(k)} />
    </label>
  );
  return (
    <div className="name-q">
      <div className="nm-grid">
        {field(0, 'first', t('name.first'), f, setF, '🙂', true, 'given-name')}
        {field(1, 'middle', t('name.middle'), m, setM, '🔤', false, 'additional-name')}
        {field(2, 'last', t('name.last'), l, setL, '👪', false, 'family-name')}
      </div>
      {f.trim() && <p className="nm-preview"><span className="emo" aria-hidden="true">🪪</span> {[f, m, l].map((x) => x.trim()).filter(Boolean).join(' ')}</p>}
      <div className="q-actions">
        <button className="btn primary big" type="button" onClick={submit}>{isLast ? t('run.finish') + ' ✓' : t('run.next')} <span aria-hidden="true">→</span></button>
      </div>
    </div>
  );
}

/* ======================================================================= phone with country flag + code
 * A country button (flag · name · +code, defaults to the patient's country) and the national number.
 * Validated against the length of that country's numbers (and its mobile pattern for the big markets).
 * Stored as { v: "+91 9876543210", cc: "IN" }.
 */
let regionEn = null;
const enName = (cc) => {
  try { regionEn = regionEn || new Intl.DisplayNames(['en'], { type: 'region' }); return regionEn.of(cc) || cc; } catch { return cc; }
};

function parsePhone(v, prefer) {
  const s = String(v || '').replace(/[^\d+]/g, '');
  if (!s.startsWith('+')) return { cc: prefer, num: s };
  const digits = s.slice(1);
  if (prefer && PHONE[prefer] && digits.startsWith(PHONE[prefer].dial)) return { cc: prefer, num: digits.slice(PHONE[prefer].dial.length) };
  for (let len = 4; len >= 1; len--) {
    const d = digits.slice(0, len);
    const cc = Object.keys(PHONE).find((k) => PHONE[k].dial === d);
    if (cc) return { cc, num: digits.slice(len) };
  }
  return { cc: prefer, num: digits };
}

export function PhoneInput({ name, q, ans, ctx, onSubmit, fail, setErr, isLast, optional }) {
  const { t, country } = useI18n();
  const home = ctx?.answers?.country?.v;
  const start = parsePhone(ans?.v, ans?.cc || (PHONE[home] ? home : 'US'));
  const [cc, setCc] = useState(PHONE[start.cc] ? start.cc : 'US');
  const [num, setNum] = useState(start.num || '');
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState('');
  const ref = useRef(null);
  const searchRef = useRef(null);
  const meta = PHONE[cc];
  const cname = (c) => country(c, enName(c));

  useEffect(() => {
    const id = setTimeout(() => ref.current?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => { if (open) requestAnimationFrame(() => searchRef.current?.focus()); }, [open]);

  const list = useMemo(() => {
    const all = Object.keys(PHONE).map((c) => ({ c, n: cname(c), d: PHONE[c].dial }));
    all.sort((a, b) => (a.c === home ? -1 : b.c === home ? 1 : a.n.localeCompare(b.n)));
    const s = term.trim().toLowerCase().replace(/^\+/, '');
    return s ? all.filter((x) => x.n.toLowerCase().includes(s) || x.c.toLowerCase() === s || x.d.startsWith(s)) : all;
  }, [term, home]); // eslint-disable-line react-hooks/exhaustive-deps

  const submit = () => {
    let d = num.replace(/\D/g, '');
    if (!d && optional) return onSubmit({ v: '', s: q.optional ? 1 : undefined });
    if (d.length === meta.max + 1 && d[0] === '0') d = d.slice(1); // national trunk prefix
    if (!d) { ref.current?.focus(); return fail(['required']); }
    if (d.length < meta.min || d.length > meta.max) {
      ref.current?.focus();
      return fail(['phoneLen', { country: cname(cc), n: meta.min === meta.max ? String(meta.min) : `${meta.min}–${meta.max}` }]);
    }
    if (MOBILE[cc] && !MOBILE[cc].test(d)) { ref.current?.focus(); return fail(['phoneMobile', { country: cname(cc) }]); }
    if (meta.pattern && !meta.pattern.test(d)) { ref.current?.focus(); return fail(['phoneMobile', { country: cname(cc) }]); }
    const e = validate('phone', '+' + meta.dial + d);
    if (e) { ref.current?.focus(); return fail(e); }
    sound.tap(4);
    onSubmit({ v: '+' + meta.dial + ' ' + d, cc });
  };

  return (
    <div className="phone-q">
      <div className={'phone' + (open ? ' open' : '')}>
        <button type="button" className="ph-cc" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label={t('phone.country') + ': ' + cname(cc) + ' +' + meta.dial}>
          <Flag cc={cc} size={28} />
          <span className="ph-dial num">+{meta.dial}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <input ref={ref} id={'in-' + name} type="tel" inputMode="tel" autoComplete="tel-national" value={num} aria-labelledby={'ql-' + name}
          placeholder={'98765432109876'.slice(0, meta.max).replace(/^(\d{5})(\d)/, '$1 $2')}
          onChange={(e) => { setNum(e.target.value.replace(/[^\d\s-]/g, '')); setErr(null); }}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), submit())} />
      </div>
      <p className="ph-country"><Flag cc={cc} size={20} /> <b>{cname(cc)}</b> <span className="num">+{meta.dial}</span> <small>· {t('phone.digits', { n: meta.min === meta.max ? meta.min : `${meta.min}–${meta.max}` })}</small></p>
      {open && (
        <div className="ph-pop">
          <div className="search-box"><span aria-hidden="true">🔎</span>
            <input ref={searchRef} type="search" value={term} onChange={(e) => setTerm(e.target.value)} placeholder={t('phone.search')} aria-label={t('phone.search')}
              onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); if (e.key === 'Enter' && list[0]) { setCc(list[0].c); setOpen(false); ref.current?.focus(); } }} />
          </div>
          <ul className="listbox" role="listbox" aria-label={t('phone.country')}>
            {list.map((x) => (
              <li key={x.c} role="option" aria-selected={x.c === cc} className={x.c === cc ? 'on' : ''} onClick={() => { sound.tap(2); setCc(x.c); setOpen(false); setErr(null); ref.current?.focus(); }}>
                <Flag cc={x.c} size={24} /><span>{x.n}</span><b className="num">+{x.d}</b>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="q-actions">
        <button className="btn primary big" type="button" onClick={submit}>{isLast ? t('run.finish') + ' ✓' : t('run.next')} <span aria-hidden="true">→</span></button>
      </div>
    </div>
  );
}
