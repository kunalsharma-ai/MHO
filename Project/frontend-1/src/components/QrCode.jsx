// Brand-coloured, scannable QR code drawn as one SVG path from a precomputed matrix
// (src/data/connectQr.generated.js, built by `npm run qr:connect`). Finder eyes are drawn as rounded squares.
import QR from '../data/connectQr.generated.js';

const cache = {};

function decode(url) {
  if (cache[url]) return cache[url];
  const hit = QR[url];
  if (!hit) return null;
  const [n, b64] = hit;
  const bin = typeof atob === 'function' ? atob(b64) : Buffer.from(b64, 'base64').toString('binary');
  const on = (x, y) => {
    const i = y * n + x;
    return (bin.charCodeAt(i >> 3) >> (7 - (i & 7))) & 1;
  };
  const inEye = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  let d = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!inEye(x, y) && on(x, y)) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return (cache[url] = { n, d });
}

/** <QrCode url color /> — `label` becomes the accessible name. */
export default function QrCode({ url, color = '#0b1b3f', eye, bg = '#fff', size = 120, label, className = '' }) {
  const q = decode(url);
  if (!q) return null;
  const { n, d } = q;
  const pad = 2;
  const eyes = [[0, 0], [n - 7, 0], [0, n - 7]];
  return (
    <svg
      className={`qr ${className}`}
      viewBox={`${-pad} ${-pad} ${n + pad * 2} ${n + pad * 2}`}
      width={size}
      height={size}
      role="img"
      aria-label={label || `QR code for ${url}`}
      shapeRendering="crispEdges"
    >
      <rect x={-pad} y={-pad} width={n + pad * 2} height={n + pad * 2} rx="3" fill={bg} />
      <path d={d} fill={color} />
      {eyes.map(([x, y]) => (
        <g key={`${x}-${y}`} shapeRendering="geometricPrecision">
          <rect x={x + 0.5} y={y + 0.5} width="6" height="6" rx="1.8" fill="none" stroke={eye || color} strokeWidth="1" />
          <rect x={x + 2} y={y + 2} width="3" height="3" rx="0.9" fill={eye || color} />
        </g>
      ))}
    </svg>
  );
}
