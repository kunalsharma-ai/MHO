import { asset } from '../lib/asset.js';

/** The real MyHealthOpinions logo (raster from brand assets, 1x + 2x). */
export function Logo({ className = 'brand-logo', height = 42, priority }) {
  return (
    <img
      className={className}
      src={asset('images/brand/mho-logo.png')}
      srcSet={`${asset('images/brand/mho-logo.png')} 1x, ${asset('images/brand/mho-logo@2x.png')} 2x`}
      width={Math.round((height * 199) / 56)}
      height={height}
      alt="MyHealthOpinions logo"
      fetchpriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}

/** The four-point "plus" sparkle from the logo */
export function Spark({ style, color, className = 'spark' }) {
  return (
    <span className={className} style={{ ...style, color }} aria-hidden="true">
      <svg viewBox="0 0 20 20"><path d="M8 0h4v8h8v4h-8v8H8v-8H0V8h8z" fill="currentColor" /></svg>
    </span>
  );
}

/** A glossy two-tone 3D capsule drawn with CSS (used in the hero orbit and progress bars) */
export function Pill({ a = '#F2611B', b = '#ffffff', className = '' }) {
  return <i className={'pill3d ' + className} style={{ '--a': a, '--b': b }} aria-hidden="true" />;
}

/** heart shape, viewBox 0 0 24 24 */
export const HEART_D = 'M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.1 4.3 2.6.7-1.5 2.2-2.6 4.3-2.6 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z';
/** small heartbeat line, viewBox 0 0 100 30 */
export const ECG_D = 'M0 16 H26 L31 8 L37 26 L43 3 L49 22 L53 16 H74 L78 11 L82 20 L85 16 H100';
