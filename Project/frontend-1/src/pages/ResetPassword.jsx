import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Field from '../components/SxField.jsx';
import { PageSeo } from '../components/PageHero.jsx';
import { PAGES } from '../data/pages.js';
import { USER_API } from '../data/site.js';
import { passwordChecks, passwordScore, validateNewPassword } from '../utils/validate.js';
import { patchJSON, postJSON } from '../utils/api.js';

const page = PAGES.forgotPassword;
const STRENGTH = ['Too weak', 'Weak', 'Fair', 'Strong', 'Excellent'];

// Shown by /forgot-password when the reset email's link is opened (?user=<id>&code=<otp>).
// checking → form ⇄ saving → done, or invalid when the link is missing, expired or already used.
export default function ResetPassword() {
  const [params] = useSearchParams();
  const userId = params.get('user') || '';
  const code = params.get('code') || '';
  const [phase, setPhase] = useState('checking');
  const [reason, setReason] = useState('');
  const [v, setV] = useState({ password: '', confirm: '' });
  const [touched, setTouched] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [serverMsg, setServerMsg] = useState('');
  const cardRef = useRef(null);
  const errors = useMemo(() => validateNewPassword(v), [v]);

  useEffect(() => {
    if (!userId || !code) {
      setReason('This link is incomplete. Please open the link from your email again.');
      setPhase('invalid');
      return undefined;
    }
    let live = true;
    setPhase('checking');
    postJSON(`${USER_API}/${encodeURIComponent(userId)}`, { code })
      .then(() => live && setPhase('form'))
      .catch((ex) => {
        if (!live) return;
        setReason(ex.message || 'This link is no longer valid.');
        setPhase('invalid');
      });
    return () => { live = false; };
  }, [userId, code]);

  const set = (k, val) => setV((s) => ({ ...s, [k]: val }));
  const touch = (k) => setTouched((t) => ({ ...t, [k]: true }));
  const err = (k) => (touched[k] ? errors[k] : undefined);
  const ok = (k) => touched[k] && !errors[k];
  const aria = (k) => ({ 'aria-invalid': Boolean(err(k)), 'aria-describedby': err(k) ? `${k}-err` : undefined, onBlur: () => touch(k) });

  async function submit(e) {
    e.preventDefault();
    if (phase !== 'form') return;
    if (Object.keys(errors).length) {
      setTouched({ password: true, confirm: true });
      setTimeout(() => cardRef.current?.querySelector('[aria-invalid="true"]')?.focus(), 30);
      return;
    }
    setPhase('saving');
    setServerMsg('');
    try {
      await patchJSON(USER_API, { userID: userId, emailOTP: code, password: v.password, confirmPassword: v.confirm });
      setPhase('done');
    } catch (ex) {
      if (/expired|invalid/i.test(ex.message)) {
        setReason(ex.message);
        setPhase('invalid');
      } else {
        setServerMsg(ex.message || 'We couldn’t save your password. Please try again.');
        setPhase('form');
      }
    }
  }

  const checks = passwordChecks(v.password);
  const score = passwordScore(v.password);
  const ringPct = (score / 4) * 100;

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
            <p className="eyebrow eyebrow-light">Account help</p>
            <h1>Choose a new password</h1>
            <p className="muted-light">Pick a strong password you don’t use anywhere else.</p>
            <div className="sx-stage" aria-hidden="true">
              <div className="sx-badge s4"><Icon name="lock" size={44} stroke={1.4} /></div>
              <p className="sx-stage-t">Lock in your account</p>
            </div>
            <ul className="sx-perks">
              <li><Icon name="lock" size={18} /> We will never ask for your password by email, SMS or WhatsApp</li>
            </ul>
          </aside>

          <div className="sx-card" ref={cardRef}>
            {phase === 'checking' ? (
              <div className="sx-done" role="status" aria-busy="true">
                <h2>Checking your link…</h2>
                <p>One moment while we confirm your request.</p>
              </div>
            ) : null}

            {phase === 'invalid' ? (
              <div className="sx-done" role="alert">
                <div className="done-check"><Icon name="close" size={40} stroke={2.6} /></div>
                <h2>This link can’t be used</h2>
                <p>{reason}</p>
                <p className="tiny muted">Reset links stay valid for 24 hours and work once.</p>
                <div className="done-actions">
                  <Link to="/forgot-password" className="btn btn-dark">Send a new link</Link>
                  <Link to="/login" className="btn btn-ghost-dark">Back to log in</Link>
                </div>
              </div>
            ) : null}

            {phase === 'form' || phase === 'saving' ? (
              <form onSubmit={submit} noValidate>
                <div className="sx-pane d1">
                  <h2 className="sx-h">Create your new password</h2>
                  <div className="sx-grid">
                    <Field id="password" label="New password" error={err('password')} ok={ok('password')} half icon="lock">
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
                </div>
                <div className="sx-nav">
                  <Link to="/login" className="btn btn-ghost-dark">Back to log in</Link>
                  <button type="submit" className="btn btn-primary btn-lg btn-shine" disabled={phase === 'saving'}>
                    {phase === 'saving' ? <><span className="spinner" /> Saving…</> : <>Save new password <Icon name="arrow" size={18} /></>}
                  </button>
                </div>
              </form>
            ) : null}

            {phase === 'done' ? (
              <div className="sx-done" role="status">
                <div className="done-check"><Icon name="check" size={44} stroke={2.8} /></div>
                <h2>Password updated</h2>
                <p>Your new password is saved. Log in to continue.</p>
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