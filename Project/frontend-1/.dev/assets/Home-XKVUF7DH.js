import {
  AUDIENCES,
  TESTIMONIALS
} from "/assets/chunk-DM3DAGQJ.js";
import {
  useMemberReviews
} from "/assets/chunk-7OCC2F7F.js";
import {
  pop
} from "/assets/chunk-NOWM46SW.js";
import "/assets/chunk-JWSEDBGW.js";
import {
  CAREGIVER_HOUSE,
  FLOORS
} from "/assets/chunk-LAPZ264O.js";
import {
  CONDITION_COUNT,
  THERAPY_AREAS
} from "/assets/chunk-NSY2VIZJ.js";
import {
  RATE_BANDS,
  RATE_MAX,
  SAMPLE_SURVEYS,
  STEPS
} from "/assets/chunk-YPHFYR4R.js";
import {
  HOME_FAQ
} from "/assets/chunk-EVZY7DYQ.js";
import {
  NOTIFY_CHANNELS
} from "/assets/chunk-SPSQFVM6.js";
import {
  HeartMark
} from "/assets/chunk-GTWO7VGT.js";
import {
  COMMUNITY_STATS
} from "/assets/chunk-TR53Q4MY.js";
import {
  Persona
} from "/assets/chunk-53J6YGE2.js";
import {
  TopicHub,
  TopicTicker
} from "/assets/chunk-YUJB3ZOX.js";
import {
  Title
} from "/assets/chunk-NVJYUHG3.js";
import {
  Button,
  Flag,
  Icon,
  Link,
  LiveZone,
  SectionHead,
  Stars,
  require_jsx_runtime,
  require_react,
  useInView,
  useMounted
} from "/assets/chunk-LANM2SZF.js";
import {
  COVERAGE_COUNT,
  REGIONS
} from "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/Home.jsx
init_define_import_meta_env();

// src/components/RoleHero.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var ROLES = [
  {
    id: "hcp",
    tab: "Healthcare Professional",
    tabSub: "Doctors, nurses & allied health",
    icon: "stethoscope",
    persona: ["doctor", 2, 0, 0],
    motto: "Your expertise, rewarded",
    title: ["Paid surveys that", { t: "respect your clinical time", hl: "grad" }],
    lead: "Fifteen minutes between clinics is enough. Tell pharma, device and health-tech teams how medicine really works on the ward, and receive an honorarium for every study you complete. Verified professionals only, so every invitation is worth opening.",
    badges: ["Honoraria for every completed study", "Credential-verified panel", "Fits around shifts"],
    cta: "Join as a professional"
  },
  {
    id: "caregiver",
    tab: "Caregiver",
    tabSub: "Family & care support",
    icon: "hands",
    persona: ["caregiver", 1, 3, 1],
    motto: "You carry the care. We carry your voice",
    title: ["Paid surveys for the people who", { t: "hold it all together", hl: "grad" }],
    lead: "You know what the brochures leave out: the night checks, the pharmacy runs, the waiting rooms. Share it in short surveys whenever it suits you, and earn cash, gift cards or grocery vouchers for every one you finish.",
    badges: ["Short, flexible surveys", "Cash, grocery & wellness rewards", "Sensitive questions optional"],
    cta: "Join as a caregiver"
  },
  {
    id: "patient",
    tab: "Patient",
    tabSub: "Share your experience",
    icon: "heart",
    persona: ["patient", 3, 2, 0],
    motto: "Your story can change someone\u2019s treatment",
    title: ["Paid surveys where", { t: "your health story pays you back", hl: "grad" }],
    lead: "No clinics, no tests, no needles. Just your honest experience of living with a condition, answered from your phone, and a reward for every survey you complete. Your name never leaves our hands.",
    badges: ["\u20B90 / $0 to join", "Answer from your phone", "Your details never sold"],
    cta: "Join as a patient"
  }
];
var SYMBOLS = ["$", "\u20B9", "\u20AC", "\xA3", "$", "\u20B9", "\u20AC", "$", "\u20B9", "\xA3"];
function Count({ to, pre = "", className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `count-up ${className}`, style: { "--to": to }, "data-pre": pre, "aria-hidden": "true" });
}
function Coin({ sym = "$", className = "", style }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: `gcoin ${className}`, style, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: sym }) });
}
function ProScene() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vm-monitor", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vm-screen", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vm-top", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vm-live", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
            "Live study"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vm-tag", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "stethoscope", size: 12 }),
            " Cardiology \xB7 18 min"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { className: "vm-ecg", viewBox: "0 0 300 90", preserveAspectRatio: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "vm-trace", d: "M0 52 H52 l8-12 8 12 H96 l6-40 9 74 8-48 6 14 H168 l8-14 8 14 H212 l6-40 9 74 8-48 6 14 H300", pathLength: "100" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "vm-glow", d: "M0 52 H52 l8-12 8 12 H96 l6-40 9 74 8-48 6 14 H168 l8-14 8 14 H212 l6-40 9 74 8-48 6 14 H300", pathLength: "100" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vm-read", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vm-cell big", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Honoraria earned" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, { to: 1250, pre: "$" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vm-cell", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Studies" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "12" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vm-cell", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Status" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { className: "vm-ok", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 12, stroke: 3 }),
              " Paid"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vm-neck" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vm-foot" })
    ] }),
    [0, 1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coin, { sym: ["$", "\u20AC", "\xA3"][i], className: "vm-pop", style: { "--i": i } }, i)),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vm-tower", children: [
      Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vm-disc", style: { "--i": i } }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vm-tower-lbl", children: "Honorarium" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vm-credit", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vc-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "bank", size: 16 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "+$45 credited" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Wire transfer \xB7 just now" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vm-lanyard", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vl-string" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vl-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Persona, { kind: "doctor", skin: 2, hair: 0, size: 40 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Verified clinician" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "shieldCheck", size: 11 }),
            " Licence checked"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "s-chip c1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "book", size: 13 }),
      " CME credit"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "s-chip c2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "paypal", size: 13 }),
      " PayPal"
    ] })
  ] });
}
function CareScene() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cj-jar", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 200 240", className: "cj-svg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: "cj-clip", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M40 70 Q30 80 30 100 V200 Q30 226 56 226 H144 Q170 226 170 200 V100 Q170 80 160 70 Z" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "cj-liquid", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#ffd27a" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#ff7a59" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "cj-glass", x1: "0", y1: "0", x2: "1", y2: "0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#fff", stopOpacity: ".75" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".3", stopColor: "#fff", stopOpacity: ".15" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".8", stopColor: "#fff", stopOpacity: ".05" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#fff", stopOpacity: ".5" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "100", cy: "230", rx: "78", ry: "8", fill: "#000", opacity: ".1" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M40 70 Q30 80 30 100 V200 Q30 226 56 226 H144 Q170 226 170 200 V100 Q170 80 160 70 Z", fill: "#fff", fillOpacity: ".35", stroke: "#ffb38a", strokeWidth: "3" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { clipPath: "url(#cj-clip)", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "cj-fill", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "20", y: "0", width: "160", height: "240", fill: "url(#cj-liquid)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "cj-wave", d: "M0 4 Q25 -4 50 4 T100 4 T150 4 T200 4 T250 4 V20 H0z", fill: "#ffe2a8" })
        ] }),
        [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { className: "cj-coin", style: { "--i": i }, cx: 60 + i % 3 * 40, cy: 206 - Math.floor(i / 3) * 14, rx: "17", ry: "6", fill: "#fcd34d", stroke: "#d97706", strokeWidth: "2" }, i)),
        [0, 1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "cj-heart", style: { "--i": i }, d: "M0 -4c-3-6-12-4-10 3 1 4 10 9 10 9s9-5 10-9c2-7-7-9-10-3z", fill: "#ff4f6d", transform: `translate(${70 + i * 30} ${190 - i * 26})` }, i))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M40 70 Q30 80 30 100 V200 Q30 226 56 226 H144 Q170 226 170 200 V100 Q170 80 160 70 Z", fill: "url(#cj-glass)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M48 96 V196", stroke: "#fff", strokeOpacity: ".9", strokeWidth: "6", strokeLinecap: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "34", y: "48", width: "132", height: "26", rx: "10", fill: "#ff8a3d" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "34", y: "48", width: "132", height: "10", rx: "6", fill: "#ffb067" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "cj-label", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "58", y: "120", width: "84", height: "42", rx: "10", fill: "#fff" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", { x: "100", y: "138", textAnchor: "middle", fontSize: "11", fontWeight: "800", fill: "#ff4f6d", children: "CARE FUND" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", { x: "100", y: "153", textAnchor: "middle", fontSize: "10", fontWeight: "700", fill: "#b45309", children: "grows every survey" })
      ] })
    ] }) }),
    [["bag", "Grocery voucher"], ["pulse", "Wellness"], ["wallet", "Cash reward"]].map(([ic, l], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: `cj-plane p${i}`, style: { "--i": i }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 24 24", className: "cjp-svg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 2 2 9.5l7 3 3 7z", fill: "#fff", stroke: "currentColor", strokeWidth: "1.6", strokeLinejoin: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 2 9 12.5", stroke: "currentColor", strokeWidth: "1.6" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 12 }),
        l
      ] })
    ] }, l)),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cj-week", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "cw-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "calendar", size: 13 }),
        " This week"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cw-days", children: ["M", "T", "W", "T", "F", "S", "S"].map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { "--i": i }, className: i % 2 === 0 ? "on" : "", children: d }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "cw-sum", children: [
        "4 short surveys \xB7 ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "\u20B92,000" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cj-ticket", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "ct-l", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Grocery voucher" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "\u20B9500" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ct-r", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "gift", size: 18 }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "s-badge sb-care", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Persona, { kind: "caregiver", skin: 1, hair: 3, hairStyle: 1, size: 42 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Caring for Dad" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "clock", size: 11 }),
          " 10-minute survey"
        ] })
      ] })
    ] })
  ] });
}
function PatientScene() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gp-phone", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "gp-screen", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gp-q", children: "Living with type 2 diabetes" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 100 100", className: "gp-ring", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "50", cy: "50", r: "40", className: "gp-track" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "50", cy: "50", r: "40", className: "gp-prog", pathLength: "100" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "gp-pct", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, { to: 100 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "%" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "gp-done", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 13, stroke: 3 }),
        " Survey complete"
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "gb-wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "gb-box", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gb-f front" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gb-f back" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gb-f left" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gb-f right" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gb-f bottom" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "gb-lid", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gl-f top" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gl-f front" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gl-f back" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gl-f left" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gl-f right" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "gb-bow", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "gb-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "gc-top", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "gift", size: 13 }),
          " Reward unlocked"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Amazon Gift Card" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gc-val", children: "$15" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gc-shine" })
      ] }),
      Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coin, { sym: SYMBOLS[i], className: "gb-coin", style: { "--i": i, "--dx": `${(i - 3.5) * 9}cqw`, "--dy": `${-20 - i % 3 * 8}cqw` } }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gb-rays" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "gp-wallet", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "wallet", size: 15 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "My rewards" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Count, { to: 45, pre: "$" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "s-chip c1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "upi", size: 13 }),
      " UPI \xB7 India"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "s-chip c3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lock", size: 13 }),
      " Anonymous answers"
    ] })
  ] });
}
var SCENES = { hcp: ProScene, caregiver: CareScene, patient: PatientScene };
function Stage({ role }) {
  const ref = (0, import_react.useRef)(null);
  const Scene = SCENES[role.id];
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`);
    el.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`);
  };
  const reset = () => {
    ref.current?.style.setProperty("--ry", "0deg");
    ref.current?.style.setProperty("--rx", "0deg");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveZone, { className: `stage stage-${role.id}`, onPointerMove: onMove, onPointerLeave: reset, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "stage-3d", ref, "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "stage-pad" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
  ] }) });
}
function RoleHero() {
  const [idx, setIdx] = (0, import_react.useState)(0);
  const touched = (0, import_react.useRef)(false);
  const role = ROLES[idx];
  (0, import_react.useEffect)(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!touched.current && !document.hidden) setIdx((i) => (i + 1) % ROLES.length);
    }, 9e3);
    return () => clearInterval(t);
  }, []);
  const pick = (i) => {
    touched.current = true;
    setIdx(i);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: `role-hero rgrade-${role.id}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rh-bg", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rh-ecg", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 1200 120", preserveAspectRatio: "none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 70 H360 l20-40 26 80 22-96 20 72 14-16 H760 l16-24 18 48 16-24 H1200", pathLength: "100" }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container rh-inner", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rh-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rh-tabs", role: "tablist", "aria-label": "Choose who you are", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rh-slider", style: { "--n": idx }, "aria-hidden": "true" }),
          ROLES.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { role: "tab", id: `rh-tab-${r.id}`, "aria-selected": i === idx, "aria-controls": "rh-panel", className: `rh-tab t-${r.id} ${i === idx ? "on" : ""}`, onClick: () => pick(i), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rht-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: r.icon, size: 18 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "rht-txt", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: r.tab }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: r.tabSub })
            ] }),
            i === idx && !touched.current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rht-timer", "aria-hidden": "true" }, idx)
          ] }, r.id))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rh-panel", id: "rh-panel", role: "tabpanel", "aria-labelledby": `rh-tab-${role.id}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "rh-motto", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rm-av", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Persona, { kind: role.persona[0], skin: role.persona[1], hair: role.persona[2], hairStyle: role.persona[3], size: 30 }) }),
            role.motto
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { parts: role.title }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "rh-lead", children: role.lead }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "ph-badges", children: role.badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: b }, b)) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ph-ctas", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { to: `/join#${role.id}`, children: role.cta }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { to: "/how-it-works", variant: "ghost", icon: "pulse", children: "How paid surveys work" })
          ] })
        ] }, role.id)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rh-art", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, { role }) }, role.id + "-art")
    ] })
  ] });
}

// src/components/HomeSections.jsx
init_define_import_meta_env();
var import_react3 = __toESM(require_react(), 1);

// src/components/Counter.jsx
init_define_import_meta_env();
var import_react2 = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function Counter({ value, prefix = "", suffix = "", duration = 1400 }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const mounted = useMounted();
  const [n, setN] = (0, import_react2.useState)(value);
  (0, import_react2.useEffect)(() => {
    if (!mounted) return;
    if (!inView) {
      setN(0);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, mounted, value, duration]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { ref, className: "counter", children: [
    prefix,
    n.toLocaleString("en-US"),
    suffix
  ] });
}

// src/components/HomeSections.jsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function StatViz({ id, on }) {
  if (id === "panelists")
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "sv-crowd", "aria-hidden": "true", children: [
      [["doctor", 2, 0, 0], ["nurse", 4, 1, 1], ["caregiver", 1, 3, 1], ["patient", 3, 2, 0], ["pharmacist", 0, 4, 2], ["elder", 1, 0, 0]].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: { "--i": i }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Persona, { kind: p[0], skin: p[1], hair: p[2], hairStyle: p[3], size: 38 }) }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("b", { children: "+" })
    ] });
  if (id === "incentives")
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "sv-coins", "aria-hidden": "true", children: [5, 8, 6, 10, 7, 12].map((n, k) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "svc-col", style: { "--n": n, "--k": k }, children: Array.from({ length: n }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("i", { style: { "--j": j } }, j)) }, k)) });
  if (id === "monthly")
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "sv-cal", "aria-hidden": "true", children: Array.from({ length: 28 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("i", { className: [2, 5, 6, 9, 11, 13, 16, 18, 19, 22, 24, 26].includes(i) ? "on" : "", style: { "--i": i } }, i)) });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "sv-ring", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { viewBox: "0 0 100 100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "50", cy: "50", r: "42", className: "r-bg" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "50", cy: "50", r: "42", className: "r-fg", pathLength: "100" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "check", size: 26, stroke: 3 })
  ] });
}
function CommunityPulse() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("section", { ref, className: `section community ${inView ? "is-in" : ""}`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("header", { className: "cm-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "eyebrow", style: { "--eb": "#facc15" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("i", { "aria-hidden": "true" }),
        "Our community"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("h2", { children: [
        "Trusted by ",
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ink-gold", children: "thousands" }),
        ", one honest answer at a time"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Every opinion nudges a healthcare decision somewhere in the world. Here is what our members have built together so far." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "cm-grid", children: COMMUNITY_STATS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("article", { className: `cm-card cm-${s.id}`, style: { "--c": s.color, "--i": i }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StatViz, { id: s.id, on: inView }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Counter, { value: s.value, prefix: s.prefix, suffix: s.suffix, duration: 1800 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: s.label }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("small", { children: s.note })
    ] }, s.id)) })
  ] }) });
}
function FlagGlobe() {
  const [active, setActive] = (0, import_react3.useState)("all");
  const pts = (0, import_react3.useMemo)(() => {
    const all = REGIONS.flatMap((r) => r.countries.map(([code, name]) => ({ code, name, region: r.id, color: r.color })));
    const N3 = all.length;
    return all.map((c, i) => {
      const y = 1 - i / (N3 - 1) * 2;
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = i * 137.508 % 360;
      return { ...c, lat, lon };
    });
  }, []);
  const region = REGIONS.find((r) => r.id === active);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `fglobe-wrap ${active !== "all" ? "has-focus" : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(LiveZone, { className: "fglobe-stage", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "fg-stars", "aria-hidden": "true" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "fg-atmo", "aria-hidden": "true" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "fglobe", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "fg-spin", children: [
          pts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `fg-pt ${active === "all" || active === p.region ? "on" : ""}`, style: { transform: `rotateY(${p.lon}deg) rotateX(${p.lat}deg) translateZ(var(--R))`, "--c": p.color }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Flag, { code: p.code, size: 28 }) }, p.code)),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "fg-equator" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "fg-meridian" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "fg-meridian m2" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "fg-core", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(HeartMark, { size: 64 }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "fg-count", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: region ? region.countries.length : COVERAGE_COUNT }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: region ? region.name : "countries \xB7 5 regions" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "region-tabs", role: "tablist", "aria-label": "Regions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { role: "tab", "aria-selected": active === "all", className: active === "all" ? "on" : "", onClick: () => setActive("all"), style: { "--c": "#0b1b3f" }, children: "All regions" }),
      REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { role: "tab", "aria-selected": active === r.id, className: active === r.id ? "on" : "", onClick: () => setActive(r.id), style: { "--c": r.color }, children: [
        r.name,
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("em", { children: r.countries.length })
      ] }, r.id))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flag-cloud", children: REGIONS.filter((r) => active === "all" || r.id === active).flatMap((r) => r.countries.map(([code, name], i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "fcl", style: { "--c": r.color, "--i": i }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Flag, { code, name, size: 28 }),
      name
    ] }, code))) })
  ] });
}

// src/components/HomeV3.jsx
init_define_import_meta_env();
var import_react4 = __toESM(require_react(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var REWARD_TYPES = [
  { id: "shopping", t: "Shopping Vouchers", icon: "bag", c: "#ff7a1a" },
  { id: "cash", t: "Cash Rewards", icon: "wallet", c: "#16a34a" },
  { id: "grocery", t: "Grocery Vouchers", icon: "home", c: "#f59e0b" },
  { id: "bank", t: "Bank Transfer", icon: "bank", c: "#0f766e" },
  { id: "paypal", t: "PayPal", icon: "paypal", c: "#0070e0" },
  { id: "wire", t: "Wire Transfer", icon: "bank", c: "#0f766e" },
  { id: "upi", t: "UPI (India)", icon: "upi", c: "#5f259f" },
  { id: "report", t: "Medical Report", icon: "clipboard", c: "#db2777" },
  { id: "digital", t: "Digital Gift Cards", icon: "card", c: "#7c3aed" }
];
var N = REWARD_TYPES.length;
var ITEM_H = 92;
function Reel({ target, from, spinning, delay }) {
  const strip = (0, import_react4.useMemo)(() => [...REWARD_TYPES, ...REWARD_TYPES, ...REWARD_TYPES, ...REWARD_TYPES], []);
  const offset = spinning ? 27 + target : from;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "reel", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "div",
    {
      className: "reel-strip",
      style: {
        transform: `translateY(${-(offset - 1) * ITEM_H}px)`,
        transition: spinning ? `transform ${1.6 + delay}s cubic-bezier(.17,.67,.24,1.02)` : "none"
      },
      children: strip.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "reel-item", style: { "--c": r.c }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "ri-ic", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: r.icon, size: 26 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("small", { children: r.t })
      ] }, i))
    }
  ) });
}
function RewardSlot() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const [targets, setTargets] = (0, import_react4.useState)([0, 4, 6]);
  const [from, setFrom] = (0, import_react4.useState)([0, 4, 6]);
  const [spinning, setSpinning] = (0, import_react4.useState)(false);
  const [won, setWon] = (0, import_react4.useState)(false);
  const [pulled, setPulled] = (0, import_react4.useState)(false);
  const busy = (0, import_react4.useRef)(false);
  const first = (0, import_react4.useRef)(true);
  const spin = (sound = true) => {
    if (busy.current) return;
    busy.current = true;
    setWon(false);
    setPulled(true);
    setTimeout(() => setPulled(false), 450);
    const next = targets.map((t, i) => (t + 2 + Math.floor(Math.random() * (N - 2)) + i) % N);
    setFrom(targets);
    setSpinning(false);
    requestAnimationFrame(
      () => requestAnimationFrame(() => {
        setTargets(next);
        setSpinning(true);
      })
    );
    setTimeout(() => {
      setSpinning(false);
      setFrom(next);
      setWon(true);
      busy.current = false;
      if (sound) pop(0.1);
    }, 2600);
  };
  (0, import_react4.useEffect)(() => {
    if (inView && first.current) {
      first.current = false;
      const t = setTimeout(() => spin(false), 400);
      return () => clearTimeout(t);
    }
  }, [inView]);
  const shown = new Set(won ? targets.map((t) => REWARD_TYPES[t].id) : []);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "slot-wrap", ref, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(LiveZone, { className: `slot ${won ? "is-won" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "slot-sign", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "slot-bulbs", "aria-hidden": "true", children: Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { style: { "--i": i } }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("b", { children: "Reward machine" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("small", { children: "pull the lever" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "slot-window", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "slot-line", "aria-hidden": "true" }),
        [0, 1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Reel, { target: targets[i], from: from[i], spinning, delay: i * 0.35 }, i))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "slot-tray", "aria-hidden": "true", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { className: "tray-coin", style: { "--i": i } }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: `slot-lever ${pulled ? "is-pulled" : ""}`, onClick: () => spin(true), "aria-label": "Spin the reward machine", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "lv-stick" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "lv-knob" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "sr-only", "aria-live": "polite", children: won ? `Showing ${targets.map((t) => REWARD_TYPES[t].t).join(", ")}` : "" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("ul", { className: "reward-grid", children: [
      REWARD_TYPES.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("li", { className: shown.has(r.id) ? "hit" : "", style: { "--c": r.c, "--i": i }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "rg-ic", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: r.icon, size: 22 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("b", { children: r.t })
      ] }, r.id)),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("li", { className: "rg-note", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "info", size: 16 }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "UPI payouts are available for members in India." })
      ] })
    ] })
  ] });
}
var CH = {
  dashboard: { icon: "dashboard", c: "#7c3aed", title: "New study matched to your profile", sub: "Health & wellness \xB7 about 12 min" },
  sms: { icon: "sms", c: "#f59e0b", title: "MHO: a new survey is waiting for you", sub: "Tap to see topic, time and reward" },
  whatsapp: { icon: "whatsapp", c: "#22c55e", title: "MyHealthOpinions", sub: "A study that fits your profile just opened" },
  email: { icon: "mail", c: "#2457f5", title: "Your next survey invitation", sub: "Topic, estimated time and reward inside" }
};
var PATHS = [
  "M120 70 C 260 70, 300 180, 420 200",
  "M880 70 C 740 70, 700 180, 580 200",
  "M120 330 C 260 330, 300 240, 420 220",
  "M880 330 C 740 330, 700 240, 580 220"
];
function ChannelHub() {
  const [ref, inView] = useInView({ threshold: 0.3 }, false);
  const [i, setI] = (0, import_react4.useState)(0);
  const [feed, setFeed] = (0, import_react4.useState)([{ k: 0, c: 0 }]);
  const go = (k) => {
    setI(k);
    setFeed((f) => [{ k: Date.now() + Math.random(), c: k }, ...f].slice(0, 3));
  };
  (0, import_react4.useEffect)(() => {
    if (!inView) return;
    const t = setInterval(() => setI((x) => {
      const n = (x + 1) % 4;
      setFeed((f) => [{ k: Date.now(), c: n }, ...f].slice(0, 3));
      return n;
    }), 2600);
    return () => clearInterval(t);
  }, [inView]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "hub", ref, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "hub-wires", viewBox: "0 0 1000 400", preserveAspectRatio: "none", "aria-hidden": "true", children: PATHS.map((d, k) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("g", { className: k === i ? "on" : "", style: { "--c": CH[NOTIFY_CHANNELS[k].id].c }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d, className: "hw-path" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { r: "7", className: "hw-dot", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("animateMotion", { dur: "2.6s", repeatCount: "indefinite", path: d }) })
    ] }, k)) }),
    NOTIFY_CHANNELS.map((c, k) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: `hub-node hn-${k} ${k === i ? "on" : ""}`, style: { "--c": CH[c.id].c }, onClick: () => go(k), children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "hn-ic", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: CH[c.id].icon, size: 22 }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "hn-txt", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("b", { children: c.name }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("small", { children: c.blurb })
      ] })
    ] }, c.id)),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "hub-phone", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "hp-notch" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "hp-time", children: "9:41" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "hp-date", children: "Tuesday, new studies waiting" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "hp-stack", children: feed.map((f, d) => {
        const c = CH[NOTIFY_CHANNELS[f.c].id];
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "hp-note", style: { "--d": d, "--c": c.c }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "hpn-ic", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: c.icon, size: 16 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "hpn-t", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("b", { children: c.title }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("small", { children: c.sub })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("em", { children: d === 0 ? "now" : `${d * 3}m` })
        ] }, f.k);
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "hp-ring" })
    ] })
  ] });
}
var ROLE_TO_AUD = { hcp: "doctors", caregiver: "caregivers", patient: "patients" };
var audColor = (id) => AUDIENCES.find((a) => a.id === id)?.color || "#2457f5";
var audLabel = (id) => AUDIENCES.find((a) => a.id === id)?.label || "";
var initials = (n) => n.replace(/^Dr\.?\s+/i, "").split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
function MiniCard({ t, onPick, active }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: `vw-mini ${active ? "on" : ""}`, style: { "--c": audColor(t.audience) }, onClick: onPick, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "vm-top", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "vm-av", children: initials(t.name) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "vm-who", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("b", { children: t.name }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("small", { children: t.role })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Flag, { code: t.cc, name: t.country, size: 22 })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Stars, { value: t.rating, size: 12 }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "vm-q", children: t.quote })
  ] });
}
function VoiceWall() {
  const member = useMemberReviews();
  const all = (0, import_react4.useMemo)(() => [
    ...member.map((m) => ({ ...m, role: m.designation, audience: ROLE_TO_AUD[m.roleType] || "patients", member: true })),
    ...TESTIMONIALS
  ], [member]);
  const [aud, setAud] = (0, import_react4.useState)("all");
  const list = (0, import_react4.useMemo)(() => aud === "all" ? all : all.filter((t) => t.audience === aud), [all, aud]);
  const [pick, setPick] = (0, import_react4.useState)(0);
  const held = (0, import_react4.useRef)(false);
  const [ref, inView] = useInView({ threshold: 0.2 }, false);
  (0, import_react4.useEffect)(() => setPick(0), [aud]);
  (0, import_react4.useEffect)(() => {
    if (!inView) return;
    const t = setInterval(() => !held.current && setPick((p) => (p + 1) % Math.max(list.length, 1)), 6e3);
    return () => clearInterval(t);
  }, [inView, list.length]);
  const cur = list[Math.min(pick, list.length - 1)];
  const cols = [0, 1, 2].map((c) => list.filter((_, i) => i % 3 === c));
  const choose = (t) => {
    held.current = true;
    setPick(list.indexOf(t));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "vwall", ref, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "hb-filters", role: "tablist", "aria-label": "Filter member voices", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { role: "tab", "aria-selected": aud === "all", className: aud === "all" ? "on" : "", onClick: () => setAud("all"), children: [
        "Everyone ",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("em", { children: all.length })
      ] }),
      AUDIENCES.map((a) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { role: "tab", "aria-selected": aud === a.id, className: aud === a.id ? "on" : "", style: { "--c": a.color }, onClick: () => setAud(a.id), children: [
        a.label,
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("em", { children: all.filter((t) => t.audience === a.id).length })
      ] }, a.id))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "vw-grid2", children: [
      cur && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("figure", { className: "vw-spot", style: { "--c": audColor(cur.audience) }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "vs-glow", "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "vs-tag", children: [
          audLabel(cur.audience),
          cur.member && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("em", { children: "New review" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "vs-quote", viewBox: "0 0 40 32", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M0 32V18C0 8 6 1 16 0l2 5c-6 2-9 6-9 12h8v15zm22 0V18c0-10 6-17 16-18l2 5c-6 2-9 6-9 12h8v15z" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("blockquote", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: cur.quote }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Stars, { value: cur.rating, size: 20, className: "vs-stars" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("figcaption", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "vs-av", children: initials(cur.name) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "vs-who", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("b", { children: cur.name }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("small", { children: [
              cur.role,
              cur.company ? `, ${cur.company}` : ""
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "vs-place", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Flag, { code: cur.cc, name: cur.country, size: 30 }),
            cur.country
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "vs-nav", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { onClick: () => {
            held.current = true;
            setPick((pick - 1 + list.length) % list.length);
          }, "aria-label": "Previous review", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "arrowLeft", size: 18 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
            pick + 1,
            " of ",
            list.length
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { onClick: () => {
            held.current = true;
            setPick((pick + 1) % list.length);
          }, "aria-label": "Next review", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "arrow", size: 18 }) })
        ] })
      ] }, (cur.id || cur.name) + aud),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "vw-cols", "aria-label": "More member reviews", children: cols.map((col, c) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LiveZone, { className: `vw-col ${c % 2 ? "down" : "up"}`, style: { "--dur": `${Math.max(col.length, 3) * 7}s` }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "vw-track", children: [...col, ...col].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { "aria-hidden": i >= col.length || void 0, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(MiniCard, { t, active: t === cur, onPick: () => choose(t) }) }, i)) }) }, c)) })
    ] })
  ] });
}
function ChatFaq({ items }) {
  const [i, setI] = (0, import_react4.useState)(0);
  const [typing, setTyping] = (0, import_react4.useState)(false);
  const ask = (k) => {
    if (k === i) return;
    setI(k);
    setTyping(true);
    setTimeout(() => setTyping(false), 750);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "cfaq", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("ul", { className: "cf-qs", children: items.map((q, k) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: k === i ? "on" : "", onClick: () => ask(k), "aria-pressed": k === i, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "chat", size: 15 }),
      q.q
    ] }) }, q.q)) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "cf-window", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "cf-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "cf-av", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Persona, { kind: "nurse", skin: 4, hair: 1, hairStyle: 1, size: 38 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("b", { children: "MyHealthOpinions help desk" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("small", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { className: "dot" }),
            " usually replies in minutes"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "cf-body", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "cf-msg me", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: items[i].q }) }, "q" + i),
        typing ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "cf-msg bot typing", "aria-label": "Typing", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", {}),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", {}),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", {})
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "cf-msg bot", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: items[i].a }) }, "a" + i)
      ] })
    ] })
  ] });
}

