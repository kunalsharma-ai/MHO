"use client";
// My Account: personal details and picture, alternate contacts, password, how we contact you, payment methods,
// social accounts, privacy and consent, display preferences, and closing the account.
// Every save goes to the same endpoint the previous My Account and Settings pages used, and a change is only
// reported as saved when the API answers "success".
import React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/util";
import DeleteAccountSection from "../../(member pages)/myaccount/component/accountActions/DeleteAccountSection";
import { useMx, useAnswers, fullName, initials, memberId } from "../data";
import { PageHead } from "../parts";
import { Icon, Tabs, Empty, Field, Password, useToast, apiOk, apiMessage, fmtDate, cap } from "../kit";
import { STATEMENTS, REQUIRED, OPTIONAL } from "../consentText";
import { sectionArt } from "../art";

const TABS = [
  { id: "personal", label: "Personal details", icon: "user" },
  { id: "password", label: "Password", icon: "lock" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "payment", label: "Payment", icon: "card" },
  { id: "social", label: "Social accounts", icon: "share" },
  { id: "privacy", label: "Privacy & consent", icon: "shield" },
  { id: "preferences", label: "Display & language", icon: "sun" },
  { id: "close", label: "Close account", icon: "logout" },
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function useSave() {
  const toast = useToast();
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const run = async (call, okText) => {
    setBusy(true); setErr("");
    try {
      const resp = await call();
      if (apiOk(resp)) { toast(okText || apiMessage(resp, "Saved.")); setBusy(false); return resp; }
      setErr(apiMessage(resp, "It could not be saved. Please try again."));
    } catch (e) { setErr("It could not be saved. Please check your connection and try again."); }
    setBusy(false);
    return null;
  };
  return { busy, err, run, setErr };
}
const Err = ({ text }) => (text ? <div className="mx-alert bad" role="alert"><Icon name="alert" size={18} />{text}</div> : null);

// ---- personal -------------------------------------------------------------------------------------------------------
function Personal() {
  const { member, d } = useMx();
  const save = useSave();
  const [pic, setPic] = React.useState(false);
  const [alt, setAlt] = React.useState({ email: "", phone: "" });
  const [edit, setEdit] = React.useState(null);
  React.useEffect(() => {
    if (!member) return;
    setAlt({ email: member["alternate-email"] && member["alternate-email"] !== member.mail ? member["alternate-email"] : "", phone: member["alternate-phone"] || "" });
  }, [member]);
  const age = member?.dob ? Math.floor((Date.now() - new Date(member.dob).getTime()) / 31557600000) : null;
  const upload = async (file) => {
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) { save.setErr("Please choose a JPG, PNG or WebP image."); return; }
    setPic(true);
    const fd = new FormData(); fd.append("file", file);
    const up = await save.run(() => api.post("/api/v1/upload/image", fd), "Picture uploaded.");
    if (up?.file?.url) {
      const done = await save.run(() => api.put("/api/v1/me", { profilePicture: up.file.url }), "Your profile picture was updated.");
      if (done) await member?.Reload?.();
    }
    setPic(false);
  };
  const saveAlt = async (field) => {
    const name = field === "email" ? "alternate-email" : "alternate-phone";
    const v = alt[field].trim();
    if (field === "email" && v && !EMAIL.test(v)) { save.setErr("Please enter a valid email address."); return; }
    if (field === "phone" && v && !/^\+?[\d\s()-]{6,20}$/.test(v)) { save.setErr("Please enter a valid phone number."); return; }
    const ok = await save.run(() => api.patch("/api/v1/me/answer", { [name]: v }), field === "email" ? "Alternate email saved." : "Alternate phone saved.");
    if (ok) {
      try { const r = await api.post("/api/v1/me", { questions: ["alternate-email", "alternate-phone"] }); if (r?.data && member?.update) member.update(r.data); else await member?.Reload?.(); } catch (e) { /* the saved value stays on screen */ }
      setEdit(null);
    }
  };
  const loc = [d?.member?.city, d?.member?.country?.toUpperCase()].filter(Boolean).map(cap).join(", ");
  return (
    <div className="mx-form">
      <div className="mx-row" style={{ gap: 18 }}>
        <div className="mx-avatar-lg">{member?.profilePicture && !/logo\/user\.png$/.test(member.profilePicture) ? <img src={member.profilePicture} alt="Your profile picture" /> : initials(member)}</div>
        <div style={{ display: "grid", gap: 6 }}>
          <b style={{ fontSize: 20, fontFamily: "var(--f-display)" }}>{fullName(member)}</b>
          <span className="mx-muted">Member ID {memberId(member, d)}</span>
          <label className="mx-btn sm ghost" style={{ justifySelf: "start" }}>
            <Icon name="upload" size={16} />{pic ? "Uploading…" : "Change picture"}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="sr" onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ""; }} disabled={pic} />
          </label>
        </div>
      </div>
      <div className="mx-kv">
        <div><small>Email (sign-in)</small><b>{member?.mail || "—"}</b></div>
        <div><small>Mobile</small><b>{member?.phone ? `+${String(member.phone).replace(/^\+/, "")}` : "—"}</b></div>
        <div><small>Date of birth</small><b>{member?.dob ? `${fmtDate(member.dob)}${age ? ` (${age})` : ""}` : "—"}</b></div>
        <div><small>Location</small><b>{loc || "—"}</b></div>
        <div><small>Member since</small><b>{fmtDate(member?.createdAt || d?.member?.joinedAt)}</b></div>
        <div><small>Panel</small><b>{cap(member?.category || "—")}</b></div>
      </div>
      <p className="mx-muted" style={{ fontSize: 13.5 }}>Your sign-in email, date of birth and gender cannot be changed here for security reasons. To change your sign-in email, please <Link href="/member/support?tab=new&subject=Change%20my%20sign-in%20email" style={{ fontWeight: 700 }}>open a support ticket</Link>. Other details live in <Link href="/member/profiles" style={{ fontWeight: 700 }}>My Profile</Link>.</p>
      <h3 style={{ fontSize: 17, marginTop: 6 }}>Alternate contact</h3>
      <div className="mx-fields">
        {[["email", "Alternate email", "email"], ["phone", "Alternate phone", "tel"]].map(([k, l, type]) => (
          <Field key={k} label={l} id={`mx-alt-${k}`} hint={edit === k ? "Press Save to keep this change." : "Used only if we cannot reach you the usual way."}>
            <div className="mx-row" style={{ flexWrap: "nowrap" }}>
              <input id={`mx-alt-${k}`} className="mx-input" type={type} value={alt[k]} readOnly={edit !== k} onChange={(e) => setAlt({ ...alt, [k]: e.target.value })} placeholder={edit === k ? "" : "Not added"} />
              {edit === k ? (<>
                <button type="button" className="mx-btn sm" onClick={() => saveAlt(k)} disabled={save.busy}>Save</button>
                <button type="button" className="mx-btn sm ghost" onClick={() => { setEdit(null); setAlt({ email: member?.["alternate-email"] && member["alternate-email"] !== member.mail ? member["alternate-email"] : "", phone: member?.["alternate-phone"] || "" }); }}>Cancel</button>
              </>) : <button type="button" className="mx-btn sm ghost" onClick={() => setEdit(k)} aria-label={`Edit ${l.toLowerCase()}`}>Edit</button>}
            </div>
          </Field>
        ))}
      </div>
      <Err text={save.err} />
      <Stats />
    </div>
  );
}

