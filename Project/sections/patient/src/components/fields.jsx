import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { asset, countryFlag } from '../lib/asset.js';
import { useI18n } from '../lib/i18n.js';
import { loadStateFlags } from '../lib/data.js';
import { PHONE, parsePhone } from '../lib/phone.js';
import { sound } from '../lib/sound.js';

/* ------------------------------------------------------------------ flags */
/** country flag image (works on every OS, unlike emoji flags) */
export const Flag = memo(function Flag({ cc, size = 22, label }) {
  return (
    <img className="flag" src={countryFlag(cc)} width={Math.round(size * 1.333)} height={size} alt={label || ''} aria-hidden={label ? undefined : 'true'}
      loading="lazy" decoding="async" onError={(e) => { if (!e.currentTarget.dataset.fb) { e.currentTarget.dataset.fb = 1; e.currentTarget.src = countryFlag('xx'); } }} />
  );
});

let flagSet = null;
/** state / province flag; states without an official flag get a badge: country flag + state code */
export const StateFlag = memo(function StateFlag({ code, size = 22 }) {
  const [has, setHas] = useState(() => (flagSet ? flagSet.has(code) : null));
  useEffect(() => {
    if (has !== null) return undefined;
    let live = true;
    loadStateFlags().then((s) => { flagSet = s; if (live) setHas(s.has(code)); });
    return () => { live = false; };
  }, [code, has]);
  const cc = String(code).slice(0, 2).toLowerCase();
  if (has) return <img className="flag sflag" src={asset('images/flags/s/' + code + '.webp')} width={Math.round(size * 1.5)} height={size} alt="" aria-hidden="true" loading="lazy" decoding="async" />;
  return (
    <span className="sbadge" aria-hidden="true" style={{ '--h': size + 'px' }}>
      <img src={countryFlag(cc)} alt="" width={Math.round(size * 1.333)} height={size} loading="lazy" />
      <b>{String(code).split('-').slice(1).join('-').slice(0, 3)}</b>
    </span>
  );
});

/** emoji flags (🇮🇳) become images so they render on Windows too */
const RI = /^(\uD83C[\uDDE6-\uDDFF]){2}$/;
export function EmojiOrFlag({ e }) {
  if (RI.test(e)) {
    const cps = [...e].map((c) => c.codePointAt(0) - 0x1f1e6 + 65);
    return <Flag cc={String.fromCharCode(...cps)} size={20} />;
  }
  return <>{e}</>;
}

/* ------------------------------------------------------------------ name: first · middle · last */
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}'’.\- ]*$/u;
export function nameErr(v, required) {
  const s = v.trim();
  if (!s) return required ? ['required'] : null;
  if (s.length > 40) return ['maxChars', { n: 40 }];
  if (/\d/.test(s)) return ['noDigits'];
  if (!NAME_RE.test(s)) return ['lettersOnly'];
  if (/(.)\1{3,}/u.test(s)) return ['realName'];
  return null;
}
export function splitName(ans) {
  if (ans?.parts) return { f: ans.parts.f || '', m: ans.parts.m || '', l: ans.parts.l || '' };
  const w = String(ans?.v || '').trim().split(/\s+/).filter(Boolean);
  if (!w.length) return { f: '', m: '', l: '' };
  if (w.length === 1) return { f: w[0], m: '', l: '' };
  return { f: w[0], m: w.slice(1, -1).join(' '), l: w[w.length - 1] };
}

