import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { metaOf } from '../data/profileMeta.js';
import { bond, fly, coin, quality, profileOpen, milestone as milestoneSound } from '../lib/sound.js';
import { flyToken, sparkBurst } from '../lib/tokenflight.js';
import { takeCelebrations } from '../lib/celebrate.js';
import {
  rewardOf, rules, seenTotalsOf, pendingRewards, codeOf, MILESTONES, milestoneCount, nextMilestone, chromosomes,
} from '../lib/rewards.js';
import RollNumber from './RollNumber.jsx';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CLINICAL GENOME — the HCP rewards experience (v3.0)
 * ─────────────────────────────────────────────────────────────────────────────
 *  The member's professional identity is a living DNA double helix. Every profile is one GENE — one base-pair rung.
 *  Completing a profile SEQUENCES that gene: its bond forms in the profile's own colours, sparks fly, and the
 *  +70 Reward Points capsule and the +5 Quality Score heartbeat fly from the rung to the header.
 *
 *    ┌ read-outs ─ Reward Points · Quality Score · Genome sequenced (ring) · Still to earn
 *    ├ helix ───── canvas 3D double helix that turns slowly; one rung per profile; a scanner beam waits on the next
 *    │             gene; each rung has a badge (tap = open the profile, hover = details)
 *    └ footer ──── Genome milestones (25 / 50 / 75 / 100 %) · Chromosome map (12 genes per chromosome) · next gene CTA
 *
 *  Scales to any number of profiles: rungs keep a minimum spacing and the helix scrolls sideways (arrows, drag,
 *  wheel, keyboard) once they no longer fit; the canvas is only as wide as the screen and draws the visible part,
 *  so 150 profiles cost the same as 11. The chromosome map adds a chromosome per 12 profiles.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const reduceMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const TAU = Math.PI * 2;

function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
const rgba = (h, a) => { const [r, g, b] = hexRgb(h); return `rgba(${r},${g},${b},${a})`; };

