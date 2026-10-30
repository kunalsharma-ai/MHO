import {
  openRateExperience
} from "/assets/chunk-WJFJW7E7.js";
import "/assets/chunk-JPU2CQJN.js";
import {
  AUDIENCES,
  TESTIMONIALS
} from "/assets/chunk-DM3DAGQJ.js";
import {
  useMemberReviews
} from "/assets/chunk-7OCC2F7F.js";
import "/assets/chunk-NOWM46SW.js";
import "/assets/chunk-JWSEDBGW.js";
import {
  StarsHeroArt
} from "/assets/chunk-2PZ7UZDW.js";
import "/assets/chunk-GTWO7VGT.js";
import "/assets/chunk-53J6YGE2.js";
import {
  PageHero
} from "/assets/chunk-NVJYUHG3.js";
import {
  Button,
  Flag,
  Icon,
  LiveZone,
  SectionHead,
  Stars,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/Reviews.jsx
init_define_import_meta_env();

// src/components/Testimonials.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var ROLE_TO_AUD = { hcp: "doctors", caregiver: "caregivers", patient: "patients" };
var audColor = (id) => AUDIENCES.find((a) => a.id === id)?.color || "#3d5afe";
var initials = (n) => n.replace(/^Dr\.?\s+/i, "").split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
function useAllVoices() {
  const member = useMemberReviews();
  return (0, import_react.useMemo)(
    () => [
      ...member.map((m) => ({ ...m, name: m.name, role: m.designation, audience: ROLE_TO_AUD[m.roleType] || "patients", member: true })),
      ...TESTIMONIALS
    ],
    [member]
  );
}
function HeartbeatVoices() {
  const all = useAllVoices();
  const [aud, setAud] = (0, import_react.useState)("all");
  const list = (0, import_react.useMemo)(() => aud === "all" ? all : all.filter((t) => t.audience === aud), [all, aud]);
  const [i, setI] = (0, import_react.useState)(0);
  const [paused, setPaused] = (0, import_react.useState)(false);
  const cur = list[Math.min(i, list.length - 1)] || list[0];
  (0, import_react.useEffect)(() => setI(0), [aud]);
  (0, import_react.useEffect)(() => {
    if (paused || list.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % list.length), 6500);
    return () => clearInterval(t);
  }, [paused, list.length]);
  const W = 1e3, H = 120, base = 78;
  const step = W / (list.length + 1);
  const pathD = list.map((_, k) => {
    const x = step * (k + 1);
    return `L${x - 14} ${base} L${x - 7} ${base - 10} L${x} ${18} L${x + 7} ${base + 18} L${x + 13} ${base}`;
  }).join(" ");
  const d = `M0 ${base} ${pathD} L${W} ${base}`;
  const activeX = step * (i + 1);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "hb-voices", onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "hb-filters", role: "tablist", "aria-label": "Filter testimonials", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { role: "tab", "aria-selected": aud === "all", className: aud === "all" ? "on" : "", onClick: () => setAud("all"), children: "All voices" }),
      AUDIENCES.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { role: "tab", "aria-selected": aud === a.id, className: aud === a.id ? "on" : "", style: { "--c": a.color }, onClick: () => setAud(a.id), children: a.label }, a.id))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "hb-monitor", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { className: "hb-line", viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "hb-g", x1: "0", x2: "1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0", stopColor: "#14b8a6" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".5", stopColor: "#3d5afe" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "#e8344e" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d, className: "hb-path" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d, className: "hb-glow" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "hb-nodes", children: [
        list.map((t, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            className: `hb-node ${k === i ? "on" : ""} ${t.member ? "is-member" : ""}`,
            style: { left: `${(k + 1) / (list.length + 1) * 100}%`, "--c": audColor(t.audience) },
            onClick: () => setI(k),
            "aria-label": `Show review from ${t.name}`,
            children: initials(t.name)
          },
          t.id || t.name
        )),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hb-cursor", style: { left: `${activeX / W * 100}%` }, "aria-hidden": "true" })
      ] })
    ] }),
    cur && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { className: "hb-card", style: { "--c": audColor(cur.audience) }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hb-quote-mark", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "quote", size: 40 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: cur.quote }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hb-avatar", children: initials(cur.name) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "hb-who", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: cur.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            cur.role,
            cur.company ? ` \xB7 ${cur.company}` : ""
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "hb-place", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { code: cur.cc, name: cur.country, size: 28 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cur.country })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: cur.rating, size: 16 }),
        cur.member && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hb-new", children: "New review" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "hb-nav", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setI((i - 1 + list.length) % list.length), "aria-label": "Previous review", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrowLeft", size: 18 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          String(i + 1).padStart(2, "0"),
          " / ",
          String(list.length).padStart(2, "0")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => setI((i + 1) % list.length), "aria-label": "Next review", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 18 }) })
      ] })
    ] }, (cur.id || cur.name) + aud)
  ] });
}
function VoicesWall() {
  const all = useAllVoices();
  const [aud, setAud] = (0, import_react.useState)("all");
  const list = aud === "all" ? all : all.filter((t) => t.audience === aud);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "voices-wall", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "hb-filters", role: "tablist", "aria-label": "Filter reviews", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { role: "tab", "aria-selected": aud === "all", className: aud === "all" ? "on" : "", onClick: () => setAud("all"), children: "Everyone" }),
      AUDIENCES.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { role: "tab", "aria-selected": aud === a.id, className: aud === a.id ? "on" : "", style: { "--c": a.color }, onClick: () => setAud(a.id), children: a.label }, a.id))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vw-grid", children: list.map((t, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { className: `vw-card ${t.member ? "is-member" : ""}`, style: { "--c": audColor(t.audience), "--k": k % 6 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "vw-top", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hb-avatar", children: initials(t.name) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "hb-who", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            t.role,
            t.company ? ` \xB7 ${t.company}` : ""
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { code: t.cc, name: t.country, size: 26 })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: t.rating, size: 14 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t.quote }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [
        t.country,
        t.member && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hb-new", children: "New" })
      ] })
    ] }, t.id || t.name)) })
  ] });
}

