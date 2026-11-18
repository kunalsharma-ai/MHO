// Earn-page visuals (v4) — each section its own idea:
//   CoinTowers       why rewards differ: 3D coin towers rise per audience (qualitative, no amounts)
//   AudiencePortals  three doorways to the audience pages + the ten professional groups as badges
//   ConditionPulse   a heartbeat line; each beat lights the next health area
//   InterestDeck     consumer & business audiences as a swipeable deck of tall cards
//   ScamSwitch       red flags you can flip to "legit" with a toggle switch
//   DepartureBoard   all 55 countries on a split-flap airport board, filtered by region
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import Persona from './Persona.jsx';
import { Flag, LiveZone, useInView } from './ui.jsx';
import { Link } from '../router.jsx';
import { CONSUMER_GROUPS, BUSINESS } from '../data/profiles.js';
import { REGIONS, COVERAGE_COUNT } from '../data/countries.js';
import { FLOORS } from '../data/workforce.js';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { tr } from '../i18n/engine.js';

/* ---------------- coin towers ---------------- */
const LEVELS = [
  { who: 'Medical specialists', p: ['doctor', 2, 0, 0], v: 10, note: 'Rarest audience, longest studies', c: '#2457f5' },
  { who: 'General physicians', p: ['doctor', 0, 2, 2], v: 9, note: 'Treatment & workflow studies', c: '#5b3df5' },
  { who: 'Nurses & pharmacists', p: ['nurse', 4, 1, 1], v: 7, note: 'Care delivery & medication', c: '#ec4899' },
  { who: 'Patients with a condition', p: ['patient', 3, 2, 0], v: 6, note: 'Lived-experience studies', c: '#00a88a' },
  { who: 'Caregivers', p: ['caregiver', 1, 3, 1], v: 5, note: 'Support & services', c: '#ff7a1a' },
  { who: 'Consumers', p: ['consumer', 5, 0, 1], v: 4, note: 'Everyday health & lifestyle', c: '#8a4dff' },
];
export function CoinTowers() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className={`towers ${inView ? 'is-in' : ''}`}>
      <div className="tw-cols">
        {LEVELS.map((l, i) => (
          <div key={l.who} className="tw-col" style={{ '--c': l.c, '--i': i, '--n': l.v }}>
            <span className="tw-stack" aria-hidden="true">
              {Array.from({ length: l.v }).map((_, k) => <i key={k} style={{ '--k': k }} />)}
              <span className="tw-av"><Persona kind={l.p[0]} skin={l.p[1]} hair={l.p[2]} hairStyle={l.p[3]} size={40} /></span>
            </span>
            <b>{l.who}</b>
            <small>{l.note}</small>
          </div>
        ))}
      </div>
      <p className="tw-key"><span>Typical reward per study</span><i aria-hidden="true" /><span>higher on the left</span></p>
    </div>
  );
}

