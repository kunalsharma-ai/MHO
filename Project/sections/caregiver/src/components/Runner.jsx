import { asset } from '../lib/asset.js';
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createContext as makeCtx, resolveOptions, sequence, nextOpen, isDone, answerError, asArray, exportAnswers } from '../lib/engine.js';
import { geoStore, ensureGeo } from '../lib/data.js';
import { store } from '../lib/store.js';
import { sound } from '../lib/sound.js';
import { submitProfile } from '../lib/api.js';
import { useI18n } from '../lib/i18n.js';
import QuestionView from './QuestionView.jsx';
import Review from './Review.jsx';
import { AnimatedLogo, ECG_D } from './Brand.jsx';
import { gate } from '../lib/gating.js';

const loadCelebration = () => import('./Celebration.jsx');
const Celebration = lazy(loadCelebration);

export default function Runner({ survey, profileId, mode, startAt, answers, meta, name, onClose, onOpen }) {
  const { t, tc, lang } = useI18n();
  const profile = survey.profiles.find((p) => p.id === profileId);
  // load the completion screen while the questions are being answered, so it appears instantly (no blank moment)
  useEffect(() => { loadCelebration(); }, []);
  const ctx = makeCtx(survey, answers, geoStore);
  const seq = sequence(ctx, profile);

  /* In normal flow, shared screener questions ALREADY answered before this profile was opened are not asked again */
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
  const [firstTime, setFirstTime] = useState(false); // Care Points are awarded only the first time a profile is completed
  const [unlock, setUnlock] = useState(null); // null | { kind: 'surveys' | 'survey', id }
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
      const first = !store.get().meta.completed?.[profile.id];
      setFirstTime(first);
      const before = gate(survey, store.get().meta);
      store.markCompleted(profile.id);
      const after = gate(survey, store.get().meta);
      // did this completion open something new? (all profiles done → surveys; a survey done → the next survey)
      if (first && !before.profilesComplete && after.profilesComplete) setUnlock({ kind: 'surveys', id: after.current });
      else if (first && before.profilesComplete && after.current && after.current !== before.current) setUnlock({ kind: 'survey', id: after.current });
      else setUnlock(null);
      submitProfile({
        profile: profile.id,
        respondentId: store.get().rid,
        language: lang,
        completedAt: new Date().toISOString(),
        answers: exportAnswers(c, s),
      });
      sound.celebrateSeed(survey.profiles.indexOf(profile));
      setView('celebrate');
    },
    [profile, lang, survey]
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
  const nextProfile = useMemo(() => {
    /* what comes next follows the gate: next About You profile first, then the survey that is unsealed */
    const id = gate(survey, meta).next;
    return id && id !== profile.id ? survey.profiles.find((p) => p.id === id) : null;
  }, [survey, profile, meta]);

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
  return (
    <div
      className={'runner pat-' + (profile.pattern || 'dots') + ' view-' + view}
      style={{ '--p1': profile.palette[0], '--p2': profile.palette[1], '--p3': profile.palette[2] || '#fff' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="run-title"
      tabIndex={-1}
      ref={rootRef}
    >
      <aside className="run-aside">
        <div className="run-brand">
          <span className="plate"><AnimatedLogo height={28} /></span>
          <span className="run-saved"><span className="emo" aria-hidden="true">💾</span> {t('run.saved')}</span>
        </div>
        <div className="run-figure"><img src={asset('images/profiles/' + profile.icon)} width="300" height="300" alt={tc(profile.title) + ' illustration'} /></div>
        <div className="run-info">
          <h2 id="run-title" className="run-title"><span className="emo" aria-hidden="true">{profile.emoji}</span> {tc(profile.title)}</h2>
          <p className="run-blurb">{tc(profile.blurb)}</p>
          <div className="run-progress" aria-hidden="true">
            <div className="rp-top">
              <span>{view === 'q' && idx >= 0 ? t('run.count', { i: idx + 1, n: shownTotal }) : view === 'review' ? t('rev.title') : ''}</span>
              <b>{prog}%</b>
            </div>
            <div className="rp-ecg">
              <svg viewBox="0 0 100 24" preserveAspectRatio="none">
                <path className="track" d={ECG_D} fill="none" strokeWidth="2.5" strokeLinejoin="round" pathLength="100" vectorEffect="non-scaling-stroke" />
                <path className="fill" d={ECG_D} fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ clipPath: `inset(-40% ${100 - prog}% -40% 0)` }} vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
        </div>
      </aside>

      <div className="run-main">
      <header className="run-head">
        <h2 aria-hidden="true">{tc(profile.title)}</h2>
        <button className="icon-btn close" type="button" onClick={onClose} aria-label={t('close')}>✕</button>
      </header>

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
              next={nextProfile}
              firstTime={firstTime}
              unlock={unlock}
              name={name}
              seed={survey.profiles.indexOf(profile)}
              unlockItem={unlock ? survey.profiles.find((p) => p.id === unlock.id) : null}
              onReview={() => { setEdit(true); setView('review'); }}
              onNext={() => nextProfile && onOpen(nextProfile.id, 'run')}
              onHome={onClose}
            />
          </Suspense>
        )}
      </div>
      </div>
    </div>
  );
}