export function NameInput({ name, ans, onSubmit, fail, setErr, isLast }) {
  const { t } = useI18n();
  const [p, setP] = useState(() => splitName(ans));
  const [bad, setBad] = useState({});
  const refs = { f: useRef(null), m: useRef(null), l: useRef(null) };
  useEffect(() => { const id = setTimeout(() => refs.f.current?.focus({ preventScroll: true }), 60); return () => clearTimeout(id); }, []); // eslint-disable-line
  const submit = () => {
    const errs = { f: nameErr(p.f, true), m: nameErr(p.m, false), l: nameErr(p.l, false) };
    const k = ['f', 'm', 'l'].find((x) => errs[x]);
    setBad(errs);
    if (k) { refs[k].current?.focus(); return fail([errs[k][0], { ...(errs[k][1] || {}), field: t('name.' + k) }]); }
    sound.tap(4);
    const parts = { f: p.f.trim(), m: p.m.trim(), l: p.l.trim() };
    onSubmit(name, { v: [parts.f, parts.m, parts.l].filter(Boolean).join(' '), parts });
  };
  const field = (k, req, ac) => (
    <label className={'nm-f' + (bad[k] ? ' bad' : '') + (p[k].trim() ? ' filled' : '')}>
      <span className="nm-lab">{t('name.' + k)} {req ? <i className="req" aria-hidden="true">*</i> : <small>{t('run.optional')}</small>}</span>
      <input ref={refs[k]} type="text" value={p[k]} maxLength={40} autoComplete={ac} aria-required={req} aria-invalid={!!bad[k]}
        onChange={(e) => { setP({ ...p, [k]: e.target.value }); if (bad[k]) { setBad({ ...bad, [k]: null }); setErr(null); } }}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }} placeholder={t('name.' + k + 'Ph')} spellCheck="false" />
    </label>
  );
  return (
    <div className="text-q name-q">
      <div className="nm-grid">
        {field('f', true, 'given-name')}
        {field('m', false, 'additional-name')}
        {field('l', false, 'family-name')}
      </div>
      {p.f.trim() && <p className="nm-preview"><span className="emo" aria-hidden="true">👋</span> {t('name.hello', { name: [p.f, p.m, p.l].map((x) => x.trim()).filter(Boolean).join(' ') })}</p>}
      <div className="q-actions">
        <button className="btn primary big" type="button" onClick={submit}>{isLast ? t('run.finish') + ' ✓' : t('run.next')} <span aria-hidden="true">→</span></button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ phone: flag · country · +code · number */
function guessCountry(ctx) {
  const a = ctx?.answers?.country?.v;
  if (a && PHONE[a]) return a;
  try {
    const reg = (navigator.language || '').split('-')[1];
    if (reg && PHONE[reg.toUpperCase()]) return reg.toUpperCase();
  } catch {}
  return 'IN';
}
export function PhoneInput({ name, ans, ctx, onSubmit, fail, setErr, isLast, optional, check }) {
  const { t, country } = useI18n();
  const init = ans?.v ? parsePhone(ans.v, guessCountry(ctx)) : null;
  const [cc, setCc] = useState(init && !init.error ? init.country : guessCountry(ctx));
  const [num, setNum] = useState(init && !init.error ? init.nsn : '');
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef(null);
  const sref = useRef(null);
  useEffect(() => { const id = setTimeout(() => ref.current?.focus({ preventScroll: true }), 60); return () => clearTimeout(id); }, []);
  useEffect(() => { if (open) sref.current?.focus({ preventScroll: true }); }, [open]);
  const list = useMemo(() => Object.entries(PHONE).map(([c, m]) => ({ c, dial: m.dial, n: country(c, c) }))
    .filter((x) => /^[A-Z]{2}$/.test(x.c)).sort((a, b) => a.n.localeCompare(b.n)), [country]);
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase().replace(/^\+/, '');
    return s ? list.filter((x) => x.n.toLowerCase().includes(s) || x.dial.startsWith(s) || x.c.toLowerCase() === s) : list;
  }, [q, list]);
  const e164 = () => { const d = num.replace(/[^\d+]/g, ''); return d.startsWith('+') ? d : d ? '+' + PHONE[cc].dial + d.replace(/^0+/, '') : ''; };
  const submit = () => {
    const v = e164();
    if (!v && optional) return onSubmit(name, { v: '', s: 1 });
    const e = check(v, cc);
    if (e) { ref.current?.focus(); return fail(e); }
    sound.tap(4);
    const p = parsePhone(v, cc);
    onSubmit(name, { v: p.e164, cc: p.country });
  };
  const m = PHONE[cc];
  return (
    <div className="text-q phone-q">
      <div className="ph-row" dir="ltr">
        <button type="button" className="ph-cc" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={t('phone.code') + ': ' + country(cc, cc) + ' +' + m.dial}>
          <Flag cc={cc} size={22} />
          <span className="ph-cn">{country(cc, cc)}</span>
          <b>+{m.dial}</b>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <input ref={ref} type="tel" inputMode="tel" autoComplete="tel-national" value={num} maxLength={20} aria-label={t('phone.num')}
          placeholder={'9'.repeat(Math.min(10, m.max)).replace(/(\d{3})(?=\d)/g, '$1 ')}
          onChange={(e) => {
            const v = e.target.value;
            if (v.trim().startsWith('+')) { const p = parsePhone(v); if (p && !p.error && p.country) { setCc(p.country); setNum(p.nsn); setErr(null); return; } }
            setNum(v); setErr(null);
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }} />
      </div>
      <p className="ph-hint"><Flag cc={cc} size={14} /> {t('phone.hint', { country: country(cc, cc), code: '+' + m.dial, n: m.min === m.max ? m.min : m.min + '–' + m.max })}</p>
      {open && (
        <div className="ph-pick">
          <div className="search-box"><span aria-hidden="true">🔎</span><input ref={sref} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('phone.search')} aria-label={t('phone.search')} /></div>
          <ul className="listbox" role="listbox" aria-label={t('phone.code')}>
            {shown.map((x) => (
              <li key={x.c} role="option" aria-selected={x.c === cc} className={x.c === cc ? 'on' : ''}
                onClick={() => { setCc(x.c); setOpen(false); setQ(''); sound.tap(2); setTimeout(() => ref.current?.focus(), 30); }}>
                <span className="emo"><Flag cc={x.c} size={18} /></span><span>{x.n}</span><b className="ph-d">+{x.dial}</b>
              </li>
            ))}
            {!shown.length && <li className="none" role="presentation">{t('run.noMatch')}</li>}
          </ul>
        </div>
      )}
      <div className="q-actions">
        {optional && <button className="btn ghost" type="button" onClick={() => onSubmit(name, { v: '', s: 1 })}>{t('run.skip')}</button>}
        <button className="btn primary big" type="button" onClick={submit}>{isLast ? t('run.finish') + ' ✓' : t('run.next')} <span aria-hidden="true">→</span></button>
      </div>
    </div>
  );
}
