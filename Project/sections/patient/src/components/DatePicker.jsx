import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../lib/i18n.js';
import { sound } from '../lib/sound.js';
import { ageFromDob } from '../lib/validate.js';

/**
 * Date of birth picker.
 *  • Typeable DD / MM / YYYY segments in the order of the patient's language (Y/M/D in Japanese…),
 *    auto-advancing; or the calendar button.
 *  • The calendar opens INLINE under the field (never clipped by the card or the screen) and starts on a
 *    YEAR grid (a birth date is picked year → month → day, no endless month clicking). Month and year
 *    dropdowns + arrows in the day view.
 *  • Future dates and ages outside 18–110 are disabled; keyboard: arrows, PageUp/PageDown (month),
 *    Shift+PageUp/PageDown (year), Home/End, Enter, Escape.
 * Stores ISO YYYY-MM-DD (unchanged data format).
 */
const pad = (n) => String(n).padStart(2, '0');
const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const parse = (s) => (/^\d{4}-\d{2}-\d{2}$/.test(s || '') ? { y: +s.slice(0, 4), m: +s.slice(5, 7) - 1, d: +s.slice(8, 10) } : null);
const dim = (y, m) => new Date(y, m + 1, 0).getDate();

export default function DatePicker({ value, onChange, onEnter, minAge = 18, maxAge = 110, invalid }) {
  const { t, tag, nf } = useI18n();
  const today = new Date();
  const max = { y: today.getFullYear() - minAge, m: today.getMonth(), d: today.getDate() };
  const min = { y: today.getFullYear() - maxAge, m: today.getMonth(), d: today.getDate() };
  const cmp = (a, b) => (a.y - b.y) || (a.m - b.m) || (a.d - b.d);
  const sel = parse(value);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(sel ? 'days' : 'years');
  const [view, setView] = useState(() => (sel ? { y: sel.y, m: sel.m } : { y: max.y - 12, m: 0 }));
  const [focus, setFocus] = useState(() => sel || { y: view.y, m: view.m, d: 1 });
  const [seg, setSeg] = useState(() => (sel ? { d: pad(sel.d), m: pad(sel.m + 1), y: String(sel.y) } : { d: '', m: '', y: '' }));
  const gridRef = useRef(null);
  const segRefs = { d: useRef(null), m: useRef(null), y: useRef(null) };

  /* segment order from the locale (e.g. en-US M/D/Y, ja Y/M/D) */
  const order = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(tag, { year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(2000, 10, 22))
        .filter((p) => ['day', 'month', 'year'].includes(p.type)).map((p) => p.type[0]);
    } catch { return ['d', 'm', 'y']; }
  }, [tag]);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => { try { return new Intl.DateTimeFormat(tag, { month: 'long' }).format(new Date(2000, i, 1)); } catch { return String(i + 1); } }), [tag]);
  const monthsShort = useMemo(() => Array.from({ length: 12 }, (_, i) => { try { return new Intl.DateTimeFormat(tag, { month: 'short' }).format(new Date(2000, i, 1)); } catch { return String(i + 1); } }), [tag]);
  const firstDay = useMemo(() => { try { const wi = new Intl.Locale(tag).weekInfo || new Intl.Locale(tag).getWeekInfo?.(); return wi ? wi.firstDay % 7 : 1; } catch { return 1; } }, [tag]);
  const wdays = useMemo(() => Array.from({ length: 7 }, (_, i) => { try { return new Intl.DateTimeFormat(tag, { weekday: 'narrow' }).format(new Date(2023, 0, 1 + ((i + firstDay) % 7))); } catch { return ''; } }), [tag, firstDay]);

  const commit = (y, m, d) => {
    onChange(iso(y, m, d));
    setSeg({ d: pad(d), m: pad(m + 1), y: String(y) });
  };
  const pick = (y, m, d) => {
    const v = { y, m, d };
    if (cmp(v, max) > 0 || cmp(v, min) < 0) { sound.error(); return; }
    sound.tap(d);
    commit(y, m, d);
    setFocus(v);
    setOpen(false);
    setTimeout(() => document.querySelector('.mho-app .runner .q-actions .btn.primary')?.focus(), 30);
  };

  /* typed segments */
  const onSeg = (k, raw) => {
    const n = k === 'y' ? 4 : 2;
    const v = raw.replace(/\D/g, '').slice(0, n);
    const next = { ...seg, [k]: v };
    setSeg(next);
    if (v.length === n) { const i = order.indexOf(k); const nk = order[i + 1]; if (nk) segRefs[nk].current?.focus(); }
    if (next.d.length && next.m.length && next.y.length === 4) {
      const y = +next.y, m = +next.m - 1, d = +next.d;
      if (m >= 0 && m < 12 && d >= 1 && d <= dim(y, m)) { onChange(iso(y, m, d)); setView({ y, m }); setFocus({ y, m, d }); }
      else onChange(`${next.y}-${pad(next.m)}-${pad(next.d)}x`);
    } else onChange('');
  };
  const segKey = (k, e) => {
    if (e.key === 'Enter') { e.preventDefault(); onEnter(); }
    if (e.key === 'Backspace' && !e.currentTarget.value) { const i = order.indexOf(k); if (i > 0) segRefs[order[i - 1]].current?.focus(); }
  };

  /* calendar keyboard */
  useEffect(() => {
    if (!open || mode !== 'days') return;
    gridRef.current?.querySelector(`[data-day="${focus.d}"]`)?.focus({ preventScroll: true });
  }, [open, mode, focus, view]);
  const move = (days) => {
    const dt = new Date(focus.y, focus.m, focus.d + days);
    const v = { y: dt.getFullYear(), m: dt.getMonth(), d: dt.getDate() };
    setFocus(v); setView({ y: v.y, m: v.m });
  };
  const moveMonth = (k) => {
    const dt = new Date(view.y, view.m + k, 1);
    const v = { y: dt.getFullYear(), m: dt.getMonth() };
    setView(v); setFocus({ ...v, d: Math.min(focus.d, dim(v.y, v.m)) });
  };
  const onGridKey = (e) => {
    const k = e.key;
    if (k === 'ArrowLeft') move(-1); else if (k === 'ArrowRight') move(1);
    else if (k === 'ArrowUp') move(-7); else if (k === 'ArrowDown') move(7);
    else if (k === 'PageUp') moveMonth(e.shiftKey ? -12 : -1); else if (k === 'PageDown') moveMonth(e.shiftKey ? 12 : 1);
    else if (k === 'Home') move(-((new Date(focus.y, focus.m, focus.d).getDay() - firstDay + 7) % 7));
    else if (k === 'End') move(6 - ((new Date(focus.y, focus.m, focus.d).getDay() - firstDay + 7) % 7));
    else if (k === 'Enter' || k === ' ') pick(focus.y, focus.m, focus.d);
    else if (k === 'Escape') setOpen(false);
    else return;
    e.preventDefault();
  };

  const decade = Math.floor(view.y / 12) * 12;
  const years = Array.from({ length: 24 }, (_, i) => decade - 6 + i).filter((y) => y >= min.y && y <= max.y);
  const lead = (new Date(view.y, view.m, 1).getDay() - firstDay + 7) % 7;
  const count = dim(view.y, view.m);
  const age = sel ? ageFromDob(value) : null;
  const allYears = useMemo(() => Array.from({ length: max.y - min.y + 1 }, (_, i) => max.y - i), [max.y, min.y]);
  const canPrev = cmp({ y: view.y, m: view.m, d: 1 }, { y: min.y, m: min.m, d: 1 }) > 0;
  const canNext = cmp({ y: view.y, m: view.m, d: 1 }, { y: max.y, m: max.m, d: 1 }) < 0;

  return (
    <div className={'dob' + (open ? ' open' : '') + (invalid ? ' bad' : '')}>
      <div className="dob-field" onClick={(e) => { if (e.target === e.currentTarget) setOpen(true); }}>
        <span className="dob-ic emo" aria-hidden="true">🎂</span>
        <div className="dob-segs" dir="ltr" role="group" aria-label={t('dob.label')}>
          {order.map((k, i) => (
            <span key={k} className="dob-s">
              {i > 0 && <i aria-hidden="true">/</i>}
              <input ref={segRefs[k]} inputMode="numeric" autoComplete={k === 'd' ? 'bday-day' : k === 'm' ? 'bday-month' : 'bday-year'}
                className={'seg-' + k} value={seg[k]} placeholder={t('dob.' + k)} aria-label={t('dob.' + k + 'Aria')} maxLength={k === 'y' ? 4 : 2}
                onChange={(e) => onSeg(k, e.target.value)} onKeyDown={(e) => segKey(k, e)} onFocus={(e) => e.target.select()} />
            </span>
          ))}
        </div>
        <button type="button" className="dob-btn" onClick={() => { setOpen(!open); if (!open) sound.whoosh(); }} aria-expanded={open} aria-controls="mho-cal" aria-label={t('dob.open')}>
          <span className="emo" aria-hidden="true">📅</span><span className="dob-btn-t">{t('dob.calendar')}</span>
        </button>
      </div>
      {sel && <p className="dob-chosen"><span className="emo" aria-hidden="true">🗓️</span> {(() => { try { return new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(sel.y, sel.m, sel.d)); } catch { return value; } })()}{age != null && age >= 0 ? ' · ' + t('dob.age', { n: nf.format(age) }) : ''}</p>}

      <div className="cal-wrap" inert={!open ? true : undefined}>
        <div className="cal" id="mho-cal" role="dialog" aria-modal="false" aria-label={t('dob.label')}>
          <div className="cal-head">
            <button type="button" className="cal-nav" onClick={() => (mode === 'years' ? setView({ ...view, y: view.y - 24 }) : moveMonth(-1))} disabled={mode === 'years' ? decade - 6 <= min.y : !canPrev} aria-label={t('dob.prev')}>‹</button>
            {mode === 'days' ? (
              <div className="cal-sel">
                <select value={view.m} onChange={(e) => { const m = +e.target.value; setView({ ...view, m }); setFocus({ y: view.y, m, d: Math.min(focus.d, dim(view.y, m)) }); }} aria-label={t('dob.month')}>
                  {months.map((n, i) => <option key={i} value={i}>{n}</option>)}
                </select>
                <select value={view.y} onChange={(e) => { const y = +e.target.value; setView({ ...view, y }); setFocus({ y, m: view.m, d: Math.min(focus.d, dim(y, view.m)) }); }} aria-label={t('dob.year')}>
                  {allYears.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            ) : (
              <button type="button" className="cal-title" onClick={() => setMode(mode === 'months' ? 'years' : 'years')}>
                {mode === 'years' ? `${Math.max(min.y, decade - 6)} – ${Math.min(max.y, decade + 17)}` : view.y}
              </button>
            )}
            <button type="button" className="cal-nav" onClick={() => (mode === 'years' ? setView({ ...view, y: view.y + 24 }) : moveMonth(1))} disabled={mode === 'years' ? decade + 17 >= max.y : !canNext} aria-label={t('dob.next')}>›</button>
          </div>
          <div className="cal-tabs" role="tablist">
            {['years', 'months', 'days'].map((m) => <button key={m} type="button" role="tab" aria-selected={mode === m} className={mode === m ? 'on' : ''} onClick={() => setMode(m)}>{t('dob.v.' + m)}</button>)}
          </div>
          {mode === 'years' && (
            <div className="cal-years">
              {years.map((y) => (
                <button key={y} type="button" className={(sel?.y === y ? 'sel ' : '') + (view.y === y ? 'cur' : '')} onClick={() => { setView({ ...view, y }); setMode('months'); sound.tap(y % 7); }}>{y}</button>
              ))}
            </div>
          )}
          {mode === 'months' && (
            <div className="cal-months">
              {monthsShort.map((n, i) => {
                const off = cmp({ y: view.y, m: i, d: 1 }, { y: max.y, m: max.m, d: 31 }) > 0 || cmp({ y: view.y, m: i, d: 31 }, min) < 0;
                return <button key={i} type="button" disabled={off} className={sel?.y === view.y && sel?.m === i ? 'sel' : ''} onClick={() => { setView({ ...view, m: i }); setFocus({ y: view.y, m: i, d: Math.min(focus.d, dim(view.y, i)) }); setMode('days'); sound.tap(i); }}>{n}</button>;
              })}
            </div>
          )}
          {mode === 'days' && (
            <div className="cal-days" role="grid" ref={gridRef} onKeyDown={onGridKey} aria-label={months[view.m] + ' ' + view.y}>
              {wdays.map((w, i) => <span key={'w' + i} className="cal-wd" aria-hidden="true">{w}</span>)}
              {Array.from({ length: lead }, (_, i) => <span key={'b' + i} />)}
              {Array.from({ length: count }, (_, i) => {
                const d = i + 1, v = { y: view.y, m: view.m, d };
                const off = cmp(v, max) > 0 || cmp(v, min) < 0;
                const isSel = sel && cmp(v, sel) === 0;
                const isF = focus.y === view.y && focus.m === view.m && focus.d === d;
                return (
                  <button key={d} type="button" role="gridcell" data-day={d} disabled={off} tabIndex={isF ? 0 : -1} aria-selected={isSel}
                    className={(isSel ? 'sel ' : '') + (isF ? 'foc' : '')} onClick={() => pick(view.y, view.m, d)}
                    aria-label={(() => { try { return new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(view.y, view.m, d)); } catch { return iso(view.y, view.m, d); } })()}>
                    {d}
                  </button>
                );
              })}
            </div>
          )}
          <p className="cal-foot">{t('dob.range', { a: nf.format(minAge), b: nf.format(maxAge) })}</p>
        </div>
      </div>
    </div>
  );
}
