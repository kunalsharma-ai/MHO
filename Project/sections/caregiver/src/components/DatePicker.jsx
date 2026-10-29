import { useEffect, useMemo, useRef, useState } from 'react';
import { validate } from '../lib/validate.js';
import { sound } from '../lib/sound.js';
import { useI18n } from '../lib/i18n.js';

/**
 * Date of birth — an inline calendar (it opens inside the question card, so it can never be clipped or cover
 * anything). Three views:
 *   years  → a 20-year page, quick jump by decade (opens here first, so nobody clicks back through months)
 *   months → 12 months of the chosen year
 *   days   → the month grid, localised weekday names, future dates and under-18 dates disabled
 * Keyboard: arrows move a day / week, PageUp/PageDown a month, Shift+PageUp/PageDown a year, Home/End the
 * week, Enter picks, Esc returns to the year view. Touch-friendly 44 px targets. Stored as YYYY-MM-DD.
 */
const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
};
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const ageOn = (d, now) => now.getFullYear() - d.getFullYear() - (now < new Date(now.getFullYear(), d.getMonth(), d.getDate()) ? 1 : 0);

export default function DatePicker({ name, ans, onSubmit, fail, setErr, isLast, minAge = 18, maxAge = 110 }) {
  const { t, lang } = useI18n();
  const loc = lang === 'zh' ? 'zh-CN' : lang;
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const maxDate = useMemo(() => new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate()), [today, minAge]);
  const minDate = useMemo(() => new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate()), [today, maxAge]);
  const initial = parse(ans?.v);
  const [value, setValue] = useState(initial);
  const [view, setView] = useState(initial ? 'days' : 'years');
  const [cursor, setCursor] = useState(() => initial || new Date(today.getFullYear() - 35, 0, 1));
  const [page, setPage] = useState(() => Math.floor((initial || new Date(today.getFullYear() - 35, 0, 1)).getFullYear() / 20) * 20);
  const [dir, setDir] = useState(0);
  const gridRef = useRef(null);
  const actRef = useRef(null);

  const fmtLong = useMemo(() => { try { return new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }); } }, [loc]);
  const fmtMonth = useMemo(() => { try { return new Intl.DateTimeFormat(loc, { month: 'long' }); } catch { return new Intl.DateTimeFormat('en', { month: 'long' }); } }, [loc]);
  const fmtShortMonth = useMemo(() => { try { return new Intl.DateTimeFormat(loc, { month: 'short' }); } catch { return new Intl.DateTimeFormat('en', { month: 'short' }); } }, [loc]);
  const weekdays = useMemo(() => {
    let f; try { f = new Intl.DateTimeFormat(loc, { weekday: 'narrow' }); } catch { f = new Intl.DateTimeFormat('en', { weekday: 'narrow' }); }
    return Array.from({ length: 7 }, (_, i) => f.format(new Date(2024, 0, 1 + i))); // 1 Jan 2024 = Monday
  }, [loc]);
  const nf = useMemo(() => new Intl.NumberFormat(loc, { useGrouping: false }), [loc]);

  const inRange = (d) => d >= minDate && d <= maxDate;
  const clamp = (d) => (d < minDate ? new Date(minDate) : d > maxDate ? new Date(maxDate) : d);

  /* keep keyboard focus on the cursor day */
  useEffect(() => {
    if (view !== 'days') return;
    const el = gridRef.current?.querySelector('[data-cur="1"]');
    if (el && gridRef.current.contains(document.activeElement)) el.focus({ preventScroll: true });
  }, [cursor, view]);

  const pick = (d) => {
    if (!inRange(d)) return;
    sound.tap(d.getDate() % 8);
    setValue(d);
    setCursor(d);
    setErr(null);
    // bring "Continue" into view (on phones it sits below the calendar) so nobody thinks they are stuck
    requestAnimationFrame(() => actRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  };
  const confirm = () => {
    if (!value) { fail(['date']); return; }
    const e = validate('dob', ymd(value));
    if (e) return fail(e);
    sound.tap(4);
    onSubmit({ v: ymd(value) });
  };
  const move = (days) => setCursor((c) => clamp(new Date(c.getFullYear(), c.getMonth(), c.getDate() + days)));
  const moveMonth = (m) => { setDir(m); setCursor((c) => clamp(new Date(c.getFullYear(), c.getMonth() + m, Math.min(c.getDate(), 28)))); };
  const onGridKey = (e) => {
    const k = e.key;
    if (k === 'ArrowLeft') move(lang === 'ar' ? 1 : -1);
    else if (k === 'ArrowRight') move(lang === 'ar' ? -1 : 1);
    else if (k === 'ArrowUp') move(-7);
    else if (k === 'ArrowDown') move(7);
    else if (k === 'PageUp') moveMonth(e.shiftKey ? -12 : -1);
    else if (k === 'PageDown') moveMonth(e.shiftKey ? 12 : 1);
    else if (k === 'Home') move(-((cursor.getDay() + 6) % 7));
    else if (k === 'End') move(6 - ((cursor.getDay() + 6) % 7));
    else if (k === 'Enter' || k === ' ') { pick(cursor); }
    else if (k === 'Escape') setView('years');
    else return;
    e.preventDefault();
  };

  /* day grid of the cursor month (weeks start on Monday) */
  const y = cursor.getFullYear(), m = cursor.getMonth();
  const first = new Date(y, m, 1);
  const lead = (first.getDay() + 6) % 7;
  const daysIn = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysIn; d++) cells.push(new Date(y, m, d));
  while (cells.length % 7) cells.push(null);

  const years = Array.from({ length: 20 }, (_, i) => page + i);
  const age = value ? ageOn(value, today) : null;

  return (
    <div className="dob-q">
      <button type="button" className={'dob-field' + (value ? ' has' : '')} onClick={() => setView(value ? 'days' : 'years')} aria-describedby={'ql-' + name}>
        <span className="dob-ic" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <b>{value ? value.getDate() : '?'}</b>
        </span>
        <span className="dob-val">
          <small>{t('dob.label')}</small>
          <b>{value ? fmtLong.format(value) : t('dob.placeholder')}</b>
        </span>
        {age != null && <span className="dob-age" aria-live="polite">{t('dob.age', { n: age })}</span>}
      </button>

      <div className={'cal v-' + view} role="group" aria-label={t('dob.label')}>
        <div className="cal-head">
          {view === 'days' && <button type="button" className="cal-nav" onClick={() => moveMonth(-1)} aria-label={t('dob.prevMonth')} disabled={new Date(y, m, 0) < minDate}>‹</button>}
          {view === 'years' && <button type="button" className="cal-nav" onClick={() => setPage((p) => p - 20)} aria-label={t('dob.prevYears')} disabled={page <= minDate.getFullYear()}>‹</button>}
          {view === 'months' && <button type="button" className="cal-nav" onClick={() => setCursor((c) => clamp(new Date(c.getFullYear() - 1, c.getMonth(), 1)))} aria-label={t('dob.prevYear')}>‹</button>}
          <div className="cal-title">
            {view === 'years' ? (
              <span className="cal-range">{nf.format(page)} – {nf.format(page + 19)}</span>
            ) : (
              <>
                {view === 'days' && <button type="button" className="cal-pill" onClick={() => setView('months')}>{fmtMonth.format(cursor)}</button>}
                <button type="button" className="cal-pill strong" onClick={() => { setPage(Math.floor(y / 20) * 20); setView('years'); }}>{nf.format(y)} <span aria-hidden="true">▾</span></button>
              </>
            )}
          </div>
          {view === 'days' && <button type="button" className="cal-nav" onClick={() => moveMonth(1)} aria-label={t('dob.nextMonth')} disabled={new Date(y, m + 1, 1) > maxDate}>›</button>}
          {view === 'years' && <button type="button" className="cal-nav" onClick={() => setPage((p) => p + 20)} aria-label={t('dob.nextYears')} disabled={page + 20 > maxDate.getFullYear()}>›</button>}
          {view === 'months' && <button type="button" className="cal-nav" onClick={() => setCursor((c) => clamp(new Date(c.getFullYear() + 1, c.getMonth(), 1)))} aria-label={t('dob.nextYear')}>›</button>}
        </div>

        {view === 'years' && (
          <>
            <p className="cal-hint"><span className="emo" aria-hidden="true">🎂</span> {t('dob.pickYear')}</p>
            <div className="cal-years" key={page}>
              {years.map((yr, i) => {
                const ok = yr >= minDate.getFullYear() && yr <= maxDate.getFullYear();
                return (
                  <button key={yr} type="button" disabled={!ok} style={{ '--i': i }} className={'cal-y' + (value?.getFullYear() === yr ? ' on' : '') + (cursor.getFullYear() === yr ? ' cur' : '')}
                    onClick={() => { sound.tap(i % 8); setCursor((c) => clamp(new Date(yr, c.getMonth(), Math.min(c.getDate(), 28)))); setView('months'); }}>{nf.format(yr)}</button>
                );
              })}
            </div>
          </>
        )}

        {view === 'months' && (
          <div className="cal-months">
            {Array.from({ length: 12 }, (_, i) => {
              const d = new Date(y, i, 1);
              const ok = new Date(y, i + 1, 0) >= minDate && d <= maxDate;
              return (
                <button key={i} type="button" disabled={!ok} style={{ '--i': i }} className={'cal-m' + (value && value.getFullYear() === y && value.getMonth() === i ? ' on' : '')}
                  onClick={() => { sound.tap(i % 8); setDir(0); setCursor(clamp(new Date(y, i, Math.min(cursor.getDate(), 28)))); setView('days'); }}>{fmtShortMonth.format(d)}</button>
              );
            })}
          </div>
        )}

        {view === 'days' && (
          <div className={'cal-days d' + (dir > 0 ? 'n' : dir < 0 ? 'p' : '0')} key={y * 12 + m}>
            {weekdays.map((w, i) => <span key={'w' + i} className="cal-wd" aria-hidden="true">{w}</span>)}
            <div className="cal-grid" role="grid" ref={gridRef} onKeyDown={onGridKey}>
              {cells.map((d, i) => d ? (
                <button key={i} type="button" role="gridcell" data-cur={sameDay(d, cursor) ? '1' : undefined}
                  tabIndex={sameDay(d, cursor) ? 0 : -1} disabled={!inRange(d)}
                  aria-selected={sameDay(d, value) || undefined} aria-label={fmtLong.format(d)}
                  className={'cal-d' + (sameDay(d, value) ? ' on' : '') + (sameDay(d, cursor) ? ' cur' : '') + ((d.getDay() + 6) % 7 > 4 ? ' we' : '')}
                  onClick={() => pick(d)}>{nf.format(d.getDate())}</button>
              ) : <span key={i} className="cal-x" aria-hidden="true" />)}
            </div>
          </div>
        )}
        <p className="cal-rule"><span aria-hidden="true">ℹ️</span> {t('dob.rule', { n: minAge })}</p>
      </div>

      <div className="q-actions" ref={actRef}>
        <button className={'btn primary big' + (value ? ' ready' : '')} type="button" onClick={confirm} disabled={!value}>{isLast ? t('run.finish') + ' ✓' : t('run.next')} <span aria-hidden="true">→</span></button>
      </div>
    </div>
  );
}
