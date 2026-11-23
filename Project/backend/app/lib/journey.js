import { ConsentRecord } from "../model/index.js";
import { segmentFor } from "./segments.js";

/** Latest consent record of the member (accept or decline), or null. */
export const latestConsent = (userId) => ConsentRecord.findOne({ user: userId }).sort({ acceptedAt: -1, _id: -1 }).lean();

/**
 * Where a logged-in member stands and where they go next. Used by the login response, GET /me/journey and the
 * member-area gate, so every screen applies the same rule:
 *   email not verified → verify · no valid consent for the current version → consent · otherwise → dashboard.
 * The welcome survey is no longer part of this journey.
 */
export async function journeyFor(user) {
    const segment = segmentFor(user.category);
    const emailVerified = user.isVerified?.email === "verified";
    const role = String(user.role || "").toLowerCase();
    const isAdmin = ["admin", "administrator", "root", "superadmin"].includes(role);
    const out = {
        segment: segment?.id || "",
        emailVerified,
        accountStatus: emailVerified ? "active" : "pending",
        consent: null,
        next: "dashboard",
        nextUrl: segment?.dashboard || "/member/dashboard",
    };
    if (isAdmin) return { ...out, next: "admin", nextUrl: "/admin/dashboard" };
    if (!segment) return { ...out, next: "support", nextUrl: "/member/support" };
    if (!emailVerified) return { ...out, next: "verify-email", nextUrl: "/login?verify=1" };

    const last = await latestConsent(user._id);
    const lastAccept = last?.action === "accept" ? last : await ConsentRecord.findOne({ user: user._id, action: "accept" }).sort({ acceptedAt: -1 }).lean();
    let status = "missing";
    if (lastAccept && lastAccept.segment === segment.id && lastAccept.termsVersion === segment.termsVersion) status = "valid";
    else if (lastAccept) status = "outdated"; // older version, or signed under another segment
    if (last?.action === "decline" && status !== "valid") status = "declined";
    out.consent = {
        status,
        required: status !== "valid",
        currentVersion: segment.termsVersion,
        signedVersion: lastAccept?.termsVersion || null,
        signedAt: lastAccept?.acceptedAt || null,
        consentId: lastAccept?.consentId || null,
    };
    if (status !== "valid") return { ...out, next: "consent", nextUrl: segment.consentPage };
    return out;
}
