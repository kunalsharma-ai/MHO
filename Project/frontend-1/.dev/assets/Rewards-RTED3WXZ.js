import {
  PaymentStack
} from "/assets/chunk-UZU3UW3I.js";
import "/assets/chunk-UQWWOXC3.js";
import "/assets/chunk-SPSQFVM6.js";
import {
  VaultHeroArt
} from "/assets/chunk-2PZ7UZDW.js";
import "/assets/chunk-GTWO7VGT.js";
import {
  REWARD_ROLES
} from "/assets/chunk-TR53Q4MY.js";
import "/assets/chunk-53J6YGE2.js";
import {
  TopicHub
} from "/assets/chunk-YUJB3ZOX.js";
import {
  PageHero
} from "/assets/chunk-NVJYUHG3.js";
import {
  Button,
  Eyebrow,
  Icon,
  Link,
  Reveal,
  SectionHead,
  require_jsx_runtime,
  require_react,
  useInView
} from "/assets/chunk-LANM2SZF.js";
import "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/Rewards.jsx
init_define_import_meta_env();
var import_react2 = __toESM(require_react(), 1);

// src/components/RewardVending.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var ROWS = "ABC";
var code = (i) => `${ROWS[Math.floor(i / 3)]}${i % 3 + 1}`;
var joinLabel = (id) => id === "hcp" ? "Join as a professional" : id === "caregiver" ? "Join as a caregiver" : "Join as a patient";
function Machine({ role, index }) {
  const n = role.items.length;
  const [sel, setSel] = (0, import_react.useState)(index * 2 % n);
  const [tick, setTick] = (0, import_react.useState)(0);
  const [user, setUser] = (0, import_react.useState)(false);
  const hold = (0, import_react.useRef)(0);
  const [ref, inView] = useInView({ threshold: 0.25 }, false);
  const [seen, setSeen] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    if (inView) setSeen(true);
  }, [inView]);
  (0, import_react.useEffect)(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return void 0;
    let t;
    const start = setTimeout(() => {
      t = setInterval(() => {
        if (document.hidden || Date.now() < hold.current) return;
        setSel((s) => (s + 1) % n);
        setTick((k) => k + 1);
      }, 3200);
    }, 900 + index * 1050);
    return () => {
      clearTimeout(start);
      clearInterval(t);
    };
  }, [inView, n, index]);
  const vend = (i) => {
    hold.current = Date.now() + 9e3;
    setUser(true);
    setSel(i);
    setTick((k) => k + 1);
  };
  const item = role.items[sel];
  const spare = n % 3 ? 3 - n % 3 : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { ref, className: `vend v-${role.id} ${seen ? "is-on" : ""}`, style: { "--c": role.color, "--c2": role.accent, "--i": index }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "vd-top", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-bulbs", "aria-hidden": "true", children: Array.from({ length: 13 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { "--b": i } }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-badge", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: role.icon, size: 22 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: role.title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: role.line })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vd-body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vd-glass", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { className: "vd-grid", "aria-label": `Rewards for ${role.title.toLowerCase()}`, children: [
          role.items.map((it, i) => {
            const on = i === sel;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                type: "button",
                className: `vd-slot ${on ? "on" : ""}`,
                style: { "--ic": it.c, "--k": i },
                onClick: () => vend(i),
                "aria-pressed": on,
                "aria-label": `${it.t}: ${it.d}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-item", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-prod", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: it.icon, size: 22 }) }) }, on ? `v${tick}` : "idle"),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `vd-coil ${on ? "spin" : ""}`, "aria-hidden": "true" }, on ? `c${tick}` : "c"),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vd-tag", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: code(i) }),
                    it.t
                  ] })
                ]
              }
            ) }, it.id);
          }),
          Array.from({ length: spare }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "vd-spare", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: `/join#${role.id}`, className: "vd-slot vd-joinslot", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-prod", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus", size: 20 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vd-tag", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: code(n + i) }),
              "Join free"
            ] })
          ] }) }, `join${i}`))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-sheen", "aria-hidden": "true" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vd-side", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vd-screen", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: code(sel) }, tick),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "VEND" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-keys", children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: i === sel % 9 ? "lit" : "" }, i)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-coinslot", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-note", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "coins", size: 14 }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vd-tray", "aria-live": user ? "polite" : "off", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-flap", "aria-hidden": "true" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vd-out", style: { "--ic": item.c }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-out-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: item.icon, size: 22 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vd-out-t", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.t }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.d })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vd-pop", "aria-hidden": "true", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { "--p": i } }, i)) })
      ] }, tick)
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, { to: `/join#${role.id}`, className: "vd-cta", children: [
      joinLabel(role.id),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 15 })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "vd-feet", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
    ] })
  ] });
}
function RewardVending() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vending", children: [
    REWARD_ROLES.map((role, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Machine, { role, index: i }, role.id)),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "vd-hint", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "sparkle", size: 14 }),
      " Tap any slot to vend it \xB7 options for each study are listed in its invitation \xB7 UPI is for members in India"
    ] })
  ] });
}

