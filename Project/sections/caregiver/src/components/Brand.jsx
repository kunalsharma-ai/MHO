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

/* logo-style heart: speech-bubble heart, red→ember→gold, navy outline, white heartbeat */
export const HEART_PATH = 'M100 168 C56 140 20 112 20 70 C20 40 42 18 70 18 C85 18 95 27 100 38 C105 27 115 18 130 18 C158 18 180 40 180 70 C180 112 144 140 100 168Z';
export const TAIL_PATH = 'M70 146 L46 180 L94 160Z';

export function HeartArt({ id = 'h', layer }) {
  if (layer) {
    return (
      <svg viewBox="0 0 200 190" aria-hidden="true">
        <path d={TAIL_PATH} fill="#7E1020" stroke="#0E3F5F" strokeWidth="7" strokeLinejoin="round" />
        <path d={HEART_PATH} fill="#8E1523" stroke="#0E3F5F" strokeWidth="7" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 190" aria-hidden="true">
      <defs>
        <linearGradient id={id + 'g'} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E1192F" />
          <stop offset=".55" stopColor="#F86B1D" />
          <stop offset="1" stopColor="#FFC23A" />
        </linearGradient>
      </defs>
      <path d={TAIL_PATH} fill="#E1192F" stroke="#0E3F5F" strokeWidth="7" strokeLinejoin="round" />
      <path d={HEART_PATH} fill={`url(#${id}g)`} stroke="#0E3F5F" strokeWidth="7" strokeLinejoin="round" />
      <ellipse cx="62" cy="52" rx="20" ry="9" transform="rotate(-30 62 52)" fill="#fff" opacity=".45" />
      <polyline className="ecg" points="36,94 70,94 80,72 92,122 106,52 116,106 124,94 164,94" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The four-point "plus" sparkle from the logo */
export function Spark({ style, color }) {
  return (
    <span className="spark" style={{ ...style, color }} aria-hidden="true">
      <svg viewBox="0 0 20 20"><path d="M8 0h4v8h8v4h-8v8H8v-8H0V8h8z" fill="currentColor" /></svg>
    </span>
  );
}

/** Heartbeat (ECG) path used for progress bars and dividers. viewBox 0 0 100 24 */
export const ECG_D = 'M0 14 H22 L27 6 L33 22 L39 2 L45 18 L49 14 H70 L74 9 L78 17 L81 14 H100';

/**
 * Animated MyHealthOpinions logo — used everywhere (header, hero, monitor, pop-ups, completion screen, footer).
 * The real logo image with: a heartbeat pulse on the heart, a glowing aura, an ECG trace that runs across the
 * heart, three twinkling sparkles where the logo has its "+" marks and a light sweep over the wordmark.
 * CSS only (transform / opacity), pauses with prefers-reduced-motion.
 *   <AnimatedLogo height={40} />            full logo
 *   <AnimatedLogo heart height={56} />      heart mark only
 */
export function AnimatedLogo({ height = 40, heart = false, className = '', priority }) {
  const src = heart ? asset('images/brand/mho-heart.png') : asset('images/brand/mho-logo.png');
  const src2 = heart ? asset('images/brand/mho-heart.png') : asset('images/brand/mho-logo@2x.png');
  const w = heart ? Math.round((height * 104) / 111) : Math.round((height * 199) / 56);
  return (
    <span className={'alogo' + (heart ? ' al-heartonly' : '') + (className ? ' ' + className : '')} style={{ '--h': height + 'px', '--w': w + 'px' }}>
      <i className="al-aura" aria-hidden="true" />
      <img className="al-img" src={src} srcSet={heart ? undefined : `${src} 1x, ${src2} 2x`} width={w} height={height} alt="MyHealthOpinions logo" decoding="async" fetchpriority={priority ? 'high' : undefined} />
      <svg className="al-ecg" viewBox="0 0 60 30" aria-hidden="true"><path d="M2 17h14l4-7 5 13 5-17 4 11h24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength="100" /></svg>
      <i className="al-sp s1" aria-hidden="true" /><i className="al-sp s2" aria-hidden="true" /><i className="al-sp s3" aria-hidden="true" />
      {!heart && <i className="al-shine" aria-hidden="true" />}
    </span>
  );
}
