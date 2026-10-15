import {
  Icon,
  Link,
  LiveZone,
  require_jsx_runtime
} from "/assets/chunk-LANM2SZF.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/NotFound.jsx
init_define_import_meta_env();
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var LINKS = [
  ["/", "home", "Home"],
  ["/earn", "coins", "Ways to earn"],
  ["/how-it-works", "pulse", "How it works"],
  ["/blog", "book", "Blogs & guides"],
  ["/faq", "info", "FAQ"],
  ["/contact", "chat", "Contact"]
];
function NotFound() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "nf", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container nf-inner", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "nf-monitor", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 600 140", preserveAspectRatio: "none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "nf-line", d: "M0 80 H120 l14 -40 18 80 16 -60 12 20 H300 H600", pathLength: "100" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nf-code", children: "404" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "This page has no pulse" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The link may be old or mistyped. Pick a destination and we'll get your heart racing again." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "nf-links", children: LINKS.map(([to, ic, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 18 }),
      l
    ] }) }, to)) })
  ] }) });
}

export {
  NotFound
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL05vdEZvdW5kLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gNDA0IFx1MjAxNCB0aGUgaGVhcnRiZWF0IFwiZmxhdGxpbmVzXCIsIHRoZW4gcmVjb3ZlcnMgd2hlbiB5b3UgcGljayBhIGRlc3RpbmF0aW9uLlxuaW1wb3J0IEljb24gZnJvbSAnLi4vY29tcG9uZW50cy9JY29uLmpzeCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAnLi4vcm91dGVyLmpzeCc7XG5pbXBvcnQgeyBMaXZlWm9uZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkuanN4JztcblxuY29uc3QgTElOS1MgPSBbXG4gIFsnLycsICdob21lJywgJ0hvbWUnXSwgWycvZWFybicsICdjb2lucycsICdXYXlzIHRvIGVhcm4nXSwgWycvaG93LWl0LXdvcmtzJywgJ3B1bHNlJywgJ0hvdyBpdCB3b3JrcyddLFxuICBbJy9ibG9nJywgJ2Jvb2snLCAnQmxvZ3MgJiBndWlkZXMnXSwgWycvZmFxJywgJ2luZm8nLCAnRkFRJ10sIFsnL2NvbnRhY3QnLCAnY2hhdCcsICdDb250YWN0J10sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOb3RGb3VuZCgpIHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJuZlwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbmYtaW5uZXJcIj5cbiAgICAgICAgPExpdmVab25lIGNsYXNzTmFtZT1cIm5mLW1vbml0b3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgNjAwIDE0MFwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCI+XG4gICAgICAgICAgICA8cGF0aCBjbGFzc05hbWU9XCJuZi1saW5lXCIgZD1cIk0wIDgwIEgxMjAgbDE0IC00MCAxOCA4MCAxNiAtNjAgMTIgMjAgSDMwMCBINjAwXCIgcGF0aExlbmd0aD1cIjEwMFwiIC8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmYtY29kZVwiPjQwNDwvc3Bhbj5cbiAgICAgICAgPC9MaXZlWm9uZT5cbiAgICAgICAgPGgxPlRoaXMgcGFnZSBoYXMgbm8gcHVsc2U8L2gxPlxuICAgICAgICA8cD5UaGUgbGluayBtYXkgYmUgb2xkIG9yIG1pc3R5cGVkLiBQaWNrIGEgZGVzdGluYXRpb24gYW5kIHdlJ2xsIGdldCB5b3VyIGhlYXJ0IHJhY2luZyBhZ2Fpbi48L3A+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJuZi1saW5rc1wiPlxuICAgICAgICAgIHtMSU5LUy5tYXAoKFt0bywgaWMsIGxdKSA9PiA8bGkga2V5PXt0b30+PExpbmsgdG89e3RvfT48SWNvbiBuYW1lPXtpY30gc2l6ZT17MTh9IC8+e2x9PC9MaW5rPjwvbGk+KX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7OztBQUFBO0FBY1E7QUFUUixJQUFNLFFBQVE7QUFBQSxFQUNaLENBQUMsS0FBSyxRQUFRLE1BQU07QUFBQSxFQUFHLENBQUMsU0FBUyxTQUFTLGNBQWM7QUFBQSxFQUFHLENBQUMsaUJBQWlCLFNBQVMsY0FBYztBQUFBLEVBQ3BHLENBQUMsU0FBUyxRQUFRLGdCQUFnQjtBQUFBLEVBQUcsQ0FBQyxRQUFRLFFBQVEsS0FBSztBQUFBLEVBQUcsQ0FBQyxZQUFZLFFBQVEsU0FBUztBQUM5RjtBQUVlLFNBQVIsV0FBNEI7QUFDakMsU0FDRSw0Q0FBQyxhQUFRLFdBQVUsTUFDakIsdURBQUMsU0FBSSxXQUFVLHNCQUNiO0FBQUEsaURBQUMsWUFBUyxXQUFVLGNBQWEsZUFBWSxRQUMzQztBQUFBLGtEQUFDLFNBQUksU0FBUSxlQUFjLHFCQUFvQixRQUM3QyxzREFBQyxVQUFLLFdBQVUsV0FBVSxHQUFFLG1EQUFrRCxZQUFXLE9BQU0sR0FDakc7QUFBQSxNQUNBLDRDQUFDLFVBQUssV0FBVSxXQUFVLGlCQUFHO0FBQUEsT0FDL0I7QUFBQSxJQUNBLDRDQUFDLFFBQUcsb0NBQXNCO0FBQUEsSUFDMUIsNENBQUMsT0FBRSx3R0FBMEY7QUFBQSxJQUM3Riw0Q0FBQyxRQUFHLFdBQVUsWUFDWCxnQkFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLDRDQUFDLFFBQVksdURBQUMsUUFBSyxJQUFRO0FBQUEsa0RBQUMsUUFBSyxNQUFNLElBQUksTUFBTSxJQUFJO0FBQUEsTUFBRztBQUFBLE9BQUUsS0FBakQsRUFBd0QsQ0FBSyxHQUNwRztBQUFBLEtBQ0YsR0FDRjtBQUVKOyIsCiAgIm5hbWVzIjogW10KfQo=
