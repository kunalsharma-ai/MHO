// Renders illustrated blog covers (1200×675 WebP) from hand-built SVG scenes — no stock photos, no licensing.
// Each post gets a scene matched to its topic (phone, wallet, shield, home desk, laptop, globe, …), its
// category palette and seeded decorative variation, so all covers are unique but clearly one family.
// Usage:  node scripts/render-blog-covers.mjs        (needs Playwright + Chromium and Python 3 + Pillow)
// Output: public/images/blog/<slug>.webp   (the older scripts/generate-blog-covers.py remains as a fallback)
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const { BLOG_META } = await import(path.join(ROOT, 'src/data/blogs/meta.js'));

const PAL = {
  'Getting Started': ['#FF8A00', '#FFC233', '#0B1E5B', '#FFE6C2'],
  'Earning Ideas': ['#14C9B5', '#2F6BFF', '#062A4F', '#C9FFF6'],
  Students: ['#8B5CF6', '#FF5E7E', '#1E0B4F', '#EBDFFF'],
  Rewards: ['#FFC233', '#FF8A00', '#3A1D00', '#FFF1C9'],
  India: ['#FF8A00', '#14C9B5', '#0B1E5B', '#FFE6C2'],
  Professionals: ['#2F6BFF', '#8B5CF6', '#060F33', '#DCE6FF'],
  Safety: ['#14C9B5', '#2F6BFF', '#04202A', '#CFFAF3'],
  Tips: ['#FF5E7E', '#FFC233', '#2A0B2E', '#FFE0E7'],
  'Behind the Scenes': ['#2F6BFF', '#FF8A00', '#060F33', '#DCE6FF'],
};

const SCENE = (slug) => {
  if (/mobile|app/.test(slug)) return 'phone';
  if (/student/.test(slug)) return 'student';
  if (/retiree|spare-time|quick-money/.test(slug)) return 'clock';
  if (/scam|legit|privacy|checklist|myths|instantly-truth/.test(slug)) return 'shield';
  if (/focus-groups|why-companies|opinion/.test(slug)) return 'chat';
  if (/dollars|rupees/.test(slug)) return 'globe';
  if (/cash|payout|paypal|rewards|highest-paying/.test(slug)) return 'wallet';
  if (/professionals|online-jobs|platform/.test(slug)) return 'laptop';
  if (/home|homemakers|side-hustle|extra-income/.test(slug)) return 'home';
  if (/process|profile|surveys/.test(slug)) return 'survey';
  return 'growth';
};

// seeded random
const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const coin = (x, y, r, a = '#FFE08A', b = '#FFB000', sym = '★') => `
  <g transform="translate(${x} ${y})">
    <ellipse cx="0" cy="${r * 0.18}" rx="${r}" ry="${r}" fill="#B86E00" opacity=".9"/>
    <circle r="${r}" fill="url(#coinG)"/>
    <circle r="${r * 0.74}" fill="none" stroke="#FFF5D1" stroke-width="${r * 0.08}" opacity=".7"/>
    <text y="${r * 0.32}" text-anchor="middle" font-family="Poppins, Inter, sans-serif" font-weight="700" font-size="${r * 0.9}" fill="#9A5400">${sym}</text>
  </g>`;
