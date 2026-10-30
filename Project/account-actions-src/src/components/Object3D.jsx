import { usePauseOffscreen } from '../hooks/index.js';

const range = (n) => Array.from({ length: n }, (_, i) => i);
const ECG = 'M0 30 H26 L32 18 L38 42 L46 6 L54 52 L60 30 H100';

/**
 * MyHealthOpinions CSS-3D objects (GPU transforms only, no WebGL).
 *  d30 two-tone capsule · d60 extruded medical cross · d90 tablet stack
 *  hold crescent moon with drifting Zzz · del dissolving profile cards · react heart restart
 * The stage clips its content and pauses animation while off screen.
 */
export function Object3D({ k, size = 96, className = '' }) {
  const ref = usePauseOffscreen();
  return (
    <div ref={ref} className={`h3 h3-${k} ${className}`} style={{ '--s': `${size}px` }} aria-hidden="true">
      {k === 'd30' && (
        <div className="capsule">
          {range(8).map((i) => <i key={i} className="cap-slice" style={{ transform: `rotateX(${i * 22.5}deg)` }} />)}
          <span className="cap-print">30</span>
        </div>
      )}
      {k === 'd60' && (
        <div className="cross">
          {range(7).map((i) => <i key={i} className="cross-layer" style={{ transform: `translateZ(${-i * 2.4}px)` }} />)}
          <div className="cross-face"><span>60</span></div>
        </div>
      )}
      {k === 'd90' && (
        <div className="tabs3-wrap">
          <div className="tabs3">
            {[0, 1, 2].map((t) => (
              <div key={t} className={`tablet tb${t}`}>
                {range(5).map((i) => <i key={i} className="tb-layer" style={{ transform: `translateZ(${-i * 2}px)` }} />)}
                <i className="tb-top" />
              </div>
            ))}
          </div>
          <span className="tabs3-num">90</span>
        </div>
      )}
      {k === 'hold' && (
        <div className="moon-wrap">
          <div className="moon"><i className="moon-body" /><i className="moon-crater c1" /><i className="moon-crater c2" /></div>
          <span className="zz z1">z</span><span className="zz z2">z</span><span className="zz z3">Z</span>
          <i className="star s1" /><i className="star s2" />
        </div>
      )}
      {k === 'del' && (
        <div className="cards3">
          <i className="pc pc3" /><i className="pc pc2" />
          <div className="pc pc1"><i className="pc-av" /><i className="pc-l l1" /><i className="pc-l l2" /><i className="pc-l l3" /></div>
          {range(8).map((i) => <i key={i} className={`dust d${i}`} />)}
        </div>
      )}
      {k === 'react' && (
        <div className="beat">
          {range(8).map((i) => <i key={i} className="beat-layer" style={{ transform: `translateZ(${-i * 2}px)` }} />)}
          <div className="beat-face">
            <svg viewBox="0 0 100 60"><path d={ECG} /></svg>
          </div>
          <i className="beat-ring" />
        </div>
      )}
    </div>
  );
}
