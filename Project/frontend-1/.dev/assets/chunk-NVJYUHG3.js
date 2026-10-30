import {
  Breadcrumbs,
  Button,
  Eyebrow,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/components/PageHero.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function Title({ parts, as: Tag = "h1" }) {
  let w = 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "hero-title", children: parts.map((p, i) => {
    const text = typeof p === "string" ? p : p.t;
    const hl = typeof p === "string" ? "" : p.hl;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
      i > 0 && " ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: hl ? `hl hl-${hl}` : void 0, children: text.split(/(\s+)/).map(
        (word, k) => /^\s+$/.test(word) ? word : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hw", style: { "--w": w++ }, children: word }, k)
      ) })
    ] }, i);
  }) });
}
function PageHero({ eyebrow, eyebrowColor, title, lead, ctas = [], art, theme = "aurora", crumbs, children, className = "", badges }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: `page-hero theme-${theme} ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ph-bg", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container ph-inner", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ph-copy", children: [
        crumbs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: crumbs }),
        eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { color: eyebrowColor, children: eyebrow }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { parts: title }),
        lead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ph-lead", children: lead }),
        badges && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "ph-badges", children: badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: b }, b)) }),
        ctas.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ph-ctas", children: ctas.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { to: c.to, variant: c.variant || "primary", icon: c.icon === void 0 ? "arrow" : c.icon, children: c.label }, c.label)) }),
        children
      ] }),
      art && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ph-art", children: art })
    ] })
  ] });
}

export {
  Title,
  PageHero
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2NvbXBvbmVudHMvUGFnZUhlcm8uanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBQYWdlIGhlcm8gc2hlbGwuIEV2ZXJ5IHBhZ2UgcGFzc2VzIGl0cyBvd24gdGFnbGluZSwgYmFja2dyb3VuZCB0aGVtZSBhbmQgYW5pbWF0ZWQgYXJ0IHNvIGhlcm9lc1xuLy8gc2hhcmUgc3RydWN0dXJlIChjb25zaXN0ZW50IGJyYW5kKSB3aXRob3V0IGxvb2tpbmcgbGlrZSB0aGUgc2FtZSB0ZW1wbGF0ZS5cbi8vICAgdGl0bGU6IGFycmF5IG9mIHBhcnRzIFx1MjAxNCBcInBsYWluIHRleHRcIiBvciB7IHQ6ICd0ZXh0JywgaGw6ICdncmFkJyB8ICdtYXJrZXInIHwgJ291dGxpbmUnIHwgJ3dhcm0nIHwgJ21pbnQnIH1cbmltcG9ydCB7IEZyYWdtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYnMsIEV5ZWJyb3csIEJ1dHRvbiB9IGZyb20gJy4vdWkuanN4JztcblxuZnVuY3Rpb24gVGl0bGUoeyBwYXJ0cywgYXM6IFRhZyA9ICdoMScgfSkge1xuICBsZXQgdyA9IDA7XG4gIHJldHVybiAoXG4gICAgPFRhZyBjbGFzc05hbWU9XCJoZXJvLXRpdGxlXCI+XG4gICAgICB7cGFydHMubWFwKChwLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSB0eXBlb2YgcCA9PT0gJ3N0cmluZycgPyBwIDogcC50O1xuICAgICAgICBjb25zdCBobCA9IHR5cGVvZiBwID09PSAnc3RyaW5nJyA/ICcnIDogcC5obDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8RnJhZ21lbnQga2V5PXtpfT5cbiAgICAgICAgICB7aSA+IDAgJiYgJyAnfVxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aGwgPyBgaGwgaGwtJHtobH1gIDogdW5kZWZpbmVkfT5cbiAgICAgICAgICAgIHt0ZXh0LnNwbGl0KC8oXFxzKykvKS5tYXAoKHdvcmQsIGspID0+XG4gICAgICAgICAgICAgIC9eXFxzKyQvLnRlc3Qod29yZCkgPyB3b3JkIDogKFxuICAgICAgICAgICAgICAgIDxzcGFuIGtleT17a30gY2xhc3NOYW1lPVwiaHdcIiBzdHlsZT17eyAnLS13JzogdysrIH19Pnt3b3JkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvVGFnPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYWdlSGVybyh7IGV5ZWJyb3csIGV5ZWJyb3dDb2xvciwgdGl0bGUsIGxlYWQsIGN0YXMgPSBbXSwgYXJ0LCB0aGVtZSA9ICdhdXJvcmEnLCBjcnVtYnMsIGNoaWxkcmVuLCBjbGFzc05hbWUgPSAnJywgYmFkZ2VzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9e2BwYWdlLWhlcm8gdGhlbWUtJHt0aGVtZX0gJHtjbGFzc05hbWV9YH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBoLWJnXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PGkgLz48aSAvPjxpIC8+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBwaC1pbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBoLWNvcHlcIj5cbiAgICAgICAgICB7Y3J1bWJzICYmIDxCcmVhZGNydW1icyBpdGVtcz17Y3J1bWJzfSAvPn1cbiAgICAgICAgICB7ZXllYnJvdyAmJiA8RXllYnJvdyBjb2xvcj17ZXllYnJvd0NvbG9yfT57ZXllYnJvd308L0V5ZWJyb3c+fVxuICAgICAgICAgIDxUaXRsZSBwYXJ0cz17dGl0bGV9IC8+XG4gICAgICAgICAge2xlYWQgJiYgPHAgY2xhc3NOYW1lPVwicGgtbGVhZFwiPntsZWFkfTwvcD59XG4gICAgICAgICAge2JhZGdlcyAmJiA8dWwgY2xhc3NOYW1lPVwicGgtYmFkZ2VzXCI+e2JhZGdlcy5tYXAoKGIpID0+IDxsaSBrZXk9e2J9PntifTwvbGk+KX08L3VsPn1cbiAgICAgICAgICB7Y3Rhcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGgtY3Rhc1wiPlxuICAgICAgICAgICAgICB7Y3Rhcy5tYXAoKGMpID0+IChcbiAgICAgICAgICAgICAgICA8QnV0dG9uIGtleT17Yy5sYWJlbH0gdG89e2MudG99IHZhcmlhbnQ9e2MudmFyaWFudCB8fCAncHJpbWFyeSd9IGljb249e2MuaWNvbiA9PT0gdW5kZWZpbmVkID8gJ2Fycm93JyA6IGMuaWNvbn0+e2MubGFiZWx9PC9CdXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7YXJ0ICYmIDxkaXYgY2xhc3NOYW1lPVwicGgtYXJ0XCI+e2FydH08L2Rpdj59XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59XG5cbmV4cG9ydCB7IFRpdGxlIGFzIEhlcm9UaXRsZSB9O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7OztBQUFBO0FBR0EsbUJBQXlCO0FBV2Y7QUFSVixTQUFTLE1BQU0sRUFBRSxPQUFPLElBQUksTUFBTSxLQUFLLEdBQUc7QUFDeEMsTUFBSSxJQUFJO0FBQ1IsU0FDRSw0Q0FBQyxPQUFJLFdBQVUsY0FDWixnQkFBTSxJQUFJLENBQUMsR0FBRyxNQUFNO0FBQ25CLFVBQU0sT0FBTyxPQUFPLE1BQU0sV0FBVyxJQUFJLEVBQUU7QUFDM0MsVUFBTSxLQUFLLE9BQU8sTUFBTSxXQUFXLEtBQUssRUFBRTtBQUMxQyxXQUNFLDZDQUFDLHlCQUNBO0FBQUEsVUFBSSxLQUFLO0FBQUEsTUFDViw0Q0FBQyxVQUFLLFdBQVcsS0FBSyxTQUFTLEVBQUUsS0FBSyxRQUNuQyxlQUFLLE1BQU0sT0FBTyxFQUFFO0FBQUEsUUFBSSxDQUFDLE1BQU0sTUFDOUIsUUFBUSxLQUFLLElBQUksSUFBSSxPQUNuQiw0Q0FBQyxVQUFhLFdBQVUsTUFBSyxPQUFPLEVBQUUsT0FBTyxJQUFJLEdBQUksa0JBQTFDLENBQStDO0FBQUEsTUFFOUQsR0FDRjtBQUFBLFNBUmUsQ0FTZjtBQUFBLEVBRUosQ0FBQyxHQUNIO0FBRUo7QUFFZSxTQUFSLFNBQTBCLEVBQUUsU0FBUyxjQUFjLE9BQU8sTUFBTSxPQUFPLENBQUMsR0FBRyxLQUFLLFFBQVEsVUFBVSxRQUFRLFVBQVUsWUFBWSxJQUFJLE9BQU8sR0FBRztBQUNuSixTQUNFLDZDQUFDLGFBQVEsV0FBVyxtQkFBbUIsS0FBSyxJQUFJLFNBQVMsSUFDdkQ7QUFBQSxpREFBQyxTQUFJLFdBQVUsU0FBUSxlQUFZLFFBQU87QUFBQSxrREFBQyxPQUFFO0FBQUEsTUFBRSw0Q0FBQyxPQUFFO0FBQUEsTUFBRSw0Q0FBQyxPQUFFO0FBQUEsT0FBRTtBQUFBLElBQ3pELDZDQUFDLFNBQUksV0FBVSxzQkFDYjtBQUFBLG1EQUFDLFNBQUksV0FBVSxXQUNaO0FBQUEsa0JBQVUsNENBQUMsZUFBWSxPQUFPLFFBQVE7QUFBQSxRQUN0QyxXQUFXLDRDQUFDLFdBQVEsT0FBTyxjQUFlLG1CQUFRO0FBQUEsUUFDbkQsNENBQUMsU0FBTSxPQUFPLE9BQU87QUFBQSxRQUNwQixRQUFRLDRDQUFDLE9BQUUsV0FBVSxXQUFXLGdCQUFLO0FBQUEsUUFDckMsVUFBVSw0Q0FBQyxRQUFHLFdBQVUsYUFBYSxpQkFBTyxJQUFJLENBQUMsTUFBTSw0Q0FBQyxRQUFZLGVBQUosQ0FBTSxDQUFLLEdBQUU7QUFBQSxRQUM3RSxLQUFLLFNBQVMsS0FDYiw0Q0FBQyxTQUFJLFdBQVUsV0FDWixlQUFLLElBQUksQ0FBQyxNQUNULDRDQUFDLFVBQXFCLElBQUksRUFBRSxJQUFJLFNBQVMsRUFBRSxXQUFXLFdBQVcsTUFBTSxFQUFFLFNBQVMsU0FBWSxVQUFVLEVBQUUsTUFBTyxZQUFFLFNBQXRHLEVBQUUsS0FBMEcsQ0FDMUgsR0FDSDtBQUFBLFFBRUQ7QUFBQSxTQUNIO0FBQUEsTUFDQyxPQUFPLDRDQUFDLFNBQUksV0FBVSxVQUFVLGVBQUk7QUFBQSxPQUN2QztBQUFBLEtBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFtdCn0K
