
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';
import ProfileAvatar from '../components/ProfileAvatar.jsx';
import { Logo } from '../components/Brand.jsx';
import { Field, CountrySelect, PhoneInput, DobPicker, Captcha } from '../components/FormKit.jsx';
import { LiveZone } from '../components/ui.jsx';
import SocialLogin from '../components/SocialLogin.jsx';
import { buildSignupAnswers } from '../data/dbMap.js';
import { savePendingAnswers, syncPendingAnswers } from '../utils/pendingAnswers.js';
import { Link, currentAnchor, toHref, useRouter } from '../router.jsx';
import { API } from '../config/site.js';
import { useGuestOnly, getSession } from '../utils/session.js';
import { REWARD_ROLES } from '../data/community.js';
import { countryByCode, COVERAGE_LIST, flagUrl } from '../data/countries.js';
import { regionsFor } from '../data/regions.js';
import { DB_FORM, SCREENER, DEMO, EDUCATION, ROLES as HCP_ROLES, roleById, PRACTICE, EXPERIENCE, INFLUENCE, DIGITAL, AVAILABILITY, CERTIFICATION, ageGroupFrom, maskLicence } from '../data/hcpForm.js';
import { THERAPY_AREAS } from '../data/conditions.js';
import { PROFILE_STEPS, visibleQuestions, pruneAnswers, isFilled } from '../data/profileForm.js';
import { referralCode, forgetReferral } from '../utils/referral.js';
import { validateEmail, validateName, validatePhone, validateDob, ageFrom, apiRequest, detectCountry, dobToISO, checkEmail, track, pop } from '../utils/helpers.js';

const ROLES = [
  { id: 'hcp', title: 'Healthcare Professional', sub: 'Doctors, nurses, pharmacists, allied health, lab, admin & support staff', icon: 'stethoscope', color: '#2457f5', persona: ['doctor', 2, 0, 0],
    perks: ['Specialist studies with higher honoraria', 'Credential verification keeps panels genuine', 'Short studies that fit around shifts'] },
  { id: 'caregiver', title: 'Caregiver', sub: 'Family & care support', icon: 'hands', color: '#ff7a1a', persona: ['caregiver', 1, 3, 1],
    perks: ['Shape better support services', 'Flexible, short surveys', 'Sensitive questions always optional'] },
  { id: 'patient', title: 'Patient', sub: 'Share your experience', icon: 'heart', color: '#00b386', persona: ['patient', 3, 2, 0],
    perks: ['Help improve treatments and care', 'No tests or visits — only your opinion', 'Answers anonymised and combined'] },
];


const FLOWS = {
  none: [['role', 'Profile'], ['about', 'About you']],
  hcp: [['role', 'Profile'], ['screen', 'Screening'], ['about', 'About you'], ['terms', 'Terms'], ['about2', 'Your details'], ['edu', 'Education'], ['spec', 'Specialty'], ['practice', 'Practice'], ['work', 'Workplace'], ['exp', 'Experience'], ['verify', 'Verification']],
  caregiver: [['role', 'Profile'], ['about', 'About you'], ['terms', 'Terms'], ['care', 'Caring role'], ['daily', 'Day to day']],
  patient: [['role', 'Profile'], ['about', 'About you'], ['terms', 'Terms'], ['health', 'Your health'], ['prefs', 'Care & preferences']],
};

/** Steps of a role; patient / caregiver steps only appear when the backend has a question to ask in them. */
const flowFor = (role, dbq) => {
  const ids = (PROFILE_STEPS[role] || []).map((x) => x.id);
  return FLOWS[role || 'none'].filter(([id]) => ids.indexOf(id) <= 0 || visibleQuestions(role, id, dbq).length > 0);
};
/** Where /complete-profile starts: at "Terms" when they are not accepted yet, otherwise right after it. */
const startIndex = (flow, needTerms) => {
  const t = flow.findIndex(([id]) => id === 'terms');
  if (t < 0) return Math.max(flow.findIndex(([id]) => id === 'about') + 1, 0);
  return needTerms ? t : t + 1;
};

const GENDERS = [['female', 'Female'], ['male', 'Male'], ['genderOther', 'Non-binary / other']]; // the backend accepts Male / Female / Other only
const HCP_GENDERS = [['male', 'Male'], ['female', 'Female'], ['genderOther', 'Other']];
const YEARS = (() => { const y = new Date().getFullYear(); return Array.from({ length: y - 1959 }, (_, i) => String(y - i)); })();
const MAX_FILE = 5 * 1024 * 1024;
const FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const EMPTY = {
  role: '', dbq: {}, firstName: '', middleName: '', lastName: '', email: '', country: '', phone: '', phoneCc: 'in', dob: '', gender: '',
  // HCP
  industry: '', clinician: '', marital: '', children: '', personalIncome: '', familyIncome: '',
  eduLevel: '', eduQual: '', eduQualOther: '', eduLicence: '',
  primaryRole: '', area: '', spec: '', job: '', labEnv: [],
  practiceCountry: '', region: '', regionOther: '', city: '', zip: '', employment: '', sector: '', facility: '', facilityOther: '', beds: '', setting: '', teaching: '',
  locality: '', landmark: '', employer: '', employerBuilding: '', employerLocality: '', employerLandmark: '', workPhone: '', workEmail: '', linkedin: '',
  years: '', patients: '', trials: '', trialsCount: '', purchases: '', formulary: '', devices: '', policy: '', ehr: '', telemed: '', digitalInit: '', onlineOk: '',
  mode: '', frequency: '', time: '', recontact: '', focus: '', licence: '', authority: '', licenceYear: '', certConsent: '',
  // Caregiver
  cgType: '', relation: '', cgAge: '', conditions: [], hours: '', cgYears: '', living: '', paid: '', tasks: [], decision: '',
  // Patient
  ptType: '', since: '', treatment: [], care: '', cover: '', formats: [],
  // Account
  password: '', confirm: '', terms: false, privacy: false, updates: false, website: '',
};

/* ---------------- small form pieces ---------------- */
const Err = ({ msg }) => (msg ? <p className="field-error" role="alert"><Icon name="info" size={14} /> {msg}</p> : null);

function Choice({ name, label, options, value, onChange, error, multi = false, cols, required = true, icons }) {
  const list = multi ? value || [] : value;
  return (
    <fieldset className={`chip-pick q-choice ${cols ? `cols-${cols}` : ''} ${error ? 'has-error' : ''}`}>
      <legend>{label} {required ? <b aria-hidden="true">*</b> : <em>(optional)</em>}</legend>
      <div>
        {options.map((o, i) => {
          const on = multi ? list.includes(o) : value === o;
          return (
            <label key={o} className={on ? 'on' : ''}>
              <input type={multi ? 'checkbox' : 'radio'} name={name} value={o} checked={on} onChange={() => onChange(multi ? (on ? list.filter((x) => x !== o) : [...list, o]) : o)} />
              {icons?.[i] && <Icon name={icons[i]} size={15} />}
              {multi && <span className="ck" aria-hidden="true"><Icon name="check" size={10} stroke={3.5} /></span>}
              {o}
            </label>
          );
        })}
      </div>
      <Err msg={error} />
    </fieldset>
  );
}

function Pick({ id, label, options, value, onChange, error, required = true, placeholder = 'Select…', hint, icon }) {
  return (
    <Field label={label} required={required} htmlFor={id} error={error} hint={hint} icon={icon}>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Field>
  );
}

/** The backend's questions of one patient / caregiver step: only those asked now, with the options that apply. */
function DbQuestions({ role, stepId, answers, onAnswer, errors }) {
  return visibleQuestions(role, stepId, answers).map((q) => {
    const error = errors[`dbq:${q.name}`];
    const value = answers[q.name];
    return !q.multi && q.options.length > 9
      ? <ListPick key={q.name} name={`dbq-${q.name}`} label={q.label} options={q.options} value={value || ''} onChange={(v) => onAnswer(q.name, v)} error={error} />
      : <Choice key={q.name} name={`dbq-${q.name}`} label={q.label} options={q.options} value={q.multi ? value || [] : value || ''} onChange={(v) => onAnswer(q.name, v)} error={error} multi={q.multi} cols={q.options.length > 4 ? 2 : undefined} />;
  });
}

/** Searchable radio list for long option sets (job levels, specializations). */
function ListPick({ name, label, options, value, onChange, error, required = true, color }) {
  const [q, setQ] = useState('');
  const items = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? options.filter((o) => o.toLowerCase().includes(t)) : options;
  }, [q, options]);
  return (
    <fieldset className={`list-pick ${error ? 'has-error' : ''}`} style={color ? { '--lp': color } : undefined}>
      <legend>{label} {required ? <b aria-hidden="true">*</b> : <em>(optional)</em>}<span className="lp-count">{options.length} options</span></legend>
      {options.length > 8 && (
        <span className="lp-search"><Icon name="search" size={15} /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type to filter…" aria-label={`Filter: ${label}`} /></span>
      )}
      <div className="lp-list" role="radiogroup" aria-label={label}>
        {items.map((o) => (
          <label key={o} className={value === o ? 'on' : ''}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} />
            <span className="lp-dot" aria-hidden="true" />{o}
          </label>
        ))}
        {!items.length && <p className="lp-empty">No match. Try another word.</p>}
      </div>
      {value && <p className="lp-picked"><Icon name="check" size={13} stroke={3} /> {value}</p>}
      <Err msg={error} />
    </fieldset>
  );
}

