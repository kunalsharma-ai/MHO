import { asset } from '../lib/asset.js';
import { memo } from 'react';
import { useI18n } from '../lib/i18n.js';
import { rewardOf } from '../lib/rewards.js';
import ProfileCard, { Arch, HeartLock } from './ProfileCard.jsx';

function Skeleton({ n = 3 }) {
  return (
    <div className="posts">
      {Array.from({ length: n }, (_, i) => <div key={i} className="post skeleton" aria-hidden="true" />)}
    </div>
  );
}

/** §1 — every About You profile as an arch-topped "care step" (complete ones open in review/edit mode) */
function StepTile({ p, k, st, done, isNext, onOpen }) {
  const { t, tc, nf } = useI18n();
  const pct = done ? 100 : st?.pct || 0;
  return (
    <button type="button" className={'step' + (done ? ' is-done' : '') + (isNext ? ' is-next' : '') + (st?.status === 'progress' && !done ? ' is-progress' : '')}
      style={{ '--p1': p.palette[0], '--p2': p.palette[1], '--p3': p.palette[2] || '#FFE0B8', '--k': k }}
      onClick={(e) => onOpen(p.id, done ? 'review' : 'run', undefined, e)}
      aria-label={tc(p.title) + ' · ' + (done ? t('card.completed') : t('card.progress', { pct }))}>
      <span className="step-arch" aria-hidden="true">
        <i className="step-glow" />
        <img src={asset('images/profiles/' + p.icon)} width="72" height="72" alt="" loading="lazy" decoding="async" />
        <span className="step-n num">{String(k + 1).padStart(2, '0')}</span>
        {done && <span className="step-ok">✓</span>}
      </span>
      <span className="step-txt">
        <b>{tc(p.title)}</b>
        <span className="step-state">{done ? <><span aria-hidden="true">💞</span> {t('tile.done')}</> : isNext ? <><span className="emo" aria-hidden="true">👉</span> {t('tile.next')}</> : t('tile.todo', { pts: nf.format(rewardOf(p.id).pts) })}</span>
      </span>
      <Arch pct={pct} />
      {done && <span className="step-edit" aria-hidden="true">✏️</span>}
    </button>
  );
}

