// Payout methods. UPI is an India-only rail (NPCI) and must never be offered outside India.
export const PAYMENT_METHODS = [
  { id: 'paypal', name: 'PayPal', color: '#003087', accent: '#009cde', blurb: 'Straight to your PayPal wallet in most countries.' },
  { id: 'upi', name: 'UPI', color: '#5f259f', accent: '#ff7909', blurb: 'Instant bank-to-bank transfer for members in India.', countries: ['in'] },
  { id: 'wire', name: 'Wire Transfer', color: '#0f766e', accent: '#14b8a6', blurb: 'Direct to your bank account, where supported.' },
  { id: 'amazon', name: 'Amazon Gift Card', color: '#232f3e', accent: '#ff9900', blurb: 'A digital gift card code sent to your inbox.' },
  { id: 'report', name: 'Medical Report', color: '#9d174d', accent: '#f472b6', blurb: 'A personalised health report as your reward on selected studies.' },
];

/** Methods available for a country (ISO2). UPI only for India. */
export function methodsFor(countryCode = '') {
  const cc = countryCode.toLowerCase();
  return PAYMENT_METHODS.filter((m) => !m.countries || m.countries.includes(cc));
}

export const isMethodAllowed = (methodId, countryCode) => methodsFor(countryCode).some((m) => m.id === methodId);

export const NOTIFY_CHANNELS = [
  { id: 'dashboard', name: 'Account Dashboard', blurb: 'Track surveys and rewards anytime.' },
  { id: 'sms', name: 'SMS', blurb: 'Instant survey alerts on your phone.' },
  { id: 'whatsapp', name: 'WhatsApp', blurb: 'Invitations straight to your chats.' },
  { id: 'email', name: 'Email', blurb: 'Detailed invitations in your inbox.' },
];
