// Reward payout notifications (bottom centre).
//
// PRODUCTION — shows REAL recent payouts from PUBLIC_REWARD_FEED_URL (your backend, or a JSON file you
// keep updated, e.g. /reward-feed.json). Expected JSON array:
//   [{ "firstName": "Ananya", "lastInitial": "R", "role": "Healthcare administrator", "roleType": "hcp",
//      "city": "Bengaluru", "cc": "in", "country": "India",
//      "amount": "2500", "currency": "INR", "method": "upi", "minutesAgo": 21 }]
//   roleType: hcp | caregiver | patient | consumer      method: paypal | upi | wire | amazon | report | voucher
// Only publish members who agreed to appear. Rows whose payout method is not allowed in that country
// (e.g. UPI outside India) are dropped automatically.
// Without a feed, production shows which payout methods are open in each country — no invented people.
//
// DEV + SINGLE-FILE PREVIEW — sample payouts are shown so the design can be reviewed, clearly tagged
// "Preview data". They are never used in a production build.
import { useEffect, useMemo, useRef, useState } from 'react';
import { API, PREVIEW_FORMS } from '../config/site.js';
import { COVERAGE } from '../data/countries.js';
import { methodsFor, isMethodAllowed } from '../data/rewards.js';
import { Flag, useMounted } from './ui.jsx';
import Icon from './Icon.jsx';
import { shuffle } from '../utils/helpers.js';
import { Link } from '../router.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';
import { tr, countryLabel } from '../i18n/engine.js';

const CUR = { INR: '₹', USD: '$', EUR: '€', GBP: '£', AUD: 'A$', CAD: 'C$', SGD: 'S$', AED: 'AED ', BRL: 'R$', ZAR: 'R', JPY: '¥', MXN: 'MX$', NGN: '₦', KES: 'KSh ', PHP: '₱' };
const METHOD = {
  paypal: { label: 'PayPal', icon: 'paypal' },
  upi: { label: 'UPI', icon: 'upi' },
  wire: { label: 'Wire Transfer', icon: 'bank' },
  amazon: { label: 'Amazon Gift Card', icon: 'gift' },
  report: { label: 'Medical Report', icon: 'clipboard' },
  voucher: { label: 'Shopping Voucher', icon: 'bag' },
};
const ROLE_GRAD = { hcp: ['#2457f5', '#8a4dff'], caregiver: ['#ff9f1c', '#ff4f6d'], patient: ['#00b386', '#12c2e9'], consumer: ['#ff6a2c', '#ffb020'] };

// Preview-only rows (dev server and single-file review file). UPI appears only for India.
const PREVIEW_PAYOUTS = [
  { firstName: 'Ananya', lastInitial: 'R', role: 'Healthcare administrator', roleType: 'hcp', city: 'Bengaluru', cc: 'in', country: 'India', amount: '2,500', currency: 'INR', method: 'upi', minutesAgo: 21 },
  { firstName: 'James', lastInitial: 'O', role: 'Cardiologist', roleType: 'hcp', city: 'Manchester', cc: 'gb', country: 'United Kingdom', amount: '85', currency: 'GBP', method: 'wire', minutesAgo: 6 },
  { firstName: 'Lucía', lastInitial: 'M', role: 'Family caregiver', roleType: 'caregiver', city: 'Madrid', cc: 'es', country: 'Spain', amount: '20', currency: 'EUR', method: 'amazon', minutesAgo: 14 },
  { firstName: 'Kwame', lastInitial: 'A', role: 'Registered nurse', roleType: 'hcp', city: 'Lagos', cc: 'ng', country: 'Nigeria', amount: '30', currency: 'USD', method: 'paypal', minutesAgo: 33 },
  { firstName: 'Mei', lastInitial: 'L', role: 'Patient panel member', roleType: 'patient', city: 'Singapore', cc: 'sg', country: 'Singapore', amount: '15', currency: 'SGD', method: 'paypal', minutesAgo: 9 },
  { firstName: 'Rohit', lastInitial: 'K', role: 'Clinical pharmacist', roleType: 'hcp', city: 'Pune', cc: 'in', country: 'India', amount: '1,800', currency: 'INR', method: 'upi', minutesAgo: 41 },
  { firstName: 'Sarah', lastInitial: 'T', role: 'Aged care support worker', roleType: 'caregiver', city: 'Melbourne', cc: 'au', country: 'Australia', amount: '25', currency: 'AUD', method: 'amazon', minutesAgo: 18 },
  { firstName: 'Diego', lastInitial: 'F', role: 'Patient advocate', roleType: 'patient', city: 'São Paulo', cc: 'br', country: 'Brazil', amount: '60', currency: 'BRL', method: 'paypal', minutesAgo: 27 },
  { firstName: 'Fatima', lastInitial: 'H', role: 'Physiotherapist', roleType: 'hcp', city: 'Dubai', cc: 'ae', country: 'United Arab Emirates', amount: '150', currency: 'AED', method: 'wire', minutesAgo: 52 },
  { firstName: 'Meera', lastInitial: 'S', role: 'Caregiver for her mother', roleType: 'caregiver', city: 'Chennai', cc: 'in', country: 'India', amount: '500', currency: 'INR', method: 'upi', minutesAgo: 12 },
  { firstName: 'Ethan', lastInitial: 'W', role: 'IT decision maker', roleType: 'consumer', city: 'Toronto', cc: 'ca', country: 'Canada', amount: '40', currency: 'CAD', method: 'paypal', minutesAgo: 7 },
  { firstName: 'Hana', lastInitial: 'Y', role: 'Patient experience contributor', roleType: 'patient', city: 'Osaka', cc: 'jp', country: 'Japan', amount: '2,000', currency: 'JPY', method: 'amazon', minutesAgo: 38 },
  { firstName: 'Thandi', lastInitial: 'N', role: 'Oncology nurse', roleType: 'hcp', city: 'Cape Town', cc: 'za', country: 'South Africa', amount: '400', currency: 'ZAR', method: 'wire', minutesAgo: 24 },
  { firstName: 'Lukas', lastInitial: 'B', role: 'Homemaker', roleType: 'consumer', city: 'Munich', cc: 'de', country: 'Germany', amount: '15', currency: 'EUR', method: 'report', minutesAgo: 16 },
  { firstName: 'Carlos', lastInitial: 'R', role: 'Dermatologist', roleType: 'hcp', city: 'Mexico City', cc: 'mx', country: 'Mexico', amount: '900', currency: 'MXN', method: 'paypal', minutesAgo: 47 },
  { firstName: 'Grace', lastInitial: 'M', role: 'Community health nurse', roleType: 'hcp', city: 'Nairobi', cc: 'ke', country: 'Kenya', amount: '25', currency: 'USD', method: 'paypal', minutesAgo: 29 },
];


