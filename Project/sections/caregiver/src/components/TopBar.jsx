import { memo } from 'react';
import { asset } from '../lib/asset.js';
import { LANG_BY_CODE } from '../lib/languages.js';
import { useI18n } from '../lib/i18n.js';
import { levelOf, nextLevelOf, levelProgress } from '../lib/rewards.js';
import { AnimatedLogo } from './Brand.jsx';
import RollNumber from './RollNumber.jsx';

/**
 * Section header of the caregiver dashboard "My Profile" tab — a warm ribbon bar:
 *   • animated MyHealthOpinions logo + "My Profile" title
 *   • Profiles / Surveys switch with a sliding underline (scrolls to the section, follows the scroll)
 *   • the Care Wallet: Care Points (#rw-pts, heart-coin) + Quality Score (#rw-qs, rosette with level ring)
 *     — the reward tokens from the Circle of Care fly into these two halves
 *   • MyFrequentRewards-style language button, sound and theme switches
 */
function TopBar({ lang, theme, muted, points = 0, quality = 0, tab, onTab, profilesLeft, onLang, onTheme, onSound, onRewards }) {
  const { t, nf } = useI18n();
  const L = LANG_BY_CODE[lang];
  const lv = levelOf(quality), nx = nextLevelOf(quality);
  const pct = Math.round(levelProgress(quality) * 100);
  const qsLabel = t('qs.pill', { n: nf.format(quality), level: t('lvl.' + lv.key) });
  return (
    <header className="topbar" id="pp-top">
      <div className="tb-left">
        <a className="brand" href="#pp-top" aria-label="MyHealthOpinions" onClick={(e) => { e.preventDefault(); document.getElementById('pp-root')?.scrollIntoView({ behavior: 'smooth' }); }}>
          <AnimatedLogo height={36} priority />
        </a>
        <span className="tb-title" aria-hidden="true"><i>{t('tb.title')}</i></span>
        <nav className="tb-tabs" aria-label={t('tabs.label')} role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'profiles'} className={'tb-tab' + (tab === 'profiles' ? ' on' : '')} onClick={() => onTab('profiles')}>
            <span className="emo" aria-hidden="true">🫶</span>{t('tabs.profiles')}
            {profilesLeft > 0 && <b className="tb-badge num">{nf.format(profilesLeft)}</b>}
          </button>
          <button type="button" role="tab" aria-selected={tab === 'surveys'} className={'tb-tab' + (tab === 'surveys' ? ' on' : '')} onClick={() => onTab('surveys')}>
            <span className="emo" aria-hidden="true">{profilesLeft > 0 ? '🔒' : '💌'}</span>{t('tabs.surveys')}
          </button>
          <i className="tb-ink" aria-hidden="true" style={{ '--x': tab === 'surveys' ? 1 : 0 }} />
        </nav>
      </div>
      <nav className="tools" aria-label={t('tools.label')}>
        <div className="wallet" role="group" aria-label={t('cc.title')}>
          <a className="w-pts" id="rw-pts" href="#rewards" onClick={onRewards} aria-label={t('rw.pill', { n: nf.format(points) })} title={t('rw.pill', { n: nf.format(points) })}>
            <span className="w-coin" aria-hidden="true">♥</span>
            <RollNumber value={points} format={(n) => nf.format(n)} className="w-num" label={t('rw.pill', { n: nf.format(points) })} />
            <small aria-hidden="true">{t('pts')}</small>
          </a>
          <i className="w-sep" aria-hidden="true" />
          <a className="w-qs" id="rw-qs" href="#rewards" onClick={onRewards} style={{ '--lc': lv.c, '--pct': pct }} aria-label={qsLabel}
            title={qsLabel + (nx ? ' · ' + t('qs.toNext', { n: nf.format(nx.min - quality), level: t('lvl.' + nx.key) }) : '')}>
            <span className="w-ros" aria-hidden="true">
              <svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" className="w-trk" /><circle cx="18" cy="18" r="15.5" className="w-val" pathLength="100" /></svg>
              <b>★</b>
            </span>
            <RollNumber value={quality} format={(n) => nf.format(n)} className="w-num" label={qsLabel} />
            <small aria-hidden="true">{t('qs.short')}</small>
          </a>
        </div>
        <button className="lang-btn" type="button" onClick={onLang} aria-haspopup="dialog" title={t('lang.title')}>
          <img src={asset(`images/flags/${L.flag}.svg`)} width="22" height="22" alt="" />
          <span className="lang-btn-name" lang={L.code}>{L.native}</span>
          <span className="lang-btn-label">{t('lang.button')}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
        <button className="icon-btn" type="button" onClick={onSound} aria-pressed={!muted} aria-label={muted ? t('sound.on') : t('sound.off')} title={muted ? t('sound.on') : t('sound.off')}>
          <span className="emo" aria-hidden="true">{muted ? '🔇' : '🔊'}</span>
        </button>
        <button className={'theme-btn ' + theme} type="button" onClick={onTheme} aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')} title={theme === 'dark' ? t('theme.light') : t('theme.dark')}>
          <span className="sun emo" aria-hidden="true">☀️</span>
          <span className="moon emo" aria-hidden="true">🌙</span>
          <i aria-hidden="true" />
        </button>
      </nav>
    </header>
  );
}
export default memo(TopBar);
