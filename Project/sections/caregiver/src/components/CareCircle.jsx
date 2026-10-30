import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../lib/i18n.js';
import { sound } from '../lib/sound.js';
import { flyToken } from '../lib/tokenflight.js';
import {
  LEVELS, levelIndex, levelOf, nextLevelOf, levelProgress, rewardOf, rules, usd, nextCashOf,
  seenTotalsOf, pendingRewards, markRewardSeen, maxOf, isProfileChapter,
} from '../lib/rewards.js';
import { HEART_PATH } from './Brand.jsx';
import RollNumber from './RollNumber.jsx';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CIRCLE OF CARE — the caregiver reward system
 * ─────────────────────────────────────────────────────────────────────────────
 *  At the centre beats a glass heart that slowly FILLS with warm light as the Quality Score grows.
 *  Around it, every profile and survey is a "care bead" on slowly turning orbits: About You profiles on the
 *  inner orbit(s), surveys on the outer orbit(s). A completed bead glows in its own colours and is tied to the
 *  heart by a golden bond. The orbit layout is computed from the number of items, so 12, 40 or 150 items all
 *  fit (more orbits, smaller beads).
 *  Beside it, the Care Ledger: Care Points (odometer, cash value, next dollar), Quality Score (level medallion
 *  + 10-step care ladder) and how much of the circle is complete.
 *  Delivery after a completion: the bead blooms, a ripple of care spreads from the heart, a golden heart-coin
 *  "+50" flies to the header wallet and a rosette star "+1" to the Quality Score; level-ups get a ribbon.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const reduceMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Distribute items on concentric orbits. Returns rings: [{ r, items: [item], dur }] (r in % of the stage). */
function orbitLayout(items) {
  const n = items.length;
  const d = n <= 16 ? 12 : n <= 32 ? 9.5 : n <= 64 ? 7 : n <= 110 ? 5.2 : 4.2; // bead diameter, % of stage
  const gap = 1.8;
  const maxR = 50 - d / 2 - 1;
  const prof = items.filter((p) => isProfileChapter(p.chapter));
  const surv = items.filter((p) => !isProfileChapter(p.chapter));
  const rings = [];
  let r = 25;
  const place = (list) => {
    let i = 0;
    while (i < list.length && r <= maxR + 0.01) {
      const cap = Math.max(4, Math.floor((2 * Math.PI * r) / (d + gap)));
      rings.push({ r, items: list.slice(i, i + cap) });
      i += cap;
      r += d + 2;
    }
    if (i < list.length) rings[rings.length - 1].items.push(...list.slice(i)); // never drop an item
  };
  place(prof);
  if (surv.length) place(surv);
  rings.forEach((g, k) => { g.dur = 90 + k * 30; g.rev = k % 2 === 1; });
  return { rings, d };
}

const Bead = memo(function Bead({ p, state, angle, r, born, onOpen, onHover, label, d }) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return (
    <button
      type="button"
      className={'bead st-' + state + (born ? ' born' : '')}
      data-bead={p.id}
      style={{ left: (50 + Math.cos(rad) * r).toFixed(3) + '%', top: (50 + Math.sin(rad) * r).toFixed(3) + '%', '--p1': p.palette[0], '--p2': p.palette[1], '--p3': p.palette[2] || '#FFE0B8', '--d': d + '%' }}
      onClick={(e) => onOpen(p.id, e)}
      onPointerEnter={() => onHover(p.id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(p.id)}
      onBlur={() => onHover(null)}
      aria-label={label}
    >
      <span className="bead-in" aria-hidden="true">
        <span className="bead-core"><span className="emo">{p.emoji}</span></span>
        {state === 'locked' && <span className="bead-lock">🔒</span>}
        {state === 'done' && <span className="bead-ok">✓</span>}
        {state === 'next' && <span className="bead-next" />}
        {born && <><i className="bead-petals" /><i className="bead-ring" /></>}
      </span>
    </button>
  );
});

