// English source strings for the hand-written dictionaries (src/i18n/dict/<code>.js).
// Each language file exports an array in EXACTLY this order (index = key). `npm run i18n:check` verifies
// that every language has the same number of entries. Empty string / missing = falls back to the
// translation provider or English.
//
// Keys are the visible text as rendered (whitespace collapsed). A sentence that is split by inline tags
// (e.g. "Get rewarded <span>your way</span>") is one key.
// To add a string: append it at the END of this list and append its translation at the end of every file.
export const KEYS = [
  // 0–22 header & navigation
  'Home', 'About Us', 'Who It’s For', 'Healthcare professionals', 'Doctors, nurses, pharmacy, lab, admin & support',
  'Caregivers', 'Family carers, parents & home care aides', 'Patients', '195+ conditions across 20 health areas', 'Everyone else',
  'Consumers & business professionals', 'How It Works', 'Rewards', 'Trust & Safety', 'Blogs',
  'Trending', 'FAQ', 'Contact', 'Log in', 'Join free',
  'Skip to content', 'Open menu', 'Close menu',
  // 23–38 language picker
  'Choose your language', 'Every language has its own colour and sound.', 'Search languages', 'Suggested for you', 'Sound on',
  'Sound off', 'Translating the page…', 'Translate everything on this page', 'Menus and key sections are translated. Some longer text is still in English.', 'Global',
  'Asia', 'India', 'Middle East', 'Europe & Americas', 'Africa',
  'Close',
  // 39–67 home hero
  'Healthcare Professional', 'Doctors, nurses & allied health', 'Caregiver', 'Family & care support', 'Patient',
  'Share your experience', 'Choose who you are', 'Your expertise, rewarded', 'Paid surveys that respect your clinical time',
  'Fifteen minutes between clinics is enough. Tell pharma, device and health-tech teams how medicine really works on the ward, and receive an honorarium for every study you complete. Verified professionals only, so every invitation is worth opening.',
  'Honoraria for every completed study', 'Credential-verified panel', 'Fits around shifts', 'Join as a professional', 'How paid surveys work',
  'You carry the care. We carry your voice', 'Paid surveys for the people who hold it all together',
  'You know what the brochures leave out: the night checks, the pharmacy runs, the waiting rooms. Share it in short surveys whenever it suits you, and earn cash, gift cards or grocery vouchers for every one you finish.',
  'Short, flexible surveys', 'Cash, grocery & wellness rewards', 'Sensitive questions optional', 'Join as a caregiver',
  'Your story can change someone’s treatment', 'Paid surveys where your health story pays you back',
  'No clinics, no tests, no needles. Just your honest experience of living with a condition, answered from your phone, and a reward for every survey you complete. Your name never leaves our hands.',
  '₹0 / $0 to join', 'Answer from your phone', 'Your details never sold', 'Join as a patient',
  // 68–75 hero cards
  'Honorarium credited', 'Wire transfer · just now', 'Verified clinician', 'Licence checked', 'Grocery voucher',
  'Survey complete', 'Reward unlocked', 'Anonymous answers',
  // 76–101 home sections
  'Get rewarded your way', 'Online surveys for money', 'Browse a few of our paid surveys', 'Get invitations like these', 'Get paid for surveys in four steps',
  'Four stops to your first payout', 'See the full journey', 'Survey invitations', 'Never miss a survey that fits you', 'Healthcare community',
  'Professionals we work with, floor by floor', 'Areas of expertise', 'Every condition we research, head to toe', 'Member voices', 'What our community is saying',
  'All reviews and rate us', 'Global community', 'Your details are safe with us', 'Your name goes in. A code comes out.', 'See all 18 quality checks',
  'Trending topics', 'Popular searches, honestly answered', 'Quick answers', 'Questions before you join?', 'All FAQs',
  'Paid online surveys in 55 countries',
  // 102–129 footer
  'Your experience already has value. Start collecting it.',
  'Free to join. No investment, ever. Rewards land through PayPal, Wire Transfer or Amazon Gift Cards — and UPI if you live in India.',
  'Create free account',
  'A healthcare research community where doctors, nurses, caregivers and patients get paid for honest opinions — and help shape better care while they are at it.',
  'Platform', 'Member Reviews', 'Healthcare Professionals', 'Consumers & Everyone', '55 Countries',
  'Blogs & Guides', 'Help & Legal', 'Contact & Support', 'Privacy Policy', 'Cookie Policy',
  'Terms of Use', 'GDPR Compliance', 'Profiling & Quality Score', 'Reach us', 'Powered by',
  'Certified & affiliated', 'Quality management', 'Information security', 'Market research standard', 'Member, global research body',
  'Registered with Govt. of India', 'All rights reserved.', 'Sitemap', 'Cookie settings',
  // 130–135 cookie banner
  'Cookies, the healthy kind',
  'Essential cookies keep you signed in and secure. With your permission we also use analytics cookies to improve the site.',
  'Allow analytics cookies', 'Essential only', 'Accept all', 'Save choices',
  // 136–154 home hero scenes (monitor, care jar, gift box)
  "Live study", "Cardiology · {0} min", "Honoraria earned", "Studies", "Status", "Paid", "Honorarium", "+${0} credited", "CME credit", "Wellness", "Cash reward", "This week", "{0} short surveys · ₹{1}", "Caring for Dad", "{0}-minute survey", "Living with type {0} diabetes", "Amazon Gift Card", "My rewards", "UPI · India",
];
