import { memo } from 'react';
import { LANG_BY_CODE } from '../lib/languages.js';
import { countryFlag } from '../lib/asset.js';
import { useI18n } from '../lib/i18n.js';
import { levelOf, usd } from '../lib/rewards.js';
import Logo from './Logo.jsx';
import Counter from './Counter.jsx';

/**
 * Section header (sits inside the dashboard, sticky within the section):
 * animated logo · Reward Points pill · Quality Score pill (ring gauge) · language · sound · theme.
 * The reward tokens fly into #mho-pts and #mho-qs.
 */
function SectionHeader({ lang, theme, muted, pts, qs, maxQs, onLang, onTheme, onSound, onRewards }) {
  const { t, nf } = useI18n();
  const L = LANG_BY_CODE[lang] || LANG_BY_CODE.en;
  const lv = levelOf(qs);
  const ring = maxQs ? Math.min(100, Math.round((qs / maxQs) * 100)) : 0;
  return (
    <header className="shead">
      <div className="shead-in">
        <div className="shead-brand">
          <Logo size={38} />
          <span className="shead-tag">{t('brand.tag')}</span>
        </div>
        <div className="shead-tools">
          <button type="button" className="hpill pts" id="mho-pts" onClick={onRewards} title={usd(pts, lang)}
            aria-label={t('hdr.ptsAria', { n: nf.format(pts), usd: usd(pts, lang) })}>
            <span className="hp-ico" aria-hidden="true"><i className="coin" /><i className="coin c2" /></span>
            <span className="hp-txt">
              <small aria-hidden="true">{t('hdr.pts')}</small>
              <Counter value={pts} format={(n) => nf.format(n)} className="hp-num" ticks />
            </span>
          </button>
          <button type="button" className="hpill qs" id="mho-qs" onClick={onRewards}
            aria-label={t('hdr.qsAria', { n: nf.format(qs), level: t('lv.' + lv.key) + (lv.rank ? ' ' + lv.rank : '') })}>
            <span className="hp-ring" aria-hidden="true" style={{ '--v': ring }}>
              <svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" className="trk" /><circle cx="18" cy="18" r="15" className="val" pathLength="100" /></svg>
              <i className="hp-heart">♥</i>
            </span>
            <span className="hp-txt">
              <small aria-hidden="true">{t('hdr.qs')}</small>
              <Counter value={qs} format={(n) => nf.format(n)} className="hp-num" />
            </span>
            <span className="hp-lvl" aria-hidden="true" title={t('lv.' + lv.key)}>{lv.emoji}</span>
          </button>
          <span className="shead-sep" aria-hidden="true" />
          <button className="lang-btn" type="button" onClick={onLang} aria-haspopup="dialog" aria-label={t('lang.title') + ': ' + L.native}>
            <img src={countryFlag(L.flag)} width="28" height="21" alt="" />
            <span className="lb-name" lang={L.code}>{L.native}</span>
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
        </div>
      </div>
    </header>
  );
}
export default memo(SectionHeader);
