"use client";
// Rewards: balance, what it is worth, progress to a payout request, the payment method on file, and the full history
// of points (surveys, verified socials, verified referrals and completed profiles), with type and date filters.
// Payouts: the API has no payout endpoint, so a payout is requested through a support ticket, which is the process the
// existing FAQ describes. Nothing on this page claims a payout was made.
import React from "react";
import Link from "next/link";
import { api } from "@/util";
import { useMx, useAnswers } from "../data";
import { PageHead, Vault } from "../parts";
import { Icon, Empty, Field, Modal, useToast, apiOk, apiMessage, fmtDate, cap } from "../kit";
import { loadRewardRows, fmtLoi, SOCIAL_POINTS, REFERRAL_POINTS } from "../rewardsData";
import { sectionArt, pageArt } from "../art";

const STATUS = { complete: ["Completed", "ok"], approved: ["Approved", "ok"], credited: ["Credited", "ok"], pending: ["Awaiting approval", "warn"], rejected: ["Not approved", "bad"], paid: ["Paid out", "info"], terminate: ["Did not qualify", "bad"], overquota: ["Quota full", "warn"], dropout: ["Not finished", "info"] };
const PAY_LABEL = { "wire-transfer": "Bank transfer", upi: "UPI", paypal: "PayPal", "amazon-gift-card": "Amazon gift card", "healthcare-report": "Healthcare report" };

function RequestPayout({ open, onClose, points, worth, method }) {
  const toast = useToast();
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const submit = async () => {
    setBusy(true); setErr("");
    try {
      const resp = await api.put("/api/v1/support", {
        subject: "Reward redemption request",
        description: `<p>I would like to redeem my reward points.</p><p>Balance shown in my dashboard: ${points.toLocaleString()} points${worth ? ` (about $${worth})` : ""}.</p><p>Payment method on file: ${method ? PAY_LABEL[method] || method : "not set"}.</p>`,
        category: "rewards",
      });
      if (apiOk(resp)) { toast("Your payout request was sent to the support team as a ticket. You can follow it in Help & Support."); onClose(); }
      else setErr(apiMessage(resp, "The request could not be sent. Please try again."));
    } catch (e) { setErr("The request could not be sent. Please check your connection and try again."); }
    setBusy(false);
  };
  return (
    <Modal open={open} onClose={onClose} labelledBy="mx-pay-h">
      <h2 id="mx-pay-h" style={{ fontSize: 22 }}>Request a payout</h2>
      <p className="mx-muted" style={{ marginTop: 8, lineHeight: 1.6 }}>This opens a support ticket with your balance and payment method. The MHO support team checks your profile and survey completion, then passes it to accounts for payment, as described in the FAQ.</p>
      <div className="mx-kv" style={{ margin: "16px 0" }}>
        <div><small>Balance</small><b>{points.toLocaleString()} points</b></div>
        <div><small>Payment method</small><b>{method ? PAY_LABEL[method] || method : "Not set"}</b></div>
      </div>
      {!method && <div className="mx-alert" style={{ marginBottom: 12 }}><Icon name="card" size={18} />Add a payment method first so the team knows how to pay you. <Link href="/member/myaccount?tab=payment" style={{ fontWeight: 800 }}>Add one</Link></div>}
      {err && <div className="mx-alert bad" role="alert" style={{ marginBottom: 12 }}><Icon name="alert" size={18} />{err}</div>}
      <div className="mx-row" style={{ justifyContent: "flex-end" }}>
        <button type="button" className="mx-btn ghost" onClick={onClose}>Cancel</button>
        <button type="button" className="mx-btn" onClick={submit} disabled={busy || !method}>{busy ? "Sending…" : "Send request"}</button>
      </div>
    </Modal>
  );
}

const SRC = [["Survey", "surveys", "coral"], ["Profile", "profile", "violet"], ["Referral", "share", "pink"], ["Social", "megaphone", "teal"]];
const TYPE_ICON = { Survey: "surveys", Profile: "profile", Referral: "share", Social: "megaphone", Payout: "gift", Reward: "gift" };
const signed = (n) => (n > 0 ? `+${n.toLocaleString()}` : n < 0 ? `−${Math.abs(n).toLocaleString()}` : "—");