// src/components/HomeV4.jsx
init_define_import_meta_env();
var import_react5 = __toESM(require_react(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function useAutoCycle(n, ms, ref, inView) {
  const [i, setI] = (0, import_react5.useState)(0);
  const touched = (0, import_react5.useRef)(false);
  (0, import_react5.useEffect)(() => {
    if (!inView || reduced()) return;
    const t = setInterval(() => {
      if (!touched.current && !document.hidden) setI((x) => (x + 1) % n);
    }, ms);
    return () => clearInterval(t);
  }, [inView, n, ms]);
  const pick = (k) => {
    touched.current = true;
    setI(k);
  };
  return [i, pick];
}
var N2 = THERAPY_AREAS.length;
var SEG = 360 / N2;
var rad = (d) => d * Math.PI / 180;
var pt = (r, a) => [+(r * Math.cos(rad(a))).toFixed(2), +(r * Math.sin(rad(a))).toFixed(2)];
function arc(i, R = 188, r = 122, gap = 0.9) {
  const a0 = -90 - SEG / 2 + i * SEG + gap;
  const a1 = a0 + SEG - gap * 2;
  const [x0, y0] = pt(R, a0), [x1, y1] = pt(R, a1), [x2, y2] = pt(r, a1), [x3, y3] = pt(r, a0);
  return `M${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${r} ${r} 0 0 0 ${x3} ${y3}Z`;
}
function DiseaseAtlas() {
  const [ref, inView] = useInView({ threshold: 0.25 }, false);
  const [i, pick] = useAutoCycle(N2, 3400, ref, inView);
  const [rot, setRot] = (0, import_react5.useState)(0);
  const prev = (0, import_react5.useRef)(0);
  (0, import_react5.useEffect)(() => {
    let d = (i - prev.current) % N2;
    if (d > N2 / 2) d -= N2;
    if (d < -N2 / 2) d += N2;
    setRot((r) => r - d * SEG);
    prev.current = i;
  }, [i]);
  const a = THERAPY_AREAS[i];
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "atlas", ref, style: { "--ac": a.color }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(LiveZone, { className: "atlas-wheel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { viewBox: "-200 -200 400 400", className: "aw-svg", role: "group", "aria-label": "Therapy areas", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { r: "197", className: "aw-dash" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { className: "aw-rot", style: { transform: `rotate(${rot}deg)`, "--w": `${rot}deg` }, children: THERAPY_AREAS.map((x, k) => {
          const mid = -90 + k * SEG;
          const [ox, oy] = pt(9, mid);
          const [ix, iy] = pt(155, mid);
          return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { className: `aw-seg ${k === i ? "on" : ""}`, style: { "--c": x.color, transform: k === i ? `translate(${ox}px, ${oy}px)` : "none" }, onClick: () => pick(k), children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: arc(k) }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { transform: `translate(${ix - 11} ${iy - 11})`, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { className: "aw-ic", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: x.icon, size: 22, stroke: 2.2 }) }) })
          ] }, x.id);
        }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { r: "114", className: "aw-core" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { r: "114", className: "aw-pulse" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "aw-center", "aria-live": "polite", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "awc-ic", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: a.icon, size: 30 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: a.area }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("small", { children: [
          a.items.length,
          " conditions"
        ] })
      ] }, a.id),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "aw-pointer", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "atlas-side", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "as-total", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("b", { children: [
          CONDITION_COUNT,
          "+"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
          "conditions across",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {}),
          N2,
          " therapy areas"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "as-tabs", role: "tablist", "aria-label": "Choose a therapy area", children: THERAPY_AREAS.map((x, k) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { role: "tab", "aria-selected": k === i, className: k === i ? "on" : "", style: { "--c": x.color }, onClick: () => pick(k), title: x.area, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: x.icon, size: 15 }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "sr-only", children: x.area })
      ] }, x.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "as-panel", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("h3", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: a.icon, size: 18 }),
          " ",
          a.area
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ul", { className: "as-chips", children: a.items.map((c, k) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("li", { style: { "--i": k }, children: c }, c)) })
      ] }, a.id),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "as-links", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Link, { className: "text-link", to: "/patients", children: [
          "Patients: what we study ",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "arrow", size: 14 })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Link, { className: "text-link", to: "/healthcare-professionals", children: [
          "Specialists we recruit ",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "arrow", size: 14 })
        ] })
      ] })
    ] })
  ] });
}
var ISO = (X, Y, Z) => [300 + (X - Y) * 0.866, 386 + (X + Y) * 0.5 - Z];
var iso = (arr) => arr.map(([x, y, z]) => ISO(x, y, z).map((n) => n.toFixed(1)).join(",")).join(" ");
var FH = 23;
var BW = 132;
var BD = 88;
function Slab({ z, f, on }) {
  const top = z + FH;
  const winL = Array.from({ length: 6 }, (_, k) => 8 + k * 20.5);
  const winR = [8, 26, 44];
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { className: `hl-floor ${on ? "on" : ""}`, style: { "--c": f.color }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hf-r", points: iso([[BW, 0, z], [BW, BD, z], [BW, BD, top], [BW, 0, top]]) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hf-l", points: iso([[0, BD, z], [BW, BD, z], [BW, BD, top], [0, BD, top]]) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hf-band", points: iso([[0, BD, top - 3], [BW, BD, top - 3], [BW, BD, top], [0, BD, top]]) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hf-band r", points: iso([[BW, 0, top - 3], [BW, BD, top - 3], [BW, BD, top], [BW, 0, top]]) }),
    winL.map((x, k) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hf-win", style: { "--k": k }, points: iso([[x, BD, z + 6], [x + 12, BD, z + 6], [x + 12, BD, z + 16], [x, BD, z + 16]]) }, "l" + k)),
    winR.map((y, k) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hf-win r", style: { "--k": k + 6 }, points: iso([[BW, y, z + 6], [BW, y + 12, z + 6], [BW, y + 12, z + 16], [BW, y, z + 16]]) }, "r" + k))
  ] });
}
function HospitalLift() {
  const stops = (0, import_react5.useMemo)(() => [...FLOORS, CAREGIVER_HOUSE], []);
  const [ref, inView] = useInView({ threshold: 0.25 }, false);
  const [i, pick] = useAutoCycle(stops.length, 3200, ref, inView);
  const cur = stops[i];
  const isHouse = cur.id === "caregivers";
  const liftZ = isHouse ? 0 : (cur.floor - 1) * FH;
  const H = FLOORS.length * FH;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "hlift", ref, style: { "--c": cur.color }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(LiveZone, { className: "hl-scene", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { viewBox: "40 60 520 460", className: "hl-svg", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("linearGradient", { id: "hl-glass", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("stop", { offset: "0", stopColor: "#c7d2fe", stopOpacity: ".5" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("stop", { offset: "1", stopColor: "#e0e7ff", stopOpacity: ".2" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hl-ground", points: iso([[-160, -60, 0], [220, -60, 0], [220, 240, 0], [-160, 240, 0]]) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hl-road", points: iso([[-160, 120, 0], [220, 120, 0], [220, 150, 0], [-160, 150, 0]]) }),
      [-140, -90, -40, 10, 60, 110, 160].map((x) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hl-lane", points: iso([[x, 134, 0], [x + 26, 134, 0], [x + 26, 136, 0], [x, 136, 0]]) }, x)),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { className: "hl-amb", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { fill: "#fff", points: iso([[0, 126, 0], [28, 126, 0], [28, 126, 14], [0, 126, 14]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { fill: "#f1f5f9", points: iso([[0, 126, 14], [28, 126, 14], [28, 140, 14], [0, 140, 14]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { fill: "#e2e8f0", points: iso([[28, 126, 0], [28, 140, 0], [28, 140, 14], [28, 126, 14]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { fill: "#ef2d56", points: iso([[0, 126, 6], [28, 126, 6], [28, 126, 9], [0, 126, 9]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hl-siren", points: iso([[10, 131, 14], [16, 131, 14], [16, 135, 18], [10, 135, 18]]) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { className: `hl-house ${isHouse ? "on" : ""}`, onClick: () => pick(stops.length - 1), children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hh-r", points: iso([[-120, 30, 0], [-120, 80, 0], [-120, 80, 34], [-120, 30, 34]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hh-l", points: iso([[-170, 80, 0], [-120, 80, 0], [-120, 80, 34], [-170, 80, 34]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hh-roof", points: iso([[-170, 80, 34], [-120, 80, 34], [-120, 55, 58], [-170, 55, 58]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hh-roof r", points: iso([[-120, 30, 34], [-120, 80, 34], [-120, 55, 58]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hh-door", points: iso([[-150, 80, 0], [-140, 80, 0], [-140, 80, 18], [-150, 80, 18]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hh-win", points: iso([[-132, 80, 14], [-124, 80, 14], [-124, 80, 24], [-132, 80, 24]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hh-win", points: iso([[-120, 42, 14], [-120, 52, 14], [-120, 52, 24], [-120, 42, 24]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { className: "hh-heart", transform: `translate(${ISO(-145, 55, 74).join(" ")})`, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M0 -3c-3-6-12-4-10 3 1 4 10 9 10 9s9-5 10-9c2-7-7-9-10-3z" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hl-shadow", points: iso([[0, 0, 0], [BW + 30, 0, 0], [BW + 30, BD + 20, 0], [0, BD + 20, 0]]) }),
      FLOORS.slice().reverse().map((f) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Slab, { f, z: (f.floor - 1) * FH, on: cur.id === f.id }, f.id)),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hl-roof", points: iso([[0, 0, H], [BW, 0, H], [BW, BD, H], [0, BD, H]]) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { className: "hl-sign", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { fill: "#ef2d56", points: iso([[52, 30, H], [80, 30, H], [80, 30, H + 34], [52, 30, H + 34]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { fill: "#fff", points: iso([[62, 30, H + 8], [70, 30, H + 8], [70, 30, H + 26], [62, 30, H + 26]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { fill: "#fff", points: iso([[56, 30, H + 13], [76, 30, H + 13], [76, 30, H + 21], [56, 30, H + 21]]) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hl-shaft", points: iso([[BW, 62, 0], [BW + 14, 62, 0], [BW + 14, 62, H + 6], [BW, 62, H + 6]]) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hl-shaft r", points: iso([[BW + 14, 62, 0], [BW + 14, 82, 0], [BW + 14, 82, H + 6], [BW + 14, 62, H + 6]]) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { className: "hl-car", style: { transform: `translateY(${-liftZ}px)` }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hc-f", points: iso([[BW + 14, 64, 2], [BW + 14, 80, 2], [BW + 14, 80, 20], [BW + 14, 64, 20]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("polygon", { className: "hc-s", points: iso([[BW + 2, 64, 20], [BW + 14, 64, 20], [BW + 14, 80, 20], [BW + 2, 80, 20]]) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { className: "hc-dot", cx: ISO(BW + 14, 72, 11)[0], cy: ISO(BW + 14, 72, 11)[1], r: "2.4" })
      ] }),
      FLOORS.map((f) => {
        const [x, y] = ISO(0, BD, (f.floor - 1) * FH + FH / 2);
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { className: `hl-pin ${cur.id === f.id ? "on" : ""}`, transform: `translate(${x - 26} ${y})`, style: { "--c": f.color }, onClick: () => pick(FLOORS.indexOf(f)), children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("rect", { x: "-16", y: "-9", width: "26", height: "18", rx: "6" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("text", { x: "-3", y: "4", textAnchor: "middle", children: f.floor })
        ] }, f.id);
      })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "hl-side", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "hl-panel", role: "group", "aria-label": "Lift buttons", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "hp-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "layers", size: 14 }),
          " Ride the lift"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "hp-btns", children: [
          FLOORS.map((f, k) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: cur.id === f.id ? "on" : "", style: { "--c": f.color }, onClick: () => pick(k), "aria-pressed": cur.id === f.id, "aria-label": `Floor ${f.floor}: ${f.label}`, children: f.floor }, f.id)),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: `hp-home ${isHouse ? "on" : ""}`, style: { "--c": CAREGIVER_HOUSE.color }, onClick: () => pick(stops.length - 1), "aria-pressed": isHouse, "aria-label": "Next door: caregivers at home", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "home", size: 15 }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "hp-display", "aria-live": "polite", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { children: isHouse ? "\u2302" : cur.floor }),
          isHouse ? "Next door" : `Floor ${cur.floor}`
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("article", { className: "hl-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "hcard-ic", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: cur.icon, size: 22 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { children: cur.label }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "hcard-meta", children: isHouse ? `${cur.roles.length} caregiver profiles` : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
          cur.titles,
          " job titles",
          cur.extra ? ` \xB7 ${cur.extra}` : ""
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("ul", { className: "hcard-roles", children: [
          (cur.core || []).map((r, k) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("li", { className: "core", style: { "--i": k }, children: r }, r)),
          cur.roles.map((r, k) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("li", { style: { "--i": k + (cur.core?.length || 0) }, children: r }, r))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Link, { className: "text-link", to: isHouse ? "/caregivers" : `/healthcare-professionals#${cur.id}`, children: [
          isHouse ? "Everything for caregivers" : "Every role on this floor",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "arrow", size: 14 })
        ] })
      ] }, cur.id)
    ] })
  ] });
}
function MetroSteps() {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(LiveZone, { className: "metro", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mt-line", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "mt-track", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "mt-train", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "mtt-win" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "mtt-win" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "mtt-logo", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "heart", size: 12, fill: "currentColor", stroke: 1 }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "mt-coin", children: "$" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ol", { className: "mt-stations", children: STEPS.map((s, k) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { style: { "--c": s.color, "--k": k }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "mt-stop", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: s.icon, size: 18 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "mt-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("small", { children: [
          "Station ",
          k + 1
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: s.title }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: s.text })
      ] })
    ] }, s.title)) })
  ] });
}
var GLYPHS = "\u2588\u2593\u2592\u2591#%&@$*+=?<>/\\";
var FIELDS = [["user", "Name", "Your name"], ["mail", "Email", "you@email.com"], ["phone", "Phone", "+00 00000 00000"], ["pin", "City", "Your city"]];
function useScramble(active) {
  const [phase, setPhase] = (0, import_react5.useState)(0);
  const [tick, setTick] = (0, import_react5.useState)(0);
  (0, import_react5.useEffect)(() => {
    if (!active || reduced()) return;
    let t;
    const run = (p) => {
      setPhase(p);
      t = setTimeout(() => run((p + 1) % 3), p === 1 ? 1800 : 2600);
    };
    run(0);
    return () => clearTimeout(t);
  }, [active]);
  (0, import_react5.useEffect)(() => {
    if (phase !== 1) return;
    const t = setInterval(() => setTick((x) => x + 1), 70);
    return () => clearInterval(t);
  }, [phase]);
  return [phase, tick];
}
var scramble = (s, tick) => s.split("").map((ch, i) => ch === " " ? " " : GLYPHS[(i * 7 + tick * 3) % GLYPHS.length]).join("");
function Anonymiser() {
  const [ref, inView] = useInView({ threshold: 0.3 }, false);
  const [phase, tick] = useScramble(inView);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "anon", ref, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(LiveZone, { className: `anon-scene ph-${phase}`, "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "an-card an-in", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "an-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "user", size: 15 }),
          " Your profile"
        ] }),
        FIELDS.map(([ic, k, v]) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "an-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: ic, size: 14 }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("em", { children: k }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("code", { children: phase === 0 ? v : phase === 1 ? scramble(v, tick) : "\u2022".repeat(Math.min(v.length, 12)) })
        ] }, k)),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "an-row ok", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "clipboard", size: 14 }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("em", { children: "Answers" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("code", { children: "Q1 \xB7 Q2 \xB7 Q3 \u2026" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "an-machine", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "am-gear g1" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "am-gear g2" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "am-core", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "lock", size: 26 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "am-beam" }),
        Array.from({ length: 6 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { className: "am-bit", style: { "--k": k } }, k)),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "am-lbl", children: "Anonymiser" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "an-card an-out", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "an-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "chart", size: 15 }),
          " What researchers get"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "an-id", children: [
          "Respondent ",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: "#R-48213" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { viewBox: "0 0 120 120", className: "an-donut", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: "60", cy: "60", r: "44", className: "d-bg" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: "60", cy: "60", r: "44", className: "d-a", pathLength: "100" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: "60", cy: "60", r: "44", className: "d-b", pathLength: "100" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("text", { x: "60", y: "58", textAnchor: "middle", children: "2,140" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("text", { x: "60", y: "74", textAnchor: "middle", className: "d-sm", children: "answers" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "an-legend", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { className: "la" }),
          "62% better ",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("i", { className: "lb" }),
          "28% same"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("small", { children: "Combined results only \xB7 no names" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ul", { className: "anon-promises", children: [
      ["lock", "Never sold", "Your personal information is not for sale, to anyone.", "#00a88a"],
      ["users", "Combined answers only", "Researchers see totals, never your name or email.", "#2457f5"],
      ["shieldCheck", "Certified security", "ISO 27001 information security and ISO 20252 research standards.", "#7c3aed"],
      ["x", "Leave any time", "Delete your account from your profile in two clicks.", "#ef2d56"]
    ].map(([ic, t, d, c], k) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { style: { "--c": c, "--k": k }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ap-ic", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: ic, size: 18 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("b", { children: t }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("small", { children: d })
    ] }, t)) })
  ] });
}

// src/components/SurveyInbox.jsx
init_define_import_meta_env();
var import_react6 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var BAND = Object.fromEntries(RATE_BANDS.map((b) => [b.id, b]));
var reduced2 = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function CountTo({ to, run, delay = 0 }) {
  const [v, setV] = (0, import_react6.useState)(run ? 0 : to);
  (0, import_react6.useEffect)(() => {
    if (!run) return void 0;
    if (reduced2()) {
      setV(to);
      return void 0;
    }
    let raf;
    const t0 = performance.now() + delay;
    const step = (now) => {
      const p = Math.min(Math.max((now - t0) / 1100, 0), 1);
      setV(Math.round(to * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, run, delay]);
  return v;
}
function RateRail({ active, onPick }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { ref, className: `rrail ${inView ? "is-in" : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "rr-ruler", "aria-hidden": "true", children: Array.from({ length: RATE_MAX / 5 + 1 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { style: { left: `${i * 5 / RATE_MAX * 100}%` }, className: i % 2 ? "mn" : "", children: i % 2 ? "" : `$${i * 5}` }, i)) }),
    RATE_BANDS.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "button",
      {
        type: "button",
        className: `rr-lane ${active === b.id ? "on" : ""}`,
        style: { "--c": b.color, "--c2": b.accent, "--lf": b.min / RATE_MAX, "--wf": (b.max - b.min) / RATE_MAX, "--i": i },
        onClick: () => onPick(active === b.id ? "all" : b.id),
        "aria-pressed": active === b.id,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "rr-who", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "rr-ic", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: b.icon, size: 18 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("b", { children: b.label }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("small", { children: b.note })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "rr-track", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "rr-bar", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "rr-glint" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "rr-stack", "aria-hidden": "true", children: Array.from({ length: 3 + i * 2 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("i", { style: { "--k": k } }, k)) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "rr-tag", children: [
              "$",
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CountTo, { to: b.min, run: inView, delay: i * 180 }),
              "\u2013$",
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CountTo, { to: b.max, run: inView, delay: i * 180 + 120 }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("small", { children: "per survey" })
            ] })
          ] })
        ]
      },
      b.id
    ))
  ] });
}
function Envelope({ s, idx, open, setOpen, arriving }) {
  const b = BAND[s.band];
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { className: `ivl ${open ? "open" : ""} ${arriving ? "arrive" : ""}`, style: { "--c": b.color, "--c2": b.accent, "--i": idx % 8 }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "button",
    {
      type: "button",
      className: "iv-btn",
      "aria-expanded": open,
      onClick: () => setOpen(open ? null : s.title),
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "iv-3d", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "iv-back", "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "iv-letter", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "el-aud", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: b.icon, size: 12 }),
            s.aud
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("b", { className: "el-title", children: s.title }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "el-text", children: s.text }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "el-meta", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "clock", size: 13 }),
              s.mins,
              " min"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "el-pay", children: [
              "Reward ",
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("em", { children: [
                "$",
                s.reward
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "iv-pocket", "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "iv-front", "aria-hidden": "true", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "ef-to", children: [
            "To: ",
            s.aud
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "ef-title", children: s.title }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "ef-lines", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("i", {}),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("i", {})
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "iv-flap", "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "iv-seal", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("b", { children: [
          "$",
          s.reward
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "iv-stamp", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: s.icon, size: 18 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "iv-post", "aria-hidden": "true", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("b", { children: s.mins }),
          "MIN"
        ] }),
        arriving && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "iv-new", "aria-hidden": "true", children: "New invite" })
      ] })
    }
  ) });
}
function SurveyInbox() {
  const [band, setBand] = (0, import_react6.useState)("all");
  const [all, setAll] = (0, import_react6.useState)(false);
  const [open, setOpen] = (0, import_react6.useState)(null);
  const [arrive, setArrive] = (0, import_react6.useState)(null);
  const [ref, inView] = useInView({ threshold: 0.15 }, false);
  const userAt = (0, import_react6.useRef)(0);
  const list = (0, import_react6.useMemo)(() => SAMPLE_SURVEYS.filter((s) => band === "all" || s.band === band), [band]);
  const shown = all || band !== "all" ? list : list.slice(0, 8);
  const counts = (0, import_react6.useMemo)(() => Object.fromEntries(RATE_BANDS.map((b) => [b.id, SAMPLE_SURVEYS.filter((s) => s.band === b.id).length])), []);
  (0, import_react6.useEffect)(() => {
    if (!inView || reduced2()) return void 0;
    let k = 0;
    const t = setInterval(() => {
      if (document.hidden || Date.now() - userAt.current < 8e3) return;
      const pick = shown[(k * 3 + 1) % shown.length];
      k += 1;
      setArrive(pick.title);
      setOpen(pick.title);
      setTimeout(() => {
        setArrive(null);
        setOpen((o) => o === pick.title ? null : o);
      }, 2600);
    }, 4200);
    return () => clearInterval(t);
  }, [inView, shown]);
  const userOpen = (v) => {
    userAt.current = Date.now();
    setArrive(null);
    setOpen(v);
  };
  const pickBand = (v) => {
    userAt.current = Date.now();
    setBand(v);
    setOpen(null);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { ref, className: "sinbox", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(RateRail, { active: band, onPick: pickBand }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "si-tabs", role: "tablist", "aria-label": "Filter surveys by audience", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { role: "tab", "aria-selected": band === "all", className: band === "all" ? "on" : "", onClick: () => pickBand("all"), children: [
        "All surveys ",
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("em", { children: SAMPLE_SURVEYS.length })
      ] }),
      RATE_BANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { role: "tab", "aria-selected": band === b.id, className: band === b.id ? "on" : "", style: { "--c": b.color }, onClick: () => pickBand(b.id), children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: b.icon, size: 14 }),
        b.label,
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("em", { children: counts[b.id] })
      ] }, b.id))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("ul", { className: "si-grid", children: shown.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Envelope, { s, idx: i, open: open === s.title, setOpen: userOpen, arriving: arrive === s.title }, s.title)) }, band),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "si-foot", children: [
      band === "all" && !all && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { type: "button", className: "btn btn-ghost", onClick: () => setAll(true), children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "btn-label", children: [
          "Open all ",
          SAMPLE_SURVEYS.length,
          " invitations"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "mail", size: 18 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Link, { className: "btn btn-primary", to: band === "all" ? "/join" : `/join#${band}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "btn-label", children: "Get invitations like these" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "arrow", size: 18 })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "si-note", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "info", size: 14 }),
      " Sample studies. Every invitation shows its exact reward, topic and time before you start."
    ] })
  ] });
}

