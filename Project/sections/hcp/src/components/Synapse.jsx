import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { PROFILE_META } from '../data/profileMeta.js';
import { pulse, fly, coin, quality, levelUp, profileOpen } from '../lib/sound.js';
import { flyToken, firePulse } from '../lib/tokenflight.js';
import {
  LEVELS, levelIndex, levelOf, nextLevelOf, levelProgress, rewardOf, rules, usd, nextCashOf,
  seenTotalsOf, pendingRewards, maxOf, isSurvey, codeOf,
} from '../lib/rewards.js';
import { AnimatedLogo, Brackets } from './Brand.jsx';
import { spiralLayout } from '../lib/spiral.js';
import RollNumber from './RollNumber.jsx';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SYNAPSE — the HCP reward network
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every profile and survey is a NEURON in a living network laid out on a golden-angle (sunflower) spiral around
 *  the Evidence Core. Profiles sit on the inner turns, surveys on the outer turns. The spiral packs evenly for any
 *  number of items — 11, 40 or 150 — the neurons simply get smaller (see docs/REWARDS_AND_QUALITY_SCORE.md).
 *  Dendrites join each neuron to its nearest neighbour; a completed neuron lights up in its own colours and its
 *  dendrites carry travelling signals.
 *  The Evidence Core shows Reward Points, Quality Score and the current level; hovering / focusing a neuron shows
 *  its details there; level-ups appear inside the core (nothing overlaps the network).
 *  Beside it, the Clinical Ledger: points (odometer), cash value + next dollar, Quality Score with the 10-tier
 *  Evidence Pyramid, and the latest credentials earned.
 *  Delivery after a completion: the neuron fires → a pulse runs to the core → an amber hex coin "+50" flies to the
 *  header wallet and a mint credential seal "+1" to the Quality Score.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const reduceMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const Neuron = memo(function Neuron({ slug, pt, state, fired, size, onOpen, onHover, label, emoji, a, b, code }) {
  return (
    <button
      type="button"
      className={'neuron st-' + state + (fired ? ' fired' : '')}
      data-node={slug}
      style={{ left: pt.x.toFixed(3) + '%', top: pt.y.toFixed(3) + '%', '--a': a, '--b': b, '--sn': size.toFixed(2) }}
      onClick={() => onOpen(slug)}
      onPointerEnter={() => onHover(slug)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(slug)}
      onBlur={() => onHover(null)}
      aria-label={label}
    >
      <span className="nr-in" aria-hidden="true">
        <span className="nr-hex"><span className="nr-emo">{emoji}</span></span>
        <span className="nr-code mono">{code}</span>
        {state === 'locked' && <span className="nr-lock">🔒</span>}
        {state === 'done' && <span className="nr-ok">✓</span>}
        {state === 'next' && <span className="nr-ping" />}
        {fired && <><i className="nr-ring" /><i className="nr-ring r2" /></>}
      </span>
    </button>
  );
});

