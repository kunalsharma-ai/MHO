import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { Flag } from './CountryPicker.jsx';
import { METHOD_ICON } from '../utils/payouts.js';
import useActivityFeed, { initials } from '../hooks/useActivityFeed.js';
import { prefersReducedMotion, session } from '../utils/storage.js';

// Bottom-left pop-up notifications showing reward activity in random order.
export default function ActivityToasts() {
  const { items, isPreview } = useActivityFeed();
  const [cur, setCur] = useState(null);
  const [show, setShow] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(Boolean(session.get('mfr_toasts_muted', false)));
  }, []);

  useEffect(() => {
    if (!items.length || muted) return undefined;
    let t1;
    let t2;
    let last = -1;
    const cycle = () => {
      let i = Math.floor(Math.random() * items.length);
      if (i === last) i = (i + 1) % items.length;
      last = i;
      setCur(items[i]);
      setShow(true);
      t1 = setTimeout(() => setShow(false), 5200);
      t2 = setTimeout(cycle, 5200 + 6000 + Math.random() * 6000);
    };
    t2 = setTimeout(cycle, prefersReducedMotion() ? 9000 : 6500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [items, muted]);

  if (!cur || muted) return null;
  const biz = cur.segment === 'business';
  return (
    <div className={`toast ${show ? 'is-in' : ''} ${biz ? 'is-biz' : ''}`} role="status" aria-live="polite">
      <div className="toast-av">{initials(cur.name)}<i><Icon name={biz ? 'briefcase' : 'user'} size={11} /></i></div>
      <div className="toast-txt">
        <p><strong>{cur.name}</strong> <span className="toast-role">· {cur.role}</span></p>
        <p className="toast-earn">received <b>{cur.amount}</b> via <span className={`toast-method m-${(METHOD_ICON[cur.method] || 'wallet')}`}><Icon name={METHOD_ICON[cur.method] || 'wallet'} size={12} /> {cur.method}</span></p>
        <small><Flag iso={cur.iso} size={11} /> {cur.place} · {cur.ago}{isPreview ? <em className="preview-tag">Preview data</em> : null}</small>
      </div>
      <button
        type="button"
        className="toast-x"
        aria-label="Hide reward notifications"
        onClick={() => {
          session.set('mfr_toasts_muted', true);
          setMuted(true);
        }}
      >
        <Icon name="close" size={14} />
      </button>
    </div>
  );
}
