// Scan & Connect: every official channel of MyHealthOpinions, its sister panels, Frequent Research and
// Sampledge. Links copied from the Frequent Research website (QR & Connect page, build 82.3, Nov 2026).
// QR codes are generated from these URLs by `npm run qr:connect` (scripts/generate-connect-qr.mjs) into
// connectQr.generated.js. Re-run it whenever a URL here changes.
import { SITE } from '../config/site.js';

export const WHATSAPP = 'https://wa.me/918178200573';

// Brand colours per network (c1 → c2 gradient).
export const NET = {
  youtube: ['#FF0000', '#FF7A59'],
  instagram: ['#FF0069', '#FFB547'],
  linkedin: ['#0A66C2', '#38A3FF'],
  facebook: ['#0866FF', '#6FA8FF'],
  whatsapp: ['#0E9F4E', '#7CF5A6'],
  threads: ['#101010', '#6B6B6B'],
  xsocial: ['#14171A', '#5B6B7A'],
  pinterest: ['#BD081C', '#FF5A6E'],
  web: ['#2F6BFF', '#7B4DFF'],
  star: ['#EA4335', '#FBBC05'],
  grid: ['#7C4DFF', '#2EE6A6'],
};

const xUrl = SITE.socials.find((s) => s.id === 'xsocial');

/** MyHealthOpinions' own channels (the hero cube and the first section). */
export const MHO_CHANNELS = [
  { k: 'web', name: 'Website', handle: 'myhealthopinions.com', url: 'https://www.myhealthopinions.com/', line: 'Join free and take your first study' },
  { k: 'youtube', name: 'YouTube', handle: '@MyHealthOpinions', url: 'https://www.youtube.com/@MyHealthOpinions', line: 'Explainers, member stories and how-tos' },
  { k: 'instagram', name: 'Instagram', handle: '@myhealthopinions', url: 'https://www.instagram.com/myhealthopinions/', line: 'Reels, health facts and community moments' },
  { k: 'linkedin', name: 'LinkedIn', handle: 'company/myhealthopinions', url: 'https://www.linkedin.com/company/myhealthopinions/posts/?feedView=all', line: 'Research news for healthcare professionals' },
  { k: 'facebook', name: 'Facebook', handle: 'myhealthopinions', url: 'https://www.facebook.com/myhealthopinions/', line: 'Announcements, rewards and member updates' },
  ...(xUrl ? [{ k: 'xsocial', name: 'X', handle: xUrl.handle, url: xUrl.url, line: 'Quick updates and new studies' }] : []),
  { k: 'whatsapp', name: 'WhatsApp support', handle: '+91 81782 00573', url: WHATSAPP, line: 'Chat with our support team' },
];

/** The three Frequent Research panels. */
export const PANELS = [
  {
    id: 'mho', name: 'MyHealthOpinions', who: 'Healthcare professionals, caregivers and patients', tag: 'Your experience can improve healthcare.',
    c1: '#E5484D', c2: '#FF9F43', c0: '#3A0B12', site: 'https://www.myhealthopinions.com/', icon: 'heart',
    links: [
      { k: 'youtube', name: 'YouTube', handle: '@MyHealthOpinions', url: 'https://www.youtube.com/@MyHealthOpinions' },
      { k: 'instagram', name: 'Instagram', handle: '@myhealthopinions', url: 'https://www.instagram.com/myhealthopinions/' },
      { k: 'linkedin', name: 'LinkedIn', handle: 'company/myhealthopinions', url: 'https://www.linkedin.com/company/myhealthopinions/posts/?feedView=all' },
      { k: 'facebook', name: 'Facebook', handle: 'myhealthopinions', url: 'https://www.facebook.com/myhealthopinions/' },
      { k: 'whatsapp', name: 'WhatsApp support', handle: '+91 81782 00573', url: WHATSAPP },
    ],
  },
  {
    id: 't2o', name: 'Turn2Opinion', who: 'Consumers and business professionals', tag: 'Turn your opinion into rewards.',
    c1: '#1E5BFF', c2: '#22D3EE', c0: '#071A4A', site: 'https://www.turn2opinion.com/', icon: 'chat',
    links: [
      { k: 'youtube', name: 'YouTube', handle: '@Turn2Opinion', url: 'https://www.youtube.com/@Turn2Opinion' },
      { k: 'instagram', name: 'Instagram', handle: '@turn2opinion', url: 'https://www.instagram.com/turn2opinion/' },
      { k: 'linkedin', name: 'LinkedIn', handle: 'company/turn2opinionpanel', url: 'https://www.linkedin.com/company/turn2opinionpanel' },
      { k: 'facebook', name: 'Facebook', handle: 'tryturn2opinion', url: 'https://www.facebook.com/tryturn2opinion' },
      { k: 'whatsapp', name: 'WhatsApp support', handle: '+91 81782 00573', url: WHATSAPP },
    ],
  },
  {
    id: 'mfr', name: 'MyFrequentRewards', who: 'Consumers and business professionals', tag: 'Share your views. Earn every time.',
    c1: '#F59E0B', c2: '#F0457E', c0: '#3A1A03', site: 'https://www.myfrequentrewards.com/', icon: 'gift',
    links: [
      { k: 'youtube', name: 'YouTube', handle: '@MyFrequentRewards', url: 'https://www.youtube.com/@MyFrequentRewards' },
      { k: 'instagram', name: 'Instagram', handle: '@myfrequentrewards', url: 'https://www.instagram.com/myfrequentrewards/' },
      { k: 'linkedin', name: 'LinkedIn', handle: 'company/myfrequentrewards', url: 'https://www.linkedin.com/company/myfrequentrewards/' },
      { k: 'facebook', name: 'Facebook', handle: 'myfrequentreswards', url: 'https://www.facebook.com/myfrequentreswards/' },
      { k: 'whatsapp', name: 'WhatsApp support', handle: '+91 81782 00573', url: WHATSAPP },
    ],
  },
];

