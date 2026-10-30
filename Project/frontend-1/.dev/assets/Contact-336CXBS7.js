import {
  Captcha,
  Field,
  PhoneInput
} from "/assets/chunk-JPU2CQJN.js";
import {
  postJSON,
  track,
  validateEmail,
  validateName,
  validatePhone
} from "/assets/chunk-NOWM46SW.js";
import {
  API,
  SITE,
  whatsappLink
} from "/assets/chunk-JWSEDBGW.js";
import {
  Persona
} from "/assets/chunk-53J6YGE2.js";
import {
  Breadcrumbs,
  Icon,
  Link,
  LiveZone,
  require_jsx_runtime,
  require_react,
  useMounted
} from "/assets/chunk-LANM2SZF.js";
import {
  countryByCode
} from "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/Contact.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var TOPICS = [
  ["user", "Joining & my account"],
  ["clipboard", "A survey I took"],
  ["coins", "Rewards & payouts"],
  ["lock", "Privacy & data"],
  ["briefcase", "Research partnership"],
  ["chat", "Something else"]
];
var CHANNELS = [
  { ic: "whatsapp", t: "WhatsApp", v: SITE.whatsappDisplay, href: whatsappLink(), c1: "#25d366", c2: "#0e9f6e", status: "Fastest replies", live: true },
  { ic: "mail", t: "Email", v: SITE.email, href: `mailto:${SITE.email}`, c1: "#2457f5", c2: "#8a4dff", status: "Screenshots welcome" },
  { ic: "call", t: "Phone", v: SITE.phoneDisplay, href: `tel:${SITE.phoneHref}`, c1: "#ff6a2c", c2: "#ef2d56", status: "Monday to Saturday" },
  { ic: "chat", t: "Live help", v: "Answers in seconds", href: null, c1: "#ffb020", c2: "#ff6a2c", status: "Open 24/7", live: true }
];
var EMPTY = { name: "", email: "", phone: "", cc: "in", topic: "", message: "", website: "" };
function DelhiClock() {
  const mounted = useMounted();
  const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
  (0, import_react.useEffect)(() => {
    const t = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(t);
  }, []);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, weekday: "long" }).formatToParts(now).map((p) => [p.type, p.value])
  );
  const h = Number(parts.hour) % 12, m = Number(parts.minute), s = Number(parts.second);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dclock", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 120 120", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "60", cy: "60", r: "56", className: "dc-face" }),
      Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "60", y1: "10", x2: "60", y2: i % 3 ? 16 : 20, transform: `rotate(${i * 30} 60 60)`, className: "dc-tick" }, i)),
      mounted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "60", y1: "60", x2: "60", y2: "32", className: "dc-h", transform: `rotate(${h * 30 + m / 2} 60 60)` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "60", y1: "60", x2: "60", y2: "20", className: "dc-m", transform: `rotate(${m * 6 + s / 10} 60 60)` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "60", y1: "66", x2: "60", y2: "16", className: "dc-s", transform: `rotate(${s * 6} 60 60)` })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "60", cy: "60", r: "4", className: "dc-pin" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Right now in New Delhi" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: mounted ? `${parts.hour}:${parts.minute}` : "--:--" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        mounted ? parts.weekday : "",
        " \xB7 our support team is based here"
      ] })
    ] })
  ] });
}
function Contact() {
  const [f, setF] = (0, import_react.useState)(EMPTY);
  const [err, setErr] = (0, import_react.useState)({});
  const [human, setHuman] = (0, import_react.useState)(false);
  const [capKey, setCapKey] = (0, import_react.useState)(0);
  const [state, setState] = (0, import_react.useState)("form");
  const [alert, setAlert] = (0, import_react.useState)("");
  const [focus, setFocus] = (0, import_react.useState)(false);
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v && v.target ? v.target.value : v }));
  const submit = async (e) => {
    e.preventDefault();
    const x = {};
    const n = validateName(f.name, "name");
    if (n) x.name = n;
    const em = validateEmail(f.email);
    if (em) x.email = em;
    const ph = validatePhone(f.phone, f.cc, false);
    if (ph) x.phone = ph;
    if (!f.topic) x.topic = "Choose what your message is about.";
    if (f.message.trim().length < 15) x.message = "Add a little more detail (at least 15 characters).";
    if (!human) x.captcha = "Complete the human check.";
    setErr(x);
    if (Object.keys(x).length) return;
    if (f.website) return;
    setState("sending");
    setAlert("");
    const res = await postJSON(API.enquiry, {
      name: f.name.trim(),
      email: f.email.trim(),
      phone: f.phone ? `${countryByCode(f.cc)?.dial} ${f.phone}` : "",
      topic: f.topic,
      message: f.message.trim().slice(0, 2e3),
      source: "contact-page"
    });
    if (!res.ok) {
      setState("form");
      setAlert(res.data?.message || "Your message didn\u2019t go through. Try again, or reach us on WhatsApp or email.");
      setCapKey((k) => k + 1);
      return;
    }
    track("contact_submit", { topic: f.topic });
    setState("flying");
    setTimeout(() => setState("done"), 1500);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "c3-hero", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "c3-bg", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container c3-hero-in", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "c3-copy", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ to: "/", label: "Home" }, { label: "Contact" }] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { className: "hero-title", children: [
            "Contact MyHealthOpinions. ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "c3-hl", children: "A real person replies." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "c3-lead", children: "Questions about joining, a survey, your rewards or a research partnership? Pick the channel you like best. Most messages are answered within one working day, and the help assistant never sleeps." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DelhiClock, {})
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "c3-tiles", children: CHANNELS.map((c, i) => {
          const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "ct-ic", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: c.ic, size: 30 }),
              c.live && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "ct-live" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `ct-fx fx-${c.ic}`, "aria-hidden": "true", children: c.ic === "whatsapp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {})
            ] }) : c.ic === "mail" ? "1" : c.ic === "call" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: c.t }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ct-v", children: c.v }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dot" }),
              " ",
              c.status
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ct-go", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 16 }) })
          ] });
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { style: { "--c1": c.c1, "--c2": c.c2, "--i": i }, children: c.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { className: "ct", href: c.href, target: c.href.startsWith("http") ? "_blank" : void 0, rel: "noopener noreferrer", children: inner }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "ct", onClick: () => document.querySelector(".fab-chat")?.click(), children: inner }) }, c.t);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section c3-main", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container c3-grid", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `letter4 ${focus ? "is-open" : ""} ${state === "flying" ? "is-flying" : ""}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "l4-plane", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 2 2 9.5l7 3 3 7z" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 2 9 12.5" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "env3-letter l4-paper", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "l4-postmark", "aria-hidden": "true", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "MHO" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "New Delhi" })
          ] }),
          state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sent3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "s3-stamp", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 34, stroke: 3 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
              "Message delivered ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ticks", "aria-hidden": "true", children: "\u2713\u2713" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
              "Thanks, ",
              f.name.split(" ")[0],
              ". We\u2019ll reply to ",
              f.email,
              ", usually within one working day."
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn btn-ghost", onClick: () => {
              setF(EMPTY);
              setState("form");
              setHuman(false);
              setCapKey((k) => k + 1);
              setFocus(false);
            }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: "Write another message" }) })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: submit, noValidate: true, onFocus: () => setFocus(true), children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "l3-head", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "l3-av", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Persona, { kind: "nurse", skin: 4, hair: 1, hairStyle: 1, size: 44 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Write to us" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Dear MyHealthOpinions team\u2026" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "l3-stamp", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "heart", size: 20, fill: "currentColor", stroke: 1 }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { className: "t3-topics", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: [
                "What\u2019s it about? ",
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { "aria-hidden": "true", children: "*" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: TOPICS.map(([ic, t], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: f.topic === t ? "on" : "", style: { "--tc": ["#2457f5", "#00a88a", "#ff6a2c", "#8a4dff", "#0ea5e9", "#ef2d56"][i] }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "radio", name: "topic", value: t, checked: f.topic === t, onChange: () => set("topic")(t) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ic, size: 18 }),
                t
              ] }, t)) }),
              err.topic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "field-error", role: "alert", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "info", size: 14 }),
                " ",
                err.topic
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "form-row", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Full name", required: true, htmlFor: "ct-name", error: err.name, icon: "user", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "ct-name", value: f.name, onChange: set("name"), autoComplete: "name", "aria-invalid": !!err.name }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Email", required: true, htmlFor: "ct-email", error: err.email, icon: "mail", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "ct-email", type: "email", value: f.email, onChange: set("email"), autoComplete: "email", "aria-invalid": !!err.email }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Phone", htmlFor: "ct-phone", error: err.phone, icon: "phone", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneInput, { id: "ct-phone", country: f.cc, onCountry: set("cc"), value: f.phone, onChange: set("phone"), invalid: !!err.phone }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "Your message", required: true, htmlFor: "ct-msg", error: err.message, icon: "pen", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", { id: "ct-msg", rows: 5, value: f.message, onChange: set("message"), maxLength: 2e3, "aria-invalid": !!err.message, placeholder: "Tell us what happened. Please leave out passwords and medical record numbers." }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "hp", "aria-hidden": "true", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "ct-web", children: "Website" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id: "ct-web", tabIndex: -1, autoComplete: "off", value: f.website, onChange: set("website") })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captcha, { onChange: setHuman, invalid: !!err.captcha, resetKey: capKey }),
            err.captcha && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "field-error", role: "alert", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "info", size: 14 }),
              " ",
              err.captcha
            ] }),
            alert && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "form-alert", role: "alert", children: alert }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { className: "btn btn-primary btn-block", type: "submit", disabled: state !== "form", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: state === "sending" ? "Sending\u2026" : "Send my message" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "send", size: 18 })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "form-fine", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lock", size: 12 }),
              " We only use your details to reply. See our ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/privacy", children: "Privacy Policy" }),
              "."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { className: "c3-side", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "radar-map", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rm-grid", "aria-hidden": "true" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rm-sweep", "aria-hidden": "true" }),
          [0, 1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rm-ring", style: { "--i": i }, "aria-hidden": "true" }, i)),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rm-pin", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "pin", size: 34 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rm-label", children: "Mangolpur Kalan, New Delhi" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "c3-office", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Our office" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
            SITE.legalName,
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
            SITE.address.join(", ")
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { className: "text-link", href: "https://maps.google.com/?q=Mangolpur+Kalan+New+Delhi+110085", target: "_blank", rel: "noopener noreferrer", children: [
            "Open in Google Maps ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "external", size: 13 })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "c3-quick", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Faster than a message" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/faq", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "coins", size: 16 }),
              "When will I get paid?"
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/faq", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "filter", size: 16 }),
              "Why was I screened out?"
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/faq", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lock", size: 16 }),
              "How do I delete my account?"
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/rewards", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "wallet", size: 16 }),
              "Which payout options do I have?"
            ] }) })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Contact as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL0NvbnRhY3QuanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb250YWN0IFx1MjAxNCBcImhlbHAgZGVza1wiIGxheW91dDogdGhlIGhlcm8gaXRzZWxmIGlzIHRoZSBjaGFubmVsIHBpY2tlciAoZm91ciBhbmltYXRlZCBjaGFubmVsIHRpbGVzIFx1MjAxNFxuLy8gYSB0eXBpbmcgV2hhdHNBcHAgYnViYmxlLCBhIHJpbmdpbmcgcGhvbmUsIGEgbmV3LW1haWwgYmFkZ2UsIGEgbGl2ZS1oZWxwIHB1bHNlIFx1MjAxNCBhbmQgYSByZWFsLXRpbWVcbi8vIE5ldyBEZWxoaSBjbG9jaykuIFRoZSBmb3JtIGlzIGFuIGFpcm1haWwgbGV0dGVyOiB0b3BpYyBzdGFtcHMsIGEgcG9zdG1hcmssIGFuZCBvbiBzZW5kIGl0IGZvbGRzIGludG9cbi8vIGEgcGFwZXIgcGxhbmUgYW5kIGZsaWVzIG9mZiwgdGhlbiBzaG93cyBkZWxpdmVyZWQgdGlja3MuIEEgcmFkYXIgbWFwIHBpbnMgdGhlIG9mZmljZS5cbi8vIEVucXVpcmllcyBwb3N0IHRvIEFQSS5lbnF1aXJ5IChob3N0aW5nIGJhY2tlbmQsIHNlZSBSRUFETUUpLlxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBJY29uIGZyb20gJy4uL2NvbXBvbmVudHMvSWNvbi5qc3gnO1xuaW1wb3J0IFBlcnNvbmEgZnJvbSAnLi4vY29tcG9uZW50cy9QZXJzb25hLmpzeCc7XG5pbXBvcnQgeyBCcmVhZGNydW1icywgTGl2ZVpvbmUsIHVzZU1vdW50ZWQgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpLmpzeCc7XG5pbXBvcnQgeyBGaWVsZCwgUGhvbmVJbnB1dCwgQ2FwdGNoYSB9IGZyb20gJy4uL2NvbXBvbmVudHMvRm9ybUtpdC5qc3gnO1xuaW1wb3J0IHsgU0lURSwgd2hhdHNhcHBMaW5rLCBBUEkgfSBmcm9tICcuLi9jb25maWcvc2l0ZS5qcyc7XG5pbXBvcnQgeyB2YWxpZGF0ZUVtYWlsLCB2YWxpZGF0ZU5hbWUsIHZhbGlkYXRlUGhvbmUsIHBvc3RKU09OLCB0cmFjayB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgY291bnRyeUJ5Q29kZSB9IGZyb20gJy4uL2RhdGEvY291bnRyaWVzLmpzJztcbmltcG9ydCB7IExpbmsgfSBmcm9tICcuLi9yb3V0ZXIuanN4JztcblxuY29uc3QgVE9QSUNTID0gW1xuICBbJ3VzZXInLCAnSm9pbmluZyAmIG15IGFjY291bnQnXSxcbiAgWydjbGlwYm9hcmQnLCAnQSBzdXJ2ZXkgSSB0b29rJ10sXG4gIFsnY29pbnMnLCAnUmV3YXJkcyAmIHBheW91dHMnXSxcbiAgWydsb2NrJywgJ1ByaXZhY3kgJiBkYXRhJ10sXG4gIFsnYnJpZWZjYXNlJywgJ1Jlc2VhcmNoIHBhcnRuZXJzaGlwJ10sXG4gIFsnY2hhdCcsICdTb21ldGhpbmcgZWxzZSddLFxuXTtcblxuY29uc3QgQ0hBTk5FTFMgPSBbXG4gIHsgaWM6ICd3aGF0c2FwcCcsIHQ6ICdXaGF0c0FwcCcsIHY6IFNJVEUud2hhdHNhcHBEaXNwbGF5LCBocmVmOiB3aGF0c2FwcExpbmsoKSwgYzE6ICcjMjVkMzY2JywgYzI6ICcjMGU5ZjZlJywgc3RhdHVzOiAnRmFzdGVzdCByZXBsaWVzJywgbGl2ZTogdHJ1ZSB9LFxuICB7IGljOiAnbWFpbCcsIHQ6ICdFbWFpbCcsIHY6IFNJVEUuZW1haWwsIGhyZWY6IGBtYWlsdG86JHtTSVRFLmVtYWlsfWAsIGMxOiAnIzI0NTdmNScsIGMyOiAnIzhhNGRmZicsIHN0YXR1czogJ1NjcmVlbnNob3RzIHdlbGNvbWUnIH0sXG4gIHsgaWM6ICdjYWxsJywgdDogJ1Bob25lJywgdjogU0lURS5waG9uZURpc3BsYXksIGhyZWY6IGB0ZWw6JHtTSVRFLnBob25lSHJlZn1gLCBjMTogJyNmZjZhMmMnLCBjMjogJyNlZjJkNTYnLCBzdGF0dXM6ICdNb25kYXkgdG8gU2F0dXJkYXknIH0sXG4gIHsgaWM6ICdjaGF0JywgdDogJ0xpdmUgaGVscCcsIHY6ICdBbnN3ZXJzIGluIHNlY29uZHMnLCBocmVmOiBudWxsLCBjMTogJyNmZmIwMjAnLCBjMjogJyNmZjZhMmMnLCBzdGF0dXM6ICdPcGVuIDI0LzcnLCBsaXZlOiB0cnVlIH0sXG5dO1xuXG5jb25zdCBFTVBUWSA9IHsgbmFtZTogJycsIGVtYWlsOiAnJywgcGhvbmU6ICcnLCBjYzogJ2luJywgdG9waWM6ICcnLCBtZXNzYWdlOiAnJywgd2Vic2l0ZTogJycgfTtcblxuZnVuY3Rpb24gRGVsaGlDbG9jaygpIHtcbiAgY29uc3QgbW91bnRlZCA9IHVzZU1vdW50ZWQoKTtcbiAgY29uc3QgW25vdywgc2V0Tm93XSA9IHVzZVN0YXRlKCgpID0+IG5ldyBEYXRlKCkpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHQgPSBzZXRJbnRlcnZhbCgoKSA9PiBzZXROb3cobmV3IERhdGUoKSksIDEwMDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHQpO1xuICB9LCBbXSk7XG4gIGNvbnN0IHBhcnRzID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCdlbi1HQicsIHsgdGltZVpvbmU6ICdBc2lhL0tvbGthdGEnLCBob3VyOiAnMi1kaWdpdCcsIG1pbnV0ZTogJzItZGlnaXQnLCBzZWNvbmQ6ICcyLWRpZ2l0JywgaG91cjEyOiBmYWxzZSwgd2Vla2RheTogJ2xvbmcnIH0pXG4gICAgICAuZm9ybWF0VG9QYXJ0cyhub3cpXG4gICAgICAubWFwKChwKSA9PiBbcC50eXBlLCBwLnZhbHVlXSlcbiAgKTtcbiAgY29uc3QgaCA9IE51bWJlcihwYXJ0cy5ob3VyKSAlIDEyLCBtID0gTnVtYmVyKHBhcnRzLm1pbnV0ZSksIHMgPSBOdW1iZXIocGFydHMuc2Vjb25kKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImRjbG9ja1wiPlxuICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEyMCAxMjBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPGNpcmNsZSBjeD1cIjYwXCIgY3k9XCI2MFwiIHI9XCI1NlwiIGNsYXNzTmFtZT1cImRjLWZhY2VcIiAvPlxuICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogMTIgfSkubWFwKChfLCBpKSA9PiA8bGluZSBrZXk9e2l9IHgxPVwiNjBcIiB5MT1cIjEwXCIgeDI9XCI2MFwiIHkyPXtpICUgMyA/IDE2IDogMjB9IHRyYW5zZm9ybT17YHJvdGF0ZSgke2kgKiAzMH0gNjAgNjApYH0gY2xhc3NOYW1lPVwiZGMtdGlja1wiIC8+KX1cbiAgICAgICAge21vdW50ZWQgJiYgKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8bGluZSB4MT1cIjYwXCIgeTE9XCI2MFwiIHgyPVwiNjBcIiB5Mj1cIjMyXCIgY2xhc3NOYW1lPVwiZGMtaFwiIHRyYW5zZm9ybT17YHJvdGF0ZSgke2ggKiAzMCArIG0gLyAyfSA2MCA2MClgfSAvPlxuICAgICAgICAgICAgPGxpbmUgeDE9XCI2MFwiIHkxPVwiNjBcIiB4Mj1cIjYwXCIgeTI9XCIyMFwiIGNsYXNzTmFtZT1cImRjLW1cIiB0cmFuc2Zvcm09e2Byb3RhdGUoJHttICogNiArIHMgLyAxMH0gNjAgNjApYH0gLz5cbiAgICAgICAgICAgIDxsaW5lIHgxPVwiNjBcIiB5MT1cIjY2XCIgeDI9XCI2MFwiIHkyPVwiMTZcIiBjbGFzc05hbWU9XCJkYy1zXCIgdHJhbnNmb3JtPXtgcm90YXRlKCR7cyAqIDZ9IDYwIDYwKWB9IC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICAgIDxjaXJjbGUgY3g9XCI2MFwiIGN5PVwiNjBcIiByPVwiNFwiIGNsYXNzTmFtZT1cImRjLXBpblwiIC8+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxzbWFsbD5SaWdodCBub3cgaW4gTmV3IERlbGhpPC9zbWFsbD5cbiAgICAgICAgPGI+e21vdW50ZWQgPyBgJHtwYXJ0cy5ob3VyfToke3BhcnRzLm1pbnV0ZX1gIDogJy0tOi0tJ308L2I+XG4gICAgICAgIDxzcGFuPnttb3VudGVkID8gcGFydHMud2Vla2RheSA6ICcnfSBcdTAwQjcgb3VyIHN1cHBvcnQgdGVhbSBpcyBiYXNlZCBoZXJlPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbnRhY3QoKSB7XG4gIGNvbnN0IFtmLCBzZXRGXSA9IHVzZVN0YXRlKEVNUFRZKTtcbiAgY29uc3QgW2Vyciwgc2V0RXJyXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW2h1bWFuLCBzZXRIdW1hbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjYXBLZXksIHNldENhcEtleV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZSgnZm9ybScpO1xuICBjb25zdCBbYWxlcnQsIHNldEFsZXJ0XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2ZvY3VzLCBzZXRGb2N1c10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHNldCA9IChrKSA9PiAodikgPT4gc2V0RigocykgPT4gKHsgLi4ucywgW2tdOiB2ICYmIHYudGFyZ2V0ID8gdi50YXJnZXQudmFsdWUgOiB2IH0pKTtcblxuICBjb25zdCBzdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB4ID0ge307XG4gICAgY29uc3QgbiA9IHZhbGlkYXRlTmFtZShmLm5hbWUsICduYW1lJyk7IGlmIChuKSB4Lm5hbWUgPSBuO1xuICAgIGNvbnN0IGVtID0gdmFsaWRhdGVFbWFpbChmLmVtYWlsKTsgaWYgKGVtKSB4LmVtYWlsID0gZW07XG4gICAgY29uc3QgcGggPSB2YWxpZGF0ZVBob25lKGYucGhvbmUsIGYuY2MsIGZhbHNlKTsgaWYgKHBoKSB4LnBob25lID0gcGg7XG4gICAgaWYgKCFmLnRvcGljKSB4LnRvcGljID0gJ0Nob29zZSB3aGF0IHlvdXIgbWVzc2FnZSBpcyBhYm91dC4nO1xuICAgIGlmIChmLm1lc3NhZ2UudHJpbSgpLmxlbmd0aCA8IDE1KSB4Lm1lc3NhZ2UgPSAnQWRkIGEgbGl0dGxlIG1vcmUgZGV0YWlsIChhdCBsZWFzdCAxNSBjaGFyYWN0ZXJzKS4nO1xuICAgIGlmICghaHVtYW4pIHguY2FwdGNoYSA9ICdDb21wbGV0ZSB0aGUgaHVtYW4gY2hlY2suJztcbiAgICBzZXRFcnIoeCk7XG4gICAgaWYgKE9iamVjdC5rZXlzKHgpLmxlbmd0aCkgcmV0dXJuO1xuICAgIGlmIChmLndlYnNpdGUpIHJldHVybjsgLy8gaG9uZXlwb3Q6IGJvdHMgZmlsbCBoaWRkZW4gZmllbGRzXG4gICAgc2V0U3RhdGUoJ3NlbmRpbmcnKTtcbiAgICBzZXRBbGVydCgnJyk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgcG9zdEpTT04oQVBJLmVucXVpcnksIHtcbiAgICAgIG5hbWU6IGYubmFtZS50cmltKCksIGVtYWlsOiBmLmVtYWlsLnRyaW0oKSwgcGhvbmU6IGYucGhvbmUgPyBgJHtjb3VudHJ5QnlDb2RlKGYuY2MpPy5kaWFsfSAke2YucGhvbmV9YCA6ICcnLFxuICAgICAgdG9waWM6IGYudG9waWMsIG1lc3NhZ2U6IGYubWVzc2FnZS50cmltKCkuc2xpY2UoMCwgMjAwMCksIHNvdXJjZTogJ2NvbnRhY3QtcGFnZScsXG4gICAgfSk7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIHNldFN0YXRlKCdmb3JtJyk7XG4gICAgICBzZXRBbGVydChyZXMuZGF0YT8ubWVzc2FnZSB8fCAnWW91ciBtZXNzYWdlIGRpZG5cdTIwMTl0IGdvIHRocm91Z2guIFRyeSBhZ2Fpbiwgb3IgcmVhY2ggdXMgb24gV2hhdHNBcHAgb3IgZW1haWwuJyk7XG4gICAgICBzZXRDYXBLZXkoKGspID0+IGsgKyAxKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJhY2soJ2NvbnRhY3Rfc3VibWl0JywgeyB0b3BpYzogZi50b3BpYyB9KTtcbiAgICBzZXRTdGF0ZSgnZmx5aW5nJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRTdGF0ZSgnZG9uZScpLCAxNTAwKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJjMy1oZXJvXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYzMtYmdcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48aSAvPjxpIC8+PGkgLz48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgYzMtaGVyby1pblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYzMtY29weVwiPlxuICAgICAgICAgICAgPEJyZWFkY3J1bWJzIGl0ZW1zPXtbeyB0bzogJy8nLCBsYWJlbDogJ0hvbWUnIH0sIHsgbGFiZWw6ICdDb250YWN0JyB9XX0gLz5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJoZXJvLXRpdGxlXCI+Q29udGFjdCBNeUhlYWx0aE9waW5pb25zLiA8c3BhbiBjbGFzc05hbWU9XCJjMy1obFwiPkEgcmVhbCBwZXJzb24gcmVwbGllcy48L3NwYW4+PC9oMT5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImMzLWxlYWRcIj5RdWVzdGlvbnMgYWJvdXQgam9pbmluZywgYSBzdXJ2ZXksIHlvdXIgcmV3YXJkcyBvciBhIHJlc2VhcmNoIHBhcnRuZXJzaGlwPyBQaWNrIHRoZSBjaGFubmVsIHlvdSBsaWtlIGJlc3QuIE1vc3QgbWVzc2FnZXMgYXJlIGFuc3dlcmVkIHdpdGhpbiBvbmUgd29ya2luZyBkYXksIGFuZCB0aGUgaGVscCBhc3Npc3RhbnQgbmV2ZXIgc2xlZXBzLjwvcD5cbiAgICAgICAgICAgIDxEZWxoaUNsb2NrIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImMzLXRpbGVzXCI+XG4gICAgICAgICAgICB7Q0hBTk5FTFMubWFwKChjLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlubmVyID0gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjdC1pY1wiPjxJY29uIG5hbWU9e2MuaWN9IHNpemU9ezMwfSAvPntjLmxpdmUgJiYgPGkgY2xhc3NOYW1lPVwiY3QtbGl2ZVwiIC8+fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGN0LWZ4IGZ4LSR7Yy5pY31gfSBhcmlhLWhpZGRlbj1cInRydWVcIj57Yy5pYyA9PT0gJ3doYXRzYXBwJyA/IDw+PGIgLz48YiAvPjxiIC8+PC8+IDogYy5pYyA9PT0gJ21haWwnID8gJzEnIDogYy5pYyA9PT0gJ2NhbGwnID8gPD48aSAvPjxpIC8+PC8+IDogPD48aSAvPjxpIC8+PC8+fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxiPntjLnR9PC9iPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtdlwiPntjLnZ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGVtPjxzcGFuIGNsYXNzTmFtZT1cImRvdFwiIC8+IHtjLnN0YXR1c308L2VtPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY3QtZ29cIj48SWNvbiBuYW1lPVwiYXJyb3dcIiBzaXplPXsxNn0gLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxpIGtleT17Yy50fSBzdHlsZT17eyAnLS1jMSc6IGMuYzEsICctLWMyJzogYy5jMiwgJy0taSc6IGkgfX0+XG4gICAgICAgICAgICAgICAgICB7Yy5ocmVmID8gKFxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJjdFwiIGhyZWY9e2MuaHJlZn0gdGFyZ2V0PXtjLmhyZWYuc3RhcnRzV2l0aCgnaHR0cCcpID8gJ19ibGFuaycgOiB1bmRlZmluZWR9IHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj57aW5uZXJ9PC9hPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY3RcIiBvbkNsaWNrPXsoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmFiLWNoYXQnKT8uY2xpY2soKX0+e2lubmVyfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gYzMtbWFpblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBjMy1ncmlkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BsZXR0ZXI0ICR7Zm9jdXMgPyAnaXMtb3BlbicgOiAnJ30gJHtzdGF0ZSA9PT0gJ2ZseWluZycgPyAnaXMtZmx5aW5nJyA6ICcnfWB9PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibDQtcGxhbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTIyIDIgMiA5LjVsNyAzIDMgN3pcIiAvPjxwYXRoIGQ9XCJNMjIgMiA5IDEyLjVcIiAvPjwvc3ZnPjwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW52My1sZXR0ZXIgbDQtcGFwZXJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibDQtcG9zdG1hcmtcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48Yj5NSE88L2I+PHNtYWxsPk5ldyBEZWxoaTwvc21hbGw+PC9zcGFuPlxuICAgICAgICAgICAgICB7c3RhdGUgPT09ICdkb25lJyA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbnQzXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzMy1zdGFtcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxJY29uIG5hbWU9XCJjaGVja1wiIHNpemU9ezM0fSBzdHJva2U9ezN9IC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGgyPk1lc3NhZ2UgZGVsaXZlcmVkIDxzcGFuIGNsYXNzTmFtZT1cInRpY2tzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHUyNzEzXHUyNzEzPC9zcGFuPjwvaDI+XG4gICAgICAgICAgICAgICAgICA8cD5UaGFua3MsIHtmLm5hbWUuc3BsaXQoJyAnKVswXX0uIFdlXHUyMDE5bGwgcmVwbHkgdG8ge2YuZW1haWx9LCB1c3VhbGx5IHdpdGhpbiBvbmUgd29ya2luZyBkYXkuPC9wPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWdob3N0XCIgb25DbGljaz17KCkgPT4geyBzZXRGKEVNUFRZKTsgc2V0U3RhdGUoJ2Zvcm0nKTsgc2V0SHVtYW4oZmFsc2UpOyBzZXRDYXBLZXkoKGspID0+IGsgKyAxKTsgc2V0Rm9jdXMoZmFsc2UpOyB9fT48c3BhbiBjbGFzc05hbWU9XCJidG4tbGFiZWxcIj5Xcml0ZSBhbm90aGVyIG1lc3NhZ2U8L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3N1Ym1pdH0gbm9WYWxpZGF0ZSBvbkZvY3VzPXsoKSA9PiBzZXRGb2N1cyh0cnVlKX0+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImwzLWhlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibDMtYXZcIj48UGVyc29uYSBraW5kPVwibnVyc2VcIiBza2luPXs0fSBoYWlyPXsxfSBoYWlyU3R5bGU9ezF9IHNpemU9ezQ0fSAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj48aDI+V3JpdGUgdG8gdXM8L2gyPjxwPkRlYXIgTXlIZWFsdGhPcGluaW9ucyB0ZWFtXHUyMDI2PC9wPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsMy1zdGFtcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxJY29uIG5hbWU9XCJoZWFydFwiIHNpemU9ezIwfSBmaWxsPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlPXsxfSAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzTmFtZT1cInQzLXRvcGljc1wiPlxuICAgICAgICAgICAgICAgICAgICA8bGVnZW5kPldoYXRcdTIwMTlzIGl0IGFib3V0PyA8YiBhcmlhLWhpZGRlbj1cInRydWVcIj4qPC9iPjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHtUT1BJQ1MubWFwKChbaWMsIHRdLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwga2V5PXt0fSBjbGFzc05hbWU9e2YudG9waWMgPT09IHQgPyAnb24nIDogJyd9IHN0eWxlPXt7ICctLXRjJzogWycjMjQ1N2Y1JywgJyMwMGE4OGEnLCAnI2ZmNmEyYycsICcjOGE0ZGZmJywgJyMwZWE1ZTknLCAnI2VmMmQ1NiddW2ldIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cInRvcGljXCIgdmFsdWU9e3R9IGNoZWNrZWQ9e2YudG9waWMgPT09IHR9IG9uQ2hhbmdlPXsoKSA9PiBzZXQoJ3RvcGljJykodCl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9e2ljfSBzaXplPXsxOH0gLz57dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7ZXJyLnRvcGljICYmIDxwIGNsYXNzTmFtZT1cImZpZWxkLWVycm9yXCIgcm9sZT1cImFsZXJ0XCI+PEljb24gbmFtZT1cImluZm9cIiBzaXplPXsxNH0gLz4ge2Vyci50b3BpY308L3A+fVxuICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiRnVsbCBuYW1lXCIgcmVxdWlyZWQgaHRtbEZvcj1cImN0LW5hbWVcIiBlcnJvcj17ZXJyLm5hbWV9IGljb249XCJ1c2VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiY3QtbmFtZVwiIHZhbHVlPXtmLm5hbWV9IG9uQ2hhbmdlPXtzZXQoJ25hbWUnKX0gYXV0b0NvbXBsZXRlPVwibmFtZVwiIGFyaWEtaW52YWxpZD17ISFlcnIubmFtZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiRW1haWxcIiByZXF1aXJlZCBodG1sRm9yPVwiY3QtZW1haWxcIiBlcnJvcj17ZXJyLmVtYWlsfSBpY29uPVwibWFpbFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImN0LWVtYWlsXCIgdHlwZT1cImVtYWlsXCIgdmFsdWU9e2YuZW1haWx9IG9uQ2hhbmdlPXtzZXQoJ2VtYWlsJyl9IGF1dG9Db21wbGV0ZT1cImVtYWlsXCIgYXJpYS1pbnZhbGlkPXshIWVyci5lbWFpbH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiUGhvbmVcIiBodG1sRm9yPVwiY3QtcGhvbmVcIiBlcnJvcj17ZXJyLnBob25lfSBpY29uPVwicGhvbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPFBob25lSW5wdXQgaWQ9XCJjdC1waG9uZVwiIGNvdW50cnk9e2YuY2N9IG9uQ291bnRyeT17c2V0KCdjYycpfSB2YWx1ZT17Zi5waG9uZX0gb25DaGFuZ2U9e3NldCgncGhvbmUnKX0gaW52YWxpZD17ISFlcnIucGhvbmV9IC8+XG4gICAgICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgICAgICAgPEZpZWxkIGxhYmVsPVwiWW91ciBtZXNzYWdlXCIgcmVxdWlyZWQgaHRtbEZvcj1cImN0LW1zZ1wiIGVycm9yPXtlcnIubWVzc2FnZX0gaWNvbj1cInBlblwiPlxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgaWQ9XCJjdC1tc2dcIiByb3dzPXs1fSB2YWx1ZT17Zi5tZXNzYWdlfSBvbkNoYW5nZT17c2V0KCdtZXNzYWdlJyl9IG1heExlbmd0aD17MjAwMH0gYXJpYS1pbnZhbGlkPXshIWVyci5tZXNzYWdlfSBwbGFjZWhvbGRlcj1cIlRlbGwgdXMgd2hhdCBoYXBwZW5lZC4gUGxlYXNlIGxlYXZlIG91dCBwYXNzd29yZHMgYW5kIG1lZGljYWwgcmVjb3JkIG51bWJlcnMuXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvRmllbGQ+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiY3Qtd2ViXCI+V2Vic2l0ZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cImN0LXdlYlwiIHRhYkluZGV4PXstMX0gYXV0b0NvbXBsZXRlPVwib2ZmXCIgdmFsdWU9e2Yud2Vic2l0ZX0gb25DaGFuZ2U9e3NldCgnd2Vic2l0ZScpfSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Q2FwdGNoYSBvbkNoYW5nZT17c2V0SHVtYW59IGludmFsaWQ9eyEhZXJyLmNhcHRjaGF9IHJlc2V0S2V5PXtjYXBLZXl9IC8+XG4gICAgICAgICAgICAgICAgICB7ZXJyLmNhcHRjaGEgJiYgPHAgY2xhc3NOYW1lPVwiZmllbGQtZXJyb3JcIiByb2xlPVwiYWxlcnRcIj48SWNvbiBuYW1lPVwiaW5mb1wiIHNpemU9ezE0fSAvPiB7ZXJyLmNhcHRjaGF9PC9wPn1cbiAgICAgICAgICAgICAgICAgIHthbGVydCAmJiA8cCBjbGFzc05hbWU9XCJmb3JtLWFsZXJ0XCIgcm9sZT1cImFsZXJ0XCI+e2FsZXJ0fTwvcD59XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBidG4tYmxvY2tcIiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e3N0YXRlICE9PSAnZm9ybSd9PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJidG4tbGFiZWxcIj57c3RhdGUgPT09ICdzZW5kaW5nJyA/ICdTZW5kaW5nXHUyMDI2JyA6ICdTZW5kIG15IG1lc3NhZ2UnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT1cInNlbmRcIiBzaXplPXsxOH0gLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9ybS1maW5lXCI+PEljb24gbmFtZT1cImxvY2tcIiBzaXplPXsxMn0gLz4gV2Ugb25seSB1c2UgeW91ciBkZXRhaWxzIHRvIHJlcGx5LiBTZWUgb3VyIDxMaW5rIHRvPVwiL3ByaXZhY3lcIj5Qcml2YWN5IFBvbGljeTwvTGluaz4uPC9wPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGFzaWRlIGNsYXNzTmFtZT1cImMzLXNpZGVcIj5cbiAgICAgICAgICAgIDxMaXZlWm9uZSBjbGFzc05hbWU9XCJyYWRhci1tYXBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicm0tZ3JpZFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJtLXN3ZWVwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAge1swLCAxLCAyXS5tYXAoKGkpID0+IDxzcGFuIGtleT17aX0gY2xhc3NOYW1lPVwicm0tcmluZ1wiIHN0eWxlPXt7ICctLWknOiBpIH19IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+KX1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicm0tcGluXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PEljb24gbmFtZT1cInBpblwiIHNpemU9ezM0fSAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicm0tbGFiZWxcIj5NYW5nb2xwdXIgS2FsYW4sIE5ldyBEZWxoaTwvc3Bhbj5cbiAgICAgICAgICAgIDwvTGl2ZVpvbmU+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImMzLW9mZmljZVwiPlxuICAgICAgICAgICAgICA8aDI+T3VyIG9mZmljZTwvaDI+XG4gICAgICAgICAgICAgIDxwPntTSVRFLmxlZ2FsTmFtZX08YnIgLz57U0lURS5hZGRyZXNzLmpvaW4oJywgJyl9PC9wPlxuICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJ0ZXh0LWxpbmtcIiBocmVmPVwiaHR0cHM6Ly9tYXBzLmdvb2dsZS5jb20vP3E9TWFuZ29scHVyK0thbGFuK05ldytEZWxoaSsxMTAwODVcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+T3BlbiBpbiBHb29nbGUgTWFwcyA8SWNvbiBuYW1lPVwiZXh0ZXJuYWxcIiBzaXplPXsxM30gLz48L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYzMtcXVpY2tcIj5cbiAgICAgICAgICAgICAgPGgzPkZhc3RlciB0aGFuIGEgbWVzc2FnZTwvaDM+XG4gICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICA8bGk+PExpbmsgdG89XCIvZmFxXCI+PEljb24gbmFtZT1cImNvaW5zXCIgc2l6ZT17MTZ9IC8+V2hlbiB3aWxsIEkgZ2V0IHBhaWQ/PC9MaW5rPjwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPjxMaW5rIHRvPVwiL2ZhcVwiPjxJY29uIG5hbWU9XCJmaWx0ZXJcIiBzaXplPXsxNn0gLz5XaHkgd2FzIEkgc2NyZWVuZWQgb3V0PzwvTGluaz48L2xpPlxuICAgICAgICAgICAgICAgIDxsaT48TGluayB0bz1cIi9mYXFcIj48SWNvbiBuYW1lPVwibG9ja1wiIHNpemU9ezE2fSAvPkhvdyBkbyBJIGRlbGV0ZSBteSBhY2NvdW50PzwvTGluaz48L2xpPlxuICAgICAgICAgICAgICAgIDxsaT48TGluayB0bz1cIi9yZXdhcmRzXCI+PEljb24gbmFtZT1cIndhbGxldFwiIHNpemU9ezE2fSAvPldoaWNoIHBheW91dCBvcHRpb25zIGRvIEkgaGF2ZT88L0xpbms+PC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvYXNpZGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUtBLG1CQUFvQztBQTRDNUI7QUFsQ1IsSUFBTSxTQUFTO0FBQUEsRUFDYixDQUFDLFFBQVEsc0JBQXNCO0FBQUEsRUFDL0IsQ0FBQyxhQUFhLGlCQUFpQjtBQUFBLEVBQy9CLENBQUMsU0FBUyxtQkFBbUI7QUFBQSxFQUM3QixDQUFDLFFBQVEsZ0JBQWdCO0FBQUEs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
