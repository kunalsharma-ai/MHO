import { useState } from 'react';
import { Link } from '../router.jsx';
import { SITE, whatsappLink } from '../config/site.js';
import { Logo } from './Brand.jsx';
import Icon from './Icon.jsx';
import { LiveZone } from './ui.jsx';
import frLogo from '../assets/brand/frequent-research-logo.webp';
import iso9001 from '../assets/brand/aff-iso-9001.webp';
import iso27001 from '../assets/brand/aff-iso-27001.webp';
import iso20252 from '../assets/brand/aff-iso-20252.webp';
import esomar from '../assets/brand/aff-esomar-member.webp';
import msme from '../assets/brand/aff-msme-registered.webp';
import qrFacebook from '../assets/qr/facebook-qr.svg';
import qrLinkedin from '../assets/qr/linkedin-qr.svg';
import qrYoutube from '../assets/qr/youtube-qr.svg';
import qrInstagram from '../assets/qr/instagram-qr.svg';

const QR = { facebook: qrFacebook, linkedin: qrLinkedin, youtube: qrYoutube, instagram: qrInstagram };

export const BADGES = [
  { img: iso9001, name: 'ISO 9001:2015', what: 'Quality management', round: true },
  { img: iso27001, name: 'ISO 27001', what: 'Information security', round: true },
  { img: iso20252, name: 'ISO 20252:2019', what: 'Market research standard', round: true },
  { img: esomar, name: 'ESOMAR', what: 'Member, global research body' },
  { img: msme, name: 'MSME', what: 'Registered with Govt. of India' },
];

const COLS = [
  { title: 'Platform', links: [['/about-us', 'About Us'], ['/how-it-works', 'How It Works'], ['/rewards', 'Rewards'], ['/trust-safety', 'Trust & Safety'], ['/reviews', 'Member Reviews']] },
  { title: 'Who It’s For', links: [['/healthcare-professionals', 'Healthcare Professionals'], ['/caregivers', 'Caregivers'], ['/patients', 'Patients'], ['/earn', 'Consumers & Everyone'], ['/earn#countries', '55 Countries'], ['/blog', 'Blogs & Guides']] },
  { title: 'Help & Legal', links: [['/faq', 'FAQ'], ['/contact', 'Contact & Support'], ['/privacy', 'Privacy Policy'], ['/cookies', 'Cookie Policy'], ['/terms', 'Terms of Use'], ['/gdpr', 'GDPR Compliance'], ['/profiling', 'Profiling & Quality Score']] },
];

/** Certification badges: each floats on its own rhythm and flips to explain itself on hover/focus. */
export function BadgeParade({ light = false }) {
  return (
    <ul className={`badge-parade ${light ? 'is-light' : ''}`}>
      {BADGES.map((b, i) => (
        <li key={b.name} className={`bp-item ${b.round ? 'is-round' : ''}`} style={{ '--i': i }} tabIndex={0}>
          <span className="bp-inner">
            <span className="bp-front"><img src={b.img} alt={`${b.name} — ${b.what}`} loading="lazy" decoding="async" /><span className="fr-shine" /></span>
            <span className="bp-back"><b>{b.name}</b><small>{b.what}</small></span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Frequent Research: the full logo on a tilting glass card. */
export function FrShowcase() {
  return (
    <div className="fr-show">
      <span className="frs-card">
        <img src={frLogo} alt="Frequent Research Fieldwork Solutions — Insights, Analytics, Growth. An ISO certified company" width="589" height="314" loading="lazy" />
        <span className="fr-shine" aria-hidden="true" />
      </span>
    </div>
  );
}

function SocialOrb({ s, i }) {
  const [open, setOpen] = useState(false);
  return (
    <li className={`sorb sorb-${s.id} ${open ? 'is-open' : ''}`} style={{ '--i': i }}>
      <a href={s.url} target="_blank" rel="noopener noreferrer" className="sorb-ic" aria-label={`MyHealthOpinions on ${s.label}`}>
        <Icon name={s.id} size={22} />
      </a>
      <button type="button" className="sorb-qr" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={`${open ? 'Hide' : 'Show'} ${s.label} QR code`}>
        <Icon name="dashboard" size={12} />
      </button>
      <span className="sorb-pop" aria-hidden={!open}>
        <img src={QR[s.id]} alt={`QR code for MyHealthOpinions on ${s.label}`} width="104" height="104" loading="lazy" />
        <small>{s.handle}</small>
      </span>
    </li>
  );
}

export default function Footer({ onCookieSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <LiveZone className="footer-stage">
        <div className="footer-aurora" aria-hidden="true"><i /><i /><i /></div>
        <svg className="footer-ecg" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 50 H420 l18 -30 22 56 20 -70 18 52 14 -8 H900 l14 -18 16 34 14 -16 H1440" pathLength="100" />
        </svg>

        <div className="container footer-cta">
          <div className="fc-stack" aria-hidden="true">
            {['₹', '$', '€', '£'].map((c, i) => <span key={c} className="fc-coin" style={{ '--i': i }}><b>{c}</b></span>)}
          </div>
          <div className="fc-copy">
            <h2>Your experience already has value. <span>Start collecting it.</span></h2>
            <p>Free to join. No investment, ever. Rewards land through PayPal, Wire Transfer or Amazon Gift Cards — and UPI if you live in India.</p>
          </div>
          <Link to="/join" className="btn btn-gold"><span className="btn-label">Create free account</span><Icon name="arrow" size={18} /></Link>
        </div>

        <div className="container footer-main">
          <div className="fm-brand">
            <Link to="/" aria-label="MyHealthOpinions home" className="fm-logo"><Logo size={44} onDark /></Link>
            <p>A healthcare research community where doctors, nurses, caregivers and patients get paid for honest opinions — and help shape better care while they are at it.</p>
            <ul className="fm-social" aria-label="Social media">
              {SITE.socials.map((s, i) => <SocialOrb key={s.id} s={s} i={i} />)}
            </ul>
          </div>
          {COLS.map((c) => (
            <nav key={c.title} className="fm-col" aria-label={c.title}>
              <h3>{c.title}</h3>
              <ul>{c.links.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul>
            </nav>
          ))}
          <div className="fm-col fm-contact">
            <h3>Reach us</h3>
            <ul>
              <li><Icon name="pin" size={16} /><span>{SITE.address.join(', ')}</span></li>
              <li><Icon name="call" size={16} /><a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a></li>
              <li><Icon name="mail" size={16} /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Icon name="whatsapp" size={16} /><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappDisplay}</a></li>
            </ul>
          </div>
        </div>

        <div className="container footer-trust">
          <div className="ft-fr">
            <span className="ft-label">Powered by</span>
            <FrShowcase />
          </div>
          <div className="ft-badges">
            <span className="ft-label">Certified &amp; affiliated</span>
            <BadgeParade />
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {year} {SITE.legalName} (d/b/a MyHealthOpinions). All rights reserved.</p>
          <div>
            <Link to="/sitemap">Sitemap</Link>
            <button type="button" onClick={onCookieSettings}>Cookie settings</button>
          </div>
        </div>
      </LiveZone>
    </footer>
  );
}
