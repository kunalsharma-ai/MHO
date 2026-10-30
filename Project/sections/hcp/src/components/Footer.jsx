import { useI18n } from '../i18n/index.jsx';
import { AnimatedLogo, ECG_D } from './Brand.jsx';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="ftr">
      <svg className="ftr-ecg" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true"><path d={ECG_D} /></svg>
      <div className="ftr-in">
        <div className="ftr-brand">
          <AnimatedLogo height={30} />
          <p>{t('footerTag')}</p>
        </div>
        <nav className="ftr-nav" aria-label={t('footerNav')}>
          <a href="https://www.myhealthopinions.com/privacy-policy" rel="noopener">{t('privacy')}</a>
          <a href="https://www.myhealthopinions.com/terms-and-conditions" rel="noopener">{t('terms')}</a>
          <a href="mailto:support@myhealthopinions.com">{t('contact')}</a>
        </nav>
        <p className="ftr-copy mono">{t('footerRights', { y: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
