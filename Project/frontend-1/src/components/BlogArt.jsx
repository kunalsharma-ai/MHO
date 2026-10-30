// Blog cover art (v5): every article gets its OWN illustrated 3D scene, drawn as inline SVG
// (no downloads, sharp at any size, ~1–2 KB each). Scenes use glossy gradients, a soft ground shadow
// and one or two looping motions (coins flip, hands spin, envelopes fly…). Five backdrop styles
// (rays, perspective grid, orbs, dot matrix, waves) rotate across posts so neighbouring cards differ.
//
// Adding a post: give it a scene in SCENE_BY_SLUG below (or it falls back to its category's scene).
// The post's own gradient + badge icon still come from src/data/blogs/index.js → cover.
import { useId } from 'react';
import Icon from './Icon.jsx';
import { LiveZone } from './ui.jsx';

/* ---------- shared bits ---------- */
const Shadow = ({ x = 160, y = 156, rx = 74 }) => <ellipse cx={x} cy={y} rx={rx} ry={rx * 0.13} fill="rgba(10,10,40,.28)" className="bx-shadow" />;

function Coin({ x, y, r = 11, i = 0, cls = 'bx-coin', g, sym = '$' }) {
  return (
    <g className={cls} style={{ '--i': i }}>
      <circle cx={x} cy={y + r * 0.18} r={r} fill="#b45309" />
      <circle cx={x} cy={y} r={r} fill={g('gold')} />
      <circle cx={x} cy={y} r={r * 0.72} fill="none" stroke="#fff7d6" strokeOpacity=".7" strokeWidth="1.2" />
      <text x={x} y={y + r * 0.38} textAnchor="middle" fontSize={r * 1.05} fontWeight="900" fill="#92400e">{sym}</text>
    </g>
  );
}

const Spark = ({ x, y, s = 1, i = 0 }) => (
  <path className="bx-spark" style={{ '--i': i }} d={`M${x} ${y - 7 * s}l${2 * s} ${5 * s} ${5 * s} ${2 * s}-${5 * s} ${2 * s}-${2 * s} ${5 * s}-${2 * s}-${5 * s}-${5 * s}-${2 * s} ${5 * s}-${2 * s}z`} fill="#fff" />
);

const Check = ({ x, y, s = 1, c = '#16a34a', cls = '', i = 0 }) => (
  <path className={cls} style={{ '--i': i }} d={`M${x - 6 * s} ${y}l${4 * s} ${4 * s} ${8 * s}-${9 * s}`} fill="none" stroke={c} strokeWidth={3 * s} strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
);