function SecHead({ id, icon, eyebrow, title, sub, right }) {
  return (
    <div className="sec-head">
      <div className="sec-head-copy">
        <p className="eyebrow"><span className="emo" aria-hidden="true">{icon}</span>{eyebrow}</p>
        <h2 id={id} className="sec-title">{title}</h2>
        {sub && <p className="sec-sub">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

/**
 * The dashboard sections, in the order the caregiver works through them:
 *   §1  About You profiles (all of them, complete + incomplete) — "care steps", start here
 *   §2  Incomplete profiles — big care postcards for everything still to do
 *   §3  Surveys — sealed (black & white) until every profile is complete, then unsealed one at a time
 */
function Dashboard({ view = 'all', survey, error, onRetry, statuses, meta, g, mounted, onOpen, onLocked }) {
  const { t, tc, nf } = useI18n();
  const ready = survey && statuses;
  const st = (id) => statuses?.map?.[id];
  const isDone = (id) => mounted && !!meta.completed?.[id];
  const profiles = ready ? survey.profiles.filter((p) => g.profiles.some((x) => x.id === p.id)) : [];
  const surveys = ready ? survey.profiles.filter((p) => g.surveys.some((x) => x.id === p.id)) : [];
  const incomplete = profiles.filter((p) => !isDone(p.id));
  const left = g.profiles.length - g.profDone;
  const nextP = g.nextProfile ? profiles.find((p) => p.id === g.nextProfile) : null;
  const open = g.profilesComplete && mounted;

  return (
    <>
      {error && (
        <div className="notice" role="alert">
          <span>⚠️ {t('dash.error')}</span>
          <button className="btn" type="button" onClick={onRetry}>{t('dash.retry')}</button>
        </div>
      )}

      {view !== 'surveys' && (
      <>
      {/* §1 ── About You profiles */}
      <section className="sec sec-about" id="profiles" aria-labelledby="about-title">
        <SecHead id="about-title" icon="🫶" eyebrow={t('about.eyebrow')} title={t('about.title')}
          sub={g.profilesComplete ? t('about.subDone') : t('about.sub', { n: nf.format(left) })}
          right={
            <div className="keyring" aria-label={t('about.keys', { n: nf.format(mounted ? g.profDone : 0), total: nf.format(g.profiles.length) })}>
              <span className="kr-ring" aria-hidden="true" style={{ '--n': g.profiles.length }}>
                <i className="kr-hoop" />
                {g.profiles.map((p, k) => <i key={p.id} className={'kr-key' + (isDone(p.id) ? ' got' : '')} style={{ '--k': k, '--p1': p.palette[0] }} />)}
                <span className={'kr-lock' + (open ? ' open' : '')}>{open ? '🔓' : '🔒'}</span>
              </span>
              <span className="kr-txt"><b className="num">{nf.format(mounted ? g.profDone : 0)}<em>/{nf.format(g.profiles.length)}</em></b><small>{t('about.keysShort')}</small></span>
            </div>
          } />
        {!ready && !error ? <div className="steps skeleton-row" aria-hidden="true" /> : (
          <div className="steps">
            {profiles.map((p, k) => <StepTile key={p.id} p={p} k={k} st={st(p.id)} done={isDone(p.id)} isNext={p.id === g.nextProfile} onOpen={onOpen} />)}
          </div>
        )}
      </section>

      {/* §2 ── incomplete profiles */}
      <section className="sec sec-todo" id="incomplete" aria-labelledby="todo-title">
        <SecHead id="todo-title" icon="💌" eyebrow={t('todo.eyebrow')} title={t('todo.title')}
          sub={incomplete.length ? t('todo.sub', { n: nf.format(incomplete.length) }) : null}
          right={nextP && (
            <button className="btn brand big" type="button" style={{ '--p1': nextP.palette[0], '--p2': nextP.palette[1] }} onClick={(e) => onOpen(nextP.id, 'run', undefined, e)}>
              <span className="emo" aria-hidden="true">{nextP.emoji}</span> {tc(nextP.title)} <span className="arrow" aria-hidden="true">→</span>
            </button>
          )} />
        {!ready && !error && <Skeleton n={2} />}
        {ready && incomplete.length > 0 && (
          <div className="posts">
            {incomplete.map((p, i) => {
              const k = profiles.indexOf(p) + 1;
              return <ProfileCard key={p.id} p={p} n={k} st={st(p.id)} i={i} kind="profile" current={p.id === g.nextProfile} onOpen={onOpen} onLocked={onLocked} />;
            })}
          </div>
        )}
        {ready && incomplete.length === 0 && mounted && (
          <div className="all-done" role="status">
            <span className="ad-burst" aria-hidden="true">💐</span>
            <div><b>{t('todo.doneTitle')}</b><span>{t('todo.doneSub')}</span></div>
            <button className="btn soft" type="button" onClick={() => document.getElementById('surveys')?.scrollIntoView({ behavior: 'smooth' })}>{t('todo.toSurveys')} <span className="arrow" aria-hidden="true">↓</span></button>
          </div>
        )}
      </section>

      </>
      )}

      {view !== 'profiles' && (
      <section className={'sec sec-surveys' + (open ? ' is-open' : ' is-sealed')} id="surveys" aria-labelledby="surv-title">
        <SecHead id="surv-title" icon={open ? '💌' : '🔒'} eyebrow={t('surv.eyebrow')} title={t('surv.title')}
          sub={open ? t('surv.subOpen') : t('surv.subLocked', { n: nf.format(left) })}
          right={
            <div className="surv-meter">
              <HeartLock className={'hlock big' + (open ? ' open' : '')} />
              <span><b className="num">{nf.format(mounted ? g.survDone : 0)}/{nf.format(g.surveys.length)}</b><small>{t('surv.done')}</small></span>
            </div>
          } />
        {!ready && !error && <Skeleton n={2} />}
        {ready && (
          <div className="posts surv-posts">
            {surveys.map((p, i) => (
              <ProfileCard key={p.id} p={p} n={i + 1} st={st(p.id)} i={i} kind="survey" lock={mounted ? g.lock[p.id] : 'profiles'}
                current={mounted && p.id === g.current} completedAt={mounted ? meta.completed?.[p.id] : undefined} onOpen={onOpen} onLocked={onLocked} />
            ))}
          </div>
        )}
      </section>
      )}
    </>
  );
}
export default memo(Dashboard);
