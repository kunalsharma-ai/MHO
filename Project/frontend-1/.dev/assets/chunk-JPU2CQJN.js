import {
  passwordStrength
} from "/assets/chunk-NOWM46SW.js";
import {
  MIN_AGE
} from "/assets/chunk-JWSEDBGW.js";
import {
  Flag,
  Icon,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import {
  ALL_COUNTRIES,
  countryByCode
} from "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/components/FormKit.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function Field({ label, error, hint, required, children, htmlFor, className = "", icon }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `field ${error ? "has-error" : ""} ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { htmlFor, children: [
      icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: icon, size: 15 }),
      label,
      required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { "aria-hidden": "true", children: "*" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: " (optional)" })
    ] }),
    children,
    error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "field-error", role: "alert", id: htmlFor ? `${htmlFor}-err` : void 0, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "info", size: 14 }),
      " ",
      error
    ] }) : hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "field-hint", children: hint }) : null
  ] });
}
function CountrySelect({ id, value, onChange, showDial = false, placeholder = "Select country", invalid, compact = false, list = ALL_COUNTRIES }) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const [q, setQ] = (0, import_react.useState)("");
  const [hi, setHi] = (0, import_react.useState)(0);
  const wrap = (0, import_react.useRef)(null);
  const listRef = (0, import_react.useRef)(null);
  const selected = value ? countryByCode(value) : null;
  const items = (0, import_react.useMemo)(() => {
    const t = q.trim().toLowerCase();
    return t ? list.filter((c) => c.name.toLowerCase().includes(t) || c.dial.includes(t) || c.code === t) : list;
  }, [q, list]);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const close = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  (0, import_react.useEffect)(() => {
    listRef.current?.children[hi]?.scrollIntoView({ block: "nearest" });
  }, [hi]);
  const choose = (c) => {
    onChange(c.code);
    setOpen(false);
    setQ("");
  };
  const onKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((h) => Math.min(h + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      items[hi] && choose(items[hi]);
    } else if (e.key === "Escape") setOpen(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `combo ${compact ? "combo-compact" : ""} ${open ? "is-open" : ""}`, ref: wrap, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        id,
        className: `combo-btn ${invalid ? "invalid" : ""}`,
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        "aria-invalid": invalid || void 0,
        onClick: () => {
          setOpen((o) => !o);
          setHi(0);
        },
        children: [
          selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { code: selected.code, size: 22 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "combo-val", children: compact ? selected.dial : selected.name }),
            showDial && !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "combo-dial", children: selected.dial })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "combo-ph", children: placeholder }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 14, className: "combo-chev" })
        ]
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "combo-pop", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "combo-search", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "search", size: 16 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            autoFocus: true,
            value: q,
            onChange: (e) => {
              setQ(e.target.value);
              setHi(0);
            },
            onKeyDown: onKey,
            placeholder: "Search country or code",
            "aria-label": "Search countries"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { role: "listbox", ref: listRef, "aria-label": "Countries", children: [
        items.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "li",
          {
            role: "option",
            "aria-selected": value === c.code,
            className: `${i === hi ? "hi" : ""} ${value === c.code ? "sel" : ""}`,
            onMouseEnter: () => setHi(i),
            onClick: () => choose(c),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { code: c.code, size: 20 }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }),
              showDial && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: c.dial })
            ]
          },
          c.code
        )),
        !items.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "combo-empty", children: "No match" })
      ] })
    ] })
  ] });
}
function PhoneInput({ id, country, onCountry, value, onChange, invalid, required }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `phone ${invalid ? "invalid" : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountrySelect, { id: `${id}-cc`, value: country, onChange: onCountry, showDial: true, compact: true }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        id,
        type: "tel",
        inputMode: "numeric",
        autoComplete: "tel-national",
        value,
        onChange: (e) => onChange(e.target.value.replace(/[^\d\s-]/g, "")),
        placeholder: "Mobile number",
        "aria-invalid": invalid || void 0,
        "aria-describedby": invalid ? `${id}-err` : void 0,
        required
      }
    )
  ] });
}
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var pad = (n) => String(n).padStart(2, "0");
function DobPicker({ id, value, onChange, invalid }) {
  const now = /* @__PURE__ */ new Date();
  const maxYear = now.getFullYear() - MIN_AGE;
  const minYear = now.getFullYear() - 100;
  const init = value ? value.split("-").map(Number) : [maxYear - 12, 1, 1];
  const [open, setOpen] = (0, import_react.useState)(false);
  const [y, setY] = (0, import_react.useState)(init[0]);
  const [m, setM] = (0, import_react.useState)(init[1]);
  const wrap = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const close = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(false);
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);
  const days = new Date(y, m, 0).getDate();
  const first = new Date(y, m - 1, 1).getDay();
  const years = [];
  for (let yy = maxYear; yy >= minYear; yy--) years.push(yy);
  const display = value ? (() => {
    const [yy, mm, dd] = value.split("-").map(Number);
    return `${dd} ${MONTHS[mm - 1]} ${yy}`;
  })() : "";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `dob ${open ? "is-open" : ""}`, ref: wrap, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", id, className: `dob-btn ${invalid ? "invalid" : ""}`, "aria-haspopup": "dialog", "aria-expanded": open, onClick: () => setOpen((o) => !o), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dob-cake", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cake", size: 18 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: display ? "dob-val" : "dob-ph", children: display || "Day \xB7 Month \xB7 Year" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "calendar", size: 18, className: "dob-cal" })
    ] }),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dob-pop", role: "dialog", "aria-label": "Choose your date of birth", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dob-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", "aria-label": "Previous month", onClick: () => m === 1 ? (setM(12), setY(y - 1)) : setM(m - 1), disabled: y <= minYear && m === 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrowLeft", size: 16 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { "aria-label": "Month", value: m, onChange: (e) => setM(Number(e.target.value)), children: MONTHS.map((mn, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: i + 1, children: mn }, mn)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { "aria-label": "Year", value: y, onChange: (e) => setY(Number(e.target.value)), children: years.map((yy) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: yy, children: yy }, yy)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", "aria-label": "Next month", onClick: () => m === 12 ? (setM(1), setY(y + 1)) : setM(m + 1), disabled: y >= maxYear && m === 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow", size: 16 }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dob-grid", role: "grid", children: [
        ["S", "M", "T", "W", "T", "F", "S"].map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dow", "aria-hidden": "true", children: d }, i)),
        Array.from({ length: first }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, "b" + i)),
        Array.from({ length: days }).map((_, i) => {
          const v = `${y}-${pad(m)}-${pad(i + 1)}`;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              className: value === v ? "sel" : "",
              "aria-label": `${i + 1} ${MONTHS[m - 1]} ${y}`,
              "aria-pressed": value === v,
              onClick: () => {
                onChange(v);
                setOpen(false);
              },
              children: i + 1
            },
            v
          );
        })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "dob-note", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lock", size: 12 }),
        " Used for age validation only \xB7 ",
        MIN_AGE,
        "+ to join"
      ] })
    ] })
  ] });
}
var STRENGTH = ["Too weak", "Weak", "Fair", "Strong", "Excellent"];
function PasswordField({ id, value, onChange, invalid, showMeter = true, autoComplete = "new-password", placeholder = "At least 8 characters" }) {
  const [show, setShow] = (0, import_react.useState)(false);
  const s = passwordStrength(value);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pw", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `pw-row ${invalid ? "invalid" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lock", size: 18 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { id, type: show ? "text" : "password", value, onChange: (e) => onChange(e.target.value), autoComplete, placeholder, "aria-invalid": invalid || void 0 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => setShow((v) => !v), "aria-label": show ? "Hide password" : "Show password", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: show ? "eyeOff" : "eye", size: 18 }) })
    ] }),
    showMeter && value && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `pw-meter s${s}`, "aria-live": "polite", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: STRENGTH[s] })
    ] })
  ] });
}
var CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeCode() {
  let s = "";
  for (let i = 0; i < 5; i++) s += CHARS[Math.floor(Math.random() * CHARS.length)];
  return s;
}
function makeSum() {
  const a = 2 + Math.floor(Math.random() * 8);
  const b = 1 + Math.floor(Math.random() * 9);
  return { q: `${a} + ${b}`, a: String(a + b) };
}
function Captcha({ onChange, invalid, resetKey = 0 }) {
  const uid = (0, import_react.useId)();
  const canvas = (0, import_react.useRef)(null);
  const [mode, setMode] = (0, import_react.useState)("image");
  const [code, setCode] = (0, import_react.useState)("");
  const [sum, setSum] = (0, import_react.useState)({ q: "", a: "" });
  const [input, setInput] = (0, import_react.useState)("");
  const [ok, setOk] = (0, import_react.useState)(false);
  const regen = () => {
    setCode(makeCode());
    setSum(makeSum());
    setInput("");
    setOk(false);
    onChange?.(false);
  };
  (0, import_react.useEffect)(regen, [resetKey]);
  (0, import_react.useEffect)(() => {
    const c = canvas.current;
    if (!c || !code || mode !== "image") return;
    const dpr = window.devicePixelRatio || 1;
    const W = 170, H = 52;
    c.width = W * dpr;
    c.height = H * dpr;
    const g = c.getContext("2d");
    g.scale(dpr, dpr);
    const grd = g.createLinearGradient(0, 0, W, H);
    grd.addColorStop(0, "#eef2ff");
    grd.addColorStop(1, "#ecfeff");
    g.fillStyle = grd;
    g.fillRect(0, 0, W, H);
    for (let i = 0; i < 6; i++) {
      g.strokeStyle = `hsla(${Math.random() * 360},70%,55%,.45)`;
      g.lineWidth = 1 + Math.random() * 1.5;
      g.beginPath();
      g.moveTo(Math.random() * W, Math.random() * H);
      g.bezierCurveTo(Math.random() * W, Math.random() * H, Math.random() * W, Math.random() * H, Math.random() * W, Math.random() * H);
      g.stroke();
    }
    for (let i = 0; i < 40; i++) {
      g.fillStyle = `hsla(${Math.random() * 360},60%,50%,.35)`;
      g.fillRect(Math.random() * W, Math.random() * H, 2, 2);
    }
    const colors = ["#1e3a8a", "#b91c1c", "#047857", "#7c3aed", "#c2410c"];
    [...code].forEach((ch, i) => {
      g.save();
      g.translate(20 + i * 30, 34 + (Math.random() * 8 - 4));
      g.rotate((Math.random() - 0.5) * 0.6);
      g.font = `800 ${26 + Math.random() * 6}px Manrope, Inter, sans-serif`;
      g.fillStyle = colors[i % colors.length];
      g.fillText(ch, -8, 0);
      g.restore();
    });
  }, [code, mode]);
  const check = (v) => {
    setInput(v);
    const valid = mode === "image" ? v.trim().toUpperCase() === code : v.trim() === sum.a;
    setOk(valid);
    onChange?.(valid);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `captcha ${ok ? "is-ok" : ""} ${invalid ? "invalid" : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "captcha-top", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "captcha-badge", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "shieldCheck", size: 16 }),
        " Human check"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "captcha-switch", onClick: () => {
        setMode(mode === "image" ? "math" : "image");
        setInput("");
        setOk(false);
        onChange?.(false);
      }, children: mode === "image" ? "Use a maths question" : "Use an image code" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "captcha-body", children: [
      mode === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: canvas, className: "captcha-canvas", style: { width: 170, height: 52 }, role: "img", "aria-label": "Security code image. Switch to the maths question if you cannot read it." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "captcha-math", "aria-live": "polite", children: [
        "What is ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: sum.q }),
        "?"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "captcha-refresh", onClick: regen, "aria-label": "Get a new challenge", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "refresh", size: 18 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          id: uid,
          value: input,
          onChange: (e) => check(e.target.value),
          placeholder: mode === "image" ? "Type the code" : "Answer",
          "aria-label": mode === "image" ? "Type the characters shown" : `Answer: what is ${sum.q}`,
          autoComplete: "off",
          inputMode: mode === "math" ? "numeric" : "text",
          maxLength: 6
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "captcha-tick", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check", size: 18, stroke: 3 }) })
    ] })
  ] });
}

export {
  Field,
  CountrySelect,
  PhoneInput,
  DobPicker,
  PasswordField,
  Captcha
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2NvbXBvbmVudHMvRm9ybUtpdC5qc3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEZvcm0gYnVpbGRpbmcgYmxvY2tzOiBGaWVsZCwgQ291bnRyeVNlbGVjdCAoZmxhZ3MgKyBkaWFsIGNvZGVzKSwgUGhvbmVJbnB1dCwgRG9iUGlja2VyIChjYWxlbmRhciksXG4vLyBQYXNzd29yZEZpZWxkIChzdHJlbmd0aCBtZXRlcikgYW5kIENhcHRjaGEgKGNhbnZhcyBjb2RlICsgYWNjZXNzaWJsZSBtYXRocyBhbHRlcm5hdGl2ZSkuXG4vLyBDbGllbnQtc2lkZSBjaGVja3MgaW1wcm92ZSBVWCBvbmx5IFx1MjAxNCB0aGUgYmFja2VuZCBtdXN0IHZhbGlkYXRlIGV2ZXJ5dGhpbmcgYWdhaW4uXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZUlkLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uLmpzeCc7XG5pbXBvcnQgeyBGbGFnIH0gZnJvbSAnLi91aS5qc3gnO1xuaW1wb3J0IHsgQUxMX0NPVU5UUklFUywgY291bnRyeUJ5Q29kZSB9IGZyb20gJy4uL2RhdGEvY291bnRyaWVzLmpzJztcbmltcG9ydCB7IHBhc3N3b3JkU3RyZW5ndGggfSBmcm9tICcuLi91dGlscy9oZWxwZXJzLmpzJztcbmltcG9ydCB7IE1JTl9BR0UgfSBmcm9tICcuLi9jb25maWcvc2l0ZS5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWVsZCh7IGxhYmVsLCBlcnJvciwgaGludCwgcmVxdWlyZWQsIGNoaWxkcmVuLCBodG1sRm9yLCBjbGFzc05hbWUgPSAnJywgaWNvbiB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BmaWVsZCAke2Vycm9yID8gJ2hhcy1lcnJvcicgOiAnJ30gJHtjbGFzc05hbWV9YH0+XG4gICAgICA8bGFiZWwgaHRtbEZvcj17aHRtbEZvcn0+XG4gICAgICAgIHtpY29uICYmIDxJY29uIG5hbWU9e2ljb259IHNpemU9ezE1fSAvPn1cbiAgICAgICAge2xhYmVsfVxuICAgICAgICB7cmVxdWlyZWQgPyA8YiBhcmlhLWhpZGRlbj1cInRydWVcIj4qPC9iPiA6IDxlbT4gKG9wdGlvbmFsKTwvZW0+fVxuICAgICAgPC9sYWJlbD5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICAgIHtlcnJvciA/IChcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiZmllbGQtZXJyb3JcIiByb2xlPVwiYWxlcnRcIiBpZD17aHRtbEZvciA/IGAke2h0bWxGb3J9LWVycmAgOiB1bmRlZmluZWR9PlxuICAgICAgICAgIDxJY29uIG5hbWU9XCJpbmZvXCIgc2l6ZT17MTR9IC8+IHtlcnJvcn1cbiAgICAgICAgPC9wPlxuICAgICAgKSA6IGhpbnQgPyAoXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImZpZWxkLWhpbnRcIj57aGludH08L3A+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuLyogLS0tLS0tLS0tLSBDb3VudHJ5IGNvbWJvYm94IC0tLS0tLS0tLS0gKi9cbmV4cG9ydCBmdW5jdGlvbiBDb3VudHJ5U2VsZWN0KHsgaWQsIHZhbHVlLCBvbkNoYW5nZSwgc2hvd0RpYWwgPSBmYWxzZSwgcGxhY2Vob2xkZXIgPSAnU2VsZWN0IGNvdW50cnknLCBpbnZhbGlkLCBjb21wYWN0ID0gZmFsc2UsIGxpc3QgPSBBTExfQ09VTlRSSUVTIH0pIHtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcSwgc2V0UV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtoaSwgc2V0SGldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IHdyYXAgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHNlbGVjdGVkID0gdmFsdWUgPyBjb3VudHJ5QnlDb2RlKHZhbHVlKSA6IG51bGw7XG4gIGNvbnN0IGl0ZW1zID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgdCA9IHEudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHQgPyBsaXN0LmZpbHRlcigoYykgPT4gYy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModCkgfHwgYy5kaWFsLmluY2x1ZGVzKHQpIHx8IGMuY29kZSA9PT0gdCkgOiBsaXN0O1xuICB9LCBbcSwgbGlzdF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvcGVuKSByZXR1cm47XG4gICAgY29uc3QgY2xvc2UgPSAoZSkgPT4gd3JhcC5jdXJyZW50ICYmICF3cmFwLmN1cnJlbnQuY29udGFpbnMoZS50YXJnZXQpICYmIHNldE9wZW4oZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgY2xvc2UpO1xuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGNsb3NlKTtcbiAgfSwgW29wZW5dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxpc3RSZWYuY3VycmVudD8uY2hpbGRyZW5baGldPy5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG4gIH0sIFtoaV0pO1xuXG4gIGNvbnN0IGNob29zZSA9IChjKSA9PiB7XG4gICAgb25DaGFuZ2UoYy5jb2RlKTtcbiAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICBzZXRRKCcnKTtcbiAgfTtcblxuICBjb25zdCBvbktleSA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSAnQXJyb3dEb3duJykgeyBlLnByZXZlbnREZWZhdWx0KCk7IHNldEhpKChoKSA9PiBNYXRoLm1pbihoICsgMSwgaXRlbXMubGVuZ3RoIC0gMSkpOyB9XG4gICAgZWxzZSBpZiAoZS5rZXkgPT09ICdBcnJvd1VwJykgeyBlLnByZXZlbnREZWZhdWx0KCk7IHNldEhpKChoKSA9PiBNYXRoLm1heChoIC0gMSwgMCkpOyB9XG4gICAgZWxzZSBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBpdGVtc1toaV0gJiYgY2hvb3NlKGl0ZW1zW2hpXSk7IH1cbiAgICBlbHNlIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHNldE9wZW4oZmFsc2UpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2Bjb21ibyAke2NvbXBhY3QgPyAnY29tYm8tY29tcGFjdCcgOiAnJ30gJHtvcGVuID8gJ2lzLW9wZW4nIDogJyd9YH0gcmVmPXt3cmFwfT5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGlkPXtpZH1cbiAgICAgICAgY2xhc3NOYW1lPXtgY29tYm8tYnRuICR7aW52YWxpZCA/ICdpbnZhbGlkJyA6ICcnfWB9XG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJsaXN0Ym94XCJcbiAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cbiAgICAgICAgYXJpYS1pbnZhbGlkPXtpbnZhbGlkIHx8IHVuZGVmaW5lZH1cbiAgICAgICAgb25DbGljaz17KCkgPT4geyBzZXRPcGVuKChvKSA9PiAhbyk7IHNldEhpKDApOyB9fVxuICAgICAgPlxuICAgICAgICB7c2VsZWN0ZWQgPyAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxGbGFnIGNvZGU9e3NlbGVjdGVkLmNvZGV9IHNpemU9ezIyfSAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY29tYm8tdmFsXCI+e2NvbXBhY3QgPyBzZWxlY3RlZC5kaWFsIDogc2VsZWN0ZWQubmFtZX08L3NwYW4+XG4gICAgICAgICAgICB7c2hvd0RpYWwgJiYgIWNvbXBhY3QgJiYgPHNwYW4gY2xhc3NOYW1lPVwiY29tYm8tZGlhbFwiPntzZWxlY3RlZC5kaWFsfTwvc3Bhbj59XG4gICAgICAgICAgPC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY29tYm8tcGhcIj57cGxhY2Vob2xkZXJ9PC9zcGFuPlxuICAgICAgICApfVxuICAgICAgICA8SWNvbiBuYW1lPVwiYXJyb3dcIiBzaXplPXsxNH0gY2xhc3NOYW1lPVwiY29tYm8tY2hldlwiIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIHtvcGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21iby1wb3BcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbWJvLXNlYXJjaFwiPlxuICAgICAgICAgICAgPEljb24gbmFtZT1cInNlYXJjaFwiIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGF1dG9Gb2N1c1xuICAgICAgICAgICAgICB2YWx1ZT17cX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldFEoZS50YXJnZXQudmFsdWUpOyBzZXRIaSgwKTsgfX1cbiAgICAgICAgICAgICAgb25LZXlEb3duPXtvbktleX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggY291bnRyeSBvciBjb2RlXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlNlYXJjaCBjb3VudHJpZXNcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dWwgcm9sZT1cImxpc3Rib3hcIiByZWY9e2xpc3RSZWZ9IGFyaWEtbGFiZWw9XCJDb3VudHJpZXNcIj5cbiAgICAgICAgICAgIHtpdGVtcy5tYXAoKGMsIGkpID0+IChcbiAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAga2V5PXtjLmNvZGV9XG4gICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17dmFsdWUgPT09IGMuY29kZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake2kgPT09IGhpID8gJ2hpJyA6ICcnfSAke3ZhbHVlID09PSBjLmNvZGUgPyAnc2VsJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRIaShpKX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBjaG9vc2UoYyl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RmxhZyBjb2RlPXtjLmNvZGV9IHNpemU9ezIwfSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPntjLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIHtzaG93RGlhbCAmJiA8ZW0+e2MuZGlhbH08L2VtPn1cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgeyFpdGVtcy5sZW5ndGggJiYgPGxpIGNsYXNzTmFtZT1cImNvbWJvLWVtcHR5XCI+Tm8gbWF0Y2g8L2xpPn1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQaG9uZUlucHV0KHsgaWQsIGNvdW50cnksIG9uQ291bnRyeSwgdmFsdWUsIG9uQ2hhbmdlLCBpbnZhbGlkLCByZXF1aXJlZCB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BwaG9uZSAke2ludmFsaWQgPyAnaW52YWxpZCcgOiAnJ31gfT5cbiAgICAgIDxDb3VudHJ5U2VsZWN0IGlkPXtgJHtpZH0tY2NgfSB2YWx1ZT17Y291bnRyeX0gb25DaGFuZ2U9e29uQ291bnRyeX0gc2hvd0RpYWwgY29tcGFjdCAvPlxuICAgICAgPGlucHV0XG4gICAgICAgIGlkPXtpZH1cbiAgICAgICAgdHlwZT1cInRlbFwiXG4gICAgICAgIGlucHV0TW9kZT1cIm51bWVyaWNcIlxuICAgICAgICBhdXRvQ29tcGxldGU9XCJ0ZWwtbmF0aW9uYWxcIlxuICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoZS50YXJnZXQudmFsdWUucmVwbGFjZSgvW15cXGRcXHMtXS9nLCAnJykpfVxuICAgICAgICBwbGFjZWhvbGRlcj1cIk1vYmlsZSBudW1iZXJcIlxuICAgICAgICBhcmlhLWludmFsaWQ9e2ludmFsaWQgfHwgdW5kZWZpbmVkfVxuICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PXtpbnZhbGlkID8gYCR7aWR9LWVycmAgOiB1bmRlZmluZWR9XG4gICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8qIC0tLS0tLS0tLS0gRGF0ZSBvZiBiaXJ0aCBjYWxlbmRhciAtLS0tLS0tLS0tICovXG5jb25zdCBNT05USFMgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcbmNvbnN0IHBhZCA9IChuKSA9PiBTdHJpbmcobikucGFkU3RhcnQoMiwgJzAnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIERvYlBpY2tlcih7IGlkLCB2YWx1ZSwgb25DaGFuZ2UsIGludmFsaWQgfSkge1xuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBtYXhZZWFyID0gbm93LmdldEZ1bGxZZWFyKCkgLSBNSU5fQUdFO1xuICBjb25zdCBtaW5ZZWFyID0gbm93LmdldEZ1bGxZZWFyKCkgLSAxMDA7XG4gIGNvbnN0IGluaXQgPSB2YWx1ZSA/IHZhbHVlLnNwbGl0KCctJykubWFwKE51bWJlcikgOiBbbWF4WWVhciAtIDEyLCAxLCAxXTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbeSwgc2V0WV0gPSB1c2VTdGF0ZShpbml0WzBdKTtcbiAgY29uc3QgW20sIHNldE1dID0gdXNlU3RhdGUoaW5pdFsxXSk7XG4gIGNvbnN0IHdyYXAgPSB1c2VSZWYobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW9wZW4pIHJldHVybjtcbiAgICBjb25zdCBjbG9zZSA9IChlKSA9PiB3cmFwLmN1cnJlbnQgJiYgIXdyYXAuY3VycmVudC5jb250YWlucyhlLnRhcmdldCkgJiYgc2V0T3BlbihmYWxzZSk7XG4gICAgY29uc3QgZXNjID0gKGUpID0+IGUua2V5ID09PSAnRXNjYXBlJyAmJiBzZXRPcGVuKGZhbHNlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGNsb3NlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXNjKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBjbG9zZSk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXNjKTtcbiAgICB9O1xuICB9LCBbb3Blbl0pO1xuXG4gIGNvbnN0IGRheXMgPSBuZXcgRGF0ZSh5LCBtLCAwKS5nZXREYXRlKCk7XG4gIGNvbnN0IGZpcnN0ID0gbmV3IERhdGUoeSwgbSAtIDEsIDEpLmdldERheSgpO1xuICBjb25zdCB5ZWFycyA9IFtdO1xuICBmb3IgKGxldCB5eSA9IG1heFllYXI7IHl5ID49IG1pblllYXI7IHl5LS0pIHllYXJzLnB1c2goeXkpO1xuICBjb25zdCBkaXNwbGF5ID0gdmFsdWVcbiAgICA/ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IFt5eSwgbW0sIGRkXSA9IHZhbHVlLnNwbGl0KCctJykubWFwKE51bWJlcik7XG4gICAgICAgIHJldHVybiBgJHtkZH0gJHtNT05USFNbbW0gLSAxXX0gJHt5eX1gO1xuICAgICAgfSkoKVxuICAgIDogJyc7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YGRvYiAke29wZW4gPyAnaXMtb3BlbicgOiAnJ31gfSByZWY9e3dyYXB9PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9e2lkfSBjbGFzc05hbWU9e2Bkb2ItYnRuICR7aW52YWxpZCA/ICdpbnZhbGlkJyA6ICcnfWB9IGFyaWEtaGFzcG9wdXA9XCJkaWFsb2dcIiBhcmlhLWV4cGFuZGVkPXtvcGVufSBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKChvKSA9PiAhbyl9PlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkb2ItY2FrZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxJY29uIG5hbWU9XCJjYWtlXCIgc2l6ZT17MTh9IC8+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Rpc3BsYXkgPyAnZG9iLXZhbCcgOiAnZG9iLXBoJ30+e2Rpc3BsYXkgfHwgJ0RheSBcdTAwQjcgTW9udGggXHUwMEI3IFllYXInfTwvc3Bhbj5cbiAgICAgICAgPEljb24gbmFtZT1cImNhbGVuZGFyXCIgc2l6ZT17MTh9IGNsYXNzTmFtZT1cImRvYi1jYWxcIiAvPlxuICAgICAgPC9idXR0b24+XG4gICAgICB7b3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9iLXBvcFwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsPVwiQ2hvb3NlIHlvdXIgZGF0ZSBvZiBiaXJ0aFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZG9iLWhlYWRcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJQcmV2aW91cyBtb250aFwiIG9uQ2xpY2s9eygpID0+IChtID09PSAxID8gKHNldE0oMTIpLCBzZXRZKHkgLSAxKSkgOiBzZXRNKG0gLSAxKSl9IGRpc2FibGVkPXt5IDw9IG1pblllYXIgJiYgbSA9PT0gMX0+XG4gICAgICAgICAgICAgIDxJY29uIG5hbWU9XCJhcnJvd0xlZnRcIiBzaXplPXsxNn0gLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHNlbGVjdCBhcmlhLWxhYmVsPVwiTW9udGhcIiB2YWx1ZT17bX0gb25DaGFuZ2U9eyhlKSA9PiBzZXRNKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfT5cbiAgICAgICAgICAgICAge01PTlRIUy5tYXAoKG1uLCBpKSA9PiA8b3B0aW9uIGtleT17bW59IHZhbHVlPXtpICsgMX0+e21ufTwvb3B0aW9uPil9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDxzZWxlY3QgYXJpYS1sYWJlbD1cIlllYXJcIiB2YWx1ZT17eX0gb25DaGFuZ2U9eyhlKSA9PiBzZXRZKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfT5cbiAgICAgICAgICAgICAge3llYXJzLm1hcCgoeXkpID0+IDxvcHRpb24ga2V5PXt5eX0gdmFsdWU9e3l5fT57eXl9PC9vcHRpb24+KX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cIk5leHQgbW9udGhcIiBvbkNsaWNrPXsoKSA9PiAobSA9PT0gMTIgPyAoc2V0TSgxKSwgc2V0WSh5ICsgMSkpIDogc2V0TShtICsgMSkpfSBkaXNhYmxlZD17eSA+PSBtYXhZZWFyICYmIG0gPT09IDEyfT5cbiAgICAgICAgICAgICAgPEljb24gbmFtZT1cImFycm93XCIgc2l6ZT17MTZ9IC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvYi1ncmlkXCIgcm9sZT1cImdyaWRcIj5cbiAgICAgICAgICAgIHtbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXS5tYXAoKGQsIGkpID0+IDxzcGFuIGtleT17aX0gY2xhc3NOYW1lPVwiZG93XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+e2R9PC9zcGFuPil9XG4gICAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogZmlyc3QgfSkubWFwKChfLCBpKSA9PiA8c3BhbiBrZXk9eydiJyArIGl9IC8+KX1cbiAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBkYXlzIH0pLm1hcCgoXywgaSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2ID0gYCR7eX0tJHtwYWQobSl9LSR7cGFkKGkgKyAxKX1gO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAga2V5PXt2fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt2YWx1ZSA9PT0gdiA/ICdzZWwnIDogJyd9XG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtgJHtpICsgMX0gJHtNT05USFNbbSAtIDFdfSAke3l9YH1cbiAgICAgICAgICAgICAgICAgIGFyaWEtcHJlc3NlZD17dmFsdWUgPT09IHZ9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IG9uQ2hhbmdlKHYpOyBzZXRPcGVuKGZhbHNlKTsgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aSArIDF9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkb2Itbm90ZVwiPjxJY29uIG5hbWU9XCJsb2NrXCIgc2l6ZT17MTJ9IC8+IFVzZWQgZm9yIGFnZSB2YWxpZGF0aW9uIG9ubHkgXHUwMEI3IHtNSU5fQUdFfSsgdG8gam9pbjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vKiAtLS0tLS0tLS0tIFBhc3N3b3JkIC0tLS0tLS0tLS0gKi9cbmNvbnN0IFNUUkVOR1RIID0gWydUb28gd2VhaycsICdXZWFrJywgJ0ZhaXInLCAnU3Ryb25nJywgJ0V4Y2VsbGVudCddO1xuZXhwb3J0IGZ1bmN0aW9uIFBhc3N3b3JkRmllbGQoeyBpZCwgdmFsdWUsIG9uQ2hhbmdlLCBpbnZhbGlkLCBzaG93TWV0ZXIgPSB0cnVlLCBhdXRvQ29tcGxldGUgPSAnbmV3LXBhc3N3b3JkJywgcGxhY2Vob2xkZXIgPSAnQXQgbGVhc3QgOCBjaGFyYWN0ZXJzJyB9KSB7XG4gIGNvbnN0IFtzaG93LCBzZXRTaG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgcyA9IHBhc3N3b3JkU3RyZW5ndGgodmFsdWUpO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicHdcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcHctcm93ICR7aW52YWxpZCA/ICdpbnZhbGlkJyA6ICcnfWB9PlxuICAgICAgICA8SWNvbiBuYW1lPVwibG9ja1wiIHNpemU9ezE4fSAvPlxuICAgICAgICA8aW5wdXQgaWQ9e2lkfSB0eXBlPXtzaG93ID8gJ3RleHQnIDogJ3Bhc3N3b3JkJ30gdmFsdWU9e3ZhbHVlfSBvbkNoYW5nZT17KGUpID0+IG9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX0gYXV0b0NvbXBsZXRlPXthdXRvQ29tcGxldGV9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gYXJpYS1pbnZhbGlkPXtpbnZhbGlkIHx8IHVuZGVmaW5lZH0gLz5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17KCkgPT4gc2V0U2hvdygodikgPT4gIXYpfSBhcmlhLWxhYmVsPXtzaG93ID8gJ0hpZGUgcGFzc3dvcmQnIDogJ1Nob3cgcGFzc3dvcmQnfT5cbiAgICAgICAgICA8SWNvbiBuYW1lPXtzaG93ID8gJ2V5ZU9mZicgOiAnZXllJ30gc2l6ZT17MTh9IC8+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICB7c2hvd01ldGVyICYmIHZhbHVlICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Bwdy1tZXRlciBzJHtzfWB9IGFyaWEtbGl2ZT1cInBvbGl0ZVwiPlxuICAgICAgICAgIDxzcGFuPjxpIC8+PGkgLz48aSAvPjxpIC8+PC9zcGFuPlxuICAgICAgICAgIDxlbT57U1RSRU5HVEhbc119PC9lbT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG4vKiAtLS0tLS0tLS0tIENBUFRDSEEgLS0tLS0tLS0tLSAqL1xuY29uc3QgQ0hBUlMgPSAnQUJDREVGR0hKS0xNTlBRUlNUVVZXWFlaMjM0NTY3ODknO1xuZnVuY3Rpb24gbWFrZUNvZGUoKSB7XG4gIGxldCBzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSBzICs9IENIQVJTW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIENIQVJTLmxlbmd0aCldO1xuICByZXR1cm4gcztcbn1cbmZ1bmN0aW9uIG1ha2VTdW0oKSB7XG4gIGNvbnN0IGEgPSAyICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gIGNvbnN0IGIgPSAxICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSk7XG4gIHJldHVybiB7IHE6IGAke2F9ICsgJHtifWAsIGE6IFN0cmluZyhhICsgYikgfTtcbn1cblxuLyoqXG4gKiBWaXN1YWwgQ0FQVENIQSB3aXRoIGFuIGFjY2Vzc2libGUgbWF0aHMgYWx0ZXJuYXRpdmUuIENhbGxzIG9uQ2hhbmdlKGlzVmFsaWQpLlxuICogYHJlc2V0S2V5YCBcdTIwMTQgY2hhbmdlIGl0IHRvIGZvcmNlIGEgbmV3IGNoYWxsZW5nZSAoZS5nLiBhZnRlciBhIGZhaWxlZCBzdWJtaXQpLlxuICogTk9URTogY2xpZW50LXNpZGUgQ0FQVENIQSBkZXRlcnMgY2FzdWFsIGJvdHMgb25seS4gRm9yIHByb2R1Y3Rpb24sIGFsc28gdmVyaWZ5IGEgc2VydmVyLXNpZGVcbiAqIGNoYWxsZW5nZSAoZS5nLiBDbG91ZGZsYXJlIFR1cm5zdGlsZSBvciBHb29nbGUgcmVDQVBUQ0hBKSBcdTIwMTQgc2VlIFJFQURNRS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENhcHRjaGEoeyBvbkNoYW5nZSwgaW52YWxpZCwgcmVzZXRLZXkgPSAwIH0pIHtcbiAgY29uc3QgdWlkID0gdXNlSWQoKTtcbiAgY29uc3QgY2FudmFzID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBbbW9kZSwgc2V0TW9kZV0gPSB1c2VTdGF0ZSgnaW1hZ2UnKTtcbiAgY29uc3QgW2NvZGUsIHNldENvZGVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc3VtLCBzZXRTdW1dID0gdXNlU3RhdGUoeyBxOiAnJywgYTogJycgfSk7XG4gIGNvbnN0IFtpbnB1dCwgc2V0SW5wdXRdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbb2ssIHNldE9rXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCByZWdlbiA9ICgpID0+IHtcbiAgICBzZXRDb2RlKG1ha2VDb2RlKCkpO1xuICAgIHNldFN1bShtYWtlU3VtKCkpO1xuICAgIHNldElucHV0KCcnKTtcbiAgICBzZXRPayhmYWxzZSk7XG4gICAgb25DaGFuZ2U/LihmYWxzZSk7XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgdXNlRWZmZWN0KHJlZ2VuLCBbcmVzZXRLZXldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGMgPSBjYW52YXMuY3VycmVudDtcbiAgICBpZiAoIWMgfHwgIWNvZGUgfHwgbW9kZSAhPT0gJ2ltYWdlJykgcmV0dXJuO1xuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gICAgY29uc3QgVyA9IDE3MCwgSCA9IDUyO1xuICAgIGMud2lkdGggPSBXICogZHByO1xuICAgIGMuaGVpZ2h0ID0gSCAqIGRwcjtcbiAgICBjb25zdCBnID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGcuc2NhbGUoZHByLCBkcHIpO1xuICAgIGNvbnN0IGdyZCA9IGcuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgVywgSCk7XG4gICAgZ3JkLmFkZENvbG9yU3RvcCgwLCAnI2VlZjJmZicpO1xuICAgIGdyZC5hZGRDb2xvclN0b3AoMSwgJyNlY2ZlZmYnKTtcbiAgICBnLmZpbGxTdHlsZSA9IGdyZDtcbiAgICBnLmZpbGxSZWN0KDAsIDAsIFcsIEgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICBnLnN0cm9rZVN0eWxlID0gYGhzbGEoJHtNYXRoLnJhbmRvbSgpICogMzYwfSw3MCUsNTUlLC40NSlgO1xuICAgICAgZy5saW5lV2lkdGggPSAxICsgTWF0aC5yYW5kb20oKSAqIDEuNTtcbiAgICAgIGcuYmVnaW5QYXRoKCk7XG4gICAgICBnLm1vdmVUbyhNYXRoLnJhbmRvbSgpICogVywgTWF0aC5yYW5kb20oKSAqIEgpO1xuICAgICAgZy5iZXppZXJDdXJ2ZVRvKE1hdGgucmFuZG9tKCkgKiBXLCBNYXRoLnJhbmRvbSgpICogSCwgTWF0aC5yYW5kb20oKSAqIFcsIE1hdGgucmFuZG9tKCkgKiBILCBNYXRoLnJhbmRvbSgpICogVywgTWF0aC5yYW5kb20oKSAqIEgpO1xuICAgICAgZy5zdHJva2UoKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG4gICAgICBnLmZpbGxTdHlsZSA9IGBoc2xhKCR7TWF0aC5yYW5kb20oKSAqIDM2MH0sNjAlLDUwJSwuMzUpYDtcbiAgICAgIGcuZmlsbFJlY3QoTWF0aC5yYW5kb20oKSAqIFcsIE1hdGgucmFuZG9tKCkgKiBILCAyLCAyKTtcbiAgICB9XG4gICAgY29uc3QgY29sb3JzID0gWycjMWUzYThhJywgJyNiOTFjMWMnLCAnIzA0Nzg1NycsICcjN2MzYWVkJywgJyNjMjQxMGMnXTtcbiAgICBbLi4uY29kZV0uZm9yRWFjaCgoY2gsIGkpID0+IHtcbiAgICAgIGcuc2F2ZSgpO1xuICAgICAgZy50cmFuc2xhdGUoMjAgKyBpICogMzAsIDM0ICsgKE1hdGgucmFuZG9tKCkgKiA4IC0gNCkpO1xuICAgICAgZy5yb3RhdGUoKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMC42KTtcbiAgICAgIGcuZm9udCA9IGA4MDAgJHsyNiArIE1hdGgucmFuZG9tKCkgKiA2fXB4IE1hbnJvcGUsIEludGVyLCBzYW5zLXNlcmlmYDtcbiAgICAgIGcuZmlsbFN0eWxlID0gY29sb3JzW2kgJSBjb2xvcnMubGVuZ3RoXTtcbiAgICAgIGcuZmlsbFRleHQoY2gsIC04LCAwKTtcbiAgICAgIGcucmVzdG9yZSgpO1xuICAgIH0pO1xuICB9LCBbY29kZSwgbW9kZV0pO1xuXG4gIGNvbnN0IGNoZWNrID0gKHYpID0+IHtcbiAgICBzZXRJbnB1dCh2KTtcbiAgICBjb25zdCB2YWxpZCA9IG1vZGUgPT09ICdpbWFnZScgPyB2LnRyaW0oKS50b1VwcGVyQ2FzZSgpID09PSBjb2RlIDogdi50cmltKCkgPT09IHN1bS5hO1xuICAgIHNldE9rKHZhbGlkKTtcbiAgICBvbkNoYW5nZT8uKHZhbGlkKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgY2FwdGNoYSAke29rID8gJ2lzLW9rJyA6ICcnfSAke2ludmFsaWQgPyAnaW52YWxpZCcgOiAnJ31gfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FwdGNoYS10b3BcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2FwdGNoYS1iYWRnZVwiPjxJY29uIG5hbWU9XCJzaGllbGRDaGVja1wiIHNpemU9ezE2fSAvPiBIdW1hbiBjaGVjazwvc3Bhbj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2FwdGNoYS1zd2l0Y2hcIiBvbkNsaWNrPXsoKSA9PiB7IHNldE1vZGUobW9kZSA9PT0gJ2ltYWdlJyA/ICdtYXRoJyA6ICdpbWFnZScpOyBzZXRJbnB1dCgnJyk7IHNldE9rKGZhbHNlKTsgb25DaGFuZ2U/LihmYWxzZSk7IH19PlxuICAgICAgICAgIHttb2RlID09PSAnaW1hZ2UnID8gJ1VzZSBhIG1hdGhzIHF1ZXN0aW9uJyA6ICdVc2UgYW4gaW1hZ2UgY29kZSd9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcHRjaGEtYm9keVwiPlxuICAgICAgICB7bW9kZSA9PT0gJ2ltYWdlJyA/IChcbiAgICAgICAgICA8Y2FudmFzIHJlZj17Y2FudmFzfSBjbGFzc05hbWU9XCJjYXB0Y2hhLWNhbnZhc1wiIHN0eWxlPXt7IHdpZHRoOiAxNzAsIGhlaWdodDogNTIgfX0gcm9sZT1cImltZ1wiIGFyaWEtbGFiZWw9XCJTZWN1cml0eSBjb2RlIGltYWdlLiBTd2l0Y2ggdG8gdGhlIG1hdGhzIHF1ZXN0aW9uIGlmIHlvdSBjYW5ub3QgcmVhZCBpdC5cIiAvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FwdGNoYS1tYXRoXCIgYXJpYS1saXZlPVwicG9saXRlXCI+V2hhdCBpcyA8Yj57c3VtLnF9PC9iPj88L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2FwdGNoYS1yZWZyZXNoXCIgb25DbGljaz17cmVnZW59IGFyaWEtbGFiZWw9XCJHZXQgYSBuZXcgY2hhbGxlbmdlXCI+XG4gICAgICAgICAgPEljb24gbmFtZT1cInJlZnJlc2hcIiBzaXplPXsxOH0gLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGlkPXt1aWR9XG4gICAgICAgICAgdmFsdWU9e2lucHV0fVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gY2hlY2soZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXttb2RlID09PSAnaW1hZ2UnID8gJ1R5cGUgdGhlIGNvZGUnIDogJ0Fuc3dlcid9XG4gICAgICAgICAgYXJpYS1sYWJlbD17bW9kZSA9PT0gJ2ltYWdlJyA/ICdUeXBlIHRoZSBjaGFyYWN0ZXJzIHNob3duJyA6IGBBbnN3ZXI6IHdoYXQgaXMgJHtzdW0ucX1gfVxuICAgICAgICAgIGF1dG9Db21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgaW5wdXRNb2RlPXttb2RlID09PSAnbWF0aCcgPyAnbnVtZXJpYycgOiAndGV4dCd9XG4gICAgICAgICAgbWF4TGVuZ3RoPXs2fVxuICAgICAgICAvPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXB0Y2hhLXRpY2tcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPXsxOH0gc3Ryb2tlPXszfSAvPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBR0EsbUJBQTREO0FBVXREO0FBSEMsU0FBUyxNQUFNLEVBQUUsT0FBTyxPQUFPLE1BQU0sVUFBVSxVQUFVLFNBQVMsWUFBWSxJQUFJLEtBQUssR0FBRztBQUMvRixTQUNFLDZDQUFDLFNBQUksV0FBVyxTQUFTLFFBQVEsY0FBYyxFQUFFLElBQUksU0FBUyxJQUM1RDtBQUFBLGlEQUFDLFdBQU0sU0FDSjtBQUFBLGNBQVEsNENBQUMsUUFBSyxNQUFNLE1BQU0sTUFBTSxJQUFJO0FBQUEsTUFDcEM7QUFBQSxNQUNBLFdBQVcsNENBQUMsT0FBRSxlQUFZLFFBQU8sZUFBQyxJQUFPLDRDQUFDLFFBQUcseUJBQVc7QUFBQSxPQUMzRDtBQUFBLElBQ0M7QUFBQSxJQUNBLFFBQ0MsNkNBQUMsT0FBRSxXQUFVLGVBQWMsTUFBSyxTQUFRLElBQUksVUFBVSxHQUFHLE9BQU8sU0FBUyxRQUN2RTtBQUFBLGtEQUFDLFFBQUssTUFBSyxRQUFPLE1BQU0sSUFBSTtBQUFBLE1BQUU7QUFBQSxNQUFFO0FBQUEsT0FDbEMsSUFDRSxPQUNGLDRDQUFDLE9BQUUsV0FBVSxjQUFjLGdCQUFLLElBQzlCO0FBQUEsS0FDTjtBQUVKO0FBR08sU0FBUyxjQUFjLEVBQUUsSUFBSSxPQUFPLFVBQVUsV0FBVyxPQUFPLGNBQWMsa0JBQWtCLFNBQVMsVUFBVSxPQUFPLE9BQU8sY0FBYyxHQUFHO0FBQ3ZKLFFBQU0sQ0FB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
