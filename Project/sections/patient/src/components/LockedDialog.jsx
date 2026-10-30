import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getLayer } from '../lib/root.js';
import { useI18n } from '../lib/i18n.js';
import { sound } from '../lib/sound.js';
import { rules } from '../lib/rewards.js';
import Logo from './Logo.jsx';

/**
 * "Vault" pop-up shown when a locked survey is clicked.
 *  • A heart-keyhole padlock inside a progress ring (About You profiles done / total), orbited by the
 *    profiles' emojis (lit when done). The padlock rattles when it opens.
 *  • reason 'profiles': checklist of the About You profiles with one-tap Start buttons.
 *  • reason 'sequence': which survey to finish first (surveys open one after another).
 */
export default function LockedDialog({ survey, statuses, access, id, name, onOpen, onClose }) {
  const { t, tc, nf } = useI18n();
  const box = useRef(null);
  const p = survey.profiles.find((x) => x.id === id);
  const ac = access.map[id];
  const blocker = ac.blocker && survey.profiles.find((x) => x.id === ac.blocker);
  const left = access.profiles.filter((x) => statuses.map[x.id].status !== 'done');
  const pct = Math.round((access.profilesDone / access.profilesTotal) * 100);
  const R = rules();

  useEffect(() => {
    sound.locked();
    const prev = document.activeElement;
    const f = requestAnimationFrame(() => box.current?.querySelector('.btn.cta, .btn.primary')?.focus({ preventScroll: true }));
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      if (e.key === 'Tab') {
        const els = box.current.querySelectorAll('button');
        if (!els.length) return;
        if (e.shiftKey && document.activeElement === els[0]) { e.preventDefault(); els[els.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === els[els.length - 1]) { e.preventDefault(); els[0].focus(); }
      }
    };
    addEventListener('keydown', onKey);
    return () => { cancelAnimationFrame(f); removeEventListener('keydown', onKey); prev?.focus?.({ preventScroll: true }); };
  }, [onClose]);

  const go = (x) => { onClose(); onOpen(x, 'run'); };
  const first = ac.reason === 'profiles' ? left[0] : blocker;

  return createPortal(
    <div className="vdlg-wrap" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={'vdlg r-' + ac.reason} role="dialog" aria-modal="true" aria-labelledby="mho-vd-t" aria-describedby="mho-vd-d" ref={box}
        style={{ '--p1': p.palette[0], '--p2': p.palette[1] }}>
        <button type="button" className="icon-btn vd-x" onClick={onClose} aria-label={t('close')}>✕</button>
        <span className="vd-logo"><Logo size={22} /></span>
        <div className="vd-art" aria-hidden="true">
          <i className="vd-glow" />
          <span className="vd-ring" style={{ '--v': ac.reason === 'profiles' ? pct : 100 }}>
            <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" className="trk" /><circle cx="60" cy="60" r="52" className="val" pathLength="100" /></svg>
          </span>
          <span className="vd-orbit">
            {(ac.reason === 'profiles' ? access.profiles : [blocker, p].filter(Boolean)).map((x, i, a) => (
              <i key={x.id} className={statuses.map[x.id].status === 'done' ? 'lit' : ''} style={{ '--a': (i / a.length) * 360 + 'deg' }}><span className="emo">{x.emoji}</span></i>
            ))}
          </span>
          <span className="vd-lock">
            <svg viewBox="0 0 64 76">
              <defs><linearGradient id="mho-vdg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFE08A" /><stop offset=".5" stopColor="#F7B547" /><stop offset="1" stopColor="#C9821A" /></linearGradient></defs>
              <path className="vd-shackle" d="M17 33V22a15 15 0 0 1 30 0v11" fill="none" stroke="#B8C3D1" strokeWidth="8" strokeLinecap="round" />
              <rect x="6" y="31" width="52" height="40" rx="12" fill="url(#mho-vdg)" />
              <rect x="6" y="31" width="52" height="40" rx="12" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
              <path d="M32 45c-2.6-3.6-8.2-2-8.2 2.2 0 3.6 4.9 6.6 8.2 8.6 3.3-2 8.2-5 8.2-8.6 0-4.2-5.6-5.8-8.2-2.2z" fill="#E1192F" className="vd-key" />
            </svg>
          </span>
        </div>
        <p className="vd-kick"><span className="emo" aria-hidden="true">{ac.reason === 'profiles' ? '🔐' : '🧭'}</span> {tc(p.title)}</p>
        <h3 id="mho-vd-t" className="vd-title">{ac.reason === 'profiles' ? (name ? t('lock.titleName', { name }) : t('lock.title')) : t('lock.seqTitle')}</h3>
        <p id="mho-vd-d" className="vd-sub">
          {ac.reason === 'profiles'
            ? t('lock.sub', { n: nf.format(left.length), done: nf.format(access.profilesDone), total: nf.format(access.profilesTotal) })
            : t('lock.seqSub', { first: tc(blocker?.title || ''), this: tc(p.title) })}
        </p>
        {ac.reason === 'profiles' && (
          <ul className="vd-list">
            {access.profiles.map((x) => {
              const done = statuses.map[x.id].status === 'done';
              return (
                <li key={x.id} className={done ? 'done' : ''} style={{ '--p1': x.palette[0], '--p2': x.palette[1] }}>
                  <span className="vd-chk" aria-hidden="true">{done ? '✓' : x.emoji}</span>
                  <span className="vd-name">{tc(x.title)}</span>
                  {done ? <small>{t('card.completed')}</small> : <button type="button" className="btn small" onClick={() => go(x.id)}>{t('card.start')}</button>}
                </li>
              );
            })}
          </ul>
        )}
        <p className="vd-perk"><span className="emo" aria-hidden="true">🎁</span> {t('lock.perk', { pts: nf.format(R.profilePts), qs: nf.format(R.profileQs) })}</p>
        <div className="vd-actions">
          {first && (
            <button type="button" className="btn cta big" onClick={() => go(first.id)}>
              <span className="emo" aria-hidden="true">{first.emoji}</span> {t('lock.cta', { item: tc(first.title) })} <span className="arrow" aria-hidden="true">→</span>
            </button>
          )}
          <button type="button" className="btn ghost" onClick={onClose}>{t('lock.later')}</button>
        </div>
      </div>
    </div>,
    getLayer()
  );
}
