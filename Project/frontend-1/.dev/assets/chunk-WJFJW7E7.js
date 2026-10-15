import {
  CountrySelect,
  Field,
  PhoneInput
} from "/assets/chunk-JPU2CQJN.js";
import {
  submitReview
} from "/assets/chunk-7OCC2F7F.js";
import {
  pop,
  session,
  store,
  track,
  validateEmail,
  validateName,
  validatePhone
} from "/assets/chunk-NOWM46SW.js";
import {
  Flag,
  Icon,
  Link,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import {
  countryByCode
} from "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/components/RateExperience.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var ROLES = [
  { id: "hcp", label: "Healthcare Professional", sub: "Doctor, nurse, pharmacist, allied health, admin\u2026", icon: "stethoscope", ask: "Take our pulse" },
  { id: "caregiver", label: "Caregiver", sub: "Family & care support", icon: "hands", ask: "Fill our heart" },
  { id: "patient", label: "Patient", sub: "Lived experience", icon: "heart", ask: "Raise our sun" }
];
var STEPS = ["You", "Rate", "About you", "Review"];
var MOODS = {
  hcp: ["Pick a reading", "Critical", "Needs work", "Stable", "Strong", "Excellent"],
  caregiver: ["Pick a level", "Running on empty", "A little low", "Half full", "Warm", "Full of love"],
  patient: ["Pick the sky", "Stormy", "Cloudy", "Clearing up", "Sunny", "Shining bright"],
  none: ["Choose who you are", "", "", "", "", ""]
};
function PulseGauge({ r }) {
  const ang = -90 + (r ? (r - 3) * 34 : -80);
  const amp = 6 + r * 7;
  const seg = (i) => {
    const a0 = Math.PI * (1 + i / 5) + 0.03, a1 = Math.PI * (1 + (i + 1) / 5) - 0.03;
    const P = (a, R) => [120 + R * Math.cos(a), 128 + R * Math.sin(a)].map((n) => n.toFixed(1)).join(" ");
    return `M${P(a0, 96)} A96 96 0 0 1 ${P(a1, 96)} L${P(a1, 70)} A70 70 0 0 0 ${P(a0, 70)} Z`;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 240 200", className: "ri ri-gauge", "aria-hidden": "true", children: [
    [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: seg(i), className: `rg-seg s${i + 1} ${r > i ? "on" : ""}` }, i)),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "rg-needle", style: { transform: `rotate(${ang}deg)` }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M117 128 L120 44 L123 128 Z" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "120", cy: "128", r: "10" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", { x: "120", y: "112", textAnchor: "middle", className: "rg-val", children: [
      r || "\u2013",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tspan", { className: "rg-of", children: "/5" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "rg-ecg", style: { "--amp": amp }, d: `M10 176 H70 l8 -${amp / 2} 8 ${amp / 2} H100 l6 -${amp} 8 ${amp * 1.8} 8 -${amp * 1.1} 6 ${amp * 0.3} H160 l8 -${amp / 3} 8 ${amp / 3} H230`, pathLength: "100" })
  ] });
}
function HeartFill({ r }) {
  const level = 168 - r * 30;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 220 200", className: "ri ri-heart", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: "rh-clip", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M110 182C40 132 14 104 14 66 14 36 38 14 66 14c20 0 36 10 44 26 8-16 24-26 44-26 28 0 52 22 52 52 0 38-26 66-96 116z" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M110 182C40 132 14 104 14 66 14 36 38 14 66 14c20 0 36 10 44 26 8-16 24-26 44-26 28 0 52 22 52 52 0 38-26 66-96 116z", className: "rh-shell" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { clipPath: "url(#rh-clip)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "rh-liquid", style: { transform: `translateY(${level}px)` }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "rh-wave", d: "M-40 6 Q-20 -6 0 6 T40 6 T80 6 T120 6 T160 6 T200 6 T240 6 T280 6 V220 H-40z" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "rh-wave b", d: "M-40 10 Q-20 0 0 10 T40 10 T80 10 T120 10 T160 10 T200 10 T240 10 T280 10 V220 H-40z" })
      ] }),
      r >= 3 && [0, 1, 2, 3].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "rh-bub", style: { "--i": i }, cx: 70 + i * 26, cy: "170", r: 3 + i % 2 * 2 }, i))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M110 182C40 132 14 104 14 66 14 36 38 14 66 14c20 0 36 10 44 26 8-16 24-26 44-26 28 0 52 22 52 52 0 38-26 66-96 116z", className: "rh-outline" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M44 52c4-12 14-20 26-20", className: "rh-gloss" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", { x: "110", y: "104", textAnchor: "middle", className: "rh-pct", children: [
      r * 20,
      "%"
    ] })
  ] });
}
function Sunrise({ r }) {
  const cx = 34 + r * 34, cy = 150 - r * 22;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 240 200", className: `ri ri-sun sky-${r}`, "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "0", y: "0", width: "240", height: "200", rx: "24", className: "rs-sky" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "rs-sunwrap", style: { transform: `translate(${cx}px, ${cy}px)` }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { className: "rs-rays", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "-2", y: "-40", width: "4", height: "12", rx: "2", transform: `rotate(${i * 30})` }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { r: "22", className: "rs-sun" })
    ] }),
    r <= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { className: "rs-rain", children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: 20 + i * 22, y1: "40", x2: 14 + i * 22, y2: "56", style: { "--i": i } }, i)) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "rs-cloud c1", style: { opacity: r >= 5 ? 0 : 1 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "60", cy: "48", rx: "30", ry: "14" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "80", cy: "40", rx: "20", ry: "14" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "rs-cloud c2", style: { opacity: r >= 4 ? 0 : 1 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "170", cy: "30", rx: "28", ry: "12" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", { cx: "188", cy: "24", rx: "16", ry: "10" })
    ] }),
    r >= 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "rs-birds", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M150 70q6-6 12 0q6-6 12 0" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M176 56q5-5 10 0q5-5 10 0" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 160 Q50 120 100 150 T200 140 T240 150 V200 H0z", className: "rs-hill h1" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 176 Q70 146 130 170 T240 166 V200 H0z", className: "rs-hill h2" })
  ] });
}
var INSTRUMENT = { hcp: PulseGauge, caregiver: HeartFill, patient: Sunrise };
var EMPTY = { firstName: "", lastName: "", email: "", phone: "", phoneCc: "in", company: "", designation: "", country: "", role: "", rating: 0, text: "" };
var openRateExperience = () => window.dispatchEvent(new Event("mho-open-rate"));
function RateExperience({ suppressed = false }) {
  const suppressedRef = (0, import_react.useRef)(suppressed);
  suppressedRef.current = suppressed;
  const [open, setOpen] = (0, import_react.useState)(false);
  const [f, setF] = (0, import_react.useState)(EMPTY);
  const [err, setErr] = (0, import_react.useState)({});
  const [hoverR, setHoverR] = (0, import_react.useState)(0);
  const [step, setStep] = (0, import_react.useState)(0);
  const [state, setState] = (0, import_react.useState)("form");
  const [submitErr, setSubmitErr] = (0, import_react.useState)("");
  const dialog = (0, import_react.useRef)(null);
  const lastFocus = (0, import_react.useRef)(null);
  const set = (k) => (v) => {
    setF((s) => ({ ...s, [k]: v && v.target ? v.target.value : v }));
    setErr((e) => e[k] ? Object.fromEntries(Object.entries(e).filter(([x]) => x !== k)) : e);
  };
  (0, import_react.useEffect)(() => {
    if (store.get("mho-reviewed")) return;
    const start = Date.now();
    let maxScroll = 0;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h > 0) maxScroll = Math.max(maxScroll, window.scrollY / h);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = setInterval(() => {
      const shown = session.get("mho-rate-shown", 0);
      const last = session.get("mho-rate-last", 0);
      const elapsed = (Date.now() - start) / 1e3;
      const busy = document.documentElement.classList.contains("menu-open") || document.querySelector(".chat-win.is-open") || document.querySelector(".modal.is-open");
      if (store.get("mho-reviewed") || shown >= 3 || busy || suppressedRef.current) return;
      const ready = shown === 0 ? elapsed > 45 && maxScroll > 0.4 || elapsed > 80 : Date.now() - last > 4 * 60 * 1e3;
      if (ready) {
        session.set("mho-rate-shown", shown + 1);
        session.set("mho-rate-last", Date.now());
        openModal("auto");
      }
    }, 5e3);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    const onOpen = () => openModal("link");
    window.addEventListener("mho-open-rate", onOpen);
    return () => window.removeEventListener("mho-open-rate", onOpen);
  }, []);
  const openModal = (src = "tab") => {
    lastFocus.current = document.activeElement;
    setOpen(true);
    setState((s) => s === "done" ? "done" : "form");
    pop(0.1);
    track("review_prompt_open", { source: src });
  };
  const close = () => {
    setOpen(false);
    session.set("mho-rate-last", Date.now());
    setTimeout(() => lastFocus.current?.focus?.(), 50);
  };
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialog.current) {
        const els = dialog.current.querySelectorAll("button, input, textarea, select, a[href]");
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    setTimeout(() => dialog.current?.querySelector(".rj-role input, .rj-rate button")?.focus(), 80);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const validate = (only) => {
    const e = {};
    if (!f.rating) e.rating = "Pick a face to rate your experience.";
    const fn = validateName(f.firstName, "first name");
    if (fn) e.firstName = fn;
    const ln = validateName(f.lastName, "last name", false);
    if (ln) e.lastName = ln;
    const em = validateEmail(f.email);
    if (em) e.email = em;
    if (!f.company.trim()) e.company = "Please enter your company or organisation.";
    if (!f.designation.trim()) e.designation = "Please enter your designation.";
    if (!f.country) e.country = "Please choose your country.";
    if (!f.role) e.role = "Tell us which member type you are.";
    if (f.text.trim().length < 20) e.text = "Please write at least 20 characters so others can learn from your review.";
    const ph = validatePhone(f.phone, f.phoneCc, false);
    if (ph) e.phone = ph;
    if (only === 0) return Object.fromEntries(Object.entries(e).filter(([k]) => k === "role"));
    if (only === 1) return Object.fromEntries(Object.entries(e).filter(([k]) => k === "rating"));
    if (only === 2) return Object.fromEntries(Object.entries(e).filter(([k]) => ["firstName", "lastName", "email", "company", "designation", "country", "phone"].includes(k)));
    return e;
  };
  const next = () => {
    const e = validate(step);
    setErr(e);
    if (Object.keys(e).length) return;
    pop(0.06);
    setStep((x) => Math.min(x + 1, 3));
  };
  const submit = async (ev) => {
    ev.preventDefault();
    if (step < 3) return next();
    const e = validate();
    setErr(e);
    if (Object.keys(e).length) {
      if (e.role) setStep(0);
      else if (e.rating) setStep(1);
      else if (!e.text) setStep(2);
      return;
    }
    setState("sending");
    setSubmitErr("");
    const res = await submitReview({
      ...f,
      phone: f.phone ? `${countryByCode(f.phoneCc)?.dial || ""} ${f.phone}` : "",
      countryName: countryByCode(f.country)?.name
    });
    if (!res.ok) {
      setState("form");
      setSubmitErr(res.message);
      return;
    }
    store.set("mho-reviewed", true);
    track("review_submitted", { rating: f.rating, role: f.role });
    setState("done");
    pop(0.16);
  };
  const r = step === 1 ? hoverR || f.rating : f.rating;
  const role = ROLES.find((x) => x.id === f.role);
  const moods = MOODS[f.role || "none"];
  const Instrument = INSTRUMENT[f.role] || PulseGauge;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    !suppressed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "rate-tab", onClick: () => openModal("tab"), "aria-haspopup": "dialog", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rate-tab-stars", "aria-hidden": "true", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "star", size: 12, fill: "currentColor", style: { "--i": i } }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rate-tab-text", children: "Rate your experience" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `modal rate-modal rj4 ${open ? "is-open" : ""}`, "aria-hidden": !open, inert: !open, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "modal-backdrop", onClick: close }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `rj4-dialog r-${r || 0} ${f.role ? "rgrade-" + f.role : "rgrade-none"}`, role: "dialog", "aria-modal": "true", "aria-labelledby": "rate-title", ref: dialog, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "modal-x", onClick: close, "aria-label": "Close", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "x", size: 20 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { className: "rj4-stage", "aria-hidden": "true", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rjs-glow" }),
          f.role ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rjs-inst", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instrument, { r }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rjs-mood", children: moods[r] })
          ] }, f.role) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rjs-trio", children: [
            ROLES.map((ro, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `rjs-orb t-${ro.id}`, style: { "--i": i }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ro.icon, size: 26 }) }, ro.id)),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rjs-mood", children: "Your voice, 60 seconds" })
          ] }),
          step >= 2 && state !== "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rjs-preview", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "rjp-top", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rjp-av", children: (f.firstName || "?").slice(0, 1).toUpperCase() }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "rjp-who", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
                  f.firstName || "Your name",
                  " ",
                  f.lastName ? f.lastName[0] + "." : ""
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: [f.designation, f.company].filter(Boolean).join(", ") || "Your designation" })
              ] }),
              f.country && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { code: f.country, size: 22 })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rjp-stars", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "star", size: 13, fill: n <= f.rating ? "currentColor" : "none" }, n)) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: f.text || "Your review appears here as you type\u2026" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rj4-main", children: state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rj-done", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rd-burst", "aria-hidden": "true", children: Array.from({ length: 16 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { "--i": i } }, i)) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rjd-badge", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 30, stroke: 3 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { id: "rate-title", children: [
            "Thank you, ",
            f.firstName || "friend",
            "!"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your review shows in the member voices on this device straight away, and for everyone once our team has approved it." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/reviews", className: "btn btn-primary", onClick: close, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: "See member reviews" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 18 })
          ] })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: submit, noValidate: true, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "rj4-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "rj4-steps", "aria-label": "Progress", children: STEPS.map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: i === step ? "on" : i < step ? "done" : "", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", onClick: () => i < step && setStep(i), disabled: i > step, "aria-label": `Step ${i + 1}: ${st}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i < step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 11, stroke: 3.5 }) : i + 1 }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: st })
            ] }) }, st)) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { id: "rate-title", children: step === 0 ? "Rate your experience" : step === 1 ? role ? role.ask : "Your rating" : step === 2 ? "Who should we credit?" : "Tell other members what it\u2019s like" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: step === 0 ? "First, tell us who you are. Each member type rates us in its own way." : step === 1 ? "Tap a level from 1 to 5." : step === 2 ? "Your email and phone stay private." : "A few honest lines help other members decide." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rj4-body", children: [
            step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { className: "rj-roles4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { className: "sr-only", children: "I am a" }),
              ROLES.map((ro) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: `rj-role4 t-${ro.id} ${f.role === ro.id ? "on" : ""}`, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "radio", name: "rate-role", value: ro.id, checked: f.role === ro.id, onChange: () => set("role")(ro.id) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rr-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ro.icon, size: 22 }) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "rr-t", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: ro.label }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: ro.sub })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rr-tick", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 14, stroke: 3 }) })
              ] }, ro.id)),
              err.role && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "field-error", role: "alert", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "info", size: 14 }),
                " ",
                err.role
              ] })
            ] }),
            step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rj-rate", role: "radiogroup", "aria-label": "Your rating", onMouseLeave: () => setHoverR(0), children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "button",
                {
                  type: "button",
                  role: "radio",
                  "aria-checked": f.rating === n,
                  "aria-label": `${n} out of 5: ${moods[n]}`,
                  className: `rr-btn ${n === f.rating ? "on" : ""} ${n <= r ? "lit" : ""}`,
                  style: { "--n": n },
                  onMouseEnter: () => setHoverR(n),
                  onFocus: () => setHoverR(n),
                  onBlur: () => setHoverR(0),
                  onClick: () => {
                    set("rating")(n);
                    pop(0.05 + n * 0.01);
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rrb-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: f.role === "hcp" ? "pulse" : f.role === "caregiver" ? "heart" : "sun", size: 18, fill: f.role === "caregiver" && n <= r ? "currentColor" : "none" }) }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: n })
                  ]
                },
                n
              )) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "rj-mood4", "aria-live": "polite", children: moods[r] }),
              err.rating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "field-error", role: "alert", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "info", size: 14 }),
                " ",
                err.rating
              ] })
            ] }),
            step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rj-fields", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "form-row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "First name", required: true, htmlFor: "rv-fn", error: err.firstName, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "rv-fn", value: f.firstName, onChange: set("firstName"), autoComplete: "given-name", "aria-invalid": !!err.firstName }) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Last name", htmlFor: "rv-ln", error: err.lastName, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "rv-ln", value: f.lastName, onChange: set("lastName"), autoComplete: "family-name" }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Email", required: true, htmlFor: "rv-em", error: err.email, hint: "Never shown publicly.", icon: "mail", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "rv-em", type: "email", value: f.email, onChange: set("email"), autoComplete: "email", "aria-invalid": !!err.email }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "form-row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Company name", required: true, htmlFor: "rv-co", error: err.company, icon: "building", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "rv-co", value: f.company, onChange: set("company"), autoComplete: "organization", "aria-invalid": !!err.company }) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Designation", required: true, htmlFor: "rv-de", error: err.designation, icon: "briefcase", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "rv-de", value: f.designation, onChange: set("designation"), autoComplete: "organization-title", "aria-invalid": !!err.designation }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "form-row", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Country", required: true, htmlFor: "rv-ct", error: err.country, icon: "globe", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountrySelect, { id: "rv-ct", value: f.country, onChange: (c) => {
                  setF((s) => ({ ...s, country: c, phoneCc: s.phone ? s.phoneCc : c }));
                  setErr((e) => ({ ...e, country: void 0 }));
                }, invalid: !!err.country }) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Phone number", htmlFor: "rv-ph", error: err.phone, icon: "phone", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneInput, { id: "rv-ph", country: f.phoneCc, onCountry: set("phoneCc"), value: f.phone, onChange: set("phone"), invalid: !!err.phone }) })
              ] })
            ] }),
            step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { label: "Your review", required: true, htmlFor: "rv-tx", error: err.text, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { id: "rv-tx", rows: 6, value: f.text, onChange: set("text"), maxLength: 600, placeholder: "What did you enjoy? What could be better?", "aria-invalid": !!err.text }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "char-count", children: [
                f.text.length,
                "/600"
              ] })
            ] })
          ] }, step),
          submitErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "form-alert", role: "alert", children: submitErr }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { className: "rj-foot", children: [
            step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", className: "btn btn-ghost", onClick: () => {
              setErr({});
              setStep(step - 1);
            }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrowLeft", size: 18 }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: "Back" })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "rj-privacy", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lock", size: 12 }),
              " Email and phone stay private"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "btn btn-primary", type: "submit", disabled: state === "sending", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: step < 3 ? "Continue" : state === "sending" ? "Publishing\u2026" : "Publish my review" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: step < 3 ? "arrow" : "send", size: 18 })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}

export {
  openRateExperience,
  RateExperience
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2NvbXBvbmVudHMvUmF0ZUV4cGVyaWVuY2UuanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBcIlJhdGUgeW91ciBleHBlcmllbmNlXCI6IGFsd2F5cy12aXNpYmxlIHNpZGUgdGFiICsgYSBtb2RhbCB0aGF0IG9wZW5zIGl0c2VsZiBvY2Nhc2lvbmFsbHlcbi8vIChuZXZlciBvbiBhcnJpdmFsOiBmaXJzdCBhZnRlciB+NDUgcyBvZiBicm93c2luZyBvciA0MCUgc2Nyb2xsLCB0aGVuIGF0IG1vc3QgdHdpY2UgbW9yZSBwZXIgc2Vzc2lvbixcbi8vIHNwYWNlZCBzZXZlcmFsIG1pbnV0ZXMgYXBhcnQsIGFuZCBuZXZlciBhZ2FpbiBhZnRlciBhIHJldmlldyBpcyBzdWJtaXR0ZWQpLlxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uLmpzeCc7XG5pbXBvcnQgeyBGaWVsZCwgQ291bnRyeVNlbGVjdCwgUGhvbmVJbnB1dCB9IGZyb20gJy4vRm9ybUtpdC5qc3gnO1xuaW1wb3J0IHsgdmFsaWRhdGVFbWFpbCwgdmFsaWRhdGVOYW1lLCB2YWxpZGF0ZVBob25lLCBzdG9yZSwgc2Vzc2lvbiwgcG9wLCB0cmFjayB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgc3VibWl0UmV2aWV3IH0gZnJvbSAnLi4vdXRpbHMvcmV2aWV3cy5qcyc7XG5pbXBvcnQgeyBjb3VudHJ5QnlDb2RlIH0gZnJvbSAnLi4vZGF0YS9jb3VudHJpZXMuanMnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJy4uL3JvdXRlci5qc3gnO1xuaW1wb3J0IHsgRmxhZyB9IGZyb20gJy4vdWkuanN4JztcblxuY29uc3QgUk9MRVMgPSBbXG4gIHsgaWQ6ICdoY3AnLCBsYWJlbDogJ0hlYWx0aGNhcmUgUHJvZmVzc2lvbmFsJywgc3ViOiAnRG9jdG9yLCBudXJzZSwgcGhhcm1hY2lzdCwgYWxsaWVkIGhlYWx0aCwgYWRtaW5cdTIwMjYnLCBpY29uOiAnc3RldGhvc2NvcGUnLCBhc2s6ICdUYWtlIG91ciBwdWxzZScgfSxcbiAgeyBpZDogJ2NhcmVnaXZlcicsIGxhYmVsOiAnQ2FyZWdpdmVyJywgc3ViOiAnRmFtaWx5ICYgY2FyZSBzdXBwb3J0JywgaWNvbjogJ2hhbmRzJywgYXNrOiAnRmlsbCBvdXIgaGVhcnQnIH0sXG4gIHsgaWQ6ICdwYXRpZW50JywgbGFiZWw6ICdQYXRpZW50Jywgc3ViOiAnTGl2ZWQgZXhwZXJpZW5jZScsIGljb246ICdoZWFydCcsIGFzazogJ1JhaXNlIG91ciBzdW4nIH0sXG5dO1xuY29uc3QgU1RFUFMgPSBbJ1lvdScsICdSYXRlJywgJ0Fib3V0IHlvdScsICdSZXZpZXcnXTtcbmNvbnN0IE1PT0RTID0ge1xuICBoY3A6IFsnUGljayBhIHJlYWRpbmcnLCAnQ3JpdGljYWwnLCAnTmVlZHMgd29yaycsICdTdGFibGUnLCAnU3Ryb25nJywgJ0V4Y2VsbGVudCddLFxuICBjYXJlZ2l2ZXI6IFsnUGljayBhIGxldmVsJywgJ1J1bm5pbmcgb24gZW1wdHknLCAnQSBsaXR0bGUgbG93JywgJ0hhbGYgZnVsbCcsICdXYXJtJywgJ0Z1bGwgb2YgbG92ZSddLFxuICBwYXRpZW50OiBbJ1BpY2sgdGhlIHNreScsICdTdG9ybXknLCAnQ2xvdWR5JywgJ0NsZWFyaW5nIHVwJywgJ1N1bm55JywgJ1NoaW5pbmcgYnJpZ2h0J10sXG4gIG5vbmU6IFsnQ2hvb3NlIHdobyB5b3UgYXJlJywgJycsICcnLCAnJywgJycsICcnXSxcbn07XG5cbi8qIC0tLS0gcm9sZS1zcGVjaWZpYyByYXRpbmcgaW5zdHJ1bWVudHMgKHIgPSAwLi41KSAtLS0tICovXG5mdW5jdGlvbiBQdWxzZUdhdWdlKHsgciB9KSB7XG4gIGNvbnN0IGFuZyA9IC05MCArIChyID8gKHIgLSAzKSAqIDM0IDogLTgwKTtcbiAgY29uc3QgYW1wID0gNiArIHIgKiA3O1xuICBjb25zdCBzZWcgPSAoaSkgPT4ge1xuICAgIGNvbnN0IGEwID0gTWF0aC5QSSAqICgxICsgaSAvIDUpICsgMC4wMywgYTEgPSBNYXRoLlBJICogKDEgKyAoaSArIDEpIC8gNSkgLSAwLjAzO1xuICAgIGNvbnN0IFAgPSAoYSwgUikgPT4gWzEyMCArIFIgKiBNYXRoLmNvcyhhKSwgMTI4ICsgUiAqIE1hdGguc2luKGEpXS5tYXAoKG4pID0+IG4udG9GaXhlZCgxKSkuam9pbignICcpO1xuICAgIHJldHVybiBgTSR7UChhMCwgOTYpfSBBOTYgOTYgMCAwIDEgJHtQKGExLCA5Nil9IEwke1AoYTEsIDcwKX0gQTcwIDcwIDAgMCAwICR7UChhMCwgNzApfSBaYDtcbiAgfTtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQwIDIwMFwiIGNsYXNzTmFtZT1cInJpIHJpLWdhdWdlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICB7WzAsIDEsIDIsIDMsIDRdLm1hcCgoaSkgPT4gPHBhdGgga2V5PXtpfSBkPXtzZWcoaSl9IGNsYXNzTmFtZT17YHJnLXNlZyBzJHtpICsgMX0gJHtyID4gaSA/ICdvbicgOiAnJ31gfSAvPil9XG4gICAgICA8ZyBjbGFzc05hbWU9XCJyZy1uZWVkbGVcIiBzdHlsZT17eyB0cmFuc2Zvcm06IGByb3RhdGUoJHthbmd9ZGVnKWAgfX0+PHBhdGggZD1cIk0xMTcgMTI4IEwxMjAgNDQgTDEyMyAxMjggWlwiIC8+PGNpcmNsZSBjeD1cIjEyMFwiIGN5PVwiMTI4XCIgcj1cIjEwXCIgLz48L2c+XG4gICAgICA8dGV4dCB4PVwiMTIwXCIgeT1cIjExMlwiIHRleHRBbmNob3I9XCJtaWRkbGVcIiBjbGFzc05hbWU9XCJyZy12YWxcIj57ciB8fCAnXHUyMDEzJ308dHNwYW4gY2xhc3NOYW1lPVwicmctb2ZcIj4vNTwvdHNwYW4+PC90ZXh0PlxuICAgICAgPHBhdGggY2xhc3NOYW1lPVwicmctZWNnXCIgc3R5bGU9e3sgJy0tYW1wJzogYW1wIH19IGQ9e2BNMTAgMTc2IEg3MCBsOCAtJHthbXAgLyAyfSA4ICR7YW1wIC8gMn0gSDEwMCBsNiAtJHthbXB9IDggJHthbXAgKiAxLjh9IDggLSR7YW1wICogMS4xfSA2ICR7YW1wICogMC4zfSBIMTYwIGw4IC0ke2FtcCAvIDN9IDggJHthbXAgLyAzfSBIMjMwYH0gcGF0aExlbmd0aD1cIjEwMFwiIC8+XG4gICAgPC9zdmc+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEhlYXJ0RmlsbCh7IHIgfSkge1xuICBjb25zdCBsZXZlbCA9IDE2OCAtIHIgKiAzMDtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjIwIDIwMFwiIGNsYXNzTmFtZT1cInJpIHJpLWhlYXJ0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICA8ZGVmcz5cbiAgICAgICAgPGNsaXBQYXRoIGlkPVwicmgtY2xpcFwiPjxwYXRoIGQ9XCJNMTEwIDE4MkM0MCAxMzIgMTQgMTA0IDE0IDY2IDE0IDM2IDM4IDE0IDY2IDE0YzIwIDAgMzYgMTAgNDQgMjYgOC0xNiAyNC0yNiA0NC0yNiAyOCAwIDUyIDIyIDUyIDUyIDAgMzgtMjYgNjYtOTYgMTE2elwiIC8+PC9jbGlwUGF0aD5cbiAgICAgIDwvZGVmcz5cbiAgICAgIDxwYXRoIGQ9XCJNMTEwIDE4MkM0MCAxMzIgMTQgMTA0IDE0IDY2IDE0IDM2IDM4IDE0IDY2IDE0YzIwIDAgMzYgMTAgNDQgMjYgOC0xNiAyNC0yNiA0NC0yNiAyOCAwIDUyIDIyIDUyIDUyIDAgMzgtMjYgNjYtOTYgMTE2elwiIGNsYXNzTmFtZT1cInJoLXNoZWxsXCIgLz5cbiAgICAgIDxnIGNsaXBQYXRoPVwidXJsKCNyaC1jbGlwKVwiPlxuICAgICAgICA8ZyBjbGFzc05hbWU9XCJyaC1saXF1aWRcIiBzdHlsZT17eyB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7bGV2ZWx9cHgpYCB9fT5cbiAgICAgICAgICA8cGF0aCBjbGFzc05hbWU9XCJyaC13YXZlXCIgZD1cIk0tNDAgNiBRLTIwIC02IDAgNiBUNDAgNiBUODAgNiBUMTIwIDYgVDE2MCA2IFQyMDAgNiBUMjQwIDYgVDI4MCA2IFYyMjAgSC00MHpcIiAvPlxuICAgICAgICAgIDxwYXRoIGNsYXNzTmFtZT1cInJoLXdhdmUgYlwiIGQ9XCJNLTQwIDEwIFEtMjAgMCAwIDEwIFQ0MCAxMCBUODAgMTAgVDEyMCAxMCBUMTYwIDEwIFQyMDAgMTAgVDI0MCAxMCBUMjgwIDEwIFYyMjAgSC00MHpcIiAvPlxuICAgICAgICA8L2c+XG4gICAgICAgIHtyID49IDMgJiYgWzAsIDEsIDIsIDNdLm1hcCgoaSkgPT4gPGNpcmNsZSBrZXk9e2l9IGNsYXNzTmFtZT1cInJoLWJ1YlwiIHN0eWxlPXt7ICctLWknOiBpIH19IGN4PXs3MCArIGkgKiAyNn0gY3k9XCIxNzBcIiByPXszICsgKGkgJSAyKSAqIDJ9IC8+KX1cbiAgICAgIDwvZz5cbiAgICAgIDxwYXRoIGQ9XCJNMTEwIDE4MkM0MCAxMzIgMTQgMTA0IDE0IDY2IDE0IDM2IDM4IDE0IDY2IDE0YzIwIDAgMzYgMTAgNDQgMjYgOC0xNiAyNC0yNiA0NC0yNiAyOCAwIDUyIDIyIDUyIDUyIDAgMzgtMjYgNjYtOTYgMTE2elwiIGNsYXNzTmFtZT1cInJoLW91dGxpbmVcIiAvPlxuICAgICAgPHBhdGggZD1cIk00NCA1MmM0LTEyIDE0LTIwIDI2LTIwXCIgY2xhc3NOYW1lPVwicmgtZ2xvc3NcIiAvPlxuICAgICAgPHRleHQgeD1cIjExMFwiIHk9XCIxMDRcIiB0ZXh0QW5jaG9yPVwibWlkZGxlXCIgY2xhc3NOYW1lPVwicmgtcGN0XCI+e3IgKiAyMH0lPC90ZXh0PlxuICAgIDwvc3ZnPlxuICApO1xufVxuXG5mdW5jdGlvbiBTdW5yaXNlKHsgciB9KSB7XG4gIGNvbnN0IGN4ID0gMzQgKyByICogMzQsIGN5ID0gMTUwIC0gciAqIDIyO1xuICByZXR1cm4gKFxuICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNDAgMjAwXCIgY2xhc3NOYW1lPXtgcmkgcmktc3VuIHNreS0ke3J9YH0gYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICA8cmVjdCB4PVwiMFwiIHk9XCIwXCIgd2lkdGg9XCIyNDBcIiBoZWlnaHQ9XCIyMDBcIiByeD1cIjI0XCIgY2xhc3NOYW1lPVwicnMtc2t5XCIgLz5cbiAgICAgIDxnIGNsYXNzTmFtZT1cInJzLXN1bndyYXBcIiBzdHlsZT17eyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtjeH1weCwgJHtjeX1weClgIH19PlxuICAgICAgICA8ZyBjbGFzc05hbWU9XCJycy1yYXlzXCI+e0FycmF5LmZyb20oeyBsZW5ndGg6IDEyIH0pLm1hcCgoXywgaSkgPT4gPHJlY3Qga2V5PXtpfSB4PVwiLTJcIiB5PVwiLTQwXCIgd2lkdGg9XCI0XCIgaGVpZ2h0PVwiMTJcIiByeD1cIjJcIiB0cmFuc2Zvcm09e2Byb3RhdGUoJHtpICogMzB9KWB9IC8+KX08L2c+XG4gICAgICAgIDxjaXJjbGUgcj1cIjIyXCIgY2xhc3NOYW1lPVwicnMtc3VuXCIgLz5cbiAgICAgIDwvZz5cbiAgICAgIHtyIDw9IDIgJiYgPGcgY2xhc3NOYW1lPVwicnMtcmFpblwiPntBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9KS5tYXAoKF8sIGkpID0+IDxsaW5lIGtleT17aX0geDE9ezIwICsgaSAqIDIyfSB5MT1cIjQwXCIgeDI9ezE0ICsgaSAqIDIyfSB5Mj1cIjU2XCIgc3R5bGU9e3sgJy0taSc6IGkgfX0gLz4pfTwvZz59XG4gICAgICA8ZyBjbGFzc05hbWU9XCJycy1jbG91ZCBjMVwiIHN0eWxlPXt7IG9wYWNpdHk6IHIgPj0gNSA/IDAgOiAxIH19PjxlbGxpcHNlIGN4PVwiNjBcIiBjeT1cIjQ4XCIgcng9XCIzMFwiIHJ5PVwiMTRcIiAvPjxlbGxpcHNlIGN4PVwiODBcIiBjeT1cIjQwXCIgcng9XCIyMFwiIHJ5PVwiMTRcIiAvPjwvZz5cbiAgICAgIDxnIGNsYXNzTmFtZT1cInJzLWNsb3VkIGMyXCIgc3R5bGU9e3sgb3BhY2l0eTogciA+PSA0ID8gMCA6IDEgfX0+PGVsbGlwc2UgY3g9XCIxNzBcIiBjeT1cIjMwXCIgcng9XCIyOFwiIHJ5PVwiMTJcIiAvPjxlbGxpcHNlIGN4PVwiMTg4XCIgY3k9XCIyNFwiIHJ4PVwiMTZcIiByeT1cIjEwXCIgLz48L2c+XG4gICAgICB7ciA+PSA0ICYmIDxnIGNsYXNzTmFtZT1cInJzLWJpcmRzXCI+PHBhdGggZD1cIk0xNTAgNzBxNi02IDEyIDBxNi02IDEyIDBcIiAvPjxwYXRoIGQ9XCJNMTc2IDU2cTUtNSAxMCAwcTUtNSAxMCAwXCIgLz48L2c+fVxuICAgICAgPHBhdGggZD1cIk0wIDE2MCBRNTAgMTIwIDEwMCAxNTAgVDIwMCAxNDAgVDI0MCAxNTAgVjIwMCBIMHpcIiBjbGFzc05hbWU9XCJycy1oaWxsIGgxXCIgLz5cbiAgICAgIDxwYXRoIGQ9XCJNMCAxNzYgUTcwIDE0NiAxMzAgMTcwIFQyNDAgMTY2IFYyMDAgSDB6XCIgY2xhc3NOYW1lPVwicnMtaGlsbCBoMlwiIC8+XG4gICAgPC9zdmc+XG4gICk7XG59XG5jb25zdCBJTlNUUlVNRU5UID0geyBoY3A6IFB1bHNlR2F1Z2UsIGNhcmVnaXZlcjogSGVhcnRGaWxsLCBwYXRpZW50OiBTdW5yaXNlIH07XG5cbmNvbnN0IEVNUFRZID0geyBmaXJzdE5hbWU6ICcnLCBsYXN0TmFtZTogJycsIGVtYWlsOiAnJywgcGhvbmU6ICcnLCBwaG9uZUNjOiAnaW4nLCBjb21wYW55OiAnJywgZGVzaWduYXRpb246ICcnLCBjb3VudHJ5OiAnJywgcm9sZTogJycsIHJhdGluZzogMCwgdGV4dDogJycgfTtcblxuZXhwb3J0IGNvbnN0IG9wZW5SYXRlRXhwZXJpZW5jZSA9ICgpID0+IHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbWhvLW9wZW4tcmF0ZScpKTtcblxuLyoqIHN1cHByZXNzZWQ6IGhpZGUgdGhlIHRhYiBhbmQgc2tpcCBhdXRvLXByb21wdHMgKHVzZWQgb24gdGhlIHNpZ24tdXAgYW5kIGxvZy1pbiBwYWdlcykuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSYXRlRXhwZXJpZW5jZSh7IHN1cHByZXNzZWQgPSBmYWxzZSB9KSB7XG4gIGNvbnN0IHN1cHByZXNzZWRSZWYgPSB1c2VSZWYoc3VwcHJlc3NlZCk7XG4gIHN1cHByZXNzZWRSZWYuY3VycmVudCA9IHN1cHByZXNzZWQ7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2YsIHNldEZdID0gdXNlU3RhdGUoRU1QVFkpO1xuICBjb25zdCBbZXJyLCBzZXRFcnJdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbaG92ZXJSLCBzZXRIb3ZlclJdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzdGVwLCBzZXRTdGVwXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKCdmb3JtJyk7IC8vIGZvcm0gfCBzZW5kaW5nIHwgZG9uZVxuICBjb25zdCBbc3VibWl0RXJyLCBzZXRTdWJtaXRFcnJdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBkaWFsb2cgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGxhc3RGb2N1cyA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCBzZXQgPSAoaykgPT4gKHYpID0+IHsgc2V0RigocykgPT4gKHsgLi4ucywgW2tdOiB2ICYmIHYudGFyZ2V0ID8gdi50YXJnZXQudmFsdWUgOiB2IH0pKTsgc2V0RXJyKChlKSA9PiAoZVtrXSA/IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhlKS5maWx0ZXIoKFt4XSkgPT4geCAhPT0gaykpIDogZSkpOyB9O1xuXG4gIC8vIEdlbnRsZSBhdXRvLXByb21wdFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChzdG9yZS5nZXQoJ21oby1yZXZpZXdlZCcpKSByZXR1cm47XG4gICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIGxldCBtYXhTY3JvbGwgPSAwO1xuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgICAgY29uc3QgaCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICBpZiAoaCA+IDApIG1heFNjcm9sbCA9IE1hdGgubWF4KG1heFNjcm9sbCwgd2luZG93LnNjcm9sbFkgLyBoKTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY29uc3Qgc2hvd24gPSBzZXNzaW9uLmdldCgnbWhvLXJhdGUtc2hvd24nLCAwKTtcbiAgICAgIGNvbnN0IGxhc3QgPSBzZXNzaW9uLmdldCgnbWhvLXJhdGUtbGFzdCcsIDApO1xuICAgICAgY29uc3QgZWxhcHNlZCA9IChEYXRlLm5vdygpIC0gc3RhcnQpIC8gMTAwMDtcbiAgICAgIGNvbnN0IGJ1c3kgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LW9wZW4nKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhdC13aW4uaXMtb3BlbicpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC5pcy1vcGVuJyk7XG4gICAgICBpZiAoc3RvcmUuZ2V0KCdtaG8tcmV2aWV3ZWQnKSB8fCBzaG93biA+PSAzIHx8IGJ1c3kgfHwgc3VwcHJlc3NlZFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICBjb25zdCByZWFkeSA9IHNob3duID09PSAwID8gKGVsYXBzZWQgPiA0NSAmJiBtYXhTY3JvbGwgPiAwLjQpIHx8IGVsYXBzZWQgPiA4MCA6IERhdGUubm93KCkgLSBsYXN0ID4gNCAqIDYwICogMTAwMDtcbiAgICAgIGlmIChyZWFkeSkge1xuICAgICAgICBzZXNzaW9uLnNldCgnbWhvLXJhdGUtc2hvd24nLCBzaG93biArIDEpO1xuICAgICAgICBzZXNzaW9uLnNldCgnbWhvLXJhdGUtbGFzdCcsIERhdGUubm93KCkpO1xuICAgICAgICBvcGVuTW9kYWwoJ2F1dG8nKTtcbiAgICAgIH1cbiAgICB9LCA1MDAwKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwpO1xuICAgIH07XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvbk9wZW4gPSAoKSA9PiBvcGVuTW9kYWwoJ2xpbmsnKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWhvLW9wZW4tcmF0ZScsIG9uT3Blbik7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtaG8tb3Blbi1yYXRlJywgb25PcGVuKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIH0sIFtdKTtcblxuICBjb25zdCBvcGVuTW9kYWwgPSAoc3JjID0gJ3RhYicpID0+IHtcbiAgICBsYXN0Rm9jdXMuY3VycmVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgc2V0T3Blbih0cnVlKTtcbiAgICBzZXRTdGF0ZSgocykgPT4gKHMgPT09ICdkb25lJyA/ICdkb25lJyA6ICdmb3JtJykpO1xuICAgIHBvcCgwLjEpO1xuICAgIHRyYWNrKCdyZXZpZXdfcHJvbXB0X29wZW4nLCB7IHNvdXJjZTogc3JjIH0pO1xuICB9O1xuICBjb25zdCBjbG9zZSA9ICgpID0+IHtcbiAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICBzZXNzaW9uLnNldCgnbWhvLXJhdGUtbGFzdCcsIERhdGUubm93KCkpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gbGFzdEZvY3VzLmN1cnJlbnQ/LmZvY3VzPy4oKSwgNTApO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvcGVuKSByZXR1cm47XG4gICAgY29uc3Qgb25LZXkgPSAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgY2xvc2UoKTtcbiAgICAgIGlmIChlLmtleSA9PT0gJ1RhYicgJiYgZGlhbG9nLmN1cnJlbnQpIHtcbiAgICAgICAgY29uc3QgZWxzID0gZGlhbG9nLmN1cnJlbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uLCBpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYVtocmVmXScpO1xuICAgICAgICBjb25zdCBmaXJzdCA9IGVsc1swXSwgbGFzdCA9IGVsc1tlbHMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChlLnNoaWZ0S2V5ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGZpcnN0KSB7IGUucHJldmVudERlZmF1bHQoKTsgbGFzdC5mb2N1cygpOyB9XG4gICAgICAgIGVsc2UgaWYgKCFlLnNoaWZ0S2V5ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGxhc3QpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBmaXJzdC5mb2N1cygpOyB9XG4gICAgICB9XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXkpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gZGlhbG9nLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoJy5yai1yb2xlIGlucHV0LCAucmotcmF0ZSBidXR0b24nKT8uZm9jdXMoKSwgODApO1xuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXkpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW29wZW5dKTtcblxuICBjb25zdCB2YWxpZGF0ZSA9IChvbmx5KSA9PiB7XG4gICAgY29uc3QgZSA9IHt9O1xuICAgIGlmICghZi5yYXRpbmcpIGUucmF0aW5nID0gJ1BpY2sgYSBmYWNlIHRvIHJhdGUgeW91ciBleHBlcmllbmNlLic7XG4gICAgY29uc3QgZm4gPSB2YWxpZGF0ZU5hbWUoZi5maXJzdE5hbWUsICdmaXJzdCBuYW1lJyk7XG4gICAgaWYgKGZuKSBlLmZpcnN0TmFtZSA9IGZuO1xuICAgIGNvbnN0IGxuID0gdmFsaWRhdGVOYW1lKGYubGFzdE5hbWUsICdsYXN0IG5hbWUnLCBmYWxzZSk7XG4gICAgaWYgKGxuKSBlLmxhc3ROYW1lID0gbG47XG4gICAgY29uc3QgZW0gPSB2YWxpZGF0ZUVtYWlsKGYuZW1haWwpO1xuICAgIGlmIChlbSkgZS5lbWFpbCA9IGVtO1xuICAgIGlmICghZi5jb21wYW55LnRyaW0oKSkgZS5jb21wYW55ID0gJ1BsZWFzZSBlbnRlciB5b3VyIGNvbXBhbnkgb3Igb3JnYW5pc2F0aW9uLic7XG4gICAgaWYgKCFmLmRlc2lnbmF0aW9uLnRyaW0oKSkgZS5kZXNpZ25hdGlvbiA9ICdQbGVhc2UgZW50ZXIgeW91ciBkZXNpZ25hdGlvbi4nO1xuICAgIGlmICghZi5jb3VudHJ5KSBlLmNvdW50cnkgPSAnUGxlYXNlIGNob29zZSB5b3VyIGNvdW50cnkuJztcbiAgICBpZiAoIWYucm9sZSkgZS5yb2xlID0gJ1RlbGwgdXMgd2hpY2ggbWVtYmVyIHR5cGUgeW91IGFyZS4nO1xuICAgIGlmIChmLnRleHQudHJpbSgpLmxlbmd0aCA8IDIwKSBlLnRleHQgPSAnUGxlYXNlIHdyaXRlIGF0IGxlYXN0IDIwIGNoYXJhY3RlcnMgc28gb3RoZXJzIGNhbiBsZWFybiBmcm9tIHlvdXIgcmV2aWV3Lic7XG4gICAgY29uc3QgcGggPSB2YWxpZGF0ZVBob25lKGYucGhvbmUsIGYucGhvbmVDYywgZmFsc2UpO1xuICAgIGlmIChwaCkgZS5waG9uZSA9IHBoO1xuICAgIGlmIChvbmx5ID09PSAwKSByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKGUpLmZpbHRlcigoW2tdKSA9PiBrID09PSAncm9sZScpKTtcbiAgICBpZiAob25seSA9PT0gMSkgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhlKS5maWx0ZXIoKFtrXSkgPT4gayA9PT0gJ3JhdGluZycpKTtcbiAgICBpZiAob25seSA9PT0gMikgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhlKS5maWx0ZXIoKFtrXSkgPT4gWydmaXJzdE5hbWUnLCAnbGFzdE5hbWUnLCAnZW1haWwnLCAnY29tcGFueScsICdkZXNpZ25hdGlvbicsICdjb3VudHJ5JywgJ3Bob25lJ10uaW5jbHVkZXMoaykpKTtcbiAgICByZXR1cm4gZTtcbiAgfTtcblxuICBjb25zdCBuZXh0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGUgPSB2YWxpZGF0ZShzdGVwKTtcbiAgICBzZXRFcnIoZSk7XG4gICAgaWYgKE9iamVjdC5rZXlzKGUpLmxlbmd0aCkgcmV0dXJuO1xuICAgIHBvcCgwLjA2KTtcbiAgICBzZXRTdGVwKCh4KSA9PiBNYXRoLm1pbih4ICsgMSwgMykpO1xuICB9O1xuXG4gIGNvbnN0IHN1Ym1pdCA9IGFzeW5jIChldikgPT4ge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHN0ZXAgPCAzKSByZXR1cm4gbmV4dCgpO1xuICAgIGNvbnN0IGUgPSB2YWxpZGF0ZSgpO1xuICAgIHNldEVycihlKTtcbiAgICBpZiAoT2JqZWN0LmtleXMoZSkubGVuZ3RoKSB7XG4gICAgICBpZiAoZS5yb2xlKSBzZXRTdGVwKDApO1xuICAgICAgZWxzZSBpZiAoZS5yYXRpbmcpIHNldFN0ZXAoMSk7XG4gICAgICBlbHNlIGlmICghZS50ZXh0KSBzZXRTdGVwKDIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRTdGF0ZSgnc2VuZGluZycpO1xuICAgIHNldFN1Ym1pdEVycignJyk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgc3VibWl0UmV2aWV3KHtcbiAgICAgIC4uLmYsXG4gICAgICBwaG9uZTogZi5waG9uZSA/IGAke2NvdW50cnlCeUNvZGUoZi5waG9uZUNjKT8uZGlhbCB8fCAnJ30gJHtmLnBob25lfWAgOiAnJyxcbiAgICAgIGNvdW50cnlOYW1lOiBjb3VudHJ5QnlDb2RlKGYuY291bnRyeSk/Lm5hbWUsXG4gICAgfSk7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIHNldFN0YXRlKCdmb3JtJyk7XG4gICAgICBzZXRTdWJtaXRFcnIocmVzLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzdG9yZS5zZXQoJ21oby1yZXZpZXdlZCcsIHRydWUpO1xuICAgIHRyYWNrKCdyZXZpZXdfc3VibWl0dGVkJywgeyByYXRpbmc6IGYucmF0aW5nLCByb2xlOiBmLnJvbGUgfSk7XG4gICAgc2V0U3RhdGUoJ2RvbmUnKTtcbiAgICBwb3AoMC4xNik7XG4gIH07XG5cbiAgY29uc3QgciA9IHN0ZXAgPT09IDEgPyBob3ZlclIgfHwgZi5yYXRpbmcgOiBmLnJhdGluZztcbiAgY29uc3Qgcm9sZSA9IFJPTEVTLmZpbmQoKHgpID0+IHguaWQgPT09IGYucm9sZSk7XG4gIGNvbnN0IG1vb2RzID0gTU9PRFNbZi5yb2xlIHx8ICdub25lJ107XG4gIGNvbnN0IEluc3RydW1lbnQgPSBJTlNUUlVNRU5UW2Yucm9sZV0gfHwgUHVsc2VHYXVnZTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7IXN1cHByZXNzZWQgJiYgKFxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInJhdGUtdGFiXCIgb25DbGljaz17KCkgPT4gb3Blbk1vZGFsKCd0YWInKX0gYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJhdGUtdGFiLXN0YXJzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICB7WzAsIDEsIDIsIDMsIDRdLm1hcCgoaSkgPT4gPEljb24ga2V5PXtpfSBuYW1lPVwic3RhclwiIHNpemU9ezEyfSBmaWxsPVwiY3VycmVudENvbG9yXCIgc3R5bGU9e3sgJy0taSc6IGkgfX0gLz4pfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyYXRlLXRhYi10ZXh0XCI+UmF0ZSB5b3VyIGV4cGVyaWVuY2U8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKX1cblxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Btb2RhbCByYXRlLW1vZGFsIHJqNCAke29wZW4gPyAnaXMtb3BlbicgOiAnJ31gfSBhcmlhLWhpZGRlbj17IW9wZW59IGluZXJ0PXshb3Blbn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYmFja2Ryb3BcIiBvbkNsaWNrPXtjbG9zZX0gLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2ByajQtZGlhbG9nIHItJHtyIHx8IDB9ICR7Zi5yb2xlID8gJ3JncmFkZS0nICsgZi5yb2xlIDogJ3JncmFkZS1ub25lJ31gfSByb2xlPVwiZGlhbG9nXCIgYXJpYS1tb2RhbD1cInRydWVcIiBhcmlhLWxhYmVsbGVkYnk9XCJyYXRlLXRpdGxlXCIgcmVmPXtkaWFsb2d9PlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwibW9kYWwteFwiIG9uQ2xpY2s9e2Nsb3NlfSBhcmlhLWxhYmVsPVwiQ2xvc2VcIj48SWNvbiBuYW1lPVwieFwiIHNpemU9ezIwfSAvPjwvYnV0dG9uPlxuXG4gICAgICAgICAgey8qIExlZnQ6IHJvbGUtc3BlY2lmaWMgYW5pbWF0ZWQgaW5zdHJ1bWVudCAqL31cbiAgICAgICAgICA8YXNpZGUgY2xhc3NOYW1lPVwicmo0LXN0YWdlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyanMtZ2xvd1wiIC8+XG4gICAgICAgICAgICB7Zi5yb2xlID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJqcy1pbnN0XCIga2V5PXtmLnJvbGV9PlxuICAgICAgICAgICAgICAgIDxJbnN0cnVtZW50IHI9e3J9IC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmpzLW1vb2RcIj57bW9vZHNbcl19PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmpzLXRyaW9cIj5cbiAgICAgICAgICAgICAgICB7Uk9MRVMubWFwKChybywgaSkgPT4gPHNwYW4ga2V5PXtyby5pZH0gY2xhc3NOYW1lPXtgcmpzLW9yYiB0LSR7cm8uaWR9YH0gc3R5bGU9e3sgJy0taSc6IGkgfX0+PEljb24gbmFtZT17cm8uaWNvbn0gc2l6ZT17MjZ9IC8+PC9zcGFuPil9XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmpzLW1vb2RcIj5Zb3VyIHZvaWNlLCA2MCBzZWNvbmRzPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7c3RlcCA+PSAyICYmIHN0YXRlICE9PSAnZG9uZScgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJqcy1wcmV2aWV3XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmpwLXRvcFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmpwLWF2XCI+eyhmLmZpcnN0TmFtZSB8fCAnPycpLnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmpwLXdob1wiPjxiPntmLmZpcnN0TmFtZSB8fCAnWW91ciBuYW1lJ30ge2YubGFzdE5hbWUgPyBmLmxhc3ROYW1lWzBdICsgJy4nIDogJyd9PC9iPjxzbWFsbD57W2YuZGVzaWduYXRpb24sIGYuY29tcGFueV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywgJykgfHwgJ1lvdXIgZGVzaWduYXRpb24nfTwvc21hbGw+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAge2YuY291bnRyeSAmJiA8RmxhZyBjb2RlPXtmLmNvdW50cnl9IHNpemU9ezIyfSAvPn1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmpwLXN0YXJzXCI+e1sxLCAyLCAzLCA0LCA1XS5tYXAoKG4pID0+IDxJY29uIGtleT17bn0gbmFtZT1cInN0YXJcIiBzaXplPXsxM30gZmlsbD17biA8PSBmLnJhdGluZyA/ICdjdXJyZW50Q29sb3InIDogJ25vbmUnfSAvPil9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxwPntmLnRleHQgfHwgJ1lvdXIgcmV2aWV3IGFwcGVhcnMgaGVyZSBhcyB5b3UgdHlwZVx1MjAyNid9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9hc2lkZT5cblxuICAgICAgICAgIHsvKiBSaWdodDogZm9ybSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJqNC1tYWluXCI+XG4gICAgICAgICAgICB7c3RhdGUgPT09ICdkb25lJyA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyai1kb25lXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZC1idXJzdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPntBcnJheS5mcm9tKHsgbGVuZ3RoOiAxNiB9KS5tYXAoKF8sIGkpID0+IDxpIGtleT17aX0gc3R5bGU9e3sgJy0taSc6IGkgfX0gLz4pfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJqZC1iYWRnZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxJY29uIG5hbWU9XCJjaGVja1wiIHNpemU9ezMwfSBzdHJva2U9ezN9IC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxoMiBpZD1cInJhdGUtdGl0bGVcIj5UaGFuayB5b3UsIHtmLmZpcnN0TmFtZSB8fCAnZnJpZW5kJ30hPC9oMj5cbiAgICAgICAgICAgICAgICA8cD5Zb3VyIHJldmlldyBzaG93cyBpbiB0aGUgbWVtYmVyIHZvaWNlcyBvbiB0aGlzIGRldmljZSBzdHJhaWdodCBhd2F5LCBhbmQgZm9yIGV2ZXJ5b25lIG9uY2Ugb3VyIHRlYW0gaGFzIGFwcHJvdmVkIGl0LjwvcD5cbiAgICAgICAgICAgICAgICA8TGluayB0bz1cIi9yZXZpZXdzXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17Y2xvc2V9PjxzcGFuIGNsYXNzTmFtZT1cImJ0bi1sYWJlbFwiPlNlZSBtZW1iZXIgcmV2aWV3czwvc3Bhbj48SWNvbiBuYW1lPVwiYXJyb3dcIiBzaXplPXsxOH0gLz48L0xpbms+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3N1Ym1pdH0gbm9WYWxpZGF0ZT5cbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInJqNC1oZWFkXCI+XG4gICAgICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwicmo0LXN0ZXBzXCIgYXJpYS1sYWJlbD1cIlByb2dyZXNzXCI+XG4gICAgICAgICAgICAgICAgICAgIHtTVEVQUy5tYXAoKHN0LCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17c3R9IGNsYXNzTmFtZT17aSA9PT0gc3RlcCA/ICdvbicgOiBpIDwgc3RlcCA/ICdkb25lJyA6ICcnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IGkgPCBzdGVwICYmIHNldFN0ZXAoaSl9IGRpc2FibGVkPXtpID4gc3RlcH0gYXJpYS1sYWJlbD17YFN0ZXAgJHtpICsgMX06ICR7c3R9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntpIDwgc3RlcCA/IDxJY29uIG5hbWU9XCJjaGVja1wiIHNpemU9ezExfSBzdHJva2U9ezMuNX0gLz4gOiBpICsgMX08L3NwYW4+PGVtPntzdH08L2VtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L29sPlxuICAgICAgICAgICAgICAgICAgPGgyIGlkPVwicmF0ZS10aXRsZVwiPntzdGVwID09PSAwID8gJ1JhdGUgeW91ciBleHBlcmllbmNlJyA6IHN0ZXAgPT09IDEgPyAocm9sZSA/IHJvbGUuYXNrIDogJ1lvdXIgcmF0aW5nJykgOiBzdGVwID09PSAyID8gJ1dobyBzaG91bGQgd2UgY3JlZGl0PycgOiAnVGVsbCBvdGhlciBtZW1iZXJzIHdoYXQgaXRcdTIwMTlzIGxpa2UnfTwvaDI+XG4gICAgICAgICAgICAgICAgICA8cD57c3RlcCA9PT0gMCA/ICdGaXJzdCwgdGVsbCB1cyB3aG8geW91IGFyZS4gRWFjaCBtZW1iZXIgdHlwZSByYXRlcyB1cyBpbiBpdHMgb3duIHdheS4nIDogc3RlcCA9PT0gMSA/ICdUYXAgYSBsZXZlbCBmcm9tIDEgdG8gNS4nIDogc3RlcCA9PT0gMiA/ICdZb3VyIGVtYWlsIGFuZCBwaG9uZSBzdGF5IHByaXZhdGUuJyA6ICdBIGZldyBob25lc3QgbGluZXMgaGVscCBvdGhlciBtZW1iZXJzIGRlY2lkZS4nfTwvcD5cbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmo0LWJvZHlcIiBrZXk9e3N0ZXB9PlxuICAgICAgICAgICAgICAgICAge3N0ZXAgPT09IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPVwicmotcm9sZXM0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZCBjbGFzc05hbWU9XCJzci1vbmx5XCI+SSBhbSBhPC9sZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAge1JPTEVTLm1hcCgocm8pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBrZXk9e3JvLmlkfSBjbGFzc05hbWU9e2Byai1yb2xlNCB0LSR7cm8uaWR9ICR7Zi5yb2xlID09PSByby5pZCA/ICdvbicgOiAnJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJyYXRlLXJvbGVcIiB2YWx1ZT17cm8uaWR9IGNoZWNrZWQ9e2Yucm9sZSA9PT0gcm8uaWR9IG9uQ2hhbmdlPXsoKSA9PiBzZXQoJ3JvbGUnKShyby5pZCl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJyLWljXCI+PEljb24gbmFtZT17cm8uaWNvbn0gc2l6ZT17MjJ9IC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyci10XCI+PGI+e3JvLmxhYmVsfTwvYj48c21hbGw+e3JvLnN1Yn08L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicnItdGlja1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxJY29uIG5hbWU9XCJjaGVja1wiIHNpemU9ezE0fSBzdHJva2U9ezN9IC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICB7ZXJyLnJvbGUgJiYgPHAgY2xhc3NOYW1lPVwiZmllbGQtZXJyb3JcIiByb2xlPVwiYWxlcnRcIj48SWNvbiBuYW1lPVwiaW5mb1wiIHNpemU9ezE0fSAvPiB7ZXJyLnJvbGV9PC9wPn1cbiAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgIHtzdGVwID09PSAxICYmIChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJqLXJhdGVcIiByb2xlPVwicmFkaW9ncm91cFwiIGFyaWEtbGFiZWw9XCJZb3VyIHJhdGluZ1wiIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXJSKDApfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtbMSwgMiwgMywgNCwgNV0ubWFwKChuKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e2YucmF0aW5nID09PSBufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2Ake259IG91dCBvZiA1OiAke21vb2RzW25dfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcnItYnRuICR7biA9PT0gZi5yYXRpbmcgPyAnb24nIDogJyd9ICR7biA8PSByID8gJ2xpdCcgOiAnJ31gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7ICctLW4nOiBuIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRIb3ZlclIobil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4gc2V0SG92ZXJSKG4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17KCkgPT4gc2V0SG92ZXJSKDApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgc2V0KCdyYXRpbmcnKShuKTsgcG9wKDAuMDUgKyBuICogMC4wMSk7IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJycmItaWNcIj48SWNvbiBuYW1lPXtmLnJvbGUgPT09ICdoY3AnID8gJ3B1bHNlJyA6IGYucm9sZSA9PT0gJ2NhcmVnaXZlcicgPyAnaGVhcnQnIDogJ3N1bid9IHNpemU9ezE4fSBmaWxsPXtmLnJvbGUgPT09ICdjYXJlZ2l2ZXInICYmIG4gPD0gciA/ICdjdXJyZW50Q29sb3InIDogJ25vbmUnfSAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Yj57bn08L2I+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicmotbW9vZDRcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj57bW9vZHNbcl19PC9wPlxuICAgICAgICAgICAgICAgICAgICAgIHtlcnIucmF0aW5nICYmIDxwIGNsYXNzTmFtZT1cImZpZWxkLWVycm9yXCIgcm9sZT1cImFsZXJ0XCI+PEljb24gbmFtZT1cImluZm9cIiBzaXplPXsxNH0gLz4ge2Vyci5yYXRpbmd9PC9wPn1cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICB7c3RlcCA9PT0gMiAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmotZmllbGRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiRmlyc3QgbmFtZVwiIHJlcXVpcmVkIGh0bWxGb3I9XCJydi1mblwiIGVycm9yPXtlcnIuZmlyc3ROYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwicnYtZm5cIiB2YWx1ZT17Zi5maXJzdE5hbWV9IG9uQ2hhbmdlPXtzZXQoJ2ZpcnN0TmFtZScpfSBhdXRvQ29tcGxldGU9XCJnaXZlbi1uYW1lXCIgYXJpYS1pbnZhbGlkPXshIWVyci5maXJzdE5hbWV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiTGFzdCBuYW1lXCIgaHRtbEZvcj1cInJ2LWxuXCIgZXJyb3I9e2Vyci5sYXN0TmFtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInJ2LWxuXCIgdmFsdWU9e2YubGFzdE5hbWV9IG9uQ2hhbmdlPXtzZXQoJ2xhc3ROYW1lJyl9IGF1dG9Db21wbGV0ZT1cImZhbWlseS1uYW1lXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiRW1haWxcIiByZXF1aXJlZCBodG1sRm9yPVwicnYtZW1cIiBlcnJvcj17ZXJyLmVtYWlsfSBoaW50PVwiTmV2ZXIgc2hvd24gcHVibGljbHkuXCIgaWNvbj1cIm1haWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInJ2LWVtXCIgdHlwZT1cImVtYWlsXCIgdmFsdWU9e2YuZW1haWx9IG9uQ2hhbmdlPXtzZXQoJ2VtYWlsJyl9IGF1dG9Db21wbGV0ZT1cImVtYWlsXCIgYXJpYS1pbnZhbGlkPXshIWVyci5lbWFpbH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIkNvbXBhbnkgbmFtZVwiIHJlcXVpcmVkIGh0bWxGb3I9XCJydi1jb1wiIGVycm9yPXtlcnIuY29tcGFueX0gaWNvbj1cImJ1aWxkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInJ2LWNvXCIgdmFsdWU9e2YuY29tcGFueX0gb25DaGFuZ2U9e3NldCgnY29tcGFueScpfSBhdXRvQ29tcGxldGU9XCJvcmdhbml6YXRpb25cIiBhcmlhLWludmFsaWQ9eyEhZXJyLmNvbXBhbnl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiRGVzaWduYXRpb25cIiByZXF1aXJlZCBodG1sRm9yPVwicnYtZGVcIiBlcnJvcj17ZXJyLmRlc2lnbmF0aW9ufSBpY29uPVwiYnJpZWZjYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInJ2LWRlXCIgdmFsdWU9e2YuZGVzaWduYXRpb259IG9uQ2hhbmdlPXtzZXQoJ2Rlc2lnbmF0aW9uJyl9IGF1dG9Db21wbGV0ZT1cIm9yZ2FuaXphdGlvbi10aXRsZVwiIGFyaWEtaW52YWxpZD17ISFlcnIuZGVzaWduYXRpb259IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIkNvdW50cnlcIiByZXF1aXJlZCBodG1sRm9yPVwicnYtY3RcIiBlcnJvcj17ZXJyLmNvdW50cnl9IGljb249XCJnbG9iZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q291bnRyeVNlbGVjdCBpZD1cInJ2LWN0XCIgdmFsdWU9e2YuY291bnRyeX0gb25DaGFuZ2U9eyhjKSA9PiB7IHNldEYoKHMpID0+ICh7IC4uLnMsIGNvdW50cnk6IGMsIHBob25lQ2M6IHMucGhvbmUgPyBzLnBob25lQ2MgOiBjIH0pKTsgc2V0RXJyKChlKSA9PiAoeyAuLi5lLCBjb3VudHJ5OiB1bmRlZmluZWQgfSkpOyB9fSBpbnZhbGlkPXshIWVyci5jb3VudHJ5fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZCBsYWJlbD1cIlBob25lIG51bWJlclwiIGh0bWxGb3I9XCJydi1waFwiIGVycm9yPXtlcnIucGhvbmV9IGljb249XCJwaG9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8UGhvbmVJbnB1dCBpZD1cInJ2LXBoXCIgY291bnRyeT17Zi5waG9uZUNjfSBvbkNvdW50cnk9e3NldCgncGhvbmVDYycpfSB2YWx1ZT17Zi5waG9uZX0gb25DaGFuZ2U9e3NldCgncGhvbmUnKX0gaW52YWxpZD17ISFlcnIucGhvbmV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgIHtzdGVwID09PSAzICYmIChcbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiWW91ciByZXZpZXdcIiByZXF1aXJlZCBodG1sRm9yPVwicnYtdHhcIiBlcnJvcj17ZXJyLnRleHR9PlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBpZD1cInJ2LXR4XCIgcm93cz17Nn0gdmFsdWU9e2YudGV4dH0gb25DaGFuZ2U9e3NldCgndGV4dCcpfSBtYXhMZW5ndGg9ezYwMH0gcGxhY2Vob2xkZXI9XCJXaGF0IGRpZCB5b3UgZW5qb3k/IFdoYXQgY291bGQgYmUgYmV0dGVyP1wiIGFyaWEtaW52YWxpZD17ISFlcnIudGV4dH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGFyLWNvdW50XCI+e2YudGV4dC5sZW5ndGh9LzYwMDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7c3VibWl0RXJyICYmIDxwIGNsYXNzTmFtZT1cImZvcm0tYWxlcnRcIiByb2xlPVwiYWxlcnRcIj57c3VibWl0RXJyfTwvcD59XG4gICAgICAgICAgICAgICAgPGZvb3RlciBjbGFzc05hbWU9XCJyai1mb290XCI+XG4gICAgICAgICAgICAgICAgICB7c3RlcCA+IDAgPyA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWdob3N0XCIgb25DbGljaz17KCkgPT4geyBzZXRFcnIoe30pOyBzZXRTdGVwKHN0ZXAgLSAxKTsgfX0+PEljb24gbmFtZT1cImFycm93TGVmdFwiIHNpemU9ezE4fSAvPjxzcGFuIGNsYXNzTmFtZT1cImJ0bi1sYWJlbFwiPkJhY2s8L3NwYW4+PC9idXR0b24+IDogPHNwYW4gY2xhc3NOYW1lPVwicmotcHJpdmFjeVwiPjxJY29uIG5hbWU9XCJsb2NrXCIgc2l6ZT17MTJ9IC8+IEVtYWlsIGFuZCBwaG9uZSBzdGF5IHByaXZhdGU8L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e3N0YXRlID09PSAnc2VuZGluZyd9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJidG4tbGFiZWxcIj57c3RlcCA8IDMgPyAnQ29udGludWUnIDogc3RhdGUgPT09ICdzZW5kaW5nJyA/ICdQdWJsaXNoaW5nXHUyMDI2JyA6ICdQdWJsaXNoIG15IHJldmlldyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPXtzdGVwIDwgMyA/ICdhcnJvdycgOiAnc2VuZCd9IHNpemU9ezE4fSAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUdBLG1CQUE0QztBQWlDVjtBQXhCbEMsSUFBTSxRQUFRO0FBQUEsRUFDWixFQUFFLElBQUksT0FBTyxPQUFPLDJCQUEyQixLQUFLLHlEQUFvRCxNQUFNLGVBQWUsS0FBSyxpQkFBaUI7QUFBQSxFQUNuSixFQUFFLElBQUksYUFBYSxPQUFPLGFBQWEsS0FBSyx5QkFBeUIsTUFBTSxTQUFTLEtBQUssaUJBQWlCO0FBQUEsRUFDMUcsRUFBRSxJQUFJLFdBQVcsT0FBTyxXQUFXLEtBQUssb0JBQW9CLE1BQU0sU0FBUyxLQUFLLGdCQUFnQjtBQUNsRztBQUNBLElBQU0sUUFBUSxDQUFDLE9BQU8sUUFBUSxhQUFhLFFBQVE7QUFDbkQsSUFBTSxRQUFRO0FBQUEsRUFDWixLQUFLLENBQUMsa0JBQWtCLFlBQVksY0FBYyxVQUFVLFVBQVUsV0FBVztBQUFBLEVBQ2pGLFdBQVcsQ0FBQyxnQkFBZ0Isb0JBQW9CLGdCQUFnQixhQUFhLFFBQVEsY0FBYztBQUFBLEVBQ25HLFNBQVMsQ0FBQyxnQkFBZ0IsVUFBVSxVQUFVLGVBQWUsU0FBUyxnQkFBZ0I7QUFBQSxFQUN0RixNQUFNLENBQUMsc0JBQXNCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUNqRDtBQUdBLFNBQVMsV0FBVyxFQUFFLEVBQUUsR0FBRztBQUN6QixRQUFNLE1BQU0sT0FBTyxLQUFLLElBQUksS0FBSyxLQUFLO0FBQ3RDLFFBQU0sTUFBTSxJQUFJLElBQUk7QUFDcEIsUUFBTSxNQUFNLENBQUMsTUFBTTtBQUNqQixVQUFNLEtBQUssS0FBSyxNQUFNLElBQUksSUFBSSxLQUFL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
