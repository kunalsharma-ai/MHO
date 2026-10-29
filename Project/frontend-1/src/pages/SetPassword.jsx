import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Field from '../components/SxField.jsx';
import SxRail, { railPct } from '../components/SxRail.jsx';
import { PageSeo } from '../components/PageHero.jsx';
import { PAGES } from '../data/pages.js';
import { CONSUMER_INTERESTS, INDUSTRIES } from '../data/profiles.js';
import { STEPS } from '../data/signupSteps.js';
import { MEMBER_CATEGORIES, USER_API } from '../data/site.js';
import { STEP_FIELDS, passwordChecks, passwordScore, validateNewPassword, validateProfile } from '../utils/validate.js';
import {patchJSON, postJSON } from '../utils/api.js';
import { buildProfileAnswers } from '../utils/profileAnswers.js';
import { recallSignup, savePendingProfile } from '../utils/signupMemo.js';
import { recallNotify, forgetNotify } from '../utils/notifyMemo.js';

const page = PAGES.setPassword;
const STRENGTH = ['Too weak', 'Weak', 'Fair', 'Strong', 'Excellent'];
const FIRST_STEP = 3; // steps 1–2 were done on /sign-up
const LAST_STEP = 4;

// Opened from the link in the verification / forgot-password email:
//   /auth/password?user=<id>&code=<otp>
// It continues the sign-up wizard where /sign-up stopped:
//   check the link → step 3 "Your world" → step 4 "Secure it" (choose a password) → save.
export default function SetPassword() {
  const [params] = useSearchParams();
  const userId = params.get('user') || '';
  const code = params.get('code') || '';

  // checking → steps ⇄ saving → done, or invalid when the link is missing, expired or already used.
  const [phase, setPhase] = useState('checking');
  const [reason, setReason] = useState('');
  const [step, setStep] = useState(FIRST_STEP);
  const [dir, setDir] = useState(1);
  const [memberType, setMemberType] = useState('consumer');
  const [firstName, setFirstName] = useState('');
  const [channels, setChannels] = useState([]);
  const [v, setV] = useState({ jobTitle: '', industry: '', companyEmail: '', interests: [], password: '', confirm: '' });
  const [touched, setTouched] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [serverMsg, setServerMsg] = useState('');
  const cardRef = useRef(null);
  const errors = useMemo(() => ({ ...validateProfile({ ...v, memberType }), ...validateNewPassword(v) }), [v, memberType]);

  useEffect(() => {
    if (!userId || !code) {
      setReason('This link is incomplete. Please open the link from your email again.');
      setPhase('invalid');
      return undefined;
    }
    let live = true;
    setPhase('checking');
   (async () => {
  let verified = {};
  try {
    const res = await postJSON(`${USER_API}/${encodeURIComponent(userId)}`, { code });
    verified = res.data || {};
  } catch (ex) {
    if (live) {
      setReason(ex.message || 'This link is no longer valid.');
      setPhase('invalid');
    }
    return;
  }
  const saved = recallSignup(userId);
  
const fromServer = Array.isArray(verified.notification)
  ? verified.notification.map((n) => n && n.channel).filter(Boolean)
  : [];
  if (live) setChannels(fromServer.length ? fromServer : recallNotify(userId));
  const type = verified.category
    ? (verified.category === MEMBER_CATEGORIES.professional ? 'professional' : 'consumer')
    : saved?.memberType;
  if (live && type) setMemberType(type);
  const first = verified.name?.first || saved?.firstName;
  if (live && first) setFirstName(first);
  if (live) setPhase('steps');
})();
    return () => { live = false; };
  }, [userId, code]);

  const set = (k, val) => setV((s) => ({ ...s, [k]: val }));
  const touch = (k) => setTouched((t) => ({ ...t, [k]: true }));
  const err = (k) => (touched[k] ? errors[k] : undefined);
  const ok = (k) => touched[k] && !errors[k];
  const aria = (k) => ({ 'aria-invalid': Boolean(err(k)), 'aria-describedby': err(k) ? `${k}-err` : undefined, onBlur: () => touch(k) });

  const stepErrors = (n) => STEP_FIELDS[n].filter((k) => errors[k]);
  const pct = railPct(step, STEPS.length, STEP_FIELDS[step].length, stepErrors(step).length);

  function go(n) {
    setDir(n > step ? 1 : -1);
    setStep(n);
    if (cardRef.current) cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // true when the current step is clean; otherwise marks its fields and focuses the first bad one
  function stepIsValid() {
    console.log('step', step, 'fields', STEP_FIELDS[step], 'errors', errors);
    if (!stepErrors(step).length) return true;
    setTouched((t) => ({ ...t, ...Object.fromEntries(STEP_FIELDS[step].map((k) => [k, true])) }));
    setTimeout(() => cardRef.current?.querySelector('[aria-invalid="true"]')?.focus(), 30);
    return false;
  }

  async function submit(e) {
    e.preventDefault();
    if (phase !== 'steps') return;
    if (!stepIsValid()) return;
    if (step < LAST_STEP) {
      go(step + 1);
      return;
    }
    setPhase('saving');
    setServerMsg('');
    try {
      await patchJSON(USER_API, { userID: userId, emailOTP: code, password: v.password, confirmPassword: v.confirm });
       savePendingProfile(userId, buildProfileAnswers(memberType, v, channels));
       forgetNotify(userId);
      setPhase('done');
    } catch (ex) {
      if (/expired|invalid/i.test(ex.message)) {
        setReason(ex.message);
        setPhase('invalid');
      } else {
        setServerMsg(ex.message || 'We couldn’t save your password. Please try again.');
        setPhase('steps');
      }
    }
  }

  const checks = passwordChecks(v.password);
  const score = passwordScore(v.password);
  const ringPct = (score / 4) * 100;
  const inWizard = phase === 'steps' || phase === 'saving';

  return (
    <>
      <PageSeo page={page} />
      <section className="sx">
        <div className="sx-bg" aria-hidden="true">
          <span className="sx-orb o1" /><span className="sx-orb o2" /><span className="sx-orb o3" />
          {Array.from({ length: 14 }).map((_, i) => <i key={i} className="sx-coin" style={{ '--i': i }} />)}
        </div>
        <div className="container sx-row">
          <aside className="sx-aside">
            <p className="eyebrow eyebrow-light">Email confirmed · almost done</p>
            <h1>{page.h1}</h1>
            <p className="muted-light">Two quick steps left. Choose a password, then tell us what you like. Your account is ready right after.</p>
            <div className="sx-stage" aria-hidden="true">
              <div className={`sx-badge s${inWizard ? step : 4}`}><Icon name={inWizard ? STEPS[step - 1].icon : 'lock'} size={44} stroke={1.4} /></div>
              <p className="sx-stage-t">{inWizard ? STEPS[step - 1].art : 'Lock in your account'}</p>
            </div>
            <ul className="sx-perks">
              <li><Icon name="heart" size={18} /> 100% free membership</li>
              <li><Icon name="wallet" size={18} /> PayPal · UPI · Bank · Gift cards</li>
              <li><Icon name="lock" size={18} /> Your details are never sold or shared</li>
            </ul>
          </aside>

          <div className="sx-card" ref={cardRef}>
            {phase === 'checking' ? (
              <div className="sx-done" role="status" aria-busy="true">
                <h2>Checking your link…</h2>
                <p>One moment while we confirm your email.</p>
              </div>
            ) : null}

            {phase === 'invalid' ? (
              <div className="sx-done" role="alert">
                <div className="done-check"><Icon name="close" size={40} stroke={2.6} /></div>
                <h2>This link can’t be used</h2>
                <p>{reason}</p>
                <p className="tiny muted">Links stay valid for 24 hours and work once. If you already created your password, just log in.</p>
                <div className="done-actions">
                  <Link to="/login" className="btn btn-dark">Log in</Link>
                  <Link to="/sign-up" className="btn btn-ghost-dark">Back to sign up</Link>
                </div>
                <p className="tiny muted">Need help? <Link to="/contact-us">Contact us</Link>.</p>
              </div>
            ) : null}

            {inWizard ? (
              <form onSubmit={submit} noValidate>
                <SxRail steps={STEPS} step={step} pct={pct} onGo={go} minGo={FIRST_STEP} />

                <div className={`sx-pane d${dir}`} key={step}>
                  {step === 4 ? (
                    <>
                      {memberType === 'professional' ? (
                        <>
                          <h2 className="sx-h">Tell us about your work</h2>
                          <p className="sx-sub">Verified professional details unlock higher-value B2B studies. They are never shared with research clients.</p>
                          <div className="sx-grid">
                            <Field id="jobTitle" label="Job title" error={err('jobTitle')} ok={ok('jobTitle')} half icon="briefcase">
                              <input id="jobTitle" placeholder=" " autoComplete="organization-title" maxLength={80} value={v.jobTitle} onChange={(e) => set('jobTitle', e.target.value)} {...aria('jobTitle')} />
                            </Field>
                            <Field id="industry" label="Industry" error={err('industry')} ok={ok('industry')} half icon="layers">
                              <select id="industry" className={v.industry ? 'has-val' : ''} value={v.industry} onChange={(e) => { set('industry', e.target.value); touch('industry'); }} {...aria('industry')}>
                                <option value="" disabled hidden />
                                {INDUSTRIES.map((g) => <optgroup key={g.group} label={g.group}>{g.items.map((i) => <option key={i} value={i}>{i}</option>)}</optgroup>)}
                              </select>
                            </Field>
                            <Field id="companyEmail" label="Company email (optional — speeds up verification)" error={err('companyEmail')} ok={ok('companyEmail') && v.companyEmail} icon="mail">
                              <input id="companyEmail" type="email" placeholder=" " autoComplete="work email" maxLength={120} value={v.companyEmail} onChange={(e) => set('companyEmail', e.target.value)} {...aria('companyEmail')} />
                            </Field>
                          </div>
                        </>
                      ) : (
                        <>
                          <h2 className="sx-h">What are you into? <small>(optional)</small></h2>
                          <p className="sx-sub">Pick a few interests so your first invitations feel relevant. You can refine them later in profile surveys.</p>
                          <div className="sx-interests">
                            {CONSUMER_INTERESTS.map((c) => {
                              const on = v.interests.includes(c.id);
                              return (
                                <button type="button" key={c.id} aria-pressed={on} className={on ? 'on' : ''} onClick={() => set('interests', on ? v.interests.filter((x) => x !== c.id) : [...v.interests, c.id])}>
                                  <Icon name={on ? 'check' : c.icon} size={18} stroke={on ? 2.6 : 1.8} /> {c.label}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </>
                  ) : null}

                  {step === 3 ? (
                    <>
                      <p className="sx-verified"><Icon name="check" size={16} stroke={3} /> Email confirmed{firstName ? ` — thanks, ${firstName}!` : '!'}</p>
                      <h2 className="sx-h">Secure your account</h2>
                      <div className="sx-grid">
                        <Field id="password" label="Create password" error={err('password')} ok={ok('password')} half icon="lock">
                          <input id="password" type={showPw ? 'text' : 'password'} placeholder=" " autoComplete="new-password" maxLength={128} value={v.password} onChange={(e) => set('password', e.target.value)} {...aria('password')} />
                          <button type="button" className="pw-eye" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? 'Hide password' : 'Show password'}><Icon name="eye" size={18} /></button>
                        </Field>
                        <Field id="confirm" label="Confirm password" error={err('confirm')} ok={ok('confirm')} half icon="lock">
                          <input id="confirm" type={showPw ? 'text' : 'password'} placeholder=" " autoComplete="new-password" maxLength={128} value={v.confirm} onChange={(e) => set('confirm', e.target.value)} {...aria('confirm')} />
                        </Field>
                      </div>
                      <div className="sx-pw">
                        <svg viewBox="0 0 36 36" className={`sx-ring s${score}`} aria-hidden="true">
                          <circle cx="18" cy="18" r="15.5" className="bg" />
                          <circle cx="18" cy="18" r="15.5" className="fg" style={{ strokeDasharray: `${ringPct} 100` }} pathLength="100" />
                        </svg>
                        <div>
                          <strong aria-live="polite">{v.password ? STRENGTH[score] : 'Password strength'}</strong>
                          <ul>{checks.map((c) => <li key={c.k} className={c.ok ? 'ok' : ''}><Icon name={c.ok ? 'check' : 'close'} size={12} stroke={3} /> {c.label}</li>)}</ul>
                        </div>
                      </div>
                      {serverMsg ? <p className="form-error" role="alert">{serverMsg}</p> : null}
                    </>
                  ) : null}
                </div>

                <div className="sx-nav">
                  {step > FIRST_STEP ? <button type="button" className="btn btn-ghost-dark" onClick={() => go(step - 1)}><Icon name="arrow" size={16} className="flip" /> Back</button> : <span />}
                  {step < LAST_STEP ? (
                    <button key="next" type="button" className="btn btn-primary btn-lg" onClick={() => stepIsValid() && go(step + 1)}>Continue <Icon name="arrow" size={18} /></button>
                  ) : (
                    <button key="submit" type="submit" className="btn btn-primary btn-lg btn-shine" disabled={phase === 'saving'}>
                      {phase === 'saving' ? <><span className="spinner" /> Saving…</> : <>Create my account <Icon name="sparkle" size={18} /></>}
                    </button>
                  )}
                </div>
              </form>
            ) : null}

            {phase === 'done' ? (
              <div className="sx-done" role="status">
                <div className="done-burst" aria-hidden="true">{Array.from({ length: 14 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}</div>
                <div className="done-check"><Icon name="check" size={44} stroke={2.8} /></div>
                <h2>You’re in{firstName ? `, ${firstName}` : ''}! 🎉</h2>
                <p>Your password is saved and your email is verified. Log in to complete your profile surveys and start earning.</p>
                <ol className="sx-next">
                  <li><Icon name="layers" size={18} /> Complete profile surveys</li>
                  <li><Icon name="gift" size={18} /> Start earning rewards</li>
                </ol>
                <div className="done-actions">
                  <Link to="/login" className="btn btn-primary btn-lg">Log in</Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}