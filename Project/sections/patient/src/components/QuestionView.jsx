import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { asArray } from '../lib/engine.js';
import { validate, NO_POSTCODE, zipExample } from '../lib/validate.js';
import { sound } from '../lib/sound.js';
import { useI18n } from '../lib/i18n.js';
import { Flag, StateFlag, EmojiOrFlag, NameInput, PhoneInput } from './fields.jsx';
import DatePicker from './DatePicker.jsx';
import { subjectEmoji } from '../lib/subjectEmoji.js';
import { currencyOf, isMoneyQuestion, moneyLabel, moneyIcon } from '../lib/money.js';
import { phoneError } from '../lib/phone.js';

const CHIP_LIMIT = 12; // more single-choice options than this → searchable list
const GEO_EMOJI = { city: '🏙️', ethnicity: '🧬' };
/**
 * Every option shows a picture that matches it: the emoji from the question bank (q.oe), a real flag image
 * for countries and states (emoji flags do not render on Windows), a rising money icon for income brackets,
 * or an emoji chosen from the option's subject for long lists (degrees, sectors, job titles).
 */
function OptionIcon({ q, o }) {
  if (o.other) return <>✏️</>;
  if (o.money) return <>{o.money}</>;
  if (q.country) return <Flag cc={o.v} size={20} />;
  if (q.geo === 'state') return <StateFlag code={o.v} size={20} />;
  if (q.geo === 'rural') return <>{/rural/i.test(o.l) ? '🌾' : '🏙️'}</>;
  const e = o.e || (q.oe && q.oe[o.i]);
  if (e) return <EmojiOrFlag e={e} />;
  if (q.jobs || (q.options && q.options.length > 12) || q.geo === undefined) return <>{subjectEmoji(o.l, q.emoji || '💬')}</>;
  return <>{GEO_EMOJI[q.geo] || q.emoji || '📍'}</>;
}

/** income / revenue brackets → the country's currency, sorted low → high, with money icons */
function useMoney(name, q, list, ctx) {
  const { tag, t } = useI18n();
  const cc = ctx?.answers?.country?.v;
  return useMemo(() => {
    if (!list || !isMoneyQuestion(name, q)) return { list, note: null };
    const lo = (l) => { const m = /(\d[\d,.]*)/.exec(l); return /^\s*(up ?to|under|below|less)/i.test(l) ? -1 : m ? +m[1].replace(/[^\d.]/g, '') : Infinity; };
    const money = list.filter((o) => !o.other && moneyLabel(o.l, cc, tag, t));
    const rest = list.filter((o) => !money.includes(o));
    const sorted = [...money].sort((a, b) => lo(a.l) - lo(b.l)).map((o, k, a) => ({ ...o, label: moneyLabel(o.l, cc, tag, t), money: moneyIcon(k, a.length, cc) }));
    const cur = currencyOf(cc, tag);
    return { list: [...sorted, ...rest], note: cur ? { cc, text: t('cur.note', { name: cur.label }) } : null };
  }, [name, q, list, cc, tag, t]);
}
function MoneyNote({ note }) {
  if (!note) return null;
  return <p className="money-note"><Flag cc={note.cc} size={16} /> <span className="emo" aria-hidden="true">💱</span> {note.text}</p>;
}