function Stats() {
  const [s, setS] = React.useState(null);
  React.useEffect(() => { api.get("/api/v1/me/statistics").then((r) => setS(r?.status === "success" ? r.data || {} : null)).catch(() => setS(null)); }, []);
  if (!s) return null;
  const rows = [["Surveys taken", s.total], ["Completed", s.complete], ["Did not qualify", s.disqualified]].filter(([, v]) => v !== undefined);
  if (!rows.length) return null;
  return (
    <>
      <h3 style={{ fontSize: 17, marginTop: 6 }}>Your participation</h3>
      <div className="mx-kv">{rows.map(([k, v]) => <div key={k}><small>{k}</small><b>{Number(v || 0).toLocaleString()}</b></div>)}</div>
    </>
  );
}

// ---- password -------------------------------------------------------------------------------------------------------
function PasswordTab() {
  const save = useSave();
  const [f, setF] = React.useState({ old: "", next: "", again: "" });
  const [touched, setTouched] = React.useState(false);
  const weak = f.next && (f.next.length < 8 || !/[a-z]/.test(f.next) || !/[A-Z]/.test(f.next) || !/\d/.test(f.next));
  const mismatch = f.again && f.next !== f.again;
  const submit = async (e) => {
    e.preventDefault(); setTouched(true);
    if (!f.old || !f.next || weak || f.next !== f.again) return;
    const ok = await save.run(() => api.patch("/api/v1/me", { oldPassword: f.old, newPassword: f.next, cnfPassword: f.again }), "Your password was changed.");
    if (ok) { setF({ old: "", next: "", again: "" }); setTouched(false); }
  };
  return (
    <form className="mx-form" onSubmit={submit} noValidate data-tour="settings-password" style={{ maxWidth: 560 }}>
      <Field label="Current password" id="mx-pw-old" error={touched && !f.old ? "Please enter your current password." : ""}><Password id="mx-pw-old" value={f.old} onChange={(e) => setF({ ...f, old: e.target.value })} invalid={touched && !f.old} /></Field>
      <Field label="New password" id="mx-pw-new" hint="At least 8 characters with upper and lower case letters and a number." error={(touched || f.next) && weak ? "Use at least 8 characters with upper and lower case letters and a number." : ""}><Password id="mx-pw-new" autoComplete="new-password" value={f.next} onChange={(e) => setF({ ...f, next: e.target.value })} invalid={Boolean(weak)} /></Field>
      <Field label="Confirm new password" id="mx-pw-again" error={mismatch ? "The passwords do not match." : touched && !f.again ? "Please type the new password again." : ""}><Password id="mx-pw-again" autoComplete="new-password" value={f.again} onChange={(e) => setF({ ...f, again: e.target.value })} invalid={Boolean(mismatch)} /></Field>
      <Err text={save.err} />
      <div><button type="submit" className="mx-btn" disabled={save.busy}><Icon name="lock" size={18} />{save.busy ? "Saving…" : "Change password"}</button></div>
    </form>
  );
}

