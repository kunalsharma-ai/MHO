"use client";
import "./account-settings-card.css";

const heart = "/member/account-actions/mho-heart.webp";

const LABELS = { active: 'Active', hold: 'On hold', deactivated: 'Deactivated', pending: 'Request in progress' };

/**
 * MyHealthOpinions · "Account Care" card for the dashboard (account section or profile sidebar).
 * Self-contained styles prefixed .mho-acct. theme="light" (default) or "dark".
 *
 * @param {'active'|'hold'|'deactivated'|'pending'} status
 * @param {string} href            route of the Account Care page
 * @param {function} [onNavigate]  (event, 'manage'|'reactivate') for SPA routers
 */
export function AccountSettingsCard({ status = 'active', href = '/account/delete-or-deactivate', onNavigate, theme = 'light' }) {
  const nav = (key) => (onNavigate ? (e) => onNavigate(e, key) : undefined);
  return (
    <section className="mho-acct" data-status={status} data-theme={theme} aria-label="Account care">
      <header className="mho-acct__head">
        <img className="mho-acct__heart" src={heart} alt="" width="34" height="34" />
        <div><b>Account Care</b><small>Take a break, pause or delete</small></div>
        <span className="mho-acct__state">{LABELS[status] || 'Active'}</span>
      </header>
      <svg className="mho-acct__ecg" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true"><path className="base" d="M0 12 H120 L128 4 L136 20 L146 2 L156 22 L164 12 H300" /><path className="run" d="M0 12 H120 L128 4 L136 20 L146 2 L156 22 L164 12 H300" /></svg>
      {status === 'hold' && (
        <a className="mho-acct__btn mho-acct__btn--react" href={`${href}#reactivate`} onClick={nav('reactivate')}>
          <span className="mho-acct__ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" /></svg></span>
          <span className="mho-acct__txt"><b>Reactivate My Account</b><small>Your account is currently on hold</small></span>
          <svg className="mho-acct__go" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </a>
      )}
      <a className="mho-acct__btn mho-acct__btn--manage" href={href} onClick={nav('manage')}>
        <span className="mho-acct__ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12h4l2-5 4 10 2-5h8" /></svg></span>
        <span className="mho-acct__txt"><b>Delete or Deactivate Account</b><small>Password required · Within 7 working days</small></span>
        <svg className="mho-acct__go" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
      </a>
      {status === 'pending' && <p className="mho-acct__note">You have an account request in progress. Track it on the Account Care page.</p>}
    </section>
  );
}
