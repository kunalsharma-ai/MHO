import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { profileProgress, estimateCount } from '../lib/engine.js';
import { PROFILE_META, profileImage } from '../data/profileMeta.js';
import { alt } from '../data/altText.js';
import { asset } from '../lib/asset.js';
import { rewardOf, codeOf } from '../lib/rewards.js';
import { profileOpen, locked as lockedSound } from '../lib/sound.js';
import { ECG_D } from './Brand.jsx';

/**
 * The three blocks of the section:
 *   §1 Clinician profile (About You) — every profile as an "aperture" tile: a microscope view of the profile
 *      illustration with a turning tick ring, mono code, segmented lab gauge, VERIFIED when done.
 *   §2 Profiles waiting for you — the unfinished profiles as "patient chart" cards: grid-paper art panel with a
 *      clipboard clip, Rx reward seal (+50 PTS · +1 QS), vital-sign progress trace.
 *   §3 Research surveys — the same charts in black & white with a sterile "SEALED" band and a keycard lock until
 *      every profile is complete; then they open ONE AT A TIME (the open one shows a NOW OPEN light).
 */
const Seg = ({ pct, n = 10 }) => (
  <span className="seg" aria-hidden="true">
    {Array.from({ length: n }, (_, k) => <i key={k} className={k < Math.round((pct / 100) * n) ? 'on' : ''} />)}
  </span>
);

const ApertureTile = memo(function ApertureTile({ slug, k, st, pct, onOpen, t, p }) {
  const m = PROFILE_META[slug];
  const label = `${p(slug)} — ${st === 'done' ? t('tileVerified') : pct ? t('inProgress', { p: pct }) : t('notStarted')}`;
  return (
    <li className="at-li" style={{ '--k': k }}>
      <button type="button" className={'atile st-' + st} style={{ '--a': m.a, '--b': m.b }} onClick={() => onOpen(slug, st === 'done' ? 'review' : 'run')} aria-label={label}>
        <span className="at-top mono" aria-hidden="true"><span>{codeOf(slug)}</span><i className="at-led" /></span>
        <span className="at-ap" aria-hidden="true">
          <i className="at-ticks" />
          <img src={asset(profileImage(slug))} width="72" height="72" alt="" loading="lazy" decoding="async" />
          <i className="at-cross" />
          {st === 'done' && <span className="at-ok">✓</span>}
        </span>
        <span className="at-title">{p(slug)}</span>
        <span className="at-state mono" aria-hidden="true">{st === 'done' ? t('tileVerified') : pct ? `${pct}%` : t('tileNew')}</span>
        <Seg pct={st === 'done' ? 100 : pct} />
        {st === 'done' && <span className="at-edit" aria-hidden="true">✏️</span>}
      </button>
    </li>
  );
});

