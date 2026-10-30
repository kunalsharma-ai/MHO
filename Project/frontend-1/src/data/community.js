// Community numbers, reward categories, professional categories and specialties.
// Numbers come from the current MyHealthOpinions website — update them here when they change
// (they appear on the home page "Trusted by thousands" section).

export const COMMUNITY_STATS = [
  { id: 'panelists', value: 31240, suffix: '+', label: 'Registered panelists', note: 'and growing every week', color: '#3d5afe', icon: 'users' },
  { id: 'incentives', value: 13890, prefix: '$', suffix: '+', label: 'Incentives this month', note: 'paid to members for their time', color: '#f59e0b', icon: 'coins' },
  { id: 'monthly', value: 44, suffix: '+', label: 'Monthly surveys', note: 'new studies opening each month', color: '#14b8a6', icon: 'calendar' },
  { id: 'completed', value: 1520, suffix: '+', label: 'Completed surveys', note: 'finished by our members', color: '#e8344e', icon: 'check' },
];

/** Reward categories per audience (shown on Home and Rewards). Availability depends on the study and country. */
/** Reward options per audience (Rewards page vending machines, Home reward wheel, Join, audience pages).
 *  Exactly the options the business offers — availability per study and country is shown in each invitation.
 *  UPI is India-only. Medical Report is offered to healthcare professionals only. */
const R = {
  gift: { id: 'gift', icon: 'card', t: 'Digital Gift Cards', d: 'Instant codes for popular stores, sent to your inbox', c: '#7c3aed' },
  shop: { id: 'shop', icon: 'bag', t: 'Shopping Vouchers', d: 'Spend it on whatever you need', c: '#ff6a2c' },
  cash: { id: 'cash', icon: 'wallet', t: 'Cash Rewards', d: 'Your points turned into real money', c: '#16a34a' },
  paypal: { id: 'paypal', icon: 'paypal', t: 'PayPal', d: 'Straight to your PayPal wallet', c: '#0070e0' },
  bank: { id: 'bank', icon: 'bank', t: 'Bank Transfer', d: 'Paid directly into your bank account', c: '#0f766e' },
  wire: { id: 'wire', icon: 'globe', t: 'Wire Transfer', d: 'International transfer to your bank, where supported', c: '#2457f5' },
  upi: { id: 'upi', icon: 'upi', t: 'UPI (India)', d: 'Instant to your UPI ID — for members in India', c: '#5f259f' },
  grocery: { id: 'grocery', icon: 'home', t: 'Grocery Vouchers', d: 'Help with the weekly shop', c: '#f59e0b' },
  report: { id: 'report', icon: 'clipboard', t: 'Medical Report', d: 'A personalised report as your reward on selected studies', c: '#db2777' },
};
const COMMON = [R.gift, R.shop, R.cash, R.paypal, R.bank, R.wire, R.upi, R.grocery];

export const REWARD_ROLES = [
  { id: 'hcp', title: 'Healthcare Professionals', short: 'Professionals', color: '#2457f5', accent: '#8a4dff', icon: 'stethoscope', line: 'Your time is clinical time. Rewards are set to respect it.', items: [...COMMON, R.report] },
  { id: 'caregiver', title: 'Caregivers', short: 'Caregivers', color: '#ff9f1c', accent: '#ff4f6d', icon: 'hands', line: 'You look after everyone else. This part is for you.', items: COMMON },
  { id: 'patient', title: 'Patients', short: 'Patients', color: '#00b386', accent: '#12c2e9', icon: 'heart', line: 'Your experience shapes better care — and it pays you back.', items: COMMON },
];

/** "Professionals we work with" — the 25+ categories listed on the current website. */
export const PRO_CATEGORIES = [
  'Nursing Specialist', 'Clinical Specialist', 'Non-Medical Specialist', 'Medical Specialist', 'Licensed Practical Nurse',
  'Nurse Practitioner', 'Nursing Assistant', 'Therapist', 'Top Level Management', 'Pharmacy Department', 'Blood Circulation',
  'Maintenance Department', 'Security Department', 'Personnel Department', 'Medical Records', 'Central Sterile Supply',
  'Purchasing Department', 'Non Professional Services', 'Dietary Specialist', 'Radiology Department', 'Operation Theatre Complex',
  'Physical Medicine & Rehabilitation', 'Paramedical Specialist', 'Technical Specialist', 'Support Specialist',
];

/** "Healthcare specialties we cover" — 10+ categories from the current website. */
export const SPECIALTIES = [
  { t: 'Cancer', icon: 'microscope', c: '#7c3aed' },
  { t: 'Allergy & Immunology', icon: 'shield', c: '#0ea5e9' },
  { t: 'Psychology', icon: 'sparkle', c: '#ec4899' },
  { t: 'Blood Circulation', icon: 'pulse', c: '#e8344e' },
  { t: 'Musculoskeletal', icon: 'users', c: '#f59e0b' },
  { t: 'Bariatric Surgery', icon: 'scalpel', c: '#14b8a6' },
  { t: 'Skin, Nails & Hair', icon: 'heart', c: '#f97316' },
  { t: 'Digestive System', icon: 'pill', c: '#10b981' },
  { t: 'Eye, Ear, Nose & Throat', icon: 'eye', c: '#3d5afe' },
  { t: 'Other Specialties', icon: 'plus', c: '#64748b' },
];
