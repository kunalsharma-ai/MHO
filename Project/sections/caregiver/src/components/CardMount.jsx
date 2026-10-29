import { useEffect, useRef } from 'react';
import { hostEl } from '../lib/host.js';
import ProfileCard from './ProfileCard.jsx';

export default function CardMount({ item, onOpen, onLocked }) {
  const ref = useRef(null);
  useEffect(() => {
    const host = hostEl();
    const el = ref.current;
    for (const name of Array.from(host.style)) {
      if (name.startsWith('--')) el.style.setProperty(name, host.style.getPropertyValue(name));
    }
    Object.assign(el.dataset, host.dataset);
    el.lang = host.lang;
    el.dir = host.dir;
  });
  return (
    <div className="mho-pp" ref={ref} style={{ minHeight: 0, background: 'transparent', overflow: 'visible' }}>
      <div className="posts" style={{ gridTemplateColumns: '1fr' }}>
        <ProfileCard p={item.p} n={item.n} st={item.st} i={0} kind="survey" lock={item.lock}
          onOpen={item.onOpen || onOpen} onLocked={onLocked} completedAt={item.completedAt} />
      </div>
    </div>
  );
}
