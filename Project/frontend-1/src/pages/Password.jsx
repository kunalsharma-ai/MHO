import { useEffect, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { HeartMark } from '../components/Brand.jsx';
import { Field, PasswordField, HumanCheck } from '../components/FormKit.jsx';
import { LiveZone } from '../components/ui.jsx';
import { Link, useRouter } from '../router.jsx';
import { API } from '../config/site.js';
import { validatePassword, validateEmail, apiRequest, track } from '../utils/helpers.js';
import { useGuestOnly } from '../utils/session.js';
import { accountCall, passwordIssue, NETWORK_ERROR } from '../components/AccountKit.jsx';

// Links from the new mailers carry a long single-use token (/set-password, /forgot-password); older emails carry a
// 6-digit code (/create-password, /auth/password) that the legacy /api/v1/user endpoints still check.
const isLegacyCode = (code) => /^\d{4,8}$/.test(code);
const linkKind = () => (/^\/(forgot|reset)-password/.test(window.location.pathname) ? 'reset' : 'verify');

const REDIRECT_SECONDS = 30; // how long the "Password created" screen stays before we open the log-in page

export default function Password() {
  useGuestOnly(); // already logged in -> straight to the dashboard
  const { navigate } = useRouter();
  const [state, setState] = useState('checking'); // checking | invalid | form | saving | done
  const [link, setLink] = useState({ user: '', code: '', kind: 'verify', legacy: false, email: '', firstName: '' });
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState({});
  const [alert, setAlert] = useState('');
  const [left, setLeft] = useState(REDIRECT_SECONDS);
  // when the link is not valid: ask for a fresh one (same API as "Forgot password?")
  const [email, setEmail] = useState('');
  const [cap, setCap] = useState({ id: '', answer: '' });
  const [capKey, setCapKey] = useState(0);
  const [reqState, setReqState] = useState('form'); // form | sending | sent
  const [reqAlert, setReqAlert] = useState('');
  const [reqNotice, setReqNotice] = useState('');

  const linkQuery = useRef(null);
  // Verify the link as soon as the page opens.
  useEffect(() => {
    let live = true;
    // read once: the address bar is cleared below, and React may run this effect twice (dev StrictMode, remounts),
    // which then found no code and showed "This link is incomplete" for a good link
    if (!linkQuery.current) linkQuery.current = new URLSearchParams(window.location.search);
    const q = linkQuery.current;
    const user = (q.get('user') || '').trim();
    const code = (q.get('code') || '').trim();
    if (!user || !code) { setAlert('This link is incomplete. Request a new link below.'); setState('invalid'); return undefined; }
    const kind = linkKind();
    const legacy = isLegacyCode(code);
    setLink({ user, code, kind, legacy, email: '', firstName: '' });
    // Remove the secret from the address bar (and so from history and screenshots) once it is in memory.
    try { window.history.replaceState(null, '', window.location.pathname); } catch { /* ignore */ }
    if (!legacy) {
      accountCall('POST', '/link', { kind, user, code }).then((r) => {
        if (!live) return;
        if (r.ok) { setLink((l) => ({ ...l, email: r.row.email || '', firstName: r.row.firstName || '' })); setState('form'); return; }
        const why = r.status === 0 ? NETWORK_ERROR : r.code === 'LINK_EXPIRED' ? 'This link has expired.' : r.code === 'LINK_USED' ? 'This link has already been used.' : 'This link is not valid.';
        setAlert(`${why} Request a new link below.`);
        setState('invalid');
      });
      return () => { live = false; };
    }
    apiRequest('POST', `${API.register}/${encodeURIComponent(user)}`, { code }).then((res) => {
      if (!live) return;
      if (res.ok) { setState('form'); return; }
      const msg = (res.data?.message || '').trim();
      setAlert(res.status === 0 ? 'We could not reach the server. Check your connection and try again.' : msg ? `${msg}. Request a new link below.` : 'This link has expired or is not valid. Request a new link below.');
      setState('invalid');
    });
    return () => { live = false; };
  }, []);

  // After the password is created: show the confirmation for 30 seconds, then open the log-in page.
  useEffect(() => {
    if (state !== 'done') return undefined;
    if (left <= 0) { navigate('/login'); return undefined; }
    const timer = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [state, left, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    const x = {};
    const p = link.legacy ? validatePassword(pw) : passwordIssue(pw, link.email); if (p) x.password = p;
    if (!x.password && pw !== confirm) x.confirm = 'Passwords do not match.';
    setErr(x);
    if (Object.keys(x).length) return;
    setState('saving');
    setAlert('');
    if (!link.legacy) {
      const r = await accountCall('POST', link.kind === 'reset' ? '/reset-password' : '/set-password', { user: link.user, code: link.code, password: pw, confirmPassword: confirm });
      if (!r.ok) {
        if (['LINK_EXPIRED', 'LINK_USED', 'LINK_INVALID'].includes(r.code)) { setAlert('This link can no longer be used. Request a new link below.'); setState('invalid'); return; }
        setState('form');
        if (r.errors?.password) setErr({ password: r.errors.password });
        else setAlert(r.status === 0 ? NETWORK_ERROR : r.message || 'We could not save your password right now. Please try again shortly.');
        return;
      }
      track('password_set');
      setLeft(REDIRECT_SECONDS);
      setState('done');
      return;
    }
    const res = await apiRequest('PATCH', API.register, { userID: link.user, emailOTP: link.code, password: pw, confirmPassword: confirm, action: 'set-password' });
    if (!res.ok) {
      const msg = res.data?.message || '';
      if (/expired/i.test(msg)) { setAlert('This link has expired. Request a new link below.'); setState('invalid'); return; }
      setState('form');
      setAlert(res.status === 0 ? 'We could not reach the server. Check your connection and try again.' : msg || 'We could not save your password right now. Please try again shortly.');
      return;
    }
    track('password_set');
    setLeft(REDIRECT_SECONDS);
    setState('done');
  };

  const requestNew = async (e) => {
    e.preventDefault();
    setReqAlert('');
    const em = validateEmail(email);
    if (em) { setErr({ email: em }); return; }
    // the API needs a solved human check here too: without it every request was refused
    if (!String(cap.answer || '').trim()) { setErr({ captcha: 'Please complete the human check.' }); return; }
    setErr({});
    setReqState('sending');
    // Unverified accounts get a fresh confirmation link, verified ones a reset link; the answer is the same for every address.
    const res = await accountCall('POST', '/forgot-password', { email: email.trim().toLowerCase(), captcha: cap });
    setCapKey((k) => k + 1);
    if (!res.ok) {
      setReqState('form');
      if (res.code === 'CAPTCHA_FAILED') { setErr({ captcha: 'The human check did not match. Please try the new one.' }); return; }
      setReqAlert(res.status === 0 ? NETWORK_ERROR : res.code === 'RATE_LIMITED' ? 'Too many requests. Please try again in an hour.' : res.message || 'We could not send a new link right now. Please try again shortly.');
      return;
    }
    setReqNotice('If that email is registered, a new link is on its way. It works once and expires in 24 hours.');
    setReqState('sent');
  };

  return (
    <section className="login2">
      <div className="l2-bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="container l2-grid">
        <LiveZone className="l2-visual" aria-hidden="true">
          <div className="l2v-copy">
            <span className="l2v-pill"><span className="dot" /> Account security</span>
            <p className="l2v-big">One last step to <span>secure</span> your account.</p>
            <p className="l2v-small">Choose a strong password you don’t use anywhere else.</p>
          </div>
          <div className="l2v-wallet"><span className="l2v-heart"><HeartMark size={74} /></span></div>
        </LiveZone>

        <div className="login-card">
          <div className="lc-head">
            <span className="lc-mark"><HeartMark size={50} /></span>
            <h1>{state === 'done' ? (link.kind === 'reset' ? 'Password changed' : 'Password created') : link.kind === 'reset' ? 'Choose a new password' : 'Create your password'}</h1>
            <p>{state === 'done' ? 'You’re all set. Log in with your new password.' : link.kind === 'reset' ? `Choose a new password${link.email ? ` for ${link.email}` : ''}. Other devices will be signed out.` : `${link.firstName ? `Thanks, ${link.firstName}. ` : ''}Your email is confirmed. Now choose a password to finish.`}</p>
          </div>

          {state === 'checking' && <p className="lc-done" role="status">Checking your link…</p>}

          {state === 'invalid' && (
            <div>
              <p className="form-alert" role="alert">{alert}</p>
              {reqState === 'sent' ? (
                <div className="lc-done" role="status">
                  <Icon name="mail" size={30} stroke={2.5} />
                  <p>{reqNotice}</p>
                  <p className="form-fine">Open the newest email and tap its link. Check your spam folder too.</p>
                </div>
              ) : (
                <form onSubmit={requestNew} noValidate>
                  <Field label="Registered email address" required htmlFor="p-em" error={err.email} icon="mail">
                    <input id="p-em" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" aria-invalid={!!err.email} placeholder="you@example.com" />
                  </Field>
                  <HumanCheck value={cap} onChange={setCap} invalid={!!err.captcha} resetKey={capKey} />
                  {err.captcha && <p className="field-error" role="alert"><Icon name="info" size={14} /> {err.captcha}</p>}
                  {reqAlert && <p className="form-alert" role="alert">{reqAlert}</p>}
                  <button className="btn btn-primary btn-block" type="submit" disabled={reqState === 'sending'}>
                    <span className="btn-label">{reqState === 'sending' ? 'Sending…' : 'Send me a new link'}</span>
                    <Icon name="mail" size={18} />
                  </button>
                </form>
              )}
              <p className="lc-alt"><Link to="/login">Go to log in</Link></p>
            </div>
          )}

          {state === 'done' && (
            <div className="lc-done" role="status">
              <Icon name="check" size={30} stroke={3} />
              <p>{link.kind === 'reset' ? 'Your password is changed.' : 'Your password is created.'} You can log in now.</p>
              <p className="form-fine">Taking you to log in in {left}s…</p>
              <Link to="/login" className="btn btn-primary btn-block"><span className="btn-label">Go to log in</span><Icon name="arrow" size={18} /></Link>
            </div>
          )}

          {(state === 'form' || state === 'saving') && (
            <form onSubmit={submit} noValidate>
              <Field label="New password" required htmlFor="p-pw" error={err.password} icon="key">
                <PasswordField id="p-pw" value={pw} onChange={setPw} invalid={!!err.password} />
              </Field>
              <Field label="Confirm password" required htmlFor="p-pw2" error={err.confirm}>
                <PasswordField id="p-pw2" value={confirm} onChange={setConfirm} invalid={!!err.confirm} showMeter={false} placeholder="Type it again" />
              </Field>
              {alert && <p className="form-alert" role="alert">{alert}</p>}
              <button className="btn btn-primary btn-block" type="submit" disabled={state === 'saving'}>
                <span className="btn-label">{state === 'saving' ? 'Saving…' : 'Save password'}</span>
                <Icon name="lock" size={18} />
              </button>
            </form>
          )}
          <p className="lc-safe"><Icon name="shieldCheck" size={14} /> We will never ask for your password by email, chat or phone.</p>
        </div>
      </div>
    </section>
  );
}