/* ---------------- audience portals ---------------- */
export function AudiencePortals() {
  const portals = [
    { to: '/healthcare-professionals', g: 'hcp', icon: 'stethoscope', t: 'Healthcare professionals', d: '1,300+ job titles across 10 professional groups, licence-verified, paid honoraria.', n: '1,300+', l: 'job titles' },
    { to: '/caregivers', g: 'caregiver', icon: 'hands', t: 'Caregivers', d: 'Family carers, parents, long-distance and professional home care aides.', n: '14', l: 'caregiver profiles' },
    { to: '/patients', g: 'patient', icon: 'heart', t: 'Patients', d: 'Living with one of 195+ conditions, newly diagnosed, survivors and the health-conscious.', n: '195+', l: 'conditions' },
  ];
  return (
    <div className="portals">
      <div className="pt-doors">
        {portals.map((p, i) => (
          <Link key={p.to} to={p.to} className={`door t-${p.g}`} style={{ '--i': i }}>
            <span className="door-frame" aria-hidden="true"><span className="door-leaf"><span className="dl-knob" /></span><span className="door-glow" /></span>
            <span className="door-ic"><Icon name={p.icon} size={24} /></span>
            <b>{p.t}</b>
            <small>{p.d}</small>
            <span className="door-n"><em>{p.n}</em> {p.l}</span>
            <span className="door-go">Step inside <Icon name="arrow" size={14} /></span>
          </Link>
        ))}
      </div>
      <div className="pt-badges" aria-label="Professional groups">
        {FLOORS.map((f, i) => (
          <Link key={f.id} to={`/healthcare-professionals#${f.id}`} className="pbadge" style={{ '--c': f.color, '--i': i }}>
            <span><Icon name={f.icon} size={18} /></span>{f.label}<em>{f.titles}</em>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ---------------- condition pulse ---------------- */
const PULSE_AREAS = [['heart', 'Heart health'], ['drop', 'Diabetes'], ['ribbon', 'Cancer care'], ['lungs', 'Asthma & COPD'], ['smile', 'Mental wellbeing'], ['bone', 'Arthritis'], ['sparkle', 'Skin conditions'], ['kidney', 'Kidney care'], ['brain', 'Dementia caregiving'], ['dna', 'Rare diseases'], ['baby', 'Children’s health'], ['venus', 'Women’s health']];
export function ConditionPulse() {
  return (
    <LiveZone className="cpulse" aria-hidden="true">
      <svg viewBox="0 0 600 120" preserveAspectRatio="none" className="cp-ecg">
        <path d="M0 70 H80 l10-20 10 20 H160 l8-56 12 96 10-60 8 20 H300 l10-20 10 20 H380 l8-56 12 96 10-60 8 20 H600" pathLength="100" />
      </svg>
      <div className="cp-grid">
        {PULSE_AREAS.map(([ic, t], i) => (
          <span key={t} style={{ '--i': i }}><Icon name={ic} size={16} />{t}</span>
        ))}
      </div>
      <span className="cp-heart"><Icon name="heart" size={34} fill="currentColor" stroke={1} /></span>
    </LiveZone>
  );
}

/* ---------------- interest deck ---------------- */
const DECK_COLORS = ['#8a4dff', '#ff6a2c', '#ef2d56', '#2457f5', '#00a88a', '#0ea5e9', '#f59e0b', '#ec4899'];
export function InterestDeck() {
  const track = useRef(null);
  const hold = useRef(0); // auto-scroll pauses until this time (ms) after a manual nudge
  const [wrap, inView] = useInView({ threshold: 0.1 }, false);
  const [auto, setAuto] = useState(false);
  const cards = [
    ...CONSUMER_GROUPS.map((g, i) => ({ ...g, c: DECK_COLORS[i % DECK_COLORS.length] })),
    { title: 'Business decision makers', icon: 'briefcase', items: BUSINESS.titles.slice(0, 10), c: '#1b1035', more: BUSINESS.titles.length },
    { title: 'Industries we survey', icon: 'building', items: BUSINESS.industries.slice(0, 10), c: '#3b1d78', more: BUSINESS.industries.length },
  ];
  const go = (d) => { hold.current = Date.now() + 4000; track.current?.scrollBy({ left: d * (track.current.clientWidth * 0.8), behavior: 'smooth' }); };

  // Continuous marquee: the track drifts left on its own and loops seamlessly (the cards are rendered twice and
  // the scroll position wraps by one set's width). Pauses on hover, focus, touch, off-screen and for reduced motion.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    setAuto(true);
    return () => setAuto(false);
  }, []);
  useEffect(() => {
    const el = track.current;
    if (!auto || !inView || !el) return undefined;
    let raf = 0; let last = performance.now(); let paused = false; let acc = el.scrollLeft;
    const stop = () => { paused = true; };
    const start = () => { paused = false; acc = el.scrollLeft; };
    const touch = () => { hold.current = Date.now() + 3500; };
    el.addEventListener('pointerenter', stop); el.addEventListener('pointerleave', start);
    el.addEventListener('focusin', stop); el.addEventListener('focusout', start);
    el.addEventListener('touchstart', touch, { passive: true }); el.addEventListener('wheel', touch, { passive: true });
    const step = (now) => {
      const dt = Math.min(64, now - last); last = now;
      const half = el.scrollWidth / 2;
      if (!paused && Date.now() > hold.current && half > el.clientWidth) {
        acc += dt * 0.045; // ~45px per second
        if (acc >= half) acc -= half;
        el.scrollLeft = acc;
      } else {
        acc = el.scrollLeft >= half ? el.scrollLeft - half : el.scrollLeft;
        if (el.scrollLeft >= half) el.scrollLeft = acc;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', stop); el.removeEventListener('pointerleave', start);
      el.removeEventListener('focusin', stop); el.removeEventListener('focusout', start);
      el.removeEventListener('touchstart', touch); el.removeEventListener('wheel', touch);
    };
  }, [auto, inView]);

  const card = (c, i, dup) => (
    <article key={`${dup ? 'd' : 'c'}-${c.title}`} className="d4-card" style={{ '--c': c.c, '--i': i }} aria-hidden={dup || undefined} inert={dup || undefined}>
      <header><span><Icon name={c.icon} size={22} /></span><h3>{c.title}</h3></header>
      <ul>{c.items.map((x) => <li key={x}>{x}</li>)}</ul>
      {c.more && c.more > c.items.length && <small>+{c.more - c.items.length} more</small>}
    </article>
  );
  return (
    <div className={`deck4 ${auto ? 'is-auto' : ''}`} ref={wrap}>
      <div className="d4-nav">
        <button type="button" onClick={() => go(-1)} aria-label="Previous cards"><Icon name="arrowLeft" size={18} /></button>
        <button type="button" onClick={() => go(1)} aria-label="Next cards"><Icon name="arrow" size={18} /></button>
      </div>
      <div className="d4-track" ref={track} tabIndex={0} aria-label="Audiences outside healthcare">
        {cards.map((c, i) => card(c, i, false))}
        {auto && cards.map((c, i) => card(c, i, true))}
      </div>
    </div>
  );
}

/* ---------------- scam switch ---------------- */
const MYTHS = [
  { bad: 'Pay a joining or “activation” fee', good: 'Joining is free — you never pay to earn' },
  { bad: '“Earn ₹50,000 a week from home!”', good: 'Honest top-ups, reward shown per survey' },
  { bad: 'Asks for card PIN, OTP or bank password', good: 'Only payout details needed to pay you' },
  { bad: 'Withdrawals that never arrive', good: 'PayPal, Wire, Amazon Gift Card, UPI (India)' },
];
export function ScamSwitch() {
  const [on, setOn] = useState([]);
  const flip = (i) => setOn((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  return (
    <div className="scams">
      <div className="sc-head"><span className="bad">Red flag</span><span className="good">Legit survey site</span></div>
      {MYTHS.map((m, i) => {
        const legit = on.includes(i);
        return (
          <button key={m.bad} type="button" className={`sc-row ${legit ? 'legit' : ''}`} onClick={() => flip(i)} aria-pressed={legit} style={{ '--i': i }}>
            <span className="sc-txt"><Icon name={legit ? 'shieldCheck' : 'info'} size={18} />{legit ? m.good : m.bad}</span>
            <span className="sc-switch" aria-hidden="true"><i /></span>
          </button>
        );
      })}
      <p className="sc-tip">{on.length === MYTHS.length ? 'All four checks passed — that’s how MyHealthOpinions works.' : `Flip all four switches · ${on.length}/4 checked`}</p>
    </div>
  );
}

/* ---------------- departure board ---------------- */
const FLAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function FlapText({ text: source, delay = 0 }) {
  const { lang } = useI18n();
  const local = tr(source); // visitor's language (dictionary / cache), else English
  const text = /^[A-Za-z ,.'-]+$/.test(local) ? local.toUpperCase() : local;
  const [shown, setShown] = useState(text);
  const [ref, inView] = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (!inView || lang !== 'en' && !/^[A-Z ,.'-]+$/.test(text) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(text); return; }
    let n = 0;
    let t2;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        n += 1;
        setShown(text.split('').map((ch, k) => (ch === ' ' || k < n - 2 ? ch : FLAP[(k * 7 + n * 3) % FLAP.length])).join(''));
        if (n > text.length + 2) { clearInterval(iv); setShown(text); }
      }, 45);
      t2 = iv;
    }, delay);
    return () => { clearTimeout(t); clearInterval(t2); };
  }, [text, inView, delay]);
  return <span ref={ref} className="flap notranslate" translate="no">{shown}</span>;
}

export function DepartureBoard() {
  const [r, setR] = useState('all');
  const list = (r === 'all' ? REGIONS : REGIONS.filter((x) => x.id === r)).flatMap((x) => x.countries.map(([code, name]) => ({ code, name, region: x.short, color: x.color })));
  return (
    <div className="board">
      <div className="bd-tabs" role="tablist" aria-label="Regions">
        <button role="tab" aria-selected={r === 'all'} className={r === 'all' ? 'on' : ''} onClick={() => setR('all')}>All {COVERAGE_COUNT}</button>
        {REGIONS.map((x) => (
          <button key={x.id} role="tab" aria-selected={r === x.id} className={r === x.id ? 'on' : ''} style={{ '--c': x.color }} onClick={() => setR(x.id)}>{x.name} <em>{x.countries.length}</em></button>
        ))}
      </div>
      <div className="bd-panel">
        <div className="bd-head" aria-hidden="true"><span>Destination</span><span>Region</span><span>Status</span></div>
        <ul className="bd-rows" key={r}>
          {list.map((c, i) => (
            <li key={c.code} style={{ '--c': c.color, '--i': i }}>
              <span className="bd-dest"><Flag code={c.code} name={c.name} size={22} /><FlapText text={c.name} delay={(i % 20) * 40} /></span>
              <span className="bd-reg">{c.region}</span>
              <span className="bd-st"><i />Open to join</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
