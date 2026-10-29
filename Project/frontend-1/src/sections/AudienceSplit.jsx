import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';

const SIDES = [
  {
    id: 'c',
    tag: 'For consumers',
    title: 'Your everyday life is expertise.',
    line: 'What you buy, watch, drive, eat and play shapes the next generation of products.',
    chips: ['Shopping', 'Food & drinks', 'Tech & apps', 'Travel', 'Gaming', 'Beauty', 'Pets', 'Finance'],
    to: '/paid-surveys-for-consumers',
    cta: 'Earn as a consumer',
    icon: 'user',
  },
  {
    id: 'b',
    tag: 'For professionals',
    title: 'Your work knowledge is rare.',
    line: 'CXOs, managers, engineers, clinicians and founders earn for expert B2B opinions.',
    chips: ['C-suite', 'IT decision-makers', 'Healthcare', 'Manufacturing', 'Finance', 'HR', 'Procurement', 'Public sector'],
    to: '/paid-surveys-for-professionals',
    cta: 'Earn as a professional',
    icon: 'briefcase',
  },
];

export default function AudienceSplit() {
  const [active, setActive] = useState('c');
  return (
    <section className="section split" aria-labelledby="split-title">
      <div className="container">
        <div className="split-head reveal">
          <p className="eyebrow">Two ways to earn</p>
          <h2 id="split-title">Who are you <em>today?</em></h2>
        </div>
        <div className="split-stage">
          {SIDES.map((s) => (
            <article
              key={s.id}
              className={`split-panel sp-${s.id} ${active === s.id ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(s.id)}
              onFocus={() => setActive(s.id)}
            >
              <div className="sp-glow" aria-hidden="true" />
              <span className="sp-tag"><Icon name={s.icon} size={16} /> {s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.line}</p>
              <ul className="sp-chips">
                {s.chips.map((c, i) => <li key={c} style={{ '--i': i }}>{c}</li>)}
              </ul>
              <Link to={s.to} className="sp-cta">{s.cta} <Icon name="arrow" size={18} /></Link>
              <div className="sp-big" aria-hidden="true"><Icon name={s.icon} size={180} stroke={0.8} /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
