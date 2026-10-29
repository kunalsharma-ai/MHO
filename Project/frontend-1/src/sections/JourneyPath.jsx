import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';

export const STEPS = [
  { icon: 'user', t: 'Join free', d: 'Email, phone, country and date of birth — that’s it.' },
  { icon: 'doubleCheck', t: 'Verify', d: 'Confirm your email and phone with one tap.' },
  { icon: 'layers', t: 'Build your profile', d: 'Profile surveys unlock matched invitations.' },
  { icon: 'mail', t: 'Get invited', d: 'Dashboard, SMS, WhatsApp or email alerts.' },
  { icon: 'gift', t: 'Get rewarded', d: 'Claim via PayPal, wire or gift card — plus UPI in India.' },
];

// Animated "journey" — a token travels a winding path through five stations.
export default function JourneyPath({ compact = false }) {
  return (
    <section className={`section journey ${compact ? 'is-compact' : ''}`} aria-labelledby="journey-title">
      <div className="container">
        <div className="journey-head reveal">
          <p className="eyebrow eyebrow-light">How it works</p>
          <h2 id="journey-title">From “hello” to <span className="grad-text">“reward received”</span></h2>
          <p className="muted-light">Five simple stops. Follow the token.</p>
        </div>
        <div className="journey-map reveal">
          <svg className="journey-svg" viewBox="0 0 1000 220" aria-hidden="true">
            <defs>
              <linearGradient id="jg" x1="0" x2="1">
                <stop offset="0" stopColor="#FF8A00" />
                <stop offset="0.5" stopColor="#FFC233" />
                <stop offset="1" stopColor="#14C9B5" />
              </linearGradient>
            </defs>
            <path id="jpath" d="M20 150 C 140 20, 220 20, 260 110 S 420 200, 500 110 S 660 20, 740 110 S 900 200, 980 70" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="14" strokeLinecap="round" />
            <path d="M20 150 C 140 20, 220 20, 260 110 S 420 200, 500 110 S 660 20, 740 110 S 900 200, 980 70" fill="none" stroke="url(#jg)" strokeWidth="4" strokeDasharray="10 14" className="journey-dash" strokeLinecap="round" />
            <g className="journey-token">
              <circle r="14" fill="#FFC233" />
              <circle r="24" fill="rgba(255,194,51,.25)" />
              <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
                <mpath href="#jpath" />
              </animateMotion>
            </g>
          </svg>
          <ol className="journey-stops">
            {STEPS.map((s, i) => (
              <li key={s.t} className="stop" style={{ '--i': i }}>
                <span className="stop-n">{i + 1}</span>
                <span className="stop-ico"><Icon name={s.icon} size={26} /></span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
        {!compact ? (
          <div className="journey-cta reveal">
            <Link to="/how-it-works" className="btn btn-glass">Explore the full journey <Icon name="arrow" size={18} /></Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
