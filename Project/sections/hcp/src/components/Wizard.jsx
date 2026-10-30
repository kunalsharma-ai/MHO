import { lazy, Suspense, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useStore } from '../store.jsx';
import { useI18n } from '../i18n/index.jsx';
import {
  PROFILE_BY_SLUG, QUESTIONS, visibleQuestions, makeGetter, resolveOptions, subscribeLazy,
  preloadProfile, otherKey, questionValid, estimateCount,
} from '../lib/engine.js';
import { validate } from '../lib/validation.js';
import { metaOf, QUESTION_EMOJI, profileImage } from '../data/profileMeta.js';
import { surfaceVars } from '../lib/patterns.js';
import { sfx, fanfare } from '../lib/sound.js';
import { asset } from '../lib/asset.js';
import { rewardOf, codeOf, seenTotalsOf } from '../lib/rewards.js';
import { ChoiceField, ComboField, TextField, RangeField, PhoneField, FileField, NameField, splitName, joinName } from './Fields.jsx';
import { AnimatedLogo } from './Brand.jsx';
import RollNumber from './RollNumber.jsx';

const loadCompletion = () => import('./Completion.jsx');
const Completion = lazy(loadCompletion);

const isEmpty = (v) => v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length);
const NAME_PART = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u;
const PARTS = 'fullname::parts';

/** Header of the question flow: animated logo, profile, live reward wallet (tokens land here on completion), close. */
export function FlowBar({ slug, onClose, children }) {
  const { state } = useStore();
  const { t, p, fmtNum } = useI18n();
  const tot = seenTotalsOf(state.completed, state.seen);
  const m = metaOf(slug);
  return (
    <header className="flowbar">
      <AnimatedLogo height={28} className="fb-logo" />
      <AnimatedLogo heart height={28} className="fb-heart" />
      <div className="fb-t">
        <span className="fb-emo" aria-hidden="true">{m.emoji}</span>
        <span className="fb-name"><small className="mono">{codeOf(slug)}</small><strong>{p(slug)}</strong></span>
      </div>
      <div className="fb-wallet" role="group" aria-label={t('walletTitle')}>
        <span className="w-pill w-pts" id="fw-pts"><span className="w-dot" aria-hidden="true" /><RollNumber value={tot.pts} format={fmtNum} className="w-num" label={t('walletPts', { n: fmtNum(tot.pts) })} /><small aria-hidden="true">{t('pts')}</small></span>
        <span className="w-pill w-qs" id="fw-qs"><span className="w-dot" aria-hidden="true" /><RollNumber value={tot.qs} format={fmtNum} className="w-num" label={t('walletQsPlain', { n: fmtNum(tot.qs) })} /><small aria-hidden="true">{t('qsShort')}</small></span>
      </div>
      <button type="button" className="icon-btn fb-close" onClick={onClose} aria-label={t('close')}>✕</button>
      {children}
    </header>
  );
}

/**
 * The question flow — an overlay above the dashboard (never a separate page) in the profile's own colours and texture.
 *   • flow bar: logo, profile, live wallet, close; progress line underneath
 *   • left rail (≥ 900 px): the profile's illustration, flavour, reward, and the step list of every visible question
 *     (answered ✓ / current / upcoming — tap an answered step to go back to it)
 *   • main card: big question emoji, question, the field, error line; sticky footer Back · Skip · Next / Finish
 * Single-choice answers auto-advance; Enter continues in every text box (also in the 3 name boxes); Esc closes
 * (answers are saved as you go). Finishing shows the Completion screen inside the same overlay.
 */
