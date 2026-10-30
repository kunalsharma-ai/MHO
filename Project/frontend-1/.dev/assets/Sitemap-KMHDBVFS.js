import {
  PAGES
} from "/assets/chunk-VMMOAE2N.js";
import {
  BLOGS,
  BLOG_CATEGORIES
} from "/assets/chunk-P5UFEUM5.js";
import {
  DocHeroArt
} from "/assets/chunk-2PZ7UZDW.js";
import "/assets/chunk-GTWO7VGT.js";
import "/assets/chunk-53J6YGE2.js";
import {
  PageHero
} from "/assets/chunk-NVJYUHG3.js";
import {
  Icon,
  Link,
  require_jsx_runtime
} from "/assets/chunk-LANM2SZF.js";
import "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/Sitemap.jsx
init_define_import_meta_env();
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var GROUPS = [
  ["Explore", ["/", "/about-us", "/how-it-works", "/rewards", "/trust-safety", "/reviews"]],
  ["Who it\u2019s for", ["/healthcare-professionals", "/caregivers", "/patients", "/earn"]],
  ["Help", ["/faq", "/contact", "/join", "/login"]],
  ["Legal", ["/privacy", "/cookies", "/terms", "/gdpr", "/profiling"]]
];
function Sitemap() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      PageHero,
      {
        theme: "legal",
        eyebrow: "Sitemap",
        title: ["Every page,", { t: "one place", hl: "grad" }],
        lead: "Browse every MyHealthOpinions page and all of our guides to paid surveys, earning online and healthcare research.",
        art: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocHeroArt, { icon: "list" }),
        crumbs: [{ to: "/", label: "Home" }, { label: "Sitemap" }]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "section sitemap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "container sm-grid", children: GROUPS.map(([t, paths]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "sm-col", "aria-label": t, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: paths.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: p, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 13 }),
          PAGES[p].name
        ] }) }, p)) })
      ] }, t)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "sm-blog-title", children: "Blogs & guides" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sm-blog", children: BLOG_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { "aria-label": c, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: c }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: BLOGS.filter((b) => b.category === c).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: `/blog/${b.slug}`, children: b.title }) }, b.slug)) })
        ] }, c)) })
      ] })
    ] })
  ] });
}
export {
  Sitemap as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL1NpdGVtYXAuanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBIdW1hbi1yZWFkYWJsZSBzaXRlbWFwIChoZWxwcyB2aXNpdG9ycyBhbmQgY3Jhd2xlcnMgZmluZCBldmVyeSBwYWdlKS5cbmltcG9ydCBQYWdlSGVybyBmcm9tICcuLi9jb21wb25lbnRzL1BhZ2VIZXJvLmpzeCc7XG5pbXBvcnQgeyBEb2NIZXJvQXJ0IH0gZnJvbSAnLi4vY29tcG9uZW50cy9IZXJvQXJ0LmpzeCc7XG5pbXBvcnQgSWNvbiBmcm9tICcuLi9jb21wb25lbnRzL0ljb24uanN4JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICcuLi9yb3V0ZXIuanN4JztcbmltcG9ydCB7IFBBR0VTIH0gZnJvbSAnLi4vc2VvL3BhZ2VzLmpzJztcbmltcG9ydCB7IEJMT0dTLCBCTE9HX0NBVEVHT1JJRVMgfSBmcm9tICcuLi9kYXRhL2Jsb2dzL2luZGV4LmpzJztcblxuY29uc3QgR1JPVVBTID0gW1xuICBbJ0V4cGxvcmUnLCBbJy8nLCAnL2Fib3V0LXVzJywgJy9ob3ctaXQtd29ya3MnLCAnL3Jld2FyZHMnLCAnL3RydXN0LXNhZmV0eScsICcvcmV2aWV3cyddXSxcbiAgWydXaG8gaXRcdTIwMTlzIGZvcicsIFsnL2hlYWx0aGNhcmUtcHJvZmVzc2lvbmFscycsICcvY2FyZWdpdmVycycsICcvcGF0aWVudHMnLCAnL2Vhcm4nXV0sXG4gIFsnSGVscCcsIFsnL2ZhcScsICcvY29udGFjdCcsICcvam9pbicsICcvbG9naW4nXV0sXG4gIFsnTGVnYWwnLCBbJy9wcml2YWN5JywgJy9jb29raWVzJywgJy90ZXJtcycsICcvZ2RwcicsICcvcHJvZmlsaW5nJ11dLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2l0ZW1hcCgpIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFBhZ2VIZXJvXG4gICAgICAgIHRoZW1lPVwibGVnYWxcIlxuICAgICAgICBleWVicm93PVwiU2l0ZW1hcFwiXG4gICAgICAgIHRpdGxlPXtbJ0V2ZXJ5IHBhZ2UsJywgeyB0OiAnb25lIHBsYWNlJywgaGw6ICdncmFkJyB9XX1cbiAgICAgICAgbGVhZD1cIkJyb3dzZSBldmVyeSBNeUhlYWx0aE9waW5pb25zIHBhZ2UgYW5kIGFsbCBvZiBvdXIgZ3VpZGVzIHRvIHBhaWQgc3VydmV5cywgZWFybmluZyBvbmxpbmUgYW5kIGhlYWx0aGNhcmUgcmVzZWFyY2guXCJcbiAgICAgICAgYXJ0PXs8RG9jSGVyb0FydCBpY29uPVwibGlzdFwiIC8+fVxuICAgICAgICBjcnVtYnM9e1t7IHRvOiAnLycsIGxhYmVsOiAnSG9tZScgfSwgeyBsYWJlbDogJ1NpdGVtYXAnIH1dfVxuICAgICAgLz5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gc2l0ZW1hcFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBzbS1ncmlkXCI+XG4gICAgICAgICAge0dST1VQUy5tYXAoKFt0LCBwYXRoc10pID0+IChcbiAgICAgICAgICAgIDxuYXYga2V5PXt0fSBjbGFzc05hbWU9XCJzbS1jb2xcIiBhcmlhLWxhYmVsPXt0fT5cbiAgICAgICAgICAgICAgPGgyPnt0fTwvaDI+XG4gICAgICAgICAgICAgIDx1bD57cGF0aHMubWFwKChwKSA9PiA8bGkga2V5PXtwfT48TGluayB0bz17cH0+PEljb24gbmFtZT1cImFycm93XCIgc2l6ZT17MTN9IC8+e1BBR0VTW3BdLm5hbWV9PC9MaW5rPjwvbGk+KX08L3VsPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJzbS1ibG9nLXRpdGxlXCI+QmxvZ3MgJiBndWlkZXM8L2gyPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic20tYmxvZ1wiPlxuICAgICAgICAgICAge0JMT0dfQ0FURUdPUklFUy5tYXAoKGMpID0+IChcbiAgICAgICAgICAgICAgPG5hdiBrZXk9e2N9IGFyaWEtbGFiZWw9e2N9PlxuICAgICAgICAgICAgICAgIDxoMz57Y308L2gzPlxuICAgICAgICAgICAgICAgIDx1bD57QkxPR1MuZmlsdGVyKChiKSA9PiBiLmNhdGVnb3J5ID09PSBjKS5tYXAoKGIpID0+IDxsaSBrZXk9e2Iuc2x1Z30+PExpbmsgdG89e2AvYmxvZy8ke2Iuc2x1Z31gfT57Yi50aXRsZX08L0xpbms+PC9saT4pfTwvdWw+XG4gICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFpQkk7QUFUSixJQUFNLFNBQVM7QUFBQSxFQUNiLENBQUMsV0FBVyxDQUFDLEtBQUssYUFBYSxpQkFBaUIsWUFBWSxpQkFBaUIsVUFBVSxDQUFDO0FBQUEsRUFDeEYsQ0FBQyxxQkFBZ0IsQ0FBQyw2QkFBNkIsZUFBZSxhQUFhLE9BQU8sQ0FBQztBQUFBLEVBQ25GLENBQUMsUUFBUSxDQUFDLFFBQVEsWUFBWSxTQUFTLFFBQVEsQ0FBQztBQUFBLEVBQ2hELENBQUMsU0FBUyxDQUFDLFlBQVksWUFBWSxVQUFVLFNBQVMsWUFBWSxDQUFDO0FBQ3JFO0FBRWUsU0FBUixVQUEyQjtBQUNoQyxTQUNFLDRFQUNFO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLFNBQVE7QUFBQSxRQUNSLE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxhQUFhLElBQUksT0FBTyxDQUFDO0FBQUEsUUFDckQsTUFBSztBQUFBLFFBQ0wsS0FBSyw0Q0FBQyxjQUFXLE1BQUssUUFBTztBQUFBLFFBQzdCLFFBQVEsQ0FBQyxFQUFFLElBQUksS0FBSyxPQUFPLE9BQU8sR0FBRyxFQUFFLE9BQU8sVUFBVSxDQUFDO0FBQUE7QUFBQSxJQUMzRDtBQUFBLElBQ0EsNkNBQUMsYUFBUSxXQUFVLG1CQUNqQjtBQUFBLGtEQUFDLFNBQUksV0FBVSxxQkFDWixpQkFBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssTUFDcEIsNkNBQUMsU0FBWSxXQUFVLFVBQVMsY0FBWSxHQUMxQztBQUFBLG9EQUFDLFFBQUksYUFBRTtBQUFBLFFBQ1AsNENBQUMsUUFBSSxnQkFBTSxJQUFJLENBQUMsTUFBTSw0Q0FBQyxRQUFXLHVEQUFDLFFBQUssSUFBSSxHQUFHO0FBQUEsc0RBQUMsUUFBSyxNQUFLLFNBQVEsTUFBTSxJQUFJO0FBQUEsVUFBRyxNQUFNLENBQUMsRUFBRTtBQUFBLFdBQUssS0FBOUQsQ0FBcUUsQ0FBSyxHQUFFO0FBQUEsV0FGbkcsQ0FHVixDQUNELEdBQ0g7QUFBQSxNQUNBLDZDQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsb0RBQUMsUUFBRyxXQUFVLGlCQUFnQiw0QkFBYztBQUFBLFFBQzVDLDRDQUFDLFNBQUksV0FBVSxXQUNaLDBCQUFnQixJQUFJLENBQUMsTUFDcEIsNkNBQUMsU0FBWSxjQUFZLEdBQ3ZCO0FBQUEsc0RBQUMsUUFBSSxhQUFFO0FBQUEsVUFDUCw0Q0FBQyxRQUFJLGdCQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sNENBQUMsUUFBZ0Isc0RBQUMsUUFBSyxJQUFJLFNBQVMsRUFBRSxJQUFJLElBQUssWUFBRSxPQUFNLEtBQTlDLEVBQUUsSUFBbUQsQ0FBSyxHQUFFO0FBQUEsYUFGbkgsQ0FHVixDQUNELEdBQ0g7QUFBQSxTQUNGO0FBQUEsT0FDRjtBQUFBLEtBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFtdCn0K
