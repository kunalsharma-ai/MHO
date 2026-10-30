import { memo } from 'react';

/**
 * Living background for the whole section (never white): a slowly drifting colour mesh in the language
 * palette + MyHealthOpinions brand colours, a soft grid, and 3D glass health objects (capsules, medical
 * crosses, hearts, molecules, droplets, a DNA twist) floating at different depths. Transform/opacity only;
 * everything pauses with prefers-reduced-motion and when the section is hidden.
 */
const OBJ = [
  ['capsule', 4, 6, 1.0], ['cross', 88, 4, 0.8], ['heart', 70, 16, 0.7], ['molecule', 12, 24, 0.9],
  ['drop', 94, 30, 0.7], ['capsule b', 52, 38, 0.6], ['dna', 3, 46, 0.85], ['cross b', 80, 52, 1],
  ['heart b', 30, 60, 0.6], ['molecule b', 90, 68, 0.8], ['drop b', 8, 76, 0.9], ['capsule c', 64, 84, 0.8],
  ['cross c', 22, 92, 0.7], ['heart c', 86, 94, 0.9],
];

function Obj({ k }) {
  const [type] = k.split(' ');
  if (type === 'capsule') return <i className="ob-cap"><i /></i>;
  if (type === 'cross') return <i className="ob-cross" />;
  if (type === 'heart') return <svg className="ob-heart" viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.1 4.3 2.6.7-1.5 2.2-2.6 4.3-2.6 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" /></svg>;
  if (type === 'molecule') return <i className="ob-mol"><i /><i /><i /><b /><b /></i>;
  if (type === 'drop') return <i className="ob-drop" />;
  return <i className="ob-dna">{[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ '--i': i }} />)}</i>;
}

function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <i className="mesh m1" /><i className="mesh m2" /><i className="mesh m3" /><i className="mesh m4" /><i className="mesh m5" />
      <i className="amb-grid" />
      {OBJ.map(([k, x, y, s], i) => (
        <span key={i} className={'amb-o ' + k} style={{ left: x + '%', top: y + '%', '--s': s, '--i': i }}><Obj k={k} /></span>
      ))}
    </div>
  );
}
export default memo(Ambient);
