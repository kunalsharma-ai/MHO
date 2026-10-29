// PREVIEW-ONLY reward activity used when VITE_DEMO_MODE=true (single-file HTML preview).
// These entries are NOT real members and are shown with a visible "Preview data" label.
// Production builds never import this file: they read the real, consented feed from
// VITE_ACTIVITY_FEED_URL (see README → Activity feed contract).

const NAMES = ['Aarav S.', 'Priya K.', 'Lucas M.', 'Sofia R.', 'Kenji T.', 'Amara O.', 'Diego F.', 'Hannah W.', 'Omar A.', 'Mei L.', 'Rahul V.', 'Chloé D.', 'Isabela C.', 'Liam O.', 'Fatima Z.', 'Nguyen H.', 'Ananya P.', 'Jonas B.', 'Ama K.', 'Sara N.'];
const PLACES = ['Mumbai, India', 'Berlin, Germany', 'São Paulo, Brazil', 'Toronto, Canada', 'Tokyo, Japan', 'Lagos, Nigeria', 'Madrid, Spain', 'Dubai, UAE', 'Manila, Philippines', 'London, UK', 'Bengaluru, India', 'Paris, France', 'Bogotá, Colombia', 'Sydney, Australia', 'Nairobi, Kenya', 'Hanoi, Vietnam', 'Delhi, India', 'Warsaw, Poland', 'Johannesburg, South Africa', 'Mexico City, Mexico'];
const ROLES = [
  { role: 'College student', seg: 'consumer' },
  { role: 'Homemaker', seg: 'consumer' },
  { role: 'IT Manager', seg: 'business' },
  { role: 'Mobile gamer', seg: 'consumer' },
  { role: 'Procurement Head', seg: 'business' },
  { role: 'Parent of two', seg: 'consumer' },
  { role: 'Doctor', seg: 'business' },
  { role: 'Retiree', seg: 'consumer' },
  { role: 'Small business owner', seg: 'business' },
  { role: 'Software Developer', seg: 'business' },
  { role: 'EV owner', seg: 'consumer' },
  { role: 'HR Director', seg: 'business' },
];
// Country-aware: members in India may be paid by UPI, PayPal, wire transfer or Amazon gift card (₹ amounts);
// members elsewhere by PayPal, wire transfer or Amazon gift card only — never UPI.
const REWARDS_IN = [
  { amount: '₹450', method: 'UPI' },
  { amount: '₹800', method: 'PayPal' },
  { amount: '₹1,200', method: 'UPI' },
  { amount: '₹1,500', method: 'Wire Transfer' },
  { amount: '₹500', method: 'Amazon Gift Card' },
];
const REWARDS_GLOBAL = [
  { amount: '$5', method: 'PayPal' },
  { amount: '$15', method: 'Amazon Gift Card' },
  { amount: '$8', method: 'PayPal' },
  { amount: '$25', method: 'Wire Transfer' },
  { amount: '$12', method: 'PayPal' },
  { amount: '$10', method: 'Amazon Gift Card' },
];

export function previewActivity(n = 24) {
  const out = [];
  const seen = { in: 0, gl: 0 };
  for (let i = 0; i < n; i++) {
    const r = ROLES[(i * 5) % ROLES.length];
    const place = PLACES[(i * 3) % PLACES.length];
    const pool = /India$/.test(place) ? REWARDS_IN : REWARDS_GLOBAL;
    out.push({
      name: NAMES[(i * 7) % NAMES.length],
      place,
      role: r.role,
      segment: r.seg,
      ...(pool === REWARDS_IN ? pool[seen.in++ % pool.length] : pool[seen.gl++ % pool.length]),
      ago: `${(i % 9) + 1} min ago`,
    });
  }
  return out;
}
