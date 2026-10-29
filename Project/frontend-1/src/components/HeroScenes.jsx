import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { BRAND } from '../data/site.js';

// One distinct, animated hero scene per page — no two pages share a visual idea.
// Everything is HTML/CSS/SVG (transform/opacity animations only), decorative (aria-hidden by PageHero),
// paused off-screen by the global [data-off] rule and frozen for prefers-reduced-motion.

/* About — "Origin stack": Frequent Research → MyFrequentRewards → You, linked by a light beam */
export function OriginScene() {
  return (
    <div className="sc sc-origin">
      <span className="og-beam"><i /></span>
      <div className="og-card c1">
        <img src="/images/brand/frequent-research-monogram.webp" alt="" width="46" height="48" />
        <div><b>Frequent Research</b><small>ISO 20252 · 9001 · 27001</small></div>
      </div>
      <div className="og-card c2">
        <img src={BRAND.monogram} alt="" width="46" height="46" />
        <div><b>MyFrequentRewards</b><small>Global opinion community</small></div>
      </div>
      <div className="og-card c3">
        <span className="og-you"><Icon name="user" size={22} /></span>
        <div><b>You</b><small>Voice → Value → Rewards</small></div>
      </div>
      <span className="og-chip k1"><Icon name="globe" size={14} /> 5 regions</span>
      <span className="og-chip k2"><Icon name="briefcase" size={14} /> B2B + consumers</span>
      <span className="og-chip k3"><Icon name="shield" size={14} /> Data never sold</span>
    </div>
  );
}

/* Consumers — "Topic phone": survey topics flip through a 3D phone while rewards pop out */
const TOPICS = [
  { t: 'Shopping habits', icon: 'gift', c: '#FF8A00' },
  { t: 'Gaming & apps', icon: 'mobile', c: '#8B5CF6' },
  { t: 'Food & lifestyle', icon: 'heart', c: '#FF5E7E' },
  { t: 'Travel plans', icon: 'globe', c: '#14C9B5' },
  { t: 'Entertainment', icon: 'star', c: '#2F6BFF' },
];
export function PhoneScene() {
  return (
    <div className="sc sc-phone">
      <div className="ph3">
        <span className="ph3-notch" />
        <p className="ph3-head">For you today</p>
        <div className="ph3-stack">
          {TOPICS.map((x, k) => (
            <div className="ph3-card" key={x.t} style={{ '--k': k, '--c': x.c }}>
              <span className="ph3-ico"><Icon name={x.icon} size={18} /></span>
              <b>{x.t}</b>
              <small>~10 min · rewarded</small>
            </div>
          ))}
        </div>
        <span className="ph3-btn">Start survey</span>
      </div>
      <span className="ph3-toast"><Icon name="coins" size={16} /> Reward added</span>
      {[0, 1, 2, 3].map((k) => <span key={k} className="ph3-coin" style={{ '--k': k }}>★</span>)}
      {[['Shopping', '-24px', '40px'], ['Gaming', '-40px', '150px'], ['Food', '-14px', '270px'], ['Travel', '316px', '170px'], ['Beauty', '300px', '262px'], ['Pets', '290px', '8px']].map(([t, x, y], k) => (
        <span key={t} className="ph3-tag" style={{ '--k': k, left: x, top: y }}>{t}</span>
      ))}
    </div>
  );
}