/* ---------- 30 scenes ---------- */
const SCENES = {
  laptop: ({ g }) => (
    <>
      <Shadow rx={90} />
      <rect x="92" y="44" width="136" height="92" rx="9" fill={g('ink')} />
      <rect x="99" y="51" width="122" height="78" rx="4" fill="#eef2ff" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} className="bx-rise" style={{ '--i': i }} x={108 + i * 21} y={118 - (i + 1) * 11} width="13" height={(i + 1) * 11} rx="2" fill={i === 4 ? '#22c55e' : '#a5b4fc'} />)}
      <polyline points="110,104 132,98 152,88 174,80 200,62" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" className="bx-draw" pathLength="1" />
      <path d="M78 136h164l20 16H58z" fill={g('silver')} />
      <path d="M142 140h36l3 5h-42z" fill="#94a3b8" />
      <Coin x={232} y={52} g={g} i={0} cls="bx-fly" />
      <Coin x={250} y={78} r={9} g={g} i={1} cls="bx-fly" />
      <Coin x={214} y={34} r={8} g={g} i={2} cls="bx-fly" />
    </>
  ),
  clipboard: ({ g }) => (
    <>
      <Shadow rx={64} />
      <g className="bx-tilt">
        <rect x="108" y="30" width="104" height="126" rx="12" fill={g('acc')} />
        <rect x="117" y="42" width="86" height="106" rx="6" fill={g('paper')} />
        <rect x="140" y="24" width="40" height="16" rx="6" fill={g('ink')} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="126" y={56 + i * 22} width="14" height="14" rx="3" fill="#fff" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="148" y={60 + i * 22} width={44 - (i % 2) * 12} height="6" rx="3" fill="#cbd5e1" />
            {i < 3 && <Check x={133} y={63 + i * 22} s={0.8} cls="bx-tick" i={i} />}
          </g>
        ))}
      </g>
      <g className="bx-float f2"><path d="M222 58l14 14-46 46-18 4 4-18z" fill="#fbbf24" /><path d="M222 58l14 14 6-6-14-14z" fill="#f472b6" /><path d="M176 122l-4 4 4-14z" fill="#1e293b" /></g>
      <Spark x={92} y={48} i={0} /><Spark x={240} y={128} i={1} s={0.8} />
    </>
  ),
  scale: ({ g }) => (
    <>
      <Shadow rx={70} />
      <path d="M150 150h20l-4-96h-12z" fill={g('silver')} />
      <rect x="128" y="146" width="64" height="10" rx="5" fill={g('ink')} />
      <circle cx="160" cy="50" r="8" fill={g('gold')} />
      <g className="bx-swing">
        <rect x="76" y="47" width="168" height="6" rx="3" fill={g('ink')} />
        <path d="M86 53l-18 42M86 53l18 42M234 53l-18 42M234 53l18 42" stroke="#e2e8f0" strokeWidth="1.5" />
        <path d="M60 95h52a26 10 0 0 1-52 0z" fill="#22c55e" />
        <path d="M208 95h52a26 10 0 0 1-52 0z" fill="#ef4444" />
        <circle cx="86" cy="80" r="13" fill="#fff" /><Check x={86} y={80} s={0.9} />
        <circle cx="234" cy="80" r="13" fill="#fff" /><path d="M228 74l12 12M240 74l-12 12" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
        <text x="86" y="125" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff">12</text>
        <text x="234" y="125" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff">5</text>
      </g>
    </>
  ),
  magnifier: ({ g }) => (
    <>
      <Shadow rx={78} />
      <g transform="rotate(-6 150 95)">
        <rect x="88" y="34" width="120" height="118" rx="10" fill={g('paper')} />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="102" y={52 + i * 18} width={i === 2 ? 70 : 90 - (i % 2) * 18} height="7" rx="3.5" fill={i === 2 ? '#fca5a5' : '#e2e8f0'} />)}
        <path d="M184 86v-22l16 6-16 6" fill="#ef4444" className="bx-wave" />
      </g>
      <g className="bx-scan">
        <circle cx="196" cy="88" r="30" fill="rgba(255,255,255,.28)" stroke={g('ink')} strokeWidth="9" />
        <circle cx="196" cy="88" r="30" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeDasharray="30 160" />
        <path d="M217 109l26 26" stroke={g('ink')} strokeWidth="13" strokeLinecap="round" />
      </g>
    </>
  ),
  house: ({ g }) => (
    <>
      <Shadow rx={76} />
      <path d="M104 92h112v62H104z" fill={g('paper')} />
      <path d="M216 92l18-10v64l-18 8z" fill="#cbd5e1" />
      <path d="M92 96l68-56 68 56z" fill={g('acc')} />
      <path d="M228 96l12-8-80-48h-4z" fill="rgba(0,0,0,.18)" />
      <rect x="190" y="44" width="16" height="28" fill={g('ink')} />
      <rect x="116" y="106" width="50" height="34" rx="4" fill="#1e293b" />
      <rect x="120" y="110" width="42" height="26" rx="2" fill="#e0f2fe" />
      <Check x={132} y={121} s={0.7} cls="bx-tick" /><rect x="140" y="118" width="16" height="4" rx="2" fill="#94a3b8" /><rect x="128" y="128" width="26" height="4" rx="2" fill="#94a3b8" />
      <rect x="178" y="112" width="24" height="42" rx="3" fill="#7c2d12" /><circle cx="196" cy="134" r="2" fill="#fde68a" />
      <Coin x={198} y={34} r={8} g={g} i={0} cls="bx-smoke" /><Coin x={198} y={34} r={8} g={g} i={1} cls="bx-smoke" /><Coin x={198} y={34} r={8} g={g} i={2} cls="bx-smoke" />
    </>
  ),
  bulb: ({ g }) => (
    <>
      <Shadow rx={46} />
      <g className="bx-rays">{Array.from({ length: 10 }).map((_, i) => <rect key={i} x="158" y="10" width="4" height="14" rx="2" fill="#fff" opacity=".8" transform={`rotate(${i * 36} 160 74)`} />)}</g>
      <circle cx="160" cy="74" r="44" fill={g('bulb')} className="bx-glow" />
      <ellipse cx="146" cy="58" rx="12" ry="18" fill="#fff" opacity=".55" transform="rotate(30 146 58)" />
      {[0, 1, 2].map((i) => <Coin key={i} x={160} y={92 - i * 8} r={11} g={g} cls="" />)}
      <path d="M140 112h40l-4 14h-32z" fill={g('silver')} />
      <rect x="142" y="126" width="36" height="6" rx="3" fill="#64748b" /><rect x="144" y="134" width="32" height="6" rx="3" fill="#94a3b8" /><path d="M150 142h20l-4 8h-12z" fill="#475569" />
    </>
  ),
  stethoscope: ({ g }) => (
    <>
      <Shadow rx={80} />
      <g transform="rotate(-8 130 92)">
        <rect x="70" y="44" width="116" height="80" rx="10" fill={g('paper')} />
        <rect x="70" y="44" width="116" height="20" rx="10" fill={g('acc')} />
        <circle cx="98" cy="90" r="16" fill="#c7d2fe" /><circle cx="98" cy="85" r="7" fill="#6366f1" /><path d="M86 102a12 9 0 0 1 24 0z" fill="#6366f1" />
        <rect x="124" y="78" width="48" height="6" rx="3" fill="#cbd5e1" /><rect x="124" y="92" width="34" height="6" rx="3" fill="#cbd5e1" />
        <polyline points="124,112 136,112 141,103 147,120 152,112 172,112" fill="none" stroke="#ef4444" strokeWidth="2.5" className="bx-draw" pathLength="1" />
      </g>
      <path d="M206 38c-20 0-24 30-14 54s30 30 30 52" fill="none" stroke={g('ink')} strokeWidth="7" strokeLinecap="round" />
      <path d="M236 38c20 0 18 30 6 50" fill="none" stroke={g('ink')} strokeWidth="7" strokeLinecap="round" />
      <circle cx="206" cy="36" r="5" fill="#94a3b8" /><circle cx="236" cy="36" r="5" fill="#94a3b8" />
      <g className="bx-beat"><circle cx="222" cy="146" r="16" fill={g('silver')} /><path d="M222 154l-8-8a5 5 0 0 1 8-6 5 5 0 0 1 8 6z" fill="#ef4444" /></g>
    </>
  ),
  fobwatch: ({ g }) => (
    <>
      <Shadow rx={56} />
      <rect x="152" y="18" width="16" height="12" rx="4" fill={g('gold')} />
      <circle cx="160" cy="88" r="56" fill={g('gold')} />
      <circle cx="160" cy="88" r="46" fill={g('paper')} />
      {Array.from({ length: 12 }).map((_, i) => <rect key={i} x="159" y="46" width="2" height={i % 3 ? 5 : 9} fill="#475569" transform={`rotate(${i * 30} 160 88)`} />)}
      <path d="M160 64v-9M152 60h16" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
      <rect x="158" y="56" width="4" height="34" rx="2" fill={g('ink')} className="bx-spin slow" />
      <rect x="158.8" y="62" width="2.4" height="28" rx="1.2" fill="#ef4444" className="bx-spin" />
      <circle cx="160" cy="88" r="4" fill={g('ink')} />
      <g className="bx-float"><circle cx="246" cy="48" r="14" fill="#fde68a" /><circle cx="252" cy="44" r="12" style={{ fill: 'var(--bk2)' }} /></g>
      <g className="bx-float f2"><circle cx="76" cy="122" r="12" fill="#fbbf24" />{[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x="75" y="102" width="2" height="5" fill="#fbbf24" transform={`rotate(${i * 60} 76 122)`} />)}</g>
    </>
  ),
  handsheart: ({ g }) => (
    <>
      <Shadow rx={84} />
      <g className="bx-beat">
        <path d="M160 108l-34-32a20 20 0 0 1 34-24 20 20 0 0 1 34 24z" fill={g('heart')} />
        <ellipse cx="140" cy="64" rx="7" ry="10" fill="#fff" opacity=".5" transform="rotate(-30 140 64)" />
      </g>
      <path d="M74 120c14-4 40 0 62 8 10 4 16 12 22 20H94c-10 0-20-6-24-14z" fill="#fdba74" />
      <path d="M246 120c-14-4-40 0-62 8-10 4-16 12-22 20h64c10 0 20-6 24-14z" fill="#f59e0b" />
      <path d="M60 116h20l10 32H66z" fill={g('acc')} /><path d="M260 116h-20l-10 32h24z" fill={g('acc')} />
      <Spark x={110} y={50} i={0} /><Spark x={214} y={44} i={1} s={0.8} /><Spark x={226} y={88} i={2} s={0.6} />
    </>
  ),
  phoneheart: ({ g }) => (
    <>
      <Shadow rx={56} />
      <g transform="rotate(8 140 94)">
        <rect x="104" y="22" width="76" height="140" rx="14" fill={g('ink')} />
        <rect x="110" y="32" width="64" height="120" rx="8" fill="#f0fdfa" />
        <path d="M142 72l-14-13a8 8 0 0 1 14-10 8 8 0 0 1 14 10z" fill="#ef4444" className="bx-beat" />
        <polyline points="114,96 128,96 134,86 140,108 146,96 170,96" fill="none" stroke="#10b981" strokeWidth="2.5" className="bx-draw" pathLength="1" />
        <rect x="118" y="116" width="48" height="8" rx="4" fill="#cbd5e1" /><rect x="118" y="130" width="32" height="8" rx="4" fill="#cbd5e1" />
      </g>
      <g className="bx-pop" style={{ '--i': 0 }}><rect x="190" y="44" width="62" height="28" rx="12" fill="#fff" /><path d="M198 72l-4 8 12-8z" fill="#fff" /><circle cx="206" cy="58" r="3" fill="#10b981" /><circle cx="218" cy="58" r="3" fill="#10b981" /><circle cx="230" cy="58" r="3" fill="#10b981" /></g>
      <g className="bx-pop" style={{ '--i': 1 }}><rect x="196" y="90" width="54" height="24" rx="10" fill={g('acc')} /><Check x={223} y={102} s={0.7} c="#fff" /></g>
    </>
  ),
  versus: ({ g }) => (
    <>
      <Shadow x={100} rx={44} /><Shadow x={226} rx={44} />
      <path d="M90 40h20v34l26 48a14 14 0 0 1-12 22H76a14 14 0 0 1-12-22l26-48z" fill="rgba(255,255,255,.85)" />
      <path d="M70 116h60l6 6a14 14 0 0 1-12 22H76a14 14 0 0 1-12-22z" fill="#06b6d4" />
      <circle cx="92" cy="128" r="4" fill="#fff" className="bx-bubble" style={{ '--i': 0 }} /><circle cx="108" cy="132" r="3" fill="#fff" className="bx-bubble" style={{ '--i': 1 }} />
      <rect x="86" y="34" width="28" height="8" rx="3" fill={g('ink')} />
      <rect x="200" y="46" width="64" height="94" rx="8" fill={g('paper')} /><rect x="218" y="40" width="28" height="12" rx="4" fill={g('ink')} />
      {[0, 1, 2].map((i) => <g key={i}><Check x={214} y={72 + i * 22} s={0.7} /><rect x="224" y={68 + i * 22} width="30" height="6" rx="3" fill="#cbd5e1" /></g>)}
      <g className="bx-beat"><circle cx="160" cy="92" r="22" fill={g('gold')} /><text x="160" y="99" textAnchor="middle" fontSize="18" fontWeight="900" fill="#7c2d12">VS</text></g>
    </>
  ),
  dna: ({ g }) => (
    <>
      <Shadow rx={84} />
      <path d="M84 58l58-26 58 26z" fill={g('paper')} />
      <rect x="86" y="58" width="112" height="8" fill="#cbd5e1" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={94 + i * 27} y="68" width="14" height="70" fill={g('paper')} />)}
      <rect x="80" y="138" width="124" height="12" rx="2" fill={g('silver')} />
      <g>
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 36 + i * 13;
          const dx = Math.sin(i * 0.8) * 16;
          return (
            <g key={i} className="bx-helix" style={{ '--i': i }}>
              <line x1={240 - dx} y1={y} x2={240 + dx} y2={y} stroke="#fff" strokeOpacity=".6" strokeWidth="2" />
              <circle cx={240 - dx} cy={y} r="5" fill="#f472b6" /><circle cx={240 + dx} cy={y} r="5" fill="#38bdf8" />
            </g>
          );
        })}
      </g>
    </>
  ),
  dice: ({ g }) => {
    const Die = ({ x, y, c, pips, cls }) => (
      <g className={cls}>
        <path d={`M${x} ${y}l26-14 26 14-26 14z`} fill="#fff" />
        <path d={`M${x} ${y}l26 14v30l-26-14z`} fill="#e2e8f0" />
        <path d={`M${x + 52} ${y}l-26 14v30l26-14z`} fill="#cbd5e1" />
        {pips.map(([px, py], i) => <ellipse key={i} cx={x + px} cy={y + py} rx="3" ry="2" fill={c} />)}
      </g>
    );
    return (
      <>
        <Shadow rx={84} />
        <Die x={92} y={82} c="#ef4444" pips={[[26, 0], [14, -4], [38, 4]]} cls="bx-tumble" />
        <Die x={170} y={96} c="#2563eb" pips={[[16, -3], [36, 3], [16, 4], [36, -4]]} cls="bx-tumble t2" />
        <g className="bx-float"><rect x="214" y="38" width="44" height="18" rx="9" fill="#fff" transform="rotate(-24 236 47)" /><rect x="236" y="38" width="22" height="18" rx="9" fill="#f97316" transform="rotate(-24 236 47)" /></g>
        <g className="bx-float f2"><rect x="62" y="46" width="40" height="16" rx="8" fill="#fff" transform="rotate(20 82 54)" /><rect x="62" y="46" width="20" height="16" rx="8" fill="#8b5cf6" transform="rotate(20 82 54)" /></g>
      </>
    );
  },
  walletplane: ({ g }) => (
    <>
      <Shadow x={150} rx={70} />
      <rect x="88" y="70" width="124" height="80" rx="14" fill={g('ink')} />
      <rect x="88" y="70" width="124" height="22" rx="10" fill="#334155" />
      <rect x="170" y="98" width="52" height="32" rx="10" fill={g('acc')} /><circle cx="186" cy="114" r="6" fill="#fff" />
      <rect x="100" y="60" width="74" height="20" rx="4" fill="#22c55e" transform="rotate(-6 137 70)" />
      <g className="bx-plane">
        <path d="M206 30l60-16-22 52-12-18z" fill="#fff" /><path d="M232 48l34-34-30 40z" fill="#cbd5e1" />
        <Coin x={222} y={58} r={9} g={g} cls="" />
      </g>
      <path d="M150 52c20-24 40-26 54-26" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeDasharray="4 6" className="bx-dash" />
    </>
  ),
  giftcard: ({ g }) => (
    <>
      <Shadow rx={70} />
      <g className="bx-cardout"><rect x="120" y="30" width="96" height="60" rx="8" fill={g('acc')} transform="rotate(-12 168 60)" /><rect x="130" y="58" width="40" height="6" rx="3" fill="#fff" opacity=".8" transform="rotate(-12 168 60)" /><circle cx="196" cy="44" r="8" fill={g('gold')} /></g>
      <path d="M100 92h120v58H100z" fill="#ec4899" /><path d="M220 92l16-8v58l-16 8z" fill="#be185d" />
      <path d="M94 80h132l14-8H108z" fill="#f9a8d4" /><rect x="94" y="80" width="132" height="16" fill="#f472b6" />
      <rect x="152" y="80" width="16" height="70" fill="#fde047" /><path d="M226 80l14-8v16l-14 8z" fill="#db2777" />
      <path d="M160 80c-16-22-36-14-28-4 6 6 20 4 28 4zM160 80c16-22 36-14 28-4-6 6-20 4-28 4z" fill="#fde047" stroke="#eab308" strokeWidth="2" />
      <Spark x={86} y={60} i={0} /><Spark x={248} y={100} i={1} s={0.7} />
    </>
  ),
  qrphone: ({ g }) => {
    const cells = [];
    for (let r = 0; r < 7; r += 1) for (let c = 0; c < 7; c += 1) if (((r * 7 + c) * 37) % 5 < 2 || (r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2)) cells.push([r, c]);
    return (
      <>
        <Shadow rx={60} />
        <rect x="112" y="18" width="80" height="146" rx="14" fill={g('ink')} />
        <rect x="118" y="28" width="68" height="126" rx="8" fill="#fff" />
        {cells.map(([r, c]) => <rect key={`${r}${c}`} x={128 + c * 7} y={50 + r * 7} width="6" height="6" rx="1" fill="#1e1b4b" />)}
        <rect x="124" y="48" width="56" height="3" fill="#22c55e" className="bx-scanv" />
        <rect x="126" y="112" width="52" height="10" rx="5" fill="#ede9fe" /><rect x="126" y="128" width="52" height="14" rx="7" fill={g('acc')} />
        <Coin x={226} y={70} r={20} g={g} sym="₹" cls="bx-bounce" />
        <Coin x={82} y={112} r={12} g={g} sym="₹" cls="bx-bounce" i={1} />
      </>
    );
  },
  browsers: ({ g }) => (
    <>
      <Shadow rx={86} />
      <g transform="translate(-14 -10)" opacity=".75"><rect x="90" y="40" width="150" height="96" rx="10" fill="#e2e8f0" /></g>
      <rect x="90" y="40" width="150" height="104" rx="10" fill={g('paper')} />
      <rect x="90" y="40" width="150" height="18" rx="9" fill={g('ink')} />
      {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => <circle key={c} cx={102 + i * 10} cy="49" r="3" fill={c} />)}
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x="102" y={68 + r * 24} width="16" height="16" rx="4" fill="#e0e7ff" />
          {[0, 1, 2, 3, 4].map((s) => <path key={s} className="bx-star" style={{ '--i': r * 5 + s }} d={`M${130 + s * 15} ${70 + r * 24}l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z`} fill={s < 4 - (r === 1) ? '#f59e0b' : '#e2e8f0'} />)}
          {r !== 2 && <Check x={222} y={77 + r * 24} s={0.8} cls="bx-tick" i={r} />}
        </g>
      ))}
    </>
  ),
  podium: ({ g }) => (
    <>
      <Shadow rx={90} />
      {[[70, 4, 0.55], [100, 8, 0.75], [130, 12, 1]].map(([x, , h], i) => <rect key={x} className="bx-rise" style={{ '--i': i }} x={x + 120} y={150 - 90 * h} width="18" height={90 * h} rx="3" fill="#fff" opacity={0.35 + i * 0.2} />)}
      <rect x="62" y="112" width="44" height="40" fill={g('silver')} /><rect x="106" y="94" width="48" height="58" fill={g('acc')} /><rect x="154" y="122" width="40" height="30" fill="#f97316" />
      <text x="130" y="132" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">1</text>
      <g className="bx-float">
        <path d="M112 42h36v14a18 18 0 0 1-36 0z" fill={g('gold')} />
        <path d="M112 46h-8a8 8 0 0 0 8 12M148 46h8a8 8 0 0 1-8 12" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <rect x="126" y="72" width="8" height="10" fill="#d97706" /><rect x="118" y="80" width="24" height="7" rx="2" fill="#92400e" />
      </g>
      <Spark x={100} y={36} i={0} /><Spark x={166} y={30} i={1} s={0.8} />
    </>
  ),
  gradcap: ({ g }) => (
    <>
      <Shadow rx={74} />
      <rect x="96" y="128" width="120" height="20" rx="3" fill="#2563eb" /><rect x="98" y="132" width="116" height="4" fill="#fff" opacity=".8" />
      <rect x="104" y="110" width="108" height="18" rx="3" fill="#f43f5e" /><rect x="106" y="114" width="104" height="3" fill="#fff" opacity=".8" />
      <rect x="92" y="92" width="114" height="18" rx="3" fill="#10b981" /><rect x="94" y="96" width="110" height="3" fill="#fff" opacity=".8" />
      <g className="bx-float">
        <path d="M118 66v16c0 8 84 8 84 0V66z" fill={g('ink')} />
        <path d="M160 34l70 26-70 26-70-26z" fill="#1e293b" /><path d="M160 34l70 26-70 26z" fill="#334155" />
        <g className="bx-swing"><path d="M214 60v34" stroke="#fbbf24" strokeWidth="3" /><rect x="209" y="92" width="10" height="14" rx="3" fill="#fbbf24" /></g>
      </g>
      <Coin x={248} y={120} r={12} g={g} />
    </>
  ),
  rota: ({ g }) => (
    <>
      <Shadow rx={76} />
      <rect x="92" y="54" width="136" height="98" rx="10" fill={g('paper')} />
      <rect x="92" y="54" width="136" height="24" rx="10" fill={g('acc')} />
      <rect x="114" y="46" width="6" height="16" rx="3" fill={g('ink')} /><rect x="200" y="46" width="6" height="16" rx="3" fill={g('ink')} />
      {Array.from({ length: 14 }).map((_, i) => <rect key={i} className={i === 4 || i === 9 ? 'bx-blink' : ''} x={102 + (i % 7) * 17} y={86 + Math.floor(i / 7) * 26} width="13" height="20" rx="3" fill={[1, 4, 9, 12].includes(i) ? '#6366f1' : [2, 6, 10].includes(i) ? '#14b8a6' : '#e2e8f0'} />)}
      <g className="bx-spin slow" style={{ transformOrigin: '250px 46px' }}>
        <path d="M250 22a24 24 0 0 1 0 48z" fill="#fbbf24" /><path d="M250 22a24 24 0 0 0 0 48z" fill="#312e81" />
        <circle cx="240" cy="40" r="2" fill="#fff" /><circle cx="236" cy="54" r="1.5" fill="#fff" />
      </g>
    </>
  ),
  phonecoins: ({ g }) => (
    <>
      <Shadow rx={60} />
      <rect x="120" y="40" width="80" height="120" rx="14" fill={g('ink')} />
      <rect x="126" y="50" width="68" height="100" rx="8" fill="#f5f3ff" />
      {[0, 1, 2].map((i) => <g key={i} className="bx-pop" style={{ '--i': i }}><rect x="131" y={58 + i * 28} width="58" height="22" rx="6" fill="#fff" stroke="#e9d5ff" /><circle cx="141" cy={69 + i * 28} r="6" fill={g('acc')} /><rect x="151" y={64 + i * 28} width="32" height="4" rx="2" fill="#a78bfa" /><rect x="151" y={72 + i * 28} width="20" height="4" rx="2" fill="#ddd6fe" /></g>)}
      {[0, 1, 2, 3].map((i) => <Coin key={i} x={[100, 228, 112, 214][i]} y={20} r={[10, 12, 8, 9][i]} g={g} i={i} cls="bx-drop" />)}
    </>
  ),
  funnel: ({ g }) => (
    <>
      <Shadow rx={50} />
      <ellipse cx="160" cy="40" rx="70" ry="14" fill="rgba(255,255,255,.4)" />
      <path d="M90 40h140l-50 62v38l-40 14v-52z" fill={g('paper')} />
      <path d="M104 58h112l-36 44v38l-40 14v-52z" fill="#e0e7ff" />
      <path d="M160 58h56l-36 44v38l-40 14z" fill="#a5b4fc" />
      <path d="M140 108h40v32l-40 14z" fill="#6366f1" />
      <ellipse cx="160" cy="40" rx="70" ry="14" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M100 46l50 60" stroke="#fff" strokeOpacity=".35" strokeWidth="6" />
      {['#f43f5e', '#fde047', '#22c55e', '#f472b6', '#38bdf8', '#f97316'].map((c, i) => <circle key={i} className="bx-funnel" style={{ '--i': i }} cx={110 + i * 20} cy="14" r="5" fill={c} />)}
      <circle cx="160" cy="160" r="6" fill="#22c55e" className="bx-drip" />
      <circle cx="232" cy="120" r="5" fill="#fff" opacity=".6" /><circle cx="246" cy="138" r="4" fill="#fff" opacity=".4" />
    </>
  ),
  mailbox: ({ g }) => (
    <>
      <Shadow rx={56} x={150} />
      <rect x="144" y="100" width="12" height="54" fill="#475569" />
      <path d="M104 64a28 28 0 0 1 28-28h56v70H104z" fill={g('acc')} />
      <path d="M188 36a24 28 0 0 1 24 28v42h-24z" fill={g('ink')} />
      <rect x="112" y="70" width="48" height="6" rx="3" fill="#fff" opacity=".6" />
      <g className="bx-flag"><rect x="214" y="44" width="4" height="40" fill="#94a3b8" /><path d="M218 44h22l-6 8 6 8h-22z" fill="#ef4444" /></g>
      {[0, 1, 2].map((i) => (
        <g key={i} className="bx-mail" style={{ '--i': i }}>
          <rect x="40" y="40" width="34" height="22" rx="3" fill="#fff" /><path d="M40 40l17 12 17-12" fill="none" stroke="#cbd5e1" strokeWidth="2" />
        </g>
      ))}
    </>
  ),
  videogrid: ({ g }) => (
    <>
      <Shadow rx={84} />
      <rect x="84" y="28" width="152" height="114" rx="12" fill={g('ink')} />
      {[0, 1, 2, 3].map((i) => {
        const x = 92 + (i % 2) * 70;
        const y = 36 + Math.floor(i / 2) * 50;
        const cs = ['#f472b6', '#38bdf8', '#fbbf24', '#a78bfa'];
        return (
          <g key={i}>
            <rect x={x} y={y} width="66" height="46" rx="6" fill="#1e293b" stroke={i === 1 ? '#22c55e' : 'none'} strokeWidth="2.5" className={i === 1 ? 'bx-blink' : ''} />
            <circle cx={x + 33} cy={y + 19} r="8" fill={cs[i]} /><path d={`M${x + 19} ${y + 46}a14 12 0 0 1 28 0z`} fill={cs[i]} />
          </g>
        );
      })}
      <g className="bx-float"><rect x="236" y="88" width="18" height="30" rx="9" fill={g('silver')} /><path d="M230 108a15 15 0 0 0 30 0" fill="none" stroke="#fff" strokeWidth="3" /><rect x="243" y="122" width="4" height="10" fill="#fff" /></g>
      {[0, 1, 2].map((i) => <rect key={i} className="bx-eq" style={{ '--i': i }} x={68 + i * 6} y="104" width="4" height="22" rx="2" fill="#fff" />)}
    </>
  ),
  pie: ({ g }) => (
    <>
      <Shadow rx={70} x={150} />
      <path d="M86 110v14a64 26 0 0 0 128 0v-14" fill="#1e293b" opacity=".35" />
      <ellipse cx="150" cy="110" rx="64" ry="26" fill={g('paper')} />
      <path d="M150 110L150 84A64 26 0 0 1 214 110z" fill="#6366f1" />
      <path d="M150 110L214 110A64 26 0 0 1 120 133z" fill="#14b8a6" />
      <g className="bx-float"><path d="M166 98L166 72A64 26 0 0 0 102 90z" fill="#f59e0b" /><path d="M102 90v10l64 8v-10z" fill="#b45309" opacity=".6" /></g>
      <g className="bx-pop" style={{ '--i': 0 }}><rect x="206" y="30" width="56" height="26" rx="12" fill="#fff" /><path d="M214 56l-2 8 10-8z" fill="#fff" /><rect x="216" y="40" width="34" height="5" rx="2.5" fill="#94a3b8" /></g>
      <g className="bx-pop" style={{ '--i': 1 }}><rect x="60" y="36" width="48" height="24" rx="11" fill={g('acc')} /><path d="M98 60l4 8-12-8z" fill={g('acc')} /><text x="84" y="53" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">?</text></g>
    </>
  ),
  lock: ({ g }) => (
    <>
      <Shadow rx={58} />
      <g className="bx-spin slower" style={{ transformOrigin: '160px 92px' }}>
        {Array.from({ length: 12 }).map((_, i) => <path key={i} d="M160 26l2.4 4.9 5.4.8-3.9 3.8.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.9-3.8 5.4-.8z" fill="#fde047" transform={`rotate(${i * 30} 160 92)`} />)}
      </g>
      <path d="M134 84V68a26 26 0 0 1 52 0v16" fill="none" stroke={g('silver')} strokeWidth="11" className="bx-shackle" />
      <rect x="120" y="80" width="80" height="66" rx="14" fill={g('acc')} />
      <rect x="120" y="80" width="80" height="16" rx="8" fill="#fff" opacity=".18" />
      <circle cx="160" cy="108" r="9" fill={g('ink')} /><path d="M156 112h8l3 18h-14z" fill={g('ink')} />
    </>
  ),
  pillbottle: ({ g }) => (
    <>
      <Shadow rx={64} />
      <rect x="118" y="34" width="68" height="22" rx="6" fill={g('paper')} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={124 + i * 12} y="36" width="4" height="18" fill="#e2e8f0" />)}
      <rect x="112" y="54" width="80" height="98" rx="14" fill="#d97706" />
      <rect x="120" y="80" width="64" height="44" rx="6" fill="#fff" />
      <path d="M144 102h16M152 94v16" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
      <rect x="118" y="62" width="10" height="80" rx="5" fill="#fff" opacity=".25" />
      <g className="bx-float"><rect x="206" y="52" width="40" height="16" rx="8" fill="#fff" transform="rotate(30 226 60)" /><rect x="206" y="52" width="20" height="16" rx="8" fill="#22c55e" transform="rotate(30 226 60)" /></g>
      <g className="bx-float f2"><circle cx="88" cy="70" r="11" fill="#fff" /><rect x="80" y="69" width="16" height="2" fill="#cbd5e1" /></g>
      <Coin x={232} y={120} r={13} g={g} />
    </>
  ),
  teacup: ({ g }) => (
    <>
      <Shadow rx={78} />
      <ellipse cx="156" cy="146" rx="72" ry="12" fill={g('paper')} />
      <path d="M100 82h112l-10 50a20 20 0 0 1-20 16h-52a20 20 0 0 1-20-16z" fill={g('acc')} />
      <ellipse cx="156" cy="82" rx="56" ry="10" fill="#7c2d12" /><ellipse cx="156" cy="82" rx="56" ry="10" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M210 92c22-4 28 26 0 30" fill="none" stroke={g('acc')} strokeWidth="9" />
      <path d="M118 96c2 18 8 36 18 44" stroke="#fff" strokeOpacity=".35" strokeWidth="6" fill="none" strokeLinecap="round" />
      {[0, 1, 2].map((i) => <path key={i} className="bx-steam" style={{ '--i': i }} d={`M${138 + i * 18} 70c-8-10 8-16 0-28`} fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />)}
      <Coin x={240} y={50} r={11} g={g} cls="bx-smoke" i={0} /><Coin x={240} y={50} r={11} g={g} cls="bx-smoke" i={1} />
    </>
  ),
  stopwatch: ({ g }) => (
    <>
      <Shadow rx={58} />
      <rect x="150" y="16" width="20" height="14" rx="4" fill={g('silver')} />
      <rect x="196" y="34" width="14" height="10" rx="3" fill={g('silver')} transform="rotate(40 203 39)" />
      <circle cx="160" cy="92" r="58" fill={g('acc')} />
      <circle cx="160" cy="92" r="48" fill={g('paper')} />
      <path d="M160 92L160 44A48 48 0 0 1 201 68z" fill="#fde68a" className="bx-sweep" />
      {Array.from({ length: 12 }).map((_, i) => <rect key={i} x="159" y="48" width="2" height="6" fill="#475569" transform={`rotate(${i * 30} 160 92)`} />)}
      <rect x="158.5" y="52" width="3" height="42" rx="1.5" fill="#ef4444" className="bx-spin fast" />
      <circle cx="160" cy="92" r="5" fill={g('ink')} />
      <path className="bx-zap" d="M246 40l-20 34h14l-10 30 26-40h-14l10-24z" fill="#fde047" stroke="#f59e0b" strokeWidth="2" />
    </>
  ),
  calculator: ({ g }) => (
    <>
      <Shadow rx={84} />
      <g transform="rotate(-6 132 92)">
        <rect x="88" y="30" width="88" height="124" rx="12" fill={g('ink')} />
        <rect x="98" y="40" width="68" height="26" rx="5" fill="#bbf7d0" />
        <text x="160" y="59" textAnchor="end" fontSize="14" fontWeight="800" fill="#14532d" className="bx-blink">$$$</text>
        {Array.from({ length: 12 }).map((_, i) => <rect key={i} x={98 + (i % 3) * 24} y={74 + Math.floor(i / 3) * 19} width="18" height="14" rx="4" fill={i % 3 === 2 ? '#f97316' : '#475569'} />)}
      </g>
      {[0, 1, 2].map((s) => Array.from({ length: 2 + s * 2 }).map((_, k) => <g key={`${s}${k}`} className="bx-stack" style={{ '--i': k + s * 2 }}><ellipse cx={200 + s * 26} cy={148 - k * 7} rx="11" ry="4" fill="#b45309" /><ellipse cx={200 + s * 26} cy={146 - k * 7} rx="11" ry="4" fill={g('gold')} /></g>))}
      <Spark x={250} y={70} i={0} />
    </>
  ),
};

