import { memo, useMemo, useState } from 'react';
import { useI18n } from '../i18n/index.jsx';
import { profileProgress, estimateCount } from '../lib/engine.js';
import { metaOf, profileImage } from '../data/profileMeta.js';
import { surfaceVars } from '../lib/patterns.js';
import { asset } from '../lib/asset.js';
import { rewardOf, codeOf } from '../lib/rewards.js';
import { profileOpen, sfx } from '../lib/sound.js';
import { ECG_D } from './Brand.jsx';

/**
 * Every profile as a "specimen card" with its OWN identity — palette, dark base, animated texture, illustration in a
 * glowing lens, emoji, and its own opening sound. Nothing is locked; profiles can be done in any order.
 * Status: New → In progress (ECG trace fills in the profile colour) → Complete (✓, "+70 · +5 earned", review / edit).
 * A filter (All · To do · Completed) keeps the grid easy to scan with 100+ profiles (defaults to "To do" above 16).
 */
const Card = memo(function Card({ slug, k, st, pct, count, doneAt, onOpen, t, p, fmtNum, fmtDate }) {
  const m = metaOf(slug);
  const rw = rewardOf(slug);
  const act = () => onOpen(slug, st === 'done' ? 'review' : 'run', k);
  const status = st === 'done' ? t('stDone') : pct ? t('inProgress', { p: pct }) : t('stNew');
  return (
    <li className={'pcard st-' + st} style={{ ...surfaceVars(m), '--k': k }}>
      <button type="button" className="pc-hit" onClick={act} aria-label={`${p(slug)} — ${status}`} />
      <i className="pc-pat" aria-hidden="true" />
      <i className="pc-glow" aria-hidden="true" />
      <div className="pc-top" aria-hidden="true">
        <span className="pc-code mono">{codeOf(slug)}</span>
        <span className={'pc-chip ch-' + st}>{st === 'done' ? '✓ ' : st === 'progress' ? '◔ ' : '✦ '}{status}</span>
      </div>
      <div className="pc-art" aria-hidden="true">
        <i className="pc-ring" />
        <img src={asset(profileImage(slug))} width="88" height="88" alt="" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <span className="pc-emo">{m.emoji}</span>
      </div>
      <div className="pc-body">
        <p className="pc-flavor">{p(slug, 'flavor') !== slug ? p(slug, 'flavor') : m.flavor}</p>
        <h3 className="pc-title">{p(slug)}</h3>
        <p className="pc-desc">{p(slug, 'desc') !== slug ? p(slug, 'desc') : ''}</p>
        <p className="pc-meta mono" aria-hidden="true"><span>❓ {t('questionsCount', { n: fmtNum(count) })}</span><span>⏱ {t('minutes', { n: fmtNum(m.mins) })}</span></p>
        <div className="pc-trace" aria-hidden="true">
          <svg viewBox="0 0 100 24" preserveAspectRatio="none"><path d={ECG_D} className="tr-bg" /><path d={ECG_D} className="tr-on" style={{ clipPath: `inset(0 ${100 - (st === 'done' ? 100 : pct)}% 0 0)` }} /></svg>
          <span className="mono">{st === 'done' ? 100 : pct}%</span>
        </div>
        <div className="pc-foot">
          <span className={'pc-rw' + (st === 'done' ? ' got' : '')} aria-label={st === 'done' ? t('earnedLbl', { pts: fmtNum(rw.pts), qs: fmtNum(rw.qs) }) : t('rxLabel', { pts: fmtNum(rw.pts), qs: fmtNum(rw.qs) })}>
            <b className="rw-p mono">+{fmtNum(rw.pts)} <small>{t('pts')}</small></b>
            <b className="rw-q mono">+{fmtNum(rw.qs)} <small>{t('qsShort')}</small></b>
          </span>
          <span className={'pc-btn ' + (st === 'done' ? 'ghost' : 'solid')} aria-hidden="true">
            {st === 'done' ? <>✏️ {t('reviewEdit')}</> : pct ? <>{t('resume')} →</> : <>{t('start')} →</>}
          </span>
        </div>
        {st === 'done' && doneAt && <p className="pc-date">{t('completedOn', { date: fmtDate(doneAt) })}</p>}
      </div>
    </li>
  );
});

function Profiles({ mounted, answers, completed, pr, onOpen }) {
  const { t, p, fmtNum, fmtDate } = useI18n();
  const done = mounted ? completed : {};
  const ans = mounted ? answers : {};
  const [filter, setFilter] = useState(() => (pr.items.length > 16 ? 'todo' : 'all'));
  const info = useMemo(() => {
    const o = {};
    for (const s of pr.items) {
      const x = profileProgress(s, ans);
      o[s] = { pct: done[s] ? 100 : x.pct, count: estimateCount(s, ans) };
    }
    return o;
  }, [pr.items, ans, done]);
  const stOf = (s) => (done[s] ? 'done' : info[s].pct ? 'progress' : 'open');
  const list = pr.items.filter((s) => (filter === 'all' ? true : filter === 'todo' ? !done[s] : !!done[s]));
  const open = (slug, mode) => { profileOpen(pr.items.indexOf(slug)); onOpen(slug, mode); };
  const tabs = [
    { k: 'all', label: t('fAll'), n: pr.total },
    { k: 'todo', label: t('fTodo'), n: pr.total - pr.done },
    { k: 'done', label: t('fDone'), n: pr.done },
  ];
  return (
    <section className="block" id="profiles" aria-labelledby="sec-prof">
      <div className="sec-head">
        <div>
          <p className="eyebrow"><i className="led" />{t('profEyebrow3')}</p>
          <h2 id="sec-prof" className="sec-title">{t('profTitle3')}</h2>
          <p className="sec-sub">{pr.allDone ? t('profSubDone3') : t('profSub3', { n: fmtNum(pr.total - pr.done) })}</p>
        </div>
        <div className="seg" role="tablist" aria-label={t('fLabel')}>
          {tabs.map((x) => (
            <button key={x.k} type="button" role="tab" aria-selected={filter === x.k} className={filter === x.k ? 'on' : ''} onClick={() => { sfx('toggle'); setFilter(x.k); }}>
              {x.label} <b className="mono">{fmtNum(x.n)}</b>
            </button>
          ))}
        </div>
      </div>
      {list.length ? (
        <ul className="pgrid">
          {list.map((s, k) => (
            <Card key={s} slug={s} k={k} st={stOf(s)} pct={info[s].pct} count={info[s].count} doneAt={done[s]} onOpen={open} t={t} p={p} fmtNum={fmtNum} fmtDate={fmtDate} />
          ))}
        </ul>
      ) : (
        <div className="allset" role="status">
          <span className="as-badge" aria-hidden="true">{filter === 'todo' ? '🏆' : '🌱'}</span>
          <div><strong>{filter === 'todo' ? t('allProfilesTitle3') : t('noneDoneTitle')}</strong><p>{filter === 'todo' ? t('allProfilesSub3') : t('noneDoneSub')}</p></div>
        </div>
      )}
    </section>
  );
}
export default memo(Profiles);