/** Frequent Research, the company behind the panels. */
export const COMPANY = {
  name: 'Frequent Research',
  site: 'https://www.frequentresearch.com/',
  links: [
    { k: 'linkedin', name: 'LinkedIn', handle: 'frequentresearch', url: 'https://www.linkedin.com/company/frequentresearch', line: 'Company news, insights and hiring' },
    { k: 'youtube', name: 'YouTube', handle: '@frequentresearch', url: 'https://www.youtube.com/@frequentresearch', line: 'Explainers and behind the scenes' },
    { k: 'facebook', name: 'Facebook', handle: 'FrequentResearchFieldwork', url: 'https://www.facebook.com/FrequentResearchFieldwork', line: 'Updates, events and celebrations' },
    { k: 'instagram', name: 'Instagram', handle: '@frequentresearchfield', url: 'https://www.instagram.com/frequentresearchfield', line: 'Team moments and stories' },
    { k: 'threads', name: 'Threads', handle: '@frequentresearchfield', url: 'https://www.threads.com/@frequentresearchfield', line: 'Conversations and quick updates' },
    { k: 'xsocial', name: 'X', handle: '@frequentrfs', url: 'https://x.com/frequentrfs', line: 'Quick takes and announcements' },
    { k: 'pinterest', name: 'Pinterest', handle: 'Frequent Research', url: 'https://pin.it/1ApfR1BQk', line: 'Research visuals and ideas' },
  ],
  extras: [
    { k: 'whatsapp', name: 'WhatsApp', handle: 'Chat with the Frequent Research team', url: WHATSAPP, cta: 'Start a chat' },
    { k: 'star', name: 'Google', handle: 'Find us and leave a review', url: 'https://share.google/Q2u2ukm6YPPESkJTb', cta: 'Open on Google' },
    { k: 'grid', name: 'All our panels', handle: 'panels.frequentresearch.com', url: 'https://panels.frequentresearch.com/', cta: 'Open the panel hub' },
  ],
};

/** Sampledge, the project and sample management DIY tool by Frequent Research. */
export const SAMPLEDGE = {
  name: 'Sampledge',
  what: 'Project & sample management DIY tool',
  links: [
    { k: 'web', name: 'Website', handle: 'sampledge.com', url: 'https://www.sampledge.com/' },
    { k: 'youtube', name: 'YouTube', handle: '@Sampledge_DIY_Marketplace', url: 'https://www.youtube.com/@Sampledge_DIY_Marketplace' },
    { k: 'instagram', name: 'Instagram', handle: '@sampledge_diy', url: 'https://www.instagram.com/sampledge_diy/' },
    { k: 'threads', name: 'Threads', handle: '@sampledge_diy', url: 'https://www.threads.com/@sampledge_diy' },
    { k: 'xsocial', name: 'X', handle: '@SampledgeX', url: 'https://x.com/SampledgeX' },
    { k: 'linkedin', name: 'LinkedIn', handle: 'company/sampledge-diy-marketplace', url: 'https://www.linkedin.com/company/sampledge-diy-marketplace' },
    { k: 'facebook', name: 'Facebook', handle: 'Sampledge', url: 'https://www.facebook.com/people/Sampledge/61594616326502/' },
    { k: 'whatsapp', name: 'WhatsApp support', handle: '+91 81782 00573', url: WHATSAPP },
  ],
};

/** Every URL that needs a QR code (read by scripts/generate-connect-qr.mjs). */
export const ALL_QR_URLS = [
  ...MHO_CHANNELS.map((l) => l.url),
  ...PANELS.flatMap((p) => [p.site, ...p.links.map((l) => l.url)]),
  COMPANY.site,
  ...COMPANY.links.map((l) => l.url),
  ...COMPANY.extras.map((l) => l.url),
  ...SAMPLEDGE.links.map((l) => l.url),
].filter((u, i, a) => a.indexOf(u) === i);

/** Number of distinct codes on the page. */
export const CODE_COUNT = ALL_QR_URLS.length;
