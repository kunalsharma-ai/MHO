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
import SocialLogin from '../components/SocialLogin.jsx';
import PanelTabs from '../components/PanelTabs.jsx';
import { AccountShell, Steps, TextField, SearchSelect, ServerCaptcha, Alert, accountCall, NETWORK_ERROR } from '../components/AccountKit.jsx';

const STEPS = ['About you', 'Where you live', 'Your panel', 'Review'];
const SEGMENTS = [
  { id: 'hcp', title: 'Healthcare professional', sub: 'Doctors, nurses, pharmacists, allied health, lab, admin and support staff', icon: 'stethoscope' },
  { id: 'caregiver', title: 'Caregiver', sub: 'You look after a family member or someone close to you', icon: 'hands' },
  { id: 'patient', title: 'Patient', sub: 'You want to share your own experience of a health condition', icon: 'heart' },
];
const EMPTY = { firstName: '', middleName: '', lastName: '', dob: '', email: '', parentEmail: '', phone: '', country: '', state: '', city: '', postalCode: '', postalNA: false, segment: '', worksInHealthcare: '', clinician: '', website: '' };
const yn = (label) => (label === 'Yes' ? 'yes' : label === 'No' ? 'no' : '');
const today = () => new Date().toISOString().slice(0, 10);

/**
 * Details handed back by a social sign-in. The API sends a new person to "/?signup=1&name=…&email=…" and the app forwards
 * that to /join (utils/helpers.js socialReturnTarget); an existing account whose email is not confirmed yet comes back
 * as "/join/?verifyemail=…". Read once, then removed from the address bar so the name and email don't stay in the URL
 * or the browser history.
 */
function readSocialReturn() {
  if (typeof window === 'undefined') return null;
  let q;
  try { q = new URLSearchParams(window.location.search); } catch { return null; }
  const pick = (...keys) => keys.map((k) => (q.get(k) || '').trim()).find(Boolean) || '';
  const out = {
    verify: pick('verifyemail').toLowerCase(),
    name: pick('name'),
    first: pick('given_name', 'first_name', 'firstName'),
    last: pick('family_name', 'last_name', 'lastName'),
    email: pick('email').toLowerCase(),
  };
  if (!out.verify && !out.name && !out.first && !out.last && !out.email) return null;
  try {
    ['verifyemail', 'name', 'given_name', 'first_name', 'firstName', 'family_name', 'last_name', 'lastName', 'email', 'signup', 'picture', 'provider'].forEach((k) => q.delete(k));
    const rest = q.toString();
    window.history.replaceState(window.history.state, '', window.location.pathname + (rest ? `?${rest}` : '') + window.location.hash);
  } catch { /* the form still works */ }
  return out;
}