/* Which scene each post uses — one per article, never repeated side by side. */
const SCENE_BY_SLUG = {
  'earn-money-online-without-investment': 'laptop',
  'paid-surveys-for-money-beginners-guide': 'clipboard',
  'legit-ways-to-make-money-online': 'scale',
  'are-online-surveys-for-money-legit': 'magnifier',
  'get-paid-to-take-surveys-from-home': 'house',
  'make-money-from-home-side-income-ideas': 'bulb',
  'paid-surveys-for-doctors': 'stethoscope',
  'paid-surveys-for-nurses': 'fobwatch',
  'caregiver-surveys-get-paid-for-your-opinion': 'handsheart',
  'paid-health-surveys-for-patients': 'phoneheart',
  'paid-clinical-studies-vs-paid-surveys': 'versus',
  'what-is-a-clinical-research-organization': 'dna',
  'randomised-clinical-trials-explained': 'dice',
  'surveys-that-pay-via-paypal': 'walletplane',
  'surveys-for-amazon-gift-cards': 'giftcard',
  'upi-survey-rewards-earn-online-india': 'qrphone',
  'best-paid-survey-sites-checklist': 'browsers',
  'high-paying-surveys-what-sets-the-reward': 'podium',
  'online-jobs-for-students-without-investment': 'gradcap',
  'side-hustle-for-healthcare-workers': 'rota',
  'make-money-from-your-phone-with-surveys': 'phonecoins',
  'why-you-get-screened-out-of-surveys': 'funnel',
  'get-more-paid-survey-invitations': 'mailbox',
  'online-focus-groups-paid': 'videogrid',
  'paid-online-market-research-explained': 'pie',
  'survey-privacy-and-gdpr': 'lock',
  'extra-income-ideas-for-pharmacists': 'pillbottle',
  'extra-income-from-home-for-retirees-and-homemakers': 'teacup',
  'surveys-that-pay-instantly-truth': 'stopwatch',
  'how-much-can-you-earn-from-paid-surveys': 'calculator',
};
const BY_CATEGORY = { 'Earn Online': 'laptop', 'Paid Surveys': 'clipboard', 'Healthcare Professionals': 'stethoscope', 'Rewards & Payouts': 'giftcard', 'Clinical Research': 'dna', 'Safety & Privacy': 'lock' };

