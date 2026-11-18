// About MyHealthOpinions — primary: "healthcare research community". Secondary: healthcare market research,
// medicine research, paid clinical research (contrast), clinical research organization, Frequent Research.
// Palette: "clinical aurora" (midnight navy, coral → amber brand gradient, aqua and mint accents).
// Every section has its own visual: 3D DNA helix hero · bento of live counters · study-journey flow ·
// 3D tilt doors · vitals-monitor promises · scroll-drawn timeline · certificate plaque · coverflow voices.
import { useEffect, useRef, useState } from 'react';
import { Breadcrumbs, Button, LiveZone, useInView, Stars, Flag } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import Persona from '../components/Persona.jsx';
import { HeartMark } from '../components/Brand.jsx';
import { BadgeParade } from '../components/Footer.jsx';
import { Link } from '../router.jsx';
import { TESTIMONIALS, AUDIENCES } from '../data/testimonials.js';
import { openPageVideo } from '../data/pageVideos.js';
import frLogo from '../assets/brand/frequent-research-logo.webp';

const WORDS = ['doctors', 'nurses', 'pharmacists', 'caregivers', 'patients'];

/* ---------- Hero: rotating 3D DNA helix with stat satellites ---------- */
function Helix() {
  const rungs = Array.from({ length: 16 }, (_, i) => i);
  return (
    <LiveZone className="ab-helix-stage" aria-hidden="true">
      <span className="ab-halo" />
      <div className="ab-helix">
        {rungs.map((i) => (
          <span key={i} className="ab-rung" style={{ '--i': i }}>
            <i className="a" /><b /><i className="z" />
          </span>
        ))}
      </div>
      <span className="ab-heartcore"><HeartMark size={58} /></span>
      {[
        ['2017', 'founded', 'calendar'],
        ['55', 'countries', 'globe'],
        ['3', 'ISO certifications', 'shieldCheck'],
        ['195+', 'conditions', 'heart'],
      ].map(([v, l, ic], i) => (
        <span key={l} className={`ab-sat s${i}`} style={{ '--i': i }}><Icon name={ic} size={16} /><b>{v}</b>{l}</span>
      ))}
      <svg className="ab-ecg" viewBox="0 0 600 60" preserveAspectRatio="none"><path d="M0 34h170l14-24 16 44 14-34 10 14h376" pathLength="100" /></svg>
    </LiveZone>
  );
}

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="ab-rot" aria-live="off">
      {WORDS.map((w, k) => <span key={w} className={k === i ? 'on' : k === (i + WORDS.length - 1) % WORDS.length ? 'out' : ''}>{w}</span>)}
    </span>
  );
}