/** "Asha Rani Test" → first / middle / last, the same split the old sign-up used. Separate first and last names win. */
function namesFrom(r) {
  const parts = r.name.split(/\s+/).filter(Boolean);
  return {
    firstName: r.first || parts[0] || '',
    middleName: !r.first && parts.length === 3 ? parts[1] : '',
    lastName: r.last || (parts.length > 1 ? parts[parts.length - 1] : ''),
  };
}

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
  const [state, setState] = useState('form'); // form | sending | sent | screened | unverified
  const [social, setSocial] = useState(false); // name and email came from a social sign-in
  const [cap, setCap] = useState({ id: '', answer: '' });
  const [capKey, setCapKey] = useState(0);
  const head = useRef(null);
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));
  const { countries, states, cities, loading } = useLocation(f.country, f.state);
  const country = countries.find((c) => c.code === f.country);
  const stateRow = states.find((s) => s.code === f.state);
  // The panel tabs at the top set the same value as the "Your panel" step (preselected below from ?panel= or this visit).
  const choosePanel = (id) => {
    if (isTeen && id !== 'patient') return;
    visit.set('panel', id);
    setF((x) => (x.segment === id ? x : { ...x, segment: id, worksInHealthcare: '', clinician: '' }));
  };
  // Back from a social sign-in: fill in what the provider gave us. The person can still change it, and the email is
  // confirmed by the usual link before the account works.
  useEffect(() => {
    const r = readSocialReturn();
    if (!r) return;
    if (r.verify) { setF((s) => ({ ...s, email: r.verify })); setState('unverified'); return; }
    const n = namesFrom(r);
    setF((s) => ({
      ...s,
      firstName: s.firstName || n.firstName.slice(0, 60),
      middleName: s.middleName || n.middleName.slice(0, 60),
      lastName: s.lastName || n.lastName.slice(0, 60),
      email: s.email || (validateEmail(r.email) ? '' : r.email),
    }));
    setSocial(true);
    track('sign_up_social_return');
  }, []);
  // Under 18: the patient panel only, from the age the server allows (the "minor patient" rule), with a parent's approval
  const [teenMin, setTeenMin] = useState(null);
  useEffect(() => {
    let live = true;
    accountCall('GET', '/eligibility').then((r) => { if (live && r.ok) setTeenMin(r.data?.teen?.minAge ?? null); });
    return () => { live = false; };
  }, []);
  const ageNow = f.dob && f.dob <= today() ? ageFrom(f.dob) : null;
  const isTeen = teenMin != null && ageNow != null && !Number.isNaN(ageNow) && ageNow < MIN_AGE && ageNow >= teenMin;
  useEffect(() => { if (isTeen && f.segment !== 'patient') setF((s) => ({ ...s, segment: 'patient', worksInHealthcare: '', clinician: '' })); }, [isTeen]); // eslint-disable-line react-hooks/exhaustive-deps

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
        else if (age < MIN_AGE && !(teenMin != null && age >= teenMin)) e.dob = teenMin != null ? `You must be at least ${teenMin} years old to join.` : `You must be at least ${MIN_AGE} years old to join.`;
        else if (age > 120) e.dob = 'Please check the year of birth.';
      }
      const em = validateEmail(f.email); if (em) e.email = em;
      if (isTeen) {
        const pe = validateEmail(f.parentEmail);
        if (!f.parentEmail.trim()) e.parentEmail = 'Please enter your parent’s or guardian’s email address.';
        else if (pe) e.parentEmail = pe;
        else if (f.parentEmail.trim().toLowerCase() === f.email.trim().toLowerCase()) e.parentEmail = 'Please enter your parent’s or guardian’s own email address, not yours.';
      }
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
      else if (isTeen && f.segment !== 'patient') e.segment = 'Members under 18 can join the patient panel only.';
      if (f.segment === 'hcp') {
        if (!f.worksInHealthcare) e.worksInHealthcare = 'Please answer this question.';
        else if (f.worksInHealthcare === 'Yes' && !f.clinician) e.clinician = 'Please answer this question.';
      }
    }
    return e;
  };

  // Server errors name fields; open the first step that holds one.
  const FIELD_STEP = { firstName: 0, middleName: 0, lastName: 0, dob: 0, email: 0, parentEmail: 0, country: 1, phone: 1, state: 1, city: 1, postalCode: 1, segment: 2, worksInHealthcare: 2, clinician: 2 };

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
      captcha: cap, website: f.website, ...(ref ? { referredBy: ref } : {}), ...(isTeen ? { parentEmail: f.parentEmail.trim() } : {}),
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
      <p className="acx-kicker">{teenMin != null ? `Free to join · 18+, or ${teenMin}+ with a parent’s approval` : 'Free to join · 18+'}</p>
      <h2>Your health opinions, <span>rewarded</span>.</h2>
      <ul>
        <li><Icon name="mail" size={16} /> Confirm your email, then create your password</li>
        <li><Icon name="shieldCheck" size={16} /> Read and sign your panel’s consent after you log in</li>
        <li><Icon name="target" size={16} /> Get survey invitations that match your profile</li>
      </ul>
    </div>
  );

  if (state === 'sent') return <Sent email={f.email} tone={tone} aside={aside} teen={isTeen} />;
  if (state === 'unverified') return <Sent email={f.email} tone={tone} aside={aside} unverified />;
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
      <PanelTabs value={f.segment} onChange={choosePanel} label="I’m joining as" lines={Object.fromEntries(SEGMENTS.map((x) => [x.id, x.sub]))}
        disabled={isTeen ? ['hcp', 'caregiver'] : []} hint={isTeen ? 'Members under 18 can join the patient panel only.' : ''} />
      <Steps steps={STEPS} current={step} />
      <form onSubmit={next} noValidate className="acx-form">
        {/* honeypot for bots: hidden from people and screen readers */}
        <div className="acx-hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website')(e.target.value)} /></label></div>

        {step === 0 && social && (
          <Alert kind="ok">We’ve filled in your name and email from your social account. Please check them and add the rest.</Alert>
        )}
        {step === 0 && (
          <div className="acx-fields">
            <TextField id="r-fn" label="First name" required value={f.firstName} onChange={set('firstName')} error={err.firstName} autoComplete="given-name" maxLength={60} />
            <div className="acx-row2">
              <TextField id="r-mn" label="Middle name" optional value={f.middleName} onChange={set('middleName')} error={err.middleName} autoComplete="additional-name" maxLength={60} />
              <TextField id="r-ln" label="Last name" optional value={f.lastName} onChange={set('lastName')} error={err.lastName} autoComplete="family-name" maxLength={60} />
            </div>
            <TextField id="r-dob" label="Date of birth" required type="date" value={f.dob} onChange={set('dob')} error={err.dob} autoComplete="bday" max={today()} min="1900-01-01" hint={teenMin != null ? `You must be ${MIN_AGE} or older to join, or ${teenMin} to 17 for the patient panel with a parent’s or guardian’s approval.` : `You must be ${MIN_AGE} or older to join.`} />
            <TextField id="r-em" label="Email address" required type="email" value={f.email} onChange={set('email')} error={err.email} autoComplete="email" icon="mail" maxLength={254} hint="We’ll send a link to confirm it’s yours." />
            {isTeen && (
              <TextField id="r-pe" label="Parent’s or guardian’s email" required type="email" value={f.parentEmail} onChange={set('parentEmail')} error={err.parentEmail} autoComplete="off" icon="mail" maxLength={254}
                hint="You’re under 18, so a parent or guardian approves your account from their own login. We email them after you confirm your own email." />
            )}
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
                <label key={s.id} className={`acx-seg-opt seg-${s.id} ${f.segment === s.id ? 'on' : ''} ${isTeen && s.id !== 'patient' ? 'is-disabled' : ''}`}>
                  <input type="radio" name="segment" value={s.id} checked={f.segment === s.id} disabled={isTeen && s.id !== 'patient'} onChange={() => setF((x) => ({ ...x, segment: s.id, worksInHealthcare: '', clinician: '' }))} />
                  <span className="acx-seg-ic"><Icon name={s.icon} size={22} /></span>
                  <span><strong>{s.title}</strong><em>{s.sub}</em></span>
                  <span className="acx-seg-tick" aria-hidden="true"><Icon name="check" size={14} stroke={3} /></span>
                </label>
              ))}
              {err.segment && <p className="acx-err" role="alert"><Icon name="info" size={13} /> {err.segment}</p>}
              <p className="acx-hint">{isTeen ? 'Members under 18 can join the patient panel only, with a parent’s or guardian’s approval.' : 'Each panel has its own surveys and consent form. You can belong to one panel per account.'}</p>
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
              {isTeen && <Row k="Parent or guardian" v={f.parentEmail} edit={() => setStep(0)} />}
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
      {step === 0 && !social && <SocialLogin label="Or sign up with" />}
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
function Sent({ email, tone, aside, teen, unverified }) {
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
        <h1>{unverified ? 'Please confirm your email' : 'Check your inbox'}</h1>
        {unverified
          ? <p>There is already an account for <strong>{email}</strong>, but the address hasn’t been confirmed yet. Open the link we emailed you, or ask for a new one below.</p>
          : <p>We’ve sent a link to <strong>{email}</strong> to confirm the address and create your password. The link works once and expires in 24 hours.</p>}
        {teen && <p>Once you’ve confirmed it, we’ll email your parent or guardian a link to approve your account. You can log in meanwhile, but you can answer profile questions only after they approve.</p>}
        {!unverified && <p className="acx-small">Already have an account with this address? <Link to="/login">Log in</Link> or use “Forgot password?” there.</p>}
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