function Synapse({ mounted, completed, seen, started, g, runnerOpen, onOpen, dispatch }) {
  const { t, p, fmtNum, fmtDate, lang } = useI18n();
  const rootRef = useRef(null);
  const coreRef = useRef(null);
  const [fired, setFired] = useState(null);
  const [flash, setFlash] = useState(null); // { k, pts, qs }
  const [banner, setBanner] = useState(null); // level-up inside the core
  const [hover, setHover] = useState(null);
  const busy = useRef(false);
  const [tick, setTick] = useState(0);

  const items = g.items;
  const done = mounted ? completed : {};
  const seenM = mounted ? seen : {};
  const tot = seenTotalsOf(done, seenM);
  const max = useMemo(() => maxOf(), []);
  const doneCount = items.filter((s) => done[s]).length;
  const lv = levelOf(tot.qs); const nx = nextLevelOf(tot.qs); const li = levelIndex(tot.qs);
  const r = rules();
  const cashNext = nextCashOf(tot.pts);
  const cashPct = (tot.pts % r.pointsPerUsd) / r.pointsPerUsd;
  const { pts, links, size } = useMemo(() => spiralLayout(items.length), [items.length]);

  const stateOf = useCallback((slug) => {
    if (done[slug]) return 'done';
    if (g.lock[slug]) return 'locked';
    if (slug === g.next) return 'next';
    return mounted && started?.[slug] ? 'progress' : 'open';
  }, [done, g, started, mounted]);

  /* ---------------- delivery of newly earned rewards (runs once per batch) ---------------- */
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const live = useRef({});
  live.current = { completed, seen, fmtNum };
  const pendKey = mounted ? pendingRewards(completed, seen).join(',') : '';
  useEffect(() => {
    if (!mounted || runnerOpen || busy.current || !pendKey) return;
    const { completed: c0, seen: s0, fmtNum: fmt } = live.current;
    const pend = pendingRewards(c0, s0);
    if (!pend.length) return;
    busy.current = true;
    const root = rootRef.current;
    const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
    const reduce = reduceMotion();
    const fast = pend.length > 2; // several waiting → quick succession (never feels stuck)
    if (root && !reduce) {
      const stage = root.querySelector('.syn-stage') || root;
      const rr = stage.getBoundingClientRect();
      if (rr.top < 90 || rr.bottom > innerHeight - 20) stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    let i = 0;
    let qsBefore = seenTotalsOf(c0, s0).qs;
    const finish = () => later(() => { setFired(null); busy.current = false; setTick((n) => n + 1); }, 600);
    const advance = (gap) => { i += 1; if (i < pend.length) later(step, gap); };
    const step = () => {
      const slug = pend[i];
      const m = PROFILE_META[slug] || { a: '#2EE6C5', b: '#22B8F0' };
      const node = root?.querySelector(`[data-node="${slug}"]`);
      const core = coreRef.current;
      const rw = rewardOf(slug);
      const last = i === pend.length - 1;
      setFired(slug);
      pulse();
      later(() => firePulse(node, core, m.a, () => {
        const fk = Date.now();
        setFlash({ k: fk, pts: rw.pts, qs: rw.qs });
        later(() => setFlash((f) => (f && f.k === fk ? null : f)), 1500);
        fly();
        flyToken(core, document.getElementById('rw-pts'), '+' + fmt(rw.pts), ['#FFB020', '#FF7A45', m.a, '#FFE3A3'], () => coin(), 'coin');
        later(() => {
          flyToken(core, document.getElementById('rw-qs'), '+' + fmt(rw.qs), ['#2EE6C5', '#22B8F0', m.b, '#C9FFF4'], () => {
            quality();
            dispatch({ type: 'seen', slugs: slug });
            const qsAfter = qsBefore + rw.qs;
            if (levelIndex(qsAfter) > levelIndex(qsBefore)) {
              setBanner({ k: Date.now(), L: levelOf(qsAfter) });
              later(() => levelUp(), 150);
              later(() => setBanner(null), 3200);
            }
            qsBefore = qsAfter;
            if (last) finish();
            else if (!fast) advance(650);
          }, 'qs');
          if (fast && !last) advance(420);
        }, fast ? 130 : 300);
      }), reduce ? 30 : fast ? 200 : 650);
    };
    later(step, reduce ? 40 : fast ? 300 : 700);
  }, [mounted, runnerOpen, pendKey, tick, dispatch]);

  const open = useCallback((slug) => {
    if (!g.lock[slug]) profileOpen(items.indexOf(slug));
    onOpen(slug);
  }, [items, g, onOpen]);

  const hov = hover && PROFILE_META[hover] ? hover : null;
  const hovState = hov ? stateOf(hov) : null;
  const ring = max.qs ? doneCount / items.length : 0;
  const recent = useMemo(() => items.filter((s) => done[s] && seenM[s]).sort((x, y) => done[y] - done[x]).slice(0, 4), [items, done, seenM]);
  const lit = links.filter((l) => done[items[l.a]] && (l.b < 0 || done[items[l.b]]));
  const signals = lit.slice(0, 5);

  return (
    <section className="syn" id="rewards" ref={rootRef} aria-labelledby="syn-title">
      <div className="sec-head">
        <div>
          <p className="eyebrow mono"><i className="led" />{t('synEyebrow')}</p>
          <h2 id="syn-title" className="sec-title">{t('synTitle')}</h2>
          <p className="sec-sub">{t('synSub', { pts: fmtNum(r.pointsPerProfile), qs: fmtNum(r.qualityPerProfile) })}</p>
        </div>
        <ul className="rules mono" aria-label={t('synRules')}>
          <li><span className="rl-coin" aria-hidden="true" /><b>+{fmtNum(r.pointsPerProfile)}</b><span>{t('synRulePts')}</span></li>
          <li><span className="rl-qs" aria-hidden="true" /><b>+{fmtNum(r.qualityPerProfile)}</b><span>{t('synRuleQs')}</span></li>
          <li><span aria-hidden="true">💵</span><b>{fmtNum(r.pointsPerUsd)}</b><span>{t('synRuleUsd', { usd: usd(r.pointsPerUsd, lang) })}</span></li>
        </ul>
      </div>

      <div className="syn-body">
        <div className="syn-stage-wrap">
          <Brackets />
          <div className={'syn-stage' + (items.length > 40 ? ' dense' : '')} style={{ '--lc': lv.c, '--ring': ring }}>
            <svg className="syn-links" viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none">
              <circle cx="50" cy="50" r="49" className="syn-rim" />
              <circle cx="50" cy="50" r="37" className="syn-mid" />
              {links.map((l, k) => {
                const A = pts[l.a]; const B = l.b < 0 ? { x: 50, y: 50 } : pts[l.b];
                const on = done[items[l.a]] && (l.b < 0 || done[items[l.b]]);
                return <line key={k} x1={A.x} y1={A.y} x2={B.x} y2={B.y} className={on ? 'on' : ''} />;
              })}
            </svg>
            {!reduceMotionSafe() && signals.map((l, k) => {
              const A = pts[l.a]; const B = l.b < 0 ? { x: 50, y: 50 } : pts[l.b];
              return <i key={k} className="sig" style={{ left: A.x + '%', top: A.y + '%', '--dx': (B.x - A.x).toFixed(2), '--dy': (B.y - A.y).toFixed(2), '--k': k }} aria-hidden="true" />;
            })}

            <div className={'syn-core' + (flash ? ' flash' : '') + (banner ? ' lvl' : '')} ref={coreRef}>
              <svg className="core-ring" viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="46" className="cr-trk" />
                <circle cx="50" cy="50" r="46" className="cr-val" pathLength="100" style={{ strokeDasharray: `${(ring * 100).toFixed(1)} 100` }} />
              </svg>
              <div className="core-in" aria-live="polite">
                {banner ? (
                  <div className="core-lvl" key={banner.k}>
                    <small className="mono">{t('levelUp')}</small>
                    <b aria-hidden="true">{banner.L.emoji}</b>
                    <strong>{t('lvl_' + banner.L.key)}</strong>
                  </div>
                ) : hov ? (
                  <div className="core-hov">
                    <b aria-hidden="true">{PROFILE_META[hov].emoji}</b>
                    <strong>{p(hov)}</strong>
                    <small className="mono">
                      {hovState === 'done' ? t('nodeDone', { date: fmtDate(done[hov]) })
                        : hovState === 'locked' ? t('nodeLocked')
                          : t('nodeOpen', { pts: fmtNum(rewardOf(hov).pts), qs: fmtNum(rewardOf(hov).qs) })}
                    </small>
                  </div>
                ) : (
                  <div className="core-def">
                    <AnimatedLogo heart height={30} className="core-logo" />
                    <RollNumber value={tot.pts} format={fmtNum} className="core-pts mono" label={t('walletPts', { n: fmtNum(tot.pts) })} />
                    <small className="mono">{t('pts')} · {fmtNum(tot.qs)} {t('qsShort')}</small>
                    <span className="core-lv" style={{ '--c': lv.c }}>{lv.emoji} {t('lvl_' + lv.key)}</span>
                  </div>
                )}
                {flash && <span key={flash.k} className="core-flash mono" aria-hidden="true">+{fmtNum(flash.pts)} · +{fmtNum(flash.qs)} QS</span>}
              </div>
            </div>

            {items.map((slug, k) => {
              const m = PROFILE_META[slug] || { emoji: '✨', a: '#2EE6C5', b: '#22B8F0' };
              const st = stateOf(slug);
              const label = `${p(slug)} — ${st === 'done' ? t('nodeDoneShort') : st === 'locked' ? t('nodeLocked') : t('nodeOpen', { pts: fmtNum(rewardOf(slug).pts), qs: fmtNum(rewardOf(slug).qs) })}`;
              return (
                <Neuron key={slug} slug={slug} pt={pts[k]} state={st} fired={fired === slug} size={size}
                  onOpen={open} onHover={setHover} label={label} emoji={m.emoji} a={m.a} b={m.b} code={codeOf(slug)} />
              );
            })}
          </div>
          <ul className="syn-legend mono" aria-hidden="true">
            <li><i className="lgd lg-d" />{t('legendDone')}</li>
            <li><i className="lgd lg-o" />{t('legendOpen')}</li>
            <li><i className="lgd lg-l" />{t('legendLocked')}</li>
          </ul>
        </div>

        <div className="ledger">
          <div className="lg-card lg-pts">
            <p className="lg-lbl mono">{t('ledgerPoints')}</p>
            <div className="lg-big"><RollNumber value={tot.pts} format={fmtNum} className="mono" label={t('walletPts', { n: fmtNum(tot.pts) })} /><small className="mono">/ {fmtNum(max.pts)}</small></div>
            <p className="lg-cash">{t('ledgerCash')} <b className="mono">{usd(tot.pts, lang)}</b></p>
            <div className="dose" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(cashPct * 100)} aria-label={t('ledgerNextCash', { n: fmtNum(cashNext - tot.pts), usd: usd(cashNext, lang) })}>
              {Array.from({ length: 20 }, (_, k) => <i key={k} className={k < Math.round(cashPct * 20) ? 'on' : ''} />)}
            </div>
            <p className="lg-hint mono">{t('ledgerNextCash', { n: fmtNum(cashNext - tot.pts), usd: usd(cashNext, lang) })}</p>
          </div>

          <div className="lg-card lg-qs" style={{ '--lc': lv.c }}>
            <p className="lg-lbl mono">{t('ledgerQs')}</p>
            <div className="lg-big"><RollNumber value={tot.qs} format={fmtNum} className="mono" label={t('walletQs', { n: fmtNum(tot.qs), level: t('lvl_' + lv.key) })} /><small className="mono">QS</small></div>
            <p className="lg-cash"><span aria-hidden="true">{lv.emoji}</span> <b>{t('lvl_' + lv.key)}</b></p>
            <p className="lg-hint mono">{nx ? t('qsToNext', { n: fmtNum(nx.min - tot.qs), level: t('lvl_' + nx.key) }) : t('qsTop')}</p>
            <div className="lg-lvbar" aria-hidden="true"><i style={{ transform: `scaleX(${levelProgress(tot.qs)})` }} /></div>
          </div>

          <div className="lg-card lg-pyr">
            <p className="lg-lbl mono">{t('pyramidTitle')}</p>
            <ol className="pyramid">
              {LEVELS.map((L, k) => (
                <li key={L.key} className={(k <= li ? 'on' : '') + (k === li ? ' cur' : '')} style={{ '--c': L.c, '--w': 38 + k * 6.8 + '%' }}
                  aria-current={k === li ? 'step' : undefined}>
                  <span className="py-bar"><span aria-hidden="true">{L.emoji}</span> {t('lvl_' + L.key)}</span>
                  <small className="mono">{fmtNum(L.min)}</small>
                </li>
              )).reverse()}
            </ol>
          </div>

          <div className="lg-card lg-log">
            <p className="lg-lbl mono">{t('ledgerRecent')} · {fmtNum(doneCount)}/{fmtNum(items.length)}</p>
            {recent.length ? (
              <ul className="log">
                {recent.map((s) => (
                  <li key={s} style={{ '--a': PROFILE_META[s]?.a, '--b': PROFILE_META[s]?.b }}>
                    <span className="log-e" aria-hidden="true">{PROFILE_META[s]?.emoji}</span>
                    <span className="log-n">{p(s)}<small className="mono">{codeOf(s)} · {fmtDate(done[s])}</small></span>
                    <b className="log-p mono">+{fmtNum(rewardOf(s).pts)}<small>+{fmtNum(rewardOf(s).qs)} QS</small></b>
                  </li>
                ))}
              </ul>
            ) : <p className="lg-empty">{t('ledgerEmpty')}</p>}
            {g.next && (
              <button type="button" className="btn ghost sm lg-next" onClick={() => open(g.next)}>
                <span aria-hidden="true">{PROFILE_META[g.next]?.emoji}</span> {t(isSurvey(g.next) ? 'ledgerNextSurvey' : 'ledgerNext', { name: p(g.next) })} →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
function reduceMotionSafe() { return typeof window !== 'undefined' && reduceMotion(); }
export default memo(Synapse);
