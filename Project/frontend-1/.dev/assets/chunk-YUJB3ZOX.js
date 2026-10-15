import {
  Icon,
  Link,
  SectionHead,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/components/TopicHub.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);

// src/seo/keywords.js
init_define_import_meta_env();
var TOPIC_GROUPS = [
  { id: "earn", label: "Earn online", color: "#1e5bff" },
  { id: "surveys", label: "Paid surveys", color: "#f97316" },
  { id: "health", label: "Healthcare & clinical", color: "#14b8a6" },
  { id: "payouts", label: "Rewards & payouts", color: "#8b5cf6" },
  { id: "safety", label: "Safety & legit sites", color: "#e8344e" }
];
var T = (label, to, group, heat = 1) => ({ label, to, group, heat });
var TOPICS = [
  T("Paid surveys for money", "/blog/paid-surveys-for-money-beginners-guide", "surveys", 3),
  T("Online surveys for money", "/how-it-works", "surveys", 3),
  T("Get paid to take surveys", "/blog/get-paid-to-take-surveys-from-home", "surveys", 3),
  T("Surveys to make money", "/earn", "surveys", 2),
  T("Earn money through surveys", "/blog/how-much-can-you-earn-from-paid-surveys", "surveys", 2),
  T("High paying surveys", "/blog/high-paying-surveys-what-sets-the-reward", "surveys", 1),
  T("Why you get screened out", "/blog/why-you-get-screened-out-of-surveys", "surveys", 1),
  T("Get more survey invitations", "/blog/get-more-paid-survey-invitations", "surveys", 1),
  T("Online focus groups that pay", "/blog/online-focus-groups-paid", "surveys", 1),
  T("Earn money online without investment", "/blog/earn-money-online-without-investment", "earn", 3),
  T("Legit ways to make money online", "/blog/legit-ways-to-make-money-online", "earn", 3),
  T("Make money from home", "/blog/make-money-from-home-side-income-ideas", "earn", 3),
  T("Make money from your phone", "/blog/make-money-from-your-phone-with-surveys", "earn", 2),
  T("Online jobs for students without investment", "/blog/online-jobs-for-students-without-investment", "earn", 2),
  T("Extra income from home", "/blog/extra-income-from-home-for-retirees-and-homemakers", "earn", 1),
  T("Paid online market research", "/blog/paid-online-market-research-explained", "earn", 1),
  T("Paid surveys for doctors", "/blog/paid-surveys-for-doctors", "health", 2),
  T("Paid surveys for nurses", "/blog/paid-surveys-for-nurses", "health", 2),
  T("Side hustle for healthcare workers", "/blog/side-hustle-for-healthcare-workers", "health", 1),
  T("Extra income for pharmacists", "/blog/extra-income-ideas-for-pharmacists", "health", 1),
  T("Caregiver surveys that pay", "/blog/caregiver-surveys-get-paid-for-your-opinion", "health", 1),
  T("Paid health surveys for patients", "/blog/paid-health-surveys-for-patients", "health", 2),
  T("Paid clinical studies near me", "/blog/paid-clinical-studies-vs-paid-surveys", "health", 3),
  T("Clinical research organization", "/blog/what-is-a-clinical-research-organization", "health", 2),
  T("Randomised clinical trials", "/blog/randomised-clinical-trials-explained", "health", 2),
  T("Surveys that pay via PayPal", "/blog/surveys-that-pay-via-paypal", "payouts", 2),
  T("Surveys for Amazon gift cards", "/blog/surveys-for-amazon-gift-cards", "payouts", 2),
  T("UPI survey rewards in India", "/blog/upi-survey-rewards-earn-online-india", "payouts", 2),
  T("Paid surveys for cash", "/rewards", "payouts", 3),
  T("Surveys that pay instantly?", "/blog/surveys-that-pay-instantly-truth", "payouts", 1),
  T("Best paid survey sites", "/blog/best-paid-survey-sites-checklist", "safety", 3),
  T("Are surveys for money legit?", "/blog/are-online-surveys-for-money-legit", "safety", 3),
  T("Legit paid survey sites", "/trust-safety", "safety", 2),
  T("Survey privacy & GDPR", "/blog/survey-privacy-and-gdpr", "safety", 1)
];

