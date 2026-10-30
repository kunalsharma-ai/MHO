import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ALL_LANGS, intlTag } from '../lib/languages.js';
import { countryFlag } from '../lib/asset.js';
import { getLayer } from '../lib/root.js';
import { useI18n } from '../lib/i18n.js';
import Logo from './Logo.jsx';

const norm = (s) => s.toLocaleLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/**
 * Language picker — the MyFrequentRewards language dialog, carried over: instant search (also by the
 * language's name in the current language, e.g. "chinois" finds 中文), keyboard navigation, two groups
 * (fully translated · more languages), flags, colour swatches. Choosing one triggers the full-screen
 * colour wipe with its greeting (LangWipe) and its signature melody.
 */
export default function LanguagePicker({ lang, onPick, onClose }) {
  const { t } = useI18n();
  const [q, setQ] = useState('');
  const dq = useDeferredValue(q);
  const [active, setActive] = useState(0);
  const input = useRef(null);
  const list = useRef(null);
  const box = useRef(null);

  const names = useMemo(() => {
    let dn = null;
    try { dn = new Intl.DisplayNames([intlTag(lang)], { type: 'language' }); } catch {}
    return ALL_LANGS.map((l) => {
      let local = '';
      try { local = dn ? dn.of(l.code === 'zh' ? 'zh-Hans' : l.code) || '' : ''; } catch {}
      return { ...l, local, hay: norm([l.native, l.name, l.code, local].join(' ')) };
    });
  }, [lang]);
  const results = useMemo(() => {
    const s = norm(dq.trim());
    if (!s) return names;
    const st = (l) => (norm(l.native).startsWith(s) || norm(l.name).startsWith(s) || norm(l.local).startsWith(s) ? 0 : 1);
    return names.filter((l) => l.hay.includes(s)).sort((a, b) => st(a) - st(b));
  }, [dq, names]);
  const full = results.filter((l) => l.full), more = results.filter((l) => !l.full);
  const flat = [...full, ...more];

  useEffect(() => {
    const prev = document.activeElement;
    setActive(Math.max(0, flat.findIndex((l) => l.code === lang)));
    const id = requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
    return () => { cancelAnimationFrame(id); prev?.focus?.({ preventScroll: true }); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (dq) setActive(0); }, [dq]);
  useEffect(() => { list.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' }); }, [active]);

  const pick = (l, e) => onPick(l.code, e);
  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(flat.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter' && flat[active]) { e.preventDefault(); pick(flat[active]); }
    else if (e.key === 'Tab') {
      const f = box.current.querySelectorAll('input,button');
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  };
  let idx = -1;
  const row = (l) => {
    idx++;
    const i = idx;
    return (
      <li key={l.code} id={'mho-lp-' + l.code} role="option" aria-selected={l.code === lang} data-i={i}
        className={'lp-item' + (i === active ? ' is-active' : '') + (l.code === lang ? ' is-current' : '')}
        style={{ '--a': l.palette[0], '--b': l.palette[1], '--c': l.palette[2] }}
        onMouseMove={() => active !== i && setActive(i)} onClick={(e) => pick(l, e)}>
        <img className="lp-flag" src={countryFlag(l.flag)} width="30" height="22" alt="" loading="lazy" />
        <span className="lp-names" lang={l.code} dir={l.dir}><b>{l.native}</b></span>
        <small>{l.local && l.local !== l.native ? l.local : l.name}</small>
        <span className="lp-sw" aria-hidden="true"><i /><i /><i /></span>
        {l.code === lang && <span className="lp-check" aria-hidden="true">✓</span>}
      </li>
    );
  };
  return createPortal(
    <div className="lp-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="lp" role="dialog" aria-modal="true" aria-labelledby="mho-lp-title" ref={box} onKeyDown={onKey}>
        <div className="lp-head">
          <h2 id="mho-lp-title"><Logo mark size={28} /><span className="emo spin" aria-hidden="true">🌐</span>{t('lang.title')}</h2>
          <button className="icon-btn" type="button" onClick={onClose} aria-label={t('close')}>✕</button>
        </div>
        <label className="lp-search">
          <span aria-hidden="true">🔎</span>
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('lang.search')} aria-label={t('lang.search')}
            role="combobox" aria-expanded="true" aria-controls="mho-lp-list" aria-activedescendant={flat[active] ? 'mho-lp-' + flat[active].code : undefined}
            autoComplete="off" spellCheck="false" />
        </label>
        <ul className="lp-list" id="mho-lp-list" role="listbox" ref={list} aria-label={t('lang.title')}>
          {!flat.length && <li className="lp-empty">{t('lang.none')}</li>}
          {!!full.length && <li className="lp-group" role="presentation">✅ {t('lang.full')}</li>}
          {full.map(row)}
          {!!more.length && <li className="lp-group" role="presentation">🤖 {t('lang.more')}</li>}
          {more.map(row)}
        </ul>
      </div>
    </div>,
    getLayer()
  );
}
