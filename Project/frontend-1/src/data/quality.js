export const QUALITY_CHECKS = [
  { name: 'Timezone Validation', icon: 'clock', line: 'Device timezone must match your registered country.', layer: 'identity' },
  { name: 'Age Validation', icon: 'calendar', line: 'Birth-year checks keep every study age-appropriate.', layer: 'identity' },
  { name: 'BOT Validation', icon: 'bot', line: 'Automated traffic is filtered before it reaches a survey.', layer: 'device' },
  { name: 'URL Protection', icon: 'link', line: 'Signed survey links block tampering and link sharing.', layer: 'device' },
  { name: 'Browser Fingerprinting', icon: 'fingerprint', line: 'Each device is recognised to stop multi-accounting.', layer: 'device' },
  { name: 'Duplicate Detection', icon: 'duplicate', line: 'One person, one account, one response per study.', layer: 'identity' },
  { name: 'GEO-IP Validation', icon: 'pin', line: 'Location is matched to the country you registered from.', layer: 'device' },
  { name: 'CAPTCHA Security Controls', icon: 'captcha', line: 'Human checks at sign-up and survey entry.', layer: 'device' },
  { name: 'Gate Survey Screening', icon: 'gate', line: 'A short qualifier before client surveys open.', layer: 'response' },
  { name: 'Security Question Validation', icon: 'question', line: 'Account recovery and identity confirmation.', layer: 'identity' },
  { name: 'Screening Questions Filters', icon: 'filter', line: 'Only relevant surveys reach the right profile.', layer: 'response' },
  { name: 'Open-End (OE) Quality Checks', icon: 'pen', line: 'Written answers are checked for effort and originality.', layer: 'response' },
  { name: 'Red Herring Questions Controls', icon: 'eye', line: 'Attention checks catch careless clicking.', layer: 'response' },
  { name: 'Pre-Screening Qualification Filters', icon: 'layers', line: 'Eligibility is confirmed before you spend time.', layer: 'response' },
  { name: 'Double Opt-In Authentication', icon: 'doubleCheck', line: 'Email and phone confirmation activate your account.', layer: 'identity' },
  { name: 'Browser Language', icon: 'language', line: 'Language settings align with your survey language.', layer: 'device' },
  { name: 'TOR Detection', icon: 'onion', line: 'Anonymising networks and proxies are blocked.', layer: 'device' },
  { name: 'Cookie Validation', icon: 'cookie', line: 'Session integrity is verified on every visit.', layer: 'device' },
];

export const QUALITY_LAYERS = [
  { id: 'identity', name: 'Identity layer', color: '#FF8A00', line: 'Who you are' },
  { id: 'device', name: 'Device & network layer', color: '#2F6BFF', line: 'Where you connect from' },
  { id: 'response', name: 'Response layer', color: '#14C9B5', line: 'How you answer' },
];

export const VERIFICATION_PROTOCOLS = [
  { name: 'Company email validation', icon: 'mail', line: 'Work email domains are confirmed for business members.' },
  { name: 'Phone verification', icon: 'phone', line: 'One-time codes confirm a real, reachable number.' },
  { name: 'Public profile cross-referencing', icon: 'linkedin', line: 'Professional details are matched with public profiles such as LinkedIn.' },
  { name: 'External database validation', icon: 'database', line: 'Details are checked against trusted external sources.' },
  { name: 'Behavioural pattern monitoring', icon: 'activity', line: 'Speeding, straight-lining and odd patterns are flagged.' },
  { name: 'Backend quality audit reviews', icon: 'audit', line: 'Regular audits review accounts and response quality.' },
];

export const PRIVACY_PROMISES = [
  { title: 'We never sell your personal details', line: 'Your name, email, phone and address are never sold or shared with anyone else.' },
  { title: 'Answers are de-identified', line: 'Clients see research answers in anonymised or aggregated form — not who you are.' },
  { title: 'Encrypted & access-controlled', line: 'Data is protected with encryption and strict role-based access.' },
  { title: 'You stay in control', line: 'Access, correct or delete your data at any time by writing to support.' },
];