// src/components/TopicHub.jsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function SearchTyper({ items }) {
  const [i, setI] = (0, import_react.useState)(0);
  const [n, setN] = (0, import_react.useState)(items[0]?.label.length || 0);
  const [del, setDel] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    if (!items.length) return;
    const full = items[i].label;
    const t = setTimeout(() => {
      if (!del && n < full.length) setN(n + 1);
      else if (!del) setDel(true);
      else if (n > 0) setN(n - 1);
      else {
        setDel(false);
        setI((i + 1) % items.length);
      }
    }, !del && n === full.length ? 1600 : del ? 25 : 60);
    return () => clearTimeout(t);
  }, [i, n, del, items]);
  const cur = items[i];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "th-search", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "search", size: 20 }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "ths-q", children: [
      cur?.label.slice(0, n),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "ths-caret" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "ths-go", children: [
      "Answered here ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 14 })
    ] })
  ] });
}
function TopicHub({ groups = TOPIC_GROUPS.map((g) => g.id), title = "Popular searches, honestly answered", eyebrow = "Trending topics", lead, exclude }) {
  const [g, setG] = (0, import_react.useState)("all");
  const pool = TOPICS.filter((t) => groups.includes(t.group) && t.to !== exclude);
  const list = g === "all" ? pool : pool.filter((t) => t.group === g);
  const groupsShown = TOPIC_GROUPS.filter((x) => groups.includes(x.id));
  const color = (id) => TOPIC_GROUPS.find((x) => x.id === id)?.color;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "topic-hub section", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { eyebrow, title, lead: lead || "The questions people type into search engines every day \u2014 each one links to a straight, no-hype answer.", color: "#f97316" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchTyper, { items: pool.filter((t) => t.heat >= 2) }),
    groupsShown.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "th-tabs", role: "tablist", "aria-label": "Filter topics", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { role: "tab", "aria-selected": g === "all", className: g === "all" ? "on" : "", onClick: () => setG("all"), children: "All topics" }),
      groupsShown.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { role: "tab", "aria-selected": g === x.id, className: g === x.id ? "on" : "", style: { "--c": x.color }, onClick: () => setG(x.id), children: x.label }, x.id))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "th-cloud", children: list.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: `heat-${t.heat}`, style: { "--c": color(t.group), "--i": i }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: t.to, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "th-heat", "aria-hidden": "true", children: Array.from({ length: t.heat }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}, k)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "th-label", children: t.label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 14, className: "th-go" })
    ] }) }, t.label)) }, g)
  ] }) });
}
function TopicTicker({ groups }) {
  const list = groups ? TOPICS.filter((t) => groups.includes(t.group)) : TOPICS.filter((t) => t.heat >= 2);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "topic-ticker", "aria-label": "Popular searches", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "tt-label", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "trending", size: 14 }),
      " People search"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tt-viewport", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tt-track", children: [...list, ...list].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: t.to, tabIndex: i >= list.length ? -1 : void 0, "aria-hidden": i >= list.length || void 0, children: t.label }, i)) }) })
  ] });
}

