// Issue #44: sign-up keeps the member's country, state, city and postal code on the account (User.address), not as
// profile answers. The profile sections read answers by question name (POST /api/v1/me), so these four came back
// empty and the member's Basic profile looked unfilled straight after login, while the header already counted them
// as answered (lib/profileStatus.js). This turns the account's home address into the answers the question bank expects:
//   country  "IN"     (option values are ISO 3166-1 alpha-2, upper case)
//   state    "IN-DL"  (option values are <country>-<state code>)
//   city     "New Delhi" (as written in the location list when it is there; the account stores it in lower case)
//   zipcode  "110001"
import { countryOf, stateOf } from "./world.js";

const home = (user) => (user?.address || []).find((a) => a?.tag === "home") || user?.address?.[0] || null;

export function accountAnswers(user) {
    const a = home(user);
    if (!a) return {};
    const out = {};
    const cc = String(a.country || "").trim().toUpperCase();
    if (cc && countryOf(cc)) out.country = cc;
    const raw = String(a.state || "").trim().toUpperCase();
    const st = raw.startsWith(`${cc}-`) ? raw.slice(cc.length + 1) : raw;
    const state = cc && st ? stateOf(cc, st) : null;
    if (state) out.state = `${cc}-${st}`;
    const city = String(a.city || "").trim();
    if (city) out.city = (state?.cities || []).find((c) => c.toLowerCase() === city.toLowerCase()) || city.replace(/(^|[\s-])\p{L}/gu, (m) => m.toUpperCase());
    const zip = String(a.zipcode || "").trim();
    if (zip) out.zipcode = zip.toUpperCase();
    return out;
}

/** The asked-for questions the member has no saved answer for, filled from the account. Saved answers always win. */
export function fillFromAccount(user, asked, saved) {
    const want = new Set(asked || []);
    return Object.fromEntries(Object.entries(accountAnswers(user)).filter(([k]) => want.has(k) && !(k in (saved || {}))));
}
