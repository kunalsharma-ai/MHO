import { memo, useRef } from 'react';
import { asset } from '../lib/asset.js';
import { useI18n } from '../lib/i18n.js';
import { rewardOf } from '../lib/rewards.js';

/** Pointer-driven 3D tilt + light glare – CSS variables only (no re-render) */
function useTilt() {
  const ref = useRef(null);
  const raf = useRef(0);
  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el || raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--rx', ((y - 0.5) * -7).toFixed(2) + 'deg');
      el.style.setProperty('--ry', ((x - 0.5) * 9).toFixed(2) + 'deg');
      el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    });
  };
  const onPointerLeave = () => { const el = ref.current; if (el) { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); } };
  return { ref, onPointerMove, onPointerLeave };
}

export function Ring({ pct, label }) {
  return (
    <span className="ring" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={pct} aria-label={label}>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" className="ring-trk" />
        <circle cx="24" cy="24" r="20" className="ring-val" pathLength="100" style={{ strokeDashoffset: 100 - pct }} />
      </svg>
      <b className="num">{pct}<small>%</small></b>
    </span>
  );
}

/**
 * Profile card (About You). Every profile wears its own colour story: a gradient wash in its palette,
 * its own animated texture, a glass-orb illustration and an idle animation; never a white card.
 * Completed profiles get a living holographic border, a stamped check and a shimmer sweep.
 */
function ProfileCard({ p, n, st, i, onOpen, completedAt, isNext }) {
  const { t, tc, nf, date } = useI18n();
  const tilt = useTilt();
  const done = st.status === 'done';
  const progress = st.status === 'progress';
  const total = st.total || p.questions.length;
  const pct = done ? 100 : st.pct;
  const r = rewardOf(p.id);
  const cls = 'card pcard pat-' + (p.pattern || 'dots') + ' cv-' + p.id + (done ? ' is-done' : '') + (progress ? ' is-progress' : '') + (isNext ? ' is-next' : '');
  return (
    <article className={cls} style={{ '--p1': p.palette[0], '--p2': p.palette[1], '--p3': p.palette[2] || '#fff', '--d': i }} {...tilt} aria-labelledby={'mho-pc-' + p.id}>
      <i className="card-wash" aria-hidden="true" />
      <i className="glare" aria-hidden="true" />
      {isNext && <span className="start-here" aria-hidden="true"><span className="emo">👉</span>{t('card.startHere')}</span>}
      <div className="card-band">
        <span className="card-num num">{t('card.step', { n: String(n).padStart(2, '0') })}</span>
        <Ring pct={pct} label={t('card.progress', { pct })} />
      </div>
      <div className="card-orb">
        <i className="orb-halo" aria-hidden="true" />
        <img className="illus" src={asset('images/profiles/' + p.icon)} width="140" height="140" alt={tc(p.title) + ' illustration'} loading="lazy" decoding="async" />
        <span className="card-emoji emo" aria-hidden="true">{p.emoji}</span>
        {done && <span className="verified" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>}
      </div>
      <div className="card-body">
        <p className="card-flavor">{tc(p.flavor)}</p>
        <h4 id={'mho-pc-' + p.id} className="card-title">{tc(p.title)}</h4>
        <p className="card-blurb">{tc(p.blurb)}</p>
        {done && <p className="seal"><span aria-hidden="true">✓</span> {t('card.completed')}{completedAt ? ' · ' + date(completedAt, { day: 'numeric', month: 'short' }) : ''}</p>}
        {st.needsAttention && <p className="seal warn">⚠️ {t('card.attention')}</p>}
        <div className="card-meta">
          <span><span className="emo" aria-hidden="true">📝</span> {t('card.questions', { n: nf.format(total) })}</span>
          <span><span className="emo" aria-hidden="true">⏱️</span> {t('card.minutes', { n: nf.format(Math.max(1, Math.round(total * 0.15))) })}</span>
        </div>
        <div className={'rw-chips' + (done ? ' got' : '')}>
          <span className="rwc-pts"><span className="emo" aria-hidden="true">🪙</span>+{nf.format(r.pts)} {t('hdr.pts')}</span>
          <span className="rwc-qs"><span className="emo" aria-hidden="true">💠</span>+{nf.format(r.qs)} QS</span>
          {done && <span className="rwc-ok">{t('card.earned')}</span>}
        </div>
        <div className="card-actions">
          {done ? (
            <button className="btn primary" type="button" onClick={() => onOpen(p.id, 'review')}><span className="emo" aria-hidden="true">✏️</span> {t('card.edit')}</button>
          ) : (
            <button className="btn primary" type="button" onClick={() => onOpen(p.id, 'run')}>
              {progress ? t('card.continue') : t('card.start')} <span className="arrow" aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
export default memo(ProfileCard);
