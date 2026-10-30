import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore, firstNameOf } from '../store.jsx';
import { useI18n } from '../i18n/index.jsx';
import { visibleQuestions, makeGetter, QUESTIONS } from '../lib/engine.js';
import { metaOf, QUESTION_EMOJI, profileImage } from '../data/profileMeta.js';
import { answerText } from '../lib/display.js';
import { sfx, fly, coin, quality } from '../lib/sound.js';
import { asset } from '../lib/asset.js';
import { rewardOf, codeOf, progressOf } from '../lib/rewards.js';
import { flyToken } from '../lib/tokenflight.js';
import { queueCelebration } from '../lib/celebrate.js';
import { go } from '../lib/router.js';
import { runFx } from './fx.js';
import CountUp from './CountUp.jsx';

/**
 * "Gene sequenced" — the completion screen (inside the question-flow overlay, under the flow bar).
 *   • a DIFFERENT celebration per profile: its own particle show (fx.js), its own card entrance and its own fanfare
 *   • the profile's illustration in a lens with a turning colour ring and a ✓ that stamps in
 *   • the two rewards as tokens — amber capsule +70 Reward Points and teal heartbeat +5 Quality Score — count up, then
 *     fly into the wallet in the flow bar (the header) and the totals roll to their new values
 *   • a genome strip: one capsule per profile, this one lighting up
 *   • Next profile · Back to my dashboard · review / edit answers
 * Editing an already-completed profile shows "Answers updated" — rewards are never given twice.
 * The overlay scrolls and the card is compact on short / landscape screens, so nothing is ever cut off or covered.
 */
