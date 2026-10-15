// Hero illustrations — one distinct animated scene per page (CSS-driven, GPU-friendly transforms only).
import Icon from './Icon.jsx';
import Persona from './Persona.jsx';
import { HeartMark } from './Brand.jsx';
import { LiveZone } from './ui.jsx';

const COIN_SYMBOLS = ['$', '₹', '€', '£', '$', '₹', 'A$', '€'];

/** Consumers: phone survey → coins arc into a filling reward jar; payout chips orbit. */
export function ConsumerHeroArt() {
  return (
    <LiveZone className="art art-consumer" aria-hidden="true">
      <div className="ac-phone">
        <div className="ac-screen">
          <span className="ac-q">Which matters most to you?</span>
          <span className="ac-opt o1"><i />Price</span>
          <span className="ac-opt o2"><i />Quality</span>
          <span className="ac-opt o3"><i />Speed</span>
          <span className="ac-done"><Icon name="check" size={16} stroke={3} /> Survey complete</span>
        </div>
      </div>
      <div className="ac-coins">
        {COIN_SYMBOLS.map((s, i) => <span key={i} className="ac-coin" style={{ '--i': i }}>{s}</span>)}
      </div>
      <div className="ac-jar">
        <div className="ac-fill"><span className="ac-wave" /></div>
        <span className="ac-jar-label">Rewards</span>
      </div>
      <span className="ac-chip c1"><Icon name="paypal" size={14} />PayPal</span>
      <span className="ac-chip c2"><Icon name="gift" size={14} />Amazon Gift Card</span>
      <span className="ac-chip c3"><Icon name="upi" size={14} />UPI · India</span>
      <span className="ac-chip c4"><Icon name="bank" size={14} />Wire Transfer</span>
      <span className="ac-p p1"><Persona kind="consumer" skin={1} hair={0} hairStyle={1} size={58} /></span>
      <span className="ac-p p2"><Persona kind="student" skin={3} hair={2} size={52} /></span>
      <span className="ac-p p3"><Persona kind="elder" skin={0} size={54} /></span>
    </LiveZone>
  );
}

/** Professionals: clinical clipboard ticks, expertise bars rise, a reward voucher slides out. */
export function ProHeroArt() {
  return (
    <LiveZone className="art art-pro" aria-hidden="true">
      <div className="ap-board">
        <div className="ap-clip" />
        <span className="ap-title">Clinical insight survey</span>
        {['Treatment patterns', 'Device usability', 'Patient pathways', 'Workflow & tools'].map((t, i) => (
          <span key={t} className="ap-row" style={{ '--i': i }}>
            <i className="ap-box"><Icon name="check" size={12} stroke={3.5} /></i>{t}
          </span>
        ))}
        <div className="ap-bars">{[40, 62, 80, 96].map((h, i) => <i key={i} style={{ '--h': h + '%', '--i': i }} />)}</div>
      </div>
      <div className="ap-voucher">
        <span className="apv-ic"><Icon name="trophy" size={20} /></span>
        <span><b>Reward unlocked</b><small>Expert incentive credited</small></span>
      </div>
      <div className="ap-orbit">
        <span className="apo p1"><Persona kind="doctor" skin={2} hair={0} size={62} /></span>
        <span className="apo p2"><Persona kind="nurse" skin={4} hair={1} hairStyle={1} size={56} /></span>
        <span className="apo p3"><Persona kind="pharmacist" skin={0} hair={4} hairStyle={2} size={54} /></span>
        <span className="apo p4"><Persona kind="business" skin={3} hair={2} size={50} /></span>
      </div>
      <svg className="ap-ecg" viewBox="0 0 400 60" preserveAspectRatio="none"><path d="M0 34h120l12-20 14 36 12-26 10 10h232" pathLength="100" /></svg>
    </LiveZone>
  );
}

/** About: a constellation of people linked to the heart of the community. */
export function NetworkHeroArt() {
  const people = [['doctor', 2, 0, 0], ['nurse', 4, 1, 1], ['caregiver', 1, 3, 1], ['patient', 3, 2, 0], ['pharmacist', 0, 4, 2], ['consumer', 5, 0, 1], ['business', 2, 2, 0], ['elder', 1, 0, 0]];
  return (
    <LiveZone className="art art-network" aria-hidden="true">
      <svg className="an-lines" viewBox="0 0 400 400">
        {people.map((_, i) => {
          const a = (i / people.length) * Math.PI * 2;
          return <line key={i} x1="200" y1="200" x2={200 + Math.cos(a) * 150} y2={200 + Math.sin(a) * 150} style={{ '--i': i }} />;
        })}
        <circle cx="200" cy="200" r="150" className="an-ring" />
      </svg>
      <div className="an-core"><HeartMark size={86} /></div>
      {people.map(([k, s, h, hs], i) => (
        <span key={i} className="an-p" style={{ '--a': `${(i / people.length) * 360}deg`, '--i': i }}>
          <Persona kind={k} skin={s} hair={h} hairStyle={hs} size={56} />
        </span>
      ))}
    </LiveZone>
  );
}

