import {
  SITE,
  whatsappLink
} from "/assets/chunk-JWSEDBGW.js";
import {
  Logo,
  frequent_research_logo_default
} from "/assets/chunk-GTWO7VGT.js";
import {
  Icon,
  Link,
  LiveZone,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/components/Footer.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);

// src/assets/brand/aff-iso-9001.webp
var aff_iso_9001_default = "/assets/aff-iso-9001-2KLQWG7T.webp";

// src/assets/brand/aff-iso-27001.webp
var aff_iso_27001_default = "/assets/aff-iso-27001-2VMZCBUL.webp";

// src/assets/brand/aff-iso-20252.webp
var aff_iso_20252_default = "/assets/aff-iso-20252-WAU2HBUH.webp";

// src/assets/brand/aff-esomar-member.webp
var aff_esomar_member_default = "/assets/aff-esomar-member-CTGDA5ER.webp";

// src/assets/brand/aff-msme-registered.webp
var aff_msme_registered_default = "/assets/aff-msme-registered-ZGTHPHDZ.webp";

// src/assets/qr/facebook-qr.svg
var facebook_qr_default = "/assets/facebook-qr-YFEPNVWF.svg";

// src/assets/qr/linkedin-qr.svg
var linkedin_qr_default = "/assets/linkedin-qr-GBQY4YXF.svg";

// src/assets/qr/youtube-qr.svg
var youtube_qr_default = "/assets/youtube-qr-2Q4S4COE.svg";

// src/assets/qr/instagram-qr.svg
var instagram_qr_default = "/assets/instagram-qr-APJOJPAW.svg";

// src/components/Footer.jsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var QR = { facebook: facebook_qr_default, linkedin: linkedin_qr_default, youtube: youtube_qr_default, instagram: instagram_qr_default };
var BADGES = [
  { img: aff_iso_9001_default, name: "ISO 9001:2015", what: "Quality management", round: true },
  { img: aff_iso_27001_default, name: "ISO 27001", what: "Information security", round: true },
  { img: aff_iso_20252_default, name: "ISO 20252:2019", what: "Market research standard", round: true },
  { img: aff_esomar_member_default, name: "ESOMAR", what: "Member, global research body" },
  { img: aff_msme_registered_default, name: "MSME", what: "Registered with Govt. of India" }
];
var COLS = [
  { title: "Platform", links: [["/about-us", "About Us"], ["/how-it-works", "How It Works"], ["/rewards", "Rewards"], ["/trust-safety", "Trust & Safety"], ["/reviews", "Member Reviews"]] },
  { title: "Who It\u2019s For", links: [["/healthcare-professionals", "Healthcare Professionals"], ["/caregivers", "Caregivers"], ["/patients", "Patients"], ["/earn", "Consumers & Everyone"], ["/earn#countries", "55 Countries"], ["/blog", "Blogs & Guides"]] },
  { title: "Help & Legal", links: [["/faq", "FAQ"], ["/contact", "Contact & Support"], ["/privacy", "Privacy Policy"], ["/cookies", "Cookie Policy"], ["/terms", "Terms of Use"], ["/gdpr", "GDPR Compliance"], ["/profiling", "Profiling & Quality Score"]] }
];
function BadgeParade({ light = false }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: `badge-parade ${light ? "is-light" : ""}`, children: BADGES.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: `bp-item ${b.round ? "is-round" : ""}`, style: { "--i": i }, tabIndex: 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "bp-inner", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "bp-front", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: b.img, alt: `${b.name} \u2014 ${b.what}`, loading: "lazy", decoding: "async" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "fr-shine" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "bp-back", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: b.name }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: b.what })
    ] })
  ] }) }, b.name)) });
}
function FrShowcase() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fr-show", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "frs-card", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: frequent_research_logo_default, alt: "Frequent Research Fieldwork Solutions \u2014 Insights, Analytics, Growth. An ISO certified company", width: "589", height: "314", loading: "lazy" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "fr-shine", "aria-hidden": "true" })
  ] }) });
}
function SocialOrb({ s, i }) {
  const [open, setOpen] = (0, import_react.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: `sorb sorb-${s.id} ${open ? "is-open" : ""}`, style: { "--i": i }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", className: "sorb-ic", "aria-label": `MyHealthOpinions on ${s.label}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: s.id, size: 22 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "sorb-qr", onClick: () => setOpen((o) => !o), "aria-expanded": open, "aria-label": `${open ? "Hide" : "Show"} ${s.label} QR code`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "dashboard", size: 12 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "sorb-pop", "aria-hidden": !open, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: QR[s.id], alt: `QR code for MyHealthOpinions on ${s.label}`, width: "104", height: "104", loading: "lazy" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: s.handle })
    ] })
  ] });
}
function Footer({ onCookieSettings }) {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { className: "site-footer", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "footer-stage", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "footer-aurora", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "footer-ecg", viewBox: "0 0 1440 80", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 50 H420 l18 -30 22 56 20 -70 18 52 14 -8 H900 l14 -18 16 34 14 -16 H1440", pathLength: "100" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container footer-cta", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fc-stack", "aria-hidden": "true", children: ["\u20B9", "$", "\u20AC", "\xA3"].map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "fc-coin", style: { "--i": i }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: c }) }, c)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "fc-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
          "Your experience already has value. ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Start collecting it." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Free to join. No investment, ever. Rewards land through PayPal, Wire Transfer or Amazon Gift Cards \u2014 and UPI if you live in India." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: "/join", className: "btn btn-gold", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: "Create free account" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 18 })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container footer-main", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "fm-brand", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/", "aria-label": "MyHealthOpinions home", className: "fm-logo", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 44, onDark: true }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A healthcare research community where doctors, nurses, caregivers and patients get paid for honest opinions \u2014 and help shape better care while they are at it." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "fm-social", "aria-label": "Social media", children: SITE.socials.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialOrb, { s, i }, s.id)) })
      ] }),
      COLS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "fm-col", "aria-label": c.title, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: c.title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: c.links.map(([to, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to, children: label }) }, to)) })
      ] }, c.title)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "fm-col fm-contact", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Reach us" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "pin", size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: SITE.address.join(", ") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "call", size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: `tel:${SITE.phoneHref}`, children: SITE.phoneDisplay })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "mail", size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: `mailto:${SITE.email}`, children: SITE.email })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "whatsapp", size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { href: whatsappLink(), target: "_blank", rel: "noopener noreferrer", children: [
              "WhatsApp ",
              SITE.whatsappDisplay
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container footer-trust", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ft-fr", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ft-label", children: "Powered by" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrShowcase, {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ft-badges", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ft-label", children: "Certified & affiliated" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeParade, {})
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container footer-bottom", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        "\xA9 ",
        year,
        " ",
        SITE.legalName,
        " (d/b/a MyHealthOpinions). All rights reserved."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/sitemap", children: "Sitemap" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: onCookieSettings, children: "Cookie settings" })
      ] })
    ] })
  ] }) });
}