// ---- notifications --------------------------------------------------------------------------------------------------
const METHODS = [["email", "By email", "mail"], ["sms", "By SMS (text message)", "chat"], ["phone", "By phone call", "phone"], ["dashboard", "By dashboard notifications", "bell"], ["whatsapp", "By WhatsApp", "chat"]];
function NotificationsTab() {
  const save = useSave();
  const [state, setState] = React.useState({ loading: true, saved: [], sel: [] });
  React.useEffect(() => {
    api.post("/api/v1/me", { questions: ["communication-methods"] })
      .then((r) => { const v = [].concat(r?.data?.["communication-methods"] || []).map(String); setState({ loading: false, saved: v, sel: v }); })
      .catch(() => setState({ loading: false, saved: [], sel: [] }));
  }, []);
  const changed = state.sel.slice().sort().join() !== state.saved.slice().sort().join();
  const toggle = (k) => setState((s) => ({ ...s, sel: s.sel.includes(k) ? s.sel.filter((x) => x !== k) : [...s.sel, k] }));
  const submit = async (e) => {
    e.preventDefault();
    const ok = await save.run(() => api.patch("/api/v1/me/answer", { "communication-methods": state.sel }), "Your contact preferences were saved.");
    if (ok) setState((s) => ({ ...s, saved: s.sel }));
  };
  return (
    <form className="mx-form" onSubmit={submit} data-tour="settings-notifications">
      <p className="mx-muted">Choose how we tell you about new surveys that match your profile.</p>
      {state.loading ? <div className="mx-skel" /> : (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="sr">Survey notification methods</legend>
          <div className="mx-checks">
            {METHODS.map(([k, l, ic]) => (
              <label key={k} className="mx-check"><input type="checkbox" checked={state.sel.includes(k)} onChange={() => toggle(k)} /><Icon name={ic} size={18} />{l}</label>
            ))}
          </div>
        </fieldset>
      )}
      <Err text={save.err} />
      <div className="mx-row"><button type="submit" className="mx-btn" disabled={!changed || save.busy}>{save.busy ? "Saving…" : "Save preferences"}</button>{!changed && !state.loading && <span className="mx-muted" style={{ fontSize: 13 }}>No changes to save.</span>}</div>
    </form>
  );
}