/** Earn: rotating kaleidoscope of profiles with role labels. */
export function KaleidoHeroArt() {
  const ring = [['doctor', 'Doctors'], ['nurse', 'Nurses'], ['pharmacist', 'Pharmacists'], ['caregiver', 'Caregivers'], ['patient', 'Patients'], ['business', 'IT & business'], ['student', 'Students'], ['elder', 'Retirees'], ['consumer', 'Homemakers']];
  return (
    <LiveZone className="art art-kaleido" aria-hidden="true">
      <div className="ak-ring">
        {ring.map(([k, l], i) => (
          <span key={l} className="ak-item" style={{ '--a': `${(i / ring.length) * 360}deg` }}>
            <span className="ak-inner"><Persona kind={k} skin={i % 6} hair={i % 5} hairStyle={i % 3} size={58} /><em>{l}</em></span>
          </span>
        ))}
      </div>
      <div className="ak-core">
        <Icon name="coins" size={40} />
        <b>Everyone earns</b>
      </div>
    </LiveZone>
  );
}

/** Rewards: a vault dial unlocking and cards fanning out. */
export function VaultHeroArt() {
  return (
    <LiveZone className="art art-vault" aria-hidden="true">
      <div className="av-door">
        <div className="av-dial">{Array.from({ length: 12 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}<b>MHO</b></div>
      </div>
      {[['paypal', 'PayPal', '#003087'], ['upi', 'UPI', '#5f259f'], ['bank', 'Wire', '#0f766e'], ['gift', 'Gift Card', '#ff9900']].map(([ic, l, c], i) => (
        <span key={l} className="av-card" style={{ '--i': i, '--c': c }}><Icon name={ic} size={18} />{l}</span>
      ))}
      <div className="av-sparks">{Array.from({ length: 10 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div>
    </LiveZone>
  );
}

/** Trust: layered shield with a scanning beam and orbiting checks. */
export function ShieldHeroArt() {
  return (
    <LiveZone className="art art-shield" aria-hidden="true">
      <div className="as-layers">
        <span className="as-l l1" /><span className="as-l l2" /><span className="as-l l3" />
        <span className="as-core"><Icon name="shieldCheck" size={64} stroke={1.6} /></span>
        <span className="as-beam" />
      </div>
      {['fingerprint', 'bot', 'pin', 'lock', 'mail-check', 'key'].map((ic, i) => (
        <span key={ic} className="as-orb" style={{ '--i': i }}><Icon name={ic} size={18} /></span>
      ))}
    </LiveZone>
  );
}

export function JourneyHeroArt() {
  const st = [['user', 'Join'], ['clipboard', 'Profile'], ['mail', 'Invite'], ['coins', 'Reward']];
  return (
    <LiveZone className="art art-journey" aria-hidden="true">
      <svg viewBox="0 0 400 400" className="aj-track"><circle cx="200" cy="200" r="140" pathLength="100" /></svg>
      <span className="aj-runner" />
      {st.map(([ic, l], i) => (
        <span key={l} className="aj-st" style={{ '--i': i }}><Icon name={ic} size={22} /><em>{l}</em></span>
      ))}
      <span className="aj-core"><HeartMark size={70} /></span>
    </LiveZone>
  );
}

/** Blog: floating stacked article cards. */
export function StackHeroArt() {
  const cards = [['trending', 'Trending', '#e8344e'], ['coins', 'Earn online', '#1e5bff'], ['stethoscope', 'For clinicians', '#14b8a6'], ['shield', 'Stay safe', '#7c3aed']];
  return (
    <LiveZone className="art art-stack" aria-hidden="true">
      {cards.map(([ic, l, c], i) => (
        <div key={l} className="ast-card" style={{ '--i': i, '--c': c }}>
          <span className="ast-ic"><Icon name={ic} size={18} /></span>
          <b>{l}</b>
          <i /><i /><i />
        </div>
      ))}
    </LiveZone>
  );
}

export function BubblesHeroArt() {
  return (
    <LiveZone className="art art-bubbles" aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <span key={i} className="ab-b" style={{ '--i': i }}>
          <b className="q">?</b>
          <b className="a"><Icon name="check" size={20} stroke={3} /></b>
        </span>
      ))}
      <span className="ab-core"><Icon name="chat" size={44} /></span>
    </LiveZone>
  );
}

/** Contact: signal rings and channel satellites. */
export function SignalHeroArt() {
  return (
    <LiveZone className="art art-signal" aria-hidden="true">
      <span className="asg-ring r1" /><span className="asg-ring r2" /><span className="asg-ring r3" />
      <span className="asg-core"><Icon name="call" size={38} /></span>
      {[['whatsapp', '#22c55e'], ['mail', '#3d5afe'], ['chat', '#e8344e'], ['pin', '#f59e0b']].map(([ic, c], i) => (
        <span key={ic} className="asg-sat" style={{ '--i': i, '--c': c }}><Icon name={ic} size={20} /></span>
      ))}
    </LiveZone>
  );
}

/** Reviews: star constellation burst. */
export function StarsHeroArt() {
  return (
    <LiveZone className="art art-stars" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="ars-s" style={{ '--i': i }}><Icon name="star" size={18 + (i % 4) * 6} fill="currentColor" stroke={1} /></span>
      ))}
      <span className="ars-core"><Icon name="quote" size={46} /></span>
    </LiveZone>
  );
}

