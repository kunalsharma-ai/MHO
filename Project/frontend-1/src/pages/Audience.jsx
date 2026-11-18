// Audience pages — one per member group, never merged:
//   /healthcare-professionals/ (primary keyword: paid medical surveys for healthcare professionals)
//   /caregivers/               (primary keyword: paid surveys for caregivers)
//   /patients/                 (primary keyword: paid surveys for patients)
// Each page: role-graded hero with its own animated scene, who can join (HCP role explorer with all
// 1,300+ job titles / caregiver fridge notes / patient capsules), process, study journey, rewards,
// the profile questions we ask, FAQs and a join call-to-action that preselects the role.
import { useMemo, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import Icon from '../components/Icon.jsx';
import Persona from '../components/Persona.jsx';
import { SectionHead, Button, LiveZone } from '../components/ui.jsx';
import { StepRail, RewardWallet, FaqStage, RoleVoices } from '../components/R8.jsx';
import { Link, useRouter } from '../router.jsx';
import { AUDIENCE, AUDIENCE_FAQ } from '../data/audiences.js';
import { ROLES as HCP_ROLES, jobCount, allJobs } from '../data/hcpProfile.js';
import { THERAPY_AREAS, CAREGIVER_TYPES, PATIENT_TYPES, CONDITION_COUNT } from '../data/conditions.js';

const ROLE_BY_PATH = { '/healthcare-professionals': 'hcp', '/caregivers': 'caregiver', '/patients': 'patient' };

/* ---------------- hero scenes ---------------- */
function HcpArt() {
  return (
    <LiveZone className="aud-art art-hcp" aria-hidden="true">
      <div className="cred-stack">
        <div className="cred c1">
          <span className="cr-top"><Icon name="shieldCheck" size={14} /> Licence verified</span>
          <Persona kind="doctor" skin={2} hair={0} size={54} />
          <b>Dr. A. Rao</b><small>Cardiology · Consultant</small>
          <span className="cr-mask">Reg. no. ••••••8213</span>
        </div>
        <div className="cred c2">
          <span className="cr-top"><Icon name="wallet" size={14} /> Honorarium</span>
          <b className="cr-amt">$45.00</b><small>Credited · wire transfer</small>
          <span className="cr-bars">{[40, 70, 55, 90, 65].map((h, i) => <i key={i} style={{ '--h': h + '%', '--i': i }} />)}</span>
        </div>
        <div className="cred c3">
          <span className="cr-top"><Icon name="book" size={14} /> CME credit</span>
          <b>Certificate of contribution</b><small>Advisory study · 30 min</small>
          <span className="cr-seal"><Icon name="trophy" size={18} /></span>
        </div>
      </div>
      {['Cardiology', 'Oncology', 'Nursing', 'Pharmacy', 'Radiology', 'Dental', 'Health IT'].map((t, i) => <span key={t} className="orbit-chip" style={{ '--i': i }}>{t}</span>)}
    </LiveZone>
  );
}

function CaregiverArt() {
  return (
    <LiveZone className="aud-art art-care" aria-hidden="true">
      <svg viewBox="0 0 320 300" className="home-svg">
        <defs><linearGradient id="hs-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff4e8" /><stop offset="1" stopColor="#ffe2c7" /></linearGradient></defs>
        <ellipse cx="160" cy="282" rx="130" ry="12" fill="#000" opacity=".07" />
        <rect x="60" y="130" width="200" height="150" rx="10" fill="url(#hs-wall)" stroke="#ffc89e" strokeWidth="3" />
        <path d="M40 140 160 50l120 90" fill="none" stroke="#ff7a1a" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="205" y="70" width="22" height="44" rx="4" fill="#e05d0b" />
        <rect x="140" y="200" width="44" height="80" rx="6" fill="#b45309" />
        <circle cx="175" cy="242" r="3.5" fill="#fde68a" />
        <rect className="hs-win w1" x="85" y="160" width="40" height="36" rx="6" />
        <rect className="hs-win w2" x="200" y="160" width="40" height="36" rx="6" />
        <path className="hs-heart" d="M160 120c-6-12-24-8-20 6 2 8 20 18 20 18s18-10 20-18c4-14-14-18-20-6z" />
        <g className="hs-smoke"><circle cx="216" cy="56" r="6" /><circle cx="222" cy="40" r="8" /><circle cx="230" cy="22" r="10" /></g>
      </svg>
      <span className="note n1"><Icon name="pill" size={14} /> 8 am meds ✓</span>
      <span className="note n2"><Icon name="car" size={14} /> Clinic 2 pm</span>
      <span className="note n3"><Icon name="gift" size={14} /> ₹500 grocery voucher</span>
      <span className="s-badge aud-badge"><Persona kind="caregiver" skin={1} hair={3} hairStyle={1} size={40} /><span><b>Caring for Mum</b><small><Icon name="clock" size={11} /> 10-minute survey</small></span></span>
    </LiveZone>
  );
}

function PatientArt() {
  return (
    <LiveZone className="aud-art art-pt" aria-hidden="true">
      <div className="pt-phone">
        <div className="pt-screen">
          <span className="ptb q b1">How easy is it to use your inhaler?</span>
          <span className="ptb a b2">Easier since the new one 👍</span>
          <span className="ptb q b3">What would make it better?</span>
          <span className="ptb a b4">A dose counter I can read</span>
          <span className="ptb done b5"><Icon name="gift" size={13} /> +$18 reward unlocked</span>
        </div>
      </div>
      <span className="pt-shield"><Icon name="shieldCheck" size={26} /><small>Anonymous</small></span>
      {['lungs', 'heart', 'drop', 'brain', 'bone', 'smile'].map((ic, i) => <span key={ic} className="pt-orb" style={{ '--i': i }}><Icon name={ic} size={16} /></span>)}
    </LiveZone>
  );
}

const ART = { hcp: HcpArt, caregiver: CaregiverArt, patient: PatientArt };

/* ---------------- who can join ---------------- */
function HcpExplorer() {
  const [rid, setRid] = useState(HCP_ROLES[1].id);
  const [sub, setSub] = useState('');
  const [q, setQ] = useState('');
  const role = HCP_ROLES.find((r) => r.id === rid);
  const groups = role.kind === 'spec-jobs' ? Object.keys(role.specs) : role.kind === 'area' ? Object.keys(role.areas) : [];
  const activeSub = groups.includes(sub) ? sub : groups[0] || '';
  const jobs = role.kind === 'jobs' || role.kind === 'lab' ? role.jobs : role.kind === 'spec-jobs' ? role.specs[activeSub] : role.areas[activeSub].jobs;
  const index = useMemo(() => allJobs(), []);
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    return index.filter((j) => j.t.toLowerCase().includes(t)).slice(0, 40);
  }, [q, index]);
  return (
    <div className="rx">
      <label className="rx-search">
        <Icon name="search" size={18} />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find your job title — e.g. “oncology nurse”, “pharmacist”, “radiographer”" aria-label="Search job titles" />
        {q && <span className="rx-count">{hits.length}{hits.length === 40 ? '+' : ''} matches</span>}
      </label>
      {q.trim().length >= 2 ? (
        <ul className="rx-hits" aria-live="polite">
          {hits.map((h) => {
            const r = HCP_ROLES.find((x) => x.id === h.role);
            return <li key={h.role + h.t} style={{ '--c': r.color }}><Icon name={r.icon} size={14} /><b>{h.t}</b><small>{h.roleLabel}{h.group ? ` · ${h.group}` : ''}</small></li>;
          })}
          {!hits.length && <li className="rx-none">No match yet. Choose “Other” in sign-up and tell us your title — we recruit new roles every month.</li>}
        </ul>
      ) : (
        <div className="rx-body">
          <div className="rx-roles" role="tablist" aria-label="Professional groups">
            {HCP_ROLES.map((r) => (
              <button key={r.id} id={`rx-${r.id}`} role="tab" aria-selected={r.id === rid} className={r.id === rid ? 'on' : ''} style={{ '--c': r.color }} onClick={() => { setRid(r.id); setSub(''); }}>
                <span className="rxr-ic"><Icon name={r.icon} size={17} /></span>
                <span className="rxr-t">{r.label}</span>
                <em>{jobCount(r)}</em>
              </button>
            ))}
          </div>
          <div className="rx-panel" key={rid} style={{ '--c': role.color }} role="tabpanel">
            <header>
              <span className="rxp-ic"><Icon name={role.icon} size={24} /></span>
              <span><h3>{role.label}</h3><small>{jobCount(role)} job titles{groups.length ? ` · ${groups.length} ${role.kind === 'area' ? 'key areas' : 'specializations'}` : ''}</small></span>
            </header>
            {groups.length > 0 && (
              <div className="rx-subs">
                {groups.map((g) => <button key={g} className={g === activeSub ? 'on' : ''} onClick={() => setSub(g)}>{g}</button>)}
              </div>
            )}
            {role.kind === 'area' && <p className="rx-specs"><b>Specializations:</b> {role.areas[activeSub].specs.join(' · ')}</p>}
            {role.kind === 'lab' && <p className="rx-specs"><b>Specializations:</b> {role.specs.join(' · ')}</p>}
            <ul className="rx-jobs" key={activeSub}>{jobs.map((j, i) => <li key={j} style={{ '--i': Math.min(i, 30) }}>{j}</li>)}</ul>
          </div>
        </div>
      )}
    </div>
  );
}

