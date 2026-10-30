// Consent banner: essential cookies always on; analytics (GA4) only after opt-in.
import { useEffect, useState } from 'react';
import { Link } from '../router.jsx';
import Icon from './Icon.jsx';
import { store, loadAnalytics } from '../utils/helpers.js';

export const openCookieSettings = () => window.dispatchEvent(new Event('mho-cookie-settings'));

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const c = store.get('mho-consent');
    if (c) {
      setAnalytics(!!c.analytics);
      if (c.analytics) loadAnalytics();
    } else {
      const t = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const open = () => setShow(true);
    window.addEventListener('mho-cookie-settings', open);
    return () => window.removeEventListener('mho-cookie-settings', open);
  }, []);

  const save = (a) => {
    store.set('mho-consent', { analytics: a, at: new Date().toISOString() });
    setAnalytics(a);
    if (a) loadAnalytics();
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="cookie" role="dialog" aria-label="Cookie preferences">
      <div className="cookie-icon" aria-hidden="true"><Icon name="cookie" size={26} /></div>
      <div className="cookie-copy">
        <strong>Cookies, the healthy kind</strong>
        <p>Essential cookies keep you signed in and secure. With your permission we also use analytics cookies to improve the site. <Link to="/cookies">Cookie Policy</Link></p>
        <label className="cookie-toggle">
          <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
          <span aria-hidden="true" /> Allow analytics cookies
        </label>
      </div>
      <div className="cookie-actions">
        <button className="btn btn-ghost btn-sm" onClick={() => save(false)}><span className="btn-label">Essential only</span></button>
        <button className="btn btn-primary btn-sm" onClick={() => save(analytics || true)}><span className="btn-label">{analytics ? 'Save choices' : 'Accept all'}</span></button>
      </div>
    </div>
  );
}