/* ---------- backdrops ---------- */
const BACKDROPS = ['rays', 'grid', 'orbs', 'dots', 'waves'];
function Backdrop({ kind, g }) {
  if (kind === 'rays') return <g className="bk-rays" opacity=".22">{Array.from({ length: 12 }).map((_, i) => <path key={i} d="M160 90L148 -120h24z" fill="#fff" transform={`rotate(${i * 30} 160 90)`} />)}</g>;
  if (kind === 'grid') {
    return (
      <g opacity=".35" stroke="#fff" strokeWidth="1">
        {Array.from({ length: 11 }).map((_, i) => <line key={`v${i}`} x1={160 + (i - 5) * 14} y1="118" x2={160 + (i - 5) * 70} y2="190" />)}
        {[122, 130, 142, 158, 180].map((y) => <line key={y} x1="0" y1={y} x2="320" y2={y} className="bk-gridline" />)}
      </g>
    );
  }
  if (kind === 'orbs') return <g className="bk-orbs"><circle cx="56" cy="40" r="46" fill="#fff" opacity=".16" /><circle cx="286" cy="150" r="60" fill={g('ink')} opacity=".16" /><circle cx="270" cy="30" r="20" fill="#fff" opacity=".2" /></g>;
  if (kind === 'dots') return <g opacity=".3">{Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={10 + (i % 12) * 27} cy={12 + Math.floor(i / 12) * 38} r={1.6 + ((i * 7) % 3) * 0.6} fill="#fff" />)}</g>;
  return (
    <g opacity=".22" className="bk-waves">
      <path d="M-40 140q40-18 80 0t80 0 80 0 80 0 80 0 80 0v60H-40z" fill="#fff" />
      <path d="M-40 156q40-14 80 0t80 0 80 0 80 0 80 0 80 0v60H-40z" fill="#fff" />
    </g>
  );
}

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

