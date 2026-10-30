import {
  ROLES,
  allJobs,
  jobCount
} from "/assets/chunk-GN5YW7HE.js";
import {
  AUDIENCE,
  AUDIENCE_FAQ
} from "/assets/chunk-GNLBIS5R.js";
import {
  CAREGIVER_TYPES,
  CONDITION_COUNT,
  PATIENT_TYPES,
  THERAPY_AREAS
} from "/assets/chunk-NSY2VIZJ.js";
import {
  REWARD_ROLES
} from "/assets/chunk-TR53Q4MY.js";
import {
  Persona
} from "/assets/chunk-53J6YGE2.js";
import {
  PageHero
} from "/assets/chunk-NVJYUHG3.js";
import {
  Accordion,
  Button,
  Icon,
  Link,
  LiveZone,
  SectionHead,
  require_jsx_runtime,
  require_react,
  useRouter
} from "/assets/chunk-LANM2SZF.js";
import "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/Audience.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var ROLE_BY_PATH = { "/healthcare-professionals": "hcp", "/caregivers": "caregiver", "/patients": "patient" };
function HcpArt() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "aud-art art-hcp", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cred-stack", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cred c1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "cr-top", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "shieldCheck", size: 14 }),
          " Licence verified"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Persona, { kind: "doctor", skin: 2, hair: 0, size: 54 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Dr. A. Rao" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Cardiology \xB7 Consultant" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cr-mask", children: "Reg. no. \u2022\u2022\u2022\u2022\u2022\u20228213" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cred c2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "cr-top", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "wallet", size: 14 }),
          " Honorarium"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { className: "cr-amt", children: "$45.00" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Credited \xB7 wire transfer" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cr-bars", children: [40, 70, 55, 90, 65].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { "--h": h + "%", "--i": i } }, i)) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cred c3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "cr-top", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "book", size: 14 }),
          " CME credit"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Certificate of contribution" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Advisory study \xB7 30 min" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cr-seal", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "trophy", size: 18 }) })
      ] })
    ] }),
    ["Cardiology", "Oncology", "Nursing", "Pharmacy", "Radiology", "Dental", "Health IT"].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "orbit-chip", style: { "--i": i }, children: t }, t))
  ] });
}
function CaregiverArt() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "aud-art art-care", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 320 300", className: "home-svg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "hs-wall", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#fff4e8" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#ffe2c7" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "160", cy: "282", rx: "130", ry: "12", fill: "#000", opacity: ".07" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "60", y: "130", width: "200", height: "150", rx: "10", fill: "url(#hs-wall)", stroke: "#ffc89e", strokeWidth: "3" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M40 140 160 50l120 90", fill: "none", stroke: "#ff7a1a", strokeWidth: "16", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "205", y: "70", width: "22", height: "44", rx: "4", fill: "#e05d0b" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "140", y: "200", width: "44", height: "80", rx: "6", fill: "#b45309" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "175", cy: "242", r: "3.5", fill: "#fde68a" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { className: "hs-win w1", x: "85", y: "160", width: "40", height: "36", rx: "6" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { className: "hs-win w2", x: "200", y: "160", width: "40", height: "36", rx: "6" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "hs-heart", d: "M160 120c-6-12-24-8-20 6 2 8 20 18 20 18s18-10 20-18c4-14-14-18-20-6z" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "hs-smoke", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "216", cy: "56", r: "6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "222", cy: "40", r: "8" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "230", cy: "22", r: "10" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "note n1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "pill", size: 14 }),
      " 8 am meds \u2713"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "note n2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "car", size: 14 }),
      " Clinic 2 pm"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "note n3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "gift", size: 14 }),
      " \u20B9500 grocery voucher"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "s-badge aud-badge", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Persona, { kind: "caregiver", skin: 1, hair: 3, hairStyle: 1, size: 40 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Caring for Mum" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "clock", size: 11 }),
          " 10-minute survey"
        ] })
      ] })
    ] })
  ] });
}
function PatientArt() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "aud-art art-pt", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pt-phone", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pt-screen", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ptb q b1", children: "How easy is it to use your inhaler?" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ptb a b2", children: "Easier since the new one \u{1F44D}" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ptb q b3", children: "What would make it better?" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ptb a b4", children: "A dose counter I can read" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "ptb done b5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "gift", size: 13 }),
        " +$18 reward unlocked"
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "pt-shield", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "shieldCheck", size: 26 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Anonymous" })
    ] }),
    ["lungs", "heart", "drop", "brain", "bone", "smile"].map((ic, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pt-orb", style: { "--i": i }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 16 }) }, ic))
  ] });
}
var ART = { hcp: HcpArt, caregiver: CaregiverArt, patient: PatientArt };
function HcpExplorer() {
  const [rid, setRid] = (0, import_react.useState)(ROLES[1].id);
  const [sub, setSub] = (0, import_react.useState)("");
  const [q, setQ] = (0, import_react.useState)("");
  const role = ROLES.find((r) => r.id === rid);
  const groups = role.kind === "spec-jobs" ? Object.keys(role.specs) : role.kind === "area" ? Object.keys(role.areas) : [];
  const activeSub = groups.includes(sub) ? sub : groups[0] || "";
  const jobs = role.kind === "jobs" || role.kind === "lab" ? role.jobs : role.kind === "spec-jobs" ? role.specs[activeSub] : role.areas[activeSub].jobs;
  const index = (0, import_react.useMemo)(() => allJobs(), []);
  const hits = (0, import_react.useMemo)(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    return index.filter((j) => j.t.toLowerCase().includes(t)).slice(0, 40);
  }, [q, index]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rx", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "rx-search", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "search", size: 18 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "search", value: q, onChange: (e) => setQ(e.target.value), placeholder: "Find your job title \u2014 e.g. \u201Concology nurse\u201D, \u201Cpharmacist\u201D, \u201Cradiographer\u201D", "aria-label": "Search job titles" }),
      q && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "rx-count", children: [
        hits.length,
        hits.length === 40 ? "+" : "",
        " matches"
      ] })
    ] }),
    q.trim().length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { className: "rx-hits", "aria-live": "polite", children: [
      hits.map((h) => {
        const r = ROLES.find((x) => x.id === h.role);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { style: { "--c": r.color }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: r.icon, size: 14 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: h.t }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
            h.roleLabel,
            h.group ? ` \xB7 ${h.group}` : ""
          ] })
        ] }, h.role + h.t);
      }),
      !hits.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "rx-none", children: "No match yet. Choose \u201COther\u201D in sign-up and tell us your title \u2014 we recruit new roles every month." })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rx-body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rx-roles", role: "tablist", "aria-label": "Professional groups", children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { id: `rx-${r.id}`, role: "tab", "aria-selected": r.id === rid, className: r.id === rid ? "on" : "", style: { "--c": r.color }, onClick: () => {
        setRid(r.id);
        setSub("");
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rxr-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: r.icon, size: 17 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rxr-t", children: r.label }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: jobCount(r) })
      ] }, r.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rx-panel", style: { "--c": role.color }, role: "tabpanel", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rxp-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: role.icon, size: 24 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: role.label }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
              jobCount(role),
              " job titles",
              groups.length ? ` \xB7 ${groups.length} ${role.kind === "area" ? "key areas" : "specializations"}` : ""
            ] })
          ] })
        ] }),
        groups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rx-subs", children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: g === activeSub ? "on" : "", onClick: () => setSub(g), children: g }, g)) }),
        role.kind === "area" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "rx-specs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Specializations:" }),
          " ",
          role.areas[activeSub].specs.join(" \xB7 ")
        ] }),
        role.kind === "lab" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "rx-specs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Specializations:" }),
          " ",
          role.specs.join(" \xB7 ")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "rx-jobs", children: jobs.map((j, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { style: { "--i": Math.min(i, 30) }, children: j }, j)) }, activeSub)
      ] }, rid)
    ] })
  ] });
}
function FridgeNotes() {
  const colors = ["#fff3a3", "#ffd6e0", "#c9f2e3", "#d9e4ff", "#ffe0b8", "#e8d9ff"];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveZone, { className: "fridge", children: CAREGIVER_TYPES.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: "fnote", style: { "--bg": colors[i % colors.length], "--r": `${i * 37 % 7 - 3}deg`, "--i": i }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "fn-magnet", "aria-hidden": "true" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: t.icon, size: 20 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t.t }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: t.d })
  ] }, t.t)) });
}
function Capsules() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "capsules", children: PATIENT_TYPES.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: "capsule", style: { "--i": i }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cap-l", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: t.icon, size: 20 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "cap-r", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t.t }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: t.d })
    ] })
  ] }, t.t)) });
}
function ConditionShelves({ compact = false }) {
  const [open, setOpen] = (0, import_react.useState)(THERAPY_AREAS[0].id);
  const list = compact ? THERAPY_AREAS.slice(0, 12) : THERAPY_AREAS;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `shelves ${compact ? "compact" : ""}`, children: list.map((a) => {
    const on = open === a.id;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: `shelf2 ${on ? "on" : ""}`, style: { "--c": a.color }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "sh-head", "aria-expanded": on, onClick: () => setOpen(on ? "" : a.id), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sh-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: a.icon, size: 18 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: a.area }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: a.items.length }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus", size: 16, className: "sh-plus" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "sh-items", children: a.items.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { style: { "--i": i }, children: c }, c)) })
    ] }, a.id);
  }) });
}
function Process({ steps }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { className: "zz", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "zz-path", viewBox: "0 0 100 100", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 6 C 90 14, 90 26, 50 34 S 10 54, 50 62 S 90 82, 50 94", pathLength: "100" }) }),
    steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { style: { "--i": i }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "zz-node", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: s.icon, size: 20 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: i + 1 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "zz-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: s.t }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: s.d })
      ] })
    ] }, s.t))
  ] });
}
function Journey({ steps, role }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveZone, { className: `jr4 jr-${role}`, children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { style: { "--i": i }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "jr-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: s.icon, size: 22 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: s.t }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: s.d }),
    i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "jr-arrow", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 16 }) })
  ] }, s.t)) });
}
function RewardFlip({ role }) {
  const r = REWARD_ROLES.find((x) => x.id === role);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "flipgrid", children: r.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "flip", tabIndex: 0, style: { "--i": i }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flip-in", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flip-f", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ff-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: it.icon, size: 24 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: it.t }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Tap to see more" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flip-b", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: it.icon, size: 18 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it.d })
    ] })
  ] }) }, it.t)) });
}
function Clipboard({ items, minutes }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "clipb", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cb-clip", "aria-hidden": "true" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cb-paper", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "clipboard", size: 18 }),
        " Your profile ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "clock", size: 12 }),
          " about ",
          minutes,
          " min"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: items.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { style: { "--i": i }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cb-box", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 12, stroke: 3.5 }) }),
        t
      ] }, t)) })
    ] })
  ] });
}
function Audience() {
  const { path } = useRouter();
  const role = ROLE_BY_PATH[path] || "hcp";
  const A = AUDIENCE[role];
  const Art = ART[role];
  const cta = role === "hcp" ? "Join as a professional" : role === "caregiver" ? "Join as a caregiver" : "Join as a patient";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `aud aud-${role} rgrade-${role}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      PageHero,
      {
        className: `aud-hero rgrade-${role}`,
        theme: role === "hcp" ? "pro" : role === "caregiver" ? "earn" : "shield",
        crumbs: [{ label: "Home", to: "/" }, { label: A.name }],
        eyebrow: A.eyebrow,
        title: A.title,
        lead: A.lead,
        badges: A.badges,
        ctas: [{ label: cta, to: `/join#${role}` }, { label: "How it works", to: "/how-it-works", variant: "ghost", icon: "pulse" }],
        art: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Art, {}),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "aud-stats", children: A.stats.map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: n }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l })
        ] }, l)) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section aud-who", id: "roles", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      role === "hcp" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "Who can join", title: "Every role in healthcare, all 1,300+ of them", lead: "Pick your professional group to see every specialization and job level we recruit \u2014 or search for your exact title.", color: "#2457f5" }),
      role === "caregiver" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "Who can join", title: "Fourteen kinds of caregiver, one community", lead: "Pinned to the fridge, like the rest of your week. If one of these sounds like you, your experience is exactly what researchers need.", color: "#ff7a1a" }),
      role === "patient" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "Who can join", title: "Patients of every kind", lead: "Whatever your health story, there are studies that need it \u2014 and healthy, health-conscious people are welcome too.", color: "#00a88a" }),
      role === "hcp" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HcpExplorer, {}),
      role === "caregiver" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FridgeNotes, {}),
      role === "patient" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Capsules, {})
    ] }) }),
    role !== "hcp" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section aud-conditions", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "Health areas", title: role === "patient" ? `${CONDITION_COUNT}+ conditions on our shelves` : "Conditions the people you care for live with", lead: role === "patient" ? "Open a shelf to see every condition in that therapy area. Pick yours during sign-up \u2014 it is optional and confidential." : "Dementia, cancer, diabetes, disability, mental health and more. During sign-up you choose the conditions involved in your caring role.", color: role === "patient" ? "#00a88a" : "#ff4f6d" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionShelves, { compact: role === "caregiver" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section aud-process", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "split-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "eyebrow", style: { "--eb": "var(--g1)" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }),
          "Sign-up process"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: role === "hcp" ? "From screening to verified in five steps" : role === "caregiver" ? "Five steps that fit around caring" : "Five steps, all from your phone" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "lead", children: role === "hcp" ? "The professional profile follows our recruitment questionnaire, so you only see studies that match your specialty, job level and practice." : role === "caregiver" ? "Tell us about your caring role once. Every question about the person you care for is general, never personal." : "Share as much or as little as you like. Health details are optional and never leave our hands." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { to: `/join#${role}`, children: cta })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Process, { steps: A.process })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section aud-journey dark-band", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "A study, start to finish", title: role === "hcp" ? "From invitation to honorarium" : role === "caregiver" ? "A survey in a caregiver\u2019s day" : "Your first survey, step by step", color: "#ffb020" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Journey, { steps: A.journey, role })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section aud-rewards", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "Rewards", title: role === "hcp" ? "Honoraria and rewards for professionals" : role === "caregiver" ? "Rewards that help at home" : "Rewards for sharing your story", lead: "Hover or tap a card to turn it over. Exact options for each study are listed in its invitation, and UPI is available for members in India.", color: "#ff6a2c" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewardFlip, { role })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section aud-profile", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clipboard, { items: A.profile, minutes: A.minutes }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "split-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "eyebrow", style: { "--eb": "var(--g1)" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }),
          "What we ask"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your profile, one time only" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "lead", children: "These answers decide which invitations reach you, so every study you open is one you qualify for. You can update them any time from your dashboard." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "aud-lock", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lock", size: 16 }),
          " Your details are secured with us. We don\u2019t share your personal details."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section aud-faq", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container narrow", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "Questions", title: `${A.name}: common questions`, color: "#7c3aed" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, { items: AUDIENCE_FAQ[role], idPrefix: `faq-${role}`, defaultOpen: 0 })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section aud-cta", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ac-band", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "ac-rings", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: role === "hcp" ? "Your expertise, rewarded." : role === "caregiver" ? "You carry the care. We carry your voice." : "Your story can change someone\u2019s treatment." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Free to join, no investment, and your details are never sold." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ac-btns", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { to: `/join#${role}`, children: cta }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { className: "text-link light", to: role === "hcp" ? "/caregivers" : role === "caregiver" ? "/patients" : "/healthcare-professionals", children: [
          role === "hcp" ? "Looking after someone? See caregivers" : role === "caregiver" ? "Living with a condition? See patients" : "Work in healthcare? See professionals",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 14 })
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  Audience as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL0F1ZGllbmNlLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQXVkaWVuY2UgcGFnZXMgXHUyMDE0IG9uZSBwZXIgbWVtYmVyIGdyb3VwLCBuZXZlciBtZXJnZWQ6XG4vLyAgIC9oZWFsdGhjYXJlLXByb2Zlc3Npb25hbHMvIChwcmltYXJ5IGtleXdvcmQ6IHBhaWQgbWVkaWNhbCBzdXJ2ZXlzIGZvciBoZWFsdGhjYXJlIHByb2Zlc3Npb25hbHMpXG4vLyAgIC9jYXJlZ2l2ZXJzLyAgICAgICAgICAgICAgIChwcmltYXJ5IGtleXdvcmQ6IHBhaWQgc3VydmV5cyBmb3IgY2FyZWdpdmVycylcbi8vICAgL3BhdGllbnRzLyAgICAgICAgICAgICAgICAgKHByaW1hcnkga2V5d29yZDogcGFpZCBzdXJ2ZXlzIGZvciBwYXRpZW50cylcbi8vIEVhY2ggcGFnZTogcm9sZS1ncmFkZWQgaGVybyB3aXRoIGl0cyBvd24gYW5pbWF0ZWQgc2NlbmUsIHdobyBjYW4gam9pbiAoSENQIHJvbGUgZXhwbG9yZXIgd2l0aCBhbGxcbi8vIDEsMzAwKyBqb2IgdGl0bGVzIC8gY2FyZWdpdmVyIGZyaWRnZSBub3RlcyAvIHBhdGllbnQgY2Fwc3VsZXMpLCBwcm9jZXNzLCBzdHVkeSBqb3VybmV5LCByZXdhcmRzLFxuLy8gdGhlIHByb2ZpbGUgcXVlc3Rpb25zIHdlIGFzaywgRkFRcyBhbmQgYSBqb2luIGNhbGwtdG8tYWN0aW9uIHRoYXQgcHJlc2VsZWN0cyB0aGUgcm9sZS5cbmltcG9ydCB7IHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFBhZ2VIZXJvIGZyb20gJy4uL2NvbXBvbmVudHMvUGFnZUhlcm8uanN4JztcbmltcG9ydCBJY29uIGZyb20gJy4uL2NvbXBvbmVudHMvSWNvbi5qc3gnO1xuaW1wb3J0IFBlcnNvbmEgZnJvbSAnLi4vY29tcG9uZW50cy9QZXJzb25hLmpzeCc7XG5pbXBvcnQgeyBTZWN0aW9uSGVhZCwgQnV0dG9uLCBMaXZlWm9uZSwgQWNjb3JkaW9uIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS5qc3gnO1xuaW1wb3J0IHsgTGluaywgdXNlUm91dGVyIH0gZnJvbSAnLi4vcm91dGVyLmpzeCc7XG5pbXBvcnQgeyBBVURJRU5DRSwgQVVESUVOQ0VfRkFRIH0gZnJvbSAnLi4vZGF0YS9hdWRpZW5jZXMuanMnO1xuaW1wb3J0IHsgUkVXQVJEX1JPTEVTIH0gZnJvbSAnLi4vZGF0YS9jb21tdW5pdHkuanMnO1xuaW1wb3J0IHsgUk9MRVMgYXMgSENQX1JPTEVTLCBqb2JDb3VudCwgYWxsSm9icyB9IGZyb20gJy4uL2RhdGEvaGNwUHJvZmlsZS5qcyc7XG5pbXBvcnQgeyBUSEVSQVBZX0FSRUFTLCBDQVJFR0lWRVJfVFlQRVMsIFBBVElFTlRfVFlQRVMsIENPTkRJVElPTl9DT1VOVCB9IGZyb20gJy4uL2RhdGEvY29uZGl0aW9ucy5qcyc7XG5cbmNvbnN0IFJPTEVfQllfUEFUSCA9IHsgJy9oZWFsdGhjYXJlLXByb2Zlc3Npb25hbHMnOiAnaGNwJywgJy9jYXJlZ2l2ZXJzJzogJ2NhcmVnaXZlcicsICcvcGF0aWVudHMnOiAncGF0aWVudCcgfTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLSBoZXJvIHNjZW5lcyAtLS0tLS0tLS0tLS0tLS0tICovXG5mdW5jdGlvbiBIY3BBcnQoKSB7XG4gIHJldHVybiAoXG4gICAgPExpdmVab25lIGNsYXNzTmFtZT1cImF1ZC1hcnQgYXJ0LWhjcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjcmVkLXN0YWNrXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3JlZCBjMVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNyLXRvcFwiPjxJY29uIG5hbWU9XCJzaGllbGRDaGVja1wiIHNpemU9ezE0fSAvPiBMaWNlbmNlIHZlcmlmaWVkPC9zcGFuPlxuICAgICAgICAgIDxQZXJzb25hIGtpbmQ9XCJkb2N0b3JcIiBza2luPXsyfSBoYWlyPXswfSBzaXplPXs1NH0gLz5cbiAgICAgICAgICA8Yj5Eci4gQS4gUmFvPC9iPjxzbWFsbD5DYXJkaW9sb2d5IFx1MDBCNyBDb25zdWx0YW50PC9zbWFsbD5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjci1tYXNrXCI+UmVnLiBuby4gXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyXHUyMDIyODIxMzwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3JlZCBjMlwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNyLXRvcFwiPjxJY29uIG5hbWU9XCJ3YWxsZXRcIiBzaXplPXsxNH0gLz4gSG9ub3Jhcml1bTwvc3Bhbj5cbiAgICAgICAgICA8YiBjbGFzc05hbWU9XCJjci1hbXRcIj4kNDUuMDA8L2I+PHNtYWxsPkNyZWRpdGVkIFx1MDBCNyB3aXJlIHRyYW5zZmVyPC9zbWFsbD5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjci1iYXJzXCI+e1s0MCwgNzAsIDU1LCA5MCwgNjVdLm1hcCgoaCwgaSkgPT4gPGkga2V5PXtpfSBzdHlsZT17eyAnLS1oJzogaCArICclJywgJy0taSc6IGkgfX0gLz4pfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3JlZCBjM1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNyLXRvcFwiPjxJY29uIG5hbWU9XCJib29rXCIgc2l6ZT17MTR9IC8+IENNRSBjcmVkaXQ8L3NwYW4+XG4gICAgICAgICAgPGI+Q2VydGlmaWNhdGUgb2YgY29udHJpYnV0aW9uPC9iPjxzbWFsbD5BZHZpc29yeSBzdHVkeSBcdTAwQjcgMzAgbWluPC9zbWFsbD5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjci1zZWFsXCI+PEljb24gbmFtZT1cInRyb3BoeVwiIHNpemU9ezE4fSAvPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIHtbJ0NhcmRpb2xvZ3knLCAnT25jb2xvZ3knLCAnTnVyc2luZycsICdQaGFybWFjeScsICdSYWRpb2xvZ3knLCAnRGVudGFsJywgJ0hlYWx0aCBJVCddLm1hcCgodCwgaSkgPT4gPHNwYW4ga2V5PXt0fSBjbGFzc05hbWU9XCJvcmJpdC1jaGlwXCIgc3R5bGU9e3sgJy0taSc6IGkgfX0+e3R9PC9zcGFuPil9XG4gICAgPC9MaXZlWm9uZT5cbiAgKTtcbn1cblxuZnVuY3Rpb24gQ2FyZWdpdmVyQXJ0KCkge1xuICByZXR1cm4gKFxuICAgIDxMaXZlWm9uZSBjbGFzc05hbWU9XCJhdWQtYXJ0IGFydC1jYXJlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMzIwIDMwMFwiIGNsYXNzTmFtZT1cImhvbWUtc3ZnXCI+XG4gICAgICAgIDxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD1cImhzLXdhbGxcIiB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjFcIj48c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2ZmZjRlOFwiIC8+PHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNmZmUyYzdcIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPlxuICAgICAgICA8ZWxsaXBzZSBjeD1cIjE2MFwiIGN5PVwiMjgyXCIgcng9XCIxMzBcIiByeT1cIjEyXCIgZmlsbD1cIiMwMDBcIiBvcGFjaXR5PVwiLjA3XCIgLz5cbiAgICAgICAgPHJlY3QgeD1cIjYwXCIgeT1cIjEzMFwiIHdpZHRoPVwiMjAwXCIgaGVpZ2h0PVwiMTUwXCIgcng9XCIxMFwiIGZpbGw9XCJ1cmwoI2hzLXdhbGwpXCIgc3Ryb2tlPVwiI2ZmYzg5ZVwiIHN0cm9rZVdpZHRoPVwiM1wiIC8+XG4gICAgICAgIDxwYXRoIGQ9XCJNNDAgMTQwIDE2MCA1MGwxMjAgOTBcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiNmZjdhMWFcIiBzdHJva2VXaWR0aD1cIjE2XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIC8+XG4gICAgICAgIDxyZWN0IHg9XCIyMDVcIiB5PVwiNzBcIiB3aWR0aD1cIjIyXCIgaGVpZ2h0PVwiNDRcIiByeD1cIjRcIiBmaWxsPVwiI2UwNWQwYlwiIC8+XG4gICAgICAgIDxyZWN0IHg9XCIxNDBcIiB5PVwiMjAwXCIgd2lkdGg9XCI0NFwiIGhlaWdodD1cIjgwXCIgcng9XCI2XCIgZmlsbD1cIiNiNDUzMDlcIiAvPlxuICAgICAgICA8Y2lyY2xlIGN4PVwiMTc1XCIgY3k9XCIyNDJcIiByPVwiMy41XCIgZmlsbD1cIiNmZGU2OGFcIiAvPlxuICAgICAgICA8cmVjdCBjbGFzc05hbWU9XCJocy13aW4gdzFcIiB4PVwiODVcIiB5PVwiMTYwXCIgd2lkdGg9XCI0MFwiIGhlaWdodD1cIjM2XCIgcng9XCI2XCIgLz5cbiAgICAgICAgPHJlY3QgY2xhc3NOYW1lPVwiaHMtd2luIHcyXCIgeD1cIjIwMFwiIHk9XCIxNjBcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiMzZcIiByeD1cIjZcIiAvPlxuICAgICAgICA8cGF0aCBjbGFzc05hbWU9XCJocy1oZWFydFwiIGQ9XCJNMTYwIDEyMGMtNi0xMi0yNC04LTIwIDYgMiA4IDIwIDE4IDIwIDE4czE4LTEwIDIwLTE4YzQtMTQtMTQtMTgtMjAtNnpcIiAvPlxuICAgICAgICA8ZyBjbGFzc05hbWU9XCJocy1zbW9rZVwiPjxjaXJjbGUgY3g9XCIyMTZcIiBjeT1cIjU2XCIgcj1cIjZcIiAvPjxjaXJjbGUgY3g9XCIyMjJcIiBjeT1cIjQwXCIgcj1cIjhcIiAvPjxjaXJjbGUgY3g9XCIyMzBcIiBjeT1cIjIyXCIgcj1cIjEwXCIgLz48L2c+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5vdGUgbjFcIj48SWNvbiBuYW1lPVwicGlsbFwiIHNpemU9ezE0fSAvPiA4IGFtIG1lZHMgXHUyNzEzPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibm90ZSBuMlwiPjxJY29uIG5hbWU9XCJjYXJcIiBzaXplPXsxNH0gLz4gQ2xpbmljIDIgcG08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJub3RlIG4zXCI+PEljb24gbmFtZT1cImdpZnRcIiBzaXplPXsxNH0gLz4gXHUyMEI5NTAwIGdyb2Nlcnkgdm91Y2hlcjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInMtYmFkZ2UgYXVkLWJhZGdlXCI+PFBlcnNvbmEga2luZD1cImNhcmVnaXZlclwiIHNraW49ezF9IGhhaXI9ezN9IGhhaXJTdHlsZT17MX0gc2l6ZT17NDB9IC8+PHNwYW4+PGI+Q2FyaW5nIGZvciBNdW08L2I+PHNtYWxsPjxJY29uIG5hbWU9XCJjbG9ja1wiIHNpemU9ezExfSAvPiAxMC1taW51dGUgc3VydmV5PC9zbWFsbD48L3NwYW4+PC9zcGFuPlxuICAgIDwvTGl2ZVpvbmU+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFBhdGllbnRBcnQoKSB7XG4gIHJldHVybiAoXG4gICAgPExpdmVab25lIGNsYXNzTmFtZT1cImF1ZC1hcnQgYXJ0LXB0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LXBob25lXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtc2NyZWVuXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHRiIHEgYjFcIj5Ib3cgZWFzeSBpcyBpdCB0byB1c2UgeW91ciBpbmhhbGVyPzwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwdGIgYSBiMlwiPkVhc2llciBzaW5jZSB0aGUgbmV3IG9uZSBcdUQ4M0RcdURDNEQ8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHRiIHEgYjNcIj5XaGF0IHdvdWxkIG1ha2UgaXQgYmV0dGVyPzwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwdGIgYSBiNFwiPkEgZG9zZSBjb3VudGVyIEkgY2FuIHJlYWQ8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHRiIGRvbmUgYjVcIj48SWNvbiBuYW1lPVwiZ2lmdFwiIHNpemU9ezEzfSAvPiArJDE4IHJld2FyZCB1bmxvY2tlZDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB0LXNoaWVsZFwiPjxJY29uIG5hbWU9XCJzaGllbGRDaGVja1wiIHNpemU9ezI2fSAvPjxzbWFsbD5Bbm9ueW1vdXM8L3NtYWxsPjwvc3Bhbj5cbiAgICAgIHtbJ2x1bmdzJywgJ2hlYXJ0JywgJ2Ryb3AnLCAnYnJhaW4nLCAnYm9uZScsICdzbWlsZSddLm1hcCgoaWMsIGkpID0+IDxzcGFuIGtleT17aWN9IGNsYXNzTmFtZT1cInB0LW9yYlwiIHN0eWxlPXt7ICctLWknOiBpIH19PjxJY29uIG5hbWU9e2ljfSBzaXplPXsxNn0gLz48L3NwYW4+KX1cbiAgICA8L0xpdmVab25lPlxuICApO1xufVxuXG5jb25zdCBBUlQgPSB7IGhjcDogSGNwQXJ0LCBjYXJlZ2l2ZXI6IENhcmVnaXZlckFydCwgcGF0aWVudDogUGF0aWVudEFydCB9O1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tIHdobyBjYW4gam9pbiAtLS0tLS0tLS0tLS0tLS0tICovXG5mdW5jdGlvbiBIY3BFeHBsb3JlcigpIHtcbiAgY29uc3QgW3JpZCwgc2V0UmlkXSA9IHVzZVN0YXRlKEhDUF9ST0xFU1sxXS5pZCk7XG4gIGNvbnN0IFtzdWIsIHNldFN1Yl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtxLCBzZXRRXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3Qgcm9sZSA9IEhDUF9ST0xFUy5maW5kKChyKSA9PiByLmlkID09PSByaWQpO1xuICBjb25zdCBncm91cHMgPSByb2xlLmtpbmQgPT09ICdzcGVjLWpvYnMnID8gT2JqZWN0LmtleXMocm9sZS5zcGVjcykgOiByb2xlLmtpbmQgPT09ICdhcmVhJyA/IE9iamVjdC5rZXlzKHJvbGUuYXJlYXMpIDogW107XG4gIGNvbnN0IGFjdGl2ZVN1YiA9IGdyb3Vwcy5pbmNsdWRlcyhzdWIpID8gc3ViIDogZ3JvdXBzWzBdIHx8ICcnO1xuICBjb25zdCBqb2JzID0gcm9sZS5raW5kID09PSAnam9icycgfHwgcm9sZS5raW5kID09PSAnbGFiJyA/IHJvbGUuam9icyA6IHJvbGUua2luZCA9PT0gJ3NwZWMtam9icycgPyByb2xlLnNwZWNzW2FjdGl2ZVN1Yl0gOiByb2xlLmFyZWFzW2FjdGl2ZVN1Yl0uam9icztcbiAgY29uc3QgaW5kZXggPSB1c2VNZW1vKCgpID0+IGFsbEpvYnMoKSwgW10pO1xuICBjb25zdCBoaXRzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgdCA9IHEudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHQubGVuZ3RoIDwgMikgcmV0dXJuIFtdO1xuICAgIHJldHVybiBpbmRleC5maWx0ZXIoKGopID0+IGoudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHQpKS5zbGljZSgwLCA0MCk7XG4gIH0sIFtxLCBpbmRleF0pO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicnhcIj5cbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJyeC1zZWFyY2hcIj5cbiAgICAgICAgPEljb24gbmFtZT1cInNlYXJjaFwiIHNpemU9ezE4fSAvPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIHZhbHVlPXtxfSBvbkNoYW5nZT17KGUpID0+IHNldFEoZS50YXJnZXQudmFsdWUpfSBwbGFjZWhvbGRlcj1cIkZpbmQgeW91ciBqb2IgdGl0bGUgXHUyMDE0IGUuZy4gXHUyMDFDb25jb2xvZ3kgbnVyc2VcdTIwMUQsIFx1MjAxQ3BoYXJtYWNpc3RcdTIwMUQsIFx1MjAxQ3JhZGlvZ3JhcGhlclx1MjAxRFwiIGFyaWEtbGFiZWw9XCJTZWFyY2ggam9iIHRpdGxlc1wiIC8+XG4gICAgICAgIHtxICYmIDxzcGFuIGNsYXNzTmFtZT1cInJ4LWNvdW50XCI+e2hpdHMubGVuZ3RofXtoaXRzLmxlbmd0aCA9PT0gNDAgPyAnKycgOiAnJ30gbWF0Y2hlczwvc3Bhbj59XG4gICAgICA8L2xhYmVsPlxuICAgICAge3EudHJpbSgpLmxlbmd0aCA+PSAyID8gKFxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwicngtaGl0c1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPlxuICAgICAgICAgIHtoaXRzLm1hcCgoaCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgciA9IEhDUF9ST0xFUy5maW5kKCh4KSA9PiB4LmlkID09PSBoLnJvbGUpO1xuICAgICAgICAgICAgcmV0dXJuIDxsaSBrZXk9e2gucm9sZSArIGgudH0gc3R5bGU9e3sgJy0tYyc6IHIuY29sb3IgfX0+PEljb24gbmFtZT17ci5pY29ufSBzaXplPXsxNH0gLz48Yj57aC50fTwvYj48c21hbGw+e2gucm9sZUxhYmVsfXtoLmdyb3VwID8gYCBcdTAwQjcgJHtoLmdyb3VwfWAgOiAnJ308L3NtYWxsPjwvbGk+O1xuICAgICAgICAgIH0pfVxuICAgICAgICAgIHshaGl0cy5sZW5ndGggJiYgPGxpIGNsYXNzTmFtZT1cInJ4LW5vbmVcIj5ObyBtYXRjaCB5ZXQuIENob29zZSBcdTIwMUNPdGhlclx1MjAxRCBpbiBzaWduLXVwIGFuZCB0ZWxsIHVzIHlvdXIgdGl0bGUgXHUyMDE0IHdlIHJlY3J1aXQgbmV3IHJvbGVzIGV2ZXJ5IG1vbnRoLjwvbGk+fVxuICAgICAgICA8L3VsPlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyeC1ib2R5XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyeC1yb2xlc1wiIHJvbGU9XCJ0YWJsaXN0XCIgYXJpYS1sYWJlbD1cIlByb2Zlc3Npb25hbCBncm91cHNcIj5cbiAgICAgICAgICAgIHtIQ1BfUk9MRVMubWFwKChyKSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b24ga2V5PXtyLmlkfSBpZD17YHJ4LSR7ci5pZH1gfSByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17ci5pZCA9PT0gcmlkfSBjbGFzc05hbWU9e3IuaWQgPT09IHJpZCA/ICdvbicgOiAnJ30gc3R5bGU9e3sgJy0tYyc6IHIuY29sb3IgfX0gb25DbGljaz17KCkgPT4geyBzZXRSaWQoci5pZCk7IHNldFN1YignJyk7IH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJ4ci1pY1wiPjxJY29uIG5hbWU9e3IuaWNvbn0gc2l6ZT17MTd9IC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJ4ci10XCI+e3IubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxlbT57am9iQ291bnQocil9PC9lbT5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ4LXBhbmVsXCIga2V5PXtyaWR9IHN0eWxlPXt7ICctLWMnOiByb2xlLmNvbG9yIH19IHJvbGU9XCJ0YWJwYW5lbFwiPlxuICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicnhwLWljXCI+PEljb24gbmFtZT17cm9sZS5pY29ufSBzaXplPXsyNH0gLz48L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPjxoMz57cm9sZS5sYWJlbH08L2gzPjxzbWFsbD57am9iQ291bnQocm9sZSl9IGpvYiB0aXRsZXN7Z3JvdXBzLmxlbmd0aCA/IGAgXHUwMEI3ICR7Z3JvdXBzLmxlbmd0aH0gJHtyb2xlLmtpbmQgPT09ICdhcmVhJyA/ICdrZXkgYXJlYXMnIDogJ3NwZWNpYWxpemF0aW9ucyd9YCA6ICcnfTwvc21hbGw+PC9zcGFuPlxuICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICB7Z3JvdXBzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ4LXN1YnNcIj5cbiAgICAgICAgICAgICAgICB7Z3JvdXBzLm1hcCgoZykgPT4gPGJ1dHRvbiBrZXk9e2d9IGNsYXNzTmFtZT17ZyA9PT0gYWN0aXZlU3ViID8gJ29uJyA6ICcnfSBvbkNsaWNrPXsoKSA9PiBzZXRTdWIoZyl9PntnfTwvYnV0dG9uPil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtyb2xlLmtpbmQgPT09ICdhcmVhJyAmJiA8cCBjbGFzc05hbWU9XCJyeC1zcGVjc1wiPjxiPlNwZWNpYWxpemF0aW9uczo8L2I+IHtyb2xlLmFyZWFzW2FjdGl2ZVN1Yl0uc3BlY3Muam9pbignIFx1MDBCNyAnKX08L3A+fVxuICAgICAgICAgICAge3JvbGUua2luZCA9PT0gJ2xhYicgJiYgPHAgY2xhc3NOYW1lPVwicngtc3BlY3NcIj48Yj5TcGVjaWFsaXphdGlvbnM6PC9iPiB7cm9sZS5zcGVjcy5qb2luKCcgXHUwMEI3ICcpfTwvcD59XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicngtam9ic1wiIGtleT17YWN0aXZlU3VifT57am9icy5tYXAoKGosIGkpID0+IDxsaSBrZXk9e2p9IHN0eWxlPXt7ICctLWknOiBNYXRoLm1pbihpLCAzMCkgfX0+e2p9PC9saT4pfTwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRnJpZGdlTm90ZXMoKSB7XG4gIGNvbnN0IGNvbG9ycyA9IFsnI2ZmZjNhMycsICcjZmZkNmUwJywgJyNjOWYyZTMnLCAnI2Q5ZTRmZicsICcjZmZlMGI4JywgJyNlOGQ5ZmYnXTtcbiAgcmV0dXJuIChcbiAgICA8TGl2ZVpvbmUgY2xhc3NOYW1lPVwiZnJpZGdlXCI+XG4gICAgICB7Q0FSRUdJVkVSX1RZUEVTLm1hcCgodCwgaSkgPT4gKFxuICAgICAgICA8YXJ0aWNsZSBrZXk9e3QudH0gY2xhc3NOYW1lPVwiZm5vdGVcIiBzdHlsZT17eyAnLS1iZyc6IGNvbG9yc1tpICUgY29sb3JzLmxlbmd0aF0sICctLXInOiBgJHsoKGkgKiAzNykgJSA3KSAtIDN9ZGVnYCwgJy0taSc6IGkgfX0+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm4tbWFnbmV0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICA8SWNvbiBuYW1lPXt0Lmljb259IHNpemU9ezIwfSAvPlxuICAgICAgICAgIDxiPnt0LnR9PC9iPlxuICAgICAgICAgIDxzbWFsbD57dC5kfTwvc21hbGw+XG4gICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICkpfVxuICAgIDwvTGl2ZVpvbmU+XG4gICk7XG59XG5cbmZ1bmN0aW9uIENhcHN1bGVzKCkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY2Fwc3VsZXNcIj5cbiAgICAgIHtQQVRJRU5UX1RZUEVTLm1hcCgodCwgaSkgPT4gKFxuICAgICAgICA8YXJ0aWNsZSBrZXk9e3QudH0gY2xhc3NOYW1lPVwiY2Fwc3VsZVwiIHN0eWxlPXt7ICctLWknOiBpIH19PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNhcC1sXCI+PEljb24gbmFtZT17dC5pY29ufSBzaXplPXsyMH0gLz48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2FwLXJcIj48Yj57dC50fTwvYj48c21hbGw+e3QuZH08L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgKSl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIENvbmRpdGlvblNoZWx2ZXMoeyBjb21wYWN0ID0gZmFsc2UgfSkge1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShUSEVSQVBZX0FSRUFTWzBdLmlkKTtcbiAgY29uc3QgbGlzdCA9IGNvbXBhY3QgPyBUSEVSQVBZX0FSRUFTLnNsaWNlKDAsIDEyKSA6IFRIRVJBUFlfQVJFQVM7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BzaGVsdmVzICR7Y29tcGFjdCA/ICdjb21wYWN0JyA6ICcnfWB9PlxuICAgICAge2xpc3QubWFwKChhKSA9PiB7XG4gICAgICAgIGNvbnN0IG9uID0gb3BlbiA9PT0gYS5pZDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8c2VjdGlvbiBrZXk9e2EuaWR9IGNsYXNzTmFtZT17YHNoZWxmMiAke29uID8gJ29uJyA6ICcnfWB9IHN0eWxlPXt7ICctLWMnOiBhLmNvbG9yIH19PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzaC1oZWFkXCIgYXJpYS1leHBhbmRlZD17b259IG9uQ2xpY2s9eygpID0+IHNldE9wZW4ob24gPyAnJyA6IGEuaWQpfT5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2gtaWNcIj48SWNvbiBuYW1lPXthLmljb259IHNpemU9ezE4fSAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPGI+e2EuYXJlYX08L2I+XG4gICAgICAgICAgICAgIDxlbT57YS5pdGVtcy5sZW5ndGh9PC9lbT5cbiAgICAgICAgICAgICAgPEljb24gbmFtZT1cInBsdXNcIiBzaXplPXsxNn0gY2xhc3NOYW1lPVwic2gtcGx1c1wiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHsvKiBDb25kaXRpb25zIHN0YXkgaW4gdGhlIEhUTUwgKGNsb3NlZCBzaGVsdmVzIGFyZSBvbmx5IHZpc3VhbGx5IGNvbGxhcHNlZCkgc28gc2VhcmNoIGVuZ2luZXMgcmVhZCB0aGVtLiAqL31cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzaC1pdGVtc1wiPnthLml0ZW1zLm1hcCgoYywgaSkgPT4gPGxpIGtleT17Y30gc3R5bGU9e3sgJy0taSc6IGkgfX0+e2N9PC9saT4pfTwvdWw+XG4gICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0gc2hhcmVkIHNlY3Rpb25zIC0tLS0tLS0tLS0tLS0tLS0gKi9cbmZ1bmN0aW9uIFByb2Nlc3MoeyBzdGVwcyB9KSB7XG4gIHJldHVybiAoXG4gICAgPG9sIGNsYXNzTmFtZT1cInp6XCI+XG4gICAgICA8c3ZnIGNsYXNzTmFtZT1cInp6LXBhdGhcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxwYXRoIGQ9XCJNMTAgNiBDIDkwIDE0LCA5MCAyNiwgNTAgMzQgUyAxMCA1NCwgNTAgNjIgUyA5MCA4MiwgNTAgOTRcIiBwYXRoTGVuZ3RoPVwiMTAwXCIgLz48L3N2Zz5cbiAgICAgIHtzdGVwcy5tYXAoKHMsIGkpID0+IChcbiAgICAgICAgPGxpIGtleT17cy50fSBzdHlsZT17eyAnLS1pJzogaSB9fT5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ6ei1ub2RlXCI+PEljb24gbmFtZT17cy5pY29ufSBzaXplPXsyMH0gLz48ZW0+e2kgKyAxfTwvZW0+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInp6LWNhcmRcIj48Yj57cy50fTwvYj48c21hbGw+e3MuZH08L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICAgICkpfVxuICAgIDwvb2w+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEpvdXJuZXkoeyBzdGVwcywgcm9sZSB9KSB7XG4gIHJldHVybiAoXG4gICAgPExpdmVab25lIGNsYXNzTmFtZT17YGpyNCBqci0ke3JvbGV9YH0+XG4gICAgICB7c3RlcHMubWFwKChzLCBpKSA9PiAoXG4gICAgICAgIDxhcnRpY2xlIGtleT17cy50fSBzdHlsZT17eyAnLS1pJzogaSB9fT5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJqci1pY1wiPjxJY29uIG5hbWU9e3MuaWNvbn0gc2l6ZT17MjJ9IC8+PC9zcGFuPlxuICAgICAgICAgIDxiPntzLnR9PC9iPlxuICAgICAgICAgIDxzbWFsbD57cy5kfTwvc21hbGw+XG4gICAgICAgICAge2kgPCBzdGVwcy5sZW5ndGggLSAxICYmIDxzcGFuIGNsYXNzTmFtZT1cImpyLWFycm93XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PEljb24gbmFtZT1cImFycm93XCIgc2l6ZT17MTZ9IC8+PC9zcGFuPn1cbiAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgKSl9XG4gICAgPC9MaXZlWm9uZT5cbiAgKTtcbn1cblxuZnVuY3Rpb24gUmV3YXJkRmxpcCh7IHJvbGUgfSkge1xuICBjb25zdCByID0gUkVXQVJEX1JPTEVTLmZpbmQoKHgpID0+IHguaWQgPT09IHJvbGUpO1xuICByZXR1cm4gKFxuICAgIDx1bCBjbGFzc05hbWU9XCJmbGlwZ3JpZFwiPlxuICAgICAge3IuaXRlbXMubWFwKChpdCwgaSkgPT4gKFxuICAgICAgICA8bGkga2V5PXtpdC50fSBjbGFzc05hbWU9XCJmbGlwXCIgdGFiSW5kZXg9ezB9IHN0eWxlPXt7ICctLWknOiBpIH19PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsaXAtaW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsaXAtZlwiPjxzcGFuIGNsYXNzTmFtZT1cImZmLWljXCI+PEljb24gbmFtZT17aXQuaWNvbn0gc2l6ZT17MjR9IC8+PC9zcGFuPjxiPntpdC50fTwvYj48c21hbGw+VGFwIHRvIHNlZSBtb3JlPC9zbWFsbD48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGlwLWJcIj48SWNvbiBuYW1lPXtpdC5pY29ufSBzaXplPXsxOH0gLz48c3Bhbj57aXQuZH08L3NwYW4+PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICAgICkpfVxuICAgIDwvdWw+XG4gICk7XG59XG5cbmZ1bmN0aW9uIENsaXBib2FyZCh7IGl0ZW1zLCBtaW51dGVzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8TGl2ZVpvbmUgY2xhc3NOYW1lPVwiY2xpcGJcIj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNiLWNsaXBcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYi1wYXBlclwiPlxuICAgICAgICA8aGVhZGVyPjxJY29uIG5hbWU9XCJjbGlwYm9hcmRcIiBzaXplPXsxOH0gLz4gWW91ciBwcm9maWxlIDxlbT48SWNvbiBuYW1lPVwiY2xvY2tcIiBzaXplPXsxMn0gLz4gYWJvdXQge21pbnV0ZXN9IG1pbjwvZW0+PC9oZWFkZXI+XG4gICAgICAgIDx1bD57aXRlbXMubWFwKCh0LCBpKSA9PiA8bGkga2V5PXt0fSBzdHlsZT17eyAnLS1pJzogaSB9fT48c3BhbiBjbGFzc05hbWU9XCJjYi1ib3hcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPXsxMn0gc3Ryb2tlPXszLjV9IC8+PC9zcGFuPnt0fTwvbGk+KX08L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9MaXZlWm9uZT5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXVkaWVuY2UoKSB7XG4gIGNvbnN0IHsgcGF0aCB9ID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IHJvbGUgPSBST0xFX0JZX1BBVEhbcGF0aF0gfHwgJ2hjcCc7XG4gIGNvbnN0IEEgPSBBVURJRU5DRVtyb2xlXTtcbiAgY29uc3QgQXJ0ID0gQVJUW3JvbGVdO1xuICBjb25zdCBjdGEgPSByb2xlID09PSAnaGNwJyA/ICdKb2luIGFzIGEgcHJvZmVzc2lvbmFsJyA6IHJvbGUgPT09ICdjYXJlZ2l2ZXInID8gJ0pvaW4gYXMgYSBjYXJlZ2l2ZXInIDogJ0pvaW4gYXMgYSBwYXRpZW50JztcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YGF1ZCBhdWQtJHtyb2xlfSByZ3JhZGUtJHtyb2xlfWB9PlxuICAgICAgPFBhZ2VIZXJvXG4gICAgICAgIGNsYXNzTmFtZT17YGF1ZC1oZXJvIHJncmFkZS0ke3JvbGV9YH1cbiAgICAgICAgdGhlbWU9e3JvbGUgPT09ICdoY3AnID8gJ3BybycgOiByb2xlID09PSAnY2FyZWdpdmVyJyA/ICdlYXJuJyA6ICdzaGllbGQnfVxuICAgICAgICBjcnVtYnM9e1t7IGxhYmVsOiAnSG9tZScsIHRvOiAnLycgfSwgeyBsYWJlbDogQS5uYW1lIH1dfVxuICAgICAgICBleWVicm93PXtBLmV5ZWJyb3d9XG4gICAgICAgIHRpdGxlPXtBLnRpdGxlfVxuICAgICAgICBsZWFkPXtBLmxlYWR9XG4gICAgICAgIGJhZGdlcz17QS5iYWRnZXN9XG4gICAgICAgIGN0YXM9e1t7IGxhYmVsOiBjdGEsIHRvOiBgL2pvaW4jJHtyb2xlfWAgfSwgeyBsYWJlbDogJ0hvdyBpdCB3b3JrcycsIHRvOiAnL2hvdy1pdC13b3JrcycsIHZhcmlhbnQ6ICdnaG9zdCcsIGljb246ICdwdWxzZScgfV19XG4gICAgICAgIGFydD17PEFydCAvPn1cbiAgICAgID5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cImF1ZC1zdGF0c1wiPntBLnN0YXRzLm1hcCgoW24sIGxdKSA9PiA8bGkga2V5PXtsfT48Yj57bn08L2I+PHNwYW4+e2x9PC9zcGFuPjwvbGk+KX08L3VsPlxuICAgICAgPC9QYWdlSGVybz5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBhdWQtd2hvXCIgaWQ9XCJyb2xlc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIHtyb2xlID09PSAnaGNwJyAmJiA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIldobyBjYW4gam9pblwiIHRpdGxlPVwiRXZlcnkgcm9sZSBpbiBoZWFsdGhjYXJlLCBhbGwgMSwzMDArIG9mIHRoZW1cIiBsZWFkPVwiUGljayB5b3VyIHByb2Zlc3Npb25hbCBncm91cCB0byBzZWUgZXZlcnkgc3BlY2lhbGl6YXRpb24gYW5kIGpvYiBsZXZlbCB3ZSByZWNydWl0IFx1MjAxNCBvciBzZWFyY2ggZm9yIHlvdXIgZXhhY3QgdGl0bGUuXCIgY29sb3I9XCIjMjQ1N2Y1XCIgLz59XG4gICAgICAgICAge3JvbGUgPT09ICdjYXJlZ2l2ZXInICYmIDxTZWN0aW9uSGVhZCBleWVicm93PVwiV2hvIGNhbiBqb2luXCIgdGl0bGU9XCJGb3VydGVlbiBraW5kcyBvZiBjYXJlZ2l2ZXIsIG9uZSBjb21tdW5pdHlcIiBsZWFkPVwiUGlubmVkIHRvIHRoZSBmcmlkZ2UsIGxpa2UgdGhlIHJlc3Qgb2YgeW91ciB3ZWVrLiBJZiBvbmUgb2YgdGhlc2Ugc291bmRzIGxpa2UgeW91LCB5b3VyIGV4cGVyaWVuY2UgaXMgZXhhY3RseSB3aGF0IHJlc2VhcmNoZXJzIG5lZWQuXCIgY29sb3I9XCIjZmY3YTFhXCIgLz59XG4gICAgICAgICAge3JvbGUgPT09ICdwYXRpZW50JyAmJiA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIldobyBjYW4gam9pblwiIHRpdGxlPVwiUGF0aWVudHMgb2YgZXZlcnkga2luZFwiIGxlYWQ9XCJXaGF0ZXZlciB5b3VyIGhlYWx0aCBzdG9yeSwgdGhlcmUgYXJlIHN0dWRpZXMgdGhhdCBuZWVkIGl0IFx1MjAxNCBhbmQgaGVhbHRoeSwgaGVhbHRoLWNvbnNjaW91cyBwZW9wbGUgYXJlIHdlbGNvbWUgdG9vLlwiIGNvbG9yPVwiIzAwYTg4YVwiIC8+fVxuICAgICAgICAgIHtyb2xlID09PSAnaGNwJyAmJiA8SGNwRXhwbG9yZXIgLz59XG4gICAgICAgICAge3JvbGUgPT09ICdjYXJlZ2l2ZXInICYmIDxGcmlkZ2VOb3RlcyAvPn1cbiAgICAgICAgICB7cm9sZSA9PT0gJ3BhdGllbnQnICYmIDxDYXBzdWxlcyAvPn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIHtyb2xlICE9PSAnaGNwJyAmJiAoXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gYXVkLWNvbmRpdGlvbnNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPFNlY3Rpb25IZWFkIGV5ZWJyb3c9XCJIZWFsdGggYXJlYXNcIiB0aXRsZT17cm9sZSA9PT0gJ3BhdGllbnQnID8gYCR7Q09ORElUSU9OX0NPVU5UfSsgY29uZGl0aW9ucyBvbiBvdXIgc2hlbHZlc2AgOiAnQ29uZGl0aW9ucyB0aGUgcGVvcGxlIHlvdSBjYXJlIGZvciBsaXZlIHdpdGgnfSBsZWFkPXtyb2xlID09PSAncGF0aWVudCcgPyAnT3BlbiBhIHNoZWxmIHRvIHNlZSBldmVyeSBjb25kaXRpb24gaW4gdGhhdCB0aGVyYXB5IGFyZWEuIFBpY2sgeW91cnMgZHVyaW5nIHNpZ24tdXAgXHUyMDE0IGl0IGlzIG9wdGlvbmFsIGFuZCBjb25maWRlbnRpYWwuJyA6ICdEZW1lbnRpYSwgY2FuY2VyLCBkaWFiZXRlcywgZGlzYWJpbGl0eSwgbWVudGFsIGhlYWx0aCBhbmQgbW9yZS4gRHVyaW5nIHNpZ24tdXAgeW91IGNob29zZSB0aGUgY29uZGl0aW9ucyBpbnZvbHZlZCBpbiB5b3VyIGNhcmluZyByb2xlLid9IGNvbG9yPXtyb2xlID09PSAncGF0aWVudCcgPyAnIzAwYTg4YScgOiAnI2ZmNGY2ZCd9IC8+XG4gICAgICAgICAgICA8Q29uZGl0aW9uU2hlbHZlcyBjb21wYWN0PXtyb2xlID09PSAnY2FyZWdpdmVyJ30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgKX1cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBhdWQtcHJvY2Vzc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBzcGxpdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BsaXQtY29weVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXllYnJvd1wiIHN0eWxlPXt7ICctLWViJzogJ3ZhcigtLWcxKScgfX0+PGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5TaWduLXVwIHByb2Nlc3M8L3NwYW4+XG4gICAgICAgICAgICA8aDI+e3JvbGUgPT09ICdoY3AnID8gJ0Zyb20gc2NyZWVuaW5nIHRvIHZlcmlmaWVkIGluIGZpdmUgc3RlcHMnIDogcm9sZSA9PT0gJ2NhcmVnaXZlcicgPyAnRml2ZSBzdGVwcyB0aGF0IGZpdCBhcm91bmQgY2FyaW5nJyA6ICdGaXZlIHN0ZXBzLCBhbGwgZnJvbSB5b3VyIHBob25lJ308L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGVhZFwiPntyb2xlID09PSAnaGNwJyA/ICdUaGUgcHJvZmVzc2lvbmFsIHByb2ZpbGUgZm9sbG93cyBvdXIgcmVjcnVpdG1lbnQgcXVlc3Rpb25uYWlyZSwgc28geW91IG9ubHkgc2VlIHN0dWRpZXMgdGhhdCBtYXRjaCB5b3VyIHNwZWNpYWx0eSwgam9iIGxldmVsIGFuZCBwcmFjdGljZS4nIDogcm9sZSA9PT0gJ2NhcmVnaXZlcicgPyAnVGVsbCB1cyBhYm91dCB5b3VyIGNhcmluZyByb2xlIG9uY2UuIEV2ZXJ5IHF1ZXN0aW9uIGFib3V0IHRoZSBwZXJzb24geW91IGNhcmUgZm9yIGlzIGdlbmVyYWwsIG5ldmVyIHBlcnNvbmFsLicgOiAnU2hhcmUgYXMgbXVjaCBvciBhcyBsaXR0bGUgYXMgeW91IGxpa2UuIEhlYWx0aCBkZXRhaWxzIGFyZSBvcHRpb25hbCBhbmQgbmV2ZXIgbGVhdmUgb3VyIGhhbmRzLid9PC9wPlxuICAgICAgICAgICAgPEJ1dHRvbiB0bz17YC9qb2luIyR7cm9sZX1gfT57Y3RhfTwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxQcm9jZXNzIHN0ZXBzPXtBLnByb2Nlc3N9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIGF1ZC1qb3VybmV5IGRhcmstYmFuZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxTZWN0aW9uSGVhZCBleWVicm93PVwiQSBzdHVkeSwgc3RhcnQgdG8gZmluaXNoXCIgdGl0bGU9e3JvbGUgPT09ICdoY3AnID8gJ0Zyb20gaW52aXRhdGlvbiB0byBob25vcmFyaXVtJyA6IHJvbGUgPT09ICdjYXJlZ2l2ZXInID8gJ0Egc3VydmV5IGluIGEgY2FyZWdpdmVyXHUyMDE5cyBkYXknIDogJ1lvdXIgZmlyc3Qgc3VydmV5LCBzdGVwIGJ5IHN0ZXAnfSBjb2xvcj1cIiNmZmIwMjBcIiAvPlxuICAgICAgICAgIDxKb3VybmV5IHN0ZXBzPXtBLmpvdXJuZXl9IHJvbGU9e3JvbGV9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIGF1ZC1yZXdhcmRzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPFNlY3Rpb25IZWFkIGV5ZWJyb3c9XCJSZXdhcmRzXCIgdGl0bGU9e3JvbGUgPT09ICdoY3AnID8gJ0hvbm9yYXJpYSBhbmQgcmV3YXJkcyBmb3IgcHJvZmVzc2lvbmFscycgOiByb2xlID09PSAnY2FyZWdpdmVyJyA/ICdSZXdhcmRzIHRoYXQgaGVscCBhdCBob21lJyA6ICdSZXdhcmRzIGZvciBzaGFyaW5nIHlvdXIgc3RvcnknfSBsZWFkPVwiSG92ZXIgb3IgdGFwIGEgY2FyZCB0byB0dXJuIGl0IG92ZXIuIEV4YWN0IG9wdGlvbnMgZm9yIGVhY2ggc3R1ZHkgYXJlIGxpc3RlZCBpbiBpdHMgaW52aXRhdGlvbiwgYW5kIFVQSSBpcyBhdmFpbGFibGUgZm9yIG1lbWJlcnMgaW4gSW5kaWEuXCIgY29sb3I9XCIjZmY2YTJjXCIgLz5cbiAgICAgICAgICA8UmV3YXJkRmxpcCByb2xlPXtyb2xlfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBhdWQtcHJvZmlsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBzcGxpdFwiPlxuICAgICAgICAgIDxDbGlwYm9hcmQgaXRlbXM9e0EucHJvZmlsZX0gbWludXRlcz17QS5taW51dGVzfSAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BsaXQtY29weVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXllYnJvd1wiIHN0eWxlPXt7ICctLWViJzogJ3ZhcigtLWcxKScgfX0+PGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5XaGF0IHdlIGFzazwvc3Bhbj5cbiAgICAgICAgICAgIDxoMj5Zb3VyIHByb2ZpbGUsIG9uZSB0aW1lIG9ubHk8L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGVhZFwiPlRoZXNlIGFuc3dlcnMgZGVjaWRlIHdoaWNoIGludml0YXRpb25zIHJlYWNoIHlvdSwgc28gZXZlcnkgc3R1ZHkgeW91IG9wZW4gaXMgb25lIHlvdSBxdWFsaWZ5IGZvci4gWW91IGNhbiB1cGRhdGUgdGhlbSBhbnkgdGltZSBmcm9tIHlvdXIgZGFzaGJvYXJkLjwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImF1ZC1sb2NrXCI+PEljb24gbmFtZT1cImxvY2tcIiBzaXplPXsxNn0gLz4gWW91ciBkZXRhaWxzIGFyZSBzZWN1cmVkIHdpdGggdXMuIFdlIGRvblx1MjAxOXQgc2hhcmUgeW91ciBwZXJzb25hbCBkZXRhaWxzLjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gYXVkLWZhcVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBuYXJyb3dcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIlF1ZXN0aW9uc1wiIHRpdGxlPXtgJHtBLm5hbWV9OiBjb21tb24gcXVlc3Rpb25zYH0gY29sb3I9XCIjN2MzYWVkXCIgLz5cbiAgICAgICAgICA8QWNjb3JkaW9uIGl0ZW1zPXtBVURJRU5DRV9GQVFbcm9sZV19IGlkUHJlZml4PXtgZmFxLSR7cm9sZX1gfSBkZWZhdWx0T3Blbj17MH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gYXVkLWN0YVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWMtYmFuZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWMtcmluZ3NcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48aSAvPjxpIC8+PGkgLz48L3NwYW4+XG4gICAgICAgICAgICA8aDI+e3JvbGUgPT09ICdoY3AnID8gJ1lvdXIgZXhwZXJ0aXNlLCByZXdhcmRlZC4nIDogcm9sZSA9PT0gJ2NhcmVnaXZlcicgPyAnWW91IGNhcnJ5IHRoZSBjYXJlLiBXZSBjYXJyeSB5b3VyIHZvaWNlLicgOiAnWW91ciBzdG9yeSBjYW4gY2hhbmdlIHNvbWVvbmVcdTIwMTlzIHRyZWF0bWVudC4nfTwvaDI+XG4gICAgICAgICAgICA8cD5GcmVlIHRvIGpvaW4sIG5vIGludmVzdG1lbnQsIGFuZCB5b3VyIGRldGFpbHMgYXJlIG5ldmVyIHNvbGQuPC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYy1idG5zXCI+XG4gICAgICAgICAgICAgIDxCdXR0b24gdG89e2Avam9pbiMke3JvbGV9YH0+e2N0YX08L0J1dHRvbj5cbiAgICAgICAgICAgICAgPExpbmsgY2xhc3NOYW1lPVwidGV4dC1saW5rIGxpZ2h0XCIgdG89e3JvbGUgPT09ICdoY3AnID8gJy9jYXJlZ2l2ZXJzJyA6IHJvbGUgPT09ICdjYXJlZ2l2ZXInID8gJy9wYXRpZW50cycgOiAnL2hlYWx0aGNhcmUtcHJvZmVzc2lvbmFscyd9PlxuICAgICAgICAgICAgICAgIHtyb2xlID09PSAnaGNwJyA/ICdMb29raW5nIGFmdGVyIHNvbWVvbmU/IFNlZSBjYXJlZ2l2ZXJzJyA6IHJvbGUgPT09ICdjYXJlZ2l2ZXInID8gJ0xpdmluZyB3aXRoIGEgY29uZGl0aW9uPyBTZWUgcGF0aWVudHMnIDogJ1dvcmsgaW4gaGVhbHRoY2FyZT8gU2VlIHByb2Zlc3Npb25hbHMnfSA8SWNvbiBuYW1lPVwiYXJyb3dcIiBzaXplPXsxNH0gLz5cbiAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFPQSxtQkFBa0M7QUFtQnhCO0FBUlYsSUFBTSxlQUFlLEVBQUUsNkJBQTZCLE9BQU8sZUFBZSxhQUFhLGFBQWEsVUFBVTtBQUc5RyxTQUFTLFNBQVM7QUFDaEIsU0FDRSw2Q0FBQyxZQUFTLFdBQVUsbUJBQWtCLGVBQVksUUFDaEQ7QUFBQSxpREFBQyxTQUFJLFdBQVUsY0FDYjtBQUFBLG1EQUFDLFNBQUksV0FBVSxXQUNiO0FBQUEscURBQUMsVUFBSyxXQUFVLFVBQVM7QUFBQSxzREFBQyxRQUFLLE1BQUssZUFBYyxNQUFNLElBQUk7QUFBQSxVQUFFO0FBQUEsV0FBaUI7QUFBQSxRQUMvRSw0Q0FBQyxXQUFRLE1BQUssVUFBUyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sSUFBSTtBQUFBLFFBQ25ELDRDQUFDLE9BQUUsd0JBQVU7QUFBQSxRQUFJLDRDQUFDLFdBQU0sd0NBQXVCO0FBQUEsUUFDL0MsNENBQUMsVUFBSyxXQUFVLFdBQVUsK0RBQW1CO0FBQUEsU0FDL0M7QUFBQSxNQUNBLDZDQUFDLFNBQUksV0FBVSxXQUNiO0FBQUEscURBQUMsVUFBSyxXQUFVLFVBQVM7QUFBQSxzREFBQyxRQUFLLE1BQUssVUFBUyxNQUFNLElBQUk7QUFBQSxVQUFFO0FBQUEsV0FBVztBQUFBLFFBQ3BFLDRDQUFDLE9BQUUsV0FBVSxVQUFTLG9CQUFNO0FBQUEsUUFBSSw0Q0FBQyxXQUFNLHlDQUF3QjtBQUFBLFFBQy9ELDRDQUFDLFVBQUssV0FBVSxXQUFXLFdBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsTUFBTSw0Q0FBQyxPQUFVLE9BQU8sRUFBRSxPQUFPLElBQUksS0FBSyxPQUFPLEVBQUUsS0FBckMsQ0FBd0MsQ0FBRSxHQUFFO0FBQUEsU0FDcEg7QUFBQSxNQUNBLDZDQUFDLFNBQUksV0FBVSxXQUNiO0FBQUEscURBQUMsVUFBSyxXQUFVLFVBQVM7QUFBQSxzREFBQyxRQUFLLE1BQUssUUFBTyxNQUFNLElBQUk7QUFBQSxVQUFFO0FBQUEsV0FBVztBQUFBLFFBQ2xFLDRDQUFDLE9BQUUseUNBQTJCO0FBQUEsUUFBSSw0Q0FBQyxXQUFNLHdDQUF1QjtBQUFBLFFBQ2hFLDRDQUFDLFVBQUssV0FBVSxXQUFVLHNEQUFDLFFBQUssTUFBSyxVQUFTLE1BQU0sSUFBSSxHQUFFO0FBQUEsU0FDNUQ7QUFBQSxPQUNGO0FBQUEsSUFDQyxDQUFDLGNBQWMsWUFBWSxXQUFXLFlBQVksYUFBYSxVQUFVLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxNQUFNLDRDQUFDLFVBQWEsV0FBVSxjQUFhLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBSSxlQUFoRCxDQUFrRCxDQUFPO0FBQUEsS0FDM0s7QUFFSjtBQUVBLFNBQVMsZUFBZTtBQUN0QixTQUNFLDZDQUFDLFlBQVMsV0FBVSxvQkFBbUIsZUFBWSxRQUNqRDtBQUFBLGlEQUFDLFNBQUksU0FBUSxlQUFjLFdBQVUsWUFDbkM7QUFBQSxrREFBQyxVQUFLLHVEQUFDLG9CQUFlLElBQUcsV0FBVSxJQUFHLEtBQUksSUFBRyxLQUFJLElBQUcsS0FBSSxJQUFHLEtBQUk7QUFBQSxvREFBQyxVQUFLLFFBQU8sS0FBSSxXQUFVLFdBQVU7QUFBQSxRQUFFLDRDQUFDLFVBQUssUUFBTyxLQUFJLFdBQVUsV0FBVTtBQUFBLFNBQUUsR0FBaUI7QUFBQSxNQUM5Siw0Q0FBQyxhQUFRLElBQUcsT0FBTSxJQUFHLE9BQU0sSUFBRyxPQUFNLElBQUcsTUFBSyxNQUFLLFFBQU8sU0FBUSxPQUFNO0FBQUEsTUFDdEUsNENBQUMsVUFBSyxHQUFFLE1BQUssR0FBRSxPQUFNLE9BQU0sT0FBTSxRQUFPLE9BQU0sSUFBRyxNQUFLLE1BQUssaUJBQWdCLFFBQU8sV0FBVSxhQUFZLEtBQUk7QUFBQSxNQUM1Ryw0Q0FBQyxVQUFLLEdBQUUseUJBQXdCLE1BQUssUUFBTyxRQUFPLFdBQVUsYUFBWSxNQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRO0FBQUEsTUFDM0gsNENBQUMsVUFBSyxHQUFFLE9BQU0sR0FBRSxNQUFLLE9BQU0sTUFBSyxRQUFPLE1BQUssSUFBRyxLQUFJLE1BQUssV0FBVTtBQUFBLE1BQ2xFLDRDQUFDLFVBQUssR0FBRSxPQUFNLEdBQUUsT0FBTSxPQUFNLE1BQUssUUFBTyxNQUFLLElBQUcsS0FBSSxNQUFLLFdBQVU7QUFBQSxNQUNuRSw0Q0FBQyxZQUFPLElBQUcsT0FBTSxJQUFHLE9BQU0sR0FBRSxPQUFNLE1BQUssV0FBVTtBQUFBLE1BQ2pELDRDQUFDLFVBQUssV0FBVSxhQUFZLEdBQUUsTUFBSyxHQUFFLE9BQU0sT0FBTSxNQUFLLFFBQU8sTUFBSyxJQUFHLEtBQUk7QUFBQSxNQUN6RSw0Q0FBQyxVQUFLLFdBQVUsYUFBWSxHQUFFLE9BQU0sR0FBRSxPQUFNLE9BQU0sTUFBSyxRQUFPLE1BQUssSUFBRyxLQUFJO0FBQUEsTUFDMUUsNENBQUMsVUFBSyxXQUFVLFlBQVcsR0FBRSx5RUFBd0U7QUFBQSxNQUNyRyw2Q0FBQyxPQUFFLFdBQVUsWUFBVztBQUFBLG9EQUFDLFlBQU8sSUFBRyxPQUFNLElBQUcsTUFBSyxHQUFFLEtBQUk7QUFBQSxRQUFFLDRDQUFDLFlBQU8sSUFBRyxPQUFNLElBQUcsTUFBSyxHQUFFLEtBQUk7QUFBQSxRQUFFLDRDQUFDLFlBQU8sSUFBRyxPQUFNLElBQUcsTUFBSyxHQUFFLE1BQUs7QUFBQSxTQUFFO0FBQUEsT0FDOUg7QUFBQSxJQUNBLDZDQUFDLFVBQUssV0FBVSxXQUFVO0FBQUEsa0RBQUMsUUFBSyxNQUFLLFFBQU8sTUFBTSxJQUFJO0FBQUEsTUFBRTtBQUFBLE9BQVk7QUFBQSxJQUNwRSw2Q0FBQyxVQUFLLFdBQVUsV0FBVTtBQUFBLGtEQUFDLFFBQUssTUFBSyxPQUFNLE1BQU0sSUFBSTtBQUFBLE1BQUU7QUFBQSxPQUFZO0FBQUEsSUFDbkUsNkNBQUMsVUFBSyxXQUFVLFdBQVU7QUFBQSxrREFBQyxRQUFLLE1BQUssUUFBTyxNQUFNLElBQUk7QUFBQSxNQUFFO0FBQUEsT0FBcUI7QUFBQSxJQUM3RSw2Q0FBQyxVQUFLLFdBQVUscUJBQW9CO0FBQUEsa0RBQUMsV0FBUSxNQUFLLGFBQVksTUFBTSxHQUFHLE1BQU0sR0FBRyxXQUFXLEdBQUcsTUFBTSxJQUFJO0FBQUEsTUFBRSw2Q0FBQyxVQUFLO0FBQUEsb0RBQUMsT0FBRSw0QkFBYztBQUFBLFFBQUksNkNBQUMsV0FBTTtBQUFBLHNEQUFDLFFBQUssTUFBSyxTQUFRLE1BQU0sSUFBSTtBQUFBLFVBQUU7QUFBQSxXQUFpQjtBQUFBLFNBQVE7QUFBQSxPQUFPO0FBQUEsS0FDN007QUFFSjtBQUVBLFNBQVMsYUFBYTtBQUNwQixTQUNFLDZDQUFDLFlBQVMsV0FBVSxrQkFBaUIsZUFBWSxRQUMvQztBQUFBLGdEQUFDLFNBQUksV0FBVSxZQUNiLHVEQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsa0RBQUMsVUFBSyxXQUFVLFlBQVcsaURBQW1DO0FBQUEsTUFDOUQsNENBQUMsVUFBSyxXQUFVLFlBQVcsZ0RBQTJCO0FBQUEsTUFDdEQsNENBQUMsVUFBSyxXQUFVLFlBQVcsd0NBQTBCO0FBQUEsTUFDckQsNENBQUMsVUFBSyxXQUFVLFlBQVcsdUNBQXlCO0FBQUEsTUFDcEQsNkNBQUMsVUFBSyxXQUFVLGVBQWM7QUFBQSxvREFBQyxRQUFLLE1BQUssUUFBTyxNQUFNLElBQUk7QUFBQSxRQUFFO0FBQUEsU0FBcUI7QUFBQSxPQUNuRixHQUNGO0FBQUEsSUFDQSw2Q0FBQyxVQUFLLFdBQVUsYUFBWTtBQUFBLGtEQUFDLFFBQUssTUFBSyxlQUFjLE1BQU0sSUFBSTtBQUFBLE1BQUUsNENBQUMsV0FBTSx1QkFBUztBQUFBLE9BQVE7QUFBQSxJQUN4RixDQUFDLFNBQVMsU0FBUyxRQUFRLFNBQVMsUUFBUSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSw0Q0FBQyxVQUFjLFdBQVUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsc0RBQUMsUUFBSyxNQUFNLElBQUksTUFBTSxJQUFJLEtBQXRFLEVBQXdFLENBQU87QUFBQSxLQUNqSztBQUVKO0FBRUEsSUFBTSxNQUFNLEVBQUUsS0FBSyxRQUFRLFdBQVcsY0FBYyxTQUFTLFdBQVc7QUFHeEUsU0FBUyxjQUFjO0FBQ3JCLFFBQU0sQ0FBQyxLQUFLLE1BQU0sUUFBSSx1QkFBUyxNQUFVLENBQUMsRUFBRSxFQUFFO0FBQzlDLFFBQU0sQ0FBQyxLQUFLLE1BQU0sUUFBSSx1QkFBUyxFQUFFO0FBQ2pDLFFBQU0sQ0FBQyxHQUFHLElBQUksUUFBSSx1QkFBUyxFQUFFO0FBQzdCLFFBQU0sT0FBTyxNQUFVLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxHQUFHO0FBQy9DLFFBQU0sU0FBUyxLQUFLLFNBQVMsY0FBYyxPQUFPLEtBQUssS0FBSyxLQUFLLElBQUksS0FBSyxTQUFTLFNBQVMsT0FBTyxLQUFLLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDdkgsUUFBTSxZQUFZLE9BQU8sU0FBUyxHQUFHLElBQUksTUFBTSxPQUFPLENBQUMsS0FBSztBQUM1RCxRQUFNLE9BQU8sS0FBSyxTQUFTLFVBQVUsS0FBSyxTQUFTLFFBQVEsS0FBSyxPQUFPLEtBQUssU0FBUyxjQUFjLEtBQUssTUFBTSxTQUFTLElBQUksS0FBSyxNQUFNLFNBQVMsRUFBRTtBQUNqSixRQUFNLFlBQVEsc0JBQVEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ3pDLFFBQU0sV0FBTyxzQkFBUSxNQUFNO0FBQ3pCLFVBQU0sSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQy9CLFFBQUksRUFBRSxTQUFTLEVBQUcsUUFBTyxDQUFDO0FBQzFCLFdBQU8sTUFBTSxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUU7QUFBQSxFQUN2RSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDYixTQUNFLDZDQUFDLFNBQUksV0FBVSxNQUNiO0FBQUEsaURBQUMsV0FBTSxXQUFVLGFBQ2Y7QUFBQSxrREFBQyxRQUFLLE1BQUssVUFBUyxNQUFNLElBQUk7QUFBQSxNQUM5Qiw0Q0FBQyxXQUFNLE1BQUssVUFBUyxPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU0sS0FBSyxFQUFFLE9BQU8sS0FBSyxHQUFHLGFBQVksZ0hBQTRFLGNBQVcscUJBQW9CO0FBQUEsTUFDNUwsS0FBSyw2Q0FBQyxVQUFLLFdBQVUsWUFBWTtBQUFBLGFBQUs7QUFBQSxRQUFRLEtBQUssV0FBVyxLQUFLLE1BQU07QUFBQSxRQUFHO0FBQUEsU0FBUTtBQUFBLE9BQ3ZGO0FBQUEsSUFDQyxFQUFFLEtBQUssRUFBRSxVQUFVLElBQ2xCLDZDQUFDLFFBQUcsV0FBVSxXQUFVLGFBQVUsVUFDL0I7QUFBQSxXQUFLLElBQUksQ0FBQyxNQUFNO0FBQ2YsY0FBTSxJQUFJLE1BQVUsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSTtBQUMvQyxlQUFPLDZDQUFDLFFBQXNCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxHQUFHO0FBQUEsc0RBQUMsUUFBSyxNQUFNLEVBQUUsTUFBTSxNQUFNLElBQUk7QUFBQSxVQUFFLDRDQUFDLE9BQUcsWUFBRSxHQUFFO0FBQUEsVUFBSSw2Q0FBQyxXQUFPO0FBQUEsY0FBRTtBQUFBLFlBQVcsRUFBRSxRQUFRLFNBQU0sRUFBRSxLQUFLLEtBQUs7QUFBQSxhQUFHO0FBQUEsYUFBekksRUFBRSxPQUFPLEVBQUUsQ0FBc0k7QUFBQSxNQUNuSyxDQUFDO0FBQUEsTUFDQSxDQUFDLEtBQUssVUFBVSw0Q0FBQyxRQUFHLFdBQVUsV0FBVSwrSEFBa0c7QUFBQSxPQUM3SSxJQUVBLDZDQUFDLFNBQUksV0FBVSxXQUNiO0FBQUEsa0RBQUMsU0FBSSxXQUFVLFlBQVcsTUFBSyxXQUFVLGNBQVcsdUJBQ2pELGdCQUFVLElBQUksQ0FBQyxNQUNkLDZDQUFDLFlBQWtCLElBQUksTUFBTSxFQUFFLEVBQUUsSUFBSSxNQUFLLE9BQU0saUJBQWUsRUFBRSxPQUFPLEtBQUssV0FBVyxFQUFFLE9BQU8sTUFBTSxPQUFPLElBQUksT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEdBQUcsU0FBUyxNQUFNO0FBQUUsZUFBTyxFQUFFLEVBQUU7QUFBRyxlQUFPLEVBQUU7QUFBQSxNQUFHLEdBQ3RMO0FBQUEsb0RBQUMsVUFBSyxXQUFVLFVBQVMsc0RBQUMsUUFBSyxNQUFNLEVBQUUsTUFBTSxNQUFNLElBQUksR0FBRTtBQUFBLFFBQ3pELDRDQUFDLFVBQUssV0FBVSxTQUFTLFlBQUUsT0FBTTtBQUFBLFFBQ2pDLDRDQUFDLFFBQUksbUJBQVMsQ0FBQyxHQUFFO0FBQUEsV0FITixFQUFFLEVBSWYsQ0FDRCxHQUNIO0FBQUEsTUFDQSw2Q0FBQyxTQUFJLFdBQVUsWUFBcUIsT0FBTyxFQUFFLE9BQU8sS0FBSyxNQUFNLEdBQUcsTUFBSyxZQUNyRTtBQUFBLHFEQUFDLFlBQ0M7QUFBQSxzREFBQyxVQUFLLFdBQVUsVUFBUyxzREFBQyxRQUFLLE1BQU0sS0FBSyxNQUFNLE1BQU0sSUFBSSxHQUFFO0FBQUEsVUFDNUQsNkNBQUMsVUFBSztBQUFBLHdEQUFDLFFBQUksZUFBSyxPQUFNO0FBQUEsWUFBSyw2Q0FBQyxXQUFPO0FBQUEsdUJBQVMsSUFBSTtBQUFBLGNBQUU7QUFBQSxjQUFZLE9BQU8sU0FBUyxTQUFNLE9BQU8sTUFBTSxJQUFJLEtBQUssU0FBUyxTQUFTLGNBQWMsaUJBQWlCLEtBQUs7QUFBQSxlQUFHO0FBQUEsYUFBUTtBQUFBLFdBQzdLO0FBQUEsUUFDQyxPQUFPLFNBQVMsS0FDZiw0Q0FBQyxTQUFJLFdBQVUsV0FDWixpQkFBTyxJQUFJLENBQUMsTUFBTSw0Q0FBQyxZQUFlLFdBQVcsTUFBTSxZQUFZLE9BQU8sSUFBSSxTQUFTLE1BQU0sT0FBTyxDQUFDLEdBQUksZUFBdEUsQ0FBd0UsQ0FBUyxHQUNuSDtBQUFBLFFBRUQsS0FBSyxTQUFTLFVBQVUsNkNBQUMsT0FBRSxXQUFVLFlBQVc7QUFBQSxzREFBQyxPQUFFLDhCQUFnQjtBQUFBLFVBQUk7QUFBQSxVQUFFLEtBQUssTUFBTSxTQUFTLEVBQUUsTUFBTSxLQUFLLFFBQUs7QUFBQSxXQUFFO0FBQUEsUUFDakgsS0FBSyxTQUFTLFNBQVMsNkNBQUMsT0FBRSxXQUFVLFlBQVc7QUFBQSxzREFBQyxPQUFFLDhCQUFnQjtBQUFBLFVBQUk7QUFBQSxVQUFFLEtBQUssTUFBTSxLQUFLLFFBQUs7QUFBQSxXQUFFO0FBQUEsUUFDaEcsNENBQUMsUUFBRyxXQUFVLFdBQTJCLGVBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSw0Q0FBQyxRQUFXLE9BQU8sRUFBRSxPQUFPLEtBQUssSUFBSSxHQUFHLEVBQUUsRUFBRSxHQUFJLGVBQXZDLENBQXlDLENBQUssS0FBdEYsU0FBd0Y7QUFBQSxXQVp4RixHQWEvQjtBQUFBLE9BQ0Y7QUFBQSxLQUVKO0FBRUo7QUFFQSxTQUFTLGNBQWM7QUFDckIsUUFBTSxTQUFTLENBQUMsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFNBQVM7QUFDaEYsU0FDRSw0Q0FBQyxZQUFTLFdBQVUsVUFDakIsMEJBQWdCLElBQUksQ0FBQyxHQUFHLE1BQ3ZCLDZDQUFDLGFBQWtCLFdBQVUsU0FBUSxPQUFPLEVBQUUsUUFBUSxPQUFPLElBQUksT0FBTyxNQUFNLEdBQUcsT0FBTyxHQUFLLElBQUksS0FBTSxJQUFLLENBQUMsT0FBTyxPQUFPLEVBQUUsR0FDM0g7QUFBQSxnREFBQyxVQUFLLFdBQVUsYUFBWSxlQUFZLFFBQU87QUFBQSxJQUMvQyw0Q0FBQyxRQUFLLE1BQU0sRUFBRSxNQUFNLE1BQU0sSUFBSTtBQUFBLElBQzlCLDRDQUFDLE9BQUcsWUFBRSxHQUFFO0FBQUEsSUFDUiw0Q0FBQyxXQUFPLFlBQUUsR0FBRTtBQUFBLE9BSkEsRUFBRSxDQUtoQixDQUNELEdBQ0g7QUFFSjtBQUVBLFNBQVMsV0FBVztBQUNsQixTQUNFLDRDQUFDLFNBQUksV0FBVSxZQUNaLHdCQUFjLElBQUksQ0FBQyxHQUFHLE1BQ3JCLDZDQUFDLGFBQWtCLFdBQVUsV0FBVSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQ3ZEO0FBQUEsZ0RBQUMsVUFBSyxXQUFVLFNBQVEsc0RBQUMsUUFBSyxNQUFNLEVBQUUsTUFBTSxNQUFNLElBQUksR0FBRTtBQUFBLElBQ3hELDZDQUFDLFVBQUssV0FBVSxTQUFRO0FBQUEsa0RBQUMsT0FBRyxZQUFFLEdBQUU7QUFBQSxNQUFJLDRDQUFDLFdBQU8sWUFBRSxHQUFFO0FBQUEsT0FBUTtBQUFBLE9BRjVDLEVBQUUsQ0FHaEIsQ0FDRCxHQUNIO0FBRUo7QUFFQSxTQUFTLGlCQUFpQixFQUFFLFVBQVUsTUFBTSxHQUFHO0FBQzdDLFFBQU0sQ0FBQyxNQUFNLE9BQU8sUUFBSSx1QkFBUyxjQUFjLENBQUMsRUFBRSxFQUFFO0FBQ3BELFFBQU0sT0FBTyxVQUFVLGNBQWMsTUFBTSxHQUFHLEVBQUUsSUFBSTtBQUNwRCxTQUNFLDRDQUFDLFNBQUksV0FBVyxXQUFXLFVBQVUsWUFBWSxFQUFFLElBQ2hELGVBQUssSUFBSSxDQUFDLE1BQU07QUFDZixVQUFNLEtBQUssU0FBUyxFQUFFO0FBQ3RCLFdBQ0UsNkNBQUMsYUFBbUIsV0FBVyxVQUFVLEtBQUssT0FBTyxFQUFFLElBQUksT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEdBQ2pGO0FBQUEsbURBQUMsWUFBTyxXQUFVLFdBQVUsaUJBQWUsSUFBSSxTQUFTLE1BQU0sUUFBUSxLQUFLLEtBQUssRUFBRSxFQUFFLEdBQ2xGO0FBQUEsb0RBQUMsVUFBSyxXQUFVLFNBQVEsc0RBQUMsUUFBSyxNQUFNLEVBQUUsTUFBTSxNQUFNLElBQUksR0FBRTtBQUFBLFFBQ3hELDRDQUFDLE9BQUcsWUFBRSxNQUFLO0FBQUEsUUFDWCw0Q0FBQyxRQUFJLFlBQUUsTUFBTSxRQUFPO0FBQUEsUUFDcEIsNENBQUMsUUFBSyxNQUFLLFFBQU8sTUFBTSxJQUFJLFdBQVUsV0FBVTtBQUFBLFNBQ2xEO0FBQUEsTUFFQSw0Q0FBQyxRQUFHLFdBQVUsWUFBWSxZQUFFLE1BQU0sSUFBSSxDQUFDLEdBQUcsTUFBTSw0Q0FBQyxRQUFXLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBSSxlQUF6QixDQUEyQixDQUFLLEdBQUU7QUFBQSxTQVIvRSxFQUFFLEVBU2hCO0FBQUEsRUFFSixDQUFDLEdBQ0g7QUFFSjtBQUdBLFNBQVMsUUFBUSxFQUFFLE1BQU0sR0FBRztBQUMxQixTQUNFLDZDQUFDLFFBQUcsV0FBVSxNQUNaO0FBQUEsZ0RBQUMsU0FBSSxXQUFVLFdBQVUsU0FBUSxlQUFjLHFCQUFvQixRQUFPLGVBQVksUUFBTyxzREFBQyxVQUFLLEdBQUUsNkRBQTRELFlBQVcsT0FBTSxHQUFFO0FBQUEsSUFDbkwsTUFBTSxJQUFJLENBQUMsR0FBRyxNQUNiLDZDQUFDLFFBQWEsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUM5QjtBQUFBLG1EQUFDLFVBQUssV0FBVSxXQUFVO0FBQUEsb0RBQUMsUUFBSyxNQUFNLEVBQUUsTUFBTSxNQUFNLElBQUk7QUFBQSxRQUFFLDRDQUFDLFFBQUksY0FBSSxHQUFFO0FBQUEsU0FBSztBQUFBLE1BQzFFLDZDQUFDLFVBQUssV0FBVSxXQUFVO0FBQUEsb0RBQUMsT0FBRyxZQUFFLEdBQUU7QUFBQSxRQUFJLDRDQUFDLFdBQU8sWUFBRSxHQUFFO0FBQUEsU0FBUTtBQUFBLFNBRm5ELEVBQUUsQ0FHWCxDQUNEO0FBQUEsS0FDSDtBQUVKO0FBRUEsU0FBUyxRQUFRLEVBQUUsT0FBTyxLQUFLLEdBQUc7QUFDaEMsU0FDRSw0Q0FBQyxZQUFTLFdBQVcsVUFBVSxJQUFJLElBQ2hDLGdCQUFNLElBQUksQ0FBQyxHQUFHLE1BQ2IsNkNBQUMsYUFBa0IsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUNuQztBQUFBLGdEQUFDLFVBQUssV0FBVSxTQUFRLHNEQUFDLFFBQUssTUFBTSxFQUFFLE1BQU0sTUFBTSxJQUFJLEdBQUU7QUFBQSxJQUN4RCw0Q0FBQyxPQUFHLFlBQUUsR0FBRTtBQUFBLElBQ1IsNENBQUMsV0FBTyxZQUFFLEdBQUU7QUFBQSxJQUNYLElBQUksTUFBTSxTQUFTLEtBQUssNENBQUMsVUFBSyxXQUFVLFlBQVcsZUFBWSxRQUFPLHNEQUFDLFFBQUssTUFBSyxTQUFRLE1BQU0sSUFBSSxHQUFFO0FBQUEsT0FKMUYsRUFBRSxDQUtoQixDQUNELEdBQ0g7QUFFSjtBQUVBLFNBQVMsV0FBVyxFQUFFLEtBQUssR0FBRztBQUM1QixRQUFNLElBQUksYUFBYSxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSTtBQUNoRCxTQUNFLDRDQUFDLFFBQUcsV0FBVSxZQUNYLFlBQUUsTUFBTSxJQUFJLENBQUMsSUFBSSxNQUNoQiw0Q0FBQyxRQUFjLFdBQVUsUUFBTyxVQUFVLEdBQUcsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUM3RCx1REFBQyxVQUFLLFdBQVUsV0FDZDtBQUFBLGlEQUFDLFVBQUssV0FBVSxVQUFTO0FBQUEsa0RBQUMsVUFBSyxXQUFVLFNBQVEsc0RBQUMsUUFBSyxNQUFNLEdBQUcsTUFBTSxNQUFNLElBQUksR0FBRTtBQUFBLE1BQU8sNENBQUMsT0FBRyxhQUFHLEdBQUU7QUFBQSxNQUFJLDRDQUFDLFdBQU0sNkJBQWU7QUFBQSxPQUFRO0FBQUEsSUFDcEksNkNBQUMsVUFBSyxXQUFVLFVBQVM7QUFBQSxrREFBQyxRQUFLLE1BQU0sR0FBRyxNQUFNLE1BQU0sSUFBSTtBQUFBLE1BQUUsNENBQUMsVUFBTSxhQUFHLEdBQUU7QUFBQSxPQUFPO0FBQUEsS0FDL0UsS0FKTyxHQUFHLENBS1osQ0FDRCxHQUNIO0FBRUo7QUFFQSxTQUFTLFVBQVUsRUFBRSxPQUFPLFFBQVEsR0FBRztBQUNyQyxTQUNFLDZDQUFDLFlBQVMsV0FBVSxTQUNsQjtBQUFBLGdEQUFDLFVBQUssV0FBVSxXQUFVLGVBQVksUUFBTztBQUFBLElBQzdDLDZDQUFDLFNBQUksV0FBVSxZQUNiO0FBQUEsbURBQUMsWUFBTztBQUFBLG9EQUFDLFFBQUssTUFBSyxhQUFZLE1BQU0sSUFBSTtBQUFBLFFBQUU7QUFBQSxRQUFjLDZDQUFDLFFBQUc7QUFBQSxzREFBQyxRQUFLLE1BQUssU0FBUSxNQUFNLElBQUk7QUFBQSxVQUFFO0FBQUEsVUFBUTtBQUFBLFVBQVE7QUFBQSxXQUFJO0FBQUEsU0FBSztBQUFBLE1BQ3JILDRDQUFDLFFBQUksZ0JBQU0sSUFBSSxDQUFDLEdBQUcsTUFBTSw2Q0FBQyxRQUFXLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRztBQUFBLG9EQUFDLFVBQUssV0FBVSxVQUFTLGVBQVksUUFBTyxzREFBQyxRQUFLLE1BQUssU0FBUSxNQUFNLElBQUksUUFBUSxLQUFLLEdBQUU7QUFBQSxRQUFRO0FBQUEsV0FBeEgsQ0FBMEgsQ0FBSyxHQUFFO0FBQUEsT0FDcks7QUFBQSxLQUNGO0FBRUo7QUFFZSxTQUFSLFdBQTRCO0FBQ2pDLFFBQU0sRUFBRSxLQUFLLElBQUksVUFBVTtBQUMzQixRQUFNLE9BQU8sYUFBYSxJQUFJLEtBQUs7QUFDbkMsUUFBTSxJQUFJLFNBQVMsSUFBSTtBQUN2QixRQUFNLE1BQU0sSUFBSSxJQUFJO0FBQ3BCLFFBQU0sTUFBTSxTQUFTLFFBQVEsMkJBQTJCLFNBQVMsY0FBYyx3QkFBd0I7QUFDdkcsU0FDRSw2Q0FBQyxTQUFJLFdBQVcsV0FBVyxJQUFJLFdBQVcsSUFBSSxJQUM1QztBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLG1CQUFtQixJQUFJO0FBQUEsUUFDbEMsT0FBTyxTQUFTLFFBQVEsUUFBUSxTQUFTLGNBQWMsU0FBUztBQUFBLFFBQ2hFLFFBQVEsQ0FBQyxFQUFFLE9BQU8sUUFBUSxJQUFJLElBQUksR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUM7QUFBQSxRQUN0RCxTQUFTLEVBQUU7QUFBQSxRQUNYLE9BQU8sRUFBRTtBQUFBLFFBQ1QsTUFBTSxFQUFFO0FBQUEsUUFDUixRQUFRLEVBQUU7QUFBQSxRQUNWLE1BQU0sQ0FBQyxFQUFFLE9BQU8sS0FBSyxJQUFJLFNBQVMsSUFBSSxHQUFHLEdBQUcsRUFBRSxPQUFPLGdCQUFnQixJQUFJLGlCQUFpQixTQUFTLFNBQVMsTUFBTSxRQUFRLENBQUM7QUFBQSxRQUMzSCxLQUFLLDRDQUFDLE9BQUk7QUFBQSxRQUVWLHNEQUFDLFFBQUcsV0FBVSxhQUFhLFlBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSw2Q0FBQyxRQUFXO0FBQUEsc0RBQUMsT0FBRyxhQUFFO0FBQUEsVUFBSSw0Q0FBQyxVQUFNLGFBQUU7QUFBQSxhQUF0QixDQUE2QixDQUFLLEdBQUU7QUFBQTtBQUFBLElBQ2xHO0FBQUEsSUFFQSw0Q0FBQyxhQUFRLFdBQVUsbUJBQWtCLElBQUcsU0FDdEMsdURBQUMsU0FBSSxXQUFVLGFBQ1o7QUFBQSxlQUFTLFNBQVMsNENBQUMsZUFBWSxTQUFRLGdCQUFlLE9BQU0sZ0RBQStDLE1BQUssNEhBQXNILE9BQU0sV0FBVTtBQUFBLE1BQ3RQLFNBQVMsZUFBZSw0Q0FBQyxlQUFZLFNBQVEsZ0JBQWUsT0FBTSw4Q0FBNkMsTUFBSyx3SUFBdUksT0FBTSxXQUFVO0FBQUEsTUFDM1EsU0FBUyxhQUFhLDRDQUFDLGVBQVksU0FBUSxnQkFBZSxPQUFNLDBCQUF5QixNQUFLLDJIQUFxSCxPQUFNLFdBQVU7QUFBQSxNQUNuTyxTQUFTLFNBQVMsNENBQUMsZUFBWTtBQUFBLE1BQy9CLFNBQVMsZUFBZSw0Q0FBQyxlQUFZO0FBQUEsTUFDckMsU0FBUyxhQUFhLDRDQUFDLFlBQVM7QUFBQSxPQUNuQyxHQUNGO0FBQUEsSUFFQyxTQUFTLFNBQ1IsNENBQUMsYUFBUSxXQUFVLDBCQUNqQix1REFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLGtEQUFDLGVBQVksU0FBUSxnQkFBZSxPQUFPLFNBQVMsWUFBWSxHQUFHLGVBQWUsZ0NBQWdDLGdEQUFnRCxNQUFNLFNBQVMsWUFBWSxnSUFBMkgsMElBQTBJLE9BQU8sU0FBUyxZQUFZLFlBQVksV0FBVztBQUFBLE1BQ3JmLDRDQUFDLG9CQUFpQixTQUFTLFNBQVMsYUFBYTtBQUFBLE9BQ25ELEdBQ0Y7QUFBQSxJQUdGLDRDQUFDLGFBQVEsV0FBVSx1QkFDakIsdURBQUMsU0FBSSxXQUFVLG1CQUNiO0FBQUEsbURBQUMsU0FBSSxXQUFVLGNBQ2I7QUFBQSxxREFBQyxVQUFLLFdBQVUsV0FBVSxPQUFPLEVBQUUsUUFBUSxZQUFZLEdBQUc7QUFBQSxzREFBQyxPQUFFLGVBQVksUUFBTztBQUFBLFVBQUU7QUFBQSxXQUFlO0FBQUEsUUFDakcsNENBQUMsUUFBSSxtQkFBUyxRQUFRLDZDQUE2QyxTQUFTLGNBQWMsc0NBQXNDLG1DQUFrQztBQUFBLFFBQ2xLLDRDQUFDLE9BQUUsV0FBVSxRQUFRLG1CQUFTLFFBQVEsK0lBQStJLFNBQVMsY0FBYyxrSEFBa0gsa0dBQWlHO0FBQUEsUUFDL1osNENBQUMsVUFBTyxJQUFJLFNBQVMsSUFBSSxJQUFLLGVBQUk7QUFBQSxTQUNwQztBQUFBLE1BQ0EsNENBQUMsV0FBUSxPQUFPLEVBQUUsU0FBUztBQUFBLE9BQzdCLEdBQ0Y7QUFBQSxJQUVBLDRDQUFDLGFBQVEsV0FBVSxpQ0FDakIsdURBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSxrREFBQyxlQUFZLFNBQVEsNEJBQTJCLE9BQU8sU0FBUyxRQUFRLGtDQUFrQyxTQUFTLGNBQWMsdUNBQWtDLG1DQUFtQyxPQUFNLFdBQVU7QUFBQSxNQUN0Tiw0Q0FBQyxXQUFRLE9BQU8sRUFBRSxTQUFTLE1BQVk7QUFBQSxPQUN6QyxHQUNGO0FBQUEsSUFFQSw0Q0FBQyxhQUFRLFdBQVUsdUJBQ2pCLHVEQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsa0RBQUMsZUFBWSxTQUFRLFdBQVUsT0FBTyxTQUFTLFFBQVEsNENBQTRDLFNBQVMsY0FBYyw4QkFBOEIsa0NBQWtDLE1BQUssOElBQTZJLE9BQU0sV0FBVTtBQUFBLE1BQzVWLDRDQUFDLGNBQVcsTUFBWTtBQUFBLE9BQzFCLEdBQ0Y7QUFBQSxJQUVBLDRDQUFDLGFBQVEsV0FBVSx1QkFDakIsdURBQUMsU0FBSSxXQUFVLG1CQUNiO0FBQUEsa0RBQUMsYUFBVSxPQUFPLEVBQUUsU0FBUyxTQUFTLEVBQUUsU0FBUztBQUFBLE1BQ2pELDZDQUFDLFNBQUksV0FBVSxjQUNiO0FBQUEscURBQUMsVUFBSyxXQUFVLFdBQVUsT0FBTyxFQUFFLFFBQVEsWUFBWSxHQUFHO0FBQUEsc0RBQUMsT0FBRSxlQUFZLFFBQU87QUFBQSxVQUFFO0FBQUEsV0FBVztBQUFBLFFBQzdGLDRDQUFDLFFBQUcseUNBQTJCO0FBQUEsUUFDL0IsNENBQUMsT0FBRSxXQUFVLFFBQU8saUtBQW1KO0FBQUEsUUFDdkssNkNBQUMsT0FBRSxXQUFVLFlBQVc7QUFBQSxzREFBQyxRQUFLLE1BQUssUUFBTyxNQUFNLElBQUk7QUFBQSxVQUFFO0FBQUEsV0FBd0U7QUFBQSxTQUNoSTtBQUFBLE9BQ0YsR0FDRjtBQUFBLElBRUEsNENBQUMsYUFBUSxXQUFVLG1CQUNqQix1REFBQyxTQUFJLFdBQVUsb0JBQ2I7QUFBQSxrREFBQyxlQUFZLFNBQVEsYUFBWSxPQUFPLEdBQUcsRUFBRSxJQUFJLHNCQUFzQixPQUFNLFdBQVU7QUFBQSxNQUN2Riw0Q0FBQyxhQUFVLE9BQU8sYUFBYSxJQUFJLEdBQUcsVUFBVSxPQUFPLElBQUksSUFBSSxhQUFhLEdBQUc7QUFBQSxPQUNqRixHQUNGO0FBQUEsSUFFQSw0Q0FBQyxhQUFRLFdBQVUsbUJBQ2pCLHNEQUFDLFNBQUksV0FBVSxhQUNiLHVEQUFDLFNBQUksV0FBVSxXQUNiO0FBQUEsbURBQUMsVUFBSyxXQUFVLFlBQVcsZUFBWSxRQUFPO0FBQUEsb0RBQUMsT0FBRTtBQUFBLFFBQUUsNENBQUMsT0FBRTtBQUFBLFFBQUUsNENBQUMsT0FBRTtBQUFBLFNBQUU7QUFBQSxNQUM3RCw0Q0FBQyxRQUFJLG1CQUFTLFFBQVEsOEJBQThCLFNBQVMsY0FBYyw2Q0FBNkMsbURBQTZDO0FBQUEsTUFDckssNENBQUMsT0FBRSwyRUFBNkQ7QUFBQSxNQUNoRSw2Q0FBQyxTQUFJLFdBQVUsV0FDYjtBQUFBLG9EQUFDLFVBQU8sSUFBSSxTQUFTLElBQUksSUFBSyxlQUFJO0FBQUEsUUFDbEMsNkNBQUMsUUFBSyxXQUFVLG1CQUFrQixJQUFJLFNBQVMsUUFBUSxnQkFBZ0IsU0FBUyxjQUFjLGNBQWMsNkJBQ3pHO0FBQUEsbUJBQVMsUUFBUSwwQ0FBMEMsU0FBUyxjQUFjLDBDQUEwQztBQUFBLFVBQXdDO0FBQUEsVUFBQyw0Q0FBQyxRQUFLLE1BQUssU0FBUSxNQUFNLElBQUk7QUFBQSxXQUNyTTtBQUFBLFNBQ0Y7QUFBQSxPQUNGLEdBQ0YsR0FDRjtBQUFBLEtBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFtdCn0K
