import { memo, useEffect, useRef } from 'react';
import { useI18n } from '../lib/i18n.js';
import { Spark, Pill, HEART_D, ECG_D } from './Brand.jsx';
import { rules } from '../lib/rewards.js';

/* DNA double helix: 14 base pairs, animated with transforms only (GPU, no JS) — same hero animation as v1.2 */
const RUNGS = Array.from({ length: 14 }, (_, i) => i);
const SPARKS = [
  { top: '12%', left: '6%', c: '#F7B547' }, { top: '20%', left: '50%', c: '#F2611B' }, { top: '78%', left: '3%', c: '#14B8C4' },
  { top: '8%', left: '92%', c: '#F7B547' }, { top: '88%', left: '46%', c: '#8B5CF6' }, { top: '62%', left: '97%', c: '#F7B547' },
];

/** time-of-day greeting key (local clock) */
export function dayPart(d = new Date()) {
  const h = d.getHours();
  return h < 5 ? 'night' : h < 12 ? 'morning' : h < 17 ? 'afternoon' : h < 22 ? 'evening' : 'night';
}
const PART_EMOJI = { morning: '🌅', afternoon: '☀️', evening: '🌇', night: '🌙' };

/**
 * Compact greeting hero for the dashboard: "Good afternoon, Kunal" + a warm line that follows the
 * patient's progress, one progress capsule and one call to action. The 3D stage on the right is the
 * v1.2 hero animation (glass orb with a rotating DNA helix, tilted orbits, ripples and floating vitals).
 */
function Hero({ name, access, statuses, next, onStart }) {
  const { t, tc, nf } = useI18n();
  const ref = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => el.classList.toggle('paused', !e.isIntersecting), { rootMargin: '80px' });
      io.observe(el);
    }
    const st = stageRef.current;
    let raf = 0;
    const move = (e) => {
      if (e.pointerType !== 'mouse' || raf || !st) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = st.getBoundingClientRect();
        st.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        st.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    };
    el.addEventListener('pointermove', move, { passive: true });
    return () => { io?.disconnect(); el.removeEventListener('pointermove', move); };
  }, []);

  const part = dayPart();
  const a = access;
  const doneAll = statuses && statuses.doneCount === statuses.total;
  const stage = !a ? 'new' : doneAll ? 'all' : a.allProfiles ? 'ready' : a.profilesDone > 0 || statuses.doneCount > 0 ? 'going' : 'new';
  const who = name || '';
  const surveysDone = a ? a.surveys.filter((p) => statuses.map[p.id]?.status === 'done').length : 0;

  return (
    <section className="hero" ref={ref} aria-labelledby="mho-hero-title">
      <div className="aurora" aria-hidden="true">
        <i className="au a1" /><i className="au a2" /><i className="au a3" /><i className="grid" />
        {SPARKS.map((p, i) => <Spark key={i} style={{ top: p.top, left: p.left, '--i': i }} color={p.c} />)}
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="kicker">
            <span className="kick-dot" aria-hidden="true"><span className="emo">{PART_EMOJI[part]}</span></span>
            {who ? t('hero.hi.' + part, { name: who }) : t('hero.hiAnon.' + part)}
            <span className="wave emo" aria-hidden="true">👋</span>
          </p>
          <h1 id="mho-hero-title" className="hero-title">
            <span className="ht1">{t('hero.' + stage + '1', { name: who })}</span>
            <span className="ht2">{t('hero.' + stage + '2', { name: who })}</span>
          </h1>
          <p className="hero-sub">{t('hero.' + stage + 'Sub', { pts: nf.format(rules().profilePts), qs: nf.format(rules().profileQs) })}</p>
          {a && (
            <div className="hero-prog" role="group" aria-label={t('hero.progress')}>
              <div className="hp-row">
                <span className="emo" aria-hidden="true">🙋</span>
                <span className="hp-lab">{t('sec.profiles')}</span>
                <span className="hp-bar" aria-hidden="true"><i style={{ transform: `scaleX(${a.profilesDone / Math.max(1, a.profilesTotal)})` }} /></span>
                <b className="num">{nf.format(a.profilesDone)}/{nf.format(a.profilesTotal)}</b>
              </div>
              <div className={'hp-row' + (a.allProfiles ? '' : ' locked')}>
                <span className="emo" aria-hidden="true">{a.allProfiles ? '🩺' : '🔒'}</span>
                <span className="hp-lab">{t('sec.surveys')}</span>
                <span className="hp-bar" aria-hidden="true"><i style={{ transform: `scaleX(${surveysDone / Math.max(1, a.surveys.length)})` }} /></span>
                <b className="num">{nf.format(surveysDone)}/{nf.format(a.surveys.length)}</b>
              </div>
            </div>
          )}
          <div className="hero-cta">
            <button className="btn cta big" type="button" onClick={() => onStart(next?.id)} disabled={!next && !doneAll && !!a}>
              {next ? <><span className="emo" aria-hidden="true">{next.emoji}</span><span>{t('hero.ctaNext', { item: tc(next.title) })}</span></> : <span>{doneAll ? t('hero.ctaDone') : t('hero.cta')}</span>}
              <span className="arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="stage" ref={stageRef} aria-hidden="true">
          <i className="ripple r1" /><i className="ripple r2" /><i className="ripple r3" />
          <div className="orbit o1"><div className="track"><span className="sat s1"><Pill a="#F2611B" b="#FFFFFF" /></span><span className="sat s2"><span className="emo">🩺</span></span></div></div>
          <div className="orbit o2"><div className="track"><span className="sat s3"><Pill a="#14B8C4" b="#8B5CF6" /></span><span className="sat s4"><svg viewBox="0 0 24 24"><path d={HEART_D} fill="#E1192F" /></svg></span><span className="sat s5"><span className="emo">💊</span></span></div></div>
          <div className="orb">
            <i className="orb-glow" />
            <div className="helix">
              {RUNGS.map((i) => (
                <div key={i} className="rung" style={{ '--i': i }}>
                  <i className="bar" /><i className="node n1" /><i className="node n2" />
                </div>
              ))}
            </div>
            <i className="orb-shine" />
          </div>
          <div className="vital v-heart">
            <span className="v-ic"><svg viewBox="0 0 24 24"><path d={HEART_D} fill="currentColor" /></svg></span>
            <span className="v-txt"><small>{t('vital.heart')}</small><b className="num">72 <em>bpm</em></b></span>
            <svg className="v-ecg" viewBox="0 0 100 30" preserveAspectRatio="none"><path d={ECG_D} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="100" /></svg>
          </div>
          <div className="vital v-oxy">
            <svg className="v-ring" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" fill="none" strokeWidth="5" className="trk" /><circle cx="22" cy="22" r="18" fill="none" strokeWidth="5" className="val" pathLength="100" /></svg>
            <span className="v-txt"><small>{t('vital.oxygen')}</small><b className="num">98<em>%</em></b></span>
          </div>
          <div className="vital v-sleep">
            <span className="v-ic emo">🌙</span>
            <span className="v-txt"><small>{t('vital.sleep')}</small><b className="num">7h 40m</b></span>
            <span className="v-bars"><i /><i /><i /><i /><i /><i /><i /></span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default memo(Hero);