// src/pages/Home.jsx
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
function Home() {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(RoleHero, {}),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(TopicTicker, {}),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(CommunityPulse, {}),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { className: "section s-slot", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        SectionHead,
        {
          eyebrow: "Rewards",
          title: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
            "Get rewarded ",
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "ink-grad", children: "your way" })
          ] }),
          lead: "Cash, vouchers, gift cards or a personal health report. Pull the lever and see what the paid surveys you complete can turn into.",
          color: "#ff6a2c"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(RewardSlot, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { className: "section surveys-belt s-inbox", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SectionHead, { eyebrow: "Online surveys for money", title: "Browse a few of our paid surveys", lead: "The kind of studies landing in members\u2019 inboxes right now: patients earn $15\u2013$20, caregivers $15\u2013$25 and doctors & specialists $20\u2013$50 per survey. Every invitation tells you the topic, the time it takes and the reward before you click a thing.", color: "#f97316" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SurveyInbox, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { className: "section s-metro", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SectionHead, { eyebrow: "Get paid for surveys in four steps", title: "Four stops to your first payout", lead: "No investment, no selling, no gimmicks. Hop on, tell us about yourself once, answer the surveys that fit, and collect at the last stop.", color: "#00a88a" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(MetroSteps, {}),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "center-cta", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Button, { to: "/how-it-works", variant: "ghost", children: "See the full journey" }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { className: "section s-hub", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SectionHead, { eyebrow: "Survey invitations", title: "Never miss a survey that fits you", lead: "Pick the channel you actually check. New studies find their way to your phone the moment they open.", color: "#7c3aed" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChannelHub, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { className: "section s-lift", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SectionHead, { eyebrow: "Healthcare community", title: "Professionals we work with, floor by floor", lead: "From the boardroom to the ambulance bay: more than 1,300 job titles across every department of a hospital, plus the caregivers next door. Press a lift button to visit a floor.", color: "#2457f5" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(HospitalLift, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { className: "section s-atlas", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SectionHead, { eyebrow: "Areas of expertise", title: "Every condition we research, head to toe", lead: "Twenty therapy areas and nearly two hundred conditions, from asthma to rare genetic disorders. Spin the wheel or tap an area to see who we listen to.", color: "#ec4899" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(DiseaseAtlas, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { className: "section s-voices", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SectionHead, { eyebrow: "Member voices", title: "What our community is saying", lead: "Doctors, nurses, allied health professionals, caregivers and patients from more than 20 countries. Tap any card in the columns to bring it into the spotlight.", color: "#ec4899" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(VoiceWall, {}),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "center-cta", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Button, { to: "/reviews", variant: "ghost", icon: "star", children: "All reviews and rate us" }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { className: "section countries-sec", id: "countries", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SectionHead, { eyebrow: "Global community", title: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
        "Paid online surveys in ",
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "ink-grad", children: [
          COVERAGE_COUNT,
          " countries"
        ] })
      ] }), lead: "A spinning globe of every flag we cover. Tap a region and its countries step forward.", color: "#00a88a" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(FlagGlobe, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { className: "section s-vault", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SectionHead, { eyebrow: "Your details are safe with us", title: "Your name goes in. A code comes out.", lead: "We don\u2019t share your personal details with anyone. Watch them scramble: researchers only ever see a respondent code and combined charts, and 18 quality and security checks keep bots out.", color: "#00a88a" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Anonymiser, {}),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "center-cta", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Button, { to: "/trust-safety", variant: "ghost", children: "See all 18 quality checks" }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(TopicHub, {}),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { className: "section s-faq", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SectionHead, { eyebrow: "Quick answers", title: "Questions before you join?", lead: "Tap a question and our help desk answers. For everything else, the full FAQ has you covered.", color: "#ff6a2c" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChatFaq, { items: HOME_FAQ }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "center-cta", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Button, { to: "/faq", variant: "ghost", children: "All FAQs" }) })
    ] }) })
  ] });
}
export {
  Home as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL0hvbWUuanN4IiwgIi4uLy4uL3NyYy9jb21wb25lbnRzL1JvbGVIZXJvLmpzeCIsICIuLi8uLi9zcmMvY29tcG9uZW50cy9Ib21lU2VjdGlvbnMuanN4IiwgIi4uLy4uL3NyYy9jb21wb25lbnRzL0NvdW50ZXIuanN4IiwgIi4uLy4uL3NyYy9jb21wb25lbnRzL0hvbWVWMy5qc3giLCAiLi4vLi4vc3JjL2NvbXBvbmVudHMvSG9tZVY0LmpzeCIsICIuLi8uLi9zcmMvY29tcG9uZW50cy9TdXJ2ZXlJbmJveC5qc3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEhvbWUgXHUyMDE0IHByaW1hcnkga2V5d29yZDogXCJwYWlkIHN1cnZleXNcIi4gU2Vjb25kYXJ5OiBzdXJ2ZXlzIGZvciBtb25leSwgb25saW5lIHN1cnZleXMgZm9yIG1vbmV5LFxuLy8gZ2V0IHBhaWQgZm9yIHN1cnZleXMsIHBhaWQgc3VydmV5IHNpdGVzLCBzdXJ2ZXlzIHRoYXQgcGF5IG1vbmV5LCBlYXJuIG1vbmV5IG9ubGluZSB3aXRob3V0IGludmVzdG1lbnQuXG5pbXBvcnQgUm9sZUhlcm8gZnJvbSAnLi4vY29tcG9uZW50cy9Sb2xlSGVyby5qc3gnO1xuaW1wb3J0IHsgU2VjdGlvbkhlYWQsIEJ1dHRvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkuanN4JztcbmltcG9ydCB7IENvbW11bml0eVB1bHNlLCBGbGFnR2xvYmUgfSBmcm9tICcuLi9jb21wb25lbnRzL0hvbWVTZWN0aW9ucy5qc3gnO1xuaW1wb3J0IHsgUmV3YXJkU2xvdCwgQ2hhbm5lbEh1YiwgVm9pY2VXYWxsLCBDaGF0RmFxIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ib21lVjMuanN4JztcbmltcG9ydCB7IERpc2Vhc2VBdGxhcywgSG9zcGl0YWxMaWZ0LCBNZXRyb1N0ZXBzLCBBbm9ueW1pc2VyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ib21lVjQuanN4JztcbmltcG9ydCBUb3BpY0h1YiwgeyBUb3BpY1RpY2tlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvVG9waWNIdWIuanN4JztcbmltcG9ydCBTdXJ2ZXlJbmJveCBmcm9tICcuLi9jb21wb25lbnRzL1N1cnZleUluYm94LmpzeCc7XG5pbXBvcnQgeyBIT01FX0ZBUSB9IGZyb20gJy4uL2RhdGEvZmFxcy5qcyc7XG5pbXBvcnQgeyBDT1ZFUkFHRV9DT1VOVCB9IGZyb20gJy4uL2RhdGEvY291bnRyaWVzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFJvbGVIZXJvIC8+XG4gICAgICA8VG9waWNUaWNrZXIgLz5cblxuICAgICAgPENvbW11bml0eVB1bHNlIC8+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gcy1zbG90XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPFNlY3Rpb25IZWFkXG4gICAgICAgICAgICBleWVicm93PVwiUmV3YXJkc1wiXG4gICAgICAgICAgICB0aXRsZT17PD5HZXQgcmV3YXJkZWQgPHNwYW4gY2xhc3NOYW1lPVwiaW5rLWdyYWRcIj55b3VyIHdheTwvc3Bhbj48Lz59XG4gICAgICAgICAgICBsZWFkPVwiQ2FzaCwgdm91Y2hlcnMsIGdpZnQgY2FyZHMgb3IgYSBwZXJzb25hbCBoZWFsdGggcmVwb3J0LiBQdWxsIHRoZSBsZXZlciBhbmQgc2VlIHdoYXQgdGhlIHBhaWQgc3VydmV5cyB5b3UgY29tcGxldGUgY2FuIHR1cm4gaW50by5cIlxuICAgICAgICAgICAgY29sb3I9XCIjZmY2YTJjXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxSZXdhcmRTbG90IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIHN1cnZleXMtYmVsdCBzLWluYm94XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPFNlY3Rpb25IZWFkIGV5ZWJyb3c9XCJPbmxpbmUgc3VydmV5cyBmb3IgbW9uZXlcIiB0aXRsZT1cIkJyb3dzZSBhIGZldyBvZiBvdXIgcGFpZCBzdXJ2ZXlzXCIgbGVhZD1cIlRoZSBraW5kIG9mIHN0dWRpZXMgbGFuZGluZyBpbiBtZW1iZXJzXHUyMDE5IGluYm94ZXMgcmlnaHQgbm93OiBwYXRpZW50cyBlYXJuICQxNVx1MjAxMyQyMCwgY2FyZWdpdmVycyAkMTVcdTIwMTMkMjUgYW5kIGRvY3RvcnMgJiBzcGVjaWFsaXN0cyAkMjBcdTIwMTMkNTAgcGVyIHN1cnZleS4gRXZlcnkgaW52aXRhdGlvbiB0ZWxscyB5b3UgdGhlIHRvcGljLCB0aGUgdGltZSBpdCB0YWtlcyBhbmQgdGhlIHJld2FyZCBiZWZvcmUgeW91IGNsaWNrIGEgdGhpbmcuXCIgY29sb3I9XCIjZjk3MzE2XCIgLz5cbiAgICAgICAgICA8U3VydmV5SW5ib3ggLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gcy1tZXRyb1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxTZWN0aW9uSGVhZCBleWVicm93PVwiR2V0IHBhaWQgZm9yIHN1cnZleXMgaW4gZm91ciBzdGVwc1wiIHRpdGxlPVwiRm91ciBzdG9wcyB0byB5b3VyIGZpcnN0IHBheW91dFwiIGxlYWQ9XCJObyBpbnZlc3RtZW50LCBubyBzZWxsaW5nLCBubyBnaW1taWNrcy4gSG9wIG9uLCB0ZWxsIHVzIGFib3V0IHlvdXJzZWxmIG9uY2UsIGFuc3dlciB0aGUgc3VydmV5cyB0aGF0IGZpdCwgYW5kIGNvbGxlY3QgYXQgdGhlIGxhc3Qgc3RvcC5cIiBjb2xvcj1cIiMwMGE4OGFcIiAvPlxuICAgICAgICAgIDxNZXRyb1N0ZXBzIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXItY3RhXCI+PEJ1dHRvbiB0bz1cIi9ob3ctaXQtd29ya3NcIiB2YXJpYW50PVwiZ2hvc3RcIj5TZWUgdGhlIGZ1bGwgam91cm5leTwvQnV0dG9uPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBzLWh1YlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxTZWN0aW9uSGVhZCBleWVicm93PVwiU3VydmV5IGludml0YXRpb25zXCIgdGl0bGU9XCJOZXZlciBtaXNzIGEgc3VydmV5IHRoYXQgZml0cyB5b3VcIiBsZWFkPVwiUGljayB0aGUgY2hhbm5lbCB5b3UgYWN0dWFsbHkgY2hlY2suIE5ldyBzdHVkaWVzIGZpbmQgdGhlaXIgd2F5IHRvIHlvdXIgcGhvbmUgdGhlIG1vbWVudCB0aGV5IG9wZW4uXCIgY29sb3I9XCIjN2MzYWVkXCIgLz5cbiAgICAgICAgICA8Q2hhbm5lbEh1YiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBzLWxpZnRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIkhlYWx0aGNhcmUgY29tbXVuaXR5XCIgdGl0bGU9XCJQcm9mZXNzaW9uYWxzIHdlIHdvcmsgd2l0aCwgZmxvb3IgYnkgZmxvb3JcIiBsZWFkPVwiRnJvbSB0aGUgYm9hcmRyb29tIHRvIHRoZSBhbWJ1bGFuY2UgYmF5OiBtb3JlIHRoYW4gMSwzMDAgam9iIHRpdGxlcyBhY3Jvc3MgZXZlcnkgZGVwYXJ0bWVudCBvZiBhIGhvc3BpdGFsLCBwbHVzIHRoZSBjYXJlZ2l2ZXJzIG5leHQgZG9vci4gUHJlc3MgYSBsaWZ0IGJ1dHRvbiB0byB2aXNpdCBhIGZsb29yLlwiIGNvbG9yPVwiIzI0NTdmNVwiIC8+XG4gICAgICAgICAgPEhvc3BpdGFsTGlmdCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBzLWF0bGFzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPFNlY3Rpb25IZWFkIGV5ZWJyb3c9XCJBcmVhcyBvZiBleHBlcnRpc2VcIiB0aXRsZT1cIkV2ZXJ5IGNvbmRpdGlvbiB3ZSByZXNlYXJjaCwgaGVhZCB0byB0b2VcIiBsZWFkPVwiVHdlbnR5IHRoZXJhcHkgYXJlYXMgYW5kIG5lYXJseSB0d28gaHVuZHJlZCBjb25kaXRpb25zLCBmcm9tIGFzdGhtYSB0byByYXJlIGdlbmV0aWMgZGlzb3JkZXJzLiBTcGluIHRoZSB3aGVlbCBvciB0YXAgYW4gYXJlYSB0byBzZWUgd2hvIHdlIGxpc3RlbiB0by5cIiBjb2xvcj1cIiNlYzQ4OTlcIiAvPlxuICAgICAgICAgIDxEaXNlYXNlQXRsYXMgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gcy12b2ljZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIk1lbWJlciB2b2ljZXNcIiB0aXRsZT1cIldoYXQgb3VyIGNvbW11bml0eSBpcyBzYXlpbmdcIiBsZWFkPVwiRG9jdG9ycywgbnVyc2VzLCBhbGxpZWQgaGVhbHRoIHByb2Zlc3Npb25hbHMsIGNhcmVnaXZlcnMgYW5kIHBhdGllbnRzIGZyb20gbW9yZSB0aGFuIDIwIGNvdW50cmllcy4gVGFwIGFueSBjYXJkIGluIHRoZSBjb2x1bW5zIHRvIGJyaW5nIGl0IGludG8gdGhlIHNwb3RsaWdodC5cIiBjb2xvcj1cIiNlYzQ4OTlcIiAvPlxuICAgICAgICAgIDxWb2ljZVdhbGwgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlci1jdGFcIj48QnV0dG9uIHRvPVwiL3Jldmlld3NcIiB2YXJpYW50PVwiZ2hvc3RcIiBpY29uPVwic3RhclwiPkFsbCByZXZpZXdzIGFuZCByYXRlIHVzPC9CdXR0b24+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIGNvdW50cmllcy1zZWNcIiBpZD1cImNvdW50cmllc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxTZWN0aW9uSGVhZCBleWVicm93PVwiR2xvYmFsIGNvbW11bml0eVwiIHRpdGxlPXs8PlBhaWQgb25saW5lIHN1cnZleXMgaW4gPHNwYW4gY2xhc3NOYW1lPVwiaW5rLWdyYWRcIj57Q09WRVJBR0VfQ09VTlR9IGNvdW50cmllczwvc3Bhbj48Lz59IGxlYWQ9XCJBIHNwaW5uaW5nIGdsb2JlIG9mIGV2ZXJ5IGZsYWcgd2UgY292ZXIuIFRhcCBhIHJlZ2lvbiBhbmQgaXRzIGNvdW50cmllcyBzdGVwIGZvcndhcmQuXCIgY29sb3I9XCIjMDBhODhhXCIgLz5cbiAgICAgICAgICA8RmxhZ0dsb2JlIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIHMtdmF1bHRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIllvdXIgZGV0YWlscyBhcmUgc2FmZSB3aXRoIHVzXCIgdGl0bGU9XCJZb3VyIG5hbWUgZ29lcyBpbi4gQSBjb2RlIGNvbWVzIG91dC5cIiBsZWFkPVwiV2UgZG9uXHUyMDE5dCBzaGFyZSB5b3VyIHBlcnNvbmFsIGRldGFpbHMgd2l0aCBhbnlvbmUuIFdhdGNoIHRoZW0gc2NyYW1ibGU6IHJlc2VhcmNoZXJzIG9ubHkgZXZlciBzZWUgYSByZXNwb25kZW50IGNvZGUgYW5kIGNvbWJpbmVkIGNoYXJ0cywgYW5kIDE4IHF1YWxpdHkgYW5kIHNlY3VyaXR5IGNoZWNrcyBrZWVwIGJvdHMgb3V0LlwiIGNvbG9yPVwiIzAwYTg4YVwiIC8+XG4gICAgICAgICAgPEFub255bWlzZXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlci1jdGFcIj48QnV0dG9uIHRvPVwiL3RydXN0LXNhZmV0eVwiIHZhcmlhbnQ9XCJnaG9zdFwiPlNlZSBhbGwgMTggcXVhbGl0eSBjaGVja3M8L0J1dHRvbj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxUb3BpY0h1YiAvPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIHMtZmFxXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPFNlY3Rpb25IZWFkIGV5ZWJyb3c9XCJRdWljayBhbnN3ZXJzXCIgdGl0bGU9XCJRdWVzdGlvbnMgYmVmb3JlIHlvdSBqb2luP1wiIGxlYWQ9XCJUYXAgYSBxdWVzdGlvbiBhbmQgb3VyIGhlbHAgZGVzayBhbnN3ZXJzLiBGb3IgZXZlcnl0aGluZyBlbHNlLCB0aGUgZnVsbCBGQVEgaGFzIHlvdSBjb3ZlcmVkLlwiIGNvbG9yPVwiI2ZmNmEyY1wiIC8+XG4gICAgICAgICAgPENoYXRGYXEgaXRlbXM9e0hPTUVfRkFRfSAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyLWN0YVwiPjxCdXR0b24gdG89XCIvZmFxXCIgdmFyaWFudD1cImdob3N0XCI+QWxsIEZBUXM8L0J1dHRvbj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC8+XG4gICk7XG59XG4iLCAiLy8gSG9tZSBoZXJvIHdpdGggdGhyZWUgYXVkaWVuY2UgdGFicyAoSGVhbHRoY2FyZSBQcm9mZXNzaW9uYWwgXHUwMEI3IENhcmVnaXZlciBcdTAwQjcgUGF0aWVudCkuIEVhY2ggdGFiIGhhcyBpdHMgb3duXG4vLyBjb2xvdXIgZ3JhZGUsIG1vdHRvLCBoZWFkbGluZSwgY29weSBhbmQgYSAzRCBcIm1vbmV5XCIgc2NlbmU6XG4vLyAgIFByb2Zlc3Npb25hbCBcdTIxOTIgYSB2aXRhbC1zaWducyBtb25pdG9yIHdob3NlIGhlYXJ0YmVhdCBwb3BzIGNvaW5zIG9udG8gYSBncm93aW5nIGhvbm9yYXJpdW0gdG93ZXJcbi8vICAgQ2FyZWdpdmVyICAgIFx1MjE5MiBwYXBlci1wbGFuZSB2b3VjaGVycyBmbHkgaW50byBhIFwiY2FyZSBmdW5kXCIgamFyIHRoYXQgZmlsbHMgd2l0aCBjb2lucyBhbmQgaGVhcnRzXG4vLyAgIFBhdGllbnQgICAgICBcdTIxOTIgYSBzdXJ2ZXkgcmluZyBoaXRzIDEwMCUsIGEgM0QgZ2lmdCBib3ggYnVyc3RzIG9wZW4gd2l0aCBhIGdpZnQgY2FyZCBhbmQgYSBjb2luIGZvdW50YWluXG4vLyBUaGUgc2NlbmUgdGlsdHMgZ2VudGx5IHRvd2FyZHMgdGhlIHBvaW50ZXIuIFRhYnMgYXV0by1hZHZhbmNlIHVudGlsIHRoZSB2aXNpdG9yIHBpY2tzIG9uZS5cbi8vIFRoZSBwcmVyZW5kZXJlZCBIVE1MIGNvbnRhaW5zIHRoZSBmaXJzdCB0YWIsIHNvIHNlYXJjaCBlbmdpbmVzIGFsd2F5cyBzZWUgYSBjb21wbGV0ZSBoZXJvLlxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uLmpzeCc7XG5pbXBvcnQgUGVyc29uYSBmcm9tICcuL1BlcnNvbmEuanN4JztcbmltcG9ydCB7IEJ1dHRvbiwgTGl2ZVpvbmUgfSBmcm9tICcuL3VpLmpzeCc7XG5pbXBvcnQgeyBIZXJvVGl0bGUgfSBmcm9tICcuL1BhZ2VIZXJvLmpzeCc7XG5cbmV4cG9ydCBjb25zdCBST0xFUyA9IFtcbiAge1xuICAgIGlkOiAnaGNwJyxcbiAgICB0YWI6ICdIZWFsdGhjYXJlIFByb2Zlc3Npb25hbCcsXG4gICAgdGFiU3ViOiAnRG9jdG9ycywgbnVyc2VzICYgYWxsaWVkIGhlYWx0aCcsXG4gICAgaWNvbjogJ3N0ZXRob3Njb3BlJyxcbiAgICBwZXJzb25hOiBbJ2RvY3RvcicsIDIsIDAsIDBdLFxuICAgIG1vdHRvOiAnWW91ciBleHBlcnRpc2UsIHJld2FyZGVkJyxcbiAgICB0aXRsZTogWydQYWlkIHN1cnZleXMgdGhhdCcsIHsgdDogJ3Jlc3BlY3QgeW91ciBjbGluaWNhbCB0aW1lJywgaGw6ICdncmFkJyB9XSxcbiAgICBsZWFkOiAnRmlmdGVlbiBtaW51dGVzIGJldHdlZW4gY2xpbmljcyBpcyBlbm91Z2guIFRlbGwgcGhhcm1hLCBkZXZpY2UgYW5kIGhlYWx0aC10ZWNoIHRlYW1zIGhvdyBtZWRpY2luZSByZWFsbHkgd29ya3Mgb24gdGhlIHdhcmQsIGFuZCByZWNlaXZlIGFuIGhvbm9yYXJpdW0gZm9yIGV2ZXJ5IHN0dWR5IHlvdSBjb21wbGV0ZS4gVmVyaWZpZWQgcHJvZmVzc2lvbmFscyBvbmx5LCBzbyBldmVyeSBpbnZpdGF0aW9uIGlzIHdvcnRoIG9wZW5pbmcuJyxcbiAgICBiYWRnZXM6IFsnSG9ub3JhcmlhIGZvciBldmVyeSBjb21wbGV0ZWQgc3R1ZHknLCAnQ3JlZGVudGlhbC12ZXJpZmllZCBwYW5lbCcsICdGaXRzIGFyb3VuZCBzaGlmdHMnXSxcbiAgICBjdGE6ICdKb2luIGFzIGEgcHJvZmVzc2lvbmFsJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnY2FyZWdpdmVyJyxcbiAgICB0YWI6ICdDYXJlZ2l2ZXInLFxuICAgIHRhYlN1YjogJ0ZhbWlseSAmIGNhcmUgc3VwcG9ydCcsXG4gICAgaWNvbjogJ2hhbmRzJyxcbiAgICBwZXJzb25hOiBbJ2NhcmVnaXZlcicsIDEsIDMsIDFdLFxuICAgIG1vdHRvOiAnWW91IGNhcnJ5IHRoZSBjYXJlLiBXZSBjYXJyeSB5b3VyIHZvaWNlJyxcbiAgICB0aXRsZTogWydQYWlkIHN1cnZleXMgZm9yIHRoZSBwZW9wbGUgd2hvJywgeyB0OiAnaG9sZCBpdCBhbGwgdG9nZXRoZXInLCBobDogJ2dyYWQnIH1dLFxuICAgIGxlYWQ6ICdZb3Uga25vdyB3aGF0IHRoZSBicm9jaHVyZXMgbGVhdmUgb3V0OiB0aGUgbmlnaHQgY2hlY2tzLCB0aGUgcGhhcm1hY3kgcnVucywgdGhlIHdhaXRpbmcgcm9vbXMuIFNoYXJlIGl0IGluIHNob3J0IHN1cnZleXMgd2hlbmV2ZXIgaXQgc3VpdHMgeW91LCBhbmQgZWFybiBjYXNoLCBnaWZ0IGNhcmRzIG9yIGdyb2Nlcnkgdm91Y2hlcnMgZm9yIGV2ZXJ5IG9uZSB5b3UgZmluaXNoLicsXG4gICAgYmFkZ2VzOiBbJ1Nob3J0LCBmbGV4aWJsZSBzdXJ2ZXlzJywgJ0Nhc2gsIGdyb2NlcnkgJiB3ZWxsbmVzcyByZXdhcmRzJywgJ1NlbnNpdGl2ZSBxdWVzdGlvbnMgb3B0aW9uYWwnXSxcbiAgICBjdGE6ICdKb2luIGFzIGEgY2FyZWdpdmVyJyxcbiAgfSxcbiAge1xuICAgIGlkOiAncGF0aWVudCcsXG4gICAgdGFiOiAnUGF0aWVudCcsXG4gICAgdGFiU3ViOiAnU2hhcmUgeW91ciBleHBlcmllbmNlJyxcbiAgICBpY29uOiAnaGVhcnQnLFxuICAgIHBlcnNvbmE6IFsncGF0aWVudCcsIDMsIDIsIDBdLFxuICAgIG1vdHRvOiAnWW91ciBzdG9yeSBjYW4gY2hhbmdlIHNvbWVvbmVcdTIwMTlzIHRyZWF0bWVudCcsXG4gICAgdGl0bGU6IFsnUGFpZCBzdXJ2ZXlzIHdoZXJlJywgeyB0OiAneW91ciBoZWFsdGggc3RvcnkgcGF5cyB5b3UgYmFjaycsIGhsOiAnZ3JhZCcgfV0sXG4gICAgbGVhZDogJ05vIGNsaW5pY3MsIG5vIHRlc3RzLCBubyBuZWVkbGVzLiBKdXN0IHlvdXIgaG9uZXN0IGV4cGVyaWVuY2Ugb2YgbGl2aW5nIHdpdGggYSBjb25kaXRpb24sIGFuc3dlcmVkIGZyb20geW91ciBwaG9uZSwgYW5kIGEgcmV3YXJkIGZvciBldmVyeSBzdXJ2ZXkgeW91IGNvbXBsZXRlLiBZb3VyIG5hbWUgbmV2ZXIgbGVhdmVzIG91ciBoYW5kcy4nLFxuICAgIGJhZGdlczogWydcdTIwQjkwIC8gJDAgdG8gam9pbicsICdBbnN3ZXIgZnJvbSB5b3VyIHBob25lJywgJ1lvdXIgZGV0YWlscyBuZXZlciBzb2xkJ10sXG4gICAgY3RhOiAnSm9pbiBhcyBhIHBhdGllbnQnLFxuICB9LFxuXTtcblxuY29uc3QgU1lNQk9MUyA9IFsnJCcsICdcdTIwQjknLCAnXHUyMEFDJywgJ1x1MDBBMycsICckJywgJ1x1MjBCOScsICdcdTIwQUMnLCAnJCcsICdcdTIwQjknLCAnXHUwMEEzJ107XG5cbi8qKiBBbmltYXRlZCBjb3VudGVyIChDU1MgQHByb3BlcnR5KTogY291bnRzIHVwIHRvIGB0b2AgZXZlcnkgbG9vcC4gKi9cbmZ1bmN0aW9uIENvdW50KHsgdG8sIHByZSA9ICcnLCBjbGFzc05hbWUgPSAnJyB9KSB7XG4gIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e2Bjb3VudC11cCAke2NsYXNzTmFtZX1gfSBzdHlsZT17eyAnLS10byc6IHRvIH19IGRhdGEtcHJlPXtwcmV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+O1xufVxuXG4vKiogQSBnb2xkIGNvaW4gc2VlbiBlZGdlLW9uIGluIDNEIChkaXNjICsgcmltKS4gKi9cbmZ1bmN0aW9uIENvaW4oeyBzeW0gPSAnJCcsIGNsYXNzTmFtZSA9ICcnLCBzdHlsZSB9KSB7XG4gIHJldHVybiA8aSBjbGFzc05hbWU9e2BnY29pbiAke2NsYXNzTmFtZX1gfSBzdHlsZT17c3R5bGV9PjxiPntzeW19PC9iPjwvaT47XG59XG5cbi8qIC0tLS0tLS0tLS0gUHJvZmVzc2lvbmFsOiB0aGUgdml0YWwtc2lnbnMgbW9uaXRvciB0aGF0IHBheXMgLS0tLS0tLS0tLSAqL1xuZnVuY3Rpb24gUHJvU2NlbmUoKSB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidm0tbW9uaXRvclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZtLXNjcmVlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidm0tdG9wXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2bS1saXZlXCI+PGkgLz5MaXZlIHN0dWR5PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidm0tdGFnXCI+PEljb24gbmFtZT1cInN0ZXRob3Njb3BlXCIgc2l6ZT17MTJ9IC8+IENhcmRpb2xvZ3kgXHUwMEI3IDE4IG1pbjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInZtLWVjZ1wiIHZpZXdCb3g9XCIwIDAgMzAwIDkwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIj5cbiAgICAgICAgICAgIDxwYXRoIGNsYXNzTmFtZT1cInZtLXRyYWNlXCIgZD1cIk0wIDUyIEg1MiBsOC0xMiA4IDEyIEg5NiBsNi00MCA5IDc0IDgtNDggNiAxNCBIMTY4IGw4LTE0IDggMTQgSDIxMiBsNi00MCA5IDc0IDgtNDggNiAxNCBIMzAwXCIgcGF0aExlbmd0aD1cIjEwMFwiIC8+XG4gICAgICAgICAgICA8cGF0aCBjbGFzc05hbWU9XCJ2bS1nbG93XCIgZD1cIk0wIDUyIEg1MiBsOC0xMiA4IDEyIEg5NiBsNi00MCA5IDc0IDgtNDggNiAxNCBIMTY4IGw4LTE0IDggMTQgSDIxMiBsNi00MCA5IDc0IDgtNDggNiAxNCBIMzAwXCIgcGF0aExlbmd0aD1cIjEwMFwiIC8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2bS1yZWFkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2bS1jZWxsIGJpZ1wiPjxzbWFsbD5Ib25vcmFyaWEgZWFybmVkPC9zbWFsbD48Q291bnQgdG89ezEyNTB9IHByZT1cIiRcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZtLWNlbGxcIj48c21hbGw+U3R1ZGllczwvc21hbGw+PGI+MTI8L2I+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidm0tY2VsbFwiPjxzbWFsbD5TdGF0dXM8L3NtYWxsPjxiIGNsYXNzTmFtZT1cInZtLW9rXCI+PEljb24gbmFtZT1cImNoZWNrXCIgc2l6ZT17MTJ9IHN0cm9rZT17M30gLz4gUGFpZDwvYj48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2bS1uZWNrXCIgLz48c3BhbiBjbGFzc05hbWU9XCJ2bS1mb290XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICAge1swLCAxLCAyXS5tYXAoKGkpID0+IDxDb2luIGtleT17aX0gc3ltPXtbJyQnLCAnXHUyMEFDJywgJ1x1MDBBMyddW2ldfSBjbGFzc05hbWU9XCJ2bS1wb3BcIiBzdHlsZT17eyAnLS1pJzogaSB9fSAvPil9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInZtLXRvd2VyXCI+XG4gICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiA4IH0pLm1hcCgoXywgaSkgPT4gPHNwYW4ga2V5PXtpfSBjbGFzc05hbWU9XCJ2bS1kaXNjXCIgc3R5bGU9e3sgJy0taSc6IGkgfX0gLz4pfVxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2bS10b3dlci1sYmxcIj5Ib25vcmFyaXVtPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInZtLWNyZWRpdFwiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2Yy1pY1wiPjxJY29uIG5hbWU9XCJiYW5rXCIgc2l6ZT17MTZ9IC8+PC9zcGFuPlxuICAgICAgICA8c3Bhbj48Yj4rJDQ1IGNyZWRpdGVkPC9iPjxzbWFsbD5XaXJlIHRyYW5zZmVyIFx1MDBCNyBqdXN0IG5vdzwvc21hbGw+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInZtLWxhbnlhcmRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmwtc3RyaW5nXCIgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmwtY2FyZFwiPlxuICAgICAgICAgIDxQZXJzb25hIGtpbmQ9XCJkb2N0b3JcIiBza2luPXsyfSBoYWlyPXswfSBzaXplPXs0MH0gLz5cbiAgICAgICAgICA8c3Bhbj48Yj5WZXJpZmllZCBjbGluaWNpYW48L2I+PHNtYWxsPjxJY29uIG5hbWU9XCJzaGllbGRDaGVja1wiIHNpemU9ezExfSAvPiBMaWNlbmNlIGNoZWNrZWQ8L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJzLWNoaXAgYzFcIj48SWNvbiBuYW1lPVwiYm9va1wiIHNpemU9ezEzfSAvPiBDTUUgY3JlZGl0PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicy1jaGlwIGMyXCI+PEljb24gbmFtZT1cInBheXBhbFwiIHNpemU9ezEzfSAvPiBQYXlQYWw8L3NwYW4+XG4gICAgPC8+XG4gICk7XG59XG5cbi8qIC0tLS0tLS0tLS0gQ2FyZWdpdmVyOiB0aGUgY2FyZSBqYXIgdGhhdCBmaWxscyB3aGlsZSB2b3VjaGVycyBmbHkgaW4gLS0tLS0tLS0tLSAqL1xuZnVuY3Rpb24gQ2FyZVNjZW5lKCkge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNqLWphclwiPlxuICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjAwIDI0MFwiIGNsYXNzTmFtZT1cImNqLXN2Z1wiPlxuICAgICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgPGNsaXBQYXRoIGlkPVwiY2otY2xpcFwiPjxwYXRoIGQ9XCJNNDAgNzAgUTMwIDgwIDMwIDEwMCBWMjAwIFEzMCAyMjYgNTYgMjI2IEgxNDQgUTE3MCAyMjYgMTcwIDIwMCBWMTAwIFExNzAgODAgMTYwIDcwIFpcIiAvPjwvY2xpcFBhdGg+XG4gICAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJjai1saXF1aWRcIiB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjFcIj48c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2ZmZDI3YVwiIC8+PHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNmZjdhNTlcIiAvPjwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJjai1nbGFzc1wiIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMVwiIHkyPVwiMFwiPjxzdG9wIG9mZnNldD1cIjBcIiBzdG9wQ29sb3I9XCIjZmZmXCIgc3RvcE9wYWNpdHk9XCIuNzVcIiAvPjxzdG9wIG9mZnNldD1cIi4zXCIgc3RvcENvbG9yPVwiI2ZmZlwiIHN0b3BPcGFjaXR5PVwiLjE1XCIgLz48c3RvcCBvZmZzZXQ9XCIuOFwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIi4wNVwiIC8+PHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNmZmZcIiBzdG9wT3BhY2l0eT1cIi41XCIgLz48L2xpbmVhckdyYWRpZW50PlxuICAgICAgICAgIDwvZGVmcz5cbiAgICAgICAgICA8ZWxsaXBzZSBjeD1cIjEwMFwiIGN5PVwiMjMwXCIgcng9XCI3OFwiIHJ5PVwiOFwiIGZpbGw9XCIjMDAwXCIgb3BhY2l0eT1cIi4xXCIgLz5cbiAgICAgICAgICA8cGF0aCBkPVwiTTQwIDcwIFEzMCA4MCAzMCAxMDAgVjIwMCBRMzAgMjI2IDU2IDIyNiBIMTQ0IFExNzAgMjI2IDE3MCAyMDAgVjEwMCBRMTcwIDgwIDE2MCA3MCBaXCIgZmlsbD1cIiNmZmZcIiBmaWxsT3BhY2l0eT1cIi4zNVwiIHN0cm9rZT1cIiNmZmIzOGFcIiBzdHJva2VXaWR0aD1cIjNcIiAvPlxuICAgICAgICAgIDxnIGNsaXBQYXRoPVwidXJsKCNjai1jbGlwKVwiPlxuICAgICAgICAgICAgPGcgY2xhc3NOYW1lPVwiY2otZmlsbFwiPjxyZWN0IHg9XCIyMFwiIHk9XCIwXCIgd2lkdGg9XCIxNjBcIiBoZWlnaHQ9XCIyNDBcIiBmaWxsPVwidXJsKCNjai1saXF1aWQpXCIgLz48cGF0aCBjbGFzc05hbWU9XCJjai13YXZlXCIgZD1cIk0wIDQgUTI1IC00IDUwIDQgVDEwMCA0IFQxNTAgNCBUMjAwIDQgVDI1MCA0IFYyMCBIMHpcIiBmaWxsPVwiI2ZmZTJhOFwiIC8+PC9nPlxuICAgICAgICAgICAge1swLCAxLCAyLCAzLCA0LCA1XS5tYXAoKGkpID0+IDxlbGxpcHNlIGtleT17aX0gY2xhc3NOYW1lPVwiY2otY29pblwiIHN0eWxlPXt7ICctLWknOiBpIH19IGN4PXs2MCArIChpICUgMykgKiA0MH0gY3k9ezIwNiAtIE1hdGguZmxvb3IoaSAvIDMpICogMTR9IHJ4PVwiMTdcIiByeT1cIjZcIiBmaWxsPVwiI2ZjZDM0ZFwiIHN0cm9rZT1cIiNkOTc3MDZcIiBzdHJva2VXaWR0aD1cIjJcIiAvPil9XG4gICAgICAgICAgICB7WzAsIDEsIDJdLm1hcCgoaSkgPT4gPHBhdGgga2V5PXtpfSBjbGFzc05hbWU9XCJjai1oZWFydFwiIHN0eWxlPXt7ICctLWknOiBpIH19IGQ9XCJNMCAtNGMtMy02LTEyLTQtMTAgMyAxIDQgMTAgOSAxMCA5czktNSAxMC05YzItNy03LTktMTAtM3pcIiBmaWxsPVwiI2ZmNGY2ZFwiIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgkezcwICsgaSAqIDMwfSAkezE5MCAtIGkgKiAyNn0pYH0gLz4pfVxuICAgICAgICAgIDwvZz5cbiAgICAgICAgICA8cGF0aCBkPVwiTTQwIDcwIFEzMCA4MCAzMCAxMDAgVjIwMCBRMzAgMjI2IDU2IDIyNiBIMTQ0IFExNzAgMjI2IDE3MCAyMDAgVjEwMCBRMTcwIDgwIDE2MCA3MCBaXCIgZmlsbD1cInVybCgjY2otZ2xhc3MpXCIgLz5cbiAgICAgICAgICA8cGF0aCBkPVwiTTQ4IDk2IFYxOTZcIiBzdHJva2U9XCIjZmZmXCIgc3Ryb2tlT3BhY2l0eT1cIi45XCIgc3Ryb2tlV2lkdGg9XCI2XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgLz5cbiAgICAgICAgICA8cmVjdCB4PVwiMzRcIiB5PVwiNDhcIiB3aWR0aD1cIjEzMlwiIGhlaWdodD1cIjI2XCIgcng9XCIxMFwiIGZpbGw9XCIjZmY4YTNkXCIgLz5cbiAgICAgICAgICA8cmVjdCB4PVwiMzRcIiB5PVwiNDhcIiB3aWR0aD1cIjEzMlwiIGhlaWdodD1cIjEwXCIgcng9XCI2XCIgZmlsbD1cIiNmZmIwNjdcIiAvPlxuICAgICAgICAgIDxnIGNsYXNzTmFtZT1cImNqLWxhYmVsXCI+PHJlY3QgeD1cIjU4XCIgeT1cIjEyMFwiIHdpZHRoPVwiODRcIiBoZWlnaHQ9XCI0MlwiIHJ4PVwiMTBcIiBmaWxsPVwiI2ZmZlwiIC8+PHRleHQgeD1cIjEwMFwiIHk9XCIxMzhcIiB0ZXh0QW5jaG9yPVwibWlkZGxlXCIgZm9udFNpemU9XCIxMVwiIGZvbnRXZWlnaHQ9XCI4MDBcIiBmaWxsPVwiI2ZmNGY2ZFwiPkNBUkUgRlVORDwvdGV4dD48dGV4dCB4PVwiMTAwXCIgeT1cIjE1M1wiIHRleHRBbmNob3I9XCJtaWRkbGVcIiBmb250U2l6ZT1cIjEwXCIgZm9udFdlaWdodD1cIjcwMFwiIGZpbGw9XCIjYjQ1MzA5XCI+Z3Jvd3MgZXZlcnkgc3VydmV5PC90ZXh0PjwvZz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2Rpdj5cbiAgICAgIHtbWydiYWcnLCAnR3JvY2VyeSB2b3VjaGVyJ10sIFsncHVsc2UnLCAnV2VsbG5lc3MnXSwgWyd3YWxsZXQnLCAnQ2FzaCByZXdhcmQnXV0ubWFwKChbaWMsIGxdLCBpKSA9PiAoXG4gICAgICAgIDxzcGFuIGtleT17bH0gY2xhc3NOYW1lPXtgY2otcGxhbmUgcCR7aX1gfSBzdHlsZT17eyAnLS1pJzogaSB9fT5cbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBjbGFzc05hbWU9XCJjanAtc3ZnXCI+PHBhdGggZD1cIk0yMiAyIDIgOS41bDcgMyAzIDd6XCIgZmlsbD1cIiNmZmZcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuNlwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiAvPjxwYXRoIGQ9XCJNMjIgMiA5IDEyLjVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuNlwiIC8+PC9zdmc+XG4gICAgICAgICAgPGVtPjxJY29uIG5hbWU9e2ljfSBzaXplPXsxMn0gLz57bH08L2VtPlxuICAgICAgICA8L3NwYW4+XG4gICAgICApKX1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2otd2Vla1wiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdy1oZWFkXCI+PEljb24gbmFtZT1cImNhbGVuZGFyXCIgc2l6ZT17MTN9IC8+IFRoaXMgd2Vlazwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3ctZGF5c1wiPntbJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJywgJ1MnXS5tYXAoKGQsIGkpID0+IDxpIGtleT17aX0gc3R5bGU9e3sgJy0taSc6IGkgfX0gY2xhc3NOYW1lPXtpICUgMiA9PT0gMCA/ICdvbicgOiAnJ30+e2R9PC9pPil9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdy1zdW1cIj40IHNob3J0IHN1cnZleXMgXHUwMEI3IDxiPlx1MjBCOTIsMDAwPC9iPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjai10aWNrZXRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtbFwiPjxzbWFsbD5Hcm9jZXJ5IHZvdWNoZXI8L3NtYWxsPjxiPlx1MjBCOTUwMDwvYj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN0LXJcIj48SWNvbiBuYW1lPVwiZ2lmdFwiIHNpemU9ezE4fSAvPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicy1iYWRnZSBzYi1jYXJlXCI+XG4gICAgICAgIDxQZXJzb25hIGtpbmQ9XCJjYXJlZ2l2ZXJcIiBza2luPXsxfSBoYWlyPXszfSBoYWlyU3R5bGU9ezF9IHNpemU9ezQyfSAvPlxuICAgICAgICA8c3Bhbj48Yj5DYXJpbmcgZm9yIERhZDwvYj48c21hbGw+PEljb24gbmFtZT1cImNsb2NrXCIgc2l6ZT17MTF9IC8+IDEwLW1pbnV0ZSBzdXJ2ZXk8L3NtYWxsPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8Lz5cbiAgKTtcbn1cblxuLyogLS0tLS0tLS0tLSBQYXRpZW50OiBmaW5pc2ggdGhlIHN1cnZleSwgdGhlIGdpZnQgYm94IG9wZW5zIC0tLS0tLS0tLS0gKi9cbmZ1bmN0aW9uIFBhdGllbnRTY2VuZSgpIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncC1waG9uZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdwLXNjcmVlblwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdwLXFcIj5MaXZpbmcgd2l0aCB0eXBlIDIgZGlhYmV0ZXM8L3NwYW4+XG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiBjbGFzc05hbWU9XCJncC1yaW5nXCI+XG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjQwXCIgY2xhc3NOYW1lPVwiZ3AtdHJhY2tcIiAvPlxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIGNsYXNzTmFtZT1cImdwLXByb2dcIiBwYXRoTGVuZ3RoPVwiMTAwXCIgLz5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJncC1wY3RcIj48Q291bnQgdG89ezEwMH0gLz48c21hbGw+JTwvc21hbGw+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdwLWRvbmVcIj48SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPXsxM30gc3Ryb2tlPXszfSAvPiBTdXJ2ZXkgY29tcGxldGU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdiLXdyYXBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnYi1ib3hcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnYi1mIGZyb250XCIgLz48c3BhbiBjbGFzc05hbWU9XCJnYi1mIGJhY2tcIiAvPjxzcGFuIGNsYXNzTmFtZT1cImdiLWYgbGVmdFwiIC8+PHNwYW4gY2xhc3NOYW1lPVwiZ2ItZiByaWdodFwiIC8+PHNwYW4gY2xhc3NOYW1lPVwiZ2ItZiBib3R0b21cIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2ItbGlkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnbC1mIHRvcFwiIC8+PHNwYW4gY2xhc3NOYW1lPVwiZ2wtZiBmcm9udFwiIC8+PHNwYW4gY2xhc3NOYW1lPVwiZ2wtZiBiYWNrXCIgLz48c3BhbiBjbGFzc05hbWU9XCJnbC1mIGxlZnRcIiAvPjxzcGFuIGNsYXNzTmFtZT1cImdsLWYgcmlnaHRcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2ItYm93XCI+PGkgLz48aSAvPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2ItY2FyZFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdjLXRvcFwiPjxJY29uIG5hbWU9XCJnaWZ0XCIgc2l6ZT17MTN9IC8+IFJld2FyZCB1bmxvY2tlZDwvc3Bhbj5cbiAgICAgICAgICA8Yj5BbWF6b24gR2lmdCBDYXJkPC9iPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdjLXZhbFwiPiQxNTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnYy1zaGluZVwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogOCB9KS5tYXAoKF8sIGkpID0+IDxDb2luIGtleT17aX0gc3ltPXtTWU1CT0xTW2ldfSBjbGFzc05hbWU9XCJnYi1jb2luXCIgc3R5bGU9e3sgJy0taSc6IGksICctLWR4JzogYCR7KGkgLSAzLjUpICogOX1jcXdgLCAnLS1keSc6IGAkey0yMCAtIChpICUgMykgKiA4fWNxd2AgfX0gLz4pfVxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnYi1yYXlzXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncC13YWxsZXRcIj48SWNvbiBuYW1lPVwid2FsbGV0XCIgc2l6ZT17MTV9IC8+PHNwYW4+PHNtYWxsPk15IHJld2FyZHM8L3NtYWxsPjxDb3VudCB0bz17NDV9IHByZT1cIiRcIiAvPjwvc3Bhbj48L2Rpdj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInMtY2hpcCBjMVwiPjxJY29uIG5hbWU9XCJ1cGlcIiBzaXplPXsxM30gLz4gVVBJIFx1MDBCNyBJbmRpYTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInMtY2hpcCBjM1wiPjxJY29uIG5hbWU9XCJsb2NrXCIgc2l6ZT17MTN9IC8+IEFub255bW91cyBhbnN3ZXJzPC9zcGFuPlxuICAgIDwvPlxuICApO1xufVxuXG5jb25zdCBTQ0VORVMgPSB7IGhjcDogUHJvU2NlbmUsIGNhcmVnaXZlcjogQ2FyZVNjZW5lLCBwYXRpZW50OiBQYXRpZW50U2NlbmUgfTtcblxuZnVuY3Rpb24gU3RhZ2UoeyByb2xlIH0pIHtcbiAgY29uc3QgcmVmID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBTY2VuZSA9IFNDRU5FU1tyb2xlLmlkXTtcbiAgY29uc3Qgb25Nb3ZlID0gKGUpID0+IHtcbiAgICBjb25zdCBlbCA9IHJlZi5jdXJyZW50O1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBjb25zdCByID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgZWwuc3R5bGUuc2V0UHJvcGVydHkoJy0tcnknLCBgJHsoKGUuY2xpZW50WCAtIHIubGVmdCkgLyByLndpZHRoIC0gMC41KSAqIDEyfWRlZ2ApO1xuICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KCctLXJ4JywgYCR7LSgoZS5jbGllbnRZIC0gci50b3ApIC8gci5oZWlnaHQgLSAwLjUpICogOH1kZWdgKTtcbiAgfTtcbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgcmVmLmN1cnJlbnQ/LnN0eWxlLnNldFByb3BlcnR5KCctLXJ5JywgJzBkZWcnKTtcbiAgICByZWYuY3VycmVudD8uc3R5bGUuc2V0UHJvcGVydHkoJy0tcngnLCAnMGRlZycpO1xuICB9O1xuICByZXR1cm4gKFxuICAgIDxMaXZlWm9uZSBjbGFzc05hbWU9e2BzdGFnZSBzdGFnZS0ke3JvbGUuaWR9YH0gb25Qb2ludGVyTW92ZT17b25Nb3ZlfSBvblBvaW50ZXJMZWF2ZT17cmVzZXR9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGFnZS0zZFwiIHJlZj17cmVmfSBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RhZ2UtcGFkXCIgLz5cbiAgICAgICAgPFNjZW5lIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L0xpdmVab25lPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSb2xlSGVybygpIHtcbiAgY29uc3QgW2lkeCwgc2V0SWR4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCB0b3VjaGVkID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3Qgcm9sZSA9IFJPTEVTW2lkeF07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJykubWF0Y2hlcykgcmV0dXJuO1xuICAgIGNvbnN0IHQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IGlmICghdG91Y2hlZC5jdXJyZW50ICYmICFkb2N1bWVudC5oaWRkZW4pIHNldElkeCgoaSkgPT4gKGkgKyAxKSAlIFJPTEVTLmxlbmd0aCk7IH0sIDkwMDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHQpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgcGljayA9IChpKSA9PiB7IHRvdWNoZWQuY3VycmVudCA9IHRydWU7IHNldElkeChpKTsgfTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT17YHJvbGUtaGVybyByZ3JhZGUtJHtyb2xlLmlkfWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaC1iZ1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxpIC8+PGkgLz48aSAvPjxzcGFuIGNsYXNzTmFtZT1cInJoLWVjZ1wiPjxzdmcgdmlld0JveD1cIjAgMCAxMjAwIDEyMFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCI+PHBhdGggZD1cIk0wIDcwIEgzNjAgbDIwLTQwIDI2IDgwIDIyLTk2IDIwIDcyIDE0LTE2IEg3NjAgbDE2LTI0IDE4IDQ4IDE2LTI0IEgxMjAwXCIgcGF0aExlbmd0aD1cIjEwMFwiIC8+PC9zdmc+PC9zcGFuPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgcmgtaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaC1jb3B5XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaC10YWJzXCIgcm9sZT1cInRhYmxpc3RcIiBhcmlhLWxhYmVsPVwiQ2hvb3NlIHdobyB5b3UgYXJlXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyaC1zbGlkZXJcIiBzdHlsZT17eyAnLS1uJzogaWR4IH19IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICB7Uk9MRVMubWFwKChyLCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b24ga2V5PXtyLmlkfSByb2xlPVwidGFiXCIgaWQ9e2ByaC10YWItJHtyLmlkfWB9IGFyaWEtc2VsZWN0ZWQ9e2kgPT09IGlkeH0gYXJpYS1jb250cm9scz1cInJoLXBhbmVsXCIgY2xhc3NOYW1lPXtgcmgtdGFiIHQtJHtyLmlkfSAke2kgPT09IGlkeCA/ICdvbicgOiAnJ31gfSBvbkNsaWNrPXsoKSA9PiBwaWNrKGkpfT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyaHQtaWNcIj48SWNvbiBuYW1lPXtyLmljb259IHNpemU9ezE4fSAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyaHQtdHh0XCI+PGI+e3IudGFifTwvYj48c21hbGw+e3IudGFiU3VifTwvc21hbGw+PC9zcGFuPlxuICAgICAgICAgICAgICAgIHtpID09PSBpZHggJiYgIXRvdWNoZWQuY3VycmVudCAmJiA8c3BhbiBjbGFzc05hbWU9XCJyaHQtdGltZXJcIiBrZXk9e2lkeH0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz59XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaC1wYW5lbFwiIGlkPVwicmgtcGFuZWxcIiByb2xlPVwidGFicGFuZWxcIiBhcmlhLWxhYmVsbGVkYnk9e2ByaC10YWItJHtyb2xlLmlkfWB9IGtleT17cm9sZS5pZH0+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJyaC1tb3R0b1wiPjxzcGFuIGNsYXNzTmFtZT1cInJtLWF2XCI+PFBlcnNvbmEga2luZD17cm9sZS5wZXJzb25hWzBdfSBza2luPXtyb2xlLnBlcnNvbmFbMV19IGhhaXI9e3JvbGUucGVyc29uYVsyXX0gaGFpclN0eWxlPXtyb2xlLnBlcnNvbmFbM119IHNpemU9ezMwfSAvPjwvc3Bhbj57cm9sZS5tb3R0b308L3A+XG4gICAgICAgICAgICA8SGVyb1RpdGxlIHBhcnRzPXtyb2xlLnRpdGxlfSAvPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmgtbGVhZFwiPntyb2xlLmxlYWR9PC9wPlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInBoLWJhZGdlc1wiPntyb2xlLmJhZGdlcy5tYXAoKGIpID0+IDxsaSBrZXk9e2J9PntifTwvbGk+KX08L3VsPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaC1jdGFzXCI+XG4gICAgICAgICAgICAgIDxCdXR0b24gdG89e2Avam9pbiMke3JvbGUuaWR9YH0+e3JvbGUuY3RhfTwvQnV0dG9uPlxuICAgICAgICAgICAgICA8QnV0dG9uIHRvPVwiL2hvdy1pdC13b3Jrc1wiIHZhcmlhbnQ9XCJnaG9zdFwiIGljb249XCJwdWxzZVwiPkhvdyBwYWlkIHN1cnZleXMgd29yazwvQnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJoLWFydFwiIGtleT17cm9sZS5pZCArICctYXJ0J30+PFN0YWdlIHJvbGU9e3JvbGV9IC8+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59XG4iLCAiLy8gTmV3IHNob3djYXNlIHNlY3Rpb25zOiBjb21tdW5pdHkgcHVsc2UsIHJld2FyZCB3aGVlbCAmIHNoZWx2ZXMsIHByb2Zlc3Npb25hbCBob25leWNvbWIsXG4vLyBzcGVjaWFsdHkgY2Fwc3VsZXMsIDNEIHRlc3RpbW9uaWFsIGNhcm91c2VsIGFuZCB0aGUgM0QgZmxhZyBnbG9iZS5cbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBJY29uIGZyb20gJy4vSWNvbi5qc3gnO1xuaW1wb3J0IFBlcnNvbmEgZnJvbSAnLi9QZXJzb25hLmpzeCc7XG5pbXBvcnQgQ291bnRlciBmcm9tICcuL0NvdW50ZXIuanN4JztcbmltcG9ydCB7IEZsYWcsIFN0YXJzLCBMaXZlWm9uZSwgdXNlSW5WaWV3LCBSZXZlYWwgfSBmcm9tICcuL3VpLmpzeCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAnLi4vcm91dGVyLmpzeCc7XG5pbXBvcnQgeyBDT01NVU5JVFlfU1RBVFMsIFJFV0FSRF9ST0xFUywgUFJPX0NBVEVHT1JJRVMsIFNQRUNJQUxUSUVTIH0gZnJvbSAnLi4vZGF0YS9jb21tdW5pdHkuanMnO1xuaW1wb3J0IHsgVEVTVElNT05JQUxTLCBBVURJRU5DRVMgfSBmcm9tICcuLi9kYXRhL3Rlc3RpbW9uaWFscy5qcyc7XG5pbXBvcnQgeyB1c2VNZW1iZXJSZXZpZXdzIH0gZnJvbSAnLi4vdXRpbHMvcmV2aWV3cy5qcyc7XG5pbXBvcnQgeyBSRUdJT05TLCBDT1ZFUkFHRV9DT1VOVCB9IGZyb20gJy4uL2RhdGEvY291bnRyaWVzLmpzJztcbmltcG9ydCB7IEhlYXJ0TWFyayB9IGZyb20gJy4vQnJhbmQuanN4JztcblxuLyogLS0tLS0tLS0tLS0tLS0tLSBDb21tdW5pdHkgcHVsc2U6IGZvdXIgc3RhdHMsIGZvdXIgZGlmZmVyZW50IG1pbmktdmlzdWFscyAtLS0tLS0tLS0tLS0tLS0tICovXG5mdW5jdGlvbiBTdGF0Vml6KHsgaWQsIG9uIH0pIHtcbiAgaWYgKGlkID09PSAncGFuZWxpc3RzJylcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3YtY3Jvd2RcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAge1tbJ2RvY3RvcicsIDIsIDAsIDBdLCBbJ251cnNlJywgNCwgMSwgMV0sIFsnY2FyZWdpdmVyJywgMSwgMywgMV0sIFsncGF0aWVudCcsIDMsIDIsIDBdLCBbJ3BoYXJtYWNpc3QnLCAwLCA0LCAyXSwgWydlbGRlcicsIDEsIDAsIDBdXS5tYXAoKHAsIGkpID0+IChcbiAgICAgICAgICA8c3BhbiBrZXk9e2l9IHN0eWxlPXt7ICctLWknOiBpIH19PjxQZXJzb25hIGtpbmQ9e3BbMF19IHNraW49e3BbMV19IGhhaXI9e3BbMl19IGhhaXJTdHlsZT17cFszXX0gc2l6ZT17Mzh9IC8+PC9zcGFuPlxuICAgICAgICApKX1cbiAgICAgICAgPGI+KzwvYj5cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICBpZiAoaWQgPT09ICdpbmNlbnRpdmVzJylcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3YtY29pbnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAge1s1LCA4LCA2LCAxMCwgNywgMTJdLm1hcCgobiwgaykgPT4gKFxuICAgICAgICAgIDxzcGFuIGtleT17a30gY2xhc3NOYW1lPVwic3ZjLWNvbFwiIHN0eWxlPXt7ICctLW4nOiBuLCAnLS1rJzogayB9fT57QXJyYXkuZnJvbSh7IGxlbmd0aDogbiB9KS5tYXAoKF8sIGopID0+IDxpIGtleT17an0gc3R5bGU9e3sgJy0taic6IGogfX0gLz4pfTwvc3Bhbj5cbiAgICAgICAgKSl9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgaWYgKGlkID09PSAnbW9udGhseScpXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN2LWNhbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogMjggfSkubWFwKChfLCBpKSA9PiA8aSBrZXk9e2l9IGNsYXNzTmFtZT17WzIsIDUsIDYsIDksIDExLCAxMywgMTYsIDE4LCAxOSwgMjIsIDI0LCAyNl0uaW5jbHVkZXMoaSkgPyAnb24nIDogJyd9IHN0eWxlPXt7ICctLWknOiBpIH19IC8+KX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICByZXR1cm4gKFxuICAgIDxzcGFuIGNsYXNzTmFtZT1cInN2LXJpbmdcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMDAgMTAwXCI+PGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MlwiIGNsYXNzTmFtZT1cInItYmdcIiAvPjxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiNDJcIiBjbGFzc05hbWU9XCJyLWZnXCIgcGF0aExlbmd0aD1cIjEwMFwiIC8+PC9zdmc+XG4gICAgICA8SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPXsyNn0gc3Ryb2tlPXszfSAvPlxuICAgIDwvc3Bhbj5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbW11bml0eVB1bHNlKCkge1xuICBjb25zdCBbcmVmLCBpblZpZXddID0gdXNlSW5WaWV3KHsgdGhyZXNob2xkOiAwLjIgfSk7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gcmVmPXtyZWZ9IGNsYXNzTmFtZT17YHNlY3Rpb24gY29tbXVuaXR5ICR7aW5WaWV3ID8gJ2lzLWluJyA6ICcnfWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJjbS1oZWFkXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZXllYnJvd1wiIHN0eWxlPXt7ICctLWViJzogJyNmYWNjMTUnIH19PjxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+T3VyIGNvbW11bml0eTwvc3Bhbj5cbiAgICAgICAgICA8aDI+VHJ1c3RlZCBieSA8c3BhbiBjbGFzc05hbWU9XCJpbmstZ29sZFwiPnRob3VzYW5kczwvc3Bhbj4sIG9uZSBob25lc3QgYW5zd2VyIGF0IGEgdGltZTwvaDI+XG4gICAgICAgICAgPHA+RXZlcnkgb3BpbmlvbiBudWRnZXMgYSBoZWFsdGhjYXJlIGRlY2lzaW9uIHNvbWV3aGVyZSBpbiB0aGUgd29ybGQuIEhlcmUgaXMgd2hhdCBvdXIgbWVtYmVycyBoYXZlIGJ1aWx0IHRvZ2V0aGVyIHNvIGZhci48L3A+XG4gICAgICAgIDwvaGVhZGVyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNtLWdyaWRcIj5cbiAgICAgICAgICB7Q09NTVVOSVRZX1NUQVRTLm1hcCgocywgaSkgPT4gKFxuICAgICAgICAgICAgPGFydGljbGUga2V5PXtzLmlkfSBjbGFzc05hbWU9e2BjbS1jYXJkIGNtLSR7cy5pZH1gfSBzdHlsZT17eyAnLS1jJzogcy5jb2xvciwgJy0taSc6IGkgfX0+XG4gICAgICAgICAgICAgIDxTdGF0Vml6IGlkPXtzLmlkfSBvbj17aW5WaWV3fSAvPlxuICAgICAgICAgICAgICA8c3Ryb25nPjxDb3VudGVyIHZhbHVlPXtzLnZhbHVlfSBwcmVmaXg9e3MucHJlZml4fSBzdWZmaXg9e3Muc3VmZml4fSBkdXJhdGlvbj17MTgwMH0gLz48L3N0cm9uZz5cbiAgICAgICAgICAgICAgPGgzPntzLmxhYmVsfTwvaDM+XG4gICAgICAgICAgICAgIDxzbWFsbD57cy5ub3RlfTwvc21hbGw+XG4gICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tIFJld2FyZCB3aGVlbCAoaG9tZSk6IHBpY2sgYSByb2xlLCB0aGUgd2hlZWwgc3BpbnMgdG8gZWFjaCByZXdhcmQgLS0tLS0tLS0tLS0tLS0tLSAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJld2FyZFdoZWVsKCkge1xuICBjb25zdCBbciwgc2V0Ul0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3NlbCwgc2V0U2VsXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCByb2xlID0gUkVXQVJEX1JPTEVTW3JdO1xuICBjb25zdCBuID0gcm9sZS5pdGVtcy5sZW5ndGg7XG4gIGNvbnN0IGl0ZW0gPSByb2xlLml0ZW1zW3NlbCAlIG5dO1xuICBjb25zdCB0b3VjaGVkID0gdXNlUmVmKGZhbHNlKTtcbiAgdXNlRWZmZWN0KCgpID0+IHsgc2V0U2VsKDApOyB9LCBbcl0pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IGlmICghdG91Y2hlZC5jdXJyZW50ICYmICFkb2N1bWVudC5oaWRkZW4pIHNldFNlbCgocykgPT4gKHMgKyAxKSAlIG4pOyB9LCAyNjAwKTtcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbCh0KTtcbiAgfSwgW25dKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJ3aGVlbFwiIHN0eWxlPXt7ICctLWMnOiByb2xlLmNvbG9yLCAnLS1jMic6IHJvbGUuYWNjZW50IH19PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJydy1yb2xlc1wiIHJvbGU9XCJ0YWJsaXN0XCIgYXJpYS1sYWJlbD1cIlJld2FyZCBjYXRlZ29yaWVzIGZvclwiPlxuICAgICAgICB7UkVXQVJEX1JPTEVTLm1hcCgoeCwgaSkgPT4gKFxuICAgICAgICAgIDxidXR0b24ga2V5PXt4LmlkfSByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17aSA9PT0gcn0gY2xhc3NOYW1lPXtpID09PSByID8gJ29uJyA6ICcnfSBzdHlsZT17eyAnLS1jJzogeC5jb2xvciB9fSBvbkNsaWNrPXsoKSA9PiB7IHRvdWNoZWQuY3VycmVudCA9IGZhbHNlOyBzZXRSKGkpOyB9fT5cbiAgICAgICAgICAgIDxJY29uIG5hbWU9e3guaWNvbn0gc2l6ZT17MTh9IC8+e3gudGl0bGV9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ3LXN0YWdlXCI+XG4gICAgICAgIDxMaXZlWm9uZSBjbGFzc05hbWU9XCJydy1kaWFsXCIga2V5PXtyb2xlLmlkfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJ3LXNwaW5cIiBzdHlsZT17eyAnLS1yb3QnOiBgJHstKHNlbCAlIG4pICogKDM2MCAvIG4pfWRlZ2AgfX0+XG4gICAgICAgICAgICB7cm9sZS5pdGVtcy5tYXAoKGl0LCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e2l0LnR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcnctbm9kZSAke2kgPT09IHNlbCAlIG4gPyAnb24nIDogJyd9YH1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyAnLS1hJzogYCR7aSAqICgzNjAgLyBuKX1kZWdgIH19XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB0b3VjaGVkLmN1cnJlbnQgPSB0cnVlOyBzZXRTZWwoaSk7IH19XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aXQudH1cbiAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e2kgPT09IHNlbCAlIG59XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyd24taW5cIj48SWNvbiBuYW1lPXtpdC5pY29ufSBzaXplPXsyMH0gLz48L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydy1jb3JlXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJydy1naWZ0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PEljb24gbmFtZT1cImdpZnRcIiBzaXplPXszMH0gLz48L3NwYW4+XG4gICAgICAgICAgICA8YiBrZXk9e2l0ZW0udH0+e2l0ZW0udH08L2I+XG4gICAgICAgICAgICA8c21hbGwga2V5PXtpdGVtLmR9PntpdGVtLmR9PC9zbWFsbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJydy1wb2ludGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgPC9MaXZlWm9uZT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydy1saXN0XCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwicnctbGluZVwiPntyb2xlLmxpbmV9PC9wPlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIHtyb2xlLml0ZW1zLm1hcCgoaXQsIGkpID0+IChcbiAgICAgICAgICAgICAgPGxpIGtleT17aXQudH0gY2xhc3NOYW1lPXtpID09PSBzZWwgJSBuID8gJ29uJyA6ICcnfSBzdHlsZT17eyAnLS1pJzogaSB9fT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHsgdG91Y2hlZC5jdXJyZW50ID0gdHJ1ZTsgc2V0U2VsKGkpOyB9fT48SWNvbiBuYW1lPXtpdC5pY29ufSBzaXplPXsxNX0gLz57aXQudH08L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZmluZVwiPlJld2FyZCBvcHRpb25zIGRlcGVuZCBvbiB0aGUgc3R1ZHkgYW5kIHlvdXIgY291bnRyeSBcdTIwMTQgZWFjaCBpbnZpdGF0aW9uIHNob3dzIHdoYXQgeW91IGNhbiBlYXJuLjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuLyogLS0tLS0tLS0tLS0tLS0tLSBQcm9mZXNzaW9uYWxzIGhvbmV5Y29tYiAtLS0tLS0tLS0tLS0tLS0tICovXG5jb25zdCBIRVhfSUNPTlMgPSBbJ251cnNlJywgJ3N0ZXRob3Njb3BlJywgJ2JyaWVmY2FzZScsICdzdGV0aG9zY29wZScsICdudXJzZScsICdudXJzZScsICdudXJzZScsICdoYW5kcycsICdidWlsZGluZycsICdwaWxsJywgJ3B1bHNlJywgJ2tleScsICdzaGllbGQnLCAndXNlcnMnLCAnY2xpcGJvYXJkJywgJ2ZsYXNrJywgJ2JhZycsICd1c2VycycsICdzcGFya2xlJywgJ21vbml0b3InLCAnc2NhbHBlbCcsICdjb21wYXNzJywgJ2FtYnVsYW5jZScsICdsYXllcnMnLCAnY2hhdCddO1xuZXhwb3J0IGZ1bmN0aW9uIFByb0hvbmV5Y29tYigpIHtcbiAgY29uc3QgW3JlZiwgaW5WaWV3XSA9IHVzZUluVmlldyh7IHRocmVzaG9sZDogMC4xIH0pO1xuICBjb25zdCBjZWxscyA9IFsuLi5QUk9fQ0FURUdPUklFUy5tYXAoKHAsIGkpID0+ICh7IHAsIGkgfSkpLCB7IGNvdW50OiB0cnVlLCBpOiBQUk9fQ0FURUdPUklFUy5sZW5ndGggfV07XG4gIGNvbnN0IHJvd3MgPSBbXTtcbiAgbGV0IGF0ID0gMDtcbiAgZm9yIChjb25zdCBuIG9mIFs3LCA2LCA3LCA2XSkgeyByb3dzLnB1c2goY2VsbHMuc2xpY2UoYXQsIGF0ICsgbikpOyBhdCArPSBuOyB9XG4gIHJldHVybiAoXG4gICAgPGRpdiByZWY9e3JlZn0gY2xhc3NOYW1lPXtgaG9uZXljb21iICR7aW5WaWV3ID8gJ2lzLWluJyA6ICcnfWB9PlxuICAgICAgPHVsPlxuICAgICAgICB7cm93cy5tYXAoKHJvdywgcikgPT4gKFxuICAgICAgICAgIDxsaSBrZXk9e3J9IGNsYXNzTmFtZT17YGhjLXJvdyAke3IgJSAyID8gJ29kZCcgOiAnJ31gfT5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAge3Jvdy5tYXAoKGMpID0+IChcbiAgICAgICAgICAgICAgICBjLmNvdW50ID8gKFxuICAgICAgICAgICAgICAgICAgPGxpIGtleT1cImNvdW50XCIgY2xhc3NOYW1lPVwiaHgtY2VsbCBoeC1jb3VudFwiIHN0eWxlPXt7ICctLWknOiBjLmkgfX0+PHNwYW4gY2xhc3NOYW1lPVwiaHhcIj48c3Ryb25nPjI1Kzwvc3Ryb25nPjxiPnByb2Zlc3Npb25hbCBjYXRlZ29yaWVzPC9iPjwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8bGkga2V5PXtjLnB9IGNsYXNzTmFtZT1cImh4LWNlbGxcIiBzdHlsZT17eyAnLS1pJzogYy5pIH19IHRhYkluZGV4PXswfT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaHhcIj48SWNvbiBuYW1lPXtIRVhfSUNPTlNbYy5pXSB8fCAndXNlcid9IHNpemU9ezIwfSAvPjxiPntjLnB9PC9iPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tIFNwZWNpYWx0eSBjYXBzdWxlcyAtLS0tLS0tLS0tLS0tLS0tICovXG5leHBvcnQgZnVuY3Rpb24gU3BlY2lhbHR5Q2Fwc3VsZXMoKSB7XG4gIHJldHVybiAoXG4gICAgPExpdmVab25lIGNsYXNzTmFtZT1cImNhcHN1bGVzXCI+XG4gICAgICB7U1BFQ0lBTFRJRVMubWFwKChzLCBpKSA9PiAoXG4gICAgICAgIDxzcGFuIGtleT17cy50fSBjbGFzc05hbWU9XCJjYXBzdWxlXCIgc3R5bGU9e3sgJy0tYyc6IHMuYywgJy0taSc6IGkgfX0+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3AtaGFsZlwiPjxJY29uIG5hbWU9e3MuaWNvbn0gc2l6ZT17MTh9IC8+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNwLXRleHRcIj57cy50fTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKSl9XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXBzdWxlIGNwLXRvdGFsXCIgc3R5bGU9e3sgJy0tYyc6ICcjMGIxYjNmJywgJy0taSc6IDEwIH19PjxzcGFuIGNsYXNzTmFtZT1cImNwLWhhbGZcIj48Yj4xMCs8L2I+PC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cImNwLXRleHRcIj5zcGVjaWFsdHkgYXJlYXM8L3NwYW4+PC9zcGFuPlxuICAgIDwvTGl2ZVpvbmU+XG4gICk7XG59XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0gM0QgdGVzdGltb25pYWwgY2Fyb3VzZWwgLS0tLS0tLS0tLS0tLS0tLSAqL1xuY29uc3QgUk9MRV9UT19BVUQgPSB7IGhjcDogJ2RvY3RvcnMnLCBjYXJlZ2l2ZXI6ICdjYXJlZ2l2ZXJzJywgcGF0aWVudDogJ3BhdGllbnRzJyB9O1xuY29uc3QgYXVkQ29sb3IgPSAoaWQpID0+IEFVRElFTkNFUy5maW5kKChhKSA9PiBhLmlkID09PSBpZCk/LmNvbG9yIHx8ICcjM2Q1YWZlJztcbmNvbnN0IGluaXRpYWxzID0gKG4pID0+IG4ucmVwbGFjZSgvXkRyXFwuP1xccysvaSwgJycpLnNwbGl0KC9cXHMrLykubWFwKChwKSA9PiBwWzBdKS5zbGljZSgwLCAyKS5qb2luKCcnKS50b1VwcGVyQ2FzZSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gVm9pY2VDYXJvdXNlbCgpIHtcbiAgY29uc3QgbWVtYmVyID0gdXNlTWVtYmVyUmV2aWV3cygpO1xuICBjb25zdCBhbGwgPSB1c2VNZW1vKCgpID0+IFtcbiAgICAuLi5tZW1iZXIubWFwKChtKSA9PiAoeyAuLi5tLCByb2xlOiBtLmRlc2lnbmF0aW9uLCBhdWRpZW5jZTogUk9MRV9UT19BVURbbS5yb2xlVHlwZV0gfHwgJ3BhdGllbnRzJywgbWVtYmVyOiB0cnVlIH0pKSxcbiAgICAuLi5URVNUSU1PTklBTFMsXG4gIF0sIFttZW1iZXJdKTtcbiAgY29uc3QgW2F1ZCwgc2V0QXVkXSA9IHVzZVN0YXRlKCdhbGwnKTtcbiAgY29uc3QgbGlzdCA9IHVzZU1lbW8oKCkgPT4gKGF1ZCA9PT0gJ2FsbCcgPyBhbGwgOiBhbGwuZmlsdGVyKCh0KSA9PiB0LmF1ZGllbmNlID09PSBhdWQpKS5zbGljZSgwLCAxMiksIFthbGwsIGF1ZF0pO1xuICBjb25zdCBuID0gTWF0aC5tYXgobGlzdC5sZW5ndGgsIDMpO1xuICBjb25zdCBbc3RlcCwgc2V0U3RlcF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3BhdXNlZCwgc2V0UGF1c2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgdXNlRWZmZWN0KCgpID0+IHNldFN0ZXAoMCksIFthdWRdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocGF1c2VkKSByZXR1cm47XG4gICAgY29uc3QgdCA9IHNldEludGVydmFsKCgpID0+ICFkb2N1bWVudC5oaWRkZW4gJiYgc2V0U3RlcCgocykgPT4gcyArIDEpLCA0MjAwKTtcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbCh0KTtcbiAgfSwgW3BhdXNlZF0pO1xuICBjb25zdCBmcm9udCA9ICgoc3RlcCAlIG4pICsgbikgJSBuO1xuICBjb25zdCBjdXIgPSBsaXN0W2Zyb250XSB8fCBsaXN0WzBdO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidmNhclwiIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0UGF1c2VkKHRydWUpfSBvbk1vdXNlTGVhdmU9eygpID0+IHNldFBhdXNlZChmYWxzZSl9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoYi1maWx0ZXJzXCIgcm9sZT1cInRhYmxpc3RcIiBhcmlhLWxhYmVsPVwiRmlsdGVyIG1lbWJlciB2b2ljZXNcIj5cbiAgICAgICAgPGJ1dHRvbiByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17YXVkID09PSAnYWxsJ30gY2xhc3NOYW1lPXthdWQgPT09ICdhbGwnID8gJ29uJyA6ICcnfSBvbkNsaWNrPXsoKSA9PiBzZXRBdWQoJ2FsbCcpfT5FdmVyeW9uZTwvYnV0dG9uPlxuICAgICAgICB7QVVESUVOQ0VTLm1hcCgoYSkgPT4gKFxuICAgICAgICAgIDxidXR0b24ga2V5PXthLmlkfSByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17YXVkID09PSBhLmlkfSBjbGFzc05hbWU9e2F1ZCA9PT0gYS5pZCA/ICdvbicgOiAnJ30gc3R5bGU9e3sgJy0tYyc6IGEuY29sb3IgfX0gb25DbGljaz17KCkgPT4gc2V0QXVkKGEuaWQpfT57YS5sYWJlbH08L2J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxMaXZlWm9uZSBjbGFzc05hbWU9XCJ2Yy1zdGFnZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZjLXJpbmdcIiBzdHlsZT17eyAnLS1uJzogbiwgJy0tcm90JzogYCR7LXN0ZXAgKiAoMzYwIC8gbil9ZGVnYCB9fT5cbiAgICAgICAgICB7bGlzdC5tYXAoKHQsIGkpID0+IChcbiAgICAgICAgICAgIDxmaWd1cmUga2V5PXsodC5pZCB8fCB0Lm5hbWUpICsgaX0gY2xhc3NOYW1lPXtgdmMtY2FyZCAke2kgPT09IGZyb250ID8gJ2Zyb250JyA6ICcnfWB9IHN0eWxlPXt7ICctLWknOiBpLCAnLS1jJzogYXVkQ29sb3IodC5hdWRpZW5jZSkgfX0gb25DbGljaz17KCkgPT4gc2V0U3RlcChzdGVwICsgKChpIC0gZnJvbnQgKyBuKSAlIG4gPD0gbiAvIDIgPyAoaSAtIGZyb250ICsgbikgJSBuIDogKGkgLSBmcm9udCArIG4pICUgbiAtIG4pKX0+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhiLWF2YXRhclwiPntpbml0aWFscyh0Lm5hbWUpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPGI+e3QubmFtZX08L2I+XG4gICAgICAgICAgICAgIDxzbWFsbD57dC5yb2xlfTwvc21hbGw+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZjLWZsYWdcIj48RmxhZyBjb2RlPXt0LmNjfSBuYW1lPXt0LmNvdW50cnl9IHNpemU9ezI2fSAvPjxlbT57dC5jb3VudHJ5fTwvZW0+PC9zcGFuPlxuICAgICAgICAgICAgICA8U3RhcnMgdmFsdWU9e3QucmF0aW5nfSBzaXplPXsxM30gLz5cbiAgICAgICAgICAgIDwvZmlndXJlPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2Yy1mbG9vclwiIC8+XG4gICAgICA8L0xpdmVab25lPlxuICAgICAge2N1ciAmJiAoXG4gICAgICAgIDxmaWd1cmUgY2xhc3NOYW1lPVwidmMtcXVvdGVcIiBrZXk9eyhjdXIuaWQgfHwgY3VyLm5hbWUpICsgZnJvbnR9IHN0eWxlPXt7ICctLWMnOiBhdWRDb2xvcihjdXIuYXVkaWVuY2UpIH19PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZjcS1tYXJrXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PEljb24gbmFtZT1cInF1b3RlXCIgc2l6ZT17Mjh9IC8+PC9zcGFuPlxuICAgICAgICAgIDxibG9ja3F1b3RlPjxwPntjdXIucXVvdGV9PC9wPjwvYmxvY2txdW90ZT5cbiAgICAgICAgICA8ZmlnY2FwdGlvbj5cbiAgICAgICAgICAgIDxGbGFnIGNvZGU9e2N1ci5jY30gbmFtZT17Y3VyLmNvdW50cnl9IHNpemU9ezMwfSAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmNxLXdob1wiPjxiPntjdXIubmFtZX08L2I+e2N1ci5jb21wYW55ID8gYCBcdTAwQjcgJHtjdXIuY29tcGFueX1gIDogJyd9PHNtYWxsPntjdXIuY291bnRyeX0gXHUwMEI3IHtjdXIucm9sZX08L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgICAgIDxTdGFycyB2YWx1ZT17Y3VyLnJhdGluZ30gc2l6ZT17MTZ9IC8+XG4gICAgICAgICAgICB7Y3VyLm1lbWJlciAmJiA8c3BhbiBjbGFzc05hbWU9XCJoYi1uZXdcIj5OZXcgcmV2aWV3PC9zcGFuPn1cbiAgICAgICAgICA8L2ZpZ2NhcHRpb24+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2Yy1uYXZcIj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0U3RlcChzdGVwIC0gMSl9IGFyaWEtbGFiZWw9XCJQcmV2aW91cyByZXZpZXdcIj48SWNvbiBuYW1lPVwiYXJyb3dMZWZ0XCIgc2l6ZT17MTh9IC8+PC9idXR0b24+XG4gICAgICAgICAgICA8c3Bhbj57U3RyaW5nKGZyb250ICsgMSkucGFkU3RhcnQoMiwgJzAnKX0gLyB7U3RyaW5nKGxpc3QubGVuZ3RoKS5wYWRTdGFydCgyLCAnMCcpfTwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0U3RlcChzdGVwICsgMSl9IGFyaWEtbGFiZWw9XCJOZXh0IHJldmlld1wiPjxJY29uIG5hbWU9XCJhcnJvd1wiIHNpemU9ezE4fSAvPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2ZpZ3VyZT5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0gM0QgZmxhZyBnbG9iZSAtLS0tLS0tLS0tLS0tLS0tICovXG5leHBvcnQgZnVuY3Rpb24gRmxhZ0dsb2JlKCkge1xuICBjb25zdCBbYWN0aXZlLCBzZXRBY3RpdmVdID0gdXNlU3RhdGUoJ2FsbCcpO1xuICBjb25zdCBwdHMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBhbGwgPSBSRUdJT05TLmZsYXRNYXAoKHIpID0+IHIuY291bnRyaWVzLm1hcCgoW2NvZGUsIG5hbWVdKSA9PiAoeyBjb2RlLCBuYW1lLCByZWdpb246IHIuaWQsIGNvbG9yOiByLmNvbG9yIH0pKSk7XG4gICAgY29uc3QgTiA9IGFsbC5sZW5ndGg7XG4gICAgcmV0dXJuIGFsbC5tYXAoKGMsIGkpID0+IHtcbiAgICAgIGNvbnN0IHkgPSAxIC0gKGkgLyAoTiAtIDEpKSAqIDI7XG4gICAgICBjb25zdCBsYXQgPSBNYXRoLmFzaW4oeSkgKiAoMTgwIC8gTWF0aC5QSSk7XG4gICAgICBjb25zdCBsb24gPSAoaSAqIDEzNy41MDgpICUgMzYwO1xuICAgICAgcmV0dXJuIHsgLi4uYywgbGF0LCBsb24gfTtcbiAgICB9KTtcbiAgfSwgW10pO1xuICBjb25zdCByZWdpb24gPSBSRUdJT05TLmZpbmQoKHIpID0+IHIuaWQgPT09IGFjdGl2ZSk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BmZ2xvYmUtd3JhcCAke2FjdGl2ZSAhPT0gJ2FsbCcgPyAnaGFzLWZvY3VzJyA6ICcnfWB9PlxuICAgICAgPExpdmVab25lIGNsYXNzTmFtZT1cImZnbG9iZS1zdGFnZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZnLXN0YXJzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmZy1hdG1vXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmZ2xvYmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZnLXNwaW5cIj5cbiAgICAgICAgICAgIHtwdHMubWFwKChwKSA9PiAoXG4gICAgICAgICAgICAgIDxzcGFuIGtleT17cC5jb2RlfSBjbGFzc05hbWU9e2BmZy1wdCAke2FjdGl2ZSA9PT0gJ2FsbCcgfHwgYWN0aXZlID09PSBwLnJlZ2lvbiA/ICdvbicgOiAnJ31gfSBzdHlsZT17eyB0cmFuc2Zvcm06IGByb3RhdGVZKCR7cC5sb259ZGVnKSByb3RhdGVYKCR7cC5sYXR9ZGVnKSB0cmFuc2xhdGVaKHZhcigtLVIpKWAsICctLWMnOiBwLmNvbG9yIH19PlxuICAgICAgICAgICAgICAgIDxGbGFnIGNvZGU9e3AuY29kZX0gc2l6ZT17Mjh9IC8+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmctZXF1YXRvclwiIC8+PHNwYW4gY2xhc3NOYW1lPVwiZmctbWVyaWRpYW5cIiAvPjxzcGFuIGNsYXNzTmFtZT1cImZnLW1lcmlkaWFuIG0yXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmZy1jb3JlXCI+PEhlYXJ0TWFyayBzaXplPXs2NH0gLz48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZnLWNvdW50XCI+XG4gICAgICAgICAgPHN0cm9uZz57cmVnaW9uID8gcmVnaW9uLmNvdW50cmllcy5sZW5ndGggOiBDT1ZFUkFHRV9DT1VOVH08L3N0cm9uZz5cbiAgICAgICAgICA8c3Bhbj57cmVnaW9uID8gcmVnaW9uLm5hbWUgOiAnY291bnRyaWVzIFx1MDBCNyA1IHJlZ2lvbnMnfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0xpdmVab25lPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWdpb24tdGFic1wiIHJvbGU9XCJ0YWJsaXN0XCIgYXJpYS1sYWJlbD1cIlJlZ2lvbnNcIj5cbiAgICAgICAgPGJ1dHRvbiByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17YWN0aXZlID09PSAnYWxsJ30gY2xhc3NOYW1lPXthY3RpdmUgPT09ICdhbGwnID8gJ29uJyA6ICcnfSBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmUoJ2FsbCcpfSBzdHlsZT17eyAnLS1jJzogJyMwYjFiM2YnIH19PkFsbCByZWdpb25zPC9idXR0b24+XG4gICAgICAgIHtSRUdJT05TLm1hcCgocikgPT4gKFxuICAgICAgICAgIDxidXR0b24ga2V5PXtyLmlkfSByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17YWN0aXZlID09PSByLmlkfSBjbGFzc05hbWU9e2FjdGl2ZSA9PT0gci5pZCA/ICdvbicgOiAnJ30gb25DbGljaz17KCkgPT4gc2V0QWN0aXZlKHIuaWQpfSBzdHlsZT17eyAnLS1jJzogci5jb2xvciB9fT5cbiAgICAgICAgICAgIHtyLm5hbWV9IDxlbT57ci5jb3VudHJpZXMubGVuZ3RofTwvZW0+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsYWctY2xvdWRcIj5cbiAgICAgICAge1JFR0lPTlMuZmlsdGVyKChyKSA9PiBhY3RpdmUgPT09ICdhbGwnIHx8IHIuaWQgPT09IGFjdGl2ZSkuZmxhdE1hcCgocikgPT4gci5jb3VudHJpZXMubWFwKChbY29kZSwgbmFtZV0sIGkpID0+IChcbiAgICAgICAgICA8c3BhbiBrZXk9e2NvZGV9IGNsYXNzTmFtZT1cImZjbFwiIHN0eWxlPXt7ICctLWMnOiByLmNvbG9yLCAnLS1pJzogaSB9fT48RmxhZyBjb2RlPXtjb2RlfSBuYW1lPXtuYW1lfSBzaXplPXsyOH0gLz57bmFtZX08L3NwYW4+XG4gICAgICAgICkpKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwgIi8vIE51bWJlciB0aGF0IGNvdW50cyB1cCB3aGVuIHNjcm9sbGVkIGludG8gdmlldy4gUmVuZGVycyB0aGUgZmluYWwgdmFsdWUgb24gdGhlIHNlcnZlciAoU0VPL25vLUpTKS5cbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VJblZpZXcsIHVzZU1vdW50ZWQgfSBmcm9tICcuL3VpLmpzeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvdW50ZXIoeyB2YWx1ZSwgcHJlZml4ID0gJycsIHN1ZmZpeCA9ICcnLCBkdXJhdGlvbiA9IDE0MDAgfSkge1xuICBjb25zdCBbcmVmLCBpblZpZXddID0gdXNlSW5WaWV3KHsgdGhyZXNob2xkOiAwLjQgfSk7XG4gIGNvbnN0IG1vdW50ZWQgPSB1c2VNb3VudGVkKCk7XG4gIGNvbnN0IFtuLCBzZXROXSA9IHVzZVN0YXRlKHZhbHVlKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW1vdW50ZWQpIHJldHVybjtcbiAgICBpZiAoIWluVmlldykgeyBzZXROKDApOyByZXR1cm47IH1cbiAgICBjb25zdCByZWR1Y2UgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzO1xuICAgIGlmIChyZWR1Y2UpIHsgc2V0Tih2YWx1ZSk7IHJldHVybjsgfVxuICAgIGxldCByYWY7XG4gICAgY29uc3QgdDAgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBjb25zdCB0aWNrID0gKHQpID0+IHtcbiAgICAgIGNvbnN0IHAgPSBNYXRoLm1pbigodCAtIHQwKSAvIGR1cmF0aW9uLCAxKTtcbiAgICAgIHNldE4oTWF0aC5yb3VuZCh2YWx1ZSAqICgxIC0gTWF0aC5wb3coMSAtIHAsIDMpKSkpO1xuICAgICAgaWYgKHAgPCAxKSByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgfTtcbiAgICByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgcmV0dXJuICgpID0+IGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gIH0sIFtpblZpZXcsIG1vdW50ZWQsIHZhbHVlLCBkdXJhdGlvbl0pO1xuICByZXR1cm4gKFxuICAgIDxzcGFuIHJlZj17cmVmfSBjbGFzc05hbWU9XCJjb3VudGVyXCI+XG4gICAgICB7cHJlZml4fXtuLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycpfXtzdWZmaXh9XG4gICAgPC9zcGFuPlxuICApO1xufVxuIiwgIi8vIHYzIGhvbWUgc2VjdGlvbnMgXHUyMDE0IGVhY2ggb25lIGhhcyBpdHMgb3duIHZpc3VhbCBpZGVhIHNvIG5vIHR3byBzZWN0aW9ucyBzaGFyZSBhIHRlbXBsYXRlOlxuLy8gICBSZXdhcmRTbG90ICAgICBcIkdldCByZXdhcmRlZCB5b3VyIHdheVwiIGFzIGEgcmV3YXJkIHNsb3QgbWFjaGluZSAocHVsbCB0aGUgbGV2ZXIpXG4vLyAgIENoYW5uZWxIdWIgICAgIGludml0YXRpb25zIHRyYXZlbGxpbmcgZnJvbSBmb3VyIGNoYW5uZWxzIGludG8gYSBwaG9uZVxuLy8gICBWb2ljZVdhbGwgICAgICBzcG90bGlnaHQgdGVzdGltb25pYWwgKyB0aHJlZSBzY3JvbGxpbmcgcmV2aWV3IGNvbHVtbnNcbi8vICAgQ2hhdEZhcSAgICAgICAgcXVpY2sgYW5zd2VycyBhcyBhIGNoYXQgd2l0aCBvdXIgaGVscCBkZXNrXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSWNvbiBmcm9tICcuL0ljb24uanN4JztcbmltcG9ydCBQZXJzb25hIGZyb20gJy4vUGVyc29uYS5qc3gnO1xuaW1wb3J0IHsgRmxhZywgU3RhcnMsIExpdmVab25lLCB1c2VJblZpZXcgfSBmcm9tICcuL3VpLmpzeCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAnLi4vcm91dGVyLmpzeCc7XG5pbXBvcnQgeyBURVNUSU1PTklBTFMsIEFVRElFTkNFUyB9IGZyb20gJy4uL2RhdGEvdGVzdGltb25pYWxzLmpzJztcbmltcG9ydCB7IE5PVElGWV9DSEFOTkVMUyB9IGZyb20gJy4uL2RhdGEvcmV3YXJkcy5qcyc7XG5pbXBvcnQgeyB1c2VNZW1iZXJSZXZpZXdzIH0gZnJvbSAnLi4vdXRpbHMvcmV2aWV3cy5qcyc7XG5pbXBvcnQgeyBwb3AgfSBmcm9tICcuLi91dGlscy9oZWxwZXJzLmpzJztcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAxLiBSZXdhcmQgc2xvdCBtYWNoaW5lXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmV4cG9ydCBjb25zdCBSRVdBUkRfVFlQRVMgPSBbXG4gIHsgaWQ6ICdzaG9wcGluZycsIHQ6ICdTaG9wcGluZyBWb3VjaGVycycsIGljb246ICdiYWcnLCBjOiAnI2ZmN2ExYScgfSxcbiAgeyBpZDogJ2Nhc2gnLCB0OiAnQ2FzaCBSZXdhcmRzJywgaWNvbjogJ3dhbGxldCcsIGM6ICcjMTZhMzRhJyB9LFxuICB7IGlkOiAnZ3JvY2VyeScsIHQ6ICdHcm9jZXJ5IFZvdWNoZXJzJywgaWNvbjogJ2hvbWUnLCBjOiAnI2Y1OWUwYicgfSxcbiAgeyBpZDogJ2JhbmsnLCB0OiAnQmFuayBUcmFuc2ZlcicsIGljb246ICdiYW5rJywgYzogJyMwZjc2NmUnIH0sXG4gIHsgaWQ6ICdwYXlwYWwnLCB0OiAnUGF5UGFsJywgaWNvbjogJ3BheXBhbCcsIGM6ICcjMDA3MGUwJyB9LFxuICB7IGlkOiAnd2lyZScsIHQ6ICdXaXJlIFRyYW5zZmVyJywgaWNvbjogJ2JhbmsnLCBjOiAnIzBmNzY2ZScgfSxcbiAgeyBpZDogJ3VwaScsIHQ6ICdVUEkgKEluZGlhKScsIGljb246ICd1cGknLCBjOiAnIzVmMjU5ZicgfSxcbiAgeyBpZDogJ3JlcG9ydCcsIHQ6ICdNZWRpY2FsIFJlcG9ydCcsIGljb246ICdjbGlwYm9hcmQnLCBjOiAnI2RiMjc3NycgfSxcbiAgeyBpZDogJ2RpZ2l0YWwnLCB0OiAnRGlnaXRhbCBHaWZ0IENhcmRzJywgaWNvbjogJ2NhcmQnLCBjOiAnIzdjM2FlZCcgfSxcbl07XG5jb25zdCBOID0gUkVXQVJEX1RZUEVTLmxlbmd0aDtcbmNvbnN0IElURU1fSCA9IDkyO1xuXG5mdW5jdGlvbiBSZWVsKHsgdGFyZ2V0LCBmcm9tLCBzcGlubmluZywgZGVsYXkgfSkge1xuICBjb25zdCBzdHJpcCA9IHVzZU1lbW8oKCkgPT4gWy4uLlJFV0FSRF9UWVBFUywgLi4uUkVXQVJEX1RZUEVTLCAuLi5SRVdBUkRfVFlQRVMsIC4uLlJFV0FSRF9UWVBFU10sIFtdKTtcbiAgY29uc3Qgb2Zmc2V0ID0gc3Bpbm5pbmcgPyAyNyArIHRhcmdldCA6IGZyb207XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyZWVsXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlZWwtc3RyaXBcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHstKG9mZnNldCAtIDEpICogSVRFTV9IfXB4KWAsXG4gICAgICAgICAgdHJhbnNpdGlvbjogc3Bpbm5pbmcgPyBgdHJhbnNmb3JtICR7MS42ICsgZGVsYXl9cyBjdWJpYy1iZXppZXIoLjE3LC42NywuMjQsMS4wMilgIDogJ25vbmUnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7c3RyaXAubWFwKChyLCBpKSA9PiAoXG4gICAgICAgICAgPHNwYW4ga2V5PXtpfSBjbGFzc05hbWU9XCJyZWVsLWl0ZW1cIiBzdHlsZT17eyAnLS1jJzogci5jIH19PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmktaWNcIj48SWNvbiBuYW1lPXtyLmljb259IHNpemU9ezI2fSAvPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzbWFsbD57ci50fTwvc21hbGw+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmV3YXJkU2xvdCgpIHtcbiAgY29uc3QgW3JlZiwgaW5WaWV3XSA9IHVzZUluVmlldyh7IHRocmVzaG9sZDogMC4zNSB9KTtcbiAgY29uc3QgW3RhcmdldHMsIHNldFRhcmdldHNdID0gdXNlU3RhdGUoWzAsIDQsIDZdKTtcbiAgY29uc3QgW2Zyb20sIHNldEZyb21dID0gdXNlU3RhdGUoWzAsIDQsIDZdKTtcbiAgY29uc3QgW3NwaW5uaW5nLCBzZXRTcGlubmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt3b24sIHNldFdvbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwdWxsZWQsIHNldFB1bGxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGJ1c3kgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBmaXJzdCA9IHVzZVJlZih0cnVlKTtcblxuICBjb25zdCBzcGluID0gKHNvdW5kID0gdHJ1ZSkgPT4ge1xuICAgIGlmIChidXN5LmN1cnJlbnQpIHJldHVybjtcbiAgICBidXN5LmN1cnJlbnQgPSB0cnVlO1xuICAgIHNldFdvbihmYWxzZSk7XG4gICAgc2V0UHVsbGVkKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0UHVsbGVkKGZhbHNlKSwgNDUwKTtcbiAgICBjb25zdCBuZXh0ID0gdGFyZ2V0cy5tYXAoKHQsIGkpID0+ICh0ICsgMiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChOIC0gMikpICsgaSkgJSBOKTtcbiAgICBzZXRGcm9tKHRhcmdldHMpO1xuICAgIHNldFNwaW5uaW5nKGZhbHNlKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHNldFRhcmdldHMobmV4dCk7XG4gICAgICAgIHNldFNwaW5uaW5nKHRydWUpO1xuICAgICAgfSlcbiAgICApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0U3Bpbm5pbmcoZmFsc2UpO1xuICAgICAgc2V0RnJvbShuZXh0KTtcbiAgICAgIHNldFdvbih0cnVlKTtcbiAgICAgIGJ1c3kuY3VycmVudCA9IGZhbHNlO1xuICAgICAgaWYgKHNvdW5kKSBwb3AoMC4xKTtcbiAgICB9LCAyNjAwKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpblZpZXcgJiYgZmlyc3QuY3VycmVudCkge1xuICAgICAgZmlyc3QuY3VycmVudCA9IGZhbHNlO1xuICAgICAgY29uc3QgdCA9IHNldFRpbWVvdXQoKCkgPT4gc3BpbihmYWxzZSksIDQwMCk7XG4gICAgICByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHQpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIH0sIFtpblZpZXddKTtcblxuICBjb25zdCBzaG93biA9IG5ldyBTZXQod29uID8gdGFyZ2V0cy5tYXAoKHQpID0+IFJFV0FSRF9UWVBFU1t0XS5pZCkgOiBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNsb3Qtd3JhcFwiIHJlZj17cmVmfT5cbiAgICAgIDxMaXZlWm9uZSBjbGFzc05hbWU9e2BzbG90ICR7d29uID8gJ2lzLXdvbicgOiAnJ31gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbG90LXNpZ25cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzbG90LWJ1bGJzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+e0FycmF5LmZyb20oeyBsZW5ndGg6IDE4IH0pLm1hcCgoXywgaSkgPT4gPGkga2V5PXtpfSBzdHlsZT17eyAnLS1pJzogaSB9fSAvPil9PC9zcGFuPlxuICAgICAgICAgIDxiPlJld2FyZCBtYWNoaW5lPC9iPlxuICAgICAgICAgIDxzbWFsbD5wdWxsIHRoZSBsZXZlcjwvc21hbGw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsb3Qtd2luZG93XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2xvdC1saW5lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICB7WzAsIDEsIDJdLm1hcCgoaSkgPT4gPFJlZWwga2V5PXtpfSB0YXJnZXQ9e3RhcmdldHNbaV19IGZyb209e2Zyb21baV19IHNwaW5uaW5nPXtzcGlubmluZ30gZGVsYXk9e2kgKiAwLjM1fSAvPil9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNsb3QtdHJheVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiA4IH0pLm1hcCgoXywgaSkgPT4gPGkga2V5PXtpfSBjbGFzc05hbWU9XCJ0cmF5LWNvaW5cIiBzdHlsZT17eyAnLS1pJzogaSB9fSAvPil9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YHNsb3QtbGV2ZXIgJHtwdWxsZWQgPyAnaXMtcHVsbGVkJyA6ICcnfWB9IG9uQ2xpY2s9eygpID0+IHNwaW4odHJ1ZSl9IGFyaWEtbGFiZWw9XCJTcGluIHRoZSByZXdhcmQgbWFjaGluZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImx2LXN0aWNrXCIgLz48c3BhbiBjbGFzc05hbWU9XCJsdi1rbm9iXCIgLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInNyLW9ubHlcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj57d29uID8gYFNob3dpbmcgJHt0YXJnZXRzLm1hcCgodCkgPT4gUkVXQVJEX1RZUEVTW3RdLnQpLmpvaW4oJywgJyl9YCA6ICcnfTwvcD5cbiAgICAgIDwvTGl2ZVpvbmU+XG5cbiAgICAgIDx1bCBjbGFzc05hbWU9XCJyZXdhcmQtZ3JpZFwiPlxuICAgICAgICB7UkVXQVJEX1RZUEVTLm1hcCgociwgaSkgPT4gKFxuICAgICAgICAgIDxsaSBrZXk9e3IuaWR9IGNsYXNzTmFtZT17c2hvd24uaGFzKHIuaWQpID8gJ2hpdCcgOiAnJ30gc3R5bGU9e3sgJy0tYyc6IHIuYywgJy0taSc6IGkgfX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZy1pY1wiPjxJY29uIG5hbWU9e3IuaWNvbn0gc2l6ZT17MjJ9IC8+PC9zcGFuPlxuICAgICAgICAgICAgPGI+e3IudH08L2I+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICAgIDxsaSBjbGFzc05hbWU9XCJyZy1ub3RlXCI+PEljb24gbmFtZT1cImluZm9cIiBzaXplPXsxNn0gLz48c3Bhbj5VUEkgcGF5b3V0cyBhcmUgYXZhaWxhYmxlIGZvciBtZW1iZXJzIGluIEluZGlhLjwvc3Bhbj48L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICA0LiBDaGFubmVsIGh1YiBcdTIwMTQgaW52aXRhdGlvbnMgZmx5IGludG8gdGhlIHBob25lXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmNvbnN0IENIID0ge1xuICBkYXNoYm9hcmQ6IHsgaWNvbjogJ2Rhc2hib2FyZCcsIGM6ICcjN2MzYWVkJywgdGl0bGU6ICdOZXcgc3R1ZHkgbWF0Y2hlZCB0byB5b3VyIHByb2ZpbGUnLCBzdWI6ICdIZWFsdGggJiB3ZWxsbmVzcyBcdTAwQjcgYWJvdXQgMTIgbWluJyB9LFxuICBzbXM6IHsgaWNvbjogJ3NtcycsIGM6ICcjZjU5ZTBiJywgdGl0bGU6ICdNSE86IGEgbmV3IHN1cnZleSBpcyB3YWl0aW5nIGZvciB5b3UnLCBzdWI6ICdUYXAgdG8gc2VlIHRvcGljLCB0aW1lIGFuZCByZXdhcmQnIH0sXG4gIHdoYXRzYXBwOiB7IGljb246ICd3aGF0c2FwcCcsIGM6ICcjMjJjNTVlJywgdGl0bGU6ICdNeUhlYWx0aE9waW5pb25zJywgc3ViOiAnQSBzdHVkeSB0aGF0IGZpdHMgeW91ciBwcm9maWxlIGp1c3Qgb3BlbmVkJyB9LFxuICBlbWFpbDogeyBpY29uOiAnbWFpbCcsIGM6ICcjMjQ1N2Y1JywgdGl0bGU6ICdZb3VyIG5leHQgc3VydmV5IGludml0YXRpb24nLCBzdWI6ICdUb3BpYywgZXN0aW1hdGVkIHRpbWUgYW5kIHJld2FyZCBpbnNpZGUnIH0sXG59O1xuY29uc3QgUEFUSFMgPSBbXG4gICdNMTIwIDcwIEMgMjYwIDcwLCAzMDAgMTgwLCA0MjAgMjAwJyxcbiAgJ004ODAgNzAgQyA3NDAgNzAsIDcwMCAxODAsIDU4MCAyMDAnLFxuICAnTTEyMCAzMzAgQyAyNjAgMzMwLCAzMDAgMjQwLCA0MjAgMjIwJyxcbiAgJ004ODAgMzMwIEMgNzQwIDMzMCwgNzAwIDI0MCwgNTgwIDIyMCcsXG5dO1xuZXhwb3J0IGZ1bmN0aW9uIENoYW5uZWxIdWIoKSB7XG4gIGNvbnN0IFtyZWYsIGluVmlld10gPSB1c2VJblZpZXcoeyB0aHJlc2hvbGQ6IDAuMyB9LCBmYWxzZSk7XG4gIGNvbnN0IFtpLCBzZXRJXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbZmVlZCwgc2V0RmVlZF0gPSB1c2VTdGF0ZShbeyBrOiAwLCBjOiAwIH1dKTtcbiAgY29uc3QgZ28gPSAoaykgPT4ge1xuICAgIHNldEkoayk7XG4gICAgc2V0RmVlZCgoZikgPT4gW3sgazogRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCksIGM6IGsgfSwgLi4uZl0uc2xpY2UoMCwgMykpO1xuICB9O1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaW5WaWV3KSByZXR1cm47XG4gICAgY29uc3QgdCA9IHNldEludGVydmFsKCgpID0+IHNldEkoKHgpID0+IHsgY29uc3QgbiA9ICh4ICsgMSkgJSA0OyBzZXRGZWVkKChmKSA9PiBbeyBrOiBEYXRlLm5vdygpLCBjOiBuIH0sIC4uLmZdLnNsaWNlKDAsIDMpKTsgcmV0dXJuIG47IH0pLCAyNjAwKTtcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbCh0KTtcbiAgfSwgW2luVmlld10pO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaHViXCIgcmVmPXtyZWZ9PlxuICAgICAgPHN2ZyBjbGFzc05hbWU9XCJodWItd2lyZXNcIiB2aWV3Qm94PVwiMCAwIDEwMDAgNDAwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAge1BBVEhTLm1hcCgoZCwgaykgPT4gKFxuICAgICAgICAgIDxnIGtleT17a30gY2xhc3NOYW1lPXtrID09PSBpID8gJ29uJyA6ICcnfSBzdHlsZT17eyAnLS1jJzogQ0hbTk9USUZZX0NIQU5ORUxTW2tdLmlkXS5jIH19PlxuICAgICAgICAgICAgPHBhdGggZD17ZH0gY2xhc3NOYW1lPVwiaHctcGF0aFwiIC8+XG4gICAgICAgICAgICA8Y2lyY2xlIHI9XCI3XCIgY2xhc3NOYW1lPVwiaHctZG90XCI+PGFuaW1hdGVNb3Rpb24gZHVyPVwiMi42c1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIHBhdGg9e2R9IC8+PC9jaXJjbGU+XG4gICAgICAgICAgPC9nPlxuICAgICAgICApKX1cbiAgICAgIDwvc3ZnPlxuICAgICAge05PVElGWV9DSEFOTkVMUy5tYXAoKGMsIGspID0+IChcbiAgICAgICAgPGJ1dHRvbiBrZXk9e2MuaWR9IGNsYXNzTmFtZT17YGh1Yi1ub2RlIGhuLSR7a30gJHtrID09PSBpID8gJ29uJyA6ICcnfWB9IHN0eWxlPXt7ICctLWMnOiBDSFtjLmlkXS5jIH19IG9uQ2xpY2s9eygpID0+IGdvKGspfT5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJobi1pY1wiPjxJY29uIG5hbWU9e0NIW2MuaWRdLmljb259IHNpemU9ezIyfSAvPjxpIC8+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhuLXR4dFwiPjxiPntjLm5hbWV9PC9iPjxzbWFsbD57Yy5ibHVyYn08L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApKX1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaHViLXBob25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhwLW5vdGNoXCIgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaHAtdGltZVwiPjk6NDE8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhwLWRhdGVcIj5UdWVzZGF5LCBuZXcgc3R1ZGllcyB3YWl0aW5nPC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhwLXN0YWNrXCI+XG4gICAgICAgICAge2ZlZWQubWFwKChmLCBkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjID0gQ0hbTk9USUZZX0NIQU5ORUxTW2YuY10uaWRdO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Yua30gY2xhc3NOYW1lPVwiaHAtbm90ZVwiIHN0eWxlPXt7ICctLWQnOiBkLCAnLS1jJzogYy5jIH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhwbi1pY1wiPjxJY29uIG5hbWU9e2MuaWNvbn0gc2l6ZT17MTZ9IC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhwbi10XCI+PGI+e2MudGl0bGV9PC9iPjxzbWFsbD57Yy5zdWJ9PC9zbWFsbD48L3NwYW4+XG4gICAgICAgICAgICAgICAgPGVtPntkID09PSAwID8gJ25vdycgOiBgJHtkICogM31tYH08L2VtPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJocC1yaW5nXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIDcuIFZvaWNlIHdhbGwgXHUyMDE0IHRlc3RpbW9uaWFsc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5jb25zdCBST0xFX1RPX0FVRCA9IHsgaGNwOiAnZG9jdG9ycycsIGNhcmVnaXZlcjogJ2NhcmVnaXZlcnMnLCBwYXRpZW50OiAncGF0aWVudHMnIH07XG5jb25zdCBhdWRDb2xvciA9IChpZCkgPT4gQVVESUVOQ0VTLmZpbmQoKGEpID0+IGEuaWQgPT09IGlkKT8uY29sb3IgfHwgJyMyNDU3ZjUnO1xuY29uc3QgYXVkTGFiZWwgPSAoaWQpID0+IEFVRElFTkNFUy5maW5kKChhKSA9PiBhLmlkID09PSBpZCk/LmxhYmVsIHx8ICcnO1xuY29uc3QgaW5pdGlhbHMgPSAobikgPT4gbi5yZXBsYWNlKC9eRHJcXC4/XFxzKy9pLCAnJykuc3BsaXQoL1xccysvKS5tYXAoKHApID0+IHBbMF0pLnNsaWNlKDAsIDIpLmpvaW4oJycpLnRvVXBwZXJDYXNlKCk7XG5cbmZ1bmN0aW9uIE1pbmlDYXJkKHsgdCwgb25QaWNrLCBhY3RpdmUgfSkge1xuICByZXR1cm4gKFxuICAgIDxidXR0b24gY2xhc3NOYW1lPXtgdnctbWluaSAke2FjdGl2ZSA/ICdvbicgOiAnJ31gfSBzdHlsZT17eyAnLS1jJzogYXVkQ29sb3IodC5hdWRpZW5jZSkgfX0gb25DbGljaz17b25QaWNrfT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZtLXRvcFwiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2bS1hdlwiPntpbml0aWFscyh0Lm5hbWUpfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidm0td2hvXCI+PGI+e3QubmFtZX08L2I+PHNtYWxsPnt0LnJvbGV9PC9zbWFsbD48L3NwYW4+XG4gICAgICAgIDxGbGFnIGNvZGU9e3QuY2N9IG5hbWU9e3QuY291bnRyeX0gc2l6ZT17MjJ9IC8+XG4gICAgICA8L3NwYW4+XG4gICAgICA8U3RhcnMgdmFsdWU9e3QucmF0aW5nfSBzaXplPXsxMn0gLz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZtLXFcIj57dC5xdW90ZX08L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBWb2ljZVdhbGwoKSB7XG4gIGNvbnN0IG1lbWJlciA9IHVzZU1lbWJlclJldmlld3MoKTtcbiAgY29uc3QgYWxsID0gdXNlTWVtbygoKSA9PiBbXG4gICAgLi4ubWVtYmVyLm1hcCgobSkgPT4gKHsgLi4ubSwgcm9sZTogbS5kZXNpZ25hdGlvbiwgYXVkaWVuY2U6IFJPTEVfVE9fQVVEW20ucm9sZVR5cGVdIHx8ICdwYXRpZW50cycsIG1lbWJlcjogdHJ1ZSB9KSksXG4gICAgLi4uVEVTVElNT05JQUxTLFxuICBdLCBbbWVtYmVyXSk7XG4gIGNvbnN0IFthdWQsIHNldEF1ZF0gPSB1c2VTdGF0ZSgnYWxsJyk7XG4gIGNvbnN0IGxpc3QgPSB1c2VNZW1vKCgpID0+IChhdWQgPT09ICdhbGwnID8gYWxsIDogYWxsLmZpbHRlcigodCkgPT4gdC5hdWRpZW5jZSA9PT0gYXVkKSksIFthbGwsIGF1ZF0pO1xuICBjb25zdCBbcGljaywgc2V0UGlja10gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgaGVsZCA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IFtyZWYsIGluVmlld10gPSB1c2VJblZpZXcoeyB0aHJlc2hvbGQ6IDAuMiB9LCBmYWxzZSk7XG4gIHVzZUVmZmVjdCgoKSA9PiBzZXRQaWNrKDApLCBbYXVkXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpblZpZXcpIHJldHVybjtcbiAgICBjb25zdCB0ID0gc2V0SW50ZXJ2YWwoKCkgPT4gIWhlbGQuY3VycmVudCAmJiBzZXRQaWNrKChwKSA9PiAocCArIDEpICUgTWF0aC5tYXgobGlzdC5sZW5ndGgsIDEpKSwgNjAwMCk7XG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwodCk7XG4gIH0sIFtpblZpZXcsIGxpc3QubGVuZ3RoXSk7XG4gIGNvbnN0IGN1ciA9IGxpc3RbTWF0aC5taW4ocGljaywgbGlzdC5sZW5ndGggLSAxKV07XG4gIGNvbnN0IGNvbHMgPSBbMCwgMSwgMl0ubWFwKChjKSA9PiBsaXN0LmZpbHRlcigoXywgaSkgPT4gaSAlIDMgPT09IGMpKTtcbiAgY29uc3QgY2hvb3NlID0gKHQpID0+IHsgaGVsZC5jdXJyZW50ID0gdHJ1ZTsgc2V0UGljayhsaXN0LmluZGV4T2YodCkpOyB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ2d2FsbFwiIHJlZj17cmVmfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGItZmlsdGVyc1wiIHJvbGU9XCJ0YWJsaXN0XCIgYXJpYS1sYWJlbD1cIkZpbHRlciBtZW1iZXIgdm9pY2VzXCI+XG4gICAgICAgIDxidXR0b24gcm9sZT1cInRhYlwiIGFyaWEtc2VsZWN0ZWQ9e2F1ZCA9PT0gJ2FsbCd9IGNsYXNzTmFtZT17YXVkID09PSAnYWxsJyA/ICdvbicgOiAnJ30gb25DbGljaz17KCkgPT4gc2V0QXVkKCdhbGwnKX0+RXZlcnlvbmUgPGVtPnthbGwubGVuZ3RofTwvZW0+PC9idXR0b24+XG4gICAgICAgIHtBVURJRU5DRVMubWFwKChhKSA9PiAoXG4gICAgICAgICAgPGJ1dHRvbiBrZXk9e2EuaWR9IHJvbGU9XCJ0YWJcIiBhcmlhLXNlbGVjdGVkPXthdWQgPT09IGEuaWR9IGNsYXNzTmFtZT17YXVkID09PSBhLmlkID8gJ29uJyA6ICcnfSBzdHlsZT17eyAnLS1jJzogYS5jb2xvciB9fSBvbkNsaWNrPXsoKSA9PiBzZXRBdWQoYS5pZCl9PlxuICAgICAgICAgICAge2EubGFiZWx9IDxlbT57YWxsLmZpbHRlcigodCkgPT4gdC5hdWRpZW5jZSA9PT0gYS5pZCkubGVuZ3RofTwvZW0+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInZ3LWdyaWQyXCI+XG4gICAgICAgIHtjdXIgJiYgKFxuICAgICAgICAgIDxmaWd1cmUgY2xhc3NOYW1lPVwidnctc3BvdFwiIGtleT17KGN1ci5pZCB8fCBjdXIubmFtZSkgKyBhdWR9IHN0eWxlPXt7ICctLWMnOiBhdWRDb2xvcihjdXIuYXVkaWVuY2UpIH19PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidnMtZ2xvd1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2cy10YWdcIj57YXVkTGFiZWwoY3VyLmF1ZGllbmNlKX17Y3VyLm1lbWJlciAmJiA8ZW0+TmV3IHJldmlldzwvZW0+fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidnMtcXVvdGVcIiB2aWV3Qm94PVwiMCAwIDQwIDMyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHBhdGggZD1cIk0wIDMyVjE4QzAgOCA2IDEgMTYgMGwyIDVjLTYgMi05IDYtOSAxMmg4djE1em0yMiAwVjE4YzAtMTAgNi0xNyAxNi0xOGwyIDVjLTYgMi05IDYtOSAxMmg4djE1elwiIC8+PC9zdmc+XG4gICAgICAgICAgICA8YmxvY2txdW90ZT48cD57Y3VyLnF1b3RlfTwvcD48L2Jsb2NrcXVvdGU+XG4gICAgICAgICAgICA8U3RhcnMgdmFsdWU9e2N1ci5yYXRpbmd9IHNpemU9ezIwfSBjbGFzc05hbWU9XCJ2cy1zdGFyc1wiIC8+XG4gICAgICAgICAgICA8ZmlnY2FwdGlvbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidnMtYXZcIj57aW5pdGlhbHMoY3VyLm5hbWUpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidnMtd2hvXCI+PGI+e2N1ci5uYW1lfTwvYj48c21hbGw+e2N1ci5yb2xlfXtjdXIuY29tcGFueSA/IGAsICR7Y3VyLmNvbXBhbnl9YCA6ICcnfTwvc21hbGw+PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2cy1wbGFjZVwiPjxGbGFnIGNvZGU9e2N1ci5jY30gbmFtZT17Y3VyLmNvdW50cnl9IHNpemU9ezMwfSAvPntjdXIuY291bnRyeX08L3NwYW4+XG4gICAgICAgICAgICA8L2ZpZ2NhcHRpb24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZzLW5hdlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHsgaGVsZC5jdXJyZW50ID0gdHJ1ZTsgc2V0UGljaygocGljayAtIDEgKyBsaXN0Lmxlbmd0aCkgJSBsaXN0Lmxlbmd0aCk7IH19IGFyaWEtbGFiZWw9XCJQcmV2aW91cyByZXZpZXdcIj48SWNvbiBuYW1lPVwiYXJyb3dMZWZ0XCIgc2l6ZT17MTh9IC8+PC9idXR0b24+XG4gICAgICAgICAgICAgIDxzcGFuPntwaWNrICsgMX0gb2Yge2xpc3QubGVuZ3RofTwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7IGhlbGQuY3VycmVudCA9IHRydWU7IHNldFBpY2soKHBpY2sgKyAxKSAlIGxpc3QubGVuZ3RoKTsgfX0gYXJpYS1sYWJlbD1cIk5leHQgcmV2aWV3XCI+PEljb24gbmFtZT1cImFycm93XCIgc2l6ZT17MTh9IC8+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2ZpZ3VyZT5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2dy1jb2xzXCIgYXJpYS1sYWJlbD1cIk1vcmUgbWVtYmVyIHJldmlld3NcIj5cbiAgICAgICAgICB7Y29scy5tYXAoKGNvbCwgYykgPT4gKFxuICAgICAgICAgICAgPExpdmVab25lIGtleT17Y30gY2xhc3NOYW1lPXtgdnctY29sICR7YyAlIDIgPyAnZG93bicgOiAndXAnfWB9IHN0eWxlPXt7ICctLWR1cic6IGAke01hdGgubWF4KGNvbC5sZW5ndGgsIDMpICogN31zYCB9fT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2dy10cmFja1wiPlxuICAgICAgICAgICAgICAgIHtbLi4uY29sLCAuLi5jb2xdLm1hcCgodCwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IGFyaWEtaGlkZGVuPXtpID49IGNvbC5sZW5ndGggfHwgdW5kZWZpbmVkfT5cbiAgICAgICAgICAgICAgICAgICAgPE1pbmlDYXJkIHQ9e3R9IGFjdGl2ZT17dCA9PT0gY3VyfSBvblBpY2s9eygpID0+IGNob29zZSh0KX0gLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvTGl2ZVpvbmU+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgOS4gQ2hhdCBGQVFcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuZXhwb3J0IGZ1bmN0aW9uIENoYXRGYXEoeyBpdGVtcyB9KSB7XG4gIGNvbnN0IFtpLCBzZXRJXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbdHlwaW5nLCBzZXRUeXBpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBhc2sgPSAoaykgPT4ge1xuICAgIGlmIChrID09PSBpKSByZXR1cm47XG4gICAgc2V0SShrKTtcbiAgICBzZXRUeXBpbmcodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRUeXBpbmcoZmFsc2UpLCA3NTApO1xuICB9O1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY2ZhcVwiPlxuICAgICAgPHVsIGNsYXNzTmFtZT1cImNmLXFzXCI+XG4gICAgICAgIHtpdGVtcy5tYXAoKHEsIGspID0+IChcbiAgICAgICAgICA8bGkga2V5PXtxLnF9PlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2sgPT09IGkgPyAnb24nIDogJyd9IG9uQ2xpY2s9eygpID0+IGFzayhrKX0gYXJpYS1wcmVzc2VkPXtrID09PSBpfT5cbiAgICAgICAgICAgICAgPEljb24gbmFtZT1cImNoYXRcIiBzaXplPXsxNX0gLz57cS5xfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZi13aW5kb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZi1oZWFkXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2YtYXZcIj48UGVyc29uYSBraW5kPVwibnVyc2VcIiBza2luPXs0fSBoYWlyPXsxfSBoYWlyU3R5bGU9ezF9IHNpemU9ezM4fSAvPjwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj48Yj5NeUhlYWx0aE9waW5pb25zIGhlbHAgZGVzazwvYj48c21hbGw+PGkgY2xhc3NOYW1lPVwiZG90XCIgLz4gdXN1YWxseSByZXBsaWVzIGluIG1pbnV0ZXM8L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2YtYm9keVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2YtbXNnIG1lXCIga2V5PXsncScgKyBpfT48cD57aXRlbXNbaV0ucX08L3A+PC9kaXY+XG4gICAgICAgICAge3R5cGluZyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2YtbXNnIGJvdCB0eXBpbmdcIiBhcmlhLWxhYmVsPVwiVHlwaW5nXCI+PGkgLz48aSAvPjxpIC8+PC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2YtbXNnIGJvdFwiIGtleT17J2EnICsgaX0+PHA+e2l0ZW1zW2ldLmF9PC9wPjwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iLCAiLy8gdjQgaG9tZSBzZWN0aW9ucyBcdTIwMTQgZWFjaCBvbmUgaXRzIG93biB2aXN1YWwgaWRlYTpcbi8vICAgRGlzZWFzZUF0bGFzICAgYWxsIDIwIHRoZXJhcHkgYXJlYXMgb24gYSByb3RhdGluZyBjb2xvdXIgd2hlZWw7IHRoZSBjaG9zZW4gYXJlYSdzIGNvbmRpdGlvbnMgc3BpbGwgb3V0XG4vLyAgIEhvc3BpdGFsTGlmdCAgIHRoZSBoZWFsdGhjYXJlIHdvcmtmb3JjZSBhcyBhbiBpc29tZXRyaWMgaG9zcGl0YWwgXHUyMDE0IHJpZGUgdGhlIGdsYXNzIGxpZnQgZmxvb3IgYnkgZmxvb3I7XG4vLyAgICAgICAgICAgICAgICAgIGNhcmVnaXZlcnMgbGl2ZSBpbiB0aGUgaG91c2UgbmV4dCBkb29yXG4vLyAgIE1ldHJvU3RlcHMgICAgIHRoZSBmb3VyIHN0ZXBzIHRvIGEgZmlyc3QgcGF5b3V0IGFzIGEgbWV0cm8gbGluZSB3aXRoIGEgdHJhaW4gdGhhdCBzdG9wcyBhdCBlYWNoIHN0YXRpb25cbi8vICAgQW5vbnltaXNlciAgICAgcGVyc29uYWwgZGV0YWlscyBzY3JhbWJsZSBpbnRvIGEgcmVzcG9uZGVudCBjb2RlOyBvbmx5IGNvbWJpbmVkIGNoYXJ0cyBjb21lIG91dFxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uLmpzeCc7XG5pbXBvcnQgeyBMaXZlWm9uZSwgdXNlSW5WaWV3IH0gZnJvbSAnLi91aS5qc3gnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJy4uL3JvdXRlci5qc3gnO1xuaW1wb3J0IHsgVEhFUkFQWV9BUkVBUywgQ09ORElUSU9OX0NPVU5UIH0gZnJvbSAnLi4vZGF0YS9jb25kaXRpb25zLmpzJztcbmltcG9ydCB7IEZMT09SUywgQ0FSRUdJVkVSX0hPVVNFIH0gZnJvbSAnLi4vZGF0YS93b3JrZm9yY2UuanMnO1xuaW1wb3J0IHsgU1RFUFMgfSBmcm9tICcuLi9kYXRhL3N1cnZleXMuanMnO1xuXG5jb25zdCByZWR1Y2VkID0gKCkgPT4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJykubWF0Y2hlcztcblxuLyoqIEF1dG8tYWR2YW5jZSBhbiBpbmRleCB3aGlsZSB2aXNpYmxlLCB1bnRpbCB0aGUgdmlzaXRvciBpbnRlcmFjdHMuICovXG5mdW5jdGlvbiB1c2VBdXRvQ3ljbGUobiwgbXMsIHJlZiwgaW5WaWV3KSB7XG4gIGNvbnN0IFtpLCBzZXRJXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCB0b3VjaGVkID0gdXNlUmVmKGZhbHNlKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWluVmlldyB8fCByZWR1Y2VkKCkpIHJldHVybjtcbiAgICBjb25zdCB0ID0gc2V0SW50ZXJ2YWwoKCkgPT4geyBpZiAoIXRvdWNoZWQuY3VycmVudCAmJiAhZG9jdW1lbnQuaGlkZGVuKSBzZXRJKCh4KSA9PiAoeCArIDEpICUgbik7IH0sIG1zKTtcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbCh0KTtcbiAgfSwgW2luVmlldywgbiwgbXNdKTtcbiAgY29uc3QgcGljayA9IChrKSA9PiB7IHRvdWNoZWQuY3VycmVudCA9IHRydWU7IHNldEkoayk7IH07XG4gIHJldHVybiBbaSwgcGlja107XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgMS4gRGlzZWFzZSBhdGxhcyBcdTIwMTQgY29sb3VyIHdoZWVsIG9mIHRoZXJhcHkgYXJlYXNcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuY29uc3QgTiA9IFRIRVJBUFlfQVJFQVMubGVuZ3RoO1xuY29uc3QgU0VHID0gMzYwIC8gTjtcbmNvbnN0IHJhZCA9IChkKSA9PiAoZCAqIE1hdGguUEkpIC8gMTgwO1xuY29uc3QgcHQgPSAociwgYSkgPT4gWysociAqIE1hdGguY29zKHJhZChhKSkpLnRvRml4ZWQoMiksICsociAqIE1hdGguc2luKHJhZChhKSkpLnRvRml4ZWQoMildO1xuZnVuY3Rpb24gYXJjKGksIFIgPSAxODgsIHIgPSAxMjIsIGdhcCA9IDAuOSkge1xuICBjb25zdCBhMCA9IC05MCAtIFNFRyAvIDIgKyBpICogU0VHICsgZ2FwO1xuICBjb25zdCBhMSA9IGEwICsgU0VHIC0gZ2FwICogMjtcbiAgY29uc3QgW3gwLCB5MF0gPSBwdChSLCBhMCksIFt4MSwgeTFdID0gcHQoUiwgYTEpLCBbeDIsIHkyXSA9IHB0KHIsIGExKSwgW3gzLCB5M10gPSBwdChyLCBhMCk7XG4gIHJldHVybiBgTSR7eDB9ICR7eTB9QSR7Un0gJHtSfSAwIDAgMSAke3gxfSAke3kxfUwke3gyfSAke3kyfUEke3J9ICR7cn0gMCAwIDAgJHt4M30gJHt5M31aYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERpc2Vhc2VBdGxhcygpIHtcbiAgY29uc3QgW3JlZiwgaW5WaWV3XSA9IHVzZUluVmlldyh7IHRocmVzaG9sZDogMC4yNSB9LCBmYWxzZSk7XG4gIGNvbnN0IFtpLCBwaWNrXSA9IHVzZUF1dG9DeWNsZShOLCAzNDAwLCByZWYsIGluVmlldyk7XG4gIGNvbnN0IFtyb3QsIHNldFJvdF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgcHJldiA9IHVzZVJlZigwKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgZCA9IChpIC0gcHJldi5jdXJyZW50KSAlIE47XG4gICAgaWYgKGQgPiBOIC8gMikgZCAtPSBOO1xuICAgIGlmIChkIDwgLU4gLyAyKSBkICs9IE47XG4gICAgc2V0Um90KChyKSA9PiByIC0gZCAqIFNFRyk7XG4gICAgcHJldi5jdXJyZW50ID0gaTtcbiAgfSwgW2ldKTtcbiAgY29uc3QgYSA9IFRIRVJBUFlfQVJFQVNbaV07XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhdGxhc1wiIHJlZj17cmVmfSBzdHlsZT17eyAnLS1hYyc6IGEuY29sb3IgfX0+XG4gICAgICA8TGl2ZVpvbmUgY2xhc3NOYW1lPVwiYXRsYXMtd2hlZWxcIj5cbiAgICAgICAgPHN2ZyB2aWV3Qm94PVwiLTIwMCAtMjAwIDQwMCA0MDBcIiBjbGFzc05hbWU9XCJhdy1zdmdcIiByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPVwiVGhlcmFweSBhcmVhc1wiPlxuICAgICAgICAgIDxjaXJjbGUgcj1cIjE5N1wiIGNsYXNzTmFtZT1cImF3LWRhc2hcIiAvPlxuICAgICAgICAgIDxnIGNsYXNzTmFtZT1cImF3LXJvdFwiIHN0eWxlPXt7IHRyYW5zZm9ybTogYHJvdGF0ZSgke3JvdH1kZWcpYCwgJy0tdyc6IGAke3JvdH1kZWdgIH19PlxuICAgICAgICAgICAge1RIRVJBUFlfQVJFQVMubWFwKCh4LCBrKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG1pZCA9IC05MCArIGsgKiBTRUc7XG4gICAgICAgICAgICAgIGNvbnN0IFtveCwgb3ldID0gcHQoOSwgbWlkKTtcbiAgICAgICAgICAgICAgY29uc3QgW2l4LCBpeV0gPSBwdCgxNTUsIG1pZCk7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGcga2V5PXt4LmlkfSBjbGFzc05hbWU9e2Bhdy1zZWcgJHtrID09PSBpID8gJ29uJyA6ICcnfWB9IHN0eWxlPXt7ICctLWMnOiB4LmNvbG9yLCB0cmFuc2Zvcm06IGsgPT09IGkgPyBgdHJhbnNsYXRlKCR7b3h9cHgsICR7b3l9cHgpYCA6ICdub25lJyB9fSBvbkNsaWNrPXsoKSA9PiBwaWNrKGspfT5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9e2FyYyhrKX0gLz5cbiAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke2l4IC0gMTF9ICR7aXkgLSAxMX0pYH0+PGcgY2xhc3NOYW1lPVwiYXctaWNcIj48SWNvbiBuYW1lPXt4Lmljb259IHNpemU9ezIyfSBzdHJva2U9ezIuMn0gLz48L2c+PC9nPlxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZz5cbiAgICAgICAgICA8Y2lyY2xlIHI9XCIxMTRcIiBjbGFzc05hbWU9XCJhdy1jb3JlXCIgLz5cbiAgICAgICAgICA8Y2lyY2xlIHI9XCIxMTRcIiBjbGFzc05hbWU9XCJhdy1wdWxzZVwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF3LWNlbnRlclwiIGtleT17YS5pZH0gYXJpYS1saXZlPVwicG9saXRlXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXdjLWljXCI+PEljb24gbmFtZT17YS5pY29ufSBzaXplPXszMH0gLz48L3NwYW4+XG4gICAgICAgICAgPGI+e2EuYXJlYX08L2I+XG4gICAgICAgICAgPHNtYWxsPnthLml0ZW1zLmxlbmd0aH0gY29uZGl0aW9uczwvc21hbGw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhdy1wb2ludGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgIDwvTGl2ZVpvbmU+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0bGFzLXNpZGVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcy10b3RhbFwiPjxiPntDT05ESVRJT05fQ09VTlR9KzwvYj48c3Bhbj5jb25kaXRpb25zIGFjcm9zczxiciAvPntOfSB0aGVyYXB5IGFyZWFzPC9zcGFuPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFzLXRhYnNcIiByb2xlPVwidGFibGlzdFwiIGFyaWEtbGFiZWw9XCJDaG9vc2UgYSB0aGVyYXB5IGFyZWFcIj5cbiAgICAgICAgICB7VEhFUkFQWV9BUkVBUy5tYXAoKHgsIGspID0+IChcbiAgICAgICAgICAgIDxidXR0b24ga2V5PXt4LmlkfSByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17ayA9PT0gaX0gY2xhc3NOYW1lPXtrID09PSBpID8gJ29uJyA6ICcnfSBzdHlsZT17eyAnLS1jJzogeC5jb2xvciB9fSBvbkNsaWNrPXsoKSA9PiBwaWNrKGspfSB0aXRsZT17eC5hcmVhfT5cbiAgICAgICAgICAgICAgPEljb24gbmFtZT17eC5pY29ufSBzaXplPXsxNX0gLz48c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+e3guYXJlYX08L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXMtcGFuZWxcIiBrZXk9e2EuaWR9PlxuICAgICAgICAgIDxoMz48SWNvbiBuYW1lPXthLmljb259IHNpemU9ezE4fSAvPiB7YS5hcmVhfTwvaDM+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImFzLWNoaXBzXCI+XG4gICAgICAgICAgICB7YS5pdGVtcy5tYXAoKGMsIGspID0+IDxsaSBrZXk9e2N9IHN0eWxlPXt7ICctLWknOiBrIH19PntjfTwvbGk+KX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcy1saW5rc1wiPlxuICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cInRleHQtbGlua1wiIHRvPVwiL3BhdGllbnRzXCI+UGF0aWVudHM6IHdoYXQgd2Ugc3R1ZHkgPEljb24gbmFtZT1cImFycm93XCIgc2l6ZT17MTR9IC8+PC9MaW5rPlxuICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cInRleHQtbGlua1wiIHRvPVwiL2hlYWx0aGNhcmUtcHJvZmVzc2lvbmFsc1wiPlNwZWNpYWxpc3RzIHdlIHJlY3J1aXQgPEljb24gbmFtZT1cImFycm93XCIgc2l6ZT17MTR9IC8+PC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIDIuIEhvc3BpdGFsIGxpZnQgXHUyMDE0IHRoZSB3b3JrZm9yY2UgZmxvb3IgYnkgZmxvb3JcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuY29uc3QgSVNPID0gKFgsIFksIFopID0+IFszMDAgKyAoWCAtIFkpICogMC44NjYsIDM4NiArIChYICsgWSkgKiAwLjUgLSBaXTtcbmNvbnN0IGlzbyA9IChhcnIpID0+IGFyci5tYXAoKFt4LCB5LCB6XSkgPT4gSVNPKHgsIHksIHopLm1hcCgobikgPT4gbi50b0ZpeGVkKDEpKS5qb2luKCcsJykpLmpvaW4oJyAnKTtcbmNvbnN0IEZIID0gMjM7IC8vIGZsb29yIGhlaWdodFxuY29uc3QgQlcgPSAxMzIsIEJEID0gODg7IC8vIGJ1aWxkaW5nIGZvb3RwcmludFxuZnVuY3Rpb24gU2xhYih7IHosIGYsIG9uIH0pIHtcbiAgY29uc3QgdG9wID0geiArIEZIO1xuICBjb25zdCB3aW5MID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogNiB9LCAoXywgaykgPT4gOCArIGsgKiAyMC41KTtcbiAgY29uc3Qgd2luUiA9IFs4LCAyNiwgNDRdO1xuICByZXR1cm4gKFxuICAgIDxnIGNsYXNzTmFtZT17YGhsLWZsb29yICR7b24gPyAnb24nIDogJyd9YH0gc3R5bGU9e3sgJy0tYyc6IGYuY29sb3IgfX0+XG4gICAgICA8cG9seWdvbiBjbGFzc05hbWU9XCJoZi1yXCIgcG9pbnRzPXtpc28oW1tCVywgMCwgel0sIFtCVywgQkQsIHpdLCBbQlcsIEJELCB0b3BdLCBbQlcsIDAsIHRvcF1dKX0gLz5cbiAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT1cImhmLWxcIiBwb2ludHM9e2lzbyhbWzAsIEJELCB6XSwgW0JXLCBCRCwgel0sIFtCVywgQkQsIHRvcF0sIFswLCBCRCwgdG9wXV0pfSAvPlxuICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPVwiaGYtYmFuZFwiIHBvaW50cz17aXNvKFtbMCwgQkQsIHRvcCAtIDNdLCBbQlcsIEJELCB0b3AgLSAzXSwgW0JXLCBCRCwgdG9wXSwgWzAsIEJELCB0b3BdXSl9IC8+XG4gICAgICA8cG9seWdvbiBjbGFzc05hbWU9XCJoZi1iYW5kIHJcIiBwb2ludHM9e2lzbyhbW0JXLCAwLCB0b3AgLSAzXSwgW0JXLCBCRCwgdG9wIC0gM10sIFtCVywgQkQsIHRvcF0sIFtCVywgMCwgdG9wXV0pfSAvPlxuICAgICAge3dpbkwubWFwKCh4LCBrKSA9PiA8cG9seWdvbiBrZXk9eydsJyArIGt9IGNsYXNzTmFtZT1cImhmLXdpblwiIHN0eWxlPXt7ICctLWsnOiBrIH19IHBvaW50cz17aXNvKFtbeCwgQkQsIHogKyA2XSwgW3ggKyAxMiwgQkQsIHogKyA2XSwgW3ggKyAxMiwgQkQsIHogKyAxNl0sIFt4LCBCRCwgeiArIDE2XV0pfSAvPil9XG4gICAgICB7d2luUi5tYXAoKHksIGspID0+IDxwb2x5Z29uIGtleT17J3InICsga30gY2xhc3NOYW1lPVwiaGYtd2luIHJcIiBzdHlsZT17eyAnLS1rJzogayArIDYgfX0gcG9pbnRzPXtpc28oW1tCVywgeSwgeiArIDZdLCBbQlcsIHkgKyAxMiwgeiArIDZdLCBbQlcsIHkgKyAxMiwgeiArIDE2XSwgW0JXLCB5LCB6ICsgMTZdXSl9IC8+KX1cbiAgICA8L2c+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIb3NwaXRhbExpZnQoKSB7XG4gIGNvbnN0IHN0b3BzID0gdXNlTWVtbygoKSA9PiBbLi4uRkxPT1JTLCBDQVJFR0lWRVJfSE9VU0VdLCBbXSk7XG4gIGNvbnN0IFtyZWYsIGluVmlld10gPSB1c2VJblZpZXcoeyB0aHJlc2hvbGQ6IDAuMjUgfSwgZmFsc2UpO1xuICBjb25zdCBbaSwgcGlja10gPSB1c2VBdXRvQ3ljbGUoc3RvcHMubGVuZ3RoLCAzMjAwLCByZWYsIGluVmlldyk7XG4gIGNvbnN0IGN1ciA9IHN0b3BzW2ldO1xuICBjb25zdCBpc0hvdXNlID0gY3VyLmlkID09PSAnY2FyZWdpdmVycyc7XG4gIGNvbnN0IGxpZnRaID0gaXNIb3VzZSA/IDAgOiAoY3VyLmZsb29yIC0gMSkgKiBGSDtcbiAgY29uc3QgSCA9IEZMT09SUy5sZW5ndGggKiBGSDtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImhsaWZ0XCIgcmVmPXtyZWZ9IHN0eWxlPXt7ICctLWMnOiBjdXIuY29sb3IgfX0+XG4gICAgICA8TGl2ZVpvbmUgY2xhc3NOYW1lPVwiaGwtc2NlbmVcIj5cbiAgICAgICAgPHN2ZyB2aWV3Qm94PVwiNDAgNjAgNTIwIDQ2MFwiIGNsYXNzTmFtZT1cImhsLXN2Z1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwiaGwtZ2xhc3NcIiB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjBcIiB5Mj1cIjFcIj48c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiI2M3ZDJmZVwiIHN0b3BPcGFjaXR5PVwiLjVcIiAvPjxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZTBlN2ZmXCIgc3RvcE9wYWNpdHk9XCIuMlwiIC8+PC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8L2RlZnM+XG4gICAgICAgICAgey8qIGdyb3VuZCArIHJvYWQgKi99XG4gICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPVwiaGwtZ3JvdW5kXCIgcG9pbnRzPXtpc28oW1stMTYwLCAtNjAsIDBdLCBbMjIwLCAtNjAsIDBdLCBbMjIwLCAyNDAsIDBdLCBbLTE2MCwgMjQwLCAwXV0pfSAvPlxuICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT1cImhsLXJvYWRcIiBwb2ludHM9e2lzbyhbWy0xNjAsIDEyMCwgMF0sIFsyMjAsIDEyMCwgMF0sIFsyMjAsIDE1MCwgMF0sIFstMTYwLCAxNTAsIDBdXSl9IC8+XG4gICAgICAgICAge1stMTQwLCAtOTAsIC00MCwgMTAsIDYwLCAxMTAsIDE2MF0ubWFwKCh4KSA9PiA8cG9seWdvbiBrZXk9e3h9IGNsYXNzTmFtZT1cImhsLWxhbmVcIiBwb2ludHM9e2lzbyhbW3gsIDEzNCwgMF0sIFt4ICsgMjYsIDEzNCwgMF0sIFt4ICsgMjYsIDEzNiwgMF0sIFt4LCAxMzYsIDBdXSl9IC8+KX1cbiAgICAgICAgICB7LyogYW1idWxhbmNlICovfVxuICAgICAgICAgIDxnIGNsYXNzTmFtZT1cImhsLWFtYlwiPlxuICAgICAgICAgICAgPHBvbHlnb24gZmlsbD1cIiNmZmZcIiBwb2ludHM9e2lzbyhbWzAsIDEyNiwgMF0sIFsyOCwgMTI2LCAwXSwgWzI4LCAxMjYsIDE0XSwgWzAsIDEyNiwgMTRdXSl9IC8+XG4gICAgICAgICAgICA8cG9seWdvbiBmaWxsPVwiI2YxZjVmOVwiIHBvaW50cz17aXNvKFtbMCwgMTI2LCAxNF0sIFsyOCwgMTI2LCAxNF0sIFsyOCwgMTQwLCAxNF0sIFswLCAxNDAsIDE0XV0pfSAvPlxuICAgICAgICAgICAgPHBvbHlnb24gZmlsbD1cIiNlMmU4ZjBcIiBwb2ludHM9e2lzbyhbWzI4LCAxMjYsIDBdLCBbMjgsIDE0MCwgMF0sIFsyOCwgMTQwLCAxNF0sIFsyOCwgMTI2LCAxNF1dKX0gLz5cbiAgICAgICAgICAgIDxwb2x5Z29uIGZpbGw9XCIjZWYyZDU2XCIgcG9pbnRzPXtpc28oW1swLCAxMjYsIDZdLCBbMjgsIDEyNiwgNl0sIFsyOCwgMTI2LCA5XSwgWzAsIDEyNiwgOV1dKX0gLz5cbiAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT1cImhsLXNpcmVuXCIgcG9pbnRzPXtpc28oW1sxMCwgMTMxLCAxNF0sIFsxNiwgMTMxLCAxNF0sIFsxNiwgMTM1LCAxOF0sIFsxMCwgMTM1LCAxOF1dKX0gLz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgICAgey8qIGNhcmVnaXZlciBob3VzZSAqL31cbiAgICAgICAgICA8ZyBjbGFzc05hbWU9e2BobC1ob3VzZSAke2lzSG91c2UgPyAnb24nIDogJyd9YH0gb25DbGljaz17KCkgPT4gcGljayhzdG9wcy5sZW5ndGggLSAxKX0+XG4gICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9XCJoaC1yXCIgcG9pbnRzPXtpc28oW1stMTIwLCAzMCwgMF0sIFstMTIwLCA4MCwgMF0sIFstMTIwLCA4MCwgMzRdLCBbLTEyMCwgMzAsIDM0XV0pfSAvPlxuICAgICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPVwiaGgtbFwiIHBvaW50cz17aXNvKFtbLTE3MCwgODAsIDBdLCBbLTEyMCwgODAsIDBdLCBbLTEyMCwgODAsIDM0XSwgWy0xNzAsIDgwLCAzNF1dKX0gLz5cbiAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT1cImhoLXJvb2ZcIiBwb2ludHM9e2lzbyhbWy0xNzAsIDgwLCAzNF0sIFstMTIwLCA4MCwgMzRdLCBbLTEyMCwgNTUsIDU4XSwgWy0xNzAsIDU1LCA1OF1dKX0gLz5cbiAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT1cImhoLXJvb2YgclwiIHBvaW50cz17aXNvKFtbLTEyMCwgMzAsIDM0XSwgWy0xMjAsIDgwLCAzNF0sIFstMTIwLCA1NSwgNThdXSl9IC8+XG4gICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9XCJoaC1kb29yXCIgcG9pbnRzPXtpc28oW1stMTUwLCA4MCwgMF0sIFstMTQwLCA4MCwgMF0sIFstMTQwLCA4MCwgMThdLCBbLTE1MCwgODAsIDE4XV0pfSAvPlxuICAgICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPVwiaGgtd2luXCIgcG9pbnRzPXtpc28oW1stMTMyLCA4MCwgMTRdLCBbLTEyNCwgODAsIDE0XSwgWy0xMjQsIDgwLCAyNF0sIFstMTMyLCA4MCwgMjRdXSl9IC8+XG4gICAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9XCJoaC13aW5cIiBwb2ludHM9e2lzbyhbWy0xMjAsIDQyLCAxNF0sIFstMTIwLCA1MiwgMTRdLCBbLTEyMCwgNTIsIDI0XSwgWy0xMjAsIDQyLCAyNF1dKX0gLz5cbiAgICAgICAgICAgIDxnIGNsYXNzTmFtZT1cImhoLWhlYXJ0XCIgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7SVNPKC0xNDUsIDU1LCA3NCkuam9pbignICcpfSlgfT48cGF0aCBkPVwiTTAgLTNjLTMtNi0xMi00LTEwIDMgMSA0IDEwIDkgMTAgOXM5LTUgMTAtOWMyLTctNy05LTEwLTN6XCIgLz48L2c+XG4gICAgICAgICAgPC9nPlxuICAgICAgICAgIHsvKiBob3NwaXRhbCAqL31cbiAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9XCJobC1zaGFkb3dcIiBwb2ludHM9e2lzbyhbWzAsIDAsIDBdLCBbQlcgKyAzMCwgMCwgMF0sIFtCVyArIDMwLCBCRCArIDIwLCAwXSwgWzAsIEJEICsgMjAsIDBdXSl9IC8+XG4gICAgICAgICAge0ZMT09SUy5zbGljZSgpLnJldmVyc2UoKS5tYXAoKGYpID0+IDxTbGFiIGtleT17Zi5pZH0gZj17Zn0gej17KGYuZmxvb3IgLSAxKSAqIEZIfSBvbj17Y3VyLmlkID09PSBmLmlkfSAvPil9XG4gICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPVwiaGwtcm9vZlwiIHBvaW50cz17aXNvKFtbMCwgMCwgSF0sIFtCVywgMCwgSF0sIFtCVywgQkQsIEhdLCBbMCwgQkQsIEhdXSl9IC8+XG4gICAgICAgICAgPGcgY2xhc3NOYW1lPVwiaGwtc2lnblwiPlxuICAgICAgICAgICAgPHBvbHlnb24gZmlsbD1cIiNlZjJkNTZcIiBwb2ludHM9e2lzbyhbWzUyLCAzMCwgSF0sIFs4MCwgMzAsIEhdLCBbODAsIDMwLCBIICsgMzRdLCBbNTIsIDMwLCBIICsgMzRdXSl9IC8+XG4gICAgICAgICAgICA8cG9seWdvbiBmaWxsPVwiI2ZmZlwiIHBvaW50cz17aXNvKFtbNjIsIDMwLCBIICsgOF0sIFs3MCwgMzAsIEggKyA4XSwgWzcwLCAzMCwgSCArIDI2XSwgWzYyLCAzMCwgSCArIDI2XV0pfSAvPlxuICAgICAgICAgICAgPHBvbHlnb24gZmlsbD1cIiNmZmZcIiBwb2ludHM9e2lzbyhbWzU2LCAzMCwgSCArIDEzXSwgWzc2LCAzMCwgSCArIDEzXSwgWzc2LCAzMCwgSCArIDIxXSwgWzU2LCAzMCwgSCArIDIxXV0pfSAvPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgICB7LyogZ2xhc3MgbGlmdCBzaGFmdCArIGNhciAqL31cbiAgICAgICAgICA8cG9seWdvbiBjbGFzc05hbWU9XCJobC1zaGFmdFwiIHBvaW50cz17aXNvKFtbQlcsIDYyLCAwXSwgW0JXICsgMTQsIDYyLCAwXSwgW0JXICsgMTQsIDYyLCBIICsgNl0sIFtCVywgNjIsIEggKyA2XV0pfSAvPlxuICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT1cImhsLXNoYWZ0IHJcIiBwb2ludHM9e2lzbyhbW0JXICsgMTQsIDYyLCAwXSwgW0JXICsgMTQsIDgyLCAwXSwgW0JXICsgMTQsIDgyLCBIICsgNl0sIFtCVyArIDE0LCA2MiwgSCArIDZdXSl9IC8+XG4gICAgICAgICAgPGcgY2xhc3NOYW1lPVwiaGwtY2FyXCIgc3R5bGU9e3sgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgkey1saWZ0Wn1weClgIH19PlxuICAgICAgICAgICAgPHBvbHlnb24gY2xhc3NOYW1lPVwiaGMtZlwiIHBvaW50cz17aXNvKFtbQlcgKyAxNCwgNjQsIDJdLCBbQlcgKyAxNCwgODAsIDJdLCBbQlcgKyAxNCwgODAsIDIwXSwgW0JXICsgMTQsIDY0LCAyMF1dKX0gLz5cbiAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzTmFtZT1cImhjLXNcIiBwb2ludHM9e2lzbyhbW0JXICsgMiwgNjQsIDIwXSwgW0JXICsgMTQsIDY0LCAyMF0sIFtCVyArIDE0LCA4MCwgMjBdLCBbQlcgKyAyLCA4MCwgMjBdXSl9IC8+XG4gICAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImhjLWRvdFwiIGN4PXtJU08oQlcgKyAxNCwgNzIsIDExKVswXX0gY3k9e0lTTyhCVyArIDE0LCA3MiwgMTEpWzFdfSByPVwiMi40XCIgLz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgICAgey8qIGZsb29yIHBpbnMgKGNsaWNrYWJsZSkgKi99XG4gICAgICAgICAge0ZMT09SUy5tYXAoKGYpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFt4LCB5XSA9IElTTygwLCBCRCwgKGYuZmxvb3IgLSAxKSAqIEZIICsgRkggLyAyKTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxnIGtleT17Zi5pZH0gY2xhc3NOYW1lPXtgaGwtcGluICR7Y3VyLmlkID09PSBmLmlkID8gJ29uJyA6ICcnfWB9IHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3ggLSAyNn0gJHt5fSlgfSBzdHlsZT17eyAnLS1jJzogZi5jb2xvciB9fSBvbkNsaWNrPXsoKSA9PiBwaWNrKEZMT09SUy5pbmRleE9mKGYpKX0+XG4gICAgICAgICAgICAgICAgPHJlY3QgeD1cIi0xNlwiIHk9XCItOVwiIHdpZHRoPVwiMjZcIiBoZWlnaHQ9XCIxOFwiIHJ4PVwiNlwiIC8+XG4gICAgICAgICAgICAgICAgPHRleHQgeD1cIi0zXCIgeT1cIjRcIiB0ZXh0QW5jaG9yPVwibWlkZGxlXCI+e2YuZmxvb3J9PC90ZXh0PlxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvTGl2ZVpvbmU+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGwtc2lkZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhsLXBhbmVsXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIkxpZnQgYnV0dG9uc1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhwLWhlYWRcIj48SWNvbiBuYW1lPVwibGF5ZXJzXCIgc2l6ZT17MTR9IC8+IFJpZGUgdGhlIGxpZnQ8L3NwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJocC1idG5zXCI+XG4gICAgICAgICAgICB7RkxPT1JTLm1hcCgoZiwgaykgPT4gKFxuICAgICAgICAgICAgICA8YnV0dG9uIGtleT17Zi5pZH0gY2xhc3NOYW1lPXtjdXIuaWQgPT09IGYuaWQgPyAnb24nIDogJyd9IHN0eWxlPXt7ICctLWMnOiBmLmNvbG9yIH19IG9uQ2xpY2s9eygpID0+IHBpY2soayl9IGFyaWEtcHJlc3NlZD17Y3VyLmlkID09PSBmLmlkfSBhcmlhLWxhYmVsPXtgRmxvb3IgJHtmLmZsb29yfTogJHtmLmxhYmVsfWB9PntmLmZsb29yfTwvYnV0dG9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YGhwLWhvbWUgJHtpc0hvdXNlID8gJ29uJyA6ICcnfWB9IHN0eWxlPXt7ICctLWMnOiBDQVJFR0lWRVJfSE9VU0UuY29sb3IgfX0gb25DbGljaz17KCkgPT4gcGljayhzdG9wcy5sZW5ndGggLSAxKX0gYXJpYS1wcmVzc2VkPXtpc0hvdXNlfSBhcmlhLWxhYmVsPVwiTmV4dCBkb29yOiBjYXJlZ2l2ZXJzIGF0IGhvbWVcIj48SWNvbiBuYW1lPVwiaG9tZVwiIHNpemU9ezE1fSAvPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhwLWRpc3BsYXlcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj48aT57aXNIb3VzZSA/ICdcdTIzMDInIDogY3VyLmZsb29yfTwvaT57aXNIb3VzZSA/ICdOZXh0IGRvb3InIDogYEZsb29yICR7Y3VyLmZsb29yfWB9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGFydGljbGUgY2xhc3NOYW1lPVwiaGwtY2FyZFwiIGtleT17Y3VyLmlkfT5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoY2FyZC1pY1wiPjxJY29uIG5hbWU9e2N1ci5pY29ufSBzaXplPXsyMn0gLz48L3NwYW4+XG4gICAgICAgICAgPGgzPntjdXIubGFiZWx9PC9oMz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJoY2FyZC1tZXRhXCI+e2lzSG91c2UgPyBgJHtjdXIucm9sZXMubGVuZ3RofSBjYXJlZ2l2ZXIgcHJvZmlsZXNgIDogPD57Y3VyLnRpdGxlc30gam9iIHRpdGxlc3tjdXIuZXh0cmEgPyBgIFx1MDBCNyAke2N1ci5leHRyYX1gIDogJyd9PC8+fTwvcD5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiaGNhcmQtcm9sZXNcIj5cbiAgICAgICAgICAgIHsoY3VyLmNvcmUgfHwgW10pLm1hcCgociwgaykgPT4gPGxpIGtleT17cn0gY2xhc3NOYW1lPVwiY29yZVwiIHN0eWxlPXt7ICctLWknOiBrIH19PntyfTwvbGk+KX1cbiAgICAgICAgICAgIHtjdXIucm9sZXMubWFwKChyLCBrKSA9PiA8bGkga2V5PXtyfSBzdHlsZT17eyAnLS1pJzogayArIChjdXIuY29yZT8ubGVuZ3RoIHx8IDApIH19PntyfTwvbGk+KX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cInRleHQtbGlua1wiIHRvPXtpc0hvdXNlID8gJy9jYXJlZ2l2ZXJzJyA6IGAvaGVhbHRoY2FyZS1wcm9mZXNzaW9uYWxzIyR7Y3VyLmlkfWB9Pntpc0hvdXNlID8gJ0V2ZXJ5dGhpbmcgZm9yIGNhcmVnaXZlcnMnIDogJ0V2ZXJ5IHJvbGUgb24gdGhpcyBmbG9vcid9IDxJY29uIG5hbWU9XCJhcnJvd1wiIHNpemU9ezE0fSAvPjwvTGluaz5cbiAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgMy4gTWV0cm8gc3RlcHMgXHUyMDE0IGZvdXIgc3RhdGlvbnMgdG8gYSBmaXJzdCBwYXlvdXRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuZXhwb3J0IGZ1bmN0aW9uIE1ldHJvU3RlcHMoKSB7XG4gIHJldHVybiAoXG4gICAgPExpdmVab25lIGNsYXNzTmFtZT1cIm1ldHJvXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LWxpbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXQtdHJhY2tcIj48aSAvPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibXQtdHJhaW5cIj48c3BhbiBjbGFzc05hbWU9XCJtdHQtd2luXCIgLz48c3BhbiBjbGFzc05hbWU9XCJtdHQtd2luXCIgLz48c3BhbiBjbGFzc05hbWU9XCJtdHQtbG9nb1wiPjxJY29uIG5hbWU9XCJoZWFydFwiIHNpemU9ezEyfSBmaWxsPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlPXsxfSAvPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm10LWNvaW5cIj4kPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8b2wgY2xhc3NOYW1lPVwibXQtc3RhdGlvbnNcIj5cbiAgICAgICAge1NURVBTLm1hcCgocywgaykgPT4gKFxuICAgICAgICAgIDxsaSBrZXk9e3MudGl0bGV9IHN0eWxlPXt7ICctLWMnOiBzLmNvbG9yLCAnLS1rJzogayB9fT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm10LXN0b3BcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48SWNvbiBuYW1lPXtzLmljb259IHNpemU9ezE4fSAvPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm10LWNhcmRcIj5cbiAgICAgICAgICAgICAgPHNtYWxsPlN0YXRpb24ge2sgKyAxfTwvc21hbGw+XG4gICAgICAgICAgICAgIDxiPntzLnRpdGxlfTwvYj5cbiAgICAgICAgICAgICAgPHNwYW4+e3MudGV4dH08L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L29sPlxuICAgIDwvTGl2ZVpvbmU+XG4gICk7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgNC4gQW5vbnltaXNlciBcdTIwMTQgcGVyc29uYWwgZGV0YWlscyBzY3JhbWJsZSBpbnRvIGEgcmVzcG9uZGVudCBjb2RlXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbmNvbnN0IEdMWVBIUyA9ICdcdTI1ODhcdTI1OTNcdTI1OTJcdTI1OTEjJSZAJCorPT88Pi9cXFxcJztcbmNvbnN0IEZJRUxEUyA9IFtbJ3VzZXInLCAnTmFtZScsICdZb3VyIG5hbWUnXSwgWydtYWlsJywgJ0VtYWlsJywgJ3lvdUBlbWFpbC5jb20nXSwgWydwaG9uZScsICdQaG9uZScsICcrMDAgMDAwMDAgMDAwMDAnXSwgWydwaW4nLCAnQ2l0eScsICdZb3VyIGNpdHknXV07XG5cbmZ1bmN0aW9uIHVzZVNjcmFtYmxlKGFjdGl2ZSkge1xuICBjb25zdCBbcGhhc2UsIHNldFBoYXNlXSA9IHVzZVN0YXRlKDApOyAvLyAwIGNsZWFyIFx1MjE5MiAxIHNjcmFtYmxpbmcgXHUyMTkyIDIgc2VhbGVkXG4gIGNvbnN0IFt0aWNrLCBzZXRUaWNrXSA9IHVzZVN0YXRlKDApO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghYWN0aXZlIHx8IHJlZHVjZWQoKSkgcmV0dXJuO1xuICAgIGxldCB0O1xuICAgIGNvbnN0IHJ1biA9IChwKSA9PiB7IHNldFBoYXNlKHApOyB0ID0gc2V0VGltZW91dCgoKSA9PiBydW4oKHAgKyAxKSAlIDMpLCBwID09PSAxID8gMTgwMCA6IDI2MDApOyB9O1xuICAgIHJ1bigwKTtcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHQpO1xuICB9LCBbYWN0aXZlXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHBoYXNlICE9PSAxKSByZXR1cm47XG4gICAgY29uc3QgdCA9IHNldEludGVydmFsKCgpID0+IHNldFRpY2soKHgpID0+IHggKyAxKSwgNzApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHQpO1xuICB9LCBbcGhhc2VdKTtcbiAgcmV0dXJuIFtwaGFzZSwgdGlja107XG59XG5jb25zdCBzY3JhbWJsZSA9IChzLCB0aWNrKSA9PiBzLnNwbGl0KCcnKS5tYXAoKGNoLCBpKSA9PiAoY2ggPT09ICcgJyA/ICcgJyA6IEdMWVBIU1soaSAqIDcgKyB0aWNrICogMykgJSBHTFlQSFMubGVuZ3RoXSkpLmpvaW4oJycpO1xuXG5leHBvcnQgZnVuY3Rpb24gQW5vbnltaXNlcigpIHtcbiAgY29uc3QgW3JlZiwgaW5WaWV3XSA9IHVzZUluVmlldyh7IHRocmVzaG9sZDogMC4zIH0sIGZhbHNlKTtcbiAgY29uc3QgW3BoYXNlLCB0aWNrXSA9IHVzZVNjcmFtYmxlKGluVmlldyk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhbm9uXCIgcmVmPXtyZWZ9PlxuICAgICAgPExpdmVab25lIGNsYXNzTmFtZT17YGFub24tc2NlbmUgcGgtJHtwaGFzZX1gfSBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbi1jYXJkIGFuLWluXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYW4taGVhZFwiPjxJY29uIG5hbWU9XCJ1c2VyXCIgc2l6ZT17MTV9IC8+IFlvdXIgcHJvZmlsZTwvc3Bhbj5cbiAgICAgICAgICB7RklFTERTLm1hcCgoW2ljLCBrLCB2XSkgPT4gKFxuICAgICAgICAgICAgPHNwYW4ga2V5PXtrfSBjbGFzc05hbWU9XCJhbi1yb3dcIj48SWNvbiBuYW1lPXtpY30gc2l6ZT17MTR9IC8+PGVtPntrfTwvZW0+PGNvZGU+e3BoYXNlID09PSAwID8gdiA6IHBoYXNlID09PSAxID8gc2NyYW1ibGUodiwgdGljaykgOiAnXHUyMDIyJy5yZXBlYXQoTWF0aC5taW4odi5sZW5ndGgsIDEyKSl9PC9jb2RlPjwvc3Bhbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhbi1yb3cgb2tcIj48SWNvbiBuYW1lPVwiY2xpcGJvYXJkXCIgc2l6ZT17MTR9IC8+PGVtPkFuc3dlcnM8L2VtPjxjb2RlPlExIFx1MDBCNyBRMiBcdTAwQjcgUTMgXHUyMDI2PC9jb2RlPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW4tbWFjaGluZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFtLWdlYXIgZzFcIiAvPjxzcGFuIGNsYXNzTmFtZT1cImFtLWdlYXIgZzJcIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFtLWNvcmVcIj48SWNvbiBuYW1lPVwibG9ja1wiIHNpemU9ezI2fSAvPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhbS1iZWFtXCIgLz5cbiAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogNiB9KS5tYXAoKF8sIGspID0+IDxpIGtleT17a30gY2xhc3NOYW1lPVwiYW0tYml0XCIgc3R5bGU9e3sgJy0tayc6IGsgfX0gLz4pfVxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFtLWxibFwiPkFub255bWlzZXI8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuLWNhcmQgYW4tb3V0XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYW4taGVhZFwiPjxJY29uIG5hbWU9XCJjaGFydFwiIHNpemU9ezE1fSAvPiBXaGF0IHJlc2VhcmNoZXJzIGdldDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhbi1pZFwiPlJlc3BvbmRlbnQgPGI+I1ItNDgyMTM8L2I+PC9zcGFuPlxuICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAxMjAgMTIwXCIgY2xhc3NOYW1lPVwiYW4tZG9udXRcIj5cbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI2MFwiIGN5PVwiNjBcIiByPVwiNDRcIiBjbGFzc05hbWU9XCJkLWJnXCIgLz5cbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI2MFwiIGN5PVwiNjBcIiByPVwiNDRcIiBjbGFzc05hbWU9XCJkLWFcIiBwYXRoTGVuZ3RoPVwiMTAwXCIgLz5cbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI2MFwiIGN5PVwiNjBcIiByPVwiNDRcIiBjbGFzc05hbWU9XCJkLWJcIiBwYXRoTGVuZ3RoPVwiMTAwXCIgLz5cbiAgICAgICAgICAgIDx0ZXh0IHg9XCI2MFwiIHk9XCI1OFwiIHRleHRBbmNob3I9XCJtaWRkbGVcIj4yLDE0MDwvdGV4dD5cbiAgICAgICAgICAgIDx0ZXh0IHg9XCI2MFwiIHk9XCI3NFwiIHRleHRBbmNob3I9XCJtaWRkbGVcIiBjbGFzc05hbWU9XCJkLXNtXCI+YW5zd2VyczwvdGV4dD5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhbi1sZWdlbmRcIj48aSBjbGFzc05hbWU9XCJsYVwiIC8+NjIlIGJldHRlciA8aSBjbGFzc05hbWU9XCJsYlwiIC8+MjglIHNhbWU8L3NwYW4+XG4gICAgICAgICAgPHNtYWxsPkNvbWJpbmVkIHJlc3VsdHMgb25seSBcdTAwQjcgbm8gbmFtZXM8L3NtYWxsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTGl2ZVpvbmU+XG4gICAgICA8dWwgY2xhc3NOYW1lPVwiYW5vbi1wcm9taXNlc1wiPlxuICAgICAgICB7W1xuICAgICAgICAgIFsnbG9jaycsICdOZXZlciBzb2xkJywgJ1lvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24gaXMgbm90IGZvciBzYWxlLCB0byBhbnlvbmUuJywgJyMwMGE4OGEnXSxcbiAgICAgICAgICBbJ3VzZXJzJywgJ0NvbWJpbmVkIGFuc3dlcnMgb25seScsICdSZXNlYXJjaGVycyBzZWUgdG90YWxzLCBuZXZlciB5b3VyIG5hbWUgb3IgZW1haWwuJywgJyMyNDU3ZjUnXSxcbiAgICAgICAgICBbJ3NoaWVsZENoZWNrJywgJ0NlcnRpZmllZCBzZWN1cml0eScsICdJU08gMjcwMDEgaW5mb3JtYXRpb24gc2VjdXJpdHkgYW5kIElTTyAyMDI1MiByZXNlYXJjaCBzdGFuZGFyZHMuJywgJyM3YzNhZWQnXSxcbiAgICAgICAgICBbJ3gnLCAnTGVhdmUgYW55IHRpbWUnLCAnRGVsZXRlIHlvdXIgYWNjb3VudCBmcm9tIHlvdXIgcHJvZmlsZSBpbiB0d28gY2xpY2tzLicsICcjZWYyZDU2J10sXG4gICAgICAgIF0ubWFwKChbaWMsIHQsIGQsIGNdLCBrKSA9PiAoXG4gICAgICAgICAgPGxpIGtleT17dH0gc3R5bGU9e3sgJy0tYyc6IGMsICctLWsnOiBrIH19PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXAtaWNcIj48SWNvbiBuYW1lPXtpY30gc2l6ZT17MTh9IC8+PC9zcGFuPlxuICAgICAgICAgICAgPGI+e3R9PC9iPlxuICAgICAgICAgICAgPHNtYWxsPntkfTwvc21hbGw+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICApO1xufVxuIiwgIi8vIEhvbWUgXHUyMDE0IFwiQnJvd3NlIGEgZmV3IG9mIG91ciBwYWlkIHN1cnZleXNcIiBhcyBhIDNEIGludml0YXRpb24gaW5ib3guXG4vLyAgIFJhdGVSYWlsICAgICB0aGUgdHlwaWNhbCByZXdhcmQgYmFuZCBvZiBlYWNoIGF1ZGllbmNlIG9uIGEgJDBcdTIwMTMkNTAgcnVsZXIgKGJhcnMgZ3JvdyBpbiwgY29pbiBzdGFja3Ncbi8vICAgICAgICAgICAgICAgIHJpc2UsIHRoZSBwcmljZSB0YWcgY291bnRzIHVwKVxuLy8gICBTdXJ2ZXlJbmJveCAgZXZlcnkgc2FtcGxlIHN0dWR5IGlzIGEgc2VhbGVkIGVudmVsb3BlOiB3YXggc2VhbCA9IHJld2FyZCwgcG9zdG1hcmsgPSBtaW51dGVzLCBzdGFtcCA9XG4vLyAgICAgICAgICAgICAgICB0b3BpYy4gSG92ZXIsIGZvY3VzIG9yIHRhcCBvcGVucyB0aGUgZmxhcCBhbmQgdGhlIGxldHRlciBzbGlkZXMgb3V0LiBXaGlsZSB0aGUgc2VjdGlvbiBpc1xuLy8gICAgICAgICAgICAgICAgb24gc2NyZWVuLCBhIG5ldyBlbnZlbG9wZSBcImFycml2ZXNcIiAod2lnZ2xlcyBhbmQgb3BlbnMgaXRzZWxmKSBldmVyeSBmZXcgc2Vjb25kcy5cbi8vIERhdGE6IFJBVEVfQkFORFMgKyBTQU1QTEVfU1VSVkVZUyBpbiBzcmMvZGF0YS9zdXJ2ZXlzLmpzLiBBbGwgdGV4dCBpcyByZWFsIERPTSB0ZXh0IChTRU8gKyBhMTF5KS5cbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBJY29uIGZyb20gJy4vSWNvbi5qc3gnO1xuaW1wb3J0IHsgdXNlSW5WaWV3IH0gZnJvbSAnLi91aS5qc3gnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJy4uL3JvdXRlci5qc3gnO1xuaW1wb3J0IHsgUkFURV9CQU5EUywgUkFURV9NQVgsIFNBTVBMRV9TVVJWRVlTIH0gZnJvbSAnLi4vZGF0YS9zdXJ2ZXlzLmpzJztcblxuY29uc3QgQkFORCA9IE9iamVjdC5mcm9tRW50cmllcyhSQVRFX0JBTkRTLm1hcCgoYikgPT4gW2IuaWQsIGJdKSk7XG5jb25zdCByZWR1Y2VkID0gKCkgPT4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJykubWF0Y2hlcztcblxuZnVuY3Rpb24gQ291bnRUbyh7IHRvLCBydW4sIGRlbGF5ID0gMCB9KSB7XG4gIGNvbnN0IFt2LCBzZXRWXSA9IHVzZVN0YXRlKHJ1biA/IDAgOiB0byk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFydW4pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgaWYgKHJlZHVjZWQoKSkgeyBzZXRWKHRvKTsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuICAgIGxldCByYWY7XG4gICAgY29uc3QgdDAgPSBwZXJmb3JtYW5jZS5ub3coKSArIGRlbGF5O1xuICAgIGNvbnN0IHN0ZXAgPSAobm93KSA9PiB7XG4gICAgICBjb25zdCBwID0gTWF0aC5taW4oTWF0aC5tYXgoKG5vdyAtIHQwKSAvIDExMDAsIDApLCAxKTtcbiAgICAgIHNldFYoTWF0aC5yb3VuZCh0byAqICgxIC0gKDEgLSBwKSAqKiAzKSkpO1xuICAgICAgaWYgKHAgPCAxKSByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgfTtcbiAgICByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgcmV0dXJuICgpID0+IGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gIH0sIFt0bywgcnVuLCBkZWxheV0pO1xuICByZXR1cm4gdjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJhdGVSYWlsKHsgYWN0aXZlLCBvblBpY2sgfSkge1xuICBjb25zdCBbcmVmLCBpblZpZXddID0gdXNlSW5WaWV3KHsgdGhyZXNob2xkOiAwLjMgfSk7XG4gIHJldHVybiAoXG4gICAgPGRpdiByZWY9e3JlZn0gY2xhc3NOYW1lPXtgcnJhaWwgJHtpblZpZXcgPyAnaXMtaW4nIDogJyd9YH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJyLXJ1bGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBSQVRFX01BWCAvIDUgKyAxIH0pLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICAgIDxzcGFuIGtleT17aX0gc3R5bGU9e3sgbGVmdDogYCR7KGkgKiA1IC8gUkFURV9NQVgpICogMTAwfSVgIH19IGNsYXNzTmFtZT17aSAlIDIgPyAnbW4nIDogJyd9PntpICUgMiA/ICcnIDogYCQke2kgKiA1fWB9PC9zcGFuPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICAge1JBVEVfQkFORFMubWFwKChiLCBpKSA9PiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBrZXk9e2IuaWR9XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtgcnItbGFuZSAke2FjdGl2ZSA9PT0gYi5pZCA/ICdvbicgOiAnJ31gfVxuICAgICAgICAgIHN0eWxlPXt7ICctLWMnOiBiLmNvbG9yLCAnLS1jMic6IGIuYWNjZW50LCAnLS1sZic6IGIubWluIC8gUkFURV9NQVgsICctLXdmJzogKGIubWF4IC0gYi5taW4pIC8gUkFURV9NQVgsICctLWknOiBpIH19XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb25QaWNrKGFjdGl2ZSA9PT0gYi5pZCA/ICdhbGwnIDogYi5pZCl9XG4gICAgICAgICAgYXJpYS1wcmVzc2VkPXthY3RpdmUgPT09IGIuaWR9XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyci13aG9cIj48c3BhbiBjbGFzc05hbWU9XCJyci1pY1wiPjxJY29uIG5hbWU9e2IuaWNvbn0gc2l6ZT17MTh9IC8+PC9zcGFuPjxzcGFuPjxiPntiLmxhYmVsfTwvYj48c21hbGw+e2Iubm90ZX08L3NtYWxsPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicnItdHJhY2tcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJyLWJhclwiPjxzcGFuIGNsYXNzTmFtZT1cInJyLWdsaW50XCIgLz48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyci1zdGFja1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPntBcnJheS5mcm9tKHsgbGVuZ3RoOiAzICsgaSAqIDIgfSkubWFwKChfLCBrKSA9PiA8aSBrZXk9e2t9IHN0eWxlPXt7ICctLWsnOiBrIH19IC8+KX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyci10YWdcIj5cbiAgICAgICAgICAgICAgJDxDb3VudFRvIHRvPXtiLm1pbn0gcnVuPXtpblZpZXd9IGRlbGF5PXtpICogMTgwfSAvPlx1MjAxMyQ8Q291bnRUbyB0bz17Yi5tYXh9IHJ1bj17aW5WaWV3fSBkZWxheT17aSAqIDE4MCArIDEyMH0gLz5cbiAgICAgICAgICAgICAgPHNtYWxsPnBlciBzdXJ2ZXk8L3NtYWxsPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRW52ZWxvcGUoeyBzLCBpZHgsIG9wZW4sIHNldE9wZW4sIGFycml2aW5nIH0pIHtcbiAgY29uc3QgYiA9IEJBTkRbcy5iYW5kXTtcbiAgcmV0dXJuIChcbiAgICA8bGkgY2xhc3NOYW1lPXtgaXZsICR7b3BlbiA/ICdvcGVuJyA6ICcnfSAke2Fycml2aW5nID8gJ2Fycml2ZScgOiAnJ31gfSBzdHlsZT17eyAnLS1jJzogYi5jb2xvciwgJy0tYzInOiBiLmFjY2VudCwgJy0taSc6IGlkeCAlIDggfX0+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9XCJpdi1idG5cIlxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKG9wZW4gPyBudWxsIDogcy50aXRsZSl9XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIml2LTNkXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaXYtYmFja1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaXYtbGV0dGVyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJlbC1hdWRcIj48SWNvbiBuYW1lPXtiLmljb259IHNpemU9ezEyfSAvPntzLmF1ZH08L3NwYW4+XG4gICAgICAgICAgICA8YiBjbGFzc05hbWU9XCJlbC10aXRsZVwiPntzLnRpdGxlfTwvYj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImVsLXRleHRcIj57cy50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImVsLW1ldGFcIj5cbiAgICAgICAgICAgICAgPHNwYW4+PEljb24gbmFtZT1cImNsb2NrXCIgc2l6ZT17MTN9IC8+e3MubWluc30gbWluPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJlbC1wYXlcIj5SZXdhcmQgPGVtPiR7cy5yZXdhcmR9PC9lbT48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIml2LXBvY2tldFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaXYtZnJvbnRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImVmLXRvXCI+VG86IHtzLmF1ZH08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJlZi10aXRsZVwiPntzLnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImVmLWxpbmVzXCI+PGkgLz48aSAvPjwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaXYtZmxhcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaXYtc2VhbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxiPiR7cy5yZXdhcmR9PC9iPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpdi1zdGFtcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxJY29uIG5hbWU9e3MuaWNvbn0gc2l6ZT17MTh9IC8+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIml2LXBvc3RcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48Yj57cy5taW5zfTwvYj5NSU48L3NwYW4+XG4gICAgICAgICAge2Fycml2aW5nICYmIDxzcGFuIGNsYXNzTmFtZT1cIml2LW5ld1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPk5ldyBpbnZpdGU8L3NwYW4+fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2xpPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdXJ2ZXlJbmJveCgpIHtcbiAgY29uc3QgW2JhbmQsIHNldEJhbmRdID0gdXNlU3RhdGUoJ2FsbCcpO1xuICBjb25zdCBbYWxsLCBzZXRBbGxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2Fycml2ZSwgc2V0QXJyaXZlXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbcmVmLCBpblZpZXddID0gdXNlSW5WaWV3KHsgdGhyZXNob2xkOiAwLjE1IH0sIGZhbHNlKTtcbiAgY29uc3QgdXNlckF0ID0gdXNlUmVmKDApO1xuXG4gIGNvbnN0IGxpc3QgPSB1c2VNZW1vKCgpID0+IFNBTVBMRV9TVVJWRVlTLmZpbHRlcigocykgPT4gYmFuZCA9PT0gJ2FsbCcgfHwgcy5iYW5kID09PSBiYW5kKSwgW2JhbmRdKTtcbiAgY29uc3Qgc2hvd24gPSBhbGwgfHwgYmFuZCAhPT0gJ2FsbCcgPyBsaXN0IDogbGlzdC5zbGljZSgwLCA4KTtcbiAgY29uc3QgY291bnRzID0gdXNlTWVtbygoKSA9PiBPYmplY3QuZnJvbUVudHJpZXMoUkFURV9CQU5EUy5tYXAoKGIpID0+IFtiLmlkLCBTQU1QTEVfU1VSVkVZUy5maWx0ZXIoKHMpID0+IHMuYmFuZCA9PT0gYi5pZCkubGVuZ3RoXSkpLCBbXSk7XG5cbiAgLy8gXCJOZXcgaW52aXRhdGlvblwiIG1vbWVudDogZXZlcnkgZmV3IHNlY29uZHMgb25lIGVudmVsb3BlIHdpZ2dsZXMgYW5kIG9wZW5zIGl0c2VsZiAocGF1c2VzIGFmdGVyIGEgdXNlciB0YXApLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaW5WaWV3IHx8IHJlZHVjZWQoKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBsZXQgayA9IDA7XG4gICAgY29uc3QgdCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5oaWRkZW4gfHwgRGF0ZS5ub3coKSAtIHVzZXJBdC5jdXJyZW50IDwgODAwMCkgcmV0dXJuO1xuICAgICAgY29uc3QgcGljayA9IHNob3duWyhrICogMyArIDEpICUgc2hvd24ubGVuZ3RoXTtcbiAgICAgIGsgKz0gMTtcbiAgICAgIHNldEFycml2ZShwaWNrLnRpdGxlKTtcbiAgICAgIHNldE9wZW4ocGljay50aXRsZSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgc2V0QXJyaXZlKG51bGwpOyBzZXRPcGVuKChvKSA9PiAobyA9PT0gcGljay50aXRsZSA/IG51bGwgOiBvKSk7IH0sIDI2MDApO1xuICAgIH0sIDQyMDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHQpO1xuICB9LCBbaW5WaWV3LCBzaG93bl0pO1xuXG4gIGNvbnN0IHVzZXJPcGVuID0gKHYpID0+IHsgdXNlckF0LmN1cnJlbnQgPSBEYXRlLm5vdygpOyBzZXRBcnJpdmUobnVsbCk7IHNldE9wZW4odik7IH07XG4gIGNvbnN0IHBpY2tCYW5kID0gKHYpID0+IHsgdXNlckF0LmN1cnJlbnQgPSBEYXRlLm5vdygpOyBzZXRCYW5kKHYpOyBzZXRPcGVuKG51bGwpOyB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiByZWY9e3JlZn0gY2xhc3NOYW1lPVwic2luYm94XCI+XG4gICAgICA8UmF0ZVJhaWwgYWN0aXZlPXtiYW5kfSBvblBpY2s9e3BpY2tCYW5kfSAvPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpLXRhYnNcIiByb2xlPVwidGFibGlzdFwiIGFyaWEtbGFiZWw9XCJGaWx0ZXIgc3VydmV5cyBieSBhdWRpZW5jZVwiPlxuICAgICAgICA8YnV0dG9uIHJvbGU9XCJ0YWJcIiBhcmlhLXNlbGVjdGVkPXtiYW5kID09PSAnYWxsJ30gY2xhc3NOYW1lPXtiYW5kID09PSAnYWxsJyA/ICdvbicgOiAnJ30gb25DbGljaz17KCkgPT4gcGlja0JhbmQoJ2FsbCcpfT5BbGwgc3VydmV5cyA8ZW0+e1NBTVBMRV9TVVJWRVlTLmxlbmd0aH08L2VtPjwvYnV0dG9uPlxuICAgICAgICB7UkFURV9CQU5EUy5tYXAoKGIpID0+IChcbiAgICAgICAgICA8YnV0dG9uIGtleT17Yi5pZH0gcm9sZT1cInRhYlwiIGFyaWEtc2VsZWN0ZWQ9e2JhbmQgPT09IGIuaWR9IGNsYXNzTmFtZT17YmFuZCA9PT0gYi5pZCA/ICdvbicgOiAnJ30gc3R5bGU9e3sgJy0tYyc6IGIuY29sb3IgfX0gb25DbGljaz17KCkgPT4gcGlja0JhbmQoYi5pZCl9PlxuICAgICAgICAgICAgPEljb24gbmFtZT17Yi5pY29ufSBzaXplPXsxNH0gLz57Yi5sYWJlbH0gPGVtPntjb3VudHNbYi5pZF19PC9lbT5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHVsIGNsYXNzTmFtZT1cInNpLWdyaWRcIiBrZXk9e2JhbmR9PlxuICAgICAgICB7c2hvd24ubWFwKChzLCBpKSA9PiA8RW52ZWxvcGUga2V5PXtzLnRpdGxlfSBzPXtzfSBpZHg9e2l9IG9wZW49e29wZW4gPT09IHMudGl0bGV9IHNldE9wZW49e3VzZXJPcGVufSBhcnJpdmluZz17YXJyaXZlID09PSBzLnRpdGxlfSAvPil9XG4gICAgICA8L3VsPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNpLWZvb3RcIj5cbiAgICAgICAge2JhbmQgPT09ICdhbGwnICYmICFhbGwgJiYgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1naG9zdFwiIG9uQ2xpY2s9eygpID0+IHNldEFsbCh0cnVlKX0+PHNwYW4gY2xhc3NOYW1lPVwiYnRuLWxhYmVsXCI+T3BlbiBhbGwge1NBTVBMRV9TVVJWRVlTLmxlbmd0aH0gaW52aXRhdGlvbnM8L3NwYW4+PEljb24gbmFtZT1cIm1haWxcIiBzaXplPXsxOH0gLz48L2J1dHRvbj59XG4gICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIHRvPXtiYW5kID09PSAnYWxsJyA/ICcvam9pbicgOiBgL2pvaW4jJHtiYW5kfWB9PjxzcGFuIGNsYXNzTmFtZT1cImJ0bi1sYWJlbFwiPkdldCBpbnZpdGF0aW9ucyBsaWtlIHRoZXNlPC9zcGFuPjxJY29uIG5hbWU9XCJhcnJvd1wiIHNpemU9ezE4fSAvPjwvTGluaz5cbiAgICAgIDwvZGl2PlxuICAgICAgPHAgY2xhc3NOYW1lPVwic2ktbm90ZVwiPjxJY29uIG5hbWU9XCJpbmZvXCIgc2l6ZT17MTR9IC8+IFNhbXBsZSBzdHVkaWVzLiBFdmVyeSBpbnZpdGF0aW9uIHNob3dzIGl0cyBleGFjdCByZXdhcmQsIHRvcGljIGFuZCB0aW1lIGJlZm9yZSB5b3Ugc3RhcnQuPC9wPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7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LElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHO0FBQUEsSUFDL0YsNkNBQUMsYUFBUSxXQUFVLFFBQU8sUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRztBQUFBLElBQy9GLDZDQUFDLGFBQVEsV0FBVSxXQUFVLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHO0FBQUEsSUFDOUcsNkNBQUMsYUFBUSxXQUFVLGFBQVksUUFBUSxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUc7QUFBQSxJQUMvRyxLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sNkNBQUMsYUFBc0IsV0FBVSxVQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUF6SSxNQUFNLENBQXNJLENBQUU7QUFBQSxJQUMvSyxLQUFLLElBQUksQ0FBQyxHQUFHLE1B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QUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHO0FBQUEsUUFDNUcsNkNBQUMsYUFBUSxXQUFVLGFBQVksUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHO0FBQUEsUUFDOUYsNkNBQUMsYUFBUSxXQUFVLFdBQVUsUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRztBQUFBLFFBQzFHLDZDQUFDLGFBQVEsV0FBVSxVQUFTLFFBQVEsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUc7QUFBQSxRQUMzRyw2Q0FBQyxhQUFRLFdBQVUsVUFBUyxRQUFRLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHO0FBQUEsUUFDM0csNkNBQUMsT0FBRSxXQUFVLFlBQVcsV0FBVyxhQUFhLElBQUksTUFBTSxJQUFJLEVBQUUsRUFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFLLHVEQUFDLFVBQUssR0FBRSw2REFBNEQsR0FBRTtBQUFBLFNBQ3hKO0FBQUEsTUFFQSw2Q0FBQyxhQUFRLFdBQVUsYUFBWSxRQUFRLElBQUksQ0FBQyxDQUFDLEdB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WUFBWTtBQUFBO0FBQUEsVUFBZTtBQUFBLFdBQVU7QUFBQSxTQUFPLEdBQUssTUFBSyx5RkFBd0YsT0FBTSxXQUFVO0FBQUEsTUFDdFAsNkNBQUMsYUFBVTtBQUFBLE9BQ2IsR0FDRjtBQUFBLElBRUEsNkNBQUMsYUFBUSxXQUFVLG1CQUNqQix3REFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLG1EQUFDLGVBQVksU0FBUSxpQ0FBZ0MsT0FBTSx3Q0FBdUMsTUFBSyxrTUFBNEwsT0FBTSxXQUFVO0FBQUEsTUFDblQsNkNBQUMsY0FBVztBQUFBLE1BQ1osNkNBQUMsU0FBSSxXQUFVLGNBQWEsdURBQUMsVUFBTyxJQUFHLGlCQUFnQixTQUFRLFNBQVEsdUNBQXlCLEdBQVM7QUFBQSxPQUMzRyxHQUNGO0FBQUEsSUFFQSw2Q0FBQyxZQUFTO0FBQUEsSUFFViw2Q0FBQyxhQUFRLFdBQVUsaUJBQ2pCLHdEQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsbURBQUMsZUFBWSxTQUFRLGlCQUFnQixPQUFNLDhCQUE2QixNQUFLLGdHQUErRixPQUFNLFdBQVU7QUFBQSxNQUM1TCw2Q0FBQyxXQUFRLE9BQU8sVUFBVTtBQUFBLE1BQzFCLDZDQUFDLFNBQUksV0FBVSxjQUFhLHVEQUFDLFVBQU8sSUFBRyxRQUFPLFNBQVEsU0FBUSxzQkFBUSxHQUFTO0FBQUEsT0FDakYsR0FDRjtBQUFBLEtBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIk4iLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIk4iLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJyZWR1Y2VkIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
