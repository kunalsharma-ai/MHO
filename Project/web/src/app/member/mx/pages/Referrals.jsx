"use client";
// Referrals: the member's invite link (copy / share), email invites, the status of everyone invited, and the
// follow-us bonus with its admin verification. Same API calls and rules as the previous Referrals page:
//   link         <origin>/?ref=<member id>&signup
//   invites      POST /api/v1/me/invite {emails} → {alreadyRegistered, invited};  GET /api/v1/me/invite
//   joined       GET /api/v1/me/referrals: points once the friend's email is verified (see rewardsData)
//   follow us    GET /api/v1/socials;  POST /api/v1/follow-social/verify (platform, socialId, screenshot)
import React from "react";
import { api } from "@/util";
import { useMx } from "../data";
import { PageHead } from "../parts";
import { Icon, Empty, Field, Modal, useToast, apiOk, apiMessage, fmtDate, cap } from "../kit";
import { REFERRAL_POINTS } from "../rewardsData";
import { SCENES, sectionArt } from "../art";

const EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
const PLATFORM = {
  instagram: ["Verify Instagram follow", "Follow our Instagram page and submit your Instagram username for verification.", "Instagram username or handle"],
  youtube: ["Verify YouTube subscription", "Subscribe to our YouTube channel and submit your YouTube channel name or handle for verification.", "YouTube channel name or handle"],
  facebook: ["Verify Facebook like", "Like our Facebook page and submit your Facebook profile name for verification.", "Facebook profile name"],
  twitter: ["Verify X (Twitter) follow", "Follow our X profile and submit your username or handle for verification.", "X username or handle"],
  linkedin: ["Verify LinkedIn follow", "Follow our LinkedIn page and submit your LinkedIn profile name or URL for verification.", "LinkedIn profile name or URL"],
};

function useReferrals(userId) {
  const [state, setState] = React.useState({ loading: true, list: [] });
  const load = React.useCallback(async () => {
    if (!userId) return;
    try {
      const [inv, reg] = await Promise.all([api.get("/api/v1/me/invite"), api.get("/api/v1/me/referrals").catch(() => null)]);
      const invites = Array.isArray(inv?.data) ? inv.data : [];
      const users = Array.isArray(reg?.data) ? reg.data : [];
      const byMail = new Map(users.filter((u) => u.email).map((u) => [String(u.email).toLowerCase(), u]));
      const list = invites.map((i) => {
        const u = byMail.get(String(i.email || "").toLowerCase());
        return { email: i.email, sentAt: i.createdAt, name: u?.name || "", registered: Boolean(u), verified: Boolean(u?.verified), joinedAt: u?.joinedAt };
      });
      // friends who joined with the link without an email invite (the API keeps their address private)
      users.filter((u) => !u.email).forEach((u) => list.push({ email: "", sentAt: null, name: u.name || "A friend", registered: true, verified: Boolean(u.verified), joinedAt: u.joinedAt }));
      setState({ loading: false, list });
    } catch (e) {
      setState((s) => ({ ...s, loading: false }));
    }
  }, [userId]);
  React.useEffect(() => {
    load();
    const t = setInterval(() => { if (document.visibilityState === "visible") load(); }, 15000);
    return () => clearInterval(t);
  }, [load]);
  return [state, load];
}

