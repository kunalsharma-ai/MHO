import {
  QUALITY_CHECKS,
  QUALITY_STAGES,
  VERIFICATION_PROTOCOLS
} from "/assets/chunk-UQWWOXC3.js";
import {
  PAYMENT_METHODS,
  methodsFor
} from "/assets/chunk-SPSQFVM6.js";
import {
  Flag,
  Icon,
  LiveZone,
  Reveal,
  require_jsx_runtime,
  require_react,
  useInView
} from "/assets/chunk-LANM2SZF.js";
import {
  COVERAGE,
  REGIONS
} from "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/components/Showcase.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function QualityPipeline() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [stage, setStage] = (0, import_react.useState)("all");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref, className: `pipeline ${inView ? "is-in" : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pipe-legend", role: "tablist", "aria-label": "Filter checks by stage", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { role: "tab", "aria-selected": stage === "all", className: stage === "all" ? "on" : "", onClick: () => setStage("all"), children: "All 18 checks" }),
      QUALITY_STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { role: "tab", "aria-selected": stage === s.id, className: stage === s.id ? "on" : "", style: { "--c": s.color }, onClick: () => setStage(s.id), children: s.label }, s.id))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pipe-lanes", children: QUALITY_STAGES.map((s, si) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: `pipe-lane ${stage !== "all" && stage !== s.id ? "dim" : ""}`, style: { "--c": s.color, "--si": si }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "lane-num", children: [
          "0",
          si + 1
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: s.label })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lane-scan", "aria-hidden": "true" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: QUALITY_CHECKS.filter((c) => c.stage === s.id).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { style: { "--i": i }, tabIndex: 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "chk-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: c.icon, size: 18 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "chk-txt", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: c.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: c.note })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "chk-ok", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 14, stroke: 3 }) })
      ] }, c.name)) })
    ] }, s.id)) })
  ] });
}
function VerificationRing() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "vring", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vring-core", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "shieldCheck", size: 44 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Manual credential review" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "by our quality verification team" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vring-orbit", "aria-hidden": "true" }),
    VERIFICATION_PROTOCOLS.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vring-node", style: { "--i": i, "--n": VERIFICATION_PROTOCOLS.length }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vn-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: p.icon, size: 20 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vn-txt", children: p.name })
    ] }, p.name))
  ] });
}
var METHOD_ICON = { paypal: "paypal", upi: "upi", wire: "bank", amazon: "gift", report: "clipboard" };
function PaymentStack({ initialCountry = "in" }) {
  const [cc, setCc] = (0, import_react.useState)(initialCountry);
  const [q, setQ] = (0, import_react.useState)("");
  const allowed = methodsFor(cc).map((m) => m.id);
  const current = COVERAGE.find((c) => c.code === cc);
  const t = q.trim().toLowerCase();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "paystack ps4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ps-picker", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "psp-now", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "psp-flag", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { code: cc, name: current?.name, size: 44 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Show payout options for" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: current?.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
            allowed.length,
            " payout option",
            allowed.length > 1 ? "s" : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "psp-search", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "search", size: 16 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "search", value: q, onChange: (e) => setQ(e.target.value), placeholder: `Search our ${COVERAGE.length} countries`, "aria-label": "Search countries" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "psp-regions", children: REGIONS.map((r) => {
        const list = r.countries.filter(([, name]) => !t || name.toLowerCase().includes(t));
        if (!list.length) return null;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "psp-reg", style: { "--c": r.color }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "psp-rn", children: r.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: list.map(([code, name]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: code === cc ? "on" : "", onClick: () => setCc(code), "aria-pressed": code === cc, title: name, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { code, name, size: 18 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name })
          ] }, code)) })
        ] }, r.id);
      }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ps-right", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveZone, { className: "paystack-fan", children: PAYMENT_METHODS.map((m, i) => {
        const ok = allowed.includes(m.id);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: `pay-card pc-${m.id} ${ok ? "" : "is-off"}`, style: { "--i": i, "--c1": m.color, "--c2": m.accent }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pc-chip", "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pc-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: METHOD_ICON[m.id], size: 26 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: m.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.blurb }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pc-state", children: ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 13, stroke: 3 }),
            " Available"
          ] }) : m.id === "upi" ? "India only" : "Not available" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pc-shine", "aria-hidden": "true" })
        ] }, m.id);
      }) }, cc),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "paystack-note", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { code: cc, size: 20 }),
        " ",
        allowed.length,
        " payout option",
        allowed.length > 1 ? "s" : "",
        " available in ",
        current?.name,
        ". UPI is an India-only payment method; members in every other country choose PayPal, Wire Transfer, Amazon Gift Cards or a Medical Report."
      ] })
    ] })
  ] });
}
function PrivacySeal() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { className: "privacy-seal", effect: "zoom", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ps-ring", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 200 200", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { id: "ps-circle", d: "M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textPath", { href: "#ps-circle", children: "YOUR DATA STAYS YOURS \u2022 NEVER SOLD \u2022 NEVER SHARED \u2022 " }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ps-core", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lock", size: 34 }) })
  ] });
}

