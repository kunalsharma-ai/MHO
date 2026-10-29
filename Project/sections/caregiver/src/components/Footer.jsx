import { memo } from 'react';
import { useI18n } from '../lib/i18n.js';
import { AnimatedLogo } from './Brand.jsx';

function Footer() {
  const { t } = useI18n();
  const links = (window.MHO_CONFIG && window.MHO_CONFIG.links) || {};
  return (
    <footer className="footer">
      <div className="footer-ecg" aria-hidden="true">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0 20 H600 L616 20 L626 6 L638 34 L650 2 L662 30 L670 20 H1440" fill="none" stroke="rgba(247,181,71,.7)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="foot-inner">
        <div className="foot-brand">
          <span className="plate"><AnimatedLogo height={30} /></span>
          <span>{t('foot.tag')}</span>
        </div>
        <nav className="foot-links" aria-label="Footer">
          <a href={links.privacy || 'https://www.myhealthopinions.com/privacy-policy'} rel="noopener">{t('foot.privacy')}</a>
          <a href={links.terms || 'https://www.myhealthopinions.com/terms-and-conditions'} rel="noopener">{t('foot.terms')}</a>
          <a href={links.help || 'mailto:support@myhealthopinions.com'}>{t('foot.help')}</a>
        </nav>
        <p className="foot-copy" suppressHydrationWarning>{t('foot.copy', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
export default memo(Footer);
