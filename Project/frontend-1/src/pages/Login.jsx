import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Captcha from '../components/Captcha.jsx';
import { PageSeo } from '../components/PageHero.jsx';
import { PAGES } from '../data/pages.js';
import { BRAND, DEMO_MODE, MEMBER_PORTAL_URL } from '../data/site.js';
import { postJSON } from '../utils/api.js';
import { EMAIL_RE } from '../utils/validate.js';
import { prefersReducedMotion } from '../utils/storage.js';
import { loginMember } from '../utils/auth.js';
import SocialLogin from '../components/SocialLogin.jsx';
import { flushPendingProfile } from '../utils/signupMemo.js';
const page = PAGES.login;

// Member log-in ("Member Pass").
// Two ways to connect it to the existing member application (README → Login):
//  • VITE_LOGIN_FORM_ACTION — the portal's own login URL. After client checks, the browser submits a normal
//    form POST there (works across domains; the portal sets its own session cookie and redirects).
//  • otherwise VITE_LOGIN_ENDPOINT (default /api/login) — JSON POST with credentials; the response may include
//    { redirect: "https://…" }. Falls back to VITE_MEMBER_PORTAL_URL.
// The server MUST verify the CAPTCHA token, rate-limit attempts and never reveal whether an email exists.
const FORM_ACTION = import.meta.env.VITE_LOGIN_FORM_ACTION || '';
const ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT || '/api/login';
const RESET_URL = import.meta.env.VITE_PASSWORD_RESET_URL || '';
const MAX_TRIES = 5;
const LOCK_SECONDS = 30;

const maskEmail = (e) => {
  const [u = '', d = ''] = e.split('@');
  if (!u) return 'your@email.com';
  const vis = u.slice(0, Math.min(3, u.length));
  return `${vis}${u.length > 3 ? '•'.repeat(Math.min(6, u.length - 3)) : ''}${e.includes('@') ? '@' + d : ''}`;
};

function MemberPass({ email, pwLen, emailOk, pwOk, human, phase }) {
  const card = useRef(null);
  useEffect(() => {
    const el = card.current;
    if (!el || prefersReducedMotion() || window.matchMedia('(hover: none)').matches) return undefined;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--rx', `${(-y * 14).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(x * 18).toFixed(2)}deg`);
        el.style.setProperty('--gx', `${(50 + x * 60).toFixed(1)}%`);
      });
    };
    const reset = () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', reset);
    return () => { window.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', reset); cancelAnimationFrame(raf); };
  }, []);
  const ready = emailOk && pwOk && human;
  const lights = [
    { k: 'Email', on: emailOk, icon: 'mail' },
    { k: 'Password', on: pwOk, icon: 'lock' },
    { k: 'Human', on: human, icon: 'captcha' },
  ];
  return (
    <div className="mp-stage" aria-hidden="true">
      <div className={`mp-card ${ready ? 'is-ready' : ''} ${phase === 'success' ? 'is-flipped' : ''}`} ref={card}>
        <div className="mp-face mp-front">
          <div className="mp-glare" />
          <div className="mp-top">
            <img src={BRAND.monogram} alt="" width="44" height="44" />
            <span className="mp-brand">Myfrequent<b>rewards</b></span>
            <span className="mp-tag">MEMBER PASS</span>
          </div>
          <div className="mp-chip"><i /><i /><i /><i /></div>
          <p className="mp-email">{maskEmail(email)}</p>
          <p className="mp-dots">{Array.from({ length: 12 }, (_, i) => <i key={i} className={i < pwLen ? 'on' : ''} />)}</p>
          <ul className="mp-lights">
            {lights.map((l) => (
              <li key={l.k} className={l.on ? 'on' : ''}><Icon name={l.on ? 'check' : l.icon} size={13} stroke={l.on ? 3 : 2} /> {l.k}</li>
            ))}
          </ul>
          <span className="mp-ready">{ready ? 'READY ✓' : 'LOCKED'}</span>
        </div>
        <div className="mp-face mp-back">
          <span className="mp-burst"><Icon name="check" size={46} stroke={3} /></span>
          <p className="mp-welcome">Welcome back!</p>
          <p className="mp-sub">Opening your dashboard…</p>
        </div>
      </div>
      <div className="mp-orbit">
        {['coins', 'gift', 'wallet', 'shield', 'star', 'chat'].map((ic, i) => <span key={ic} style={{ '--i': i }}><Icon name={ic} size={18} /></span>)}
      </div>
    </div>
  );
}