const ChartCard = memo(function ChartCard({ slug, k, st, pct, count, current, unseal, onOpen, onLocked, t, p, fmtDate, fmtNum, doneAt }) {
  const m = PROFILE_META[slug];
  const rw = rewardOf(slug);
  const sealed = st === 'locked';
  const act = () => {
    if (sealed) { lockedSound(); onLocked(slug); return; }
    onOpen(slug, st === 'done' ? 'review' : 'run');
  };
  return (
    <article className={'chart lay' + (k % 2) + ' st-' + st + (current ? ' current' : '') + (unseal ? ' unseal' : '')} style={{ '--a': m.a, '--b': m.b, '--k': k }}>
      <div className="ch-art" aria-hidden="true" onClick={act}>
        <i className="ch-grid" />
        <i className="ch-clip" />
        <img src={asset(profileImage(slug))} width="120" height="120" alt={alt(profileImage(slug))} loading="lazy" decoding="async" />
        <span className="ch-emo">{m.emoji}</span>
        {sealed && (
          <>
            <i className="seal s1"><span>{t('sealBand')} · {t('sealBand')} · {t('sealBand')}</span></i>
            <i className="seal s2"><span>{t('sealBand')} · {t('sealBand')} · {t('sealBand')}</span></i>
            <span className="ch-lock">
              <svg viewBox="0 0 48 56"><rect x="4" y="22" width="40" height="30" rx="6" className="lk-b" /><path d="M13 22v-7a11 11 0 0 1 22 0v7" className="lk-s" /><rect x="14" y="31" width="20" height="8" rx="2" className="lk-slot" /><circle cx="38" cy="28" r="2" className="lk-led" /></svg>
            </span>
          </>
        )}
        {current && <span className="ch-now mono"><i className="led" />{t('nowOpen')}</span>}
      </div>
      <div className="ch-body">
        <p className="ch-id mono">{codeOf(slug)} · {t('questionsCount', { n: fmtNum(count) })} · {t('minutes', { n: fmtNum(m.mins) })}</p>
        <p className="ch-flavor">{p(slug, 'flavor')}</p>
        <h3 className="ch-title">{p(slug)}</h3>
        <p className="ch-desc">{p(slug, 'desc')}</p>
        <div className={'rx' + (st === 'done' ? ' got' : '')} aria-label={t('rxLabel', { pts: fmtNum(rw.pts), qs: fmtNum(rw.qs) })}>
          <b className="rx-r" aria-hidden="true">℞</b>
          <span className="mono"><b>+{fmtNum(rw.pts)}</b> {t('pts')}</span>
          <span className="mono"><b>+{fmtNum(rw.qs)}</b> QS</span>
        </div>
        <div className="vitals" aria-hidden="true">
          <svg viewBox="0 0 100 24" preserveAspectRatio="none"><path d={ECG_D} className="vt-bg" /><path d={ECG_D} className="vt-on" style={{ clipPath: `inset(0 ${100 - (st === 'done' ? 100 : pct)}% 0 0)` }} /></svg>
          <span className="mono">{st === 'done' ? '100%' : `${pct}%`}</span>
        </div>
        <div className="ch-foot">
          <span className="ch-state">
            {st === 'done' ? t('completedOn', { date: fmtDate(doneAt) }) : sealed ? t('sealedState') : pct ? t('inProgress', { p: pct }) : t('notStarted')}
          </span>
          <button type="button" className={'btn ' + (sealed ? 'sealed' : st === 'done' ? 'ghost' : 'primary')} onClick={act}>
            {sealed ? <><span aria-hidden="true">🔒</span> {t('sealedCta')}</> : st === 'done' ? <><span aria-hidden="true">✏️</span> {t('edit')}</> : <>{pct ? t('resume') : t('start')} <span aria-hidden="true">→</span></>}
          </button>
        </div>
      </div>
    </article>
  );
});

