import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { tap } from '../lib/sound.js';

/**
 * Date of birth — an inline calendar (it opens INSIDE the question card, so it is never clipped, never covered by the
 * on-screen keyboard and never overlaps anything). Three views:
 *   years  → a 20-year page (opens here first: nobody clicks back through 400 months), ‹ › jump 20 years
 *   months → the 12 months of the chosen year
 *   days   → the month grid, localised weekday + month names; future dates and dates outside the allowed age range
 *            are disabled, so an invalid date cannot be picked
 * Keyboard: arrows = day / week, PageUp/PageDown = month, Shift+PageUp/PageDown = year, Home/End = week start/end,
 * Enter/Space picks, Esc → year view. 40–46 px touch targets. Stored as YYYY-MM-DD (same as v1).
 */
const pad = (n) => String(n).padStart(2, '0');
export const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
};
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const ageOn = (d, now) => now.getFullYear() - d.getFullYear() - (now < new Date(now.getFullYear(), d.getMonth(), d.getDate()) ? 1 : 0);

export default function DatePicker({ name, value: raw, onChange, minAge = 18, maxAge = 100, onPicked }) {
  const { t, lang } = useI18n();
  const loc = lang === 'zh' ? 'zh-CN' : lang;
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const maxDate = useMemo(() => new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate()), [today, minAge]);
  const minDate = useMemo(() => new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate() + 1), [today, maxAge]);
  const value = parse(raw);
  const [view, setView] = useState(value ? 'days' : 'years');
  const [cursor, setCursor] = useState(() => value || new Date(today.getFullYear() - 38, 0, 1));
  const [page, setPage] = useState(() => Math.floor((value || new Date(today.getFullYear() - 38, 0, 1)).getFullYear() / 20) * 20);
  const [dir, setDir] = useState(0);
  const gridRef = useRef(null);

  const mk = (o) => { try { return new Intl.DateTimeFormat(loc, o); } catch { return new Intl.DateTimeFormat('en', o); } };
  const fmtLong = useMemo(() => mk({ day: 'numeric', month: 'long', year: 'numeric' }), [loc]); // eslint-disable-line react-hooks/exhaustive-deps
  const fmtMonth = useMemo(() => mk({ month: 'long' }), [loc]); // eslint-disable-line react-hooks/exhaustive-deps
  const fmtShortMonth = useMemo(() => mk({ month: 'short' }), [loc]); // eslint-disable-line react-hooks/exhaustive-deps
  const weekdays = useMemo(() => { const f = mk({ weekday: 'narrow' }); return Array.from({ length: 7 }, (_, i) => f.format(new Date(2024, 0, 1 + i))); }, [loc]); // eslint-disable-line react-hooks/exhaustive-deps
  const nf = useMemo(() => { try { return new Intl.NumberFormat(loc, { useGrouping: false }); } catch { return new Intl.NumberFormat('en', { useGrouping: false }); } }, [loc]);

  const inRange = (d) => d >= minDate && d <= maxDate;
  const clamp = (d) => (d < minDate ? new Date(minDate) : d > maxDate ? new Date(maxDate) : d);

  useEffect(() => {
    if (view !== 'days') return;
    const el = gridRef.current?.querySelector('[data-cur="1"]');
    if (el && gridRef.current.contains(document.activeElement)) el.focus({ preventScroll: true });
  }, [cursor, view]);

  const pick = (d) => {
    if (!inRange(d)) return;
    tap(d.getDate() % 8);
    setCursor(d);
    onChange(ymd(d));
    onPicked?.();
  };
  const move = (days) => setCursor((c) => clamp(new Date(c.getFullYear(), c.getMonth(), c.getDate() + days)));
  const moveMonth = (m) => { setDir(m); setCursor((c) => clamp(new Date(c.getFullYear(), c.getMonth() + m, Math.min(c.getDate(), 28)))); };
  const rtl = lang === 'ar';
  const onGridKey = (e) => {
    const k = e.key;
    if (k === 'ArrowLeft') move(rtl ? 1 : -1);
    else if (k === 'ArrowRight') move(rtl ? -1 : 1);
    else if (k === 'ArrowUp') move(-7);
    else if (k === 'ArrowDown') move(7);
    else if (k === 'PageUp') moveMonth(e.shiftKey ? -12 : -1);
    else if (k === 'PageDown') moveMonth(e.shiftKey ? 12 : 1);
    else if (k === 'Home') move(-((cursor.getDay() + 6) % 7));
    else if (k === 'End') move(6 - ((cursor.getDay() + 6) % 7));
    else if (k === 'Enter' || k === ' ') pick(cursor);
    else if (k === 'Escape') { e.stopPropagation(); setView('years'); }
    else return;
    e.preventDefault();
    e.stopPropagation();
  };

  const y = cursor.getFullYear(); const m = cursor.getMonth();
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
    <div className="dob">
      <button type="button" className={'dob-field' + (value ? ' has' : '')} onClick={() => setView(value ? 'days' : 'years')} aria-describedby={`err-${name}`}>
        <span className="dob-ic" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <b className="mono">{value ? value.getDate() : '?'}</b>
        </span>
        <span className="dob-val">
          <small>{t('dobLabel')}</small>
          <b>{value ? fmtLong.format(value) : t('dobPlaceholder')}</b>
        </span>
        {age != null && <span className="dob-age mono" aria-live="polite">🎂 {t('yearsOld', { n: age })}</span>}
      </button>

      <div className={'cal v-' + view} role="group" aria-label={t('dobLabel')}>
        <div className="cal-head">
          {view === 'days' && <button type="button" className="cal-nav" onClick={() => moveMonth(-1)} aria-label={t('calPrevMonth')} disabled={new Date(y, m, 0) < minDate}>‹</button>}
          {view === 'years' && <button type="button" className="cal-nav" onClick={() => setPage((pg) => pg - 20)} aria-label={t('calPrevYears')} disabled={page <= minDate.getFullYear()}>‹</button>}
          {view === 'months' && <button type="button" className="cal-nav" onClick={() => setCursor((c) => clamp(new Date(c.getFullYear() - 1, c.getMonth(), 1)))} aria-label={t('calPrevYear')} disabled={y - 1 < minDate.getFullYear()}>‹</button>}
          <div className="cal-title">
            {view === 'years' ? (
              <span className="cal-range mono">{nf.format(page)} – {nf.format(page + 19)}</span>
            ) : (
              <>
                {view === 'days' && <button type="button" className="cal-pill" onClick={() => setView('months')}>{fmtMonth.format(cursor)}</button>}
                <button type="button" className="cal-pill strong mono" onClick={() => { setPage(Math.floor(y / 20) * 20); setView('years'); }}>{nf.format(y)} <span aria-hidden="true">▾</span></button>
              </>
            )}
          </div>
          {view === 'days' && <button type="button" className="cal-nav" onClick={() => moveMonth(1)} aria-label={t('calNextMonth')} disabled={new Date(y, m + 1, 1) > maxDate}>›</button>}
          {view === 'years' && <button type="button" className="cal-nav" onClick={() => setPage((pg) => pg + 20)} aria-label={t('calNextYears')} disabled={page + 20 > maxDate.getFullYear()}>›</button>}
          {view === 'months' && <button type="button" className="cal-nav" onClick={() => setCursor((c) => clamp(new Date(c.getFullYear() + 1, c.getMonth(), 1)))} aria-label={t('calNextYear')} disabled={y + 1 > maxDate.getFullYear()}>›</button>}
        </div>

        {view === 'years' && (
          <>
            <p className="cal-hint"><span aria-hidden="true">🎂</span> {t('calPickYear')}</p>
            <div className="cal-years" key={page}>
              {years.map((yr, i) => {
                const ok = yr >= minDate.getFullYear() && yr <= maxDate.getFullYear();
                return (
                  <button key={yr} type="button" disabled={!ok} style={{ '--i': i }} className={'cal-y mono' + (value?.getFullYear() === yr ? ' on' : '') + (cursor.getFullYear() === yr ? ' cur' : '')}
                    onClick={() => { tap(i % 8); setCursor((c) => clamp(new Date(yr, c.getMonth(), Math.min(c.getDate(), 28)))); setView('months'); }}>{nf.format(yr)}</button>
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
                  onClick={() => { tap(i % 8); setDir(0); setCursor(clamp(new Date(y, i, Math.min(cursor.getDate(), 28)))); setView('days'); }}>{fmtShortMonth.format(d)}</button>
              );
            })}
          </div>
        )}

        {view === 'days' && (
          <div className={'cal-days d' + (dir > 0 ? 'n' : dir < 0 ? 'p' : '0')} key={y * 12 + m}>
            <div className="cal-wds" aria-hidden="true">{weekdays.map((w, i) => <span key={'w' + i} className="cal-wd">{w}</span>)}</div>
            <div className="cal-grid" role="grid" ref={gridRef} onKeyDown={onGridKey}>
              {cells.map((d, i) => (d ? (
                <button key={i} type="button" role="gridcell" data-cur={sameDay(d, cursor) ? '1' : undefined}
                  tabIndex={sameDay(d, cursor) ? 0 : -1} disabled={!inRange(d)}
                  aria-selected={sameDay(d, value) || undefined} aria-label={fmtLong.format(d)}
                  className={'cal-d' + (sameDay(d, value) ? ' on' : '') + (sameDay(d, cursor) ? ' cur' : '') + ((d.getDay() + 6) % 7 > 4 ? ' we' : '')}
                  onClick={() => pick(d)}>{nf.format(d.getDate())}</button>
              ) : <span key={i} className="cal-x" aria-hidden="true" />))}
            </div>
          </div>
        )}
        <p className="cal-rule"><span aria-hidden="true">ℹ️</span> {t('calRule', { min: minAge, max: maxAge })}</p>
      </div>
    </div>
  );
}