export default function QuestionView({ name, q, ctx, opt, geoErr, onRetryGeo, ans, dir, canBack, onBack, onSubmit, isLast, step }) {
  const { t, tc } = useI18n();
  const [err, setErr] = useState(null);
  const [shake, setShake] = useState(0);
  const headRef = useRef(null);

  const fail = useCallback((e) => {
    setErr(e);
    setShake((n) => n + 1);
    sound.error();
  }, []);

  useEffect(() => {
    if (q.type === 'choice') headRef.current?.focus({ preventScroll: true });
  }, [q.type]);

  const country = ctx.answers.country?.v;
  const zipOptional = name === 'zipcode' && NO_POSTCODE.has(country);
  const multi = !!q.multi;

  const money = useMoney(name, q, opt?.list, ctx);
  let body;
  if (name === 'fullname' || q.rule === 'fullname') {
    body = <NameInput name={name} ans={ans} onSubmit={onSubmit} fail={fail} setErr={setErr} isLast={isLast} />;
  } else if (q.rule === 'phone') {
    body = <PhoneInput name={name} ans={ans} ctx={ctx} onSubmit={onSubmit} fail={fail} setErr={setErr} isLast={isLast} optional={q.optional} check={(v, cc) => phoneError(v, cc)} />;
  } else if (q.type === 'choice') {
    if (!opt || opt.status === 'pending') {
      if (geoErr && (q.geo === 'city' || q.jobs)) {
        body = <TextInput name={name} q={{ ...q, type: 'text', rule: q.jobs ? 'jobtitle' : 'specify', label: q.label }} ans={ans?.v === '__other__' ? { v: ans.o } : null} onSubmit={(a) => onSubmit(name, { v: '__other__', o: a.v })} fail={fail} setErr={setErr} t={t} />;
      } else if (geoErr) {
        body = (
          <div className="loading">
            <p>⚠️ {t('run.loadError')}</p>
            <button className="btn" type="button" onClick={onRetryGeo}>{t('dash.retry')}</button>
          </div>
        );
      } else body = <div className="loading" aria-busy="true"><span className="spinner" aria-hidden="true" /> {t('run.loading')}</div>;
    } else if (!multi && opt.list.length > CHIP_LIMIT) {
      body = <SearchSelect name={name} q={q} list={money.list} ans={ans} onSubmit={onSubmit} fail={fail} setErr={setErr} />;
    } else {
      body = <Choices name={name} q={q} list={money.list} ans={ans} multi={multi} onSubmit={onSubmit} fail={fail} setErr={setErr} isLast={isLast} />;
    }
  } else {
    body = (
      <TextInput
        name={name}
        q={q}
        ans={ans}
        optional={q.optional || zipOptional}
        placeholder={name === 'zipcode' && zipExample(country) ? zipExample(country) : q.placeholder ? tc(q.placeholder) : ''}
        onSubmit={(a) => onSubmit(name, a)}
        ctx={ctx}
        fail={fail}
        setErr={setErr}
        t={t}
        isLast={isLast}
      />
    );
  }

  return (
    <div className={'q-card ' + (dir < 0 ? 'from-left' : 'from-right') + (shake ? ' shake' + (shake % 2) : '')}>
      <div className="q-top">
        <div className="q-emoji emo" aria-hidden="true"><i className="q-halo" /><span>{q.emoji || '💬'}</span></div>
        <div>
          {step && <p className="q-step">{step}</p>}
          <h3 className="q-label" tabIndex={-1} ref={headRef} id={'ql-' + name}>
            {tc(q.label)}
            {(q.optional || zipOptional) && <span className="opt-tag">{t('run.optional')}</span>}
          </h3>
        </div>
      </div>
      {q.type === 'choice' && <MoneyNote note={money.note} />}
      {q.type === 'choice' && <p className="q-hint"><span className="emo" aria-hidden="true">{multi ? '☑️' : '👆'}</span> {multi ? t('run.multi') : t('run.single')}</p>}
      {body}
      <p className={'q-err' + (err ? ' on' : '')} role="alert" aria-live="assertive">
        {err ? <ErrText err={err} t={t} onFix={err[0] === 'emailTypo' ? () => { onSubmit(name, { v: err[1].fix }); } : null} /> : ''}
      </p>
      {canBack && (
        <button className="btn ghost back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> {t('run.back')}
        </button>
      )}
    </div>
  );
}

function ErrText({ err, t, onFix }) {
  return (
    <>
      <span aria-hidden="true">⚠️ </span>
      {t('err.' + err[0], err[1])}
      {onFix && (
        <button className="link" type="button" onClick={onFix}>
          {' '}✓ {err[1].fix}
        </button>
      )}
    </>
  );
}

