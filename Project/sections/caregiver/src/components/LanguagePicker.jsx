import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { asset } from '../lib/asset.js';
import { LANGS } from '../lib/languages.js';
import { useI18n } from '../lib/i18n.js';

const norm = (s) => s.toLocaleLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/**
 * Language dialog carried over from MyFrequentRewards: instant search (also by the language's name in the
 * current language, e.g. typing "chinois" in French finds 中文), keyboard navigation, focus trap.
 * Choosing a language plays its signature melody and a full-screen colour wipe with its greeting (LangWipe).
 */
export default function LanguagePicker({ lang, onPick, onClose }) {
  const { t } = useI18n();
  const [q, setQ] = useState('');
  const dq = useDeferredValue(q);
  const [active, setActive] = useState(() => Math.max(0, LANGS.findIndex((l) => l.code === lang)));
  const input = useRef(null);
  const list = useRef(null);
  const ref = useRef(null);

  const names = useMemo(() => {
    let dn = null;
    try { dn = new Intl.DisplayNames([lang === 'zh' ? 'zh-CN' : lang], { type: 'language' }); } catch { /* old browser */ }
    return LANGS.map((l) => {
      let local = '';
      try { local = dn ? dn.of(l.code) || '' : ''; } catch { /* ignore */ }
      return { ...l, local, hay: norm([l.native, l.name, l.code, local].join(' ')) };
    });
  }, [lang]);

  const results = useMemo(() => {
    const s = norm(dq.trim());
    if (!s) return names;
    // words that START with what was typed come first ("hin" → हिन्दी before Chinese)
    const starts = (l) => l.hay.split(' ').some((w) => w.startsWith(s));
    return names.filter((l) => l.hay.includes(s)).sort((x, y) => Number(starts(y)) - Number(starts(x)));
  }, [dq, names]);

  useEffect(() => {
    const prev = document.activeElement;
    const id = requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
    document.documentElement.classList.add('lock');
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.classList.remove('lock');
      prev?.focus?.({ preventScroll: true });
    };
  }, []);
  useEffect(() => { if (dq) setActive(0); }, [dq]);
  useEffect(() => {
    list.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const pick = (l, e) => onPick(l.code, e);
  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter' && results[active]) { e.preventDefault(); pick(results[active]); }
    else if (e.key === 'Tab') {
      const f = ref.current.querySelectorAll('input,button');
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  };

  return (
    <div className="lp-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="lp" role="dialog" aria-modal="true" aria-labelledby="lp-title" ref={ref} onKeyDown={onKey}>
        <div className="lp-head">
          <h2 id="lp-title"><span className="lp-globe emo" aria-hidden="true">🌐</span>{t('lang.title')}</h2>
          <button className="icon-btn" type="button" onClick={onClose} aria-label={t('close')}>✕</button>
        </div>
        <label className="lp-search">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.2" /><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('lang.search')} aria-label={t('lang.search')}
            role="combobox" aria-expanded="true" aria-controls="lp-list" aria-activedescendant={results[active] ? 'lp-' + results[active].code : undefined}
            autoComplete="off" spellCheck="false" />
        </label>
        <ul className="lp-list" id="lp-list" role="listbox" ref={list} aria-label={t('lang.title')}>
          {!results.length && <li className="lp-empty">{t('lang.none')}</li>}
          {!!results.length && <li className="lp-group" role="presentation">{t('lang.full')}</li>}
          {results.map((l, i) => (
            <li key={l.code} id={'lp-' + l.code} role="option" aria-selected={l.code === lang} data-i={i}
              className={'lp-item' + (i === active ? ' is-active' : '') + (l.code === lang ? ' is-current' : '')}
              style={{ '--a': l.palette[0], '--b': l.palette[1], '--k': i }}
              onMouseMove={() => active !== i && setActive(i)} onClick={(e) => pick(l, e)}>
              <img className="lp-flag" src={asset(`images/flags/${l.flag}.svg`)} width="26" height="26" alt="" />
              <span className="lp-names"><bdi lang={l.code}><b>{l.native}</b></bdi></span>
              <small>{l.local && l.local !== l.native ? l.local : l.name}</small>
              <span className="lp-hi" lang={l.code} aria-hidden="true">{l.greet}</span>
              {l.code === lang && <svg className="lp-check" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
