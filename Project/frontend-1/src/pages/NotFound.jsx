import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import Seo from '../seo/Seo.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | MyFrequentRewards — Earn Money Online" description="This page has moved or no longer exists. Explore MyFrequentRewards paid surveys, rewards, blogs and help — or head back to the homepage to start earning." path="/404" noindex />
      <section className="nf">
        <div className="nf-orbit" aria-hidden="true"><span>4</span><span className="nf-coin"><Icon name="gift" size={54} /></span><span>4</span></div>
        <h1>This page wandered off.</h1>
        <p className="muted">The link may be old or mistyped. Your rewards are still right where you left them.</p>
        <div className="nf-links">
          <Link to="/" className="btn btn-primary">Back to home</Link>
          <Link to="/blog" className="btn btn-ghost-dark">Read the blogs</Link>
          <Link to="/contact-us" className="btn btn-ghost-dark">Get help</Link>
        </div>
      </section>
    </>
  );
}