export {
  QualityPipeline,
  VerificationRing,
  PaymentStack,
  PrivacySeal
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2NvbXBvbmVudHMvU2hvd2Nhc2UuanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBTZWN0aW9uIHZpc3VhbHM6IHF1YWxpdHkgcGlwZWxpbmUsIHZlcmlmaWNhdGlvbiByaW5nLCAzRCBwYXltZW50IGNhcmRzLCBub3RpZmljYXRpb24gcGhvbmUsIHN0ZXBzIHBhdGguXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uLmpzeCc7XG5pbXBvcnQgeyBRVUFMSVRZX0NIRUNLUywgUVVBTElUWV9TVEFHRVMsIFZFUklGSUNBVElPTl9QUk9UT0NPTFMgfSBmcm9tICcuLi9kYXRhL3F1YWxpdHkuanMnO1xuaW1wb3J0IHsgUEFZTUVOVF9NRVRIT0RTLCBOT1RJRllfQ0hBTk5FTFMsIG1ldGhvZHNGb3IgfSBmcm9tICcuLi9kYXRhL3Jld2FyZHMuanMnO1xuaW1wb3J0IHsgTGl2ZVpvbmUsIFJldmVhbCwgdXNlSW5WaWV3LCBGbGFnIH0gZnJvbSAnLi91aS5qc3gnO1xuaW1wb3J0IHsgUkVHSU9OUywgQ09WRVJBR0UgfSBmcm9tICcuLi9kYXRhL2NvdW50cmllcy5qcyc7XG5cbi8qIC0tLS0tLS0tLS0gUXVhbGl0eSBwaXBlbGluZTogMyBsYW5lcywgY2hlY2tzIGxpZ2h0IHVwIGFzIGEgXCJzY2FuXCIgcGFzc2VzIC0tLS0tLS0tLS0gKi9cbmV4cG9ydCBmdW5jdGlvbiBRdWFsaXR5UGlwZWxpbmUoKSB7XG4gIGNvbnN0IFtyZWYsIGluVmlld10gPSB1c2VJblZpZXcoeyB0aHJlc2hvbGQ6IDAuMiB9KTtcbiAgY29uc3QgW3N0YWdlLCBzZXRTdGFnZV0gPSB1c2VTdGF0ZSgnYWxsJyk7XG4gIHJldHVybiAoXG4gICAgPGRpdiByZWY9e3JlZn0gY2xhc3NOYW1lPXtgcGlwZWxpbmUgJHtpblZpZXcgPyAnaXMtaW4nIDogJyd9YH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpcGUtbGVnZW5kXCIgcm9sZT1cInRhYmxpc3RcIiBhcmlhLWxhYmVsPVwiRmlsdGVyIGNoZWNrcyBieSBzdGFnZVwiPlxuICAgICAgICA8YnV0dG9uIHJvbGU9XCJ0YWJcIiBhcmlhLXNlbGVjdGVkPXtzdGFnZSA9PT0gJ2FsbCd9IGNsYXNzTmFtZT17c3RhZ2UgPT09ICdhbGwnID8gJ29uJyA6ICcnfSBvbkNsaWNrPXsoKSA9PiBzZXRTdGFnZSgnYWxsJyl9PkFsbCAxOCBjaGVja3M8L2J1dHRvbj5cbiAgICAgICAge1FVQUxJVFlfU1RBR0VTLm1hcCgocykgPT4gKFxuICAgICAgICAgIDxidXR0b24ga2V5PXtzLmlkfSByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17c3RhZ2UgPT09IHMuaWR9IGNsYXNzTmFtZT17c3RhZ2UgPT09IHMuaWQgPyAnb24nIDogJyd9IHN0eWxlPXt7ICctLWMnOiBzLmNvbG9yIH19IG9uQ2xpY2s9eygpID0+IHNldFN0YWdlKHMuaWQpfT57cy5sYWJlbH08L2J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGlwZS1sYW5lc1wiPlxuICAgICAgICB7UVVBTElUWV9TVEFHRVMubWFwKChzLCBzaSkgPT4gKFxuICAgICAgICAgIDxzZWN0aW9uIGtleT17cy5pZH0gY2xhc3NOYW1lPXtgcGlwZS1sYW5lICR7c3RhZ2UgIT09ICdhbGwnICYmIHN0YWdlICE9PSBzLmlkID8gJ2RpbScgOiAnJ31gfSBzdHlsZT17eyAnLS1jJzogcy5jb2xvciwgJy0tc2knOiBzaSB9fT5cbiAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxhbmUtbnVtXCI+MHtzaSArIDF9PC9zcGFuPlxuICAgICAgICAgICAgICA8aDM+e3MubGFiZWx9PC9oMz5cbiAgICAgICAgICAgIDwvaGVhZGVyPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGFuZS1zY2FuXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAge1FVQUxJVFlfQ0hFQ0tTLmZpbHRlcigoYykgPT4gYy5zdGFnZSA9PT0gcy5pZCkubWFwKChjLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgPGxpIGtleT17Yy5uYW1lfSBzdHlsZT17eyAnLS1pJzogaSB9fSB0YWJJbmRleD17MH0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGstaWNcIj48SWNvbiBuYW1lPXtjLmljb259IHNpemU9ezE4fSAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNoay10eHRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGI+e2MubmFtZX08L2I+XG4gICAgICAgICAgICAgICAgICAgIDxzbWFsbD57Yy5ub3RlfTwvc21hbGw+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGstb2tcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPXsxNH0gc3Ryb2tlPXszfSAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vKiAtLS0tLS0tLS0tIFZlcmlmaWNhdGlvbiByaW5nOiA2IHByb3RvY29scyBvcmJpdCBhIHNoaWVsZDsgbWFudWFsIHJldmlldyBpbiB0aGUgY2VudHJlIC0tLS0tLS0tLS0gKi9cbmV4cG9ydCBmdW5jdGlvbiBWZXJpZmljYXRpb25SaW5nKCkge1xuICByZXR1cm4gKFxuICAgIDxMaXZlWm9uZSBjbGFzc05hbWU9XCJ2cmluZ1wiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2cmluZy1jb3JlXCI+XG4gICAgICAgIDxJY29uIG5hbWU9XCJzaGllbGRDaGVja1wiIHNpemU9ezQ0fSAvPlxuICAgICAgICA8Yj5NYW51YWwgY3JlZGVudGlhbCByZXZpZXc8L2I+XG4gICAgICAgIDxzbWFsbD5ieSBvdXIgcXVhbGl0eSB2ZXJpZmljYXRpb24gdGVhbTwvc21hbGw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidnJpbmctb3JiaXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAge1ZFUklGSUNBVElPTl9QUk9UT0NPTFMubWFwKChwLCBpKSA9PiAoXG4gICAgICAgIDxkaXYga2V5PXtwLm5hbWV9IGNsYXNzTmFtZT1cInZyaW5nLW5vZGVcIiBzdHlsZT17eyAnLS1pJzogaSwgJy0tbic6IFZFUklGSUNBVElPTl9QUk9UT0NPTFMubGVuZ3RoIH19PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZuLWljXCI+PEljb24gbmFtZT17cC5pY29ufSBzaXplPXsyMH0gLz48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidm4tdHh0XCI+e3AubmFtZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSl9XG4gICAgPC9MaXZlWm9uZT5cbiAgKTtcbn1cblxuLyogLS0tLS0tLS0tLSBQYXltZW50IGNhcmRzOiAzRCBmYW4sIFVQSSBzaG93biBvbmx5IGZvciBJbmRpYSAtLS0tLS0tLS0tICovXG5jb25zdCBNRVRIT0RfSUNPTiA9IHsgcGF5cGFsOiAncGF5cGFsJywgdXBpOiAndXBpJywgd2lyZTogJ2JhbmsnLCBhbWF6b246ICdnaWZ0JywgcmVwb3J0OiAnY2xpcGJvYXJkJyB9O1xuZXhwb3J0IGZ1bmN0aW9uIFBheW1lbnRTdGFjayh7IGluaXRpYWxDb3VudHJ5ID0gJ2luJyB9KSB7XG4gIGNvbnN0IFtjYywgc2V0Q2NdID0gdXNlU3RhdGUoaW5pdGlhbENvdW50cnkpO1xuICBjb25zdCBbcSwgc2V0UV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IGFsbG93ZWQgPSBtZXRob2RzRm9yKGNjKS5tYXAoKG0pID0+IG0uaWQpO1xuICBjb25zdCBjdXJyZW50ID0gQ09WRVJBR0UuZmluZCgoYykgPT4gYy5jb2RlID09PSBjYyk7XG4gIGNvbnN0IHQgPSBxLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicGF5c3RhY2sgcHM0XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBzLXBpY2tlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBzcC1ub3dcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwc3AtZmxhZ1wiPjxGbGFnIGNvZGU9e2NjfSBuYW1lPXtjdXJyZW50Py5uYW1lfSBzaXplPXs0NH0gLz48L3NwYW4+XG4gICAgICAgICAgPHNwYW4+PHNtYWxsPlNob3cgcGF5b3V0IG9wdGlvbnMgZm9yPC9zbWFsbD48Yj57Y3VycmVudD8ubmFtZX08L2I+PGVtPnthbGxvd2VkLmxlbmd0aH0gcGF5b3V0IG9wdGlvbnthbGxvd2VkLmxlbmd0aCA+IDEgPyAncycgOiAnJ308L2VtPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJwc3Atc2VhcmNoXCI+PEljb24gbmFtZT1cInNlYXJjaFwiIHNpemU9ezE2fSAvPjxpbnB1dCB0eXBlPVwic2VhcmNoXCIgdmFsdWU9e3F9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0UShlLnRhcmdldC52YWx1ZSl9IHBsYWNlaG9sZGVyPXtgU2VhcmNoIG91ciAke0NPVkVSQUdFLmxlbmd0aH0gY291bnRyaWVzYH0gYXJpYS1sYWJlbD1cIlNlYXJjaCBjb3VudHJpZXNcIiAvPjwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHNwLXJlZ2lvbnNcIj5cbiAgICAgICAgICB7UkVHSU9OUy5tYXAoKHIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSByLmNvdW50cmllcy5maWx0ZXIoKFssIG5hbWVdKSA9PiAhdCB8fCBuYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModCkpO1xuICAgICAgICAgICAgaWYgKCFsaXN0Lmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17ci5pZH0gY2xhc3NOYW1lPVwicHNwLXJlZ1wiIHN0eWxlPXt7ICctLWMnOiByLmNvbG9yIH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBzcC1yblwiPntyLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICB7bGlzdC5tYXAoKFtjb2RlLCBuYW1lXSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT17Y29kZX0gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT17Y29kZSA9PT0gY2MgPyAnb24nIDogJyd9IG9uQ2xpY2s9eygpID0+IHNldENjKGNvZGUpfSBhcmlhLXByZXNzZWQ9e2NvZGUgPT09IGNjfSB0aXRsZT17bmFtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgPEZsYWcgY29kZT17Y29kZX0gbmFtZT17bmFtZX0gc2l6ZT17MTh9IC8+PHNwYW4+e25hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBzLXJpZ2h0XCI+XG4gICAgICAgIDxMaXZlWm9uZSBjbGFzc05hbWU9XCJwYXlzdGFjay1mYW5cIiBrZXk9e2NjfT5cbiAgICAgICAgICB7UEFZTUVOVF9NRVRIT0RTLm1hcCgobSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2sgPSBhbGxvd2VkLmluY2x1ZGVzKG0uaWQpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGFydGljbGUga2V5PXttLmlkfSBjbGFzc05hbWU9e2BwYXktY2FyZCBwYy0ke20uaWR9ICR7b2sgPyAnJyA6ICdpcy1vZmYnfWB9IHN0eWxlPXt7ICctLWknOiBpLCAnLS1jMSc6IG0uY29sb3IsICctLWMyJzogbS5hY2NlbnQgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYy1jaGlwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwYy1pY1wiPjxJY29uIG5hbWU9e01FVEhPRF9JQ09OW20uaWRdfSBzaXplPXsyNn0gLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgPGgzPnttLm5hbWV9PC9oMz5cbiAgICAgICAgICAgICAgICA8cD57bS5ibHVyYn08L3A+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicGMtc3RhdGVcIj57b2sgPyA8PjxJY29uIG5hbWU9XCJjaGVja1wiIHNpemU9ezEzfSBzdHJva2U9ezN9IC8+IEF2YWlsYWJsZTwvPiA6IG0uaWQgPT09ICd1cGknID8gJ0luZGlhIG9ubHknIDogJ05vdCBhdmFpbGFibGUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwYy1zaGluZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvTGl2ZVpvbmU+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInBheXN0YWNrLW5vdGVcIj5cbiAgICAgICAgICA8RmxhZyBjb2RlPXtjY30gc2l6ZT17MjB9IC8+IHthbGxvd2VkLmxlbmd0aH0gcGF5b3V0IG9wdGlvbnthbGxvd2VkLmxlbmd0aCA+IDEgPyAncycgOiAnJ30gYXZhaWxhYmxlIGluIHtjdXJyZW50Py5uYW1lfS4gVVBJIGlzIGFuIEluZGlhLW9ubHkgcGF5bWVudCBtZXRob2Q7IG1lbWJlcnMgaW4gZXZlcnkgb3RoZXIgY291bnRyeSBjaG9vc2UgUGF5UGFsLCBXaXJlIFRyYW5zZmVyLCBBbWF6b24gR2lmdCBDYXJkcyBvciBhIE1lZGljYWwgUmVwb3J0LlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuLyogLS0tLS0tLS0tLSBOb3RpZmljYXRpb24gcGhvbmUgLS0tLS0tLS0tLSAqL1xuY29uc3QgQ0hfSUNPTiA9IHsgZGFzaGJvYXJkOiAnZGFzaGJvYXJkJywgc21zOiAnc21zJywgd2hhdHNhcHA6ICd3aGF0c2FwcCcsIGVtYWlsOiAnbWFpbCcgfTtcbmNvbnN0IENIX01TRyA9IHtcbiAgZGFzaGJvYXJkOiBbJ05ldyBzdHVkeSBtYXRjaGVkIHRvIHlvdXIgcHJvZmlsZScsICdIZWFsdGggJiB3ZWxsbmVzcyBcdTAwQjcgfjEyIG1pbiddLFxuICBzbXM6IFsnTUhPOiBBIG5ldyBzdXJ2ZXkgaXMgd2FpdGluZyBmb3IgeW91JywgJ1RhcCB0byB2aWV3IHlvdXIgaW52aXRhdGlvbiddLFxuICB3aGF0c2FwcDogWydNeUhlYWx0aE9waW5pb25zJywgJ0hpISBBIHN0dWR5IHRoYXQgZml0cyB5b3VyIHByb2ZpbGUganVzdCBvcGVuZWQgXHVEODNDXHVERkFGJ10sXG4gIGVtYWlsOiBbJ1lvdXIgbmV4dCBzdXJ2ZXkgaW52aXRhdGlvbicsICdUb3BpYywgZXN0aW1hdGVkIHRpbWUgJiByZXdhcmQgaW5zaWRlJ10sXG59O1xuZXhwb3J0IGZ1bmN0aW9uIFN0ZXBzUGF0aCh7IHN0ZXBzIH0pIHtcbiAgY29uc3QgW3JlZiwgaW5WaWV3XSA9IHVzZUluVmlldyh7IHRocmVzaG9sZDogMC4yIH0pO1xuICByZXR1cm4gKFxuICAgIDxkaXYgcmVmPXtyZWZ9IGNsYXNzTmFtZT17YHN0ZXBzLXBhdGggJHtpblZpZXcgPyAnaXMtaW4nIDogJyd9YH0+XG4gICAgICA8c3ZnIGNsYXNzTmFtZT1cInNwLWxpbmVcIiB2aWV3Qm94PVwiMCAwIDEwMDAgMjAwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPHBhdGggZD1cIk0yMCAxNTAgQyAxODAgMjAsIDMyMCAyMCwgMzgwIDEwMCBTIDYwMCAxOTAsIDY2MCAxMDAgUyA4NjAgMTAsIDk4MCA2MFwiIHBhdGhMZW5ndGg9XCIxMDBcIiAvPlxuICAgICAgICA8Y2lyY2xlIHI9XCI5XCIgY2xhc3NOYW1lPVwic3AtcnVubmVyXCI+XG4gICAgICAgICAgPGFuaW1hdGVNb3Rpb24gZHVyPVwiN3NcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIiBwYXRoPVwiTTIwIDE1MCBDIDE4MCAyMCwgMzIwIDIwLCAzODAgMTAwIFMgNjAwIDE5MCwgNjYwIDEwMCBTIDg2MCAxMCwgOTgwIDYwXCIgLz5cbiAgICAgICAgPC9jaXJjbGU+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxvbD5cbiAgICAgICAge3N0ZXBzLm1hcCgocywgaSkgPT4gKFxuICAgICAgICAgIDxsaSBrZXk9e3MudGl0bGV9IHN0eWxlPXt7ICctLWknOiBpLCAnLS1jJzogcy5jb2xvciB9fT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNwLW51bVwiPntTdHJpbmcoaSArIDEpLnBhZFN0YXJ0KDIsICcwJyl9PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3AtaWNcIj48SWNvbiBuYW1lPXtzLmljb259IHNpemU9ezI2fSAvPjwvc3Bhbj5cbiAgICAgICAgICAgIDxoMz57cy50aXRsZX08L2gzPlxuICAgICAgICAgICAgPHA+e3MudGV4dH08L3A+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L29sPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJpdmFjeVNlYWwoKSB7XG4gIHJldHVybiAoXG4gICAgPFJldmVhbCBjbGFzc05hbWU9XCJwcml2YWN5LXNlYWxcIiBlZmZlY3Q9XCJ6b29tXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBzLXJpbmdcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDIwMCAyMDBcIj5cbiAgICAgICAgICA8ZGVmcz48cGF0aCBpZD1cInBzLWNpcmNsZVwiIGQ9XCJNMTAwIDEwMCBtLTc4IDAgYTc4IDc4IDAgMSAxIDE1NiAwIGE3OCA3OCAwIDEgMSAtMTU2IDBcIiAvPjwvZGVmcz5cbiAgICAgICAgICA8dGV4dD48dGV4dFBhdGggaHJlZj1cIiNwcy1jaXJjbGVcIj5ZT1VSIERBVEEgU1RBWVMgWU9VUlMgXHUyMDIyIE5FVkVSIFNPTEQgXHUyMDIyIE5FVkVSIFNIQVJFRCBcdTIwMjIgPC90ZXh0UGF0aD48L3RleHQ+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBzLWNvcmVcIj48SWNvbiBuYW1lPVwibG9ja1wiIHNpemU9ezM0fSAvPjwvZGl2PlxuICAgIDwvUmV2ZWFsPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsbUJBQW9DO0FBYTlCO0FBTEMsU0FBUyxrQkFBa0I7QUFDaEMsUUFBTSxDQUFDLEtBQUssTUFBTSxJQUFJLFVBQVUsRUFBRSxXQUFXLElBQUksQ0FBQztBQUNsRCxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksdUJBQVMsS0FBSztBQUN4QyxTQUNFLDZDQUFDLFNBQUksS0FBVSxXQUFXLFlBQVksU0FBUyxVQUFVLEVBQUUsSUFDekQ7QUFBQSxpREFBQyxTQUFJLFdBQVUsZUFBYyxNQUFLLFdBQVUsY0FBVywwQkFDckQ7QUFBQSxrREFBQyxZQUFPLE1BQUssT0FBTSxpQkFBZSxVQUFVLE9BQU8sV0FBVyxVQUFVLFFBQVEsT0FBTyxJQUFJLFNBQVMsTUFBTSxT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
