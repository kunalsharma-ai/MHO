import { memo } from 'react';

/**
 * Animated MyHealthOpinions logo (vector, crisp at any size, ~2 KB):
 *   the heart beats with a double pulse, the heartbeat line redraws itself, the plus-sparkles twinkle,
 *   a soft halo breathes and a light sweep runs across the wordmark. Pauses with prefers-reduced-motion.
 *   <Logo />            mark + wordmark
 *   <Logo mark />       mark only (monitor, dialogs, flights)
 */
function Logo({ mark = false, size = 40, className = '', label = 'MyHealthOpinions' }) {
  const uid = 'lg' + size + (mark ? 'm' : 'f');
  return (
    <span className={'mho-logo' + (mark ? ' is-mark' : '') + (className ? ' ' + className : '')} style={{ '--lg': size + 'px' }} role="img" aria-label={label}>
      <svg className="lg-mark" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id={uid + 'h'} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E3172D" />
            <stop offset=".55" stopColor="#FF6A00" />
            <stop offset="1" stopColor="#FFC400" />
          </linearGradient>
          <radialGradient id={uid + 'g'} cx=".35" cy=".3" r=".7">
            <stop offset="0" stopColor="#fff" stopOpacity=".75" />
            <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle className="lg-halo" cx="30" cy="34" r="28" />
        <g className="lg-heart">
          <path d="M30 58C11 45 3 35 3 23 3 13 10 6 19 6c5 0 9 3 11 7 2-4 6-7 11-7 9 0 16 7 16 17 0 12-8 22-27 35z" fill={`url(#${uid}h)`} stroke="#1D4F91" strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M30 58C11 45 3 35 3 23 3 13 10 6 19 6c5 0 9 3 11 7 2-4 6-7 11-7 9 0 16 7 16 17 0 12-8 22-27 35z" fill={`url(#${uid}g)`} />
          <polyline className="lg-ecg" points="8,31 19,31 23,22 29,42 34,16 38,34 41,30 53,30" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
        </g>
        <path className="lg-sp s1" d="M53 2h3v4h4v3h-4v4h-3V9h-4V6h4z" fill="#F7A21B" />
        <path className="lg-sp s2" d="M45 10h2v2.5h2.5v2H47V17h-2v-2.5h-2.5v-2H45z" fill="#FFC400" />
        <path className="lg-sp s3" d="M59 15h2v2h2v2h-2v2h-2v-2h-2v-2h2z" fill="#F2611B" />
      </svg>
      {!mark && (
        <span className="lg-word" aria-hidden="true"><b className="lg-a">MyHealth</b><b className="lg-b">Opinions</b></span>
      )}
    </span>
  );
}
export default memo(Logo);
