import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { asset } from '../lib/asset.js';
import { LANGUAGES } from '../i18n/languages.js';
import { useI18n } from '../i18n/index.jsx';
import { languageChime, wipe } from '../lib/sound.js';
import { lockScroll } from '../lib/host.js';

const norm = (s) => s.toLocaleLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Choose a language: signature chime + scan-beam sound, the store switches palette / direction / text. */
export function chooseLanguage(dispatch, code) {
  wipe();
  setTimeout(() => languageChime(code), 120);
  dispatch({ type: 'lang', lang: code });
  try {
    if (!(window.MHO_CONFIG && window.MHO_CONFIG.embedded)) {
      const u = new URL(location.href);
      u.searchParams.set('lang', code);
      history.replaceState(history.state, '', u);
    }
  } catch { /* ignore */ }
}

/**
 * Language dialog carried over from MyFrequentRewards: instant search (also by the language's name in the current
 * language — typing "chinois" in French finds 简体中文; words that START with what you typed rank first), arrow keys
 * + Enter, focus trap, Esc. Each row shows the flag, the native name, the local name, the palette name and a greeting.
 */
export default function LanguagePicker({ lang, onPick, onClose }) {
  const { t } = useI18n();
  const [q, setQ] = useState('');
  const dq = useDeferredValue(q);
  const [active, setActive] = useState(() => Math.max(0, LANGUAGES.findIndex((l) => l.code === lang)));
  const input = useRef(null);
  const list = useRef(null);
  const ref = useRef(null);

  const names = useMemo(() => {
    let dn = null;
    try { dn = new Intl.DisplayNames([lang === 'zh' ? 'zh-CN' : lang], { type: 'language' }); } catch { /* old browser */ }
    return LANGUAGES.map((l) => {
      let local = '';
      try { local = dn ? dn.of(l.code) || '' : ''; } catch { /* ignore */ }
      return { ...l, local, hay: norm([l.native, l.name, l.code, local, l.theme].join(' ')) };
    });
  }, [lang]);

  const results = useMemo(() => {
    const s = norm(dq.trim());
    if (!s) return names;
    const starts = (l) => l.hay.split(/\s+/).some((w) => w.startsWith(s));
    return names.filter((l) => l.hay.includes(s)).sort((x, y) => Number(starts(y)) - Number(starts(x)));
  }, [dq, names]);

  useEffect(() => {
    const prev = document.activeElement;
    const id = requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
    lockScroll(true);
    return () => { cancelAnimationFrame(id); lockScroll(false); prev?.focus?.({ preventScroll: true }); };
  }, []);
  useEffect(() => { if (dq) setActive(0); }, [dq]);
  useEffect(() => { list.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' }); }, [active]);

  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter' && results[active]) { e.preventDefault(); onPick(results[active].code); }
    else if (e.key === 'Tab') {
      const f = ref.current.querySelectorAll('input,button');
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  };

  return (
    <div className="modal-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="lp" role="dialog" aria-modal="true" aria-labelledby="lp-title" ref={ref} onKeyDown={onKey}>
        <div className="lp-head">
          <h2 id="lp-title"><span className="lp-globe" aria-hidden="true">🌐</span>{t('chooseLanguage')}</h2>
          <button className="icon-btn" type="button" onClick={onClose} aria-label={t('close')}>✕</button>
        </div>
        <label className="lp-search">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.2" /><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('langSearch')} aria-label={t('langSearch')}
            role="combobox" aria-expanded="true" aria-controls="lp-list" aria-activedescendant={results[active] ? 'lp-' + results[active].code : undefined}
            autoComplete="off" spellCheck="false" />
        </label>
        <ul className="lp-list" id="lp-list" role="listbox" ref={list} aria-label={t('chooseLanguage')}>
          {!results.length && <li className="lp-empty">{t('langNone')}</li>}
          {results.map((l, i) => {
            const pal = l.dark;
            return (
              <li key={l.code} id={'lp-' + l.code} role="option" aria-selected={l.code === lang} data-i={i}
                className={'lp-item' + (i === active ? ' is-active' : '') + (l.code === lang ? ' is-current' : '')}
                style={{ '--la': pal.c1, '--lb': pal.c2, '--lc': pal.c3, '--k': i }}
                onMouseMove={() => active !== i && setActive(i)} onClick={() => onPick(l.code)}>
                <img className="lp-flag" src={asset(`images/flags/${l.flag}.svg`)} width="28" height="28" alt="" />
                <span className="lp-names"><bdi lang={l.code}><b>{l.native}</b></bdi><small>{l.local && l.local !== l.native ? l.local : l.name} · {l.theme}</small></span>
                <span className="lp-hi" lang={l.code} aria-hidden="true">{l.greet}</span>
                <span className="lp-dots" aria-hidden="true"><i /><i /><i /></span>
                {l.code === lang && <svg className="lp-check" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
