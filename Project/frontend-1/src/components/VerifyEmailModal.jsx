import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// "Verify your email" popup shown right after the account is created and the email has been sent.
export default function VerifyEmailModal({ email, cooldown = 0, busy = false, message = '', onResend, onClose }) {
  const cardRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose; // keep the effect below from re-running (and stealing focus) on every parent render

  useEffect(() => {
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    cardRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !cardRef.current) return;
      const items = [...cardRef.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === cardRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      if (previous && previous.focus) previous.focus();
    };
  }, []);

  return (
    <div className="vm-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="vm-card" role="dialog" aria-modal="true" aria-labelledby="vm-title" aria-describedby="vm-desc" tabIndex={-1} ref={cardRef}>
        <button type="button" className="vm-x" onClick={onClose} aria-label="Close"><Icon name="close" size={18} /></button>
        <div className="vm-ico" aria-hidden="true"><Icon name="mail" size={38} stroke={1.8} /></div>
        <h2 id="vm-title">Verify your email id</h2>
        <p id="vm-desc">We’ve sent a verification link to</p>
        <p className="vm-mail">{email}</p>
        <ol className="vm-steps">
          <li><span>1</span> Open the email from MyFrequentRewards</li>
          <li><span>2</span> Click <strong>Verify email address</strong></li>
          <li><span>3</span> Create your password and you’re in</li>
        </ol>
        <p className="vm-tip">Can’t find it? Check your spam or promotions folder.</p>
        <p className="vm-msg" role="status" aria-live="polite">{message}</p>
        <div className="vm-actions">
          <button type="button" className="btn btn-ghost-dark" onClick={onResend} disabled={busy || cooldown > 0}>
            {busy ? 'Sending…' : cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend email'}
          </button>
          <button type="button" className="btn btn-primary" onClick={onClose}>Got it</button>
        </div>
      </div>
    </div>
  );
}
