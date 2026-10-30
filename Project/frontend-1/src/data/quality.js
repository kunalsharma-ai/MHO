// Quality & security checks and verification protocols (supplied by MyHealthOpinions / Frequent Research).
// Stage = where in the member journey the check runs (used by the Trust & Safety pipeline visual).
export const QUALITY_CHECKS = [
  { name: 'Double Opt-In Authentication', stage: 'join', icon: 'mail-check', note: 'Every account is confirmed from the inbox it was registered with.' },
  { name: 'CAPTCHA Security Controls', stage: 'join', icon: 'shield', note: 'Human checks at sign-up, log-in and survey entry.' },
  { name: 'Age Validation', stage: 'join', icon: 'cake', note: 'Date of birth is checked against minimum-age rules.' },
  { name: 'BOT Validation', stage: 'join', icon: 'bot', note: 'Automated traffic is filtered before it reaches a survey.' },
  { name: 'Duplicate Detection', stage: 'join', icon: 'copy', note: 'One person, one account — repeat sign-ups are blocked.' },
  { name: 'Cookie Validation', stage: 'join', icon: 'cookie', note: 'Session cookies confirm a consistent, genuine visitor.' },
  { name: 'GEO-IP Validation', stage: 'device', icon: 'pin', note: 'Your connection must match the country you registered in.' },
  { name: 'Timezone Validation', stage: 'device', icon: 'clock', note: 'Device time zone is compared with your stated location.' },
  { name: 'Browser Language', stage: 'device', icon: 'globe', note: 'Browser language is checked for consistency with your profile.' },
  { name: 'Browser Fingerprinting', stage: 'device', icon: 'fingerprint', note: 'A privacy-safe device signature stops one person posing as many.' },
  { name: 'TOR Detection', stage: 'device', icon: 'onion', note: 'Anonymising networks that hide true location are flagged.' },
  { name: 'URL Protection', stage: 'device', icon: 'link', note: 'Encrypted survey links cannot be tampered with or skipped.' },
  { name: 'Gate Survey Screening', stage: 'survey', icon: 'gate', note: 'A short gate confirms readiness before any client survey.' },
  { name: 'Pre-Screening Qualification Filters', stage: 'survey', icon: 'filter', note: 'Only members who truly fit a study are routed into it.' },
  { name: 'Screening Questions Filters', stage: 'survey', icon: 'list', note: 'Study-specific questions confirm the right audience.' },
  { name: 'Security Question Validation', stage: 'survey', icon: 'key', note: 'Account-level questions confirm the owner is present.' },
  { name: 'Red Herring Questions Controls', stage: 'survey', icon: 'fish', note: 'Attention checks catch rushed or random answering.' },
  { name: 'Open-End (OE) Quality Checks', stage: 'survey', icon: 'pen', note: 'Written answers are reviewed for effort, originality and copy-paste.' },
];

export const QUALITY_STAGES = [
  { id: 'join', label: 'At sign-up', color: '#3d5afe' },
  { id: 'device', label: 'Device & location', color: '#14b8a6' },
  { id: 'survey', label: 'Inside every survey', color: '#f59e0b' },
];

export const VERIFICATION_PROTOCOLS = [
  { name: 'Company email validation', icon: 'mail' },
  { name: 'Phone verification', icon: 'phone' },
  { name: 'Public profile cross-referencing (e.g. LinkedIn)', icon: 'linkedin' },
  { name: 'External database validation', icon: 'database' },
  { name: 'Behavioural pattern monitoring', icon: 'pulse' },
  { name: 'Backend quality audit reviews', icon: 'audit' },
];
