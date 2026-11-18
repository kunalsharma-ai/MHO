// Home hero (original design, kept in every language) with three audience tabs (Healthcare Professional · Caregiver · Patient). Each tab has its own
// colour grade, motto, headline, copy and a 3D "money" scene:
//   Professional → a vital-signs monitor whose heartbeat pops coins onto a growing honorarium tower
//   Caregiver    → paper-plane vouchers fly into a "care fund" jar that fills with coins and hearts
//   Patient      → a survey ring hits 100%, a 3D gift box bursts open with a gift card and a coin fountain
// The scene tilts gently towards the pointer. Tabs auto-advance every 5.5 s until the visitor picks one.
// The prerendered HTML contains the first tab, so search engines always see a complete hero.
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import Persona from './Persona.jsx';
import { Button, LiveZone } from './ui.jsx';
import { HeroTitle } from './PageHero.jsx';
import AuroraCanvas from './AuroraCanvas.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

export const ROLES = [
  {
    id: 'hcp',
    tab: 'Healthcare Professional',
    tabSub: 'Doctors & nurses',
    icon: 'stethoscope',
    persona: ['doctor', 2, 0, 0],
    motto: 'Your expertise, rewarded',
    title: ['Paid surveys that', { t: 'respect your clinical time', hl: 'grad' }],
    lead: 'Fifteen minutes between clinics is enough. Tell pharma, device and health-tech teams how medicine really works on the ward, and receive an honorarium for every study you complete. Verified professionals only, so every invitation is worth opening.',
    badges: ['Honoraria for every completed study', 'Credential-verified panel', 'Fits around shifts'],
    cta: 'Join as a professional',
  },
  {
    id: 'caregiver',
    tab: 'Caregiver',
    tabSub: 'Family & care support',
    icon: 'hands',
    persona: ['caregiver', 1, 3, 1],
    motto: 'You carry the care. We carry your voice',
    title: ['Paid surveys for the people who', { t: 'hold it all together', hl: 'grad' }],
    lead: 'You know what the brochures leave out: the night checks, the pharmacy runs, the waiting rooms. Share it in short surveys whenever it suits you, and earn cash, gift cards or grocery vouchers for every one you finish.',
    badges: ['Short, flexible surveys', 'Cash, grocery & wellness rewards', 'Sensitive questions optional'],
    cta: 'Join as a caregiver',
  },
  {
    id: 'patient',
    tab: 'Patient',
    tabSub: 'Share your story',
    icon: 'heart',
    persona: ['patient', 3, 2, 0],
    motto: 'Your story can change someone’s treatment',
    title: ['Paid surveys where', { t: 'your health story pays you back', hl: 'grad' }],
    lead: 'No clinics, no tests, no needles. Just your honest experience of living with a condition, answered from your phone, and a reward for every survey you complete. Your name never leaves our hands.',
    badges: ['₹0 / $0 to join', 'Answer from your phone', 'Your details never sold'],
    cta: 'Join as a patient',
  },
];

const SYMBOLS = ['$', '₹', '€', '£', '$', '₹', '€', '$', '₹', '£'];

/** Animated counter (CSS @property): counts up to `to` every loop. */
function Count({ to, pre = '', className = '' }) {
  return <span className={`count-up ${className}`} style={{ '--to': to }} data-pre={pre} aria-hidden="true" />;
}

/** A gold coin seen edge-on in 3D (disc + rim). */
function Coin({ sym = '$', className = '', style }) {
  return <i className={`gcoin ${className}`} style={style}><b>{sym}</b></i>;
}

