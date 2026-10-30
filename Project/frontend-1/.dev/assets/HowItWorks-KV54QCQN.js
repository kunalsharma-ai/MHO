import {
  STEPS
} from "/assets/chunk-YPHFYR4R.js";
import {
  HOW_FAQ
} from "/assets/chunk-EVZY7DYQ.js";
import {
  TopicHub
} from "/assets/chunk-YUJB3ZOX.js";
import {
  PageHero
} from "/assets/chunk-NVJYUHG3.js";
import {
  Accordion,
  Eyebrow,
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

// src/pages/HowItWorks.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);

// src/components/HowV4.jsx
init_define_import_meta_env();
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function ConveyorArt() {
  const boxes = [["user", "Join"], ["clipboard", "Profile"], ["mail", "Invite"], ["check", "Survey"]];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "conv", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cv-press", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "cvp-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "coins", size: 20 }),
        " Reward press"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cvp-ram" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cvp-light" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cv-belt", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cvb-top" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cvb-rollers", children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}, i)) }),
      boxes.map(([ic, t], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cv-box", style: { "--i": i }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "cvx-face", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 18 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t })
      ] }) }, t))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cv-coin", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "$" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "cv-wallet", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "wallet", size: 22 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Paid" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cv-spark s1" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cv-spark s2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cv-spark s3" })
  ] });
}
function LoopTrack({ steps }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "loop", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "lp-track", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 300 300", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "lp-g", x1: "0", y1: "0", x2: "1", y2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#3d5afe" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".35", stopColor: "#14b8a6" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".7", stopColor: "#f59e0b" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#e8344e" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "150", cy: "150", r: "118", className: "lp-road" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "150", cy: "150", r: "118", className: "lp-lane", stroke: "url(#lp-g)" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "150", cy: "150", r: "118", className: "lp-dash" }),
        steps.map((s, i) => {
          const a = (-90 + i * 90) * (Math.PI / 180);
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 150 + 118 * Math.cos(a), cy: 150 + 118 * Math.sin(a), r: "15", className: "lp-check", style: { "--c": s.color, "--i": i } }, s.title);
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "lp-token", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { r: "10" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { r: "18", className: "lp-halo" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "lp-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "refresh", size: 26 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Repeat" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "new studies every month" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "lp-steps", children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { style: { "--c": s.color, "--i": i }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lps-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: s.icon, size: 20 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
          "Checkpoint ",
          i + 1
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: s.title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.text })
      ] })
    ] }, s.title)) })
  ] });
}
var toAngle = (time) => {
  if (!/^\d/.test(time)) return 300;
  const [h, m] = time.split(":").map(Number);
  return (h + m / 60) / 24 * 360;
};
function DayDial({ items, day, setDay }) {
  const cur = items[day];
  const ang = toAngle(cur.time);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dial", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dl-face", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 260 260", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "130", cy: "130", r: "118", className: "dl-ring" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M248 130 A118 118 0 0 1 12 130", className: "dl-sun" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 130 A118 118 0 0 1 248 130", className: "dl-night" }),
        Array.from({ length: 24 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "130", y1: "16", x2: "130", y2: i % 6 ? 24 : 32, transform: `rotate(${i * 15} 130 130)`, className: "dl-tick" }, i)),
        ["0", "6", "12", "18"].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", { x: 130 + 92 * Math.sin(i * 90 * Math.PI / 180), y: 134 - 92 * Math.cos(i * 90 * Math.PI / 180), textAnchor: "middle", className: "dl-num", children: t }, t)),
        items.map((d, i) => {
          const a = toAngle(d.time) * Math.PI / 180;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 130 + 108 * Math.sin(a), cy: 130 - 108 * Math.cos(a), r: i === day ? 10 : 7, className: `dl-dot ${i === day ? "on" : i < day ? "past" : ""}` }, d.t);
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "dl-hand", style: { transform: `rotate(${ang}deg)` }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "130", y1: "130", x2: "130", y2: "40" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "130", cy: "130", r: "8" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dl-icon", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: cur.ic, size: 22 }) }, day)
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dl-list", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: items.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: i === day ? "on" : i < day ? "past" : "", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { onClick: () => setDay(i), "aria-pressed": i === day, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dlt-time", children: d.time }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dlt-txt", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: d.t }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: d.d })
        ] })
      ] }) }, d.t)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "btn btn-gold", onClick: () => setDay((day + 1) % items.length), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: day === items.length - 1 ? "Start the day again" : "Next moment" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 18 })
      ] })
    ] })
  ] });
}