function YesNoGrid({ title, items, f, set, err }) {
  return (
    <fieldset className="yn-grid">
      <legend>{title}</legend>
      {items.map((it) => (
        <div key={it.key} className={`yn-row ${err[it.key] ? 'has-error' : ''}`} role="radiogroup" aria-label={it.q}>
          <span className="yn-q">{it.q} <b aria-hidden="true">*</b></span>
          <span className="yn-seg">
            {['Yes', 'No'].map((v) => (
              <label key={v} className={f[it.key] === v ? 'on' : ''}>
                <input type="radio" name={it.key} value={v} checked={f[it.key] === v} onChange={() => set(it.key)(v)} />{v}
              </label>
            ))}
          </span>
        </div>
      ))}
      {items.some((it) => err[it.key]) && <Err msg="Please answer every question in this group." />}
    </fieldset>
  );
}

/** Patient / caregiver condition picker: therapy-area tabs + condition chips. */
function ConditionPicker({ value, onChange, label = 'Health conditions', required = false }) {
  const [a, setA] = useState(THERAPY_AREAS[0].id);
  const area = THERAPY_AREAS.find((x) => x.id === a);
  const toggle = (c) => onChange(value.includes(c) ? value.filter((x) => x !== c) : [...value, c]);
  return (
    <fieldset className="cond-pick">
      <legend>{label} {required ? <b aria-hidden="true">*</b> : <em>(optional and confidential)</em>}</legend>
      <div className="cp-areas" role="tablist" aria-label="Health areas">
        {THERAPY_AREAS.map((x) => {
          const n = x.items.filter((c) => value.includes(c)).length;
          return (
            <button type="button" role="tab" aria-selected={x.id === a} key={x.id} className={x.id === a ? 'on' : ''} style={{ '--ac': x.color }} onClick={() => setA(x.id)}>
              <Icon name={x.icon} size={14} />{x.area}{n > 0 && <em>{n}</em>}
            </button>
          );
        })}
      </div>
      <div className="area-chips cp-items" key={a} style={{ '--ac': area.color }}>
        {area.items.map((c) => {
          const on = value.includes(c);
          return (
            <button type="button" key={c} className={on ? 'on' : ''} aria-pressed={on} onClick={() => toggle(c)}>
              {on ? <Icon name="check" size={13} stroke={3} /> : <Icon name="plus" size={13} />}{c}
            </button>
          );
        })}
      </div>
      {value.length > 0 && <p className="cp-sum"><Icon name="lock" size={13} /> {value.length} selected: {value.slice(0, 4).join(', ')}{value.length > 4 ? ` +${value.length - 4} more` : ''}</p>}
    </fieldset>
  );
}


const CATEGORY_BY_ROLE = { hcp: 'healthcare professional', caregiver: 'care giver', patient: 'patient' };
const RESEND_SECONDS = 60;


const backendGender = (g) => (g === 'Male' || g === 'Female' ? g : 'Other');


const phoneDigits = (cc, number) => `${(countryByCode(cc)?.dial || '').replace(/\D/g, '')}${String(number || '').replace(/\D/g, '')}`;

const browserTimezone = () => {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch { return 'UTC'; }
};

async function categoryForAge(name, dob) {
  const res = await apiRequest('POST', API.category, { showOnRegistration: true });
  const list = res.ok && Array.isArray(res.data?.data) ? res.data.data : [];
  const rule = list.find((c) => c.name === name)?.age;
  const age = ageFrom(dob);
  if (!rule || age === null || Number.isNaN(age)) return name;
  if (rule.min > age) return rule.underfall || '';
  if (rule.max < age) return rule.overfall || '';
  return name;
}


/** Role card of a backend category name ('' when it cannot be told). */
function roleFromCategory(category) {
  const c = String(category || '').trim().toLowerCase();
  const exact = Object.entries(CATEGORY_BY_ROLE).find(([, name]) => name === c);
  if (exact) return exact[0];
  if (/care\s*-?\s*giver|carer/.test(c)) return 'caregiver';
  if (/patient/.test(c)) return 'patient';
  if (/health|professional|doctor|clinician|nurse|pharmac/.test(c)) return 'hcp';
  return '';
}

const isEmptyValue = (v) => v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);
const API_BASE = String(API.me).replace(/\/me\/?$/, ''); // '/api/v1'
const THANKS_SECONDS = 30; // the thank-you screen waits this long (like web-1), then opens the dashboard
const PROFILES_PAGE = '/member/profiles';

const AGREEMENT_PAGE = {
  'healthcare professional': '/agreement/healthcare.html',
  patient: '/agreement/patients.html',
  'care giver': '/agreement/caregivers.html',
};


function StarRating({ value, onChange, disabled }) {
  const pick = (v) => { if (!disabled) onChange(v); };
  return (
    <div className="star-rate" role="radiogroup" aria-label="Rate your experience">
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = value >= n ? 'full' : value >= n - 0.5 ? 'half' : 'none';
        return (
          <span key={n} className={`sr-star ${fill}`}>
            <svg viewBox="0 0 24 24" width="38" height="38" aria-hidden="true"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.2 1.2-6.5-4.8-4.6 6.6-.9z" /></svg>
            <button type="button" className="sr-half l" disabled={disabled} aria-label={`${n - 0.5} out of 5`} aria-checked={value === n - 0.5} role="radio" onClick={() => pick(n - 0.5)} />
            <button type="button" className="sr-half r" disabled={disabled} aria-label={`${n} out of 5`} aria-checked={value === n} role="radio" onClick={() => pick(n)} />
          </span>
        );
      })}
    </div>
  );
}


/** "+19839201334" → "+1 983 920 1334" (the dialling code is taken from the country when it matches, else the number is shown as it is). */
function prettyPhone(digits, countryCode) {
  if (!digits) return '';
  const dial = (countryByCode(countryCode)?.dial || '').replace(/\D/g, '');
  const rest = dial && digits.startsWith(dial) ? digits.slice(dial.length) : '';
  if (!rest) return `+${digits}`;
  const grouped = rest.length === 10 ? rest.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3') : rest;
  return `+${dial} ${grouped}`;
}

