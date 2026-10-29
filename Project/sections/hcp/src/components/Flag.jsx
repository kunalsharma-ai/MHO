import { memo } from 'react';
import { asset } from '../lib/asset.js';
import { STATE_FLAGS } from '../lib/stateFlags.js';

const emojiFlag = (cc) => (/^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(...[...cc].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : '🏳️');

/** Country flag as an image (emoji flags do not render on Windows). */
export const Flag = memo(function Flag({ cc, size = 22, className = '' }) {
  if (!cc || !/^[A-Za-z]{2}$/.test(cc)) return <span className={'flag flag-x ' + className} aria-hidden="true">🌐</span>;
  return (
    <img className={'flag ' + className} src={asset(`images/flags/w/${cc.toLowerCase()}.webp`)} width={size} height={Math.round(size * 0.75)}
      alt="" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.replaceWith(Object.assign(document.createElement('span'), { className: 'flag flag-x', textContent: emojiFlag(cc.toUpperCase()) })); }} />
  );
});

/**
 * State / province flag: the real flag where one exists in public/images/flags/states (US, CA, AU, DE, ES, MX, CO, GB),
 * otherwise a badge made of the country flag and the state code (e.g. 🇮🇳 MH).
 */
export const StateFlag = memo(function StateFlag({ code, size = 26 }) {
  if (!code) return null;
  if (STATE_FLAGS.has(code)) {
    return <img className="flag sflag" src={asset(`images/flags/states/${code}.webp`)} width={size} height={Math.round(size * 0.66)} alt="" loading="lazy" decoding="async" />;
  }
  const [cc, sub] = String(code).split('-');
  return (
    <span className="sbadge" aria-hidden="true">
      <img src={asset(`images/flags/w/${(cc || '').toLowerCase()}.webp`)} width="30" height="22" alt="" loading="lazy" decoding="async" />
      <b>{(sub || cc || '').slice(0, 3)}</b>
    </span>
  );
});
