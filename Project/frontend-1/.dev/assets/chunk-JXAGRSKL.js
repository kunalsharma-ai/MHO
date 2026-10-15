import {
  loadAnalytics,
  store
} from "/assets/chunk-NOWM46SW.js";
import {
  Icon,
  Link,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/components/CookieBanner.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var openCookieSettings = () => window.dispatchEvent(new Event("mho-cookie-settings"));
function CookieBanner() {
  const [show, setShow] = (0, import_react.useState)(false);
  const [analytics, setAnalytics] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const c = store.get("mho-consent");
    if (c) {
      setAnalytics(!!c.analytics);
      if (c.analytics) loadAnalytics();
    } else {
      const t = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);
  (0, import_react.useEffect)(() => {
    const open = () => setShow(true);
    window.addEventListener("mho-cookie-settings", open);
    return () => window.removeEventListener("mho-cookie-settings", open);
  }, []);
  const save = (a) => {
    store.set("mho-consent", { analytics: a, at: (/* @__PURE__ */ new Date()).toISOString() });
    setAnalytics(a);
    if (a) loadAnalytics();
    setShow(false);
  };
  if (!show) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cookie", role: "dialog", "aria-label": "Cookie preferences", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cookie-icon", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cookie", size: 26 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cookie-copy", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Cookies, the healthy kind" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        "Essential cookies keep you signed in and secure. With your permission we also use analytics cookies to improve the site. ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/cookies", children: "Cookie Policy" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "cookie-toggle", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: analytics, onChange: (e) => setAnalytics(e.target.checked) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" }),
        " Allow analytics cookies"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "cookie-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-ghost btn-sm", onClick: () => save(false), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: "Essential only" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-primary btn-sm", onClick: () => save(analytics || true), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: analytics ? "Save choices" : "Accept all" }) })
    ] })
  ] });
}