// src/pages/Rewards.jsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var FLOW = [
  { ic: "check", t: "Complete a survey", d: "Reward shown upfront", c: "#3d5afe" },
  { ic: "shieldCheck", t: "Validation", d: "Quality & completion checked", c: "#14b8a6" },
  { ic: "coins", t: "Points credited", d: "Visible on your dashboard", c: "#f59e0b" },
  { ic: "target", t: "Reach the threshold", d: "Shown in your account", c: "#8b5cf6" },
  { ic: "wallet", t: "Redeem Now", d: "Pick your payout method", c: "#e8344e" },
  { ic: "gift", t: "Paid", d: "Usually within 2\u20133 weeks", c: "#10b981" }
];
function PointsJar() {
  const [n, setN] = (0, import_react2.useState)(3);
  const pct = Math.min(n * 12.5, 100);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "points-jar", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pj-glass", style: { "--p": pct + "%" }, "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pj-liquid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "pj-wave" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "pj-wave w2" })
      ] }),
      Array.from({ length: Math.min(n, 8) }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { className: "pj-coin", style: { "--i": i } }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "pj-line", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("em", { children: "Redemption threshold" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pj-ctrl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: n }),
        " completed survey",
        n === 1 ? "" : "s",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "(illustration)" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pj-btns", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setN(Math.max(0, n - 1)), "aria-label": "One fewer survey", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "minus", size: 18 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setN(Math.min(8, n + 1)), "aria-label": "One more survey", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "plus", size: 18 }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "pj-state", "aria-live": "polite", children: pct >= 100 ? "\u{1F389} Ready to redeem!" : `${Math.round(100 - pct)}% to go` }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: "Real point values depend on each survey and are shown in your invitation and dashboard." })
    ] })
  ] });
}
function Rewards() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      PageHero,
      {
        theme: "vault",
        eyebrow: "Rewards & payouts",
        eyebrowColor: "#facc15",
        title: ["Paid surveys for cash \u2014", { t: "redeemed", hl: "warm" }, "your way"],
        lead: "Earn cash for surveys and choose how it reaches you: PayPal, Wire Transfer or Amazon Gift Cards worldwide, and UPI for members in India. No fees to join, no fees to redeem.",
        ctas: [{ label: "Start earning", to: "/join" }, { label: "How payouts work", to: "/rewards#flow", variant: "ghost", icon: "coins" }],
        art: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VaultHeroArt, {}),
        crumbs: [{ to: "/", label: "Home" }, { label: "Rewards" }]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section rw-shelves", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionHead, { eyebrow: "Reward categories", title: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        "Three audiences, ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ink-grad", children: "three reward menus" })
      ] }), lead: "What a surgeon finds useful isn\u2019t what a busy carer or a patient needs. Each machine holds the rewards offered to that group \u2014 press a slot to see it drop. The exact options for a study are listed in its invitation.", color: "#8b5cf6" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RewardVending, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section rw-methods", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionHead, { eyebrow: "Surveys that pay money", title: "Four ways to get paid", lead: "Choose your country \u2014 we only show payout options that genuinely work there. UPI is India-only.", color: "#f97316" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PaymentStack, { initialCountry: "us" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "chip-links", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Link, { to: "/blog/surveys-that-pay-via-paypal", children: "Surveys that pay via PayPal" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Link, { to: "/blog/surveys-for-amazon-gift-cards", children: "Surveys for Amazon gift cards" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Link, { to: "/blog/upi-survey-rewards-earn-online-india", children: "UPI survey rewards in India" })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section rw-flow dark-band", id: "flow", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionHead, { eyebrow: "Surveys to make cash, step by step", title: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        "How your reward ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ink-gold", children: "travels" })
      ] }), color: "#facc15" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ol", { className: "relay", children: FLOW.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Reveal, { as: "li", delay: i * 110, style: { "--c": f.c }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "rl-ic", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: f.ic, size: 22 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: f.t }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: f.d })
      ] }, f.t)) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section rw-jar", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "split-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Eyebrow, { color: "#8b5cf6", children: "Points & threshold" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h2", { children: [
          "Watch your points ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "ink-grad", children: "fill up" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "lead", children: "Each completed survey adds points. When your balance reaches the minimum threshold, the \u201CRedeem Now\u201D button unlocks on your dashboard." }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "tick-list", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "check", size: 16, stroke: 3 }),
            "Double-check payout details to avoid delays"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "check", size: 16, stroke: 3 }),
            "Payment options can vary by country law"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "check", size: 16, stroke: 3 }),
            "Be wary of any site promising \u201Cinstant cash\u201D"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Link, { className: "text-link", to: "/blog/surveys-that-pay-instantly-truth", children: [
          "The truth about instant payouts ",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "arrow", size: 14 })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PointsJar, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section rw-cta", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "help-card rw-band", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "hc-ic", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "gift", size: 30 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "More surveys, more rewards" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Get invitations by email, dashboard, SMS or WhatsApp \u2014 and redeem the way that suits you." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "hc-btns", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { to: "/join", variant: "gold", children: "Join free & get invited" }) })
    ] }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TopicHub, { groups: ["payouts", "surveys"], title: "Rewards questions people search for", eyebrow: "Payout guides", exclude: "/rewards" })
  ] });
}
export {
  Rewards as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL1Jld2FyZHMuanN4IiwgIi4uLy4uL3NyYy9jb21wb25lbnRzL1Jld2FyZFZlbmRpbmcuanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBSZXdhcmRzIFx1MjAxNCBwcmltYXJ5OiBcInBhaWQgc3VydmV5cyBmb3IgY2FzaFwiLiBTZWNvbmRhcnk6IGVhcm4gY2FzaCBmb3Igc3VydmV5cywgc3VydmV5cyB0aGF0IHBheSBtb25leSxcbi8vIHN1cnZleXMgdGhhdCBwYXkgdmlhIFBheVBhbCwgc3VydmV5cyBmb3IgQW1hem9uIGdpZnQgY2FyZHMsIFVQSSBzdXJ2ZXkgcmV3YXJkcywgc3VydmV5cyB0byBtYWtlIGNhc2guXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQYWdlSGVybyBmcm9tICcuLi9jb21wb25lbnRzL1BhZ2VIZXJvLmpzeCc7XG5pbXBvcnQgeyBWYXVsdEhlcm9BcnQgfSBmcm9tICcuLi9jb21wb25lbnRzL0hlcm9BcnQuanN4JztcbmltcG9ydCB7IFNlY3Rpb25IZWFkLCBSZXZlYWwsIEJ1dHRvbiwgRXllYnJvdyB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkuanN4JztcbmltcG9ydCBJY29uIGZyb20gJy4uL2NvbXBvbmVudHMvSWNvbi5qc3gnO1xuaW1wb3J0IHsgUGF5bWVudFN0YWNrIH0gZnJvbSAnLi4vY29tcG9uZW50cy9TaG93Y2FzZS5qc3gnO1xuaW1wb3J0IFRvcGljSHViIGZyb20gJy4uL2NvbXBvbmVudHMvVG9waWNIdWIuanN4JztcbmltcG9ydCBSZXdhcmRWZW5kaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvUmV3YXJkVmVuZGluZy5qc3gnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJy4uL3JvdXRlci5qc3gnO1xuXG5jb25zdCBGTE9XID0gW1xuICB7IGljOiAnY2hlY2snLCB0OiAnQ29tcGxldGUgYSBzdXJ2ZXknLCBkOiAnUmV3YXJkIHNob3duIHVwZnJvbnQnLCBjOiAnIzNkNWFmZScgfSxcbiAgeyBpYzogJ3NoaWVsZENoZWNrJywgdDogJ1ZhbGlkYXRpb24nLCBkOiAnUXVhbGl0eSAmIGNvbXBsZXRpb24gY2hlY2tlZCcsIGM6ICcjMTRiOGE2JyB9LFxuICB7IGljOiAnY29pbnMnLCB0OiAnUG9pbnRzIGNyZWRpdGVkJywgZDogJ1Zpc2libGUgb24geW91ciBkYXNoYm9hcmQnLCBjOiAnI2Y1OWUwYicgfSxcbiAgeyBpYzogJ3RhcmdldCcsIHQ6ICdSZWFjaCB0aGUgdGhyZXNob2xkJywgZDogJ1Nob3duIGluIHlvdXIgYWNjb3VudCcsIGM6ICcjOGI1Y2Y2JyB9LFxuICB7IGljOiAnd2FsbGV0JywgdDogJ1JlZGVlbSBOb3cnLCBkOiAnUGljayB5b3VyIHBheW91dCBtZXRob2QnLCBjOiAnI2U4MzQ0ZScgfSxcbiAgeyBpYzogJ2dpZnQnLCB0OiAnUGFpZCcsIGQ6ICdVc3VhbGx5IHdpdGhpbiAyXHUyMDEzMyB3ZWVrcycsIGM6ICcjMTBiOTgxJyB9LFxuXTtcblxuZnVuY3Rpb24gUG9pbnRzSmFyKCkge1xuICBjb25zdCBbbiwgc2V0Tl0gPSB1c2VTdGF0ZSgzKTtcbiAgY29uc3QgcGN0ID0gTWF0aC5taW4obiAqIDEyLjUsIDEwMCk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwb2ludHMtamFyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBqLWdsYXNzXCIgc3R5bGU9e3sgJy0tcCc6IHBjdCArICclJyB9fSBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwai1saXF1aWRcIj48c3BhbiBjbGFzc05hbWU9XCJwai13YXZlXCIgLz48c3BhbiBjbGFzc05hbWU9XCJwai13YXZlIHcyXCIgLz48L2Rpdj5cbiAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IE1hdGgubWluKG4sIDgpIH0pLm1hcCgoXywgaSkgPT4gPGkga2V5PXtpfSBjbGFzc05hbWU9XCJwai1jb2luXCIgc3R5bGU9e3sgJy0taSc6IGkgfX0gLz4pfVxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwai1saW5lXCI+PGVtPlJlZGVtcHRpb24gdGhyZXNob2xkPC9lbT48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGotY3RybFwiPlxuICAgICAgICA8cD48Yj57bn08L2I+IGNvbXBsZXRlZCBzdXJ2ZXl7biA9PT0gMSA/ICcnIDogJ3MnfSA8c3Bhbj4oaWxsdXN0cmF0aW9uKTwvc3Bhbj48L3A+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGotYnRuc1wiPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0TihNYXRoLm1heCgwLCBuIC0gMSkpfSBhcmlhLWxhYmVsPVwiT25lIGZld2VyIHN1cnZleVwiPjxJY29uIG5hbWU9XCJtaW51c1wiIHNpemU9ezE4fSAvPjwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0TihNYXRoLm1pbig4LCBuICsgMSkpfSBhcmlhLWxhYmVsPVwiT25lIG1vcmUgc3VydmV5XCI+PEljb24gbmFtZT1cInBsdXNcIiBzaXplPXsxOH0gLz48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInBqLXN0YXRlXCIgYXJpYS1saXZlPVwicG9saXRlXCI+e3BjdCA+PSAxMDAgPyAnXHVEODNDXHVERjg5IFJlYWR5IHRvIHJlZGVlbSEnIDogYCR7TWF0aC5yb3VuZCgxMDAgLSBwY3QpfSUgdG8gZ29gfTwvcD5cbiAgICAgICAgPHNtYWxsPlJlYWwgcG9pbnQgdmFsdWVzIGRlcGVuZCBvbiBlYWNoIHN1cnZleSBhbmQgYXJlIHNob3duIGluIHlvdXIgaW52aXRhdGlvbiBhbmQgZGFzaGJvYXJkLjwvc21hbGw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmV3YXJkcygpIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFBhZ2VIZXJvXG4gICAgICAgIHRoZW1lPVwidmF1bHRcIlxuICAgICAgICBleWVicm93PVwiUmV3YXJkcyAmIHBheW91dHNcIlxuICAgICAgICBleWVicm93Q29sb3I9XCIjZmFjYzE1XCJcbiAgICAgICAgdGl0bGU9e1snUGFpZCBzdXJ2ZXlzIGZvciBjYXNoIFx1MjAxNCcsIHsgdDogJ3JlZGVlbWVkJywgaGw6ICd3YXJtJyB9LCAneW91ciB3YXknXX1cbiAgICAgICAgbGVhZD1cIkVhcm4gY2FzaCBmb3Igc3VydmV5cyBhbmQgY2hvb3NlIGhvdyBpdCByZWFjaGVzIHlvdTogUGF5UGFsLCBXaXJlIFRyYW5zZmVyIG9yIEFtYXpvbiBHaWZ0IENhcmRzIHdvcmxkd2lkZSwgYW5kIFVQSSBmb3IgbWVtYmVycyBpbiBJbmRpYS4gTm8gZmVlcyB0byBqb2luLCBubyBmZWVzIHRvIHJlZGVlbS5cIlxuICAgICAgICBjdGFzPXtbeyBsYWJlbDogJ1N0YXJ0IGVhcm5pbmcnLCB0bzogJy9qb2luJyB9LCB7IGxhYmVsOiAnSG93IHBheW91dHMgd29yaycsIHRvOiAnL3Jld2FyZHMjZmxvdycsIHZhcmlhbnQ6ICdnaG9zdCcsIGljb246ICdjb2lucycgfV19XG4gICAgICAgIGFydD17PFZhdWx0SGVyb0FydCAvPn1cbiAgICAgICAgY3J1bWJzPXtbeyB0bzogJy8nLCBsYWJlbDogJ0hvbWUnIH0sIHsgbGFiZWw6ICdSZXdhcmRzJyB9XX1cbiAgICAgIC8+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gcnctc2hlbHZlc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxTZWN0aW9uSGVhZCBleWVicm93PVwiUmV3YXJkIGNhdGVnb3JpZXNcIiB0aXRsZT17PD5UaHJlZSBhdWRpZW5jZXMsIDxzcGFuIGNsYXNzTmFtZT1cImluay1ncmFkXCI+dGhyZWUgcmV3YXJkIG1lbnVzPC9zcGFuPjwvPn0gbGVhZD1cIldoYXQgYSBzdXJnZW9uIGZpbmRzIHVzZWZ1bCBpc25cdTIwMTl0IHdoYXQgYSBidXN5IGNhcmVyIG9yIGEgcGF0aWVudCBuZWVkcy4gRWFjaCBtYWNoaW5lIGhvbGRzIHRoZSByZXdhcmRzIG9mZmVyZWQgdG8gdGhhdCBncm91cCBcdTIwMTQgcHJlc3MgYSBzbG90IHRvIHNlZSBpdCBkcm9wLiBUaGUgZXhhY3Qgb3B0aW9ucyBmb3IgYSBzdHVkeSBhcmUgbGlzdGVkIGluIGl0cyBpbnZpdGF0aW9uLlwiIGNvbG9yPVwiIzhiNWNmNlwiIC8+XG4gICAgICAgICAgPFJld2FyZFZlbmRpbmcgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gcnctbWV0aG9kc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxTZWN0aW9uSGVhZCBleWVicm93PVwiU3VydmV5cyB0aGF0IHBheSBtb25leVwiIHRpdGxlPVwiRm91ciB3YXlzIHRvIGdldCBwYWlkXCIgbGVhZD1cIkNob29zZSB5b3VyIGNvdW50cnkgXHUyMDE0IHdlIG9ubHkgc2hvdyBwYXlvdXQgb3B0aW9ucyB0aGF0IGdlbnVpbmVseSB3b3JrIHRoZXJlLiBVUEkgaXMgSW5kaWEtb25seS5cIiBjb2xvcj1cIiNmOTczMTZcIiAvPlxuICAgICAgICAgIDxQYXltZW50U3RhY2sgaW5pdGlhbENvdW50cnk9XCJ1c1wiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGlwLWxpbmtzXCI+XG4gICAgICAgICAgICA8TGluayB0bz1cIi9ibG9nL3N1cnZleXMtdGhhdC1wYXktdmlhLXBheXBhbFwiPlN1cnZleXMgdGhhdCBwYXkgdmlhIFBheVBhbDwvTGluaz5cbiAgICAgICAgICAgIDxMaW5rIHRvPVwiL2Jsb2cvc3VydmV5cy1mb3ItYW1hem9uLWdpZnQtY2FyZHNcIj5TdXJ2ZXlzIGZvciBBbWF6b24gZ2lmdCBjYXJkczwvTGluaz5cbiAgICAgICAgICAgIDxMaW5rIHRvPVwiL2Jsb2cvdXBpLXN1cnZleS1yZXdhcmRzLWVhcm4tb25saW5lLWluZGlhXCI+VVBJIHN1cnZleSByZXdhcmRzIGluIEluZGlhPC9MaW5rPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBydy1mbG93IGRhcmstYmFuZFwiIGlkPVwiZmxvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxTZWN0aW9uSGVhZCBleWVicm93PVwiU3VydmV5cyB0byBtYWtlIGNhc2gsIHN0ZXAgYnkgc3RlcFwiIHRpdGxlPXs8PkhvdyB5b3VyIHJld2FyZCA8c3BhbiBjbGFzc05hbWU9XCJpbmstZ29sZFwiPnRyYXZlbHM8L3NwYW4+PC8+fSBjb2xvcj1cIiNmYWNjMTVcIiAvPlxuICAgICAgICAgIDxvbCBjbGFzc05hbWU9XCJyZWxheVwiPlxuICAgICAgICAgICAge0ZMT1cubWFwKChmLCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxSZXZlYWwgYXM9XCJsaVwiIGtleT17Zi50fSBkZWxheT17aSAqIDExMH0gc3R5bGU9e3sgJy0tYyc6IGYuYyB9fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJybC1pY1wiPjxJY29uIG5hbWU9e2YuaWN9IHNpemU9ezIyfSAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8Yj57Zi50fTwvYj5cbiAgICAgICAgICAgICAgICA8c21hbGw+e2YuZH08L3NtYWxsPlxuICAgICAgICAgICAgICA8L1JldmVhbD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvb2w+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIHJ3LWphclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBzcGxpdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BsaXQtY29weVwiPlxuICAgICAgICAgICAgPEV5ZWJyb3cgY29sb3I9XCIjOGI1Y2Y2XCI+UG9pbnRzICYgdGhyZXNob2xkPC9FeWVicm93PlxuICAgICAgICAgICAgPGgyPldhdGNoIHlvdXIgcG9pbnRzIDxzcGFuIGNsYXNzTmFtZT1cImluay1ncmFkXCI+ZmlsbCB1cDwvc3Bhbj48L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibGVhZFwiPkVhY2ggY29tcGxldGVkIHN1cnZleSBhZGRzIHBvaW50cy4gV2hlbiB5b3VyIGJhbGFuY2UgcmVhY2hlcyB0aGUgbWluaW11bSB0aHJlc2hvbGQsIHRoZSBcdTIwMUNSZWRlZW0gTm93XHUyMDFEIGJ1dHRvbiB1bmxvY2tzIG9uIHlvdXIgZGFzaGJvYXJkLjwvcD5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJ0aWNrLWxpc3RcIj5cbiAgICAgICAgICAgICAgPGxpPjxJY29uIG5hbWU9XCJjaGVja1wiIHNpemU9ezE2fSBzdHJva2U9ezN9IC8+RG91YmxlLWNoZWNrIHBheW91dCBkZXRhaWxzIHRvIGF2b2lkIGRlbGF5czwvbGk+XG4gICAgICAgICAgICAgIDxsaT48SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPXsxNn0gc3Ryb2tlPXszfSAvPlBheW1lbnQgb3B0aW9ucyBjYW4gdmFyeSBieSBjb3VudHJ5IGxhdzwvbGk+XG4gICAgICAgICAgICAgIDxsaT48SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPXsxNn0gc3Ryb2tlPXszfSAvPkJlIHdhcnkgb2YgYW55IHNpdGUgcHJvbWlzaW5nIFx1MjAxQ2luc3RhbnQgY2FzaFx1MjAxRDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPExpbmsgY2xhc3NOYW1lPVwidGV4dC1saW5rXCIgdG89XCIvYmxvZy9zdXJ2ZXlzLXRoYXQtcGF5LWluc3RhbnRseS10cnV0aFwiPlRoZSB0cnV0aCBhYm91dCBpbnN0YW50IHBheW91dHMgPEljb24gbmFtZT1cImFycm93XCIgc2l6ZT17MTR9IC8+PC9MaW5rPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxQb2ludHNKYXIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gcnctY3RhXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWxwLWNhcmQgcnctYmFuZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGMtaWNcIj48SWNvbiBuYW1lPVwiZ2lmdFwiIHNpemU9ezMwfSAvPjwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXY+PGgyPk1vcmUgc3VydmV5cywgbW9yZSByZXdhcmRzPC9oMj48cD5HZXQgaW52aXRhdGlvbnMgYnkgZW1haWwsIGRhc2hib2FyZCwgU01TIG9yIFdoYXRzQXBwIFx1MjAxNCBhbmQgcmVkZWVtIHRoZSB3YXkgdGhhdCBzdWl0cyB5b3UuPC9wPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoYy1idG5zXCI+PEJ1dHRvbiB0bz1cIi9qb2luXCIgdmFyaWFudD1cImdvbGRcIj5Kb2luIGZyZWUgJmFtcDsgZ2V0IGludml0ZWQ8L0J1dHRvbj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxUb3BpY0h1YiBncm91cHM9e1sncGF5b3V0cycsICdzdXJ2ZXlzJ119IHRpdGxlPVwiUmV3YXJkcyBxdWVzdGlvbnMgcGVvcGxlIHNlYXJjaCBmb3JcIiBleWVicm93PVwiUGF5b3V0IGd1aWRlc1wiIGV4Y2x1ZGU9XCIvcmV3YXJkc1wiIC8+XG4gICAgPC8+XG4gICk7XG59XG4iLCAiLy8gUmV3YXJkcyBwYWdlIFx1MjAxNCBcIlRocmVlIGF1ZGllbmNlcywgdGhyZWUgcmV3YXJkIG1lbnVzXCIgYXMgdGhyZWUgcmV3YXJkIHZlbmRpbmcgbWFjaGluZXMuXG4vLyBFYWNoIGF1ZGllbmNlIGdldHMgaXRzIG93biBtYWNoaW5lIGluIGl0cyBvd24gY29sb3VyIGdyYWRlIChwcm9mZXNzaW9uYWxzIGJsdWUvdmlvbGV0LCBjYXJlZ2l2ZXJzXG4vLyBvcmFuZ2UvY29yYWwsIHBhdGllbnRzIHRlYWwvYXF1YSkuIEV2ZXJ5IHJld2FyZCBzaXRzIGluIGEgbGl0IHNsb3Qgb24gYSBzcGlyYWwgY29pbDsgdGhlIG1hY2hpbmVcbi8vIHZlbmRzIG9uZSBvbiBpdHMgb3duIGV2ZXJ5IGZldyBzZWNvbmRzIChjb2lsIHR1cm5zLCB0aGUgcmV3YXJkIGRyb3BzIGludG8gdGhlIHBpY2t1cCB0cmF5KSwgYW5kXG4vLyB2aXNpdG9ycyBjYW4gcHJlc3MgYW55IHNsb3QgdG8gdmVuZCBpdCB0aGVtc2VsdmVzLiBBbGwgcmV3YXJkcyBhcmUgcmVhbCBidXR0b25zIGFuZCBwbGFpbiB0ZXh0LFxuLy8gc28gc2NyZWVuIHJlYWRlcnMgYW5kIHNlYXJjaCBlbmdpbmVzIGdldCB0aGUgZnVsbCBsaXN0LiBEYXRhOiBSRVdBUkRfUk9MRVMgaW4gc3JjL2RhdGEvY29tbXVuaXR5LmpzLlxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uLmpzeCc7XG5pbXBvcnQgeyB1c2VJblZpZXcgfSBmcm9tICcuL3VpLmpzeCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAnLi4vcm91dGVyLmpzeCc7XG5pbXBvcnQgeyBSRVdBUkRfUk9MRVMgfSBmcm9tICcuLi9kYXRhL2NvbW11bml0eS5qcyc7XG5cbmNvbnN0IFJPV1MgPSAnQUJDJztcbmNvbnN0IGNvZGUgPSAoaSkgPT4gYCR7Uk9XU1tNYXRoLmZsb29yKGkgLyAzKV19JHsoaSAlIDMpICsgMX1gO1xuY29uc3Qgam9pbkxhYmVsID0gKGlkKSA9PiAoaWQgPT09ICdoY3AnID8gJ0pvaW4gYXMgYSBwcm9mZXNzaW9uYWwnIDogaWQgPT09ICdjYXJlZ2l2ZXInID8gJ0pvaW4gYXMgYSBjYXJlZ2l2ZXInIDogJ0pvaW4gYXMgYSBwYXRpZW50Jyk7XG5cbmZ1bmN0aW9uIE1hY2hpbmUoeyByb2xlLCBpbmRleCB9KSB7XG4gIGNvbnN0IG4gPSByb2xlLml0ZW1zLmxlbmd0aDtcbiAgY29uc3QgW3NlbCwgc2V0U2VsXSA9IHVzZVN0YXRlKGluZGV4ICogMiAlIG4pO1xuICBjb25zdCBbdGljaywgc2V0VGlja10gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBob2xkID0gdXNlUmVmKDApO1xuICBjb25zdCBbcmVmLCBpblZpZXddID0gdXNlSW5WaWV3KHsgdGhyZXNob2xkOiAwLjI1IH0sIGZhbHNlKTtcbiAgY29uc3QgW3NlZW4sIHNldFNlZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICB1c2VFZmZlY3QoKCkgPT4geyBpZiAoaW5WaWV3KSBzZXRTZWVuKHRydWUpOyB9LCBbaW5WaWV3XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWluVmlldyB8fCB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGxldCB0O1xuICAgIGNvbnN0IHN0YXJ0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuIHx8IERhdGUubm93KCkgPCBob2xkLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgc2V0U2VsKChzKSA9PiAocyArIDEpICUgbik7XG4gICAgICAgIHNldFRpY2soKGspID0+IGsgKyAxKTtcbiAgICAgIH0sIDMyMDApO1xuICAgIH0sIDkwMCArIGluZGV4ICogMTA1MCk7XG4gICAgcmV0dXJuICgpID0+IHsgY2xlYXJUaW1lb3V0KHN0YXJ0KTsgY2xlYXJJbnRlcnZhbCh0KTsgfTtcbiAgfSwgW2luVmlldywgbiwgaW5kZXhdKTtcblxuICBjb25zdCB2ZW5kID0gKGkpID0+IHsgaG9sZC5jdXJyZW50ID0gRGF0ZS5ub3coKSArIDkwMDA7IHNldFVzZXIodHJ1ZSk7IHNldFNlbChpKTsgc2V0VGljaygoaykgPT4gayArIDEpOyB9O1xuICBjb25zdCBpdGVtID0gcm9sZS5pdGVtc1tzZWxdO1xuICBjb25zdCBzcGFyZSA9IG4gJSAzID8gMyAtIChuICUgMykgOiAwO1xuXG4gIHJldHVybiAoXG4gICAgPGFydGljbGUgcmVmPXtyZWZ9IGNsYXNzTmFtZT17YHZlbmQgdi0ke3JvbGUuaWR9ICR7c2VlbiA/ICdpcy1vbicgOiAnJ31gfSBzdHlsZT17eyAnLS1jJzogcm9sZS5jb2xvciwgJy0tYzInOiByb2xlLmFjY2VudCwgJy0taSc6IGluZGV4IH19PlxuICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJ2ZC10b3BcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmQtYnVsYnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57QXJyYXkuZnJvbSh7IGxlbmd0aDogMTMgfSkubWFwKChfLCBpKSA9PiA8aSBrZXk9e2l9IHN0eWxlPXt7ICctLWInOiBpIH19IC8+KX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZkLWJhZGdlXCI+PEljb24gbmFtZT17cm9sZS5pY29ufSBzaXplPXsyMn0gLz48L3NwYW4+XG4gICAgICAgIDxoMz57cm9sZS50aXRsZX08L2gzPlxuICAgICAgICA8cD57cm9sZS5saW5lfTwvcD5cbiAgICAgIDwvaGVhZGVyPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInZkLWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2ZC1nbGFzc1wiPlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJ2ZC1ncmlkXCIgYXJpYS1sYWJlbD17YFJld2FyZHMgZm9yICR7cm9sZS50aXRsZS50b0xvd2VyQ2FzZSgpfWB9PlxuICAgICAgICAgICAge3JvbGUuaXRlbXMubWFwKChpdCwgaSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBvbiA9IGkgPT09IHNlbDtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8bGkga2V5PXtpdC5pZH0+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B2ZC1zbG90ICR7b24gPyAnb24nIDogJyd9YH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgJy0taWMnOiBpdC5jLCAnLS1rJzogaSB9fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB2ZW5kKGkpfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLXByZXNzZWQ9e29ufVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgJHtpdC50fTogJHtpdC5kfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZkLWl0ZW1cIiBrZXk9e29uID8gYHYke3RpY2t9YCA6ICdpZGxlJ30+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmQtcHJvZFwiPjxJY29uIG5hbWU9e2l0Lmljb259IHNpemU9ezIyfSAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B2ZC1jb2lsICR7b24gPyAnc3BpbicgOiAnJ31gfSBrZXk9e29uID8gYGMke3RpY2t9YCA6ICdjJ30gYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmQtdGFnXCI+PGVtPntjb2RlKGkpfTwvZW0+e2l0LnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IHNwYXJlIH0pLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICAgICAgICA8bGkga2V5PXtgam9pbiR7aX1gfSBjbGFzc05hbWU9XCJ2ZC1zcGFyZVwiPlxuICAgICAgICAgICAgICAgIDxMaW5rIHRvPXtgL2pvaW4jJHtyb2xlLmlkfWB9IGNsYXNzTmFtZT1cInZkLXNsb3QgdmQtam9pbnNsb3RcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZkLXByb2RcIj48SWNvbiBuYW1lPVwicGx1c1wiIHNpemU9ezIwfSAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZkLXRhZ1wiPjxlbT57Y29kZShuICsgaSl9PC9lbT5Kb2luIGZyZWU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2ZC1zaGVlblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmQtc2lkZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZkLXNjcmVlblwiPjxiIGtleT17dGlja30+e2NvZGUoc2VsKX08L2I+PHNtYWxsPlZFTkQ8L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2ZC1rZXlzXCI+e0FycmF5LmZyb20oeyBsZW5ndGg6IDkgfSkubWFwKChfLCBpKSA9PiA8aSBrZXk9e2l9IGNsYXNzTmFtZT17aSA9PT0gc2VsICUgOSA/ICdsaXQnIDogJyd9IC8+KX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmQtY29pbnNsb3RcIj48aSAvPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2ZC1ub3RlXCI+PEljb24gbmFtZT1cImNvaW5zXCIgc2l6ZT17MTR9IC8+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInZkLXRyYXlcIiBhcmlhLWxpdmU9e3VzZXIgPyAncG9saXRlJyA6ICdvZmYnfT5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmQtZmxhcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZkLW91dFwiIGtleT17dGlja30gc3R5bGU9e3sgJy0taWMnOiBpdGVtLmMgfX0+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmQtb3V0LWljXCI+PEljb24gbmFtZT17aXRlbS5pY29ufSBzaXplPXsyMn0gLz48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidmQtb3V0LXRcIj48Yj57aXRlbS50fTwvYj48c21hbGw+e2l0ZW0uZH08L3NtYWxsPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ2ZC1wb3BcIiBhcmlhLWhpZGRlbj1cInRydWVcIj57QXJyYXkuZnJvbSh7IGxlbmd0aDogNiB9KS5tYXAoKF8sIGkpID0+IDxpIGtleT17aX0gc3R5bGU9e3sgJy0tcCc6IGkgfX0gLz4pfTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxMaW5rIHRvPXtgL2pvaW4jJHtyb2xlLmlkfWB9IGNsYXNzTmFtZT1cInZkLWN0YVwiPntqb2luTGFiZWwocm9sZS5pZCl9IDxJY29uIG5hbWU9XCJhcnJvd1wiIHNpemU9ezE1fSAvPjwvTGluaz5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInZkLWZlZXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48aSAvPjxpIC8+PC9zcGFuPlxuICAgIDwvYXJ0aWNsZT5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmV3YXJkVmVuZGluZygpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInZlbmRpbmdcIj5cbiAgICAgIHtSRVdBUkRfUk9MRVMubWFwKChyb2xlLCBpKSA9PiA8TWFjaGluZSBrZXk9e3JvbGUuaWR9IHJvbGU9e3JvbGV9IGluZGV4PXtpfSAvPil9XG4gICAgICA8cCBjbGFzc05hbWU9XCJ2ZC1oaW50XCI+PEljb24gbmFtZT1cInNwYXJrbGVcIiBzaXplPXsxNH0gLz4gVGFwIGFueSBzbG90IHRvIHZlbmQgaXQgXHUwMEI3IG9wdGlvbnMgZm9yIGVhY2ggc3R1ZHkgYXJlIGxpc3RlZCBpbiBpdHMgaW52aXRhdGlvbiBcdTAwQjcgVVBJIGlzIGZvciBtZW1iZXJzIGluIEluZGlhPC9wPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsSUFBQUEsZ0JBQXlCOzs7QUNGekI7QUFNQSxtQkFBNEM7QUF1Q3RDO0FBakNOLElBQU0sT0FBTztBQUNiLElBQU0sT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLEtBQUssTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUksSUFBSSxJQUFLLENBQUM7QUFDNUQsSUFBTSxZQUFZLENBQUMsT0FBUSxPQUFPLFFBQVEsMkJBQTJCLE9BQU8sY0FBYyx3QkFBd0I7QUFFbEgsU0FBUyxRQUFRLEVBQUUsTUFBTSxNQUFNLEdBQUc7QUFDaEMsUUFBTSxJQUFJLEtBQUssTUFBTTtBQUNyQixRQUFNLENBQUMsS0FBSyxNQUFNLFFBQUksdUJBQVMsUUFBUSxJQUFJLENBQUM7QUFDNUMsUUFBTSxDQUFDLE1BQU0sT0FBTyxRQUFJLHVC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QUFNLElBQUksUUFBUSxHQUFHO0FBQUEsWUFBRTtBQUFBLGFBQTRDO0FBQUEsV0FDNUY7QUFBQSxRQUNBLDhDQUFDLFFBQUssV0FBVSxhQUFZLElBQUcsMENBQXlDO0FBQUE7QUFBQSxVQUFnQyw2Q0FBQyxRQUFLLE1BQUssU0FBUSxNQUFNLElBQUk7QUFBQSxXQUFFO0FBQUEsU0FDekk7QUFBQSxNQUNBLDZDQUFDLGFBQVU7QUFBQSxPQUNiLEdBQ0Y7QUFBQSxJQUVBLDZDQUFDLGFBQVEsV0FBVSxrQkFDakIsdURBQUMsU0FBSSxXQUFVLGFBQ2Isd0RBQUMsU0FBSSxXQUFVLHFCQUNiO0FBQUEsbURBQUMsVUFBSyxXQUFVLFNBQVEsdURBQUMsUUFBSyxNQUFLLFFBQU8sTUFBTSxJQUFJLEdBQUU7QUFBQSxNQUN0RCw4Q0FBQyxTQUFJO0FBQUEscURBQUMsUUFBRyx3Q0FBMEI7QUFBQSxRQUFLLDZDQUFDLE9BQUUsNEdBQXlGO0FBQUEsU0FBSTtBQUFBLE1BQ3hJLDZDQUFDLFNBQUksV0FBVSxXQUFVLHVEQUFDLFVBQU8sSUFBRyxTQUFRLFNBQVEsUUFBTyxxQ0FBMkIsR0FBUztBQUFBLE9BQ2pHLEdBQ0YsR0FDRjtBQUFBLElBRUEsNkNBQUMsWUFBUyxRQUFRLENBQUMsV0FBVyxTQUFTLEdBQUcsT0FBTSx1Q0FBc0MsU0FBUSxpQkFBZ0IsU0FBUSxZQUFXO0FBQUEsS0FDbkk7QUFFSjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