function Invite({ onSent }) {
  const toast = useToast();
  const [emails, setEmails] = React.useState([""]);
  const [busy, setBusy] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [err, setErr] = React.useState("");
  const valid = emails.map((e) => e.trim()).filter((e) => EMAIL.test(e));
  const send = async (e) => {
    e.preventDefault();
    if (!valid.length) return;
    setBusy(true); setErr(""); setResult(null);
    try {
      const resp = await api.post("/api/v1/me/invite", { emails: valid });
      if (apiOk(resp)) {
        setResult(resp.data || {});
        const n = resp.data?.invited?.length || 0;
        if (n) toast(`${n} invitation${n === 1 ? "" : "s"} sent.`);
        setEmails([""]);
        onSent();
      } else setErr(apiMessage(resp, "The invitations could not be sent."));
    } catch (x) { setErr("The invitations could not be sent. Please try again."); }
    setBusy(false);
  };
  return (
    <form className="mx-form" onSubmit={send} noValidate>
      {emails.map((v, i) => {
        const bad = v.trim() && !EMAIL.test(v.trim());
        return (
          <div key={i} className="mx-row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <Field label={`Friend's email ${emails.length > 1 ? i + 1 : ""}`} id={`mx-inv-${i}`} error={bad ? "Please enter a valid email address." : ""}>
                <input id={`mx-inv-${i}`} className="mx-input" type="email" autoComplete="off" value={v} aria-invalid={bad || undefined} onChange={(e) => setEmails(emails.map((x, k) => (k === i ? e.target.value : x)))} placeholder="name@example.com" />
              </Field>
            </div>
            {emails.length > 1 && <button type="button" className="mx-btn sm ghost" style={{ marginTop: 27 }} onClick={() => setEmails(emails.filter((_, k) => k !== i))} aria-label={`Remove email ${i + 1}`}><Icon name="trash" size={16} /></button>}
          </div>
        );
      })}
      <div className="mx-row">
        {emails.length < 10 && <button type="button" className="mx-btn sm ghost" onClick={() => setEmails([...emails, ""])}><Icon name="plus" size={16} />Add another</button>}
        <button type="submit" className="mx-btn" disabled={busy || !valid.length}><Icon name="mail" size={18} />{busy ? "Sending…" : `Send invite${valid.length > 1 ? "s" : ""}`}</button>
      </div>
      {err && <div className="mx-alert bad" role="alert"><Icon name="alert" size={18} />{err}</div>}
      {result && (result.alreadyRegistered?.length > 0 || result.invited?.length > 0) && (
        <div className="mx-alert ok" role="status"><Icon name="check" size={18} />
          <span>{result.invited?.length ? `Invited: ${result.invited.join(", ")}. ` : ""}{result.alreadyRegistered?.length ? `Already members, so not invited: ${result.alreadyRegistered.join(", ")}.` : ""}</span></div>
      )}
    </form>
  );
}

