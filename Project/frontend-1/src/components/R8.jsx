// Round 8 section designs: screening sieve, habit power-ups, FAQ stage, role step rails, reward wallets,
// passport-stamp country board and the role picker used on Log in / Join.
// Effects use transform and opacity only, run only while on screen (LiveZone / data-still), and stop for
// prefers-reduced-motion.
import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { useInView, LiveZone, Flag } from './ui.jsx';
import { Link } from '../router.jsx';
import { REWARD_ROLES } from '../data/community.js';
import { REGIONS, COVERAGE_COUNT } from '../data/countries.js';
import { TESTIMONIALS } from '../data/testimonials.js';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------- 1. Screening sieve (How it works) */
const SIEVE = [
  { t: 'Invitation sent', d: 'Matched on your profile', ic: 'mail', c: '#3d5afe' },
  { t: 'Screening questions', d: 'Do you fit this exact study?', ic: 'filter', c: '#14b8a6' },
  { t: 'Quality checks', d: 'Attention & consistency', ic: 'shieldCheck', c: '#f59e0b' },
  { t: 'Survey completed', d: 'Reward credited after validation', ic: 'coins', c: '#e8344e' },
];
// falling "invites": x offset (%), delay (s), the stage where it is filtered out (4 = reaches the reward)
const DROPS = [[-30, 0, 1], [10, 0.5, 4], [28, 1.0, 2], [-12, 1.5, 4], [34, 2.0, 1], [-26, 2.5, 3], [4, 3.0, 4], [22, 3.5, 2], [-4, 4.0, 3], [-18, 4.5, 4]];

export function ScreeningSieve() {
  return (
    <LiveZone className="sv" aria-label="From invitation to reward">
      <div className="sv-stage" aria-hidden="true">
        <span className="sv-beam" />
        {SIEVE.map((s, i) => (
          <span key={s.t} className="sv-ring" style={{ '--i': i, '--c': s.c }}><i /><b /></span>
        ))}
        {DROPS.map(([x, d, k], i) => (
          <span key={i} className={`sv-drop out-${k}`} style={{ '--x': `${x}%`, '--d': `${d}s` }} />
        ))}
        <span className="sv-coin"><Icon name="coins" size={26} /></span>
      </div>
      <ol className="sv-steps">
        {SIEVE.map((s, i) => (
          <li key={s.t} style={{ '--i': i, '--c': s.c }}>
            <span className="sv-ic"><Icon name={s.ic} size={20} /><em>{i + 1}</em></span>
            <span className="sv-tx"><b>{s.t}</b><small>{s.d}</small></span>
          </li>
        ))}
      </ol>
    </LiveZone>
  );
}

