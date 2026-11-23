import fs from "fs";

// The existing MHO location dataset: 250 countries/territories with ISO codes, dialling codes, flags,
// states/provinces, ~148k cities and postal-code formats (zipFormat) for the countries that have one.
export const world = JSON.parse(fs.readFileSync(new URL("../dataBank/theworld.json", import.meta.url), "utf-8"));

export const countryOf = (iso2) => world[String(iso2 || "").toUpperCase()] || null;

export const statesOf = (iso2) => {
    const c = countryOf(iso2);
    return c ? Object.values(c.states || {}) : [];
};

export const stateOf = (iso2, stateCode) => {
    const c = countryOf(iso2);
    return c?.states?.[String(stateCode || "").toUpperCase()] || null;
};

/** The country's postal-code pattern, anchored, or null when the dataset has none. */
export function postalPattern(iso2) {
    const f = countryOf(iso2)?.zipFormat;
    if (!f) return null;
    try { return new RegExp(`^(?:${f})$`, "i"); } catch { return null; }
}
