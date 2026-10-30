import {
  SITE,
  whatsappLink
} from "/assets/chunk-JWSEDBGW.js";
import {
  FAQ_GROUPS
} from "/assets/chunk-EVZY7DYQ.js";
import {
  HeartMark
} from "/assets/chunk-GTWO7VGT.js";
import {
  Breadcrumbs,
  Button,
  Icon,
  LiveZone,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/Faq.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var COLORS = { joining: "#2457f5", surveys: "#00a88a", rewards: "#ff6a2c", clinical: "#8a4dff", account: "#ef2d56" };
var ICONS = { joining: "user", surveys: "clipboard", rewards: "coins", clinical: "microscope", account: "lock" };
var CHIPS = ["PayPal", "UPI", "screened out", "points", "delete", "clinical trial", "free"];
var TOTAL = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);
function Hl({ text, q }) {
  const t = q.trim();
  if (t.length < 2) return text;
  const parts = text.split(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((p, i) => p.toLowerCase() === t.toLowerCase() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", { children: p }, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: p }, i));
}
function QaArt() {
  const pairs = [["Is it really free to join?", "Yes \u2014 no fees, ever."], ["How do I get paid?", "PayPal, wire, gift cards or UPI in India."], ["Why was I screened out?", "The study needed a different profile."]];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LiveZone, { className: "qa-art", "aria-hidden": "true", children: [
    pairs.map(([q, a], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "qa-pair", style: { "--i": i }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "qa-q", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "?" }),
        q
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "qa-a", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "qa-av", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartMark, { size: 16 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "qa-dots", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {})
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: a })
      ] })
    ] }, q)),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "qa-ring r1" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "qa-ring r2" })
  ] });
}
function Faq() {
  const [g, setG] = (0, import_react.useState)("all");
  const [q, setQ] = (0, import_react.useState)("");
  const groups = (0, import_react.useMemo)(() => {
    const t = q.trim().toLowerCase();
    return FAQ_GROUPS.filter((x) => g === "all" || x.id === g).map((x) => ({ ...x, items: t ? x.items.filter((i) => (i.q + i.a).toLowerCase().includes(t)) : x.items })).filter((x) => x.items.length);
  }, [g, q]);
  const hits = groups.reduce((n, x) => n + x.items.length, 0);
  const searching = q.trim().length > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "faq4-hero", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "f4-bg", "aria-hidden": "true", children: Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { "--i": i }, children: i % 3 ? "?" : "\u2713" }, i)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container f4-inner", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "f4-copy", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ to: "/", label: "Home" }, { label: "FAQ" }] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "f4-kicker", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "chat", size: 14 }),
            " ",
            TOTAL,
            " answers \xB7 updated every month"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
            "Paid surveys FAQ: ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ask us anything" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Joining, invitations, screen-outs, points, PayPal and UPI payouts, clinical studies, privacy and account deletion \u2014 straight answers in plain words." }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "f4-search", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "search", size: 20 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "search", value: q, onChange: (e) => setQ(e.target.value), placeholder: "Type a question\u2026 e.g. \u201CHow do I get paid?\u201D", "aria-label": "Search FAQs" }),
            searching && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "f4-count", children: [
              hits,
              " ",
              hits === 1 ? "answer" : "answers"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "f4-chips", "aria-label": "Popular searches", children: CHIPS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: q === c ? "on" : "", onClick: () => setQ(q === c ? "" : c), children: c }, c)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QaArt, {})
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section faq4-topics", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "f4-tiles", role: "tablist", "aria-label": "FAQ topics", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { role: "tab", "aria-selected": g === "all", className: `f4-tile all ${g === "all" ? "on" : ""}`, onClick: () => setG("all"), style: { "--c": "#1b1035" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ft-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "list", size: 22 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Everything" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
          TOTAL,
          " answers"
        ] })
      ] }),
      FAQ_GROUPS.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { role: "tab", "aria-selected": g === x.id, className: `f4-tile ${g === x.id ? "on" : ""}`, onClick: () => setG(x.id), style: { "--c": COLORS[x.id], "--i": i }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ft-ic", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ICONS[x.id] || "info", size: 22 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: x.title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
          x.items.length,
          " answers"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ft-peek", children: x.items[0].q })
      ] }, x.id))
    ] }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section faq4-thread", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container f4-thread-wrap", children: [
      groups.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "f4-chapter", style: { "--c": COLORS[x.id] }, "aria-labelledby": `fc-${x.id}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { id: `fc-${x.id}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ICONS[x.id] || "info", size: 18 }) }),
          x.title,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: x.items.length })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "f4-items", children: x.items.map((it, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { className: "f4-qa", open: searching && k < 3 ? true : void 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "f4-me", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "user", size: 14 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "f4-q", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hl, { text: it.q, q }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "f4-plus", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus", size: 14 }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "f4-a", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "f4-bot", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartMark, { size: 18 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "f4-bubble", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "f4-typing", "aria-hidden": "true", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {})
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hl, { text: it.a, q }) })
            ] })
          ] })
        ] }, it.q)) })
      ] }, x.id)),
      !groups.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "f4-empty", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "search", size: 26 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
          "No answer matches \u201C",
          q,
          "\u201D yet"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ask the 24/7 help assistant (bottom-right) or message the support team on WhatsApp." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "btn btn-ghost", onClick: () => {
          setQ("");
          setG("all");
        }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-label", children: "Clear the search" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: "section faq4-help", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "f4-help", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "fh-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Still stuck? A real person replies." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pick the channel you like. Most messages get an answer the same working day." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "fh-cards", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { className: "fh-card wa", href: whatsappLink(), target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "whatsapp", size: 22 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "WhatsApp" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: SITE.whatsappDisplay })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { className: "fh-card em", href: `mailto:${SITE.email}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "mail", size: 22 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Email" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: SITE.email })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { to: "/contact", variant: "ghost", children: "Contact page" })
      ] })
    ] }) }) })
  ] });
}
export {
  Faq as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL0ZhcS5qc3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEZBUSBcdTIwMTQgcHJpbWFyeTogXCJwYWlkIHN1cnZleXMgRkFRXCIuIEZBUVBhZ2UgSlNPTi1MRCBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgc2FtZSBkYXRhIChzcmMvZGF0YS9mYXFzLmpzKS5cbi8vIExheW91dDogYSBkYXJrIFwiYXNrIGFueXRoaW5nXCIgaGVybyB3aXRoIGEgY29tbWFuZC1iYXIgc2VhcmNoIGFuZCBxdWljayBjaGlwcywgdG9waWMgdGlsZXMsIGFuZCBldmVyeVxuLy8gcXVlc3Rpb24gYXMgYSBjaGF0IHRocmVhZCBcdTIwMTQgdGFwIGEgcXVlc3Rpb24gYnViYmxlIGFuZCB0aGUgaGVscCBkZXNrIFwidHlwZXNcIiBpdHMgYW5zd2VyLlxuLy8gQW5zd2VycyBhcmUgYWx3YXlzIGluIHRoZSBIVE1MIChuYXRpdmUgPGRldGFpbHM+KSwgc28gc2VhcmNoIGVuZ2luZXMgYW5kIHNjcmVlbiByZWFkZXJzIGdldCB0aGVtIGFsbC5cbmltcG9ydCB7IEZyYWdtZW50LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJyZWFkY3J1bWJzLCBCdXR0b24sIExpdmVab25lIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS5qc3gnO1xuaW1wb3J0IEljb24gZnJvbSAnLi4vY29tcG9uZW50cy9JY29uLmpzeCc7XG5pbXBvcnQgeyBIZWFydE1hcmsgfSBmcm9tICcuLi9jb21wb25lbnRzL0JyYW5kLmpzeCc7XG5pbXBvcnQgeyBGQVFfR1JPVVBTIH0gZnJvbSAnLi4vZGF0YS9mYXFzLmpzJztcbmltcG9ydCB7IHdoYXRzYXBwTGluaywgU0lURSB9IGZyb20gJy4uL2NvbmZpZy9zaXRlLmpzJztcblxuY29uc3QgQ09MT1JTID0geyBqb2luaW5nOiAnIzI0NTdmNScsIHN1cnZleXM6ICcjMDBhODhhJywgcmV3YXJkczogJyNmZjZhMmMnLCBjbGluaWNhbDogJyM4YTRkZmYnLCBhY2NvdW50OiAnI2VmMmQ1NicgfTtcbmNvbnN0IElDT05TID0geyBqb2luaW5nOiAndXNlcicsIHN1cnZleXM6ICdjbGlwYm9hcmQnLCByZXdhcmRzOiAnY29pbnMnLCBjbGluaWNhbDogJ21pY3Jvc2NvcGUnLCBhY2NvdW50OiAnbG9jaycgfTtcbmNvbnN0IENISVBTID0gWydQYXlQYWwnLCAnVVBJJywgJ3NjcmVlbmVkIG91dCcsICdwb2ludHMnLCAnZGVsZXRlJywgJ2NsaW5pY2FsIHRyaWFsJywgJ2ZyZWUnXTtcbmNvbnN0IFRPVEFMID0gRkFRX0dST1VQUy5yZWR1Y2UoKG4sIGcpID0+IG4gKyBnLml0ZW1zLmxlbmd0aCwgMCk7XG5cbmZ1bmN0aW9uIEhsKHsgdGV4dCwgcSB9KSB7XG4gIGNvbnN0IHQgPSBxLnRyaW0oKTtcbiAgaWYgKHQubGVuZ3RoIDwgMikgcmV0dXJuIHRleHQ7XG4gIGNvbnN0IHBhcnRzID0gdGV4dC5zcGxpdChuZXcgUmVnRXhwKGAoJHt0LnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyl9KWAsICdpZycpKTtcbiAgcmV0dXJuIHBhcnRzLm1hcCgocCwgaSkgPT4gKHAudG9Mb3dlckNhc2UoKSA9PT0gdC50b0xvd2VyQ2FzZSgpID8gPG1hcmsga2V5PXtpfT57cH08L21hcms+IDogPEZyYWdtZW50IGtleT17aX0+e3B9PC9GcmFnbWVudD4pKTtcbn1cblxuZnVuY3Rpb24gUWFBcnQoKSB7XG4gIGNvbnN0IHBhaXJzID0gW1snSXMgaXQgcmVhbGx5IGZyZWUgdG8gam9pbj8nLCAnWWVzIFx1MjAxNCBubyBmZWVzLCBldmVyLiddLCBbJ0hvdyBkbyBJIGdldCBwYWlkPycsICdQYXlQYWwsIHdpcmUsIGdpZnQgY2FyZHMgb3IgVVBJIGluIEluZGlhLiddLCBbJ1doeSB3YXMgSSBzY3JlZW5lZCBvdXQ/JywgJ1RoZSBzdHVkeSBuZWVkZWQgYSBkaWZmZXJlbnQgcHJvZmlsZS4nXV07XG4gIHJldHVybiAoXG4gICAgPExpdmVab25lIGNsYXNzTmFtZT1cInFhLWFydFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAge3BhaXJzLm1hcCgoW3EsIGFdLCBpKSA9PiAoXG4gICAgICAgIDxkaXYga2V5PXtxfSBjbGFzc05hbWU9XCJxYS1wYWlyXCIgc3R5bGU9e3sgJy0taSc6IGkgfX0+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicWEtcVwiPjxpPj88L2k+e3F9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInFhLWFcIj48c3BhbiBjbGFzc05hbWU9XCJxYS1hdlwiPjxIZWFydE1hcmsgc2l6ZT17MTZ9IC8+PC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cInFhLWRvdHNcIj48YiAvPjxiIC8+PGIgLz48L3NwYW4+PGVtPnthfTwvZW0+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkpfVxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicWEtcmluZyByMVwiIC8+PHNwYW4gY2xhc3NOYW1lPVwicWEtcmluZyByMlwiIC8+XG4gICAgPC9MaXZlWm9uZT5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRmFxKCkge1xuICBjb25zdCBbZywgc2V0R10gPSB1c2VTdGF0ZSgnYWxsJyk7XG4gIGNvbnN0IFtxLCBzZXRRXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgZ3JvdXBzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgdCA9IHEudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIEZBUV9HUk9VUFMuZmlsdGVyKCh4KSA9PiBnID09PSAnYWxsJyB8fCB4LmlkID09PSBnKVxuICAgICAgLm1hcCgoeCkgPT4gKHsgLi4ueCwgaXRlbXM6IHQgPyB4Lml0ZW1zLmZpbHRlcigoaSkgPT4gKGkucSArIGkuYSkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0KSkgOiB4Lml0ZW1zIH0pKVxuICAgICAgLmZpbHRlcigoeCkgPT4geC5pdGVtcy5sZW5ndGgpO1xuICB9LCBbZywgcV0pO1xuICBjb25zdCBoaXRzID0gZ3JvdXBzLnJlZHVjZSgobiwgeCkgPT4gbiArIHguaXRlbXMubGVuZ3RoLCAwKTtcbiAgY29uc3Qgc2VhcmNoaW5nID0gcS50cmltKCkubGVuZ3RoID4gMDtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJmYXE0LWhlcm9cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmNC1iZ1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPntBcnJheS5mcm9tKHsgbGVuZ3RoOiAxNCB9KS5tYXAoKF8sIGkpID0+IDxpIGtleT17aX0gc3R5bGU9e3sgJy0taSc6IGkgfX0+e2kgJSAzID8gJz8nIDogJ1x1MjcxMyd9PC9pPil9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGY0LWlubmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmNC1jb3B5XCI+XG4gICAgICAgICAgICA8QnJlYWRjcnVtYnMgaXRlbXM9e1t7IHRvOiAnLycsIGxhYmVsOiAnSG9tZScgfSwgeyBsYWJlbDogJ0ZBUScgfV19IC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmNC1raWNrZXJcIj48SWNvbiBuYW1lPVwiY2hhdFwiIHNpemU9ezE0fSAvPiB7VE9UQUx9IGFuc3dlcnMgXHUwMEI3IHVwZGF0ZWQgZXZlcnkgbW9udGg8L3NwYW4+XG4gICAgICAgICAgICA8aDE+UGFpZCBzdXJ2ZXlzIEZBUTogPHNwYW4+YXNrIHVzIGFueXRoaW5nPC9zcGFuPjwvaDE+XG4gICAgICAgICAgICA8cD5Kb2luaW5nLCBpbnZpdGF0aW9ucywgc2NyZWVuLW91dHMsIHBvaW50cywgUGF5UGFsIGFuZCBVUEkgcGF5b3V0cywgY2xpbmljYWwgc3R1ZGllcywgcHJpdmFjeSBhbmQgYWNjb3VudCBkZWxldGlvbiBcdTIwMTQgc3RyYWlnaHQgYW5zd2VycyBpbiBwbGFpbiB3b3Jkcy48L3A+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZjQtc2VhcmNoXCI+XG4gICAgICAgICAgICAgIDxJY29uIG5hbWU9XCJzZWFyY2hcIiBzaXplPXsyMH0gLz5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiB2YWx1ZT17cX0gb25DaGFuZ2U9eyhlKSA9PiBzZXRRKGUudGFyZ2V0LnZhbHVlKX0gcGxhY2Vob2xkZXI9XCJUeXBlIGEgcXVlc3Rpb25cdTIwMjYgZS5nLiBcdTIwMUNIb3cgZG8gSSBnZXQgcGFpZD9cdTIwMURcIiBhcmlhLWxhYmVsPVwiU2VhcmNoIEZBUXNcIiAvPlxuICAgICAgICAgICAgICB7c2VhcmNoaW5nICYmIDxzcGFuIGNsYXNzTmFtZT1cImY0LWNvdW50XCI+e2hpdHN9IHtoaXRzID09PSAxID8gJ2Fuc3dlcicgOiAnYW5zd2Vycyd9PC9zcGFuPn1cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImY0LWNoaXBzXCIgYXJpYS1sYWJlbD1cIlBvcHVsYXIgc2VhcmNoZXNcIj5cbiAgICAgICAgICAgICAge0NISVBTLm1hcCgoYykgPT4gPGJ1dHRvbiBrZXk9e2N9IHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9e3EgPT09IGMgPyAnb24nIDogJyd9IG9uQ2xpY2s9eygpID0+IHNldFEocSA9PT0gYyA/ICcnIDogYyl9PntjfTwvYnV0dG9uPil9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8UWFBcnQgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNlY3Rpb24gZmFxNC10b3BpY3NcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImY0LXRpbGVzXCIgcm9sZT1cInRhYmxpc3RcIiBhcmlhLWxhYmVsPVwiRkFRIHRvcGljc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17ZyA9PT0gJ2FsbCd9IGNsYXNzTmFtZT17YGY0LXRpbGUgYWxsICR7ZyA9PT0gJ2FsbCcgPyAnb24nIDogJyd9YH0gb25DbGljaz17KCkgPT4gc2V0RygnYWxsJyl9IHN0eWxlPXt7ICctLWMnOiAnIzFiMTAzNScgfX0+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZ0LWljXCI+PEljb24gbmFtZT1cImxpc3RcIiBzaXplPXsyMn0gLz48L3NwYW4+PGI+RXZlcnl0aGluZzwvYj48ZW0+e1RPVEFMfSBhbnN3ZXJzPC9lbT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAge0ZBUV9HUk9VUFMubWFwKCh4LCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b24ga2V5PXt4LmlkfSByb2xlPVwidGFiXCIgYXJpYS1zZWxlY3RlZD17ZyA9PT0geC5pZH0gY2xhc3NOYW1lPXtgZjQtdGlsZSAke2cgPT09IHguaWQgPyAnb24nIDogJyd9YH0gb25DbGljaz17KCkgPT4gc2V0Ryh4LmlkKX0gc3R5bGU9e3sgJy0tYyc6IENPTE9SU1t4LmlkXSwgJy0taSc6IGkgfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZnQtaWNcIj48SWNvbiBuYW1lPXtJQ09OU1t4LmlkXSB8fCAnaW5mbyd9IHNpemU9ezIyfSAvPjwvc3Bhbj48Yj57eC50aXRsZX08L2I+PGVtPnt4Lml0ZW1zLmxlbmd0aH0gYW5zd2VyczwvZW0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZnQtcGVla1wiPnt4Lml0ZW1zWzBdLnF9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBmYXE0LXRocmVhZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBmNC10aHJlYWQtd3JhcFwiPlxuICAgICAgICAgIHtncm91cHMubWFwKCh4KSA9PiAoXG4gICAgICAgICAgICA8c2VjdGlvbiBrZXk9e3guaWR9IGNsYXNzTmFtZT1cImY0LWNoYXB0ZXJcIiBzdHlsZT17eyAnLS1jJzogQ09MT1JTW3guaWRdIH19IGFyaWEtbGFiZWxsZWRieT17YGZjLSR7eC5pZH1gfT5cbiAgICAgICAgICAgICAgPGgyIGlkPXtgZmMtJHt4LmlkfWB9PjxzcGFuPjxJY29uIG5hbWU9e0lDT05TW3guaWRdIHx8ICdpbmZvJ30gc2l6ZT17MTh9IC8+PC9zcGFuPnt4LnRpdGxlfTxlbT57eC5pdGVtcy5sZW5ndGh9PC9lbT48L2gyPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImY0LWl0ZW1zXCI+XG4gICAgICAgICAgICAgICAge3guaXRlbXMubWFwKChpdCwgaykgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRldGFpbHMga2V5PXtpdC5xfSBjbGFzc05hbWU9XCJmNC1xYVwiIG9wZW49e3NlYXJjaGluZyAmJiBrIDwgMyA/IHRydWUgOiB1bmRlZmluZWR9PlxuICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmNC1tZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxJY29uIG5hbWU9XCJ1c2VyXCIgc2l6ZT17MTR9IC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImY0LXFcIj48SGwgdGV4dD17aXQucX0gcT17cX0gLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZjQtcGx1c1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxJY29uIG5hbWU9XCJwbHVzXCIgc2l6ZT17MTR9IC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZjQtYVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImY0LWJvdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxIZWFydE1hcmsgc2l6ZT17MTh9IC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZjQtYnViYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmNC10eXBpbmdcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48YiAvPjxiIC8+PGIgLz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD48SGwgdGV4dD17aXQuYX0gcT17cX0gLz48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgICB7IWdyb3Vwcy5sZW5ndGggJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmNC1lbXB0eVwiPlxuICAgICAgICAgICAgICA8c3Bhbj48SWNvbiBuYW1lPVwic2VhcmNoXCIgc2l6ZT17MjZ9IC8+PC9zcGFuPlxuICAgICAgICAgICAgICA8aDI+Tm8gYW5zd2VyIG1hdGNoZXMgXHUyMDFDe3F9XHUyMDFEIHlldDwvaDI+XG4gICAgICAgICAgICAgIDxwPkFzayB0aGUgMjQvNyBoZWxwIGFzc2lzdGFudCAoYm90dG9tLXJpZ2h0KSBvciBtZXNzYWdlIHRoZSBzdXBwb3J0IHRlYW0gb24gV2hhdHNBcHAuPC9wPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWdob3N0XCIgb25DbGljaz17KCkgPT4geyBzZXRRKCcnKTsgc2V0RygnYWxsJyk7IH19PjxzcGFuIGNsYXNzTmFtZT1cImJ0bi1sYWJlbFwiPkNsZWFyIHRoZSBzZWFyY2g8L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBmYXE0LWhlbHBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImY0LWhlbHBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmgtY29weVwiPlxuICAgICAgICAgICAgICA8aDI+U3RpbGwgc3R1Y2s/IEEgcmVhbCBwZXJzb24gcmVwbGllcy48L2gyPlxuICAgICAgICAgICAgICA8cD5QaWNrIHRoZSBjaGFubmVsIHlvdSBsaWtlLiBNb3N0IG1lc3NhZ2VzIGdldCBhbiBhbnN3ZXIgdGhlIHNhbWUgd29ya2luZyBkYXkuPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZoLWNhcmRzXCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImZoLWNhcmQgd2FcIiBocmVmPXt3aGF0c2FwcExpbmsoKX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPjxJY29uIG5hbWU9XCJ3aGF0c2FwcFwiIHNpemU9ezIyfSAvPjxiPldoYXRzQXBwPC9iPjxzbWFsbD57U0lURS53aGF0c2FwcERpc3BsYXl9PC9zbWFsbD48L2E+XG4gICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImZoLWNhcmQgZW1cIiBocmVmPXtgbWFpbHRvOiR7U0lURS5lbWFpbH1gfT48SWNvbiBuYW1lPVwibWFpbFwiIHNpemU9ezIyfSAvPjxiPkVtYWlsPC9iPjxzbWFsbD57U0lURS5lbWFpbH08L3NtYWxsPjwvYT5cbiAgICAgICAgICAgICAgPEJ1dHRvbiB0bz1cIi9jb250YWN0XCIgdmFyaWFudD1cImdob3N0XCI+Q29udGFjdCBwYWdlPC9CdXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC8+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFJQSxtQkFBNEM7QUFnQndCO0FBVHBFLElBQU0sU0FBUyxFQUFFLFNBQVMsV0FBVyxTQUFTLFdBQVcsU0FBUyxXQUFXLFVBQVUsV0FBVyxTQUFTLFVBQVU7QUFDckgsSUFBTSxRQUFRLEVBQUUsU0FBUyxRQUFRLFNBQVMsYUFBYSxTQUFTLFNBQVMsVUFBVSxjQUFjLFNBQVMsT0FBTztBQUNqSCxJQUFNLFFBQVEsQ0FBQyxVQUFVLE9BQU8sZ0JBQWdCLFVBQVUsVUFBVSxrQkFBa0IsTUFBTTtBQUM1RixJQUFNLFFBQVEsV0FBVyxPQUFPLENBQUMsR0FBRyxNQUFNLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUUvRCxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRztBQUN2QixRQUFNLElBQUksRUFBRSxLQUFLO0FBQ2pCLE1BQUksRUFBRSxTQUFTLEVBQUcsUUFBTztBQUN6QixRQUFNLFFBQVEsS0FBSyxNQUFNLElBQUksT0FBTyxJQUFJLEVBQUUsUUFBUSx1QkFBdUIsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDO0FBQzFGLFNBQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxNQUFPLEVBQUUsWUFBWSxNQUFNLEVBQUUsWUFBWSxJQUFJLDRDQUFDLFVBQWMsZUFBSixDQUFNLElBQVUsNENBQUMseUJBQWtCLGVBQUosQ0FBTSxDQUFZO0FBQ2hJO0FBRUEsU0FBUyxRQUFRO0FBQ2YsUUFBTSxRQUFRLENBQUMsQ0FBQyw4QkFBOEIsMkJBQXNCLEdBQUcsQ0FBQyxzQkFBc0IsMkNBQTJDLEdBQUcsQ0FBQywyQkFBMkIsdUNBQXVDLENBQUM7QUFDaE4sU0FDRSw2Q0FBQyxZQUFTLFdBQVUsVUFBUyxlQUFZLFFBQ3RDO0FBQUEsVUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUNsQiw2Q0FBQyxTQUFZLFdBQVUsV0FBVSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQ2pEO0FBQUEsbURBQUMsVUFBSyxXQUFVLFFBQU87QUFBQSxvREFBQyxPQUFFLGVBQUM7QUFBQSxRQUFLO0FBQUEsU0FBRTtBQUFBLE1BQ2xDLDZDQUFDLFVBQUssV0FBVSxRQUFPO0FBQUEsb0RBQUMsVUFBSyxXQUFVLFNBQVEsc0RBQUMsYUFBVSxNQUFNLElBQUksR0FBRTtBQUFBLFFBQU8sNkNBQUMsVUFBSyxXQUFVLFdBQVU7QUFBQSxzREFBQyxPQUFFO0FBQUEsVUFBRSw0Q0FBQyxPQUFFO0FBQUEsVUFBRSw0Q0FBQyxPQUFFO0FBQUEsV0FBRTtBQUFBLFFBQU8sNENBQUMsUUFBSSxhQUFFO0FBQUEsU0FBSztBQUFBLFNBRmpJLENBR1YsQ0FDRDtBQUFBLElBQ0QsNENBQUMsVUFBSyxXQUFVLGNBQWE7QUFBQSxJQUFFLDRDQUFDLFVBQUssV0FBVSxjQUFhO0FBQUEsS0FDOUQ7QUFFSjtBQUVlLFNBQVIsTUFBdUI7QUFDNUIsUUFBTSxDQUFDLEdBQUcsSUFBSSxRQUFJLHVCQUFTLEtBQUs7QUFDaEMsUUFBTSxDQUFDLEdBQUcsSUFBSSxRQUFJLHVCQUFTLEVBQUU7QUFDN0IsUUFBTSxhQUFTLHNCQUFRLE1BQU07QUFDM0IsVUFBTSxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVk7QUFDL0IsV0FBTyxXQUFXLE9BQU8sQ0FBQyxNQUFNLE1BQU0sU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUN0RCxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxPQUFPLElBQUksRUFBRSxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDeEcsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLE1BQU07QUFBQSxFQUNqQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDVCxRQUFNLE9BQU8sT0FBTyxPQUFPLENBQUMsR0FBRyxNQUFNLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUMxRCxRQUFNLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUztBQUVwQyxTQUNFLDRFQUNFO0FBQUEsaURBQUMsYUFBUSxXQUFVLGFBQ2pCO0FBQUEsa0RBQUMsU0FBSSxXQUFVLFNBQVEsZUFBWSxRQUFRLGdCQUFNLEtBQUssRUFBRSxRQUFRLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLE1BQU0sNENBQUMsT0FBVSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUksY0FBSSxJQUFJLE1BQU0sWUFBdkMsQ0FBMkMsQ0FBSSxHQUFFO0FBQUEsTUFDN0ksNkNBQUMsU0FBSSxXQUFVLHNCQUNiO0FBQUEscURBQUMsU0FBSSxXQUFVLFdBQ2I7QUFBQSxzREFBQyxlQUFZLE9BQU8sQ0FBQyxFQUFFLElBQUksS0FBSyxPQUFPLE9BQU8sR0FBRyxFQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUc7QUFBQSxVQUNwRSw2Q0FBQyxVQUFLLFdBQVUsYUFBWTtBQUFBLHdEQUFDLFFBQUssTUFBSyxRQUFPLE1BQU0sSUFBSTtBQUFBLFlBQUU7QUFBQSxZQUFFO0FBQUEsWUFBTTtBQUFBLGFBQThCO0FBQUEsVUFDaEcsNkNBQUMsUUFBRztBQUFBO0FBQUEsWUFBa0IsNENBQUMsVUFBSyw2QkFBZTtBQUFBLGFBQU87QUFBQSxVQUNsRCw0Q0FBQyxPQUFFLHVLQUFvSjtBQUFBLFVBQ3ZKLDZDQUFDLFdBQU0sV0FBVSxhQUNmO0FBQUEsd0RBQUMsUUFBSyxNQUFLLFVBQVMsTUFBTSxJQUFJO0FBQUEsWUFDOUIsNENBQUMsV0FBTSxNQUFLLFVBQVMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEtBQUssRUFBRSxPQUFPLEtBQUssR0FBRyxhQUFZLDZEQUE2QyxjQUFXLGVBQWM7QUFBQSxZQUN2SixhQUFhLDZDQUFDLFVBQUssV0FBVSxZQUFZO0FBQUE7QUFBQSxjQUFLO0FBQUEsY0FBRSxTQUFTLElBQUksV0FBVztBQUFBLGVBQVU7QUFBQSxhQUNyRjtBQUFBLFVBQ0EsNENBQUMsU0FBSSxXQUFVLFlBQVcsY0FBVyxvQkFDbEMsZ0JBQU0sSUFBSSxDQUFDLE1BQU0sNENBQUMsWUFBZSxNQUFLLFVBQVMsV0FBVyxNQUFNLElBQUksT0FBTyxJQUFJLFNBQVMsTUFBTSxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBSSxlQUF6RixDQUEyRixDQUFTLEdBQ3JJO0FBQUEsV0FDRjtBQUFBLFFBQ0EsNENBQUMsU0FBTTtBQUFBLFNBQ1Q7QUFBQSxPQUNGO0FBQUEsSUFFQSw0Q0FBQyxhQUFRLFdBQVUsdUJBQ2pCLHNEQUFDLFNBQUksV0FBVSxhQUNiLHVEQUFDLFNBQUksV0FBVSxZQUFXLE1BQUssV0FBVSxjQUFXLGNBQ2xEO0FBQUEsbURBQUMsWUFBTyxNQUFLLE9BQU0saUJBQWUsTUFBTSxPQUFPLFdBQVcsZUFBZSxNQUFNLFFBQVEsT0FBTyxFQUFFLElBQUksU0FBUyxNQUFNLEtBQUssS0FBSyxHQUFHLE9BQU8sRUFBRSxPQUFPLFVBQVUsR0FDeEo7QUFBQSxvREFBQyxVQUFLLFdBQVUsU0FBUSxzREFBQyxRQUFLLE1BQUssUUFBTyxNQUFNLElBQUksR0FBRTtBQUFBLFFBQU8sNENBQUMsT0FBRSx3QkFBVTtBQUFBLFFBQUksNkNBQUMsUUFBSTtBQUFBO0FBQUEsVUFBTTtBQUFBLFdBQVE7QUFBQSxTQUNuRztBQUFBLE1BQ0MsV0FBVyxJQUFJLENBQUMsR0FBRyxNQUNsQiw2Q0FBQyxZQUFrQixNQUFLLE9BQU0saUJBQWUsTUFBTSxFQUFFLElBQUksV0FBVyxXQUFXLE1BQU0sRUFBRSxLQUFLLE9BQU8sRUFBRSxJQUFJLFNBQVMsTUFBTSxLQUFLLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxPQUFPLE9BQU8sRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLEdBQ3pLO0FBQUEsb0RBQUMsVUFBSyxXQUFVLFNBQVEsc0RBQUMsUUFBSyxNQUFNLE1BQU0sRUFBRSxFQUFFLEtBQUssUUFBUSxNQUFNLElBQUksR0FBRTtBQUFBLFFBQU8sNENBQUMsT0FBRyxZQUFFLE9BQU07QUFBQSxRQUFJLDZDQUFDLFFBQUk7QUFBQSxZQUFFLE1BQU07QUFBQSxVQUFPO0FBQUEsV0FBUTtBQUFBLFFBQzFILDRDQUFDLFVBQUssV0FBVSxXQUFXLFlBQUUsTUFBTSxDQUFDLEVBQUUsR0FBRTtBQUFBLFdBRjdCLEVBQUUsRUFHZixDQUNEO0FBQUEsT0FDSCxHQUNGLEdBQ0Y7QUFBQSxJQUVBLDRDQUFDLGFBQVEsV0FBVSx1QkFDakIsdURBQUMsU0FBSSxXQUFVLDRCQUNaO0FBQUEsYUFBTyxJQUFJLENBQUMsTUFDWCw2Q0FBQyxhQUFtQixXQUFVLGNBQWEsT0FBTyxFQUFFLE9BQU8sT0FBTyxFQUFFLEVBQUUsRUFBRSxHQUFHLG1CQUFpQixNQUFNLEVBQUUsRUFBRSxJQUNwRztBQUFBLHFEQUFDLFFBQUcsSUFBSSxNQUFNLEVBQUUsRUFBRSxJQUFJO0FBQUEsc0RBQUMsVUFBSyxzREFBQyxRQUFLLE1BQU0sTUFBTSxFQUFFLEVBQUUsS0FBSyxRQUFRLE1BQU0sSUFBSSxHQUFFO0FBQUEsVUFBUSxFQUFFO0FBQUEsVUFBTSw0Q0FBQyxRQUFJLFlBQUUsTUFBTSxRQUFPO0FBQUEsV0FBSztBQUFBLFFBQ3BILDRDQUFDLFNBQUksV0FBVSxZQUNaLFlBQUUsTUFBTSxJQUFJLENBQUMsSUFBSSxNQUNoQiw2Q0FBQyxhQUFtQixXQUFVLFNBQVEsTUFBTSxhQUFhLElBQUksSUFBSSxPQUFPLFFBQ3RFO0FBQUEsdURBQUMsYUFDQztBQUFBLHdEQUFDLFVBQUssV0FBVSxTQUFRLGVBQVksUUFBTyxzREFBQyxRQUFLLE1BQUssUUFBTyxNQUFNLElBQUksR0FBRTtBQUFBLFlBQ3pFLDRDQUFDLFVBQUssV0FBVSxRQUFPLHNEQUFDLE1BQUcsTUFBTSxHQUFHLEdBQUcsR0FBTSxHQUFFO0FBQUEsWUFDL0MsNENBQUMsVUFBSyxXQUFVLFdBQVUsZUFBWSxRQUFPLHNEQUFDLFFBQUssTUFBSyxRQUFPLE1BQU0sSUFBSSxHQUFFO0FBQUEsYUFDN0U7QUFBQSxVQUNBLDZDQUFDLFNBQUksV0FBVSxRQUNiO0FBQUEsd0RBQUMsVUFBSyxXQUFVLFVBQVMsZUFBWSxRQUFPLHNEQUFDLGFBQVUsTUFBTSxJQUFJLEdBQUU7QUFBQSxZQUNuRSw2Q0FBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLDJEQUFDLFVBQUssV0FBVSxhQUFZLGVBQVksUUFBTztBQUFBLDREQUFDLE9BQUU7QUFBQSxnQkFBRSw0Q0FBQyxPQUFFO0FBQUEsZ0JBQUUsNENBQUMsT0FBRTtBQUFBLGlCQUFFO0FBQUEsY0FDOUQsNENBQUMsT0FBRSxzREFBQyxNQUFHLE1BQU0sR0FBRyxHQUFHLEdBQU0sR0FBRTtBQUFBLGVBQzdCO0FBQUEsYUFDRjtBQUFBLGFBWlksR0FBRyxDQWFqQixDQUNELEdBQ0g7QUFBQSxXQW5CWSxFQUFFLEVBb0JoQixDQUNEO0FBQUEsTUFDQSxDQUFDLE9BQU8sVUFDUCw2Q0FBQyxTQUFJLFdBQVUsWUFDYjtBQUFBLG9EQUFDLFVBQUssc0RBQUMsUUFBSyxNQUFLLFVBQVMsTUFBTSxJQUFJLEdBQUU7QUFBQSxRQUN0Qyw2Q0FBQyxRQUFHO0FBQUE7QUFBQSxVQUFvQjtBQUFBLFVBQUU7QUFBQSxXQUFLO0FBQUEsUUFDL0IsNENBQUMsT0FBRSxpR0FBbUY7QUFBQSxRQUN0Riw0Q0FBQyxZQUFPLE1BQUssVUFBUyxXQUFVLGlCQUFnQixTQUFTLE1BQU07QUFBRSxlQUFLLEVBQUU7QUFBRyxlQUFLLEtBQUs7QUFBQSxRQUFHLEdBQUcsc0RBQUMsVUFBSyxXQUFVLGFBQVksOEJBQWdCLEdBQU87QUFBQSxTQUNoSjtBQUFBLE9BRUosR0FDRjtBQUFBLElBRUEsNENBQUMsYUFBUSxXQUFVLHFCQUNqQixzREFBQyxTQUFJLFdBQVUsYUFDYix1REFBQyxTQUFJLFdBQVUsV0FDYjtBQUFBLG1EQUFDLFNBQUksV0FBVSxXQUNiO0FBQUEsb0RBQUMsUUFBRyxpREFBbUM7QUFBQSxRQUN2Qyw0Q0FBQyxPQUFFLDBGQUE0RTtBQUFBLFNBQ2pGO0FBQUEsTUFDQSw2Q0FBQyxTQUFJLFdBQVUsWUFDYjtBQUFBLHFEQUFDLE9BQUUsV0FBVSxjQUFhLE1BQU0sYUFBYSxHQUFHLFFBQU8sVUFBUyxLQUFJLHVCQUFzQjtBQUFBLHNEQUFDLFFBQUssTUFBSyxZQUFXLE1BQU0sSUFBSTtBQUFBLFVBQUUsNENBQUMsT0FBRSxzQkFBUTtBQUFBLFVBQUksNENBQUMsV0FBTyxlQUFLLGlCQUFnQjtBQUFBLFdBQVE7QUFBQSxRQUNoTCw2Q0FBQyxPQUFFLFdBQVUsY0FBYSxNQUFNLFVBQVUsS0FBSyxLQUFLLElBQUk7QUFBQSxzREFBQyxRQUFLLE1BQUssUUFBTyxNQUFNLElBQUk7QUFBQSxVQUFFLDRDQUFDLE9BQUUsbUJBQUs7QUFBQSxVQUFJLDRDQUFDLFdBQU8sZUFBSyxPQUFNO0FBQUEsV0FBUTtBQUFBLFFBQzdILDRDQUFDLFVBQU8sSUFBRyxZQUFXLFNBQVEsU0FBUSwwQkFBWTtBQUFBLFNBQ3BEO0FBQUEsT0FDRixHQUNGLEdBQ0Y7QUFBQSxLQUNGO0FBRUo7IiwKICAibmFtZXMiOiBbXQp9Cg==