/* ---------------------------------------------------------------- 2. Habit power-ups (Pro tips) */
const HABITS = [
  { k: 'profile', ic: 'clipboard', t: 'Complete every profile section', d: 'More detail = more matched invitations, fewer screen-outs.', c1: '#ff4f6d', c2: '#ff9f1c' },
  { k: 'bell', ic: 'bell', t: 'Open invitations early', d: 'Studies close once they reach their quota.', c1: '#10b981', c2: '#14b8a6' },
  { k: 'pen', ic: 'pen', t: 'Write real open-ended answers', d: 'Thoughtful answers protect your quality score.', c1: '#8a4dff', c2: '#ec4899' },
  { k: 'device', ic: 'phone', t: 'Use any device', d: 'Most surveys work on phone, tablet or laptop.', c1: '#2457f5', c2: '#12c2e9' },
  { k: 'clock', ic: 'clock', t: 'Check the time estimate', d: 'Start when you can finish in one sitting.', c1: '#f59e0b', c2: '#ef4444' },
  { k: 'shield', ic: 'shieldCheck', t: 'Answer consistently', d: 'Attention checks catch rushed or random answers.', c1: '#0f766e', c2: '#3d5afe' },
];
function HabitArt({ k, ic }) {
  return (
    <span className={`hb-art hb-${k}`} aria-hidden="true">
      {k === 'profile' && (<><svg viewBox="0 0 64 64" className="hb-ring"><circle cx="32" cy="32" r="27" /><circle cx="32" cy="32" r="27" className="on" pathLength="100" /></svg><b>100%</b></>)}
      {k === 'bell' && (<><i className="w w1" /><i className="w w2" /><span className="hb-swing"><Icon name="bell" size={30} /></span></>)}
      {k === 'pen' && (<span className="hb-paper"><i /><i /><i /><span className="hb-nib"><Icon name="pen" size={18} /></span></span>)}
      {k === 'device' && (<span className="hb-devs"><i className="d1"><Icon name="phone" size={20} /></i><i className="d2"><Icon name="monitor" size={26} /></i><i className="d3"><Icon name="grid" size={20} /></i></span>)}
      {k === 'clock' && (<span className="hb-clock"><i className="h" /><i className="m" /><b /></span>)}
      {k === 'shield' && (<span className="hb-scan"><Icon name={ic} size={34} /><i /></span>)}
    </span>
  );
}
export function HabitDeck() {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div ref={ref} className={`hdeck ${inView ? 'is-in' : ''}`}>
      {HABITS.map((h, i) => (
        <article key={h.k} className="hcard" style={{ '--i': i, '--c1': h.c1, '--c2': h.c2 }} tabIndex={0}>
          <div className="hc-top">
            <span className="hc-grid" aria-hidden="true" />
            <HabitArt k={h.k} ic={h.ic} />
            <span className="hc-lvl">Habit {String(i + 1).padStart(2, '0')}</span>
          </div>
          <div className="hc-body">
            <h3>{h.t}</h3>
            <p>{h.d}</p>
            <span className="hc-boost"><Icon name="trending" size={14} /> More invitations</span>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- 3. FAQ stage */
const FAQ_THEME = {
  how: { c1: '#14b8a6', c2: '#3d5afe', ic: 'compass', who: 'Survey help desk' },
  hcp: { c1: '#2457f5', c2: '#8a4dff', ic: 'stethoscope', who: 'Professional desk' },
  caregiver: { c1: '#ff9f1c', c2: '#ff4f6d', ic: 'hands', who: 'Caregiver desk' },
  patient: { c1: '#00b386', c2: '#12c2e9', ic: 'heart', who: 'Patient desk' },
};
export function FaqStage({ items, idPrefix = 'fq', theme = 'how', title, eyebrow }) {
  const [open, setOpenState] = useState(0);
  const [touched, setTouched] = useState(false); // the first answer shows without animation
  const setOpen = (i) => { setTouched(true); setOpenState(i); };
  const th = FAQ_THEME[theme] || FAQ_THEME.how;
  const cur = open >= 0 ? items[open] : null;
  return (
    <div className={`fqs fqs-${theme} ${touched ? 'anim' : ''}`} style={{ '--c1': th.c1, '--c2': th.c2 }}>
      <LiveZone className="fqs-stage" data-mode-skip="">
        {eyebrow && <span className="fqs-eb"><i aria-hidden="true" />{eyebrow}</span>}
        {title && <h2>{title}</h2>}
        <div className="fqs-orb" aria-hidden="true">
          <span className="o-core"><Icon name={th.ic} size={40} /></span>
          <span className="o-ring r1" /><span className="o-ring r2" />
          <span className="o-bub b1"><Icon name="chat" size={16} /></span>
          <span className="o-bub b2">?</span>
          <span className="o-bub b3"><Icon name="check" size={14} stroke={3} /></span>
        </div>
        <p className="fqs-now" aria-live="polite">
          <em>{cur ? `Question ${open + 1} of ${items.length}` : `${items.length} questions`}</em>
          <span key={open}>{cur ? cur.q : 'Pick a question to see the answer.'}</span>
        </p>
        <div className="fqs-ctas">
          <button type="button" className="fqs-chat" onClick={() => window.dispatchEvent(new Event('mho-open-chat'))}><Icon name="chat" size={16} /> Ask live help</button>
          <Link to="/faq" className="fqs-all">All FAQs <Icon name="arrow" size={14} /></Link>
        </div>
      </LiveZone>
      <div className="fqs-list">
        {items.map((it, i) => {
          const on = open === i;
          return (
            <div key={it.q} className={`fqs-item ${on ? 'is-open' : ''}`} style={{ '--i': i }}>
              <h3>
                <button type="button" aria-expanded={on} aria-controls={`${idPrefix}-${i}`} id={`${idPrefix}-btn-${i}`} onClick={() => setOpen(on ? -1 : i)}>
                  <span className="fq-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="fq-q">{it.q}</span>
                  <span className="fq-t" aria-hidden="true"><Icon name="plus" size={16} stroke={2.6} /></span>
                </button>
              </h3>
              <div className="fq-panel" id={`${idPrefix}-${i}`} role="region" aria-labelledby={`${idPrefix}-btn-${i}`}>
                <div>
                  <p className="fq-a"><span className="fq-av" aria-hidden="true"><Icon name={th.ic} size={14} /></span><span className="fq-dots" aria-hidden="true"><i /><i /><i /></span><span className="fq-txt">{it.a}</span></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 4. Role step rails (sign-up process) */
export function StepRail({ steps, role }) {
  const [ref, inView] = useInView({ threshold: 0.2 }, false);
  const [cur, setCur] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (!inView || held || reduced()) return undefined;
    const t = setInterval(() => !document.hidden && setCur((c) => (c + 1) % steps.length), 2600);
    return () => clearInterval(t);
  }, [inView, held, steps.length]);
  return (
    <div ref={ref} className={`srail sr-${role}`} style={{ '--n': steps.length, '--cur': cur }}>
      <span className="sr-deco" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="sr-track" aria-hidden="true"><span className="sr-fill" /><span className="sr-dot" /></span>
      <ol>
        {steps.map((s, i) => (
          <li key={s.t} className={i === cur ? 'on' : i < cur ? 'done' : ''} style={{ '--i': i }}>
            <button type="button" onClick={() => { setHeld(true); setCur(i); }} aria-current={i === cur ? 'step' : undefined}>
              <span className="sr-node"><Icon name={s.icon} size={20} /><em>{i + 1}</em></span>
              <span className="sr-card"><b>{s.t}</b><small>{s.d}</small></span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------------------------------------------------------------- 5. Reward wallets per role */
const WALLET = {
  hcp: { name: 'Professional vault', note: 'Honoraria shown upfront in every invitation' },
  caregiver: { name: 'Care rewards', note: 'Pick what helps most at home' },
  patient: { name: 'Wellness wallet', note: 'Your story, rewarded your way' },
};
export function RewardWallet({ role }) {
  const r = REWARD_ROLES.find((x) => x.id === role) || REWARD_ROLES[0];
  const w = WALLET[role] || WALLET.hcp;
  const [flip, setFlip] = useState(-1);
  return (
    <LiveZone className={`rwal rw-${role}`} style={{ '--g1': r.color, '--g2': r.accent }}>
      <div className="rw-head">
        <span className="rw-badge"><Icon name={r.icon} size={22} /></span>
        <span className="rw-ttl"><b>{w.name}</b><small>{r.line}</small></span>
        <span className="rw-count"><b>{r.items.length}</b> ways to get paid</span>
      </div>
      <ul className="rw-grid">
        {r.items.map((it, i) => (
          <li key={it.id} style={{ '--i': i, '--c': it.c }}>
            <button type="button" className={`rw-card ${flip === i ? 'is-flipped' : ''}`} onClick={() => setFlip(flip === i ? -1 : i)} aria-pressed={flip === i} aria-label={`${it.t}: ${it.d}`}>
              <span className="rw-in">
                <span className="rw-f">
                  <span className="rw-chip" aria-hidden="true" />
                  <span className="rw-ic"><Icon name={it.icon} size={26} /></span>
                  <b>{it.t}</b>
                  <small>Tap to turn over</small>
                  <span className="rw-holo" aria-hidden="true" />
                </span>
                <span className="rw-b">
                  <Icon name={it.icon} size={20} />
                  <span>{it.d}</span>
                  <small>{it.id === 'upi' ? 'India only' : it.id === 'report' ? 'Professionals only' : 'Where the study offers it'}</small>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="rw-note"><Icon name="info" size={14} /> {w.note}.</p>
    </LiveZone>
  );
}

/* ---------------------------------------------------------------- 6. Passport-stamp country board */
export function CountryStamps() {
  const [r, setRegion] = useState('all');
  const [more, setMore] = useState(false);
  const setR = (x) => { setRegion(x); setMore(false); };
  const full = (r === 'all' ? REGIONS : REGIONS.filter((x) => x.id === r)).flatMap((x) => x.countries.map(([code, name]) => ({ code, name, region: x.short, color: x.color })));
  const cut = full.length > 24 && !more;
  const list = cut ? full.slice(0, 18) : full;
  return (
    <div className="cstamps">
      <div className="cs-regions" role="tablist" aria-label="Regions">
        <button role="tab" aria-selected={r === 'all'} className={`cs-reg ${r === 'all' ? 'on' : ''}`} style={{ '--c': '#1b1035' }} onClick={() => setR('all')}>
          <b>{COVERAGE_COUNT}</b><span>All countries</span><Icon name="globe" size={18} />
        </button>
        {REGIONS.map((x) => (
          <button key={x.id} role="tab" aria-selected={r === x.id} className={`cs-reg ${r === x.id ? 'on' : ''}`} style={{ '--c': x.color }} onClick={() => setR(x.id)}>
            <b>{x.countries.length}</b><span>{x.name}</span><Icon name="pin" size={18} />
          </button>
        ))}
      </div>
      <div className="cs-page">
        <span className="cs-guil" aria-hidden="true" />
        <ul className="cs-grid" key={r}>
          {list.map((c, i) => (
            <li key={c.code} className="cs-stamp" style={{ '--c': c.color, '--i': Math.min(i, 30), '--r': `${((i * 37) % 9) - 4}deg` }}>
              <span className="cs-ring"><Flag code={c.code} name={c.name} size={40} /></span>
              <b>{c.name}</b>
              <small><i />{c.region} · Open</small>
            </li>
          ))}
        </ul>
        {cut && <button type="button" className="cs-more" onClick={() => setMore(true)}><Icon name="globe" size={16} /> Show all {full.length} countries</button>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 7. Panel picker (Log in / Join) */
export const PANELS = [
  { id: 'hcp', t: 'Healthcare professional', s: 'Doctors, nurses, pharmacists & staff', ic: 'stethoscope' },
  { id: 'caregiver', t: 'Caregiver', s: 'Family & care support', ic: 'hands' },
  { id: 'patient', t: 'Patient', s: 'Share your experience', ic: 'heart' },
];
export function PanelPicker({ value, onChange, label = 'I am a' }) {
  return (
    <div className="ppick" role="radiogroup" aria-label={label}>
      {PANELS.map((p) => (
        <button key={p.id} type="button" role="radio" aria-checked={value === p.id} className={`pp-opt t-${p.id} ${value === p.id ? 'on' : ''}`} onClick={() => onChange(p.id)}>
          <span className="pp-ic"><Icon name={p.ic} size={20} /></span>
          <span className="pp-t"><b>{p.t}</b><small>{p.s}</small></span>
          <span className="pp-tick" aria-hidden="true"><Icon name="check" size={12} stroke={3.5} /></span>
        </button>
      ))}
    </div>
  );
}


/* ---------- Member voices on each product page, a different presentation per role ----------
   hcp: "grand rounds" case-note clipboard with a specialty rail
   caregiver: handwritten notes pinned to a warm fridge door
   patient: story bubbles, one in the centre, the rest floating around it */
const ROLE_AUD = { hcp: ['doctors', 'nurses', 'allied'], caregiver: ['caregivers'], patient: ['patients'] };
const initials = (n) => n.replace(/^Dr\.\s*/, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('');
const Stars = ({ n }) => <span className="rv-stars" role="img" aria-label={`${n} out of 5 stars`}>{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={13} fill={i < n ? 'currentColor' : 'none'} stroke={i < n ? 0 : 1.6} />)}</span>;

function pickVoices(role) {
  const auds = ROLE_AUD[role] || ROLE_AUD.patient;
  if (role !== 'hcp') return TESTIMONIALS.filter((t) => auds.includes(t.audience));
  // two per professional group, so doctors, nurses and allied health all appear
  return auds.flatMap((a) => TESTIMONIALS.filter((t) => t.audience === a).slice(0, 2));
}

export function RoleVoices({ role }) {
  const list = pickVoices(role);
  const [ref, inView] = useInView({ threshold: 0.25 }, false);
  const [cur, setCur] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (!inView || hold || role === 'caregiver') return undefined;
    const t = setInterval(() => setCur((c) => (c + 1) % list.length), 5200);
    return () => clearInterval(t);
  }, [inView, hold, role, list.length]);
  const t = list[cur];

  if (role === 'caregiver') {
    return (
      <div ref={ref} className="rv rv-fridge" data-mode-skip="">
        <span className="rv-magnet m1" aria-hidden="true"><Icon name="heart" size={18} fill="currentColor" stroke={0} /></span>
        <span className="rv-magnet m2" aria-hidden="true"><Icon name="home" size={16} /></span>
        <ul className="rv-notes">
          {list.map((v, i) => (
            <li key={v.name} className={`rv-note n${i % 5}`} style={{ '--i': i }}>
              <span className="rv-pin" aria-hidden="true" />
              <Stars n={v.rating} />
              <blockquote>“{v.quote}”</blockquote>
              <span className="rv-sign"><Flag code={v.cc} name={v.country} size={20} /><b>{v.name}</b><small>{v.role} · {v.country}</small></span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (role === 'hcp') {
    return (
      <div ref={ref} className="rv rv-rounds" data-mode-skip="" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
        <div className="rv-board">
          <span className="rv-clip" aria-hidden="true" />
          <div className="rv-chart" key={cur}>
            <span className="rv-chead"><span>Case note · {String(cur + 1).padStart(2, '0')}</span><span>{t.role}</span></span>
            <blockquote>“{t.quote}”</blockquote>
            <svg className="rv-ecg" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 18h70l8-14 9 26 8-20 6 8h199" /></svg>
            <span className="rv-who"><span className="rv-ava">{initials(t.name)}</span><span><b>{t.name}</b><small><Flag code={t.cc} name={t.country} size={16} />{t.country}</small></span><Stars n={t.rating} /></span>
          </div>
        </div>
        <ul className="rv-rail" aria-label="Choose a professional">
          {list.map((v, i) => (
            <li key={v.name}>
              <button type="button" className={i === cur ? 'on' : ''} aria-pressed={i === cur} onClick={() => { setCur(i); setHold(true); }}>
                <span className="rv-ava">{initials(v.name)}</span><span><b>{v.name}</b><small>{v.role}</small></span>
                <i className="rv-bar" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div ref={ref} className="rv rv-bloom" data-mode-skip="" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="rv-centre" key={cur}>
        <span className="rv-q" aria-hidden="true">“</span>
        <blockquote>{t.quote}</blockquote>
        <span className="rv-who"><span className="rv-ava">{initials(t.name)}</span><span><b>{t.name}</b><small><Flag code={t.cc} name={t.country} size={16} />{t.role}</small></span><Stars n={t.rating} /></span>
      </div>
      <ul className="rv-orbit" aria-label="More patient stories">
        {list.map((v, i) => (
          <li key={v.name} className={i % 2 ? 'r' : 'l'} style={{ '--i': i, '--y': `${10 + Math.floor(i / 2) * (66 / Math.max(1, Math.ceil(list.length / 2) - 1))}%` }}>
            <button type="button" className={i === cur ? 'on' : ''} aria-pressed={i === cur} onClick={() => { setCur(i); setHold(true); }} aria-label={`Read ${v.name}`}>
              <span className="rv-ava">{initials(v.name)}</span><small>{v.country}</small>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
