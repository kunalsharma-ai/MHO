// src/components/GenderPicker.jsx
// Segmented radio group. Same static label + hint pattern as the DOB field,
// so both fields line up in the same grid row.
export default function GenderPicker({ id = 'gender', value, options, onChange, invalid, describedBy, onBlur }) {
  return (
    <div
      id={id}
      className="sx-gender"
      role="radiogroup"
      aria-labelledby={`${id}-lbl`}
      aria-invalid={invalid ? 'true' : 'false'}
      aria-describedby={describedBy}
      tabIndex={invalid ? -1 : undefined}
      onBlur={onBlur}
    >
      {options.map((g) => (
        <label key={g} className={value === g ? 'on' : ''}>
          <input
            type="radio"
            name={id}
            value={g}
            checked={value === g}
            onChange={() => onChange(g)}
          />
          <span>{g}</span>
        </label>
      ))}
    </div>
  );
}

/* ---- add this CSS to your signup stylesheet (the one that has .sx-field / .sx-static-label) ----

.sx-gender { display: flex; gap: 8px; min-height: var(--sx-ctl-h, 52px); outline: none; }
.sx-gender label {
  position: relative; flex: 1 1 0; display: flex; align-items: center; justify-content: center;
  padding: 0 10px; border: 1.5px solid var(--line); border-radius: 14px; background: #fff;
  font-weight: 700; font-size: .92rem; color: var(--ink-2); cursor: pointer; user-select: none;
  transition: border-color .2s, background .2s, color .2s;
}
.sx-gender label:hover { border-color: var(--orange); }
.sx-gender label.on { border-color: var(--orange); background: var(--paper-3); color: var(--ink); }
.sx-gender label:focus-within { outline: 3px solid var(--orange); outline-offset: 1px; }
.sx-gender input { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
.sx-field.bad .sx-gender label { border-color: #EF4444; }

*/