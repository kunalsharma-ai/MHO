import { asset } from '../lib/asset.js';
import { memo } from 'react';
import { useI18n } from '../lib/i18n.js';
import { rewardOf } from '../lib/rewards.js';
import { ECG_D } from './Brand.jsx';

/** Arched progress gauge (caregiver tiles): a half-moon that fills in the item's colours */
export function Arch({ pct, label }) {
  return (
    <span className="arch" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={pct} aria-label={label || undefined}>
      <svg viewBox="0 0 56 32" aria-hidden="true">
        <path className="arch-trk" d="M4 30a24 24 0 0 1 48 0" pathLength="100" />
        <path className="arch-val" d="M4 30a24 24 0 0 1 48 0" pathLength="100" style={{ strokeDashoffset: 100 - pct }} />
      </svg>
      <b className="num">{pct}<small>%</small></b>
    </span>
  );
}

/** Heart padlock used on sealed surveys and in the care-door pop-up */
export function HeartLock({ className = 'hlock' }) {
  return (
    <svg className={className} viewBox="0 0 64 76" aria-hidden="true">
      <path className="hl-shackle" d="M19 34V23a13 13 0 0 1 26 0v11" fill="none" strokeWidth="7" strokeLinecap="round" />
      <path className="hl-body" d="M32 74C14 62 4 52 4 38c0-8 6-14 14-14 6 0 11 3 14 8 3-5 8-8 14-8 8 0 14 6 14 14 0 14-10 24-28 36z" />
      <circle className="hl-hole" cx="32" cy="44" r="5" /><rect className="hl-hole" x="29.6" y="46" width="4.8" height="12" rx="2.4" />
    </svg>
  );
}

/**
 * Caregiver postcard — every incomplete profile and every survey is a landscape "care postcard":
 *   left  : illustrated art panel in the item's own palette + texture, with a postage stamp showing the reward
 *   right : title, blurb, question count, a heartbeat progress line and the action
 * Locked surveys are black & white, crossed by a diagonal "sealed" ribbon with a heart padlock.
 */
function ProfileCard({ p, n, st, i, kind = 'profile', lock = null, current = false, onOpen, onLocked, completedAt }) {
  const { t, tc, lang, nf } = useI18n();
  const done = st?.status === 'done' || !!completedAt;
  const progress = !done && st?.status === 'progress';
  // before the caregiving role is known only the screener questions apply – show a realistic estimate instead
  const raw = st?.total || 0;
  const total = raw > 2 || done ? raw : Math.min(p.questions?.length || 0, 20);
  const date = completedAt ? new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : lang, { day: 'numeric', month: 'short' }).format(completedAt) : '';
  const locked = !!lock && !done;
  const pct = done ? 100 : st?.pct || 0;
  const ext = p.external;
  const rw = ext ? { pts: ext.points, qs: 0 } : rewardOf(p.id);
  const cls = 'post pat-' + (p.pattern || 'dots') + ' lay' + (n % 2) + (done ? ' is-done' : '') + (progress ? ' is-progress' : '') + (locked ? ' is-locked' : '') + (current ? ' is-current' : '');
  const click = (e) => {
    if (p.disabled) return;
    if (locked) { onLocked(p.id, e); return; }
    onOpen(p.id, done ? 'review' : 'run', undefined, e);
  };

  return (
    <article className={cls} style={{ '--p1': p.palette[0], '--p2': p.palette[1], '--p3': p.palette[2] || '#FFE0B8', '--d': i }} aria-labelledby={'pc-' + p.id}>
      <div className="post-art" onClick={click} aria-hidden="true">
        <i className="post-pat" />
        <i className="post-sun" />
        <img className="illus" src={asset('images/profiles/' + p.icon)} width="150" height="150" alt="" loading="lazy" decoding="async" />
        <span className="post-emoji emo">{p.emoji}</span>
        <span className="stamp">
          <span className="stamp-in">
            <b className="num">+{nf.format(rw.pts)}</b>
            <small>{t('pts')}</small>
            {!ext && <em>+{nf.format(rw.qs)} ★</em>}
          </span>
        </span>
        {done && <span className="postmark"><span>{t('card.completed')}</span><b>{date || '✓'}</b></span>}
      </div>
      <div className="post-body">
        <div className="post-top">
          <span className="post-num num">{t(kind === 'profile' ? 'card.profileN' : 'card.surveyN', { n: String(n).padStart(2, '0') })}</span>
          {current && !done && <span className="post-flag"><span className="emo" aria-hidden="true">{kind === 'profile' ? '👉' : '🗝️'}</span> {t(kind === 'profile' ? 'tile.next' : 'card.unlocked')}</span>}
          {locked && <span className="post-sealchip"><span className="emo" aria-hidden="true">🔒</span>{t('card.locked')}</span>}
        </div>
        <p className="post-flavor">{tc(p.flavor)}</p>
        <h4 id={'pc-' + p.id} className="post-title">{tc(p.title)}</h4>
        <p className="post-blurb">{tc(p.blurb)}</p>
        {st?.needsAttention && <p className="post-warn">⚠️ {t('card.attention')}</p>}
        <div className="post-meta">
          {!ext && <span><span className="emo" aria-hidden="true">📝</span> {t('card.questions', { n: nf.format(total) })}</span>}
          <span><span className="emo" aria-hidden="true">⏱️</span> {t('card.minutes', { n: nf.format(ext ? ext.minutes : Math.max(1, Math.round(total * 0.15))) })}</span>
          {done && <span className="got"><span className="emo" aria-hidden="true">💞</span> {t('card.earnedShort')}</span>}
        </div>
        {!ext && <div className="pulsebar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={pct} aria-label={t('card.progress', { pct })}>
          <svg viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
            <path className="track" d={ECG_D} fill="none" strokeWidth="2.5" strokeLinejoin="round" pathLength="100" vectorEffect="non-scaling-stroke" />
            <path className="fill" d={ECG_D} fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ clipPath: `inset(-20% ${100 - pct}% -20% 0)` }} vectorEffect="non-scaling-stroke" />
          </svg>
          <b className="num">{pct}%</b>
        </div>}
        <div className="post-actions">
          {locked ? (
            <button className="btn sealbtn" type="button" onClick={click}>
              <span className="emo" aria-hidden="true">🔒</span> {t(lock === 'profiles' ? 'card.lockedProfiles' : 'card.lockedSeq')}
            </button>
          ) : done ? (
            <button className="btn primary" type="button" onClick={click}><span className="emo" aria-hidden="true">✏️</span> {p.cta || t('card.edit')}</button>
          ) : (
            <button className="btn primary" type="button" onClick={click}>
              {p.cta || (progress ? t('card.continue') : t(kind === 'profile' ? 'card.start' : 'card.startSurvey'))} <span className="arrow" aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
      {locked && (
        <div className="post-seal" aria-hidden="true" onClick={click}>
          <i className="tape t1"><span>{t('card.sealed')}</span></i>
          <i className="tape t2"><span>{t('card.sealed')}</span></i>
          <span className="seal-lock"><HeartLock /></span>
        </div>
      )}
    </article>
  );
}
export default memo(ProfileCard);