const reduce = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Completion({ slug, earned, onClose, onOpen }) {
  const { state, dispatch } = useStore();
  const i18n = useI18n();
  const { t, p, q: tq, fmtNum } = i18n;
  const meta = metaOf(slug);
  const canvas = useRef(null);
  const tkPts = useRef(null); const tkQs = useRef(null);
  const get = makeGetter(state.answers, slug);
  const vis = visibleQuestions(slug, get);
  const pr = useMemo(() => progressOf(state.completed), [state.completed]);
  const next = pr.next && pr.next !== slug ? pr.next : null;
  const rw = rewardOf(slug);
  const name = firstNameOf(state);
  const [landed, setLanded] = useState({ pts: false, qs: false });

  useEffect(() => {
    if (!canvas.current) return undefined;
    return runFx(canvas.current, meta.fx, [meta.a, meta.b, meta.c, '#2EE6C5', '#FFB020']);
  }, [meta]);

  /* reward delivery into the flow-bar wallet */
  const flight = useRef('idle'); // idle → flying → landed
  useEffect(() => {
    if (!earned || state.seen[slug]) return undefined;
    const deliver = () => { if (flight.current === 'landed') return; flight.current = 'landed'; dispatch({ type: 'seen', slugs: slug }); queueCelebration(slug); };
    if (reduce()) { const id = setTimeout(() => { setLanded({ pts: true, qs: true }); deliver(); }, 600); return () => clearTimeout(id); }
    const ids = [];
    ids.push(setTimeout(() => {
      flight.current = 'flying';
      fly();
      flyToken(tkPts.current, document.getElementById('fw-pts'), '+' + fmtNum(rw.pts), ['#FFB020', '#FF7A45', meta.a, '#FFE3A3'], () => { coin(); setLanded((l) => ({ ...l, pts: true })); }, 'pts');
      ids.push(setTimeout(() => {
        flyToken(tkQs.current, document.getElementById('fw-qs'), '+' + fmtNum(rw.qs), ['#2EE6C5', '#22B8F0', meta.b, '#C9FFF4'], () => { quality(); setLanded((l) => ({ ...l, qs: true })); deliver(); }, 'qs');
      }, 320));
    }, 1500));
    return () => { ids.forEach(clearTimeout); if (flight.current === 'flying') deliver(); };
  }, [earned]); // eslint-disable-line react-hooks/exhaustive-deps

  const variant = pr.items.indexOf(slug) % 6;
  const strip = pr.items.length <= 60;

  return (
    <div className={`done fx-${meta.fx} ent-${variant}`}>
      <canvas ref={canvas} className="done-fx" aria-hidden="true" />
      <div className="done-card">
        <div className="done-top">
          <div className="emblem" aria-hidden="true">
            <i className="em-ring" />
            <span className="em-ap"><img src={asset(profileImage(slug))} width="84" height="84" alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} /></span>
            <span className="em-emo">{meta.emoji}</span>
            <span className="em-check">✓</span>
          </div>
          <div className="done-head">
            <p className="eyebrow"><i className="led" />{codeOf(slug)} · {earned ? t('geneSequenced') : t('credUpdated')}</p>
            <h2 className="done-title">{earned ? t('doneTitle3', { name: name || t('heroNameFallback') }) : t('doneEdited')}</h2>
            <p className="done-sub">{earned ? t('doneSub3', { name: p(slug) }) : t('doneEditedSub')}</p>
          </div>
        </div>

        {earned && (
          <div className="tokens" role="status">
            <div className={'tok tok-pts' + (landed.pts ? ' landed' : '')} ref={tkPts}>
              <span className="tok-ic" aria-hidden="true"><svg viewBox="0 0 32 32"><g transform="rotate(-38 16 16)"><rect x="3" y="10" width="26" height="12" rx="6" className="cap-b" /><path d="M9 10h7v12H9a6 6 0 0 1 0-12z" className="cap-a" /><rect x="6.5" y="12.4" width="8" height="2.4" rx="1.2" className="cap-s" /></g></svg></span>
              <b className="tok-n">+<CountUp value={rw.pts} start={0} duration={1100} /></b>
              <small>{landed.pts ? t('addedToWallet') : t('ledgerPoints')}</small>
            </div>
            <div className={'tok tok-qs' + (landed.qs ? ' landed' : '')} ref={tkQs}>
              <span className="tok-ic" aria-hidden="true"><svg viewBox="0 0 32 32"><path className="qs-heart" d="M16 27S4 19.6 4 11.7C4 7.6 7 5 10.4 5c2.4 0 4.4 1.3 5.6 3.2C17.2 6.3 19.2 5 21.6 5 25 5 28 7.6 28 11.7 28 19.6 16 27 16 27z" /><path className="qs-ecg" d="M6 16h6l2-4 3 8 2-6 2 2h5" pathLength="100" /></svg></span>
              <b className="tok-n">+<CountUp value={rw.qs} start={0} duration={800} /></b>
              <small>{landed.qs ? t('addedToWallet') : t('ledgerQs')}</small>
            </div>
            <p className="sr-only">{t('donePointsSr', { pts: fmtNum(rw.pts), qs: fmtNum(rw.qs) })}</p>
          </div>
        )}

        <div className="dstrip">
          <p className="ds-lbl"><span aria-hidden="true">🧬</span> {t('genomeProgress', { done: fmtNum(pr.done), total: fmtNum(pr.total) })}</p>
          {strip ? (
            <div className="ds-row" aria-hidden="true">
              {pr.items.map((s, k) => {
                const m = metaOf(s);
                return <i key={s} className={(state.completed[s] ? 'on' : '') + (s === slug ? ' me' : '')} style={{ '--a': m.a, '--b': m.b, '--k': k }} />;
              })}
            </div>
          ) : (
            <div className="ds-bar" aria-hidden="true"><i style={{ transform: `scaleX(${pr.pct})` }} /></div>
          )}
        </div>

        <div className="done-actions">
          {next ? (
            <button type="button" className="btn primary xl" style={{ '--a': metaOf(next).a, '--b': metaOf(next).b }} onClick={() => { sfx('next'); onOpen(next); }}>
              <span className="btn-emo" aria-hidden="true">{metaOf(next).emoji}</span>
              <span className="btn-txt">{t('doneNextItem', { name: p(next) })}</span>
              <span className="cta-rw mono" aria-hidden="true">+{fmtNum(rewardOf(next).pts)}</span>
            </button>
          ) : pr.allDone ? <p className="done-legend">🏆 {t('doneAll3')}</p> : null}
          <button type="button" className="btn ghost xl" onClick={() => { sfx('back'); onClose(); }}><span aria-hidden="true">🏠</span> {t('doneHome')}</button>
        </div>

        <details className="answers">
          <summary><span aria-hidden="true">📋</span> {t('doneReview')} <small className="mono">({fmtNum(vis.length)})</small> · ✏️ {t('edit')}</summary>
          <ul>
            {vis.map((n) => {
              const txt = answerText(slug, n, get, i18n);
              return (
                <li key={n}>
                  <button type="button" className="answers__row" onClick={() => { sfx('click'); go(`profile/${slug}/edit/${encodeURIComponent(n)}`); }}>
                    <span className="answers__e" aria-hidden="true">{QUESTION_EMOJI[n] || '•'}</span>
                    <span className="answers__q">{tq(n, QUESTIONS[n].label)}</span>
                    <span className={`answers__a${txt ? '' : ' is-empty'}`}>{txt || t('notAnswered')}</span>
                    <span className="answers__pen" aria-hidden="true">✏️</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </details>
      </div>
    </div>
  );
}
