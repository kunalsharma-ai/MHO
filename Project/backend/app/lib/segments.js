// One place that maps a member's stored `category` to their segment, and the segment to its consent
// document, mail templates and dashboard. Everything that branches by segment reads from here, so a
// patient can never be handed the healthcare-professional consent or dashboard by accident.
//
// Consent versions and approvals come from the supplied consent packages (src/config.js and
// server/schema.sql of mho-pro-consent, mho-care-consent and mho-patient-consent, effective 2026-10-18).
// Bump `termsVersion` (or set the env var) when the meaning of a document changes: every member of that
// segment is then asked to consent again at their next login.

export const SEGMENTS = {
    hcp: {
        id: "hcp",
        label: "Healthcare Professional",
        category: "healthcare professional",
        termsVersion: process.env.MHO_TERMS_VERSION_HCP || "HCP-2026.10",
        consentPage: "/consent/healthcare/",
        mailer: "hcp",
        dashboard: "/member/dashboard",
    },
    caregiver: {
        id: "caregiver",
        label: "Caregiver",
        category: "care giver",
        termsVersion: process.env.MHO_TERMS_VERSION_CAREGIVER || "CG-2026.10",
        consentPage: "/consent/caregiver/",
        mailer: "caregiver",
        dashboard: "/member/dashboard",
    },
    patient: {
        id: "patient",
        label: "Patient",
        category: "patient",
        termsVersion: process.env.MHO_TERMS_VERSION_PATIENT || "PT-2026.10",
        consentPage: "/consent/patient/",
        mailer: "patient",
        dashboard: "/member/dashboard",
    },
};

// The approvals each consent package asks for. Required ones must be true to sign; optional ones default to false.
export const REQUIRED_APPROVALS = ["terms", "privacy", "accuracy", "confidential"];
export const OPTIONAL_APPROVALS = ["interviews", "clientContact", "sensitive", "marketing", "analytics"];

/** "healthcare professional" | "care giver" | "patient" (plus age variants such as "minor patient") → segment id, or "". */
export function segmentOf(category) {
    const c = String(category || "").trim().toLowerCase();
    if (!c) return "";
    const exact = Object.values(SEGMENTS).find((s) => s.category === c);
    if (exact) return exact.id;
    if (/care\s*-?\s*giver|carer/.test(c)) return "caregiver";
    if (/patient/.test(c)) return "patient";
    if (/health|professional|doctor|clinician|nurse|pharmac/.test(c)) return "hcp";
    return "";
}

export const segmentFor = (category) => SEGMENTS[segmentOf(category)] || null;
