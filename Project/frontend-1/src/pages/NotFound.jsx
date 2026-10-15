// 404 — the heartbeat "flatlines", then recovers when you pick a destination.
import Icon from '../components/Icon.jsx';
import { Link } from '../router.jsx';
import { LiveZone } from '../components/ui.jsx';

const LINKS = [
  ['/', 'home', 'Home'], ['/earn', 'coins', 'Ways to earn'], ['/how-it-works', 'pulse', 'How it works'],
  ['/blog', 'book', 'Blogs & guides'], ['/faq', 'info', 'FAQ'], ['/contact', 'chat', 'Contact'],
];

export default function NotFound() {
  return (
    <section className="nf">
      <div className="container nf-inner">
        <LiveZone className="nf-monitor" aria-hidden="true">
          <svg viewBox="0 0 600 140" preserveAspectRatio="none">
            <path className="nf-line" d="M0 80 H120 l14 -40 18 80 16 -60 12 20 H300 H600" pathLength="100" />
          </svg>
          <span className="nf-code">404</span>
        </LiveZone>
        <h1>This page has no pulse</h1>
        <p>The link may be old or mistyped. Pick a destination and we'll get your heart racing again.</p>
        <ul className="nf-links">
          {LINKS.map(([to, ic, l]) => <li key={to}><Link to={to}><Icon name={ic} size={18} />{l}</Link></li>)}
        </ul>
      </div>
    </section>
  );
}
