import { useCallback, useEffect, useRef, useState } from 'react';
import { ACTIONS, NEXT_STEPS, PALETTES, SLA_TEXT, paletteVars } from '../../config/actions.js';
import { useAccount } from '../../context/AccountContext.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { useCountdown, useFocusTrap, useReducedMotion, useScrollLock } from '../../hooks/index.js';
import { runFx } from '../../lib/fx.js';
import { sound } from '../../lib/sound.js';
import { wait } from '../../lib/format.js';
import { Icon } from '../Icon.jsx';
import { Object3D } from '../Object3D.jsx';
import { CopyId } from '../CopyId.jsx';

let passwordLockUntil = 0; // survives closing/reopening (the server enforces the real limit)
const STEP_INDEX = { review: 0, warning: 0, verify: 1, confirm: 2, sending: 3, done: 3 };

/** Split wizard: coloured rail with the option + vertical heartbeat stepper, content on the right. */
export function CareWizard({ k, onClose, onTrack, links, showDemoHint }) {
  const A = ACTIONS[k];
  const P = PALETTES[k];
  const { submit, user, verifyPassword, dev } = useAccount();
  const { toast } = useApp();
  const rm = useReducedMotion();
  const first = k === 'del' ? 'warning' : 'review';
  const [step, setStep] = useState(first);
  const [token, setToken] = useState(null);
  const [verifyNotice, setVerifyNotice] = useState('');
  const [submitErr, setSubmitErr] = useState('');
  const [result, setResult] = useState(null);
  const [closing, setClosing] = useState(false);
  const cardRef = useRef(null);
  const paneRef = useRef(null);
  const fxRef = useRef(null);
  const stopFx = useRef(() => {});

  const finish = useCallback((after) => {
    stopFx.current(); setClosing(true);
    setTimeout(() => { onClose(); after?.(); }, rm ? 0 : 240);
  }, [onClose, rm]);
  const close = useCallback(() => { if (step === 'sending' || closing) return; sound.play('close'); finish(); }, [step, closing, finish]);

  useScrollLock(true);
  useFocusTrap(cardRef, true, close);
  useEffect(() => () => stopFx.current(), []);
  useEffect(() => {
    const pane = paneRef.current; if (!pane) return;
    pane.querySelector('.wz-body')?.scrollTo?.({ top: 0 });
    const t = pane.querySelector('[data-autofocus]') || pane.querySelector('h2');
    if (t) { if (t.tagName === 'H2') t.tabIndex = -1; t.focus({ preventScroll: true }); }
  }, [step]);

  const goVerify = () => setStep('verify');
  const onVerified = (t) => { setToken(t); setVerifyNotice(''); setSubmitErr(''); setStep('confirm'); };
  const goBack = () => { setToken(null); setSubmitErr(''); setStep(first); };
  const doSubmit = async () => {
    setSubmitErr(''); setStep('sending');
    const minShow = wait(rm ? 300 : 1800);
    try {
      const req = await submit(k, token, A.apiAction);
      await minShow;
      setResult(req); setStep('done'); sound.play(`done-${k}`);
      requestAnimationFrame(() => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!rm) stopFx.current = runFx(fxRef.current, k, r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null);
      });
    } catch (e) {
      await minShow; sound.play('error');
      if (e.code === 'verification_expired' || e.status === 401) { setToken(null); setVerifyNotice(e.message); setStep('verify'); }
      else if (e.code === 'request_open' || e.status === 409) { toast(e.message, 'alert'); finish(); }
      else { setSubmitErr(e.message || 'We couldn’t submit your request. Please try again.'); setStep('confirm'); }
    }
  };

  const names = [k === 'del' ? 'Warning' : 'Review', 'Verify identity', 'Confirm request', 'Submitted'];
  const idx = STEP_INDEX[step];

  return (
    <div className={`wiz ${closing ? 'closing' : ''}`} style={paletteVars(k)}>
      <div className="wiz-scrim" onClick={close} />
      <canvas ref={fxRef} className="fx" aria-hidden="true" />
      <div className="wiz-card" ref={cardRef} role="dialog" aria-modal="true" aria-labelledby="mho-w-title">
        <aside className="wiz-rail">
          <div className="rail-obj"><Object3D k={k} size={86} /></div>
          <span className="rail-pal"><i />{P.name}</span>
          <b className="rail-type">{A.type}</b>
          <ol className="rail-steps" aria-label={`Step ${idx + 1} of 4`}>
            {names.map((n, j) => (
              <li key={n} className={j < idx || step === 'done' ? 'done' : j === idx ? 'now' : ''} aria-current={j === idx ? 'step' : undefined}>
                <span className="rs-dot">{j < idx || step === 'done' ? <Icon name="check" /> : j + 1}</span><span className="rs-name">{n}</span>
              </li>
            ))}
          </ol>
        </aside>
        <div className="wiz-main">
          <button type="button" className="wz-x" onClick={close} disabled={step === 'sending'} aria-label="Close" data-sfx="none"><Icon name="x" /></button>
          <div className="wz-pane" key={step} ref={paneRef}>
            {step === 'review' && <ReviewStep A={A} onCancel={close} onNext={goVerify} />}
            {step === 'warning' && <WarningStep A={A} onCancel={close} onNext={goVerify} />}
            {step === 'verify' && <VerifyStep onCancel={close} onVerified={onVerified} verify={verifyPassword} notice={verifyNotice} demoPassword={showDemoHint ? dev?.password : null} />}
            {step === 'confirm' && <ConfirmStep A={A} k={k} user={user} onBack={goBack} onSubmit={doSubmit} error={submitErr} />}
            {step === 'sending' && <SendingStep />}
            {step === 'done' && result && <DoneStep A={A} k={k} req={result} user={user} links={links} onTrack={() => finish(onTrack)} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Head({ icon, eyebrow, title, sub }) {
  return (
    <div className="wz-head">
      <span className="wz-eyebrow">{icon}{eyebrow}</span>
      <h2 id="mho-w-title">{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

function ReviewStep({ A, onCancel, onNext }) {
  return (
    <>
      <div className="wz-body">
        <Head icon={<Icon name="pulse" />} eyebrow="Step 1 · Review" title={A.title} sub="Please review what this means before you continue." />
        <dl className="duo">
          <div><dt>Selected action</dt><dd>{A.type}</dd></div>
          <div><dt>{A.durationLabel}</dt><dd>{A.duration}</dd></div>
        </dl>
        <h3 className="wz-h3">What happens?</h3>
        <ul className="wz-checks">{A.bullets.map((b) => <li key={b}><Icon name="check" /><span>{b}</span></li>)}</ul>
      </div>
      <footer className="wz-foot">
        <button type="button" className="btn ghost" onClick={onCancel} data-sfx="none">Cancel</button>
        <button type="button" className="btn fill" onClick={onNext} data-sfx="next" data-autofocus>Continue<Icon name="chev" /></button>
      </footer>
    </>
  );
}

function WarningStep({ A, onCancel, onNext }) {
  return (
    <>
      <div className="wz-body">
        <Head icon={<Icon name="alert" />} eyebrow="Step 1 · Important" title={<><span className="sr-only">Warning: </span>{A.title}</>} sub={A.intro} />
        <div className="wz-warn">
          <h3>Before continuing:</h3>
          <ul>{A.warnings.map((b) => <li key={b}><Icon name="alert" /><span>{b}</span></li>)}</ul>
        </div>
        <dl className="duo">
          <div><dt>Selected action</dt><dd>{A.internal}</dd></div>
          <div><dt>Processing</dt><dd>{SLA_TEXT}</dd></div>
        </dl>
      </div>
      <footer className="wz-foot">
        <button type="button" className="btn ghost" onClick={onCancel} data-sfx="none" data-autofocus>Cancel</button>
        <button type="button" className="btn fill" onClick={onNext} data-sfx="next">I understand and want to continue</button>
      </footer>
    </>
  );
}

function VerifyStep({ onCancel, onVerified, verify, notice, demoPassword }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(notice || '');
  const [shake, setShake] = useState(0);
  const [lockUntil, setLockUntil] = useState(passwordLockUntil);
  const left = useCountdown(lockUntil);
  const locked = left > 0;
  const inputRef = useRef(null);
  useEffect(() => { if (!locked && lockUntil) { setErr(''); inputRef.current?.focus(); } }, [locked, lockUntil]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (busy || locked) return;
    if (!pw) { setErr('Please enter your password.'); setShake((s) => s + 1); sound.play('error'); inputRef.current?.focus(); return; }
    setBusy(true); setErr('');
    try {
      const res = await verify(pw);
      if (res.ok) { sound.play('ok'); onVerified(res.token); return; }
      sound.play('error'); setShake((s) => s + 1); setPw('');
      if (res.error === 'too_many_attempts') { passwordLockUntil = Date.now() + (res.retryAfter || 30) * 1000; setLockUntil(passwordLockUntil); }
      else { const r = res.attemptsRemaining; setErr(`Incorrect password. Please try again.${r != null && r <= 2 ? ` ${r} attempt${r === 1 ? '' : 's'} remaining before a temporary lock.` : ''}`); }
      inputRef.current?.focus();
    } catch (ex) { sound.play('error'); setErr(ex.message || 'We couldn’t verify your password. Please try again.'); }
    finally { setBusy(false); }
  };
  const message = locked ? `Too many incorrect attempts. For your security, please wait ${left} second${left === 1 ? '' : 's'} before trying again.` : err;

  return (
    <form className="wz-form" onSubmit={onSubmit} noValidate>
      <div className="wz-body">
        <Head icon={<Icon name="lock" />} eyebrow="Step 2 · Security" title="Confirm Your Identity" sub="For your security, please enter your MyHealthOpinions account password to continue." />
        <div className="field">
          <label htmlFor="mho-pw">Password</label>
          <div className={`pwbox ${shake ? 'shake' : ''}`} key={shake}>
            <Icon name="key" />
            <input ref={inputRef} id="mho-pw" name="password" type={show ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password"
              value={pw} onChange={(e) => { setPw(e.target.value); if (err && !locked) setErr(''); }} disabled={locked} data-autofocus
              aria-invalid={message ? 'true' : undefined} aria-describedby={message ? 'mho-pw-err' : undefined} />
            <span className="pw-beat" aria-hidden="true" />
          </div>
        </div>
        <label className="sw" htmlFor="mho-showpw">
          <input id="mho-showpw" type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
          <span className="sw-track" aria-hidden="true"><span className="sw-knob" /></span><span>Show password</span>
        </label>
        {message && <p className="err" id="mho-pw-err" role="alert"><Icon name="alert" /><span>{message}</span></p>}
        {demoPassword && <p className="demo-hint"><Icon name="sliders" />Preview only: the demo password is <code>{demoPassword}</code></p>}
      </div>
      <footer className="wz-foot">
        <button type="button" className="btn ghost" onClick={onCancel} data-sfx="none">Cancel</button>
        <button type="submit" className="btn fill" disabled={busy || locked}>{busy ? <><span className="spin" aria-hidden="true" />Verifying…</> : 'Verify & Continue'}</button>
      </footer>
    </form>
  );
}

function ConfirmStep({ A, k, user, onBack, onSubmit, error }) {
  const [agree, setAgree] = useState(false);
  return (
    <>
      <div className="wz-body">
        <Head icon={<Icon name="shield" />} eyebrow="Step 3 · Confirm" title="Please Confirm Your Request" sub="Your identity has been verified. Check the details below." />
        <p className="rx">{A.summary}</p>
        <dl className="rx-table">
          <div><dt>Account</dt><dd>{user.email}</dd></div>
          <div><dt>Request</dt><dd>{A.type}</dd></div>
          <div><dt>{A.confirmDurationLabel || 'Duration'}</dt><dd>{A.confirmDuration || A.duration}</dd></div>
          <div><dt>Request processing</dt><dd>{SLA_TEXT}</dd></div>
        </dl>
        <label className="sw big" htmlFor="mho-agree">
          <input id="mho-agree" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} data-autofocus />
          <span className="sw-track" aria-hidden="true"><span className="sw-knob" /></span><span>I confirm that I want to submit this request.</span>
        </label>
        {error && <p className="err" role="alert"><Icon name="alert" /><span>{error}</span></p>}
      </div>
      <footer className="wz-foot">
        <button type="button" className="btn ghost" onClick={onBack} data-sfx="back"><Icon name="back" />Go Back</button>
        <button type="button" className={`btn fill ${k === 'del' ? 'danger-fill' : ''}`} disabled={!agree} onClick={onSubmit} data-sfx="next">{error ? 'Try again' : 'Submit Request'}</button>
      </footer>
    </>
  );
}

function SendingStep() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const ids = [350, 900, 1450].map((t, i) => setTimeout(() => { setN(i + 1); sound.play('tap'); }, t));
    return () => ids.forEach(clearTimeout);
  }, []);
  const items = ['Confirming your verified session', 'Generating your request ID', 'Creating your support ticket'];
  return (
    <div className="wz-body center" aria-live="polite">
      <svg className="ecg-load" viewBox="0 0 200 60" aria-hidden="true"><path d="M0 30 H60 L70 14 L80 46 L92 4 L104 56 L114 30 H200" /></svg>
      <h2 id="mho-w-title">Sending your request to our Support Team</h2>
      <ul className="sendl">{items.map((t, i) => <li key={t} className={i < n ? 'ok' : ''}><span><Icon name="check" /></span>{t}</li>)}</ul>
    </div>
  );
}

function DoneStep({ A, k, req, user, links, onTrack }) {
  const p = PALETTES[k];
  return (
    <>
      <div className="wz-body">
        <div className="okay">
          <svg className="okay-mark" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="om-ring" cx="60" cy="60" r="52" stroke={p.c1} />
            <circle className="om-fill" cx="60" cy="60" r="40" fill={p.c1} />
            <path className="om-trace" d="M22 62 H38 L44 50 L50 74 L58 38 L66 86 L72 62 H98" stroke={p.c2} />
            <path className="om-tick" d="M44 61l11 11 22-24" />
          </svg>
          <h2 id="mho-w-title">{req.signedOut ? 'Request Received' : 'Account Request Created'}</h2>
          <CopyId id={req.id} prefix="Request ID:" />
          <p>{req.signedOut ? 'Thank you. Your password was verified and your request has been submitted to the MyHealthOpinions Support Team.' : 'Your request has been successfully submitted to the MyHealthOpinions Support Team.'}</p>
        </div>
        <h3 className="wz-h3">What happens next?</h3>
        <ol className="nexts">{NEXT_STEPS.map((s) => <li key={s}>{s}</li>)}</ol>
        <div className="eta"><Icon name="clock" /><div><small>Estimated completion</small><b>{SLA_TEXT}</b></div></div>
        <p className="hint"><Icon name="mail" />We’ve sent a “Request Received” email to {user.email}.</p>
        {req.signedOut && <p className="hint"><Icon name="lock" />For your security, you have been signed out of your account.</p>}
      </div>
      <footer className="wz-foot">
        {req.signedOut ? (
          <a className="btn fill" href={links.home} onClick={links.onNavigate ? (e) => links.onNavigate(e, 'home') : undefined} data-autofocus><Icon name="home" />Return to home</a>
        ) : (
          <>
            <a className="btn ghost" href={links.dashboard} onClick={links.onNavigate ? (e) => links.onNavigate(e, 'dashboard') : undefined}><Icon name="home" />Back to dashboard</a>
            <button type="button" className="btn fill" onClick={onTrack} data-autofocus>Track my request<Icon name="chev" /></button>
          </>
        )}
      </footer>
    </>
  );
}
