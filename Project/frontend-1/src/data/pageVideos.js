// The red "Watch" button on every page plays that page's own video in that page's own design.
// To change a page's video, paste its YouTube link in `url` (youtu.be/…, youtube.com/watch?v=…, /shorts/…).
// Pages without an entry use DEFAULT_VIDEO.
//
// Templates: 'lightbox' (About) · 'premiere' (Ratings & Reviews) · 'handheld' (Scan & Connect) · 'monitor' (everything else).
//
// Today only one MyHealthOpinions video is published (the panel film linked from the Frequent Research site),
// so every page plays it until page-specific videos are uploaded.
export const CHANNEL_URL = 'https://www.youtube.com/@MyHealthOpinions';
const PANEL_FILM = 'https://youtu.be/dYAhbVpQsXw';

export const PAGE_VIDEOS = {
  '/about-us': {
    url: PANEL_FILM,
    template: 'lightbox',
    eyebrow: 'Our story on film',
    title: 'Who we are,',
    em: 'on film.',
    lede: 'A healthcare research community where real experience shapes better medicine.',
    points: ['Powered by Frequent Research since 2017', 'Doctors, nurses, caregivers and patients', 'Rewards for every completed study'],
    cta: { label: 'Join the community', to: '/join' },
  },
  '/reviews': {
    url: PANEL_FILM,
    template: 'premiere',
    eyebrow: 'Now showing',
    title: 'Hear it from',
    em: 'our community.',
    lede: 'See how members take part, then rate your own experience.',
    points: ['Honest member reviews', 'Moderated before they go public', 'Add yours in under a minute'],
    cta: { label: 'Rate your experience', action: 'rate' },
  },
  '/scan-and-connect': {
    url: PANEL_FILM,
    template: 'handheld',
    eyebrow: 'Scan & connect',
    title: 'Scan once,',
    em: 'stay in the loop.',
    lede: 'Every code on this page opens the right channel on your phone.',
    points: ['Our own channels', 'Three research panels', 'Frequent Research & Sampledge'],
    cta: { label: 'Subscribe on YouTube', to: CHANNEL_URL },
  },
};

export const DEFAULT_VIDEO = {
  url: PANEL_FILM,
  template: 'monitor',
  eyebrow: 'MyHealthOpinions',
  title: 'Your experience can',
  em: 'improve healthcare.',
  lede: 'Our healthcare panel for physicians, nurses, pharmacists, patients and caregivers.',
  points: ['Physicians & specialists', 'Nurses, pharmacists & allied HCPs', 'Patients & caregivers'],
  cta: { label: 'Join MyHealthOpinions', to: '/join' },
};

export const videoFor = (path) => PAGE_VIDEOS[path] || DEFAULT_VIDEO;

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
