import Icon from './Icon.jsx';

// Floating-label field wrapper with live valid / invalid state (used by the sign-up and set-password forms).
export default function Field({ id, label, error, ok, hint, children, half, icon }) {
  return (
    <div className={`sx-field ${half ? 'half' : ''} ${error ? 'bad' : ''} ${ok ? 'good' : ''}`}>
      <div className="sx-control">
        {icon ? <span className="sx-ico"><Icon name={icon} size={18} /></span> : null}
        {children}
        <label htmlFor={id}>{label}</label>
        <span className="sx-state" aria-hidden="true">{error ? '!' : ok ? <Icon name="check" size={14} stroke={3} /> : null}</span>
      </div>
      {error ? <p className="f-err" id={`${id}-err`} role="alert">{error}</p> : hint ? <p className="f-hint" id={`${id}-hint`}>{hint}</p> : null}
    </div>
  );
}
