import { useRef } from 'react';
import Icon from './Icon.jsx';
import { PANELS } from './R8.jsx';

// The three panels as animated tabs, used on sign-up (/join) and log-in (/login).
// Picking one is a real choice: on sign-up it sets the panel the account is created for (the same value as the
// "Your panel" step), and on log-in it restyles the page for that panel. Only transform and opacity animate.
const SHORT = { hcp: 'Professional', caregiver: 'Caregiver', patient: 'Patient' };

export default function PanelTabs({ value, onChange, label = 'I am a', lines = {}, disabled = [], hint = '' }) {
  const refs = useRef([]);
  const idx = PANELS.findIndex((p) => p.id === value);
  const pick = (p) => { if (!disabled.includes(p.id)) onChange(p.id); };
  // arrow keys move between the enabled tabs, like any radio group
  const onKey = (e, i) => {
    const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    for (let n = 1; n <= PANELS.length; n++) {
      const j = (i + dir * n + PANELS.length) % PANELS.length;
      if (!disabled.includes(PANELS[j].id)) { refs.current[j]?.focus(); onChange(PANELS[j].id); return; }
    }
  };
  const line = value ? lines[value] : '';
  return (
    <div className={`ptabs ${value ? `is-${value}` : 'is-none'}`} style={{ '--i': Math.max(idx, 0) }} data-mode-skip="">
      <p className="ptabs-label" id="ptabs-label">{label}</p>
      <div className="ptabs-track" role="radiogroup" aria-labelledby="ptabs-label">
        <span className="ptabs-glider" aria-hidden="true"><i className="g-hcp" /><i className="g-caregiver" /><i className="g-patient" /></span>
        {PANELS.map((p, i) => {
          const on = value === p.id;
          const off = disabled.includes(p.id);
          return (
            <button
              key={p.id}
              ref={(el) => { refs.current[i] = el; }}
              type="button"
              role="radio"
              aria-checked={on}
              aria-disabled={off || undefined}
              tabIndex={on || (!value && i === 0) ? 0 : -1}
              className={`ptab pt-${p.id} t-${p.id} ${on ? 'on' : ''} ${off ? 'off' : ''}`}
              onClick={() => pick(p)}
              onKeyDown={(e) => onKey(e, i)}
              title={off ? hint : undefined}
            >
              <span className="ptab-art" aria-hidden="true">
                <span className="ptab-ring" />
                <span className="ptab-ring r2" />
                <span className="ptab-ic"><Icon name={p.ic} size={22} /></span>
                <span className="ptab-fx"><i /><i /><i /><i /></span>
              </span>
              <span className="ptab-txt">
                <b><span className="long">{p.t}</span><span className="short">{SHORT[p.id]}</span></b>
                <small>{p.s}</small>
              </span>
              {on && <span className="ptab-burst" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map((k) => <i key={k} style={{ '--k': k }} />)}</span>}
            </button>
          );
        })}
      </div>
      {(line || hint) && <p className="ptabs-line" key={value || 'none'} aria-live="polite">{line || hint}</p>}
    </div>
  );
}
