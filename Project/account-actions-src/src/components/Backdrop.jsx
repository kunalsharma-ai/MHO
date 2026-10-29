import { MOODS } from '../config/actions.js';
import { useApp } from '../context/AppContext.jsx';

const TRACE = 'M0 60 H180 L196 40 L212 84 L230 10 L250 110 L266 60 H520 L536 46 L552 74 L570 60 H800 L816 40 L832 84 L850 10 L870 110 L886 60 H1200';

/**
 * MyHealthOpinions backdrop (CSS only, no JS loop):
 *  - three slow-turning organic blobs that change colour with the selected option
 *  - two heartbeat (ECG) traces with a travelling pulse
 *  - twinkling "plus" sparkles
 */
export function Backdrop() {
  const { mood } = useApp();
  const m = MOODS[mood] || MOODS.brand;
  return (
    <div className="bd" aria-hidden="true" style={{ '--a1': m[0], '--a2': m[1], '--a3': m[2] }}>
      <i className="blob b1" /><i className="blob b2" /><i className="blob b3" />
      <svg className="trace tr1" viewBox="0 0 1200 120" preserveAspectRatio="none"><path className="base" d={TRACE} /><path className="run" d={TRACE} /></svg>
      <svg className="trace tr2" viewBox="0 0 1200 120" preserveAspectRatio="none"><path className="base" d={TRACE} /><path className="run" d={TRACE} /></svg>
      <div className="pluses">{Array.from({ length: 10 }, (_, i) => <i key={i} className={`ps ps${i}`} />)}</div>
    </div>
  );
}