/* Professionals — "Executive dashboard": live B2B study panel with growing bars and orbiting roles */
export function DashboardScene() {
  return (
    <div className="sc sc-dash">
      <div className="db">
        <div className="db-top"><span className="db-dot" /><span className="db-dot" /><span className="db-dot" /><b>B2B study · IT decision makers</b></div>
        <div className="db-kpis">
          <span><small>Length</small><b>20 min</b></span>
          <span><small>Match</small><b>98%</b></span>
          <span className="hot"><small>Reward</small><b>High</b></span>
        </div>
        <div className="db-bars">{[46, 72, 58, 88, 66, 94].map((h, k) => <i key={k} style={{ '--h': `${h}%`, '--k': k }} />)}</div>
        <svg className="db-line" viewBox="0 0 200 60" preserveAspectRatio="none"><path d="M0 50 C 30 44 40 30 70 32 S 120 12 150 16 S 185 4 200 6" /></svg>
      </div>
      <span className="db-stamp"><Icon name="check" size={16} stroke={3} /> Credentials verified</span>
      <div className="db-orbit">
        {['CXO', 'IT Manager', 'HR Head', 'Doctor', 'Engineer', 'Finance'].map((r, k) => <span key={r} style={{ '--k': k }}><i>{r}</i></span>)}
      </div>
    </div>
  );
}

/* Who can join — "People orbit": a living globe circled by every kind of member */
const PEOPLE = [
  { t: 'Students', i: 'ST', c: '#8B5CF6' }, { t: 'Parents', i: 'PA', c: '#FF5E7E' }, { t: 'Gamers', i: 'GM', c: '#14C9B5' },
  { t: 'CXOs', i: 'CX', c: '#2F6BFF' }, { t: 'Doctors', i: 'DR', c: '#22C55E' }, { t: 'Engineers', i: 'EN', c: '#FF8A00' },
  { t: 'Retirees', i: 'RT', c: '#E5A100' }, { t: 'Shoppers', i: 'SH', c: '#E8457A' },
];
export function PeopleScene() {
  return (
    <div className="sc sc-people">
      <div className="pp-globe"><span className="pp-lat" /><span className="pp-lon" /><span className="pp-lon l2" /><span className="pp-shine" /></div>
      <div className="pp-ring r1">{PEOPLE.slice(0, 4).map((p, k) => <span key={p.t} className="pp-av" style={{ '--k': k, '--n': 4, '--c': p.c }}><span className="pp-in"><b>{p.i}</b><small>{p.t}</small></span></span>)}</div>
      <div className="pp-ring r2">{PEOPLE.slice(4).map((p, k) => <span key={p.t} className="pp-av" style={{ '--k': k, '--n': 4, '--c': p.c }}><span className="pp-in"><b>{p.i}</b><small>{p.t}</small></span></span>)}</div>
    </div>
  );
}

/* How it works — "Journey track": a coin travels a curved route, lighting each step as it passes */
const STEPS = [
  { t: 'Join free', icon: 'user' },
  { t: 'Build profile', icon: 'layers' },
  { t: 'Get invited', icon: 'mail' },
  { t: 'Share opinion', icon: 'clipboard' },
  { t: 'Get rewarded', icon: 'gift' },
];
export function JourneyScene() {
  return (
    <div className="sc sc-journey">
      <svg className="jr-path" viewBox="0 0 380 380">
        <path d="M50 330 C 150 330 120 260 190 260 S 310 210 260 180 S 130 130 180 100 S 270 50 330 50" />
      </svg>
      <span className="jr-coin">★</span>
      {STEPS.map((s, k) => (
        <span key={s.t} className={`jr-node n${k}`} style={{ '--t': [0, 0.29, 0.49, 0.7, 0.98][k] }}>
          <i><Icon name={s.icon} size={18} /></i>
          <small>{k + 1}. {s.t}</small>
        </span>
      ))}
    </div>
  );
}