/* ------------------------------------------------------------------ helix canvas */
function useHelix({ wrapRef, canvasRef, items, doneRef, nextRef, zipRef, gap, pad }) {
  useEffect(() => {
    const wrap = wrapRef.current; const cv = canvasRef.current;
    if (!wrap || !cv) return undefined;
    const ctx = cv.getContext('2d');
    let W = 0; let H = 0; let dpr = 1; let raf = 0; let visible = true; let last = 0; let phase = 0.6;
    const reduce = reduceMotion();
    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth; H = wrap.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
    };
    size();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => { size(); draw(performance.now()); }) : null;
    ro?.observe(wrap);
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); }, { rootMargin: '60px' }) : null;
    io?.observe(wrap);
    const onScroll = () => draw(performance.now());
    wrap.addEventListener('scroll', onScroll, { passive: true });

    function draw(now) {
      const off = wrap.scrollLeft;
      const n = items.length;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const cy = H * 0.5;
      const A = Math.min(64, H * 0.3);
      const k = TAU / (gap * 5.2); // one full twist every ~5 rungs
      const x0 = pad - off; const x1 = pad + n * gap - off;
      const yA = (x) => cy + A * Math.sin(phase + (x + off) * k);
      const zA = (x) => Math.cos(phase + (x + off) * k);
      const from = Math.max(x0 - 4, -20); const to = Math.min(x1 + 4, W + 20);
      const done = doneRef.current; const next = nextRef.current; const zips = zipRef.current;

      // backbones: back half first, then rungs, then front half (gives the 3D overlap)
      const STEP = 6;
      const strand = (sign, front) => {
        ctx.lineCap = 'round';
        for (let x = from; x < to; x += STEP) {
          const z = sign * zA(x + STEP / 2);
          if ((z > 0) !== front) continue;
          const y = sign > 0 ? yA(x) : 2 * cy - yA(x);
          const y2 = sign > 0 ? yA(x + STEP) : 2 * cy - yA(x + STEP);
          const depth = (z + 1) / 2;
          ctx.strokeStyle = sign > 0 ? `rgba(46,230,197,${(0.25 + depth * 0.7).toFixed(2)})` : `rgba(139,124,255,${(0.25 + depth * 0.7).toFixed(2)})`;
          ctx.lineWidth = 2.2 + depth * 3.6;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + STEP, y2); ctx.stroke();
        }
      };
      strand(1, false); strand(-1, false);

      for (let i = 0; i < n; i++) {
        const x = pad + i * gap + gap / 2 - off;
        if (x < -gap || x > W + gap) continue;
        const slug = items[i];
        const m = metaOf(slug);
        const ya = yA(x); const yb = 2 * cy - ya;
        const isDone = !!done[slug];
        const z = zips[slug];
        let prog = isDone ? 1 : 0;
        if (z) { prog = Math.max(0, Math.min(1, (now - z) / 900)); if (prog >= 1 && now - z > 1800) delete zips[slug]; }
        if (prog > 0) {
          // bond grows from both strands to the centre
          const e = 1 - (1 - prog) ** 3;
          const g = ctx.createLinearGradient(x, ya, x, yb);
          g.addColorStop(0, m.a); g.addColorStop(1, m.b);
          ctx.lineCap = 'round';
          // soft glow = a wide translucent stroke under the bond (no shadowBlur: it is slow on phones)
          ctx.strokeStyle = rgba(m.a, z && prog < 1 ? 0.45 : 0.25); ctx.lineWidth = z && prog < 1 ? 18 : 13;
          ctx.beginPath(); ctx.moveTo(x, ya); ctx.lineTo(x, ya + (cy - ya) * e); ctx.moveTo(x, yb); ctx.lineTo(x, yb + (cy - yb) * e); ctx.stroke();
          ctx.strokeStyle = g; ctx.lineWidth = 6;
          ctx.beginPath(); ctx.moveTo(x, ya); ctx.lineTo(x, ya + (cy - ya) * e); ctx.moveTo(x, yb); ctx.lineTo(x, yb + (cy - yb) * e); ctx.stroke();
          // nucleotides
          for (const [yy, c] of [[ya, m.a], [yb, m.b]]) {
            ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, yy, 5.5, 0, TAU); ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(x - 1.6, yy - 1.6, 1.8, 0, TAU); ctx.fill();
          }
          if (z && prog < 1) {
            // sparks travelling along the forming bond
            for (let s = 0; s < 6; s++) {
              const tt = (prog * 2 + s / 6) % 1;
              ctx.fillStyle = rgba(s % 2 ? m.b : m.c, 1 - tt);
              ctx.beginPath(); ctx.arc(x + Math.sin(s * 2.1 + now / 90) * 10 * tt, ya + (yb - ya) * tt, 2.4, 0, TAU); ctx.fill();
            }
          }
        } else {
          // unsequenced gene: faint dashed bond
          ctx.strokeStyle = slug === next ? rgba(m.b, 0.75) : 'rgba(170,200,230,.32)';
          ctx.lineWidth = 2; ctx.setLineDash([3, 5]);
          ctx.beginPath(); ctx.moveTo(x, ya); ctx.lineTo(x, yb); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillStyle = 'rgba(190,215,240,.45)';
          ctx.beginPath(); ctx.arc(x, ya, 3.4, 0, TAU); ctx.arc(x, yb, 3.4, 0, TAU); ctx.fill();
        }
        if (slug === next) {
          // scanner beam waiting on the next gene
          const sw = Math.sin(now / 420) * 6;
          const g = ctx.createLinearGradient(x - 22, 0, x + 22, 0);
          g.addColorStop(0, rgba(m.b, 0)); g.addColorStop(0.5, rgba(m.b, 0.28)); g.addColorStop(1, rgba(m.b, 0));
          ctx.fillStyle = g; ctx.fillRect(x - 22 + sw, 6, 44, H - 12);
          ctx.strokeStyle = rgba(m.c, 0.8); ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(x + sw, 8); ctx.lineTo(x + sw, H - 8); ctx.stroke();
        }
      }
      strand(1, true); strand(-1, true);
    }
    function loop() {
      cancelAnimationFrame(raf);
      let drawnAt = 0;
      const tick = (now) => {
        const dt = last ? Math.min(64, now - last) : 16; last = now;
        if (!reduce) phase += dt * 0.00055;
        // the turning helix is drawn at ~30 fps (smooth for a slow rotation, half the work); bonds forming at full rate
        if (now - drawnAt > 30 || Object.keys(zipRef.current).length) { drawnAt = now; draw(now); }
        if (visible && !reduce) raf = requestAnimationFrame(tick);
        else if (Object.keys(zipRef.current).length) raf = requestAnimationFrame(tick);
        else last = 0;
      };
      raf = requestAnimationFrame(tick);
    }
    loop();
    const kick = () => loop();
    wrap.addEventListener('mho-kick', kick);
    return () => { cancelAnimationFrame(raf); ro?.disconnect(); io?.disconnect(); wrap.removeEventListener('scroll', onScroll); wrap.removeEventListener('mho-kick', kick); };
  }, [items, gap, pad]); // eslint-disable-line react-hooks/exhaustive-deps
}