function FollowUs() {
  const toast = useToast();
  const [socials, setSocials] = React.useState(null);
  const [pick, setPick] = React.useState(null);
  const [sid, setSid] = React.useState("");
  const [shot, setShot] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  React.useEffect(() => { api.get("/api/v1/socials").then((r) => setSocials(Array.isArray(r?.data) ? r.data : [])).catch(() => setSocials([])); }, []);
  const close = () => { setPick(null); setSid(""); setShot(null); setErr(""); };
  const submit = async (e) => {
    e.preventDefault();
    if (!pick || !shot || !sid.trim()) return;
    setBusy(true); setErr("");
    const fd = new FormData();
    fd.append("platform", pick.platform); fd.append("socialId", sid.trim()); fd.append("screenshot", shot);
    try {
      const resp = await api.post("/api/v1/follow-social/verify", fd);
      if (apiOk(resp)) {
        toast(apiMessage(resp, "Sent for verification. An admin will review it."));
        setSocials((l) => l.map((x) => (x.platform === pick.platform ? { ...x, status: "pending" } : x)));
        close();
      } else setErr(apiMessage(resp, "It could not be sent. Please try again."));
    } catch (x) { setErr("It could not be sent. Please try again."); }
    setBusy(false);
  };
  if (!socials?.length) return null;
  const cfg = PLATFORM[String(pick?.platform || "").toLowerCase()] || [`Verify ${pick?.platform || ""}`, `Connect with our ${pick?.platform || "social media"} page and submit your profile information for verification.`, "Your profile name"];
  return (
    <section className="mx-card" aria-labelledby="mx-fu-h">
      <div className="mx-sec-h"><div><span className="mx-eyebrow">Bonus points</span><h2 id="mx-fu-h" style={{ marginTop: 6 }}>Follow MHO on social media</h2>
        <p>Follow us, then send your handle and a screenshot. Points are added after an admin verifies it.</p></div></div>
      <div className="mx-shortcuts">
        {socials.map((s) => {
          const st = String(s.status || "").toLowerCase();
          const done = st === "rewarded" || st === "approved";
          return (
            <div key={s.platform} className="mx-short" style={{ "--a": "#FFD15C", "--b": "#F2611B" }}>
              <span className="ic"><Icon name="star" size={20} /></span>
              <b>{cap(s.platform)}</b>
              <span>{done ? `${s.points || ""} points awarded` : st === "pending" ? "Waiting for verification" : s.points ? `+${s.points} points` : "Bonus points"}</span>
              <div className="mx-row">
                {s.link && <a className="mx-btn sm ghost" href={s.link} target="_blank" rel="noopener noreferrer">Open <Icon name="external" size={14} /></a>}
                {!done && st !== "pending" && <button type="button" className="mx-btn sm" onClick={() => setPick(s)}>Verify</button>}
              </div>
            </div>
          );
        })}
      </div>
      <Modal open={Boolean(pick)} onClose={close} labelledBy="mx-ver-h">
        <form className="mx-form" onSubmit={submit}>
          <h2 id="mx-ver-h" style={{ fontSize: 22 }}>{cfg[0]}</h2>
          <p className="mx-muted">{cfg[1]}</p>
          <Field label={cfg[2]} id="mx-sid"><input id="mx-sid" className="mx-input" value={sid} onChange={(e) => setSid(e.target.value)} required /></Field>
          <Field label="Screenshot" id="mx-shot" hint="A JPG, PNG or WebP image showing that you follow us."><input id="mx-shot" className="mx-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setShot(e.target.files?.[0] || null)} required /></Field>
          {err && <div className="mx-alert bad" role="alert"><Icon name="alert" size={18} />{err}</div>}
          <div className="mx-row" style={{ justifyContent: "flex-end" }}>
            <button type="button" className="mx-btn ghost" onClick={close}>Cancel</button>
            <button type="submit" className="mx-btn" disabled={busy || !shot || !sid.trim()}>{busy ? "Sending…" : "Send for verification"}</button>
          </div>
        </form>
      </Modal>
    </section>
  );
}