/* ---------- Professional: the vital-signs monitor that pays ---------- */
function ProScene() {
  return (
    <>
      <div className="vm-monitor">
        <div className="vm-screen">
          <div className="vm-top">
            <span className="vm-live"><i />Live study</span>
            <span className="vm-tag"><Icon name="stethoscope" size={12} /> Cardiology · 18 min</span>
          </div>
          <svg className="vm-ecg" viewBox="0 0 300 90" preserveAspectRatio="none">
            <path className="vm-trace" d="M0 52 H52 l8-12 8 12 H96 l6-40 9 74 8-48 6 14 H168 l8-14 8 14 H212 l6-40 9 74 8-48 6 14 H300" pathLength="100" />
            <path className="vm-glow" d="M0 52 H52 l8-12 8 12 H96 l6-40 9 74 8-48 6 14 H168 l8-14 8 14 H212 l6-40 9 74 8-48 6 14 H300" pathLength="100" />
          </svg>
          <div className="vm-read">
            <span className="vm-cell big"><small>Honoraria earned</small><Count to={1250} pre="$" /></span>
            <span className="vm-cell"><small>Studies</small><b>12</b></span>
            <span className="vm-cell"><small>Status</small><b className="vm-ok"><Icon name="check" size={12} stroke={3} /> Paid</b></span>
          </div>
        </div>
        <span className="vm-neck" /><span className="vm-foot" />
      </div>
      {[0, 1, 2].map((i) => <Coin key={i} sym={['$', '€', '£'][i]} className="vm-pop" style={{ '--i': i }} />)}
      <div className="vm-tower">
        {Array.from({ length: 8 }).map((_, i) => <span key={i} className="vm-disc" style={{ '--i': i }} />)}
        <span className="vm-tower-lbl">Honorarium</span>
      </div>
      <div className="vm-credit">
        <span className="vc-ic"><Icon name="bank" size={16} /></span>
        <span><b>+$45 credited</b><small>Wire transfer · just now</small></span>
      </div>
      <div className="vm-lanyard">
        <svg className="vl-string" viewBox="0 0 60 44" aria-hidden="true"><path d="M8 0 Q12 30 30 40 Q48 30 52 0" /><rect x="24" y="34" width="12" height="10" rx="2" /></svg>
        <span className="vl-card">
          <Persona kind="doctor" skin={2} hair={0} size={40} />
          <span><b>Verified clinician</b><small><Icon name="shieldCheck" size={11} /> Licence checked</small></span>
        </span>
      </div>
      <span className="s-chip c1"><Icon name="book" size={13} /> CME credit</span>
      <span className="s-chip c2"><Icon name="paypal" size={13} /> PayPal</span>
    </>
  );
}

/* ---------- Caregiver: the care jar that fills while vouchers fly in ---------- */
function CareScene() {
  return (
    <>
      <div className="cj-jar">
        <svg viewBox="0 0 200 240" className="cj-svg">
          <defs>
            <clipPath id="cj-clip"><path d="M40 70 Q30 80 30 100 V200 Q30 226 56 226 H144 Q170 226 170 200 V100 Q170 80 160 70 Z" /></clipPath>
            <linearGradient id="cj-liquid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd27a" /><stop offset="1" stopColor="#ff7a59" /></linearGradient>
            <linearGradient id="cj-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity=".75" /><stop offset=".3" stopColor="#fff" stopOpacity=".15" /><stop offset=".8" stopColor="#fff" stopOpacity=".05" /><stop offset="1" stopColor="#fff" stopOpacity=".5" /></linearGradient>
          </defs>
          <ellipse cx="100" cy="230" rx="78" ry="8" fill="#000" opacity=".1" />
          <path d="M40 70 Q30 80 30 100 V200 Q30 226 56 226 H144 Q170 226 170 200 V100 Q170 80 160 70 Z" fill="#fff" fillOpacity=".35" stroke="#ffb38a" strokeWidth="3" />
          <g clipPath="url(#cj-clip)">
            <g className="cj-fill"><rect x="20" y="0" width="160" height="240" fill="url(#cj-liquid)" /><path className="cj-wave" d="M0 4 Q25 -4 50 4 T100 4 T150 4 T200 4 T250 4 V20 H0z" fill="#ffe2a8" /></g>
            {[0, 1, 2, 3, 4, 5].map((i) => <ellipse key={i} className="cj-coin" style={{ '--i': i }} cx={60 + (i % 3) * 40} cy={206 - Math.floor(i / 3) * 14} rx="17" ry="6" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />)}
            {[0, 1, 2].map((i) => <path key={i} className="cj-heart" style={{ '--i': i }} d="M0 -4c-3-6-12-4-10 3 1 4 10 9 10 9s9-5 10-9c2-7-7-9-10-3z" fill="#ff4f6d" transform={`translate(${70 + i * 30} ${190 - i * 26})`} />)}
          </g>
          <path d="M40 70 Q30 80 30 100 V200 Q30 226 56 226 H144 Q170 226 170 200 V100 Q170 80 160 70 Z" fill="url(#cj-glass)" />
          <path d="M48 96 V196" stroke="#fff" strokeOpacity=".9" strokeWidth="6" strokeLinecap="round" />
          <rect x="34" y="48" width="132" height="26" rx="10" fill="#ff8a3d" />
          <rect x="34" y="48" width="132" height="10" rx="6" fill="#ffb067" />
          <g className="cj-label"><rect x="58" y="120" width="84" height="42" rx="10" fill="#fff" /><text x="100" y="138" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ff4f6d">CARE FUND</text><text x="100" y="153" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">grows every survey</text></g>
        </svg>
      </div>
      {[['bag', 'Grocery voucher'], ['pulse', 'Wellness'], ['wallet', 'Cash reward']].map(([ic, l], i) => (
        <span key={l} className={`cj-plane p${i}`} style={{ '--i': i }}>
          <svg viewBox="0 0 24 24" className="cjp-svg"><path d="M22 2 2 9.5l7 3 3 7z" fill="#fff" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M22 2 9 12.5" stroke="currentColor" strokeWidth="1.6" /></svg>
          <em><Icon name={ic} size={12} />{l}</em>
        </span>
      ))}
      <div className="cj-week">
        <span className="cw-head"><Icon name="calendar" size={13} /> This week</span>
        <span className="cw-days">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <i key={i} style={{ '--i': i }} className={i % 2 === 0 ? 'on' : ''}>{d}</i>)}</span>
        <span className="cw-sum">4 short surveys · <b>₹2,000</b></span>
      </div>
      <div className="cj-ticket">
        <span className="ct-l"><small>Grocery voucher</small><b>₹500</b></span>
        <span className="ct-r"><Icon name="gift" size={18} /></span>
      </div>
      <span className="s-badge sb-care">
        <Persona kind="caregiver" skin={1} hair={3} hairStyle={1} size={42} />
        <span><b>Caring for Dad</b><small><Icon name="clock" size={11} /> 10-minute survey</small></span>
      </span>
    </>
  );
}

