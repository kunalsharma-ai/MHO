import {
  QualityPipeline
} from "/assets/chunk-UZU3UW3I.js";
import "/assets/chunk-UQWWOXC3.js";
import "/assets/chunk-SPSQFVM6.js";
import {
  DocHeroArt
} from "/assets/chunk-2PZ7UZDW.js";
import "/assets/chunk-GTWO7VGT.js";
import "/assets/chunk-53J6YGE2.js";
import {
  PageHero
} from "/assets/chunk-NVJYUHG3.js";
import {
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

// src/pages/Profiling.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var GATES = [
  { at: 50, t: "Registration gate", d: "Attention question + open-ended answer of 10\u201320 words, no copy-paste.", c: "#3d5afe" },
  { at: 60, t: "Gate survey", d: "Score at least 60/200 with 20\u201330 unique words before any client survey.", c: "#14b8a6" }
];
var LAYERS = [
  ["shield", "CAPTCHA at every level"],
  ["gate", "Gate survey"],
  ["filter", "Pre-screening"],
  ["pin", "Geo-tagging"],
  ["chart", "IP score tracking"],
  ["globe", "Latitude & longitude checks"],
  ["fingerprint", "Digital fingerprinting (RelevantID, TrueSample, Radware)"],
  ["onion", "Proxy & TOR detection"],
  ["bot", "BOT prevention before traffic reaches servers"],
  ["copy", "Duplicate cleansing (automated + manual)"]
];
function Gauge() {
  const [score, setScore] = (0, import_react.useState)(120);
  const angle = score / 200 * 180 - 90;
  const state = score >= 60 ? "Eligible for client surveys" : score >= 50 ? "Registered \u2014 needs the gate survey" : "Below the quality bar";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "gauge-wrap", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "gauge", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 220 125", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "gg", x1: "0", x2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#e8344e" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".3", stopColor: "#f59e0b" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".6", stopColor: "#14b8a6" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#3d5afe" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15 115 A95 95 0 0 1 205 115", fill: "none", stroke: "url(#gg)", strokeWidth: "18", strokeLinecap: "round" }),
        [50, 60].map((g) => {
          const a = (g / 200 * 180 - 180) * (Math.PI / 180);
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: 110 + Math.cos(a) * 78, y1: 115 + Math.sin(a) * 78, x2: 110 + Math.cos(a) * 112, y2: 115 + Math.sin(a) * 112, stroke: "#0b1b3f", strokeWidth: "2.5", strokeDasharray: "3 3" }, g);
        })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gauge-needle", style: { transform: `rotate(${angle}deg)` } }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { className: "gauge-val", children: [
        score,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "/200" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "gauge-ctrl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Try a score" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "range", min: "0", max: "200", value: score, onChange: (e) => setScore(Number(e.target.value)), "aria-valuetext": `${score} of 200: ${state}` })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: `gauge-state ${score >= 60 ? "ok" : score >= 50 ? "mid" : "low"}`, "aria-live": "polite", children: state })
  ] });
}
function Profiling() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      PageHero,
      {
        theme: "legal doc-profiling",
        eyebrow: "Profiling & Quality Score",
        eyebrowColor: "#14b8a6",
        title: ["Profiling & the", { t: "survey quality score", hl: "grad" }],
        lead: "Our survey quality score measures each respondent from 0 to 200, so researchers get genuine answers \u2014 and honest members get more of the right invitations.",
        art: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocHeroArt, { icon: "chart" }),
        crumbs: [{ to: "/", label: "Home" }, { label: "Profiling & Quality Score" }]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section prof-gauge", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "split-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { color: "#3d5afe", children: "The quality score" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Two gates before a client survey" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "gates", children: GATES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { style: { "--c": g.c }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
            g.at,
            "+"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: g.t }),
            g.d
          ] })
        ] }, g.t)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "fine", children: "Members who fail attention checks or open-ended quality parameters are not routed to client surveys." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section prof-numbers dark-band", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "Profiling standard", title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        "Rich profiles, ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ink-gold", children: "better matches" })
      ] }), color: "#facc15" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "num-tiles", children: [["11", "profiling segments at registration"], ["100+", "panel profile questions"], ["300+", "sub-profiling questions"], ["90+", "countries in the wider Frequent Research network"]].map(([n, l], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { className: "num-tile", delay: i * 90, effect: "zoom", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: n }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l })
      ] }, l)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "center fine light", children: "Members are asked to update profiles after registration and after surveys, so data stays current with the market." })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section prof-layers", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "Advanced security", title: "Ten layers between a bot and a survey", color: "#e8344e" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "layer-stack", children: LAYERS.map(([ic, t], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { as: "li", delay: i * 50, effect: "left", style: { "--i": i }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 18 }),
        t
      ] }, t)) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section prof-pipeline", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow: "Quality standard", title: "All 18 checks at a glance", lead: "ISO 9001, ISO 27001 and ISO 20252 certified processes, backed by an in-house QC team.", color: "#3d5afe" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QualityPipeline, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { className: "text-link", to: "/trust-safety", children: [
        "More on Trust & Safety ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 14 })
      ] }) })
    ] }) })
  ] });
}
export {
  Profiling as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL1Byb2ZpbGluZy5qc3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIFByb2ZpbGluZyAmIFF1YWxpdHkgU2NvcmUgXHUyMDE0IGludGVyYWN0aXZlIDBcdTIwMTMyMDAgcXVhbGl0eSBnYXVnZSwgZ2F0ZXMgYW5kIHNlY3VyaXR5IGxheWVycy5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFBhZ2VIZXJvIGZyb20gJy4uL2NvbXBvbmVudHMvUGFnZUhlcm8uanN4JztcbmltcG9ydCB7IERvY0hlcm9BcnQgfSBmcm9tICcuLi9jb21wb25lbnRzL0hlcm9BcnQuanN4JztcbmltcG9ydCB7IFNlY3Rpb25IZWFkLCBSZXZlYWwsIEV5ZWJyb3cgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpLmpzeCc7XG5pbXBvcnQgSWNvbiBmcm9tICcuLi9jb21wb25lbnRzL0ljb24uanN4JztcbmltcG9ydCB7IFF1YWxpdHlQaXBlbGluZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvU2hvd2Nhc2UuanN4JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICcuLi9yb3V0ZXIuanN4JztcblxuY29uc3QgR0FURVMgPSBbXG4gIHsgYXQ6IDUwLCB0OiAnUmVnaXN0cmF0aW9uIGdhdGUnLCBkOiAnQXR0ZW50aW9uIHF1ZXN0aW9uICsgb3Blbi1lbmRlZCBhbnN3ZXIgb2YgMTBcdTIwMTMyMCB3b3Jkcywgbm8gY29weS1wYXN0ZS4nLCBjOiAnIzNkNWFmZScgfSxcbiAgeyBhdDogNjAsIHQ6ICdHYXRlIHN1cnZleScsIGQ6ICdTY29yZSBhdCBsZWFzdCA2MC8yMDAgd2l0aCAyMFx1MjAxMzMwIHVuaXF1ZSB3b3JkcyBiZWZvcmUgYW55IGNsaWVudCBzdXJ2ZXkuJywgYzogJyMxNGI4YTYnIH0sXG5dO1xuXG5jb25zdCBMQVlFUlMgPSBbXG4gIFsnc2hpZWxkJywgJ0NBUFRDSEEgYXQgZXZlcnkgbGV2ZWwnXSwgWydnYXRlJywgJ0dhdGUgc3VydmV5J10sIFsnZmlsdGVyJywgJ1ByZS1zY3JlZW5pbmcnXSwgWydwaW4nLCAnR2VvLXRhZ2dpbmcnXSxcbiAgWydjaGFydCcsICdJUCBzY29yZSB0cmFja2luZyddLCBbJ2dsb2JlJywgJ0xhdGl0dWRlICYgbG9uZ2l0dWRlIGNoZWNrcyddLCBbJ2ZpbmdlcnByaW50JywgJ0RpZ2l0YWwgZmluZ2VycHJpbnRpbmcgKFJlbGV2YW50SUQsIFRydWVTYW1wbGUsIFJhZHdhcmUpJ10sXG4gIFsnb25pb24nLCAnUHJveHkgJiBUT1IgZGV0ZWN0aW9uJ10sIFsnYm90JywgJ0JPVCBwcmV2ZW50aW9uIGJlZm9yZSB0cmFmZmljIHJlYWNoZXMgc2VydmVycyddLCBbJ2NvcHknLCAnRHVwbGljYXRlIGNsZWFuc2luZyAoYXV0b21hdGVkICsgbWFudWFsKSddLFxuXTtcblxuZnVuY3Rpb24gR2F1Z2UoKSB7XG4gIGNvbnN0IFtzY29yZSwgc2V0U2NvcmVdID0gdXNlU3RhdGUoMTIwKTtcbiAgY29uc3QgYW5nbGUgPSAoc2NvcmUgLyAyMDApICogMTgwIC0gOTA7XG4gIGNvbnN0IHN0YXRlID0gc2NvcmUgPj0gNjAgPyAnRWxpZ2libGUgZm9yIGNsaWVudCBzdXJ2ZXlzJyA6IHNjb3JlID49IDUwID8gJ1JlZ2lzdGVyZWQgXHUyMDE0IG5lZWRzIHRoZSBnYXRlIHN1cnZleScgOiAnQmVsb3cgdGhlIHF1YWxpdHkgYmFyJztcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImdhdWdlLXdyYXBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2F1Z2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDIyMCAxMjVcIj5cbiAgICAgICAgICA8ZGVmcz5cbiAgICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD1cImdnXCIgeDE9XCIwXCIgeDI9XCIxXCI+PHN0b3Agb2Zmc2V0PVwiMFwiIHN0b3BDb2xvcj1cIiNlODM0NGVcIiAvPjxzdG9wIG9mZnNldD1cIi4zXCIgc3RvcENvbG9yPVwiI2Y1OWUwYlwiIC8+PHN0b3Agb2Zmc2V0PVwiLjZcIiBzdG9wQ29sb3I9XCIjMTRiOGE2XCIgLz48c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPVwiIzNkNWFmZVwiIC8+PC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8L2RlZnM+XG4gICAgICAgICAgPHBhdGggZD1cIk0xNSAxMTUgQTk1IDk1IDAgMCAxIDIwNSAxMTVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cInVybCgjZ2cpXCIgc3Ryb2tlV2lkdGg9XCIxOFwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIC8+XG4gICAgICAgICAge1s1MCwgNjBdLm1hcCgoZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgYSA9ICgoZyAvIDIwMCkgKiAxODAgLSAxODApICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICAgICAgcmV0dXJuIDxsaW5lIGtleT17Z30geDE9ezExMCArIE1hdGguY29zKGEpICogNzh9IHkxPXsxMTUgKyBNYXRoLnNpbihhKSAqIDc4fSB4Mj17MTEwICsgTWF0aC5jb3MoYSkgKiAxMTJ9IHkyPXsxMTUgKyBNYXRoLnNpbihhKSAqIDExMn0gc3Ryb2tlPVwiIzBiMWIzZlwiIHN0cm9rZVdpZHRoPVwiMi41XCIgc3Ryb2tlRGFzaGFycmF5PVwiMyAzXCIgLz47XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnYXVnZS1uZWVkbGVcIiBzdHlsZT17eyB0cmFuc2Zvcm06IGByb3RhdGUoJHthbmdsZX1kZWcpYCB9fSAvPlxuICAgICAgICA8YiBjbGFzc05hbWU9XCJnYXVnZS12YWxcIj57c2NvcmV9PHNtYWxsPi8yMDA8L3NtYWxsPjwvYj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImdhdWdlLWN0cmxcIj5cbiAgICAgICAgPHNwYW4+VHJ5IGEgc2NvcmU8L3NwYW4+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIwXCIgbWF4PVwiMjAwXCIgdmFsdWU9e3Njb3JlfSBvbkNoYW5nZT17KGUpID0+IHNldFNjb3JlKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfSBhcmlhLXZhbHVldGV4dD17YCR7c2NvcmV9IG9mIDIwMDogJHtzdGF0ZX1gfSAvPlxuICAgICAgPC9sYWJlbD5cbiAgICAgIDxwIGNsYXNzTmFtZT17YGdhdWdlLXN0YXRlICR7c2NvcmUgPj0gNjAgPyAnb2snIDogc2NvcmUgPj0gNTAgPyAnbWlkJyA6ICdsb3cnfWB9IGFyaWEtbGl2ZT1cInBvbGl0ZVwiPntzdGF0ZX08L3A+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFByb2ZpbGluZygpIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFBhZ2VIZXJvXG4gICAgICAgIHRoZW1lPVwibGVnYWwgZG9jLXByb2ZpbGluZ1wiXG4gICAgICAgIGV5ZWJyb3c9XCJQcm9maWxpbmcgJiBRdWFsaXR5IFNjb3JlXCJcbiAgICAgICAgZXllYnJvd0NvbG9yPVwiIzE0YjhhNlwiXG4gICAgICAgIHRpdGxlPXtbJ1Byb2ZpbGluZyAmIHRoZScsIHsgdDogJ3N1cnZleSBxdWFsaXR5IHNjb3JlJywgaGw6ICdncmFkJyB9XX1cbiAgICAgICAgbGVhZD1cIk91ciBzdXJ2ZXkgcXVhbGl0eSBzY29yZSBtZWFzdXJlcyBlYWNoIHJlc3BvbmRlbnQgZnJvbSAwIHRvIDIwMCwgc28gcmVzZWFyY2hlcnMgZ2V0IGdlbnVpbmUgYW5zd2VycyBcdTIwMTQgYW5kIGhvbmVzdCBtZW1iZXJzIGdldCBtb3JlIG9mIHRoZSByaWdodCBpbnZpdGF0aW9ucy5cIlxuICAgICAgICBhcnQ9ezxEb2NIZXJvQXJ0IGljb249XCJjaGFydFwiIC8+fVxuICAgICAgICBjcnVtYnM9e1t7IHRvOiAnLycsIGxhYmVsOiAnSG9tZScgfSwgeyBsYWJlbDogJ1Byb2ZpbGluZyAmIFF1YWxpdHkgU2NvcmUnIH1dfVxuICAgICAgLz5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBwcm9mLWdhdWdlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIHNwbGl0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGxpdC1jb3B5XCI+XG4gICAgICAgICAgICA8RXllYnJvdyBjb2xvcj1cIiMzZDVhZmVcIj5UaGUgcXVhbGl0eSBzY29yZTwvRXllYnJvdz5cbiAgICAgICAgICAgIDxoMj5Ud28gZ2F0ZXMgYmVmb3JlIGEgY2xpZW50IHN1cnZleTwvaDI+XG4gICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwiZ2F0ZXNcIj5cbiAgICAgICAgICAgICAge0dBVEVTLm1hcCgoZykgPT4gKFxuICAgICAgICAgICAgICAgIDxsaSBrZXk9e2cudH0gc3R5bGU9e3sgJy0tYyc6IGcuYyB9fT48Yj57Zy5hdH0rPC9iPjxzcGFuPjxzdHJvbmc+e2cudH08L3N0cm9uZz57Zy5kfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmaW5lXCI+TWVtYmVycyB3aG8gZmFpbCBhdHRlbnRpb24gY2hlY2tzIG9yIG9wZW4tZW5kZWQgcXVhbGl0eSBwYXJhbWV0ZXJzIGFyZSBub3Qgcm91dGVkIHRvIGNsaWVudCBzdXJ2ZXlzLjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8R2F1Z2UgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gcHJvZi1udW1iZXJzIGRhcmstYmFuZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxTZWN0aW9uSGVhZCBleWVicm93PVwiUHJvZmlsaW5nIHN0YW5kYXJkXCIgdGl0bGU9ezw+UmljaCBwcm9maWxlcywgPHNwYW4gY2xhc3NOYW1lPVwiaW5rLWdvbGRcIj5iZXR0ZXIgbWF0Y2hlczwvc3Bhbj48Lz59IGNvbG9yPVwiI2ZhY2MxNVwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJudW0tdGlsZXNcIj5cbiAgICAgICAgICAgIHtbWycxMScsICdwcm9maWxpbmcgc2VnbWVudHMgYXQgcmVnaXN0cmF0aW9uJ10sIFsnMTAwKycsICdwYW5lbCBwcm9maWxlIHF1ZXN0aW9ucyddLCBbJzMwMCsnLCAnc3ViLXByb2ZpbGluZyBxdWVzdGlvbnMnXSwgWyc5MCsnLCAnY291bnRyaWVzIGluIHRoZSB3aWRlciBGcmVxdWVudCBSZXNlYXJjaCBuZXR3b3JrJ11dLm1hcCgoW24sIGxdLCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxSZXZlYWwga2V5PXtsfSBjbGFzc05hbWU9XCJudW0tdGlsZVwiIGRlbGF5PXtpICogOTB9IGVmZmVjdD1cInpvb21cIj48Yj57bn08L2I+PHNwYW4+e2x9PC9zcGFuPjwvUmV2ZWFsPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiY2VudGVyIGZpbmUgbGlnaHRcIj5NZW1iZXJzIGFyZSBhc2tlZCB0byB1cGRhdGUgcHJvZmlsZXMgYWZ0ZXIgcmVnaXN0cmF0aW9uIGFuZCBhZnRlciBzdXJ2ZXlzLCBzbyBkYXRhIHN0YXlzIGN1cnJlbnQgd2l0aCB0aGUgbWFya2V0LjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gcHJvZi1sYXllcnNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIkFkdmFuY2VkIHNlY3VyaXR5XCIgdGl0bGU9XCJUZW4gbGF5ZXJzIGJldHdlZW4gYSBib3QgYW5kIGEgc3VydmV5XCIgY29sb3I9XCIjZTgzNDRlXCIgLz5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGF5ZXItc3RhY2tcIj5cbiAgICAgICAgICAgIHtMQVlFUlMubWFwKChbaWMsIHRdLCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxSZXZlYWwgYXM9XCJsaVwiIGtleT17dH0gZGVsYXk9e2kgKiA1MH0gZWZmZWN0PVwibGVmdFwiIHN0eWxlPXt7ICctLWknOiBpIH19PjxJY29uIG5hbWU9e2ljfSBzaXplPXsxOH0gLz57dH08L1JldmVhbD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIHByb2YtcGlwZWxpbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIlF1YWxpdHkgc3RhbmRhcmRcIiB0aXRsZT1cIkFsbCAxOCBjaGVja3MgYXQgYSBnbGFuY2VcIiBsZWFkPVwiSVNPIDkwMDEsIElTTyAyNzAwMSBhbmQgSVNPIDIwMjUyIGNlcnRpZmllZCBwcm9jZXNzZXMsIGJhY2tlZCBieSBhbiBpbi1ob3VzZSBRQyB0ZWFtLlwiIGNvbG9yPVwiIzNkNWFmZVwiIC8+XG4gICAgICAgICAgPFF1YWxpdHlQaXBlbGluZSAvPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImNlbnRlclwiPjxMaW5rIGNsYXNzTmFtZT1cInRleHQtbGlua1wiIHRvPVwiL3RydXN0LXNhZmV0eVwiPk1vcmUgb24gVHJ1c3QgJiBTYWZldHkgPEljb24gbmFtZT1cImFycm93XCIgc2l6ZT17MTR9IC8+PC9MaW5rPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC8+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsbUJBQXlCO0FBNEJiO0FBcEJaLElBQU0sUUFBUTtBQUFBLEVBQ1osRUFBRSxJQUFJLElBQUksR0FBRyxxQkFBcUIsR0FBRyw4RUFBeUUsR0FBRyxVQUFVO0FBQUEsRUFDM0gsRUFBRSxJQUFJLElBQUksR0FBRyxlQUFlLEdBQUcsZ0ZBQTJFLEdBQUcsVUFBVTtBQUN6SDtBQUVBLElBQU0sU0FBUztBQUFBLEVBQ2IsQ0FBQyxVQUFVLHdCQUF3QjtBQUFBLEVBQUcsQ0FBQyxRQUFRLGFBQWE7QUFBQSxFQUFHLENBQUMsVUFBVSxlQUFlO0FBQUEsRUFBRyxDQUFDLE9BQU8sYUFBYTtBQUFBLEVBQ2pILENBQUMsU0FBUyxtQkFBbUI7QUFBQSxFQUFHLENBQUMsU0FBUyw2QkFBNkI7QUFBQSxFQUFHLENBQUMsZUFBZSwwREFBMEQ7QUFBQSxFQUNwSixDQUFDLFNBQVMsdUJBQXVCO0FBQUEsRUFBRyxDQUFDLE9BQU8sK0NBQStDO0FBQUEsRUFBRyxDQUFDLFFBQVEsMENBQTBDO0FBQ25KO0FBRUEsU0FBUyxRQUFRO0FBQ2YsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHVCQUFTLEdBQUc7QUFDdEMsUUFBTSxRQUFTLFFBQVEsTUFBTyxNQUFNO0FBQ3BDLFFBQU0sUUFBUSxTQUFTLEtBQUssZ0NBQWdDLFNBQVMsS0FBSyw0Q0FBdUM7QUFDakgsU0FDRSw2Q0FBQyxTQUFJLFdBQVUsY0FDYjtBQUFBLGlEQUFDLFNBQUksV0FBVSxTQUFRLGVBQVksUUFDakM7QUFBQSxtREFBQyxTQUFJLFNBQVEsZUFDWDtBQUFBLG9EQUFDLFVBQ0MsdURBQUMsb0JBQWUsSUFBRyxNQUFLLElBQUcsS0FBSSxJQUFHLEtBQUk7QUFBQSxzREFBQyxVQUFLLFFBQU8sS0FBSSxXQUFVLFdBQVU7QUFBQSxVQUFFLDRDQUFDLFVBQUssUUFBTyxNQUFLLFdBQVUsV0FBVTtBQUFBLFVBQUUsNENBQUMsVUFBSyxRQUFPLE1BQUssV0FBVSxXQUFVO0FBQUEsVUFBRSw0Q0FBQyxVQUFLLFFBQU8sS0FBSSxXQUFVLFdBQVU7QUFBQSxXQUFFLEdBQ3RNO0FBQUEsUUFDQSw0Q0FBQyxVQUFLLEdBQUUsZ0NBQStCLE1BQUssUUFBTyxRQUFPLFlBQVcsYUFBWSxNQUFLLGVBQWMsU0FBUTtBQUFBLFFBQzNHLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU07QUFDbkIsZ0JBQU0sS0FBTSxJQUFJLE1BQU8sTUFBTSxRQUFRLEtBQUssS0FBSztBQUMvQyxpQkFBTyw0Q0FBQyxVQUFhLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBTyxXQUFVLGFBQVksT0FBTSxpQkFBZ0IsU0FBeEssQ0FBOEs7QUFBQSxRQUNsTSxDQUFDO0FBQUEsU0FDSDtBQUFBLE1BQ0EsNENBQUMsVUFBSyxXQUFVLGdCQUFlLE9BQU8sRUFBRSxXQUFXLFVBQVUsS0FBSyxPQUFPLEdBQUc7QUFBQSxNQUM1RSw2Q0FBQyxPQUFFLFdBQVUsYUFBYTtBQUFBO0FBQUEsUUFBTSw0Q0FBQyxXQUFNLGtCQUFJO0FBQUEsU0FBUTtBQUFBLE9BQ3JEO0FBQUEsSUFDQSw2Q0FBQyxXQUFNLFdBQVUsY0FDZjtBQUFBLGtEQUFDLFVBQUsseUJBQVc7QUFBQSxNQUNqQiw0Q0FBQyxXQUFNLE1BQUssU0FBUSxLQUFJLEtBQUksS0FBSSxPQUFNLE9BQU8sT0FBTyxVQUFVLENBQUMsTUFBTSxTQUFTLE9BQU8sRUFBRSxPQUFPLEtBQUssQ0FBQyxHQUFHLGtCQUFnQixHQUFHLEtBQUssWUFBWSxLQUFLLElBQUk7QUFBQSxPQUN0SjtBQUFBLElBQ0EsNENBQUMsT0FBRSxXQUFXLGVBQWUsU0FBUyxLQUFLLE9BQU8sU0FBUyxLQUFLLFFBQVEsS0FBSyxJQUFJLGFBQVUsVUFBVSxpQkFBTTtBQUFBLEtBQzdHO0FBRUo7QUFFZSxTQUFSLFlBQTZCO0FBQ2xDLFNBQ0UsNEVBQ0U7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTTtBQUFBLFFBQ04sU0FBUTtBQUFBLFFBQ1IsY0FBYTtBQUFBLFFBQ2IsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsd0JBQXdCLElBQUksT0FBTyxDQUFDO0FBQUEsUUFDcEUsTUFBSztBQUFBLFFBQ0wsS0FBSyw0Q0FBQyxjQUFXLE1BQUssU0FBUTtBQUFBLFFBQzlCLFFBQVEsQ0FBQyxFQUFFLElBQUksS0FBSyxPQUFPLE9BQU8sR0FBRyxFQUFFLE9BQU8sNEJBQTRCLENBQUM7QUFBQTtBQUFBLElBQzdFO0FBQUEsSUFFQSw0Q0FBQyxhQUFRLFdBQVUsc0JBQ2pCLHVEQUFDLFNBQUksV0FBVSxtQkFDYjtBQUFBLG1EQUFDLFNBQUksV0FBVSxjQUNiO0FBQUEsb0RBQUMsV0FBUSxPQUFNLFdBQVUsK0JBQWlCO0FBQUEsUUFDMUMsNENBQUMsUUFBRyw4Q0FBZ0M7QUFBQSxRQUNwQyw0Q0FBQyxRQUFHLFdBQVUsU0FDWCxnQkFBTSxJQUFJLENBQUMsTUFDViw2Q0FBQyxRQUFhLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHO0FBQUEsdURBQUMsT0FBRztBQUFBLGNBQUU7QUFBQSxZQUFHO0FBQUEsYUFBQztBQUFBLFVBQUksNkNBQUMsVUFBSztBQUFBLHdEQUFDLFlBQVEsWUFBRSxHQUFFO0FBQUEsWUFBVSxFQUFFO0FBQUEsYUFBRTtBQUFBLGFBQTNFLEVBQUUsQ0FBZ0YsQ0FDNUYsR0FDSDtBQUFBLFFBQ0EsNENBQUMsT0FBRSxXQUFVLFFBQU8sa0hBQW9HO0FBQUEsU0FDMUg7QUFBQSxNQUNBLDRDQUFDLFNBQU07QUFBQSxPQUNULEdBQ0Y7QUFBQSxJQUVBLDRDQUFDLGFBQVEsV0FBVSxrQ0FDakIsdURBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSxrREFBQyxlQUFZLFNBQVEsc0JBQXFCLE9BQU8sNEVBQUU7QUFBQTtBQUFBLFFBQWUsNENBQUMsVUFBSyxXQUFVLFlBQVcsNEJBQWM7QUFBQSxTQUFPLEdBQUssT0FBTSxXQUFVO0FBQUEsTUFDdkksNENBQUMsU0FBSSxXQUFVLGFBQ1osV0FBQyxDQUFDLE1BQU0sb0NBQW9DLEdBQUcsQ0FBQyxRQUFRLHlCQUF5QixHQUFHLENBQUMsUUFBUSx5QkFBeUIsR0FBRyxDQUFDLE9BQU8sa0RBQWtELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUNsTSw2Q0FBQyxVQUFlLFdBQVUsWUFBVyxPQUFPLElBQUksSUFBSSxRQUFPLFFBQU87QUFBQSxvREFBQyxPQUFHLGFBQUU7QUFBQSxRQUFJLDRDQUFDLFVBQU0sYUFBRTtBQUFBLFdBQXhFLENBQStFLENBQzdGLEdBQ0g7QUFBQSxNQUNBLDRDQUFDLE9BQUUsV0FBVSxxQkFBb0IsK0hBQWlIO0FBQUEsT0FDcEosR0FDRjtBQUFBLElBRUEsNENBQUMsYUFBUSxXQUFVLHVCQUNqQix1REFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLGtEQUFDLGVBQVksU0FBUSxxQkFBb0IsT0FBTSx5Q0FBd0MsT0FBTSxXQUFVO0FBQUEsTUFDdkcsNENBQUMsUUFBRyxXQUFVLGVBQ1gsaUJBQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFDcEIsNkNBQUMsVUFBTyxJQUFHLE1BQWEsT0FBTyxJQUFJLElBQUksUUFBTyxRQUFPLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRztBQUFBLG9EQUFDLFFBQUssTUFBTSxJQUFJLE1BQU0sSUFBSTtBQUFBLFFBQUc7QUFBQSxXQUFsRixDQUFvRixDQUMxRyxHQUNIO0FBQUEsT0FDRixHQUNGO0FBQUEsSUFFQSw0Q0FBQyxhQUFRLFdBQVUseUJBQ2pCLHVEQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsa0RBQUMsZUFBWSxTQUFRLG9CQUFtQixPQUFNLDZCQUE0QixNQUFLLHlGQUF3RixPQUFNLFdBQVU7QUFBQSxNQUN2TCw0Q0FBQyxtQkFBZ0I7QUFBQSxNQUNqQiw0Q0FBQyxPQUFFLFdBQVUsVUFBUyx1REFBQyxRQUFLLFdBQVUsYUFBWSxJQUFHLGlCQUFnQjtBQUFBO0FBQUEsUUFBdUIsNENBQUMsUUFBSyxNQUFLLFNBQVEsTUFBTSxJQUFJO0FBQUEsU0FBRSxHQUFPO0FBQUEsT0FDcEksR0FDRjtBQUFBLEtBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFtdCn0K