export {
  BadgeParade,
  Footer
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2NvbXBvbmVudHMvRm9vdGVyLmpzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAnLi4vcm91dGVyLmpzeCc7XG5pbXBvcnQgeyBTSVRFLCB3aGF0c2FwcExpbmsgfSBmcm9tICcuLi9jb25maWcvc2l0ZS5qcyc7XG5pbXBvcnQgeyBMb2dvIH0gZnJvbSAnLi9CcmFuZC5qc3gnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uLmpzeCc7XG5pbXBvcnQgeyBMaXZlWm9uZSB9IGZyb20gJy4vdWkuanN4JztcbmltcG9ydCBmckxvZ28gZnJvbSAnLi4vYXNzZXRzL2JyYW5kL2ZyZXF1ZW50LXJlc2VhcmNoLWxvZ28ud2VicCc7XG5pbXBvcnQgaXNvOTAwMSBmcm9tICcuLi9hc3NldHMvYnJhbmQvYWZmLWlzby05MDAxLndlYnAnO1xuaW1wb3J0IGlzbzI3MDAxIGZyb20gJy4uL2Fzc2V0cy9icmFuZC9hZmYtaXNvLTI3MDAxLndlYnAnO1xuaW1wb3J0IGlzbzIwMjUyIGZyb20gJy4uL2Fzc2V0cy9icmFuZC9hZmYtaXNvLTIwMjUyLndlYnAnO1xuaW1wb3J0IGVzb21hciBmcm9tICcuLi9hc3NldHMvYnJhbmQvYWZmLWVzb21hci1tZW1iZXIud2VicCc7XG5pbXBvcnQgbXNtZSBmcm9tICcuLi9hc3NldHMvYnJhbmQvYWZmLW1zbWUtcmVnaXN0ZXJlZC53ZWJwJztcbmltcG9ydCBxckZhY2Vib29rIGZyb20gJy4uL2Fzc2V0cy9xci9mYWNlYm9vay1xci5zdmcnO1xuaW1wb3J0IHFyTGlua2VkaW4gZnJvbSAnLi4vYXNzZXRzL3FyL2xpbmtlZGluLXFyLnN2Zyc7XG5pbXBvcnQgcXJZb3V0dWJlIGZyb20gJy4uL2Fzc2V0cy9xci95b3V0dWJlLXFyLnN2Zyc7XG5pbXBvcnQgcXJJbnN0YWdyYW0gZnJvbSAnLi4vYXNzZXRzL3FyL2luc3RhZ3JhbS1xci5zdmcnO1xuXG5jb25zdCBRUiA9IHsgZmFjZWJvb2s6IHFyRmFjZWJvb2ssIGxpbmtlZGluOiBxckxpbmtlZGluLCB5b3V0dWJlOiBxcllvdXR1YmUsIGluc3RhZ3JhbTogcXJJbnN0YWdyYW0gfTtcblxuZXhwb3J0IGNvbnN0IEJBREdFUyA9IFtcbiAgeyBpbWc6IGlzbzkwMDEsIG5hbWU6ICdJU08gOTAwMToyMDE1Jywgd2hhdDogJ1F1YWxpdHkgbWFuYWdlbWVudCcsIHJvdW5kOiB0cnVlIH0sXG4gIHsgaW1nOiBpc28yNzAwMSwgbmFtZTogJ0lTTyAyNzAwMScsIHdoYXQ6ICdJbmZvcm1hdGlvbiBzZWN1cml0eScsIHJvdW5kOiB0cnVlIH0sXG4gIHsgaW1nOiBpc28yMDI1MiwgbmFtZTogJ0lTTyAyMDI1MjoyMDE5Jywgd2hhdDogJ01hcmtldCByZXNlYXJjaCBzdGFuZGFyZCcsIHJvdW5kOiB0cnVlIH0sXG4gIHsgaW1nOiBlc29tYXIsIG5hbWU6ICdFU09NQVInLCB3aGF0OiAnTWVtYmVyLCBnbG9iYWwgcmVzZWFyY2ggYm9keScgfSxcbiAgeyBpbWc6IG1zbWUsIG5hbWU6ICdNU01FJywgd2hhdDogJ1JlZ2lzdGVyZWQgd2l0aCBHb3Z0LiBvZiBJbmRpYScgfSxcbl07XG5cbmNvbnN0IENPTFMgPSBbXG4gIHsgdGl0bGU6ICdQbGF0Zm9ybScsIGxpbmtzOiBbWycvYWJvdXQtdXMnLCAnQWJvdXQgVXMnXSwgWycvaG93LWl0LXdvcmtzJywgJ0hvdyBJdCBXb3JrcyddLCBbJy9yZXdhcmRzJywgJ1Jld2FyZHMnXSwgWycvdHJ1c3Qtc2FmZXR5JywgJ1RydXN0ICYgU2FmZXR5J10sIFsnL3Jldmlld3MnLCAnTWVtYmVyIFJldmlld3MnXV0gfSxcbiAgeyB0aXRsZTogJ1dobyBJdFx1MjAxOXMgRm9yJywgbGlua3M6IFtbJy9oZWFsdGhjYXJlLXByb2Zlc3Npb25hbHMnLCAnSGVhbHRoY2FyZSBQcm9mZXNzaW9uYWxzJ10sIFsnL2NhcmVnaXZlcnMnLCAnQ2FyZWdpdmVycyddLCBbJy9wYXRpZW50cycsICdQYXRpZW50cyddLCBbJy9lYXJuJywgJ0NvbnN1bWVycyAmIEV2ZXJ5b25lJ10sIFsnL2Vhcm4jY291bnRyaWVzJywgJzU1IENvdW50cmllcyddLCBbJy9ibG9nJywgJ0Jsb2dzICYgR3VpZGVzJ11dIH0sXG4gIHsgdGl0bGU6ICdIZWxwICYgTGVnYWwnLCBsaW5rczogW1snL2ZhcScsICdGQVEnXSwgWycvY29udGFjdCcsICdDb250YWN0ICYgU3VwcG9ydCddLCBbJy9wcml2YWN5JywgJ1ByaXZhY3kgUG9saWN5J10sIFsnL2Nvb2tpZXMnLCAnQ29va2llIFBvbGljeSddLCBbJy90ZXJtcycsICdUZXJtcyBvZiBVc2UnXSwgWycvZ2RwcicsICdHRFBSIENvbXBsaWFuY2UnXSwgWycvcHJvZmlsaW5nJywgJ1Byb2ZpbGluZyAmIFF1YWxpdHkgU2NvcmUnXV0gfSxcbl07XG5cbi8qKiBDZXJ0aWZpY2F0aW9uIGJhZGdlczogZWFjaCBmbG9hdHMgb24gaXRzIG93biByaHl0aG0gYW5kIGZsaXBzIHRvIGV4cGxhaW4gaXRzZWxmIG9uIGhvdmVyL2ZvY3VzLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEJhZGdlUGFyYWRlKHsgbGlnaHQgPSBmYWxzZSB9KSB7XG4gIHJldHVybiAoXG4gICAgPHVsIGNsYXNzTmFtZT17YGJhZGdlLXBhcmFkZSAke2xpZ2h0ID8gJ2lzLWxpZ2h0JyA6ICcnfWB9PlxuICAgICAge0JBREdFUy5tYXAoKGIsIGkpID0+IChcbiAgICAgICAgPGxpIGtleT17Yi5uYW1lfSBjbGFzc05hbWU9e2BicC1pdGVtICR7Yi5yb3VuZCA/ICdpcy1yb3VuZCcgOiAnJ31gfSBzdHlsZT17eyAnLS1pJzogaSB9fSB0YWJJbmRleD17MH0+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYnAtaW5uZXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJwLWZyb250XCI+PGltZyBzcmM9e2IuaW1nfSBhbHQ9e2Ake2IubmFtZX0gXHUyMDE0ICR7Yi53aGF0fWB9IGxvYWRpbmc9XCJsYXp5XCIgZGVjb2Rpbmc9XCJhc3luY1wiIC8+PHNwYW4gY2xhc3NOYW1lPVwiZnItc2hpbmVcIiAvPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJwLWJhY2tcIj48Yj57Yi5uYW1lfTwvYj48c21hbGw+e2Iud2hhdH08L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvbGk+XG4gICAgICApKX1cbiAgICA8L3VsPlxuICApO1xufVxuXG4vKiogRnJlcXVlbnQgUmVzZWFyY2g6IHRoZSBmdWxsIGxvZ28gb24gYSB0aWx0aW5nIGdsYXNzIGNhcmQuICovXG5leHBvcnQgZnVuY3Rpb24gRnJTaG93Y2FzZSgpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZyLXNob3dcIj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZycy1jYXJkXCI+XG4gICAgICAgIDxpbWcgc3JjPXtmckxvZ299IGFsdD1cIkZyZXF1ZW50IFJlc2VhcmNoIEZpZWxkd29yayBTb2x1dGlvbnMgXHUyMDE0IEluc2lnaHRzLCBBbmFseXRpY3MsIEdyb3d0aC4gQW4gSVNPIGNlcnRpZmllZCBjb21wYW55XCIgd2lkdGg9XCI1ODlcIiBoZWlnaHQ9XCIzMTRcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZyLXNoaW5lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gU29jaWFsT3JiKHsgcywgaSB9KSB7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgcmV0dXJuIChcbiAgICA8bGkgY2xhc3NOYW1lPXtgc29yYiBzb3JiLSR7cy5pZH0gJHtvcGVuID8gJ2lzLW9wZW4nIDogJyd9YH0gc3R5bGU9e3sgJy0taSc6IGkgfX0+XG4gICAgICA8YSBocmVmPXtzLnVybH0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIGNsYXNzTmFtZT1cInNvcmItaWNcIiBhcmlhLWxhYmVsPXtgTXlIZWFsdGhPcGluaW9ucyBvbiAke3MubGFiZWx9YH0+XG4gICAgICAgIDxJY29uIG5hbWU9e3MuaWR9IHNpemU9ezIyfSAvPlxuICAgICAgPC9hPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwic29yYi1xclwiIG9uQ2xpY2s9eygpID0+IHNldE9wZW4oKG8pID0+ICFvKX0gYXJpYS1leHBhbmRlZD17b3Blbn0gYXJpYS1sYWJlbD17YCR7b3BlbiA/ICdIaWRlJyA6ICdTaG93J30gJHtzLmxhYmVsfSBRUiBjb2RlYH0+XG4gICAgICAgIDxJY29uIG5hbWU9XCJkYXNoYm9hcmRcIiBzaXplPXsxMn0gLz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic29yYi1wb3BcIiBhcmlhLWhpZGRlbj17IW9wZW59PlxuICAgICAgICA8aW1nIHNyYz17UVJbcy5pZF19IGFsdD17YFFSIGNvZGUgZm9yIE15SGVhbHRoT3BpbmlvbnMgb24gJHtzLmxhYmVsfWB9IHdpZHRoPVwiMTA0XCIgaGVpZ2h0PVwiMTA0XCIgbG9hZGluZz1cImxhenlcIiAvPlxuICAgICAgICA8c21hbGw+e3MuaGFuZGxlfTwvc21hbGw+XG4gICAgICA8L3NwYW4+XG4gICAgPC9saT5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9vdGVyKHsgb25Db29raWVTZXR0aW5ncyB9KSB7XG4gIGNvbnN0IHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gIHJldHVybiAoXG4gICAgPGZvb3RlciBjbGFzc05hbWU9XCJzaXRlLWZvb3RlclwiPlxuICAgICAgPExpdmVab25lIGNsYXNzTmFtZT1cImZvb3Rlci1zdGFnZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvb3Rlci1hdXJvcmFcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48aSAvPjxpIC8+PGkgLz48L2Rpdj5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJmb290ZXItZWNnXCIgdmlld0JveD1cIjAgMCAxNDQwIDgwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8cGF0aCBkPVwiTTAgNTAgSDQyMCBsMTggLTMwIDIyIDU2IDIwIC03MCAxOCA1MiAxNCAtOCBIOTAwIGwxNCAtMTggMTYgMzQgMTQgLTE2IEgxNDQwXCIgcGF0aExlbmd0aD1cIjEwMFwiIC8+XG4gICAgICAgIDwvc3ZnPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGZvb3Rlci1jdGFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZjLXN0YWNrXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICB7WydcdTIwQjknLCAnJCcsICdcdTIwQUMnLCAnXHUwMEEzJ10ubWFwKChjLCBpKSA9PiA8c3BhbiBrZXk9e2N9IGNsYXNzTmFtZT1cImZjLWNvaW5cIiBzdHlsZT17eyAnLS1pJzogaSB9fT48Yj57Y308L2I+PC9zcGFuPil9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmYy1jb3B5XCI+XG4gICAgICAgICAgICA8aDI+WW91ciBleHBlcmllbmNlIGFscmVhZHkgaGFzIHZhbHVlLiA8c3Bhbj5TdGFydCBjb2xsZWN0aW5nIGl0Ljwvc3Bhbj48L2gyPlxuICAgICAgICAgICAgPHA+RnJlZSB0byBqb2luLiBObyBpbnZlc3RtZW50LCBldmVyLiBSZXdhcmRzIGxhbmQgdGhyb3VnaCBQYXlQYWwsIFdpcmUgVHJhbnNmZXIgb3IgQW1hem9uIEdpZnQgQ2FyZHMgXHUyMDE0IGFuZCBVUEkgaWYgeW91IGxpdmUgaW4gSW5kaWEuPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxMaW5rIHRvPVwiL2pvaW5cIiBjbGFzc05hbWU9XCJidG4gYnRuLWdvbGRcIj48c3BhbiBjbGFzc05hbWU9XCJidG4tbGFiZWxcIj5DcmVhdGUgZnJlZSBhY2NvdW50PC9zcGFuPjxJY29uIG5hbWU9XCJhcnJvd1wiIHNpemU9ezE4fSAvPjwvTGluaz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgZm9vdGVyLW1haW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZtLWJyYW5kXCI+XG4gICAgICAgICAgICA8TGluayB0bz1cIi9cIiBhcmlhLWxhYmVsPVwiTXlIZWFsdGhPcGluaW9ucyBob21lXCIgY2xhc3NOYW1lPVwiZm0tbG9nb1wiPjxMb2dvIHNpemU9ezQ0fSBvbkRhcmsgLz48L0xpbms+XG4gICAgICAgICAgICA8cD5BIGhlYWx0aGNhcmUgcmVzZWFyY2ggY29tbXVuaXR5IHdoZXJlIGRvY3RvcnMsIG51cnNlcywgY2FyZWdpdmVycyBhbmQgcGF0aWVudHMgZ2V0IHBhaWQgZm9yIGhvbmVzdCBvcGluaW9ucyBcdTIwMTQgYW5kIGhlbHAgc2hhcGUgYmV0dGVyIGNhcmUgd2hpbGUgdGhleSBhcmUgYXQgaXQuPC9wPlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImZtLXNvY2lhbFwiIGFyaWEtbGFiZWw9XCJTb2NpYWwgbWVkaWFcIj5cbiAgICAgICAgICAgICAge1NJVEUuc29jaWFscy5tYXAoKHMsIGkpID0+IDxTb2NpYWxPcmIga2V5PXtzLmlkfSBzPXtzfSBpPXtpfSAvPil9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtDT0xTLm1hcCgoYykgPT4gKFxuICAgICAgICAgICAgPG5hdiBrZXk9e2MudGl0bGV9IGNsYXNzTmFtZT1cImZtLWNvbFwiIGFyaWEtbGFiZWw9e2MudGl0bGV9PlxuICAgICAgICAgICAgICA8aDM+e2MudGl0bGV9PC9oMz5cbiAgICAgICAgICAgICAgPHVsPntjLmxpbmtzLm1hcCgoW3RvLCBsYWJlbF0pID0+IDxsaSBrZXk9e3RvfT48TGluayB0bz17dG99PntsYWJlbH08L0xpbms+PC9saT4pfTwvdWw+XG4gICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZtLWNvbCBmbS1jb250YWN0XCI+XG4gICAgICAgICAgICA8aDM+UmVhY2ggdXM8L2gzPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICA8bGk+PEljb24gbmFtZT1cInBpblwiIHNpemU9ezE2fSAvPjxzcGFuPntTSVRFLmFkZHJlc3Muam9pbignLCAnKX08L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgPGxpPjxJY29uIG5hbWU9XCJjYWxsXCIgc2l6ZT17MTZ9IC8+PGEgaHJlZj17YHRlbDoke1NJVEUucGhvbmVIcmVmfWB9PntTSVRFLnBob25lRGlzcGxheX08L2E+PC9saT5cbiAgICAgICAgICAgICAgPGxpPjxJY29uIG5hbWU9XCJtYWlsXCIgc2l6ZT17MTZ9IC8+PGEgaHJlZj17YG1haWx0bzoke1NJVEUuZW1haWx9YH0+e1NJVEUuZW1haWx9PC9hPjwvbGk+XG4gICAgICAgICAgICAgIDxsaT48SWNvbiBuYW1lPVwid2hhdHNhcHBcIiBzaXplPXsxNn0gLz48YSBocmVmPXt3aGF0c2FwcExpbmsoKX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPldoYXRzQXBwIHtTSVRFLndoYXRzYXBwRGlzcGxheX08L2E+PC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGZvb3Rlci10cnVzdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnQtZnJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZ0LWxhYmVsXCI+UG93ZXJlZCBieTwvc3Bhbj5cbiAgICAgICAgICAgIDxGclNob3djYXNlIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmdC1iYWRnZXNcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZ0LWxhYmVsXCI+Q2VydGlmaWVkICZhbXA7IGFmZmlsaWF0ZWQ8L3NwYW4+XG4gICAgICAgICAgICA8QmFkZ2VQYXJhZGUgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgZm9vdGVyLWJvdHRvbVwiPlxuICAgICAgICAgIDxwPlx1MDBBOSB7eWVhcn0ge1NJVEUubGVnYWxOYW1lfSAoZC9iL2EgTXlIZWFsdGhPcGluaW9ucykuIEFsbCByaWdodHMgcmVzZXJ2ZWQuPC9wPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8TGluayB0bz1cIi9zaXRlbWFwXCI+U2l0ZW1hcDwvTGluaz5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e29uQ29va2llU2V0dGluZ3N9PkNvb2tpZSBzZXR0aW5nczwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTGl2ZVpvbmU+XG4gICAgPC9mb290ZXI+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLG1CQUF5QjtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdDYjtBQXZCWixJQUFNLEtBQUssRUFBRSxVQUFVLHFCQUFZLFVBQVUscUJBQVksU0FBUyxvQkFBVyxXQUFXLHFCQUFZO0FBRTdGLElBQU0sU0FBUztBQUFBLEVBQ3BCLEVBQUUsS0FBSyxzQkFBUyxNQUFNLGlCQUFpQixNQUFNLHNCQUFzQixPQUFPLEtBQUs7QUFBQSxFQUMvRSxFQUFFLEtBQUssdUJBQVUsTUFBTSxhQUFhLE1BQU0sd0JBQXdCLE9BQU8sS0FBSztBQUFBLEVBQzlFLEVB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
