import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import useInView from '../hooks/useInView.js';

// "People search, we answer" — a typewriter search bar cycling through high-volume queries,
// each linked to the guide that answers it honestly (natural keyword placement + internal links).
const QUERIES = [
  { q: 'how to earn money online', a: 'A step-by-step beginner’s guide to paid surveys.', to: '/blog/how-to-earn-money-online-with-surveys', icon: 'book' },
  { q: 'online earning without investment', a: 'Zero-cost options compared — and the scams to avoid.', to: '/blog/earn-money-online-without-investment', icon: 'shield' },
  { q: 'paid surveys for cash', a: 'How survey points become PayPal, UPI or bank cash.', to: '/blog/earn-money-online-cash-payouts', icon: 'coins' },
  { q: 'online surveys for money', a: 'What makes the best paid online surveys worth your time.', to: '/how-it-works', icon: 'clipboard' },
  { q: 'ways to make money from home', a: 'Side hustles from home that need no setup or fees.', to: '/blog/make-money-online-from-home', icon: 'heart' },
  { q: 'make money from your phone', a: 'Earn on mobile — no app download, no risky permissions.', to: '/blog/earn-money-online-on-mobile', icon: 'mobile' },
  { q: 'legit survey sites', a: 'The checklist that separates real surveys from scams.', to: '/blog/legit-survey-sites-spot-scams', icon: 'badge' },
  { q: 'surveys for amazon gift cards', a: 'PayPal vs UPI vs gift cards — which payout suits you.', to: '/blog/survey-rewards-paypal-upi-gift-cards', icon: 'gift' },
  { q: 'earn money online for students', a: 'Flexible online earning that fits around classes.', to: '/blog/online-earning-for-students-without-investment', icon: 'user' },
  { q: 'earn dollars online', a: 'International studies with dollar-valued rewards.', to: '/blog/earn-dollars-online-without-investment', icon: 'globe' },
  { q: 'get paid for your opinion', a: 'Why companies reward honest opinions.', to: '/blog/why-companies-pay-for-your-opinion', icon: 'chat' },
  { q: 'high paying surveys for professionals', a: 'B2B research for managers, engineers and doctors.', to: '/paid-surveys-for-professionals', icon: 'briefcase' },
];

export default function SearchShowcase() {
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState(QUERIES[0].q);
  const [paused, setPaused] = useState(false);
  const [vref, visible] = useInView({ once: false, threshold: 0, rootMargin: '100px 0px' });

  useEffect(() => {
    if (paused || !visible) return undefined; // pause on hover and while off-screen
    const t = setTimeout(() => setI((x) => (x + 1) % QUERIES.length), 3600);
    return () => clearTimeout(t);
  }, [i, paused, visible]);

  useEffect(() => {
    const full = QUERIES[i].q;
    let n = 0;
    setTyped('');
    const t = setInterval(() => {
      n += 1;
      setTyped(full.slice(0, n));
      if (n >= full.length) clearInterval(t);
    }, 38);
    return () => clearInterval(t);
  }, [i]);

  const cur = QUERIES[i];
  return (
    <section ref={vref} className="section searchshow" aria-labelledby="ss-title">
      <div className="container">
        <div className="ss-head reveal">
          <p className="eyebrow">People search. We answer.</p>
          <h2 id="ss-title">Honest answers to the internet’s biggest <span className="hl-orange">money questions</span></h2>
        </div>
        <div className="ss-bar reveal" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Icon name="audit" size={22} />
          <span className="ss-typed" aria-live="off">{typed}<i className="ss-caret" /></span>
          <Link to={cur.to} className="ss-go">Read the answer <Icon name="arrow" size={16} /></Link>
        </div>
        <ul className="ss-grid">
          {QUERIES.map((x, k) => (
            <li key={x.q} className={k === i ? 'on' : ''} onMouseEnter={() => { setPaused(true); setI(k); }} onMouseLeave={() => setPaused(false)}>
              <Link to={x.to}>
                <span className="ss-ico"><Icon name={x.icon} size={18} /></span>
                <strong>{x.q.charAt(0).toUpperCase() + x.q.slice(1)}</strong>
                <small>{x.a}</small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
