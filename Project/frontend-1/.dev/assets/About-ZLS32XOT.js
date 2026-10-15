import {
  BadgeParade
} from "/assets/chunk-2YLDU7ZU.js";
import "/assets/chunk-JWSEDBGW.js";
import {
  AudiencePortals
} from "/assets/chunk-DBATXORZ.js";
import "/assets/chunk-LAPZ264O.js";
import {
  VerificationRing
} from "/assets/chunk-UZU3UW3I.js";
import "/assets/chunk-UQWWOXC3.js";
import "/assets/chunk-SPSQFVM6.js";
import {
  HeartMark,
  frequent_research_logo_default
} from "/assets/chunk-GTWO7VGT.js";
import {
  Persona
} from "/assets/chunk-53J6YGE2.js";
import {
  PageHero
} from "/assets/chunk-NVJYUHG3.js";
import {
  Button,
  Icon,
  Link,
  LiveZone,
  Reveal,
  SectionHead,
  require_jsx_runtime,
  require_react,
  useInView
} from "/assets/chunk-LANM2SZF.js";
import "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/About.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var CLIENTS = [
  ["flask", "Pharma & biotech"],
  ["monitor", "Medical devices"],
  ["microscope", "Diagnostics"],
  ["building", "Hospitals & health systems"],
  ["phone", "Health tech"],
  ["book", "Academic & public health"]
];
var MEMBERS = [
  ["stethoscope", "Doctors & specialists", "#2457f5"],
  ["nurse", "Nurses & midwives", "#5b3df5"],
  ["pill", "Pharmacists & allied health", "#8a4dff"],
  ["hands", "Caregivers", "#ff6a2c"],
  ["heart", "Patients", "#00a88a"],
  ["users", "Health consumers", "#ec4899"]
];
var TIMELINE = [
  { y: "2017", t: "Frequent Research is founded", d: "Frequent Research Fieldwork Solutions Pvt. Ltd. opens its doors in New Delhi.", ic: "building" },
  { y: "ISO", t: "Certified, three times over", d: "ISO 9001 quality, ISO 27001 information security and ISO 20252 market research.", ic: "shieldCheck" },
  { y: "MHO", t: "A panel just for healthcare", d: "MyHealthOpinions launches for healthcare professionals, caregivers and patients.", ic: "heart" },
  { y: "55", t: "Countries and counting", d: "Members across Asia-Pacific, Europe, the Middle East, Africa and the Americas.", ic: "globe" }
];
function MemberCard() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "mcard-stage", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mcard", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mc-face mc-front", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mc-holo" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "mc-top", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartMark, { size: 34 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "MyHealthOpinions" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Member" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mc-chip" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "mc-people", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Persona, { kind: "doctor", skin: 2, hair: 0, size: 46 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Persona, { kind: "caregiver", skin: 1, hair: 3, hairStyle: 1, size: 46 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Persona, { kind: "patient", skin: 3, hair: 2, size: 46 })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "mc-line", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Healthcare research community" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Since 2017" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "mc-ecg", viewBox: "0 0 300 40", preserveAspectRatio: "none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 24h90l10-16 12 28 10-22 8 10h170", pathLength: "100" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mc-face mc-back", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mc-stripe" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "globe", size: 14 }),
            " 55 countries"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "shieldCheck", size: 14 }),
            " 3 ISO certifications"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "users", size: 14 }),
            " 31,240+ panelists"
          ] })
        ] })
      ] })
    ] }),
    [["coins", "Rewards for every study"], ["lock", "Data never sold"], ["users", "25+ professional groups"]].map(([ic, t], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "mc-float", style: { "--i": i }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 14 }),
      t
    ] }, t))
  ] });
}
function Pipeline() {
  const L = [40, 100, 160, 220, 280, 340];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "pipe3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "p3-col p3-left", children: CLIENTS.map(([ic, t], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { style: { "--i": i }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 16 }),
      t
    ] }, t)) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "p3-mid", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 400 380", preserveAspectRatio: "none", children: L.map((y, i) => {
        const a = `M0 ${y} C 120 ${y}, 120 190, 170 190`;
        const b = `M230 190 C 280 190, 280 ${y}, 400 ${y}`;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: a, className: "p3-wire w-in" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: b, className: "p3-wire w-out" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { r: "5", className: "p3-pk in", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateMotion", { dur: `${2.2 + i * 0.25}s`, repeatCount: "indefinite", path: a }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { r: "5", className: "p3-pk out", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateMotion", { dur: `${2.4 + i * 0.2}s`, repeatCount: "indefinite", path: b, keyPoints: "1;0", keyTimes: "0;1", calcMode: "linear" }) })
        ] }, i);
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "p3-core", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "p3-gear" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartMark, { size: 46 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "MyHealthOpinions" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "verify \xB7 match \xB7 anonymise \xB7 reward" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "p3-lbl l1", children: "questions" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "p3-lbl l2", children: "honest answers" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "p3-col p3-right", children: MEMBERS.map(([ic, t, c], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { style: { "--i": i, "--c": c }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 16 }),
      t
    ] }, t)) })
  ] });
}
function Promises() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref, className: `promises ${inView ? "is-in" : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: "pr pr-heart", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "pr-viz", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 120 50", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 30h30l8-18 10 34 10-26 8 10h54", pathLength: "100" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "heart", size: 30, fill: "currentColor", stroke: 1 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Patient-centric" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lived experience is evidence. We make room for it in medicine research." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: "pr pr-shield", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "pr-viz", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "shieldCheck", size: 40 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "pr-scan" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Trust before hype" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No income promises, no fees, no selling your data. Ever." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: "pr pr-target", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "pr-viz", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "pr-rings", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pr-dart" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Right person, right study" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Careful profiling means fewer wasted screeners and better answers." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: "pr pr-coin", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pr-viz", "aria-hidden": "true", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "pr-c", style: { "--i": i } }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Fair rewards" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every completed study earns the incentive you saw before you started." })
    ] })
  ] });
}
function Roadmap() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [on, setOn] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
    if (!inView) return;
    const t = setInterval(() => setOn((x) => (x + 1) % TIMELINE.length), 2600);
    return () => clearInterval(t);
  }, [inView]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref, className: `road ${inView ? "is-in" : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { className: "road-svg", viewBox: "0 0 1000 120", preserveAspectRatio: "none", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "road-base", d: "M0 80 C 160 20, 320 120, 500 70 S 840 20, 1000 70" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "road-dash", d: "M0 80 C 160 20, 320 120, 500 70 S 840 20, 1000 70" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { r: "10", className: "road-car", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateMotion", { dur: "10s", repeatCount: "indefinite", path: "M0 80 C 160 20, 320 120, 500 70 S 840 20, 1000 70" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: TIMELINE.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: i === on ? "on" : "", style: { "--i": i }, onMouseEnter: () => setOn(i), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rd-pin", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: t.ic, size: 18 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { className: "rd-y", children: t.y }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t.t }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t.d })
    ] }, t.t)) })
  ] });
}
function About() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      PageHero,
      {
        theme: "about",
        eyebrow: "About MyHealthOpinions",
        eyebrowColor: "#ff6a2c",
        title: ["Transforming healthcare,", { t: "one opinion at a time", hl: "grad" }],
        lead: "MyHealthOpinions is a healthcare research community powered by Frequent Research. We connect physicians, nurses, allied health professionals, patients and caregivers with the organisations shaping tomorrow's medicine, and reward every member for their time.",
        ctas: [{ label: "Join the community", to: "/join" }, { label: "Who can earn", to: "/earn", variant: "ghost", icon: "users" }],
        art: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCard, {}),
        crumbs: [{ to: "/", label: "Home" }, { label: "About Us" }]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section about-plaque", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { className: "plaque", effect: "zoom", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pq-border", "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pq-in", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { className: "pq-logo", src: frequent_research_logo_default, alt: "Frequent Research Fieldwork Solutions \u2014 Insights, Analytics, Growth. An ISO certified company", width: "589", height: "314", loading: "lazy" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "pq-ribbon", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "sparkle", size: 14 }),
            " Powered by Frequent Research"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "split-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "eyebrow", style: { "--eb": "#2457f5" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }),
          "Welcome to MyHealthOpinions"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "A healthcare research community built on real experience" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "lead", children: "Share what you see on the ward, at the bedside or in your own treatment, help shape the next generation of healthcare, and get rewarded for your time." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fact-dials", children: [["2017", "founded in New Delhi", 100, "#2457f5"], ["55", "countries", 78, "#00a88a"], ["3", "ISO certifications", 60, "#ff6a2c"]].map(([v, l, p, c], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "fd", style: { "--p": p, "--c": c, "--i": i }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 80 80", "aria-hidden": "true", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "40", cy: "40", r: "34", className: "fd-bg" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "40", cy: "40", r: "34", className: "fd-fg", pathLength: "100" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: v }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l })
        ] }, l)) })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section about-flow3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "How healthcare market research flows", title: "From your answer to better medicine", lead: "Organisations need real-world insight. You have it. Watch the questions travel in and the anonymous answers travel out.", color: "#ffb020" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pipeline, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "flow-note", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "info", size: 16 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          "We run online surveys and market research, not clinical trials. Paid clinical research tests treatments under medical supervision; our studies only ask for your views. ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/blog/paid-clinical-studies-vs-paid-surveys", children: "See the difference" }),
          " or read ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/blog/what-is-a-clinical-research-organization", children: "what a clinical research organization does" }),
          "."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section about-promises", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "What we stand for", title: "Four promises behind every survey", color: "#00a88a" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Promises, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section about-road", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "Our journey", title: "Built by market research specialists", color: "#7c3aed" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roadmap, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section about-profiles", id: "profiles", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "Our healthcare panel", title: "Three doors into one community", lead: "Healthcare professionals across 10 groups and 1,300+ job titles, caregivers of every kind, and patients living with 195+ conditions. Each has its own page, process and rewards.", color: "#2457f5" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudiencePortals, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section about-verify", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "split-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "eyebrow", style: { "--eb": "#00a88a" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }),
          "Verified recruitment"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Professionals are who they say they are" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "lead", children: "Our quality team checks professional credentials and employment where it applies, using six verification protocols plus a manual review." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { to: "/trust-safety", variant: "ghost", children: "All 18 quality checks" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationRing, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section certs", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { className: "certs-card", effect: "zoom", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Certified and affiliated" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ISO 9001:2015, ISO 27001, ISO 20252:2019, ESOMAR member and MSME registered. Hover a badge to flip it." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeParade, { light: true })
    ] }) }) })
  ] });
}
export {
  About as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL0Fib3V0LmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQWJvdXQgXHUyMDE0IHByaW1hcnk6IFwiaGVhbHRoY2FyZSByZXNlYXJjaCBjb21tdW5pdHlcIi4gU2Vjb25kYXJ5OiBoZWFsdGhjYXJlIG1hcmtldCByZXNlYXJjaCwgbWVkaWNpbmVcbi8vIHJlc2VhcmNoLCBwYWlkIGNsaW5pY2FsIHJlc2VhcmNoIChjb250cmFzdCksIGNsaW5pY2FsIHJlc2VhcmNoIG9yZ2FuaXphdGlvbiwgRnJlcXVlbnQgUmVzZWFyY2guXG4vLyBFYWNoIHNlY3Rpb24gaGFzIGl0cyBvd24gdmlzdWFsOiBob2xvZ3JhcGhpYyBtZW1iZXIgY2FyZCAoaGVybyksIGNlcnRpZmljYXRlIHBsYXF1ZSAoRnJlcXVlbnRcbi8vIFJlc2VhcmNoKSwgbGl2ZSBkYXRhIHBpcGVsaW5lIChob3cgcmVzZWFyY2ggZmxvd3MpLCBmb3VyIGFuaW1hdGVkIHByb21pc2UgdGlsZXMsIGEgcm9hZC1tYXAgdGltZWxpbmUuXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFBhZ2VIZXJvIGZyb20gJy4uL2NvbXBvbmVudHMvUGFnZUhlcm8uanN4JztcbmltcG9ydCB7IFNlY3Rpb25IZWFkLCBSZXZlYWwsIEJ1dHRvbiwgTGl2ZVpvbmUsIHVzZUluVmlldyB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkuanN4JztcbmltcG9ydCBJY29uIGZyb20gJy4uL2NvbXBvbmVudHMvSWNvbi5qc3gnO1xuaW1wb3J0IFBlcnNvbmEgZnJvbSAnLi4vY29tcG9uZW50cy9QZXJzb25hLmpzeCc7XG5pbXBvcnQgeyBIZWFydE1hcmsgfSBmcm9tICcuLi9jb21wb25lbnRzL0JyYW5kLmpzeCc7XG5pbXBvcnQgeyBCYWRnZVBhcmFkZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvRm9vdGVyLmpzeCc7XG5pbXBvcnQgeyBBdWRpZW5jZVBvcnRhbHMgfSBmcm9tICcuLi9jb21wb25lbnRzL0Vhcm5WNC5qc3gnO1xuaW1wb3J0IHsgVmVyaWZpY2F0aW9uUmluZyB9IGZyb20gJy4uL2NvbXBvbmVudHMvU2hvd2Nhc2UuanN4JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICcuLi9yb3V0ZXIuanN4JztcbmltcG9ydCBmckxvZ28gZnJvbSAnLi4vYXNzZXRzL2JyYW5kL2ZyZXF1ZW50LXJlc2VhcmNoLWxvZ28ud2VicCc7XG5cbmNvbnN0IENMSUVOVFMgPSBbXG4gIFsnZmxhc2snLCAnUGhhcm1hICYgYmlvdGVjaCddLCBbJ21vbml0b3InLCAnTWVkaWNhbCBkZXZpY2VzJ10sIFsnbWljcm9zY29wZScsICdEaWFnbm9zdGljcyddLFxuICBbJ2J1aWxkaW5nJywgJ0hvc3BpdGFscyAmIGhlYWx0aCBzeXN0ZW1zJ10sIFsncGhvbmUnLCAnSGVhbHRoIHRlY2gnXSwgWydib29rJywgJ0FjYWRlbWljICYgcHVibGljIGhlYWx0aCddLFxuXTtcbmNvbnN0IE1FTUJFUlMgPSBbXG4gIFsnc3RldGhvc2NvcGUnLCAnRG9jdG9ycyAmIHNwZWNpYWxpc3RzJywgJyMyNDU3ZjUnXSwgWydudXJzZScsICdOdXJzZXMgJiBtaWR3aXZlcycsICcjNWIzZGY1J10sIFsncGlsbCcsICdQaGFybWFjaXN0cyAmIGFsbGllZCBoZWFsdGgnLCAnIzhhNGRmZiddLFxuICBbJ2hhbmRzJywgJ0NhcmVnaXZlcnMnLCAnI2ZmNmEyYyddLCBbJ2hlYXJ0JywgJ1BhdGllbnRzJywgJyMwMGE4OGEnXSwgWyd1c2VycycsICdIZWFsdGggY29uc3VtZXJzJywgJyNlYzQ4OTknXSxcbl07XG5cbmNvbnN0IFRJTUVMSU5FID0gW1xuICB7IHk6ICcyMDE3JywgdDogJ0ZyZXF1ZW50IFJlc2VhcmNoIGlzIGZvdW5kZWQnLCBkOiAnRnJlcXVlbnQgUmVzZWFyY2ggRmllbGR3b3JrIFNvbHV0aW9ucyBQdnQuIEx0ZC4gb3BlbnMgaXRzIGRvb3JzIGluIE5ldyBEZWxoaS4nLCBpYzogJ2J1aWxkaW5nJyB9LFxuICB7IHk6ICdJU08nLCB0OiAnQ2VydGlmaWVkLCB0aHJlZSB0aW1lcyBvdmVyJywgZDogJ0lTTyA5MDAxIHF1YWxpdHksIElTTyAyNzAwMSBpbmZvcm1hdGlvbiBzZWN1cml0eSBhbmQgSVNPIDIwMjUyIG1hcmtldCByZXNlYXJjaC4nLCBpYzogJ3NoaWVsZENoZWNrJyB9LFxuICB7IHk6ICdNSE8nLCB0OiAnQSBwYW5lbCBqdXN0IGZvciBoZWFsdGhjYXJlJywgZDogJ015SGVhbHRoT3BpbmlvbnMgbGF1bmNoZXMgZm9yIGhlYWx0aGNhcmUgcHJvZmVzc2lvbmFscywgY2FyZWdpdmVycyBhbmQgcGF0aWVudHMuJywgaWM6ICdoZWFydCcgfSxcbiAgeyB5OiAnNTUnLCB0OiAnQ291bnRyaWVzIGFuZCBjb3VudGluZycsIGQ6ICdNZW1iZXJzIGFjcm9zcyBBc2lhLVBhY2lmaWMsIEV1cm9wZSwgdGhlIE1pZGRsZSBFYXN0LCBBZnJpY2EgYW5kIHRoZSBBbWVyaWNhcy4nLCBpYzogJ2dsb2JlJyB9LFxuXTtcblxuLyogLS0tLS0tLS0tLSBIZXJvIGFydDogaG9sb2dyYXBoaWMgbWVtYmVyc2hpcCBjYXJkIC0tLS0tLS0tLS0gKi9cbmZ1bmN0aW9uIE1lbWJlckNhcmQoKSB7XG4gIHJldHVybiAoXG4gICAgPExpdmVab25lIGNsYXNzTmFtZT1cIm1jYXJkLXN0YWdlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1jYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWMtZmFjZSBtYy1mcm9udFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1jLWhvbG9cIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1jLXRvcFwiPjxIZWFydE1hcmsgc2l6ZT17MzR9IC8+PGI+TXlIZWFsdGhPcGluaW9uczwvYj48ZW0+TWVtYmVyPC9lbT48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWMtY2hpcFwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWMtcGVvcGxlXCI+XG4gICAgICAgICAgICA8UGVyc29uYSBraW5kPVwiZG9jdG9yXCIgc2tpbj17Mn0gaGFpcj17MH0gc2l6ZT17NDZ9IC8+XG4gICAgICAgICAgICA8UGVyc29uYSBraW5kPVwiY2FyZWdpdmVyXCIgc2tpbj17MX0gaGFpcj17M30gaGFpclN0eWxlPXsxfSBzaXplPXs0Nn0gLz5cbiAgICAgICAgICAgIDxQZXJzb25hIGtpbmQ9XCJwYXRpZW50XCIgc2tpbj17M30gaGFpcj17Mn0gc2l6ZT17NDZ9IC8+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1jLWxpbmVcIj48c21hbGw+SGVhbHRoY2FyZSByZXNlYXJjaCBjb21tdW5pdHk8L3NtYWxsPjxiPlNpbmNlIDIwMTc8L2I+PC9zcGFuPlxuICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwibWMtZWNnXCIgdmlld0JveD1cIjAgMCAzMDAgNDBcIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiPjxwYXRoIGQ9XCJNMCAyNGg5MGwxMC0xNiAxMiAyOCAxMC0yMiA4IDEwaDE3MFwiIHBhdGhMZW5ndGg9XCIxMDBcIiAvPjwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYy1mYWNlIG1jLWJhY2tcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYy1zdHJpcGVcIiAvPlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaT48SWNvbiBuYW1lPVwiZ2xvYmVcIiBzaXplPXsxNH0gLz4gNTUgY291bnRyaWVzPC9saT5cbiAgICAgICAgICAgIDxsaT48SWNvbiBuYW1lPVwic2hpZWxkQ2hlY2tcIiBzaXplPXsxNH0gLz4gMyBJU08gY2VydGlmaWNhdGlvbnM8L2xpPlxuICAgICAgICAgICAgPGxpPjxJY29uIG5hbWU9XCJ1c2Vyc1wiIHNpemU9ezE0fSAvPiAzMSwyNDArIHBhbmVsaXN0czwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIHtbWydjb2lucycsICdSZXdhcmRzIGZvciBldmVyeSBzdHVkeSddLCBbJ2xvY2snLCAnRGF0YSBuZXZlciBzb2xkJ10sIFsndXNlcnMnLCAnMjUrIHByb2Zlc3Npb25hbCBncm91cHMnXV0ubWFwKChbaWMsIHRdLCBpKSA9PiAoXG4gICAgICAgIDxzcGFuIGtleT17dH0gY2xhc3NOYW1lPVwibWMtZmxvYXRcIiBzdHlsZT17eyAnLS1pJzogaSB9fT48SWNvbiBuYW1lPXtpY30gc2l6ZT17MTR9IC8+e3R9PC9zcGFuPlxuICAgICAgKSl9XG4gICAgPC9MaXZlWm9uZT5cbiAgKTtcbn1cblxuLyogLS0tLS0tLS0tLSBEYXRhIHBpcGVsaW5lIC0tLS0tLS0tLS0gKi9cbmZ1bmN0aW9uIFBpcGVsaW5lKCkge1xuICBjb25zdCBMID0gWzQwLCAxMDAsIDE2MCwgMjIwLCAyODAsIDM0MF07XG4gIHJldHVybiAoXG4gICAgPExpdmVab25lIGNsYXNzTmFtZT1cInBpcGUzXCI+XG4gICAgICA8dWwgY2xhc3NOYW1lPVwicDMtY29sIHAzLWxlZnRcIj5cbiAgICAgICAge0NMSUVOVFMubWFwKChbaWMsIHRdLCBpKSA9PiA8bGkga2V5PXt0fSBzdHlsZT17eyAnLS1pJzogaSB9fT48SWNvbiBuYW1lPXtpY30gc2l6ZT17MTZ9IC8+e3R9PC9saT4pfVxuICAgICAgPC91bD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicDMtbWlkXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCA0MDAgMzgwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIj5cbiAgICAgICAgICB7TC5tYXAoKHksIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSBgTTAgJHt5fSBDIDEyMCAke3l9LCAxMjAgMTkwLCAxNzAgMTkwYDtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBgTTIzMCAxOTAgQyAyODAgMTkwLCAyODAgJHt5fSwgNDAwICR7eX1gO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGcga2V5PXtpfT5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPXthfSBjbGFzc05hbWU9XCJwMy13aXJlIHctaW5cIiAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9e2J9IGNsYXNzTmFtZT1cInAzLXdpcmUgdy1vdXRcIiAvPlxuICAgICAgICAgICAgICAgIDxjaXJjbGUgcj1cIjVcIiBjbGFzc05hbWU9XCJwMy1wayBpblwiPjxhbmltYXRlTW90aW9uIGR1cj17YCR7Mi4yICsgaSAqIDAuMjV9c2B9IHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIHBhdGg9e2F9IC8+PC9jaXJjbGU+XG4gICAgICAgICAgICAgICAgPGNpcmNsZSByPVwiNVwiIGNsYXNzTmFtZT1cInAzLXBrIG91dFwiPjxhbmltYXRlTW90aW9uIGR1cj17YCR7Mi40ICsgaSAqIDAuMn1zYH0gcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgcGF0aD17Yn0ga2V5UG9pbnRzPVwiMTswXCIga2V5VGltZXM9XCIwOzFcIiBjYWxjTW9kZT1cImxpbmVhclwiIC8+PC9jaXJjbGU+XG4gICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwMy1jb3JlXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicDMtZ2VhclwiIC8+XG4gICAgICAgICAgPEhlYXJ0TWFyayBzaXplPXs0Nn0gLz5cbiAgICAgICAgICA8Yj5NeUhlYWx0aE9waW5pb25zPC9iPlxuICAgICAgICAgIDxzbWFsbD52ZXJpZnkgXHUwMEI3IG1hdGNoIFx1MDBCNyBhbm9ueW1pc2UgXHUwMEI3IHJld2FyZDwvc21hbGw+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicDMtbGJsIGwxXCI+cXVlc3Rpb25zPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwMy1sYmwgbDJcIj5ob25lc3QgYW5zd2Vyczwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHVsIGNsYXNzTmFtZT1cInAzLWNvbCBwMy1yaWdodFwiPlxuICAgICAgICB7TUVNQkVSUy5tYXAoKFtpYywgdCwgY10sIGkpID0+IDxsaSBrZXk9e3R9IHN0eWxlPXt7ICctLWknOiBpLCAnLS1jJzogYyB9fT48SWNvbiBuYW1lPXtpY30gc2l6ZT17MTZ9IC8+e3R9PC9saT4pfVxuICAgICAgPC91bD5cbiAgICA8L0xpdmVab25lPlxuICApO1xufVxuXG4vKiAtLS0tLS0tLS0tIFByb21pc2UgdGlsZXMsIGVhY2ggd2l0aCBpdHMgb3duIG1pbmkgYW5pbWF0aW9uIC0tLS0tLS0tLS0gKi9cbmZ1bmN0aW9uIFByb21pc2VzKCkge1xuICBjb25zdCBbcmVmLCBpblZpZXddID0gdXNlSW5WaWV3KHsgdGhyZXNob2xkOiAwLjI1IH0pO1xuICByZXR1cm4gKFxuICAgIDxkaXYgcmVmPXtyZWZ9IGNsYXNzTmFtZT17YHByb21pc2VzICR7aW5WaWV3ID8gJ2lzLWluJyA6ICcnfWB9PlxuICAgICAgPGFydGljbGUgY2xhc3NOYW1lPVwicHIgcHItaGVhcnRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHItdml6XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDEyMCA1MFwiPjxwYXRoIGQ9XCJNMCAzMGgzMGw4LTE4IDEwIDM0IDEwLTI2IDggMTBoNTRcIiBwYXRoTGVuZ3RoPVwiMTAwXCIgLz48L3N2Zz48SWNvbiBuYW1lPVwiaGVhcnRcIiBzaXplPXszMH0gZmlsbD1cImN1cnJlbnRDb2xvclwiIHN0cm9rZT17MX0gLz48L3NwYW4+XG4gICAgICAgIDxoMz5QYXRpZW50LWNlbnRyaWM8L2gzPlxuICAgICAgICA8cD5MaXZlZCBleHBlcmllbmNlIGlzIGV2aWRlbmNlLiBXZSBtYWtlIHJvb20gZm9yIGl0IGluIG1lZGljaW5lIHJlc2VhcmNoLjwvcD5cbiAgICAgIDwvYXJ0aWNsZT5cbiAgICAgIDxhcnRpY2xlIGNsYXNzTmFtZT1cInByIHByLXNoaWVsZFwiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwci12aXpcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48SWNvbiBuYW1lPVwic2hpZWxkQ2hlY2tcIiBzaXplPXs0MH0gLz48aSBjbGFzc05hbWU9XCJwci1zY2FuXCIgLz48L3NwYW4+XG4gICAgICAgIDxoMz5UcnVzdCBiZWZvcmUgaHlwZTwvaDM+XG4gICAgICAgIDxwPk5vIGluY29tZSBwcm9taXNlcywgbm8gZmVlcywgbm8gc2VsbGluZyB5b3VyIGRhdGEuIEV2ZXIuPC9wPlxuICAgICAgPC9hcnRpY2xlPlxuICAgICAgPGFydGljbGUgY2xhc3NOYW1lPVwicHIgcHItdGFyZ2V0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInByLXZpelwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxzcGFuIGNsYXNzTmFtZT1cInByLXJpbmdzXCI+PGkgLz48aSAvPjxpIC8+PC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cInByLWRhcnRcIiAvPjwvc3Bhbj5cbiAgICAgICAgPGgzPlJpZ2h0IHBlcnNvbiwgcmlnaHQgc3R1ZHk8L2gzPlxuICAgICAgICA8cD5DYXJlZnVsIHByb2ZpbGluZyBtZWFucyBmZXdlciB3YXN0ZWQgc2NyZWVuZXJzIGFuZCBiZXR0ZXIgYW5zd2Vycy48L3A+XG4gICAgICA8L2FydGljbGU+XG4gICAgICA8YXJ0aWNsZSBjbGFzc05hbWU9XCJwciBwci1jb2luXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInByLXZpelwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPntbMCwgMSwgMiwgM10ubWFwKChpKSA9PiA8aSBrZXk9e2l9IGNsYXNzTmFtZT1cInByLWNcIiBzdHlsZT17eyAnLS1pJzogaSB9fSAvPil9PC9zcGFuPlxuICAgICAgICA8aDM+RmFpciByZXdhcmRzPC9oMz5cbiAgICAgICAgPHA+RXZlcnkgY29tcGxldGVkIHN0dWR5IGVhcm5zIHRoZSBpbmNlbnRpdmUgeW91IHNhdyBiZWZvcmUgeW91IHN0YXJ0ZWQuPC9wPlxuICAgICAgPC9hcnRpY2xlPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vKiAtLS0tLS0tLS0tIFJvYWQtbWFwIHRpbWVsaW5lIC0tLS0tLS0tLS0gKi9cbmZ1bmN0aW9uIFJvYWRtYXAoKSB7XG4gIGNvbnN0IFtyZWYsIGluVmlld10gPSB1c2VJblZpZXcoeyB0aHJlc2hvbGQ6IDAuMyB9KTtcbiAgY29uc3QgW29uLCBzZXRPbl0gPSB1c2VTdGF0ZSgwKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWluVmlldykgcmV0dXJuO1xuICAgIGNvbnN0IHQgPSBzZXRJbnRlcnZhbCgoKSA9PiBzZXRPbigoeCkgPT4gKHggKyAxKSAlIFRJTUVMSU5FLmxlbmd0aCksIDI2MDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHQpO1xuICB9LCBbaW5WaWV3XSk7XG4gIHJldHVybiAoXG4gICAgPGRpdiByZWY9e3JlZn0gY2xhc3NOYW1lPXtgcm9hZCAke2luVmlldyA/ICdpcy1pbicgOiAnJ31gfT5cbiAgICAgIDxzdmcgY2xhc3NOYW1lPVwicm9hZC1zdmdcIiB2aWV3Qm94PVwiMCAwIDEwMDAgMTIwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPHBhdGggY2xhc3NOYW1lPVwicm9hZC1iYXNlXCIgZD1cIk0wIDgwIEMgMTYwIDIwLCAzMjAgMTIwLCA1MDAgNzAgUyA4NDAgMjAsIDEwMDAgNzBcIiAvPlxuICAgICAgICA8cGF0aCBjbGFzc05hbWU9XCJyb2FkLWRhc2hcIiBkPVwiTTAgODAgQyAxNjAgMjAsIDMyMCAxMjAsIDUwMCA3MCBTIDg0MCAyMCwgMTAwMCA3MFwiIC8+XG4gICAgICAgIDxjaXJjbGUgcj1cIjEwXCIgY2xhc3NOYW1lPVwicm9hZC1jYXJcIj48YW5pbWF0ZU1vdGlvbiBkdXI9XCIxMHNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBwYXRoPVwiTTAgODAgQyAxNjAgMjAsIDMyMCAxMjAsIDUwMCA3MCBTIDg0MCAyMCwgMTAwMCA3MFwiIC8+PC9jaXJjbGU+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxvbD5cbiAgICAgICAge1RJTUVMSU5FLm1hcCgodCwgaSkgPT4gKFxuICAgICAgICAgIDxsaSBrZXk9e3QudH0gY2xhc3NOYW1lPXtpID09PSBvbiA/ICdvbicgOiAnJ30gc3R5bGU9e3sgJy0taSc6IGkgfX0gb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRPbihpKX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZC1waW5cIj48SWNvbiBuYW1lPXt0LmljfSBzaXplPXsxOH0gLz48L3NwYW4+XG4gICAgICAgICAgICA8YiBjbGFzc05hbWU9XCJyZC15XCI+e3QueX08L2I+XG4gICAgICAgICAgICA8aDM+e3QudH08L2gzPlxuICAgICAgICAgICAgPHA+e3QuZH08L3A+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L29sPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBYm91dCgpIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFBhZ2VIZXJvXG4gICAgICAgIHRoZW1lPVwiYWJvdXRcIlxuICAgICAgICBleWVicm93PVwiQWJvdXQgTXlIZWFsdGhPcGluaW9uc1wiXG4gICAgICAgIGV5ZWJyb3dDb2xvcj1cIiNmZjZhMmNcIlxuICAgICAgICB0aXRsZT17WydUcmFuc2Zvcm1pbmcgaGVhbHRoY2FyZSwnLCB7IHQ6ICdvbmUgb3BpbmlvbiBhdCBhIHRpbWUnLCBobDogJ2dyYWQnIH1dfVxuICAgICAgICBsZWFkPVwiTXlIZWFsdGhPcGluaW9ucyBpcyBhIGhlYWx0aGNhcmUgcmVzZWFyY2ggY29tbXVuaXR5IHBvd2VyZWQgYnkgRnJlcXVlbnQgUmVzZWFyY2guIFdlIGNvbm5lY3QgcGh5c2ljaWFucywgbnVyc2VzLCBhbGxpZWQgaGVhbHRoIHByb2Zlc3Npb25hbHMsIHBhdGllbnRzIGFuZCBjYXJlZ2l2ZXJzIHdpdGggdGhlIG9yZ2FuaXNhdGlvbnMgc2hhcGluZyB0b21vcnJvdydzIG1lZGljaW5lLCBhbmQgcmV3YXJkIGV2ZXJ5IG1lbWJlciBmb3IgdGhlaXIgdGltZS5cIlxuICAgICAgICBjdGFzPXtbeyBsYWJlbDogJ0pvaW4gdGhlIGNvbW11bml0eScsIHRvOiAnL2pvaW4nIH0sIHsgbGFiZWw6ICdXaG8gY2FuIGVhcm4nLCB0bzogJy9lYXJuJywgdmFyaWFudDogJ2dob3N0JywgaWNvbjogJ3VzZXJzJyB9XX1cbiAgICAgICAgYXJ0PXs8TWVtYmVyQ2FyZCAvPn1cbiAgICAgICAgY3J1bWJzPXtbeyB0bzogJy8nLCBsYWJlbDogJ0hvbWUnIH0sIHsgbGFiZWw6ICdBYm91dCBVcycgfV19XG4gICAgICAvPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIGFib3V0LXBsYXF1ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBzcGxpdFwiPlxuICAgICAgICAgIDxSZXZlYWwgY2xhc3NOYW1lPVwicGxhcXVlXCIgZWZmZWN0PVwiem9vbVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHEtYm9yZGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHEtaW5cIj5cbiAgICAgICAgICAgICAgPGltZyBjbGFzc05hbWU9XCJwcS1sb2dvXCIgc3JjPXtmckxvZ299IGFsdD1cIkZyZXF1ZW50IFJlc2VhcmNoIEZpZWxkd29yayBTb2x1dGlvbnMgXHUyMDE0IEluc2lnaHRzLCBBbmFseXRpY3MsIEdyb3d0aC4gQW4gSVNPIGNlcnRpZmllZCBjb21wYW55XCIgd2lkdGg9XCI1ODlcIiBoZWlnaHQ9XCIzMTRcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBxLXJpYmJvblwiPjxJY29uIG5hbWU9XCJzcGFya2xlXCIgc2l6ZT17MTR9IC8+IFBvd2VyZWQgYnkgRnJlcXVlbnQgUmVzZWFyY2g8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L1JldmVhbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwbGl0LWNvcHlcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImV5ZWJyb3dcIiBzdHlsZT17eyAnLS1lYic6ICcjMjQ1N2Y1JyB9fT48aSBhcmlhLWhpZGRlbj1cInRydWVcIiAvPldlbGNvbWUgdG8gTXlIZWFsdGhPcGluaW9uczwvc3Bhbj5cbiAgICAgICAgICAgIDxoMj5BIGhlYWx0aGNhcmUgcmVzZWFyY2ggY29tbXVuaXR5IGJ1aWx0IG9uIHJlYWwgZXhwZXJpZW5jZTwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsZWFkXCI+U2hhcmUgd2hhdCB5b3Ugc2VlIG9uIHRoZSB3YXJkLCBhdCB0aGUgYmVkc2lkZSBvciBpbiB5b3VyIG93biB0cmVhdG1lbnQsIGhlbHAgc2hhcGUgdGhlIG5leHQgZ2VuZXJhdGlvbiBvZiBoZWFsdGhjYXJlLCBhbmQgZ2V0IHJld2FyZGVkIGZvciB5b3VyIHRpbWUuPC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmYWN0LWRpYWxzXCI+XG4gICAgICAgICAgICAgIHtbWycyMDE3JywgJ2ZvdW5kZWQgaW4gTmV3IERlbGhpJywgMTAwLCAnIzI0NTdmNSddLCBbJzU1JywgJ2NvdW50cmllcycsIDc4LCAnIzAwYTg4YSddLCBbJzMnLCAnSVNPIGNlcnRpZmljYXRpb25zJywgNjAsICcjZmY2YTJjJ11dLm1hcCgoW3YsIGwsIHAsIGNdLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2x9IGNsYXNzTmFtZT1cImZkXCIgc3R5bGU9e3sgJy0tcCc6IHAsICctLWMnOiBjLCAnLS1pJzogaSB9fT5cbiAgICAgICAgICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCA4MCA4MFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxjaXJjbGUgY3g9XCI0MFwiIGN5PVwiNDBcIiByPVwiMzRcIiBjbGFzc05hbWU9XCJmZC1iZ1wiIC8+PGNpcmNsZSBjeD1cIjQwXCIgY3k9XCI0MFwiIHI9XCIzNFwiIGNsYXNzTmFtZT1cImZkLWZnXCIgcGF0aExlbmd0aD1cIjEwMFwiIC8+PC9zdmc+XG4gICAgICAgICAgICAgICAgICA8Yj57dn08L2I+PHNwYW4+e2x9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBhYm91dC1mbG93M1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxTZWN0aW9uSGVhZCBleWVicm93PVwiSG93IGhlYWx0aGNhcmUgbWFya2V0IHJlc2VhcmNoIGZsb3dzXCIgdGl0bGU9XCJGcm9tIHlvdXIgYW5zd2VyIHRvIGJldHRlciBtZWRpY2luZVwiIGxlYWQ9XCJPcmdhbmlzYXRpb25zIG5lZWQgcmVhbC13b3JsZCBpbnNpZ2h0LiBZb3UgaGF2ZSBpdC4gV2F0Y2ggdGhlIHF1ZXN0aW9ucyB0cmF2ZWwgaW4gYW5kIHRoZSBhbm9ueW1vdXMgYW5zd2VycyB0cmF2ZWwgb3V0LlwiIGNvbG9yPVwiI2ZmYjAyMFwiIC8+XG4gICAgICAgICAgPFBpcGVsaW5lIC8+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZmxvdy1ub3RlXCI+XG4gICAgICAgICAgICA8SWNvbiBuYW1lPVwiaW5mb1wiIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgPHNwYW4+V2UgcnVuIG9ubGluZSBzdXJ2ZXlzIGFuZCBtYXJrZXQgcmVzZWFyY2gsIG5vdCBjbGluaWNhbCB0cmlhbHMuIFBhaWQgY2xpbmljYWwgcmVzZWFyY2ggdGVzdHMgdHJlYXRtZW50cyB1bmRlciBtZWRpY2FsIHN1cGVydmlzaW9uOyBvdXIgc3R1ZGllcyBvbmx5IGFzayBmb3IgeW91ciB2aWV3cy4gPExpbmsgdG89XCIvYmxvZy9wYWlkLWNsaW5pY2FsLXN0dWRpZXMtdnMtcGFpZC1zdXJ2ZXlzXCI+U2VlIHRoZSBkaWZmZXJlbmNlPC9MaW5rPiBvciByZWFkIDxMaW5rIHRvPVwiL2Jsb2cvd2hhdC1pcy1hLWNsaW5pY2FsLXJlc2VhcmNoLW9yZ2FuaXphdGlvblwiPndoYXQgYSBjbGluaWNhbCByZXNlYXJjaCBvcmdhbml6YXRpb24gZG9lczwvTGluaz4uPC9zcGFuPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gYWJvdXQtcHJvbWlzZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIldoYXQgd2Ugc3RhbmQgZm9yXCIgdGl0bGU9XCJGb3VyIHByb21pc2VzIGJlaGluZCBldmVyeSBzdXJ2ZXlcIiBjb2xvcj1cIiMwMGE4OGFcIiAvPlxuICAgICAgICAgIDxQcm9taXNlcyAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBhYm91dC1yb2FkXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPFNlY3Rpb25IZWFkIGV5ZWJyb3c9XCJPdXIgam91cm5leVwiIHRpdGxlPVwiQnVpbHQgYnkgbWFya2V0IHJlc2VhcmNoIHNwZWNpYWxpc3RzXCIgY29sb3I9XCIjN2MzYWVkXCIgLz5cbiAgICAgICAgICA8Um9hZG1hcCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBhYm91dC1wcm9maWxlc1wiIGlkPVwicHJvZmlsZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIk91ciBoZWFsdGhjYXJlIHBhbmVsXCIgdGl0bGU9XCJUaHJlZSBkb29ycyBpbnRvIG9uZSBjb21tdW5pdHlcIiBsZWFkPVwiSGVhbHRoY2FyZSBwcm9mZXNzaW9uYWxzIGFjcm9zcyAxMCBncm91cHMgYW5kIDEsMzAwKyBqb2IgdGl0bGVzLCBjYXJlZ2l2ZXJzIG9mIGV2ZXJ5IGtpbmQsIGFuZCBwYXRpZW50cyBsaXZpbmcgd2l0aCAxOTUrIGNvbmRpdGlvbnMuIEVhY2ggaGFzIGl0cyBvd24gcGFnZSwgcHJvY2VzcyBhbmQgcmV3YXJkcy5cIiBjb2xvcj1cIiMyNDU3ZjVcIiAvPlxuICAgICAgICAgIDxBdWRpZW5jZVBvcnRhbHMgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gYWJvdXQtdmVyaWZ5XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIHNwbGl0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGxpdC1jb3B5XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJleWVicm93XCIgc3R5bGU9e3sgJy0tZWInOiAnIzAwYTg4YScgfX0+PGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5WZXJpZmllZCByZWNydWl0bWVudDwvc3Bhbj5cbiAgICAgICAgICAgIDxoMj5Qcm9mZXNzaW9uYWxzIGFyZSB3aG8gdGhleSBzYXkgdGhleSBhcmU8L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGVhZFwiPk91ciBxdWFsaXR5IHRlYW0gY2hlY2tzIHByb2Zlc3Npb25hbCBjcmVkZW50aWFscyBhbmQgZW1wbG95bWVudCB3aGVyZSBpdCBhcHBsaWVzLCB1c2luZyBzaXggdmVyaWZpY2F0aW9uIHByb3RvY29scyBwbHVzIGEgbWFudWFsIHJldmlldy48L3A+XG4gICAgICAgICAgICA8QnV0dG9uIHRvPVwiL3RydXN0LXNhZmV0eVwiIHZhcmlhbnQ9XCJnaG9zdFwiPkFsbCAxOCBxdWFsaXR5IGNoZWNrczwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxWZXJpZmljYXRpb25SaW5nIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIGNlcnRzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPFJldmVhbCBjbGFzc05hbWU9XCJjZXJ0cy1jYXJkXCIgZWZmZWN0PVwiem9vbVwiPlxuICAgICAgICAgICAgPGgyPkNlcnRpZmllZCBhbmQgYWZmaWxpYXRlZDwvaDI+XG4gICAgICAgICAgICA8cD5JU08gOTAwMToyMDE1LCBJU08gMjcwMDEsIElTTyAyMDI1MjoyMDE5LCBFU09NQVIgbWVtYmVyIGFuZCBNU01FIHJlZ2lzdGVyZWQuIEhvdmVyIGEgYmFkZ2UgdG8gZmxpcCBpdC48L3A+XG4gICAgICAgICAgICA8QmFkZ2VQYXJhZGUgbGlnaHQgLz5cbiAgICAgICAgICA8L1JldmVhbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC8+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBSUEsbUJBQW9DO0FBa0MxQjtBQXRCVixJQUFNLFVBQVU7QUFBQSxFQUNkLENBQUMsU0FBUyxrQkFBa0I7QUFBQSxFQUFHLENBQUMsV0FBVyxpQkFBaUI7QUFBQSxFQUFHLENBQUMsY0FBYyxhQUFhO0FBQUEsRUFDM0YsQ0FBQyxZQUFZLDRCQUE0QjtBQUFBLEVBQUcsQ0FBQyxTQUFTLGFBQWE7QUFBQSxFQUFHLENBQUMsUUFBUSwwQkFBMEI7QUFDM0c7QUFDQSxJQUFNLFVBQVU7QUFBQSxFQUNkLENBQUMsZUFBZSx5QkFBeUIsU0FBUztBQUFBLEVBQUcsQ0FBQyxTQUFTLHFCQUFxQixTQUFTO0FBQUEsRUFBRyxDQUFDLFFBQVEsK0JBQStCLFNBQVM7QUFBQSxFQUNqSixDQUFDLFNBQVMsY0FBYyxTQUFTO0FBQUEsRUFBRyxDQUFDLFNBQVMsWUFBWSxTQUFTO0FBQUEsRUFBRyxDQUFDLFNBQVMsb0JBQW9CLFNBQVM7QUFDL0c7QUFFQSxJQUFNLFdBQVc7QUFBQSxFQUNmLEVBQUUsR0FBRyxRQUFRLEdBQUcsZ0NBQWdDLEdBQUcsaUZBQWlGLElBQUksV0FBVztBQUFBLEVBQ25KLEVBQUUsR0FBRyxPQUFPLEdBQUcsK0JBQStCLEdBQUcsbUZBQW1GLElBQUksY0FBYztBQUFBLEVBQ3RKLEVBQUUsR0FBRyxPQUFPLEdBQUcsK0JBQStCLEdBQUcsb0ZBQW9GLElBQUksUUFBUTtBQUFBLEVBQ2pKLEVBQUUsR0FBRyxNQUFNLEdBQUcsMEJBQTBCLEdBQUcsa0ZBQWtGLElBQUksUUFBUTtBQUMzSTtBQUdBLFNBQVMsYUFBYTtBQUNwQixTQUNFLDZDQUFDLFlBQVMsV0FBVSxlQUFjLGVBQVksUUFDNUM7QUFBQSxpREFBQyxTQUFJLFdBQVUsU0FDYjtBQUFBLG1EQUFDLFNBQUksV0FBVSxvQkFDYjtBQUFBLG9EQUFDLFVBQUssV0FBVSxXQUFVO0FBQUEsUUFDMUIsNkNBQUMsVUFBSyxXQUFVLFVBQVM7QUFBQSxzREFBQyxhQUFVLE1BQU0sSUFBSTtBQUFBLFVBQUUsNENBQUMsT0FBRSw4QkFBZ0I7QUFBQSxVQUFJLDRDQUFDLFFBQUcsb0JBQU07QUFBQSxXQUFLO0FBQUEsUUFDdEYsNENBQUMsVUFBSyxXQUFVLFdBQVU7QUFBQSxRQUMxQiw2Q0FBQyxVQUFLLFdBQVUsYUFDZDtBQUFBLHNEQUFDLFdBQVEsTUFBSyxVQUFTLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxJQUFJO0FBQUEsVUFDbkQsNENBQUMsV0FBUSxNQUFLLGFBQVksTUFBTSxHQUFHLE1BQU0sR0FBRyxXQUFXLEdBQUcsTUFBTSxJQUFJO0FBQUEsVUFDcEUsNENBQUMsV0FBUSxNQUFLLFdBQVUsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLElBQUk7QUFBQSxXQUN0RDtBQUFBLFFBQ0EsNkNBQUMsVUFBSyxXQUFVLFdBQVU7QUFBQSxzREFBQyxXQUFNLDJDQUE2QjtBQUFBLFVBQVEsNENBQUMsT0FBRSx3QkFBVTtBQUFBLFdBQUk7QUFBQSxRQUN2Riw0Q0FBQyxTQUFJLFdBQVUsVUFBUyxTQUFRLGNBQWEscUJBQW9CLFFBQU8sc0RBQUMsVUFBSyxHQUFFLHVDQUFzQyxZQUFXLE9BQU0sR0FBRTtBQUFBLFNBQzNJO0FBQUEsTUFDQSw2Q0FBQyxTQUFJLFdBQVUsbUJBQ2I7QUFBQSxvREFBQyxVQUFLLFdBQVUsYUFBWTtBQUFBLFFBQzVCLDZDQUFDLFFBQ0M7QUFBQSx1REFBQyxRQUFHO0FBQUEsd0RBQUMsUUFBSyxNQUFLLFNBQVEsTUFBTSxJQUFJO0FBQUEsWUFBRTtBQUFBLGFBQWE7QUFBQSxVQUNoRCw2Q0FBQyxRQUFHO0FBQUEsd0RBQUMsUUFBSyxNQUFLLGVBQWMsTUFBTSxJQUFJO0FBQUEsWUFBRTtBQUFBLGFBQXFCO0FBQUEsVUFDOUQsNkNBQUMsUUFBRztBQUFBLHdEQUFDLFFBQUssTUFBSyxTQUFRLE1BQU0sSUFBSTtBQUFBLFlBQUU7QUFBQSxhQUFrQjtBQUFBLFdBQ3ZEO0FBQUEsU0FDRjtBQUFBLE9BQ0Y7QUFBQSxJQUNDLENBQUMsQ0FBQyxTQUFTLHlCQUF5QixHQUFHLENBQUMsUUFBUSxpQkFBaUIsR0FBRyxDQUFDLFNBQVMseUJBQXlCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUN2SCw2Q0FBQyxVQUFhLFdBQVUsWUFBVyxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUc7QUFBQSxrREFBQyxRQUFLLE1BQU0sSUFBSSxNQUFNLElBQUk7QUFBQSxNQUFHO0FBQUEsU0FBMUUsQ0FBNEUsQ0FDeEY7QUFBQSxLQUNIO0FBRUo7QUFHQSxTQUFTLFdBQVc7QUFDbEIsUUFBTSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssS0FBSyxLQUFLLEdBQUc7QUFDdEMsU0FDRSw2Q0FBQyxZQUFTLFdBQVUsU0FDbEI7QUFBQSxnREFBQyxRQUFHLFdBQVUsa0JBQ1gsa0JBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSw2Q0FBQyxRQUFXLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRztBQUFBLGtEQUFDLFFBQUssTUFBTSxJQUFJLE1BQU0sSUFBSTtBQUFBLE1BQUc7QUFBQSxTQUFyRCxDQUF1RCxDQUFLLEdBQ3BHO0FBQUEsSUFDQSw2Q0FBQyxTQUFJLFdBQVUsVUFBUyxlQUFZLFFBQ2xDO0FBQUEsa0RBQUMsU0FBSSxTQUFRLGVBQWMscUJBQW9CLFFBQzVDLFlBQUUsSUFBSSxDQUFDLEdBQUcsTUFBTTtBQUNmLGNBQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQzVCLGNBQU0sSUFBSSwyQkFBMkIsQ0FBQyxTQUFTLENBQUM7QUFDaEQsZUFDRSw2Q0FBQyxPQUNDO0FBQUEsc0RBQUMsVUFBSyxHQUFHLEdBQUcsV0FBVSxnQkFBZTtBQUFBLFVBQ3JDLDRDQUFDLFVBQUssR0FBRyxHQUFHLFdBQVUsaUJBQWdCO0FBQUEsVUFDdEMsNENBQUMsWUFBTyxHQUFFLEtBQUksV0FBVSxZQUFXLHNEQUFDLG1CQUFjLEtBQUssR0FBRyxNQUFNLElBQUksSUFBSSxLQUFLLGFBQVksY0FBYSxNQUFNLEdBQUcsR0FBRTtBQUFBLFVBQ2pILDRDQUFDLFlBQU8sR0FBRSxLQUFJLFdBQVUsYUFBWSxzREFBQyxtQkFBYyxLQUFLLEdBQUcsTUFBTSxJQUFJLEdBQUcsS0FBSyxhQUFZLGNBQWEsTUFBTSxHQUFHLFdBQVUsT0FBTSxVQUFTLE9BQU0sVUFBUyxVQUFTLEdBQUU7QUFBQSxhQUo1SixDQUtSO0FBQUEsTUFFSixDQUFDLEdBQ0g7QUFBQSxNQUNBLDZDQUFDLFVBQUssV0FBVSxXQUNkO0FBQUEsb0RBQUMsVUFBSyxXQUFVLFdBQVU7QUFBQSxRQUMxQiw0Q0FBQyxhQUFVLE1BQU0sSUFBSTtBQUFBLFFBQ3JCLDRDQUFDLE9BQUUsOEJBQWdCO0FBQUEsUUFDbkIsNENBQUMsV0FBTSwwREFBbUM7QUFBQSxTQUM1QztBQUFBLE1BQ0EsNENBQUMsVUFBSyxXQUFVLGFBQVksdUJBQVM7QUFBQSxNQUNyQyw0Q0FBQyxVQUFLLFdBQVUsYUFBWSw0QkFBYztBQUFBLE9BQzVDO0FBQUEsSUFDQSw0Q0FBQyxRQUFHLFdBQVUsbUJBQ1gsa0JBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxNQUFNLDZDQUFDLFFBQVcsT0FBTyxFQUFFLE9BQU8sR0FBRyxPQUFPLEVBQUUsR0FBRztBQUFBLGtEQUFDLFFBQUssTUFBTSxJQUFJLE1BQU0sSUFBSTtBQUFBLE1BQUc7QUFBQSxTQUEvRCxDQUFpRSxDQUFLLEdBQ2pIO0FBQUEsS0FDRjtBQUVKO0FBR0EsU0FBUyxXQUFXO0FBQ2xCLFFBQU0sQ0FBQyxLQUFLLE1BQU0sSUFBSSxVQUFVLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFDbkQsU0FDRSw2Q0FBQyxTQUFJLEtBQVUsV0FBVyxZQUFZLFNBQVMsVUFBVSxFQUFFLElBQ3pEO0FBQUEsaURBQUMsYUFBUSxXQUFVLGVBQ2pCO0FBQUEsbURBQUMsVUFBSyxXQUFVLFVBQVMsZUFBWSxRQUFPO0FBQUEsb0RBQUMsU0FBSSxTQUFRLGNBQWEsc0RBQUMsVUFBSyxHQUFFLHFDQUFvQyxZQUFXLE9BQU0sR0FBRTtBQUFBLFFBQU0sNENBQUMsUUFBSyxNQUFLLFNBQVEsTUFBTSxJQUFJLE1BQUssZ0JBQWUsUUFBUSxHQUFHO0FBQUEsU0FBRTtBQUFBLE1BQ3pNLDRDQUFDLFFBQUcsNkJBQWU7QUFBQSxNQUNuQiw0Q0FBQyxPQUFFLHFGQUF1RTtBQUFBLE9BQzVFO0FBQUEsSUFDQSw2Q0FBQyxhQUFRLFdBQVUsZ0JBQ2pCO0FBQUEsbURBQUMsVUFBSyxXQUFVLFVBQVMsZUFBWSxRQUFPO0FBQUEsb0RBQUMsUUFBSyxNQUFLLGVBQWMsTUFBTSxJQUFJO0FBQUEsUUFBRSw0Q0FBQyxPQUFFLFdBQVUsV0FBVTtBQUFBLFNBQUU7QUFBQSxNQUMxRyw0Q0FBQyxRQUFHLCtCQUFpQjtBQUFBLE1BQ3JCLDRDQUFDLE9BQUUsc0VBQXdEO0FBQUEsT0FDN0Q7QUFBQSxJQUNBLDZDQUFDLGFBQVEsV0FBVSxnQkFDakI7QUFBQSxtREFBQyxVQUFLLFdBQVUsVUFBUyxlQUFZLFFBQU87QUFBQSxxREFBQyxVQUFLLFdBQVUsWUFBVztBQUFBLHNEQUFDLE9BQUU7QUFBQSxVQUFFLDRDQUFDLE9BQUU7QUFBQSxVQUFFLDRDQUFDLE9BQUU7QUFBQSxXQUFFO0FBQUEsUUFBTyw0Q0FBQyxVQUFLLFdBQVUsV0FBVTtBQUFBLFNBQUU7QUFBQSxNQUN6SCw0Q0FBQyxRQUFHLHVDQUF5QjtBQUFBLE1BQzdCLDRDQUFDLE9BQUUsZ0ZBQWtFO0FBQUEsT0FDdkU7QUFBQSxJQUNBLDZDQUFDLGFBQVEsV0FBVSxjQUNqQjtBQUFBLGtEQUFDLFVBQUssV0FBVSxVQUFTLGVBQVksUUFBUSxXQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSw0Q0FBQyxPQUFVLFdBQVUsUUFBTyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQXRDLENBQXlDLENBQUUsR0FBRTtBQUFBLE1BQzFILDRDQUFDLFFBQUcsMEJBQVk7QUFBQSxNQUNoQiw0Q0FBQyxPQUFFLG1GQUFxRTtBQUFBLE9BQzFFO0FBQUEsS0FDRjtBQUVKO0FBR0EsU0FBUyxVQUFVO0FBQ2pCLFFBQU0sQ0FBQyxLQUFLLE1BQU0sSUFBSSxVQUFVLEVBQUUsV0FBVyxJQUFJLENBQUM7QUFDbEQsUUFBTSxDQUFDLElBQUksS0FBSyxRQUFJLHVCQUFTLENBQUM7QUFDOUIsOEJBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxPQUFRO0FBQ2IsVUFBTSxJQUFJLFlBQVksTUFBTSxNQUFNLENBQUMsT0FBTyxJQUFJLEtBQUssU0FBUyxNQUFNLEdBQUcsSUFBSTtBQUN6RSxXQUFPLE1BQU0sY0FBYyxDQUFDO0FBQUEsRUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUNYLFNBQ0UsNkNBQUMsU0FBSSxLQUFVLFdBQVcsUUFBUSxTQUFTLFVBQVUsRUFBRSxJQUNyRDtBQUFBLGlEQUFDLFNBQUksV0FBVSxZQUFXLFNBQVEsZ0JBQWUscUJBQW9CLFFBQU8sZUFBWSxRQUN0RjtBQUFBLGtEQUFDLFVBQUssV0FBVSxhQUFZLEdBQUUscURBQW9EO0FBQUEsTUFDbEYsNENBQUMsVUFBSyxXQUFVLGFBQVksR0FBRSxxREFBb0Q7QUFBQSxNQUNsRiw0Q0FBQyxZQUFPLEdBQUUsTUFBSyxXQUFVLFlBQVcsc0RBQUMsbUJBQWMsS0FBSSxPQUFNLGFBQVksY0FBYSxNQUFLLHFEQUFvRCxHQUFFO0FBQUEsT0FDbko7QUFBQSxJQUNBLDRDQUFDLFFBQ0UsbUJBQVMsSUFBSSxDQUFDLEdBQUcsTUFDaEIsNkNBQUMsUUFBYSxXQUFXLE1BQU0sS0FBSyxPQUFPLElBQUksT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLGNBQWMsTUFBTSxNQUFNLENBQUMsR0FDN0Y7QUFBQSxrREFBQyxVQUFLLFdBQVUsVUFBUyxzREFBQyxRQUFLLE1BQU0sRUFBRSxJQUFJLE1BQU0sSUFBSSxHQUFFO0FBQUEsTUFDdkQsNENBQUMsT0FBRSxXQUFVLFFBQVEsWUFBRSxHQUFFO0FBQUEsTUFDekIsNENBQUMsUUFBSSxZQUFFLEdBQUU7QUFBQSxNQUNULDRDQUFDLE9BQUcsWUFBRSxHQUFFO0FBQUEsU0FKRCxFQUFFLENBS1gsQ0FDRCxHQUNIO0FBQUEsS0FDRjtBQUVKO0FBRWUsU0FBUixRQUF5QjtBQUM5QixTQUNFLDRFQUNFO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLFNBQVE7QUFBQSxRQUNSLGNBQWE7QUFBQSxRQUNiLE9BQU8sQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLHlCQUF5QixJQUFJLE9BQU8sQ0FBQztBQUFBLFFBQzlFLE1BQUs7QUFBQSxRQUNMLE1BQU0sQ0FBQyxFQUFFLE9BQU8sc0JBQXNCLElBQUksUUFBUSxHQUFHLEVBQUUsT0FBTyxnQkFBZ0IsSUFBSSxTQUFTLFNBQVMsU0FBUyxNQUFNLFFBQVEsQ0FBQztBQUFBLFFBQzVILEtBQUssNENBQUMsY0FBVztBQUFBLFFBQ2pCLFFBQVEsQ0FBQyxFQUFFLElBQUksS0FBSyxPQUFPLE9BQU8sR0FBRyxFQUFFLE9BQU8sV0FBVyxDQUFDO0FBQUE7QUFBQSxJQUM1RDtBQUFBLElBRUEsNENBQUMsYUFBUSxXQUFVLHdCQUNqQix1REFBQyxTQUFJLFdBQVUsbUJBQ2I7QUFBQSxtREFBQyxVQUFPLFdBQVUsVUFBUyxRQUFPLFFBQ2hDO0FBQUEsb0RBQUMsVUFBSyxXQUFVLGFBQVksZUFBWSxRQUFPO0FBQUEsUUFDL0MsNkNBQUMsU0FBSSxXQUFVLFNBQ2I7QUFBQSxzREFBQyxTQUFJLFdBQVUsV0FBVSxLQUFLLGdDQUFRLEtBQUksc0dBQWdHLE9BQU0sT0FBTSxRQUFPLE9BQU0sU0FBUSxRQUFPO0FBQUEsVUFDbEwsNkNBQUMsVUFBSyxXQUFVLGFBQVk7QUFBQSx3REFBQyxRQUFLLE1BQUssV0FBVSxNQUFNLElBQUk7QUFBQSxZQUFFO0FBQUEsYUFBNkI7QUFBQSxXQUM1RjtBQUFBLFNBQ0Y7QUFBQSxNQUNBLDZDQUFDLFNBQUksV0FBVSxjQUNiO0FBQUEscURBQUMsVUFBSyxXQUFVLFdBQVUsT0FBTyxFQUFFLFFBQVEsVUFBVSxHQUFHO0FBQUEsc0RBQUMsT0FBRSxlQUFZLFFBQU87QUFBQSxVQUFFO0FBQUEsV0FBMkI7QUFBQSxRQUMzRyw0Q0FBQyxRQUFHLHNFQUF3RDtBQUFBLFFBQzVELDRDQUFDLE9BQUUsV0FBVSxRQUFPLG9LQUFzSjtBQUFBLFFBQzFLLDRDQUFDLFNBQUksV0FBVSxjQUNaLFdBQUMsQ0FBQyxRQUFRLHdCQUF3QixLQUFLLFNBQVMsR0FBRyxDQUFDLE1BQU0sYUFBYSxJQUFJLFNBQVMsR0FBRyxDQUFDLEtBQUssc0JBQXNCLElBQUksU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLE1BQ3JKLDZDQUFDLFNBQVksV0FBVSxNQUFLLE9BQU8sRUFBRSxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU8sRUFBRSxHQUNoRTtBQUFBLHVEQUFDLFNBQUksU0FBUSxhQUFZLGVBQVksUUFBTztBQUFBLHdEQUFDLFlBQU8sSUFBRyxNQUFLLElBQUcsTUFBSyxHQUFFLE1BQUssV0FBVSxTQUFRO0FBQUEsWUFBRSw0Q0FBQyxZQUFPLElBQUcsTUFBSyxJQUFHLE1BQUssR0FBRSxNQUFLLFdBQVUsU0FBUSxZQUFXLE9BQU07QUFBQSxhQUFFO0FBQUEsVUFDbkssNENBQUMsT0FBRyxhQUFFO0FBQUEsVUFBSSw0Q0FBQyxVQUFNLGFBQUU7QUFBQSxhQUZYLENBR1YsQ0FDRCxHQUNIO0FBQUEsU0FDRjtBQUFBLE9BQ0YsR0FDRjtBQUFBLElBRUEsNENBQUMsYUFBUSxXQUFVLHVCQUNqQix1REFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLGtEQUFDLGVBQVksU0FBUSx3Q0FBdUMsT0FBTSx1Q0FBc0MsTUFBSywySEFBMEgsT0FBTSxXQUFVO0FBQUEsTUFDdlAsNENBQUMsWUFBUztBQUFBLE1BQ1YsNkNBQUMsT0FBRSxXQUFVLGFBQ1g7QUFBQSxvREFBQyxRQUFLLE1BQUssUUFBTyxNQUFNLElBQUk7QUFBQSxRQUM1Qiw2Q0FBQyxVQUFLO0FBQUE7QUFBQSxVQUF3Syw0Q0FBQyxRQUFLLElBQUcsK0NBQThDLGdDQUFrQjtBQUFBLFVBQU87QUFBQSxVQUFTLDRDQUFDLFFBQUssSUFBRyxrREFBaUQsd0RBQTBDO0FBQUEsVUFBTztBQUFBLFdBQUM7QUFBQSxTQUNyWDtBQUFBLE9BQ0YsR0FDRjtBQUFBLElBRUEsNENBQUMsYUFBUSxXQUFVLDBCQUNqQix1REFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLGtEQUFDLGVBQVksU0FBUSxxQkFBb0IsT0FBTSxxQ0FBb0MsT0FBTSxXQUFVO0FBQUEsTUFDbkcsNENBQUMsWUFBUztBQUFBLE9BQ1osR0FDRjtBQUFBLElBRUEsNENBQUMsYUFBUSxXQUFVLHNCQUNqQix1REFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLGtEQUFDLGVBQVksU0FBUSxlQUFjLE9BQU0sd0NBQXVDLE9BQU0sV0FBVTtBQUFBLE1BQ2hHLDRDQUFDLFdBQVE7QUFBQSxPQUNYLEdBQ0Y7QUFBQSxJQUVBLDRDQUFDLGFBQVEsV0FBVSwwQkFBeUIsSUFBRyxZQUM3Qyx1REFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLGtEQUFDLGVBQVksU0FBUSx3QkFBdUIsT0FBTSxrQ0FBaUMsTUFBSyxvTEFBbUwsT0FBTSxXQUFVO0FBQUEsTUFDM1IsNENBQUMsbUJBQWdCO0FBQUEsT0FDbkIsR0FDRjtBQUFBLElBRUEsNENBQUMsYUFBUSxXQUFVLHdCQUNqQix1REFBQyxTQUFJLFdBQVUsbUJBQ2I7QUFBQSxtREFBQyxTQUFJLFdBQVUsY0FDYjtBQUFBLHFEQUFDLFVBQUssV0FBVSxXQUFVLE9BQU8sRUFBRSxRQUFRLFVBQVUsR0FBRztBQUFBLHNEQUFDLE9BQUUsZUFBWSxRQUFPO0FBQUEsVUFBRTtBQUFBLFdBQW9CO0FBQUEsUUFDcEcsNENBQUMsUUFBRyxxREFBdUM7QUFBQSxRQUMzQyw0Q0FBQyxPQUFFLFdBQVUsUUFBTyxzSkFBd0k7QUFBQSxRQUM1Siw0Q0FBQyxVQUFPLElBQUcsaUJBQWdCLFNBQVEsU0FBUSxtQ0FBcUI7QUFBQSxTQUNsRTtBQUFBLE1BQ0EsNENBQUMsb0JBQWlCO0FBQUEsT0FDcEIsR0FDRjtBQUFBLElBRUEsNENBQUMsYUFBUSxXQUFVLGlCQUNqQixzREFBQyxTQUFJLFdBQVUsYUFDYix1REFBQyxVQUFPLFdBQVUsY0FBYSxRQUFPLFFBQ3BDO0FBQUEsa0RBQUMsUUFBRyxzQ0FBd0I7QUFBQSxNQUM1Qiw0Q0FBQyxPQUFFLG9IQUFzRztBQUFBLE1BQ3pHLDRDQUFDLGVBQVksT0FBSyxNQUFDO0FBQUEsT0FDckIsR0FDRixHQUNGO0FBQUEsS0FDRjtBQUVKOyIsCiAgIm5hbWVzIjogW10KfQo=
