"use client";
// My Profile: the member's own profile questionnaires. The questions, options, skip logic, validation, saving and
// rewards are the supplied panel section packages (Project/sections/*), mounted unchanged; this page adds the panel
// head with the member's real completion, and opens a section directly when linked with ?open=<slug>.
import React from "react";
import { useSearchParams } from "next/navigation";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import ProfileSection, { sectionOf } from "../../components/ProfileSection";
import OldProfiles from "../../(member pages)/profiles/page_old";
import { useMx } from "../data";
import { PageHead, sectionTitle } from "../parts";
import { sectionArt } from "../art";
import { Icon } from "../kit";
import Family from "./Family";

function Opener({ handleRef }) {
  const params = useSearchParams();
  const want = params?.get("open");
  React.useEffect(() => {
    if (!want) return undefined; // the sections accept their own id, the database slug or the profile name
    let tries = 0;
    const id = setInterval(() => {
      tries += 1;
      if (handleRef.current?.open) { try { handleRef.current.open(want); } catch (e) { /* unknown slug: stay on the list */ } clearInterval(id); }
      if (tries > 40) clearInterval(id);
    }, 150);
    return () => clearInterval(id);
  }, [want, handleRef]);
  return null;
}

export default function Profiles() {
  const { member, d, panel, sectionLang: lang, mode, sound } = useMx();
  const [failed, setFailed] = React.useState(false);
  const handleRef = React.useRef(null);
  if (!member) return <LoadingOverlay />;
  // members under 18 answer the questions the bank tags for teens, shared with their parent (Family page)
  if (String(member.category || "").trim().toLowerCase() === "minor patient") return <Family />;
  const sections = d?.profile?.sections || [];
  const done = sections.filter((s) => s.status === "complete").length;
  const next = d?.profile?.next;
  const facts = sections.length ? [["Profiles complete", `${done} / ${sections.length}`], ["Questions answered", `${d?.profile?.overall ?? 0}%`], ...(next ? [["Next up", sectionTitle(next)]] : [])] : [];
  return (
    <>
      <PageHead icon="profile" title="My Profile" facts={facts} art={sectionArt(panel, next?.slug || "basic", next?.name || "basic")}
        lead="Answer your profile sections step by step. Your answers are saved to your account as you go, and you can come back to edit any of them." />
      <React.Suspense fallback={null}><Opener handleRef={handleRef} /></React.Suspense>
      {!sectionOf(member.category) || failed ? (
        <>
          {failed && <div className="mx-alert bad" role="alert"><Icon name="alert" size={18} />Your panel&apos;s profile section could not be loaded, so the standard profile form is shown instead.</div>}
          <div className="mx-card"><OldProfiles /></div>
        </>
      ) : (
        <div className="mx-embed" style={{ borderRadius: 28, overflow: "hidden", boxShadow: "var(--sh-lg)" }}>
          <ProfileSection lang={lang} theme={mode} sound={sound} view="profiles" handleRef={handleRef} onFail={() => setFailed(true)}/>
        </div>
      )}
    </>
  );
}
