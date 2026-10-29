import { memo } from 'react';

/**
 * Living background of the HCP section — "Bio-luminescent lab" (v3.0).
 *   • a colour field of five large glowing blobs (teal, coral, violet, amber, sky) slowly drifting and morphing —
 *     the first three follow the language palette, so every language tints the room differently
 *   • a fine hexagon lattice + a soft vignette for depth
 *   • eight glossy 3D medical objects floating in perspective (they tilt in 3D while they drift): a two-tone capsule,
 *     an extruded medical cross, a DNA strand, a molecule, a heart with an ECG, a test tube, a scored tablet and a
 *     stethoscope
 * Sticky inside the section (never spills over the rest of your dashboard). transform / opacity only; all loops stop
 * with prefers-reduced-motion; half the objects on phones; none on low-power devices.
 */
function BgFx() {
  return (
    <div className="bgfx" aria-hidden="true">
      <div className="bgfx-in">
        <i className="blob b1" /><i className="blob b2" /><i className="blob b3" /><i className="blob b4" /><i className="blob b5" />
        <i className="lattice" />
        <i className="vignette" />

        <span className="fl f1"><span className="fl3d cap3d"><i /><i /><b /></span></span>

        <span className="fl f2"><svg className="fl3d" viewBox="0 0 80 80">
          <defs><linearGradient id="bx-x" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF8FA3" /><stop offset="1" stopColor="#E0263F" /></linearGradient></defs>
          <path d="M31 9h22v22h22v22H53v22H31V53H9V31h22z" fill="#7E0F2B" transform="translate(4 5)" />
          <path d="M28 6h22v22h22v22H50v22H28V50H6V28h22z" fill="url(#bx-x)" />
          <path d="M30 9h7v19h-7z" fill="#fff" opacity=".4" />
        </svg></span>

        <span className="fl f3"><svg className="fl3d" viewBox="0 0 60 150">
          <defs><linearGradient id="bx-dna" x1="0" x2="1"><stop offset="0" stopColor="#22D3EE" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient></defs>
          {[10, 26, 42, 58, 74, 90, 106, 122, 138].map((y, i) => (
            <line key={y} x1={30 + Math.sin(i * 0.85) * 22} x2={30 - Math.sin(i * 0.85) * 22} y1={y} y2={y} stroke={['#FF7A9A', '#FFC34D', '#5EEAD4', '#A78BFA'][i % 4]} strokeWidth="3.4" strokeLinecap="round" />
          ))}
          <path d="M52 4C10 30 10 44 30 58S50 86 8 110S30 136 52 146" fill="none" stroke="url(#bx-dna)" strokeWidth="5" strokeLinecap="round" />
          <path d="M8 4C50 30 50 44 30 58S10 86 52 110S30 136 8 146" fill="none" stroke="#2EE6C5" strokeWidth="5" strokeLinecap="round" />
        </svg></span>

        <span className="fl f4"><svg className="fl3d" viewBox="0 0 96 96">
          <defs>
            <radialGradient id="bx-m1" cx=".35" cy=".3"><stop offset="0" stopColor="#C9FFF4" /><stop offset="1" stopColor="#00A99D" /></radialGradient>
            <radialGradient id="bx-m2" cx=".35" cy=".3"><stop offset="0" stopColor="#E0DBFF" /><stop offset="1" stopColor="#5B4BFF" /></radialGradient>
            <radialGradient id="bx-m3" cx=".35" cy=".3"><stop offset="0" stopColor="#FFE1B8" /><stop offset="1" stopColor="#FF8A3D" /></radialGradient>
          </defs>
          <g stroke="#9CC9D6" strokeWidth="4" strokeLinecap="round" opacity=".9"><path d="M48 48L20 28M48 48L78 30M48 48L46 82M20 28L12 60" /></g>
          <circle cx="48" cy="48" r="15" fill="url(#bx-m2)" /><circle cx="20" cy="28" r="10" fill="url(#bx-m1)" />
          <circle cx="78" cy="30" r="11" fill="url(#bx-m3)" /><circle cx="46" cy="82" r="9" fill="url(#bx-m1)" /><circle cx="12" cy="60" r="7" fill="url(#bx-m3)" />
        </svg></span>

        <span className="fl f5"><svg className="fl3d" viewBox="0 0 100 92">
          <defs><radialGradient id="bx-h" cx=".35" cy=".3"><stop offset="0" stopColor="#FFB3C1" /><stop offset=".55" stopColor="#FF4D6D" /><stop offset="1" stopColor="#B3123A" /></radialGradient></defs>
          <path d="M50 88S6 60 6 30C6 15 17 5 30 5c9 0 16 5 20 12C54 10 61 5 70 5c13 0 24 10 24 25 0 30-44 58-44 58z" fill="url(#bx-h)" />
          <path d="M16 44h18l6-12 8 24 8-18 4 6h24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="30" cy="22" rx="10" ry="6" fill="#fff" opacity=".35" transform="rotate(-25 30 22)" />
        </svg></span>

        <span className="fl f6"><svg className="fl3d" viewBox="0 0 50 120">
          <defs><linearGradient id="bx-tt" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7CF0B0" /><stop offset="1" stopColor="#10B76F" /></linearGradient></defs>
          <rect x="8" y="4" width="34" height="9" rx="4" fill="#B7C4D6" />
          <path d="M12 13h26v80a13 13 0 0 1-26 0z" fill="#E6F4FF" opacity=".55" stroke="#A5C3D9" strokeWidth="2.5" />
          <path d="M14 60h22v33a11 11 0 0 1-22 0z" fill="url(#bx-tt)" />
          <circle cx="22" cy="78" r="3" fill="#fff" opacity=".7" /><circle cx="29" cy="90" r="2" fill="#fff" opacity=".6" />
        </svg></span>

        <span className="fl f7"><span className="fl3d tab3d"><i /></span></span>

        <span className="fl f8"><svg className="fl3d" viewBox="0 0 100 100">
          <path d="M24 10v26c0 16 12 28 26 28s26-12 26-28V10" fill="none" stroke="#5B7A99" strokeWidth="6" strokeLinecap="round" />
          <path d="M50 64v12c0 8 6 14 14 14s14-6 14-14V64" fill="none" stroke="#5B7A99" strokeWidth="6" strokeLinecap="round" />
          <circle cx="78" cy="58" r="11" fill="#D7E3EE" stroke="#5B7A99" strokeWidth="5" />
          <circle cx="78" cy="58" r="4" fill="#22D3EE" />
          <circle cx="24" cy="9" r="5" fill="#2EE6C5" /><circle cx="76" cy="9" r="5" fill="#2EE6C5" />
        </svg></span>
      </div>
    </div>
  );
}
export default memo(BgFx);
