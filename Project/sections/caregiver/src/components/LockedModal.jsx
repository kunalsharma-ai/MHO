import { useEffect, useRef } from 'react';
import { asset } from '../lib/asset.js';
import { useI18n } from '../lib/i18n.js';
import { sound } from '../lib/sound.js';
import { rewardOf } from '../lib/rewards.js';
import { AnimatedLogo } from './Brand.jsx';
import { HeartLock } from './ProfileCard.jsx';

/**
 * "Care door" pop-up — shown when a caregiver taps a sealed survey.
 *   reason 'profiles' : an arched wooden door with a heart lock; a keyring swings beside it carrying one key per
 *                       About You profile (collected keys glow, missing ones are hollow), and every missing
 *                       profile is a one-tap "key to collect".
 *   reason 'sequence' : surveys open one at a time — stepping stones from the open survey to this one.
 */
export default function LockedModal({ item, reason, g, survey, name, onClose, onOpen }) {
  const { t, tc, nf } = useI18n();
  const ref = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    sound.locked();
    const prev = document.activeElement;
    const id = requestAnimationFrame(() => btnRef.current?.focus({ preventScroll: true }));
    document.documentElement.classList.add('lock');
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll('button');
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    addEventListener('keydown', onKey);
    return () => { cancelAnimationFrame(id); removeEventListener('keydown', onKey); document.documentElement.classList.remove('lock'); prev?.focus?.({ preventScroll: true }); };
  }, [onClose]);

  const byId = (id) => survey?.profiles.find((p) => p.id === id) || g.items.find((p) => p.id === id);
  const missing = g.missingProfiles.map((p) => byId(p.id));
  const cur = g.current ? byId(g.current) : null;
  const first = reason === 'profiles' ? missing[0] : cur;
  const who = name || t('hero.friend');
  const go = (id, e) => { onClose(); onOpen(id, 'run', undefined, e); };
  // survey order for the stepping stones: done … open → (between) → this one
  const order = g.surveys.map((s) => byId(s.id));
  const from = cur ? order.findIndex((s) => s.id === cur.id) : 0;
  const to = order.findIndex((s) => s.id === item.id);
  const path = reason === 'sequence' && from >= 0 && to > from ? order.slice(from, to + 1) : [];

  return (
    <div className="lm-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={'lm lm-' + reason} role="alertdialog" aria-modal="true" aria-labelledby="lm-title" aria-describedby="lm-sub" ref={ref}
        style={{ '--p1': item.palette[0], '--p2': item.palette[1] }}>
        <i className="lm-glow" aria-hidden="true" />
        <button className="icon-btn lm-x" type="button" onClick={onClose} aria-label={t('close')}>✕</button>
        <div className="lm-brand"><AnimatedLogo height={26} /></div>

        <div className="lm-grid">
          {/* the care door */}
          <div className="door-scene" aria-hidden="true">
            <div className="door">
              <i className="door-light" />
              <span className="door-frame" />
              <span className="door-panel">
                <span className="door-win"><img src={asset('images/profiles/' + item.icon)} width="64" height="64" alt="" /></span>
                <span className="door-plank" /><span className="door-plank" /><span className="door-plank" />
                <span className="door-lock"><HeartLock /></span>
              </span>
              <i className="door-mat" />
            </div>
            {reason === 'profiles' && (
              <div className="keyfob" style={{ '--n': g.profiles.length }}>
                <i className="kf-hook" />
                <span className="kf-ring">
                  {g.profiles.map((p, k) => {
                    const got = !missing.some((m) => m.id === p.id);
                    return <i key={p.id} className={'kf-key' + (got ? ' got' : '')} style={{ '--k': k, '--p1': p.palette[0], '--p2': p.palette[1] }}><span className="emo">{p.emoji}</span></i>;
                  })}
                </span>
              </div>
            )}
          </div>

          <div className="lm-copy">
            <p className="lm-kicker"><span className="emo" aria-hidden="true">{item.emoji}</span> {tc(item.title)}</p>
            <h2 id="lm-title" className="lm-title">{t(reason === 'profiles' ? 'lock.title' : 'lock.titleSeq', { name: who })}</h2>
            <p id="lm-sub" className="lm-sub">
              {reason === 'profiles'
                ? t('lock.sub', { n: nf.format(missing.length) })
                : t('lock.subSeq', { cur: cur ? tc(cur.title) : '', item: tc(item.title) })}
            </p>

            {reason === 'profiles' ? (
              <>
                <p className="lm-keys-cap"><span className="emo" aria-hidden="true">🗝️</span> {t('about.keys', { n: nf.format(g.profDone), total: nf.format(g.profiles.length) })}</p>
                <ul className="lm-list">
                  {missing.map((p, k) => (
                    <li key={p.id} style={{ '--p1': p.palette[0], '--p2': p.palette[1], '--k': k }}>
                      <button type="button" onClick={(e) => go(p.id, e)}>
                        <span className="emo" aria-hidden="true">{p.emoji}</span>
                        <b>{tc(p.title)}</b>
                        <small>+{nf.format(rewardOf(p.id).pts)} {t('pts')} · +{nf.format(rewardOf(p.id).qs)} {t('qs.short')}</small>
                        <span className="arrow" aria-hidden="true">→</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              path.length > 1 && (
                <ol className="stones" aria-hidden="true">
                  {path.map((s, k) => (
                    <li key={s.id} className={k === 0 ? 'open' : k === path.length - 1 ? 'goal' : 'wait'} style={{ '--p1': s.palette[0], '--p2': s.palette[1], '--k': k }}>
                      <span className="emo">{s.emoji}</span>
                      <small>{k === 0 ? t('lock.openNow') : k === path.length - 1 ? t('lock.next') : tc(s.title)}</small>
                    </li>
                  ))}
                </ol>
              )
            )}

            <div className="lm-actions">
              {first && (
                <button ref={btnRef} className="btn brand big" type="button" onClick={(e) => go(first.id, e)} style={{ '--p1': first.palette[0], '--p2': first.palette[1] }}>
                  <span className="emo" aria-hidden="true">{first.emoji}</span>
                  {t(reason === 'profiles' ? 'lock.cta' : 'lock.ctaSeq', { name: tc(first.title) })}
                  <span className="arrow" aria-hidden="true">→</span>
                </button>
              )}
              <button ref={first ? undefined : btnRef} className="btn ghost" type="button" onClick={onClose}>{t('lock.later')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