/* ---------------- chips (single & multi choice) ---------------- */
function Choices({ name, q, list, ans, multi, onSubmit, fail, setErr, isLast }) {
  const { t, tc, country } = useI18n();
  const [sel, setSel] = useState(() => asArray(ans?.v).filter((v) => list.some((o) => o.v === v)));
  const [other, setOther] = useState(ans?.o || '');
  const lock = useRef(false);
  const otherRef = useRef(null);
  const selOther = list.some((o) => o.other && sel.includes(o.v));

  const label = (o) => (o.label ? o.label : q.country ? country(o.v, o.l) : q.geo === 'state' || q.geo === 'ethnicity' ? o.l : tc(o.l));

  const commit = (values, otherText) => {
    const hasOther = list.some((o) => o.other && values.includes(o.v));
    if (!values.length) return fail(['pick']);
    if (hasOther) {
      const e = validate('specify', otherText);
      if (e) { otherRef.current?.focus(); return fail(e); }
    }
    const a = { v: multi ? values : values[0] };
    if (hasOther) a.o = otherText.trim();
    onSubmit(name, a);
  };

  const pick = (o) => {
    if (lock.current) return;
    sound.tap(o.i);
    setErr(null);
    if (!multi) {
      setSel([o.v]);
      if (o.other) {
        requestAnimationFrame(() => otherRef.current?.focus());
        return; // never auto-advance on "Other" – ask to specify first
      }
      lock.current = true;
      setTimeout(() => { lock.current = false; commit([o.v], ''); }, 240);
      return;
    }
    setSel((s) => {
      if (s.includes(o.v)) return s.filter((v) => v !== o.v);
      if (o.excl) return [o.v];
      const exclVals = list.filter((x) => x.excl).map((x) => x.v);
      return [...s.filter((v) => !exclVals.includes(v)), o.v];
    });
    if (o.other && !sel.includes(o.v)) requestAnimationFrame(() => otherRef.current?.focus());
  };

  /* keyboard: A–Z picks an option (letters shown on each tile), Enter continues */
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = /^[a-z]$/i.test(e.key) ? e.key.toUpperCase().charCodeAt(0) - 65 : -1;
      if (k >= 0 && list[k]) { e.preventDefault(); pick(list[k]); }
      else if (e.key === 'Enter' && (multi || selOther || sel.length)) { e.preventDefault(); commit(sel, other); }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  });

  const needsButton = multi || selOther || (sel.length > 0);

  return (
    <>
      <div className={'chips' + (list.length > 6 ? ' many' : '')} role={multi ? 'group' : 'radiogroup'} aria-labelledby={'ql-' + name}>
        {list.map((o, k) => {
          const on = sel.includes(o.v);

          return (
            <button
              key={o.v}
              type="button"
              className={'chip' + (on ? ' on' : '')}
              role={multi ? 'checkbox' : 'radio'}
              aria-checked={on}
              style={{ '--k': k }}
              onClick={() => pick(o)}
            >
              <span className="chip-key emo" aria-hidden="true"><OptionIcon q={q} o={o} /></span>
              <span className="chip-label">{label(o)}</span>
              <span className="chip-check" aria-hidden="true">{k < 26 && <i className="chip-letter">{String.fromCharCode(65 + k)}</i>}<b>✓</b></span>
            </button>
          );
        })}
      </div>
      {selOther && (
        <div className="specify">
          <label htmlFor={'sp-' + name}>✏️ {t('run.specify')}</label>
          <input
            id={'sp-' + name}
            ref={otherRef}
            type="text"
            value={other}
            maxLength={100}
            placeholder={t('run.specifyPh')}
            onChange={(e) => { setOther(e.target.value); setErr(null); }}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), commit(sel, other))}
            autoComplete="off"
          />
        </div>
      )}
      {needsButton && (
        <div className="q-actions">
          <button className="btn primary big" type="button" onClick={() => commit(sel, other)} disabled={!sel.length}>
            {isLast ? t('run.finish') + ' ✓' : t('run.next')} <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </>
  );
}