/* Rewards — "Claim meter": balance ring fills to the threshold, then payout cards fan out */
const PAY = [
  { t: 'PayPal', icon: 'paypal', c: '#003087' },
  { t: 'UPI', icon: 'upi', c: '#097939', tag: 'India' },
  { t: 'Wire', icon: 'bank', c: '#0B1E5B' },
  { t: 'Amazon', icon: 'gift', c: '#232F3E' },
];
export function VaultScene() {
  return (
    <div className="sc sc-vault">
      <div className="vt-ring">
        <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" className="vt-track" /><circle cx="60" cy="60" r="50" className="vt-fill" /></svg>
        <div className="vt-core"><small>Balance</small><b>Ready</b><span>Redeem now</span></div>
      </div>
      {PAY.map((p, k) => (
        <span key={p.t} className="vt-card" style={{ '--k': k, '--c': p.c }}>
          <Icon name={p.icon} size={18} /> {p.t}{p.tag ? <em>{p.tag}</em> : null}
        </span>
      ))}
      {[0, 1, 2, 3, 4].map((k) => <span key={k} className="vt-coin" style={{ '--k': k }}>★</span>)}
    </div>
  );
}

/* Quality — "Integrity scanner": radar sweeps a shield while checks tick off one by one */
export function ScannerScene() {
  const checks = ['VPN / proxy blocked', 'Duplicate check', 'Attention check', 'Speed check', 'Device fingerprint'];
  return (
    <div className="sc sc-scan">
      <div className="sn-radar"><span className="sn-sweep" /><span className="sn-ring r1" /><span className="sn-ring r2" /><span className="sn-ring r3" /></div>
      <div className="sn-shield"><Icon name="shield" size={64} stroke={1.4} /><span className="sn-line" /></div>
      <ul className="sn-list">
        {checks.map((c, k) => <li key={c} style={{ '--k': k }}><i><Icon name="check" size={12} stroke={3} /></i>{c}</li>)}
      </ul>
      {[0, 1, 2].map((k) => <span key={k} className="sn-blip" style={{ '--k': k }} />)}
    </div>
  );
}

/* FAQ — "Answer machine": questions type themselves and get answered, on a loop */
const QA = [
  ['Is it really free?', 'Yes — 100% free, always.'],
  ['When do I get paid?', 'After verification, 2–3 weeks.'],
  ['Is my data safe?', 'Never sold or shared.'],
];
export function AnswerScene() {
  return (
    <div className="sc sc-answer">
      <span className="an-q3d">?</span>
      <div className="an-win">
        <div className="an-head"><span /> Help centre</div>
        {QA.map(([q, a], k) => (
          <div className="an-pair" key={q} style={{ '--k': k }}>
            <p className="an-q">{q}</p>
            <p className="an-dots"><i /><i /><i /></p>
            <p className="an-a"><Icon name="check" size={14} stroke={3} /> {a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Contact — "Support hub": live New Delhi clock + channels orbiting a pulsing headset */
export function SupportScene() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata', hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="sc sc-support">
      <div className="sp-core"><span className="sp-pulse" /><span className="sp-pulse p2" /><Icon name="headset" size={44} /></div>
      <div className="sp-orbit">
        {[['chat', '#FF8A00'], ['whatsapp', '#25D366'], ['mail', '#2F6BFF'], ['phone', '#8B5CF6']].map(([ic, c], k) => (
          <span key={ic} style={{ '--k': k, '--c': c }}><i><Icon name={ic} size={20} /></i></span>
        ))}
      </div>
      <div className="sp-clock"><small>New Delhi (IST)</small><b>{now || '--:--:--'}</b><span><i /> Live Help online</span></div>
    </div>
  );
}

/* Blogs — "Cover wall": three columns of real covers drifting at different speeds */
export function CoverWall({ posts = [] }) {
  const cols = [0, 1, 2].map((c) => posts.filter((_, i) => i % 3 === c));
  return (
    <div className="sc sc-wall">
      {cols.map((col, c) => (
        <div className={`cw-col c${c}`} key={c}>
          <div className="cw-track">
            {[...col, ...col].map((b, i) => <img key={b.slug + i} src={b.cover} alt="" width="200" height="113" loading="lazy" />)}
          </div>
        </div>
      ))}
      <span className="cw-badge"><Icon name="trend" size={14} /> {posts.length}+ honest guides</span>
    </div>
  );
}
