import { memo, useMemo } from 'react';
import { asset } from '../lib/asset.js';
import { useI18n } from '../lib/i18n.js';
import { rewardOf } from '../lib/rewards.js';
import ProfileCard from './ProfileCard.jsx';
import SurveyCard from './SurveyCard.jsx';

function Skeleton({ n = 6, cls = 'cards' }) {
  return <div className={cls}>{Array.from({ length: n }, (_, i) => <div key={i} className="card skeleton" aria-hidden="true" />)}</div>;
}

function Head({ step, icon, title, sub, id, children }) {
  return (
    <div className="block-head">
      <div className="bh-txt">
        <p className="eyebrow"><span className="emo" aria-hidden="true">{icon}</span>{step}</p>
        <h2 className="sec-title" id={id}>{title}</h2>
        {sub && <p className="sec-sub">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

/**
 * The three sections, in the order the patient should work through them:
 *   1. About You profiles  — complete these first (each +50 pts, +1 QS)
 *   2. Incomplete          — everything that is open and not finished yet, ready to resume
 *   3. Health surveys      — black & white and locked until every profile is complete,
 *                            then unlocked one at a time
 */
function Dashboard({ view, survey, error, onRetry, statuses, access, meta, unlockSeen, onOpen, onLocked }) {
  const { t, tc, nf } = useI18n();

  const incomplete = useMemo(() => {
    if (!survey || !statuses || !access) return [];
    const open = survey.profiles.filter((p) => statuses.map[p.id].status !== 'done' && !access.map[p.id].locked);
    return open.sort((a, b) => (statuses.map[b.id].status === 'progress') - (statuses.map[a.id].status === 'progress'));
  }, [survey, statuses, access]);

  if (error) {
    return (
      <div className="notice" role="alert">
        <span>⚠️ {t('dash.error')}</span>
        <button className="btn" type="button" onClick={onRetry}>{t('dash.retry')}</button>
      </div>
    );
  }
  const ready = survey && statuses && access;
  const order = (id) => survey.profiles.findIndex((p) => p.id === id) + 1;
  const showProfiles = view !== 'surveys';
  const showSurveys = view !== 'profiles';
  const surveysDone = ready ? access.surveys.filter((p) => statuses.map[p.id].status === 'done').length : 0;

  return (
    <>
      {showProfiles && (
        <section className="block b-profiles" id="mho-profiles" aria-labelledby="mho-b1">
          <Head step={t('sec.step1')} icon="🙋" id="mho-b1" title={t('sec.profilesTitle')}
            sub={ready ? (access.allProfiles ? t('sec.profilesDone') : t('sec.profilesSub', { n: nf.format(access.profilesTotal) })) : t('dash.loading')}>
            {ready && (
              <div className="seg-meter" role="img" aria-label={t('sec.meter', { done: nf.format(access.profilesDone), total: nf.format(access.profilesTotal) })}>
                {access.profiles.map((p) => (
                  <i key={p.id} className={statuses.map[p.id].status} style={{ '--p1': p.palette[0], '--p2': p.palette[1] }}><span className="emo">{p.emoji}</span></i>
                ))}
                <b className="num">{nf.format(access.profilesDone)}/{nf.format(access.profilesTotal)}</b>
              </div>
            )}
          </Head>
          {!ready ? <Skeleton /> : (
            <div className="cards">
              {access.profiles.map((p, i) => (
                <ProfileCard key={p.id} p={p} n={order(p.id)} st={statuses.map[p.id]} i={i} onOpen={onOpen} completedAt={meta.completed?.[p.id]} isNext={access.nextProfile === p.id} />
              ))}
            </div>
          )}
        </section>
      )}

      {showProfiles && (
        <section className="block b-incomplete" id="mho-incomplete" aria-labelledby="mho-b2">
          <Head step={t('sec.step2')} icon="⏳" id="mho-b2" title={t('sec.incTitle')} sub={t('sec.incSub')} />
          {!ready ? <Skeleton n={3} cls="resume" /> : incomplete.length === 0 ? (
            <p className="empty"><span className="emo" aria-hidden="true">🌈</span> {statuses.doneCount === statuses.total ? t('dash.allDone') : t('sec.incEmpty')}</p>
          ) : (
            <ul className="resume">
              {incomplete.map((p, i) => {
                const st = statuses.map[p.id];
                const r = rewardOf(p.id);
                return (
                  <li key={p.id} className={'res pat-' + (p.pattern || 'dots') + (st.status === 'progress' ? ' going' : '')} style={{ '--p1': p.palette[0], '--p2': p.palette[1], '--p3': p.palette[2] || '#fff', '--d': i }}>
                    <span className="res-orb"><img src={asset('images/profiles/' + p.icon)} width="56" height="56" alt="" loading="lazy" /></span>
                    <span className="res-txt">
                      <small>{access.map[p.id].kind === 'profile' ? t('sec.kindProfile') : t('sec.kindSurvey')} · {st.status === 'progress' ? t('sv.inProgress', { pct: st.pct }) : t('sec.notStarted')}</small>
                      <b>{tc(p.title)}</b>
                      <span className="res-bar" aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(0.02, st.pct / 100)})` }} /></span>
                    </span>
                    <span className="res-rw" aria-label={t('sec.earn', { pts: nf.format(r.pts), qs: nf.format(r.qs) })}>🪙 +{nf.format(r.pts)}<br />💠 +{nf.format(r.qs)}</span>
                    <button type="button" className="btn primary small" onClick={() => onOpen(p.id, 'run')}>{st.status === 'progress' ? t('card.continue') : t('card.start')} <span className="arrow" aria-hidden="true">→</span></button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {showSurveys && (
      <section className={'block b-surveys' + (ready && !access.allProfiles ? ' all-locked' : '')} id="mho-surveys" aria-labelledby="mho-b3">
        <Head step={t('sec.step3')} icon={ready && access.allProfiles ? '🩺' : '🔒'} id="mho-b3" title={t('sec.surveysTitle')}
          sub={!ready ? t('dash.loading') : access.allProfiles ? t('sec.surveysOpen') : t('sec.surveysLocked', { done: nf.format(access.profilesDone), total: nf.format(access.profilesTotal) })}>
          {ready && (
            <div className={'vault' + (access.allProfiles ? ' open' : '')} aria-hidden="true">
              <span className="vault-ring" style={{ '--v': access.allProfiles ? 100 : Math.round((access.profilesDone / access.profilesTotal) * 100) }}><i>{access.allProfiles ? '🔓' : '🔒'}</i></span>
              <span className="vault-txt"><b className="num">{nf.format(surveysDone)}/{nf.format(access.surveys.length)}</b><small>{t('sec.surveysDone')}</small></span>
            </div>
          )}
        </Head>
        {!ready ? <Skeleton n={8} cls="scards" /> : (
          <div className="scards">
            {access.surveys.map((p, i) => (
              <SurveyCard key={p.id} p={p} n={i + 1} st={statuses.map[p.id]} ac={access.map[p.id]} i={i}
                justUnlocked={!access.map[p.id].locked && statuses.map[p.id].status !== 'done' && !unlockSeen?.[p.id]}
                onOpen={onOpen} onLocked={onLocked} completedAt={meta.completed?.[p.id]} />
            ))}
          </div>
        )}
      </section>
      )}
    </>
  );
}
export default memo(Dashboard);