// src/pages/HowItWorks.jsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var FUNNEL = [
  { t: "Invitation sent", d: "Matched on your profile", w: 100, c: "#3d5afe" },
  { t: "Screening questions", d: "Do you fit this exact study?", w: 78, c: "#14b8a6" },
  { t: "Quality checks", d: "Attention & consistency", w: 60, c: "#f59e0b" },
  { t: "Survey completed", d: "Reward credited after validation", w: 46, c: "#e8344e" }
];
function Funnel() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref, className: `funnel ${inView ? "is-in" : ""}`, children: FUNNEL.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "fn-row", style: { "--w": f.w + "%", "--c": f.c, "--i": i }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "fn-bar", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: f.t }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: f.d })
  ] }) }, f.t)) });
}
var TIPS = [
  { ic: "clipboard", t: "Complete every profile section", d: "More detail = more matched invitations, fewer screen-outs." },
  { ic: "bell", t: "Open invitations early", d: "Studies close once they reach their quota." },
  { ic: "pen", t: "Write real open-ended answers", d: "Thoughtful answers protect your quality score." },
  { ic: "phone", t: "Use any device", d: "Most surveys work on phone, tablet or laptop." },
  { ic: "clock", t: "Check the time estimate", d: "Start when you can finish in one sitting." },
  { ic: "shieldCheck", t: "Answer consistently", d: "Attention checks catch rushed or random answers." }
];
var DAY = [
  { time: "08:10", ic: "mail", t: "Invitation lands", d: "\u201CHeart health study \xB7 15 min \xB7 reward shown\u201D" },
  { time: "12:40", ic: "phone", t: "Lunch-break survey", d: "Screener passed, 15 minutes on the phone." },
  { time: "12:56", ic: "check", t: "Completed", d: "Points pending validation on your dashboard." },
  { time: "Later", ic: "wallet", t: "Redeem", d: "Hit the threshold \u2192 \u201CRedeem Now\u201D \u2192 PayPal, Wire, Gift Card or UPI." }
];
function HowItWorks() {
  const [day, setDay] = (0, import_react.useState)(0);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      PageHero,
      {
        theme: "journey",
        eyebrow: "How it works",
        eyebrowColor: "#14b8a6",
        title: ["Get paid to take surveys", { t: "in four", hl: "marker" }, { t: "simple steps", hl: "grad" }],
        lead: "Join free, tell us about yourself once, receive surveys that match you, and redeem rewards your way. Here is exactly what happens \u2014 including the parts other survey sites skip.",
        ctas: [{ label: "Create my free account", to: "/join" }, { label: "Payout options", to: "/rewards", variant: "ghost", icon: "wallet" }],
        art: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ConveyorArt, {}),
        crumbs: [{ to: "/", label: "Home" }, { label: "How It Works" }]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section how-steps", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionHead, { eyebrow: "The journey", title: "Survey and get paid \u2014 the whole loop", lead: "Four checkpoints, then round again: every new study that matches your profile starts another lap.", color: "#3d5afe" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoopTrack, { steps: STEPS })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section how-day dark-band", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "split-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Eyebrow, { color: "#facc15", children: "A day of doing surveys for money" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h2", { children: [
          "Fits into the gaps of a ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ink-gold", children: "busy day" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "lead", children: "Spin through a typical day on the 24-hour dial. No fixed hours \u2014 you decide when to take surveys for money." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DayDial, { items: DAY, day, setDay })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section how-funnel", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Funnel, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "split-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Eyebrow, { color: "#f59e0b", children: "Why not every invite pays" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "Screening is how paid surveys stay valuable" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "lead", children: "Researchers pay for a precise audience. Short screeners make sure you are a fit before you invest time \u2014 so when you do qualify, your opinion genuinely counts and you earn money through surveys that match you." }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Link, { className: "text-link", to: "/blog/why-you-get-screened-out-of-surveys", children: [
          "Why you get screened out ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "arrow", size: 14 })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section how-tips", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionHead, { eyebrow: "Pro tips", title: "Get paid to do surveys more often", lead: "Six habits of members who receive the most invitations.", color: "#e8344e" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tips-grid", children: TIPS.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Reveal, { className: "tip", delay: i * 70, effect: i % 2 ? "up" : "zoom", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tip-n", children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: t.ic, size: 22 }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { children: t.t }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: t.d })
      ] }, t.t)) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section how-faq", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container faq-split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionHead, { align: "left", eyebrow: "Paid to do surveys?", title: "Common questions", color: "#14b8a6" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Accordion, { items: HOW_FAQ, idPrefix: "howfaq", defaultOpen: 0 })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TopicHub, { groups: ["surveys", "payouts"], title: "Learn more about paid surveys", eyebrow: "Guides" })
  ] });
}
export {
  HowItWorks as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL0hvd0l0V29ya3MuanN4IiwgIi4uLy4uL3NyYy9jb21wb25lbnRzL0hvd1Y0LmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gSG93IGl0IHdvcmtzIFx1MjAxNCBwcmltYXJ5OiBcImdldCBwYWlkIHRvIHRha2Ugc3VydmV5c1wiLiBTZWNvbmRhcnk6IGdldCBwYWlkIHRvIGRvIHN1cnZleXMsIHBhaWQgdG8gZG9cbi8vIHN1cnZleXMsIHN1cnZleSBhbmQgZ2V0IHBhaWQsIHRha2Ugc3VydmV5cyBmb3IgbW9uZXksIGRvaW5nIHN1cnZleXMgZm9yIG1vbmV5LCBlYXJuIG1vbmV5IHRocm91Z2ggc3VydmV5cy5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFBhZ2VIZXJvIGZyb20gJy4uL2NvbXBvbmVudHMvUGFnZUhlcm8uanN4JztcbmltcG9ydCB7IFNlY3Rpb25IZWFkLCBSZXZlYWwsIEV5ZWJyb3csIHVzZUluVmlldywgQWNjb3JkaW9uIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS5qc3gnO1xuaW1wb3J0IEljb24gZnJvbSAnLi4vY29tcG9uZW50cy9JY29uLmpzeCc7XG5pbXBvcnQgeyBDb252ZXlvckFydCwgTG9vcFRyYWNrLCBEYXlEaWFsIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ib3dWNC5qc3gnO1xuaW1wb3J0IFRvcGljSHViIGZyb20gJy4uL2NvbXBvbmVudHMvVG9waWNIdWIuanN4JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICcuLi9yb3V0ZXIuanN4JztcbmltcG9ydCB7IFNURVBTIH0gZnJvbSAnLi4vZGF0YS9zdXJ2ZXlzLmpzJztcbmltcG9ydCB7IEhPV19GQVEgfSBmcm9tICcuLi9kYXRhL2ZhcXMuanMnO1xuXG5jb25zdCBGVU5ORUwgPSBbXG4gIHsgdDogJ0ludml0YXRpb24gc2VudCcsIGQ6ICdNYXRjaGVkIG9uIHlvdXIgcHJvZmlsZScsIHc6IDEwMCwgYzogJyMzZDVhZmUnIH0sXG4gIHsgdDogJ1NjcmVlbmluZyBxdWVzdGlvbnMnLCBkOiAnRG8geW91IGZpdCB0aGlzIGV4YWN0IHN0dWR5PycsIHc6IDc4LCBjOiAnIzE0YjhhNicgfSxcbiAgeyB0OiAnUXVhbGl0eSBjaGVja3MnLCBkOiAnQXR0ZW50aW9uICYgY29uc2lzdGVuY3knLCB3OiA2MCwgYzogJyNmNTllMGInIH0sXG4gIHsgdDogJ1N1cnZleSBjb21wbGV0ZWQnLCBkOiAnUmV3YXJkIGNyZWRpdGVkIGFmdGVyIHZhbGlkYXRpb24nLCB3OiA0NiwgYzogJyNlODM0NGUnIH0sXG5dO1xuXG5mdW5jdGlvbiBGdW5uZWwoKSB7XG4gIGNvbnN0IFtyZWYsIGluVmlld10gPSB1c2VJblZpZXcoeyB0aHJlc2hvbGQ6IDAuMyB9KTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IHJlZj17cmVmfSBjbGFzc05hbWU9e2BmdW5uZWwgJHtpblZpZXcgPyAnaXMtaW4nIDogJyd9YH0+XG4gICAgICB7RlVOTkVMLm1hcCgoZiwgaSkgPT4gKFxuICAgICAgICA8ZGl2IGtleT17Zi50fSBjbGFzc05hbWU9XCJmbi1yb3dcIiBzdHlsZT17eyAnLS13JzogZi53ICsgJyUnLCAnLS1jJzogZi5jLCAnLS1pJzogaSB9fT5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbi1iYXJcIj48Yj57Zi50fTwvYj48c21hbGw+e2YuZH08L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuY29uc3QgVElQUyA9IFtcbiAgeyBpYzogJ2NsaXBib2FyZCcsIHQ6ICdDb21wbGV0ZSBldmVyeSBwcm9maWxlIHNlY3Rpb24nLCBkOiAnTW9yZSBkZXRhaWwgPSBtb3JlIG1hdGNoZWQgaW52aXRhdGlvbnMsIGZld2VyIHNjcmVlbi1vdXRzLicgfSxcbiAgeyBpYzogJ2JlbGwnLCB0OiAnT3BlbiBpbnZpdGF0aW9ucyBlYXJseScsIGQ6ICdTdHVkaWVzIGNsb3NlIG9uY2UgdGhleSByZWFjaCB0aGVpciBxdW90YS4nIH0sXG4gIHsgaWM6ICdwZW4nLCB0OiAnV3JpdGUgcmVhbCBvcGVuLWVuZGVkIGFuc3dlcnMnLCBkOiAnVGhvdWdodGZ1bCBhbnN3ZXJzIHByb3RlY3QgeW91ciBxdWFsaXR5IHNjb3JlLicgfSxcbiAgeyBpYzogJ3Bob25lJywgdDogJ1VzZSBhbnkgZGV2aWNlJywgZDogJ01vc3Qgc3VydmV5cyB3b3JrIG9uIHBob25lLCB0YWJsZXQgb3IgbGFwdG9wLicgfSxcbiAgeyBpYzogJ2Nsb2NrJywgdDogJ0NoZWNrIHRoZSB0aW1lIGVzdGltYXRlJywgZDogJ1N0YXJ0IHdoZW4geW91IGNhbiBmaW5pc2ggaW4gb25lIHNpdHRpbmcuJyB9LFxuICB7IGljOiAnc2hpZWxkQ2hlY2snLCB0OiAnQW5zd2VyIGNvbnNpc3RlbnRseScsIGQ6ICdBdHRlbnRpb24gY2hlY2tzIGNhdGNoIHJ1c2hlZCBvciByYW5kb20gYW5zd2Vycy4nIH0sXG5dO1xuXG5jb25zdCBEQVkgPSBbXG4gIHsgdGltZTogJzA4OjEwJywgaWM6ICdtYWlsJywgdDogJ0ludml0YXRpb24gbGFuZHMnLCBkOiAnXHUyMDFDSGVhcnQgaGVhbHRoIHN0dWR5IFx1MDBCNyAxNSBtaW4gXHUwMEI3IHJld2FyZCBzaG93blx1MjAxRCcgfSxcbiAgeyB0aW1lOiAnMTI6NDAnLCBpYzogJ3Bob25lJywgdDogJ0x1bmNoLWJyZWFrIHN1cnZleScsIGQ6ICdTY3JlZW5lciBwYXNzZWQsIDE1IG1pbnV0ZXMgb24gdGhlIHBob25lLicgfSxcbiAgeyB0aW1lOiAnMTI6NTYnLCBpYzogJ2NoZWNrJywgdDogJ0NvbXBsZXRlZCcsIGQ6ICdQb2ludHMgcGVuZGluZyB2YWxpZGF0aW9uIG9uIHlvdXIgZGFzaGJvYXJkLicgfSxcbiAgeyB0aW1lOiAnTGF0ZXInLCBpYzogJ3dhbGxldCcsIHQ6ICdSZWRlZW0nLCBkOiAnSGl0IHRoZSB0aHJlc2hvbGQgXHUyMTkyIFx1MjAxQ1JlZGVlbSBOb3dcdTIwMUQgXHUyMTkyIFBheVBhbCwgV2lyZSwgR2lmdCBDYXJkIG9yIFVQSS4nIH0sXG5dO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvd0l0V29ya3MoKSB7XG4gIGNvbnN0IFtkYXksIHNldERheV0gPSB1c2VTdGF0ZSgwKTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFBhZ2VIZXJvXG4gICAgICAgIHRoZW1lPVwiam91cm5leVwiXG4gICAgICAgIGV5ZWJyb3c9XCJIb3cgaXQgd29ya3NcIlxuICAgICAgICBleWVicm93Q29sb3I9XCIjMTRiOGE2XCJcbiAgICAgICAgdGl0bGU9e1snR2V0IHBhaWQgdG8gdGFrZSBzdXJ2ZXlzJywgeyB0OiAnaW4gZm91cicsIGhsOiAnbWFya2VyJyB9LCB7IHQ6ICdzaW1wbGUgc3RlcHMnLCBobDogJ2dyYWQnIH1dfVxuICAgICAgICBsZWFkPVwiSm9pbiBmcmVlLCB0ZWxsIHVzIGFib3V0IHlvdXJzZWxmIG9uY2UsIHJlY2VpdmUgc3VydmV5cyB0aGF0IG1hdGNoIHlvdSwgYW5kIHJlZGVlbSByZXdhcmRzIHlvdXIgd2F5LiBIZXJlIGlzIGV4YWN0bHkgd2hhdCBoYXBwZW5zIFx1MjAxNCBpbmNsdWRpbmcgdGhlIHBhcnRzIG90aGVyIHN1cnZleSBzaXRlcyBza2lwLlwiXG4gICAgICAgIGN0YXM9e1t7IGxhYmVsOiAnQ3JlYXRlIG15IGZyZWUgYWNjb3VudCcsIHRvOiAnL2pvaW4nIH0sIHsgbGFiZWw6ICdQYXlvdXQgb3B0aW9ucycsIHRvOiAnL3Jld2FyZHMnLCB2YXJpYW50OiAnZ2hvc3QnLCBpY29uOiAnd2FsbGV0JyB9XX1cbiAgICAgICAgYXJ0PXs8Q29udmV5b3JBcnQgLz59XG4gICAgICAgIGNydW1icz17W3sgdG86ICcvJywgbGFiZWw6ICdIb21lJyB9LCB7IGxhYmVsOiAnSG93IEl0IFdvcmtzJyB9XX1cbiAgICAgIC8+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gaG93LXN0ZXBzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPFNlY3Rpb25IZWFkIGV5ZWJyb3c9XCJUaGUgam91cm5leVwiIHRpdGxlPVwiU3VydmV5IGFuZCBnZXQgcGFpZCBcdTIwMTQgdGhlIHdob2xlIGxvb3BcIiBsZWFkPVwiRm91ciBjaGVja3BvaW50cywgdGhlbiByb3VuZCBhZ2FpbjogZXZlcnkgbmV3IHN0dWR5IHRoYXQgbWF0Y2hlcyB5b3VyIHByb2ZpbGUgc3RhcnRzIGFub3RoZXIgbGFwLlwiIGNvbG9yPVwiIzNkNWFmZVwiIC8+XG4gICAgICAgICAgPExvb3BUcmFjayBzdGVwcz17U1RFUFN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICB7LyogQSBkYXkgaW4gdGhlIGxpZmUgXHUyMDE0IGludGVyYWN0aXZlIHRpbWVsaW5lICovfVxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBob3ctZGF5IGRhcmstYmFuZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBzcGxpdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BsaXQtY29weVwiPlxuICAgICAgICAgICAgPEV5ZWJyb3cgY29sb3I9XCIjZmFjYzE1XCI+QSBkYXkgb2YgZG9pbmcgc3VydmV5cyBmb3IgbW9uZXk8L0V5ZWJyb3c+XG4gICAgICAgICAgICA8aDI+Rml0cyBpbnRvIHRoZSBnYXBzIG9mIGEgPHNwYW4gY2xhc3NOYW1lPVwiaW5rLWdvbGRcIj5idXN5IGRheTwvc3Bhbj48L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGVhZFwiPlNwaW4gdGhyb3VnaCBhIHR5cGljYWwgZGF5IG9uIHRoZSAyNC1ob3VyIGRpYWwuIE5vIGZpeGVkIGhvdXJzIFx1MjAxNCB5b3UgZGVjaWRlIHdoZW4gdG8gdGFrZSBzdXJ2ZXlzIGZvciBtb25leS48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPERheURpYWwgaXRlbXM9e0RBWX0gZGF5PXtkYXl9IHNldERheT17c2V0RGF5fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgey8qIEZ1bm5lbCAqL31cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gaG93LWZ1bm5lbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBzcGxpdFwiPlxuICAgICAgICAgIDxGdW5uZWwgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwbGl0LWNvcHlcIj5cbiAgICAgICAgICAgIDxFeWVicm93IGNvbG9yPVwiI2Y1OWUwYlwiPldoeSBub3QgZXZlcnkgaW52aXRlIHBheXM8L0V5ZWJyb3c+XG4gICAgICAgICAgICA8aDI+U2NyZWVuaW5nIGlzIGhvdyBwYWlkIHN1cnZleXMgc3RheSB2YWx1YWJsZTwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsZWFkXCI+UmVzZWFyY2hlcnMgcGF5IGZvciBhIHByZWNpc2UgYXVkaWVuY2UuIFNob3J0IHNjcmVlbmVycyBtYWtlIHN1cmUgeW91IGFyZSBhIGZpdCBiZWZvcmUgeW91IGludmVzdCB0aW1lIFx1MjAxNCBzbyB3aGVuIHlvdSBkbyBxdWFsaWZ5LCB5b3VyIG9waW5pb24gZ2VudWluZWx5IGNvdW50cyBhbmQgeW91IGVhcm4gbW9uZXkgdGhyb3VnaCBzdXJ2ZXlzIHRoYXQgbWF0Y2ggeW91LjwvcD5cbiAgICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT1cInRleHQtbGlua1wiIHRvPVwiL2Jsb2cvd2h5LXlvdS1nZXQtc2NyZWVuZWQtb3V0LW9mLXN1cnZleXNcIj5XaHkgeW91IGdldCBzY3JlZW5lZCBvdXQgPEljb24gbmFtZT1cImFycm93XCIgc2l6ZT17MTR9IC8+PC9MaW5rPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgey8qIFRpcHMgZ3JpZCAqL31cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gaG93LXRpcHNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIlBybyB0aXBzXCIgdGl0bGU9XCJHZXQgcGFpZCB0byBkbyBzdXJ2ZXlzIG1vcmUgb2Z0ZW5cIiBsZWFkPVwiU2l4IGhhYml0cyBvZiBtZW1iZXJzIHdobyByZWNlaXZlIHRoZSBtb3N0IGludml0YXRpb25zLlwiIGNvbG9yPVwiI2U4MzQ0ZVwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXBzLWdyaWRcIj5cbiAgICAgICAgICAgIHtUSVBTLm1hcCgodCwgaSkgPT4gKFxuICAgICAgICAgICAgICA8UmV2ZWFsIGtleT17dC50fSBjbGFzc05hbWU9XCJ0aXBcIiBkZWxheT17aSAqIDcwfSBlZmZlY3Q9e2kgJSAyID8gJ3VwJyA6ICd6b29tJ30+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGlwLW5cIj57U3RyaW5nKGkgKyAxKS5wYWRTdGFydCgyLCAnMCcpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPXt0LmljfSBzaXplPXsyMn0gLz5cbiAgICAgICAgICAgICAgICA8aDM+e3QudH08L2gzPlxuICAgICAgICAgICAgICAgIDxwPnt0LmR9PC9wPlxuICAgICAgICAgICAgICA8L1JldmVhbD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBob3ctZmFxXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGZhcS1zcGxpdFwiPlxuICAgICAgICAgIDxTZWN0aW9uSGVhZCBhbGlnbj1cImxlZnRcIiBleWVicm93PVwiUGFpZCB0byBkbyBzdXJ2ZXlzP1wiIHRpdGxlPVwiQ29tbW9uIHF1ZXN0aW9uc1wiIGNvbG9yPVwiIzE0YjhhNlwiIC8+XG4gICAgICAgICAgPEFjY29yZGlvbiBpdGVtcz17SE9XX0ZBUX0gaWRQcmVmaXg9XCJob3dmYXFcIiBkZWZhdWx0T3Blbj17MH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxUb3BpY0h1YiBncm91cHM9e1snc3VydmV5cycsICdwYXlvdXRzJ119IHRpdGxlPVwiTGVhcm4gbW9yZSBhYm91dCBwYWlkIHN1cnZleXNcIiBleWVicm93PVwiR3VpZGVzXCIgLz5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsICIvLyBIb3ctaXQtd29ya3MgdmlzdWFscyAodjQpOlxuLy8gICBDb252ZXlvckFydCAgaGVybzogcHJvZmlsZSwgaW52aXRhdGlvbiBhbmQgc3VydmV5IGJveGVzIHJpZGUgYSBjb252ZXlvciBiZWx0IGludG8gYSByZXdhcmQgcHJlc3MsXG4vLyAgICAgICAgICAgICAgICB3aGljaCBzdGFtcHMgb3V0IGEgY29pbiB0aGF0IGhvcHMgaW50byBhIHdhbGxldFxuLy8gICBMb29wVHJhY2sgICAgdGhlIGZvdXIgc3RlcHMgYXMgY2hlY2twb2ludHMgb24gYSBsb29waW5nIHJhY2UgdHJhY2s7IGEgZ2xvd2luZyB0b2tlbiBsYXBzIGl0XG4vLyAgIERheURpYWwgICAgICBhIDI0LWhvdXIgZGlhbDogdGFwIGEgbW9tZW50IG9mIHRoZSBkYXkgYW5kIHRoZSBoYW5kIHN3aW5ncyB0byBpdFxuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uLmpzeCc7XG5pbXBvcnQgeyBMaXZlWm9uZSB9IGZyb20gJy4vdWkuanN4JztcblxuZXhwb3J0IGZ1bmN0aW9uIENvbnZleW9yQXJ0KCkge1xuICBjb25zdCBib3hlcyA9IFtbJ3VzZXInLCAnSm9pbiddLCBbJ2NsaXBib2FyZCcsICdQcm9maWxlJ10sIFsnbWFpbCcsICdJbnZpdGUnXSwgWydjaGVjaycsICdTdXJ2ZXknXV07XG4gIHJldHVybiAoXG4gICAgPExpdmVab25lIGNsYXNzTmFtZT1cImNvbnZcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3YtcHJlc3NcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3ZwLWhlYWRcIj48SWNvbiBuYW1lPVwiY29pbnNcIiBzaXplPXsyMH0gLz4gUmV3YXJkIHByZXNzPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdnAtcmFtXCIgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3ZwLWxpZ2h0XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdi1iZWx0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN2Yi10b3BcIiAvPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdmItcm9sbGVyc1wiPntBcnJheS5mcm9tKHsgbGVuZ3RoOiA5IH0pLm1hcCgoXywgaSkgPT4gPGkga2V5PXtpfSAvPil9PC9zcGFuPlxuICAgICAgICB7Ym94ZXMubWFwKChbaWMsIHRdLCBpKSA9PiAoXG4gICAgICAgICAgPHNwYW4ga2V5PXt0fSBjbGFzc05hbWU9XCJjdi1ib3hcIiBzdHlsZT17eyAnLS1pJzogaSB9fT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImN2eC1mYWNlXCI+PEljb24gbmFtZT17aWN9IHNpemU9ezE4fSAvPjxiPnt0fTwvYj48L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3YtY29pblwiPjxiPiQ8L2I+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3Ytd2FsbGV0XCI+PEljb24gbmFtZT1cIndhbGxldFwiIHNpemU9ezIyfSAvPjxzbWFsbD5QYWlkPC9zbWFsbD48L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdi1zcGFyayBzMVwiIC8+PHNwYW4gY2xhc3NOYW1lPVwiY3Ytc3BhcmsgczJcIiAvPjxzcGFuIGNsYXNzTmFtZT1cImN2LXNwYXJrIHMzXCIgLz5cbiAgICA8L0xpdmVab25lPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTG9vcFRyYWNrKHsgc3RlcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxMaXZlWm9uZSBjbGFzc05hbWU9XCJsb29wXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImxwLXRyYWNrXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAzMDAgMzAwXCI+XG4gICAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJscC1nXCIgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxXCIgeTI9XCIxXCI+PHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiMzZDVhZmVcIiAvPjxzdG9wIG9mZnNldD1cIi4zNVwiIHN0b3BDb2xvcj1cIiMxNGI4YTZcIiAvPjxzdG9wIG9mZnNldD1cIi43XCIgc3RvcENvbG9yPVwiI2Y1OWUwYlwiIC8+PHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3BDb2xvcj1cIiNlODM0NGVcIiAvPjwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAgPC9kZWZzPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjE1MFwiIHI9XCIxMThcIiBjbGFzc05hbWU9XCJscC1yb2FkXCIgLz5cbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTUwXCIgY3k9XCIxNTBcIiByPVwiMTE4XCIgY2xhc3NOYW1lPVwibHAtbGFuZVwiIHN0cm9rZT1cInVybCgjbHAtZylcIiAvPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIxNTBcIiBjeT1cIjE1MFwiIHI9XCIxMThcIiBjbGFzc05hbWU9XCJscC1kYXNoXCIgLz5cbiAgICAgICAgICB7c3RlcHMubWFwKChzLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhID0gKC05MCArIGkgKiA5MCkgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgICAgICByZXR1cm4gPGNpcmNsZSBrZXk9e3MudGl0bGV9IGN4PXsxNTAgKyAxMTggKiBNYXRoLmNvcyhhKX0gY3k9ezE1MCArIDExOCAqIE1hdGguc2luKGEpfSByPVwiMTVcIiBjbGFzc05hbWU9XCJscC1jaGVja1wiIHN0eWxlPXt7ICctLWMnOiBzLmNvbG9yLCAnLS1pJzogaSB9fSAvPjtcbiAgICAgICAgICB9KX1cbiAgICAgICAgICA8ZyBjbGFzc05hbWU9XCJscC10b2tlblwiPjxjaXJjbGUgcj1cIjEwXCIgLz48Y2lyY2xlIHI9XCIxOFwiIGNsYXNzTmFtZT1cImxwLWhhbG9cIiAvPjwvZz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibHAtY2VudGVyXCI+PEljb24gbmFtZT1cInJlZnJlc2hcIiBzaXplPXsyNn0gLz48Yj5SZXBlYXQ8L2I+PHNtYWxsPm5ldyBzdHVkaWVzIGV2ZXJ5IG1vbnRoPC9zbWFsbD48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG9sIGNsYXNzTmFtZT1cImxwLXN0ZXBzXCI+XG4gICAgICAgIHtzdGVwcy5tYXAoKHMsIGkpID0+IChcbiAgICAgICAgICA8bGkga2V5PXtzLnRpdGxlfSBzdHlsZT17eyAnLS1jJzogcy5jb2xvciwgJy0taSc6IGkgfX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJscHMtaWNcIj48SWNvbiBuYW1lPXtzLmljb259IHNpemU9ezIwfSAvPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPjxzbWFsbD5DaGVja3BvaW50IHtpICsgMX08L3NtYWxsPjxiPntzLnRpdGxlfTwvYj48c3Bhbj57cy50ZXh0fTwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L29sPlxuICAgIDwvTGl2ZVpvbmU+XG4gICk7XG59XG5cbmNvbnN0IHRvQW5nbGUgPSAodGltZSkgPT4ge1xuICBpZiAoIS9eXFxkLy50ZXN0KHRpbWUpKSByZXR1cm4gMzAwOyAvLyBcIkxhdGVyXCIgXHUyMTkyIGV2ZW5pbmdcbiAgY29uc3QgW2gsIG1dID0gdGltZS5zcGxpdCgnOicpLm1hcChOdW1iZXIpO1xuICByZXR1cm4gKChoICsgbSAvIDYwKSAvIDI0KSAqIDM2MDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXlEaWFsKHsgaXRlbXMsIGRheSwgc2V0RGF5IH0pIHtcbiAgY29uc3QgY3VyID0gaXRlbXNbZGF5XTtcbiAgY29uc3QgYW5nID0gdG9BbmdsZShjdXIudGltZSk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJkaWFsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImRsLWZhY2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI2MCAyNjBcIj5cbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiMTMwXCIgY3k9XCIxMzBcIiByPVwiMTE4XCIgY2xhc3NOYW1lPVwiZGwtcmluZ1wiIC8+XG4gICAgICAgICAgPHBhdGggZD1cIk0yNDggMTMwIEExMTggMTE4IDAgMCAxIDEyIDEzMFwiIGNsYXNzTmFtZT1cImRsLXN1blwiIC8+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMiAxMzAgQTExOCAxMTggMCAwIDEgMjQ4IDEzMFwiIGNsYXNzTmFtZT1cImRsLW5pZ2h0XCIgLz5cbiAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogMjQgfSkubWFwKChfLCBpKSA9PiAoXG4gICAgICAgICAgICA8bGluZSBrZXk9e2l9IHgxPVwiMTMwXCIgeTE9XCIxNlwiIHgyPVwiMTMwXCIgeTI9e2kgJSA2ID8gMjQgOiAzMn0gdHJhbnNmb3JtPXtgcm90YXRlKCR7aSAqIDE1fSAxMzAgMTMwKWB9IGNsYXNzTmFtZT1cImRsLXRpY2tcIiAvPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHtbJzAnLCAnNicsICcxMicsICcxOCddLm1hcCgodCwgaSkgPT4gPHRleHQga2V5PXt0fSB4PXsxMzAgKyA5MiAqIE1hdGguc2luKChpICogOTAgKiBNYXRoLlBJKSAvIDE4MCl9IHk9ezEzNCAtIDkyICogTWF0aC5jb3MoKGkgKiA5MCAqIE1hdGguUEkpIC8gMTgwKX0gdGV4dEFuY2hvcj1cIm1pZGRsZVwiIGNsYXNzTmFtZT1cImRsLW51bVwiPnt0fTwvdGV4dD4pfVxuICAgICAgICAgIHtpdGVtcy5tYXAoKGQsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSAodG9BbmdsZShkLnRpbWUpICogTWF0aC5QSSkgLyAxODA7XG4gICAgICAgICAgICByZXR1cm4gPGNpcmNsZSBrZXk9e2QudH0gY3g9ezEzMCArIDEwOCAqIE1hdGguc2luKGEpfSBjeT17MTMwIC0gMTA4ICogTWF0aC5jb3MoYSl9IHI9e2kgPT09IGRheSA/IDEwIDogN30gY2xhc3NOYW1lPXtgZGwtZG90ICR7aSA9PT0gZGF5ID8gJ29uJyA6IGkgPCBkYXkgPyAncGFzdCcgOiAnJ31gfSAvPjtcbiAgICAgICAgICB9KX1cbiAgICAgICAgICA8ZyBjbGFzc05hbWU9XCJkbC1oYW5kXCIgc3R5bGU9e3sgdHJhbnNmb3JtOiBgcm90YXRlKCR7YW5nfWRlZylgIH19PjxsaW5lIHgxPVwiMTMwXCIgeTE9XCIxMzBcIiB4Mj1cIjEzMFwiIHkyPVwiNDBcIiAvPjxjaXJjbGUgY3g9XCIxMzBcIiBjeT1cIjEzMFwiIHI9XCI4XCIgLz48L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkbC1pY29uXCIga2V5PXtkYXl9PjxJY29uIG5hbWU9e2N1ci5pY30gc2l6ZT17MjJ9IC8+PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImRsLWxpc3RcIj5cbiAgICAgICAgPG9sPlxuICAgICAgICAgIHtpdGVtcy5tYXAoKGQsIGkpID0+IChcbiAgICAgICAgICAgIDxsaSBrZXk9e2QudH0gY2xhc3NOYW1lPXtpID09PSBkYXkgPyAnb24nIDogaSA8IGRheSA/ICdwYXN0JyA6ICcnfT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXREYXkoaSl9IGFyaWEtcHJlc3NlZD17aSA9PT0gZGF5fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkbHQtdGltZVwiPntkLnRpbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRsdC10eHRcIj48Yj57ZC50fTwvYj48c21hbGw+e2QuZH08L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L29sPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWdvbGRcIiBvbkNsaWNrPXsoKSA9PiBzZXREYXkoKGRheSArIDEpICUgaXRlbXMubGVuZ3RoKX0+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYnRuLWxhYmVsXCI+e2RheSA9PT0gaXRlbXMubGVuZ3RoIC0gMSA/ICdTdGFydCB0aGUgZGF5IGFnYWluJyA6ICdOZXh0IG1vbWVudCd9PC9zcGFuPjxJY29uIG5hbWU9XCJhcnJvd1wiIHNpemU9ezE4fSAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsbUJBQXlCOzs7QUNGekI7QUFhUTtBQUxELFNBQVMsY0FBYztBQUM1QixRQUFNLFFBQVEsQ0FBQyxDQUFDLFFBQVEsTUFBTSxHQUFHLENBQUMsYUFBYSxTQUFTLEdBQUcsQ0FBQyxRQUFRLFFBQVEsR0FBRyxDQUFDLFNBQVMsUUFBUSxDQUFDO0FBQ2xHLFNBQ0UsNkNBQUMsWUFBUyxXQUFVLFFBQU8sZUFBWSxRQUNyQztBQUFBLGlEQUFDLFNBQUksV0FBVSxZQUNiO0FBQUEsbURBQUMsVUFBSyxXQUFVLFlBQVc7QUFBQSxvREFBQyxRQUFL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NkNBQUMsT0FBRSxXQUFVLFFBQU8sOEhBQTJHO0FBQUEsU0FDakk7QUFBQSxNQUNBLDZDQUFDLFdBQVEsT0FBTyxLQUFLLEtBQVUsUUFBZ0I7QUFBQSxPQUNqRCxHQUNGO0FBQUEsSUFHQSw2Q0FBQyxhQUFRLFdBQVUsc0JBQ2pCLHdEQUFDLFNBQUksV0FBVSxtQkFDYjtBQUFBLG1EQUFDLFVBQU87QUFBQSxNQUNSLDhDQUFDLFNBQUksV0FBVSxjQUNiO0FBQUEscURBQUMsV0FBUSxPQUFNLFdBQVUsdUNBQXlCO0FBQUEsUUFDbEQsNkNBQUMsUUFBRyx5REFBMkM7QUFBQSxRQUMvQyw2Q0FBQyxPQUFFLFdBQVUsUUFBTyxvT0FBaU47QUFBQSxRQUNyTyw4Q0FBQyxRQUFLLFdBQVUsYUFBWSxJQUFHLDZDQUE0QztBQUFBO0FBQUEsVUFBeUIsNkNBQUMsUUFBSyxNQUFLLFNBQVEsTUFBTSxJQUFJO0FBQUEsV0FBRTtBQUFBLFNBQ3JJO0FBQUEsT0FDRixHQUNGO0FBQUEsSUFHQSw2Q0FBQyxhQUFRLFdBQVUsb0JBQ2pCLHdEQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsbURBQUMsZUFBWSxTQUFRLFlBQVcsT0FBTSxxQ0FBb0MsTUFBSywyREFBMEQsT0FBTSxXQUFVO0FBQUEsTUFDekosNkNBQUMsU0FBSSxXQUFVLGFBQ1osZUFBSyxJQUFJLENBQUMsR0FBRyxNQUNaLDhDQUFDLFVBQWlCLFdBQVUsT0FBTSxPQUFPLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxPQUFPLFFBQ3RFO0FBQUEscURBQUMsVUFBSyxXQUFVLFNBQVMsaUJBQU8sSUFBSSxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUcsR0FBRTtBQUFBLFFBQ3hELDZDQUFDLFFBQUssTUFBTSxFQUFFLElBQUksTUFBTSxJQUFJO0FBQUEsUUFDNUIsNkNBQUMsUUFBSSxZQUFFLEdBQUU7QUFBQSxRQUNULDZDQUFDLE9BQUcsWUFBRSxHQUFFO0FBQUEsV0FKRyxFQUFFLENBS2YsQ0FDRCxHQUNIO0FBQUEsT0FDRixHQUNGO0FBQUEsSUFFQSw2Q0FBQyxhQUFRLFdBQVUsbUJBQ2pCLHdEQUFDLFNBQUksV0FBVSx1QkFDYjtBQUFBLG1EQUFDLGVBQVksT0FBTSxRQUFPLFNBQVEsdUJBQXNCLE9BQU0sb0JBQW1CLE9BQU0sV0FBVTtBQUFBLE1BQ2pHLDZDQUFDLGFBQVUsT0FBTyxTQUFTLFVBQVMsVUFBUyxhQUFhLEdBQUc7QUFBQSxPQUMvRCxHQUNGO0FBQUEsSUFFQSw2Q0FBQyxZQUFTLFFBQVEsQ0FBQyxXQUFXLFNBQVMsR0FBRyxPQUFNLGlDQUFnQyxTQUFRLFVBQVM7QUFBQSxLQUNuRztBQUVKOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