function FridgeNotes() {
  const colors = ['#fff3a3', '#ffd6e0', '#c9f2e3', '#d9e4ff', '#ffe0b8', '#e8d9ff'];
  return (
    <LiveZone className="fridge">
      {CAREGIVER_TYPES.map((t, i) => (
        <article key={t.t} className="fnote" style={{ '--bg': colors[i % colors.length], '--r': `${((i * 37) % 7) - 3}deg`, '--i': i }}>
          <span className="fn-magnet" aria-hidden="true" />
          <Icon name={t.icon} size={20} />
          <b>{t.t}</b>
          <small>{t.d}</small>
        </article>
      ))}
    </LiveZone>
  );
}

function Capsules() {
  return (
    <div className="capsules">
      {PATIENT_TYPES.map((t, i) => (
        <article key={t.t} className="capsule" style={{ '--i': i }}>
          <span className="cap-l"><Icon name={t.icon} size={20} /></span>
          <span className="cap-r"><b>{t.t}</b><small>{t.d}</small></span>
        </article>
      ))}
    </div>
  );
}

function ConditionShelves({ compact = false }) {
  const [open, setOpen] = useState(THERAPY_AREAS[0].id);
  const list = compact ? THERAPY_AREAS.slice(0, 12) : THERAPY_AREAS;
  return (
    <div className={`shelves ${compact ? 'compact' : ''}`}>
      {list.map((a) => {
        const on = open === a.id;
        return (
          <section key={a.id} className={`shelf2 ${on ? 'on' : ''}`} style={{ '--c': a.color }}>
            <button className="sh-head" aria-expanded={on} onClick={() => setOpen(on ? '' : a.id)}>
              <span className="sh-ic"><Icon name={a.icon} size={18} /></span>
              <b>{a.area}</b>
              <em>{a.items.length}</em>
              <Icon name="plus" size={16} className="sh-plus" />
            </button>
            {/* Conditions stay in the HTML (closed shelves are only visually collapsed) so search engines read them. */}
            <ul className="sh-items">{a.items.map((c, i) => <li key={c} style={{ '--i': i }}>{c}</li>)}</ul>
          </section>
        );
      })}
    </div>
  );
}