/* ---------- Bento: numbers, each with its own micro-visual ---------- */
function useCount(target, on, ms = 1400) {
  const [v, setV] = useState(target);
  const started = useRef(false);
  useEffect(() => {
    if (!on || started.current) return;
    started.current = true;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setV(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, target, ms]);
  return v;
}

const TITLES = ['Cardiologist', 'ICU nurse', 'Clinical pharmacist', 'Physiotherapist', 'Radiographer', 'Dietitian', 'Oncology nurse', 'Lab scientist', 'Pediatrician', 'Midwife', 'Psychologist', 'Paramedic'];

function Bento() {
  const [ref, on] = useInView({ threshold: 0.2 });
  const countries = useCount(55, on);
  const groups = useCount(25, on);
  const conditions = useCount(195, on);
  const titles = useCount(1300, on, 1800);
  return (
    <div ref={ref} className={`ab-bento ${on ? 'is-in' : ''}`}>
      <article className="bt bt-year">
        <span className="bt-flip" aria-hidden="true"><i>20</i><i>17</i></span>
        <h3>Founded in New Delhi</h3>
        <p>by Frequent Research Fieldwork Solutions</p>
      </article>
      <article className="bt bt-globe">
        <span className="bt-sphere" aria-hidden="true"><i /><i /><i /></span>
        <b className="bt-num">{countries}</b>
        <h3>countries</h3>
        <p>Asia-Pacific, Europe, the Middle East, Africa and the Americas</p>
      </article>
      <article className="bt bt-groups">
        <b className="bt-num">{groups}+</b>
        <h3>professional groups</h3>
        <span className="bt-icons" aria-hidden="true">
          {['stethoscope', 'nurse', 'pill', 'microscope', 'tooth', 'ambulance', 'brain', 'baby', 'lungs'].map((n, i) => <i key={n} style={{ '--i': i }}><Icon name={n} size={18} /></i>)}
        </span>
      </article>
      <article className="bt bt-cond">
        <span className="bt-ring" aria-hidden="true"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" pathLength="100" /><circle cx="60" cy="60" r="50" pathLength="100" /></svg><Icon name="heart" size={26} fill="currentColor" stroke={1} /></span>
        <b className="bt-num">{conditions}+</b>
        <h3>health conditions</h3>
        <p>across 20 health areas</p>
      </article>
      <article className="bt bt-titles">
        <b className="bt-num">{titles.toLocaleString('en-US')}+</b>
        <h3>job titles we can match</h3>
        <span className="bt-roll" aria-hidden="true"><span>{[...TITLES, ...TITLES].map((t, i) => <i key={i}>{t}</i>)}</span></span>
      </article>
      <article className="bt bt-iso">
        <span className="bt-stack" aria-hidden="true"><i>9001</i><i>27001</i><i>20252</i></span>
        <h3>ISO certified, three times</h3>
        <p>Quality, information security and market research</p>
      </article>
    </div>
  );
}

/* ---------- Study journey ---------- */
const FLOW = [
  { ic: 'flask', t: 'A brief arrives', d: 'Pharma, devices, hospitals or health tech need real-world insight', c: '#7c3aed' },
  { ic: 'target', t: 'We match', d: 'Your profile decides which studies reach you', c: '#2457f5' },
  { ic: 'chat', t: 'You answer', d: 'Online, on any device, in your own time', c: '#0891b2' },
  { ic: 'lock', t: 'We anonymise', d: 'Researchers see answers, never your identity', c: '#0fb98c' },
  { ic: 'coins', t: 'You are rewarded', d: 'The incentive you saw before you started', c: '#f2542d' },
];

function Journey() {
  const [ref, on] = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className={`ab-flow ${on ? 'is-in' : ''}`}>
      <svg className="ab-flow-line" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="abfl" x1="0" x2="1"><stop offset="0" stopColor="#7c3aed" /><stop offset=".5" stopColor="#0891b2" /><stop offset="1" stopColor="#f2542d" /></linearGradient>
        </defs>
        <path d="M100 60 C 200 0, 300 120, 400 60 S 600 0, 700 60 S 850 120, 900 60" pathLength="100" />
        <circle r="7"><animateMotion dur="6s" repeatCount="indefinite" path="M100 60 C 200 0, 300 120, 400 60 S 600 0, 700 60 S 850 120, 900 60" /></circle>
      </svg>
      <ol>
        {FLOW.map((s, i) => (
          <li key={s.t} style={{ '--i': i, '--c': s.c }}>
            <span className="ab-node"><Icon name={s.ic} size={24} /><em>{i + 1}</em></span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Three doors: 3D tilt cards ---------- */
const DOORS = [
  { to: '/healthcare-professionals', t: 'Healthcare professionals', kind: 'doctor', skin: 2, hair: 0, g: 'hcp', chips: ['Doctors', 'Nurses', 'Pharmacy', 'Allied health'], big: '10', unit: 'professional groups' },
  { to: '/caregivers', t: 'Caregivers', kind: 'caregiver', skin: 1, hair: 3, hs: 1, g: 'cg', chips: ['Family carers', 'Parents', 'Home care aides'], big: '24/7', unit: 'experience that counts' },
  { to: '/patients', t: 'Patients', kind: 'patient', skin: 3, hair: 2, g: 'pt', chips: ['Chronic', 'Rare', 'Recovering'], big: '195+', unit: 'conditions' },
];

function TiltDoor({ d, i }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`);
    el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`);
  };
  const reset = () => { ref.current?.style.setProperty('--rx', '0deg'); ref.current?.style.setProperty('--ry', '0deg'); };
  return (
    <Link to={d.to} ref={ref} className={`ab-door door-${d.g}`} style={{ '--i': i }} onMouseMove={onMove} onMouseLeave={reset}>
      <span className="ab-door-sheen" aria-hidden="true" />
      <span className="ab-door-art"><Persona kind={d.kind} skin={d.skin} hair={d.hair} hairStyle={d.hs || 0} size={110} label={`${d.t} illustration`} /></span>
      <b className="ab-door-big">{d.big}<small>{d.unit}</small></b>
      <h3>{d.t}</h3>
      <span className="ab-door-chips">{d.chips.map((c) => <i key={c}>{c}</i>)}</span>
      <span className="ab-door-go">Open this door <Icon name="arrow" size={16} /></span>
    </Link>
  );
}

/* ---------- Promises as vitals monitors ---------- */
const PROMISES = [
  { t: 'Patient-centric', d: 'Lived experience is evidence', viz: 'ecg', c: '#ff5c7a' },
  { t: 'Trust before hype', d: 'No fees. No income promises. Data never sold.', viz: 'shield', c: '#5ee7c6' },
  { t: 'Right person, right study', d: 'Careful profiling, fewer wasted screeners', viz: 'target', c: '#7fb3ff' },
  { t: 'Fair rewards', d: 'Every completed study earns what you were shown', viz: 'coins', c: '#ffc94d' },
];

function Monitors() {
  return (
    <LiveZone className="ab-mon-grid">
      {PROMISES.map((p, i) => (
        <article key={p.t} className={`ab-mon mon-${p.viz}`} style={{ '--c': p.c, '--i': i }}>
          <span className="ab-mon-top"><i />CH {i + 1}<em>LIVE</em></span>
          <span className="ab-mon-screen" aria-hidden="true">
            {p.viz === 'ecg' && <svg viewBox="0 0 200 60" preserveAspectRatio="none"><path d="M0 34h50l8-20 10 38 10-28 7 10h115" pathLength="100" /></svg>}
            {p.viz === 'shield' && <><Icon name="shieldCheck" size={46} /><i className="scan" /></>}
            {p.viz === 'target' && <span className="rings"><i /><i /><i /><b /></span>}
            {p.viz === 'coins' && <span className="coins">{[0, 1, 2, 3].map((k) => <i key={k} style={{ '--k': k }} />)}</span>}
          </span>
          <h3>{p.t}</h3>
          <p>{p.d}</p>
        </article>
      ))}
    </LiveZone>
  );
}

/* ---------- Timeline that draws itself as you scroll ---------- */
const TIMELINE = [
  { y: '2017', t: 'Frequent Research is founded', d: 'Frequent Research Fieldwork Solutions Pvt. Ltd. opens in New Delhi', ic: 'building' },
  { y: '2018', t: 'MyHealthOpinions launches', d: 'A panel just for healthcare professionals, caregivers and patients', ic: 'heart' },
  { y: 'ISO', t: 'Certified three times over', d: 'ISO 9001 quality, ISO 27001 security, ISO 20252 market research', ic: 'shieldCheck' },
  { y: 'ESOMAR', t: 'A member of ESOMAR', d: 'Following the global code for market, opinion and social research', ic: 'globe' },
  { y: 'Today', t: '55 countries and counting', d: 'Members across five continents, rewarded for every study', ic: 'trophy' },
];

function Timeline() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const v = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - r.top) / r.height));
        el.style.setProperty('--p', v.toFixed(3)); // set directly: a style prop would mint a CSS class per value
        setP(Math.round(v * 20) / 20);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); };
  }, []);
  return (
    <div ref={ref} className="ab-tl">
      <span className="ab-tl-rail" aria-hidden="true"><i /></span>
      <ol>
        {TIMELINE.map((t, i) => (
          <li key={t.t} className={p >= (i + 0.3) / TIMELINE.length ? 'on' : ''}>
            <span className="ab-tl-dot"><Icon name={t.ic} size={18} /></span>
            <div className="ab-tl-card">
              <b className="ab-tl-y">{t.y}</b>
              <h3>{t.t}</h3>
              <p>{t.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Coverflow: one voice from every door ---------- */
const PICKS = AUDIENCES.map((a) => ({ ...TESTIMONIALS.find((t) => t.audience === a.id && t.rating === 5) || TESTIMONIALS.find((t) => t.audience === a.id), color: a.color, group: a.label }));

function Coverflow() {
  const [i, setI] = useState(0);
  const [ref, on] = useInView({ threshold: 0.3 }, false);
  const n = PICKS.length;
  useEffect(() => {
    if (!on) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5200);
    return () => clearInterval(t);
  }, [on, n]);
  return (
    <div ref={ref} className="ab-cf">
      <div className="ab-cf-stage">
        {PICKS.map((t, k) => {
          let off = k - i;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          return (
            <figure key={t.name} className={`ab-cf-card ${off === 0 ? 'on' : ''}`} style={{ '--off': off, '--abs': Math.abs(off), '--c': t.color }} aria-hidden={off !== 0}>
              <span className="ab-cf-q" aria-hidden="true"><Icon name="quote" size={26} /></span>
              <span className="ab-cf-group">{t.group}</span>
              <blockquote><p>{t.quote}</p></blockquote>
              <figcaption>
                <span className="ab-cf-av">{t.name.replace(/^Dr\.\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                <span><b>{t.name}</b><small>{t.role} · {t.country}</small></span>
                <Flag code={t.cc} name={t.country} size={26} />
              </figcaption>
              <Stars value={t.rating} size={15} />
            </figure>
          );
        })}
      </div>
      <div className="ab-cf-nav">
        <button type="button" onClick={() => setI((x) => (x - 1 + n) % n)} aria-label="Previous review"><Icon name="arrowLeft" size={18} /></button>
        <span className="ab-cf-dots">{PICKS.map((t, k) => <button key={t.name} type="button" className={k === i ? 'on' : ''} style={{ '--c': t.color }} onClick={() => setI(k)} aria-label={`Show review from ${t.group}`} />)}</span>
        <button type="button" onClick={() => setI((x) => (x + 1) % n)} aria-label="Next review"><Icon name="arrow" size={18} /></button>
      </div>
      <p className="ab-cf-more"><Link to="/reviews">See all ratings & reviews <Icon name="arrow" size={14} /></Link></p>
    </div>
  );
}

export default function About() {
  return (
    <>
      <section className="ab-hero">
        <div className="ab-hero-bg" aria-hidden="true"><i /><i /><i /><span className="ab-grid" /></div>
        <div className="container ab-hero-in">
          <div className="ab-hero-copy">
            <Breadcrumbs items={[{ to: '/', label: 'Home' }, { label: 'About Us' }]} />
            <span className="ab-eyebrow"><i />About MyHealthOpinions</span>
            <h1 className="ab-title">
              <span className="l1">Every opinion is a</span>
              <span className="l2">vital sign</span>
              <span className="l3">for better healthcare.</span>
            </h1>
            <p className="ab-lead">A healthcare research community powered by Frequent Research, built for <RotatingWord /> and rewarded for every study.</p>
            <div className="ab-ctas">
              <Button to="/join">Join the community</Button>
              <button type="button" className="btn btn-ghost ab-watch" onClick={openPageVideo}>
                <span className="btn-label">Watch our story</span>
                <span className="ab-watch-ic" aria-hidden="true"><Icon name="play" size={14} fill="currentColor" stroke={0} /></span>
              </button>
            </div>
            <ul className="ab-trust">
              <li><Icon name="shieldCheck" size={16} />ISO 9001 · 27001 · 20252</li>
              <li><Icon name="globe" size={16} />ESOMAR member</li>
              <li><Icon name="lock" size={16} />Data never sold</li>
            </ul>
          </div>
          <Helix />
        </div>
        <svg className="ab-hero-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C 240 90, 480 0, 720 40 S 1200 80, 1440 30 V80 H0z" /></svg>
      </section>

      <section className="section ab-sec-glance">
        <div className="container">
          <header className="ab-head">
            <span className="ab-kicker k-coral">At a glance</span>
            <h2>Small team. <span className="t-coral">Global reach.</span> <span className="t-teal">Serious standards.</span></h2>
          </header>
          <Bento />
        </div>
      </section>

      <section className="section ab-sec-flow">
        <div className="container">
          <header className="ab-head ab-head-center">
            <span className="ab-kicker k-violet">How healthcare market research flows</span>
            <h2>From your answer <span className="t-violet">to better medicine</span></h2>
          </header>
          <Journey />
          <p className="ab-note">
            <Icon name="info" size={16} />
            <span>We run online surveys and market research, not clinical trials. Paid clinical research tests treatments under medical supervision; our studies only ask for your views. <Link to="/blog/paid-clinical-studies-vs-paid-surveys">See the difference</Link> or read <Link to="/blog/what-is-a-clinical-research-organization">what a clinical research organization does</Link>.</span>
          </p>
        </div>
      </section>

      <section className="section ab-sec-doors" id="profiles">
        <div className="container">
          <header className="ab-head">
            <span className="ab-kicker k-blue">Our healthcare panel</span>
            <h2>Three doors into <span className="t-blue">one community</span></h2>
          </header>
          <div className="ab-doors">{DOORS.map((d, i) => <TiltDoor key={d.to} d={d} i={i} />)}</div>
        </div>
      </section>

      <section className="section ab-sec-mon">
        <div className="container">
          <header className="ab-head ab-head-center">
            <span className="ab-kicker k-mint">What we stand for</span>
            <h2>Four promises, <span className="t-mint">monitored around the clock</span></h2>
          </header>
          <Monitors />
        </div>
      </section>

      <section className="section ab-sec-tl">
        <div className="container ab-tl-wrap">
          <header className="ab-head ab-tl-head">
            <span className="ab-kicker k-amber">Our journey</span>
            <h2>Built by <span className="t-amber">market research specialists</span></h2>
            <div className="ab-plaque">
              <span className="ab-plaque-border" aria-hidden="true" />
              <img src={frLogo} alt="Frequent Research Fieldwork Solutions — Insights, Analytics, Growth. An ISO certified company" width="589" height="314" loading="lazy" />
              <span className="ab-plaque-rib"><Icon name="sparkle" size={14} />Powered by Frequent Research</span>
            </div>
          </header>
          <Timeline />
        </div>
      </section>

      <section className="section ab-sec-voices">
        <div className="container">
          <header className="ab-head ab-head-center">
            <span className="ab-kicker k-rose">Member voices</span>
            <h2>One voice <span className="t-rose">from every door</span></h2>
          </header>
          <Coverflow />
        </div>
      </section>

      <section className="section ab-sec-certs">
        <div className="container">
          <div className="ab-certs">
            <div>
              <h2>Certified and affiliated</h2>
              <p>ISO 9001:2015, ISO 27001, ISO 20252:2019, ESOMAR member and MSME registered. Hover a badge to flip it.</p>
            </div>
            <BadgeParade light />
          </div>
          <div className="ab-cta">
            <span className="ab-cta-pulse" aria-hidden="true"><HeartMark size={44} /></span>
            <div><h2>Your experience is evidence.</h2><p>Join free and take your first study this week.</p></div>
            <Button to="/join">Join free</Button>
          </div>
        </div>
      </section>
    </>
  );
}
