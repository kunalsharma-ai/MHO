import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Captcha from '../components/Captcha.jsx';
import CountryPicker from '../components/CountryPicker.jsx';
import DobPicker from '../components/DobPicker.jsx';
import Field from '../components/SxField.jsx';
import SxRail, { railPct } from '../components/SxRail.jsx';
import VerifyEmailModal from '../components/VerifyEmailModal.jsx';
import { PageSeo } from '../components/PageHero.jsx';
import { PAGES } from '../data/pages.js';
import { COUNTRIES, SUPPORTED_COUNTRIES } from '../data/countries.js';
import { STEPS } from '../data/signupSteps.js';
import { MEMBER_CATEGORIES, MIN_SIGNUP_AGE, NOTIFY_CHANNELS, USER_API } from '../data/site.js';
//import { ADULT_AGE, GENDERS, STEP_FIELDS, ageFromDob,validateSignup } from '../utils/validate.js';
import { postJSON, putJSON } from '../utils/api.js';
import { buildRegisterPayload } from '../utils/registerPayload.js';
import { rememberSignup } from '../utils/signupMemo.js';
import SocialLogin from '../components/SocialLogin.jsx';
import { EMAIL_RE, ADULT_AGE, GENDERS, STEP_FIELDS, ageFromDob, isDisposable,validateSignup } from '../utils/validate.js';
import { checkEmailDomain, checkEmailTaken } from '../utils/emailChecks.js';
import { detectCountry } from '../utils/geo.js';
import { rememberNotify } from '../utils/notifyMemo.js';

const page = PAGES.signup;
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Sign Up', path: page.path }];


const LAST_STEP = 2;
const RESEND_WAIT = 30; // seconds between "resend" clicks

export default function SignUp() {
  const { search } = useLocation();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [v, setV] = useState({
    memberType: 'consumer', firstName: '', lastName: '', gender: '', dob: '', country: '',
    email: '', phoneIso: '', phone: '',
    notify: { dashboard: true, sms: true, whatsapp: true, email: true },
    captchaOk: false, agreeTerms: false, marketing: false, website: '',
  });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [serverMsg, setServerMsg] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resendBusy, setResendBusy] = useState(false);
  const [resendMsg, setResendMsg] = useState('');
  const captchaRef = useRef(null);
  const cardRef = useRef(null);
  const [remote, setRemote] = useState({}); // { email: {value,msg}, guardianEmail: {value,msg} }
//const minor = isMinor(v.dob);

