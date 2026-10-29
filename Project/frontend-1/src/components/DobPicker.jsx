import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { ageFromDob, parseDob } from '../utils/validate.js';

// Date-of-birth picker: type DD/MM/YYYY or open the calendar, which drills down Year → Month → Day
// (much faster than paging month-by-month back 30 years). Dates that are in the future or would make the
// person younger than `minAge` are disabled. Keyboard: arrows move, Enter selects, Esc closes.
// Value in/out: ISO "YYYY-MM-DD" (or '' while incomplete).

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WD = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const pad = (n) => String(n).padStart(2, '0');
const toIso = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
const fmt = (iso) => {
  const b = parseDob(iso);
  return b ? `${pad(b.d)}/${pad(b.m)}/${b.y}` : '';
};
const mask = (raw) => {
  const d = raw.replace(/\D/g, '').slice(0, 8);
  return d.slice(0, 2) + (d.length > 2 ? '/' + d.slice(2, 4) : '') + (d.length > 4 ? '/' + d.slice(4) : '');
};
const daysIn = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();

export default function DobPicker({ id, value, onChange, onDone, minAge = 18, invalid, describedBy }) {
  const now = new Date();
  const cutoff = toIso(now.getFullYear() - minAge, now.getMonth() + 1, now.getDate()); // latest allowed birth date
  const maxY = now.getFullYear() - minAge;
  const minY = now.getFullYear() - 110;
  const sel = parseDob(value);

  const [text, setText] = useState(fmt(value));
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('year');
  const [y, setY] = useState(sel ? sel.y : maxY - 7);
  const [m, setM] = useState(sel ? sel.m : 1);
  // Year pages hold 20 years and are anchored to the youngest allowed year, so the first page a visitor sees
  // covers the most common adult birth years (e.g. 1989–2008).
  const pageFor = (yr) => maxY - 19 - Math.floor((maxY - yr) / 20) * 20;
  const [pageStart, setPageStart] = useState(() => pageFor(sel ? sel.y : maxY));
  const wrap = useRef(null);
  const pop = useRef(null);

  useEffect(() => {
    const f = fmt(value);
    if (f && f !== text) setText(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Close on outside click / Esc
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (wrap.current && !wrap.current.contains(e.target)) close(false); };
    const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); close(true); } };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Move focus into the active grid whenever the view changes
  useEffect(() => {
    if (!open || !pop.current) return;
    const t = setTimeout(() => {
      const target = pop.current && (pop.current.querySelector('.dp-cell.is-sel:not(:disabled)') || pop.current.querySelector('.dp-cell:not(:disabled)'));
      if (target) target.focus();
    }, 30);
    return () => clearTimeout(t);
  }, [open, view, pageStart, y, m]);

  function close(refocus) {
    setOpen(false);
    if (refocus) {
      const btn = wrap.current && wrap.current.querySelector('.dp-toggle');
      if (btn) btn.focus();
    }
    onDone && onDone();
  }
  function openCal() {
    const b = parseDob(value);
    if (b) { setY(b.y); setM(b.m); setPageStart(pageFor(b.y)); setView('day'); } else setView('year');
    setOpen(true);
  }
  function type(e) {
    const t = mask(e.target.value);
    setText(t);
    const mm = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(t);
    onChange(mm ? toIso(Number(mm[3]), Number(mm[2]), Number(mm[1])) : '');
  }
  function pickDay(d) {
    const iso = toIso(y, m, d);
    onChange(iso);
    setText(fmt(iso));
    close(true);
  }

  // Arrow-key navigation inside a grid
  const gridKeys = (cols) => (e) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const cells = [...e.currentTarget.querySelectorAll('.dp-cell:not(:disabled)')];
    const i = cells.indexOf(document.activeElement);
    const all = [...e.currentTarget.querySelectorAll('.dp-cell')];
    const ai = all.indexOf(document.activeElement);
    let n = ai + keys[e.key];
    while (all[n] && all[n].disabled) n += Math.sign(keys[e.key]);
    if (all[n]) all[n].focus();
    else if (cells[i]) cells[i].focus();
  };

  const age = sel ? ageFromDob(value) : NaN;
  const years = Array.from({ length: 20 }, (_, i) => pageStart + i);
  const first = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7; // Monday-first offset
  const dim = daysIn(y, m);

  return (
    <div className={`dp ${open ? 'is-open' : ''} ${invalid ? 'is-bad' : ''} ${sel && !invalid ? 'is-good' : ''}`} ref={wrap}>
      <div className="dp-field">
        <span className="dp-ico" aria-hidden="true"><Icon name="calendar" size={18} /></span>
        <input
          id={id}
          className="dp-input"
          inputMode="numeric"
          autoComplete="bday"
          placeholder="DD/MM/YYYY"
          value={text}
          onChange={type}
          onBlur={() => !open && onDone && onDone()}
          aria-invalid={Boolean(invalid)}
          aria-describedby={describedBy}
          maxLength={10}
        />
        <button type="button" className="dp-toggle" onClick={() => (open ? close(true) : openCal())} aria-label={open ? 'Close calendar' : 'Open calendar to pick your date of birth'} aria-expanded={open} aria-haspopup="dialog">
          <Icon name="chevron" size={18} />
        </button>
      </div>
      {sel && !invalid && Number.isFinite(age) ? (
        <p className="dp-age" aria-live="polite"><span className="dp-cake" aria-hidden="true"><Icon name="gift" size={14} /></span> {age} years young · {pad(sel.d)} {MONTHS[sel.m - 1]} {sel.y}</p>
      ) : null}

      {open ? (
        <div className="dp-pop" role="dialog" aria-label="Choose your date of birth" ref={pop}>
          <div className="dp-head">
            <div className="dp-crumbs">
              <button type="button" className={view === 'year' ? 'on' : ''} onClick={() => setView('year')}>{view === 'year' ? `${Math.max(pageStart, minY)} – ${pageStart + 19}` : y}</button>
              {view !== 'year' ? <><i aria-hidden="true">›</i><button type="button" className={view === 'month' ? 'on' : ''} onClick={() => setView('month')}>{view === 'day' ? MONTHS[m - 1] : 'Month'}</button></> : null}
              {view === 'day' ? <><i aria-hidden="true">›</i><span>Day</span></> : null}
            </div>
            {view === 'year' ? (
              <div className="dp-nav">
                <button type="button" onClick={() => setPageStart((p) => p - 20)} disabled={pageStart <= minY} aria-label="Earlier years"><Icon name="chevron" size={16} /></button>
                <button type="button" onClick={() => setPageStart((p) => p + 20)} disabled={pageStart + 19 >= maxY} aria-label="Later years"><Icon name="chevron" size={16} /></button>
              </div>
            ) : null}
            {view === 'day' ? (
              <div className="dp-nav">
                <button type="button" aria-label="Previous month" onClick={() => (m === 1 ? (setM(12), setY(y - 1)) : setM(m - 1))} disabled={y <= minY && m === 1}><Icon name="chevron" size={16} /></button>
                <button type="button" aria-label="Next month" onClick={() => (m === 12 ? (setM(1), setY(y + 1)) : setM(m + 1))} disabled={(m === 12 ? toIso(y + 1, 1, 1) : toIso(y, m + 1, 1)) > cutoff}><Icon name="chevron" size={16} /></button>
              </div>
            ) : null}
          </div>

          <div className="dp-steps" aria-hidden="true">
            {['year', 'month', 'day'].map((s, i) => <span key={s} className={['year', 'month', 'day'].indexOf(view) >= i ? 'on' : ''} />)}
          </div>

          <div className="dp-body" key={view + pageStart + '-' + y + '-' + m}>
            {view === 'year' ? (
              <div className="dp-grid dp-years" role="grid" aria-label="Year" onKeyDown={gridKeys(4)}>
                {years.map((yy) => (
                  <button
                    type="button"
                    key={yy}
                    className={`dp-cell ${sel && sel.y === yy ? 'is-sel' : ''} ${yy % 10 === 0 ? 'is-decade' : ''}`}
                    disabled={yy > maxY || yy < minY}
                    onClick={() => { setY(yy); setView('month'); }}
                  >
                    {yy}
                  </button>
                ))}
              </div>
            ) : null}
            {view === 'month' ? (
              <div className="dp-grid dp-months" role="grid" aria-label={`Month in ${y}`} onKeyDown={gridKeys(3)}>
                {MONTHS.map((mn, i) => {
                  const off = toIso(y, i + 1, 1) > cutoff; // whole month too recent
                  return (
                    <button type="button" key={mn} className={`dp-cell ${sel && sel.y === y && sel.m === i + 1 ? 'is-sel' : ''}`} disabled={off} onClick={() => { setM(i + 1); setView('day'); }}>
                      <b>{mn.slice(0, 3)}</b><small>{pad(i + 1)}</small>
                    </button>
                  );
                })}
              </div>
            ) : null}
            {view === 'day' ? (
              <>
                <div className="dp-wd" aria-hidden="true">{WD.map((d) => <span key={d}>{d}</span>)}</div>
                <div className="dp-grid dp-days" role="grid" aria-label={`${MONTHS[m - 1]} ${y}`} onKeyDown={gridKeys(7)}>
                  {Array.from({ length: first }, (_, i) => <span key={'b' + i} className="dp-blank" />)}
                  {Array.from({ length: dim }, (_, i) => {
                    const d = i + 1;
                    const iso = toIso(y, m, d);
                    const off = iso > cutoff;
                    return (
                      <button
                        type="button"
                        key={d}
                        className={`dp-cell ${sel && iso === value ? 'is-sel' : ''}`}
                        disabled={off}
                        title={off ? `Members must be ${minAge}+` : undefined}
                        aria-label={`${d} ${MONTHS[m - 1]} ${y}`}
                        onClick={() => pickDay(d)}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
          <p className="dp-foot"><Icon name="lock" size={13} /> Used only to confirm you’re {minAge}+ and to match age-relevant surveys. Never shared.</p>
        </div>
      ) : null}
    </div>
  );
}