/** Where the points came from: totals per activity type, from the full rewards history. */
function Sources({ rows, ready }) {
  const tot = SRC.map(([k, ic, tone]) => ({ k, ic, tone, pts: rows.filter((r) => r.type === k).reduce((a, r) => a + (r.points || 0), 0), n: rows.filter((r) => r.type === k && (r.points || 0) > 0).length }));
  const all = tot.reduce((a, t) => a + t.pts, 0);
  return (
    <section className="mx-card mx-src" aria-labelledby="mx-src-h">
      <div className="mx-sec-h"><div><span className="mx-eyebrow">Where your points came from</span><h2 id="mx-src-h" style={{ marginTop: 6 }}>{ready ? `${all.toLocaleString()} points earned` : "Loading…"}</h2></div></div>
      <div className="mx-src-bar" aria-hidden="true">{all > 0 && tot.filter((t) => t.pts).map((t) => <i key={t.k} className={`t-${t.tone}`} style={{ flexGrow: t.pts }} />)}</div>
      <ul className="mx-src-list">
        {tot.map((t, i) => (
          <li key={t.k} className={`t-${t.tone}`} style={{ "--i": i }}>
            <span className="ic"><Icon name={t.ic} size={18} /></span>
            <span><small>{t.k === "Survey" ? "Surveys" : t.k === "Profile" ? "Profiles" : t.k === "Referral" ? "Referrals" : "Social"}</small><b>{t.pts.toLocaleString()}</b><em>{t.n} reward{t.n === 1 ? "" : "s"}{all ? ` · ${Math.round((t.pts / all) * 100)}%` : ""}</em></span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Ways to earn, with the values the platform actually pays. */
function WaysToEarn() {
  const ways = [
    ["surveys", "coral", "Take surveys", "Each survey shows its points before you start. Completed surveys pay in full.", "/member/surveys", "See surveys"],
    ["profile", "violet", "Complete profiles", "Finished profiles add points and unlock surveys that match you.", "/member/profile", "My profiles"],
    ["share", "pink", `Invite friends · ${REFERRAL_POINTS} points`, "For each friend who joins with your link and verifies their email.", "/member/referrals", "Invite"],
    ["megaphone", "teal", `Follow MHO · ${SOCIAL_POINTS} points`, "Once our team approves your follow on a social platform.", "/member/referrals#follow", "Follow"],
  ];
  return (
    <section className="mx-ways" aria-label="Ways to earn">
      {ways.map(([ic, tone, h, p, href, cta], i) => (
        <Link key={h} href={href} className={`mx-way t-${tone}`} style={{ "--i": i }}>
          <span className="ic"><Icon name={ic} size={22} /></span>
          <b>{h}</b><span>{p}</span><em>{cta} <Icon name="arrow" size={14} /></em>
        </Link>
      ))}
    </section>
  );
}

export default function Rewards() {
  const { member, balance, panel, activity } = useMx();
  const [range, setRange] = React.useState(["", ""]);
  const [type, setType] = React.useState("All");
  const [state, setState] = React.useState({ loading: true, rows: [], failed: false });
  const [payout, setPayout] = React.useState(false);
  const uid = member?._id;
  const rk = range.join("|");
  React.useEffect(() => {
    if (!uid) return undefined;
    let live = true;
    setState((s) => ({ ...s, loading: true }));
    const dated = range[0] && range[1];
    // without dates the member area already holds the ledger with the balance; with dates the rows are read for that range
    if (!dated && !balance.history) return undefined;
    loadRewardRows(uid, dated ? range : [], dated ? undefined : balance.history).then((r) => live && setState({ loading: false, ...r })).catch(() => live && setState({ loading: false, rows: [], failed: true }));
    return () => { live = false; };
  }, [uid, rk, balance.history]); // eslint-disable-line react-hooks/exhaustive-deps
  const rows = state.rows.filter((r) => type === "All" || r.type === type);
  const earned = rows.reduce((n, r) => n + Math.max(0, r.points || 0), 0);
  const types = ["All", ...new Set(state.rows.map((r) => r.type))];
  const worth = balance.rate ? (balance.points * balance.rate).toFixed(2) : null;
  // a payout uses approved points only: survey points wait for the research team's check
  const ready = balance.threshold > 0 && balance.approved >= balance.threshold;
  const [pay] = useAnswers(["payment-method-primary", "payment-method"]);
  const method = pay["payment-method-primary"] || pay["payment-method"] || "";
  return (
    <>
      <PageHead icon="gift" title="Rewards" art={pageArt(panel, "rewards")}
        lead="Your points, what they are worth, and every activity that earned them."
        facts={[["Balance", `${balance.points.toLocaleString()} pts`], ...(balance.pending > 0 ? [["Awaiting approval", `${balance.pending.toLocaleString()} pts`]] : []), ...(worth ? [["Worth about", `$${worth}`]] : []), ...(balance.threshold ? [["Payout at", `${balance.threshold.toLocaleString()} pts`]] : [])]} />
      <Vault compact />
      <Sources rows={activity.rows} ready={activity.ready} />
      <WaysToEarn />
      <div className="mx-grid mx-g2">
        <section className="mx-card" aria-labelledby="mx-redeem-h">
          <span className="mx-eyebrow">Payout</span>
          <h2 id="mx-redeem-h" style={{ marginTop: 6, fontSize: 21 }}>{ready ? "You can request a payout" : "Progress to your first payout"}</h2>
          <p className="mx-muted" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6 }}>
            {balance.threshold ? (ready ? "Your balance has reached the payout level. Send a request and the support team will process it." : `${Math.max(0, balance.threshold - balance.approved).toLocaleString()} more approved points until you can request a payout.${balance.pending > 0 ? ` ${balance.pending.toLocaleString()} survey points are awaiting approval.` : ""}`) : "The payout level could not be read right now."}
          </p>
          {balance.threshold > 0 && <div className="mx-meter" style={{ margin: "14px 0" }}><i style={{ "--p": Math.min(1, Math.max(0, balance.approved) / balance.threshold) }} /></div>}
          <div className="mx-row">
            {ready ? <button type="button" className="mx-btn" onClick={() => setPayout(true)}><Icon name="gift" size={18} />Request a payout</button>
              : <Link className="mx-btn" href="/member/surveys"><Icon name="surveys" size={18} />Earn more with surveys</Link>}
          </div>
        </section>
        <section className="mx-card" aria-labelledby="mx-method-h">
          <span className="mx-eyebrow">Payment method</span>
          <h2 id="mx-method-h" style={{ marginTop: 6, fontSize: 21 }}>{method ? PAY_LABEL[method] || cap(method) : "No payment method yet"}</h2>
          <p className="mx-muted" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6 }}>{method ? "This is the method we use when you request a payout. You can change it at any time." : "Add how you would like to be paid, so a payout request can be processed."}</p>
          <div className="mx-row" style={{ marginTop: 14 }}><Link className="mx-btn ghost" href="/member/myaccount?tab=payment"><Icon name="card" size={18} />{method ? "Manage payment methods" : "Add a payment method"}</Link></div>
        </section>
      </div>
      <section className="mx-card" aria-labelledby="mx-hist-h" data-tour="rewards-history-table">
        <div className="mx-sec-h">
          <div><span className="mx-eyebrow">History</span><h2 id="mx-hist-h" style={{ marginTop: 6 }}>Rewards history</h2>
            <p>{state.loading ? "Loading…" : `${rows.length} entr${rows.length === 1 ? "y" : "ies"} · ${earned.toLocaleString()} points earned in this view`}</p></div>
          <div className="mx-row">
            <div className="mx-filters" role="group" aria-label="Filter by type">
              {types.map((t) => <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)}>{t}</button>)}
            </div>
          </div>
        </div>
        <div className="mx-fields" style={{ marginBottom: 14, maxWidth: 520 }}>
          <Field label="From" id="mx-from"><input id="mx-from" className="mx-input" type="date" value={range[0]} max={range[1] || undefined} onChange={(e) => setRange([e.target.value, range[1]])} /></Field>
          <Field label="To" id="mx-to"><input id="mx-to" className="mx-input" type="date" value={range[1]} min={range[0] || undefined} onChange={(e) => setRange([range[0], e.target.value])} /></Field>
        </div>
        {(range[0] || range[1]) && <button type="button" className="mx-btn sm link" onClick={() => setRange(["", ""])} style={{ marginBottom: 10 }}>Clear dates</button>}
        {state.loading ? <div className="mx-skel" style={{ minHeight: 180 }} /> : state.failed && !rows.length ? (
          <div className="mx-alert bad" role="alert"><Icon name="alert" size={18} />Your history could not be loaded right now. Please try again shortly.</div>
        ) : rows.length ? (
          <div className="mx-tablewrap">
            <table className="mx-table stack">
              <thead><tr><th scope="col">Type</th><th scope="col">Activity</th><th scope="col">Date</th><th scope="col">Length</th><th scope="col">Status</th><th scope="col">Points</th></tr></thead>
              <tbody>
                {rows.map((r) => {
                  const [l, t] = STATUS[r.approval || r.status] || [cap(r.status || "—"), ""];
                  const resumable = r.type === "Survey" && r.status === "dropout" && r.source !== "external" && r.slug;
                  return (
                    <tr key={r.id}>
                      <td data-l="Type"><span className={`mx-type t-${r.type.toLowerCase()}`}><Icon name={TYPE_ICON[r.type] || "gift"} size={14} />{r.type}</span></td>
                      <td data-l="Activity"><b style={{ textTransform: r.type === "Profile" ? "capitalize" : undefined }}>{r.activity}</b></td>
                      <td data-l="Date">{fmtDate(r.date)}</td>
                      <td data-l="Length">{fmtLoi(r.loiMs)}</td>
                      <td data-l="Status">{resumable ? <a className="mx-btn sm" href={`/survey?name=${encodeURIComponent(r.slug)}`}>Continue</a> : <span className={`mx-chip ${t}`}>{l}</span>}</td>
                      <td data-l="Points"><b className={r.points > 0 ? "mx-plus" : ""}>{signed(r.points || 0)}</b></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : <Empty icon="gift" title="No rewards in this view yet">Complete profiles and surveys, have a friend join with your link, or follow MHO on social media to earn points.</Empty>}
      </section>
      <RequestPayout open={payout} onClose={() => setPayout(false)} points={balance.approved} worth={worth} method={method} />
    </>
  );
}