// ---- payment --------------------------------------------------------------------------------------------------------
const FIELDS = {
  "wire-transfer": [["bankName", "payment-method-bank-name", "Bank", "Enter bank name"], ["ifsc", "payment-method-bank-ifsc", "IFSC / IBAN / SWIFT", "Enter IFSC, IBAN or SWIFT code"], ["bankAccount", "payment-method-bank-account", "Account number", "Enter account number"]],
  upi: [["upiAccount", "payment-method-upi", "UPI ID (VPA)", "Enter UPI ID"]],
  paypal: [["paypalAccount", "payment-method-paypal", "PayPal email", "Enter PayPal email"]],
  "amazon-gift-card": [["amazonAccount", "payment-method-amazon", "Amazon ID", "Enter Amazon gift card ID"]],
  "healthcare-report": [["healthcareReportAccount", "payment-method-healthcare-report", "Healthcare report ID", "Enter healthcare report ID"]],
};
const complete = (m, method) => (FIELDS[method] || []).length > 0 && FIELDS[method].every(([, key]) => String(m?.[key] ?? "").trim());
const PAYMENT_KEYS = ["payment-method-primary", "payment-method", ...Object.values(FIELDS).flat().map(([, key]) => key)];
const mask = (v) => { const s = String(v || ""); return s.length > 4 ? `•••• ${s.slice(-4)}` : s; };
function PaymentTab() {
  const save = useSave();
  const [member, refresh, ready] = useAnswers(PAYMENT_KEYS);
  const [opts, setOpts] = React.useState(null);
  const [open, setOpen] = React.useState(null);
  const [draft, setDraft] = React.useState({});
  const primary = member?.["payment-method-primary"] || null;
  React.useEffect(() => { api.get("/api/v1/option/payment-method").then((r) => setOpts(Array.isArray(r?.data) ? r.data : [])).catch(() => setOpts([])); }, []);
  const begin = (method) => { setOpen(method); setDraft(Object.fromEntries((FIELDS[method] || []).map(([k, key]) => [k, member?.[key] || ""]))); save.setErr(""); };
  const store = async (method) => {
    const fields = FIELDS[method] || [];
    if (method === "paypal" && draft.paypalAccount && !EMAIL.test(draft.paypalAccount)) { save.setErr("Please enter a valid PayPal email."); return; }
    const body = Object.fromEntries(fields.map(([k, key]) => [key, String(draft[k] || "").trim()]));
    const ok = await save.run(() => api.patch("/api/v1/me/answer", body), "Payment details saved.");
    if (ok) {
      if (primary === method && !fields.every(([k]) => String(draft[k] || "").trim())) await api.patch("/api/v1/me/answer", { "payment-method-primary": "" });
      await refresh();
      setOpen(null);
    }
  };
  const makePrimary = async (method) => {
    if (!complete(member, method)) { save.setErr("Fill in and save all details of this method before making it your payout method."); return; }
    const ok = await save.run(() => api.patch("/api/v1/me/answer", { "payment-method-primary": method }), "Payout method updated.");
    if (ok) await refresh();
  };
  if (!opts || !ready) return <div className="mx-skel" />;
  if (!opts.length) return <Empty icon="card" title="Payment methods are not available right now">Please try again later.</Empty>;
  const sorted = [...opts].sort((a, b) => (a.value === primary ? -1 : b.value === primary ? 1 : 0) || Number(complete(member, b.value)) - Number(complete(member, a.value)));
  return (
    <div className="mx-form">
      <p className="mx-muted">Add the ways you can be paid, then choose one as your payout method. Details are saved to your account and shown masked.</p>
      {sorted.map((o) => {
        const fields = FIELDS[o.value] || [];
        const filled = complete(member, o.value);
        return (
          <div key={o.value} className="mx-acc">
            <button type="button" aria-expanded={open === o.value} onClick={() => (open === o.value ? setOpen(null) : begin(o.value))}>
              <Icon name={o.value === "wire-transfer" ? "bank" : "card"} size={18} />{o.label}
              {primary === o.value && <span className="mx-chip ok">Payout method</span>}
              {primary !== o.value && filled && <span className="mx-chip">Saved</span>}
              <Icon name="chev" size={18} className="chev" />
            </button>
            {open === o.value && (
              <div style={{ whiteSpace: "normal" }}>
                {fields.length ? (
                  <div className="mx-fields">
                    {fields.map(([k, key, label, ph]) => (
                      <Field key={k} label={label} id={`mx-pay-${k}`} hint={member?.[key] ? `Saved: ${mask(member[key])}` : ""}>
                        <input id={`mx-pay-${k}`} className="mx-input" value={draft[k] || ""} placeholder={ph} autoComplete="off" onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} />
                      </Field>
                    ))}
                  </div>
                ) : <p className="mx-muted">This method needs no extra details.</p>}
                <Err text={save.err} />
                <div className="mx-row" style={{ marginTop: 12 }}>
                  {fields.length > 0 && <button type="button" className="mx-btn sm" onClick={() => store(o.value)} disabled={save.busy}>Save details</button>}
                  {primary !== o.value && <button type="button" className="mx-btn sm ghost" onClick={() => makePrimary(o.value)} disabled={save.busy}>Use for payouts</button>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---- social ---------------------------------------------------------------------------------------------------------
const SOCIAL = [["whatsapp", "WhatsApp"], ["instagram", "Instagram"], ["facebook", "Facebook"], ["linkedin", "LinkedIn"], ["youtube", "YouTube"], ["x", "X (Twitter)"]];
function SocialTab() {
  const save = useSave();
  const [member, refresh] = useAnswers(SOCIAL.map(([k]) => `social-media-${k}`));
  const initial = React.useMemo(() => Object.fromEntries(SOCIAL.map(([k]) => [k, member?.[`social-media-${k}`] == null ? "" : String(member[`social-media-${k}`])])), [member]);
  const [v, setV] = React.useState(initial);
  React.useEffect(() => setV(initial), [initial]);
  const changed = SOCIAL.some(([k]) => (v[k] || "").trim() !== (initial[k] || "").trim());
  const submit = async (e) => {
    e.preventDefault();
    const ok = await save.run(() => api.patch("/api/v1/me/answer", Object.fromEntries(SOCIAL.map(([k]) => [`social-media-${k}`, (v[k] || "").trim()]))), "Social accounts saved.");
    if (ok) await refresh();
  };
  return (
    <form className="mx-form" onSubmit={submit}>
      <p className="mx-muted">Optional. These help us reach you and verify social follow rewards.</p>
      <div className="mx-fields">
        {SOCIAL.map(([k, l]) => <Field key={k} label={l} id={`mx-so-${k}`}><input id={`mx-so-${k}`} className="mx-input" value={v[k] || ""} onChange={(e) => setV({ ...v, [k]: e.target.value })} placeholder={k === "whatsapp" ? "Phone number" : "Username or profile link"} /></Field>)}
      </div>
      <Err text={save.err} />
      <div><button type="submit" className="mx-btn" disabled={!changed || save.busy}>{save.busy ? "Saving…" : "Save social accounts"}</button></div>
    </form>
  );
}

// ---- privacy --------------------------------------------------------------------------------------------------------
function PrivacyTab() {
  const { panel, d } = useMx();
  const [hist, setHist] = React.useState(null);
  const [page, setPage] = React.useState(null);
  React.useEffect(() => {
    api.get("/api/v1/me/consent/history").then((r) => setHist(Array.isArray(r?.data) ? r.data : [])).catch(() => setHist([]));
    api.get("/api/v1/me/consent").then((r) => setPage(r?.data?.page || null)).catch(() => setPage(null));
  }, []);
  const latest = hist?.find((h) => h.action === "accept");
  const ap = latest?.approvals || d?.consent?.approvals || {};
  const text = STATEMENTS[panel] || STATEMENTS.patient;
  const status = d?.journey?.consent?.status;
  return (
    <div className="mx-form" data-tour="settings-terms">
      <div className="mx-kv">
        <div><small>Consent status</small><b>{status === "valid" ? "Signed and current" : status === "outdated" ? "New terms to review" : cap(status || "—")}</b></div>
        <div><small>Version</small><b>{latest?.termsVersion || d?.consent?.version || "—"}</b></div>
        <div><small>Signed on</small><b>{fmtDate(latest?.acceptedAt || d?.consent?.at)}</b></div>
        <div><small>Consent ID</small><b style={{ fontSize: 13 }}>{latest?.consentId || d?.journey?.consent?.consentId || "—"}</b></div>
      </div>
      <h3 style={{ fontSize: 17 }}>What you agreed to</h3>
      <ul className="mx-list">
        {[...REQUIRED, ...OPTIONAL].map((k) => (
          <li key={k} className="mx-item">
            <span className={`ic ${ap[k] ? "ok" : ""}`} style={ap[k] ? undefined : { background: "var(--line)", color: "var(--muted)" }}><Icon name={ap[k] ? "check" : "x"} size={16} /></span>
            <span className="tx"><b style={{ fontWeight: 600 }}>{text[k]}</b><span>{REQUIRED.includes(k) ? "Required" : "Optional"} · {ap[k] ? "Given" : "Not given"}</span></span><span />
          </li>
        ))}
      </ul>
      <p className="mx-muted" style={{ fontSize: 13.5 }}>Every signature is kept as a separate record. To change an optional permission, review and sign the consent form again; the new choices replace the old ones from that moment.</p>
      <div className="mx-row">
        {page && <a className="mx-btn" href={page}><Icon name="shield" size={18} />Review and re-sign consent</a>}
        <a className="mx-btn ghost" href="/terms" target="_blank" rel="noopener noreferrer"><Icon name="external" size={16} />Terms and conditions</a>
        <a className="mx-btn ghost" href="/privacy" target="_blank" rel="noopener noreferrer"><Icon name="external" size={16} />Privacy policy</a>
      </div>
      {hist && hist.length > 1 && (
        <>
          <h3 style={{ fontSize: 17 }}>Consent history</h3>
          <div className="mx-tablewrap"><table className="mx-table stack"><thead><tr><th scope="col">Date</th><th scope="col">Action</th><th scope="col">Version</th><th scope="col">Consent ID</th></tr></thead>
            <tbody>{hist.map((h) => <tr key={h.consentId || h.acceptedAt}><td data-l="Date">{fmtDate(h.acceptedAt)}</td><td data-l="Action">{h.action === "accept" ? "Signed" : cap(h.action)}</td><td data-l="Version">{h.termsVersion}</td><td data-l="Consent ID">{h.consentId}</td></tr>)}</tbody></table></div>
        </>
      )}
    </div>
  );
}

// ---- preferences ----------------------------------------------------------------------------------------------------
const LANGS = [["en", "English"], ["hi", "हिन्दी"], ["es", "Español"], ["fr", "Français"], ["de", "Deutsch"], ["pt", "Português"], ["ar", "العربية"], ["zh-CN", "简体中文"]];
function PreferencesTab() {
  const { mode, setMode } = useMx();
  const [lang, setLang] = React.useState("en");
  React.useEffect(() => { try { setLang(localStorage.getItem("mho.lang") || "en"); } catch (e) { /* storage blocked */ } }, []);
  const pick = (code) => {
    setLang(code);
    try { localStorage.setItem("mho.lang", code); } catch (e) { /* storage blocked */ }
    setTimeout(() => window.location.reload(), 120); // the site translator reads mho.lang when the page loads
  };
  return (
    <div className="mx-form" style={{ maxWidth: 560 }}>
      <p className="mx-muted">These settings are kept in this browser only.</p>
      <Field label="Theme" id="mx-theme">
        <div className="mx-filters" role="radiogroup" aria-label="Theme" id="mx-theme">
          {[["light", "Light", "sun"], ["dark", "Dark", "moon"]].map(([k, l, ic]) => <button key={k} type="button" role="radio" aria-checked={mode === k} aria-pressed={mode === k} onClick={() => setMode(k)}><Icon name={ic} size={15} />{l}</button>)}
        </div>
      </Field>
      <Field label="Language" id="mx-lang" hint="The page reloads in the chosen language.">
        <select id="mx-lang" className="mx-input" value={lang} onChange={(e) => pick(e.target.value)}>
          {LANGS.map(([c, n]) => <option key={c} value={c} lang={c}>{n}</option>)}
        </select>
      </Field>
    </div>
  );
}

function AccountInner({ initialTab }) {
  const { member, panel, d } = useMx();
  const params = useSearchParams();
  const router = useRouter();
  const want = params?.get("tab") || initialTab || "personal";
  const [tab, setTab] = React.useState(TABS.some((t) => t.id === want) ? want : "personal");
  React.useEffect(() => { if (TABS.some((t) => t.id === want)) setTab(want); }, [want]);
  const change = (t) => { setTab(t); router.replace(`/member/myaccount?tab=${t}`, { scroll: false }); };
  const q = Number(member?.qualityScore) || 0;
  return (
    <>
      <PageHead icon="user" title="My Account" art={sectionArt(panel, "basic", "basic")}
        lead="Your personal and contact details, password, notification and payment preferences, privacy choices and account settings."
        facts={[["Member ID", memberId(member, d) || "—"], ["Quality score", q], ["Member since", fmtDate(member?.createdAt || d?.member?.joinedAt)]]} />
      <Tabs label="Account sections" value={tab} onChange={change} tabs={TABS} />
      <section className="mx-card" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        <h2 style={{ marginBottom: 16 }}>{TABS.find((t) => t.id === tab)?.label}</h2>
        {tab === "personal" && <Personal />}
        {tab === "password" && <PasswordTab />}
        {tab === "notifications" && <NotificationsTab />}
        {tab === "payment" && <PaymentTab />}
        {tab === "social" && <SocialTab />}
        {tab === "privacy" && <PrivacyTab />}
        {tab === "preferences" && <PreferencesTab />}
        {tab === "close" && (
          <div className="mx-form">
            <p className="mx-muted">You can pause or delete your account. Deletion asks you to confirm by email, and you can restore the account within 30 days; after that its data is removed. Unredeemed points are shown before you confirm.</p>
            <DeleteAccountSection />
          </div>
        )}
      </section>
    </>
  );
}

export default function Account({ initialTab }) {
  return <React.Suspense fallback={null}><AccountInner initialTab={initialTab} /></React.Suspense>;
}
