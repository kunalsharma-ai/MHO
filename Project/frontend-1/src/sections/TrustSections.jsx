import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import FrLogo from '../components/FrLogo.jsx';
import useInView from '../hooks/useInView.js';
import { PRIVACY_PROMISES, QUALITY_CHECKS, QUALITY_LAYERS, VERIFICATION_PROTOCOLS } from '../data/quality.js';
import { BRAND } from '../data/site.js';

// Quality & Security Checks — radar sweep + layered hex grid that lights up in sequence
export function QualityRadar({ withLink = true }) {
  const [vref, visible] = useInView({ once: false, threshold: 0, rootMargin: '100px 0px' });
  const [lit, setLit] = useState(-1);
  const [layer, setLayer] = useState('all');
  useEffect(() => {
    if (!visible) return undefined; // pause when off-screen
    const t = setInterval(() => setLit((x) => (x + 1) % QUALITY_CHECKS.length), 650);
    return () => clearInterval(t);
  }, [visible]);
  const checks = QUALITY_CHECKS.map((c, i) => ({ ...c, i }));
  return (
    <section ref={vref} className="section radar-sec" aria-labelledby="qc-title">
      <div className="container radar-row">
        <div className="radar-copy reveal">
          <p className="eyebrow eyebrow-light">Quality & Security Checks</p>
          <h2 id="qc-title">Eighteen gates. <span className="grad-text">Zero shortcuts.</span></h2>
          <p className="muted-light">Every account and every response passes through layered identity, device and response checks — so honest members earn and research clients trust the data.</p>
          <div className="layer-tabs" role="tablist" aria-label="Filter by protection layer">
            <button type="button" role="tab" aria-selected={layer === 'all'} className={layer === 'all' ? 'on' : ''} onClick={() => setLayer('all')}>All layers</button>
            {QUALITY_LAYERS.map((l) => (
              <button type="button" role="tab" key={l.id} aria-selected={layer === l.id} className={layer === l.id ? 'on' : ''} style={{ '--lc': l.color }} onClick={() => setLayer(l.id)}>
                <i /> {l.name}
              </button>
            ))}
          </div>
          <div className="radar" aria-hidden="true">
            <div className="radar-sweep" />
            <div className="radar-core"><Icon name="shield" size={44} /></div>
            {[1, 2, 3].map((r) => <span key={r} className={`radar-ring r${r}`} />)}
            {checks.map((c) => (
              <span key={c.name} className={`radar-blip ${lit === c.i ? 'on' : ''}`} style={{ '--a': `${(360 / checks.length) * c.i}deg`, '--lc': QUALITY_LAYERS.find((l) => l.id === c.layer).color, '--rr': c.layer === 'identity' ? 18 : c.layer === 'device' ? 31 : 44 }} />
            ))}
          </div>
        </div>
        <ul className="hex-grid">
          {checks.map((c) => {
            const l = QUALITY_LAYERS.find((x) => x.id === c.layer);
            const dim = layer !== 'all' && layer !== c.layer;
            return (
              <li key={c.name} className={`hex ${lit === c.i ? 'is-lit' : ''} ${dim ? 'is-dim' : ''}`} style={{ '--lc': l.color, '--i': c.i }} tabIndex={0}>
                <span className="hex-ico"><Icon name={c.icon} size={22} /></span>
                <strong>{c.name}</strong>
                <small>{c.line}</small>
              </li>
            );
          })}
        </ul>
      </div>
      {withLink ? (
        <div className="container radar-foot reveal">
          <Link to="/quality-and-data-security" className="link-arrow light">Explore quality & security <Icon name="arrow" size={16} /></Link>
          <Link to="/profiling" className="link-arrow light">Profiling & quality score <Icon name="arrow" size={16} /></Link>
        </div>
      ) : null}
    </section>
  );
}

// Verification & Validation Protocols — ID card travelling through a scanner pipeline
export function VerificationScanner() {
  const [vref, visible] = useInView({ once: false, threshold: 0, rootMargin: '100px 0px' });
  const [g, setG] = useState(0);
  useEffect(() => {
    if (!visible) return undefined; // pause when off-screen
    const t = setInterval(() => setG((x) => (x + 1) % (VERIFICATION_PROTOCOLS.length + 1)), 1500);
    return () => clearInterval(t);
  }, [visible]);
  return (
    <section ref={vref} className="section scanner" aria-labelledby="vp-title">
      <div className="container scan-row">
        <div className="scan-copy reveal">
          <p className="eyebrow">Verification & Validation Protocols</p>
          <h2 id="vp-title">Multi-layer authentication that <span className="hl-blue">protects integrity</span></h2>
          <p className="sec-sub">We implement multi-layer authentication to ensure community integrity. Our quality verification team also conducts manual reviews to validate professional credentials and employment authenticity where applicable.</p>
          <div className="scan-id" aria-hidden="true">
            <div className={`id-card ${g >= VERIFICATION_PROTOCOLS.length ? 'is-ok' : ''}`}>
              <div className="id-photo"><Icon name="user" size={30} /></div>
              <div className="id-lines"><i /><i /><i /></div>
              <div className="id-stamp"><Icon name="check" size={22} stroke={3} /> Verified</div>
              <div className="id-laser" />
            </div>
          </div>
        </div>
        <ol className="pipeline reveal">
          {VERIFICATION_PROTOCOLS.map((p, i) => (
            <li key={p.name} className={`pipe ${i < g ? 'done' : ''} ${i === g ? 'now' : ''}`}>
              <span className="pipe-node"><Icon name={i < g ? 'check' : p.icon} size={20} stroke={i < g ? 2.6 : 1.8} /></span>
              <div>
                <h3>{p.name}</h3>
                <p>{p.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Privacy vault — dial-lock animation + promises
export function PrivacyVault() {
  return (
    <section className="section vault" aria-labelledby="vault-title">
      <div className="container vault-row">
        <div className="vault-art reveal" aria-hidden="true">
          <div className="vault-door">
            <div className="vault-dial">{Array.from({ length: 12 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}<span><Icon name="lock" size={34} /></span></div>
          </div>
          <div className="vault-bolts">{[0, 1, 2].map((i) => <b key={i} />)}</div>
        </div>
        <div className="vault-copy reveal">
          <p className="eyebrow eyebrow-light">Your privacy</p>
          <h2 id="vault-title">Your details are <span className="grad-text">secured with us.</span></h2>
          <p className="vault-lead">We don’t share your personal details with anyone else. Period.</p>
          <ul className="vault-list">
            {PRIVACY_PROMISES.map((p) => (
              <li key={p.title}><Icon name="check" size={18} stroke={2.6} /><div><strong>{p.title}</strong><span>{p.line}</span></div></li>
            ))}
          </ul>
          <div className="vault-iso">
            <FrLogo variant="mono" width={56} height={59} />
            <p>Operated by Frequent Research — <strong>{BRAND.iso.join(' · ')}</strong> certified.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
