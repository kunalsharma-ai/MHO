import { memo } from 'react';

/**
 * Living background of the caregiver section: slow silk waves in plum / coral / amber, soft bokeh lights
 * and floating 3D care objects (glossy hearts, a holding-hands medallion, a pill, a blooming flower,
 * a ribbon-wrapped gift and a little home). It is "sticky" inside the section, so it fills the screen while
 * the caregiver scrolls through the section but never spills over the rest of your dashboard.
 * transform/opacity only; frozen with prefers-reduced-motion.
 */
function BgFx() {
  return (
    <div className="bgfx" aria-hidden="true">
      <div className="bgfx-in">
        {/* three silk ribbons, each its own <svg> layer so the browser moves them on the GPU (no repaint per frame) */}
        <div className="silk">
          <svg className="sw s1" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs><linearGradient id="silkA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF7A59" stopOpacity=".55" /><stop offset="1" stopColor="#E8457C" stopOpacity=".15" /></linearGradient></defs>
            <path d="M-500 260 C 200 120 420 380 700 240 S 1150 120 1700 260 V 520 C 1100 420 900 600 620 500 S 120 420 -500 560Z" fill="url(#silkA)" />
          </svg>
          <svg className="sw s2" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs><linearGradient id="silkB" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFC65C" stopOpacity=".5" /><stop offset="1" stopColor="#B06AB3" stopOpacity=".1" /></linearGradient></defs>
            <path d="M-500 470 C 180 360 460 580 760 450 S 1160 380 1700 470 V 700 C 1050 620 820 760 560 680 S 120 620 -500 740Z" fill="url(#silkB)" />
          </svg>
          <svg className="sw s3" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs><linearGradient id="silkC" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#7B4397" stopOpacity=".45" /><stop offset="1" stopColor="#FF9BB8" stopOpacity=".12" /></linearGradient></defs>
            <path d="M-500 90 C 260 20 520 200 820 90 S 1180 30 1700 110 V 260 C 1080 200 860 330 600 250 S 160 180 -500 300Z" fill="url(#silkC)" />
          </svg>
        </div>
        <i className="bk k1" /><i className="bk k2" /><i className="bk k3" /><i className="bk k4" /><i className="bk k5" /><i className="bk k6" />
        <span className="fl h3d f1" />
        <span className="fl h3d f2" />
        <span className="fl h3d f3" />
        <span className="fl pill3d f4"><i /><i /></span>
        <svg className="fl hands3d f5" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="30" fill="url(#hm)" />
          <defs><radialGradient id="hm" cx=".35" cy=".3"><stop offset="0" stopColor="#FFE3B3" /><stop offset="1" stopColor="#FF9F43" /></radialGradient></defs>
          <path d="M14 38c6-2 10-8 18-8s12 6 18 8M20 30c3-6 7-9 12-9s9 3 12 9" fill="none" stroke="#7B2D52" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M32 24s-5-3-5-6.5c0-2 1.6-3.5 3.3-3.5 1 0 1.7.6 1.7.6s.7-.6 1.7-.6c1.7 0 3.3 1.5 3.3 3.5 0 3.5-5 6.5-5 6.5z" fill="#E8457C" />
        </svg>
        <svg className="fl bloom3d f6" viewBox="0 0 64 64">
          {[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} cx="32" cy="18" rx="9" ry="14" fill="#FF9BB8" opacity=".9" transform={`rotate(${a} 32 32)`} />)}
          <circle cx="32" cy="32" r="8" fill="#FFC65C" />
        </svg>
        <svg className="fl gift3d f7" viewBox="0 0 64 64">
          <rect x="10" y="26" width="44" height="30" rx="5" fill="#B06AB3" /><rect x="6" y="18" width="52" height="12" rx="4" fill="#C98BD0" />
          <rect x="28" y="18" width="8" height="38" fill="#FFC65C" />
          <path d="M32 18c-6-10-16-8-14-2 1 3 8 3 14 2zm0 0c6-10 16-8 14-2-1 3-8 3-14 2z" fill="#FF7A59" />
        </svg>
        <svg className="fl home3d f8" viewBox="0 0 64 64">
          <path d="M8 30L32 10l24 20v24a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z" fill="#FF7A59" /><path d="M4 32L32 8l28 24" fill="none" stroke="#7B2D52" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 50s-8-5-8-10c0-3 2.4-5 5-5 1.4 0 2.4.7 3 1.6.6-.9 1.6-1.6 3-1.6 2.6 0 5 2 5 5 0 5-8 10-8 10z" fill="#FFE3B3" />
        </svg>
      </div>
    </div>
  );
}
export default memo(BgFx);
