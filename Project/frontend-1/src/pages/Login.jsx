
import { useEffect, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { HeartMark } from '../components/Brand.jsx';
import { Field, PasswordField, HumanCheck } from '../components/FormKit.jsx';
import { accountCall, NETWORK_ERROR } from '../components/AccountKit.jsx';
import { LiveZone } from '../components/ui.jsx';
import SocialLogin from '../components/SocialLogin.jsx';
import { Link } from '../router.jsx';
import { validateEmail, auth, track } from '../utils/helpers.js';
import { syncPendingAnswers } from '../utils/pendingAnswers.js';
import { useGuestOnly } from '../utils/session.js';
import Persona from '../components/Persona.jsx';
import { PanelPicker } from '../components/R8.jsx';
import { visit } from '../utils/dismissed.js';

// Each panel restyles the whole log-in page: its own palette, scene and floating details.
const SCENES = {
  hcp: { persona: ['doctor', 2, 0, 0], line: 'Specialist studies and honoraria, matched to your practice.', chips: [['shieldCheck', 'Licence verified'], ['wallet', 'Honorarium credited'], ['stethoscope', 'Cardiology study']] },
  caregiver: { persona: ['caregiver', 1, 3, 1], line: 'Short surveys that fit around caring, with rewards that help at home.', chips: [['pill', '8 am meds ✓'], ['clock', '10-minute survey'], ['gift', 'Grocery voucher']] },
  patient: { persona: ['patient', 3, 2, 0], line: 'Your experience shapes better care, and it pays you back.', chips: [['lock', 'Anonymous by design'], ['target', 'Matched to your health'], ['coins', 'Reward unlocked']] },
};

export default function Login() {
  useGuestOnly(); // already logged in -> straight to the dashboard
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [remember, setRemember] = useState(false);
  const [cap, setCap] = useState({ id: '', answer: '' });
  const [unverified, setUnverified] = useState(false); // the account exists but the email was never confirmed
  // Sent here from the member area (?verify=1) or after a declined consent (?consent=declined on the home page is separate).
  useEffect(() => {
    try {
      // back from a social sign-in to an account that is suspended or closed
      if (new URLSearchParams(window.location.search).get('inactive') === '1') setAlert('This account is not active. Please contact support.');
      if (new URLSearchParams(window.location.search).get('verify') === '1') {
        setUnverified(true);
        setAlert('Please confirm your email address first. Open the link we emailed you, or enter your email and ask for a new one below.');
      }
    } catch { /* ignore */ }
  }, []);
  const [capKey, setCapKey] = useState(0);
  const [err, setErr] = useState({});
  const [state, setState] = useState('form');
  const [alert, setAlert] = useState('');
  const [notice, setNotice] = useState('');
  const [view, setView] = useState('login'); // login | forgot
  const [fpState, setFpState] = useState('form'); // form | sending | sent (forgot-password panel)
  const [panel, setPanelState] = useState(() => visit.get('panel', ''));
  const [wipe, setWipe] = useState(null);
  const setPanel = (id) => {
    visit.set('panel', id);
    setPanelState(id);
    setWipe({ k: Date.now() });
  };

  const submit = async (e) => {
    e.preventDefault();
    const x = {};
    const em = validateEmail(email); if (em) x.email = em;
    if (!pw) x.password = 'Please enter your password.';
    if (!cap.answer.trim()) x.captcha = 'Please complete the human check.';
    setErr(x);
    if (Object.keys(x).length) return;
    setState('sending');
    setAlert('');
    setNotice('');
    setUnverified(false);
    // POST /api/v1/account/login checks the CAPTCHA, the password and that the email is verified. Unknown email and
    // wrong password give the same answer, so the form never reveals who has an account.
    const res = await accountCall('POST', '/login', { email: email.trim().toLowerCase(), password: pw, remember, captcha: cap });
    if (!res.ok) {
      setState('form');
      setCapKey((k) => k + 1);
      if (res.status === 0) setAlert(NETWORK_ERROR);
      else if (res.code === 'CAPTCHA_FAILED') setErr({ captcha: 'The human check did not match. Please try the new one.' });
      else if (res.code === 'EMAIL_UNVERIFIED') { setUnverified(true); setAlert('Please confirm your email address first. Open the link we emailed you, or ask for a new one below.'); }
      else if (res.code === 'RATE_LIMITED') setAlert('Too many attempts. Please wait a few minutes and try again.');
      else if (res.code === 'ACCOUNT_INACTIVE') setAlert('This account is not active. Please contact support.');
      else setAlert(res.code === 'BAD_CREDENTIALS' ? 'That email and password do not match. Please try again.' : res.message || 'We could not log you in right now. Please try again shortly.');
      return;
    }
    const token = res.body?.token || res.data?.token || '';
    if (token) auth.setToken(token);
    track('login', { method: 'email' });
    setState('done');
    // Answers given at sign-up wait in this browser: save them to the account now that it is logged in (never blocks for long).
    await Promise.race([syncPendingAnswers({ email: email.trim().toLowerCase() }), new Promise((r) => setTimeout(r, 6000))]);
    // The journey decides the next page: consent form for this member's segment, or the dashboard.
    // replace(), not assign(): the log-in page must not stay in the browser history.
    window.location.replace(approvalReturn() || res.data?.journey?.nextUrl || '/member/dashboard');
  };

  const [resendState, setResendState] = useState('');
  const resend = async () => {
    if (!cap.answer.trim()) { setErr({ captcha: 'Complete the new human check first, then ask for the link.' }); return; }
    setErr({});
    setResendState('sending');
    const r = await accountCall('POST', '/resend-verification', { email: email.trim().toLowerCase(), captcha: cap });
    setCapKey((k) => k + 1);
    if (r.code === 'CAPTCHA_FAILED') { setResendState(''); setErr({ captcha: 'The human check did not match. Please try the new one.' }); return; }
    setResendState(r.ok ? 'sent' : ''); // same answer whatever the account state, so nobody can probe which emails exist
    if (!r.ok) setAlert(r.status === 0 ? NETWORK_ERROR : r.code === 'RATE_LIMITED' ? 'Too many requests. Please try again in an hour.' : r.message);
  };

  // "Forgot password?" only OPENS the reset panel — nothing is sent until the person presses "Send reset link".
  const openForgot = (e) => {
    e.preventDefault();
    setAlert('');
    setNotice('');
    setErr({});
    setFpState('form');
    setView('forgot');
  };
  const backToLogin = (e) => {
    if (e) e.preventDefault();
    setAlert('');
    setNotice('');
    setErr({});
    setFpState('form');
    setView('login');
  };
  const sendReset = async (e) => {
    e.preventDefault();
    setAlert('');
    setNotice('');
    const em = validateEmail(email);
    if (em) { setErr({ email: em }); return; }
    setErr({});
    setFpState('sending');
    const res = await accountCall('POST', '/forgot-password', { email: email.trim().toLowerCase() });
    if (!res.ok) {
      setFpState('form');
      setAlert(res.status === 0 ? NETWORK_ERROR : res.code === 'RATE_LIMITED' ? 'Too many requests. Please try again in an hour.' : res.message || 'We could not send the reset link right now. Please try again shortly.');
      return;
    }
    // The API answers the same for every address (no account enumeration).
    setNotice('If that email is registered, a link to create a new password is on its way. It works once and expires in 24 hours.');
    setFpState('sent');
  };

  return (
    <section className={`login2 ${panel ? `rgrade-${panel}` : ''}`} data-panel={panel || undefined}>
      {wipe && <span className="p-wipe" key={wipe.k} aria-hidden="true" />}
      <div className="l2-bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="container l2-grid">
        <LiveZone className="l2-visual" aria-hidden="true">
          {Object.entries(SCENES).map(([id, sc]) => (
            <div key={id} className={`l2-scene ls-${id} t-${id} ${panel === id ? 'on' : ''}`} data-mode-skip="">
              <span className="ls-wash" />
              <span className="ls-motif"><i /><i /><i /><i /><i /></span>
              <div className="ls-art">
                <span className="ls-halo" />
                <span className="ls-persona"><Persona kind={sc.persona[0]} skin={sc.persona[1]} hair={sc.persona[2]} hairStyle={sc.persona[3]} size={150} /></span>
                {sc.chips.map(([ic, t], i) => <span key={t} className={`ls-chip c${i}`}><Icon name={ic} size={15} />{t}</span>)}
              </div>
            </div>
          ))}
          <div className="l2v-copy">
            <span className="l2v-pill"><span className="dot" /> Members area</span>
            <p className="l2v-big">Your next paid survey is <span>waiting</span>.</p>
            <p className="l2v-small">{panel ? SCENES[panel].line : 'Pick up where you left off — invitations, points and payouts in one place.'}</p>
          </div>
          <div className="l2v-wallet">
            {[['paypal', 'PayPal', '#003087', '#009cde'], ['upi', 'UPI · India', '#5f259f', '#ff7909'], ['gift', 'Gift Card', '#232f3e', '#ff9900'], ['bank', 'Wire', '#0f766e', '#14b8a6']].map(([ic, l, c1, c2], i) => (
              <span key={l} className="l2v-card" style={{ '--i': i, '--c1': c1, '--c2': c2 }}><Icon name={ic} size={18} />{l}<i /></span>
            ))}
            <span className="l2v-heart"><HeartMark size={74} /></span>
          </div>
          <div className="l2v-meter">
            <span>Points to next reward</span>
            <i><b /></i>
          </div>
          {['$', '₹', '€', '£', '★'].map((c, i) => <span key={i} className="l2v-float" style={{ '--i': i }}>{c}</span>)}
        </LiveZone>

        <div className="login-card">
          <div className="lc-head">
            <span className="lc-mark"><HeartMark size={50} /></span>
            <h1>{view === 'forgot' ? 'Reset your password' : 'Welcome back'}</h1>
            <p>{view === 'forgot' ? 'Enter your registered email and we will send you a link to create a new password.' : 'Log in with your email and password.'}</p>
          </div>
          {view === 'login' && state !== 'done' && <PanelPicker value={panel} onChange={setPanel} label="I am logging in as" />}
          {state === 'done' ? (
            <div className="lc-done" role="status">
              <Icon name="check" size={30} stroke={3} />
              <p>You're signed in. Taking you to your dashboard…</p>
            </div>
          ) : view === 'forgot' ? (
            fpState === 'sent' ? (
              <div className="lc-done" role="status">
                <Icon name="mail" size={30} stroke={2.5} />
                <p>{notice}</p>
                <p className="form-fine">Open the email and tap the link to create your new password. It can take a minute to arrive — check your spam folder too.</p>
                <button type="button" className="btn btn-ghost" onClick={backToLogin}><span className="btn-label">Back to log in</span></button>
              </div>
            ) : (
              <form onSubmit={sendReset} noValidate>
                <Field label="Registered email address" required htmlFor="fp-em" error={err.email} icon="mail">
                  <input id="fp-em" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" aria-invalid={!!err.email} placeholder="you@example.com" />
                </Field>
                {alert && <p className="form-alert" role="alert">{alert}</p>}
                <button className="btn btn-primary btn-block" type="submit" disabled={fpState === 'sending'}>
                  <span className="btn-label">{fpState === 'sending' ? 'Sending…' : 'Send reset link'}</span>
                  <Icon name="mail" size={18} />
                </button>
                <p className="lc-alt"><a href="/login" onClick={backToLogin}>Back to log in</a></p>
              </form>
            )
          ) : (
            <>
            <form onSubmit={submit} noValidate>
              <Field label="Email address" required htmlFor="l-em" error={err.email} icon="mail">
                <input id="l-em" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" aria-invalid={!!err.email} placeholder="you@example.com" />
              </Field>
              <Field label="Password" required htmlFor="l-pw" error={err.password} icon="lock">
                <PasswordField id="l-pw" value={pw} onChange={setPw} invalid={!!err.password} showMeter={false} autoComplete="current-password" placeholder="Your password" />
              </Field>
              <div className="lc-row">
                <label className="lc-remember"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /><span aria-hidden="true" />Keep me signed in</label>
                <a href="/login" onClick={openForgot}>Forgot password?</a>
              </div>
              <HumanCheck value={cap} onChange={setCap} invalid={!!err.captcha} resetKey={capKey} />
              {err.captcha && <p className="field-error" role="alert"><Icon name="info" size={14} /> {err.captcha}</p>}
              {alert && <p className="form-alert" role="alert">{alert}</p>}
              {unverified && (
                <button type="button" className="btn btn-ghost btn-block" onClick={resend} disabled={resendState !== ''}>
                  <span className="btn-label">{resendState === 'sent' ? 'If the account needs it, a new link is on its way' : resendState === 'sending' ? 'Sending…' : 'Email me a new confirmation link'}</span>
                  <Icon name="mail" size={18} />
                </button>
              )}
              <button className="btn btn-primary btn-block" type="submit" disabled={state === 'sending'}>
                <span className="btn-label">{state === 'sending' ? 'Checking…' : 'Log in securely'}</span>
                <Icon name="lock" size={18} />
              </button>
            </form>
            <SocialLogin label="Or log in with" />
            </>
          )}
          <p className="lc-alt">New here? <Link to="/join">Create a free account</Link></p>
          <p className="lc-safe"><Icon name="shieldCheck" size={14} /> We will never ask for your password by email, chat or phone.</p>
        </div>
      </div>
    </section>
  );
}

/**
 * A parent who opened a teen's approval link before logging in goes back to it (the member area stores it as
 * mho.returnTo for a day). Only that page is accepted, so the value cannot send anyone elsewhere.
 */
function approvalReturn() {
  try {
    const v = JSON.parse(localStorage.getItem('mho.returnTo') || 'null');
    localStorage.removeItem('mho.returnTo');
    if (v && typeof v.url === 'string' && /^\/auth\/guardian-approve\?[\w=&%.-]+$/.test(v.url) && Date.now() - Number(v.at) < 864e5) return v.url;
  } catch { /* storage blocked */ }
  return '';
}
