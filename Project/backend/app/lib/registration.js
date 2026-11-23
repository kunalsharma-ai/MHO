import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Category } from "../model/index.js";
import { SEGMENTS } from "./segments.js";
import { countryOf, statesOf, stateOf, postalPattern } from "./world.js";

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}' .-]{0,59}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ") : "");

export const HCP_SCREEN_OUT =
    "Thank you for your interest. You don’t meet our healthcare recruitment criteria, so we can’t create a professional account for you.";

export function ageOn(dobIso, today = new Date()) {
    const [y, m, d] = String(dobIso).split("-").map(Number);
    let age = today.getUTCFullYear() - y;
    const md = (today.getUTCMonth() + 1) * 100 + today.getUTCDate();
    if (md < m * 100 + d) age -= 1;
    return age;
}

/**
 * The member category to store, following the age rule the Category collection already holds for the segment
 * (min / max / underfall / overfall, defaults 18–110). Returns "" when the person is not eligible.
 */
export const MIN_SIGNUP_AGE = 18; // Kunal's decision 2026-11-23: new sign-ups are 18+, matching the consent text

export async function categoryForAge(segment, age, origin) {
    if (age < MIN_SIGNUP_AGE) return ""; // no "minor" categories for new sign-ups, whatever underfall the database holds
    const name = SEGMENTS[segment].category;
    const doc = await Category.findOne({ name, origin, isDeleted: { $ne: true } }).lean();
    const rule = { min: 18, max: 110, underfall: null, overfall: null, ...(doc?.age || {}) };
    if (age < rule.min) return rule.underfall || "";
    if (age > rule.max) return rule.overfall || "";
    return name;
}

/**
 * Validates the new registration form. Returns { errors, value } where errors maps field → message.
 * Every rule here is enforced on the server, whatever the browser sent.
 */
export function validateRegistration(body = {}) {
    const errors = {};
    const v = {
        firstName: clean(body.firstName),
        middleName: clean(body.middleName),
        lastName: clean(body.lastName),
        dob: clean(body.dob),
        email: clean(body.email).toLowerCase(),
        phone: clean(body.phone),
        phoneCountry: clean(body.phoneCountry || body.country).toUpperCase(),
        country: clean(body.country).toUpperCase(),
        state: clean(body.state).toUpperCase(),
        city: clean(body.city),
        postalCode: clean(body.postalCode).toUpperCase(),
        postalCodeNotApplicable: body.postalCodeNotApplicable === true,
        segment: clean(body.segment).toLowerCase(),
        worksInHealthcare: clean(body.screening?.worksInHealthcare).toLowerCase(),
        clinician: clean(body.screening?.clinician).toLowerCase(),
        timezone: clean(body.timezone),
    };

    if (!v.firstName) errors.firstName = "Please enter your first name.";
    else if (!NAME_RE.test(v.firstName)) errors.firstName = "Use letters only (spaces, hyphens and apostrophes are fine).";
    if (v.middleName && !NAME_RE.test(v.middleName)) errors.middleName = "Use letters only (spaces, hyphens and apostrophes are fine).";
    if (v.lastName && !NAME_RE.test(v.lastName)) errors.lastName = "Use letters only (spaces, hyphens and apostrophes are fine).";

    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.dob) || Number.isNaN(Date.parse(`${v.dob}T00:00:00Z`))) errors.dob = "Please enter your date of birth.";
    else if (new Date(`${v.dob}T00:00:00Z`) > new Date()) errors.dob = "Your date of birth cannot be in the future.";
    else if (ageOn(v.dob) > 120) errors.dob = "Please check your date of birth.";

    if (!v.email) errors.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(v.email) || v.email.length > 254) errors.email = "Please enter a valid email address.";

    const country = countryOf(v.country);
    if (!country) errors.country = "Please choose your country.";

    if (!v.phone) errors.phone = "Please enter your phone number.";
    else {
        const parsed = v.phone.startsWith("+")
            ? parsePhoneNumberFromString(v.phone)
            : parsePhoneNumberFromString(v.phone, v.phoneCountry || undefined);
        if (!parsed || !parsed.isValid()) errors.phone = "Please enter a valid phone number for the selected country.";
        else v.phone = parsed.number.replace(/^\+/, ""); // stored as digits with the dialling code, like existing members
    }

    if (country) {
        const states = statesOf(v.country);
        if (states.length) {
            if (!v.state) errors.state = "Please choose your state or province.";
            else if (!stateOf(v.country, v.state)) errors.state = "Please choose a state or province from the list.";
        } else v.state = "";
        const st = stateOf(v.country, v.state);
        if (st?.cities?.length) {
            if (!v.city) errors.city = "Please choose your city.";
        }
        if (v.city.length > 100) errors.city = "Please shorten the city name.";
        if (!v.postalCodeNotApplicable) {
            const re = postalPattern(v.country);
            if (!v.postalCode) errors.postalCode = "Please enter your postal code, or tick “Postal code not applicable”.";
            else if (re ? !re.test(v.postalCode) : !/^[A-Z0-9][A-Z0-9 -]{1,11}$/.test(v.postalCode))
                errors.postalCode = `This doesn’t look like a valid postal code for ${country.name}.`;
        } else v.postalCode = "";
        if (!v.timezone) v.timezone = country.timezones?.[0]?.zoneName || "UTC";
    }

    if (!SEGMENTS[v.segment]) errors.segment = "Please choose whether you are a healthcare professional, a caregiver or a patient.";
    if (v.segment === "hcp") {
        if (!["yes", "no"].includes(v.worksInHealthcare)) errors.worksInHealthcare = "Please answer this question.";
        if (v.worksInHealthcare === "yes" && !["yes", "no"].includes(v.clinician)) errors.clinician = "Please answer this question.";
    }
    return { errors, value: v };
}
