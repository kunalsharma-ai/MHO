// New sign-up (/join): four short steps, then "check your inbox". Everything is validated again on the server
// (POST /api/v1/account/register). No welcome survey and no consent here: consent is signed after the first log-in,
// on the segment's own consent page, and profile questions are asked later in the member area.
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { Link } from '../router.jsx';
import { MIN_AGE } from '../config/site.js';
import { validateEmail, validatePhone, validateName, ageFrom, track } from '../utils/helpers.js';
import { referralCode, forgetReferral } from '../utils/referral.js';
import { useGuestOnly } from '../utils/session.js';
import { visit } from '../utils/dismissed.js';
import { SCREENER } from '../data/hcpForm.js';
import { AccountShell, Steps, TextField, SearchSelect, ServerCaptcha, Alert, accountCall, NETWORK_ERROR } from '../components/AccountKit.jsx';

const STEPS = ['About you', 'Where you live', 'Your panel', 'Review'];
const SEGMENTS = [
  { id: 'hcp', title: 'Healthcare professional', sub: 'Doctors, nurses, pharmacists, allied health, lab, admin and support staff', icon: 'stethoscope' },
  { id: 'caregiver', title: 'Caregiver', sub: 'You look after a family member or someone close to you', icon: 'hands' },
  { id: 'patient', title: 'Patient', sub: 'You want to share your own experience of a health condition', icon: 'heart' },
];
const EMPTY = { firstName: '', middleName: '', lastName: '', dob: '', email: '', phone: '', country: '', state: '', city: '', postalCode: '', postalNA: false, segment: '', worksInHealthcare: '', clinician: '', website: '' };
const yn = (label) => (label === 'Yes' ? 'yes' : label === 'No' ? 'no' : '');
const today = () => new Date().toISOString().slice(0, 10);

/** Location lists from the API (one dataset for countries, states and cities, the same one the server validates with). */
function useLocation(country, state) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState({ countries: true, states: false, cities: false });
  useEffect(() => {
    accountCall('GET', '/location/countries').then((r) => {
      const seen = new Set();
      // one row per ISO code, so a country can never appear twice
      setCountries((r.data || []).filter((c) => c.code && !seen.has(c.code) && seen.add(c.code)));
      setLoading((l) => ({ ...l, countries: false }));
    });
  }, []);
  useEffect(() => {
    setStates([]);
    if (!country) return;
    setLoading((l) => ({ ...l, states: true }));
    accountCall('GET', `/location/${country}/states`).then((r) => { setStates(r.data || []); setLoading((l) => ({ ...l, states: false })); });
  }, [country]);
  useEffect(() => {
    setCities([]);
    if (!country || !state) return;
    setLoading((l) => ({ ...l, cities: true }));
    accountCall('GET', `/location/${country}/${state}/cities`).then((r) => { setCities(r.data || []); setLoading((l) => ({ ...l, cities: false })); });
  }, [country, state]);
  return { countries, states, cities, loading };
}

