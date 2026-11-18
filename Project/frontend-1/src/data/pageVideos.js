// The animated "Watch" button on every page plays that page's own video, in that page's own design (template + cover).
// To change a page's video, paste its YouTube link in `url` (youtu.be/…, youtube.com/watch?v=…, /shorts/…).
// Pages without an entry use DEFAULT_VIDEO; blog articles use the Blog entry; legal pages use LEGAL_VIDEO.
//
// One template per page, no two alike:
//   /                       monitor   vitals monitor (ECG, medical cross)
//   /about-us               lightbox  X-ray lightbox
//   /reviews                premiere  movie premiere (marquee bulbs, spotlights)
//   /scan-and-connect       handheld  phone scanner (scan brackets)
//   /earn                   arcade    neon coin-op arcade
//   /healthcare-professionals surgical operating-theatre lamp
//   /caregivers             hearth    warm home window with string lights
//   /patients               bloom     soft cells and floating capsules
//   /how-it-works           blueprint technical blueprint with dimension lines
//   /rewards                vault     gold vault door and falling coins
//   /trust-safety           shield    secure terminal with scanning shield
//   /blog (+ articles)      magazine  editorial magazine cover
//   /faq                    quiz      floating question marks, speech bubble
//   /contact                postcard  airmail postcard with stamp and postmark
//   /join                   launch    starfield and rocket launch countdown
//   legal pages             dossier   document folder
//
// Today only one MyHealthOpinions video is published (the panel film linked from the Frequent Research site),
// so every page plays it until page-specific videos are uploaded.
export const CHANNEL_URL = 'https://www.youtube.com/@MyHealthOpinions';
const PANEL_FILM = 'https://youtu.be/dYAhbVpQsXw';

export const PAGE_VIDEOS = {
  '/about-us': {
    url: PANEL_FILM, template: 'lightbox', fab: 'Our story',
    eyebrow: 'Our story on film', title: 'Who we are,', em: 'on film.',
    lede: 'A healthcare research community where real experience shapes better medicine.',
    points: ['Powered by Frequent Research since 2017', 'Doctors, nurses, caregivers and patients', 'Rewards for every completed study'],
    cta: { label: 'Join the community', to: '/join' },
  },
  '/reviews': {
    url: PANEL_FILM, template: 'premiere', fab: 'Now showing',
    eyebrow: 'Now showing', title: 'Hear it from', em: 'our community.',
    lede: 'See how members take part, then rate your own experience.',
    points: ['Honest member reviews', 'Moderated before they go public', 'Add yours in under a minute'],
    cta: { label: 'Rate your experience', action: 'rate' },
  },
  '/scan-and-connect': {
    url: PANEL_FILM, template: 'handheld', fab: 'Scan & watch',
    eyebrow: 'Scan & connect', title: 'Scan once,', em: 'stay in the loop.',
    lede: 'Every code on this page opens the right channel on your phone.',
    points: ['Our own channels', 'Three research panels', 'Frequent Research & Sampledge'],
    cta: { label: 'Subscribe on YouTube', to: CHANNEL_URL },
  },
  '/earn': {
    url: PANEL_FILM, template: 'arcade', fab: 'Press start',
    eyebrow: 'Player one, ready', title: 'Your opinions,', em: 'level up.',
    lede: 'Consumers, healthcare and business professionals in 55 countries share opinions and get paid.',
    points: ['No investment, ever', 'Short surveys that fit your day', 'Points for every completed study'],
    cta: { label: 'Start earning', to: '/join' },
  },
  '/healthcare-professionals': {
    url: PANEL_FILM, template: 'surgical', fab: 'In theatre',
    eyebrow: 'For healthcare professionals', title: 'Your expertise,', em: 'in the spotlight.',
    lede: 'Doctors, nurses, pharmacists, allied health, lab, admin and support staff shape tomorrow’s medicine.',
    points: ['1,300+ healthcare roles', 'Paid honoraria for your time', 'Studies matched to your specialty'],
    cta: { label: 'Join as a professional', to: '/join' },
  },
  '/caregivers': {
    url: PANEL_FILM, template: 'hearth', fab: 'From home',
    eyebrow: 'For caregivers', title: 'The care you give', em: 'deserves a voice.',
    lede: 'Family carers, parents and home care aides share what caring is really like.',
    points: ['Short, flexible studies', 'Take part from home', 'Cash and voucher rewards'],
    cta: { label: 'Join as a caregiver', to: '/join' },
  },
  '/patients': {
    url: PANEL_FILM, template: 'bloom', fab: 'Your voice',
    eyebrow: 'For patients', title: 'Your experience', em: 'helps others heal.',
    lede: 'People living with 195+ conditions across 20 therapy areas share their story, no clinic visits needed.',
    points: ['No tests or clinic visits', 'Share your experience by phone', 'Rewarded for every study'],
    cta: { label: 'Join as a patient', to: '/join' },
  },
  '/how-it-works': {
    url: PANEL_FILM, template: 'blueprint', fab: 'See the plan',
    eyebrow: 'The blueprint', title: 'Four steps,', em: 'drawn to scale.',
    lede: 'Join free, build your profile, get matched invitations and redeem rewards.',
    points: ['Join free and verify your email', 'Build your profile once', 'Answer honestly, redeem your way'],
    cta: { label: 'Start step one', to: '/join' },
  },
  '/rewards': {
    url: PANEL_FILM, template: 'vault', fab: 'Open the vault',
    eyebrow: 'The rewards vault', title: 'Points in,', em: 'rewards out.',
    lede: 'Redeem your way: PayPal, Wire Transfer and Amazon Gift Cards worldwide, plus UPI in India.',
    points: ['PayPal and Wire Transfer', 'Amazon Gift Cards', 'UPI for members in India'],
    cta: { label: 'Start collecting', to: '/join' },
  },
  '/trust-safety': {
    url: PANEL_FILM, template: 'shield', fab: 'Secure view',
    eyebrow: 'Trust & safety', title: 'Safe by design,', em: 'checked 18 ways.',
    lede: 'Identity verification, quality checks and privacy promises that protect every member.',
    points: ['18 quality checks', 'Identity verification', 'We never sell your data'],
    cta: { label: 'Join with confidence', to: '/join' },
  },
  '/blog': {
    url: PANEL_FILM, template: 'magazine', fab: 'Read & watch',
    eyebrow: 'The MHO journal', title: 'Stories worth', em: 'pressing play on.',
    lede: 'Honest guides on paid surveys, healthcare research and how to spot survey scams.',
    points: ['Guides for every member', 'Healthcare research explained', 'Updated often'],
    cta: { label: 'Join MyHealthOpinions', to: '/join' },
  },
  '/faq': {
    url: PANEL_FILM, template: 'quiz', fab: 'Got questions?',
    eyebrow: 'Questions, answered', title: 'Ask anything,', em: 'watch the answer.',
    lede: 'Invitations, screen-outs, reward points, payouts, privacy and your account, explained.',
    points: ['Joining and invitations', 'Points and payouts', 'Privacy and your account'],
    cta: { label: 'Contact support', to: '/contact' },
  },
  '/contact': {
    url: PANEL_FILM, template: 'postcard', fab: 'Say hello',
    eyebrow: 'Greetings from New Delhi', title: 'We’re here,', em: 'write any time.',
    lede: 'Reach our support team by live chat, WhatsApp, email or phone.',
    points: ['Live chat and WhatsApp', 'Email and phone support', 'Team based in New Delhi'],
    cta: { label: 'Read the FAQ', to: '/faq' },
  },
  '/join': {
    url: PANEL_FILM, template: 'launch', fab: 'Lift off',
    eyebrow: 'T-minus one minute', title: 'Ready for', em: 'lift-off?',
    lede: 'Create your free account, verify your email and start earning from surveys.',
    points: ['Free to join', 'Healthcare professionals, caregivers and patients', 'Verify your email, then start earning'],
    cta: { label: 'See how it works', to: '/how-it-works' },
  },
};

