import { useRef, useState } from 'react';
import { ACTIONS, CANCELLABLE, FLOW, SLA_SENTENCE, SLA_TEXT, STATUS, TERMINAL, paletteVars } from '../../config/actions.js';
import { useAccount } from '../../context/AccountContext.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { fmtDate, fmtDateTime } from '../../lib/format.js';
import { sound } from '../../lib/sound.js';
import { Icon } from '../Icon.jsx';
import { Object3D } from '../Object3D.jsx';
import { CopyId } from '../CopyId.jsx';
import { Brand } from '../TopBar.jsx';

const TABS = [
  { id: 'status', label: 'Status', icon: 'pulse' },
  { id: 'ticket', label: 'Support ticket', icon: 'ticket' },
  { id: 'emails', label: 'Emails', icon: 'mail' },
];
// ECG strip with one beat per status (x = 12.5 / 37.5 / 62.5 / 87.5 %)
const STRIP = 'M0 50 H70 L80 30 L90 72 L100 8 L110 92 L120 50 H320 L330 30 L340 72 L350 8 L360 92 L370 50 H570 L580 30 L590 72 L600 8 L610 92 L620 50 H820 L830 30 L840 72 L850 8 L860 92 L870 50 H960';

function progressOf(request) {
  const bad = request.status === 'unable_to_process' || request.status === 'cancelled';
  const flowHist = request.history.filter((h) => FLOW.includes(h.status));
  const reached = FLOW.indexOf((flowHist[flowHist.length - 1] || { status: 'submitted' }).status);
  return { bad, reached };
}

