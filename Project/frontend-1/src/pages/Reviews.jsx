// Ratings & Reviews — the place member testimonials live. Every number on this page is computed from the
// published reviews in src/data/testimonials.js (RATING), never typed in by hand.
// Palette: "golden hour" (night plum, amber gold, rose). Sections, each with its own visual: 3D star and
// live score hero · score bars + audience donut · spotlight stage per audience · flag constellation ·
// theme bubbles · the full review wall · ticket-style call to review.
import { useEffect, useMemo, useState } from 'react';
import { Breadcrumbs, Button, LiveZone, useInView, Stars } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import { VoicesWall } from '../components/Testimonials.jsx';
import { openRateExperience } from '../components/RateExperience.jsx';
import { AUDIENCES, TESTIMONIALS, RATING } from '../data/testimonials.js';
import { openPageVideo } from '../data/pageVideos.js';

const initials = (name) => name.replace(/^Dr\.\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('');
const audColor = (id) => AUDIENCES.find((a) => a.id === id)?.color || '#f59e0b';

/* ---------- Hero ---------- */
function ScoreCounter() {
  const [v, setV] = useState(RATING.average);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1600);
      setV(RATING.average * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setV(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <b className="rv-score-num">{v.toFixed(1)}</b>;
}

function StarStage() {
  const orbit = TESTIMONIALS.filter((_, i) => i % 4 === 1).slice(0, 7);
  return (
    <LiveZone className="rv-star-stage" aria-hidden="true">
      <span className="rv-rays" />
      <div className="rv-star3d">
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <svg key={k} viewBox="0 0 100 100" style={{ '--k': k }}>
            <defs>
              <linearGradient id={`rvg${k}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff3c4" /><stop offset=".45" stopColor="#ffc94d" /><stop offset="1" stopColor="#f2542d" /></linearGradient>
            </defs>
            <path d="M50 4 63 36l34 3-26 22 8 34-29-18-29 18 8-34L3 39l34-3z" fill={`url(#rvg${k})`} />
          </svg>
        ))}
      </div>
      <div className="rv-orbit">
        {orbit.map((t, i) => (
          <span key={t.name} className="rv-orb" style={{ '--i': i, '--n': orbit.length, '--c': audColor(t.audience) }}>
            <i>{initials(t.name)}</i><b>{t.rating}<Icon name="star" size={10} fill="currentColor" stroke={0} /></b>
          </span>
        ))}
      </div>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <i key={i} className="rv-spark" style={{ '--i': i }} />)}
    </LiveZone>
  );
}

