// Animated Frequent Research logo: gentle 3D sway, a light sweep masked to the artwork and
// pulsing "network nodes" glow. variant="mono" (round FR mark) or "iso" (full lock-up with ISO badges).
const SRC = { mono: '/images/brand/frequent-research-monogram.webp', iso: '/images/brand/frequent-research-iso-logo.webp' };

export default function FrLogo({ variant = 'mono', width, height, alt = 'Frequent Research logo', className = '' }) {
  const src = SRC[variant];
  return (
    <span className={`frlogo fr-${variant} ${className}`} style={{ '--src': `url(${src})` }}>
      <span className="fr-halo" aria-hidden="true" />
      <span className="fr-tilt">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
        <span className="fr-shine" aria-hidden="true" />
        <span className="fr-nodes" aria-hidden="true"><i /><i /><i /><i /></span>
      </span>
    </span>
  );
}
