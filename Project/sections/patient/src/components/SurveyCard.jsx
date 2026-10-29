import { memo } from 'react';
import { asset } from '../lib/asset.js';
import { useI18n } from '../lib/i18n.js';
import { rewardOf } from '../lib/rewards.js';

/**
 * Survey card. LOCKED: black & white (grayscale + film grain), a chained padlock that sways, a scanning
 * shimmer and "Locked" plate; clicking opens the LockedDialog. UNLOCKED: the colour floods in from the
 * padlock outwards (one-time unlock animation), the padlock springs open and flies away.
 */
function SurveyCard({ p, n, st, ac, i, justUnlocked, onOpen, onLocked, completedAt }) {
  const { t, tc, nf, date } = useI18n();
  const done = st.status === 'done';
  const progress = st.status === 'progress';
  const locked = ac.locked;
  const ext = p.external;
  const total = st.total || p.questions.length;
  const r = ext ? { pts: ext.points, qs: 0 } : rewardOf(p.id);
  const cls = 'scard pat-' + (p.pattern || 'dots') + (locked ? ' is-locked' : '') + (done ? ' is-done' : '') + (progress ? ' is-progress' : '') + (justUnlocked ? ' just-unlocked' : '') + (!locked && !done ? ' is-open' : '');
  const act = () => (p.disabled ? null : locked ? onLocked(p.id) : onOpen(p.id, done ? 'review' : 'run'));
  return (
    <article className={cls} style={{ '--p1': p.palette[0], '--p2': p.palette[1], '--p3': p.palette[2] || '#fff', '--d': i }} aria-labelledby={'mho-sc-' + p.id}>
      <button type="button" className="sc-hit" onClick={act} aria-describedby={'mho-sc-s-' + p.id}
        aria-label={tc(p.title) + ' · ' + (locked ? t('sv.locked') : done ? t('card.completed') : progress ? t('card.continue') : t('card.start'))} />
      <i className="sc-wash" aria-hidden="true" />
      <div className="sc-top">
        <span className="sc-num num">#{String(n).padStart(2, '0')}</span>
        {done ? <span className="sc-badge ok">✓ {t('card.completed')}</span> : locked ? <span className="sc-badge lock">🔒 {t('sv.locked')}</span> : <span className="sc-badge open">✨ {p.badge || (progress ? t('sv.inProgress', { pct: st.pct }) : t('sv.open'))}</span>}
      </div>
      <div className="sc-art">
        <img src={asset('images/profiles/' + p.icon)} width="96" height="96" alt="" loading="lazy" decoding="async" />
        {locked && (
          <span className="padlock" aria-hidden="true">
            <i className="pl-chain" />
            <svg viewBox="0 0 40 48"><path className="pl-shackle" d="M11 21v-7a9 9 0 0 1 18 0v7" fill="none" strokeWidth="5" strokeLinecap="round" /><rect className="pl-body" x="5" y="20" width="30" height="25" rx="7" /><path className="pl-key" d="M20 28.5c-1.6-2.2-5-1.2-5 1.3 0 2.2 3 4 5 5.2 2-1.2 5-3 5-5.2 0-2.5-3.4-3.5-5-1.3z" /></svg>
          </span>
        )}
        {justUnlocked && <span className="padlock flyaway" aria-hidden="true"><svg viewBox="0 0 40 48"><path className="pl-shackle" d="M11 21v-7a9 9 0 0 1 18 0" fill="none" strokeWidth="5" strokeLinecap="round" /><rect className="pl-body" x="5" y="20" width="30" height="25" rx="7" /></svg></span>}
      </div>
      <div className="sc-body">
        <p className="sc-flavor"><span className="emo" aria-hidden="true">{p.emoji}</span>{tc(p.flavor)}</p>
        <h4 id={'mho-sc-' + p.id} className="sc-title">{tc(p.title)}</h4>
        <p className="sc-meta" id={'mho-sc-s-' + p.id}>
          <span>📝 {ext ? t('card.minutes', { n: nf.format(ext.minutes) }) : t('card.questions', { n: nf.format(total) })}</span>
          <span className="sc-rw">🪙 +{nf.format(r.pts)}{!ext && <> · 💠 +{nf.format(r.qs)} QS</>}</span>
        </p>
        {done && completedAt && <p className="sc-when">✓ {date(completedAt, { day: 'numeric', month: 'short' })}</p>}
        {progress && !locked && <span className="sc-prog" aria-hidden="true"><i style={{ transform: `scaleX(${st.pct / 100})` }} /></span>}
        <span className="sc-cta" aria-hidden="true">
          {p.cta ? p.cta : locked ? (ac.reason === 'profiles' ? t('sv.needProfiles') : t('sv.needPrev')) : done ? '✏️ ' + t('card.edit') : (progress ? t('card.continue') : t('card.start')) + ' →'}
        </span>
      </div>
      {locked && <i className="sc-scan" aria-hidden="true" />}
    </article>
  );
}
export default memo(SurveyCard);
