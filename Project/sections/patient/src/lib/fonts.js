import { asset } from './asset.js';
/** Self-hosted Inter (+ Manrope from Google Fonts when allowed) — injected once, relative to config.assetBase. */
export function injectFonts() {
  if (typeof document === 'undefined' || document.getElementById('mho-fonts')) return;
  const w = [['regular', 400], ['medium', 500], ['semibold', 600], ['bold', 700]];
  const LAT = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2190-2193, U+2212, U+2215, U+FEFF, U+FFFD';
  const EXT = 'U+0100-0130, U+0132-0151, U+0154-024F, U+0300-036F, U+0370-03FF, U+0400-04FF, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF';
  let css = '';
  for (const [n, wt] of w) {
    css += `@font-face{font-family:'MHO Inter';font-style:normal;font-weight:${wt};font-display:swap;src:url(${asset(`fonts/inter-${n}-latin.woff`)}) format('woff');unicode-range:${LAT}}`;
    css += `@font-face{font-family:'MHO Inter';font-style:normal;font-weight:${wt};font-display:swap;src:url(${asset(`fonts/inter-${n}-ext.woff`)}) format('woff');unicode-range:${EXT}}`;
  }
  css += "@font-face{font-family:'Manrope Fallback';src:local('Arial'),local('Helvetica Neue'),local('Roboto');size-adjust:103%;ascent-override:98%;descent-override:28%}";
  const st = document.createElement('style');
  st.id = 'mho-fonts';
  st.textContent = css;
  document.head.appendChild(st);
  if (!window.MHO_CONFIG?.noGoogleFonts) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap';
    document.head.appendChild(l);
  }
}
