/**
 * Per-profile background textures (tiny inline SVG tiles, ~300–600 bytes each, no image files).
 * Each profile card and its question flow get their own texture in the profile's own colours; CSS slowly pans it
 * (background-position only — cheap) and stops with prefers-reduced-motion.
 *   patternUrl('ecg', '#FF4D6D', '#FF9E7A')  →  'url("data:image/svg+xml,…")'
 */
const enc = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s{2,}/g, ' '))}")`;

const TILES = {
  ecg: (a, b) => `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='60'><path d='M0 34h46l6-12 8 26 9-38 8 28 5-4h72' fill='none' stroke='${a}' stroke-width='2.2' stroke-linejoin='round' opacity='.55'/><circle cx='150' cy='34' r='2.4' fill='${b}' opacity='.7'/></svg>`,
  grid: (a, b) => `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><path d='M0 .5h56M.5 0v56' stroke='${a}' opacity='.28'/><path d='M25 20h6v5h5v6h-5v5h-6v-5h-5v-6h5z' fill='${b}' opacity='.35'/></svg>`,
  rings: (a, b) => `<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90'><circle cx='45' cy='45' r='14' fill='none' stroke='${a}' stroke-width='2' opacity='.45'/><circle cx='45' cy='45' r='28' fill='none' stroke='${b}' stroke-width='1.4' opacity='.3'/><circle cx='45' cy='45' r='42' fill='none' stroke='${a}' stroke-width='1' opacity='.18'/></svg>`,
  laurel: (a, b) => `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><path d='M40 12l3.5 7.2 7.9 1.1-5.7 5.6 1.3 7.9L40 30.1l-7 3.7 1.3-7.9-5.7-5.6 7.9-1.1z' fill='${b}' opacity='.4'/><path d='M14 62c6-8 14-11 24-10M66 62c-6-8-14-11-24-10' fill='none' stroke='${a}' stroke-width='2' stroke-linecap='round' opacity='.4'/></svg>`,
  chevron: (a, b) => `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='36'><path d='M0 30l24-14 24 14' fill='none' stroke='${a}' stroke-width='3' opacity='.35'/><path d='M0 14l24-14 24 14' fill='none' stroke='${b}' stroke-width='1.5' opacity='.3'/></svg>`,
  contour: (a, b) => `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><path d='M10 70c20-40 60-50 90-30s30 60-10 70-80-10-80-40z' fill='none' stroke='${a}' stroke-width='1.6' opacity='.38'/><path d='M34 70c12-22 40-28 56-16s14 36-8 40-48-6-48-24z' fill='none' stroke='${b}' stroke-width='1.3' opacity='.32'/><circle cx='70' cy='70' r='4' fill='${a}' opacity='.5'/></svg>`,
  hex: (a, b) => `<svg xmlns='http://www.w3.org/2000/svg' width='56' height='97'><path d='M28 66L0 50V17L28 1l28 16v33zM28 97V66' fill='none' stroke='${a}' stroke-width='1.4' opacity='.35'/><path d='M22 33l4 4 9-9' fill='none' stroke='${b}' stroke-width='2.2' stroke-linecap='round' opacity='.45'/></svg>`,
  coins: (a, b) => `<svg xmlns='http://www.w3.org/2000/svg' width='70' height='70'><circle cx='20' cy='20' r='9' fill='none' stroke='${a}' stroke-width='2' opacity='.45'/><circle cx='20' cy='20' r='4' fill='${b}' opacity='.4'/><circle cx='55' cy='52' r='5' fill='${a}' opacity='.3'/></svg>`,
  circuit: (a, b) => `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><path d='M0 24h30l12 12h54M48 0v20l10 10M24 96V64l12-12h60' fill='none' stroke='${a}' stroke-width='1.6' opacity='.38'/><circle cx='42' cy='36' r='3' fill='${b}' opacity='.6'/><circle cx='36' cy='52' r='3' fill='${b}' opacity='.6'/><rect x='62' y='62' width='10' height='10' fill='${a}' opacity='.28'/></svg>`,
  bubbles: (a, b) => `<svg xmlns='http://www.w3.org/2000/svg' width='110' height='110'><path d='M14 18h36a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8H30l-10 8v-8h-6a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8z' fill='none' stroke='${a}' stroke-width='1.8' opacity='.4'/><circle cx='80' cy='78' r='12' fill='none' stroke='${b}' stroke-width='1.5' opacity='.35'/><circle cx='96' cy='30' r='4' fill='${a}' opacity='.35'/></svg>`,
  molecule: (a, b) => `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><path d='M20 24l30 16 28-14M50 40v30l-22 14M50 70l26 10' stroke='${a}' stroke-width='1.6' opacity='.38'/><circle cx='20' cy='24' r='5' fill='${b}' opacity='.5'/><circle cx='50' cy='40' r='6' fill='${a}' opacity='.5'/><circle cx='78' cy='26' r='4' fill='${b}' opacity='.5'/><circle cx='50' cy='70' r='5' fill='${a}' opacity='.45'/><circle cx='28' cy='84' r='4' fill='${b}' opacity='.45'/><circle cx='76' cy='80' r='3.5' fill='${a}' opacity='.45'/></svg>`,
};

const memo = {};
export function patternUrl(kind, a, b) {
  const k = kind + a + b;
  if (!memo[k]) memo[k] = enc((TILES[kind] || TILES.grid)(a, b));
  return memo[k];
}
/** CSS custom properties for a profile surface: palette + texture */
export function surfaceVars(m) {
  return { '--a': m.a, '--b': m.b, '--c': m.c, '--deep': m.deep, '--pat': patternUrl(m.pattern, m.b, m.c) };
}
