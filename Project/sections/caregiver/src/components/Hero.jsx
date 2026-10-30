import { asset } from '../lib/asset.js';
import { memo, useEffect, useRef, useState } from 'react';
import { useI18n } from '../lib/i18n.js';
import { HeartArt, Spark } from './Brand.jsx';

/* six original caregiving illustrations that orbit the 3D heart (the v1.3 animation, on a smaller stage) */
const SCENES = ['walk', 'meds', 'story', 'wheel', 'meal', 'hug'];
const SCENE_ALT = {
  walk: 'A caregiver walking arm in arm with an elderly man who uses a cane',
  meds: 'A caregiver handing medicine and water to an older woman in an armchair',
  story: 'A parent reading a bedtime story to a sleepy child',
  wheel: 'A caregiver pushing a smiling man in a wheelchair through a park',
  meal: 'A caregiver carrying a tray with a warm bowl of soup',
  hug: 'A daughter hugging her elderly mother',
};
const SPARKS = [
  { top: '10%', left: '4%', c: '#FFC65C' }, { top: '18%', left: '52%', c: '#FF7A59' }, { top: '76%', left: '2%', c: '#E8457C' },
  { top: '6%', left: '94%', c: '#FFC65C' }, { top: '86%', left: '48%', c: '#B06AB3' }, { top: '60%', left: '97%', c: '#FF9BB8' },
];
const LAYERS = [7, 6, 5, 4, 3, 2, 1];

const partOfDay = () => {
  const h = new Date().getHours();
  return h < 5 ? 'night' : h < 12 ? 'morning' : h < 17 ? 'afternoon' : h < 22 ? 'evening' : 'night';
};

/**
 * Compact hero of the caregiver "My Profile" tab.
 *   • left: the 3D care heart with the six caregiving moments turning around it (v1.3 animation, smaller)
 *   • right: a personal greeting for the logged-in caregiver ("Good evening, Kunal"), a tagline that follows
 *     their progress, a thank-you line and one button to the next step.
 */
function Hero({ name, g, returning, onStart, nextItem }) {
  const { t, tc, nf } = useI18n();
  const ref = useRef(null);
  const [pod, setPod] = useState(null);
  useEffect(() => setPod(partOfDay()), []);

  /* pause the carousel while the hero is off-screen (saves battery & CPU) */
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => el.classList.toggle('paused', !e.isIntersecting), { rootMargin: '60px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stage = !g ? 'start' : g.allDone ? 'done' : g.profilesComplete ? 'surveys' : g.profDone > 0 ? 'profiles' : 'start';
  const left = g ? g.profiles.length - g.profDone : 0;
  const who = name || t('hero.friend');
  const welcome = (t(returning ? 'hero.welcomeBack' : 'hero.welcome', { name: '\u0000' }) + '').split('\u0000');
  if (welcome.length < 2) welcome.push('');

  return (
    <section className="hero compact" ref={ref} aria-labelledby="hero-title">
      <div className="hero-sky" aria-hidden="true">
        <i className="glow g1" /><i className="glow g2" /><i className="glow g3" />
        {SPARKS.map((p, i) => <Spark key={i} style={{ top: p.top, left: p.left, '--i': i }} color={p.c} />)}
      </div>

      <div className="hero-inner">
        <div className="stage" aria-hidden="true">
          <i className="rays" />
          <i className="sun" />
          <div className="carousel">
            <div className="ring">
              {SCENES.map((sc, i) => (
                <figure key={sc} className="slide" style={{ '--i': i }}>
                  <div className="face">
                    <img src={asset(`images/scenes/${sc}.svg`)} width="132" height="178" alt={SCENE_ALT[sc]} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" />
                    <figcaption>{t('scene.' + sc)}</figcaption>
                  </div>
                  <div className="face back"><HeartArt id={'b' + i} /></div>
                </figure>
              ))}
            </div>
          </div>
          <div className="heart3d">
            {LAYERS.map((z) => <div key={z} className="layer" style={{ '--z': z }}><HeartArt layer /></div>)}
            <div className="layer front"><HeartArt id="hf" /></div>
          </div>
        </div>

        <div className="hero-copy">
          <p className="kicker">
            <span className="beat emo" aria-hidden="true">♥</span>
            <span suppressHydrationWarning>{pod ? t('hero.pod.' + pod, { name: who }) : t('hero.hello', { name: who })}</span>
            <span className="wave emo" aria-hidden="true">👋</span>
          </p>
          <h1 id="hero-title" className="hero-title">
            <span className="ht1">{welcome[0]}<span className="hname">{who}</span>{welcome[1]}</span>
            <span className="ht2">{t('hero.tag.' + stage)}</span>
          </h1>
          <p className="motto"><span className="hands emo" aria-hidden="true">🤲</span><span>{t('hero.sub.' + stage, { n: nf.format(left) })}</span></p>
          {nextItem && (
            <div className="hero-cta">
              <button className="btn brand big" type="button" onClick={() => onStart(nextItem.id)} style={{ '--p1': nextItem.palette[0], '--p2': nextItem.palette[1] }}>
                <span className="emo" aria-hidden="true">{nextItem.emoji}</span>
                <span>{t(g?.profilesComplete ? 'hero.ctaSurvey' : 'hero.ctaProfile', { name: tc(nextItem.title) })}</span>
                <span className="arrow" aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default memo(Hero);