// src/pages/Reviews.jsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function Reviews() {
  const counts = AUDIENCES.map((a) => ({ ...a, n: TESTIMONIALS.filter((t) => t.audience === a.id).length }));
  const max = Math.max(...counts.map((c) => c.n));
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      PageHero,
      {
        theme: "stars",
        eyebrow: "Member reviews",
        eyebrowColor: "#f59e0b",
        title: ["Voices from our", { t: "healthcare", hl: "grad" }, "community"],
        lead: "Read MyHealthOpinions reviews from doctors, nurses, allied health professionals, caregivers and patients around the world \u2014 then add your own voice in under a minute.",
        art: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StarsHeroArt, {}),
        crumbs: [{ to: "/", label: "Home" }, { label: "Reviews" }],
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "ph-ctas", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { onClick: openRateExperience, icon: "star", children: "Rate your experience" }) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section rv-pulse", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionHead, { eyebrow: "Heartbeat voices", title: "Every peak is a member's story", lead: "Tap a node on the pulse line \u2014 or let it play.", color: "#e8344e" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(HeartbeatVoices, {})
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section rv-mix dark-band", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container split", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "split-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "Who is speaking" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "lead", children: "Reviews come from every corner of our panel." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { className: "mix-bars", children: counts.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { style: { "--c": c.color, "--v": c.n / max * 100 + "%", "--i": i }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: c.label }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { "aria-hidden": "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: c.n })
      ] }, c.id)) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section rv-wall", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionHead, { eyebrow: "The wall", title: "All member reviews", color: "#3d5afe" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VoicesWall, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "rv-add", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "pen", size: 22 }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: "Been part of a study?" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Your review appears here instantly on your device, and publicly after a quick moderation check." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { onClick: openRateExperience, icon: "star", children: "Write a review" })
      ] })
    ] }) })
  ] });
}
export {
  Reviews as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL1Jldmlld3MuanN4IiwgIi4uLy4uL3NyYy9jb21wb25lbnRzL1Rlc3RpbW9uaWFscy5qc3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIFJldmlld3MgXHUyMDE0IHRoZSBPTkxZIHBsYWNlIG1lbWJlciB0ZXN0aW1vbmlhbHMgYXJlIHNob3duIChwZXIgYnJhbmQgZ3VpZGFuY2UpLlxuaW1wb3J0IFBhZ2VIZXJvIGZyb20gJy4uL2NvbXBvbmVudHMvUGFnZUhlcm8uanN4JztcbmltcG9ydCB7IFN0YXJzSGVyb0FydCB9IGZyb20gJy4uL2NvbXBvbmVudHMvSGVyb0FydC5qc3gnO1xuaW1wb3J0IHsgU2VjdGlvbkhlYWQsIEJ1dHRvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkuanN4JztcbmltcG9ydCBJY29uIGZyb20gJy4uL2NvbXBvbmVudHMvSWNvbi5qc3gnO1xuaW1wb3J0IHsgSGVhcnRiZWF0Vm9pY2VzLCBWb2ljZXNXYWxsIH0gZnJvbSAnLi4vY29tcG9uZW50cy9UZXN0aW1vbmlhbHMuanN4JztcbmltcG9ydCB7IG9wZW5SYXRlRXhwZXJpZW5jZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvUmF0ZUV4cGVyaWVuY2UuanN4JztcbmltcG9ydCB7IEFVRElFTkNFUywgVEVTVElNT05JQUxTIH0gZnJvbSAnLi4vZGF0YS90ZXN0aW1vbmlhbHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXZpZXdzKCkge1xuICBjb25zdCBjb3VudHMgPSBBVURJRU5DRVMubWFwKChhKSA9PiAoeyAuLi5hLCBuOiBURVNUSU1PTklBTFMuZmlsdGVyKCh0KSA9PiB0LmF1ZGllbmNlID09PSBhLmlkKS5sZW5ndGggfSkpO1xuICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5jb3VudHMubWFwKChjKSA9PiBjLm4pKTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFBhZ2VIZXJvXG4gICAgICAgIHRoZW1lPVwic3RhcnNcIlxuICAgICAgICBleWVicm93PVwiTWVtYmVyIHJldmlld3NcIlxuICAgICAgICBleWVicm93Q29sb3I9XCIjZjU5ZTBiXCJcbiAgICAgICAgdGl0bGU9e1snVm9pY2VzIGZyb20gb3VyJywgeyB0OiAnaGVhbHRoY2FyZScsIGhsOiAnZ3JhZCcgfSwgJ2NvbW11bml0eSddfVxuICAgICAgICBsZWFkPVwiUmVhZCBNeUhlYWx0aE9waW5pb25zIHJldmlld3MgZnJvbSBkb2N0b3JzLCBudXJzZXMsIGFsbGllZCBoZWFsdGggcHJvZmVzc2lvbmFscywgY2FyZWdpdmVycyBhbmQgcGF0aWVudHMgYXJvdW5kIHRoZSB3b3JsZCBcdTIwMTQgdGhlbiBhZGQgeW91ciBvd24gdm9pY2UgaW4gdW5kZXIgYSBtaW51dGUuXCJcbiAgICAgICAgYXJ0PXs8U3RhcnNIZXJvQXJ0IC8+fVxuICAgICAgICBjcnVtYnM9e1t7IHRvOiAnLycsIGxhYmVsOiAnSG9tZScgfSwgeyBsYWJlbDogJ1Jldmlld3MnIH1dfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBoLWN0YXNcIj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29wZW5SYXRlRXhwZXJpZW5jZX0gaWNvbj1cInN0YXJcIj5SYXRlIHlvdXIgZXhwZXJpZW5jZTwvQnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvUGFnZUhlcm8+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gcnYtcHVsc2VcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIkhlYXJ0YmVhdCB2b2ljZXNcIiB0aXRsZT1cIkV2ZXJ5IHBlYWsgaXMgYSBtZW1iZXIncyBzdG9yeVwiIGxlYWQ9XCJUYXAgYSBub2RlIG9uIHRoZSBwdWxzZSBsaW5lIFx1MjAxNCBvciBsZXQgaXQgcGxheS5cIiBjb2xvcj1cIiNlODM0NGVcIiAvPlxuICAgICAgICAgIDxIZWFydGJlYXRWb2ljZXMgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gcnYtbWl4IGRhcmstYmFuZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBzcGxpdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BsaXQtY29weVwiPlxuICAgICAgICAgICAgPGgyPldobyBpcyBzcGVha2luZzwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJsZWFkXCI+UmV2aWV3cyBjb21lIGZyb20gZXZlcnkgY29ybmVyIG9mIG91ciBwYW5lbC48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm1peC1iYXJzXCI+XG4gICAgICAgICAgICB7Y291bnRzLm1hcCgoYywgaSkgPT4gKFxuICAgICAgICAgICAgICA8bGkga2V5PXtjLmlkfSBzdHlsZT17eyAnLS1jJzogYy5jb2xvciwgJy0tdic6IChjLm4gLyBtYXgpICogMTAwICsgJyUnLCAnLS1pJzogaSB9fT5cbiAgICAgICAgICAgICAgICA8c3Bhbj57Yy5sYWJlbH08L3NwYW4+PGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz48Yj57Yy5ufTwvYj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0aW9uIHJ2LXdhbGxcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8U2VjdGlvbkhlYWQgZXllYnJvdz1cIlRoZSB3YWxsXCIgdGl0bGU9XCJBbGwgbWVtYmVyIHJldmlld3NcIiBjb2xvcj1cIiMzZDVhZmVcIiAvPlxuICAgICAgICAgIDxWb2ljZXNXYWxsIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJydi1hZGRcIj5cbiAgICAgICAgICAgIDxJY29uIG5hbWU9XCJwZW5cIiBzaXplPXsyMn0gLz5cbiAgICAgICAgICAgIDxkaXY+PGI+QmVlbiBwYXJ0IG9mIGEgc3R1ZHk/PC9iPjxzcGFuPllvdXIgcmV2aWV3IGFwcGVhcnMgaGVyZSBpbnN0YW50bHkgb24geW91ciBkZXZpY2UsIGFuZCBwdWJsaWNseSBhZnRlciBhIHF1aWNrIG1vZGVyYXRpb24gY2hlY2suPC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvcGVuUmF0ZUV4cGVyaWVuY2V9IGljb249XCJzdGFyXCI+V3JpdGUgYSByZXZpZXc8L0J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC8+XG4gICk7XG59XG4iLCAiLy8gVGVzdGltb25pYWxzOiBcIkhlYXJ0YmVhdCBWb2ljZXNcIiAoYW4gRUNHIGxpbmUgd2hvc2UgcGVha3MgYXJlIG1lbWJlcnMgXHUyMDE0IHRoZSBwdWxzZSB0cmF2ZWxzIHRvIHRoZVxuLy8gYWN0aXZlIHZvaWNlKSBhbmQgXCJWb2ljZXMgV2FsbFwiIChmaWx0ZXJhYmxlIHRpbHRlZCBjYXJkcykuIE1lbWJlci1zdWJtaXR0ZWQgcmV2aWV3cyBhcHBlYXIgZmlyc3QuXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVEVTVElNT05JQUxTLCBBVURJRU5DRVMgfSBmcm9tICcuLi9kYXRhL3Rlc3RpbW9uaWFscy5qcyc7XG5pbXBvcnQgeyB1c2VNZW1iZXJSZXZpZXdzIH0gZnJvbSAnLi4vdXRpbHMvcmV2aWV3cy5qcyc7XG5pbXBvcnQgeyBGbGFnLCBTdGFycywgTGl2ZVpvbmUgfSBmcm9tICcuL3VpLmpzeCc7XG5pbXBvcnQgSWNvbiBmcm9tICcuL0ljb24uanN4JztcblxuY29uc3QgUk9MRV9UT19BVUQgPSB7IGhjcDogJ2RvY3RvcnMnLCBjYXJlZ2l2ZXI6ICdjYXJlZ2l2ZXJzJywgcGF0aWVudDogJ3BhdGllbnRzJyB9O1xuY29uc3QgYXVkQ29sb3IgPSAoaWQpID0+IEFVRElFTkNFUy5maW5kKChhKSA9PiBhLmlkID09PSBpZCk/LmNvbG9yIHx8ICcjM2Q1YWZlJztcbmNvbnN0IGluaXRpYWxzID0gKG4pID0+IG4ucmVwbGFjZSgvXkRyXFwuP1xccysvaSwgJycpLnNwbGl0KC9cXHMrLykubWFwKChwKSA9PiBwWzBdKS5zbGljZSgwLCAyKS5qb2luKCcnKS50b1VwcGVyQ2FzZSgpO1xuXG5mdW5jdGlvbiB1c2VBbGxWb2ljZXMoKSB7XG4gIGNvbnN0IG1lbWJlciA9IHVzZU1lbWJlclJldmlld3MoKTtcbiAgcmV0dXJuIHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgLi4ubWVtYmVyLm1hcCgobSkgPT4gKHsgLi4ubSwgbmFtZTogbS5uYW1lLCByb2xlOiBtLmRlc2lnbmF0aW9uLCBhdWRpZW5jZTogUk9MRV9UT19BVURbbS5yb2xlVHlwZV0gfHwgJ3BhdGllbnRzJywgbWVtYmVyOiB0cnVlIH0pKSxcbiAgICAgIC4uLlRFU1RJTU9OSUFMUyxcbiAgICBdLFxuICAgIFttZW1iZXJdXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIZWFydGJlYXRWb2ljZXMoKSB7XG4gIGNvbnN0IGFsbCA9IHVzZUFsbFZvaWNlcygpO1xuICBjb25zdCBbYXVkLCBzZXRBdWRdID0gdXNlU3RhdGUoJ2FsbCcpO1xuICBjb25zdCBsaXN0ID0gdXNlTWVtbygoKSA9PiAoYXVkID09PSAnYWxsJyA/IGFsbCA6IGFsbC5maWx0ZXIoKHQpID0+IHQuYXVkaWVuY2UgPT09IGF1ZCkpLCBbYWxsLCBhdWRdKTtcbiAgY29uc3QgW2ksIHNldEldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtwYXVzZWQsIHNldFBhdXNlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGN1ciA9IGxpc3RbTWF0aC5taW4oaSwgbGlzdC5sZW5ndGggLSAxKV0gfHwgbGlzdFswXTtcblxuICB1c2VFZmZlY3QoKCkgPT4gc2V0SSgwKSwgW2F1ZF0pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwYXVzZWQgfHwgbGlzdC5sZW5ndGggPCAyKSByZXR1cm47XG4gICAgY29uc3QgdCA9IHNldEludGVydmFsKCgpID0+IHNldEkoKHgpID0+ICh4ICsgMSkgJSBsaXN0Lmxlbmd0aCksIDY1MDApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHQpO1xuICB9LCBbcGF1c2VkLCBsaXN0Lmxlbmd0aF0pO1xuXG4gIC8vIEVDRyBnZW9tZXRyeTogb25lIHBlYWsgcGVyIHZvaWNlXG4gIGNvbnN0IFcgPSAxMDAwLCBIID0gMTIwLCBiYXNlID0gNzg7XG4gIGNvbnN0IHN0ZXAgPSBXIC8gKGxpc3QubGVuZ3RoICsgMSk7XG4gIGNvbnN0IHBhdGhEID0gbGlzdFxuICAgIC5tYXAoKF8sIGspID0+IHtcbiAgICAgIGNvbnN0IHggPSBzdGVwICogKGsgKyAxKTtcbiAgICAgIHJldHVybiBgTCR7eCAtIDE0fSAke2Jhc2V9IEwke3ggLSA3fSAke2Jhc2UgLSAxMH0gTCR7eH0gJHsxOH0gTCR7eCArIDd9ICR7YmFzZSArIDE4fSBMJHt4ICsgMTN9ICR7YmFzZX1gO1xuICAgIH0pXG4gICAgLmpvaW4oJyAnKTtcbiAgY29uc3QgZCA9IGBNMCAke2Jhc2V9ICR7cGF0aER9IEwke1d9ICR7YmFzZX1gO1xuICBjb25zdCBhY3RpdmVYID0gc3RlcCAqIChpICsgMSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGl2ZVpvbmUgY2xhc3NOYW1lPVwiaGItdm9pY2VzXCIgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRQYXVzZWQodHJ1ZSl9IG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0UGF1c2VkKGZhbHNlKX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhiLWZpbHRlcnNcIiByb2xlPVwidGFibGlzdFwiIGFyaWEtbGFiZWw9XCJGaWx0ZXIgdGVzdGltb25pYWxzXCI+XG4gICAgICAgIDxidXR0b24gcm9sZT1cInRhYlwiIGFyaWEtc2VsZWN0ZWQ9e2F1ZCA9PT0gJ2FsbCd9IGNsYXNzTmFtZT17YXVkID09PSAnYWxsJyA/ICdvbicgOiAnJ30gb25DbGljaz17KCkgPT4gc2V0QXVkKCdhbGwnKX0+QWxsIHZvaWNlczwvYnV0dG9uPlxuICAgICAgICB7QVVESUVOQ0VTLm1hcCgoYSkgPT4gKFxuICAgICAgICAgIDxidXR0b24ga2V5PXthLmlkfSByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17YXVkID09PSBhLmlkfSBjbGFzc05hbWU9e2F1ZCA9PT0gYS5pZCA/ICdvbicgOiAnJ30gc3R5bGU9e3sgJy0tYyc6IGEuY29sb3IgfX0gb25DbGljaz17KCkgPT4gc2V0QXVkKGEuaWQpfT5cbiAgICAgICAgICAgIHthLmxhYmVsfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhiLW1vbml0b3JcIj5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJoYi1saW5lXCIgdmlld0JveD17YDAgMCAke1d9ICR7SH1gfSBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwiaGItZ1wiIHgxPVwiMFwiIHgyPVwiMVwiPlxuICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwXCIgc3RvcENvbG9yPVwiIzE0YjhhNlwiIC8+XG4gICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIi41XCIgc3RvcENvbG9yPVwiIzNkNWFmZVwiIC8+XG4gICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjFcIiBzdG9wQ29sb3I9XCIjZTgzNDRlXCIgLz5cbiAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAgPC9kZWZzPlxuICAgICAgICAgIDxwYXRoIGQ9e2R9IGNsYXNzTmFtZT1cImhiLXBhdGhcIiAvPlxuICAgICAgICAgIDxwYXRoIGQ9e2R9IGNsYXNzTmFtZT1cImhiLWdsb3dcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoYi1ub2Rlc1wiPlxuICAgICAgICAgIHtsaXN0Lm1hcCgodCwgaykgPT4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBrZXk9e3QuaWQgfHwgdC5uYW1lfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BoYi1ub2RlICR7ayA9PT0gaSA/ICdvbicgOiAnJ30gJHt0Lm1lbWJlciA/ICdpcy1tZW1iZXInIDogJyd9YH1cbiAgICAgICAgICAgICAgc3R5bGU9e3sgbGVmdDogYCR7KChrICsgMSkgLyAobGlzdC5sZW5ndGggKyAxKSkgKiAxMDB9JWAsICctLWMnOiBhdWRDb2xvcih0LmF1ZGllbmNlKSB9fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJKGspfVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgU2hvdyByZXZpZXcgZnJvbSAke3QubmFtZX1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aW5pdGlhbHModC5uYW1lKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhiLWN1cnNvclwiIHN0eWxlPXt7IGxlZnQ6IGAkeyhhY3RpdmVYIC8gVykgKiAxMDB9JWAgfX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAge2N1ciAmJiAoXG4gICAgICAgIDxmaWd1cmUgY2xhc3NOYW1lPVwiaGItY2FyZFwiIGtleT17KGN1ci5pZCB8fCBjdXIubmFtZSkgKyBhdWR9IHN0eWxlPXt7ICctLWMnOiBhdWRDb2xvcihjdXIuYXVkaWVuY2UpIH19PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGItcXVvdGUtbWFya1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxJY29uIG5hbWU9XCJxdW90ZVwiIHNpemU9ezQwfSAvPjwvZGl2PlxuICAgICAgICAgIDxibG9ja3F1b3RlPlxuICAgICAgICAgICAgPHA+e2N1ci5xdW90ZX08L3A+XG4gICAgICAgICAgPC9ibG9ja3F1b3RlPlxuICAgICAgICAgIDxmaWdjYXB0aW9uPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGItYXZhdGFyXCI+e2luaXRpYWxzKGN1ci5uYW1lKX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoYi13aG9cIj5cbiAgICAgICAgICAgICAgPGI+e2N1ci5uYW1lfTwvYj5cbiAgICAgICAgICAgICAgPHNwYW4+e2N1ci5yb2xlfXtjdXIuY29tcGFueSA/IGAgXHUwMEI3ICR7Y3VyLmNvbXBhbnl9YCA6ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhiLXBsYWNlXCI+XG4gICAgICAgICAgICAgIDxGbGFnIGNvZGU9e2N1ci5jY30gbmFtZT17Y3VyLmNvdW50cnl9IHNpemU9ezI4fSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57Y3VyLmNvdW50cnl9PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPFN0YXJzIHZhbHVlPXtjdXIucmF0aW5nfSBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgIHtjdXIubWVtYmVyICYmIDxzcGFuIGNsYXNzTmFtZT1cImhiLW5ld1wiPk5ldyByZXZpZXc8L3NwYW4+fVxuICAgICAgICAgIDwvZmlnY2FwdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhiLW5hdlwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRJKChpIC0gMSArIGxpc3QubGVuZ3RoKSAlIGxpc3QubGVuZ3RoKX0gYXJpYS1sYWJlbD1cIlByZXZpb3VzIHJldmlld1wiPjxJY29uIG5hbWU9XCJhcnJvd0xlZnRcIiBzaXplPXsxOH0gLz48L2J1dHRvbj5cbiAgICAgICAgICAgIDxzcGFuPntTdHJpbmcoaSArIDEpLnBhZFN0YXJ0KDIsICcwJyl9IC8ge1N0cmluZyhsaXN0Lmxlbmd0aCkucGFkU3RhcnQoMiwgJzAnKX08L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldEkoKGkgKyAxKSAlIGxpc3QubGVuZ3RoKX0gYXJpYS1sYWJlbD1cIk5leHQgcmV2aWV3XCI+PEljb24gbmFtZT1cImFycm93XCIgc2l6ZT17MTh9IC8+PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZmlndXJlPlxuICAgICAgKX1cbiAgICA8L0xpdmVab25lPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVm9pY2VzV2FsbCgpIHtcbiAgY29uc3QgYWxsID0gdXNlQWxsVm9pY2VzKCk7XG4gIGNvbnN0IFthdWQsIHNldEF1ZF0gPSB1c2VTdGF0ZSgnYWxsJyk7XG4gIGNvbnN0IGxpc3QgPSBhdWQgPT09ICdhbGwnID8gYWxsIDogYWxsLmZpbHRlcigodCkgPT4gdC5hdWRpZW5jZSA9PT0gYXVkKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInZvaWNlcy13YWxsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhiLWZpbHRlcnNcIiByb2xlPVwidGFibGlzdFwiIGFyaWEtbGFiZWw9XCJGaWx0ZXIgcmV2aWV3c1wiPlxuICAgICAgICA8YnV0dG9uIHJvbGU9XCJ0YWJcIiBhcmlhLXNlbGVjdGVkPXthdWQgPT09ICdhbGwnfSBjbGFzc05hbWU9e2F1ZCA9PT0gJ2FsbCcgPyAnb24nIDogJyd9IG9uQ2xpY2s9eygpID0+IHNldEF1ZCgnYWxsJyl9PkV2ZXJ5b25lPC9idXR0b24+XG4gICAgICAgIHtBVURJRU5DRVMubWFwKChhKSA9PiAoXG4gICAgICAgICAgPGJ1dHRvbiBrZXk9e2EuaWR9IHJvbGU9XCJ0YWJcIiBhcmlhLXNlbGVjdGVkPXthdWQgPT09IGEuaWR9IGNsYXNzTmFtZT17YXVkID09PSBhLmlkID8gJ29uJyA6ICcnfSBzdHlsZT17eyAnLS1jJzogYS5jb2xvciB9fSBvbkNsaWNrPXsoKSA9PiBzZXRBdWQoYS5pZCl9PnthLmxhYmVsfTwvYnV0dG9uPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2dy1ncmlkXCI+XG4gICAgICAgIHtsaXN0Lm1hcCgodCwgaykgPT4gKFxuICAgICAgICAgIDxmaWd1cmUga2V5PXt0LmlkIHx8IHQubmFtZX0gY2xhc3NOYW1lPXtgdnctY2FyZCAke3QubWVtYmVyID8gJ2lzLW1lbWJlcicgOiAnJ31gfSBzdHlsZT17eyAnLS1jJzogYXVkQ29sb3IodC5hdWRpZW5jZSksICctLWsnOiBrICUgNiB9fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidnctdG9wXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhiLWF2YXRhclwiPntpbml0aWFscyh0Lm5hbWUpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGItd2hvXCI+PGI+e3QubmFtZX08L2I+PHNwYW4+e3Qucm9sZX17dC5jb21wYW55ID8gYCBcdTAwQjcgJHt0LmNvbXBhbnl9YCA6ICcnfTwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgIDxGbGFnIGNvZGU9e3QuY2N9IG5hbWU9e3QuY291bnRyeX0gc2l6ZT17MjZ9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxTdGFycyB2YWx1ZT17dC5yYXRpbmd9IHNpemU9ezE0fSAvPlxuICAgICAgICAgICAgPGJsb2NrcXVvdGU+PHA+e3QucXVvdGV9PC9wPjwvYmxvY2txdW90ZT5cbiAgICAgICAgICAgIDxmaWdjYXB0aW9uPnt0LmNvdW50cnl9e3QubWVtYmVyICYmIDxzcGFuIGNsYXNzTmFtZT1cImhiLW5ld1wiPk5ldzwvc3Bhbj59PC9maWdjYXB0aW9uPlxuICAgICAgICAgIDwvZmlndXJlPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0FDQUE7QUFFQSxtQkFBNkM7QUFrRHZDO0FBNUNOLElBQU0sY0FBYyxFQUFFLEtBQUssV0FBVyxXQUFXLGNBQWMsU0FBUyxXQUFXO0FBQ25GLElBQU0sV0FBVyxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLFNBQVM7QUFDdEUsSUFBTSxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsY0FBYyxFQUFFLEVBQUUsTUFBTSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLFlBQVk7QUFFbkgsU0FBUyxlQUFlO0FBQ3RCLFFBQU0sU0FBUyxpQkFBaUI7QUFDaEMsYUFBTztBQUFBLElBQ0wsTUFBTTtBQUFBLE1BQ0osR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLE1BQU0sRUFBRSxNQUFNLE1BQU0sRUFBRSxhQUFhLFVBQVUsWUFBWSxFQUFFLFFBQVEsS0FBSyxZQUFZLFFBQVEsS0FBSyxFQUFFO0FBQUEsTUFDakksR0FBRztBQUFBLElBQ0w7QUFBQSxJQUNBLENBQUMsTUFBTTtBQUFBLEVBQ1Q7QUFDRjtBQUVPLFNBQVMsa0JBQWtCO0FBQ2hDLFFBQU0sTUFBTSxhQUFhO0FBQ3pCLFFBQU0sQ0FBQyxLQUFLLE1BQU0sUUFBSSx1QkFBUyxLQUFLO0FBQ3BDLFFBQU0sV0FBTyxzQkFBUSxNQUFPLFFBQVEsUUFBUSxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxhQUFhLEdBQUcsR0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDO0FBQ3BHLFFBQU0sQ0FBQyxHQUFHLElBQUksUUFBSSx1QkFB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
