"use client";
// Teen members and their parents or guardians (/member/guardian). Everything comes from /api/v1/guardian:
//   teen     their approval status (resend the parent's email, or correct the address), then their shared answers
//   parent   the teens they approved, each one's shared answers
// Shared answers: every answer shows who gave it. Only that person can change it, so the other person's answers are
// shown read-only. The server enforces the same rule (lib/guardian.js) and refuses anything else, and the change log
// at the bottom is the server's own record.
import React from "react";
import { api } from "@/util";
import { useMx } from "../data";
import { PageHead } from "../parts";
import { Icon, Empty, Field, useToast, apiOk, apiMessage, fmtDate } from "../kit";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// answers are stored as option values; show the option's label when the question has one
const shown = (v, options) => {
  if (v == null || v === "" || (Array.isArray(v) && !v.length)) return "Skipped";
  const label = new Map((options || []).map((o) => [String(o.value), o.label]));
  return [].concat(v).map((x) => label.get(String(x)) ?? x).join(", ");
};

function useGuardian() {
  const [state, setState] = React.useState({ loading: true, data: null, error: "" });
  const load = React.useCallback(async () => {
    const r = await api.get("/api/v1/guardian");
    setState(apiOk(r) ? { loading: false, data: r.data, error: "" } : { loading: false, data: null, error: apiMessage(r, "We couldn’t load this page. Please try again.") });
  }, []);
  React.useEffect(() => { load(); }, [load]);
  return [state, load];
}