/** Read-only summary of what the person typed at sign-up (name, e-mail, mobile, country, gender, age). */
function DetailsCard({ me }) {
  if (!me) return null;
  const name = [me.name?.first, me.name?.middle, me.name?.last].filter(Boolean).join(' ');
  const digits = String(me.phone || '').replace(/[^\d]/g, '');
  const dobIso = me.dob ? String(me.dob).slice(0, 10) : '';
  const age = dobIso ? ageFrom(dobIso) : null;
  const born = dobIso ? new Date(`${dobIso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '';
  const code = String((Array.isArray(me.address) ? (me.address.find((a) => a?.tag === 'home') || me.address[0])?.country : '') || '').toLowerCase();
  const country = code ? countryByCode(code) : null;
  const gender = String(me.gender || '');
  const gIcon = gender === 'Male' ? 'male' : gender === 'Female' ? 'female' : 'genderOther';
  const tiles = [
    digits && { key: 'phone', icon: 'phone', label: 'Mobile number', value: prettyPhone(digits, code) },
    code && { key: 'country', icon: 'globe', label: 'Country', value: country?.name || code.toUpperCase(), flag: country ? flagUrl(code) : '' },
    gender && { key: 'gender', icon: gIcon, label: 'Gender', value: gender },
    age !== null && !Number.isNaN(age) && { key: 'age', icon: 'cake', label: 'Age', value: `${age} years`, sub: born && `Born ${born}` },
  ].filter(Boolean);
  if (!name && !me.mail && !tiles.length) return null;
  return (
    <section className="detail-card" aria-label="Your sign-up details">
      <header className="dc-head">
        <span className="dc-av" aria-hidden="true">{(me.name?.first || me.mail || '?').charAt(0).toUpperCase()}</span>
        <span className="dc-who">
          {name && <b>{name}</b>}
          {me.mail && <small title={me.mail}>{me.mail}</small>}
        </span>
        <span className="dc-lock"><Icon name="lock" size={12} /> From sign-up</span>
      </header>
      {tiles.length > 0 && (
        <ul className="dc-grid">
          {tiles.map((t) => (
            <li key={t.key}>
              <span className="dc-ic" aria-hidden="true"><Icon name={t.icon} size={16} /></span>
              <span className="dc-txt">
                <small>{t.label}</small>
                <b>{t.flag && <img src={t.flag} alt={`${t.value} flag`} width="20" height="15" loading="lazy" />}{t.value}</b>
                {t.sub && <em>{t.sub}</em>}
              </span>
            </li>
          ))}
        </ul>
      )}
      <p className="dc-note"><Icon name="info" size={13} /> To change these later, open My Account or contact support.</p>
    </section>
  );
}

export default function Join({ mode = 'signup' }) {
  const complete = mode === 'complete'; // true on /complete-profile: the questions after sign-up, asked after log-in
  const { navigate } = useRouter();
  const [step, setStep] = useState(0);
  const [firstStep, setFirstStep] = useState(0); // complete mode: the steps before it were done at sign-up (no going back into them)
  const [needTerms, setNeedTerms] = useState(false); // complete mode: the terms are not accepted yet (first step)
  const [termsOnly, setTermsOnly] = useState(false); // complete mode: the welcome survey is already done, only the terms are missing
  const [member, setMember] = useState(null); // complete mode: the logged-in member (GET /api/v1/me)
  const [terms, setTerms] = useState({ status: 'idle', category: null }); // idle | loading | ready | error — the category's terms (POST /api/v1/category { name })
  const [accepted, setAccepted] = useState([]);
  const [survey, setSurvey] = useState(null); // complete mode: { respID, thankyou } of the finished welcome survey
  const [rating, setRating] = useState(null);
  const [ratingSaved, setRatingSaved] = useState(false);
  const [thanksLeft, setThanksLeft] = useState(THANKS_SECONDS);
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [human, setHuman] = useState(false);
  const [capKey, setCapKey] = useState(0);
  const [state, setState] = useState(complete ? 'loading' : 'form'); // loading | form | sending | done | rejected | rate
  const [alert, setAlert] = useState('');
  const [file, setFile] = useState(null);
  const [showLic, setShowLic] = useState(false);
  const [count, setCount] = useState(10);
  const emailCheck = useRef({ email: '', msg: '' }); // last e-mail checked against the backend (avoids repeating the same lookups)
  const [cooldown, setCooldown] = useState(0); // seconds until the confirmation e-mail can be re-sent
  const [resendMsg, setResendMsg] = useState('');
  const [social, setSocial] = useState(false); // came back from a social log-in: name / e-mail are pre-filled
  const [unverified, setUnverified] = useState(false); // came back with an e-mail that is not confirmed yet
  const cardRef = useRef(null);
  const clearErr = (...ks) => setErr((e) => (ks.some((k) => e[k]) ? Object.fromEntries(Object.entries(e).filter(([k]) => !ks.includes(k))) : e));
  const set = (k) => (v) => { setF((s) => ({ ...s, [k]: v && v.target ? (v.target.type === 'checkbox' ? v.target.checked : v.target.value) : v })); clearErr(k); };
  const role = ROLES.find((r) => r.id === f.role);
  const profileIds = (PROFILE_STEPS[f.role] || []).map((x) => x.id);
  const fullFlow = flowFor(f.role, f.dbq);
  // sign-up ends at "About you" (that Continue creates the account); /complete-profile shows the whole journey, the first steps already done
  const flow = complete ? fullFlow : fullFlow.slice(0, Math.max(fullFlow.findIndex(([id]) => id === 'about'), 0) + 1);
  const stepId = (flow[step] || flow[flow.length - 1])[0];
  const last = flow.length - 1;
  const hcpRole = roleById(f.primaryRole);
  const regions = regionsFor(f.practiceCountry);
  useGuestOnly(!complete); // already logged in -> straight to the dashboard (not on /complete-profile, which needs the login)

  useEffect(() => {
    if (complete) return;
    const a = currentAnchor();
    if (ROLES.some((r) => r.id === a)) { setF((s) => ({ ...s, role: a })); setStep(1); }
  }, []);

  // Back from a social log-in (the backend redirects to /join/?name=…&email=… or /join/?verifyemail=…).
  useEffect(() => {
    if (complete) return;
    let q;
    try { q = new URLSearchParams(window.location.search); } catch { return; }
    const verify = (q.get('verifyemail') || '').trim();
    if (verify) {
      setF((s) => ({ ...s, email: verify.toLowerCase() }));
      setUnverified(true);
      setState('done');
      return;
    }
    const name = (q.get('name') || '').trim();
    const email = (q.get('email') || '').trim();
    if (!name && !email) return;
    // same split as web-1: 1 word = first name; 2 = first + last; 3 = first + middle + last; more = first word + last word
    const parts = name.split(/\s+/).filter(Boolean);
    setF((s) => ({
      ...s,
      firstName: s.firstName || parts[0] || '',
      middleName: parts.length === 3 ? parts[1] : '', // web-1 keeps a 3-word name as first / middle / last (the middle name is sent, not shown)
      lastName: s.lastName || (parts.length > 1 ? parts[parts.length - 1] : ''),
      email: s.email || email.toLowerCase(),
    }));
    setSocial(true);
  }, []);

  // Pre-fill "Country of residence" (and the phone code) from the visitor's IP, like web-1. Never overrides a choice already made.
  useEffect(() => {
    let live = true;
    detectCountry().then((code) => {
      if (!live || !code || !countryByCode(code)) return;
      setF((s) => (s.country ? s : { ...s, country: code, phoneCc: code, practiceCountry: s.practiceCountry || (COVERAGE_LIST.some((x) => x.code === code) ? code : '') }));
    });
    return () => { live = false; };
  }, []);


  // /complete-profile: who is this, are they allowed here (same gates as web-1), did they already finish the welcome survey, and
  // what did they answer at sign-up?
  useEffect(() => {
    if (!complete) return undefined;
    let live = true;
    (async () => {
      const me = await getSession();
      if (!live) return;
      if (!me) { window.location.replace('/login'); return; }
      // web-1's member area: an e-mail that is not verified goes to the verification screen
      if (me.isVerified && typeof me.isVerified === 'object' && 'email' in me.isVerified && me.isVerified.email !== 'verified') {
        window.location.replace(`/?verifyemail=${encodeURIComponent(me.mail || '')}`);
        return;
      }
      const hasTerms = Array.isArray(me.terms) && me.terms.length > 0;
      // minors keep web-1's own terms / parent-consent pages (parent details, waiting for the parent's approval)
      if (me.isMinor && (!hasTerms || me.parent?.consentStatus !== 'approved')) { window.location.replace('/auth/terms'); return; }
      // terms not accepted yet: the member signs the agreement page of their category first; it opens this page again afterwards
      const agreement = AGREEMENT_PAGE[String(me.category || '').trim().toLowerCase()];
      if (!hasTerms && agreement) { window.location.replace(agreement); return; }
      // the welcome survey is finished when a "complete" response of it exists (same check as web-1's member area)
      const done = await apiRequest('POST', `${API_BASE}/response`, { 'survey.slug': 'welcome', status: 'complete' });
      if (!live) return;
      const finished = done.ok && Array.isArray(done.data?.data) && done.data.data.length === 1;
      if (finished && hasTerms) { window.location.replace(PROFILES_PAGE); return; }
      // answers given at sign-up wait in this browser until the first log-in: save them now so they are in the account
      await Promise.race([syncPendingAnswers(), new Promise((r) => setTimeout(r, 6000))]);
      if (!live) return;
      const role = roleFromCategory(me.category);
      const patch = {};
      if (role === 'hcp') { // the two screening answers come back pre-filled
        const res = await apiRequest('POST', API.me, { questions: ['works_in_healthcare', 'clinician'] });
        const acc = res.ok && res.data?.data && typeof res.data.data === 'object' ? res.data.data : {};
        const labelOf = (name) => {
          const value = [].concat(acc[name] ?? [])[0];
          return DB_FORM.questions[name].options.find((o) => o[1] === value)?.[0] || '';
        };
        patch.industry = labelOf('works_in_healthcare');
        patch.clinician = labelOf('clinician');
      }
      if (!live) return;
      const fl = flowFor(role, {});
      const start = role ? startIndex(fl, !hasTerms) : 0; // unknown category: let the person pick the profile first
      setMember(me);
      setNeedTerms(!hasTerms);
      setTermsOnly(finished && !hasTerms);
      setAccepted(hasTerms ? me.terms : []);
      setFirstStep(start);
      setStep(start);
      setF((s) => ({ ...s, role, ...patch, firstName: me.name?.first || s.firstName, email: me.mail || s.email }));
      setState('form');
      if (!hasTerms) { // the terms of the person's category, same call as web-1's terms page
        setTerms({ status: 'loading', category: null });
        const cat = await apiRequest('POST', API.category, { name: me.category });
        if (!live) return;
        const first = cat.ok && Array.isArray(cat.data?.data) ? cat.data.data[0] : null;
        setTerms(first ? { status: 'ready', category: first } : { status: 'error', category: null });
      }
    })();
    return () => { live = false; };
  }, []);

  // thank-you screen: opens the dashboard by itself after a while (like web-1), or right after the rating is given
  useEffect(() => {
    if (state !== 'rate') return undefined;
    if (thanksLeft <= 0) { window.location.replace(PROFILES_PAGE); return undefined; }
    const t = setTimeout(() => setThanksLeft((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [state, thanksLeft]);

  // "You don't meet our criteria" → back to the home page after a short countdown.
  useEffect(() => {
    if (state !== 'rejected') return;
    if (count <= 0) { navigate('/'); return; }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [state, count, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const resend = async () => {
    if (cooldown > 0) return;
    setCooldown(RESEND_SECONDS);
    setResendMsg('');
    const res = await apiRequest('POST', API.resend, { mail: f.email.trim().toLowerCase() });
    setResendMsg(res.ok ? 'We sent the confirmation email again.' : res.data?.message || 'We could not resend the email. Please try again shortly.');
  };

  // the terms of the member's category (same rules as web-1's terms page: "accept all", required terms, Accept only when something changed)
  const termOptions = (terms.category?.terms || []).map((t) => ({ value: t.name, body: t.body, required: !!t.isRequired }));
  const allRequiredSelected = termOptions.every((t) => !t.required || accepted.includes(t.value));
  const allChecked = termOptions.length > 0 && termOptions.every((t) => accepted.includes(t.value));
  const initialTerms = Array.isArray(member?.terms) ? member.terms : [];
  const termsChanged = JSON.stringify([...initialTerms].sort()) !== JSON.stringify([...accepted].sort());
  const toggleTerm = (v) => { setAccepted((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v])); clearErr('terms'); };
  const toggleAllTerms = () => { setAccepted(allChecked ? [] : termOptions.map((t) => t.value)); clearErr('terms'); };

  const need = (e, k, msg = 'Please choose an option.') => { if (!f[k] || (Array.isArray(f[k]) && !f[k].length)) e[k] = msg; };

  const validate = (id) => {
    const e = {};
    if (id === 'role' && !f.role) e.role = 'Please choose the profile that describes you.';
    if (id === 'screen') { need(e, 'industry'); if (f.industry === 'Yes') need(e, 'clinician'); }
    if (id === 'about') {
      const a = validateName(f.firstName, 'first name'); if (a) e.firstName = a;
      const b = validateName(f.lastName, 'last name'); if (b) e.lastName = b;
      const c = validateEmail(f.email); if (c) e.email = c;
      if (!f.country) e.country = 'Please choose your country of residence.';
      const d = validatePhone(f.phone, f.phoneCc); if (d) e.phone = d;
      const g = validateDob(f.dob); if (g) e.dob = g;
      need(e, 'gender');
      if (!complete) { // the last sign-up step: the human check and the consents that used to be the "Account" step
        if (!human) e.captcha = 'Please complete the human check.';
        if (!f.terms) e.terms = 'Please accept the Terms of Use to continue.';
        if (!f.privacy) e.privacy = 'Please agree to the Privacy Policy to continue.';
      }
    }
    if (id === 'about2') {
      need(e, 'industry'); if (f.industry === 'Yes') need(e, 'clinician');
      ['marital', 'personalIncome', 'familyIncome'].forEach((k) => need(e, k)); if (DEMO.children.askedFor(f.marital)) need(e, 'children');
    }
    if (id === 'terms') {
      if (terms.status !== 'ready') e.terms = 'The terms could not be loaded. Please reload the page.';
      else if (!allRequiredSelected) e.terms = 'Please accept the required terms to continue.';
    }
    if (id === 'edu') {
      need(e, 'eduLevel');
      const br = EDUCATION.branches[f.eduLevel];
      if (br) {
        if (br.o2) { need(e, 'eduQual'); if (/specify/i.test(f.eduQual) && !f.eduQualOther.trim()) e.eduQualOther = 'Please type your qualification.'; }
        else if (!f.eduQualOther.trim()) e.eduQualOther = 'Please type your qualification.';
        need(e, 'eduLicence');
      }
    }
    if (id === 'spec') {
      need(e, 'primaryRole', 'Choose your primary role of expertise.');
      if (hcpRole) {
        if (hcpRole.kind === 'area') need(e, 'area', 'Choose your key area.');
        if (hcpRole.kind !== 'jobs') need(e, 'spec', 'Choose your specialization.');
        if (jobOptions.length) need(e, 'job', 'Choose your job level.'); // some specializations have no job levels in the backend: nothing to ask
        if (hcpRole.env) need(e, 'labEnv', 'Choose at least one work environment.');
      }
    }
    if (id === 'practice') {
      need(e, 'practiceCountry', 'Choose your country of practice.');
      if (regions.length) { need(e, 'region', 'Choose your state or region.'); if (f.region === 'Other' && !f.regionOther.trim()) e.regionOther = 'Type your state or region.'; }
      else if (!f.regionOther.trim()) e.regionOther = 'Type your state or region.';
      if (!f.city.trim()) e.city = 'Enter your city.';
      if (!/^[A-Za-z0-9 -]{3,10}$/.test(f.zip.trim())) e.zip = 'Enter a valid ZIP / postal code.';
      ['employment', 'sector', 'facility', 'beds', 'setting', 'teaching'].forEach((k) => need(e, k));
    }
    if (id === 'work') {
      if (!f.locality.trim()) e.locality = 'Enter the locality or street name.';
      if (!f.employer.trim()) e.employer = 'Enter the name of your hospital, clinic or employer.';
      if (!f.employerBuilding.trim()) e.employerBuilding = 'Enter the building / flat number.';
      if (!f.employerLocality.trim()) e.employerLocality = 'Enter the employer’s locality or street.';
      if (f.workEmail.trim()) { const w = validateEmail(f.workEmail); if (w) e.workEmail = w; }
      if (f.workPhone.trim()) { const p = validatePhone(f.workPhone, f.practiceCountry || f.phoneCc, false); if (p) e.workPhone = p; }
      if (f.linkedin.trim() && !/^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.+/i.test(f.linkedin.trim())) e.linkedin = 'Paste the full LinkedIn profile link (https://www.linkedin.com/in/…).';
    }
    if (id === 'exp') {
      need(e, 'years');
      if (f.clinician === 'Yes') need(e, 'patients');
      need(e, 'trials');
      if (f.trials === 'Yes') need(e, 'trialsCount');
      [...INFLUENCE, ...DIGITAL].forEach((q) => need(e, q.key));
    }
    if (id === 'verify') {
      ['mode', 'frequency', 'time', 'recontact', 'focus', 'certConsent'].forEach((k) => need(e, k));
      if (f.clinician === 'Yes' || f.licence.trim()) {
        if (!/^[A-Za-z0-9/.\- ]{4,30}$/.test(f.licence.trim())) e.licence = 'Enter your certification / licence number (letters and digits).';
        if (!f.authority.trim()) e.authority = 'Enter the issuing authority or council.';
        need(e, 'licenceYear', 'Choose the year of issue.');
      }
      if (file && (!FILE_TYPES.includes(file.type) || file.size > MAX_FILE)) e.file = 'Upload a PDF, JPG or PNG under 5 MB.';
    }
    if (profileIds.includes(id)) for (const q of visibleQuestions(f.role, id, f.dbq)) if (!isFilled(f.dbq[q.name])) e[`dbq:${q.name}`] = q.multi ? 'Choose at least one.' : 'Please choose an option.';
    setErr(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => cardRef.current?.querySelector('.has-error, [aria-invalid="true"], .field-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    }
    return !Object.keys(e).length;
  };

  const goTop = () => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Is this e-mail usable? (format, domain, not registered yet — same checks as web-1). '' = fine.
  const emailProblem = async () => {
    const em = f.email.trim().toLowerCase();
    if (emailCheck.current.email === em) return emailCheck.current.msg;
    const msg = await checkEmail(em);
    emailCheck.current = { email: em, msg };
    return msg;
  };
  const checkEmailNow = async () => {
    if (!f.email.trim() || validateEmail(f.email)) return; // empty / malformed: the normal validation message handles it
    const msg = await emailProblem();
    if (msg) setErr((e) => ({ ...e, email: msg }));
  };

  const next = async () => {
    if (!validate(stepId)) return;
    if (stepId === 'about') {
      const msg = await emailProblem();
      if (msg) { setErr((e) => ({ ...e, email: msg })); return; }
    }
    if (stepId === 'screen' && f.industry === 'No' && !complete) { setCount(10); setState('rejected'); track('signup_screened_out', { role: 'hcp' }); return; }
    if (complete && stepId === 'terms') { // save the accepted terms first (PUT /api/v1/me { terms }, as web-1's terms page does)
      setState('sending');
      setAlert('');
      const saved = await apiRequest('PUT', API.me, { terms: accepted });
      setState('form');
      if (!saved.ok) { setAlert(saved.status === 0 ? 'We could not reach the server. Check your connection and try again.' : saved.data?.message || 'We could not save your choice. Please try again.'); return; }
      setMember((m) => ({ ...m, terms: accepted }));
      if (termsOnly) { window.location.replace(PROFILES_PAGE); return; }
      setFirstStep(step + 1); // the terms are done: no going back into them
    }
    pop(0.06);
    if (complete && stepId === 'role') { // the profile was picked here (category not recognised): continue at the terms / after them
      const start = startIndex(fullFlow, needTerms);
      setFirstStep(start);
      setStep(start);
      goTop();
      return;
    }
    setStep((x) => Math.min(x + 1, last));
    goTop();
  };
  const back = () => { setErr({}); setStep((x) => Math.max(x - 1, 0)); goTop(); };

  const buildProfile = () => {
    if (f.role === 'hcp') {
      return {
        screening: { industry: f.industry, clinician: f.clinician },
        demographics: { ageGroup: ageGroupFrom(f.dob), marital: f.marital, children: f.children, personalIncome: f.personalIncome, familyIncome: f.familyIncome },
        education: { level: f.eduLevel, qualification: /specify/i.test(f.eduQual) || !f.eduQual ? f.eduQualOther.trim() : f.eduQual, licensure: f.eduLicence },
        specialty: { primaryRole: hcpRole?.label, keyArea: f.area || undefined, specialization: f.spec || undefined, jobLevel: f.job, workEnvironments: f.labEnv.length ? f.labEnv : undefined },
        practice: { country: f.practiceCountry, region: f.region === 'Other' || !regions.length ? f.regionOther.trim() : f.region, city: f.city.trim(), zip: f.zip.trim(), employment: f.employment, sector: f.sector, facility: f.facility === 'Other' ? f.facilityOther.trim() : f.facility, beds: f.beds, setting: f.setting, teaching: f.teaching },
        workplace: { locality: f.locality.trim(), landmark: f.landmark.trim(), employer: f.employer.trim(), employerBuilding: f.employerBuilding.trim(), employerLocality: f.employerLocality.trim(), employerLandmark: f.employerLandmark.trim(), workPhone: f.workPhone.trim(), workEmail: f.workEmail.trim().toLowerCase(), linkedin: f.linkedin.trim() },
        experience: { years: f.years, patientsPerWeek: f.patients || undefined, clinicalTrials: f.trials, trialsLast2Years: f.trialsCount || undefined },
        influence: Object.fromEntries(INFLUENCE.map((q) => [q.key, f[q.key]])),
        digital: Object.fromEntries(DIGITAL.map((q) => [q.key, f[q.key]])),
        availability: { mode: f.mode, frequency: f.frequency, time: f.time, recontact: f.recontact, focusGroups: f.focus },
        certification: { licence: f.licence.trim(), licenceLast4: f.licence.trim().slice(-4), authority: f.authority.trim(), yearOfIssue: f.licenceYear, verificationConsent: f.certConsent, documentAttached: !!file },
      };
    }
    if (f.role === 'caregiver') return { type: f.cgType, relation: f.relation, recipientAge: f.cgAge, conditions: f.conditions, hoursPerWeek: f.hours, yearsCaring: f.cgYears, living: f.living, paid: f.paid, tasks: f.tasks, decisionRole: f.decision };
    return { type: f.ptType, conditions: f.conditions, diagnosed: f.since, treatment: f.treatment, careSetting: f.care, cover: f.cover, formats: f.formats };
  };

  // /complete-profile: finish the welcome survey exactly like web-1's survey page does:
  //   PUT /me/survey {slug:'welcome'} opens it (gives respID), PATCH /me/survey {answers…, respID} saves the answers and completes it.
  const finish = async () => {
    if (!validate(stepId) || f.website) return;
    setState('sending');
    setAlert('');
    const fail = (msg) => { setState('form'); setAlert(msg); };
    const answers = Object.fromEntries(Object.entries(buildSignupAnswers(f)).filter(([, v]) => !isEmptyValue(v)));
    const open = await apiRequest('PUT', `${API.me}/survey`, { slug: 'welcome' });
    if (!open.ok) return fail(open.status === 0 ? 'We could not reach the server. Check your connection and try again.' : open.data?.message || 'Something went wrong. Please try again in a moment.');
    const respID = open.data?.data?.respID;
    if (!respID) return fail('Something went wrong. Please try again in a moment.');
    const saved = await apiRequest('PATCH', `${API.me}/survey`, { ...answers, respID });
    if (!saved.ok) return fail(saved.status === 0 ? 'We could not reach the server. Check your connection and try again.' : saved.data?.message || 'We could not save your answers. Please try again.');
    track('profile_completed', { role: f.role });
    pop(0.18);
    setSurvey({ respID, thankyou: typeof open.data?.data?.thankyou === 'string' ? open.data.data.thankyou : '' });
    setThanksLeft(THANKS_SECONDS);
    setState('rate');
    goTop();
  };

  // star rating after the survey (same call as web-1: PUT /survey/response { sid, rating }), then straight to the dashboard
  const rate = async (value) => {
    if (ratingSaved) return;
    setRating(value);
    setRatingSaved(true);
    await apiRequest('PUT', `${API_BASE}/survey/response`, { sid: survey?.respID, rating: value });
    setTimeout(() => window.location.replace(PROFILES_PAGE), 1600);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (step < last) return next();
    if (complete) return finish();
    if (!validate('about') || f.website) return;
    const msg = await emailProblem();
    if (msg) { setErr((x) => ({ ...x, email: msg })); return; }
    setState('sending');
    setAlert('');
    const fail = (msg) => {
      setState('form');
      setAlert(msg);
      setCapKey((k) => k + 1);
      setHuman(false);
    };
    const category = await categoryForAge(CATEGORY_BY_ROLE[f.role], f.dob);
    if (!category) return fail('Based on the information provided, you are not eligible to register. Please contact support if you think this is a mistake.');
    const payload = {
      category,
      name: { first: f.firstName.trim(), last: f.lastName.trim(), ...(f.middleName ? { middle: f.middleName } : {}) },
      gender: backendGender(f.gender),
      dob: dobToISO(f.dob),
      mail: f.email.trim().toLowerCase(),
      phone: phoneDigits(f.phoneCc, f.phone),
      timezone: browserTimezone(),
      address: [{ tag: 'home', country: f.country }],
    };
    const ref = referralCode();
    if (ref) payload.referredBy = ref;
    const res = await apiRequest('PUT', API.register, payload);
    if (res.ok) forgetReferral();
    if (!res.ok) {
      const msg = res.data?.message || '';
      return fail(res.status === 0 ? 'We could not reach the server. Check your connection and try again.' : /duplicate/i.test(msg) ? 'An account with this email already exists. Try logging in instead.' : msg || 'Something went wrong. Please try again in a moment.');
    }
    // The questions answered here wait in this browser; they are saved to the account at the first log-in (pendingAnswers.js).
    const answers = buildSignupAnswers(f);
    if (Object.keys(answers).length) savePendingAnswers(payload.mail, answers);
    track('sign_up', { method: 'email', role: f.role });
    pop(0.18);
    setCooldown(RESEND_SECONDS);
    setState('done');
  };

  const pickRole = (id) => { setF((s) => ({ ...s, role: id, dbq: {} })); clearErr('role'); };
  // patient / caregiver answers are kept per backend question; changing a parent answer removes the answers that depended on it
  const setDbAnswer = (name, value) => { setF((s) => ({ ...s, dbq: pruneAnswers(s.role, { ...s.dbq, [name]: value }) })); clearErr(`dbq:${name}`); };
  const setPrimary = (id) => { setF((s) => ({ ...s, primaryRole: id, area: '', spec: '', job: '', labEnv: [] })); clearErr('primaryRole', 'area', 'spec', 'job', 'labEnv'); };
  const ageGroup = ageGroupFrom(f.dob);
  const edu = EDUCATION.branches[f.eduLevel];
  const specOptions = hcpRole?.kind === 'spec-jobs' ? Object.keys(hcpRole.specs) : hcpRole?.kind === 'area' && f.area ? hcpRole.areas[f.area].specs : hcpRole?.kind === 'lab' ? hcpRole.specs : [];
  const jobOptions = !hcpRole ? [] : hcpRole.kind === 'jobs' ? hcpRole.jobs : hcpRole.kind === 'spec-jobs' ? hcpRole.specs[f.spec] || [] : hcpRole.kind === 'area' ? (f.area ? hcpRole.areas[f.area].jobs : []) : hcpRole.jobs;

  return (
    <section className={`join theme-${f.role || 'none'} ${f.role ? `rgrade-${f.role}` : ''} ${complete ? 'join-complete' : ''}`} style={{ '--rc': role?.color || '#e8344e' }}>
      <div className="join-bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="container join-grid">
        {/* Left: animated role stage + journey */}
        <LiveZone className="join-stage">
          <Link to="/" className="js-logo" aria-label="MyHealthOpinions home"><Logo size={40} onDark /></Link>
          {complete ? (
            <>
              <h1>Complete your <span className="ink-grad">profile</span></h1>
              <p className="js-lead">A few more questions help us match you with the studies that suit you best.</p>
            </>
          ) : (
            <>
              <h1>Create your <span className="ink-grad">free account</span></h1>
              <p className="js-lead">Join the healthcare research community and get paid for your opinions.</p>
            </>
          )}
          <div className="js-persona" key={f.role || 'none'}>
            {role ? (
              <>
                <span className="jsp-ring" aria-hidden="true" />
                <ProfileAvatar role={role} size={120} photo={member?.profilePicture || ''} editable={complete && !!member} onSaved={(url) => setMember((m) => ({ ...m, profilePicture: url }))} />
                <div className="js-rewards">
                  <span>Rewards you can choose</span>
                  <div>{REWARD_ROLES.find((x) => x.id === role.id)?.items.slice(0, 6).map((it, i) => <em key={it.t} style={{ '--i': i }}><Icon name={it.icon} size={13} />{it.t}</em>)}</div>
                </div>
              </>
            ) : (
              <div className="jsp-trio" aria-hidden="true">
                {ROLES.map((r, i) => <span key={r.id} style={{ '--i': i }}><ProfileAvatar role={r} size={92} bob={false} /></span>)}
              </div>
            )}
          </div>
          {role && (
            <ol className="js-journey" aria-label={complete ? 'Your profile steps' : 'Your sign-up steps'}>
              {flow.map(([id, label], i) => (
                <li key={id} className={state === 'rate' || i < step ? 'done' : i === step ? 'on' : ''}>
                  <span>{state === 'rate' || i < step ? <Icon name="check" size={11} stroke={3.5} /> : i + 1}</span>{label}
                </li>
              ))}
            </ol>
          )}
          <ul className="js-facts">
            <li><Icon name="coins" size={16} />Free forever — no investment</li>
            <li><Icon name="lock" size={16} />Your details are never sold or shared</li>
          </ul>
        </LiveZone>

        {/* Right: form card */}
        <div className="join-card" ref={cardRef}>
          {state === 'rejected' ? (
            <div className="join-reject" role="alert">
              <span className="jr-ic" aria-hidden="true"><Icon name="stethoscope" size={30} /></span>
              <h2>Thanks for your interest</h2>
              <p>{SCREENER.rejectMessage}</p>
              <p className="jr-count">Taking you to the home page in <b>{count}</b> seconds…</p>
              <span className="jr-bar" aria-hidden="true"><i style={{ animationDuration: '10s' }} /></span>
              <div className="jr-actions">
                <button type="button" className="btn btn-primary" onClick={() => navigate('/')}><span className="btn-label">Go to the home page now</span><Icon name="home" size={18} /></button>
                <button type="button" className="btn btn-ghost" onClick={() => { setState('form'); setF((s) => ({ ...s, industry: '' })); }}><Icon name="arrowLeft" size={18} /><span className="btn-label">I chose the wrong answer</span></button>
              </div>
            </div>
          ) : state === 'loading' ? (
            <div className="join-loading" role="status" aria-live="polite"><span className="jl-spin" aria-hidden="true" /><p>Loading your profile…</p></div>
          ) : state === 'rate' ? (
            <div className="join-done join-rate">
              <div className="envelope" aria-hidden="true"><span className="env-flap" /><span className="env-letter"><Icon name="check" size={28} stroke={3} /></span></div>
              <h2>{`Thank you${f.firstName ? `, ${f.firstName}` : ''}!`}</h2>
              {survey?.thankyou
                ? <div className="jr-thanks" dangerouslySetInnerHTML={{ __html: survey.thankyou }} />
                : <p>Your profile is complete. We will match you with studies that suit you.</p>}
              <p className="jr-ask">Your feedback helps us improve future surveys. Please rate your experience.</p>
              <StarRating value={rating || 0} onChange={rate} disabled={ratingSaved} />
              {ratingSaved && <p className="step-note" role="status">Thanks for your feedback! Opening your dashboard…</p>}
              <a className="btn btn-primary" href={PROFILES_PAGE}><span className="btn-label">Go to Profiles</span><Icon name="arrow" size={18} /></a>
              {!ratingSaved && <p className="fine">Opening your dashboard in {thanksLeft}s</p>}
            </div>
          ) : state === 'done' ? (
            <div className="join-done">
              <div className="envelope" aria-hidden="true"><span className="env-flap" /><span className="env-letter"><Icon name="check" size={28} stroke={3} /></span></div>
              <h2>{unverified ? 'Please confirm your email' : `Check your inbox${f.firstName ? `, ${f.firstName}` : ''}!`}</h2>
              {unverified
                ? <p>Your email <b>{f.email}</b> is not confirmed yet. Use the button below to get a new confirmation link, then click it to activate your account.</p>
                : <p>We sent a confirmation link to <b>{f.email}</b>. Click it to activate your account (double opt-in) and start receiving paid surveys.</p>}
              <ol className="done-next">
                <li>Confirm your email and create your password</li>
                <li>Log in, accept the terms and complete your profile</li>
                <li>Watch for your first invitation</li>
              </ol>
              <button type="button" className="btn btn-ghost" onClick={resend} disabled={cooldown > 0}><span className="btn-label">{cooldown > 0 ? `Resend email in ${cooldown}s` : unverified ? 'Send me a new confirmation email' : 'Resend confirmation email'}</span></button>
              {resendMsg && <p className="step-note" role="status">{resendMsg}</p>}
              <Link to="/how-it-works" className="btn btn-ghost"><span className="btn-label">What happens next</span><Icon name="arrow" size={18} /></Link>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="jprog" aria-live="polite">
                <span className="jp-label">Step {step + 1} of {flow.length} · <b>{flow[step][1]}</b></span>
                <span className="jp-dots" aria-hidden="true">{flow.map(([id], i) => <i key={id} className={i === step ? 'on' : i < step ? 'done' : ''} />)}</span>
                <span className="jp-bar" aria-hidden="true"><i style={{ width: `${((step + 1) / flow.length) * 100}%` }} /></span>
              </div>

              <div className="step-panel" key={f.role + stepId}>
                {stepId === 'role' && (
                  <>
                  <fieldset className="role-big">
                    <legend><h2>Which profile describes you?</h2></legend>
                    {ROLES.map((r) => (
                      <label key={r.id} className={`rb-card t-${r.id} ${f.role === r.id ? 'on' : ''}`} style={{ '--c': r.color }}>
                        <input type="radio" name="role" value={r.id} checked={f.role === r.id} onChange={() => pickRole(r.id)} />
                        <span className="rb-ic"><Icon name={r.icon} size={24} /></span>
                        <span className="rb-txt"><b>{r.title}</b><small>{r.sub}</small></span>
                        <span className="rb-tick" aria-hidden="true"><Icon name="check" size={16} stroke={3} /></span>
                      </label>
                    ))}
                    <Err msg={err.role} />
                  </fieldset>
                  {!social && <SocialLogin label="Or sign up with" />}
                  </>
                )}

                {stepId === 'screen' && (
                  <>
                    <h2>A quick check first</h2>
                    <p className="step-note"><Icon name="shieldCheck" size={14} /> Our professional panel is for people who work in healthcare. Two questions and you’re in.</p>
                    <Choice name="industry" label={SCREENER.industry.q} options={SCREENER.industry.options} icons={['check', 'x']} value={f.industry} onChange={set('industry')} error={err.industry} />
                    {f.industry === 'Yes' && <Choice name="clinician" label={SCREENER.clinician.q} options={SCREENER.clinician.options} icons={['stethoscope', 'briefcase']} value={f.clinician} onChange={set('clinician')} error={err.clinician} />}
                  </>
                )}

                {stepId === 'about' && (
                  <>
                    <h2>Tell us about you</h2>
                    <div className="form-row">
                      <Field label="First name" required htmlFor="j-fn" error={err.firstName} icon="user">
                        <input id="j-fn" value={f.firstName} onChange={set('firstName')} autoComplete="given-name" aria-invalid={!!err.firstName} />
                      </Field>
                      <Field label="Last name" required htmlFor="j-ln" error={err.lastName}>
                        <input id="j-ln" value={f.lastName} onChange={set('lastName')} autoComplete="family-name" aria-invalid={!!err.lastName} />
                      </Field>
                    </div>
                    <Field label={f.role === 'hcp' ? 'Email (work email speeds up verification)' : 'Email'} required htmlFor="j-em" error={err.email} icon="mail">
                      <input id="j-em" type="email" value={f.email} onChange={set('email')} onBlur={checkEmailNow} autoComplete="email" aria-invalid={!!err.email} />
                    </Field>
                    <div className="form-row">
                      <Field label="Country of residence" required htmlFor="j-ct" error={err.country} icon="globe">
                        <CountrySelect id="j-ct" value={f.country} onChange={(c) => { setF((s) => ({ ...s, country: c, phoneCc: c, practiceCountry: s.practiceCountry || (COVERAGE_LIST.some((x) => x.code === c) ? c : '') })); clearErr('country'); }} invalid={!!err.country} />
                      </Field>
                      <Field label="Mobile number" required htmlFor="j-ph" error={err.phone} icon="phone">
                        <PhoneInput id="j-ph" country={f.phoneCc} onCountry={set('phoneCc')} value={f.phone} onChange={set('phone')} invalid={!!err.phone} required />
                      </Field>
                    </div>
                    <Field label="Date of birth" required htmlFor="j-dob" error={err.dob} icon="cake" hint={f.role === 'hcp' && ageGroup ? `Age group: ${ageGroup}` : 'Full date — day, month and year.'}>
                      <DobPicker id="j-dob" value={f.dob} onChange={set('dob')} invalid={!!err.dob} />
                    </Field>
                    <fieldset className="chip-pick">
                      <legend>{f.role === 'hcp' ? DEMO.gender.q : 'Gender'} <b aria-hidden="true">*</b></legend>
                      <div>
                        {(f.role === 'hcp' ? HCP_GENDERS : GENDERS).map(([ic, g]) => (
                          <label key={g} className={f.gender === g ? 'on' : ''}>
                            <input type="radio" name="gender" value={g} checked={f.gender === g} onChange={() => set('gender')(g)} />
                            <span className={`g-ic g-${ic}`}><Icon name={ic} size={16} /></span>{g}
                          </label>
                        ))}
                      </div>
                      <Err msg={err.gender} />
                    </fieldset>
                    {!complete && (
                      <>
                        <p className="step-note"><Icon name="mail" size={14} /> We will email you a confirmation link. After you confirm, you create your password.</p>
                        <Captcha onChange={setHuman} invalid={!!err.captcha} resetKey={capKey} />
                        <Err msg={err.captcha} />
                        <div className="consents">
                          <label className={err.terms ? 'has-error' : ''}><input type="checkbox" checked={f.terms} onChange={set('terms')} /><span className="cbox" aria-hidden="true"><Icon name="check" size={12} stroke={3.5} /></span>I am 18+ and accept the <a href={toHref('/terms')} target="_blank" rel="noopener">Terms of Use</a> *</label>
                          <label className={err.privacy ? 'has-error' : ''}><input type="checkbox" checked={f.privacy} onChange={set('privacy')} /><span className="cbox" aria-hidden="true"><Icon name="check" size={12} stroke={3.5} /></span>I agree to the <a href={toHref('/privacy')} target="_blank" rel="noopener">Privacy Policy</a> and to be contacted for surveys *</label>
                          <label><input type="checkbox" checked={f.updates} onChange={set('updates')} /><span className="cbox" aria-hidden="true"><Icon name="check" size={12} stroke={3.5} /></span>Send me occasional tips and community news (optional)</label>
                          <Err msg={err.terms || err.privacy} />
                        </div>
                      </>
                    )}
                  </>
                )}

                {stepId === 'terms' && (
                  <>
                    <h2>Terms &amp; consent</h2>
                    {terms.status === 'loading' || terms.status === 'idle' ? (
                      <div className="join-loading" role="status"><span className="jl-spin" aria-hidden="true" /><p>Loading the terms…</p></div>
                    ) : terms.status === 'error' ? (
                      <p className="form-alert" role="alert">We could not load the terms. Please reload the page and try again.</p>
                    ) : (
                      <>
                        {terms.category?.termsMessage && <div className="terms-msg" dangerouslySetInnerHTML={{ __html: terms.category.termsMessage }} />}
                        <div className="consents terms-list">
                          <label className={err.terms && !allRequiredSelected ? 'has-error' : ''}>
                            <input type="checkbox" checked={allChecked} onChange={toggleAllTerms} />
                            <span className="cbox" aria-hidden="true"><Icon name="check" size={12} stroke={3.5} /></span>
                            <span className="tl-txt"><b>I accept all</b></span>
                          </label>
                          {termOptions.map((t) => (
                            <label key={t.value} className={err.terms && t.required && !accepted.includes(t.value) ? 'has-error' : ''}>
                              <input type="checkbox" checked={accepted.includes(t.value)} onChange={() => toggleTerm(t.value)} />
                              <span className="cbox" aria-hidden="true"><Icon name="check" size={12} stroke={3.5} /></span>
                              <span className="tl-txt">
                                <span dangerouslySetInnerHTML={{ __html: t.body }} />
                                {t.required && <b aria-hidden="true"> *</b>}
                              </span>
                            </label>
                          ))}
                          <Err msg={err.terms} />
                        </div>
                        <p className="fine"><em>Your data will be stored securely and used solely for market research and opinion analysis purposes in compliance with applicable data protection laws (such as GDPR and relevant local regulations).</em></p>
                        <p className="fine"><em>You may withdraw your consent or deactivate your account at any time by contacting <a href="mailto:support@myhealthopinions.com">support@myhealthopinions.com</a>. Upon withdrawal, your profile and data will be deleted or anonymized per our data retention policy.</em></p>
                      </>
                    )}
                  </>
                )}

                {stepId === 'about2' && (
                  <>
                    <h2>Your details</h2>
                    <p className="step-note"><Icon name="shieldCheck" size={14} /> Your screening answers and sign-up details are filled in. Check them, then answer the rest.</p>
                    <Choice name="industry" label={SCREENER.industry.q} options={SCREENER.industry.options} icons={['check', 'x']} value={f.industry} onChange={set('industry')} error={err.industry} />
                    {f.industry === 'Yes' && <Choice name="clinician" label={SCREENER.clinician.q} options={SCREENER.clinician.options} icons={['stethoscope', 'briefcase']} value={f.clinician} onChange={set('clinician')} error={err.clinician} />}
                    <DetailsCard me={member} />
                    <div className="form-row">
                      <Pick id="j-mar" label={DEMO.marital.q} options={DEMO.marital.options} value={f.marital} onChange={(v) => { setF((s) => ({ ...s, marital: v, children: DEMO.children.askedFor(v) ? s.children : '' })); clearErr('marital', 'children'); }} error={err.marital} />
                      {DEMO.children.askedFor(f.marital) && <Pick id="j-kid" label={DEMO.children.q} options={DEMO.children.options} value={f.children} onChange={set('children')} error={err.children} />}
                    </div>
                    <div className="form-row">
                      <Pick id="j-pi" label={DEMO.personalIncome.q} options={DEMO.personalIncome.options} value={f.personalIncome} onChange={set('personalIncome')} error={err.personalIncome} />
                      <Pick id="j-fi" label={DEMO.familyIncome.q} options={DEMO.familyIncome.options} value={f.familyIncome} onChange={set('familyIncome')} error={err.familyIncome} />
                    </div>
                  </>
                )}

                {stepId === 'edu' && (
                  <>
                    <h2>Your education</h2>
                    <Choice name="eduLevel" label={EDUCATION.q} options={EDUCATION.levels} icons={['clipboard', 'student', 'book', 'trophy', 'plus']} value={f.eduLevel} onChange={(v) => { setF((s) => ({ ...s, eduLevel: v, eduQual: '', eduQualOther: '', eduLicence: '' })); clearErr('eduLevel'); }} error={err.eduLevel} />
                    {edu && (
                      <div className="branch" key={f.eduLevel}>
                        {edu.o2 ? (
                          <Choice name="eduQual" label={edu.q2} options={edu.o2} value={f.eduQual} onChange={set('eduQual')} error={err.eduQual} cols={2} />
                        ) : (
                          <Field label={edu.q2} required htmlFor="j-eq" error={err.eduQualOther}><input id="j-eq" value={f.eduQualOther} onChange={set('eduQualOther')} maxLength={120} /></Field>
                        )}
                        {edu.o2 && /specify/i.test(f.eduQual) && (
                          <Field label="Please specify" required htmlFor="j-eq2" error={err.eduQualOther}><input id="j-eq2" value={f.eduQualOther} onChange={set('eduQualOther')} maxLength={120} /></Field>
                        )}
                        <Choice name="eduLicence" label={edu.q3} options={edu.o3} value={f.eduLicence} onChange={set('eduLicence')} error={err.eduLicence} cols={2} />
                      </div>
                    )}
                  </>
                )}

                {stepId === 'spec' && (
                  <>
                    <h2>Specialty &amp; area of practice</h2>
                    <fieldset className="prole-grid">
                      <legend>What is your primary role of expertise? <b aria-hidden="true">*</b></legend>
                      <div>
                        {HCP_ROLES.map((r) => (
                          <label key={r.id} className={f.primaryRole === r.id ? 'on' : ''} style={{ '--pc': r.color }}>
                            <input type="radio" name="primaryRole" value={r.id} checked={f.primaryRole === r.id} onChange={() => setPrimary(r.id)} />
                            <span className="pr-ic"><Icon name={r.icon} size={18} /></span>{r.label}
                          </label>
                        ))}
                      </div>
                      <Err msg={err.primaryRole} />
                    </fieldset>
                    {hcpRole && (
                      <div className="branch" key={hcpRole.id}>
                        {hcpRole.kind === 'area' && (
                          <Choice name="area" label={hcpRole.areaLabel} options={Object.keys(hcpRole.areas)} value={f.area} onChange={(v) => { setF((s) => ({ ...s, area: v, spec: '', job: '' })); clearErr('area'); }} error={err.area} cols={2} />
                        )}
                        {hcpRole.kind !== 'jobs' && specOptions.length > 0 && (
                          specOptions.length > 9
                            ? <ListPick name="spec" label="Please select your specialization" options={specOptions} value={f.spec} onChange={(v) => { setF((s) => ({ ...s, spec: v, job: hcpRole.kind === 'spec-jobs' ? '' : s.job })); clearErr('spec'); }} error={err.spec} color={hcpRole.color} />
                            : <Choice name="spec" label="Please select your specialization" options={specOptions} value={f.spec} onChange={(v) => { setF((s) => ({ ...s, spec: v, job: hcpRole.kind === 'spec-jobs' ? '' : s.job })); clearErr('spec'); }} error={err.spec} cols={2} />
                        )}
                        {jobOptions.length > 0 && (hcpRole.kind !== 'spec-jobs' || f.spec) && (
                          <ListPick key={f.spec + f.area} name="job" label="Please select your job level" options={jobOptions} value={f.job} onChange={set('job')} error={err.job} color={hcpRole.color} />
                        )}
                        {hcpRole.env && <Choice name="labEnv" label="Please select your work environments" options={hcpRole.env} value={f.labEnv} onChange={set('labEnv')} error={err.labEnv} multi cols={2} />}
                      </div>
                    )}
                  </>
                )}

                {stepId === 'practice' && (
                  <>
                    <h2>Where you practise</h2>
                    <div className="form-row">
                      <Field label="Country of practice" required htmlFor="j-pc" error={err.practiceCountry} icon="globe">
                        <CountrySelect id="j-pc" list={COVERAGE_LIST} value={f.practiceCountry} onChange={(c) => { setF((s) => ({ ...s, practiceCountry: c, region: '', regionOther: '' })); clearErr('practiceCountry'); }} invalid={!!err.practiceCountry} />
                      </Field>
                      {regions.length ? (
                        <Pick id="j-rg" label="State / region of practice" options={[...regions, 'Other']} value={f.region} onChange={set('region')} error={err.region} placeholder={f.practiceCountry ? 'Select…' : 'Choose a country first'} icon="pin" />
                      ) : (
                        <Field label="State / region of practice" required htmlFor="j-rgo" error={err.regionOther} icon="pin"><input id="j-rgo" value={f.regionOther} onChange={set('regionOther')} placeholder={f.practiceCountry ? '' : 'Choose a country first'} /></Field>
                      )}
                    </div>
                    {f.region === 'Other' && <Field label="Type your state / region" required htmlFor="j-rgo2" error={err.regionOther}><input id="j-rgo2" value={f.regionOther} onChange={set('regionOther')} /></Field>}
                    <div className="form-row">
                      <Field label="City" required htmlFor="j-city" error={err.city}><input id="j-city" value={f.city} onChange={set('city')} autoComplete="address-level2" /></Field>
                      <Field label="ZIP / postal code" required htmlFor="j-zip" error={err.zip}><input id="j-zip" value={f.zip} onChange={set('zip')} autoComplete="postal-code" maxLength={10} /></Field>
                    </div>
                    <Pick id="j-emp" label={PRACTICE.employment.q} options={PRACTICE.employment.options} value={f.employment} onChange={set('employment')} error={err.employment} />
                    <Choice name="sector" label={PRACTICE.sector.q} options={PRACTICE.sector.options} value={f.sector} onChange={set('sector')} error={err.sector} />
                    <Choice name="facility" label={PRACTICE.facility.q} options={PRACTICE.facility.options} icons={['hospital', 'stethoscope', 'bed', 'pill', 'microscope', 'users', 'plus']} value={f.facility} onChange={set('facility')} error={err.facility} />
                    <Choice name="beds" label={PRACTICE.beds.q} options={PRACTICE.beds.options} value={f.beds} onChange={set('beds')} error={err.beds} />
                    <div className="form-row">
                      <Choice name="setting" label={PRACTICE.setting.q} options={PRACTICE.setting.options} value={f.setting} onChange={set('setting')} error={err.setting} />
                      <Choice name="teaching" label={PRACTICE.teaching.q} options={PRACTICE.teaching.options} value={f.teaching} onChange={set('teaching')} error={err.teaching} />
                    </div>
                  </>
                )}

                {stepId === 'work' && (
                  <>
                    <h2>Professional address &amp; employer</h2>
                    <p className="step-note"><Icon name="lock" size={14} /> Used only to verify that you practise where you say you do. Never shared with research clients.</p>
                    <h3 className="sub-h">Professional address</h3>
                    <div className="form-row">
                      <Field label="Locality / street name" required htmlFor="j-loc" error={err.locality}><input id="j-loc" value={f.locality} onChange={set('locality')} autoComplete="address-line1" /></Field>
                      <Field label="Nearby landmark" htmlFor="j-lm"><input id="j-lm" value={f.landmark} onChange={set('landmark')} /></Field>
                    </div>
                    <p className="addr-recap"><Icon name="pin" size={14} /> {[f.city, f.region === 'Other' || !f.region ? f.regionOther : f.region, f.zip].filter(Boolean).join(', ')} · Your selected country: <b>{countryByCode(f.practiceCountry)?.name || '—'}</b></p>
                    <div className="form-row">
                      <Field label="Work phone number" htmlFor="j-wph" error={err.workPhone} icon="call"><input id="j-wph" type="tel" inputMode="tel" value={f.workPhone} onChange={set('workPhone')} /></Field>
                      <Field label="Work email" htmlFor="j-wem" error={err.workEmail} icon="mail"><input id="j-wem" type="email" value={f.workEmail} onChange={set('workEmail')} /></Field>
                    </div>
                    <h3 className="sub-h">Employer</h3>
                    <Field label="Name of employer (hospital or clinic)" required htmlFor="j-emp" error={err.employer} icon="hospital"><input id="j-emp" value={f.employer} onChange={set('employer')} autoComplete="organization" /></Field>
                    <div className="form-row">
                      <Field label="Employer address (building / flat no.)" required htmlFor="j-eb" error={err.employerBuilding}><input id="j-eb" value={f.employerBuilding} onChange={set('employerBuilding')} /></Field>
                      <Field label="Locality / street name" required htmlFor="j-el" error={err.employerLocality}><input id="j-el" value={f.employerLocality} onChange={set('employerLocality')} /></Field>
                    </div>
                    <div className="form-row">
                      <Field label="Nearby landmark" htmlFor="j-elm"><input id="j-elm" value={f.employerLandmark} onChange={set('employerLandmark')} /></Field>
                      <Field label="LinkedIn profile" htmlFor="j-li" error={err.linkedin} icon="linkedin"><input id="j-li" type="url" value={f.linkedin} onChange={set('linkedin')} placeholder="https://www.linkedin.com/in/…" /></Field>
                    </div>
                  </>
                )}

                {stepId === 'exp' && (
                  <>
                    <h2>Experience &amp; influence</h2>
                    <Choice name="years" label={EXPERIENCE.years.q} options={EXPERIENCE.years.options} value={f.years} onChange={set('years')} error={err.years} />
                    {f.clinician === 'Yes' && <Choice name="patients" label={EXPERIENCE.patients.q} options={EXPERIENCE.patients.options} value={f.patients} onChange={set('patients')} error={err.patients} />}
                    <Choice name="trials" label={EXPERIENCE.trials.q} options={EXPERIENCE.trials.options} value={f.trials} onChange={(v) => { setF((s) => ({ ...s, trials: v, trialsCount: v === 'Yes' ? s.trialsCount : '' })); clearErr('trials'); }} error={err.trials} />
                    {f.trials === 'Yes' && <Choice name="trialsCount" label={EXPERIENCE.trialsCount.q} options={EXPERIENCE.trialsCount.options} value={f.trialsCount} onChange={set('trialsCount')} error={err.trialsCount} />}
                    <YesNoGrid title="Decision-making & influence" items={INFLUENCE} f={f} set={set} err={err} />
                    <YesNoGrid title="Technology & digital health" items={DIGITAL} f={f} set={set} err={err} />
                  </>
                )}

                {stepId === 'verify' && (
                  <>
                    <h2>Research preferences &amp; verification</h2>
                    <Choice name="mode" label={AVAILABILITY.mode.q} options={AVAILABILITY.mode.options} icons={['monitor', 'call', 'users']} value={f.mode} onChange={set('mode')} error={err.mode} />
                    <div className="form-row">
                      <Choice name="frequency" label={AVAILABILITY.frequency.q} options={AVAILABILITY.frequency.options} value={f.frequency} onChange={set('frequency')} error={err.frequency} />
                      <Choice name="time" label={AVAILABILITY.time.q} options={AVAILABILITY.time.options} icons={['sun', 'clock', 'moon']} value={f.time} onChange={set('time')} error={err.time} />
                    </div>
                    <div className="form-row">
                      <Choice name="recontact" label={AVAILABILITY.recontact.q} options={AVAILABILITY.recontact.options} value={f.recontact} onChange={set('recontact')} error={err.recontact} />
                      <Choice name="focus" label={AVAILABILITY.focus.q} options={AVAILABILITY.focus.options} value={f.focus} onChange={set('focus')} error={err.focus} />
                    </div>
                    <div className="cert-box">
                      <h3 className="sub-h"><Icon name="shieldCheck" size={16} /> Medical certification</h3>
                      <Field label="Professional certification / licence number" required={f.clinician === 'Yes'} htmlFor="j-lic" error={err.licence} hint="Masked for the panel team: they only see the last 4 characters.">
                        <span className="lic-wrap">
                          <input id="j-lic" type={showLic ? 'text' : 'password'} value={f.licence} onChange={set('licence')} maxLength={30} autoComplete="off" spellCheck={false} aria-invalid={!!err.licence} />
                          <button type="button" className="lic-eye" onClick={() => setShowLic((v) => !v)} aria-label={showLic ? 'Hide licence number' : 'Show licence number'}><Icon name={showLic ? 'eyeOff' : 'eye'} size={16} /></button>
                        </span>
                      </Field>
                      {f.licence && <p className="lic-mask" aria-live="polite">Panel team sees: <code>{maskLicence(f.licence.trim())}</code></p>}
                      <div className="form-row">
                        <Field label="Issuing authority / council" required={f.clinician === 'Yes' || !!f.licence} htmlFor="j-auth" error={err.authority}><input id="j-auth" value={f.authority} onChange={set('authority')} placeholder="e.g. National Medical Commission" /></Field>
                        <Pick id="j-ly" label="Year of issue" options={YEARS} value={f.licenceYear} onChange={set('licenceYear')} error={err.licenceYear} required={f.clinician === 'Yes' || !!f.licence} />
                      </div>
                      <Field label="Upload certification document" htmlFor="j-file" error={err.file} hint="PDF, JPG or PNG up to 5 MB. Sent over an encrypted connection and used only for verification.">
                        <label className={`file-drop ${file ? 'has-file' : ''}`} htmlFor="j-file">
                          <Icon name={file ? 'check' : 'clipboard'} size={18} />
                          <span>{file ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Choose a file or drop it here'}</span>
                          <input id="j-file" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                        </label>
                      </Field>
                      {file && <button type="button" className="text-link small" onClick={() => setFile(null)}>Remove file</button>}
                      <Choice name="certConsent" label={`Verification consent: “${CERTIFICATION.consent}”`} options={['Yes', 'No']} value={f.certConsent} onChange={set('certConsent')} error={err.certConsent} />
                      {f.certConsent === 'No' && <p className="step-note warn"><Icon name="info" size={14} /> Without consent we’ll verify you another way (for example your work email) before inviting you to specialist studies.</p>}
                    </div>
                  </>
                )}

                {stepId === 'care' && (
                  <>
                    <h2>About your caring role</h2>
                    <DbQuestions role={f.role} stepId="care" answers={f.dbq} onAnswer={setDbAnswer} errors={err} />
                  </>
                )}

                {stepId === 'daily' && (
                  <>
                    <h2>Your day-to-day care</h2>
                    <DbQuestions role={f.role} stepId="daily" answers={f.dbq} onAnswer={setDbAnswer} errors={err} />
                  </>
                )}

                {stepId === 'health' && (
                  <>
                    <h2>Your health experience</h2>
                    <p className="step-note"><Icon name="lock" size={14} /> Confidential — this only decides which studies reach you. Never shared with your name.</p>
                    <DbQuestions role={f.role} stepId="health" answers={f.dbq} onAnswer={setDbAnswer} errors={err} />
                  </>
                )}

                {stepId === 'prefs' && (
                  <>
                    <h2>Care &amp; preferences</h2>
                    <DbQuestions role={f.role} stepId="prefs" answers={f.dbq} onAnswer={setDbAnswer} errors={err} />
                  </>
                )}
              </div>

              <div className="hp" aria-hidden="true">
                <label htmlFor="j-web">Website</label>
                <input id="j-web" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} />
              </div>
              {alert && <p className="form-alert" role="alert">{alert}</p>}

              <div className="step-actions">
                {step > firstStep && <button type="button" className="btn btn-ghost" onClick={back}><Icon name="arrowLeft" size={18} /><span className="btn-label">Back</span></button>}
                <button type="submit" className="btn btn-primary" disabled={state === 'sending' || (complete && stepId === 'terms' && (terms.status !== 'ready' || !allRequiredSelected || !termsChanged))}>
                  <span className="btn-label">{complete && stepId === 'terms' ? 'Accept & continue' : step < last ? 'Continue' : complete ? (state === 'sending' ? 'Saving…' : 'Submit') : state === 'sending' ? 'Creating account…' : 'Create free account'}</span>
                  <Icon name={step < last ? 'arrow' : 'sparkle'} size={18} />
                </button>
              </div>
              {!complete && <p className="join-alt">Already a member? <Link to="/login">Log in</Link></p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