/* ---------- Score breakdown ---------- */
function Breakdown() {
  const [ref, on] = useInView({ threshold: 0.3 });
  const max = Math.max(...RATING.dist.map((d) => d.n), 1);
  const counts = AUDIENCES.map((a) => ({ ...a, n: TESTIMONIALS.filter((t) => t.audience === a.id).length, avg: 0 })).map((a) => {
    const list = TESTIMONIALS.filter((t) => t.audience === a.id);
    return { ...a, avg: list.length ? list.reduce((s, t) => s + t.rating, 0) / list.length : 0 };
  });
  let acc = 0;
  const segs = counts.map((c) => {
    const from = acc;
    acc += (c.n / RATING.count) * 100;
    return { ...c, from, len: (c.n / RATING.count) * 100 };
  });
  return (
    <div ref={ref} className={`rv-break ${on ? 'is-in' : ''}`}>
      <div className="rv-bars">
        <div className="rv-bars-head">
          <b>{RATING.average.toFixed(1)}</b>
          <span><Stars value={Math.round(RATING.average)} size={18} /><small>{RATING.count} published reviews</small></span>
        </div>
        <ul>
          {RATING.dist.map((d, i) => (
            <li key={d.stars} style={{ '--v': `${(d.n / max) * 100}%`, '--i': i }}>
              <span>{d.stars}<Icon name="star" size={13} fill="currentColor" stroke={0} /></span>
              <i aria-hidden="true"><em /></i>
              <b>{d.n}</b>
            </li>
          ))}
        </ul>
      </div>
      <div className="rv-donut-card">
        <svg className="rv-donut" viewBox="0 0 120 120" role="img" aria-label={`Reviews by group: ${counts.map((c) => `${c.label} ${c.n}`).join(', ')}`}>
          <circle cx="60" cy="60" r="46" className="rv-donut-bg" />
          {segs.map((s, i) => (
            <circle key={s.id} cx="60" cy="60" r="46" pathLength="100" stroke={s.color} style={{ '--from': -s.from, '--len': s.len, '--i': i }} className="rv-seg" />
          ))}
          <text x="60" y="58" textAnchor="middle" className="rv-donut-n">{RATING.count}</text>
          <text x="60" y="74" textAnchor="middle" className="rv-donut-l">voices</text>
        </svg>
        <ul className="rv-legend">
          {counts.map((c) => (
            <li key={c.id} style={{ '--c': c.color }}><i /><span>{c.label}</span><b>{c.avg.toFixed(1)}<Icon name="star" size={11} fill="currentColor" stroke={0} /></b></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Spotlight stage: one audience at a time ---------- */
function Spotlight() {
  const [aud, setAud] = useState(AUDIENCES[0].id);
  const [k, setK] = useState(0);
  const list = TESTIMONIALS.filter((t) => t.audience === aud);
  const t = list[k % list.length];
  const a = AUDIENCES.find((x) => x.id === aud);
  useEffect(() => setK(0), [aud]);
  return (
    <div className="rv-spot" style={{ '--c': a.color }}>
      <div className="rv-spot-tabs" role="tablist" aria-label="Choose a group">
        {AUDIENCES.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === aud} className={x.id === aud ? 'on' : ''} style={{ '--c': x.color }} onClick={() => setAud(x.id)}>{x.label}</button>
        ))}
      </div>
      <div className="rv-spot-stage">
        <span className="rv-spot-light" aria-hidden="true" />
        <figure className="rv-spot-card" key={t.name}>
          <span className="rv-spot-av" aria-hidden="true">{initials(t.name)}</span>
          <Stars value={t.rating} size={20} />
          <blockquote><p>“{t.quote}”</p></blockquote>
          <figcaption><b>{t.name}</b><span>{t.role} · {t.country}</span><span className="cc-tag" title={t.country}>{t.cc.toUpperCase()}</span></figcaption>
        </figure>
        <div className="rv-spot-nav">
          <button type="button" onClick={() => setK((x) => (x - 1 + list.length) % list.length)} aria-label="Previous review"><Icon name="arrowLeft" size={18} /></button>
          <span>{(k % list.length) + 1} / {list.length}</span>
          <button type="button" onClick={() => setK((x) => (x + 1) % list.length)} aria-label="Next review"><Icon name="arrow" size={18} /></button>
        </div>
        <ul className="rv-spot-thumbs" aria-hidden="true">
          {list.map((x, i) => <li key={x.name} className={i === k % list.length ? 'on' : ''}>{initials(x.name)}</li>)}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Country constellation ---------- */
function Constellation() {
  const byCountry = useMemo(() => {
    const m = new Map();
    TESTIMONIALS.forEach((t) => m.set(t.country, { cc: t.cc, country: t.country, n: (m.get(t.country)?.n || 0) + 1 }));
    return [...m.values()].sort((a, b) => b.n - a.n);
  }, []);
  const inner = byCountry.slice(0, 7);
  const outer = byCountry.slice(7);
  return (
    <LiveZone className="rv-const">
      <span className="rv-const-core"><b>{RATING.countries}</b><small>countries</small></span>
      <div className="rv-ring r1">
        {inner.map((c, i) => (
          <span key={c.country} className="rv-flag" style={{ '--i': i, '--n': inner.length }} title={`${c.country}: ${c.n} review${c.n > 1 ? 's' : ''}`}>
            <span className="rv-flag-in"><span className="cc-tag">{c.cc.toUpperCase()}</span><small>{c.country}</small><b>{c.n}</b></span>
          </span>
        ))}
      </div>
      <div className="rv-ring r2">
        {outer.map((c, i) => (
          <span key={c.country} className="rv-flag" style={{ '--i': i, '--n': outer.length }} title={`${c.country}: ${c.n} review${c.n > 1 ? 's' : ''}`}>
            <span className="rv-flag-in"><span className="cc-tag">{c.cc.toUpperCase()}</span><small>{c.country}</small><b>{c.n}</b></span>
          </span>
        ))}
      </div>
    </LiveZone>
  );
}

/* ---------- Theme bubbles: what members mention ---------- */
const THEMES = [
  ['Research', /research/i, '#7c3aed'],
  ['Patients', /patient/i, '#00a88a'],
  ['Perspectives', /perspective/i, '#2457f5'],
  ['Experience', /experience/i, '#f2542d'],
  ['Care', /\bcare\b|caregiv/i, '#ff6a2c'],
  ['Opportunity', /opportunit/i, '#e11d74'],
  ['Clear & transparent', /clear|transparen/i, '#0891b2'],
  ['Privacy', /privacy/i, '#475569'],
  ['Flexible', /flexib|time/i, '#d97706'],
];

function Bubbles() {
  const [ref, on] = useInView({ threshold: 0.3 });
  const data = THEMES.map(([t, re, c]) => ({ t, c, n: TESTIMONIALS.filter((x) => re.test(x.quote)).length })).filter((d) => d.n).sort((a, b) => b.n - a.n);
  const max = data[0]?.n || 1;
  return (
    <div ref={ref} className={`rv-bubbles ${on ? 'is-in' : ''}`}>
      {data.map((d, i) => (
        <span key={d.t} className="rv-bub" style={{ '--s': (0.45 + 0.55 * (d.n / max)).toFixed(2), '--c': d.c, '--i': i }}>
          <b>{d.n}</b><small>{d.t}</small>
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <>
      <section className="rv-hero">
        <div className="rv-hero-bg" aria-hidden="true"><i /><i /></div>
        <div className="container rv-hero-in">
          <div className="rv-hero-copy">
            <Breadcrumbs items={[{ to: '/', label: 'Home' }, { to: '/about-us', label: 'About Us' }, { label: 'Ratings & Reviews' }]} />
            <span className="rv-eyebrow"><Icon name="star" size={13} fill="currentColor" stroke={0} />Ratings & Reviews</span>
            <h1 className="rv-title">Rated by the people who <span>power healthcare.</span></h1>
            <div className="rv-score" aria-label={`Average rating ${RATING.average} out of 5 from ${RATING.count} reviews`}>
              <ScoreCounter />
              <span className="rv-score-side">
                <span className="rv-stars-fill" style={{ '--pct': `${(RATING.exact / 5) * 100}%` }} aria-hidden="true"><i>★★★★★</i><i>★★★★★</i></span>
                <small>out of 5 · {RATING.count} reviews · {RATING.countries} countries</small>
              </span>
            </div>
            <p className="rv-lead">Real MyHealthOpinions reviews: doctors, nurses, allied health professionals, caregivers and patients tell you what taking part is like. Then add your own voice in under a minute.</p>
            <div className="rv-ctas">
              <Button onClick={openRateExperience} icon="star">Rate your experience</Button>
              <button type="button" className="btn btn-ghost" onClick={openPageVideo}><span className="btn-label">Watch members</span><Icon name="play" size={16} fill="currentColor" stroke={0} className="btn-icon" /></button>
            </div>
          </div>
          <StarStage />
        </div>
      </section>

      <section className="section rv-sec-break">
        <div className="container">
          <header className="rv-head">
            <span className="rv-kicker">The score, broken down</span>
            <h2>Every star, <span className="rv-t-gold">counted in the open</span></h2>
          </header>
          <Breakdown />
        </div>
      </section>

      <section className="section rv-sec-spot">
        <div className="container">
          <header className="rv-head rv-head-center">
            <span className="rv-kicker k-light">In the spotlight</span>
            <h2>Pick a group. <span className="rv-t-rose">Hear their story.</span></h2>
          </header>
          <Spotlight />
        </div>
      </section>

      <section className="section rv-sec-world">
        <div className="container rv-world">
          <header className="rv-head">
            <span className="rv-kicker k-teal">Where voices come from</span>
            <h2>{RATING.count} reviews, <span className="rv-t-teal">{RATING.countries} countries</span></h2>
            <p className="rv-sub">Each tag shows a country and how many of its members have reviewed us.</p>
          </header>
          <Constellation />
        </div>
      </section>

      <section className="section rv-sec-themes">
        <div className="container">
          <header className="rv-head rv-head-center">
            <span className="rv-kicker k-violet">What members talk about</span>
            <h2>The words that <span className="rv-t-violet">keep coming up</span></h2>
            <p className="rv-sub">Bubble size = number of reviews that mention the theme.</p>
          </header>
          <Bubbles />
        </div>
      </section>

      <section className="section rv-wall">
        <div className="container">
          <header className="rv-head rv-head-center">
            <span className="rv-kicker">The wall</span>
            <h2>All member reviews</h2>
          </header>
          <VoicesWall />
          <div className="rv-ticket">
            <span className="rv-ticket-stub" aria-hidden="true"><Icon name="pen" size={26} /><small>Admit one</small></span>
            <div><b>Been part of a study?</b><span>Your review appears here instantly on your device, and publicly after a quick moderation check.</span></div>
            <Button onClick={openRateExperience} icon="star">Write a review</Button>
          </div>
        </div>
      </section>
    </>
  );
}
