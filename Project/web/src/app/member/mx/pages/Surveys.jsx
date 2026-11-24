"use client";
// Surveys: what is open for the member, what they started, and how every survey they took ended
// (completed, did not qualify, quota full). Taking a survey still goes through the existing runner (/survey?name=...),
// so screening and quota logic are unchanged. The panel's own health surveys from the supplied section package are
// shown with the package's cards, as before.
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/util";
import ProfileSection from "../../components/ProfileSection";
import SectionCard from "../../components/SectionCard";
import { useMx } from "../data";
import { PageHead, SurveyTiles, sectionHref, sectionTitle } from "../parts";
import { Icon, Tabs, Empty, fmtDate } from "../kit";
import { sectionArt } from "../art";

const norm = (v) => String(v ?? "").trim().toLowerCase();
const toList = (v) => (v === null || v === undefined ? [] : Array.isArray(v) ? v.flatMap(toList) : typeof v === "object" ? toList(v.answer ?? v.Answer ?? v.value) : [norm(v)]);
const isEligible = (survey, answers) => Object.entries(survey.filters || {}).every(([key, allowed]) => toList(answers?.[key]).some((a) => [].concat(allowed).map(norm).includes(a)));

/** Fallback when /me/dashboard is not available: the same survey list call the previous Surveys page made. */
function useLegacyList(enabled) {
  const [state, setState] = React.useState({ loading: enabled, list: [] });
  React.useEffect(() => {
    if (!enabled) return undefined;
    let live = true;
    (async () => {
      try {
        const resp = await api.post("/api/v1/me/survey", { status: "active" });
        const list = Array.isArray(resp?.data) ? resp.data : [];
        const keys = [...new Set(list.flatMap((s) => Object.keys(s.filters || {})))];
        let answers = {};
        if (keys.length) { try { answers = (await api.post("/api/v1/me", { questions: keys }))?.data || {}; } catch (e) { answers = {}; } }
        const ok = list.filter((s) => !Object.keys(s.filters || {}).length || isEligible(s, answers)).filter((s) => ["invited", "dropout"].includes(s.participationStatus) || !s.participationStatus);
        if (live) setState({ loading: false, list: ok.map((s) => ({ slug: s.slug, name: s.name, points: s.points, minutes: s.loi, source: s.source, resume: s.participationStatus === "dropout" })) });
      } catch (e) {
        if (live) setState({ loading: false, list: [] });
      }
    })();
    return () => { live = false; };
  }, [enabled]);
  return state;
}

const OUTCOME = {
  completed: ["Completed", "ok", "Thank you. Points are added for completed surveys."],
  "not-qualified": ["Did not qualify", "bad", "The screening questions showed this study needed a different profile. No points are given, and your profile is unaffected."],
  "quota-full": ["Quota full", "warn", "The study had already reached the number of people it needed."],
  "in-progress": ["In progress", "info", "You started this survey and can continue while it is open."],
};

