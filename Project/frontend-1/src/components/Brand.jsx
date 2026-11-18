import { useId } from 'react';
// Brand marks: animated MyHealthOpinions logo (vector re-drawing of the supplied logo so it stays
// crisp at any size) and the animated Frequent Research emblem.
import frEmblem from '../assets/brand/frequent-research-emblem.webp';
import frLogo from '../assets/brand/frequent-research-logo.webp';

export function HeartMark({ size = 44, className = '', animated = true }) {
  return (
    <svg className={`heartmark ${animated ? 'is-animated' : ''} ${className}`} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="hm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff3d5a" />
          <stop offset="0.55" stopColor="#f2542d" />
          <stop offset="1" stopColor="#f7931e" />
        </linearGradient>
        <radialGradient id="hm-gloss" cx="0.32" cy="0.28" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="hm-beat">
        <path d="M32 56 9.5 35.2C3 29 3.4 18.2 10.6 13.2c6-4.2 14-2.6 18.3 2.6L32 19.4l3.1-3.6c4.3-5.2 12.3-6.8 18.3-2.6 7.2 5 7.6 15.8 1.1 22L32 56z" fill="url(#hm-grad)" />
        <path d="M32 56 9.5 35.2C3 29 3.4 18.2 10.6 13.2c6-4.2 14-2.6 18.3 2.6L32 19.4" fill="url(#hm-gloss)" />
        <path className="hm-ecg" d="M7 33h12l3.5-7 5 15 4.5-19 4 15 2.6-4H57" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
      </g>
      <g className="hm-sparks" fill="#f7931e">
        <path className="sp sp1" d="M54 4l1.3 3.4L59 8.6l-3.7 1.3L54 13.3l-1.3-3.4L49 8.6l3.7-1.2z" />
        <circle className="sp sp2" cx="60" cy="16" r="1.8" />
        <circle className="sp sp3" cx="47" cy="3" r="1.3" />
      </g>
    </svg>
  );
}

/**
 * MyHealthOpinions logo, redrawn as crisp vector from the supplied artwork (speech-bubble heart with an
 * ECG line, blue swoosh, orange sparkles; "MyHealth" in blue, "Opinions" in orange). Pin-sharp at any size.
 * Motion is transform/opacity only (cheap): the heart beats, the ECG trace runs, a gloss sweeps the heart,
 * sparkles twinkle and the wordmark gradient drifts. `onDark` switches the wordmark to light tones (via --logo-b1/--logo-b2, so themes can override it).
 */
export function Logo({ size = 40, className = '', onDark = false }) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (n) => `lg${raw}${n}`;
  const h = Math.round(size * 1.05);
  return (
    <span className={`brand vlogo ${onDark ? 'on-dark' : ''} ${className}`}>
      <svg viewBox="0 0 372 80" height={h} width={Math.round((h * 372) / 80)} role="img" aria-label="MyHealthOpinions">
        <defs>
          <linearGradient id={id('h')} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#c8102e" />
            <stop offset=".45" stopColor="#ef3b2d" />
            <stop offset=".8" stopColor="#f7931e" />
            <stop offset="1" stopColor="#ffc93c" />
          </linearGradient>
          <linearGradient id={id('b')} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: 'var(--logo-b1)' }} />
            <stop offset="1" style={{ stopColor: 'var(--logo-b2)' }} />
          </linearGradient>
          <linearGradient id={id('o')} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e3631c" />
            <stop offset=".5" stopColor="#f7931e" />
            <stop offset="1" stopColor="#d96a26" />
          </linearGradient>
          <linearGradient id={id('g')} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".75" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={id('c')}>
            <path d="M38 70C30 63 6 49 6 28 6 15 16 7 27 7c6 0 9 3 11 7 2-4 5-7 11-7 11 0 21 8 21 21 0 21-24 35-32 42z" />
          </clipPath>
        </defs>
        <g className="vl-heart">
          <path d="M23 59 13 75l20-9z" fill={`url(#${id('h')})`} />
          <path d="M38 70C30 63 6 49 6 28 6 15 16 7 27 7c6 0 9 3 11 7 2-4 5-7 11-7 11 0 21 8 21 21 0 21-24 35-32 42z" fill={`url(#${id('h')})`} stroke="#fff" strokeWidth="2.5" />
          <path d="M11 20C4 36 9 54 24 63" fill="none" stroke="#2f80c4" strokeWidth="3.5" strokeLinecap="round" />
          <g clipPath={`url(#${id('c')})`}>
            <rect className="vl-gloss" x="-40" y="0" width="28" height="80" fill={`url(#${id('g')})`} transform="skewX(-20)" />
            <ellipse cx="26" cy="20" rx="12" ry="7" fill="#fff" opacity=".22" />
          </g>
          <path className="vl-ecg" d="M7 38h16l4-8 5 19 6-30 5 24 3-7h23" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
        </g>
        <g fill="#f08a2c" className="vl-sparks">
          <path className="vs vs1" d="M76 6h3v4h4v3h-4v4h-3v-4h-4v-3h4z" />
          <path className="vs vs2" d="M86 1h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
          <path className="vs vs3" d="M70 17h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
          <circle className="vs vs4" cx="90" cy="14" r="1.6" />
        </g>
        <text x="84" y="57" className="vl-word" fontFamily="'Manrope Variable', Manrope, 'Inter Variable', system-ui, sans-serif" fontWeight="800" fontSize="35" letterSpacing="-1">
          <tspan fill={`url(#${id('b')})`}>MyHealth</tspan>
          <tspan fill={`url(#${id('o')})`}>Opinions</tspan>
        </text>
      </svg>
    </span>
  );
}

export function FrEmblem({ size = 56, className = '' }) {
  return (
    <span className={`fr-emblem ${className}`} style={{ '--s': size + 'px' }}>
      <span className="fr-orbit" aria-hidden="true">
        <i /><i /><i />
      </span>
      <img src={frEmblem} alt="Frequent Research emblem" width={size} height={size} loading="lazy" decoding="async" />
      <span className="fr-shine" aria-hidden="true" />
    </span>
  );
}

export function FrLogo({ className = '' }) {
  return (
    <span className={`fr-logo ${className}`}>
      <img src={frLogo} alt="Frequent Research Fieldwork Solutions — Insights, Analytics, Growth. ISO certified company" width="589" height="314" loading="lazy" decoding="async" />
      <span className="fr-shine" aria-hidden="true" />
    </span>
  );
}