const sparkle = (x, y, s, c = '#fff', o = 0.9) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -10 C1 -2 2 -1 10 0 C2 1 1 2 0 10 C-1 2 -2 1 -10 0 C-2 -1 -1 -2 0 -10Z" fill="${c}" opacity="${o}"/>`;
const card = (x, y, w, h, r = 22, fill = '#fff', extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" filter="url(#sh)" ${extra}/>`;
const bar = (x, y, w, h, c, o = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}" opacity="${o}"/>`;
const avatar = (x, y, r, skin, shirt) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${shirt}" opacity=".18"/><circle cy="${-r * 0.18}" r="${r * 0.36}" fill="${skin}"/><path d="M${-r * 0.62} ${r * 0.62} Q0 ${r * 0.05} ${r * 0.62} ${r * 0.62} Z" fill="${shirt}"/></g>`;
const check = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><circle r="14" fill="${c}"/><path d="M-6 0 L-2 5 L7 -5" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></g>`;

const SCENES = {
  phone: ([a, b, d]) => `
    <g transform="translate(700 70) rotate(-8)">
      ${card(0, 0, 250, 500, 40, d)}
      <rect x="14" y="16" width="222" height="468" rx="30" fill="#F6F8FF"/>
      <rect x="95" y="26" width="60" height="10" rx="5" fill="${d}" opacity=".2"/>
      <rect x="32" y="60" width="186" height="70" rx="16" fill="${a}"/>
      <text x="50" y="104" font-family="Poppins, Inter" font-weight="700" font-size="26" fill="#fff">+ 120 pts</text>
      ${[0, 1, 2].map((i) => `<g transform="translate(32 ${160 + i * 74})"><rect width="186" height="58" rx="14" fill="#fff" stroke="#E4E8F4"/><circle cx="28" cy="29" r="11" fill="${i === 1 ? b : 'none'}" stroke="${b}" stroke-width="3"/>${bar(52, 21, 110 - i * 18, 8, d, 0.25)}${bar(52, 35, 70, 7, d, 0.12)}</g>`).join('')}
      <rect x="32" y="400" width="186" height="52" rx="26" fill="${b}"/>
      <text x="125" y="433" text-anchor="middle" font-family="Poppins, Inter" font-weight="700" font-size="20" fill="#fff">Submit</text>
    </g>
    ${coin(1010, 180, 46)} ${coin(640, 470, 36)} ${coin(1060, 430, 28)}
    <g transform="translate(560 160)">${card(0, 0, 150, 64, 32)}<circle cx="32" cy="32" r="18" fill="${a}"/><text x="60" y="40" font-family="Poppins, Inter" font-weight="700" font-size="20" fill="${d}">New!</text></g>`,
  laptop: ([a, b, d]) => `
    <g transform="translate(560 120)">
      ${card(0, 0, 520, 330, 26, d)}
      <rect x="18" y="18" width="484" height="294" rx="14" fill="#F6F8FF"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${60 + i * 64}" y="${250 - (40 + ((i * 37) % 120))}" width="40" height="${40 + ((i * 37) % 120)}" rx="8" fill="${i % 2 ? a : b}"/>`).join('')}
      <path d="M60 120 Q 160 60 250 100 T 450 50" fill="none" stroke="${d}" stroke-width="5" stroke-linecap="round" opacity=".35"/>
      <rect x="-40" y="330" width="600" height="26" rx="13" fill="${d}" opacity=".9"/>
    </g>
    <g transform="translate(470 110)">${card(0, 0, 190, 120, 22)}${avatar(50, 60, 34, '#F2C29B', b)}${bar(96, 44, 70, 10, d, 0.3)}${bar(96, 64, 50, 9, d, 0.15)}${check(160, 98, 0.9, '#22C55E')}</g>
    ${coin(1080, 140, 40)} ${coin(1110, 420, 30)}`,
  wallet: ([a, b, d]) => `
    <g transform="translate(640 150) rotate(-6)">
      <rect x="20" y="-40" width="300" height="180" rx="22" fill="#003087" filter="url(#sh)"/><text x="50" y="20" font-family="Poppins, Inter" font-weight="700" font-size="30" fill="#fff">PayPal</text>
      <rect x="60" y="-10" width="300" height="180" rx="22" fill="#097939" filter="url(#sh)"/><text x="90" y="50" font-family="Poppins, Inter" font-weight="700" font-size="30" fill="#fff">UPI · India</text>
      <rect x="0" y="60" width="400" height="260" rx="34" fill="${d}" filter="url(#sh)"/>
      <rect x="250" y="140" width="170" height="100" rx="30" fill="${a}"/><circle cx="300" cy="190" r="18" fill="#fff"/>
    </g>
    ${coin(600, 470, 40, undefined, undefined, '$')} ${coin(690, 520, 34, undefined, undefined, '₹')} ${coin(1080, 160, 44, undefined, undefined, '$')} ${coin(1070, 470, 30)}
    <g transform="translate(470 120)">${card(0, 0, 170, 70, 35)}${check(36, 35, 1, '#22C55E')}<text x="62" y="44" font-family="Poppins, Inter" font-weight="700" font-size="22" fill="${d}">Paid</text></g>`,
  shield: ([a, b, d], v) => `
    <g transform="translate(720 90)${v === 1 ? ' rotate(-6 150 220)' : ''}">
      <path d="M150 0 L300 60 V220 C300 330 220 400 150 440 C80 400 0 330 0 220 V60 Z" fill="${a}" filter="url(#sh)"/>
      <path d="M150 34 L268 82 V220 C268 310 205 368 150 400 C95 368 32 310 32 220 V82 Z" fill="${b}" opacity=".9"/>
      ${v === 1 ? `<circle cx="140" cy="200" r="58" fill="none" stroke="#fff" stroke-width="20"/><path d="M182 242 L230 290" stroke="#fff" stroke-width="24" stroke-linecap="round"/>`
        : v === 2 ? `<text x="150" y="275" text-anchor="middle" font-family="Poppins, Inter" font-weight="700" font-size="190" fill="#fff">?</text>`
        : `<path d="M95 220 L135 262 L215 170" fill="none" stroke="#fff" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>`}
    </g>
    <g transform="translate(540 150)">${card(0, 0, 210, 90, 22)}<circle cx="44" cy="45" r="22" fill="#FFE4E4"/><text x="44" y="56" text-anchor="middle" font-size="30" font-family="Poppins, Inter" font-weight="700" fill="#E5484D">!</text>${bar(80, 32, 100, 10, d, 0.3)}${bar(80, 54, 70, 9, d, 0.15)}</g>
    <g transform="translate(1000 420)">${card(0, 0, 150, 120, 22)}<rect x="45" y="55" width="60" height="46" rx="10" fill="${d}"/><path d="M58 55 V40 a17 17 0 0 1 34 0 V55" fill="none" stroke="${d}" stroke-width="9"/></g>`,
  home: ([a, b, d], v) => `
    <g transform="translate(600 110)">
      <path d="M40 200 L250 40 L460 200 V430 H40 Z" fill="#fff" filter="url(#sh)"/>
      <path d="M10 210 L250 20 L490 210" fill="none" stroke="${a}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="110" y="250" width="280" height="150" rx="16" fill="${d}"/>
      <rect x="126" y="264" width="248" height="122" rx="10" fill="#F6F8FF"/>
      ${v === 0 ? [0, 1, 2].map((i) => `<rect x="${150 + i * 70}" y="${370 - (30 + i * 28)}" width="44" height="${30 + i * 28}" rx="8" fill="${i === 2 ? a : b}"/>`).join('')
        : v === 1 ? [0, 1, 2].map((i) => `${check(160, 290 + i * 34, 0.8, i < 2 ? '#22C55E' : '#C9D1EA')}${bar(184, 284 + i * 34, 150 - i * 20, 10, d, 0.3)}`).join('')
        : `${avatar(200, 325, 40, '#F2C29B', a)}${avatar(300, 325, 40, '#8D5524', b)}<rect x="150" y="364" width="200" height="12" rx="6" fill="${d}" opacity=".2"/>`}
      <rect x="80" y="400" width="340" height="18" rx="9" fill="${d}" opacity=".85"/>
      <g transform="translate(400 330)"><rect x="0" y="0" width="44" height="54" rx="10" fill="${b}"/><path d="M44 14 h10 a10 10 0 0 1 0 20 h-10" fill="none" stroke="${b}" stroke-width="6"/></g>
      <g transform="translate(20 300)"><rect x="0" y="40" width="50" height="60" rx="10" fill="${d}" opacity=".8"/><path d="M25 40 C 0 10 10 -10 25 -20 C 40 -10 50 10 25 40" fill="#22C55E"/></g>
    </g>
    ${coin(1080, 150, 40)} ${coin(560, 470, 32)}`,
  student: ([a, b, d]) => `
    <g transform="translate(640 330)">
      <rect x="0" y="0" width="380" height="60" rx="12" fill="${a}" filter="url(#sh)"/>
      <rect x="20" y="-60" width="340" height="60" rx="12" fill="${b}" filter="url(#sh)"/>
      <rect x="40" y="-120" width="300" height="60" rx="12" fill="${d}" filter="url(#sh)"/>
      <g transform="translate(190 -190)"><path d="M-150 0 L0 -60 L150 0 L0 60 Z" fill="${d}"/><path d="M-80 30 V90 C-40 120 40 120 80 90 V30 L0 60 Z" fill="${d}" opacity=".85"/><path d="M130 8 V80" stroke="${a}" stroke-width="8"/><circle cx="130" cy="86" r="12" fill="${a}"/></g>
    </g>
    <g transform="translate(520 120) rotate(-10)">${card(0, 0, 130, 230, 26, d)}<rect x="10" y="12" width="110" height="206" rx="18" fill="#F6F8FF"/>${check(65, 80, 1.2, '#22C55E')}${bar(25, 130, 80, 10, d, 0.25)}${bar(25, 152, 60, 9, d, 0.15)}</g>
    ${coin(1090, 160, 42)} ${coin(1060, 470, 30)}`,
  clock: ([a, b, d], v) => `
    <g transform="translate(860 300)">
      <circle r="210" fill="#fff" filter="url(#sh)"/>
      <circle r="180" fill="none" stroke="${a}" stroke-width="22" stroke-dasharray="${[760, 420, 980][v]} 1200" transform="rotate(-90)" stroke-linecap="round"/>
      ${Array.from({ length: 12 }, (_, i) => `<rect x="-4" y="-160" width="8" height="${i % 3 ? 14 : 26}" rx="4" fill="${d}" opacity=".5" transform="rotate(${i * 30})"/>`).join('')}
      <rect x="-6" y="-120" width="12" height="130" rx="6" fill="${d}" transform="rotate(${[40, 120, 200][v]})"/>
      <rect x="-6" y="-80" width="12" height="90" rx="6" fill="${b}" transform="rotate(${[-70, 30, -150][v]})"/>
      <circle r="16" fill="${a}"/>
    </g>
    <g transform="translate(520 110)">${card(0, 0, 180, 150, 22)}<rect x="0" y="0" width="180" height="44" rx="22" fill="${b}"/><rect x="0" y="22" width="180" height="22" fill="${b}"/><text x="90" y="112" text-anchor="middle" font-family="Poppins, Inter" font-weight="700" font-size="54" fill="${d}">${[15, 7, 24][v]}</text></g>
    ${coin(600, 470, 36)}`,
  chat: ([a, b, d]) => `
    ${avatar(700, 420, 70, '#F2C29B', a)} ${avatar(870, 450, 70, '#8D5524', b)} ${avatar(1040, 420, 70, '#E0AC69', d)}
    <g transform="translate(560 100)">${card(0, 0, 280, 110, 28)}${bar(30, 34, 200, 14, d, 0.3)}${bar(30, 62, 140, 12, d, 0.15)}<path d="M80 110 L70 150 L120 110" fill="#fff"/></g>
    <g transform="translate(860 150)">${card(0, 0, 250, 100, 28, a)}${bar(30, 32, 170, 14, '#fff', 0.85)}${bar(30, 58, 110, 12, '#fff', 0.6)}<path d="M150 100 L170 140 L190 100" fill="${a}"/></g>
    <g transform="translate(760 250)">${card(0, 0, 200, 80, 26, b)}<text x="100" y="52" text-anchor="middle" font-family="Poppins, Inter" font-weight="700" font-size="30" fill="#fff">★★★★★</text></g>`,
  globe: ([a, b, d]) => `
    <g transform="translate(860 330)">
      <circle r="220" fill="${d}" filter="url(#sh)"/>
      <circle r="220" fill="none" stroke="${b}" stroke-width="3" opacity=".6"/>
      ${[-120, -60, 0, 60, 120].map((y) => `<ellipse cx="0" cy="${y}" rx="${Math.sqrt(220 * 220 - y * y)}" ry="${18}" fill="none" stroke="${b}" stroke-width="2" opacity=".35"/>`).join('')}
      ${[0, 50, 100, 150].map((r) => `<ellipse rx="${220 - r}" ry="220" fill="none" stroke="${b}" stroke-width="2" opacity=".35"/>`).join('')}
      <ellipse rx="290" ry="80" fill="none" stroke="${a}" stroke-width="6" transform="rotate(-18)" stroke-dasharray="14 12"/>
    </g>
    ${coin(600, 200, 50, undefined, undefined, '$')} ${coin(1110, 180, 44, undefined, undefined, '₹')} ${coin(640, 480, 36, undefined, undefined, '$')} ${coin(1090, 500, 32, undefined, undefined, '₹')}`,
  survey: ([a, b, d]) => `
    <g transform="translate(640 80) rotate(4)">
      ${card(0, 0, 380, 470, 30)}
      <rect x="0" y="0" width="380" height="90" rx="30" fill="${a}"/><rect x="0" y="50" width="380" height="40" fill="${a}"/>
      <text x="36" y="58" font-family="Poppins, Inter" font-weight="700" font-size="30" fill="#fff">Your opinion</text>
      ${[0, 1, 2, 3].map((i) => `<g transform="translate(36 ${120 + i * 82})">${i < 2 ? check(18, 22, 1.1, '#22C55E') : `<circle cx="18" cy="22" r="15" fill="none" stroke="${d}" stroke-width="3" opacity=".35"/>`}${bar(52, 12, 230 - i * 30, 12, d, 0.28)}${bar(52, 34, 150, 10, d, 0.14)}</g>`).join('')}
    </g>
    <g transform="translate(1000 400)">${card(0, 0, 160, 70, 35, b)}<text x="80" y="45" text-anchor="middle" font-family="Poppins, Inter" font-weight="700" font-size="24" fill="#fff">+ points</text></g>
    ${coin(580, 200, 44)} ${coin(1100, 170, 34)}`,
  growth: ([a, b, d], v) => v === 1 ? `
    <g transform="translate(700 520)">${Array.from({ length: 5 }, (_, col) => Array.from({ length: 2 + col }, (_, k) => `<g transform="translate(${col * 95} ${-k * 26})"><ellipse cx="0" cy="8" rx="40" ry="14" fill="#B86E00"/><ellipse cx="0" cy="0" rx="40" ry="14" fill="url(#coinG)"/></g>`).join('')).join('')}</g>
    <path d="M660 300 C 760 280 860 200 1100 120" fill="none" stroke="${d}" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 22"/>
    ${sparkle(1100, 120, 3, a, 1)}` : `
    <g transform="translate(600 120)">
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="${i * 100}" y="${400 - (80 + i * 64)}" width="70" height="${80 + i * 64}" rx="14" fill="${i % 2 ? b : a}" filter="url(#sh)"/>`).join('')}
      <path d="M10 330 C 120 300 180 220 260 200 S 400 90 470 40" fill="none" stroke="${d}" stroke-width="10" stroke-linecap="round"/>
      <path d="M470 40 l-46 4 l30 34 z" fill="${d}"/>
    </g>
    ${coin(560, 160, 40)} ${coin(1110, 450, 36)}`,
};

function svg(post) {
  const [a, b, d, light] = PAL[post.category] || PAL['Getting Started'];
  const r = rng(hash(post.slug));
  const v = hash(post.slug + 'v') % 3; // per-post scene variant
  const scene = SCENES[SCENE(post.slug)]([a, b, d, light], v);
  const blobs = Array.from({ length: 3 }, (_, i) => `<circle cx="${200 + r() * 900}" cy="${r() * 675}" r="${160 + r() * 160}" fill="${i % 2 ? a : b}" opacity=".18"/>`).join('');
  const sparks = Array.from({ length: 7 }, () => sparkle(80 + r() * 1040, 40 + r() * 600, 0.8 + r() * 1.4, '#fff', 0.5 + r() * 0.4)).join('');
  const dots = Array.from({ length: 6 }, () => `<circle cx="${r() * 1200}" cy="${r() * 675}" r="${4 + r() * 6}" fill="${r() > 0.5 ? a : b}" opacity=".7"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light}"/><stop offset=".55" stop-color="#FFFFFF"/><stop offset="1" stop-color="${light}"/></linearGradient>
    <radialGradient id="coinG" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FFF4BF"/><stop offset=".55" stop-color="#FFC233"/><stop offset="1" stop-color="#FF9F1A"/></radialGradient>
    <filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="${d}" flood-opacity=".25"/></filter>
    <filter id="blur"><feGaussianBlur stdDeviation="50"/></filter>
    <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="${d}" opacity=".08"/></pattern>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <g filter="url(#blur)">${blobs}</g>
  <rect width="1200" height="675" fill="url(#grid)"/>
  <path d="M0 520 C 300 440 600 640 1200 500 V675 H0Z" fill="${a}" opacity=".12"/>
  <path d="M0 580 C 400 520 700 690 1200 590 V675 H0Z" fill="${b}" opacity=".12"/>
  ${dots}
  <g transform="translate(-60 0)">${scene}</g>
  ${sparks}
  <g transform="translate(60 70)">
    <rect width="${post.category.length * 13 + 60}" height="48" rx="24" fill="${d}"/>
    <circle cx="26" cy="24" r="8" fill="${a}"/>
    <text x="44" y="31" font-family="Inter, Poppins, sans-serif" font-weight="700" font-size="20" fill="#fff">${post.category}</text>
  </g>
  <g transform="translate(60 160)">
    ${wrap(post.primaryKeyword).map((line, i) => `<text x="0" y="${i * 54}" font-family="Poppins, Inter, sans-serif" font-weight="700" font-size="44" fill="${d}">${line}</text>`).join('')}
    <rect x="0" y="${wrap(post.primaryKeyword).length * 54 - 24}" width="120" height="10" rx="5" fill="${a}"/>
  </g>
</svg>`;
}
// headline: the primary keyword, title-cased, wrapped to ≤ 3 lines of ~14 chars (left column)
function wrap(t) {
  const words = t.replace(/\b\w/g, (m) => m.toUpperCase()).split(' ');
  const lines = [];
  let cur = '';
  words.forEach((w) => {
    if ((cur + ' ' + w).trim().length > 14 && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  });
  if (cur) lines.push(cur);
  return lines.slice(0, 4);
}

const OUT = path.join(ROOT, 'public/images/blog');
const TMP = path.join(ROOT, '.covers-tmp');
await mkdir(TMP, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 675 } });
const only = process.argv[2];
for (const post of BLOG_META) {
  if (only && post.slug !== only) continue;
  await page.setContent(`<html><body style="margin:0">${svg(post)}</body></html>`);
  await page.screenshot({ path: path.join(TMP, `${post.slug}.png`), clip: { x: 0, y: 0, width: 1200, height: 675 } });
}
await browser.close();
execFileSync('python3', ['-c', `
import glob, os
from PIL import Image
for f in glob.glob(${JSON.stringify(TMP)} + '/*.png'):
    Image.open(f).convert('RGB').save(os.path.join(${JSON.stringify(OUT)}, os.path.basename(f)[:-4] + '.webp'), 'WEBP', quality=80, method=6)
`]);
await rm(TMP, { recursive: true, force: true });
console.log('Covers rendered →', OUT);