export {
  TopicHub,
  TopicTicker
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2NvbXBvbmVudHMvVG9waWNIdWIuanN4IiwgIi4uLy4uL3NyYy9zZW8va2V5d29yZHMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIFwiUG9wdWxhciBzZWFyY2hlc1wiIGh1Yjogd2hhdCBwZW9wbGUgc2VhcmNoIGZvciBcdTIxOTIgdGhlIHBhZ2UgdGhhdCBhbnN3ZXJzIGl0LlxuLy8gSW50ZXJuYWwgbGlua3Mgd2l0aCBkZXNjcmlwdGl2ZSBhbmNob3IgdGV4dCAoZ29vZCBmb3IgU0VPKSBwcmVzZW50ZWQgYXMgYSBmaWx0ZXJhYmxlIGhlYXQgbWFwLlxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICcuLi9yb3V0ZXIuanN4JztcbmltcG9ydCB7IFRPUElDUywgVE9QSUNfR1JPVVBTIH0gZnJvbSAnLi4vc2VvL2tleXdvcmRzLmpzJztcbmltcG9ydCBJY29uIGZyb20gJy4vSWNvbi5qc3gnO1xuaW1wb3J0IHsgU2VjdGlvbkhlYWQgfSBmcm9tICcuL3VpLmpzeCc7XG5cbmZ1bmN0aW9uIFNlYXJjaFR5cGVyKHsgaXRlbXMgfSkge1xuICBjb25zdCBbaSwgc2V0SV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW24sIHNldE5dID0gdXNlU3RhdGUoaXRlbXNbMF0/LmxhYmVsLmxlbmd0aCB8fCAwKTtcbiAgY29uc3QgW2RlbCwgc2V0RGVsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IGZ1bGwgPSBpdGVtc1tpXS5sYWJlbDtcbiAgICBjb25zdCB0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIWRlbCAmJiBuIDwgZnVsbC5sZW5ndGgpIHNldE4obiArIDEpO1xuICAgICAgZWxzZSBpZiAoIWRlbCkgc2V0RGVsKHRydWUpO1xuICAgICAgZWxzZSBpZiAobiA+IDApIHNldE4obiAtIDEpO1xuICAgICAgZWxzZSB7IHNldERlbChmYWxzZSk7IHNldEkoKGkgKyAxKSAlIGl0ZW1zLmxlbmd0aCk7IH1cbiAgICB9LCAhZGVsICYmIG4gPT09IGZ1bGwubGVuZ3RoID8gMTYwMCA6IGRlbCA/IDI1IDogNjApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhclRpbWVvdXQodCk7XG4gIH0sIFtpLCBuLCBkZWwsIGl0ZW1zXSk7XG4gIGNvbnN0IGN1ciA9IGl0ZW1zW2ldO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidGgtc2VhcmNoXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICA8SWNvbiBuYW1lPVwic2VhcmNoXCIgc2l6ZT17MjB9IC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0aHMtcVwiPntjdXI/LmxhYmVsLnNsaWNlKDAsIG4pfTxpIGNsYXNzTmFtZT1cInRocy1jYXJldFwiIC8+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGhzLWdvXCI+QW5zd2VyZWQgaGVyZSA8SWNvbiBuYW1lPVwiYXJyb3dcIiBzaXplPXsxNH0gLz48L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRvcGljSHViKHsgZ3JvdXBzID0gVE9QSUNfR1JPVVBTLm1hcCgoZykgPT4gZy5pZCksIHRpdGxlID0gJ1BvcHVsYXIgc2VhcmNoZXMsIGhvbmVzdGx5IGFuc3dlcmVkJywgZXllYnJvdyA9ICdUcmVuZGluZyB0b3BpY3MnLCBsZWFkLCBleGNsdWRlIH0pIHtcbiAgY29uc3QgW2csIHNldEddID0gdXNlU3RhdGUoJ2FsbCcpO1xuICBjb25zdCBwb29sID0gVE9QSUNTLmZpbHRlcigodCkgPT4gZ3JvdXBzLmluY2x1ZGVzKHQuZ3JvdXApICYmIHQudG8gIT09IGV4Y2x1ZGUpO1xuICBjb25zdCBsaXN0ID0gZyA9PT0gJ2FsbCcgPyBwb29sIDogcG9vbC5maWx0ZXIoKHQpID0+IHQuZ3JvdXAgPT09IGcpO1xuICBjb25zdCBncm91cHNTaG93biA9IFRPUElDX0dST1VQUy5maWx0ZXIoKHgpID0+IGdyb3Vwcy5pbmNsdWRlcyh4LmlkKSk7XG4gIGNvbnN0IGNvbG9yID0gKGlkKSA9PiBUT1BJQ19HUk9VUFMuZmluZCgoeCkgPT4geC5pZCA9PT0gaWQpPy5jb2xvcjtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ0b3BpYy1odWIgc2VjdGlvblwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPFNlY3Rpb25IZWFkIGV5ZWJyb3c9e2V5ZWJyb3d9IHRpdGxlPXt0aXRsZX0gbGVhZD17bGVhZCB8fCAnVGhlIHF1ZXN0aW9ucyBwZW9wbGUgdHlwZSBpbnRvIHNlYXJjaCBlbmdpbmVzIGV2ZXJ5IGRheSBcdTIwMTQgZWFjaCBvbmUgbGlua3MgdG8gYSBzdHJhaWdodCwgbm8taHlwZSBhbnN3ZXIuJ30gY29sb3I9XCIjZjk3MzE2XCIgLz5cbiAgICAgICAgPFNlYXJjaFR5cGVyIGl0ZW1zPXtwb29sLmZpbHRlcigodCkgPT4gdC5oZWF0ID49IDIpfSAvPlxuICAgICAgICB7Z3JvdXBzU2hvd24ubGVuZ3RoID4gMSAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aC10YWJzXCIgcm9sZT1cInRhYmxpc3RcIiBhcmlhLWxhYmVsPVwiRmlsdGVyIHRvcGljc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17ZyA9PT0gJ2FsbCd9IGNsYXNzTmFtZT17ZyA9PT0gJ2FsbCcgPyAnb24nIDogJyd9IG9uQ2xpY2s9eygpID0+IHNldEcoJ2FsbCcpfT5BbGwgdG9waWNzPC9idXR0b24+XG4gICAgICAgICAgICB7Z3JvdXBzU2hvd24ubWFwKCh4KSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b24ga2V5PXt4LmlkfSByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17ZyA9PT0geC5pZH0gY2xhc3NOYW1lPXtnID09PSB4LmlkID8gJ29uJyA6ICcnfSBzdHlsZT17eyAnLS1jJzogeC5jb2xvciB9fSBvbkNsaWNrPXsoKSA9PiBzZXRHKHguaWQpfT57eC5sYWJlbH08L2J1dHRvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwidGgtY2xvdWRcIiBrZXk9e2d9PlxuICAgICAgICAgIHtsaXN0Lm1hcCgodCwgaSkgPT4gKFxuICAgICAgICAgICAgPGxpIGtleT17dC5sYWJlbH0gY2xhc3NOYW1lPXtgaGVhdC0ke3QuaGVhdH1gfSBzdHlsZT17eyAnLS1jJzogY29sb3IodC5ncm91cCksICctLWknOiBpIH19PlxuICAgICAgICAgICAgICA8TGluayB0bz17dC50b30+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGgtaGVhdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPntBcnJheS5mcm9tKHsgbGVuZ3RoOiB0LmhlYXQgfSkubWFwKChfLCBrKSA9PiA8aSBrZXk9e2t9IC8+KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGgtbGFiZWxcIj57dC5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPEljb24gbmFtZT1cImFycm93XCIgc2l6ZT17MTR9IGNsYXNzTmFtZT1cInRoLWdvXCIgLz5cbiAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn1cblxuLyoqIFNsaW0gc2Nyb2xsaW5nIHRpY2tlciBvZiB0b3BpY3MgKGRlY29yYXRpdmUgZHVwbGljYXRlIGlzIGhpZGRlbiBmcm9tIGFzc2lzdGl2ZSB0ZWNoKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUb3BpY1RpY2tlcih7IGdyb3VwcyB9KSB7XG4gIGNvbnN0IGxpc3QgPSBncm91cHMgPyBUT1BJQ1MuZmlsdGVyKCh0KSA9PiBncm91cHMuaW5jbHVkZXModC5ncm91cCkpIDogVE9QSUNTLmZpbHRlcigodCkgPT4gdC5oZWF0ID49IDIpO1xuICByZXR1cm4gKFxuICAgIDxuYXYgY2xhc3NOYW1lPVwidG9waWMtdGlja2VyXCIgYXJpYS1sYWJlbD1cIlBvcHVsYXIgc2VhcmNoZXNcIj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInR0LWxhYmVsXCI+PEljb24gbmFtZT1cInRyZW5kaW5nXCIgc2l6ZT17MTR9IC8+IFBlb3BsZSBzZWFyY2g8L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInR0LXZpZXdwb3J0XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHQtdHJhY2tcIj5cbiAgICAgICAgICB7Wy4uLmxpc3QsIC4uLmxpc3RdLm1hcCgodCwgaSkgPT4gKFxuICAgICAgICAgICAgPExpbmsga2V5PXtpfSB0bz17dC50b30gdGFiSW5kZXg9e2kgPj0gbGlzdC5sZW5ndGggPyAtMSA6IHVuZGVmaW5lZH0gYXJpYS1oaWRkZW49e2kgPj0gbGlzdC5sZW5ndGggfHwgdW5kZWZpbmVkfT5cbiAgICAgICAgICAgICAge3QubGFiZWx9XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uYXY+XG4gICk7XG59XG4iLCAiLy8gU2VhcmNoIHRvcGljcyBcdTIxOTIgdGhlIHBhZ2UgdGhhdCBiZXN0IGFuc3dlcnMgdGhlbS4gUG93ZXJzIHRoZSBcIlBvcHVsYXIgc2VhcmNoZXNcIiBodWJzIChpbnRlcm5hbFxuLy8gbGlua2luZyBmb3IgU0VPICsgYW4gZWFzeSB3YXkgZm9yIHZpc2l0b3JzIHRvIGZpbmQgYW5zd2VycykuIExhYmVscyBhcmUgd3JpdHRlbiB0aGUgd2F5IHBlb3BsZVxuLy8gc2VhcmNoIChmcm9tIHRoZSBVYmVyc3VnZ2VzdCAvIEdvb2dsZSBBZHMga2V5d29yZCByZXNlYXJjaCBpbiBTRU8tS0VZV09SRC1NQVAubWQpLlxuLy8gaGVhdDogMyA9IGhpZ2hlc3Qgc2VhcmNoIGRlbWFuZCwgMSA9IG5pY2hlLiBPbmx5IGxpbmsgdG8gcGFnZXMgdGhhdCBnZW51aW5lbHkgYW5zd2VyIHRoZSBxdWVyeS5cbmV4cG9ydCBjb25zdCBUT1BJQ19HUk9VUFMgPSBbXG4gIHsgaWQ6ICdlYXJuJywgbGFiZWw6ICdFYXJuIG9ubGluZScsIGNvbG9yOiAnIzFlNWJmZicgfSxcbiAgeyBpZDogJ3N1cnZleXMnLCBsYWJlbDogJ1BhaWQgc3VydmV5cycsIGNvbG9yOiAnI2Y5NzMxNicgfSxcbiAgeyBpZDogJ2hlYWx0aCcsIGxhYmVsOiAnSGVhbHRoY2FyZSAmIGNsaW5pY2FsJywgY29sb3I6ICcjMTRiOGE2JyB9LFxuICB7IGlkOiAncGF5b3V0cycsIGxhYmVsOiAnUmV3YXJkcyAmIHBheW91dHMnLCBjb2xvcjogJyM4YjVjZjYnIH0sXG4gIHsgaWQ6ICdzYWZldHknLCBsYWJlbDogJ1NhZmV0eSAmIGxlZ2l0IHNpdGVzJywgY29sb3I6ICcjZTgzNDRlJyB9LFxuXTtcblxuY29uc3QgVCA9IChsYWJlbCwgdG8sIGdyb3VwLCBoZWF0ID0gMSkgPT4gKHsgbGFiZWwsIHRvLCBncm91cCwgaGVhdCB9KTtcblxuZXhwb3J0IGNvbnN0IFRPUElDUyA9IFtcbiAgVCgnUGFpZCBzdXJ2ZXlzIGZvciBtb25leScsICcvYmxvZy9wYWlkLXN1cnZleXMtZm9yLW1vbmV5LWJlZ2lubmVycy1ndWlkZScsICdzdXJ2ZXlzJywgMyksXG4gIFQoJ09ubGluZSBzdXJ2ZXlzIGZvciBtb25leScsICcvaG93LWl0LXdvcmtzJywgJ3N1cnZleXMnLCAzKSxcbiAgVCgnR2V0IHBhaWQgdG8gdGFrZSBzdXJ2ZXlzJywgJy9ibG9nL2dldC1wYWlkLXRvLXRha2Utc3VydmV5cy1mcm9tLWhvbWUnLCAnc3VydmV5cycsIDMpLFxuICBUKCdTdXJ2ZXlzIHRvIG1ha2UgbW9uZXknLCAnL2Vhcm4nLCAnc3VydmV5cycsIDIpLFxuICBUKCdFYXJuIG1vbmV5IHRocm91Z2ggc3VydmV5cycsICcvYmxvZy9ob3ctbXVjaC1jYW4teW91LWVhcm4tZnJvbS1wYWlkLXN1cnZleXMnLCAnc3VydmV5cycsIDIpLFxuICBUKCdIaWdoIHBheWluZyBzdXJ2ZXlzJywgJy9ibG9nL2hpZ2gtcGF5aW5nLXN1cnZleXMtd2hhdC1zZXRzLXRoZS1yZXdhcmQnLCAnc3VydmV5cycsIDEpLFxuICBUKCdXaHkgeW91IGdldCBzY3JlZW5lZCBvdXQnLCAnL2Jsb2cvd2h5LXlvdS1nZXQtc2NyZWVuZWQtb3V0LW9mLXN1cnZleXMnLCAnc3VydmV5cycsIDEpLFxuICBUKCdHZXQgbW9yZSBzdXJ2ZXkgaW52aXRhdGlvbnMnLCAnL2Jsb2cvZ2V0LW1vcmUtcGFpZC1zdXJ2ZXktaW52aXRhdGlvbnMnLCAnc3VydmV5cycsIDEpLFxuICBUKCdPbmxpbmUgZm9jdXMgZ3JvdXBzIHRoYXQgcGF5JywgJy9ibG9nL29ubGluZS1mb2N1cy1ncm91cHMtcGFpZCcsICdzdXJ2ZXlzJywgMSksXG4gIFQoJ0Vhcm4gbW9uZXkgb25saW5lIHdpdGhvdXQgaW52ZXN0bWVudCcsICcvYmxvZy9lYXJuLW1vbmV5LW9ubGluZS13aXRob3V0LWludmVzdG1lbnQnLCAnZWFybicsIDMpLFxuICBUKCdMZWdpdCB3YXlzIHRvIG1ha2UgbW9uZXkgb25saW5lJywgJy9ibG9nL2xlZ2l0LXdheXMtdG8tbWFrZS1tb25leS1vbmxpbmUnLCAnZWFybicsIDMpLFxuICBUKCdNYWtlIG1vbmV5IGZyb20gaG9tZScsICcvYmxvZy9tYWtlLW1vbmV5LWZyb20taG9tZS1zaWRlLWluY29tZS1pZGVhcycsICdlYXJuJywgMyksXG4gIFQoJ01ha2UgbW9uZXkgZnJvbSB5b3VyIHBob25lJywgJy9ibG9nL21ha2UtbW9uZXktZnJvbS15b3VyLXBob25lLXdpdGgtc3VydmV5cycsICdlYXJuJywgMiksXG4gIFQoJ09ubGluZSBqb2JzIGZvciBzdHVkZW50cyB3aXRob3V0IGludmVzdG1lbnQnLCAnL2Jsb2cvb25saW5lLWpvYnMtZm9yLXN0dWRlbnRzLXdpdGhvdXQtaW52ZXN0bWVudCcsICdlYXJuJywgMiksXG4gIFQoJ0V4dHJhIGluY29tZSBmcm9tIGhvbWUnLCAnL2Jsb2cvZXh0cmEtaW5jb21lLWZyb20taG9tZS1mb3ItcmV0aXJlZXMtYW5kLWhvbWVtYWtlcnMnLCAnZWFybicsIDEpLFxuICBUKCdQYWlkIG9ubGluZSBtYXJrZXQgcmVzZWFyY2gnLCAnL2Jsb2cvcGFpZC1vbmxpbmUtbWFya2V0LXJlc2VhcmNoLWV4cGxhaW5lZCcsICdlYXJuJywgMSksXG4gIFQoJ1BhaWQgc3VydmV5cyBmb3IgZG9jdG9ycycsICcvYmxvZy9wYWlkLXN1cnZleXMtZm9yLWRvY3RvcnMnLCAnaGVhbHRoJywgMiksXG4gIFQoJ1BhaWQgc3VydmV5cyBmb3IgbnVyc2VzJywgJy9ibG9nL3BhaWQtc3VydmV5cy1mb3ItbnVyc2VzJywgJ2hlYWx0aCcsIDIpLFxuICBUKCdTaWRlIGh1c3RsZSBmb3IgaGVhbHRoY2FyZSB3b3JrZXJzJywgJy9ibG9nL3NpZGUtaHVzdGxlLWZvci1oZWFsdGhjYXJlLXdvcmtlcnMnLCAnaGVhbHRoJywgMSksXG4gIFQoJ0V4dHJhIGluY29tZSBmb3IgcGhhcm1hY2lzdHMnLCAnL2Jsb2cvZXh0cmEtaW5jb21lLWlkZWFzLWZvci1waGFybWFjaXN0cycsICdoZWFsdGgnLCAxKSxcbiAgVCgnQ2FyZWdpdmVyIHN1cnZleXMgdGhhdCBwYXknLCAnL2Jsb2cvY2FyZWdpdmVyLXN1cnZleXMtZ2V0LXBhaWQtZm9yLXlvdXItb3BpbmlvbicsICdoZWFsdGgnLCAxKSxcbiAgVCgnUGFpZCBoZWFsdGggc3VydmV5cyBmb3IgcGF0aWVudHMnLCAnL2Jsb2cvcGFpZC1oZWFsdGgtc3VydmV5cy1mb3ItcGF0aWVudHMnLCAnaGVhbHRoJywgMiksXG4gIFQoJ1BhaWQgY2xpbmljYWwgc3R1ZGllcyBuZWFyIG1lJywgJy9ibG9nL3BhaWQtY2xpbmljYWwtc3R1ZGllcy12cy1wYWlkLXN1cnZleXMnLCAnaGVhbHRoJywgMyksXG4gIFQoJ0NsaW5pY2FsIHJlc2VhcmNoIG9yZ2FuaXphdGlvbicsICcvYmxvZy93aGF0LWlzLWEtY2xpbmljYWwtcmVzZWFyY2gtb3JnYW5pemF0aW9uJywgJ2hlYWx0aCcsIDIpLFxuICBUKCdSYW5kb21pc2VkIGNsaW5pY2FsIHRyaWFscycsICcvYmxvZy9yYW5kb21pc2VkLWNsaW5pY2FsLXRyaWFscy1leHBsYWluZWQnLCAnaGVhbHRoJywgMiksXG4gIFQoJ1N1cnZleXMgdGhhdCBwYXkgdmlhIFBheVBhbCcsICcvYmxvZy9zdXJ2ZXlzLXRoYXQtcGF5LXZpYS1wYXlwYWwnLCAncGF5b3V0cycsIDIpLFxuICBUKCdTdXJ2ZXlzIGZvciBBbWF6b24gZ2lmdCBjYXJkcycsICcvYmxvZy9zdXJ2ZXlzLWZvci1hbWF6b24tZ2lmdC1jYXJkcycsICdwYXlvdXRzJywgMiksXG4gIFQoJ1VQSSBzdXJ2ZXkgcmV3YXJkcyBpbiBJbmRpYScsICcvYmxvZy91cGktc3VydmV5LXJld2FyZHMtZWFybi1vbmxpbmUtaW5kaWEnLCAncGF5b3V0cycsIDIpLFxuICBUKCdQYWlkIHN1cnZleXMgZm9yIGNhc2gnLCAnL3Jld2FyZHMnLCAncGF5b3V0cycsIDMpLFxuICBUKCdTdXJ2ZXlzIHRoYXQgcGF5IGluc3RhbnRseT8nLCAnL2Jsb2cvc3VydmV5cy10aGF0LXBheS1pbnN0YW50bHktdHJ1dGgnLCAncGF5b3V0cycsIDEpLFxuICBUKCdCZXN0IHBhaWQgc3VydmV5IHNpdGVzJywgJy9ibG9nL2Jlc3QtcGFpZC1zdXJ2ZXktc2l0ZXMtY2hlY2tsaXN0JywgJ3NhZmV0eScsIDMpLFxuICBUKCdBcmUgc3VydmV5cyBmb3IgbW9uZXkgbGVnaXQ/JywgJy9ibG9nL2FyZS1vbmxpbmUtc3VydmV5cy1mb3ItbW9uZXktbGVnaXQnLCAnc2FmZXR5JywgMyksXG4gIFQoJ0xlZ2l0IHBhaWQgc3VydmV5IHNpdGVzJywgJy90cnVzdC1zYWZldHknLCAnc2FmZXR5JywgMiksXG4gIFQoJ1N1cnZleSBwcml2YWN5ICYgR0RQUicsICcvYmxvZy9zdXJ2ZXktcHJpdmFjeS1hbmQtZ2RwcicsICdzYWZldHknLCAxKSxcbl07XG5cbmV4cG9ydCBjb25zdCB0b3BpY3NGb3IgPSAoZ3JvdXBzKSA9PiBUT1BJQ1MuZmlsdGVyKCh0KSA9PiBncm91cHMuaW5jbHVkZXModC5ncm91cCkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsbUJBQW9DOzs7QUNGcEM7QUFJTyxJQUFNLGVBQWU7QUFBQSxFQUMxQixFQUFFLElBQUksUUFBUSxPQUFPLGVBQWUsT0FBTyxVQUFVO0FBQUEsRUFDckQsRUFBRSxJQUFJLFdBQVcsT0FBTyxnQkFBZ0IsT0FBTyxVQUFVO0FBQUEsRUFDekQsRUFBRSxJQUFJLFVBQVUsT0FBTyx5QkFBeUIsT0FBTyxVQUFVO0FBQUEsRUFDakUsRUFBRSxJQUFJLFdBQVcsT0FBTyxxQkFBcUIsT0FBTyxVQUFVO0FBQUEsRUFDOUQsRUFBRSxJQUFJLFVBQVUsT0FBTyx3QkFBd0IsT0FBTyxVQUFVO0FBQ2xFO0FBRUEsSUFBTSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sT0FBTyxPQUFPLEVBQUUsT0FBTyxJQUFJLE9BQU8sS0FBSztBQUU3RCxJQUFNLFNBQVM7QUFBQSxFQUNwQixFQUFFLDBCQUEwQixnREFBZ0QsV0FBVyxDQUFDO0FBQUEsRUFDeEYsRUFBRSw0QkFBNEIsaUJBQWlCLFdBQVcsQ0FBQztBQUFBLEVBQzNELEVBQUUsNEJBQTRCLDRDQUE0QyxXQUFXLENBQUM7QUFBQSxFQUN0RixFQUFFLHlCQUF5QixTQUFTLFdBQVcsQ0FBQztBQUFBLEVBQ2hELEVBQUUsOEJBQThCLGlEQUFpRCxXQUFXLENBQUM7QUFBQSxFQUM3RixFQUFFLHVCQUF1QixrREFBa0QsV0FBVyxDQUFDO0FBQUEsRUFDdkYsRUFBRSw0QkFBNEIsNkNBQTZDLFdBQVcsQ0FBQztBQUFBLEVBQ3ZGLEVBQUUsK0JBQStCLDBDQUEwQyxXQUFXLENBQUM7QUFBQSxF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
