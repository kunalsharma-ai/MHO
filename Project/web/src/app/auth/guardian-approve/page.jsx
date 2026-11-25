"use client";
// A parent or guardian approves (or declines) a teen member's account: /auth/guardian-approve?link=…&code=…
// The link comes from the "parent-approval" email. It must be opened from the parent's own MyHealthOpinions login,
// using the email address it was sent to. What the parent agrees to is the "minor patient" category's terms as the
// database holds them (POST /api/v1/guardian/invite); this page adds no consent wording of its own.
import React from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/util";
import { LOGO } from "../../member/mx/art";
import "./guardian-approve.css";

const ok = (r) => r?.status === "success";
const hasToken = () => { try { return Boolean(localStorage.getItem("token")); } catch { return false; } };

function Approve() {
  const params = useSearchParams();
  const link = params?.get("link") || "";
  const code = params?.get("code") || "";
  const [state, setState] = React.useState({ step: "loading" }); // loading | login | invite | error | approved | declined
  const [accepted, setAccepted] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");

  const here = `/auth/guardian-approve?link=${encodeURIComponent(link)}&code=${encodeURIComponent(code)}`;
  const toLogin = () => {
    try { localStorage.setItem("mho.returnTo", JSON.stringify({ url: here, at: Date.now() })); } catch { /* storage blocked */ }
    window.location.assign("/login");
  };
  const toJoin = () => {
    try { localStorage.setItem("mho.returnTo", JSON.stringify({ url: here, at: Date.now() })); } catch { /* storage blocked */ }
    window.location.assign("/join");
  };

  React.useEffect(() => {
    if (!link || !code) { setState({ step: "error", message: "This link is incomplete. Please open the full link from the email." }); return; }
    if (!hasToken()) { setState({ step: "login" }); return; }
    let live = true;
    api.post("/api/v1/guardian/invite", { link, code }).then((r) => {
      if (!live) return;
      if (ok(r)) { setState({ step: "invite", ...r.data }); return; }
      if (!hasToken()) { setState({ step: "login" }); return; } // the session had ended
      setState({ step: "error", code: r?.code, message: r?.message || "We couldn’t open this approval link." });
    });
    return () => { live = false; };
  }, [link, code]);

  const decide = async (approve) => {
    setBusy(true); setErr("");
    const r = await api.post(`/api/v1/guardian/invite/${approve ? "approve" : "decline"}`, { link, code, accepted: Object.keys(accepted).filter((k) => accepted[k]) });
    setBusy(false);
    if (!ok(r)) { setErr(r?.message || "That didn’t work. Please try again."); return; }
    setState({ step: approve ? "approved" : "declined", message: r.message, teen: r.data?.teen });
  };

  const s = state;
  const required = (s.terms || []).filter((t) => t.isRequired);
  const ready = required.every((t) => accepted[t.name]);
  return (
    <main className="ga" id="main">
      <div className="ga-card">
        <img className="ga-logo" src={LOGO} alt="My Health Opinions" width="157" height="44" />
        {s.step === "loading" && <p className="ga-muted" role="status">Opening the approval link…</p>}

        {s.step === "login" && (
          <>
            <h1>Approve your teen’s account</h1>
            <p>Please log in with the email address this link was sent to. If you don’t have a MyHealthOpinions account yet, create one with that address, then open the link from the email again.</p>
            <div className="ga-actions">
              <button type="button" className="ga-btn" onClick={toLogin}>Log in</button>
              <button type="button" className="ga-btn ghost" onClick={toJoin}>Create an account</button>
            </div>
          </>
        )}

        {s.step === "error" && (
          <>
            <h1>{s.code === "WRONG_ACCOUNT" ? "Please use the invited account" : "This link can’t be used"}</h1>
            <p role="alert">{s.message}</p>
            {s.code === "WRONG_ACCOUNT" && (
              <div className="ga-actions">
                <button type="button" className="ga-btn" onClick={() => { try { localStorage.removeItem("token"); } catch { /* ignore */ } toLogin(); }}>Log in with another account</button>
              </div>
            )}
          </>
        )}

        {s.step === "invite" && (
          <>
            <h1>{s.teenFirstName} asked you to approve their account</h1>
            <p>{s.teenFirstName} signed up to the MyHealthOpinions Patients panel and named you as their parent or guardian. Members under 18 need your approval.</p>
            <ul className="ga-facts">
              <li>Once you approve, you can answer {s.teenFirstName}’s profile questions from your own login, and they can answer from theirs.</li>
              <li>Each answer shows who gave it. Only that person can change it, and every change is logged.</li>
              <li>You’ll find their profile under <b>Family</b> in your member area.</li>
            </ul>
            {s.termsReady ? (
              <form onSubmit={(e) => { e.preventDefault(); if (ready) decide(true); }}>
                {s.termsMessage && <div className="ga-terms-msg" dangerouslySetInnerHTML={{ __html: s.termsMessage }} />}
                <fieldset className="ga-terms">
                  <legend>Please read and confirm</legend>
                  {s.terms.map((t) => (
                    <label key={t.name} className="ga-term">
                      <input type="checkbox" checked={Boolean(accepted[t.name])} onChange={(e) => setAccepted((a) => ({ ...a, [t.name]: e.target.checked }))} />
                      <span dangerouslySetInnerHTML={{ __html: t.body }} />
                      {t.isRequired ? <em>Required</em> : <em className="opt">Optional</em>}
                    </label>
                  ))}
                </fieldset>
                {err && <p className="ga-err" role="alert">{err}</p>}
                <div className="ga-actions">
                  <button type="submit" className="ga-btn" disabled={busy || !ready}>{busy ? "Saving…" : `Approve ${s.teenFirstName}’s account`}</button>
                  <button type="button" className="ga-btn ghost" disabled={busy} onClick={() => decide(false)}>Decline</button>
                </div>
                {!ready && <p className="ga-muted">Tick every required statement to approve.</p>}
              </form>
            ) : (
              <>
                <p className="ga-err" role="alert">The parent or guardian consent terms have not been set up yet, so this account can’t be approved right now. Please contact support@myhealthopinions.com.</p>
                {err && <p className="ga-err" role="alert">{err}</p>}
                <div className="ga-actions"><button type="button" className="ga-btn ghost" disabled={busy} onClick={() => decide(false)}>Decline</button></div>
              </>
            )}
          </>
        )}

        {s.step === "approved" && (
          <>
            <h1>Thank you</h1>
            <p role="status">{s.message}</p>
            <div className="ga-actions"><a className="ga-btn" href="/member/guardian">{s.teen?.firstName ? `Open ${s.teen.firstName}’s profile` : "Open their profile"}</a></div>
          </>
        )}
        {s.step === "declined" && (
          <>
            <h1>Declined</h1>
            <p role="status">{s.message}</p>
          </>
        )}
      </div>
    </main>
  );
}

export default function Page() {
  return <React.Suspense fallback={null}><Approve /></React.Suspense>;
}
