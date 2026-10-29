import { BRAND } from '../data/site.js';

// Animated brand tagline — "Your Voice. Your Value. Your Rewards."
// Words drop in one by one (3D), then a spotlight pill travels word-to-word while a reward coin flips.
// Pure CSS (transform/opacity only), reduced-motion safe. Text stays real for SEO and screen readers.
export default function Motto({ tone = 'light', className = '' }) {
  // ["Your Voice.", "Your Value.", "Your Rewards."] (no regex look-behind, for older Safari)
  const words = BRAND.motto.split('. ').map((w, i, a) => (i < a.length - 1 ? `${w}.` : w));
  return (
    <p className={`motto-x mx-${tone} ${className}`}>
      <span className="mx-coin" aria-hidden="true"><span className="mx-coin-in">★</span></span>
      <span className="mx-words">
        {words.map((w, k) => (
          <span className="mx-w" key={w} style={{ '--k': k }}>
            <span className="mx-glow" aria-hidden="true" />
            <span className="mx-t">{w}</span>
          </span>
        ))}
      </span>
      <span className="mx-shine" aria-hidden="true" />
    </p>
  );
}
