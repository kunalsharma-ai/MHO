import { useEffect, useRef } from 'react';
import { registerRoot } from '../lib/root.js';
import SurveyCard from './SurveyCard.jsx';

export default function CardMount({ item, onOpen, onLocked }) {
  const ref = useRef(null);
  useEffect(() => registerRoot(ref.current), []);
  return (
    <div className="mho-app mho-section" ref={ref} style={{ background: 'transparent' }}>
      <div className="scards" style={{ gridTemplateColumns: '1fr' }}>
        <SurveyCard p={item.p} n={item.n} st={item.st} ac={item.ac} i={0}
          onOpen={item.onOpen || onOpen} onLocked={onLocked} completedAt={item.completedAt} />
      </div>
    </div>
  );
}