function CareCircle({ mounted, survey, statuses, meta, gemSeen, g, runnerOpen, name, onOpen }) {
  const { t, tc, nf, lang } = useI18n();
  const rootRef = useRef(null);
  const [born, setBorn] = useState(null);
  const [ripple, setRipple] = useState(0);
  const [banner, setBanner] = useState(null);
  const [hover, setHover] = useState(null);
  const busy = useRef(false);
  const [tick, setTick] = useState(0);

  const items = g.items;
  const seen = mounted ? gemSeen : {};
  const tot = mounted ? seenTotalsOf(meta, seen) : { pts: 0, qs: 0 };
  const max = useMemo(() => maxOf(items), [items]);
  const doneCount = mounted ? items.filter((p) => meta.completed?.[p.id]).length : 0;
  const lv = levelOf(tot.qs), nx = nextLevelOf(tot.qs), li = levelIndex(tot.qs);
  const r = rules();
  const cashNext = nextCashOf(tot.pts);
  const cashPct = (tot.pts % r.pointsPerUsd) / r.pointsPerUsd;
  const fill = max.qs ? Math.min(1, tot.qs / max.qs) : 0;
  const { rings, d } = useMemo(() => orbitLayout(items), [items]);

  const stateOf = useCallback((p) => {
    if (meta.completed?.[p.id] && mounted) return 'done';
    if (g.lock[p.id]) return 'locked';
    if (p.id === g.next) return 'next';
    return statuses?.map?.[p.id]?.status === 'progress' ? 'progress' : 'open';
  }, [meta, g, statuses, mounted]);

  /* ---------------- delivery of newly earned rewards (runs once per batch) ---------------- */
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const live = useRef({});
  live.current = { meta, gemSeen, items, nf };
  const pendKey = mounted ? pendingRewards(meta, gemSeen).join(',') : '';
  useEffect(() => {
    if (!mounted || runnerOpen || busy.current || !pendKey) return;
    const { meta: m0, gemSeen: s0, items: list, nf: fmt } = live.current;
    const pend = pendingRewards(m0, s0);
    if (!pend.length) return;
    busy.current = true;
    const root = rootRef.current;
    const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
    const reduce = reduceMotion();
    const fast = pend.length > 2; // several rewards waiting → deliver them quickly one after another (never feels stuck)
    if (root && !reduce) {
      const stage = root.querySelector('.cc-stage') || root;
      const rr = stage.getBoundingClientRect();
      if (rr.top < 90 || rr.bottom > innerHeight - 20) stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    let i = 0;
    let qsBefore = seenTotalsOf(m0, s0).qs;
    const advance = (gap, endGap) => {
      i += 1;
      if (i < pend.length) later(step, gap);
      else if (endGap != null) later(() => { setBorn(null); busy.current = false; setTick((n) => n + 1); }, endGap);
    };
    const step = () => {
      const id = pend[i];
      const p = list.find((x) => x.id === id) || { palette: ['#FF6B5B', '#FFB547'], emoji: '✨', title: id };
      const bead = root?.querySelector(`[data-bead="${id}"]`);
      setBorn(id);
      setRipple((n) => n + 1);
      sound.heartbeat();
      const rw = rewardOf(id);
      later(() => {
        sound.fly();
        flyToken(bead, document.getElementById('rw-pts'), '+' + fmt.format(rw.pts), ['#FFD36B', '#FF9F43', p.palette[1], '#FFF3D6'], () => sound.coin(), 'coin');
        later(() => {
          flyToken(bead, document.getElementById('rw-qs'), '+' + fmt.format(rw.qs), ['#E8457C', '#FF9BB8', p.palette[0], '#FFE0EA'], () => {
            sound.quality();
            markRewardSeen(id);
            const qsAfter = qsBefore + rw.qs;
            if (levelIndex(qsAfter) > levelIndex(qsBefore)) {
              setBanner({ k: Date.now(), L: levelOf(qsAfter) });
              later(() => sound.levelUp(), 200);
              later(() => setBanner(null), 3300);
            }
            qsBefore = qsAfter;
            if (!fast) advance(700, 1500);
            else if (id === pend[pend.length - 1]) later(() => { setBorn(null); busy.current = false; setTick((n) => n + 1); }, 700);
          }, 'star');
          // several waiting: launch the next bead right away instead of waiting for this star to land
          if (fast) advance(380, null);
        }, fast ? 140 : 320);
      }, reduce ? 50 : fast ? 260 : 900);
    };
    later(step, reduce ? 50 : fast ? 350 : 750);
  }, [mounted, runnerOpen, pendKey, tick]);

  const open = useCallback((id, e) => {
    const k = items.findIndex((x) => x.id === id);
    if (!g.lock[id]) sound.profile(k);
    onOpen(id, e);
  }, [items, g, onOpen]);

  const nextItem = g.next ? items.find((p) => p.id === g.next) : null;
  const hov = hover ? items.find((p) => p.id === hover) : null;
  const hovState = hov ? stateOf(hov) : null;
  const who = name || t('hero.friend');

  return (
    <section className="cc" id="rewards" ref={rootRef} aria-labelledby="cc-title">
      <div className="cc-head">
        <div className="cc-head-copy">
          <p className="eyebrow"><span className="emo" aria-hidden="true">💞</span>{t('cc.eyebrow')}</p>
          <h2 id="cc-title" className="sec-title">{t('cc.title')}</h2>
          <p className="sec-sub">{t('cc.sub', { pts: nf.format(r.pointsPerProfile), qs: nf.format(r.qualityPerProfile) })}</p>
        </div>
        <ul className="cc-rules" aria-label={t('cc.rules')}>
          <li><span className="rr-coin" aria-hidden="true">♥</span><b className="num">+{nf.format(r.pointsPerProfile)}</b><span>{t('cc.rulePts')}</span></li>
          <li><span className="rr-star" aria-hidden="true">★</span><b className="num">+{nf.format(r.qualityPerProfile)}</b><span>{t('cc.ruleQs')}</span></li>
          <li><span aria-hidden="true">💵</span><b className="num">{nf.format(r.pointsPerUsd)}</b><span>{t('cc.ruleUsd', { usd: usd(r.pointsPerUsd, lang) })}</span></li>
        </ul>
      </div>

      <div className="cc-body">
        {/* the orbit */}
        <div className="cc-stage-wrap">
          <div className="cc-stage" style={{ '--fill': fill, '--lc': lv.c }}>
            <i className="cc-halo" aria-hidden="true" />
            {rings.map((ring, k) => (
              <div key={k} className={'orbit-ring' + (ring.rev ? ' rev' : '')} style={{ '--r': ring.r + '%', '--dur': ring.dur + 's' }}>
                <i className="orbit-path" aria-hidden="true" />
                <svg className="bonds" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {ring.items.map((p, j) => {
                    if (stateOf(p) !== 'done') return null;
                    const a = (j / ring.items.length) * Math.PI * 2 - Math.PI / 2;
                    return <line key={p.id} x1="50" y1="50" x2={50 + Math.cos(a) * ring.r} y2={50 + Math.sin(a) * ring.r} style={{ '--p1': p.palette[1] }} />;
                  })}
                </svg>
                {ring.items.map((p, j) => {
                  const st = stateOf(p);
                  const rw = rewardOf(p.id);
                  return (
                    <Bead key={p.id} p={p} d={d} r={ring.r} state={st} angle={(j / ring.items.length) * 360} born={born === p.id} onOpen={open} onHover={setHover}
                      label={tc(p.title) + ' · ' + t('bead.' + st, { pts: nf.format(rw.pts), qs: nf.format(rw.qs) })} />
                  );
                })}
              </div>
            ))}
            {/* the heart */}
            <div className="cc-heart" aria-hidden="true">
              <svg viewBox="0 0 200 190">
                <defs>
                  <clipPath id="ccHeartClip"><path d={HEART_PATH} /></clipPath>
                  <linearGradient id="ccFillG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#E8457C" /><stop offset=".55" stopColor="#FF7A59" /><stop offset="1" stopColor="#FFC65C" /></linearGradient>
                  <radialGradient id="ccGlass" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="rgba(255,255,255,.75)" /><stop offset=".4" stopColor="rgba(255,255,255,.12)" /><stop offset="1" stopColor="rgba(255,255,255,0)" /></radialGradient>
                </defs>
                <path d={HEART_PATH} className="h-back" />
                <g clipPath="url(#ccHeartClip)">
                  <g className="h-level" style={{ transform: `translateY(${(1 - Math.max(fill, 0.06)) * 170}px)` }}>
                    <path className="h-wave w1" d="M-200 18 Q-150 4 -100 18 T0 18 T100 18 T200 18 T300 18 T400 18 V400 H-200Z" fill="url(#ccFillG)" />
                    <path className="h-wave w2" d="M-200 22 Q-150 34 -100 22 T0 22 T100 22 T200 22 T300 22 T400 22 V400 H-200Z" fill="url(#ccFillG)" opacity=".55" />
                  </g>
                </g>
                <path d={HEART_PATH} fill="url(#ccGlass)" />
                <path d={HEART_PATH} className="h-line" />
              </svg>
              <span className="cc-heart-txt">
                {banner ? (
                  <span className="hv lvl" key={'lv' + banner.k} style={{ '--c': banner.L.c }}>
                    <small>{t('cc.levelUp')}</small>
                    <span className="emo">{banner.L.emoji}</span>
                    <b>{t('lvl.' + banner.L.key)}</b>
                  </span>
                ) : hov ? (
                  <span className={'hv st-' + hovState} key={hov.id}>
                    <span className="emo">{hov.emoji}</span>
                    <b>{tc(hov.title)}</b>
                    <small>{t('bead.' + hovState, { pts: nf.format(rewardOf(hov.id).pts), qs: nf.format(rewardOf(hov.id).qs) })}</small>
                  </span>
                ) : (
                  <span className="hv" key="qs">
                    <small>{t('cc.quality')}</small>
                    <RollNumber value={tot.qs} format={(n) => nf.format(n)} className="cc-qs-num" label={t('qs.pill', { n: nf.format(tot.qs), level: t('lvl.' + lv.key) })} />
                    <em className="lv-chip" style={{ '--c': lv.c }}><span className="emo">{lv.emoji}</span> {t('lvl.' + lv.key)}</em>
                  </span>
                )}
              </span>
              {ripple > 0 && <i key={ripple} className="cc-ripple" />}
            </div>
          </div>
          {banner && <p className="sr-only" role="status">{t('cc.levelUp')} {t('lvl.' + banner.L.key)}</p>}
          <p className="cc-legend" aria-hidden="true">
            <span><i className="lg lg-done" />{t('cc.legDone')}</span>
            <span><i className="lg lg-next" />{t('cc.legNext')}</span>
            <span><i className="lg lg-open" />{t('cc.legOpen')}</span>
            <span><i className="lg lg-locked" />{t('cc.legLocked')}</span>
          </p>
        </div>

        {/* the ledger */}
        <div className="ledger">
          <p className="ledger-who"><span className="emo" aria-hidden="true">🫶</span> {t('cc.ledgerFor', { name: who })}</p>
          <div className="lg-card lg-pts">
            <small>{t('cc.points')}</small>
            <div className="lg-big"><span className="lg-coin" aria-hidden="true">♥</span><RollNumber value={tot.pts} format={(n) => nf.format(n)} label={t('rw.pill', { n: nf.format(tot.pts) })} /></div>
            <span className="lg-sub">≈ <b>{usd(tot.pts, lang)}</b> · {t('cc.toCash', { n: nf.format(cashNext - tot.pts), usd: usd(cashNext, lang) })}</span>
            <span className="lg-bar" aria-hidden="true"><i style={{ transform: `scaleX(${cashPct})` }} /></span>
          </div>
          <div className="lg-card lg-qs" style={{ '--lc': lv.c }}>
            <small>{t('cc.quality')}</small>
            <div className="lg-big"><span className="lg-star" aria-hidden="true">★</span><RollNumber value={tot.qs} format={(n) => nf.format(n)} label={t('qs.pill', { n: nf.format(tot.qs), level: t('lvl.' + lv.key) })} />
              <em className="lv-chip" style={{ '--c': lv.c }}><span className="emo" aria-hidden="true">{lv.emoji}</span> {t('lvl.' + lv.key)}</em></div>
            <ol className="ladder" aria-label={t('cc.ladder')}>
              {LEVELS.map((L, k) => (
                <li key={L.key} className={k < li ? 'past' : k === li ? 'now' : ''} style={{ '--c': L.c }} title={`${t('lvl.' + L.key)} · ${nf.format(L.min)} ${t('qs.short')}`}>
                  <span className="emo" aria-hidden="true">{L.emoji}</span>
                </li>
              ))}
            </ol>
            <span className="lg-sub">{nx ? t('qs.toNext', { n: nf.format(nx.min - tot.qs), level: t('lvl.' + nx.key) }) : t('cc.topLevel')}</span>
            <span className="lg-bar qs" aria-hidden="true"><i style={{ transform: `scaleX(${levelProgress(tot.qs)})` }} /></span>
          </div>
          <div className="lg-card lg-circle">
            <small>{t('cc.circle')}</small>
            <b className="lg-mid num">{nf.format(doneCount)}<em>/{nf.format(items.length)}</em></b>
            <span className="lg-seg" aria-hidden="true">
              <i className="s-prof" style={{ flexGrow: g.profiles.length, '--f': mounted && g.profiles.length ? g.profDone / g.profiles.length : 0 }} />
              <i className="s-surv" style={{ flexGrow: Math.max(1, g.surveys.length), '--f': mounted && g.surveys.length ? g.survDone / g.surveys.length : 0 }} />
            </span>
            <span className="lg-sub">{t('cc.split', { p: nf.format(mounted ? g.profDone : 0), pt: nf.format(g.profiles.length), s: nf.format(mounted ? g.survDone : 0), st: nf.format(g.surveys.length) })}</span>
          </div>
          {nextItem ? (
            <button className="btn brand big lg-cta" type="button" onClick={(e) => open(nextItem.id, e)} style={{ '--p1': nextItem.palette[0], '--p2': nextItem.palette[1] }}>
              <span className="emo" aria-hidden="true">{nextItem.emoji}</span>
              <span>{t('cc.cta', { name: tc(nextItem.title), pts: nf.format(rewardOf(nextItem.id).pts), qs: nf.format(rewardOf(nextItem.id).qs) })}</span>
              <span className="arrow" aria-hidden="true">→</span>
            </button>
          ) : <p className="lg-full"><span className="emo" aria-hidden="true">🏆</span> {t('cc.full')}</p>}
          <p className="lg-fine">{t('cc.fine')}</p>
        </div>
      </div>
    </section>
  );
}
export default memo(CareCircle);
