import overrides from "./overrides.json";

const clean = (s) => String(s ?? "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
const byLower = (get) => (a, b) => {
  const x = String(get(a)).toLowerCase();
  const y = String(get(b)).toLowerCase();
  return x < y ? -1 : x > y ? 1 : 0;
};
export const ORDER = ["basic", "professional-category", "professional", "educational", "experience",
  "professional-address", "technical", "survey-participation", "documents", "social-media"];
const OTHER_RE = /^(other|others)\b/i;
const LAZY = {
  state: { source: "states", parent: "country" },
  city: { source: "cities", parent: "state" },
  "practice-city": { source: "cities", parent: "state" },
  ethnicity: { source: "ethnicity", parent: "country" },
  "personal-income": { source: "income.personal", parent: "rural" },
  "household-income": { source: "income.household", parent: "rural" },
  "doc-joblevel": { source: "joblevel", parent: "doc-specialization" },
};

export default function build({ PROFILES, QUESTIONS, OPTIONS, ALL_NAMES = [], DYNAMIC }) {
  const files = {};
  const questions = Object.fromEntries(QUESTIONS.map((q) => [q.name, q]));
  const opts = {};
  for (const o of OPTIONS) (opts[o.question] ??= []).push(o);
  const optsOf = (name) => opts[name] || [];

  const profBySlug = Object.fromEntries(PROFILES.map((p) => [p.slug, p]));
  const outProfiles = [];
  for (const slug of ORDER) {
    const p = profBySlug[slug];
    if (!p) continue;
    const page = p.pages[0];
    outProfiles.push({ slug, name: clean(page[0]), questions: page.slice(1) });
  }
  const dynamicNames = new Set(DYNAMIC || []);
  const known = new Set(outProfiles.flatMap((p) => p.questions));
  for (const p of PROFILES) {
    const names = [...new Set((p.pages || []).flatMap((pg) => pg.slice(1)))];
    if (ORDER.includes(p.slug) || p.slug === "additional-details" || !names.length || /^not[\s-]*in[\s-]*use/i.test(clean(p.name))) continue;
    if (!DYNAMIC) for (const n of names) if (!known.has(n)) dynamicNames.add(n);
    outProfiles.push({ slug: p.slug, name: clean(p.pages[0][0] || p.name), questions: names });
  }
  outProfiles.push({
    slug: "additional-details",
    name: "Additional Details",
    questions: overrides.additionalQuestions.map((q) => q.name),
  });

  const countries = optsOf("country").map((o) => [clean(o.label), o.value]);
  const countryCodes = new Set(countries.map((c) => c[1]));

  const states = {};
  const stateCountry = {};
  for (const o of optsOf("state")) {
    const cc = o.parentValue[0];
    if (countryCodes.has(cc)) {
      (states[cc] ??= []).push([o.value, clean(o.label)]);
      stateCountry[o.value] = cc;
    }
  }
  for (const cc in states) states[cc].sort(byLower((x) => x[1]));

  const cities = {};
  for (const o of optsOf("city")) {
    for (const sv of o.parentValue) {
      const cc = stateCountry[sv];
      if (cc) ((cities[cc] ??= {})[sv] ??= []).push(clean(o.label));
    }
  }
  for (const cc in cities) {
    for (const sv in cities[cc]) cities[cc][sv] = [...new Set(cities[cc][sv])].sort(byLower((x) => x));
    files[`cities/${cc}.json`] = JSON.stringify(cities[cc]);
  }
  files["states.json"] = JSON.stringify(states);

  const keyed = (qname, filter) => {
    const m = {};
    for (const o of optsOf(qname)) {
      for (const pv of o.parentValue) {
        if (!filter || filter(pv)) (m[pv] ??= []).push([clean(o.label), typeof o.value === "string" ? clean(o.value) : o.value]);
      }
    }
    return m;
  };
  const income = { personal: keyed("personal-income"), household: keyed("household-income") };
  for (const k in income) {
    for (const pv in income[k]) income[k][pv].sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0));
  }
  files["income.json"] = JSON.stringify(income);
  files["ethnicity.json"] = JSON.stringify(keyed("ethnicity", (pv) => countryCodes.has(pv)));

  const joblevel = {};
  for (const o of optsOf("doc-joblevel")) for (const pv of o.parentValue) (joblevel[clean(pv)] ??= []).push(clean(o.label));
  for (const [spec, levels] of Object.entries(overrides.extraJobLevels)) (joblevel[spec] ??= []).push(...levels);
  for (const k in joblevel) joblevel[k] = [...new Set(joblevel[k])];
  files["joblevel.json"] = JSON.stringify(joblevel);

  const MULTI = new Set(overrides.multiSelect);
  const isOther = (label, value) => OTHER_RE.test(clean(label)) || OTHER_RE.test(String(value));
  const outQ = {};
  for (const prof of outProfiles.slice(0, -1)) {
    for (const name of prof.questions) {
      if (outQ[name]) continue;
      const q = questions[name];
      if (!q) continue;
      const item = { label: clean(q.label) };
      let parent = String(q.parent || "").trim();
      if (name in (overrides.parentOverride || {})) parent = overrides.parentOverride[name];
      if (parent) item.parent = parent;
      if (name in LAZY) {
        Object.assign(item, { type: "combo", ...LAZY[name] });
        item.parent = LAZY[name].parent;
      } else if (name === "country") {
        item.type = "country";
        item.options = countries.map(([l, v]) => ({ l, v }));
      } else if (name in overrides.textTypes) {
        Object.assign(item, overrides.textTypes[name]);
      } else if (optsOf(name).length) {
        let lst = [];
        for (const o of optsOf(name)) {
          const v = typeof o.value === "string" ? clean(o.value) : o.value;
          const e = { l: clean(o.label), v };
          const pv = o.parentValue.map(clean);
          if (pv.length) e.p = pv;
          if (isOther(o.label, v) || overrides.otherValues.includes(v)) e.other = true;
          lst.push(e);
        }
        for (const e of overrides.extraOptions[name] || []) lst.push(structuredClone(e));
        const drop = new Set((overrides.removeOptions || {})[name] || []);
        lst = lst.filter((e) => !drop.has(e.v));
        for (const [v, newp] of Object.entries((overrides.reparent || {})[name] || {})) {
          for (const e of lst) if (e.v === v) e.p = newp;
        }
        item.options = lst;
        const groups = {};
        for (const e of lst) for (const pv of e.p || ["*"]) groups[pv] = (groups[pv] || 0) + 1;
        const biggest = Math.max(0, ...Object.values(groups));
        const dbMulti = dynamicNames.has(name) && /checkbox|select-multiple|multiselect/i.test(String(q.type || ""));
        item.type = MULTI.has(name) || dbMulti ? "multi" : biggest > 12 ? "select" : "single";
      } else {
        item.type = "text";
        if (dynamicNames.has(name)) {
          const kind = String(q.type || "");
          if (/email/i.test(kind)) Object.assign(item, { type: "email", rule: "email", autocomplete: "email" });
          else if (/phone/i.test(kind)) Object.assign(item, { type: "tel", rule: "phone", countryFrom: "country", autocomplete: "tel" });
          else if (/zip/i.test(kind)) Object.assign(item, { rule: "zip", countryFrom: "country", autocomplete: "postal-code" });
          else Object.assign(item, { rule: "freetext", min: 2, max: 120 });
          if (q.isRequired === false) item.optional = true;
        }
      }
      if (name in overrides.conditions) item.when = overrides.conditions[name];
      if ((overrides.optional || []).includes(name)) item.optional = true;
      if ((overrides.sensitive || []).includes(name)) item.sensitive = true;
      outQ[name] = item;
    }
  }
  for (const src of overrides.additionalQuestions) {
    const aq = structuredClone(src);
    const name = aq.name;
    delete aq.name;
    if (aq.options === "@countries") aq.options = countries.map(([l, v]) => ({ l, v }));
    outQ[name] = aq;
  }
  const used = new Set([...outProfiles.flatMap((p) => p.questions), ...ALL_NAMES]);
  for (const q of Object.values(outQ)) {
    if (q.parent && !used.has(q.parent)) {
      q.externalParent = q.parent;
      delete q.parent;
    }
  }
  files["hcp.generated.json"] = JSON.stringify({ profiles: outProfiles, questions: outQ });
  return files;
}