/* ------------------------------------------------------------------ the section */
function Genome({ mounted, completed, seen, pr, runnerOpen, onOpen, dispatch }) {
  const { t, p, fmtNum, fmtDate } = useI18n();
  const items = pr.items;
  const done = mounted ? completed : {};
  const seenM = mounted ? seen : {};
  const tot = seenTotalsOf(done, seenM);
  const r = rules();
  const doneCount = pr.done;
  const ms = nextMilestone(doneCount, items.length);

  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const doneRef = useRef({}); const nextRef = useRef(null); const zipRef = useRef({});
  // the helix shows a gene as "sequenced" once its reward has been delivered (or while its bond is forming)
  doneRef.current = Object.fromEntries(items.filter((s) => done[s] && (seenM[s] || zipRef.current[s])).map((s) => [s, 1]));
  nextRef.current = pr.next;

  const [vw, setVw] = useState(1200);
  const [hover, setHover] = useState(null);
  const [edge, setEdge] = useState({ l: false, r: false });
  const [pop, setPop] = useState(null);
  useLayoutEffect(() => {
    const on = () => setVw(wrapRef.current?.clientWidth || 1200);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  const minGap = vw < 520 ? 50 : 62;
  const pad = vw < 520 ? 14 : 28;
  const gap = Math.max(minGap, Math.min(118, (vw - pad * 2) / Math.max(1, items.length)));
  const inner = Math.max(vw, items.length * gap + pad * 2);
  useHelix({ wrapRef, canvasRef, items, doneRef, nextRef, zipRef, gap, pad });

  const edges = useCallback(() => {
    const w = wrapRef.current; if (!w) return;
    setEdge({ l: w.scrollLeft > 4, r: w.scrollLeft + w.clientWidth < w.scrollWidth - 4 });
  }, []);
  useEffect(() => { edges(); }, [inner, vw, edges]);
  const centerOn = useCallback((slug, smooth = true) => {
    const w = wrapRef.current; if (!w) return;
    const i = items.indexOf(slug); if (i < 0) return;
    const x = pad + i * gap + gap / 2 - w.clientWidth / 2;
    w.scrollTo({ left: Math.max(0, x), behavior: smooth && !reduceMotion() ? 'smooth' : 'auto' });
  }, [items, gap, pad]);
  useEffect(() => { if (mounted && pr.next) centerOn(pr.next, false); }, [mounted, gap]); // eslint-disable-line react-hooks/exhaustive-deps
  const nudge = (d) => { const w = wrapRef.current; if (w) w.scrollBy({ left: d * w.clientWidth * 0.7, behavior: 'smooth' }); };

  const kick = () => wrapRef.current?.dispatchEvent(new Event('mho-kick'));
  const zip = useCallback((slug, delay = 0) => { zipRef.current[slug] = performance.now() + delay; kick(); }, []);

  /* ---------------- delivery of rewards not yet shown (e.g. finished, then the tab was closed) ---------------- */
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const busy = useRef(false);
  const [tick, setTick] = useState(0);
  const live = useRef({});
  live.current = { completed, seen, fmtNum, doneCount, total: items.length };
  const pendKey = mounted ? pendingRewards(completed, seen).join(',') : '';
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const scrollIntoViewIfNeeded = () => {
    const el = wrapRef.current; if (!el || reduceMotion()) return;
    const rr = el.getBoundingClientRect();
    if (rr.top < 80 || rr.bottom > innerHeight - 10) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const milestoneCheck = (before, after) => {
    const total = live.current.total;
    const hit = MILESTONES.find((m) => before < milestoneCount(m, total) && after >= milestoneCount(m, total));
    if (hit) { setPop({ k: Date.now(), m: hit }); later(() => milestoneSound(), 200); later(() => setPop(null), 3400); }
  };

  useEffect(() => {
    if (!mounted || runnerOpen || busy.current) return;
    const cel = takeCelebrations().filter((s) => completed[s]);
    const { completed: c0, seen: s0, fmtNum: fmt } = live.current;
    const pend = pendingRewards(c0, s0);
    if (!cel.length && !pend.length) return;
    busy.current = true;
    const reduce = reduceMotion();
    let doneSoFar = live.current.doneCount - pend.length - cel.length;
    scrollIntoViewIfNeeded();
    // 1) celebrations: rewards already delivered in the question flow → bond forms + header shimmer, no tokens
    let at = reduce ? 0 : 500;
    for (const slug of cel) {
      zip(slug, at); // bond stays open until its turn
      later(() => {
        centerOn(slug); bond();
        const node = wrapRef.current?.querySelector(`[data-gene="${slug}"]`);
        sparkBurst(node, [metaOf(slug).a, metaOf(slug).b, metaOf(slug).c]);
        ['rw-pts', 'rw-qs'].forEach((id) => document.getElementById(id)?.classList.add('shimmer'));
        later(() => ['rw-pts', 'rw-qs'].forEach((id) => document.getElementById(id)?.classList.remove('shimmer')), 1600);
        const b = doneSoFar; doneSoFar += 1; milestoneCheck(b, doneSoFar);
      }, at);
      at += reduce ? 0 : 1000;
    }
    // 2) pending: bond forms, then the two tokens fly to the header and the wallet counts up
    let i = 0;
    const fast = pend.length > 2;
    const finish = () => later(() => { busy.current = false; setTick((n) => n + 1); }, 400);
    const step = () => {
      const slug = pend[i]; const last = i === pend.length - 1;
      const m = metaOf(slug); const rw = rewardOf(slug);
      centerOn(slug); zip(slug); bond();
      later(() => {
        const node = wrapRef.current?.querySelector(`[data-gene="${slug}"]`);
        sparkBurst(node, [m.a, m.b, m.c]);
        fly();
        flyToken(node, document.getElementById('rw-pts'), '+' + fmt(rw.pts), ['#FFB020', '#FF7A45', m.a, '#FFE3A3'], () => coin(), 'pts');
        later(() => {
          flyToken(node, document.getElementById('rw-qs'), '+' + fmt(rw.qs), ['#2EE6C5', '#22B8F0', m.b, '#C9FFF4'], () => {
            quality();
            dispatch({ type: 'seen', slugs: slug });
            const b = doneSoFar; doneSoFar += 1; milestoneCheck(b, doneSoFar);
            if (last) finish(); else { i += 1; later(step, fast ? 250 : 500); }
          }, 'qs');
        }, fast ? 120 : 260);
      }, reduce ? 20 : fast ? 450 : 850);
    };
    if (pend.length) later(step, at + (reduce ? 20 : 300)); else later(finish, at + 900);
  }, [mounted, runnerOpen, pendKey, tick]); // eslint-disable-line react-hooks/exhaustive-deps

  const open = useCallback((slug) => { profileOpen(items.indexOf(slug)); onOpen(slug, completed[slug] ? 'review' : 'run'); }, [items, onOpen, completed]);

  const chromos = useMemo(() => chromosomes(items, 12), [items]);
  const ring = items.length ? doneCount / items.length : 0;
  const hov = hover && items.includes(hover) ? hover : null;
  const hovI = hov ? items.indexOf(hov) : -1;
  const hovX = hov ? pad + hovI * gap + gap / 2 - (wrapRef.current?.scrollLeft || 0) : 0;
  const tipLeft = Math.max(120, Math.min(vw - 120, hovX));
  const pctTxt = Math.round(ring * 100);

  return (
    <section className="gen" id="rewards" ref={sectionRef} aria-labelledby="gen-title">
      <div className="sec-head">
        <div>
          <p className="eyebrow"><i className="led" />{t('genEyebrow')}</p>
          <h2 id="gen-title" className="sec-title">{t('genTitle')}</h2>
          <p className="sec-sub">{t('genSub', { pts: fmtNum(r.pointsPerProfile), qs: fmtNum(r.qualityPerProfile) })}</p>
        </div>
      </div>

      <div className="gen-panel">
        <i className="gp-glow" aria-hidden="true" />
        <div className="gen-stats">
          <div className="gs gs-pts">
            <span className="gs-ic" aria-hidden="true"><svg viewBox="0 0 32 32"><g transform="rotate(-38 16 16)"><rect x="3" y="10" width="26" height="12" rx="6" className="cap-b" /><path d="M9 10h7v12H9a6 6 0 0 1 0-12z" className="cap-a" /><rect x="6.5" y="12.4" width="8" height="2.4" rx="1.2" className="cap-s" /></g></svg></span>
            <div className="gs-body">
              <p className="gs-lbl">{t('ledgerPoints')}</p>
              <RollNumber value={tot.pts} format={fmtNum} className="gs-num" label={t('walletPts', { n: fmtNum(tot.pts) })} />
              <p className="gs-sub">+{fmtNum(r.pointsPerProfile)} {t('perProfile')}</p>
            </div>
          </div>
          <div className="gs gs-qs">
            <span className="gs-ic" aria-hidden="true"><svg viewBox="0 0 32 32"><path className="qs-heart" d="M16 27S4 19.6 4 11.7C4 7.6 7 5 10.4 5c2.4 0 4.4 1.3 5.6 3.2C17.2 6.3 19.2 5 21.6 5 25 5 28 7.6 28 11.7 28 19.6 16 27 16 27z" /><path className="qs-ecg" d="M6 16h6l2-4 3 8 2-6 2 2h5" pathLength="100" /></svg></span>
            <div className="gs-body">
              <p className="gs-lbl">{t('ledgerQs')}</p>
              <RollNumber value={tot.qs} format={fmtNum} className="gs-num" label={t('walletQsPlain', { n: fmtNum(tot.qs) })} />
              <p className="gs-sub">+{fmtNum(r.qualityPerProfile)} {t('perProfile')}</p>
            </div>
            <svg className="gs-mon" viewBox="0 0 120 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 18h28l4-8 5 14 5-20 5 16 3-2h12l3-4 4 6 3-2h48" /></svg>
          </div>
          <div className="gs gs-ring" style={{ '--p': pctTxt }}>
            <span className="gs-donut" aria-hidden="true">
              <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" className="dn-t" /><circle cx="22" cy="22" r="18" className="dn-v" pathLength="100" /></svg>
              <b>{fmtNum(pctTxt)}<small>%</small></b>
            </span>
            <div className="gs-body">
              <p className="gs-lbl">{t('genSequenced')}</p>
              <p className="gs-num sm">{fmtNum(doneCount)}<small> / {fmtNum(items.length)}</small></p>
              <p className="gs-sub">{t('genProfilesDone')}</p>
            </div>
          </div>
          <div className="gs gs-left">
            <span className="gs-ic emo" aria-hidden="true">{pr.allDone ? '🏆' : '🎁'}</span>
            <div className="gs-body">
              <p className="gs-lbl">{pr.allDone ? t('genAllEarned') : t('genStillToEarn')}</p>
              <p className="gs-num sm">{pr.allDone ? fmtNum(tot.pts) : `${fmtNum(pr.left.pts)}`}<small> {t('pts')}</small> <span className="gs-plus">+{fmtNum(pr.allDone ? tot.qs : pr.left.qs)} <small>{t('qsShort')}</small></span></p>
              <p className="gs-sub">{pr.allDone ? t('genAllEarnedSub') : t('genInProfiles', { n: fmtNum(pr.todo.length) })}</p>
            </div>
          </div>
        </div>

        <div className={'helix' + (edge.l ? ' fade-l' : '') + (edge.r ? ' fade-r' : '')}>
          <div className="helix-scroll" ref={wrapRef} onScroll={edges} tabIndex={-1}>
            <canvas ref={canvasRef} className="helix-cv" aria-hidden="true" />
            <ul className="helix-inner" style={{ width: inner + 'px' }} aria-label={t('genTitle')}>
              {items.map((slug, i) => {
                const m = metaOf(slug);
                const isDone = !!done[slug];
                const shown = isDone && (seenM[slug] || zipRef.current[slug]);
                const st = shown ? 'done' : slug === pr.next ? 'next' : isDone ? 'arriving' : 'open';
                const rw = rewardOf(slug);
                const label = `${p(slug)} — ${isDone ? t('nodeDone', { date: fmtDate(done[slug]) }) : t('nodeOpen', { pts: fmtNum(rw.pts), qs: fmtNum(rw.qs) })}`;
                return (
                  <li key={slug} className="gene-li" style={{ left: pad + i * gap + gap / 2 + 'px' }}>
                    <button type="button" className={'gene st-' + st} data-gene={slug} style={{ '--a': m.a, '--b': m.b, '--c': m.c }}
                      onClick={() => open(slug)} onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(slug)} onPointerLeave={() => setHover(null)}
                      onFocus={() => setHover(slug)} onBlur={() => setHover(null)} aria-label={label}>
                      <span className="gn-disc" aria-hidden="true"><span className="gn-emo">{m.emoji}</span></span>
                      {st === 'done' && <span className="gn-ok" aria-hidden="true">✓</span>}
                      {st === 'next' && <i className="gn-ping" aria-hidden="true" />}
                    </button>
                    <span className="gn-code mono" aria-hidden="true">{st === 'done' ? m.gene : `+${fmtNum(rw.pts)}`}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          {edge.l && <button type="button" className="hx-nav l" onClick={() => nudge(-1)} aria-label={t('genScrollPrev')}>‹</button>}
          {edge.r && <button type="button" className="hx-nav r" onClick={() => nudge(1)} aria-label={t('genScrollNext')}>›</button>}
          {hov && (
            <div className="gene-tip" style={{ left: tipLeft + 'px', '--a': metaOf(hov).a, '--b': metaOf(hov).b }} aria-hidden="true">
              <b>{metaOf(hov).emoji} {p(hov)}</b>
              <small className="mono">{codeOf(hov)} · {done[hov] ? t('nodeDone', { date: fmtDate(done[hov]) }) : t('nodeOpen', { pts: fmtNum(rewardOf(hov).pts), qs: fmtNum(rewardOf(hov).qs) })}</small>
            </div>
          )}
          {pop && (
            <div className="ms-pop" key={pop.k} role="status">
              <span aria-hidden="true">{pop.m.emoji}</span>
              <div><small>{t('msReached')}</small><b>{t('ms_' + pop.m.key)}</b></div>
            </div>
          )}
        </div>

        <div className="gen-foot">
          <div className="ms">
            <p className="gf-lbl">{t('msTitle')}</p>
            <div className="ms-track" role="progressbar" aria-valuemin={0} aria-valuemax={items.length} aria-valuenow={doneCount} aria-label={t('overall', { done: fmtNum(doneCount), total: fmtNum(items.length) })}>
              <i className="ms-fill" style={{ transform: `scaleX(${ring})` }} />
              {MILESTONES.map((m) => {
                const need = milestoneCount(m, items.length);
                const hit = doneCount >= need;
                return (
                  <span key={m.key} className={'ms-dot' + (hit ? ' hit' : '') + (ms === m ? ' nx' : '')} style={{ insetInlineStart: m.at * 100 + '%' }}>
                    <b aria-hidden="true">{m.emoji}</b>
                    <small>{t('ms_' + m.key)}</small>
                  </span>
                );
              })}
            </div>
            <p className="ms-next">{ms ? t('msNext', { name: t('ms_' + ms.key), n: fmtNum(milestoneCount(ms, items.length) - doneCount) }) : t('msAll')}</p>
          </div>

          <div className="chromo">
            <p className="gf-lbl">{t('chromoTitle')}</p>
            <ul className="chr-list">
              {chromos.map((genes, ci) => {
                const dn = genes.filter((s) => done[s]).length;
                const mid = Math.ceil(genes.length / 2);
                return (
                  <li key={ci} className="chr">
                    <span className="chr-lbl mono">{t('chromoShort', { n: fmtNum(ci + 1) })} <small>{fmtNum(dn)}/{fmtNum(genes.length)}</small></span>
                    <span className="chr-body">
                      {genes.map((s, gi) => {
                        const m = metaOf(s);
                        return (
                          <button key={s} type="button" className={'band' + (done[s] ? ' on' : '') + (s === pr.next ? ' nx' : '') + (gi === mid ? ' cen' : '')}
                            style={{ '--a': m.a, '--b': m.b }} onClick={() => open(s)} aria-label={`${p(s)} — ${done[s] ? t('nodeDoneShort') : t('legendOpen')}`}
                            onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(s)} onPointerLeave={() => setHover(null)} />
                        );
                      })}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="gen-cta">
            {pr.next ? (
              <button type="button" className="btn primary lg" onClick={() => open(pr.next)} style={{ '--a': metaOf(pr.next).a, '--b': metaOf(pr.next).b }}>
                <span className="btn-emo" aria-hidden="true">{metaOf(pr.next).emoji}</span>
                <span className="btn-txt"><small>{t('genNextLbl')}</small>{p(pr.next)}</span>
                <span className="cta-rw mono" aria-hidden="true">+{fmtNum(rewardOf(pr.next).pts)} · +{fmtNum(rewardOf(pr.next).qs)} {t('qsShort')}</span>
              </button>
            ) : (
              <p className="gen-all"><span aria-hidden="true">🏆</span> {t('genAllDone')}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default memo(Genome);
