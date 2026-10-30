
import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { HeartMark } from '../components/Brand.jsx';
import { Field, PasswordField, Captcha } from '../components/FormKit.jsx';
import { LiveZone } from '../components/ui.jsx';
import SocialLogin from '../components/SocialLogin.jsx';
import { Link } from '../router.jsx';
import { API } from '../config/site.js';
import { validateEmail, apiRequest, auth, resetLimit, track } from '../utils/helpers.js';
import { syncPendingAnswers } from '../utils/pendingAnswers.js';
import { useGuestOnly } from '../utils/session.js';

export default function Login() {
  useGuestOnly(); // already logged in -> straight to the dashboard
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [remember, setRemember] = useState(false);
  const [human, setHuman] = useState(false);
  const [capKey, setCapKey] = useState(0);
  const [err, setErr] = useState({});
  const [state, setState] = useState('form');
  const [alert, setAlert] = useState('');
  const [notice, setNotice] = useState('');
  const [view, setView] = useState('login'); // login | forgot
  const [fpState, setFpState] = useState('form'); // form | sending | sent (forgot-password panel)

  const submit = async (e) => {
    e.preventDefault();
    const x = {};
    const em = validateEmail(email); if (em) x.email = em;
    if (!pw) x.password = 'Please enter your password.';
    if (!human) x.captcha = 'Please complete the human check.';
    setErr(x);
    if (Object.keys(x).length) return;
    setState('sending');
    setAlert('');
    setNotice('');
    const res = await apiRequest('POST', API.login, { mail: email.trim().toLowerCase(), password: pw, remember });
    if (!res.ok) {
      setState('form');
      const msg = res.data?.message || '';
      setAlert(res.status === 0 ? 'We could not reach the server. Check your connection and try again.' : /invalid|password/i.test(msg) ? 'That email and password do not match. Please try again.' : msg || 'We could not log you in right now. Please try again shortly.');
      setCapKey((k) => k + 1);
      setHuman(false);
      return;
    }
    // Login worked (status "success"). Same as web-1: go straight to the member area. If the backend also sent a token,
    // keep it under "token" (the member area sends it as "Authorization: Bearer"); it is not required to continue.
    const token = res.data?.token || res.data?.data?.token || '';
    if (token) auth.setToken(token);
    track('login', { method: 'email' });
    setState('done');
    if (!res.preview) {
      // Answers given at sign-up wait in this browser: save them to the account now that it is logged in — with the token, or with the
      // login cookie when the back-end gives no token (never blocks the login for long).
      await Promise.race([syncPendingAnswers({ email: email.trim().toLowerCase() }), new Promise((r) => setTimeout(r, 6000))]);
      // replace(), not assign(): the log-in page must not stay in the browser history, otherwise the Back arrow of a logged-in person
      // (or of the next person using this computer) leads straight back to the log-in form.
      window.location.replace('/member/profiles');
    }
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
    if (!resetLimit.canSend()) { setAlert('Maximum requests reached for today. Please try again after 24 hours.'); return; }
    setFpState('sending');
    const res = await apiRequest('POST', API.forgot, { user: email.trim().toLowerCase() });
    if (!res.ok) {
      setFpState('form');
      setAlert(res.status === 0 ? 'We could not reach the server. Check your connection and try again.' : res.data?.message || 'We could not send the reset link right now. Please try again shortly.');
      return;
    }
    resetLimit.record();
    setNotice(res.data?.message || 'A password reset link has been sent to your mailbox. Please check your email and proceed.');
    setFpState('sent');
  };

  return (
    <section className="login2">
      <div className="l2-bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="container l2-grid">
        <LiveZone className="l2-visual" aria-hidden="true">
          <div className="l2v-copy">
            <span className="l2v-pill"><span className="dot" /> Members area</span>
            <p className="l2v-big">Your next paid survey is <span>waiting</span>.</p>
            <p className="l2v-small">Pick up where you left off — invitations, points and payouts in one place.</p>
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
              <Captcha onChange={setHuman} invalid={!!err.captcha} resetKey={capKey} />
              {err.captcha && <p className="field-error" role="alert"><Icon name="info" size={14} /> {err.captcha}</p>}
              {alert && <p className="form-alert" role="alert">{alert}</p>}
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