/** Legal pages: a document sealed by a rotating shield stamp. */
export function DocHeroArt({ icon = 'shield' }) {
  return (
    <LiveZone className="art art-doc" aria-hidden="true">
      <div className="ad-paper">
        <i /><i /><i /><i /><i /><i />
      </div>
      <span className="ad-stamp"><Icon name={icon} size={34} /></span>
    </LiveZone>
  );
}

/* ---------- Legal heroes (v4): one scene per document ---------- */
function CookieScene() {
  return (
    <>
      <svg viewBox="0 0 200 220" className="lg-jar">
        <rect x="40" y="40" width="120" height="26" rx="10" fill="#8a4dff" />
        <path d="M46 66h108v120a24 24 0 0 1-24 24H70a24 24 0 0 1-24-24z" fill="#ffffff" fillOpacity=".55" stroke="#c4b5fd" strokeWidth="3" />
        {[[80, 170], [118, 176], [100, 140], [72, 128], [128, 124], [98, 104]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}><g className="lg-cookie" style={{ '--i': i }}>
            <circle r="17" fill="#e8a75d" stroke="#b9772f" strokeWidth="2" />
            <circle cx="-6" cy="-4" r="2.6" fill="#5b3412" /><circle cx="6" cy="2" r="2.6" fill="#5b3412" /><circle cx="-1" cy="8" r="2.2" fill="#5b3412" />
          </g></g>
        ))}
        <path d="M60 80v80" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".8" />
      </svg>
      <div className="lg-toggles">
        <span className="lgt on lock"><b>Essential</b><i /></span>
        <span className="lgt anim"><b>Analytics</b><i /></span>
        <span className="lgt off"><b>Advertising</b><i /><em>none</em></span>
      </div>
    </>
  );
}
function PrivacyScene() {
  return (
    <>
      <div className="lg-dial"><span className="lgd-ring" /><span className="lgd-ring r2" /><span className="lgd-core"><Icon name="lock" size={34} /></span>{Array.from({ length: 12 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div>
      {['Name', 'Email', 'Phone', 'Answers'].map((t, i) => <span key={t} className={`lg-datum p${i}`} style={{ '--i': i }}><Icon name="lock" size={12} />{t}</span>)}
    </>
  );
}
function TermsScene() {
  return (
    <div className="lg-contract">
      <span className="lgc-title" />
      {[90, 76, 84, 60, 80].map((w, i) => <i key={i} style={{ width: w + '%', '--i': i }} />)}
      <span className="lgc-ticks">{[0, 1, 2].map((i) => <b key={i} style={{ '--i': i }}><Icon name="check" size={12} stroke={3} /></b>)}</span>
      <svg viewBox="0 0 200 60" className="lgc-sign"><path d="M8 44c14-26 22-30 26-18s-6 22 2 20 14-34 22-28-4 26 4 24 12-16 18-14 2 12 10 10 16-12 30-10 30 6 40 2" pathLength="100" /></svg>
      <span className="lgc-pen"><Icon name="pen" size={22} /></span>
    </div>
  );
}
function GdprScene() {
  return (
    <div className="lg-eu">
      <div className="lge-stars">{Array.from({ length: 12 }).map((_, i) => <i key={i} style={{ '--i': i }}>★</i>)}</div>
      <span className="lge-core"><Icon name="shieldCheck" size={36} /></span>
      {['Access', 'Correct', 'Erase', 'Port'].map((t, i) => <span key={t} className={`lge-right p${i}`} style={{ '--i': i }}>{t}</span>)}
    </div>
  );
}
const LEGAL_SCENES = { '/cookies': CookieScene, '/privacy': PrivacyScene, '/terms': TermsScene, '/gdpr': GdprScene };
export function LegalArt({ path }) {
  const Scene = LEGAL_SCENES[path] || PrivacyScene;
  return <LiveZone className={`art lg-art lg-${(path || '/privacy').slice(1)}`} aria-hidden="true"><Scene /></LiveZone>;
}
