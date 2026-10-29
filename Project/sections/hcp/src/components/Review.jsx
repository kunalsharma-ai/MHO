import { useEffect, useReducer, useRef } from 'react';
import { useStore } from '../store.jsx';
import { useI18n } from '../i18n/index.jsx';
import { visibleQuestions, makeGetter, QUESTIONS, subscribeLazy, preloadProfile } from '../lib/engine.js';
import { metaOf, QUESTION_EMOJI, profileImage } from '../data/profileMeta.js';
import { surfaceVars } from '../lib/patterns.js';
import { FlowBar } from './Wizard.jsx';
import { answerText } from '../lib/display.js';
import { alt } from '../data/altText.js';
import { sfx } from '../lib/sound.js';
import { asset } from '../lib/asset.js';
import { go } from '../lib/router.js';

/** Answers summary of a finished item ("chart review"): every answer is one tap away from being changed. */
export default function Review({ slug, onClose }) {
  const { state } = useStore();
  const i18n = useI18n();
  const { t, p, q: tq, fmtDate } = i18n;
  const meta = metaOf(slug);
  const get = makeGetter(state.answers, slug);
  const vis = visibleQuestions(slug, get);
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);

  useEffect(() => subscribeLazy(force), []);
  useEffect(() => { preloadProfile(slug, get); }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const edit = (name) => { sfx('click'); go(`profile/${slug}/edit/${encodeURIComponent(name)}`); };

  return (
    <div className="overlay flow rev" style={surfaceVars(meta)} role="dialog" aria-modal="true" aria-labelledby="rev-t" tabIndex={-1} ref={ref}>
      <i className="flow-pat" aria-hidden="true" /><i className="flow-glow" aria-hidden="true" />
      <FlowBar slug={slug} onClose={() => { sfx('back'); onClose(); }} />
      <div className="rev-card">
        <header className="rev-head">
          <span className="rail-ap" aria-hidden="true"><i className="pc-ring" /><img src={asset(profileImage(slug))} width="68" height="68" alt={alt(profileImage(slug))} onError={(e) => { e.currentTarget.style.display = 'none'; }} /></span>
          <div>
            <p className="rail-code">{meta.emoji} {p(slug, 'flavor') !== slug ? p(slug, 'flavor') : meta.flavor}{state.completed[slug] && <> · ✓ {t('completedOn', { date: fmtDate(state.completed[slug]) })}</>}</p>
            <h2 id="rev-t" className="rev-title">{t('reviewTitle', { name: p(slug) })}</h2>
            <p className="muted">{t('reviewSub')}</p>
          </div>
        </header>
        <ul className="answers answers--full">
          {vis.map((name, i) => {
            const txt = answerText(slug, name, get, i18n);
            return (
              <li key={name} style={{ '--d': `${Math.min(i, 20) * 25}ms` }}>
                <button type="button" className="answers__row" onClick={() => edit(name)}>
                  <span className="answers__e" aria-hidden="true">{QUESTION_EMOJI[name] || '•'}</span>
                  <span className="answers__q">{tq(name, QUESTIONS[name].label)}</span>
                  <span className={`answers__a${txt ? '' : ' is-empty'}`}>{txt || t('notAnswered')}</span>
                  <span className="answers__pen">✏️ <span className="sr-only">{t('edit')}</span></span>
                </button>
              </li>
            );
          })}
        </ul>
        <footer className="rev-foot">
          <button type="button" className="btn ghost" onClick={() => { sfx('back'); onClose(); }}><span aria-hidden="true">🏠</span> {t('doneHome')}</button>
          <button type="button" className="btn primary" onClick={() => edit(vis[0])}><span aria-hidden="true">✏️</span> {t('edit')}</button>
        </footer>
      </div>
    </div>
  );
}
