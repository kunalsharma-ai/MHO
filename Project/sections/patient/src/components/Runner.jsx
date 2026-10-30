import { asset } from '../lib/asset.js';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getLayer } from '../lib/root.js';
import { createContext as makeCtx, resolveOptions, sequence, nextOpen, isDone, answerError, asArray, exportAnswers } from '../lib/engine.js';
import { geoStore, ensureGeo } from '../lib/data.js';
import { store } from '../lib/store.js';
import { sound } from '../lib/sound.js';
import { submitProfile } from '../lib/api.js';
import { useI18n } from '../lib/i18n.js';
import QuestionView from './QuestionView.jsx';
import Review from './Review.jsx';
import Logo from './Logo.jsx';
import { kindOf } from '../lib/access.js';
import { rewardOf } from '../lib/rewards.js';

const Celebration = lazy(() => import('./Celebration.jsx'));

export default function Runner({ survey, profileId, mode, startAt, answers, meta, nextAfter, onClose, onOpen }) {
  const { t, tc, lang } = useI18n();
  const profile = survey.profiles.find((p) => p.id === profileId);
  const ctx = makeCtx(survey, answers, geoStore);
  const seq = sequence(ctx, profile);

  /* Shared questions (e.g. overall health, asked in two chapters) that were ALREADY answered
     before this chapter was opened are not asked again in the normal flow. */
  const [skipShared] = useState(() => new Set(seq.filter((n) => survey.questions[n].shared && isDone(ctx, n))));
  const navOf = useCallback(
    (c, s, keep) => s.filter((n) => !(skipShared.has(n) && n !== keep)),
    [skipShared]
  );

  const [view, setView] = useState(() => (mode === 'review' ? 'review' : 'q'));
  const [edit, setEdit] = useState(mode === 'review');
  const [cur, setCur] = useState(() => {
    if (mode === 'review') return null;
    if (startAt && seq.includes(startAt)) return startAt;
    const nav = navOf(ctx, seq);
    const i = nextOpen(ctx, nav);
    return i >= 0 ? nav[i] : null;
  });
  const [dir, setDir] = useState(1);
  const [firstTime, setFirstTime] = useState(false);
  const [nextItem, setNextItem] = useState(null);
  const rootRef = useRef(null);

  const nav = navOf(ctx, seq, cur);

  /* nothing to ask on open → either show review (already complete) or "all set" */
  useEffect(() => {
    if (view === 'q' && !cur) setView(nav.length && nav.every((n) => isDone(ctx, n)) && meta.completed?.[profileId] ? 'review' : 'empty');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Escape closes, focus trap start */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    addEventListener('keydown', onKey);
    rootRef.current?.focus({ preventScroll: true });
    return () => removeEventListener('keydown', onKey);
  }, [onClose]);

  const finish = useCallback(
    (c) => {
      const s = sequence(c, profile);
      const open = nextOpen(c, s);
      if (open >= 0) { setCur(s[open]); setView('q'); return; }
      // points are earned only the first time a chapter is completed (editing later never adds more)
      const first = !store.get().meta.completed?.[profile.id];
      setFirstTime(first);
      store.markCompleted(profile.id);
      setNextItem(nextAfter ? nextAfter(profile.id, store.get().meta) : null);
      if (first) {
        window.dispatchEvent(new CustomEvent('mho:complete', { detail: { id: profile.id, kind: profile.chapter === 'you' ? 'profile' : 'survey' } }));
      }
      submitProfile({
        profile: profile.id,
        kind: kindOf(profile.id),
        reward: first ? rewardOf(profile.id) : { pts: 0, qs: 0 },
        respondentId: store.get().rid,
        language: lang,
        completedAt: new Date().toISOString(),
        answers: exportAnswers(c, s),
      });
      sound.celebrate(profile.id);
      setView('celebrate');
    },
    [profile, lang]
  );

  const submit = useCallback(
    (name, ans) => {
      store.setAnswer(name, ans);
      const nextAnswers = { ...answers, [name]: ans };
      const c = makeCtx(survey, nextAnswers, geoStore);
      const s = sequence(c, profile);
      const n2 = navOf(c, s, name);
      setDir(1);
      if (edit) {
        const i = nextOpen(c, n2);
        if (i >= 0 && n2[i] !== name) { setCur(n2[i]); sound.next(); return; }
        sound.next();
        // everything answered → if the profile was not completed before, celebrate; else back to review
        if (!meta.completed?.[profile.id]) return finish(c);
        submitProfile({ profile: profile.id, respondentId: store.get().rid, language: lang, updatedAt: new Date().toISOString(), answers: exportAnswers(c, s) });
        setCur(null);
        setView('review');
        return;
      }
      const i = n2.indexOf(name);
      const nxt = n2[i + 1];
      if (nxt) { setCur(nxt); sound.next(); }
      else finish(c);
    },
    [answers, survey, profile, navOf, edit, meta, finish, lang]
  );

  const back = useCallback(() => {
    const i = nav.indexOf(cur);
    setDir(-1);
    sound.back();
    if (i > 0) setCur(nav[i - 1]);
    else if (edit) { setCur(null); setView('review'); }
  }, [nav, cur, edit]);

  const editOne = useCallback((name) => {
    sound.tap(2);
    setEdit(true);
    setDir(1);
    setCur(name);
    setView('q');
  }, []);

  const idx = cur ? nav.indexOf(cur) : -1;
  // when the current answer unlocks follow-up questions, show at least one more step (avoids "1 of 1")
  const unlocks = cur && !isDone(ctx, cur) && profile.questions.some((n) => survey.questions[n].parent === cur || survey.questions[n].when?.q === cur);
  const shownTotal = unlocks ? Math.max(nav.length, idx + 2) : nav.length;
  const doneCount = nav.filter((n) => isDone(ctx, n)).length;
  const pct = nav.length ? Math.round((doneCount / nav.length) * 100) : 100;
  /* geo options needed by the current question are fetched on demand */
  const q = cur ? survey.questions[cur] : null;
  const opt = cur && q.type === 'choice' ? resolveOptions(ctx, cur) : null;
  const [geoErr, setGeoErr] = useState(null);
  useEffect(() => {
    if (opt?.status === 'pending') {
      setGeoErr(null);
      ensureGeo(opt.need.kind, opt.need.cc).catch(() => setGeoErr(opt.need.kind));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur, opt?.status, opt?.need?.cc, opt?.need?.kind]);

  const prog = view === 'q' && idx >= 0 ? Math.round(((idx + (isDone(ctx, cur) ? 1 : 0)) / Math.max(shownTotal, 1)) * 100) : pct;
  const dots = Math.min(shownTotal, 24);
  const at = view === 'q' && idx >= 0 ? Math.min(Math.round((idx / Math.max(shownTotal - 1, 1)) * (dots - 1)), dots - 1) : -1;
  return createPortal(
    <div
      className={'runner pat-' + (profile.pattern || 'dots') + ' view-' + view}
      style={{ '--p1': profile.palette[0], '--p2': profile.palette[1], '--p3': profile.palette[2] || '#fff' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="run-title"
      tabIndex={-1}
      ref={rootRef}
    >
      <i className="run-aurora" aria-hidden="true" />
      <header className="run-top">
        <div className="run-id">
          <span className="run-orb"><img src={asset('images/profiles/' + profile.icon)} width="64" height="64" alt={tc(profile.title) + ' illustration'} /></span>
          <div className="run-id-txt">
            <p className="run-flavor"><span className="emo" aria-hidden="true">{profile.emoji}</span> {tc(profile.flavor)}</p>
            <h2 id="run-title" className="run-title">{tc(profile.title)}</h2>
          </div>
        </div>
        <div className="run-progress" aria-hidden="true">
          <div className="rp-top">
            <span>{view === 'q' && idx >= 0 ? t('run.count', { i: idx + 1, n: shownTotal }) : view === 'review' ? t('rev.title') : ''}</span>
            <b className="num">{prog}%</b>
          </div>
          <div className="capsule-bar"><i className="liquid" style={{ transform: `scaleX(${Math.max(prog, 3) / 100})` }} /><i className="bubbles" /></div>
          {view === 'q' && dots > 1 && (
            <div className="step-dots">{Array.from({ length: dots }, (_, k) => <i key={k} className={k < at ? 'past' : k === at ? 'now' : ''} />)}</div>
          )}
        </div>
        <div className="run-tools">
          <span className="run-saved"><span className="emo" aria-hidden="true">💾</span> {t('run.saved')}</span>
          <span className="plate"><Logo size={26} /></span>
          <button className="icon-btn close" type="button" onClick={onClose} aria-label={t('close')}>✕</button>
        </div>
      </header>

      <div className="run-main">
      <div className="run-body">
        {view === 'q' && cur && (
          <QuestionView
            key={cur}
            name={cur}
            q={q}
            ctx={ctx}
            opt={opt}
            geoErr={geoErr}
            onRetryGeo={() => opt?.need && ensureGeo(opt.need.kind, opt.need.cc).then(() => setGeoErr(null)).catch(() => setGeoErr(opt.need.kind))}
            ans={answers[cur]}
            dir={dir}
            canBack={idx > 0 || edit}
            onBack={back}
            onSubmit={submit}
            isLast={!edit && idx === nav.length - 1}
            step={t('run.count', { i: idx + 1, n: shownTotal })}
          />
        )}

        {view === 'empty' && (
          <div className="q-card center">
            <p className="q-emoji big emo" aria-hidden="true"><span>🌈</span></p>
            <h3 className="q-label">{t('run.nothing')}</h3>
            <button className="btn primary big" type="button" onClick={() => finish(ctx)}>{t('run.finish')} ✓</button>
          </div>
        )}

        {view === 'review' && (
          <Review
            profile={profile}
            ctx={ctx}
            seq={seq}
            onEdit={editOne}
            onDone={() => {
              const i = nextOpen(ctx, seq);
              if (i >= 0) editOne(seq[i]);
              else onClose();
            }}
          />
        )}

        {view === 'celebrate' && (
          <Suspense fallback={null}>
            <Celebration
              profile={profile}
              next={nextItem}
              firstTime={firstTime}
              onReview={() => { setEdit(true); setView('review'); }}
              onNext={() => nextItem && onOpen(nextItem.id, 'run')}
              onHome={onClose}
            />
          </Suspense>
        )}
      </div>
      </div>
    </div>,
    getLayer()
  );
}