export {
  openCookieSettings,
  CookieBanner
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2NvbXBvbmVudHMvQ29va2llQmFubmVyLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29uc2VudCBiYW5uZXI6IGVzc2VudGlhbCBjb29raWVzIGFsd2F5cyBvbjsgYW5hbHl0aWNzIChHQTQpIG9ubHkgYWZ0ZXIgb3B0LWluLlxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICcuLi9yb3V0ZXIuanN4JztcbmltcG9ydCBJY29uIGZyb20gJy4vSWNvbi5qc3gnO1xuaW1wb3J0IHsgc3RvcmUsIGxvYWRBbmFseXRpY3MgfSBmcm9tICcuLi91dGlscy9oZWxwZXJzLmpzJztcblxuZXhwb3J0IGNvbnN0IG9wZW5Db29raWVTZXR0aW5ncyA9ICgpID0+IHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbWhvLWNvb2tpZS1zZXR0aW5ncycpKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29va2llQmFubmVyKCkge1xuICBjb25zdCBbc2hvdywgc2V0U2hvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthbmFseXRpY3MsIHNldEFuYWx5dGljc10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjID0gc3RvcmUuZ2V0KCdtaG8tY29uc2VudCcpO1xuICAgIGlmIChjKSB7XG4gICAgICBzZXRBbmFseXRpY3MoISFjLmFuYWx5dGljcyk7XG4gICAgICBpZiAoYy5hbmFseXRpY3MpIGxvYWRBbmFseXRpY3MoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdCA9IHNldFRpbWVvdXQoKCkgPT4gc2V0U2hvdyh0cnVlKSwgMjUwMCk7XG4gICAgICByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHQpO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb3BlbiA9ICgpID0+IHNldFNob3codHJ1ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21oby1jb29raWUtc2V0dGluZ3MnLCBvcGVuKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21oby1jb29raWUtc2V0dGluZ3MnLCBvcGVuKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNhdmUgPSAoYSkgPT4ge1xuICAgIHN0b3JlLnNldCgnbWhvLWNvbnNlbnQnLCB7IGFuYWx5dGljczogYSwgYXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSB9KTtcbiAgICBzZXRBbmFseXRpY3MoYSk7XG4gICAgaWYgKGEpIGxvYWRBbmFseXRpY3MoKTtcbiAgICBzZXRTaG93KGZhbHNlKTtcbiAgfTtcblxuICBpZiAoIXNob3cpIHJldHVybiBudWxsO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29va2llXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWw9XCJDb29raWUgcHJlZmVyZW5jZXNcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29va2llLWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48SWNvbiBuYW1lPVwiY29va2llXCIgc2l6ZT17MjZ9IC8+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvb2tpZS1jb3B5XCI+XG4gICAgICAgIDxzdHJvbmc+Q29va2llcywgdGhlIGhlYWx0aHkga2luZDwvc3Ryb25nPlxuICAgICAgICA8cD5Fc3NlbnRpYWwgY29va2llcyBrZWVwIHlvdSBzaWduZWQgaW4gYW5kIHNlY3VyZS4gV2l0aCB5b3VyIHBlcm1pc3Npb24gd2UgYWxzbyB1c2UgYW5hbHl0aWNzIGNvb2tpZXMgdG8gaW1wcm92ZSB0aGUgc2l0ZS4gPExpbmsgdG89XCIvY29va2llc1wiPkNvb2tpZSBQb2xpY3k8L0xpbms+PC9wPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29va2llLXRvZ2dsZVwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPXthbmFseXRpY3N9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0QW5hbHl0aWNzKGUudGFyZ2V0LmNoZWNrZWQpfSAvPlxuICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+IEFsbG93IGFuYWx5dGljcyBjb29raWVzXG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29va2llLWFjdGlvbnNcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWdob3N0IGJ0bi1zbVwiIG9uQ2xpY2s9eygpID0+IHNhdmUoZmFsc2UpfT48c3BhbiBjbGFzc05hbWU9XCJidG4tbGFiZWxcIj5Fc3NlbnRpYWwgb25seTwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtXCIgb25DbGljaz17KCkgPT4gc2F2ZShhbmFseXRpY3MgfHwgdHJ1ZSl9PjxzcGFuIGNsYXNzTmFtZT1cImJ0bi1sYWJlbFwiPnthbmFseXRpY3MgPyAnU2F2ZSBjaG9pY2VzJyA6ICdBY2NlcHQgYWxsJ308L3NwYW4+PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBLG1CQUFvQztBQXNDa0I7QUFqQy9DLElBQU0scUJBQXFCLE1BQU0sT0FBTyxjQUFjLElBQUksTUFBTSxxQkFBcUIsQ0FBQztBQUU5RSxTQUFSLGVBQWdDO0FBQ3JDLFFBQU0sQ0FBQyxNQUFNLE9BQU8sUUFBSSx1QkFBUyxLQUFLO0FBQ3RDLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx1QkFBUyxLQUFLO0FBRWhELDhCQUFVLE1BQU07QUFDZCxVQUFNLElBQUksTUFBTSxJQUFJLGFBQWE7QUFDakMsUUFBSSxHQUFHO0FBQ0wsbUJBQWEsQ0FBQyxDQUFDLEVBQUUsU0FBUztBQUMxQixVQUFJLEVBQUUsVUFBVyxlQUFjO0FBQUEsSUFDakMsT0FBTztBQUNMLFlBQU0sSUFBSSxXQUFXLE1BQU0sUUFBUSxJQUFJLEdBQUcsSUFBSTtBQUM5QyxhQUFPLE1BQU0sYUFBYSxDQUFDO0FBQUEsSUFDN0I7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsOEJBQVUsTUFBTTtBQUNkLFVBQU0sT0FBTyxNQUFNLFFBQVEsSUFBSTtBQUMvQixXQUFPLGlCQUFpQix1QkFBdUIsSUFBSTtBQUNuRCxXQUFPLE1BQU0sT0FBTyxvQkFBb0IsdUJBQXVCLElBQUk7QUFBQSxFQUNyRSxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sT0FBTyxDQUFDLE1BQU07QUFDbEIsVUFBTSxJQUFJLGVBQWUsRUFBRSxXQUFXLEdBQUcsS0FBSSxvQkFBSSxLQUFLLEdBQUUsWUFBWSxFQUFFLENBQUM7QUFDdkUsaUJBQWEsQ0FBQztBQUNkLFFBQUksRUFBRyxlQUFjO0FBQ3JCLFlBQVEsS0FBSztBQUFBLEVBQ2Y7QUFFQSxNQUFJLENBQUMsS0FBTSxRQUFPO0FBQ2xCLFNBQ0UsNkNBQUMsU0FBSSxXQUFVLFVBQVMsTUFBSyxVQUFTLGNBQVcsc0JBQy9DO0FBQUEsZ0RBQUMsU0FBSSxXQUFVLGVBQWMsZUFBWSxRQUFPLHNEQUFDLFFBQUssTUFBSyxVQUFTLE1BQU0sSUFBSSxHQUFFO0FBQUEsSUFDaEYsNkNBQUMsU0FBSSxXQUFVLGVBQ2I7QUFBQSxrREFBQyxZQUFPLHVDQUF5QjtBQUFBLE1BQ2pDLDZDQUFDLE9BQUU7QUFBQTtBQUFBLFFBQXlILDRDQUFDLFFBQUssSUFBRyxZQUFXLDJCQUFhO0FBQUEsU0FBTztBQUFBLE1BQ3BLLDZDQUFDLFdBQU0sV0FBVSxpQkFDZjtBQUFBLG9EQUFDLFdBQU0sTUFBSyxZQUFXLFNBQVMsV0FBVyxVQUFVLENBQUMsTUFBTSxhQUFhLEVBQUUsT0FBTyxPQUFPLEdBQUc7QUFBQSxRQUM1Riw0Q0FBQyxVQUFLLGVBQVksUUFBTztBQUFBLFFBQUU7QUFBQSxTQUM3QjtBQUFBLE9BQ0Y7QUFBQSxJQUNBLDZDQUFDLFNBQUksV0FBVSxrQkFDYjtBQUFBLGtEQUFDLFlBQU8sV0FBVSx3QkFBdUIsU0FBUyxNQUFNLEtBQUssS0FBSyxHQUFHLHNEQUFDLFVBQUssV0FBVSxhQUFZLDRCQUFjLEdBQU87QUFBQSxNQUN0SCw0Q0FBQyxZQUFPLFdBQVUsMEJBQXlCLFNBQVMsTUFBTSxLQUFLLGFBQWEsSUFBSSxHQUFHLHNEQUFDLFVBQUssV0FBVSxhQUFhLHNCQUFZLGlCQUFpQixjQUFhLEdBQU87QUFBQSxPQUNuSztBQUFBLEtBQ0Y7QUFFSjsiLAogICJuYW1lcyI6IFtdCn0K
