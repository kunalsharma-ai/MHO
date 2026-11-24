import mongoose from "mongoose";
import { segmentFor } from "./segments.js";
import { journeyFor, latestConsent } from "./journey.js";
import { profileStatus, highlightsFor } from "./profileStatus.js";

const norm = (v) => String(v ?? "").trim().toLowerCase();
// same rule as new-module/Survey.js applyEligibility: every filter question must match one of the member's answers
const qualifies = (filters, answers) =>
    Object.entries(filters || {}).every(([question, allowed]) => {
        const allow = [].concat(allowed).map(norm);
        if (!allow.length) return true;
        const mine = [].concat(answers?.[question] ?? []).map(norm);
        return mine.some((a) => allow.includes(a));
    });

const NOT_RESEARCH = new Set(["welcome"]); // the onboarding questionnaire is not shown as a research survey

/** Surveys of the member's category split by their own participation, from the Survey and Response collections. */
export async function surveysFor(user) {
    const Survey = mongoose.model("Survey");
    const Response = mongoose.model("Response");
    const Answer = mongoose.model("Answer");
    const now = new Date();
    const [surveys, responses] = await Promise.all([
        Survey.find({ category: norm(user.category), origin: user.origin, isActive: { $ne: false }, isDeleted: { $ne: true } })
            .select("slug name summary icon points loi status active filters source link createdAt").lean(),
        Response.find({ user: user._id, isDeleted: { $ne: true } }).select("survey status timeline points updatedAt createdAt").sort({ updatedAt: -1 }).lean(),
    ]);
    const research = surveys.filter((s) => !NOT_RESEARCH.has(s.slug));
    const bySlug = Object.fromEntries(research.map((s) => [s.slug, s]));
    const filterQs = [...new Set(research.flatMap((s) => Object.keys(s.filters || {})))];
    const answerRows = filterQs.length ? await Answer.find({ user: String(user._id), question: { $in: filterQs } }).select("+answer question").lean() : [];
    const answers = Object.fromEntries(answerRows.map((r) => [r.question, [].concat(r.answer ?? [])]));
    const taken = new Set(responses.map((r) => r.survey?.slug));
    const open = (s) => norm(s.status) === "active" && (!s.active?.from || new Date(s.active.from) <= now) && (!s.active?.to || new Date(s.active.to) >= now);
    const card = (s) => ({ slug: s.slug, name: s.name, summary: s.summary || "", points: s.points || 0, minutes: s.loi || null, source: s.source, launchedAt: s.active?.from || s.createdAt || null });

    const available = research.filter((s) => open(s) && !taken.has(s.slug) && qualifies(s.filters, answers)).map(card);
    const history = responses
        .filter((r) => !NOT_RESEARCH.has(r.survey?.slug))
        .map((r) => ({
            slug: r.survey?.slug,
            name: bySlug[r.survey?.slug]?.name || r.survey?.name || r.survey?.slug,
            status: { dropout: "in-progress", complete: "completed", terminate: "not-qualified", overquota: "quota-full" }[norm(r.status)] || norm(r.status),
            startedAt: r.timeline?.start || r.createdAt,
            endedAt: r.timeline?.end || null,
            points: norm(r.status) === "complete" ? r.points || 0 : 0,
            resumable: norm(r.status) === "dropout" && Boolean(bySlug[r.survey?.slug] && open(bySlug[r.survey?.slug])),
        }));
    const count = (st) => history.filter((h) => h.status === st).length;
    return {
        available,
        inProgress: history.filter((h) => h.status === "in-progress"),
        completed: history.filter((h) => h.status === "completed"),
        history: history.slice(0, 20),
        counts: {
            available: available.length,
            inProgress: count("in-progress"),
            completed: count("completed"),
            notQualified: count("not-qualified") + count("quota-full"),
            participated: history.length,
        },
        pointsEarned: history.reduce((a, h) => a + h.points, 0),
    };
}

/** Notifications built from the member's real state (there is no stored notification feed in the API). */
function notificationsFor({ journey, profile, surveys }) {
    const list = [];
    if (journey.consent?.status === "outdated") list.push({ kind: "consent", level: "action", text: "The panel terms were updated. Please review and sign the new version.", action: "consent" });
    if (surveys.counts.available) list.push({ kind: "surveys", level: "info", text: `${surveys.counts.available} survey${surveys.counts.available === 1 ? " is" : "s are"} available for your profile.`, action: "surveys" });
    if (surveys.inProgress.some((s) => s.resumable)) list.push({ kind: "resume", level: "info", text: "You have a survey in progress. You can pick up where you left off.", action: "surveys" });
    const next = profile.sections.find((s) => s.status !== "complete");
    if (next) list.push({ kind: "profile", level: "action", text: `Complete your ${next.name} to be matched with more studies.`, action: "profile", section: next.slug });
    if (journey.consent?.status === "valid" && journey.consent.signedAt) list.push({ kind: "consent-ok", level: "done", text: "Your consent has been recorded.", at: journey.consent.signedAt });
    return list;
}

export async function dashboardFor(user) {
    const segment = segmentFor(user.category);
    const [journey, profile, surveys, consent, highlights] = await Promise.all([
        journeyFor(user),
        profileStatus(user),
        surveysFor(user),
        latestConsent(user._id),
        highlightsFor(user, segmentFor(user.category)?.id),
    ]);
    const home = (user.address || []).find((a) => a.tag === "home") || user.address?.[0] || {};
    const nextSection = profile.sections.find((s) => s.status !== "complete") || null;
    return {
        segment: segment?.id || "",
        member: {
            firstName: user.name?.first || "",
            lastName: user.name?.last || "",
            memberId: user.respondentID || String(user._id).slice(-8).toUpperCase(),
            joinedAt: user.createdAt,
            country: home.country || "",
            city: home.city || "",
            qualityScore: user.qualityScore ?? null,
            picture: user.profilePicture || null,
        },
        journey,
        profile: { ...profile, next: nextSection },
        highlights,
        surveys,
        consent: consent
            ? { action: consent.action, consentId: consent.consentId, version: consent.termsVersion, at: consent.acceptedAt, approvals: consent.approvals || null, current: journey.consent?.currentVersion }
            : { action: null, current: journey.consent?.currentVersion },
        notifications: notificationsFor({ journey, profile, surveys }),
        generatedAt: new Date(),
    };
}