/** How a member takes part, with where they are now: profiles first, then the panel's health surveys, then studies. */
function TakePart({ available, onOpenAvailable }) {
  const { d, balance } = useMx();
  const sections = d?.profile?.sections || [];
  const done = sections.filter((x) => x.status === "complete").length;
  const next = d?.profile?.next;
  const profP = sections.length ? done / sections.length : 0;
  const steps = [
    { icon: "profile", title: "Complete your profiles", text: sections.length ? `${done} of ${sections.length} done. Your answers decide which studies you are invited to.` : "Answer your profile questions.",
      p: profP, state: profP >= 1 ? "done" : "now", action: next ? <Link className="mx-btn sm" href={sectionHref(next)}>Continue: {sectionTitle(next)} <Icon name="arrow" size={14} /></Link> : <Link className="mx-btn sm ghost" href="/member/profiles">Open my profiles</Link> },
    { icon: "lock", title: "Unlock health surveys", text: "Your panel's health surveys open one by one once the About You profiles are complete.",
      p: null, state: profP >= 1 ? "now" : "next", action: <a className="mx-btn sm ghost" href="#mx-ps-h">See them <Icon name="arrow" size={14} /></a> },
    { icon: "surveys", title: "Take matched studies", text: available ? `${available} stud${available === 1 ? "y is" : "ies are"} open for you now. Each card shows the time and reward first.` : "New studies appear here when your answers match one.",
      p: null, state: available ? "now" : "next", action: available ? <button type="button" className="mx-btn sm" onClick={onOpenAvailable}>Start a survey <Icon name="arrow" size={14} /></button> : null },
    { icon: "gift", title: "Earn and redeem points", text: `${balance.points.toLocaleString()} points so far. Points land in Rewards as soon as a survey is complete.`,
      p: balance.threshold ? Math.min(1, balance.points / balance.threshold) : null, state: "next", action: <Link className="mx-btn sm ghost" href="/member/rewards">My rewards</Link> },
  ];
  return (
    <section className="mx-card mx-takepart" aria-labelledby="mx-tp-h">
      <span className="mx-eyebrow">How to take part</span>
      <h2 id="mx-tp-h" style={{ margin: "6px 0 18px" }}>Four steps from profile to reward</h2>
      <ol>
        {steps.map((st, i) => (
          <li key={st.title} className={`st-${st.state}`} style={{ "--i": i }}>
            <span className="num" aria-hidden="true">
              {st.p != null && <svg className="ring" viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" className="bg" /><circle cx="22" cy="22" r="19" className="fg" style={{ "--p": st.p }} /></svg>}
              <Icon name={st.state === "done" ? "check" : st.icon} size={18} />
            </span>
            <b>{i + 1}. {st.title}</b>
            <span className="tx">{st.text}</span>
            {st.action && <span className="act">{st.action}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}

function PanelSurveys() {
  const { sectionLang: lang, mode } = useMx();
  const handle = React.useRef(null);
  const [items, setItems] = React.useState([]);
  const [ready, setReady] = React.useState(false);
  const onItems = React.useCallback((list) => { setItems(Array.isArray(list) ? list : []); setReady(true); }, []);
  return (
    <>
      <ProfileSection lang={lang} theme={mode} view="headless" categories={["patient", "care giver", "healthcare professional"]} handleRef={handle} onItems={onItems} />
      {ready && items.length > 0 && (
        <section className="mx-card" aria-labelledby="mx-ps-h">
          <div className="mx-sec-h"><div><span className="mx-eyebrow">Panel surveys</span><h2 id="mx-ps-h" style={{ marginTop: 6 }}>Your panel&apos;s profile steps and health surveys</h2>
            <p>Your panel&apos;s own steps, in the order your panel sets. Locked health surveys open once the About You profiles before them are complete.</p></div></div>
          <div className="mx-pcards mx-embed">
            {items.map((it, i) => <SectionCard key={it?.p?.id || i} handle={handle.current} item={{ ...it, n: i + 1 }} />)}
          </div>
        </section>
      )}
    </>
  );
}

export default function Surveys() {
  const { d, dash, panel } = useMx();
  const legacy = useLegacyList(!dash.loading && !d);
  const s = d?.surveys;
  const available = s ? s.available : legacy.list.filter((x) => !x.resume);
  const inProgress = s ? s.inProgress : legacy.list.filter((x) => x.resume);
  const history = s?.history || [];
  const q = useSearchParams();
  const [tab, setTab] = React.useState(() => (["available", "progress", "history"].includes(q?.get("tab")) ? q.get("tab") : "available"));
  const [filter, setFilter] = React.useState("all");
  const shown = available.filter((x) => (filter === "high" ? Number(x.points) > 500 : filter === "short" ? Number(x.minutes) > 0 && Number(x.minutes) <= 5 : true));
  const counts = s?.counts;
  const loading = dash.loading || legacy.loading;
  const facts = [
    ["Available", available.length],
    ["In progress", inProgress.length],
    ...(counts ? [["Completed", counts.completed], ["Points from surveys", (s.pointsEarned || 0).toLocaleString()]] : []),
  ];
  return (
    <>
      <PageHead icon="surveys" title="Surveys" facts={loading ? [] : facts} art={sectionArt(panel, "survey", "survey participation")}
        lead="Studies matched to your profile answers. Each card shows the reward and the expected time. Screening questions at the start decide whether a study fits you." />
      <TakePart available={available.length} onOpenAvailable={() => { setTab("available"); document.getElementById("mx-sv-list")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} />
      <span id="mx-sv-list" />
      <Tabs label="Survey lists" value={tab} onChange={setTab} tabs={[
        { id: "available", label: `Available (${available.length})`, icon: "spark" },
        { id: "progress", label: `In progress (${inProgress.length})`, icon: "clock" },
        { id: "history", label: `History (${history.length})`, icon: "calendar" },
      ]} />
      <section className="mx-card" role="tabpanel" id={`panel-${tab}`}  aria-labelledby={`tab-${tab}`} data-tour="surveys-list">
        {loading ? <div className="mx-skel" style={{ minHeight: 200 }} /> : tab === "available" ? (
          <>
            <div className="mx-spread" style={{ marginBottom: 14 }}>
              <p className="mx-muted" style={{ fontSize: 14 }}>{available.length ? `${available.length} survey${available.length === 1 ? "" : "s"} open for you.` : ""}</p>
              <div className="mx-filters" role="group" aria-label="Filter surveys">
                {[["all", "All"], ["high", "High reward"], ["short", "Short"]].map(([k, l]) => <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}>{l}</button>)}
              </div>
            </div>
            {shown.length ? <SurveyTiles list={shown} /> : (
              <Empty icon="surveys" title={available.length ? "No survey matches this filter" : "No surveys open for you right now"}
                action={available.length ? <button type="button" className="mx-btn sm ghost" onClick={() => setFilter("all")}>Show all</button> : <Link className="mx-btn sm" href="/member/profiles">Complete my profile</Link>}>
                {available.length ? "Try another filter." : "New studies are matched to your answers. The more of your profile you complete, the more studies you can be invited to. We also let you know by your chosen notification methods."}
              </Empty>
            )}
          </>
        ) : tab === "progress" ? (
          inProgress.length ? <SurveyTiles list={inProgress} resume /> : <Empty icon="clock" title="Nothing in progress">Surveys you start and leave before the end appear here, so you can continue while they are open.</Empty>
        ) : history.length ? (
          <div className="mx-tablewrap">
            <table className="mx-table stack">
              <thead><tr><th scope="col">Survey</th><th scope="col">Outcome</th><th scope="col">Started</th><th scope="col">Ended</th><th scope="col">Points</th><th scope="col"><span className="sr">Action</span></th></tr></thead>
              <tbody>
                {history.map((h, i) => {
                  const [label, tone, why] = OUTCOME[h.status] || [h.status, "", ""];
                  return (
                    <tr key={`${h.slug}-${i}`}>
                      <td data-l="Survey"><b>{h.name}</b></td>
                      <td data-l="Outcome"><span className={`mx-chip ${tone}`} title={why}>{label}</span></td>
                      <td data-l="Started">{fmtDate(h.startedAt)}</td>
                      <td data-l="Ended">{h.status === "in-progress" ? "—" : fmtDate(h.endedAt)}</td>
                      <td data-l="Points">{h.points ? h.points.toLocaleString() : "—"}</td>
                      <td data-l="Action">{h.resumable ? <a className="mx-btn sm" href={`/survey?name=${encodeURIComponent(h.slug)}`}>Continue</a> : ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <ul className="mx-list" style={{ marginTop: 12 }}>
              {Object.entries(OUTCOME).filter(([k]) => history.some((h) => h.status === k)).map(([k, [l, t, why]]) => (
                <li key={k} className="mx-item"><span className={`ic ${t}`}><Icon name="help" size={18} /></span><span className="tx"><b>{l}</b><span>{why}</span></span><span /></li>
              ))}
            </ul>
          </div>
        ) : <Empty icon="calendar" title="No survey history yet">Surveys you take will be listed here with how each one ended.</Empty>}
      </section>
      <PanelSurveys />
      <section className="mx-card" aria-labelledby="mx-how-h">
        <span className="mx-eyebrow">How surveys work</span>
        <h2 id="mx-how-h" style={{ margin: "6px 0 16px" }}>From invitation to reward</h2>
        <ol className="mx-how">
          <li><span className="ic"><Icon name="profile" size={18} /></span><b>Matched to you</b><span>Surveys are picked from your profile answers, so a complete profile brings more invitations.</span></li>
          <li><span className="ic"><Icon name="filter" size={18} /></span><b>Short screening</b><span>The first questions check whether a study needs someone like you. If not, the survey ends early.</span></li>
          <li><span className="ic"><Icon name="check" size={18} /></span><b>Finish the survey</b><span>Each card shows the time it takes and the points it pays, before you start.</span></li>
          <li><span className="ic"><Icon name="gift" size={18} /></span><b>Points to rewards</b><span>Points land in Rewards. Once you reach the payout level you can request a payout.</span></li>
        </ol>
      </section>
    </>
  );
}