/* ---------- Patient: finish the survey, the gift box opens ---------- */
function PatientScene() {
  return (
    <>
      <div className="gp-phone">
        <div className="gp-screen">
          <span className="gp-q">Living with type 2 diabetes</span>
          <span className="gp-dial">
            <svg viewBox="0 0 100 100" className="gp-ring">
              <circle cx="50" cy="50" r="40" className="gp-track" />
              <circle cx="50" cy="50" r="40" className="gp-prog" pathLength="100" />
            </svg>
            <span className="gp-pct"><Count to={100} /><small>%</small></span>
          </span>
          <span className="gp-done"><Icon name="check" size={13} stroke={3} /> Survey complete</span>
        </div>
      </div>
      <div className="gb-wrap">
        <div className="gb-box">
          <span className="gb-f front" /><span className="gb-f back" /><span className="gb-f left" /><span className="gb-f right" /><span className="gb-f bottom" />
          <div className="gb-lid">
            <span className="gl-f top" /><span className="gl-f front" /><span className="gl-f back" /><span className="gl-f left" /><span className="gl-f right" />
            <span className="gb-bow"><i /><i /></span>
          </div>
        </div>
        <div className="gb-card">
          <span className="gc-top"><Icon name="gift" size={13} /> Reward unlocked</span>
          <b>Amazon Gift Card</b>
          <span className="gc-val">$15</span>
          <span className="gc-shine" />
        </div>
        {Array.from({ length: 8 }).map((_, i) => <Coin key={i} sym={SYMBOLS[i]} className="gb-coin" style={{ '--i': i, '--dx': `${(i - 3.5) * 9}cqw`, '--dy': `${-20 - (i % 3) * 8}cqw` }} />)}
        <span className="gb-rays" />
      </div>
      <div className="gp-wallet"><Icon name="wallet" size={15} /><span><small>My rewards</small><Count to={45} pre="$" /></span></div>
      <span className="s-chip c1"><Icon name="upi" size={13} /> UPI · India</span>
      <span className="s-chip c3"><Icon name="lock" size={13} /> Anonymous answers</span>
    </>
  );
}