/** Heartbeat strip: the trace is "alive" up to the current status */
function Strip({ request }) {
  const { bad, reached } = progressOf(request);
  const done = request.status === 'completed';
  const pct = done ? 100 : ((reached + 0.5) / 4) * 100;
  return (
    <div className={`strip ${bad ? 'bad' : ''} ${done ? 'done' : ''}`}>
      <svg viewBox="0 0 960 100" preserveAspectRatio="none" aria-hidden="true">
        <defs><clipPath id="mho-strip-clip"><rect x="0" y="0" height="100" width={(pct / 100) * 960} className="strip-reveal" /></clipPath></defs>
        <path className="strip-base" d={STRIP} />
        <path className="strip-live" d={STRIP} clipPath="url(#mho-strip-clip)" />
      </svg>
      <ol className="strip-nodes">
        {FLOW.map((s, i) => {
          const isBad = bad && i === reached + 1;
          const ok = i < reached || (i === reached && (done || bad));
          const now = !bad && i === reached && !done;
          const key = isBad ? request.status : s;
          return (
            <li key={s} className={isBad ? 'bad' : ok ? 'ok' : now ? 'now' : ''} aria-current={now ? 'step' : undefined}>
              <span className="sn-dot">{ok ? <Icon name="check" /> : isBad ? <Icon name="x" /> : i + 1}</span>
              <b>{STATUS[key].label}</b>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function RequestTracker({ showInternal = true }) {
  const { request, requestKey } = useAccount();
  const [tab, setTab] = useState('status');
  const tabRefs = useRef({});
  if (!request || !requestKey) return null;
  const A = ACTIONS[requestKey];
  const st = STATUS[request.status];
  const tabs = showInternal ? TABS : TABS.filter((t) => t.id === 'status');
  const onKey = (e) => {
    const i = tabs.findIndex((t) => t.id === tab);
    let n = null;
    if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
    if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
    if (n) { e.preventDefault(); setTab(n.id); sound.play('tab'); tabRefs.current[n.id]?.focus(); }
  };
  return (
    <section className="sec" id="mho-tracker" aria-labelledby="mho-tr-h">
      <div className="chart" style={paletteVars(requestKey)}>
        <div className="chart-head">
          <div className="chart-obj"><Object3D k={requestKey} size={50} /></div>
          <div className="chart-title">
            <span className="kicker sm"><Icon name="ticket" />Your account request</span>
            <h2 id="mho-tr-h">{A.label}</h2>
            <p>{st.desc}</p>
          </div>
          <div className="chart-id"><span className={`pill ${request.status}`}>{st.label}</span><CopyId id={request.id} /></div>
        </div>
        <Strip request={request} />
        {tabs.length > 1 && (
          <div className="ftabs" role="tablist" aria-label="Request details" onKeyDown={onKey}>
            {tabs.map((t) => (
              <button key={t.id} ref={(el) => { tabRefs.current[t.id] = el; }} type="button" role="tab" id={`mho-tab-${t.id}`} aria-controls={`mho-panel-${t.id}`}
                aria-selected={tab === t.id} tabIndex={tab === t.id ? 0 : -1} className="ftab" onClick={() => setTab(t.id)}>
                <Icon name={t.icon} />{t.label}
              </button>
            ))}
          </div>
        )}
        <div className="chart-panel" role="tabpanel" id={`mho-panel-${tab}`} aria-labelledby={`mho-tab-${tab}`}>
          {tab === 'status' && <StatusPanel />}
          {tab === 'ticket' && <TicketPanel />}
          {tab === 'emails' && <EmailsPanel />}
        </div>
      </div>
    </section>
  );
}

function StatusPanel() {
  const { request, requestKey, cancel } = useAccount();
  const { toast } = useApp();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const A = ACTIONS[requestKey];
  const doCancel = async () => {
    setBusy(true); setErr('');
    try { await cancel(request.id); sound.play('close'); toast('Your request has been cancelled.', 'x'); setConfirming(false); }
    catch (e) { setErr(e.message || 'Could not cancel the request. Please try again.'); sound.play('error'); }
    finally { setBusy(false); }
  };
  return (
    <>
      <ul className="log">
        {request.history.map((h, i) => (
          <li key={`${h.status}-${i}`}><span className={`pill ${h.status}`}>{STATUS[h.status].label}</span><span>{STATUS[h.status].desc}</span><time dateTime={h.at}>{fmtDateTime(h.at)}</time></li>
        ))}
      </ul>
      <dl className="readings">
        <div><dt>Request</dt><dd>{A.type}</dd></div>
        <div><dt>{A.confirmDurationLabel || 'Duration'}</dt><dd>{A.confirmDuration || A.duration}</dd></div>
        <div><dt>Submitted</dt><dd>{fmtDate(request.submittedAt)}</dd></div>
        <div><dt>Estimated completion</dt><dd>{SLA_TEXT}</dd></div>
      </dl>
      <p className="alt">Other possible outcomes: <span className="pill unable_to_process">Unable to Process</span><span className="pill cancelled">Cancelled</span></p>
      <div className="chart-actions">
        {CANCELLABLE.includes(request.status) && !confirming && <button type="button" className="btn ghost sm" onClick={() => setConfirming(true)}><Icon name="x" />Cancel request</button>}
        {confirming && (
          <div className="confirm-inline" role="alertdialog" aria-label="Cancel this request?">
            <Icon name="alert" /><span>Cancel this request? No changes will be made to your account.</span>
            <div className="ci-btns">
              <button type="button" className="btn ghost sm" onClick={() => setConfirming(false)} disabled={busy} data-sfx="back">Keep request</button>
              <button type="button" className="btn fill sm danger-fill" onClick={doCancel} disabled={busy} data-sfx="none">{busy && <span className="spin" />}Yes, cancel it</button>
            </div>
          </div>
        )}
        {!TERMINAL.includes(request.status) && <p className="sla">{SLA_SENTENCE}</p>}
      </div>
      {err && <p className="err" role="alert"><Icon name="alert" />{err}</p>}
    </>
  );
}

function TicketPanel() {
  const { request, requestKey, user } = useAccount();
  const A = ACTIONS[requestKey];
  const st = STATUS[request.status];
  const rows = [
    ['Request Type', A.ticketType], ['Request', A.ticketRequest], ['Internal action', A.internal],
    ['User', user.name], ['Email', user.email], ['User ID', user.id],
    ['Password verification', <span className="ok" key="ok"><Icon name="check" />Successfully verified</span>],
    ['Requested Date', fmtDate(request.submittedAt)], ['SLA', '7 working days'], ['Status', st.ticket],
  ];
  return (
    <>
      <div className="clip">
        <div className="clip-top"><span className="clip-pin" /><b>Support ticket</b><span className="mono">{request.id}</span><span className={`pill ${request.status}`}>{st.ticket}</span></div>
        <dl className="clip-rows">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </div>
      <p className="hint"><Icon name="headset" />Internal preview: this is what the Support Team receives. Members never see this view.</p>
    </>
  );
}

function Mail({ label, to, subject, pending, children }) {
  return (
    <article className={`mail ${pending ? 'pending' : ''}`}>
      <div className="mail-top"><Icon name="mail" /><div><b>{label}</b><small>To: {to}</small><small>Subject: {subject}</small></div></div>
      {pending && <div className="mail-wait"><Icon name="clock" />Preview. This is sent once Support completes the action.</div>}
      <div className="mail-doc">
        <div className="mail-head"><Brand className="mail-brand" /></div>
        <svg className="mail-ecg" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 H170 L178 3 L186 17 L194 1 L202 19 L210 10 H400" /></svg>
        <div className="mail-body">{children}<p className="sig">MyHealthOpinions Support Team</p></div>
      </div>
    </article>
  );
}

function EmailsPanel() {
  const { request, requestKey, user } = useAccount();
  const A = ACTIONS[requestKey];
  const s = request.status;
  let heading = A.completedEmail.heading, rows = A.completedEmail.rows, note = A.completedEmail.note, subj = 'Request completed', label = 'Email 2 · Sent on completion';
  if (s === 'cancelled') { heading = 'Your MyHealthOpinions account request has been cancelled.'; rows = [['Status', 'Cancelled']]; note = 'No changes have been made to your account.'; subj = 'Request cancelled'; label = 'Email 2 · Sent on cancellation'; }
  if (s === 'unable_to_process') { heading = 'We were unable to process your MyHealthOpinions account request.'; rows = [['Status', 'Unable to Process']]; note = 'Our Support Team will contact you with more information.'; subj = 'Update on your request'; label = 'Email 2 · Sent if unable to process'; }
  const T = ({ r }) => <table><tbody>{r.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody></table>;
  return (
    <div className="mails">
      <Mail label="Email 1 · Sent immediately" to={user.email} subject={`Request Received: ${request.id}`}>
        <h4>Request Received</h4>
        <p>We have received your MyHealthOpinions account request.</p>
        <T r={[['Request ID', request.id], ['Request type', A.emailType], ['Submitted', fmtDate(request.submittedAt)], ['Processing time', 'Up to 7 working days']]} />
        <p>Our Support Team will review and process your request. You will receive another email once the requested action has been completed.</p>
      </Mail>
      <Mail label={label} to={user.email} subject={`${subj}: ${request.id}`} pending={!TERMINAL.includes(s)}>
        <h4>{heading}</h4>
        <T r={[['Request ID', request.id], ...rows]} />
        {note && <p>{note}</p>}
      </Mail>
    </div>
  );
}