const clean = (rows) => rows.filter((r) => r && r.cc && r.method && r.firstName && isMethodAllowed(r.method === 'voucher' ? 'amazon' : r.method, r.cc));

export default function RewardToasts() {
  useI18n(); // re-render when the language changes
  const mounted = useMounted();
  const [feed, setFeed] = useState(PREVIEW_FORMS ? clean(PREVIEW_PAYOUTS) : null);
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(false);
  const hover = useRef(false);
  const idx = useRef(0);

  useEffect(() => {
    if (!API.rewardFeed || PREVIEW_FORMS) return;
    fetch(API.rewardFeed, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : []))
      .then((rows) => Array.isArray(rows) && clean(rows).length && setFeed(clean(rows)))
      .catch(() => {});
  }, []);

  const order = useMemo(() => (mounted ? (feed ? shuffle(feed) : shuffle(COVERAGE)) : []), [mounted, feed]);

  useEffect(() => {
    if (!mounted || muted || !order.length) return;
    let t1, t2;
    const next = () => {
      if (hover.current) { t1 = setTimeout(next, 2000); return; }
      const row = order[idx.current++ % order.length];
      setCurrent(feed ? { live: true, ...row } : { live: false, cc: row.code, country: row.name, methods: methodsFor(row.code).map((m) => m.id) });
      setVisible(true);
      t2 = setTimeout(() => { setVisible(false); t1 = setTimeout(next, 11000 + Math.random() * 8000); }, 7000);
    };
    t1 = setTimeout(next, 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [mounted, order, feed, muted]);

  if (!mounted || !current || muted) return null;

  const rt = current.roleType || 'consumer';
  const [g1, g2] = ROLE_GRAD[rt] || ROLE_GRAD.consumer;
  const ini = current.live ? `${current.firstName[0]}${current.lastInitial || ''}`.toUpperCase() : '';

  const m = METHOD[current.method] || METHOD.paypal;
  return (
    <aside
      className={`rtoast rt-mini ${visible ? 'is-in' : ''}`}
      style={{ '--g1': g1, '--g2': g2 }}
      aria-live="polite"
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
    >
      <span className="rtt-av">
        {current.live ? <b>{ini}</b> : <Icon name="globe" size={18} />}
        <span className="rtt-coins" aria-hidden="true">{Array.from({ length: 5 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</span>
      </span>
      {current.live ? (
        <span className="rtt-body">
          <span className="rtt-l1"><b>{current.firstName} {current.lastInitial ? current.lastInitial + '.' : ''}</b> received <strong>{(CUR[current.currency] || '') + current.amount}</strong></span>
          <span className="rtt-l2"><span className={`rtt-m mchip-${current.method}`} title={m.label}><Icon name={m.icon} size={11} />{m.label}</span><Flag code={current.cc} name={current.country} size={14} />{current.city || current.country} · {current.minutesAgo ? `${current.minutesAgo}m ago` : 'now'}</span>
          <span className="rtt-l3">{current.role}{PREVIEW_FORMS && <em className="rtt-preview">Preview data</em>}</span>
        </span>
      ) : (
        <Link to="/rewards" className="rtt-body rtt-open">
          <span className="rtt-l1"><Flag code={current.cc} name={current.country} size={14} /> <b className="notranslate" translate="no">{tr('Rewards open in {0}').replace('{0}', countryLabel(current.cc, current.country))}</b></span>
          <span className="rtt-l2 rtt-icons">{current.methods.map((id) => <span key={id} className={`rtt-m mchip-${id}`} title={(METHOD[id] || METHOD.paypal).label}><Icon name={(METHOD[id] || METHOD.paypal).icon} size={11} /></span>)}<span className="rtt-more">How payouts work</span></span>
        </Link>
      )}
      <span className="rtt-timer" aria-hidden="true" />
      <button className="rtt-x" onClick={() => setMuted(true)} aria-label="Hide reward notifications"><Icon name="x" size={12} /></button>
    </aside>
  );
}