export default function Login() {
  const [f, setF] = useState({ email: '', password: '', remember: true, captchaOk: false });
  const [touched, setTouched] = useState({});
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | sending | success
  const [msg, setMsg] = useState('');
  const [tries, setTries] = useState(0);
  const [lockLeft, setLockLeft] = useState(0);
  const captchaRef = useRef(null);
  const formRef = useRef(null);
  const tokenRef = useRef(null);

  const emailOk = EMAIL_RE.test(f.email.trim());
  const pwOk = f.password.length >= 6;
  const errs = {
    email: !f.email.trim() ? 'Enter the email you joined with.' : !emailOk ? 'Enter a valid email address.' : '',
    password: !f.password ? 'Enter your password.' : !pwOk ? 'Passwords are at least 6 characters.' : '',
    captcha: !f.captchaOk ? 'Please complete the security check.' : '',
  };
  const err = (k) => (touched[k] || touched.submit ? errs[k] : '');
  const set = (k, val) => setF((s) => ({ ...s, [k]: val }));

  useEffect(() => {
    if (!lockLeft) return undefined;
    const t = setTimeout(() => setLockLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [lockLeft]);

  async function submit(e) {
    e.preventDefault();
    setTouched((t) => ({ ...t, submit: true }));
    setMsg('');
    if (lockLeft) return;
    if (errs.email || errs.password || errs.captcha) {
      const first = errs.email ? 'login-email' : errs.password ? 'login-password' : 'captcha-input';
      const el = document.getElementById(first);
      if (el) el.focus();
      return;
    }
    const captchaToken = captchaRef.current?.token?.() || undefined;
    if (FORM_ACTION && !DEMO_MODE) {
      setPhase('sending');
      if (tokenRef.current) tokenRef.current.value = captchaToken || '';
      formRef.current.submit(); // classic POST to the member portal
      return;
    }
    setPhase('sending');
    try {
   const res = await loginMember({
  mail: f.email.trim().toLowerCase(),
  password: f.password,
  remember: f.remember ? 'on' : undefined,
});
    // login ke baad signup ke pending answers backend ko bhejo (kabhi throw nahi karta; 4s se zyada nahi rukega)
    if (!res.demo) await Promise.race([flushPendingProfile(), new Promise((r) => setTimeout(r, 4000))]);
    setPhase('success');
    const to = res.redirect || MEMBER_PORTAL_URL || '/member/dashboard';
      if (!res.demo && to) setTimeout(() => window.location.assign(to), 1400);
      if (res.demo) setMsg('Preview mode: login simulated — no real account was accessed.');
    } catch (ex) {
      setPhase('idle');
      const n = tries + 1;
      setTries(n);
      captchaRef.current?.refresh();
      set('captchaOk', false);
      setF((s) => ({ ...s, password: '' }));
      if (n >= MAX_TRIES) {
        setLockLeft(LOCK_SECONDS);
        setTries(0);
        setMsg(`Too many attempts. Please wait ${LOCK_SECONDS} seconds, or reset your password.`);
      } else setMsg(ex.message && ex.message !== 'Something went wrong. Please try again.' ? ex.message : 'That email and password don’t match our records. Please try again.');
    }
  }

  const aria = (k, id) => ({ 'aria-invalid': Boolean(err(k)), 'aria-describedby': err(k) ? `${id}-err` : undefined });

  return (
    <>
      <PageSeo page={page} />
      <section className="lx" aria-labelledby="lx-title">
        <div className="lx-bg" aria-hidden="true">
          <span className="lx-ring r1" /><span className="lx-ring r2" /><span className="lx-ring r3" />
          {Array.from({ length: 14 }, (_, i) => <i key={i} className="lx-spark" style={{ '--i': i }} />)}
        </div>
        <div className="container lx-row">
          <div className="lx-art">
            <p className="lx-eyebrow"><span className="live-dot" /> Secure member area</p>
            <h2 className="lx-hero">Your opinions, <span>your rewards</span> — all in one pass.</h2>
            <MemberPass email={f.email} pwLen={Math.min(12, f.password.length)} emailOk={emailOk} pwOk={pwOk} human={f.captchaOk} phase={phase} />
            <ul className="lx-perks">
              <li style={{ '--c': '#FFC233' }}><Icon name="clipboard" size={20} /><span><b>New invitations</b> waiting in your dashboard</span></li>
              <li style={{ '--c': '#2EE6CF' }}><Icon name="wallet" size={20} /><span><b>Track & redeem</b> via PayPal, UPI, bank or gift card</span></li>
              <li style={{ '--c': '#B49CFF' }}><Icon name="layers" size={20} /><span><b>Profile surveys</b> that unlock better matches</span></li>
            </ul>
          </div>

          <div className="lx-card">
            <div className="lx-card-head">
              <span className="lx-badge"><Icon name="lock" size={22} /></span>
              <div>
                <h1 id="lx-title">{page.h1}</h1>
                <p>Log in to see invitations, your balance and rewards.</p>
              </div>
            </div>

            <form ref={formRef} className="lx-form" onSubmit={submit} noValidate method="post" action={FORM_ACTION || undefined}>
              <div className={`lx-field ${err('email') ? 'bad' : ''} ${emailOk ? 'good' : ''}`}>
                <Icon name="mail" size={18} />
                <input id="login-email" name="email" type="email" placeholder=" " autoComplete="username" inputMode="email" value={f.email} onChange={(e) => set('email', e.target.value)} onBlur={() => setTouched((t) => ({ ...t, email: true }))} {...aria('email', 'login-email')} />
                <label htmlFor="login-email">Email address</label>
                <span className="lx-tick" aria-hidden="true"><Icon name="check" size={13} stroke={3} /></span>
              </div>
              {err('email') ? <p className="f-err" id="login-email-err" role="alert">{err('email')}</p> : null}

              <div className={`lx-field ${err('password') ? 'bad' : ''} ${pwOk ? 'good' : ''}`}>
                <Icon name="lock" size={18} />
                <input id="login-password" name="password" type={show ? 'text' : 'password'} placeholder=" " autoComplete="current-password" value={f.password} onChange={(e) => set('password', e.target.value)} onBlur={() => setTouched((t) => ({ ...t, password: true }))} {...aria('password', 'login-password')} />
                <label htmlFor="login-password">Password</label>
                <button type="button" className="lx-eye" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show}><Icon name="eye" size={18} /></button>
              </div>
              {err('password') ? <p className="f-err" id="login-password-err" role="alert">{err('password')}</p> : null}

              <div className="lx-row2">
                <label className="lx-check">
                  <input type="checkbox" name="remember" checked={f.remember} onChange={(e) => set('remember', e.target.checked)} />
                  <span aria-hidden="true" /> Keep me logged in
                </label>
                {RESET_URL ? <a href={RESET_URL} className="lx-forgot">Forgot password?</a> : <Link to="/forgot-password" className="lx-forgot">Forgot password?</Link>}
              </div>

              <div className={`lx-captcha ${err('captcha') ? 'bad' : ''} ${f.captchaOk ? 'good' : ''}`}>
                <p className="lx-cap-title"><Icon name="shield" size={16} /> Quick security check {f.captchaOk ? <b>Verified</b> : null}</p>
                <Captcha ref={captchaRef} error={err('captcha')} onChange={(ok) => set('captchaOk', ok)} />
              </div>
              <input type="hidden" name="captchaToken" ref={tokenRef} defaultValue="" />

              {msg ? <p className={`lx-msg ${phase === 'success' ? 'ok' : ''}`} role="status">{msg}</p> : null}

              <button type="submit" className={`btn btn-primary btn-lg btn-block lx-submit ${phase}`} disabled={phase === 'sending' || lockLeft > 0}>
                {phase === 'sending' ? <><span className="lx-spin" aria-hidden="true" /> Checking…</> : phase === 'success' ? <>Logged in <Icon name="check" size={18} /></> : lockLeft ? `Try again in ${lockLeft}s` : <>Log in securely <Icon name="arrow" size={18} /></>}
              </button>
            </form>
            <SocialLogin />

            <div className="lx-divider"><span>New to MyFrequentRewards?</span></div>

            
            <Link to="/sign-up" className="btn btn-ghost-dark btn-block lx-join"><Icon name="gift" size={18} /> Create your free account</Link>
            <p className="lx-safe"><Icon name="shield" size={14} /> We will never ask for your password by email, SMS or WhatsApp.</p>
          </div>
        </div>
      </section>
    </>
  );
}