const errors = useMemo(() => {
  const e = validateSignup(v);
  const r = remote.email;
  if (!e.email && r?.msg && r.value === String(v.email || '').trim().toLowerCase()) e.email = r.msg;
  return e;
}, [v, remote]);

 useEffect(() => {
    const q = new URLSearchParams(search);
    const words = (q.get('name') || '').trim().split(/\s+/).filter(Boolean);
    const email = (q.get('email') || '').trim();
    if (!words.length && !email) return;
    setV((s) => ({
      ...s,
      firstName: s.firstName || words[0] || '',
      lastName: s.lastName || (words.length > 1 ? words[words.length - 1] : ''),
      email: s.email || email,
    }));
  }, [search]);

  useEffect(() => {
    if (new URLSearchParams(search).get('type') === 'professional') setV((s) => ({ ...s, memberType: 'professional' }));
  }, [search]);

  useEffect(() => {
  const ctrl = new AbortController();
  detectCountry({ signal: ctrl.signal }).then((iso) => {
    if (!iso || ctrl.signal.aborted) return;
    const match = SUPPORTED_COUNTRIES.find((c) => String(c.iso).toLowerCase() === iso);
    if (!match) return;
    setV((s) => (s.country ? s : { ...s, country: match.iso, phoneIso: s.phoneIso || match.iso }));
  });
  return () => ctrl.abort();
}, []);

  // Counts down the "resend" lock, one tick per second.
  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

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

  function next() {
    if (stepErrors(step).length) {
      setTouched((t) => ({ ...t, ...Object.fromEntries(STEP_FIELDS[step].map((k) => [k, true])) }));
      setTimeout(() => {
        const el = cardRef.current?.querySelector('[aria-invalid="true"]');
        if (el) el.focus();
      }, 30);
      return;
    }
    go(step + 1);
  }
  
  async function runRemote(key, raw) {
  const val = String(raw || '').trim().toLowerCase();
  if (!EMAIL_RE.test(val) || isDisposable(val)) return '';
  if (remote[key]?.value === val) return remote[key].msg;
  let msg = await checkEmailDomain(val);
  if (!msg && key === 'email' && (await checkEmailTaken(val))) {
    msg = 'This email is already registered. Please log in, or use the verification email we sent earlier.';
  }
  setRemote((r) => ({ ...r, [key]: { value: val, msg } }));
  return msg;
}

  async function submit(e) {
    e.preventDefault();
    if (step < LAST_STEP) return next();
    if (status === 'sending') return;
    if (Object.keys(errors).length) {
      setTouched(Object.fromEntries([...STEP_FIELDS[1], ...STEP_FIELDS[2]].map((k) => [k, true])));
      if (stepErrors(1).length) go(1);
      else setTimeout(() => cardRef.current?.querySelector('[aria-invalid="true"]')?.focus(), 30);
      return;
    }
    if (v.website) return; // honeypot
setStatus('sending');
setServerMsg('');
const dial = (COUNTRIES.find((c) => c.iso === v.phoneIso) || {}).dial || '';
try {
 const emailMsg = await runRemote('email', v.email);
if (emailMsg) {
  setTouched((t) => ({ ...t, email: true }));
  setStatus('idle');
  setTimeout(() => cardRef.current?.querySelector('[aria-invalid="true"]')?.focus(), 60);
  return;
}
const res = await putJSON(USER_API, buildRegisterPayload(v, {
  dial,
  
  categories: MEMBER_CATEGORIES,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
}));
rememberSignup(res.data?.user, { memberType: v.memberType, firstName: v.firstName.trim() });
      rememberNotify(res.data?.user ?? res.data, v.notify);
      setSentTo(v.email.trim().toLowerCase());
      setCooldown(RESEND_WAIT);
      setResendMsg('');
      setStatus('sent');
      setModalOpen(true);
    } catch (ex) {
      setServerMsg(ex.message || 'Registration failed. Please try again.');
      setStatus('error');
      captchaRef.current?.refresh();
    }
  }

  async function resend() {
    if (resendBusy || cooldown > 0 || !sentTo) return;
    setResendBusy(true);
    setResendMsg('');
    try {
      await postJSON(`${USER_API}/resend`, { mail: sentTo });
      setResendMsg('We’ve sent the email again.');
      setCooldown(RESEND_WAIT);
    } catch (ex) {
      setResendMsg(ex.message || 'Could not resend the email. Please try again.');
    } finally {
      setResendBusy(false);
    }
  }

  return (
    <>
      <PageSeo page={page} crumbs={crumbs} />
      <section className="sx">
        <div className="sx-bg" aria-hidden="true">
          <span className="sx-orb o1" /><span className="sx-orb o2" /><span className="sx-orb o3" />
          {Array.from({ length: 14 }).map((_, i) => <i key={i} className="sx-coin" style={{ '--i': i }} />)}
        </div>
        <div className="container sx-row">
          <aside className="sx-aside">
            <p className="eyebrow eyebrow-light">Join free · about 2 minutes</p>
            <h1>{page.h1}</h1>
            <p className="muted-light">Earn money online by sharing your opinion — no investment, no fees, ever.</p>
            <div className="sx-stage" aria-hidden="true">
              <div className={`sx-badge s${status === 'sent' ? 4 : step}`}><Icon name={status === 'sent' ? 'mail' : STEPS[step - 1].icon} size={44} stroke={1.4} /></div>
              <p className="sx-stage-t">{status === 'sent' ? 'Check your inbox' : STEPS[step - 1].art}</p>
            </div>
            <ul className="sx-perks">
              <li><Icon name="heart" size={18} /> 100% free membership</li>
              <li><Icon name="wallet" size={18} /> PayPal · UPI · Bank · Gift cards</li>
              <li><Icon name="lock" size={18} /> Your details are never sold or shared</li>
            </ul>
          </aside>

          <div className="sx-card" ref={cardRef}>
            {status === 'sent' ? (
              <div className="sx-done" role="status">
                <div className="done-check"><Icon name="mail" size={40} stroke={2.4} /></div>
                <h2>Check your inbox, {v.firstName.trim()}!</h2>
                <p>We’ve sent a verification link to <strong>{sentTo}</strong>. Open it to confirm your email, then finish the last two steps.</p>
                <ol className="sx-next">
                  <li><Icon name="mail" size={18} /> Open the email & verify</li>
                  <li><Icon name="layers" size={18} /> Finish your profile & create your password</li>
                  <li><Icon name="gift" size={18} /> Start earning rewards</li>
                </ol>
                <div className="done-actions">
                  <button type="button" className="btn btn-dark" onClick={resend} disabled={resendBusy || cooldown > 0}>
                    {resendBusy ? 'Sending…' : cooldown > 0 ? `Resend email in ${cooldown}s` : 'Resend email'}
                  </button>
                  <Link to="/how-it-works" className="btn btn-ghost-dark">What happens next</Link>
                </div>
                <p className="tiny muted" role="status" aria-live="polite">{resendMsg}</p>
                <p className="tiny muted">Wrong email address? <Link to="/contact-us">Contact us</Link> and we’ll fix it.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <SxRail steps={STEPS} step={step} pct={pct} onGo={step < LAST_STEP ? go : undefined} />

                <div className={`sx-pane d${dir}`} key={step}>
                  {step === 1 ? (
                    <>
                      <h2 className="sx-h">Hi there! Who’s joining?</h2>
                      <div className="sx-types" role="radiogroup" aria-label="I’m joining as">
                        {[['consumer', 'Consumer', 'Everyday opinions on products & services', 'user'], ['professional', 'Business professional', 'Expert B2B surveys about your work', 'briefcase']].map(([k, l, d, ic]) => (
                          <label key={k} className={`sx-type ${v.memberType === k ? 'on' : ''} t-${k}`}>
                            <input type="radio" name="memberType" value={k} checked={v.memberType === k} onChange={() => set('memberType', k)} />
                            <span className="sx-type-ico"><Icon name={ic} size={26} /></span>
                            <strong>{l}</strong>
                            <small>{d}</small>
                            <span className="sx-tick"><Icon name="check" size={14} stroke={3} /></span>
                          </label>
                        ))}
                      </div>
                      <div className="sx-grid">
                        <Field id="firstName" label="First name" error={err('firstName')} ok={ok('firstName')} half icon="user">
                          <input id="firstName" placeholder=" " autoComplete="given-name" maxLength={40} value={v.firstName} onChange={(e) => set('firstName', e.target.value)} {...aria('firstName')} />
                        </Field>
                        <Field id="lastName" label="Last name" error={err('lastName')} ok={ok('lastName')} half icon="user">
                          <input id="lastName" placeholder=" " autoComplete="family-name" maxLength={40} value={v.lastName} onChange={(e) => set('lastName', e.target.value)} {...aria('lastName')} />
                        </Field>
                        <div className={`sx-field half sx-dob ${err('dob') ? 'bad' : ''} ${ok('dob') ? 'good' : ''}`}>
                          <label className="sx-static-label" htmlFor="dob">Date of birth</label>
                          <DobPicker
                            id="dob"
                            value={v.dob}
                            minAge={MIN_SIGNUP_AGE}
                            invalid={Boolean(err('dob'))}
                            describedBy={err('dob') ? 'dob-err' : 'dob-hint'}
                            onChange={(iso) => set('dob', iso)}
                            onDone={() => touch('dob')}
                          />
                          {err('dob') ? <p className="f-err" id="dob-err" role="alert">{err('dob')}</p> : <p className="f-hint" id="dob-hint">Type it or tap the calendar · {MIN_SIGNUP_AGE}+ to join</p>}
                        </div>
                        <Field id="gender" label="Gender" error={err('gender')} ok={ok('gender')} half icon="user">
                          <select id="gender" className={v.gender ? 'has-val' : ''} value={v.gender} onChange={(e) => { set('gender', e.target.value); touch('gender'); }} {...aria('gender')}>
                            <option value="" disabled hidden />
                            {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </Field>
                        <div className={`sx-field ${err('country') ? 'bad' : ''} ${ok('country') ? 'good' : ''}`}>
                          <span className="sx-static-label" id="country-lbl">Country of residence</span>
                          <CountryPicker
                            id="country"
                            list={SUPPORTED_COUNTRIES}
                            value={v.country}
                            invalid={Boolean(err('country'))}
                            describedBy={err('country') ? 'country-err' : 'country-lbl'}
                            onChange={(c) => { setV((s) => ({ ...s, country: c.iso, phoneIso: s.phoneIso || c.iso })); touch('country'); }}
                          />
                          {err('country') ? <p className="f-err" id="country-err" role="alert">{err('country')}</p> : null}
                        </div>
                      </div>
                      {!v.dob || !Number.isFinite(ageFromDob(v.dob)) || ageFromDob(v.dob) >= ADULT_AGE ? null : <p className="sx-note"><Icon name="shield" size={16} />Under 18: after you verify your email, we’ll ask for your parent/guardian’s details.</p>}
                    </>
                  ) : null}

                  {step === 2 ? (
                    <>
                      <h2 className="sx-h">Where should your invitations land?</h2>
                      <p className="sx-sub">When you continue, we’ll email you a link to verify your address.</p>
                      <div className="sx-grid">
                        <Field id="email" label="Email address" error={err('email')} ok={ok('email')} hint="We’ll send a verification link here." icon="mail">
                          <input id="email" type="email" placeholder=" " autoComplete="email" maxLength={120} value={v.email} onChange={(e) => set('email', e.target.value)} {...aria('email')} onBlur={() => { touch('email'); runRemote('email', v.email); }} />
                        </Field>
                        <div className={`sx-field ${err('phone') ? 'bad' : ''} ${ok('phone') ? 'good' : ''}`}>
                          <span className="sx-static-label">Mobile number</span>
                          <div className="sx-phone">
                            <CountryPicker id="phoneIso" mode="dial" list={COUNTRIES} value={v.phoneIso} placeholder="Code" onChange={(c) => { set('phoneIso', c.iso); touch('phone'); }} invalid={Boolean(err('phone') && !v.phoneIso)} />
                            <input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="Mobile number" maxLength={18} value={v.phone} onChange={(e) => set('phone', e.target.value.replace(/[^\d\s-]/g, ''))} {...aria('phone')} aria-label="Mobile number" />
                          </div>
                          {err('phone') ? <p className="f-err" id="phone-err" role="alert">{err('phone')}</p> : <p className="f-hint">For verification and optional SMS / WhatsApp alerts.</p>}
                        </div>
                      </div>
                    
                      <fieldset className="sx-notify">
                        <legend>Get survey invitations by</legend>
                        <div className="sx-switches">
                          {NOTIFY_CHANNELS.map((c) => (
                            <label key={c.id} className={`sx-switch ${v.notify[c.id] ? 'on' : ''}`}>
                              <span className={`inv-ico ic-${c.id}`}><Icon name={c.icon} size={18} /></span>
                              <span className="sx-sw-t"><strong>{c.name}</strong><small>{c.line}</small></span>
                              <input type="checkbox" role="switch" checked={v.notify[c.id]} disabled={c.id === 'dashboard'} onChange={(e) => set('notify', { ...v.notify, [c.id]: e.target.checked })} />
                              <i className="sx-knob" aria-hidden="true" />
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <div className="hp" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input id="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set('website', e.target.value)} />
                      </div>
                      <div className="sx-captcha">
                        <p className="sx-mini-h"><Icon name="bot" size={18} /> Quick human check</p>
                        <Captcha ref={captchaRef} error={err('captcha')} onChange={(okc) => set('captchaOk', okc)} />
                      </div>
                      <label className={`sx-consent ${err('agreeTerms') ? 'bad' : ''}`}>
                        <input type="checkbox" checked={v.agreeTerms} onChange={(e) => { set('agreeTerms', e.target.checked); touch('agreeTerms'); }} aria-invalid={Boolean(err('agreeTerms'))} />
                        <span>I agree to the <Link to="/terms" target="_blank">Terms of Use</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link> and consent to receive survey invitations and take part in market research.</span>
                      </label>
                      {err('agreeTerms') ? <p className="f-err" role="alert">{err('agreeTerms')}</p> : null}
                      <label className="sx-consent">
                        <input type="checkbox" checked={v.marketing} onChange={(e) => set('marketing', e.target.checked)} />
                        <span>Send me occasional earning tips and newsletters (optional).</span>
                      </label>
                      {status === 'error' ? <p className="form-error" role="alert">{serverMsg}</p> : null}
                    </>
                  ) : null}
                </div>

                <div className="sx-nav">
                  <span />
                  {step < LAST_STEP ? (
                    <button key="next" type="button" className="btn btn-primary btn-lg" onClick={next}>Continue <Icon name="arrow" size={18} /></button>
                  ) : (
                    <button key="submit" type="submit" className="btn btn-primary btn-lg btn-shine" disabled={status === 'sending'}>
                      {status === 'sending' ? <><span className="spinner" /> Sending email…</> : <>Continue <Icon name="arrow" size={18} /></>}
                    </button>
                  )}
                </div>
               {step === 1 ? <SocialLogin /> : null}{/* + social login (Google / Facebook … as enabled in the API) */}
                <p className="tiny muted center">Already a member? <Link to="/login">Log in</Link></p>
              </form>
            )}
          </div>
        </div>
      </section>
      {modalOpen ? (
        <VerifyEmailModal email={sentTo} cooldown={cooldown} busy={resendBusy} message={resendMsg} onResend={resend} onClose={() => setModalOpen(false)} />
      ) : null}
    </>
  );
}