const SCENES = { hcp: ProScene, caregiver: CareScene, patient: PatientScene };

function Stage({ role }) {
  const ref = useRef(null);
  const Scene = SCENES[role.id];
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`);
    el.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`);
  };
  const reset = () => {
    ref.current?.style.setProperty('--ry', '0deg');
    ref.current?.style.setProperty('--rx', '0deg');
  };
  return (
    <LiveZone className={`stage stage-${role.id}`} onPointerMove={onMove} onPointerLeave={reset}>
      <div className="stage-3d" ref={ref} aria-hidden="true">
        <span className="stage-pad" />
        <Scene />
      </div>
    </LiveZone>
  );
}

const ROLE_MS = 5500; // keep in step with the .rht-timer animation in v3.css

export default function RoleHero() {
  // English keeps the original colour grading; other languages show the same hero over their language grade.
  const { lang } = useI18n();
  const graded = lang !== 'en';
  const [idx, setIdx] = useState(0);
  const role = ROLES[idx];

  // The three audiences rotate on their own, all the time (Kunal asked for this). Picking a tab shows it and
  // restarts the countdown, so the visitor gets a full turn before it moves on; a hidden tab pauses it.
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => { if (!document.hidden) setIdx((i) => (i + 1) % ROLES.length); else setCycle((c) => c + 1); }, ROLE_MS);
    return () => clearTimeout(t);
  }, [idx, cycle]);

  const pick = (i) => { setIdx(i); setCycle((c) => c + 1); };
  // The first panel is already painted from the prerendered HTML: animating it in again would hide the
  // headline (the page's LCP) for a moment. Only later role changes slide in.
  const movedRef = useRef(false);
  if (idx !== 0 || cycle !== 0) movedRef.current = true;
  const moved = movedRef.current;

  return (
    <section className={`role-hero rgrade-${role.id} ${graded ? 'aurora-hero' : ''}`}>
      {graded && (
        <div className="ah-bg" aria-hidden="true">
          <AuroraCanvas />
          <span className="ah-grid" />
          <span className="ah-glow" />
        </div>
      )}
      <div className="rh-bg" aria-hidden="true"><i /><i /><i /><span className="rh-ecg"><svg viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0 70 H360 l20-40 26 80 22-96 20 72 14-16 H760 l16-24 18 48 16-24 H1200" pathLength="100" /></svg></span></div>
      <div className="container rh-inner">
        <div className="rh-copy">
          <div className="rh-tabs" role="tablist" aria-label="Choose who you are">
            <span className="rh-slider" style={{ '--n': idx }} aria-hidden="true" />
            {ROLES.map((r, i) => (
              <button key={r.id} role="tab" id={`rh-tab-${r.id}`} aria-selected={i === idx} aria-controls="rh-panel" className={`rh-tab t-${r.id} ${i === idx ? 'on' : ''}`} onClick={() => pick(i)}>
                <span className="rht-ic"><Icon name={r.icon} size={18} /></span>
                <span className="rht-txt"><b>{r.tab}</b><small>{r.tabSub}</small></span>
                {i === idx && <span className="rht-timer" key={`${idx}-${cycle}`} aria-hidden="true" />}
              </button>
            ))}
          </div>
          <div className={`rh-panel${moved ? ' rh-anim' : ''}`} id="rh-panel" role="tabpanel" aria-labelledby={`rh-tab-${role.id}`} key={role.id}>
            <p className="rh-motto"><span className="rm-av"><Persona kind={role.persona[0]} skin={role.persona[1]} hair={role.persona[2]} hairStyle={role.persona[3]} size={30} /></span>{role.motto}</p>
            <HeroTitle parts={role.title} />
            <p className="rh-lead">{role.lead}</p>
            <ul className="ph-badges">{role.badges.map((b) => <li key={b}>{b}</li>)}</ul>
            <div className="ph-ctas">
              <Button to={`/join#${role.id}`}>{role.cta}</Button>
              <Button to="/how-it-works" variant="ghost" icon="pulse">How paid surveys work</Button>
            </div>
          </div>
        </div>
        <div className={`rh-art${moved ? ' rh-anim' : ''}`} key={role.id + '-art'}><Stage role={role} /></div>
      </div>
    </section>
  );
}
