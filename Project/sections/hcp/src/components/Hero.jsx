import { memo, useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { metaOf } from '../data/profileMeta.js';
import { rewardOf } from '../lib/rewards.js';

/**
 * Compact welcome hero (≈ 250 px on desktop) — keeps the v2 "HoloScan" globe, with a new greeting animation.
 *   Left : a part-of-day greeting with a waving hand, "Welcome back, Kunal" — the words rise out of a soft blur, the
 *          name's letters drop in one by one with a light sweep, and a heartbeat line writes itself under the name;
 *          then a warm, progress-aware line about their profiles and one button to the next profile.
 *   Right: the holographic globe of meridian + latitude rings turning around a glowing heart-cross, a scan plane
 *          sweeping through it, an orbit of clinical chips and two vital read-outs.
 * The scene pauses off-screen; everything is static with prefers-reduced-motion.
 */
function partOfDay() {
  const h = new Date().getHours();
  return h < 5 ? 'night' : h < 12 ? 'morning' : h < 17 ? 'afternoon' : h < 22 ? 'evening' : 'night';
}
const DAY_EMOJI = { morning: '🌅', afternoon: '☀️', evening: '🌆', night: '🌙' };

function Words({ text, base = 0, className = 'fw' }) {
  // languages without spaces (zh / ja) animate as one block
  const parts = /\s/.test(text) ? text.split(/(\s+)/) : [text];
  let k = base;
  return parts.map((w, i) => (/^\s+$/.test(w) ? w : <span key={i} className={className} style={{ '--i': k++ }}>{w}</span>));
}
function Letters({ text }) {
  // grapheme-safe split (Devanagari, emoji …); joined scripts (Arabic) animate as one block
  let parts;
  try { parts = [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)].map((s) => s.segment); } catch { parts = [...text]; }
  if (/[؀-ۿ]/.test(text)) parts = [text];
  return parts.map((ch, i) => <span key={i} className="nl" style={{ '--j': i }}>{ch}</span>);
}

function Hero({ name, pr, onStart, mounted }) {
  const { t, p, fmtNum } = useI18n();
  const ref = useRef(null);
  const [pod, setPod] = useState('afternoon');
  useEffect(() => setPod(partOfDay()), []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('paused', !e.isIntersecting), { rootMargin: '40px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const done = mounted ? pr.done : 0;
  const stage = done === 0 ? 'fresh' : pr.allDone ? 'all' : 'progress';
  const who = name || t('heroNameFallback');
  const nextSlug = pr.next;
  const nm = nextSlug ? metaOf(nextSlug) : null;
  const welcome = t('heroWelcome');
  const rw = rewardOf();

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker"><span className="hk-emo" aria-hidden="true">{DAY_EMOJI[pod]}</span><span className="hk-txt">{t('pod_' + pod)}</span><span className="hk-wave" aria-hidden="true">👋</span></p>
        <h1 id="hero-title" className="hero-title">
          <span className="ht-line"><Words text={welcome} /></span>{' '}
          <span className="ht-name">
            <span className="nm" dir="auto" aria-hidden="true"><Letters text={who} /></span>
            <span className="sr-only">{who}</span>
            <svg className="nm-ecg" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path d="M0 9h70l6-7 7 13 7-15 7 12 4-3h99" pathLength="100" /></svg>
          </span>
        </h1>
        <p className="hero-tag" key={stage + done}><Words text={t('heroTag3_' + stage, { done: fmtNum(done), total: fmtNum(pr.total) })} className="tw" /></p>
        <div className="hero-cta">
          {nextSlug ? (
            <button type="button" className="btn primary xl" onClick={() => onStart(nextSlug)} style={{ '--a': nm.a, '--b': nm.b }}>
              <span className="btn-emo" aria-hidden="true">{nm.emoji}</span>
              <span className="btn-txt">{stage === 'fresh' ? t('heroStart3') : t('heroContinue', { name: p(nextSlug) })}</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          ) : (
            <button type="button" className="btn primary xl" onClick={() => onStart(null)}>
              <span className="btn-emo" aria-hidden="true">🏆</span><span className="btn-txt">{t('heroAllDone3')}</span><span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          )}
          {nextSlug && (
            <span className="hero-earn" aria-label={t('rxLabel', { pts: fmtNum(rw.pts), qs: fmtNum(rw.qs) })}>
              <b className="he-pts">+{fmtNum(rw.pts)} <small>{t('pts')}</small></b>
              <b className="he-qs">+{fmtNum(rw.qs)} <small>{t('qsShort')}</small></b>
            </span>
          )}
        </div>
      </div>

      <div className="holo" aria-hidden="true">
        <div className="holo-stage">
          <div className="halo" />
          <div className="globe">
            <svg className="lats" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="98" />
              {[-0.62, -0.3, 0, 0.3, 0.62].map((y) => <ellipse key={y} cx="100" cy={100 + y * 98} rx={98 * Math.sqrt(1 - y * y)} ry={98 * Math.sqrt(1 - y * y) * 0.22} />)}
            </svg>
            {[0, 1, 2, 3, 4, 5].map((k) => <i key={k} className="mer" style={{ '--k': k }} />)}
          </div>
          <div className="scanplane"><i /></div>
          <div className="hcore">
            <svg viewBox="0 0 100 100">
              <defs>
                <radialGradient id="hx-g" cx=".4" cy=".35"><stop offset="0" stopColor="#E9FFFB" /><stop offset=".5" stopColor="#2EE6C5" /><stop offset="1" stopColor="#0A8F9B" /></radialGradient>
                <linearGradient id="hx-h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF7A8C" /><stop offset="1" stopColor="#E0263F" /></linearGradient>
              </defs>
              <circle cx="50" cy="50" r="40" fill="url(#hx-g)" opacity=".28" />
              <path d="M40 18h20v22h22v20H60v22H40V60H18V40h22z" fill="url(#hx-g)" stroke="#E9FFFB" strokeWidth="1.5" />
              <path className="hc-heart" d="M50 66s-13-7.6-13-17.2c0-5 3.6-8.3 7.8-8.3 2.6 0 4.3 1.3 5.2 3 .9-1.7 2.6-3 5.2-3 4.2 0 7.8 3.3 7.8 8.3C63 58.4 50 66 50 66z" fill="url(#hx-h)" />
              <polyline points="30,52 41,52 45,45 50,60 54,40 58,52 70,52" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="orbit"><i className="orbit-ring" />
            {['🩺', '🧬', '💊', '🧠', '🔬', '🫀'].map((e, i) => <span key={e} className="chip" style={{ '--k': i }}><b>{e}</b></span>)}
          </div>
          <div className="readout r1 mono"><b>HR</b> 72<small>bpm</small>
            <svg viewBox="0 0 60 16"><polyline points="0,9 14,9 18,3 23,14 27,1 31,9 60,9" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
          </div>
          <div className="readout r2 mono"><b>SpO₂</b> 98<small>%</small></div>
        </div>
      </div>
    </section>
  );
}
export default memo(Hero);
