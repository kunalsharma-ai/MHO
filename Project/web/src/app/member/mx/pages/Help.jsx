"use client";
// Help & Support: the FAQ (unchanged answers), the member's tickets and a form to open a new one.
//   tickets   POST /api/v1/support {"issueRaisedBy.email": <member email>}
//   create    PUT  /api/v1/support {subject, description, attachments}; images through /api/v1/upload/image
//   open      /member/support/open?ticket=<id> (the existing ticket conversation page)
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/util";
import { useMx } from "../data";
import { PageHead } from "../parts";
import { Icon, Tabs, Empty, Field, useToast, apiOk, apiMessage, fmtDate, cap } from "../kit";
import { faqs } from "../faqs";
import { sectionArt, pageArt } from "../art";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function Faq() {
  const [open, setOpen] = React.useState(0);
  const [q, setQ] = React.useState("");
  const list = faqs.filter((f) => !q.trim() || `${f.title} ${f.content}`.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <>
      <Field label="Search the FAQ" id="mx-faq-q"><input id="mx-faq-q" className="mx-input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="For example: rewards, password, survey closed" /></Field>
      <div style={{ marginTop: 14 }}>
        {list.length ? list.map((f, i) => (
          <div className="mx-acc" key={f.title}>
            <button type="button" aria-expanded={open === i} aria-controls={`mx-faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <Icon name="help" size={18} />{f.title}<Icon name="chev" size={18} className="chev" />
            </button>
            {open === i && <div id={`mx-faq-${i}`}>{f.content}</div>}
          </div>
        )) : <Empty icon="help" title="No answer matches that search">Try other words, or open a ticket and our team will help.</Empty>}
      </div>
    </>
  );
}

function Tickets({ onNew, reloadKey }) {
  const { member } = useMx();
  const [state, setState] = React.useState({ loading: true, list: [], error: false });
  const [status, setStatus] = React.useState("all");
  React.useEffect(() => {
    if (!member?.mail) return undefined;
    let live = true;
    api.post("/api/v1/support", { "issueRaisedBy.email": member.mail })
      .then((r) => live && setState({ loading: false, list: Array.isArray(r?.data) ? r.data : [], error: r?.status === "error" }))
      .catch(() => live && setState({ loading: false, list: [], error: true }));
    return () => { live = false; };
  }, [member?.mail, reloadKey]);
  const isClosed = (t) => String(t.status || "").toLowerCase() === "closed";
  const list = state.list.filter((t) => status === "all" || (status === "closed" ? isClosed(t) : !isClosed(t)));
  return (
    <>
      <div className="mx-spread" style={{ marginBottom: 14 }}>
        <div className="mx-filters" role="group" aria-label="Filter tickets">
          {[["all", "All"], ["open", "Open"], ["closed", "Closed"]].map(([k, l]) => <button key={k} type="button" aria-pressed={status === k} onClick={() => setStatus(k)}>{l}</button>)}
        </div>
        <button type="button" className="mx-btn sm" onClick={onNew}><Icon name="plus" size={16} />New ticket</button>
      </div>
      {state.loading ? <div className="mx-skel" /> : state.error ? (
        <div className="mx-alert bad" role="alert"><Icon name="alert" size={18} />Your tickets could not be loaded right now.</div>
      ) : list.length ? (
        <div className="mx-tablewrap" data-tour="support-tickets-table">
          <table className="mx-table stack">
            <thead><tr><th scope="col">Ticket</th><th scope="col">Subject</th><th scope="col">Created</th><th scope="col">Status</th><th scope="col"><span className="sr">Open</span></th></tr></thead>
            <tbody>
              {list.map((t) => (
                <tr key={t._id}>
                  <td data-l="Ticket"><b>{t.ticketNo || "—"}</b></td>
                  <td data-l="Subject">{t.subject}</td>
                  <td data-l="Created">{fmtDate(t.createdAt)}</td>
                  <td data-l="Status"><span className={`mx-chip ${isClosed(t) ? "" : "info"}`}>{cap(t.status || "open")}</span></td>
                  <td data-l="Open"><Link className="mx-btn sm ghost" href={`/member/support/open?ticket=${t._id}`}>View replies</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <Empty icon="ticket" title={state.list.length ? "No tickets in this view" : "No support tickets yet"} action={<button type="button" className="mx-btn sm" onClick={onNew}>Open a ticket</button>}>If something is not working or you have a question about rewards or surveys, our team will answer here.</Empty>}
    </>
  );
}

function NewTicket({ onDone, preset }) {
  const toast = useToast();
  const [subject, setSubject] = React.useState(preset || "");
  const [body, setBody] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const upload = async (list) => {
    setUploading(true); setErr("");
    for (const f of list) {
      if (!/^image\/(jpeg|png|webp)$/.test(f.type)) { setErr("Attachments must be JPG, PNG or WebP images."); continue; }
      const fd = new FormData(); fd.append("file", f);
      try {
        const r = await api.post("/api/v1/upload/image", fd);
        if (apiOk(r) && r.file?.url) setFiles((x) => [...x, { name: f.name, url: r.file.url }]);
        else setErr(apiMessage(r, `${f.name} could not be uploaded.`));
      } catch (e) { setErr(`${f.name} could not be uploaded.`); }
    }
    setUploading(false);
  };
  const submit = async (e) => {
    e.preventDefault(); setTouched(true);
    if (!subject.trim() || !body.trim()) return;
    setBusy(true); setErr("");
    try {
      const description = body.trim().split(/\n{2,}/).map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("");
      const r = await api.put("/api/v1/support", { subject: subject.trim(), description, attachments: files.map((f) => f.url) });
      if (apiOk(r)) { toast(apiMessage(r, "Your ticket was created.")); onDone(); }
      else setErr(apiMessage(r, "The ticket could not be created."));
    } catch (x) { setErr("The ticket could not be created. Please try again."); }
    setBusy(false);
  };
  return (
    <form className="mx-form" onSubmit={submit} noValidate>
      <div className="mx-alert"><Icon name="shield" size={18} /><span>Please do not include medical details, diagnoses or other health information in a support ticket. Describe the problem, and our team will ask for anything else they need.</span></div>
      <Field label="Subject" id="mx-t-sub" error={touched && !subject.trim() ? "Please add a subject." : ""}>
        <input id="mx-t-sub" className="mx-input" value={subject} maxLength={140} onChange={(e) => setSubject(e.target.value)} aria-invalid={(touched && !subject.trim()) || undefined} />
      </Field>
      <Field label="How can we help?" id="mx-t-body" error={touched && !body.trim() ? "Please describe the problem." : ""} hint="Include the survey name or page where it happened, if any.">
        <textarea id="mx-t-body" className="mx-input" value={body} onChange={(e) => setBody(e.target.value)} aria-invalid={(touched && !body.trim()) || undefined} />
      </Field>
      <Field label="Screenshots (optional)" id="mx-t-files" hint={uploading ? "Uploading…" : "JPG, PNG or WebP."}>
        <input id="mx-t-files" className="mx-input" type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(e) => { upload([...(e.target.files || [])]); e.target.value = ""; }} />
      </Field>
      {files.length > 0 && (
        <ul className="mx-row" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {files.map((f, i) => <li key={f.url} className="mx-chip">{f.name}<button type="button" onClick={() => setFiles(files.filter((_, k) => k !== i))} aria-label={`Remove ${f.name}`} style={{ border: 0, background: "none", cursor: "pointer", color: "inherit" }}><Icon name="x" size={13} /></button></li>)}
        </ul>
      )}
      {err && <div className="mx-alert bad" role="alert"><Icon name="alert" size={18} />{err}</div>}
      <div className="mx-row" style={{ justifyContent: "flex-end" }}>
        <button type="button" className="mx-btn ghost" onClick={onDone}>Cancel</button>
        <button type="submit" className="mx-btn" disabled={busy || uploading}>{busy ? "Creating…" : "Create ticket"}</button>
      </div>
    </form>
  );
}

function HelpInner() {
  const { panel } = useMx();
  const params = useSearchParams();
  const [tab, setTab] = React.useState(params?.get("tab") === "new" ? "new" : params?.get("tab") === "tickets" ? "tickets" : "faq");
  const [rk, setRk] = React.useState(0);
  return (
    <>
      <PageHead icon="help" title="Help & Support" art={pageArt(panel, "help")}
        lead="Answers to common questions, and a direct line to the My Health Opinions support team." />
      <section className="mx-ways three" aria-label="Ways to get help">
        <button type="button" className="mx-way t-violet" style={{ "--i": 0 }} onClick={() => setTab("faq")}><span className="ic"><Icon name="help" size={22} /></span><b>Find a quick answer</b><span>Search the questions members ask most often.</span><em>Open the FAQ <Icon name="arrow" size={14} /></em></button>
        <button type="button" className="mx-way t-coral" style={{ "--i": 1 }} onClick={() => setTab("new")}><span className="ic"><Icon name="ticket" size={22} /></span><b>Ask our team</b><span>Open a ticket about rewards, surveys or your account.</span><em>New ticket <Icon name="arrow" size={14} /></em></button>
        <Link className="mx-way t-teal" style={{ "--i": 2 }} href="/member/messages"><span className="ic"><Icon name="inbox" size={22} /></span><b>Follow the replies</b><span>Every ticket and reply also lands in Messages.</span><em>Open Messages <Icon name="arrow" size={14} /></em></Link>
      </section>
      <Tabs label="Help sections" value={tab} onChange={setTab} tabs={[{ id: "faq", label: "FAQ", icon: "help" }, { id: "tickets", label: "My tickets", icon: "ticket" }, { id: "new", label: "New ticket", icon: "plus" }]} />
      <section className="mx-card" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "faq" && <Faq />}
        {tab === "tickets" && <Tickets reloadKey={rk} onNew={() => setTab("new")} />}
        {tab === "new" && <NewTicket preset={params?.get("subject") || ""} onDone={() => { setRk((x) => x + 1); setTab("tickets"); }} />}
      </section>
    </>
  );
}

export default function Help() {
  return <React.Suspense fallback={null}><HelpInner /></React.Suspense>;
}
