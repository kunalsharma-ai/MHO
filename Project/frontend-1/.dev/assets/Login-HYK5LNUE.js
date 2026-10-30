import {
  Captcha,
  Field,
  PasswordField
} from "/assets/chunk-JPU2CQJN.js";
import {
  postJSON,
  track,
  validateEmail
} from "/assets/chunk-NOWM46SW.js";
import {
  API,
  SITE
} from "/assets/chunk-JWSEDBGW.js";
import {
  HeartMark
} from "/assets/chunk-GTWO7VGT.js";
import {
  Icon,
  Link,
  LiveZone,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/Login.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function Login() {
  const [email, setEmail] = (0, import_react.useState)("");
  const [pw, setPw] = (0, import_react.useState)("");
  const [remember, setRemember] = (0, import_react.useState)(false);
  const [human, setHuman] = (0, import_react.useState)(false);
  const [capKey, setCapKey] = (0, import_react.useState)(0);
  const [err, setErr] = (0, import_react.useState)({});
  const [state, setState] = (0, import_react.useState)("form");
  const [alert, setAlert] = (0, import_react.useState)("");
  const submit = async (e) => {
    e.preventDefault();
    const x = {};
    const em = validateEmail(email);
    if (em) x.email = em;
    if (!pw) x.password = "Please enter your password.";
    if (!human) x.captcha = "Please complete the human check.";
    setErr(x);
    if (Object.keys(x).length) return;
    setState("sending");
    setAlert("");
    const res = await postJSON(API.login, { email: email.trim().toLowerCase(), password: pw, remember });
    if (!res.ok) {
      setState("form");
      setAlert(res.status === 401 ? "That email and password do not match. Please try again." : res.data?.message || "We could not log you in right now. Please try again shortly.");
      setCapKey((k) => k + 1);
      setHuman(false);
      return;
    }
    track("login", { method: "email" });
    setState("done");
    if (res.data?.redirect && res.data.redirect.startsWith("/")) window.location.assign(res.data.redirect);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "login2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "l2-bg", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container l2-grid", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "l2-visual", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "l2v-copy", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "l2v-pill", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dot" }),
            " Members area"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "l2v-big", children: [
            "Your next paid survey is ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "waiting" }),
            "."
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "l2v-small", children: "Pick up where you left off \u2014 invitations, points and payouts in one place." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "l2v-wallet", children: [
          [["paypal", "PayPal", "#003087", "#009cde"], ["upi", "UPI \xB7 India", "#5f259f", "#ff7909"], ["gift", "Gift Card", "#232f3e", "#ff9900"], ["bank", "Wire", "#0f766e", "#14b8a6"]].map(([ic, l, c1, c2], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "l2v-card", style: { "--i": i, "--c1": c1, "--c2": c2 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 18 }),
            l,
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
          ] }, l)),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "l2v-heart", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartMark, { size: 74 }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "l2v-meter", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Points to next reward" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}) })
        ] }),
        ["$", "\u20B9", "\u20AC", "\xA3", "\u2605"].map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "l2v-float", style: { "--i": i }, children: c }, i))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "login-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "lc-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lc-mark", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartMark, { size: 50 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Welcome back" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Log in with your email and password." })
        ] }),
        state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "lc-done", role: "status", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 30, stroke: 3 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You're signed in. Taking you to your dashboard\u2026" })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: submit, noValidate: true, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Email address", required: true, htmlFor: "l-em", error: err.email, icon: "mail", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "l-em", type: "email", value: email, onChange: (e) => setEmail(e.target.value), autoComplete: "username", "aria-invalid": !!err.email, placeholder: "you@example.com" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Password", required: true, htmlFor: "l-pw", error: err.password, icon: "lock", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, { id: "l-pw", value: pw, onChange: setPw, invalid: !!err.password, showMeter: false, autoComplete: "current-password", placeholder: "Your password" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "lc-row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "lc-remember", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: remember, onChange: (e) => setRemember(e.target.checked) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" }),
              "Keep me signed in"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: `mailto:${SITE.email}?subject=${encodeURIComponent("Password reset request")}`, children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captcha, { onChange: setHuman, invalid: !!err.captcha, resetKey: capKey }),
          err.captcha && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "field-error", role: "alert", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "info", size: 14 }),
            " ",
            err.captcha
          ] }),
          alert && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "form-alert", role: "alert", children: alert }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "btn btn-primary btn-block", type: "submit", disabled: state === "sending", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: state === "sending" ? "Checking\u2026" : "Log in securely" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lock", size: 18 })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "lc-alt", children: [
          "New here? ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/join", children: "Create a free account" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "lc-safe", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "shieldCheck", size: 14 }),
          " We will never ask for your password by email, chat or phone."
        ] })
      ] })
    ] })
  ] });
}
export {
  Login as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL0xvZ2luLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gTG9nIGluIFx1MjAxNCBlbWFpbCArIHBhc3N3b3JkICsgQ0FQVENIQS4gUG9zdHMgdG8gQVBJLmxvZ2luIChob3N0aW5nIGJhY2tlbmQpLiBub2luZGV4IChzZWUgc2VvL3BhZ2VzLmpzKS5cbi8vIERlbGliZXJhdGVseSBhIGRpZmZlcmVudCBsYXlvdXQgZnJvbSBzaWduLXVwOiBhIGRhcmsgXCJtb25pdG9yXCIgc2NlbmUgd2l0aCBhIGdsYXNzIGNhcmQuXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBJY29uIGZyb20gJy4uL2NvbXBvbmVudHMvSWNvbi5qc3gnO1xuaW1wb3J0IHsgSGVhcnRNYXJrIH0gZnJvbSAnLi4vY29tcG9uZW50cy9CcmFuZC5qc3gnO1xuaW1wb3J0IHsgRmllbGQsIFBhc3N3b3JkRmllbGQsIENhcHRjaGEgfSBmcm9tICcuLi9jb21wb25lbnRzL0Zvcm1LaXQuanN4JztcbmltcG9ydCB7IExpdmVab25lIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS5qc3gnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJy4uL3JvdXRlci5qc3gnO1xuaW1wb3J0IHsgQVBJLCBTSVRFIH0gZnJvbSAnLi4vY29uZmlnL3NpdGUuanMnO1xuaW1wb3J0IHsgdmFsaWRhdGVFbWFpbCwgcG9zdEpTT04sIHRyYWNrIH0gZnJvbSAnLi4vdXRpbHMvaGVscGVycy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExvZ2luKCkge1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3B3LCBzZXRQd10gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtyZW1lbWJlciwgc2V0UmVtZW1iZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaHVtYW4sIHNldEh1bWFuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2NhcEtleSwgc2V0Q2FwS2V5XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbZXJyLCBzZXRFcnJdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKCdmb3JtJyk7XG4gIGNvbnN0IFthbGVydCwgc2V0QWxlcnRdID0gdXNlU3RhdGUoJycpO1xuXG4gIGNvbnN0IHN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHggPSB7fTtcbiAgICBjb25zdCBlbSA9IHZhbGlkYXRlRW1haWwoZW1haWwpOyBpZiAoZW0pIHguZW1haWwgPSBlbTtcbiAgICBpZiAoIXB3KSB4LnBhc3N3b3JkID0gJ1BsZWFzZSBlbnRlciB5b3VyIHBhc3N3b3JkLic7XG4gICAgaWYgKCFodW1hbikgeC5jYXB0Y2hhID0gJ1BsZWFzZSBjb21wbGV0ZSB0aGUgaHVtYW4gY2hlY2suJztcbiAgICBzZXRFcnIoeCk7XG4gICAgaWYgKE9iamVjdC5rZXlzKHgpLmxlbmd0aCkgcmV0dXJuO1xuICAgIHNldFN0YXRlKCdzZW5kaW5nJyk7XG4gICAgc2V0QWxlcnQoJycpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHBvc3RKU09OKEFQSS5sb2dpbiwgeyBlbWFpbDogZW1haWwudHJpbSgpLnRvTG93ZXJDYXNlKCksIHBhc3N3b3JkOiBwdywgcmVtZW1iZXIgfSk7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIHNldFN0YXRlKCdmb3JtJyk7XG4gICAgICBzZXRBbGVydChyZXMuc3RhdHVzID09PSA0MDEgPyAnVGhhdCBlbWFpbCBhbmQgcGFzc3dvcmQgZG8gbm90IG1hdGNoLiBQbGVhc2UgdHJ5IGFnYWluLicgOiByZXMuZGF0YT8ubWVzc2FnZSB8fCAnV2UgY291bGQgbm90IGxvZyB5b3UgaW4gcmlnaHQgbm93LiBQbGVhc2UgdHJ5IGFnYWluIHNob3J0bHkuJyk7XG4gICAgICBzZXRDYXBLZXkoKGspID0+IGsgKyAxKTtcbiAgICAgIHNldEh1bWFuKGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJhY2soJ2xvZ2luJywgeyBtZXRob2Q6ICdlbWFpbCcgfSk7XG4gICAgc2V0U3RhdGUoJ2RvbmUnKTtcbiAgICBpZiAocmVzLmRhdGE/LnJlZGlyZWN0ICYmIHJlcy5kYXRhLnJlZGlyZWN0LnN0YXJ0c1dpdGgoJy8nKSkgd2luZG93LmxvY2F0aW9uLmFzc2lnbihyZXMuZGF0YS5yZWRpcmVjdCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJsb2dpbjJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibDItYmdcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48aSAvPjxpIC8+PGkgLz48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGwyLWdyaWRcIj5cbiAgICAgICAgPExpdmVab25lIGNsYXNzTmFtZT1cImwyLXZpc3VhbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibDJ2LWNvcHlcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImwydi1waWxsXCI+PHNwYW4gY2xhc3NOYW1lPVwiZG90XCIgLz4gTWVtYmVycyBhcmVhPC9zcGFuPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibDJ2LWJpZ1wiPllvdXIgbmV4dCBwYWlkIHN1cnZleSBpcyA8c3Bhbj53YWl0aW5nPC9zcGFuPi48L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsMnYtc21hbGxcIj5QaWNrIHVwIHdoZXJlIHlvdSBsZWZ0IG9mZiBcdTIwMTQgaW52aXRhdGlvbnMsIHBvaW50cyBhbmQgcGF5b3V0cyBpbiBvbmUgcGxhY2UuPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibDJ2LXdhbGxldFwiPlxuICAgICAgICAgICAge1tbJ3BheXBhbCcsICdQYXlQYWwnLCAnIzAwMzA4NycsICcjMDA5Y2RlJ10sIFsndXBpJywgJ1VQSSBcdTAwQjcgSW5kaWEnLCAnIzVmMjU5ZicsICcjZmY3OTA5J10sIFsnZ2lmdCcsICdHaWZ0IENhcmQnLCAnIzIzMmYzZScsICcjZmY5OTAwJ10sIFsnYmFuaycsICdXaXJlJywgJyMwZjc2NmUnLCAnIzE0YjhhNiddXS5tYXAoKFtpYywgbCwgYzEsIGMyXSwgaSkgPT4gKFxuICAgICAgICAgICAgICA8c3BhbiBrZXk9e2x9IGNsYXNzTmFtZT1cImwydi1jYXJkXCIgc3R5bGU9e3sgJy0taSc6IGksICctLWMxJzogYzEsICctLWMyJzogYzIgfX0+PEljb24gbmFtZT17aWN9IHNpemU9ezE4fSAvPntsfTxpIC8+PC9zcGFuPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsMnYtaGVhcnRcIj48SGVhcnRNYXJrIHNpemU9ezc0fSAvPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImwydi1tZXRlclwiPlxuICAgICAgICAgICAgPHNwYW4+UG9pbnRzIHRvIG5leHQgcmV3YXJkPC9zcGFuPlxuICAgICAgICAgICAgPGk+PGIgLz48L2k+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge1snJCcsICdcdTIwQjknLCAnXHUyMEFDJywgJ1x1MDBBMycsICdcdTI2MDUnXS5tYXAoKGMsIGkpID0+IDxzcGFuIGtleT17aX0gY2xhc3NOYW1lPVwibDJ2LWZsb2F0XCIgc3R5bGU9e3sgJy0taSc6IGkgfX0+e2N9PC9zcGFuPil9XG4gICAgICAgIDwvTGl2ZVpvbmU+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dpbi1jYXJkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYy1oZWFkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYy1tYXJrXCI+PEhlYXJ0TWFyayBzaXplPXs1MH0gLz48L3NwYW4+XG4gICAgICAgICAgICA8aDE+V2VsY29tZSBiYWNrPC9oMT5cbiAgICAgICAgICAgIDxwPkxvZyBpbiB3aXRoIHlvdXIgZW1haWwgYW5kIHBhc3N3b3JkLjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7c3RhdGUgPT09ICdkb25lJyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGMtZG9uZVwiIHJvbGU9XCJzdGF0dXNcIj5cbiAgICAgICAgICAgICAgPEljb24gbmFtZT1cImNoZWNrXCIgc2l6ZT17MzB9IHN0cm9rZT17M30gLz5cbiAgICAgICAgICAgICAgPHA+WW91J3JlIHNpZ25lZCBpbi4gVGFraW5nIHlvdSB0byB5b3VyIGRhc2hib2FyZFx1MjAyNjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17c3VibWl0fSBub1ZhbGlkYXRlPlxuICAgICAgICAgICAgICA8RmllbGQgbGFiZWw9XCJFbWFpbCBhZGRyZXNzXCIgcmVxdWlyZWQgaHRtbEZvcj1cImwtZW1cIiBlcnJvcj17ZXJyLmVtYWlsfSBpY29uPVwibWFpbFwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImwtZW1cIiB0eXBlPVwiZW1haWxcIiB2YWx1ZT17ZW1haWx9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0RW1haWwoZS50YXJnZXQudmFsdWUpfSBhdXRvQ29tcGxldGU9XCJ1c2VybmFtZVwiIGFyaWEtaW52YWxpZD17ISFlcnIuZW1haWx9IHBsYWNlaG9sZGVyPVwieW91QGV4YW1wbGUuY29tXCIgLz5cbiAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiUGFzc3dvcmRcIiByZXF1aXJlZCBodG1sRm9yPVwibC1wd1wiIGVycm9yPXtlcnIucGFzc3dvcmR9IGljb249XCJsb2NrXCI+XG4gICAgICAgICAgICAgICAgPFBhc3N3b3JkRmllbGQgaWQ9XCJsLXB3XCIgdmFsdWU9e3B3fSBvbkNoYW5nZT17c2V0UHd9IGludmFsaWQ9eyEhZXJyLnBhc3N3b3JkfSBzaG93TWV0ZXI9e2ZhbHNlfSBhdXRvQ29tcGxldGU9XCJjdXJyZW50LXBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJZb3VyIHBhc3N3b3JkXCIgLz5cbiAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYy1yb3dcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibGMtcmVtZW1iZXJcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD17cmVtZW1iZXJ9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0UmVtZW1iZXIoZS50YXJnZXQuY2hlY2tlZCl9IC8+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5LZWVwIG1lIHNpZ25lZCBpbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj17YG1haWx0bzoke1NJVEUuZW1haWx9P3N1YmplY3Q9JHtlbmNvZGVVUklDb21wb25lbnQoJ1Bhc3N3b3JkIHJlc2V0IHJlcXVlc3QnKX1gfT5Gb3Jnb3QgcGFzc3dvcmQ/PC9hPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPENhcHRjaGEgb25DaGFuZ2U9e3NldEh1bWFufSBpbnZhbGlkPXshIWVyci5jYXB0Y2hhfSByZXNldEtleT17Y2FwS2V5fSAvPlxuICAgICAgICAgICAgICB7ZXJyLmNhcHRjaGEgJiYgPHAgY2xhc3NOYW1lPVwiZmllbGQtZXJyb3JcIiByb2xlPVwiYWxlcnRcIj48SWNvbiBuYW1lPVwiaW5mb1wiIHNpemU9ezE0fSAvPiB7ZXJyLmNhcHRjaGF9PC9wPn1cbiAgICAgICAgICAgICAge2FsZXJ0ICYmIDxwIGNsYXNzTmFtZT1cImZvcm0tYWxlcnRcIiByb2xlPVwiYWxlcnRcIj57YWxlcnR9PC9wPn1cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrXCIgdHlwZT1cInN1Ym1pdFwiIGRpc2FibGVkPXtzdGF0ZSA9PT0gJ3NlbmRpbmcnfT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJidG4tbGFiZWxcIj57c3RhdGUgPT09ICdzZW5kaW5nJyA/ICdDaGVja2luZ1x1MjAyNicgOiAnTG9nIGluIHNlY3VyZWx5J308L3NwYW4+XG4gICAgICAgICAgICAgICAgPEljb24gbmFtZT1cImxvY2tcIiBzaXplPXsxOH0gLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsYy1hbHRcIj5OZXcgaGVyZT8gPExpbmsgdG89XCIvam9pblwiPkNyZWF0ZSBhIGZyZWUgYWNjb3VudDwvTGluaz48L3A+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGMtc2FmZVwiPjxJY29uIG5hbWU9XCJzaGllbGRDaGVja1wiIHNpemU9ezE0fSAvPiBXZSB3aWxsIG5ldmVyIGFzayBmb3IgeW91ciBwYXNzd29yZCBieSBlbWFpbCwgY2hhdCBvciBwaG9uZS48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsbUJBQXlCO0FBNENuQjtBQW5DUyxTQUFSLFFBQXlCO0FBQzlCLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx1QkFBUyxFQUFFO0FBQ3JDLFFBQU0sQ0FBQyxJQUFJLEtBQUssUUFBSSx1QkFBUyxFQUFFO0FBQy9CLFFBQU0sQ0FBQyxVQUFVLFdBQVcsUUFBSSx1QkFBUyxLQUFLO0FBQzlDLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx1QkFBUyxLQUFLO0FBQ3hDLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx1QkFBUyxDQUFDO0FBQ3RDLFFBQU0sQ0FB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
