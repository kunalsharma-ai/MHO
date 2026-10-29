import Icon from './Icon.jsx';

// Share of the wizard completed: finished steps plus the valid part of the current one.
export function railPct(step, total, fieldCount, errorCount) {
  const part = 1 - errorCount / Math.max(fieldCount, 1);
  return Math.max(0, Math.min(100, Math.round(((step - 1) / total) * 100 + part * (100 / total))));
}

// Progress rail shared by the sign-up page and the page the verification email opens.
// A finished step can be revisited only when `onGo` is given and the step is >= `minGo`.
export default function SxRail({ steps, step, pct, onGo, minGo = 1 }) {
  return (
    <div className="sx-rail">
      <ol>
        {steps.map((s) => {
          const done = s.n < step;
          const canGo = Boolean(onGo) && done && s.n >= minGo;
          return (
            <li key={s.n} className={`${done ? 'done' : ''} ${s.n === step ? 'now' : ''}`}>
              <button type="button" onClick={() => (canGo ? onGo(s.n) : null)} disabled={!canGo && s.n !== step} aria-current={s.n === step ? 'step' : undefined}>
                <span>{done ? <Icon name="check" size={14} stroke={3} /> : <Icon name={s.icon} size={15} />}</span>
                <em>{s.t}</em>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="sx-track"><div className="sx-fill" style={{ width: `${Math.max(4, pct)}%` }}><i className="sx-runner" /></div></div>
      <p className="sx-pct" aria-live="polite">Step {step} of {steps.length} · {pct}% complete</p>
    </div>
  );
}
