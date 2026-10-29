import { asset } from '../lib/asset.js';

/**
 * Animated MyHealthOpinions logo — "heartbeat" (v3.0).
 * The real logo image, with: a lub-dub heartbeat on the heart (double pulse every 2.4 s), a glowing ECG trace that
 * writes itself under the wordmark in sync with the beat, two "+" sparks that twinkle where the logo has its sparkles,
 * and a soft halo that breathes with each beat. CSS only (transform / opacity / stroke-dashoffset); frozen with
 * prefers-reduced-motion.
 *   <AnimatedLogo height={36} />          full logo (header, question flow, completion, footer, dialogs)
 *   <AnimatedLogo heart height={48} />    heart mark only (hero badge, genome core, loading)
 */
export function AnimatedLogo({ height = 40, heart = false, className = '', priority }) {
  const src = heart ? asset('images/brand/mho-heart.png') : asset('images/brand/mho-logo.png');
  const src2 = heart ? src : asset('images/brand/mho-logo@2x.png');
  const w = heart ? Math.round((height * 104) / 111) : Math.round((height * 199) / 56);
  return (
    <span className={'hlogo' + (heart ? ' hl-heart' : '') + (className ? ' ' + className : '')} style={{ '--h': height + 'px', '--w': w + 'px' }}>
      <i className="hl-halo" aria-hidden="true" />
      <span className="hl-beat">
        <img className="hl-img" src={src} srcSet={heart ? undefined : `${src} 1x, ${src2} 2x`} width={w} height={height}
          alt="MyHealthOpinions logo" decoding="async" fetchPriority={priority ? 'high' : undefined} />
      </span>
      {!heart && (
        <svg className="hl-ecg" viewBox="0 0 120 10" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 6h34l3-4 4 7 4-9 4 8 2-2h69" pathLength="100" />
        </svg>
      )}
      <i className="hl-sp s1" aria-hidden="true" /><i className="hl-sp s2" aria-hidden="true" />
    </span>
  );
}

/** ECG path (viewBox 0 0 100 24) used for dividers and progress traces */
export const ECG_D = 'M0 14 H22 L27 6 L33 22 L39 2 L45 18 L49 14 H70 L74 9 L78 17 L81 14 H100';
