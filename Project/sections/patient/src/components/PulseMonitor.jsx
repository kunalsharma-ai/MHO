import { forwardRef, memo, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../lib/i18n.js';
import { sound } from '../lib/sound.js';
import { LEVELS, levelOf, nextCash, rewardOf, rules, usd } from '../lib/rewards.js';
import { fly, floatText, wait } from '../lib/flight.js';
import Logo from './Logo.jsx';
import Counter from './Counter.jsx';

/**
 * HEALTH PULSE — the rewards system.
 *
 *  ┌ Patient monitor ─────────────────────┐  ┌ Health matrix (lab well plate) ─────────────┐
 *  │ live ECG trace (beats faster as the  │  │ one well per profile / survey, lab-style    │
 *  │ Quality Score grows), Reward Points, │  │ coordinates (A1, A2 … B1 …). Completed wells │
 *  │ Quality Score gauge, Level, goals     │  │ glow with the item's colours, in-progress   │
 *  └──────────────────────────────────────┘  │ wells are partly filled, locked ones grey.   │
 *  Level ladder (Newcomer → Legend → Legend II …)└──────────────────────────────────────────────┘
 *
 * Scales without limits: the plate adds rows (and scrolls inside after 8 rows) and levels continue forever,
 * so 25 or 250 profiles look intentional. Completing an item runs deliver(id): the well is pipetted and
 * fills, the monitor surges, and the +points / +QS tokens fly to the header.
 */
const rowName = (i) => { let s = ''; i++; while (i > 0) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; };

function ecgPath(amp) {
  let d = 'M0 60';
  for (let x0 = 0; x0 < 600; x0 += 120) {
    d += ` L${x0 + 20} 60 Q${x0 + 26} 52 ${x0 + 32} 60 L${x0 + 42} 60 L${x0 + 46} 66 L${x0 + 52} ${60 - amp} L${x0 + 58} ${60 + amp * 0.42} L${x0 + 62} 60 L${x0 + 76} 60 Q${x0 + 86} 47 ${x0 + 96} 60 L${x0 + 120} 60`;
  }
  return d;
}

const PulseMonitor = forwardRef(function PulseMonitor({ survey, statuses, access, delivered, pts, qs, name, onOpen, onLocked }, ref) {
  const { t, tc, nf, lang } = useI18n();
  const R = rules();
  const [filter, setFilter] = useState('all');
  const [hover, setHover] = useState(null);
  const [surge, setSurge] = useState(false);
  const [filling, setFilling] = useState(null);
  const [lvlUp, setLvlUp] = useState(null);
  const bodyRef = useRef(null);
  const rootRef = useRef(null);
  const [cols, setCols] = useState(6);

  const items = survey?.profiles || [];
  const total = items.length || 25;
  const maxQs = items.reduce((s, p) => s + rewardOf(p.id).qs, 0) || 25;
  const lv = levelOf(qs);
  const nextLv = LEVELS.find((l) => l.at > qs);
  const toLevel = (nextLv ? nextLv.at : lv.next) - qs;
  const cash = nextCash(pts);
  const bpm = Math.min(118, 62 + qs * 2);
  const amp = Math.min(48, 20 + qs * 1.4);

  /* plate columns follow the available width */
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return undefined;
    const calc = () => {
      const w = el.clientWidth;
      const well = w < 420 ? 40 : w < 560 ? 46 : 54, gap = w < 420 ? 8 : 10;
      setCols(Math.max(4, Math.min(10, Math.floor((w - 26) / (well + gap)))));
    };
    calc();
    if (typeof ResizeObserver !== 'function') return undefined;
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [survey]);

  const shown = useMemo(() => items.filter((p) => filter === 'all' || access?.map[p.id]?.kind === (filter === 'profiles' ? 'profile' : 'survey')), [items, filter, access]);
  const rows = useMemo(() => { const r = []; for (let i = 0; i < shown.length; i += cols) r.push(shown.slice(i, i + cols)); return r; }, [shown, cols]);
  const coord = useMemo(() => {
    const m = {};
    items.forEach((p, i) => { m[p.id] = rowName(Math.floor(i / cols)) + ((i % cols) + 1); });
    return m;
  }, [items, cols]);

  const stateOf = (p) => {
    const st = statuses?.map[p.id];
    const ac = access?.map[p.id];
    if (st?.status === 'done') return delivered?.[p.id] && filling !== p.id ? 'filled' : 'waiting';
    if (ac?.locked) return 'locked';
    if (st?.status === 'progress') return 'progress';
    return 'open';
  };
  const filledCount = items.filter((p) => stateOf(p) === 'filled').length;

  /* delivery: pipette → fill → surge → tokens to the header */
  useImperativeHandle(ref, () => ({
    async deliver(id, { prevQs } = {}) {
      const p = items.find((x) => x.id === id);
      if (!p) return;
      if (filter !== 'all') setFilter('all');
      await wait(60);
      const well = rootRef.current?.querySelector(`[data-well="${id}"]`);
      well?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await wait(650);
      setFilling(id);
      sound.drop();
      await wait(900);
      setSurge(true);
      sound.beat();
      const r = rewardOf(id);
      floatText(well, '+' + nf.format(r.pts), 'pts');
      const pill = document.getElementById('mho-pts'), qsPill = document.getElementById('mho-qs');
      const colors = [p.palette[0], p.palette[1]];
      sound.fly();
      const a = fly(well, pill, { kind: 'pts', label: '+' + nf.format(r.pts), colors: ['#F7B547', '#F2611B'] });
      const b = fly(well, qsPill, { kind: 'qs', label: '+' + nf.format(r.qs) + ' QS', colors, delay: 220 });
      await a; sound.points(); sound.chime();
      await b; sound.quality();
      setFilling(null);
      setTimeout(() => setSurge(false), 1200);
      const before = levelOf(prevQs ?? 0), after = levelOf((prevQs ?? 0) + r.qs);
      if (after.index > before.index) {
        setLvlUp(after);
        sound.levelUp();
        setTimeout(() => setLvlUp(null), 3600);
      }
    },
  }), [items, filter, nf]);

  /* keep the current level visible in the ladder (it scrolls sideways on small screens) */
  const ladderRef = useRef(null);
  useEffect(() => {
    const l = ladderRef.current, c = l?.querySelector('li.current');
    if (l && c && l.scrollWidth > l.clientWidth) l.scrollLeft = c.offsetLeft - l.clientWidth / 2 + c.clientWidth / 2;
  }, [lv.key]);

  const info = hover && items.find((p) => p.id === hover);
  const infoState = info && stateOf(info);
  const click = (p) => {
    const s = stateOf(p);
    if (s === 'locked') onLocked(p.id);
    else onOpen(p.id, statuses?.map[p.id]?.status === 'done' ? 'review' : 'run');
  };
  const who = (name || t('rw.patient')).toUpperCase();

  return (
    <section className={'pulse' + (surge ? ' surge' : '')} id="mho-rewards" ref={rootRef} aria-labelledby="mho-pulse-title">
      <div className="pulse-head">
        <div>
          <p className="eyebrow"><span className="emo" aria-hidden="true">💓</span>{t('rw.eyebrow')}</p>
          <h2 id="mho-pulse-title" className="sec-title">{t('rw.title')}</h2>
          <p className="sec-sub">{t('rw.sub', { pts: nf.format(R.profilePts), qs: nf.format(R.profileQs), rate: nf.format(R.perUsd), usd: usd(R.perUsd, lang) })}</p>
        </div>
        <ul className="pulse-rules" aria-label={t('rw.rules')}>
          <li><span className="emo" aria-hidden="true">🪙</span><b className="num">+{nf.format(R.profilePts)}</b> {t('rw.ptsEach')}</li>
          <li><span className="emo" aria-hidden="true">💠</span><b className="num">+{nf.format(R.profileQs)}</b> {t('rw.qsEach')}</li>
          <li><span className="emo" aria-hidden="true">💵</span>{t('rw.rate', { pts: nf.format(R.perUsd), usd: usd(R.perUsd, lang) })}</li>
        </ul>
      </div>

      <div className="pulse-grid">
        {/* ---------------- patient monitor ---------------- */}
        <div className="monitor" role="group" aria-label={t('rw.monitor')}>
          <div className="mon-bezel">
            <div className="mon-top">
              <Logo mark size={26} />
              <span className="mon-id"><small>{t('rw.monitorLabel')}</small><b>{who}</b></span>
              <span className="mon-live" aria-hidden="true"><i />LIVE</span>
              <span className="mon-lvl" style={{ '--c1': lv.c[0], '--c2': lv.c[1] }}>
                <span className="emo" aria-hidden="true">{lv.emoji}</span>{t('lv.' + lv.key)}{lv.rank ? ' ' + lv.rank : ''}
              </span>
            </div>
            <div className="mon-ecg" aria-hidden="true">
              <svg viewBox="0 0 600 120" preserveAspectRatio="none">
                <path className="ecg-trace" d={ecgPath(amp)} />
                <path className="ecg-glow" d={ecgPath(amp)} />
              </svg>
              <i className="mon-sweep" style={{ animationDuration: (480 / bpm).toFixed(2) + 's' }} />
              <span className="mon-bpm"><i className="hb" style={{ animationDuration: (60 / bpm).toFixed(2) + 's' }}>♥</i><b className="num">{bpm}</b><small>BPM</small></span>
            </div>
            <div className="mon-read">
              <div className="rd rd-pts">
                <small>{t('rw.points')}</small>
                <Counter value={pts} format={(n) => nf.format(n)} className="rd-num" />
                <span className="rd-sub">= {usd(pts, lang)}</span>
                <span className="rd-bar" aria-hidden="true"><i style={{ transform: `scaleX(${(pts % R.perUsd) / R.perUsd})` }} /></span>
                <span className="rd-note">{t('rw.toCash', { n: nf.format(cash - pts), usd: usd(cash, lang) })}</span>
              </div>
              <div className="rd rd-qs">
                <small>{t('rw.quality')}</small>
                <span className="qs-gauge" style={{ '--v': Math.round((qs / maxQs) * 100) }} aria-hidden="true">
                  <svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="33" className="trk" /><circle cx="40" cy="40" r="33" className="val" pathLength="100" /></svg>
                  <Counter value={qs} format={(n) => nf.format(n)} className="qs-num" />
                </span>
                <span className="rd-sub">{t('rw.qsOf', { n: nf.format(maxQs) })}</span>
              </div>
              <div className="rd rd-lv">
                <small>{t('rw.level')}</small>
                <span className="lv-badge" style={{ '--c1': lv.c[0], '--c2': lv.c[1] }}><span className="emo" aria-hidden="true">{lv.emoji}</span></span>
                <b className="lv-name">{t('lv.' + lv.key)}{lv.rank ? ' ' + lv.rank : ''}</b>
                <span className="rd-bar lv" aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(0, Math.min(1, (qs - lv.at) / Math.max(1, (nextLv ? nextLv.at : lv.next) - lv.at)))})` }} /></span>
                <span className="rd-note">{t('rw.toLevel', { n: nf.format(toLevel), level: nextLv ? t('lv.' + nextLv.key) : t('lv.legend') + ' +' })}</span>
              </div>
            </div>
            <div className="mon-goals">
              {access && !access.allProfiles && (
                <span className="goal g-lock"><span className="emo" aria-hidden="true">🔓</span>{t('rw.goalUnlock', { n: nf.format(access.profilesTotal - access.profilesDone) })}</span>
              )}
              <span className="goal"><span className="emo" aria-hidden="true">🧪</span>{t('rw.wells', { n: nf.format(filledCount), total: nf.format(total) })}</span>
              <span className="goal"><span className="emo" aria-hidden="true">🎯</span>{t('rw.matchHint')}</span>
            </div>
            {lvlUp && (
              <div className="lvl-up" role="status" style={{ '--c1': lvlUp.c[0], '--c2': lvlUp.c[1] }}>
                <span className="emo" aria-hidden="true">{lvlUp.emoji}</span>
                <b>{t('rw.levelUp', { level: t('lv.' + lvlUp.key) + (lvlUp.rank ? ' ' + lvlUp.rank : '') })}</b>
              </div>
            )}
          </div>
        </div>

        {/* ---------------- health matrix: the well plate ---------------- */}
        <div className="plate" role="group" aria-labelledby="mho-plate-title">
          <div className="plate-head">
            <h3 id="mho-plate-title"><span className="emo" aria-hidden="true">🧫</span>{t('rw.plate')}</h3>
            <div className="seg" role="tablist" aria-label={t('rw.filter')}>
              {['all', 'profiles', 'surveys'].map((f) => (
                <button key={f} type="button" role="tab" aria-selected={filter === f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{t('rw.f.' + f)}</button>
              ))}
            </div>
          </div>
          <div className={'plate-body' + (rows.length > 7 ? ' tall' : '')} ref={bodyRef} style={{ '--cols': cols }}>
            <div className="pl-cols" aria-hidden="true"><i />{Array.from({ length: cols }, (_, i) => <i key={i}>{i + 1}</i>)}</div>
            {!survey && Array.from({ length: 4 }, (_, r) => (
              <div className="pl-row" key={r}><i className="pl-r">{rowName(r)}</i>{Array.from({ length: cols }, (_, c) => <span key={c} className="well skel" />)}</div>
            ))}
            {rows.map((row, r) => (
              <div className="pl-row" key={r}>
                <i className="pl-r" aria-hidden="true">{rowName(r)}</i>
                {row.map((p) => {
                  const s = stateOf(p);
                  const st = statuses?.map[p.id];
                  const lvl = s === 'filled' || filling === p.id ? 1 : s === 'progress' ? Math.max(0.12, (st?.pct || 0) / 100) : 0;
                  return (
                    <button key={p.id} type="button" data-well={p.id}
                      className={'well w-' + s + (filling === p.id ? ' filling' : '') + (access?.nextProfile === p.id || access?.nextSurvey === p.id ? ' next' : '')}
                      style={{ '--p1': p.palette[0], '--p2': p.palette[1], '--p3': p.palette[2] || '#fff', '--lvl': lvl }}
                      aria-label={`${coord[p.id]} · ${tc(p.title)} · ${t('rw.w.' + s)}`}
                      onMouseEnter={() => setHover(p.id)} onFocus={() => setHover(p.id)} onMouseLeave={() => setHover(null)} onBlur={() => setHover(null)}
                      onClick={() => click(p)}>
                      <i className="w-liq" aria-hidden="true"><i className="w-wave" /></i>
                      <span className="w-emo emo" aria-hidden="true">{s === 'locked' ? '🔒' : p.emoji}</span>
                      <i className="w-pip" aria-hidden="true"><i /></i>
                      <i className="w-drop" aria-hidden="true" />
                      <i className="w-ring" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="plate-foot" aria-live="polite">
            {info ? (
              <p className="pl-info" style={{ '--p1': info.palette[0] }}>
                <b className="num">{coord[info.id]}</b>
                <span className="emo" aria-hidden="true">{info.emoji}</span>
                <span className="pl-t">{tc(info.title)}</span>
                <span className={'pl-s s-' + infoState}>{t('rw.w.' + infoState)}</span>
                <span className="pl-r">+{nf.format(rewardOf(info.id).pts)} {t('hdr.pts')} · +{nf.format(rewardOf(info.id).qs)} QS</span>
              </p>
            ) : (
              <ul className="pl-legend">
                <li><i className="lg-f" />{t('rw.w.filled')}</li>
                <li><i className="lg-p" />{t('rw.w.progress')}</li>
                <li><i className="lg-o" />{t('rw.w.open')}</li>
                <li><i className="lg-l" />{t('rw.w.locked')}</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- level ladder ---------------- */}
      <ol className="ladder" ref={ladderRef} aria-label={t('rw.ladder')}>
        {LEVELS.map((L, i) => {
          const reached = qs >= L.at, current = lv.key === L.key && (i < LEVELS.length - 1 || true);
          return (
            <li key={L.key} className={(reached ? 'reached' : '') + (current ? ' current' : '')} style={{ '--c1': L.c[0], '--c2': L.c[1], '--i': i }}>
              <span className="ld-node"><span className="emo" aria-hidden="true">{L.emoji}</span></span>
              <b>{t('lv.' + L.key)}{current && lv.rank ? ' ' + lv.rank : ''}</b>
              <small>{t('rw.qsAt', { n: nf.format(L.at) })}</small>
            </li>
          );
        })}
      </ol>
    </section>
  );
});
export default memo(PulseMonitor);
