import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';

// Flag image by ISO code (flagcdn.com — free CDN, 20–40px PNGs). Falls back to the ISO letters if blocked.
export function Flag({ iso, size = 22 }) {
  const [err, setErr] = useState(false);
  const ref = useRef(null);
  // A prerendered <img> can fail before React attaches onError — check once after mount too.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setErr(true);
  }, []);
  if (!iso || err) return <span className="flag flag-fb" style={{ width: size * 1.4, height: size }}>{iso}</span>;
  const code = iso.toLowerCase();
  return (
    <img
      ref={ref}
      className="flag"
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      width={Math.round(size * 1.4)}
      height={size}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setErr(true)}
    />
  );
}

// Accessible searchable combobox for countries / dialling codes.
export default function CountryPicker({ id, list, value, onChange, mode = 'country', placeholder = 'Select country', invalid, describedBy }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hi, setHi] = useState(0);
  const wrap = useRef(null);
  const search = useRef(null);
  const listRef = useRef(null);
  const sel = list.find((c) => c.iso === value);

  const items = useMemo(() => {
    const t = q.trim().toLowerCase().replace(/^\+/, '');
    if (!t) return list;
    return list.filter((c) => c.name.toLowerCase().includes(t) || c.iso.toLowerCase() === t || c.dial.replace('+', '').startsWith(t));
  }, [q, list]);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    setTimeout(() => search.current && search.current.focus(), 30);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => setHi(0), [q]);
  useEffect(() => {
    const el = listRef.current && listRef.current.children[hi];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [hi]);

  const choose = (c) => {
    onChange(c);
    setOpen(false);
    setQ('');
  };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(h + 1, items.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (items[hi]) choose(items[hi]); }
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className={`cp cp-${mode} ${open ? 'is-open' : ''} ${invalid ? 'is-invalid' : ''}`} ref={wrap}>
      <button
        type="button"
        id={id}
        className="cp-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => setOpen((o) => !o)}
      >
        {sel ? <Flag iso={sel.iso} size={mode === 'dial' ? 16 : 18} /> : <Icon name="globe" size={18} />}
        <span className="cp-val">{sel ? (mode === 'dial' ? sel.dial : sel.name) : placeholder}</span>
        <Icon name="chevron" size={16} />
      </button>
      {open ? (
        <div className="cp-pop">
          <div className="cp-search">
            <Icon name="audit" size={16} />
            <input ref={search} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder={mode === 'dial' ? 'Search country or code' : 'Search country'} aria-label="Search countries" aria-controls={`${id}-list`} aria-activedescendant={items[hi] ? `${id}-${items[hi].iso}` : undefined} />
          </div>
          <ul className="cp-list" role="listbox" id={`${id}-list`} ref={listRef}>
            {items.map((c, i) => (
              <li
                key={c.iso}
                id={`${id}-${c.iso}`}
                role="option"
                aria-selected={c.iso === value}
                className={`${i === hi ? 'hi' : ''} ${c.iso === value ? 'sel' : ''}`}
                onMouseEnter={() => setHi(i)}
                onMouseDown={(e) => { e.preventDefault(); choose(c); }}
              >
                <Flag iso={c.iso} size={16} />
                <span className="cp-name">{c.name}</span>
                <span className="cp-dial">{c.dial}</span>
              </li>
            ))}
            {!items.length ? <li className="cp-empty">No match</li> : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
