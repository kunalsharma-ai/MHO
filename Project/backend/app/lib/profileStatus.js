import mongoose from "mongoose";
import { segmentFor } from "./segments.js";

const filled = (v) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && (v.length === 0 || v.every((x) => x === "" || x === null)));

/**
 * Profile completion of one member, computed from the profiles and questions in the database (the same rules as
 * controller/Profile.js status(): a follow-up question only counts when its parent answer triggers it), but only
 * for the profiles of the member's own category. Returns sections in database order with real counts.
 */
export async function profileStatus(user) {
    const Profile = mongoose.model("Profile");
    const Question = mongoose.model("Question");
    const Option = mongoose.model("Option");
    const Answer = mongoose.model("Answer");
    const Validation = mongoose.models.Validation || null;
    const base = { isActive: { $ne: false }, isDeleted: { $ne: true }, origin: user.origin };
    let profiles = await Profile.find({ ...base, category: String(user.category).toLowerCase() }).sort({ sortOrder: 1, _id: 1 }).lean();
    if (!profiles.length) {
        const seg = segmentFor(user.category);
        if (seg) profiles = await Profile.find({ ...base, category: seg.category }).sort({ sortOrder: 1, _id: 1 }).lean();
    }
    profiles = profiles.filter((p) => !/not in use/i.test(p.name || ""));
    if (!profiles.length) return { overall: 0, sections: [], completed: 0, total: 0, configured: false };

    const namesOf = (p) => [...new Set((p.pages || []).flatMap((page) => (Array.isArray(page) ? page.slice(1) : [])))];
    const all = [...new Set(profiles.flatMap(namesOf))];
    const [questions, options, validations, answers] = await Promise.all([
        Question.find({ name: { $in: all } }).select("name parent label").lean(),
        Option.find({ question: { $in: all } }).select("question parentValue").lean(),
        Validation ? Validation.find({ question: { $in: all } }).select("question parentValue").lean() : [],
        Answer.find({ user: String(user._id), question: { $in: all } }).select("+answer question").lean(),
    ]);
    const qBy = Object.fromEntries(questions.map((q) => [q.name, q]));
    const triggers = {};
    [...options, ...validations].forEach((d) => {
        [].concat(d.parentValue ?? []).forEach((v) => {
            if (v && v !== "-") (triggers[d.question] ||= new Set()).add(String(v).toLowerCase());
        });
    });
    const ans = Object.fromEntries(answers.map((a) => [a.question, a.answer]));
    // fields kept on the user record count as answered
    const home = (user.address || []).find((a) => a.tag === "home") || user.address?.[0] || {};
    Object.assign(ans, {
        fullname: [user.name?.first, user.name?.last].filter(Boolean).join(" "),
        mail: user.mail,
        dob: user.dob ? String(user.dob) : "",
        gender: ans.gender ?? user.gender ?? "",
        country: ans.country ?? home.country ?? "",
        state: ans.state ?? home.state ?? "",
        city: ans.city ?? home.city ?? "",
        zipcode: ans.zipcode ?? (user.postalCodeApplicable === false ? "n/a" : home.zipcode ?? ""),
    });
    const first = (v) => (Array.isArray(v) ? v[0] : v);
    const memo = {};
    const applies = (name, seen = new Set()) => {
        if (name in memo) return memo[name];
        const q = qBy[name];
        if (!q) return (memo[name] = ["fullname", "mail", "dob", "country", "state", "city", "zipcode", "gender"].includes(name));
        if (!q.parent) return (memo[name] = true);
        if (seen.has(name)) return (memo[name] = false);
        seen.add(name);
        if (!applies(q.parent, seen)) return (memo[name] = false);
        const parent = first(ans[q.parent]);
        if (!filled(parent)) return (memo[name] = false);
        const t = triggers[name];
        return (memo[name] = !t || t.size === 0 || t.has(String(parent).toLowerCase()));
    };

    const sections = profiles.map((p) => {
        const names = namesOf(p).filter((n) => applies(n));
        const answered = names.filter((n) => filled(ans[n])).length;
        const total = names.length;
        const percent = total ? Math.round((answered / total) * 100) : 0;
        return {
            slug: p.slug || p.name,
            name: p.name,
            answered,
            total,
            percent,
            status: total && answered === total ? "complete" : answered > 0 ? "in-progress" : "not-started",
            missing: names.filter((n) => !filled(ans[n])).slice(0, 5).map((n) => qBy[n]?.label || n),
        };
    }).filter((s) => s.total > 0);
    const totalQ = sections.reduce((a, s) => a + s.total, 0);
    const doneQ = sections.reduce((a, s) => a + s.answered, 0);
    return {
        configured: true,
        overall: totalQ ? Math.round((doneQ / totalQ) * 100) : 0,
        completed: sections.filter((s) => s.status === "complete").length,
        total: sections.length,
        sections,
        state: doneQ === 0 ? "not-started" : doneQ === totalQ ? "complete" : "in-progress",
    };
}

/** Plain-language answers to a few segment questions, for the dashboard's "about you" panel (labels from the DB). */
export const HIGHLIGHTS = {
    hcp: ["doc-expertise", "doc-specialization", "doc-joblevel", "doc-employment-status", "sector", "facility-type"],
    caregiver: ["caregiving-situation", "primary-care-recipient", "cg-describe", "cg-professional-experience"],
    patient: ["health-status", "primary-health-condition", "first-diagnosed-timing", "manages-treatment"],
};

export async function highlightsFor(user, segmentId) {
    const names = HIGHLIGHTS[segmentId] || [];
    if (!names.length) return [];
    const Question = mongoose.model("Question");
    const Option = mongoose.model("Option");
    const Answer = mongoose.model("Answer");
    const [qs, answers] = await Promise.all([
        Question.find({ name: { $in: names } }).select("name label").lean(),
        Answer.find({ user: String(user._id), question: { $in: names } }).select("+answer question").lean(),
    ]);
    const values = answers.flatMap((a) => [].concat(a.answer || []));
    const opts = values.length ? await Option.find({ question: { $in: names }, value: { $in: values } }).select("question value label").lean() : [];
    const labelOf = (q, v) => opts.find((o) => o.question === q && String(o.value) === String(v))?.label || v;
    const byQ = Object.fromEntries(answers.map((a) => [a.question, [].concat(a.answer || []).filter(Boolean)]));
    return names.map((n) => ({
        question: n,
        label: qs.find((q) => q.name === n)?.label || n,
        value: (byQ[n] || []).map((v) => labelOf(n, v)).join(", "),
    }));
}
