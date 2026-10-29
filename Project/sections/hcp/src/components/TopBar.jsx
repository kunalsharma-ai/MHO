import { memo } from 'react';
import { asset } from '../lib/asset.js';
import { LANG_BY_CODE } from '../i18n/languages.js';
import { useI18n } from '../i18n/index.jsx';
import { AnimatedLogo } from './Brand.jsx';
import RollNumber from './RollNumber.jsx';

/**
 * Section header of the HCP dashboard "My Profile" tab (sticky inside the section).
 *   • animated MyHealthOpinions logo + "My Profile"
 *   • reward wallet: Reward Points (#rw-pts, amber capsule) and Quality Score (#rw-qs, live heartbeat) — the reward
 *     tokens fly into these two pills when a profile is completed; digits roll to the new total
 *   • profile counter ring (done / total)
 *   • language, sound and theme
 */
function TopBar({ lang, theme, soundOn, points = 0, quality = 0, done = 0, total = 0, onLang, onTheme, onSound, onRewards }) {
  const { t, fmtNum } = useI18n();
  const L = LANG_BY_CODE[lang] || LANG_BY_CODE.en;
  const ptsLabel = t('walletPts', { n: fmtNum(points) });
  const qsLabel = t('walletQsPlain', { n: fmtNum(quality) });
  const pct = total ? Math.round((done / total) * 100) : 0;
  const go = (e) => { e.preventDefault(); onRewards(); };
  return (
    <header className="topbar" id="hcp-top">
      <div className="tb-left">
        <a className="brand" href="#hcp-root" aria-label="MyHealthOpinions" onClick={(e) => { e.preventDefault(); document.getElementById('hcp-root')?.scrollIntoView({ behavior: 'smooth' }); }}>
          <AnimatedLogo height={34} priority className="tb-full" />
          <AnimatedLogo heart height={32} className="tb-heart" />
        </a>
        <span className="tb-title"><b>{t('tbTitle')}</b><small>{t('brandTag')}</small></span>
      </div>
      <div className="tools">
        <div className="wallet" role="group" aria-label={t('walletTitle')}>
          <a className="w-pill w-pts" id="rw-pts" href="#rewards" onClick={go} aria-label={ptsLabel} title={ptsLabel}>
            <span className="w-ic" aria-hidden="true">
              <svg viewBox="0 0 32 32"><g transform="rotate(-38 16 16)"><rect x="3" y="10" width="26" height="12" rx="6" className="cap-b" /><path d="M9 10h7v12H9a6 6 0 0 1 0-12z" className="cap-a" /><rect x="6.5" y="12.4" width="8" height="2.4" rx="1.2" className="cap-s" /></g></svg>
            </span>
            <span className="w-txt"><RollNumber value={points} format={fmtNum} className="w-num" label={ptsLabel} /><small aria-hidden="true">{t('pts')}</small></span>
          </a>
          <a className="w-pill w-qs" id="rw-qs" href="#rewards" onClick={go} aria-label={qsLabel} title={qsLabel}>
            <span className="w-ic" aria-hidden="true">
              <svg viewBox="0 0 32 32"><path className="qs-heart" d="M16 27S4 19.6 4 11.7C4 7.6 7 5 10.4 5c2.4 0 4.4 1.3 5.6 3.2C17.2 6.3 19.2 5 21.6 5 25 5 28 7.6 28 11.7 28 19.6 16 27 16 27z" /><path className="qs-ecg" d="M6 16h6l2-4 3 8 2-6 2 2h5" pathLength="100" /></svg>
            </span>
            <span className="w-txt"><RollNumber value={quality} format={fmtNum} className="w-num" label={qsLabel} /><small aria-hidden="true">{t('qsShort')}</small></span>
          </a>
          <a className="w-ring" href="#rewards" onClick={go} style={{ '--p': pct }} aria-label={t('overall', { done: fmtNum(done), total: fmtNum(total) })} title={t('overall', { done: fmtNum(done), total: fmtNum(total) })}>
            <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" className="wr-t" /><circle cx="18" cy="18" r="15" className="wr-v" pathLength="100" /></svg>
            <b className="mono" aria-hidden="true">{fmtNum(done)}<small>/{fmtNum(total)}</small></b>
          </a>
        </div>
        <button className="lang-btn" type="button" onClick={onLang} aria-haspopup="dialog" title={t('chooseLanguage')} aria-label={`${t('language')}: ${L.native}`}>
          <img src={asset(`images/flags/${L.flag}.svg`)} width="22" height="22" alt="" />
          <span className="lang-name" lang={L.code}>{L.native}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <button className="icon-btn" type="button" onClick={onSound} aria-pressed={soundOn} aria-label={soundOn ? t('soundOff') : t('soundOn')} title={soundOn ? t('soundOff') : t('soundOn')}>
          <span aria-hidden="true">{soundOn ? '🔊' : '🔇'}</span>
        </button>
        <button className={'theme-btn ' + theme} type="button" onClick={onTheme} aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')} title={theme === 'dark' ? t('themeLight') : t('themeDark')}>
          <span className="sun" aria-hidden="true">☀️</span>
          <span className="moon" aria-hidden="true">🌙</span>
          <i aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
export default memo(TopBar);