export default function BlogArt({ post, big = false }) {
  const raw = useId();
  const id = 'b' + raw.replace(/[^a-zA-Z0-9]/g, '');
  const g = (n) => `url(#${id}-${n})`;
  const key = SCENE_BY_SLUG[post.slug] || BY_CATEGORY[post.category] || 'clipboard';
  const Scene = SCENES[key];
  const bk = BACKDROPS[hash(post.slug || key) % BACKDROPS.length];
  const { from, to } = post.cover;
  return (
    <LiveZone className={`cover bart bart5 sc-${key} ${big ? 'cover-big' : ''}`} style={{ '--from': from, '--to': to, '--bk2': to }} aria-hidden="true">
      <svg viewBox="0 0 320 180" className="bart-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff3b0" /><stop offset=".45" stopColor="#fbbf24" /><stop offset="1" stopColor="#d97706" /></linearGradient>
          <linearGradient id={`${id}-silver`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f8fafc" /><stop offset="1" stopColor="#94a3b8" /></linearGradient>
          <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e5e7eb" /></linearGradient>
          <linearGradient id={`${id}-ink`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#334155" /><stop offset="1" stopColor="#0f172a" /></linearGradient>
          <linearGradient id={`${id}-acc`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={to} /><stop offset="1" stopColor={from} /></linearGradient>
          <linearGradient id={`${id}-heart`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fb7185" /><stop offset="1" stopColor="#be123c" /></linearGradient>
          <radialGradient id={`${id}-bulb`} cx=".45" cy=".4" r=".7"><stop offset="0" stopColor="#fffbeb" /><stop offset=".6" stopColor="#fde68a" /><stop offset="1" stopColor="#f59e0b" /></radialGradient>
        </defs>
        <Backdrop kind={bk} g={g} />
        <g className="bart-scene"><Scene g={g} /></g>
      </svg>
      <span className="bart-badge"><Icon name={post.cover.icon} size={big ? 22 : 16} /></span>
    </LiveZone>
  );
}