/* ---------------- shared sections ---------------- */
function Journey({ steps, role }) {
  return (
    <LiveZone className={`jr4 jr-${role}`}>
      {steps.map((s, i) => (
        <article key={s.t} style={{ '--i': i }}>
          <span className="jr-ic"><Icon name={s.icon} size={22} /></span>
          <b>{s.t}</b>
          <small>{s.d}</small>
          {i < steps.length - 1 && <span className="jr-arrow" aria-hidden="true"><Icon name="arrow" size={16} /></span>}
        </article>
      ))}
    </LiveZone>
  );
}

function Clipboard({ items, minutes }) {
  return (
    <LiveZone className="clipb">
      <span className="cb-clip" aria-hidden="true" />
      <div className="cb-paper">
        <header><Icon name="clipboard" size={18} /> Your profile <em><Icon name="clock" size={12} /> about {minutes} min</em></header>
        <ul>{items.map((t, i) => <li key={t} style={{ '--i': i }}><span className="cb-box" aria-hidden="true"><Icon name="check" size={12} stroke={3.5} /></span>{t}</li>)}</ul>
      </div>
    </LiveZone>
  );
}

export default function Audience() {
  const { path } = useRouter();
  const role = ROLE_BY_PATH[path] || 'hcp';
  const A = AUDIENCE[role];
  const Art = ART[role];
  const cta = role === 'hcp' ? 'Join as a professional' : role === 'caregiver' ? 'Join as a caregiver' : 'Join as a patient';
  return (
    <div className={`aud aud-${role} rgrade-${role}`}>
      <PageHero
        className={`aud-hero rgrade-${role}`}
        theme={role === 'hcp' ? 'pro' : role === 'caregiver' ? 'earn' : 'shield'}
        crumbs={[{ label: 'Home', to: '/' }, { label: A.name }]}
        eyebrow={A.eyebrow}
        title={A.title}
        lead={A.lead}
        badges={A.badges}
        ctas={[{ label: cta, to: `/join#${role}` }, { label: 'How it works', to: '/how-it-works', variant: 'ghost', icon: 'pulse' }]}
        art={<Art />}
      >
        <ul className="aud-stats">{A.stats.map(([n, l]) => <li key={l}><b>{n}</b><span>{l}</span></li>)}</ul>
      </PageHero>

      <section className="section aud-who" id="roles">
        <div className="container">
          {role === 'hcp' && <SectionHead eyebrow="Who can join" title="Every role in healthcare, all 1,300+ of them" lead="Pick your professional group to see every specialization and job level we recruit — or search for your exact title." color="#2457f5" />}
          {role === 'caregiver' && <SectionHead eyebrow="Who can join" title="Fourteen kinds of caregiver, one community" lead="Pinned to the fridge, like the rest of your week. If one of these sounds like you, your experience is exactly what researchers need." color="#ff7a1a" />}
          {role === 'patient' && <SectionHead eyebrow="Who can join" title="Patients of every kind" lead="Whatever your health story, there are studies that need it — and healthy, health-conscious people are welcome too." color="#00a88a" />}
          {role === 'hcp' && <HcpExplorer />}
          {role === 'caregiver' && <FridgeNotes />}
          {role === 'patient' && <Capsules />}
        </div>
      </section>

      {role !== 'hcp' && (
        <section className="section aud-conditions">
          <div className="container">
            <SectionHead eyebrow="Health areas" title={role === 'patient' ? `${CONDITION_COUNT}+ conditions on our shelves` : 'Conditions the people you care for live with'} lead={role === 'patient' ? 'Open a shelf to see every condition in that therapy area. Pick yours during sign-up — it is optional and confidential.' : 'Dementia, cancer, diabetes, disability, mental health and more. During sign-up you choose the conditions involved in your caring role.'} color={role === 'patient' ? '#00a88a' : '#ff4f6d'} />
            <ConditionShelves compact={role === 'caregiver'} />
          </div>
        </section>
      )}

      <section className="section aud-process">
        <div className="container split">
          <div className="split-copy">
            <span className="eyebrow" style={{ '--eb': 'var(--g1)' }}><i aria-hidden="true" />Sign-up process</span>
            <h2>{role === 'hcp' ? 'From screening to verified in five steps' : role === 'caregiver' ? 'Five steps that fit around caring' : 'Five steps, all from your phone'}</h2>
            <p className="lead">{role === 'hcp' ? 'The professional profile follows our recruitment questionnaire, so you only see studies that match your specialty, job level and practice.' : role === 'caregiver' ? 'Tell us about your caring role once. Every question about the person you care for is general, never personal.' : 'Share as much or as little as you like. Health details are optional and never leave our hands.'}</p>
            <Button to={`/join#${role}`}>{cta}</Button>
          </div>
          <StepRail steps={A.process} role={role} />
        </div>
      </section>

      <section className="section aud-journey dark-band">
        <div className="container">
          <SectionHead eyebrow="A study, start to finish" title={role === 'hcp' ? 'From invitation to honorarium' : role === 'caregiver' ? 'A survey in a caregiver’s day' : 'Your first survey, step by step'} color="#ffb020" />
          <Journey steps={A.journey} role={role} />
        </div>
      </section>

      <section className="section aud-rewards">
        <div className="container">
          <SectionHead eyebrow="Rewards" title={role === 'hcp' ? 'Honoraria and rewards for professionals' : role === 'caregiver' ? 'Rewards that help at home' : 'Rewards for sharing your story'} lead="Hover or tap a card to turn it over. Exact options for each study are listed in its invitation, and UPI is available for members in India." color="#ff6a2c" />
          <RewardWallet role={role} />
        </div>
      </section>

      <section className="section aud-profile">
        <div className="container split">
          <Clipboard items={A.profile} minutes={A.minutes} />
          <div className="split-copy">
            <span className="eyebrow" style={{ '--eb': 'var(--g1)' }}><i aria-hidden="true" />What we ask</span>
            <h2>Your profile, one time only</h2>
            <p className="lead">These answers decide which invitations reach you, so every study you open is one you qualify for. You can update them any time from your dashboard.</p>
            <p className="aud-lock"><Icon name="lock" size={16} /> Your details are secured with us. We don’t share your personal details.</p>
          </div>
        </div>
      </section>

      <section className={`section aud-voices aud-voices-${role}`} aria-labelledby={`voices-${role}`}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Member voices</span>
            <h2 id={`voices-${role}`}>{role === 'hcp' ? 'Grand rounds: what professionals tell us' : role === 'caregiver' ? 'Notes from the people who care' : 'Stories that help others heal'}</h2>
          </div>
          <RoleVoices role={role} />
        </div>
      </section>

      <section className="section aud-faq">
        <div className="container">
          <FaqStage items={AUDIENCE_FAQ[role]} idPrefix={`faq-${role}`} theme={role} eyebrow="Questions" title={`${A.name}: common questions`} />
        </div>
      </section>

      <section className="section aud-cta">
        <div className="container">
          <div className="ac-band">
            <span className="ac-rings" aria-hidden="true"><i /><i /><i /></span>
            <h2>{role === 'hcp' ? 'Your expertise, rewarded.' : role === 'caregiver' ? 'You carry the care. We carry your voice.' : 'Your story can change someone’s treatment.'}</h2>
            <p>Free to join, no investment, and your details are never sold.</p>
            <div className="ac-btns">
              <Button to={`/join#${role}`}>{cta}</Button>
              <Link className="text-link light" to={role === 'hcp' ? '/caregivers' : role === 'caregiver' ? '/patients' : '/healthcare-professionals'}>
                {role === 'hcp' ? 'Looking after someone? See caregivers' : role === 'caregiver' ? 'Living with a condition? See patients' : 'Work in healthcare? See professionals'} <Icon name="arrow" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