export default function Wizard({ slug, editFrom, onClose, onOpen }) {
  const { state, dispatch } = useStore();
  const i18n = useI18n();
  const { t, q: tq, p, fmtNum } = i18n;
  const profile = PROFILE_BY_SLUG[slug];
  const meta = metaOf(slug);
  const wasCompleted = Boolean(state.completed[slug]);
  const editing = Boolean(editFrom) || wasCompleted;
  const [, force] = useReducer((x) => x + 1, 0);

  // draft = this profile's answers, pre-filled with shared answers from other profiles (e.g. country)
  const [prefilled] = useState(() => new Set());
  const [draft, setDraft] = useState(() => {
    const own = { ...(state.answers[slug] || {}) };
    for (const name of profile.questions) {
      if (own[name] !== undefined) continue;
      for (const s of Object.keys(state.answers)) {
        if (s !== slug && state.answers[s]?.[name] !== undefined && !QUESTIONS[name]?.sensitive) {
          own[name] = state.answers[s][name];
          if (state.answers[s][otherKey(name)]) own[otherKey(name)] = state.answers[s][otherKey(name)];
          prefilled.add(name);
          break;
        }
      }
    }
    return own;
  });
  const get = useMemo(() => makeGetter(state.answers, slug, draft), [state.answers, slug, draft]);

  useEffect(() => subscribeLazy(force), []);
  useEffect(() => { preloadProfile(slug, get); }, [slug, get]);
  useEffect(() => { loadCompletion(); }, []); // the completion screen is ready before the last answer (no blank frame)

  const vis = visibleQuestions(slug, get);
  const [current, setCurrent] = useState(() => {
    if (editFrom && vis.includes(editFrom)) return editFrom;
    return vis.find((n) => isEmpty(draft[n])) || vis[0];
  });
  const [dir, setDir] = useState(1);
  const [error, setError] = useState(null);
  const [badBox, setBadBox] = useState(null);
  const [shake, setShake] = useState(0);
  const [done, setDone] = useState(null); // { earned }
  const [ready, setReady] = useState(false);
  const autoTimer = useRef(null);
  const pendingRef = useRef(null);
  const dialogRef = useRef(null);
  const railRef = useRef(null);

  const idx = vis.indexOf(current);
  useEffect(() => {
    if (!done && idx === -1 && vis.length) {
      const order = profile.questions;
      const pos = order.indexOf(current);
      setCurrent(vis.find((n) => order.indexOf(n) > pos) || vis[vis.length - 1]);
    }
  }, [idx, vis, current, done, profile.questions]);
  useEffect(() => { setReady(false); }, [current]);
  useEffect(() => { railRef.current?.querySelector('.is-cur')?.scrollIntoView({ block: 'nearest' }); }, [current]);

  const q = QUESTIONS[current] || {};
  const value = draft[current];
  const otherText = draft[otherKey(current)];
  const opt = (q.options || q.source) ? resolveOptions(q, get, profile.questions) : null;
  const isName = current === 'fullname';

  const commit = useCallback((d = draft) => { dispatch({ type: 'answers', slug, values: d }); }, [dispatch, slug, draft]);

  const setValue = (v) => {
    setError(null);
    setDraft((d) => {
      const n = { ...d, [current]: v };
      if (v === undefined) delete n[current];
      return n;
    });
  };
  const setOther = (v) => { setError(null); setDraft((d) => ({ ...d, [otherKey(current)]: v })); };
  const setParts = (pt) => { setError(null); setBadBox(null); setDraft((d) => ({ ...d, fullname: joinName(pt), [PARTS]: pt })); };

  const finish = useCallback((d) => {
    const gg = makeGetter(state.answers, slug, d);
    const finalVis = visibleQuestions(slug, gg);
    const clean = {};
    for (const n of finalVis) {
      if (d[n] !== undefined) clean[n] = d[n];
      if (d[otherKey(n)] !== undefined && QUESTIONS[n].options?.some((o) => o.other)) clean[otherKey(n)] = d[otherKey(n)];
    }
    if (finalVis.includes('fullname') && d[PARTS]) clean[PARTS] = d[PARTS];
    dispatch({ type: 'replaceAnswers', slug, values: clean });
    if (!wasCompleted) dispatch({ type: 'complete', slug });
    fanfare(meta.fx);
    setDone({ earned: !wasCompleted });
  }, [dispatch, slug, state.answers, wasCompleted, meta.fx, i18n.lang]);

  const fail = (err, box = null) => { setError(err); setBadBox(box); setShake((s) => s + 1); sfx('error'); };

  const goNext = useCallback((d0 = draft, opts = {}) => {
    clearTimeout(autoTimer.current);
    let d = d0;
    if (isEmpty(d[current]) && pendingRef.current) {
      const v = pendingRef.current();
      if (v !== undefined) { d = { ...d, [current]: v }; setDraft(d); }
    }
    const gg = makeGetter(state.answers, slug, d);
    if (current === 'fullname') {
      const pt = d[PARTS] || splitName(d.fullname);
      if (!String(pt.first || '').trim()) { fail({ key: 'errFirstName' }, 'first'); return; }
      for (const k of ['first', 'middle', 'last']) {
        const v = String(pt[k] || '').trim();
        if (v && !NAME_PART.test(v)) { fail({ key: 'errName' }, k); return; }
      }
    }
    const err = validate(QUESTIONS[current], d[current], { get: gg, otherText: d[otherKey(current)] });
    if (err) { fail(err, current === 'fullname' ? 'first' : null); return; }
    commit(d);
    const v = visibleQuestions(slug, gg);
    const i = v.indexOf(current);
    if (opts.saveAll || i === v.length - 1) {
      const firstBad = v.find((n) => !questionValid(n, gg));
      if (firstBad && firstBad !== current) { setDir(1); setCurrent(firstBad); setError(null); sfx('next'); return; }
      finish(d);
      return;
    }
    sfx('next');
    setDir(1);
    setError(null);
    setBadBox(null);
    setCurrent(v[i + 1]);
  }, [draft, state.answers, slug, current, commit, finish]); // eslint-disable-line react-hooks/exhaustive-deps

  const goBack = () => {
    clearTimeout(autoTimer.current);
    if (idx <= 0) return;
    sfx('back');
    setDir(-1);
    setError(null);
    setCurrent(vis[idx - 1]);
  };
  const jump = (name) => {
    if (name === current) return;
    clearTimeout(autoTimer.current);
    sfx('back');
    setDir(vis.indexOf(name) < idx ? -1 : 1);
    setError(null);
    setCurrent(name);
  };

  const close = () => { clearTimeout(autoTimer.current); if (!done) commit(); sfx('back'); onClose(); };

  // single-choice auto-advance (never for "Other" — that needs the specify box)
  const onAuto = (v) => {
    clearTimeout(autoTimer.current);
    const d = { ...draft, [current]: v };
    autoTimer.current = setTimeout(() => goNext(d), 380);
  };
  useEffect(() => () => clearTimeout(autoTimer.current), []);

  // keyboard: Esc closes, Enter advances (inputs / combos / buttons handle Enter themselves)
  useEffect(() => {
    const onKey = (e) => {
      if (e.defaultPrevented) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'Enter' && !done && !e.target.closest('textarea, [role="combobox"], input, button, select, [role="grid"]')) { e.preventDefault(); goNext(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => { dialogRef.current?.focus({ preventScroll: true }); }, []);

  const style = surfaceVars(meta);
  if (done) {
    return (
      <div className="overlay flow done-wrap" style={style} role="dialog" aria-modal="true" aria-label={p(slug)} ref={dialogRef} tabIndex={-1}>
        <i className="flow-pat" aria-hidden="true" /><i className="flow-glow" aria-hidden="true" />
        <FlowBar slug={slug} onClose={() => { sfx('back'); onClose(); }} />
        <Suspense fallback={<div className="done-loading" aria-busy="true"><AnimatedLogo heart height={56} /></div>}>
          <Completion slug={slug} earned={done.earned} onClose={onClose} onOpen={onOpen} />
        </Suspense>
      </div>
    );
  }

  const i = Math.max(0, idx);
  const n = Math.max(vis.length, Math.min(estimateCount(slug, { ...state.answers, [slug]: draft }), vis.length + 8));
  const pct = n ? Math.round((i / n) * 100) : 0;
  const isLast = i === vis.length - 1 && n === vis.length;
  const canSaveAll = editing && vis.every((x) => x === current || questionValid(x, get));
  const rw = rewardOf(slug);

  let field = null;
  if (isName) field = <NameField name={current} parts={draft[PARTS] || splitName(value)} onChange={setParts} onEnter={() => goNext()} bad={badBox} />;
  else if (opt && opt.status !== 'hidden') {
    const common = { q, name: current, value, onChange: setValue, otherText, onOther: setOther, get };
    const shortList = q.type === 'combo' && opt.status === 'ok' && (opt.options || []).length > 0 && opt.options.length <= 8 && q.source !== 'cities';
    if (q.type === 'single' || q.type === 'multi' || shortList) field = <ChoiceField {...common} options={opt.options} onAuto={onAuto} />;
    else field = <ComboField {...common} options={opt.options || []} status={opt.status} onAuto={onAuto} pendingRef={pendingRef} />;
  } else if (q.type === 'tel') field = <PhoneField name={current} value={value} onChange={setValue} get={get} onEnter={() => goNext()} />;
  else if (q.type === 'file') field = <FileField q={q} name={current} value={value} onChange={setValue} />;
  else if (q.type === 'range') field = <RangeField q={q} value={value} onChange={setValue} />;
  else field = <TextField q={q} name={current} value={value} onChange={setValue} onEnter={() => goNext()} get={get} onPicked={() => setReady(true)} />;

  return (
    <div className="overlay flow wiz" style={style} role="dialog" aria-modal="true" aria-labelledby="wiz-q" tabIndex={-1} ref={dialogRef}>
      <i className="flow-pat" aria-hidden="true" /><i className="flow-glow" aria-hidden="true" />
      <FlowBar slug={slug} onClose={close}>
        <div className="wiz-prog" role="progressbar" aria-valuemin={0} aria-valuemax={n} aria-valuenow={i + 1} aria-label={t('questionOf', { i: i + 1, n })}>
          <i style={{ transform: `scaleX(${Math.max(0.03, pct / 100)})` }} />
        </div>
      </FlowBar>
      <div className="wiz-shell">
        <aside className="wiz-rail" aria-label={p(slug)}>
          <div className="rail-id">
            <span className="rail-ap" aria-hidden="true"><i className="pc-ring" /><img src={asset(profileImage(slug))} width="76" height="76" alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} /></span>
            <div>
              <p className="rail-code">{meta.emoji} {p(slug, 'flavor') !== slug ? p(slug, 'flavor') : meta.flavor}</p>
              {!wasCompleted ? <p className="rail-rw mono"><b>+{fmtNum(rw.pts)}</b> {t('pts')} · <b>+{fmtNum(rw.qs)}</b> {t('qsShort')}</p> : <p className="rail-rw mono">✓ {t('stDone')}</p>}
            </div>
          </div>
          <ol className="rail-steps" ref={railRef}>
            {vis.map((name, k) => {
              const ok = !isEmpty(draft[name]) && k !== i;
              const can = k < i || ok;
              return (
                <li key={name} className={(k === i ? 'is-cur' : '') + (ok ? ' is-ok' : '')}>
                  <button type="button" onClick={() => can && jump(name)} disabled={!can && k !== i} aria-current={k === i ? 'step' : undefined}>
                    <span className="rs-dot" aria-hidden="true">{ok ? '✓' : QUESTION_EMOJI[name] || '•'}</span>
                    <span className="rs-q">{tq(name, QUESTIONS[name]?.label)}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="rail-saved"><i className="led" /> {t('savedAuto')}</p>
        </aside>

        <div className="wiz-main">
          <p className="wiz-count mono">{t('questionOf', { i: fmtNum(i + 1), n: fmtNum(n) })}</p>
          <div className={`wiz__body ${dir > 0 ? 'from-right' : 'from-left'}`} key={current} data-q={current}>
            <div className="qemoji" aria-hidden="true"><span>{QUESTION_EMOJI[current] || meta.emoji}</span></div>
            <h3 id="wiz-q" className="wiz__q">
              {tq(current, q.label)}
              {q.optional && <span className="tag">{t('optional')}</span>}
            </h3>
            {prefilled.has(current) && <p className="hint hint--pre">↺ {t('prefilled')}</p>}
            <div className={`wiz__field${shake ? ' shake' : ''}`} key={shake}>{field}</div>
            <p className="err" id={`err-${current}`} role="alert" aria-live="assertive">
              {error && <><span aria-hidden="true">⚠️</span> {t(error.key, error.vars)}</>}
            </p>
          </div>

          <footer className="wiz-foot">
            <button type="button" className="btn ghost" onClick={goBack} disabled={i === 0}><span aria-hidden="true">←</span> <span className="bt">{t('back')}</span></button>
            <div className="wf-r">
              {q.optional && isEmpty(value) && !isLast && (
                <button type="button" className="btn ghost" onClick={() => goNext()}>{t('skipQuestion')}</button>
              )}
              {canSaveAll && !isLast && (
                <button type="button" className="btn ghost save-all" onClick={() => goNext(draft, { saveAll: true })}>💾 <span className="bt">{t('saveFinish')}</span></button>
              )}
              <button type="button" className={'btn primary btn--next' + (ready ? ' ready' : '')} onClick={() => goNext()}>
                {isLast ? (editing ? `💾 ${t('saveFinish')}` : `🏁 ${t('finish')}`) : <>{t('next')} <span aria-hidden="true">→</span></>}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
