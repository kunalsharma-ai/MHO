// Section visuals: quality pipeline, verification ring, 3D payment cards, notification phone, steps path.
import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { QUALITY_CHECKS, QUALITY_STAGES, VERIFICATION_PROTOCOLS } from '../data/quality.js';
import { PAYMENT_METHODS, NOTIFY_CHANNELS, methodsFor } from '../data/rewards.js';
import { LiveZone, Reveal, useInView, Flag } from './ui.jsx';
import { REGIONS, COVERAGE } from '../data/countries.js';

/* ---------- Quality pipeline: 3 lanes, checks light up as a "scan" passes ---------- */
export function QualityPipeline() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [stage, setStage] = useState('all');
  return (
    <div ref={ref} className={`pipeline ${inView ? 'is-in' : ''}`}>
      <div className="pipe-legend" role="tablist" aria-label="Filter checks by stage">
        <button role="tab" aria-selected={stage === 'all'} className={stage === 'all' ? 'on' : ''} onClick={() => setStage('all')}>All 18 checks</button>
        {QUALITY_STAGES.map((s) => (
          <button key={s.id} role="tab" aria-selected={stage === s.id} className={stage === s.id ? 'on' : ''} style={{ '--c': s.color }} onClick={() => setStage(s.id)}>{s.label}</button>
        ))}
      </div>
      <div className="pipe-lanes">
        {QUALITY_STAGES.map((s, si) => (
          <section key={s.id} className={`pipe-lane ${stage !== 'all' && stage !== s.id ? 'dim' : ''}`} style={{ '--c': s.color, '--si': si }}>
            <header>
              <span className="lane-num">0{si + 1}</span>
              <h3>{s.label}</h3>
            </header>
            <span className="lane-scan" aria-hidden="true" />
            <ul>
              {QUALITY_CHECKS.filter((c) => c.stage === s.id).map((c, i) => (
                <li key={c.name} style={{ '--i': i }} tabIndex={0}>
                  <span className="chk-ic"><Icon name={c.icon} size={18} /></span>
                  <span className="chk-txt">
                    <b>{c.name}</b>
                    <small>{c.note}</small>
                  </span>
                  <span className="chk-ok" aria-hidden="true"><Icon name="check" size={14} stroke={3} /></span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

/* ---------- Verification ring: 6 protocols orbit a shield; manual review in the centre ---------- */
export function VerificationRing() {
  return (
    <LiveZone className="vring">
      <div className="vring-core">
        <Icon name="shieldCheck" size={44} />
        <b>Manual credential review</b>
        <small>by our quality verification team</small>
      </div>
      <div className="vring-orbit" aria-hidden="true" />
      {VERIFICATION_PROTOCOLS.map((p, i) => (
        <div key={p.name} className="vring-node" style={{ '--i': i, '--n': VERIFICATION_PROTOCOLS.length }}>
          <span className="vn-ic"><Icon name={p.icon} size={20} /></span>
          <span className="vn-txt">{p.name}</span>
        </div>
      ))}
    </LiveZone>
  );
}

/* ---------- Payment cards: 3D fan, UPI shown only for India ---------- */
const METHOD_ICON = { paypal: 'paypal', upi: 'upi', wire: 'bank', amazon: 'gift', report: 'clipboard' };
export function PaymentStack({ initialCountry = 'in' }) {
  const [cc, setCc] = useState(initialCountry);
  const [q, setQ] = useState('');
  const allowed = methodsFor(cc).map((m) => m.id);
  const current = COVERAGE.find((c) => c.code === cc);
  const t = q.trim().toLowerCase();
  return (
    <div className="paystack ps4">
      <div className="ps-picker">
        <div className="psp-now">
          <span className="psp-flag"><Flag code={cc} name={current?.name} size={44} /></span>
          <span><small>Show payout options for</small><b>{current?.name}</b><em>{allowed.length} payout option{allowed.length > 1 ? 's' : ''}</em></span>
        </div>
        <label className="psp-search"><Icon name="search" size={16} /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search our ${COVERAGE.length} countries`} aria-label="Search countries" /></label>
        <div className="psp-regions">
          {REGIONS.map((r) => {
            const list = r.countries.filter(([, name]) => !t || name.toLowerCase().includes(t));
            if (!list.length) return null;
            return (
              <div key={r.id} className="psp-reg" style={{ '--c': r.color }}>
                <span className="psp-rn">{r.name}</span>
                <div>
                  {list.map(([code, name]) => (
                    <button key={code} type="button" className={code === cc ? 'on' : ''} onClick={() => setCc(code)} aria-pressed={code === cc} title={name}>
                      <Flag code={code} name={name} size={18} /><span>{name}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ps-right">
        <LiveZone className="paystack-fan" key={cc}>
          {PAYMENT_METHODS.map((m, i) => {
            const ok = allowed.includes(m.id);
            return (
              <article key={m.id} className={`pay-card pc-${m.id} ${ok ? '' : 'is-off'}`} style={{ '--i': i, '--c1': m.color, '--c2': m.accent }}>
                <div className="pc-chip" aria-hidden="true" />
                <span className="pc-ic"><Icon name={METHOD_ICON[m.id]} size={26} /></span>
                <h3>{m.name}</h3>
                <p>{m.blurb}</p>
                <span className="pc-state">{ok ? <><Icon name="check" size={13} stroke={3} /> Available</> : m.id === 'upi' ? 'India only' : 'Not available'}</span>
                <span className="pc-shine" aria-hidden="true" />
              </article>
            );
          })}
        </LiveZone>
        <p className="paystack-note">
          <Flag code={cc} size={20} /> {allowed.length} payout option{allowed.length > 1 ? 's' : ''} available in {current?.name}. UPI is an India-only payment method; members in every other country choose PayPal, Wire Transfer, Amazon Gift Cards or a Medical Report.
        </p>
      </div>
    </div>
  );
}

/* ---------- Notification phone ---------- */
const CH_ICON = { dashboard: 'dashboard', sms: 'sms', whatsapp: 'whatsapp', email: 'mail' };
const CH_MSG = {
  dashboard: ['New study matched to your profile', 'Health & wellness · ~12 min'],
  sms: ['MHO: A new survey is waiting for you', 'Tap to view your invitation'],
  whatsapp: ['MyHealthOpinions', 'Hi! A study that fits your profile just opened 🎯'],
  email: ['Your next survey invitation', 'Topic, estimated time & reward inside'],
};
export function StepsPath({ steps }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <div ref={ref} className={`steps-path ${inView ? 'is-in' : ''}`}>
      <svg className="sp-line" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M20 150 C 180 20, 320 20, 380 100 S 600 190, 660 100 S 860 10, 980 60" pathLength="100" />
        <circle r="9" className="sp-runner">
          <animateMotion dur="7s" repeatCount="indefinite" path="M20 150 C 180 20, 320 20, 380 100 S 600 190, 660 100 S 860 10, 980 60" />
        </circle>
      </svg>
      <ol>
        {steps.map((s, i) => (
          <li key={s.title} style={{ '--i': i, '--c': s.color }}>
            <span className="sp-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="sp-ic"><Icon name={s.icon} size={26} /></span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PrivacySeal() {
  return (
    <Reveal className="privacy-seal" effect="zoom">
      <div className="ps-ring" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs><path id="ps-circle" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" /></defs>
          <text><textPath href="#ps-circle">YOUR DATA STAYS YOURS • NEVER SOLD • NEVER SHARED • </textPath></text>
        </svg>
      </div>
      <div className="ps-core"><Icon name="lock" size={34} /></div>
    </Reveal>
  );
}
