import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import BrandLogo from './BrandLogo.jsx';
import { BRAND, CONTACT, SOCIALS, whatsappLink } from '../data/site.js';

const COLS = [
  {
    title: 'Earn',
    links: [
      ['/how-it-works', 'How it works'],
      ['/paid-surveys-for-consumers', 'For consumers'],
      ['/paid-surveys-for-professionals', 'For professionals'],
      ['/who-can-join', 'Who can join'],
      ['/rewards-and-payouts', 'Rewards & payouts'],
    ],
  },
  {
    title: 'Learn',
    links: [
      ['/blog', 'Blogs'],
      ['/blog/how-to-earn-money-online-with-surveys', 'How to earn money online'],
      ['/blog/earn-money-online-without-investment', 'Earn without investment'],
      ['/faq', 'FAQ'],
      ['/about-us', 'About us'],
    ],
  },
  {
    title: 'Trust',
    links: [
      ['/privacy', 'Privacy Policy'],
      ['/gdpr', 'GDPR Compliance'],
      ['/cookies', 'Cookies Policy'],
      ['/terms', 'Terms of Use'],
      ['/profiling', 'Profiling & Quality Score'],
      ['/quality-and-data-security', 'Quality & security'],
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-aurora" aria-hidden="true" />

      <section className="social-stage container" aria-labelledby="social-title">
        <div className="social-intro">
          <p className="eyebrow eyebrow-light">Follow the rewards</p>
          <h2 id="social-title" className="social-title">
            Scan. Follow. <span className="grad-text">Get first dibs.</span>
          </h2>
          <p className="muted-light">Survey drops, payout tips and member stories — on the channels you already use. Hover a card to reveal its QR code.</p>
        </div>
        <ul className="social-grid">
          {SOCIALS.map((s, i) => (
            <li key={s.id} className="social-card" style={{ '--sc': s.color, '--d': `${i * 0.12}s` }}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`MyFrequentRewards on ${s.name} (opens in new tab)`}>
                <div className="social-inner">
                  <div className="social-front">
                    <span className="social-ico"><Icon name={s.id} size={30} /></span>
                    <strong>{s.name}</strong>
                    <small>{s.handle}</small>
                    <em>{s.cta} <Icon name="arrow" size={14} /></em>
                  </div>
                  <div className="social-back">
                    <img src={s.qr} alt={`QR code to open MyFrequentRewards ${s.name}`} width="132" height="132" loading="lazy" />
                    <small>Scan to open {s.name}</small>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="container footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label="MyFrequentRewards home">
            <BrandLogo width={200} />
          </Link>
          <p className="footer-motto">{BRAND.motto}</p>
          <p className="muted-light small">
            The global consumer and business opinion community of{' '}
            <a href={BRAND.parent.url} target="_blank" rel="noopener noreferrer">Frequent Research</a>.
          </p>
          <div className="iso-badges" aria-label="Certifications of Frequent Research">
            {BRAND.iso.map((i) => (
              <span key={i} className="iso-pill"><Icon name="badge" size={14} /> {i}</span>
            ))}
          </div>
        </div>

        {COLS.map((c) => (
          <nav key={c.title} className="footer-col" aria-label={c.title}>
            <h3>{c.title}</h3>
            <ul>
              {c.links.map(([to, label]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer-col footer-contact">
          <h3>Contact</h3>
          <ul>
            <li><Icon name="pin" size={16} /> {CONTACT.address.street}, {CONTACT.address.city} – {CONTACT.address.postalCode}</li>
            <li><Icon name="phone" size={16} /> <a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
            <li><Icon name="whatsapp" size={16} /> <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">{CONTACT.whatsappDisplay}</a></li>
            <li><Icon name="mail" size={16} /> <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-row">
          <p>Copyright {year} © {BRAND.legalName} ({BRAND.dba}). All Rights Reserved.</p>
          <p className="footer-safe"><Icon name="lock" size={14} /> We never sell or share your personal details.</p>
        </div>
      </div>
    </footer>
  );
}