export default function Referrals() {
  const { member, panel } = useMx();
  const toast = useToast();
  const [origin, setOrigin] = React.useState("");
  React.useEffect(() => setOrigin(window.location.origin), []);
  const link = member?._id && origin ? `${origin}/?ref=${member._id}&signup` : "";
  const [state, reload] = useReferrals(member?._id);
  const joined = state.list.filter((r) => r.registered).length;
  const verified = state.list.filter((r) => r.verified).length;
  const copy = async () => {
    try { await navigator.clipboard.writeText(link); toast("Your invite link is copied."); }
    catch (e) { toast("Copying is blocked in this browser. Select the link and copy it.", "bad"); }
  };
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
  const share = async () => { try { await navigator.share({ title: "My Health Opinions", text: "Join me on My Health Opinions and share your views on healthcare research.", url: link }); } catch (e) { /* closed */ } };
  const enc = encodeURIComponent;
  return (
    <>
      <PageHead icon="share" title="Referrals" art={panel === "caregiver" ? SCENES.hug : sectionArt(panel, "social", "social")}
        lead="Invite people you know to join the panel. When a friend joins with your link and verifies their email, the referral counts towards your rewards."
        facts={state.loading ? [] : [["Invited", state.list.length], ["Joined", joined], ["Verified", verified], ["Points from referrals", (verified * REFERRAL_POINTS).toLocaleString()]]} />
      <div className="mx-split">
        <section className="mx-card" aria-labelledby="mx-link-h">
          <span className="mx-eyebrow">Your invite link</span>
          <h2 id="mx-link-h" style={{ marginTop: 6 }}>Share your personal link</h2>
          <p className="mx-muted" style={{ margin: "6px 0 14px", fontSize: 14 }}>Anyone who signs up from this link is connected to your account.</p>
          <div className="mx-copy">
            <input className="mx-input" readOnly value={link} aria-label="Your invite link" onFocus={(e) => e.target.select()} />
            <button type="button" className="mx-btn" onClick={copy} disabled={!link}><Icon name="copy" size={18} />Copy</button>
          </div>
          <div className="mx-row" style={{ marginTop: 12 }}>
            {canShare && <button type="button" className="mx-btn sm ghost" onClick={share} disabled={!link}><Icon name="share" size={16} />Share…</button>}
            <a className="mx-btn sm ghost" href={`https://wa.me/?text=${enc(`Join me on My Health Opinions: ${link}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="mx-btn sm ghost" href={`mailto:?subject=${enc("Join me on My Health Opinions")}&body=${enc(`I share my views on healthcare research with My Health Opinions. Join with my link: ${link}`)}`}>Email</a>
            <a className="mx-btn sm ghost" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(link)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <h3 style={{ fontSize: 17, margin: "22px 0 10px" }}>Invite by email</h3>
          <Invite onSent={reload} />
        </section>
        <section className="mx-card" aria-labelledby="mx-terms-h">
          <span className="mx-eyebrow">How it works</span>
          <h2 id="mx-terms-h" style={{ marginTop: 6 }}>Referral terms</h2>
          <ol className="mx-list" style={{ marginTop: 14 }}>
            {[["link", "Share your link or send an email invite.", "Email invites go only to addresses that are not already members."],
              ["user", "Your friend joins with your link.", "They register and confirm they are 18 or older."],
              ["mail", "They verify their email address.", "Only verified sign-ups count as a referral."],
              ["gift", `${REFERRAL_POINTS} points are added to your history.`, "The referral appears in Rewards once their email is verified."]].map(([ic, t, s], i) => (
              <li key={t} className="mx-item" style={{ "--i": i }}><span className="ic info"><Icon name={ic} size={18} /></span><span className="tx"><b>{t}</b><span>{s}</span></span><span /></li>
            ))}
          </ol>
        </section>
      </div>
      <section className="mx-card" aria-labelledby="mx-rh-h">
        <div className="mx-sec-h"><div><span className="mx-eyebrow">Activity</span><h2 id="mx-rh-h" style={{ marginTop: 6 }}>People you invited</h2></div></div>
        {state.loading ? <div className="mx-skel" /> : state.list.length ? (
          <div className="mx-tablewrap">
            <table className="mx-table stack">
              <thead><tr><th scope="col">Email</th><th scope="col">Invited</th><th scope="col">Status</th><th scope="col">Joined</th></tr></thead>
              <tbody>
                {state.list.map((r, i) => (
                  <tr key={`${r.email}-${i}`}>
                    <td data-l="Email"><b>{r.name || r.email}</b>{r.name && <div className="mx-muted" style={{ fontSize: 12.5 }}>{r.email}</div>}</td>
                    <td data-l="Invited">{r.sentAt ? fmtDate(r.sentAt) : "Joined by link"}</td>
                    <td data-l="Status"><span className={`mx-chip ${r.verified ? "ok" : r.registered ? "warn" : ""}`}>{r.verified ? "Verified" : r.registered ? "Joined, email not verified" : "Invited"}</span></td>
                    <td data-l="Joined">{r.joinedAt ? fmtDate(r.joinedAt) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <Empty icon="share" title="No invitations yet">Share your link or send an email invite above. Everyone you invite will be listed here with their status.</Empty>}
      </section>
      <FollowUs />
    </>
  );
}