/* ---------------------------------------------------------------- teen: waiting for approval */
function Waiting({ teen, onSent }) {
  const toast = useToast();
  const [email, setEmail] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const send = async (e) => {
    e.preventDefault();
    const v = email.trim();
    if (v && !EMAIL.test(v)) { setErr("Please enter a valid email address."); return; }
    setBusy(true); setErr("");
    const r = await api.post("/api/v1/guardian/resend", v ? { parentEmail: v } : {});
    setBusy(false);
    if (!apiOk(r)) { setErr(r?.errors?.parentEmail || apiMessage(r, "We couldn’t send the email. Please try again.")); return; }
    toast?.(apiMessage(r, "Email sent."));
    setEmail("");
    onSent();
  };
  const declined = teen.status === "declined";
  return (
    <section className="mx-card" aria-labelledby="mx-wait-h">
      <div className="mx-sec-h"><div>
        <span className="mx-eyebrow">{declined ? "Not approved" : "Waiting for approval"}</span>
        <h2 id="mx-wait-h" style={{ marginTop: 6 }}>{declined ? "Your parent or guardian declined" : "Your parent or guardian needs to approve your account"}</h2>
      </div><span className={`mx-chip ${declined ? "bad" : "warn"}`}>{declined ? "Declined" : "Pending"}</span></div>
      {teen.parentEmail ? (
        <p>{declined
          ? <>The person at <b>{teen.parentEmail}</b> declined on {fmtDate(teen.decidedAt)}. If that was the wrong address, send the request to your parent or guardian below.</>
          : <>We emailed <b>{teen.parentEmail}</b>{teen.sentAt ? <> on {fmtDate(teen.sentAt)}</> : null}. They approve from their own MyHealthOpinions login, using that address. Until then you can’t answer profile questions.</>}</p>
      ) : <p>Enter your parent’s or guardian’s email address so we can ask them to approve your account.</p>}
      {teen.canResend && (
        <form onSubmit={send} className="mx-fields" style={{ marginTop: 14, alignItems: "end" }} noValidate>
          <Field id="mx-pe" label="Parent’s or guardian’s email" hint={teen.parentEmail ? "Leave empty to send the same email again." : ""} error={err}>
            <input id="mx-pe" className="mx-input" type="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={err ? true : undefined} placeholder={teen.parentEmail || "name@example.com"} />
          </Field>
          <div><button type="submit" className="mx-btn" disabled={busy}><Icon name="send" size={16} /> {busy ? "Sending…" : teen.parentEmail && !email ? "Send the email again" : "Send the request"}</button></div>
        </form>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------- shared answers */
const BY = {
  self: { self: "You", parent: "Your parent" },
  parent: { self: "Your teen", parent: "You" },
};

function Control({ q, value, onChange, disabled, id }) {
  if (q.type === "single" && q.options?.length > 6) {
    return (
      <select id={id} className="mx-input" value={value ?? ""} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
        <option value="">Choose…</option>
        {q.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    );
  }
  if (q.type === "single" || q.type === "multi") {
    const list = [].concat(value ?? []).map(String);
    return (
      <div className="mx-gq-opts" role={q.type === "single" ? "radiogroup" : "group"} aria-labelledby={`${id}-l`}>
        {q.options.map((o) => {
          const on = list.includes(String(o.value));
          return (
            <label key={o.value} className={`mx-gq-opt ${on ? "on" : ""}`}>
              <input type={q.type === "single" ? "radio" : "checkbox"} name={id} checked={on} disabled={disabled}
                onChange={() => onChange(q.type === "single" ? o.value : on ? list.filter((v) => v !== String(o.value)) : [...list, o.value])} />
              <span>{o.label}</span>
            </label>
          );
        })}
      </div>
    );
  }
  return null;
}

function Question({ q, role, who, onSaved }) {
  const toast = useToast();
  const [draft, setDraft] = React.useState(q.answer?.value ?? (q.type === "multi" ? [] : ""));
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  React.useEffect(() => { setDraft(q.answer?.value ?? (q.type === "multi" ? [] : "")); }, [q.answer?.value, q.type]);
  const id = `gq-${q.name}`;
  const locked = !q.editable;
  const save = async (value) => {
    setBusy(true); setErr("");
    const r = await api.patch(`/api/v1/guardian/answers/${who}`, { [q.name]: value });
    setBusy(false);
    if (!apiOk(r)) { setErr(r?.data?.refused?.[0]?.message || apiMessage(r, "Your answer was not saved. Please try again.")); return; }
    toast?.("Saved");
    onSaved();
  };
  const choice = q.type === "single" || q.type === "multi";
  return (
    <li className={`mx-gq ${locked ? "locked" : ""}`}>
      <div className="mx-gq-h">
        <b id={`${id}-l`}>{q.label}</b>
        {q.answer
          ? <span className={`mx-chip ${q.answer.mine ? "info" : ""}`} title={q.answer.at ? `Answered ${fmtDate(q.answer.at)}` : undefined}>{q.answer.mine ? <Icon name="user" size={12} /> : <Icon name="lock" size={12} />} {BY[role][q.answer.by]}</span>
          : <span className="mx-chip">Not answered yet</span>}
      </div>
      {locked ? (
        <p className="mx-gq-ro"><span>{shown(q.answer?.value, q.options)}</span><small>{role === "parent" ? "Your teen gave this answer, so only they can change it." : "Your parent gave this answer, so only they can change it."}</small></p>
      ) : choice ? (
        <>
          <Control q={q} id={id} value={draft} disabled={busy} onChange={(v) => { setDraft(v); if (q.type === "single" || !q.options?.length) save(v); }} />
          {q.type === "multi" && <button type="button" className="mx-btn sm" disabled={busy || JSON.stringify([].concat(draft)) === JSON.stringify([].concat(q.answer?.value ?? []))} onClick={() => save(draft)}>{busy ? "Saving…" : "Save"}</button>}
        </>
      ) : (
        <form className="mx-gq-row" onSubmit={(e) => { e.preventDefault(); save(String(draft ?? "").trim()); }}>
          <input id={id} aria-labelledby={`${id}-l`} className="mx-input" type={q.type === "tel" ? "tel" : q.type} value={draft ?? ""} onChange={(e) => setDraft(e.target.value)} disabled={busy} />
          <button type="submit" className="mx-btn sm" disabled={busy || String(draft ?? "").trim() === String(q.answer?.value ?? "") || !String(draft ?? "").trim()}>{busy ? "Saving…" : "Save"}</button>
        </form>
      )}
      {err && <small className="mx-gq-err" role="alert"><Icon name="alert" size={13} /> {err}</small>}
    </li>
  );
}

function History({ who, stamp }) {
  const [rows, setRows] = React.useState(null);
  React.useEffect(() => {
    let live = true;
    api.get(`/api/v1/guardian/history/${who}?limit=100`).then((r) => { if (live) setRows(apiOk(r) && Array.isArray(r.data) ? r.data : []); });
    return () => { live = false; };
  }, [who, stamp]);
  if (!rows) return <div className="mx-skel" style={{ minHeight: 120 }} />;
  if (!rows.length) return <Empty icon="clock" title="No changes yet">Every answer either of you gives or changes is listed here.</Empty>;
  const name = (r, role) => (r.you ? "You" : BY[role][r.by]);
  return (
    <ol className="mx-list mx-glog">
      {rows.map((r, i) => (
        <li key={i} className="mx-item">
          <span className={`ic ${r.action === "refused" ? "bad" : "ok"}`}><Icon name={r.action === "refused" ? "lock" : "check"} size={16} /></span>
          <span className="tx">
            <b>{r.label}</b>
            <span>{r.action === "refused"
              ? `${name(r, who === "me" ? "self" : "parent")} tried to change it. Not saved: ${r.reasonText || "not allowed"}`
              : `${name(r, who === "me" ? "self" : "parent")} ${r.action === "clear" ? "skipped it" : r.before ? `changed it from “${shown(r.beforeText ?? r.before)}” to “${shown(r.afterText ?? r.after)}”` : `answered “${shown(r.afterText ?? r.after)}”`}`}</span>
          </span>
          <small>{fmtDate(r.at)}</small>
        </li>
      ))}
    </ol>
  );
}

function SharedAnswers({ who }) {
  const [state, setState] = React.useState({ loading: true, data: null, error: "" });
  const [stamp, setStamp] = React.useState(0);
  const [open, setOpen] = React.useState(0);
  const load = React.useCallback(async () => {
    const r = await api.get(`/api/v1/guardian/questionnaire/${who}`);
    setState(apiOk(r) ? { loading: false, data: r.data, error: "" } : { loading: false, data: null, error: apiMessage(r, "We couldn’t load the answers.") });
    setStamp((s) => s + 1);
  }, [who]);
  React.useEffect(() => { setState({ loading: true, data: null, error: "" }); load(); }, [load]);
  if (state.loading) return <div className="mx-skel" style={{ minHeight: 260 }} />;
  if (state.error) return <div className="mx-alert bad" role="alert"><Icon name="alert" size={18} /> {state.error}</div>;
  const { role, teen, profiles } = state.data;
  const all = profiles.flatMap((p) => p.questions);
  const answered = all.filter((q) => q.answer).length;
  const p = profiles[Math.min(open, profiles.length - 1)];
  return (
    <>
      <section className="mx-card" aria-labelledby="mx-ga-h">
        <div className="mx-sec-h"><div>
          <span className="mx-eyebrow">{role === "parent" ? `${teen.firstName}’s profile` : "Your profile"}</span>
          <h2 id="mx-ga-h" style={{ marginTop: 6 }}>Shared answers</h2>
          <p>{role === "parent"
            ? `You and ${teen.firstName} can both answer. Each answer shows who gave it, and only that person can change it.`
            : "You and your parent or guardian can both answer. Each answer shows who gave it, and only that person can change it."}</p>
        </div><span className="mx-chip info">{answered} of {all.length} answered</span></div>
        {!profiles.length ? <Empty icon="profile" title="No questions yet">There are no profile questions for members under 18 yet.</Empty> : (
          <>
            <div className="mx-gtabs" role="tablist" aria-label="Profiles">
              {profiles.map((x, i) => {
                const done = x.questions.filter((q) => q.answer).length;
                return <button key={x.name} type="button" role="tab" aria-selected={i === open} onClick={() => setOpen(i)}>{x.name.replace(/\bprofile\b/i, "").trim() || x.name} <small>{done}/{x.questions.length}</small></button>;
              })}
            </div>
            <ul className="mx-gqs" role="tabpanel" aria-label={p.name}>
              {p.questions.map((q) => <Question key={q.name} q={q} role={role} who={who} onSaved={load} />)}
            </ul>
          </>
        )}
      </section>
      <section className="mx-card" aria-labelledby="mx-gl-h">
        <div className="mx-sec-h"><div>
          <span className="mx-eyebrow">Change log</span>
          <h2 id="mx-gl-h" style={{ marginTop: 6 }}>Every change, and who made it</h2>
          <p>Kept by the server. Nobody can edit or delete it, including us through this site.</p>
        </div></div>
        <History who={who} stamp={stamp} />
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- page */
export default function Family() {
  const { panel } = useMx();
  const [{ loading, data, error }, reload] = useGuardian();
  const [pick, setPick] = React.useState(null);
  const children = data?.children || [];
  React.useEffect(() => { if (!pick && children.length) setPick(children[0].id); }, [children, pick]);
  const isTeen = data?.isTeen;
  return (
    <>
      <PageHead icon="hands" title="Family" lead={isTeen
        ? "Members under 18 join with a parent’s or guardian’s approval. Once they approve, you can both answer your profile questions."
        : "Teens who named you as their parent or guardian, and their shared profile answers."} />
      {loading ? <div className="mx-skel" style={{ minHeight: 240 }} /> : error ? (
        <div className="mx-alert bad" role="alert"><Icon name="alert" size={18} /> {error}</div>
      ) : isTeen ? (
        data.teen?.status === "approved" ? <SharedAnswers who="me" /> : <Waiting teen={data.teen} onSent={reload} />
      ) : children.length ? (
        <>
          {children.length > 1 && (
            <div className="mx-gtabs" role="group" aria-label="Choose a teen">
              {children.map((c) => <button key={c.id} type="button" aria-pressed={pick === c.id} onClick={() => setPick(c.id)}>{c.firstName || "Teen"}</button>)}
            </div>
          )}
          {pick && <SharedAnswers key={pick} who={pick} />}
        </>
      ) : (
        <section className="mx-card"><Empty icon="hands" title="No linked teens">When a member under 18 names your email as their parent or guardian, we email you a link to approve their account. Once you approve, their profile appears here.</Empty></section>
      )}
    </>
  );
}
