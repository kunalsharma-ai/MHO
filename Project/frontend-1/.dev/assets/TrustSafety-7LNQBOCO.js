import {
  PrivacySeal,
  QualityPipeline,
  VerificationRing
} from "/assets/chunk-UZU3UW3I.js";
import "/assets/chunk-UQWWOXC3.js";
import "/assets/chunk-SPSQFVM6.js";
import {
  ShieldHeroArt
} from "/assets/chunk-2PZ7UZDW.js";
import "/assets/chunk-GTWO7VGT.js";
import "/assets/chunk-53J6YGE2.js";
import {
  TopicHub
} from "/assets/chunk-YUJB3ZOX.js";
import {
  PageHero
} from "/assets/chunk-NVJYUHG3.js";
import {
  Button,
  Eyebrow,
  Icon,
  Link,
  Reveal,
  SectionHead,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/TrustSafety.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var CHECKLIST = [
  "Free to join \u2014 no deposit, no \u201Cactivation\u201D fee",
  "Real company name, address and support contacts",
  "Reward and time shown before each survey",
  "Clear privacy policy; data never sold",
  "Recognised payout methods (PayPal, bank, gift cards, UPI in India)",
  "Realistic earnings \u2014 no salary promises",
  "Industry standards (ISO 20252, ESOMAR)",
  "Easy account deletion"
];
function SiteChecker() {
  const [ticks, setTicks] = (0, import_react.useState)(() => CHECKLIST.map(() => false));
  const score = ticks.filter(Boolean).length;
  const verdict = score === CHECKLIST.length ? "Looks legit \u2714" : score >= 6 ? "Mostly fine \u2014 check the gaps" : score >= 3 ? "Proceed with caution" : "Red flags \u2014 walk away";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "checker", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ck-gauge", style: { "--p": score / CHECKLIST.length * 100 }, "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 120 70", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 64 A50 50 0 0 1 110 64", className: "ck-track" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 64 A50 50 0 0 1 110 64", className: "ck-fill", pathLength: "100" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
        score,
        "/",
        CHECKLIST.length
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ck-verdict", "aria-live": "polite", children: verdict }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: CHECKLIST.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: ticks[i] ? "on" : "", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: ticks[i], onChange: () => setTicks(ticks.map((t, k) => k === i ? !t : t)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ck-box", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 13, stroke: 3.5 }) }),
      c
    ] }) }, c)) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Use this checklist on any of the paid online survey sites you are considering \u2014 including us." })
  ] });
}
function TrustSafety() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      PageHero,
      {
        theme: "shield",
        eyebrow: "Trust & Safety",
        eyebrowColor: "#10b981",
        title: ["Legit paid survey sites", { t: "earn trust", hl: "mint" }, "\u2014 here is how we do it"],
        lead: "Eighteen quality and security checks, verified professionals, ISO-certified data security and a simple promise: your personal details are never sold or shared with clients.",
        ctas: [{ label: "Join safely", to: "/join" }, { label: "Privacy Policy", to: "/privacy", variant: "ghost", icon: "lock" }],
        art: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldHeroArt, {}),
        crumbs: [{ to: "/", label: "Home" }, { label: "Trust & Safety" }]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section ts-pipeline", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "18 checks, 3 stages", title: "Quality checks that protect every survey", lead: "From sign-up to the last question, each layer filters bots, duplicates and rushed answers \u2014 so the survey websites that pay can keep paying.", color: "#3d5afe" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QualityPipeline, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section ts-verify dark-band", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "split-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { color: "#34d399", children: "Professional verification" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
          "Six protocols + ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ink-mint", children: "manual review" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "lead", children: "Doctors, nurses and other professionals are checked through company email, phone, public profiles, external databases and behaviour monitoring, then reviewed by our quality team." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { className: "text-link light", to: "/profiling", children: [
          "Profiling & quality score ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationRing, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section ts-checker", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "split-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { color: "#e8344e", children: "Free money surveys? Not quite." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Spot legit paid surveys in 60 seconds" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "lead", children: "Joining a good survey site is free \u2014 but the rewards are earned, not \u201Cfree money\u201D. Adverts for \u201Cfree cash surveys\u201D that pay for nothing are selling something. Tick what the site you are checking does right." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { className: "text-link", to: "/blog/best-paid-survey-sites-checklist", children: [
          "Full checklist: best paid survey sites ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteChecker, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section ts-privacy", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container promise-grid", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacySeal, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { color: "#10b981", children: "Your data, protected" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What happens to your answers" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "data-flow", children: [
          ["user", "You answer", "in a secure, encrypted survey link"],
          ["layers", "We anonymise", "names & contact details removed"],
          ["chart", "Clients see totals", "combined results only, never you"]
        ].map(([ic, t, d], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { className: "df-step", delay: i * 140, effect: "left", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 20 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: d })
        ] }, t)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { to: "/gdpr", variant: "ghost", children: "GDPR & your rights" })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicHub, { groups: ["safety", "earn"], title: "Safe ways to make money online", eyebrow: "Stay scam-free", exclude: "/trust-safety" })
  ] });
}
export {
  TrustSafety as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL1RydXN0U2FmZXR5LmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gVHJ1c3QgJiBTYWZldHkgXHUyMDE0IHByaW1hcnk6IFwibGVnaXQgcGFpZCBzdXJ2ZXkgc2l0ZXNcIi4gU2Vjb25kYXJ5OiBwYWlkIG9ubGluZSBzdXJ2ZXkgc2l0ZXMsIHN1cnZleVxuLy8gd2Vic2l0ZXMgdGhhdCBwYXksIGZyZWUgbW9uZXkgc3VydmV5cyAoaG9uZXN0IGFuc3dlciksIGxlZ2l0IHBhaWQgc3VydmV5cywgc2FmZSB3YXlzIHRvIG1ha2UgbW9uZXkgb25saW5lLlxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUGFnZUhlcm8gZnJvbSAnLi4vY29tcG9uZW50cy9QYWdlSGVyby5qc3gnO1xuaW1wb3J0IHsgU2hpZWxkSGVyb0FydCB9IGZyb20gJy4uL2NvbXBvbmVudHMvSGVyb0FydC5qc3gnO1xuaW1wb3J0IHsgU2VjdGlvbkhlYWQsIFJldmVhbCwgQnV0dG9uLCBFeWVicm93IH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS5qc3gnO1xuaW1wb3J0IEljb24gZnJvbSAnLi4vY29tcG9uZW50cy9JY29uLmpzeCc7XG5pbXBvcnQgeyBRdWFsaXR5UGlwZWxpbmUsIFZlcmlmaWNhdGlvblJpbmcsIFByaXZhY3lTZWFsIH0gZnJvbSAnLi4vY29tcG9uZW50cy9TaG93Y2FzZS5qc3gnO1xuaW1wb3J0IFRvcGljSHViIGZyb20gJy4uL2NvbXBvbmVudHMvVG9waWNIdWIuanN4JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICcuLi9yb3V0ZXIuanN4JztcblxuY29uc3QgQ0hFQ0tMSVNUID0gW1xuICAnRnJlZSB0byBqb2luIFx1MjAxNCBubyBkZXBvc2l0LCBubyBcdTIwMUNhY3RpdmF0aW9uXHUyMDFEIGZlZScsXG4gICdSZWFsIGNvbXBhbnkgbmFtZSwgYWRkcmVzcyBhbmQgc3VwcG9ydCBjb250YWN0cycsXG4gICdSZXdhcmQgYW5kIHRpbWUgc2hvd24gYmVmb3JlIGVhY2ggc3VydmV5JyxcbiAgJ0NsZWFyIHByaXZhY3kgcG9saWN5OyBkYXRhIG5ldmVyIHNvbGQnLFxuICAnUmVjb2duaXNlZCBwYXlvdXQgbWV0aG9kcyAoUGF5UGFsLCBiYW5rLCBnaWZ0IGNhcmRzLCBVUEkgaW4gSW5kaWEpJyxcbiAgJ1JlYWxpc3RpYyBlYXJuaW5ncyBcdTIwMTQgbm8gc2FsYXJ5IHByb21pc2VzJyxcbiAgJ0luZHVzdHJ5IHN0YW5kYXJkcyAoSVNPIDIwMjUyLCBFU09NQVIpJyxcbiAgJ0Vhc3kgYWNjb3VudCBkZWxldGlvbicsXG5dO1xuXG5mdW5jdGlvbiBTaXRlQ2hlY2tlcigpIHtcbiAgY29uc3QgW3RpY2tzLCBzZXRUaWNrc10gPSB1c2VTdGF0ZSgoKSA9PiBDSEVDS0xJU1QubWFwKCgpID0+IGZhbHNlKSk7XG4gIGNvbnN0IHNjb3JlID0gdGlja3MuZmlsdGVyKEJvb2xlYW4pLmxlbmd0aDtcbiAgY29uc3QgdmVyZGljdCA9IHNjb3JlID09PSBDSEVDS0xJU1QubGVuZ3RoID8gJ0xvb2tzIGxlZ2l0IFx1MjcxNCcgOiBzY29yZSA+PSA2ID8gJ01vc3RseSBmaW5lIFx1MjAxNCBjaGVjayB0aGUgZ2FwcycgOiBzY29yZSA+PSAzID8gJ1Byb2NlZWQgd2l0aCBjYXV0aW9uJyA6ICdSZWQgZmxhZ3MgXHUyMDE0IHdhbGsgYXdheSc7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjaGVja2VyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNrLWdhdWdlXCIgc3R5bGU9e3sgJy0tcCc6IChzY29yZSAvIENIRUNLTElTVC5sZW5ndGgpICogMTAwIH19IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTIwIDcwXCI+PHBhdGggZD1cIk0xMCA2NCBBNTAgNTAgMCAwIDEgMTEwIDY0XCIgY2xhc3NOYW1lPVwiY2stdHJhY2tcIiAvPjxwYXRoIGQ9XCJNMTAgNjQgQTUwIDUwIDAgMCAxIDExMCA2NFwiIGNsYXNzTmFtZT1cImNrLWZpbGxcIiBwYXRoTGVuZ3RoPVwiMTAwXCIgLz48L3N2Zz5cbiAgICAgICAgPGI+e3Njb3JlfS97Q0hFQ0tMSVNULmxlbmd0aH08L2I+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxwIGNsYXNzTmFtZT1cImNrLXZlcmRpY3RcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj57dmVyZGljdH08L3A+XG4gICAgICA8dWw+XG4gICAgICAgIHtDSEVDS0xJU1QubWFwKChjLCBpKSA9PiAoXG4gICAgICAgICAgPGxpIGtleT17Y30+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXt0aWNrc1tpXSA/ICdvbicgOiAnJ30+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXt0aWNrc1tpXX0gb25DaGFuZ2U9eygpID0+IHNldFRpY2tzKHRpY2tzLm1hcCgodCwgaykgPT4gKGsgPT09IGkgPyAhdCA6IHQpKSl9IC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNrLWJveFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxJY29uIG5hbWU9XCJjaGVja1wiIHNpemU9ezEzfSBzdHJva2U9ezMuNX0gLz48L3NwYW4+XG4gICAgICAgICAgICAgIHtjfVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApKX1cbiAgICAgIDwvdWw+XG4gICAgICA8c21hbGw+VXNlIHRoaXMgY2hlY2tsaXN0IG9uIGFueSBvZiB0aGUgcGFpZCBvbmxpbmUgc3VydmV5IHNpdGVzIHlvdSBhcmUgY29uc2lkZXJpbmcgXHUyMDE0IGluY2x1ZGluZyB1cy48L3NtYWxsPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUcnVzdFNhZmV0eSgpIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFBhZ2VIZXJvXG4gICAgICAgIHRoZW1lPVwic2hpZWxkXCJcbiAgICAgICAgZXllYnJvdz1cIlRydXN0ICYgU2FmZXR5XCJcbiAgICAgICAgZXllYnJvd0NvbG9yPVwiIzEwYjk4MVwiXG4gICAgICAgIHRpdGxlPXtbJ0xlZ2l0IHBhaWQgc3VydmV5IHNpdGVzJywgeyB0OiAnZWFybiB0cnVzdCcsIGhsOiAnbWludCcgfSwgJ1x1MjAxNCBoZXJlIGlzIGhvdyB3ZSBkbyBpdCddfVxuICAgICAgICBsZWFkPVwiRWlnaHRlZW4gcXVhbGl0eSBhbmQgc2VjdXJpdHkgY2hlY2tzLCB2ZXJpZmllZCBwcm9mZXNzaW9uYWxzLCBJU08tY2VydGlmaWVkIGRhdGEgc2VjdXJpdHkgYW5kIGEgc2ltcGxlIHByb21pc2U6IHlvdXIgcGVyc29uYWwgZGV0YWlscyBhcmUgbmV2ZXIgc29sZCBvciBzaGFyZWQgd2l0aCBjbGllbnRzLlwiXG4gICAgICAgIGN0YXM9e1t7IGxhYmVsOiAnSm9pbiBzYWZlbHknLCB0bzogJy9qb2luJyB9LCB7IGxhYmVsOiAnUHJpdmFjeSBQb2xpY3knLCB0bzogJy9wcml2YWN5JywgdmFyaWFudDogJ2dob3N0JywgaWNvbjogJ2xvY2snIH1dfVxuICAgICAgICBhcnQ9ezxTaGllbGRIZXJvQXJ0IC8+fVxuICAgICAgICBjcnVtYnM9e1t7IHRvOiAnLycsIGxhYmVsOiAnSG9tZScgfSwgeyBsYWJlbDogJ1RydXN0ICYgU2FmZXR5JyB9XX1cbiAgICAgIC8+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gdHMtcGlwZWxpbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIjE4IGNoZWNrcywgMyBzdGFnZXNcIiB0aXRsZT1cIlF1YWxpdHkgY2hlY2tzIHRoYXQgcHJvdGVjdCBldmVyeSBzdXJ2ZXlcIiBsZWFkPVwiRnJvbSBzaWduLXVwIHRvIHRoZSBsYXN0IHF1ZXN0aW9uLCBlYWNoIGxheWVyIGZpbHRlcnMgYm90cywgZHVwbGljYXRlcyBhbmQgcnVzaGVkIGFuc3dlcnMgXHUyMDE0IHNvIHRoZSBzdXJ2ZXkgd2Vic2l0ZXMgdGhhdCBwYXkgY2FuIGtlZXAgcGF5aW5nLlwiIGNvbG9yPVwiIzNkNWFmZVwiIC8+XG4gICAgICAgICAgPFF1YWxpdHlQaXBlbGluZSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiB0cy12ZXJpZnkgZGFyay1iYW5kXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIHNwbGl0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGxpdC1jb3B5XCI+XG4gICAgICAgICAgICA8RXllYnJvdyBjb2xvcj1cIiMzNGQzOTlcIj5Qcm9mZXNzaW9uYWwgdmVyaWZpY2F0aW9uPC9FeWVicm93PlxuICAgICAgICAgICAgPGgyPlNpeCBwcm90b2NvbHMgKyA8c3BhbiBjbGFzc05hbWU9XCJpbmstbWludFwiPm1hbnVhbCByZXZpZXc8L3NwYW4+PC9oMj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxlYWRcIj5Eb2N0b3JzLCBudXJzZXMgYW5kIG90aGVyIHByb2Zlc3Npb25hbHMgYXJlIGNoZWNrZWQgdGhyb3VnaCBjb21wYW55IGVtYWlsLCBwaG9uZSwgcHVibGljIHByb2ZpbGVzLCBleHRlcm5hbCBkYXRhYmFzZXMgYW5kIGJlaGF2aW91ciBtb25pdG9yaW5nLCB0aGVuIHJldmlld2VkIGJ5IG91ciBxdWFsaXR5IHRlYW0uPC9wPlxuICAgICAgICAgICAgPExpbmsgY2xhc3NOYW1lPVwidGV4dC1saW5rIGxpZ2h0XCIgdG89XCIvcHJvZmlsaW5nXCI+UHJvZmlsaW5nICYgcXVhbGl0eSBzY29yZSA8SWNvbiBuYW1lPVwiYXJyb3dcIiBzaXplPXsxNH0gLz48L0xpbms+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPFZlcmlmaWNhdGlvblJpbmcgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gdHMtY2hlY2tlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBzcGxpdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BsaXQtY29weVwiPlxuICAgICAgICAgICAgPEV5ZWJyb3cgY29sb3I9XCIjZTgzNDRlXCI+RnJlZSBtb25leSBzdXJ2ZXlzPyBOb3QgcXVpdGUuPC9FeWVicm93PlxuICAgICAgICAgICAgPGgyPlNwb3QgbGVnaXQgcGFpZCBzdXJ2ZXlzIGluIDYwIHNlY29uZHM8L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGVhZFwiPkpvaW5pbmcgYSBnb29kIHN1cnZleSBzaXRlIGlzIGZyZWUgXHUyMDE0IGJ1dCB0aGUgcmV3YXJkcyBhcmUgZWFybmVkLCBub3QgXHUyMDFDZnJlZSBtb25leVx1MjAxRC4gQWR2ZXJ0cyBmb3IgXHUyMDFDZnJlZSBjYXNoIHN1cnZleXNcdTIwMUQgdGhhdCBwYXkgZm9yIG5vdGhpbmcgYXJlIHNlbGxpbmcgc29tZXRoaW5nLiBUaWNrIHdoYXQgdGhlIHNpdGUgeW91IGFyZSBjaGVja2luZyBkb2VzIHJpZ2h0LjwvcD5cbiAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cInRleHQtbGlua1wiIHRvPVwiL2Jsb2cvYmVzdC1wYWlkLXN1cnZleS1zaXRlcy1jaGVja2xpc3RcIj5GdWxsIGNoZWNrbGlzdDogYmVzdCBwYWlkIHN1cnZleSBzaXRlcyA8SWNvbiBuYW1lPVwiYXJyb3dcIiBzaXplPXsxNH0gLz48L0xpbms+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPFNpdGVDaGVja2VyIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIHRzLXByaXZhY3lcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgcHJvbWlzZS1ncmlkXCI+XG4gICAgICAgICAgPFByaXZhY3lTZWFsIC8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxFeWVicm93IGNvbG9yPVwiIzEwYjk4MVwiPllvdXIgZGF0YSwgcHJvdGVjdGVkPC9FeWVicm93PlxuICAgICAgICAgICAgPGgyPldoYXQgaGFwcGVucyB0byB5b3VyIGFuc3dlcnM8L2gyPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRhLWZsb3dcIj5cbiAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICBbJ3VzZXInLCAnWW91IGFuc3dlcicsICdpbiBhIHNlY3VyZSwgZW5jcnlwdGVkIHN1cnZleSBsaW5rJ10sXG4gICAgICAgICAgICAgICAgWydsYXllcnMnLCAnV2UgYW5vbnltaXNlJywgJ25hbWVzICYgY29udGFjdCBkZXRhaWxzIHJlbW92ZWQnXSxcbiAgICAgICAgICAgICAgICBbJ2NoYXJ0JywgJ0NsaWVudHMgc2VlIHRvdGFscycsICdjb21iaW5lZCByZXN1bHRzIG9ubHksIG5ldmVyIHlvdSddLFxuICAgICAgICAgICAgICBdLm1hcCgoW2ljLCB0LCBkXSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgIDxSZXZlYWwga2V5PXt0fSBjbGFzc05hbWU9XCJkZi1zdGVwXCIgZGVsYXk9e2kgKiAxNDB9IGVmZmVjdD1cImxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPjxJY29uIG5hbWU9e2ljfSBzaXplPXsyMH0gLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Yj57dH08L2I+XG4gICAgICAgICAgICAgICAgICA8c21hbGw+e2R9PC9zbWFsbD5cbiAgICAgICAgICAgICAgICA8L1JldmVhbD5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxCdXR0b24gdG89XCIvZ2RwclwiIHZhcmlhbnQ9XCJnaG9zdFwiPkdEUFIgJiB5b3VyIHJpZ2h0czwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPFRvcGljSHViIGdyb3Vwcz17WydzYWZldHknLCAnZWFybiddfSB0aXRsZT1cIlNhZmUgd2F5cyB0byBtYWtlIG1vbmV5IG9ubGluZVwiIGV5ZWJyb3c9XCJTdGF5IHNjYW0tZnJlZVwiIGV4Y2x1ZGU9XCIvdHJ1c3Qtc2FmZXR5XCIgLz5cbiAgICA8Lz5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxtQkFBeUI7QUEyQmpCO0FBbEJSLElBQU0sWUFBWTtBQUFBLEVBQ2hCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRUEsU0FBUyxjQUFjO0FBQ3JCLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx1QkFBUyxNQUFNLFVBQVUsSUFBSSxNQUFNLEtBQUssQ0FBQztBQUNuRSxRQUFNLFFBQVEsTUFBTSxPQUFPLE9BQU8sRUFBRTtBQUNwQyxRQUFNLFVBQVUsVUFBVSxVQUFVLFNBQVMsdUJBQWtCLFNBQVMsSUFBSSxzQ0FBaUMsU0FBUyxJQUFJLHlCQUF5QjtBQUNuSixTQUNFLDZDQUFDLFNBQUksV0FBVSxXQUNiO0FBQUEsaURBQUMsU0FBSSxXQUFVLFlBQVcsT0FBTyxFQUFFLE9BQVEsUUFBUSxVQUFVLFNBQVUsSUFBSSxHQUFHLGVBQVksUUFDeEY7QUFBQSxtREFBQyxTQUFJLFNBQVEsY0FBYTtBQUFBLG9EQUFDLFVBQUssR0FBRSw4QkFBNkIsV0FBVSxZQUFXO0FBQUEsUUFBRSw0Q0FBQyxVQUFLLEdBQUUsOEJBQTZCLFdBQVUsV0FBVSxZQUFXLE9BQU07QUFBQSxTQUFFO0FBQUEsTUFDbEssNkNBQUMsT0FBRztBQUFBO0FBQUEsUUFBTTtBQUFBLFFBQUUsVUFBVTtBQUFBLFNBQU87QUFBQSxPQUMvQjtBQUFB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