export default function Register() {
  useGuestOnly();
  const [f, setF] = useState(EMPTY);
  const [step, setStep] = useState(0);
  const [err, setErr] = useState({});
  const [alert, setAlert] = useState('');
  const [state, setState] = useState('form'); // form | sending | sent | screened
  const [cap, setCap] = useState({ id: '', answer: '' });
  const [capKey, setCapKey] = useState(0);
  const head = useRef(null);
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));
  const { countries, states, cities, loading } = useLocation(f.country, f.state);
  const country = countries.find((c) => c.code === f.country);
  const stateRow = states.find((s) => s.code === f.state);

  // Panel chosen earlier in this visit (home page picker or ?panel=) preselects the segment; the person can still change it.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('panel') || visit.get('panel', '');
    if (SEGMENTS.some((s) => s.id === q)) setF((s) => ({ ...s, segment: q }));
  }, []);
  useEffect(() => { if (step) { try { window.scrollTo(0, 0); } catch { /* ignore */ } head.current?.focus({ preventScroll: true }); } }, [step]);

  const countryItems = useMemo(() => countries.map((c) => ({ value: c.code, label: c.name, flag: c.code, emoji: c.flag, sub: c.code.toLowerCase() })), [countries]);
  const stateItems = useMemo(() => states.map((s) => ({ value: s.code, label: s.name })), [states]);
  const cityItems = useMemo(() => cities.map((c) => ({ value: c, label: c })), [cities]);

  const chooseCountry = (code) => setF((s) => ({ ...s, country: code, state: '', city: '', postalCode: '', postalNA: false }));
  const chooseState = (code) => setF((s) => ({ ...s, state: code, city: '' }));

  const postalRe = useMemo(() => {
    if (!country?.postalFormat) return null;
    try { return new RegExp(`^(?:${country.postalFormat})$`, 'i'); } catch { return null; }
  }, [country]);

  const check = (i) => {
    const e = {};
    if (i === 0) {
      const fn = validateName(f.firstName, 'first name'); if (fn) e.firstName = fn;
      const mn = validateName(f.middleName, 'middle name', false); if (mn) e.middleName = mn;
      const ln = validateName(f.lastName, 'last name', false); if (ln) e.lastName = ln;
      if (!f.dob) e.dob = 'Please enter your date of birth.';
      else {
        const age = ageFrom(f.dob);
        if (age === null || Number.isNaN(age) || f.dob > today()) e.dob = 'Please enter a valid date of birth.';
        else if (age < MIN_AGE) e.dob = `You must be at least ${MIN_AGE} years old to join.`;
        else if (age > 120) e.dob = 'Please check the year of birth.';
      }
      const em = validateEmail(f.email); if (em) e.email = em;
    }
    if (i === 1) {
      if (!f.country) e.country = 'Please choose your country.';
      else {
        const ph = validatePhone(f.phone, f.country.toLowerCase()); if (ph) e.phone = ph;
        if (states.length && !f.state) e.state = 'Please choose your state or province.';
        if (stateRow?.hasCities && !f.city.trim()) e.city = 'Please choose your city.';
        if (!f.postalNA) {
          const pc = f.postalCode.trim();
          if (!pc) e.postalCode = 'Please enter your postal code, or tick “Postal code not applicable”.';
          else if (postalRe ? !postalRe.test(pc) : !/^[A-Za-z0-9][A-Za-z0-9 -]{1,11}$/.test(pc)) e.postalCode = `This doesn’t look like a valid postal code for ${country?.name || 'this country'}.`;
        }
      }
    }
    if (i === 2) {
      if (!f.segment) e.segment = 'Please choose the panel that describes you.';
      if (f.segment === 'hcp') {
        if (!f.worksInHealthcare) e.worksInHealthcare = 'Please answer this question.';
        else if (f.worksInHealthcare === 'Yes' && !f.clinician) e.clinician = 'Please answer this question.';
      }
    }
    return e;
  };

  // Server errors name fields; open the first step that holds one.
  const FIELD_STEP = { firstName: 0, middleName: 0, lastName: 0, dob: 0, email: 0, country: 1, phone: 1, state: 1, city: 1, postalCode: 1, segment: 2, worksInHealthcare: 2, clinician: 2 };

  const next = (e) => {
    e.preventDefault();
    setAlert('');
    const x = check(step);
    setErr(x);
    if (Object.keys(x).length) return;
    if (step === 2 && f.segment === 'hcp' && f.worksInHealthcare === 'No') { setState('screened'); track('signup_screened_out', { role: 'hcp' }); return; }
    if (step < 3) { setStep(step + 1); return; }
    submit();
  };

  const submit = async () => {
    if (!cap.answer.trim()) { setErr({ captcha: 'Please type the security code.' }); return; }
    setState('sending');
    const ref = referralCode();
    const r = await accountCall('POST', '/register', {
      firstName: f.firstName, middleName: f.middleName, lastName: f.lastName, dob: f.dob, email: f.email,
      phone: f.phone, phoneCountry: f.country, country: f.country, state: f.state, city: f.city.trim(),
      postalCode: f.postalNA ? '' : f.postalCode.trim(), postalCodeNotApplicable: f.postalNA, segment: f.segment,
      screening: f.segment === 'hcp' ? { worksInHealthcare: yn(f.worksInHealthcare), clinician: yn(f.clinician) } : undefined,
      timezone: (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return ''; } })(),
      captcha: cap, website: f.website, ...(ref ? { referredBy: ref } : {}),
    });
    setCapKey((k) => k + 1);
    if (r.ok) { forgetReferral(); track('sign_up', { method: 'email', role: f.segment }); setState('sent'); return; }
    setState('form');
    if (r.status === 0) return setAlert(NETWORK_ERROR);
    if (r.code === 'CAPTCHA_FAILED') return setErr({ captcha: 'That security code was not right. Try the new one.' });
    if (r.code === 'RATE_LIMITED') return setAlert('Too many sign-ups from this connection. Please try again in an hour.');
    if (r.code === 'NOT_ELIGIBLE' && f.segment === 'hcp' && f.worksInHealthcare === 'No') return setState('screened');
    const fields = r.errors || {};
    if (Object.keys(fields).length) {
      setErr(fields);
      const first = Math.min(...Object.keys(fields).map((k) => FIELD_STEP[k] ?? 3));
      if (first < 3) setStep(first);
    }
    setAlert(r.message || 'We could not create your account right now. Please try again shortly.');
  };

  const back = () => { setErr({}); setAlert(''); setStep((s) => Math.max(0, s - 1)); };
  const seg = SEGMENTS.find((s) => s.id === f.segment);
  const tone = f.segment || 'neutral';

  const aside = (
    <div className="acx-aside-copy">
      <p className="acx-kicker">Free to join · 18+</p>
      <h2>Your health opinions, <span>rewarded</span>.</h2>
      <ul>
        <li><Icon name="mail" size={16} /> Confirm your email, then create your password</li>
        <li><Icon name="shieldCheck" size={16} /> Read and sign your panel’s consent after you log in</li>
        <li><Icon name="target" size={16} /> Get survey invitations that match your profile</li>
      </ul>
    </div>
  );

  if (state === 'sent') return <Sent email={f.email} tone={tone} aside={aside} />;
  if (state === 'screened') {
    return (
      <AccountShell tone="hcp" aside={aside}>
        <div className="acx-done">
          <span className="acx-done-ic"><Icon name="info" size={28} /></span>
          <h1>Thank you for your interest</h1>
          <p>{SCREENER.rejectMessage}</p>
          <button type="button" className="btn btn-ghost" onClick={() => { setState('form'); setF((s) => ({ ...s, worksInHealthcare: '', clinician: '' })); }}>
            <span className="btn-label">I chose the wrong answer</span>
          </button>
          <p className="acx-small">Are you a caregiver or a patient instead? Choose that panel on the same step.</p>
        </div>
      </AccountShell>
    );
  }

  return (
    <AccountShell tone={tone} aside={aside}>
      <header className="acx-head">
        <h1 ref={head} tabIndex={-1}>Create your free account</h1>
        <p>Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>
      </header>
      <Steps steps={STEPS} current={step} />
      <form onSubmit={next} noValidate className="acx-form">
        {/* honeypot for bots: hidden from people and screen readers */}
        <div className="acx-hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website')(e.target.value)} /></label></div>

        {step === 0 && (
          <div className="acx-fields">
            <TextField id="r-fn" label="First name" required value={f.firstName} onChange={set('firstName')} error={err.firstName} autoComplete="given-name" maxLength={60} />
            <div className="acx-row2">
              <TextField id="r-mn" label="Middle name" optional value={f.middleName} onChange={set('middleName')} error={err.middleName} autoComplete="additional-name" maxLength={60} />
              <TextField id="r-ln" label="Last name" optional value={f.lastName} onChange={set('lastName')} error={err.lastName} autoComplete="family-name" maxLength={60} />
            </div>
            <TextField id="r-dob" label="Date of birth" required type="date" value={f.dob} onChange={set('dob')} error={err.dob} autoComplete="bday" max={today()} min="1900-01-01" hint={`You must be ${MIN_AGE} or older to join.`} />
            <TextField id="r-em" label="Email address" required type="email" value={f.email} onChange={set('email')} error={err.email} autoComplete="email" icon="mail" maxLength={254} hint="We’ll send a link to confirm it’s yours." />
          </div>
        )}

        {step === 1 && (
          <div className="acx-fields">
            <SearchSelect id="r-co" label="Country" required items={countryItems} value={f.country} onChange={chooseCountry} error={err.country} loading={loading.countries} placeholder="Choose your country" />
            <div className={`acx-field ${err.phone ? 'has-error' : ''} ${!f.country ? 'is-disabled' : ''}`}>
              <label htmlFor="r-ph">Phone number <b aria-hidden="true">*</b></label>
              <div className="acx-input acx-phone">
                <span className="acx-dial" aria-label="Dialling code">{country?.dial || '+'}</span>
                <input id="r-ph" type="tel" inputMode="tel" autoComplete="tel-national" value={f.phone} disabled={!f.country} onChange={(e) => set('phone')(e.target.value.replace(/[^\d\s()-]/g, '').slice(0, 20))} aria-invalid={err.phone ? true : undefined} aria-describedby={err.phone ? 'r-ph-err' : 'r-ph-hint'} />
              </div>
              {err.phone ? <p className="acx-err" id="r-ph-err" role="alert"><Icon name="info" size={13} /> {err.phone}</p> : <p className="acx-hint" id="r-ph-hint">{f.country ? 'Without the country code.' : 'Choose your country first.'}</p>}
            </div>
            {f.country && (states.length > 0 || loading.states) && (
              <SearchSelect id="r-st" label="State / province" required items={stateItems} value={f.state} onChange={chooseState} error={err.state} loading={loading.states} placeholder="Choose your state" />
            )}
            {f.country && stateRow?.hasCities && (
              <SearchSelect id="r-ci" label="City" required items={cityItems} value={f.city} onChange={set('city')} error={err.city} loading={loading.cities} placeholder="Choose your city" allowFree hint="Not listed? Type it and choose “Use …”." disabled={!f.state} />
            )}
            {f.country && (
              <>
                <TextField id="r-pc" label="Postal code" required={!f.postalNA} value={f.postalNA ? '' : f.postalCode} onChange={set('postalCode')} error={err.postalCode} autoComplete="postal-code" maxLength={12} disabled={f.postalNA} />
                <label className="acx-check">
                  <input type="checkbox" checked={f.postalNA} onChange={(e) => setF((s) => ({ ...s, postalNA: e.target.checked, postalCode: '' }))} />
                  <span className="acx-box" aria-hidden="true"><Icon name="check" size={12} stroke={3.5} /></span>
                  Postal code not applicable
                </label>
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="acx-fields">
            <fieldset className={`acx-seg ${err.segment ? 'has-error' : ''}`}>
              <legend>Which panel describes you? <b aria-hidden="true">*</b></legend>
              {SEGMENTS.map((s) => (
                <label key={s.id} className={`acx-seg-opt seg-${s.id} ${f.segment === s.id ? 'on' : ''}`}>
                  <input type="radio" name="segment" value={s.id} checked={f.segment === s.id} onChange={() => setF((x) => ({ ...x, segment: s.id, worksInHealthcare: '', clinician: '' }))} />
                  <span className="acx-seg-ic"><Icon name={s.icon} size={22} /></span>
                  <span><strong>{s.title}</strong><em>{s.sub}</em></span>
                  <span className="acx-seg-tick" aria-hidden="true"><Icon name="check" size={14} stroke={3} /></span>
                </label>
              ))}
              {err.segment && <p className="acx-err" role="alert"><Icon name="info" size={13} /> {err.segment}</p>}
              <p className="acx-hint">Each panel has its own surveys and consent form. You can belong to one panel per account.</p>
            </fieldset>
            {f.segment === 'hcp' && (
              <>
                <YesNo name="works" q={SCREENER.industry.q} value={f.worksInHealthcare} onChange={(v) => setF((s) => ({ ...s, worksInHealthcare: v, clinician: '' }))} error={err.worksInHealthcare} />
                {f.worksInHealthcare === 'Yes' && <YesNo name="clin" q={SCREENER.clinician.q} value={f.clinician} onChange={set('clinician')} error={err.clinician} />}
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="acx-fields">
            <dl className="acx-review">
              <Row k="Name" v={[f.firstName, f.middleName, f.lastName].filter(Boolean).join(' ')} edit={() => setStep(0)} />
              <Row k="Date of birth" v={f.dob} edit={() => setStep(0)} />
              <Row k="Email" v={f.email} edit={() => setStep(0)} />
              <Row k="Phone" v={`${country?.dial || ''} ${f.phone}`} edit={() => setStep(1)} />
              <Row k="Location" v={[f.city, stateRow?.name, country?.name].filter(Boolean).join(', ')} edit={() => setStep(1)} />
              <Row k="Postal code" v={f.postalNA ? 'Not applicable' : f.postalCode} edit={() => setStep(1)} />
              <Row k="Panel" v={seg?.title} edit={() => setStep(2)} />
            </dl>
            <ServerCaptcha value={cap} onChange={setCap} error={err.captcha} resetKey={capKey} />
            <p className="acx-small">
              After you confirm your email and log in, you’ll read and sign the {seg ? seg.title.toLowerCase() : 'panel'} consent form. See our <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a> for how we handle your details.
            </p>
          </div>
        )}

        <Alert>{alert}</Alert>
        <div className="acx-actions">
          {step > 0 && <button type="button" className="btn btn-ghost" onClick={back}><Icon name="arrowLeft" size={18} /><span className="btn-label">Back</span></button>}
          <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
            <span className="btn-label">{step < 3 ? 'Continue' : state === 'sending' ? 'Creating your account…' : 'Create account'}</span>
            <Icon name={step < 3 ? 'arrow' : 'check'} size={18} />
          </button>
        </div>
      </form>
      <p className="acx-alt">Already a member? <Link to="/login">Log in</Link></p>
    </AccountShell>
  );
}

function Row({ k, v, edit }) {
  return (
    <div className="acx-review-row">
      <dt>{k}</dt>
      <dd>{v || '—'}</dd>
      <button type="button" className="acx-link" onClick={edit} aria-label={`Edit ${k.toLowerCase()}`}>Edit</button>
    </div>
  );
}

function YesNo({ name, q, value, onChange, error }) {
  return (
    <fieldset className={`acx-yn ${error ? 'has-error' : ''}`}>
      <legend>{q} <b aria-hidden="true">*</b></legend>
      <div>
        {['Yes', 'No'].map((o) => (
          <label key={o} className={value === o ? 'on' : ''}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} />
            {o}
          </label>
        ))}
      </div>
      {error && <p className="acx-err" role="alert"><Icon name="info" size={13} /> {error}</p>}
    </fieldset>
  );
}

/** "Check your inbox": the link in the email confirms the address and opens the create-password page. */
function Sent({ email, tone, aside }) {
  useEffect(() => { try { window.scrollTo(0, 0); } catch { /* ignore */ } }, []);
  const [cap, setCap] = useState({ id: '', answer: '' });
  const [capKey, setCapKey] = useState(0);
  const [st, setSt] = useState(''); // '' | open | sending | sent
  const [msg, setMsg] = useState('');
  const resend = async (e) => {
    e.preventDefault();
    if (!cap.answer.trim()) { setMsg('Please type the security code.'); return; }
    setSt('sending');
    setMsg('');
    const r = await accountCall('POST', '/resend-verification', { email, captcha: cap });
    setCapKey((k) => k + 1);
    if (r.ok) { setSt('sent'); return; }
    setSt('open');
    setMsg(r.status === 0 ? NETWORK_ERROR : r.code === 'CAPTCHA_FAILED' ? 'That security code was not right. Try the new one.' : r.code === 'RATE_LIMITED' ? 'Too many requests. Please try again in an hour.' : r.message);
  };
  return (
    <AccountShell tone={tone} aside={aside}>
      <div className="acx-done" role="status">
        <span className="acx-done-ic"><Icon name="mail" size={28} /></span>
        <h1>Check your inbox</h1>
        <p>We’ve sent a link to <strong>{email}</strong> to confirm the address and create your password. The link works once and expires in 24 hours.</p>
        <p className="acx-small">Already have an account with this address? <Link to="/login">Log in</Link> or use “Forgot password?” there.</p>
        <p className="acx-small">It can take a minute to arrive. Check your spam or promotions folder too.</p>
      </div>
      {st === 'sent' ? (
        <Alert kind="ok">A new link is on its way. Only the newest link works.</Alert>
      ) : st === '' ? (
        <button type="button" className="btn btn-ghost btn-block" onClick={() => setSt('open')}><span className="btn-label">I didn’t get the email</span></button>
      ) : (
        <form onSubmit={resend} noValidate className="acx-form">
          <ServerCaptcha value={cap} onChange={setCap} resetKey={capKey} />
          <Alert>{msg}</Alert>
          <button type="submit" className="btn btn-primary btn-block" disabled={st === 'sending'}><span className="btn-label">{st === 'sending' ? 'Sending…' : 'Send a new link'}</span><Icon name="mail" size={18} /></button>
        </form>
      )}
      <p className="acx-alt">Wrong address? <a href="/join">Start again</a> · <Link to="/login">Log in</Link></p>
    </AccountShell>
  );
}
