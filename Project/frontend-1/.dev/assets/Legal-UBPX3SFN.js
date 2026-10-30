import {
  openCookieSettings
} from "/assets/chunk-JXAGRSKL.js";
import {
  PAGES
} from "/assets/chunk-VMMOAE2N.js";
import {
  LEGAL
} from "/assets/chunk-WS5FDS7I.js";
import "/assets/chunk-NOWM46SW.js";
import "/assets/chunk-JWSEDBGW.js";
import {
  LegalArt
} from "/assets/chunk-2PZ7UZDW.js";
import "/assets/chunk-GTWO7VGT.js";
import "/assets/chunk-53J6YGE2.js";
import {
  PageHero
} from "/assets/chunk-NVJYUHG3.js";
import {
  Icon,
  Link,
  Reveal,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/Legal.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var fmt = (d) => (/* @__PURE__ */ new Date(d + "T00:00:00Z")).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
var OTHER = ["/privacy", "/terms", "/gdpr", "/cookies", "/profiling"];
function Legal({ path }) {
  const doc = LEGAL[path] || LEGAL["/privacy"];
  const [active, setActive] = (0, import_react.useState)(doc.sections[0].id);
  (0, import_react.useEffect)(() => {
    const els = doc.sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-25% 0px -65% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [doc]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      PageHero,
      {
        theme: `legal ${doc.theme}`,
        eyebrow: doc.eyebrow,
        eyebrowColor: "#3d5afe",
        title: doc.title,
        lead: doc.lead,
        art: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalArt, { path }),
        crumbs: [{ to: "/", label: "Home" }, { label: PAGES[path]?.name || doc.eyebrow }],
        badges: [`Last updated ${fmt(doc.updated)}`]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section legal-glance", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "container glance-grid", children: doc.glance.map(([ic, t, d], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { className: "glance keycap", delay: i * 80, style: { "--c": ["#2457f5", "#00a88a", "#ef2d56", "#8a4dff", "#ff6a2c"][i % 5] }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 22 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: d })
    ] }, t)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section legal-body", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container legal-layout", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "toc legal-toc", "aria-label": "Contents", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Contents" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: doc.sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: active === s.id ? "on" : "", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: `#${s.id}`, onClick: (e) => {
          e.preventDefault();
          document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
        }, children: s.title }) }, s.id)) }),
        path === "/cookies" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-primary btn-sm", onClick: openCookieSettings, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: "Cookie settings" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "legal-sections", children: [
        doc.sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { id: s.id, className: "legal-sec", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ls-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: s.icon, size: 18 }) }),
            s.title
          ] }),
          s.p?.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, i)),
          s.list && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: s.list.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l }, l)) })
        ] }, s.id)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "legal-more", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Related policies" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: OTHER.filter((o) => o !== path).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: o, children: PAGES[o].name }, o)) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Legal as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL0xlZ2FsLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gU2hhcmVkIGxheW91dCBmb3IgUHJpdmFjeSwgVGVybXMsIEdEUFIgYW5kIENvb2tpZSBwYWdlczogXCJhdCBhIGdsYW5jZVwiIGNhcmRzLCBzdGlja3kgY29udGVudHMsIHNlY3Rpb25zLlxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQYWdlSGVybyBmcm9tICcuLi9jb21wb25lbnRzL1BhZ2VIZXJvLmpzeCc7XG5pbXBvcnQgeyBMZWdhbEFydCB9IGZyb20gJy4uL2NvbXBvbmVudHMvSGVyb0FydC5qc3gnO1xuaW1wb3J0IHsgUmV2ZWFsIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS5qc3gnO1xuaW1wb3J0IEljb24gZnJvbSAnLi4vY29tcG9uZW50cy9JY29uLmpzeCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAnLi4vcm91dGVyLmpzeCc7XG5pbXBvcnQgeyBMRUdBTCB9IGZyb20gJy4uL2RhdGEvbGVnYWwuanMnO1xuaW1wb3J0IHsgUEFHRVMgfSBmcm9tICcuLi9zZW8vcGFnZXMuanMnO1xuaW1wb3J0IHsgb3BlbkNvb2tpZVNldHRpbmdzIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Db29raWVCYW5uZXIuanN4JztcblxuY29uc3QgZm10ID0gKGQpID0+IG5ldyBEYXRlKGQgKyAnVDAwOjAwOjAwWicpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCB5ZWFyOiAnbnVtZXJpYycsIHRpbWVab25lOiAnVVRDJyB9KTtcbmNvbnN0IE9USEVSID0gWycvcHJpdmFjeScsICcvdGVybXMnLCAnL2dkcHInLCAnL2Nvb2tpZXMnLCAnL3Byb2ZpbGluZyddO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMZWdhbCh7IHBhdGggfSkge1xuICBjb25zdCBkb2MgPSBMRUdBTFtwYXRoXSB8fCBMRUdBTFsnL3ByaXZhY3knXTtcbiAgY29uc3QgW2FjdGl2ZSwgc2V0QWN0aXZlXSA9IHVzZVN0YXRlKGRvYy5zZWN0aW9uc1swXS5pZCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlbHMgPSBkb2Muc2VjdGlvbnMubWFwKChzKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzLmlkKSkuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmICh0eXBlb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgY29uc3QgaW8gPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVzKSA9PiBlcy5mb3JFYWNoKChlKSA9PiBlLmlzSW50ZXJzZWN0aW5nICYmIHNldEFjdGl2ZShlLnRhcmdldC5pZCkpLCB7IHJvb3RNYXJnaW46ICctMjUlIDBweCAtNjUlIDBweCcgfSk7XG4gICAgZWxzLmZvckVhY2goKGVsKSA9PiBpby5vYnNlcnZlKGVsKSk7XG4gICAgcmV0dXJuICgpID0+IGlvLmRpc2Nvbm5lY3QoKTtcbiAgfSwgW2RvY10pO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxQYWdlSGVyb1xuICAgICAgICB0aGVtZT17YGxlZ2FsICR7ZG9jLnRoZW1lfWB9XG4gICAgICAgIGV5ZWJyb3c9e2RvYy5leWVicm93fVxuICAgICAgICBleWVicm93Q29sb3I9XCIjM2Q1YWZlXCJcbiAgICAgICAgdGl0bGU9e2RvYy50aXRsZX1cbiAgICAgICAgbGVhZD17ZG9jLmxlYWR9XG4gICAgICAgIGFydD17PExlZ2FsQXJ0IHBhdGg9e3BhdGh9IC8+fVxuICAgICAgICBjcnVtYnM9e1t7IHRvOiAnLycsIGxhYmVsOiAnSG9tZScgfSwgeyBsYWJlbDogUEFHRVNbcGF0aF0/Lm5hbWUgfHwgZG9jLmV5ZWJyb3cgfV19XG4gICAgICAgIGJhZGdlcz17W2BMYXN0IHVwZGF0ZWQgJHtmbXQoZG9jLnVwZGF0ZWQpfWBdfVxuICAgICAgLz5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBsZWdhbC1nbGFuY2VcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgZ2xhbmNlLWdyaWRcIj5cbiAgICAgICAgICB7ZG9jLmdsYW5jZS5tYXAoKFtpYywgdCwgZF0sIGkpID0+IChcbiAgICAgICAgICAgIDxSZXZlYWwga2V5PXt0fSBjbGFzc05hbWU9XCJnbGFuY2Uga2V5Y2FwXCIgZGVsYXk9e2kgKiA4MH0gc3R5bGU9e3sgJy0tYyc6IFsnIzI0NTdmNScsICcjMDBhODhhJywgJyNlZjJkNTYnLCAnIzhhNGRmZicsICcjZmY2YTJjJ11baSAlIDVdIH19PlxuICAgICAgICAgICAgICA8c3Bhbj48SWNvbiBuYW1lPXtpY30gc2l6ZT17MjJ9IC8+PC9zcGFuPlxuICAgICAgICAgICAgICA8Yj57dH08L2I+XG4gICAgICAgICAgICAgIDxzbWFsbD57ZH08L3NtYWxsPlxuICAgICAgICAgICAgPC9SZXZlYWw+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIGxlZ2FsLWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbGVnYWwtbGF5b3V0XCI+XG4gICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJ0b2MgbGVnYWwtdG9jXCIgYXJpYS1sYWJlbD1cIkNvbnRlbnRzXCI+XG4gICAgICAgICAgICA8Yj5Db250ZW50czwvYj5cbiAgICAgICAgICAgIDxvbD5cbiAgICAgICAgICAgICAge2RvYy5zZWN0aW9ucy5tYXAoKHMpID0+IChcbiAgICAgICAgICAgICAgICA8bGkga2V5PXtzLmlkfSBjbGFzc05hbWU9e2FjdGl2ZSA9PT0gcy5pZCA/ICdvbicgOiAnJ30+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPXtgIyR7cy5pZH1gfSBvbkNsaWNrPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHMuaWQpPy5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTsgfX0+e3MudGl0bGV9PC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9vbD5cbiAgICAgICAgICAgIHtwYXRoID09PSAnL2Nvb2tpZXMnICYmIChcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtXCIgb25DbGljaz17b3BlbkNvb2tpZVNldHRpbmdzfT48c3BhbiBjbGFzc05hbWU9XCJidG4tbGFiZWxcIj5Db29raWUgc2V0dGluZ3M8L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGVnYWwtc2VjdGlvbnNcIj5cbiAgICAgICAgICAgIHtkb2Muc2VjdGlvbnMubWFwKChzKSA9PiAoXG4gICAgICAgICAgICAgIDxzZWN0aW9uIGtleT17cy5pZH0gaWQ9e3MuaWR9IGNsYXNzTmFtZT1cImxlZ2FsLXNlY1wiPlxuICAgICAgICAgICAgICAgIDxoMj48c3BhbiBjbGFzc05hbWU9XCJscy1pY1wiPjxJY29uIG5hbWU9e3MuaWNvbn0gc2l6ZT17MTh9IC8+PC9zcGFuPntzLnRpdGxlfTwvaDI+XG4gICAgICAgICAgICAgICAge3MucD8ubWFwKChwLCBpKSA9PiA8cCBrZXk9e2l9PntwfTwvcD4pfVxuICAgICAgICAgICAgICAgIHtzLmxpc3QgJiYgPHVsPntzLmxpc3QubWFwKChsKSA9PiA8bGkga2V5PXtsfT57bH08L2xpPil9PC91bD59XG4gICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWdhbC1tb3JlXCI+XG4gICAgICAgICAgICAgIDxiPlJlbGF0ZWQgcG9saWNpZXM8L2I+XG4gICAgICAgICAgICAgIDxkaXY+e09USEVSLmZpbHRlcigobykgPT4gbyAhPT0gcGF0aCkubWFwKChvKSA9PiA8TGluayBrZXk9e299IHRvPXtvfT57UEFHRVNbb10ubmFtZX08L0xpbms+KX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICA8Lz5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsbUJBQW9DO0FBMEJoQztBQWhCSixJQUFNLE1BQU0sQ0FBQyxPQUFNLG9CQUFJLEtBQUssSUFBSSxZQUFZLEdBQUUsbUJBQW1CLFNBQVMsRUFBRSxLQUFLLFdBQVcsT0FBTyxRQUFRLE1BQU0sV0FBVyxVQUFVLE1BQU0sQ0FBQztBQUM3SSxJQUFNLFFBQVEsQ0FBQyxZQUFZLFVBQVUsU0FBUyxZQUFZLFlBQVk7QUFFdkQsU0FBUixNQUF1QixFQUFFLEtBQUssR0FBRztBQUN0QyxRQUFNLE1BQU0sTUFBTSxJQUFJLEtBQUssTUFBTSxVQUFVO0FBQzNDLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx1QkFBUyxJQUFJLFNBQVMsQ0FBQyxFQUFFLEVBQUU7QUFFdkQsOEJBQVUsTUFBTTtBQUNkLFVBQU0sTUFBTSxJQUFJLFNBQVMsSUFBSSxDQUFDLE1BQU0sU0FBUyxlQUFlLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxPQUFPO0FBQ2pGLFFBQUksT0FBTyx5QkFBeUIsWUFBYTtBQUNqRCxVQUFNLEtBQUssSUFBSSxxQkFBcUIsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxZQUFZLG9CQUFvQixDQUFDO0FBQzlJLFFBQUksUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLEVBQUUsQ0FBQztBQUNsQyxXQUFP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
