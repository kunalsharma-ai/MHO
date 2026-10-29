import { BRAND } from '../data/site.js';

// Animated MyFrequentRewards logo built from the real logo artwork (no redrawing):
//  • the "MFR" monogram is cropped from the logo and spins like a reward coin every few seconds,
//  • an orbit ring with a comet circles it, the star twinkles,
//  • a light sweep runs across the wordmark (masked to the logo's own shape),
//  • on first load the monogram rolls in and the wordmark wipes in.
// Respects prefers-reduced-motion. Alt text stays on the real <img> for SEO/accessibility.
export default function BrandLogo({ width = 184, eager = false, className = '' }) {
  return (
    <span className={`blogo ${className}`} style={{ '--logo': `url(${BRAND.logo})`, width }}>
      <img className="blogo-word" src={BRAND.logo} alt="MyFrequentRewards logo" width={width} height={Math.round((width * 89) / 365)} fetchpriority={eager ? 'high' : undefined} loading={eager ? undefined : 'lazy'} />
      <span className="blogo-ring" aria-hidden="true"><span><i /></span></span>
      <span className="blogo-mono" aria-hidden="true" />
      <span className="blogo-star" aria-hidden="true" />
      <span className="blogo-shine" aria-hidden="true" />
    </span>
  );
}