/* ---------------- searchable list (country, state, city, long lists) ---------------- */
const MAX_SHOWN = 80;
function SearchSelect({ name, q, list, ans, onSubmit, fail, setErr }) {
  const { t, tc, country } = useI18n();
  const [term, setTerm] = useState('');
  const [sel, setSel] = useState(() => (list.some((o) => o.v === ans?.v) ? ans.v : null));
  const [other, setOther] = useState(ans?.o || '');
  const [hi, setHi] = useState(0);
  const inputRef = useRef(null);
  const otherRef = useRef(null);
  const listRef = useRef(null);
  const lock = useRef(false);
  const translate = !q.geo && !q.country && list.length < 400;

  const labelled = useMemo(
    () => list.map((o) => {
      const l = o.label ? o.label : q.country ? country(o.v, o.l) : translate ? tc(o.l) : o.l;
      return { ...o, label: l, key: (l + ' ' + o.l).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') };
    }),
    [list, q.country, translate, tc, country]
  );
  const filtered = useMemo(() => {
    const s = term.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    let r = s ? labelled.filter((o) => o.key.includes(s)) : labelled;
    if (s) r = [...r].sort((a, b) => (a.key.startsWith(s) ? 0 : 1) - (b.key.startsWith(s) ? 0 : 1));
    const others = labelled.filter((o) => o.other && !r.includes(o));
    return [...r, ...others]; // "Other / not listed" always reachable
  }, [labelled, term]);
  const shown = filtered.slice(0, MAX_SHOWN);
  const selected = labelled.find((o) => o.v === sel);

  useEffect(() => {
    if (!sel) inputRef.current?.focus({ preventScroll: true });
  }, [sel]);
  useEffect(() => setHi(0), [term]);

  const choose = (o) => {
    if (lock.current) return;
    sound.tap(o.i);
    setErr(null);
    setSel(o.v);
    if (o.other) { requestAnimationFrame(() => otherRef.current?.focus()); return; }
    lock.current = true;
    setTimeout(() => { lock.current = false; onSubmit(name, { v: o.v }); }, 220);
  };
  const confirmOther = () => {
    const e = validate('specify', other);
    if (e) { otherRef.current?.focus(); return fail(e); }
    onSubmit(name, { v: sel, o: other.trim() });
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(h + 1, shown.length - 1)); scrollHi(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); scrollHi(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (shown[hi]) choose(shown[hi]); else fail(['pick']); }
  };
  const scrollHi = () => requestAnimationFrame(() => listRef.current?.querySelector('.hi')?.scrollIntoView({ block: 'nearest' }));

  return (
    <div className="search">
      {selected && !selected.other && (
        <button className="chip on selected-chip" type="button" onClick={() => onSubmit(name, { v: selected.v })}>
          <span className="chip-key emo" aria-hidden="true"><OptionIcon q={q} o={selected} /></span>
          <span className="chip-label">{selected.label}</span>
          <span className="go" aria-hidden="true">→</span>
        </button>
      )}
      <div className="search-box">
        <span aria-hidden="true">🔎</span>
        <input
          ref={inputRef}
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={onKey}
          placeholder={t('run.search')}
          aria-label={t('run.search')}
          aria-controls={'lb-' + name}
          aria-activedescendant={shown[hi] ? `o-${name}-${hi}` : undefined}
          autoComplete="off"
          enterKeyHint="go"
        />
      </div>
      <ul className="listbox" id={'lb-' + name} role="listbox" aria-labelledby={'ql-' + name} ref={listRef}>
        {shown.map((o, k) => (
          <li
            key={o.v}
            id={`o-${name}-${k}`}
            role="option"
            aria-selected={o.v === sel}
            className={(k === hi ? 'hi ' : '') + (o.v === sel ? 'on' : '') + (o.other ? ' other' : '')}
            onClick={() => choose(o)}
            onMouseEnter={() => setHi(k)}
          >
            <span className="emo" aria-hidden="true"><OptionIcon q={q} o={o} /></span>
            <span>{o.other && q.geo === 'city' ? t('run.notListed') : o.other && q.jobs ? t('run.notListedJob') : o.label}</span>
          </li>
        ))}
        {!filtered.length && <li className="none" role="presentation">{t('run.noMatch')}</li>}
      </ul>
      {filtered.length > MAX_SHOWN && <p className="q-hint small">{t('run.narrow', { n: MAX_SHOWN, total: filtered.length })}</p>}
      {selected?.other && (
        <div className="specify">
          <label htmlFor={'sp-' + name}>✏️ {t('run.specify')}</label>
          <input id={'sp-' + name} ref={otherRef} type="text" value={other} maxLength={100} placeholder={t('run.specifyPh')}
            onChange={(e) => { setOther(e.target.value); setErr(null); }}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), confirmOther())} autoComplete="off" />
          <div className="q-actions">
            <button className="btn primary big" type="button" onClick={confirmOther}>{t('run.next')} <span aria-hidden="true">→</span></button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- open-ended inputs ---------------- */
const INPUT_TYPE = { text: 'text', email: 'email', url: 'url', tel: 'tel', number: 'text', date: 'date' };
function TextInput({ name, q, ans, optional, placeholder, onSubmit, ctx, fail, setErr, t, isLast }) {
  const [v, setV] = useState(ans && !ans.s ? String(ans.v ?? '') : '');
  const [v2, setV2] = useState(ans && !ans.s && q.confirm ? String(ans.v ?? '') : '');
  const [touched, setTouched] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (q.type === 'date') return undefined;
    const id = setTimeout(() => ref.current?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(id);
  }, [q.type]);

  const today = new Date();
  const ymd = (d) => d.toISOString().slice(0, 10);
  const maxDob = ymd(new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()));
  const minDob = ymd(new Date(today.getFullYear() - 110, today.getMonth(), today.getDate()));

  const check = (val) => validate(q.rule || 'required', val, { answers: ctx?.answers || {}, country: ctx?.answers?.country?.v });

  const submit = () => {
    setTouched(true);
    let val = v.trim();
    if (q.upper) val = val.toUpperCase().replace(/\s+/g, '');
    if (!val && optional) return onSubmit({ v: '', s: q.optional ? 1 : undefined });
    const e = check(val);
    if (e) { ref.current?.focus(); return fail(e); }
    if (q.confirm && val.replace(/[\s-]/g, '') !== v2.trim().replace(/[\s-]/g, '')) return fail(['mismatch']);
    sound.tap(4);
    onSubmit({ v: q.type === 'number' ? String(+val.replace(',', '.')) : val });
  };
  const onKey = (e) => {
    if (e.key === 'Enter' && q.type !== 'textarea') { e.preventDefault(); submit(); }
  };
  const onBlur = () => {
    if (!v.trim()) return;
    setTouched(true);
    const e = check(q.upper ? v.toUpperCase().replace(/\s+/g, '') : v);
    setErr(e);
  };

  const common = {
    id: 'in-' + name,
    ref,
    value: v,
    'aria-labelledby': 'ql-' + name,
    placeholder,
    onKeyDown: onKey,
    onBlur,
    autoComplete: q.autocomplete || 'off',
    onChange: (e) => { setV(e.target.value); if (touched) setErr(null); },
  };

  return (
    <div className="text-q">
      {q.type === 'textarea' ? (
        <>
          <textarea {...common} rows={5} maxLength={q.max || 600} />
          <p className="counter">{t('run.chars', { n: v.length, max: q.max || 600 })}{q.min ? ' · min ' + q.min : ''}</p>
        </>
      ) : q.type === 'date' ? (
        <DatePicker value={v} onChange={(x) => { setV(x); if (touched) setErr(null); }} onEnter={submit} invalid={false} />
      ) : (
        <div className={'field' + (q.prefix ? ' has-prefix' : '')}>
          {q.prefix && <span className="prefix" aria-hidden="true">{q.prefix}</span>}
          <input
            {...common}
            type={INPUT_TYPE[q.type] || 'text'}
            inputMode={q.type === 'number' || q.inputmode === 'numeric' ? 'numeric' : q.type === 'tel' ? 'tel' : q.type === 'email' ? 'email' : undefined}
            max={q.type === 'date' ? maxDob : undefined}
            min={q.type === 'date' ? minDob : undefined}
            style={q.upper ? { textTransform: 'uppercase' } : undefined}
            enterKeyHint="next"
            spellCheck={q.type === 'text' && (q.rule === 'specify' || q.rule === 'jobtitle')}
          />
        </div>
      )}
      {q.confirm && (
        <div className="field">
          <input
            type="text"
            inputMode="numeric"
            value={v2}
            onChange={(e) => setV2(e.target.value)}
            onKeyDown={onKey}
            placeholder={t('run.confirm')}
            aria-label={t('run.confirm')}
            autoComplete="off"
            onPaste={(e) => e.preventDefault()}
          />
        </div>
      )}
      <div className="q-actions">
        {optional && (
          <button className="btn ghost" type="button" onClick={() => { sound.tap(1); onSubmit({ v: '', s: 1 }); }}>
            {t('run.skip')}
          </button>
        )}
        <button className="btn primary big" type="button" onClick={submit}>
          {isLast ? t('run.finish') + ' ✓' : t('run.next')} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
