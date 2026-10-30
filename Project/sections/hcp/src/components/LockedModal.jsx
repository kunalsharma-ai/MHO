import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { PROFILE_META } from '../data/profileMeta.js';
import { codeOf, rewardOf } from '../lib/rewards.js';
import { lockScroll } from '../lib/host.js';
import { AnimatedLogo } from './Brand.jsx';

/**
 * "Restricted — scrub in first": the pop-up for a sealed survey.
 * Left, an operating-theatre entrance: double doors with porthole windows that keep peeking open, light leaking
 * through the gap, a RESTRICTED sign whose lamp blinks (red = profiles missing, amber = next in line) and a keycard
 * reader with a card that keeps swiping and getting refused.
 * Right, a WHO-style pre-op checklist: every About-You profile ticked or not, then the survey sequence (one at a time),
 * the progress so far and one button straight to the next required item.
 */
export default function LockedModal({ slug, reason, g, completed, onClose, onOpen }) {
  const { t, p, fmtNum } = useI18n();
  const ref = useRef(null);
  const m = PROFILE_META[slug] || { emoji: '🔬', a: '#2EE6C5', b: '#22B8F0' };
  const next = g.next;
  const total = g.profiles.length;
  const seqWait = reason === 'sequence';

  useEffect(() => {
    const prev = document.activeElement;
    lockScroll(true);
    const id = requestAnimationFrame(() => ref.current?.querySelector('.btn.primary')?.focus({ preventScroll: true }));
    return () => { cancelAnimationFrame(id); lockScroll(false); prev?.focus?.({ preventScroll: true }); };
  }, []);

  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    else if (e.key === 'Tab') {
      const f = ref.current.querySelectorAll('button');
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  };

  return (
    <div className="modal-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={'lockm' + (seqWait ? ' amber' : '')} role="dialog" aria-modal="true" aria-labelledby="lk-title" aria-describedby="lk-text" ref={ref} onKeyDown={onKey} style={{ '--a': m.a, '--b': m.b }}>
        <button type="button" className="icon-btn lk-x" onClick={onClose} aria-label={t('close')}>✕</button>
        <div className="or" aria-hidden="true">
          <div className="or-sign"><i className="or-lamp" /><span className="mono">{seqWait ? t('orNext') : t('orRestricted')}</span></div>
          <div className="or-frame">
            <i className="or-gap" />
            <div className="or-door dl"><i className="port" /><i className="push mono">PUSH</i><i className="kick" /></div>
            <div className="or-door dr"><i className="port" /><i className="push mono">PUSH</i><i className="kick" /></div>
          </div>
          <div className="or-reader"><i className="rd-led" /><i className="rd-slot" /><i className="rd-card"><b>{m.emoji}</b></i></div>
          <div className="or-floor"><i /><i /><i /></div>
        </div>

        <div className="lk-body">
          <AnimatedLogo height={26} />
          <p className="eyebrow mono"><i className={'led ' + (seqWait ? 'amber' : 'red')} />{codeOf(slug)} · {t('sealedState')}</p>
          <h2 id="lk-title">{seqWait ? t('lockSeqTitle') : t('lockTitle')}</h2>
          <p className="lk-item"><span aria-hidden="true">{m.emoji}</span> <b>{p(slug)}</b> <span className="mono">+{fmtNum(rewardOf(slug).pts)} · +{fmtNum(rewardOf(slug).qs)} QS</span></p>
          <p id="lk-text" className="lk-text">
            {seqWait ? t('lockSeqText', { name: p(g.current || next) }) : t('lockText', { n: fmtNum(total - g.profDone) })}
          </p>

          <div className="preop">
            <p className="preop-h mono">{t('preopTitle')} <span>{fmtNum(g.profDone)}/{fmtNum(total)}</span></p>
            <div className="preop-bar" aria-hidden="true"><i style={{ transform: `scaleX(${g.profDone / total})` }} /></div>
            {!g.profilesComplete ? (
              <ul className="preop-list">
                {g.profiles.map((s) => (
                  <li key={s} className={completed[s] ? 'ok' : s === next ? 'cur' : ''}>
                    <i className="box" aria-hidden="true">{completed[s] ? '✓' : ''}</i>
                    <span aria-hidden="true">{PROFILE_META[s]?.emoji}</span>
                    <span className="pl-n">{p(s)}</span>
                    <small className="mono">{completed[s] ? t('preopDone') : s === next ? t('preopNext') : codeOf(s)}</small>
                  </li>
                ))}
              </ul>
            ) : <p className="preop-ok"><i className="box" aria-hidden="true">✓</i> {t('preopAllProfiles', { n: fmtNum(total) })}</p>}
            <p className="preop-h mono sm">{t('preopThen')}</p>
            <ol className="seq">
              {g.surveys.map((s, k) => (
                <li key={s} className={(completed[s] ? 'ok' : s === g.current ? 'cur' : '') + (s === slug ? ' me' : '')}>
                  <span aria-hidden="true">{completed[s] ? '✓' : PROFILE_META[s]?.emoji}</span>
                  <small className="mono">{codeOf(s)}</small>
                  {k < g.surveys.length - 1 && <i className="arrow" aria-hidden="true">→</i>}
                </li>
              ))}
            </ol>
          </div>

          <div className="lk-actions">
            {next && (
              <button type="button" className="btn primary" onClick={() => { onClose(); onOpen(next); }}>
                <span aria-hidden="true">{PROFILE_META[next]?.emoji}</span> {t('lockCta', { name: p(next) })} →
              </button>
            )}
            <button type="button" className="btn ghost" onClick={onClose}>{t('lockLater')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