function Dashboard({ mounted, answers, completed, g, onOpen, onLocked }) {
  const i18n = useI18n();
  const { t, p, fmtDate, fmtNum } = i18n;
  const done = mounted ? completed : {};
  const ans = mounted ? answers : {};
  const info = useMemo(() => {
    const o = {};
    for (const s of g.items) {
      const pr = profileProgress(s, ans);
      o[s] = { pct: done[s] ? 100 : pr.pct, count: estimateCount(s, ans) };
    }
    return o;
  }, [g.items, ans, done]);
  const stOf = (s) => (done[s] ? 'done' : g.lock[s] ? 'locked' : info[s].pct ? 'progress' : 'open');

  // surveys just unsealed → play the colour-return animation once
  const prevOpen = useRef(null);
  const [unseal, setUnseal] = useState(false);
  useEffect(() => {
    if (!mounted) return undefined;
    if (prevOpen.current === false && g.profilesComplete) {
      setUnseal(true);
      const id = setTimeout(() => setUnseal(false), 1800);
      prevOpen.current = true;
      return () => clearTimeout(id);
    }
    prevOpen.current = g.profilesComplete;
    return undefined;
  }, [mounted, g.profilesComplete]);

  const open = (slug, mode) => { profileOpen(g.items.indexOf(slug)); onOpen(slug, mode); };
  const todo = g.profiles.filter((s) => !done[s]);
  const left = g.profiles.length - g.profDone;

  return (
    <div className="dash">
      {/* §1 */}
      <section className="block" id="profiles" aria-labelledby="sec-prof">
        <div className="sec-head">
          <div>
            <p className="eyebrow mono"><i className="led" />{t('profEyebrow')}</p>
            <h2 id="sec-prof" className="sec-title">{t('profTitle')}</h2>
            <p className="sec-sub">{left ? t('profSub', { n: fmtNum(left) }) : t('profSubDone')}</p>
          </div>
          <div className="gauge mono" role="img" aria-label={t('overall', { done: fmtNum(g.profDone), total: fmtNum(g.profiles.length) })}>
            <b>{fmtNum(g.profDone)}</b><small>/{fmtNum(g.profiles.length)}</small>
            <Seg pct={(g.profDone / g.profiles.length) * 100} n={g.profiles.length} />
          </div>
        </div>
        <ul className="tiles">
          {g.profiles.map((s, k) => <ApertureTile key={s} slug={s} k={k} st={stOf(s)} pct={info[s].pct} onOpen={open} t={t} p={p} />)}
        </ul>
      </section>

      {/* §2 */}
      <section className="block" id="todo" aria-labelledby="sec-todo">
        <div className="sec-head">
          <div>
            <p className="eyebrow mono"><i className="led amber" />{t('todoEyebrow')}</p>
            <h2 id="sec-todo" className="sec-title">{t('todoTitle')}</h2>
            <p className="sec-sub">{todo.length ? t('todoSub') : t('todoDone')}</p>
          </div>
        </div>
        {todo.length ? (
          <div className="charts">
            {todo.map((s, k) => (
              <ChartCard key={s} slug={s} k={k} st={stOf(s)} pct={info[s].pct} count={info[s].count} onOpen={open} onLocked={onLocked} t={t} p={p} fmtDate={fmtDate} fmtNum={fmtNum} />
            ))}
          </div>
        ) : (
          <div className="allset" role="status">
            <span className="as-badge" aria-hidden="true">✓</span>
            <div><strong>{t('allProfilesTitle')}</strong><p>{t('allProfilesSub')}</p></div>
          </div>
        )}
      </section>

      {/* §3 */}
      <section className={'block surveys' + (g.profilesComplete ? ' open' : ' sealed-all')} id="surveys" aria-labelledby="sec-surv">
        <div className="sec-head">
          <div>
            <p className="eyebrow mono"><i className={'led ' + (g.profilesComplete ? '' : 'red')} />{t('survEyebrow')}</p>
            <h2 id="sec-surv" className="sec-title">{t('survTitle')}</h2>
            <p className="sec-sub">
              {!g.profilesComplete ? t('survSubLocked', { n: fmtNum(left) }) : g.allDone ? t('survSubAll') : t('survSubOpen')}
            </p>
          </div>
          {!g.profilesComplete && (
            <button type="button" className="btn ghost sm" onClick={() => { lockedSound(); onLocked(g.surveys[0]); }}>
              <span aria-hidden="true">🔒</span> {t('survWhy')}
            </button>
          )}
        </div>
        <div className="charts">
          {g.surveys.map((s, k) => (
            <ChartCard key={s} slug={s} k={k} st={stOf(s)} pct={info[s].pct} count={info[s].count} current={s === g.current} unseal={unseal}
              onOpen={open} onLocked={onLocked} t={t} p={p} fmtDate={fmtDate} fmtNum={fmtNum} doneAt={done[s]} />
          ))}
        </div>
      </section>
    </div>
  );
}
export default memo(Dashboard);