export const DEFAULT_VIDEO = {
  url: PANEL_FILM, template: 'monitor', fab: 'This page’s film',
  eyebrow: 'MyHealthOpinions', title: 'Your experience can', em: 'improve healthcare.',
  lede: 'Our healthcare panel for physicians, nurses, pharmacists, patients and caregivers.',
  points: ['Physicians & specialists', 'Nurses, pharmacists & allied HCPs', 'Patients & caregivers'],
  cta: { label: 'Join MyHealthOpinions', to: '/join' },
};

export const LEGAL_VIDEO = {
  url: PANEL_FILM, template: 'dossier', fab: 'The short version',
  eyebrow: 'The fine print, on film', title: 'Clear rules,', em: 'plainly told.',
  lede: 'How we protect your data, score quality and keep research fair, in a few minutes.',
  points: ['Consent before contact', 'Your right to erasure', 'We never sell your data'],
  cta: { label: 'Visit Trust & Safety', to: '/trust-safety' },
};

const LEGAL = ['/privacy', '/gdpr', '/cookies', '/terms', '/profiling', '/sitemap'];

export const videoFor = (path) =>
  PAGE_VIDEOS[path] || (String(path).startsWith('/blog/') ? PAGE_VIDEOS['/blog'] : LEGAL.includes(path) ? LEGAL_VIDEO : DEFAULT_VIDEO);

/** "https://youtu.be/ID?t=30" → { id, start } (null if it is not a YouTube link). */
export function parseYouTube(url) {
  const s = String(url || '').trim();
  if (/^[\w-]{11}$/.test(s)) return { id: s, start: 0 };
  try {
    const u = new URL(s);
    const host = u.hostname.replace(/^(www|m)\./, '');
    const id = host === 'youtu.be'
      ? u.pathname.slice(1).split('/')[0]
      : /^youtube(-nocookie)?\.com$/.test(host) && (u.searchParams.get('v') || (u.pathname.match(/\/(embed|shorts|live)\/([\w-]{11})/) || [])[2]);
    if (!/^[\w-]{11}$/.test(id || '')) return null;
    const t = String(u.searchParams.get('t') || u.searchParams.get('start') || '').match(/^(?:(\d+)m)?(?:(\d+)s?)?$/);
    return { id, start: t ? (+t[1] || 0) * 60 + (+t[2] || 0) : 0 };
  } catch {
    return null;
  }
}

/** Opens the current page's video from anywhere (e.g. a "Watch our story" button). */
export const openPageVideo = () => window.dispatchEvent(new Event('mho-open-video'));
