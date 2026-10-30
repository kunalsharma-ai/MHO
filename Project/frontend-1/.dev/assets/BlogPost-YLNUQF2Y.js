import {
  NotFound
} from "/assets/chunk-UIRSHAI2.js";
import {
  BlogCard,
  BlogCover
} from "/assets/chunk-KDPAO74Y.js";
import {
  applyHead,
  getMeta,
  loadPost,
  postCache,
  readingTime
} from "/assets/chunk-AHHZWZL4.js";
import "/assets/chunk-VMMOAE2N.js";
import {
  BLOGS,
  findBlog
} from "/assets/chunk-P5UFEUM5.js";
import "/assets/chunk-JWSEDBGW.js";
import "/assets/chunk-GNLBIS5R.js";
import "/assets/chunk-EVZY7DYQ.js";
import "/assets/chunk-2PZ7UZDW.js";
import "/assets/chunk-GTWO7VGT.js";
import "/assets/chunk-53J6YGE2.js";
import "/assets/chunk-YUJB3ZOX.js";
import "/assets/chunk-NVJYUHG3.js";
import {
  Accordion,
  Breadcrumbs,
  Button,
  Icon,
  Link,
  require_jsx_runtime,
  require_react
} from "/assets/chunk-LANM2SZF.js";
import "/assets/chunk-D3EJIA6Q.js";
import {
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/pages/BlogPost.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);

// src/components/Markdown.jsx
init_define_import_meta_env();
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function inline(text, keyBase = "i") {
  const out = [];
  const rx = /(\*\*([^*]+)\*\*|\*([^*\s][^*]*?)\*|\[([^\]]+)\]\(([^)\s]+)\))/g;
  let last = 0;
  let m;
  let k = 0;
  while (m = rx.exec(text)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[2]) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: inline(m[2], keyBase + k + "b") }, keyBase + k++));
    else if (m[3]) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: m[3] }, keyBase + k++));
    else if (m[4]) {
      const href = m[5];
      if (href.startsWith("/")) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: href, children: m[4] }, keyBase + k++));
      else if (/^https:\/\//.test(href))
        out.push(
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href, target: "_blank", rel: "noopener noreferrer", className: "ext", children: m[4] }, keyBase + k++)
        );
      else out.push(m[4]);
    }
    last = rx.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
function parseBlocks(md) {
  const lines = md.replace(/\r/g, "").split("\n");
  const blocks = [];
  let para = [];
  let list = null;
  const flushPara = () => {
    if (para.length) blocks.push({ t: "p", text: para.join(" ") });
    para = [];
  };
  const flushList = () => {
    if (list) blocks.push(list);
    list = null;
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    let m;
    if (m = line.match(/^(#{2,3})\s+(.*)$/)) {
      flushPara();
      flushList();
      blocks.push({ t: m[1].length === 2 ? "h2" : "h3", text: m[2], id: slugify(m[2]) });
    } else if (m = line.match(/^[-*]\s+(.*)$/)) {
      flushPara();
      if (!list || list.t !== "ul") {
        flushList();
        list = { t: "ul", items: [] };
      }
      list.items.push(m[1]);
    } else if (m = line.match(/^\d+\.\s+(.*)$/)) {
      flushPara();
      if (!list || list.t !== "ol") {
        flushList();
        list = { t: "ol", items: [] };
      }
      list.items.push(m[1]);
    } else if (m = line.match(/^>\s?(.*)$/)) {
      flushPara();
      flushList();
      blocks.push({ t: "quote", text: m[1] });
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return blocks;
}
function Markdown({ blocks }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: blocks.map((b, i) => {
    if (b.t === "h2") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { id: b.id, children: inline(b.text, `h${i}`) }, i);
    if (b.t === "h3") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { id: b.id, children: inline(b.text, `h${i}`) }, i);
    if (b.t === "ul") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: b.items.map((it, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: inline(it, `l${i}-${j}`) }, j)) }, i);
    if (b.t === "ol") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: b.items.map((it, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: inline(it, `l${i}-${j}`) }, j)) }, i);
    if (b.t === "quote") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: inline(b.text, `q${i}`) }) }, i);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: inline(b.text, `p${i}`) }, i);
  }) });
}

// src/pages/BlogPost.jsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var fmt = (d) => (/* @__PURE__ */ new Date(d + "T00:00:00Z")).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
function Toc({ items }) {
  const [active, setActive] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
    }, { rootMargin: "-20% 0px -70% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("nav", { className: "toc", "aria-label": "On this page", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: "On this page" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ol", { children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { className: active === i.id ? "on" : "", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { href: `#${i.id}`, onClick: (e) => {
      e.preventDefault();
      document.getElementById(i.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, children: i.text }) }, i.id)) })
  ] });
}
function BlogPost({ path }) {
  const slug = path.replace(/^\/blog\//, "");
  const meta = findBlog(slug);
  const [, rerender] = (0, import_react.useReducer)((x) => x + 1, 0);
  const post = postCache[slug];
  (0, import_react.useEffect)(() => {
    if (meta && !postCache[slug]) loadPost(slug).then(() => {
      rerender();
      applyHead(getMeta(path, { post: postCache[slug] }));
    });
  }, [slug, meta, path]);
  const blocks = (0, import_react.useMemo)(() => post ? parseBlocks(post.body) : [], [post]);
  const toc = blocks.filter((b) => b.t === "h2");
  const related = (0, import_react.useMemo)(() => {
    if (!meta) return [];
    const same = BLOGS.filter((b) => b.slug !== slug && b.category === meta.category);
    const other = BLOGS.filter((b) => b.slug !== slug && b.category !== meta.category);
    return [...same, ...other].slice(0, 3);
  }, [slug, meta]);
  if (!meta) return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(NotFound, {});
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("article", { className: "post", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("header", { className: "post-hero", style: { "--from": meta.cover.from, "--to": meta.cover.to }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container post-hero-inner", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "ph-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Breadcrumbs, { items: [{ to: "/", label: "Home" }, { to: "/blog", label: "Blogs" }, { label: meta.title }] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "post-cat", children: meta.category }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { children: meta.title }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "post-lead", children: meta.metaDescription }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "post-meta", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "calendar", size: 14 }),
            " ",
            fmt(meta.date)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "clock", size: 14 }),
            " ",
            readingTime(post),
            " min read"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "user", size: 14 }),
            " MyHealthOpinions editorial team"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(BlogCover, { post: meta, big: true })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container post-layout", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("aside", { className: "post-aside", children: [
        toc.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Toc, { items: toc }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "aside-cta", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "coins", size: 22 }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: "Get paid for your opinion" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Free to join. Rewards via PayPal, Amazon Gift Cards, Wire \u2014 and UPI in India." }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Link, { to: "/join", className: "btn btn-primary btn-sm", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "btn-label", children: "Join free" }) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "post-body prose", children: [
        post ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Markdown, { blocks }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "post-skeleton", "aria-label": "Loading article", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", {})
        ] }),
        post?.faqs?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "post-faq", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { id: "faqs", children: "Frequently asked questions" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Accordion, { items: post.faqs, idPrefix: `pf-${slug}`, defaultOpen: 0 })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "post-cta", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "Ready to turn your opinions into rewards?" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Join MyHealthOpinions free \u2014 healthcare professionals, caregivers, patients and consumers in 55 countries." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { to: "/join", variant: "gold", children: "Create free account" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "section post-related", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "container", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "related-title", children: "Keep reading" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "blog-grid", children: related.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(BlogCard, { post: p, i }, p.slug)) })
    ] }) })
  ] });
}
export {
  BlogPost as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3BhZ2VzL0Jsb2dQb3N0LmpzeCIsICIuLi8uLi9zcmMvY29tcG9uZW50cy9NYXJrZG93bi5qc3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEJsb2cgYXJ0aWNsZTogaGVybyBjb3ZlciwgcmVhZGluZyBwcm9ncmVzcywgc3RpY2t5IHRhYmxlIG9mIGNvbnRlbnRzLCBib2R5LCBGQVFzLCByZWxhdGVkIGd1aWRlcy5cbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVkdWNlciwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAnLi4vcm91dGVyLmpzeCc7XG5pbXBvcnQgSWNvbiBmcm9tICcuLi9jb21wb25lbnRzL0ljb24uanN4JztcbmltcG9ydCBNYXJrZG93biwgeyBwYXJzZUJsb2NrcyB9IGZyb20gJy4uL2NvbXBvbmVudHMvTWFya2Rvd24uanN4JztcbmltcG9ydCB7IEJyZWFkY3J1bWJzLCBBY2NvcmRpb24sIEJ1dHRvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkuanN4JztcbmltcG9ydCB7IEJsb2dDb3ZlciwgQmxvZ0NhcmQgfSBmcm9tICcuL0Jsb2cuanN4JztcbmltcG9ydCB7IGZpbmRCbG9nLCBCTE9HUyB9IGZyb20gJy4uL2RhdGEvYmxvZ3MvaW5kZXguanMnO1xuaW1wb3J0IHsgcG9zdENhY2hlLCBsb2FkUG9zdCwgcmVhZGluZ1RpbWUgfSBmcm9tICcuLi9kYXRhL2Jsb2dzL3Bvc3RTdG9yZS5qcyc7XG5pbXBvcnQgeyBnZXRNZXRhLCBhcHBseUhlYWQgfSBmcm9tICcuLi9zZW8vaGVhZC5qcyc7XG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnLi9Ob3RGb3VuZC5qc3gnO1xuXG5jb25zdCBmbXQgPSAoZCkgPT4gbmV3IERhdGUoZCArICdUMDA6MDA6MDBaJykudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1HQicsIHsgZGF5OiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIHllYXI6ICdudW1lcmljJywgdGltZVpvbmU6ICdVVEMnIH0pO1xuXG5mdW5jdGlvbiBUb2MoeyBpdGVtcyB9KSB7XG4gIGNvbnN0IFthY3RpdmUsIHNldEFjdGl2ZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZWxzID0gaXRlbXMubWFwKChpKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpLmlkKSkuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmICghZWxzLmxlbmd0aCB8fCB0eXBlb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgY29uc3QgaW8gPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaCgoZSkgPT4gZS5pc0ludGVyc2VjdGluZyAmJiBzZXRBY3RpdmUoZS50YXJnZXQuaWQpKTtcbiAgICB9LCB7IHJvb3RNYXJnaW46ICctMjAlIDBweCAtNzAlIDBweCcgfSk7XG4gICAgZWxzLmZvckVhY2goKGVsKSA9PiBpby5vYnNlcnZlKGVsKSk7XG4gICAgcmV0dXJuICgpID0+IGlvLmRpc2Nvbm5lY3QoKTtcbiAgfSwgW2l0ZW1zXSk7XG4gIHJldHVybiAoXG4gICAgPG5hdiBjbGFzc05hbWU9XCJ0b2NcIiBhcmlhLWxhYmVsPVwiT24gdGhpcyBwYWdlXCI+XG4gICAgICA8Yj5PbiB0aGlzIHBhZ2U8L2I+XG4gICAgICA8b2w+XG4gICAgICAgIHtpdGVtcy5tYXAoKGkpID0+IChcbiAgICAgICAgICA8bGkga2V5PXtpLmlkfSBjbGFzc05hbWU9e2FjdGl2ZSA9PT0gaS5pZCA/ICdvbicgOiAnJ30+XG4gICAgICAgICAgICA8YSBocmVmPXtgIyR7aS5pZH1gfSBvbkNsaWNrPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGkuaWQpPy5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdzdGFydCcgfSk7IH19PntpLnRleHR9PC9hPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICkpfVxuICAgICAgPC9vbD5cbiAgICA8L25hdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQmxvZ1Bvc3QoeyBwYXRoIH0pIHtcbiAgY29uc3Qgc2x1ZyA9IHBhdGgucmVwbGFjZSgvXlxcL2Jsb2dcXC8vLCAnJyk7XG4gIGNvbnN0IG1ldGEgPSBmaW5kQmxvZyhzbHVnKTtcbiAgY29uc3QgWywgcmVyZW5kZXJdID0gdXNlUmVkdWNlcigoeCkgPT4geCArIDEsIDApO1xuICBjb25zdCBwb3N0ID0gcG9zdENhY2hlW3NsdWddO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG1ldGEgJiYgIXBvc3RDYWNoZVtzbHVnXSkgbG9hZFBvc3Qoc2x1ZykudGhlbigoKSA9PiB7IHJlcmVuZGVyKCk7IGFwcGx5SGVhZChnZXRNZXRhKHBhdGgsIHsgcG9zdDogcG9zdENhY2hlW3NsdWddIH0pKTsgfSk7XG4gIH0sIFtzbHVnLCBtZXRhLCBwYXRoXSk7XG5cbiAgY29uc3QgYmxvY2tzID0gdXNlTWVtbygoKSA9PiAocG9zdCA/IHBhcnNlQmxvY2tzKHBvc3QuYm9keSkgOiBbXSksIFtwb3N0XSk7XG4gIGNvbnN0IHRvYyA9IGJsb2Nrcy5maWx0ZXIoKGIpID0+IGIudCA9PT0gJ2gyJyk7XG4gIGNvbnN0IHJlbGF0ZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIW1ldGEpIHJldHVybiBbXTtcbiAgICBjb25zdCBzYW1lID0gQkxPR1MuZmlsdGVyKChiKSA9PiBiLnNsdWcgIT09IHNsdWcgJiYgYi5jYXRlZ29yeSA9PT0gbWV0YS5jYXRlZ29yeSk7XG4gICAgY29uc3Qgb3RoZXIgPSBCTE9HUy5maWx0ZXIoKGIpID0+IGIuc2x1ZyAhPT0gc2x1ZyAmJiBiLmNhdGVnb3J5ICE9PSBtZXRhLmNhdGVnb3J5KTtcbiAgICByZXR1cm4gWy4uLnNhbWUsIC4uLm90aGVyXS5zbGljZSgwLCAzKTtcbiAgfSwgW3NsdWcsIG1ldGFdKTtcblxuICBpZiAoIW1ldGEpIHJldHVybiA8Tm90Rm91bmQgLz47XG5cbiAgcmV0dXJuIChcbiAgICA8YXJ0aWNsZSBjbGFzc05hbWU9XCJwb3N0XCI+XG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInBvc3QtaGVyb1wiIHN0eWxlPXt7ICctLWZyb20nOiBtZXRhLmNvdmVyLmZyb20sICctLXRvJzogbWV0YS5jb3Zlci50byB9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgcG9zdC1oZXJvLWlubmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaC1jb3B5XCI+XG4gICAgICAgICAgICA8QnJlYWRjcnVtYnMgaXRlbXM9e1t7IHRvOiAnLycsIGxhYmVsOiAnSG9tZScgfSwgeyB0bzogJy9ibG9nJywgbGFiZWw6ICdCbG9ncycgfSwgeyBsYWJlbDogbWV0YS50aXRsZSB9XX0gLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBvc3QtY2F0XCI+e21ldGEuY2F0ZWdvcnl9PC9zcGFuPlxuICAgICAgICAgICAgPGgxPnttZXRhLnRpdGxlfTwvaDE+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwb3N0LWxlYWRcIj57bWV0YS5tZXRhRGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicG9zdC1tZXRhXCI+XG4gICAgICAgICAgICAgIDxzcGFuPjxJY29uIG5hbWU9XCJjYWxlbmRhclwiIHNpemU9ezE0fSAvPiB7Zm10KG1ldGEuZGF0ZSl9PC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj48SWNvbiBuYW1lPVwiY2xvY2tcIiBzaXplPXsxNH0gLz4ge3JlYWRpbmdUaW1lKHBvc3QpfSBtaW4gcmVhZDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+PEljb24gbmFtZT1cInVzZXJcIiBzaXplPXsxNH0gLz4gTXlIZWFsdGhPcGluaW9ucyBlZGl0b3JpYWwgdGVhbTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8QmxvZ0NvdmVyIHBvc3Q9e21ldGF9IGJpZyAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvaGVhZGVyPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBwb3N0LWxheW91dFwiPlxuICAgICAgICA8YXNpZGUgY2xhc3NOYW1lPVwicG9zdC1hc2lkZVwiPlxuICAgICAgICAgIHt0b2MubGVuZ3RoID4gMCAmJiA8VG9jIGl0ZW1zPXt0b2N9IC8+fVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXNpZGUtY3RhXCI+XG4gICAgICAgICAgICA8SWNvbiBuYW1lPVwiY29pbnNcIiBzaXplPXsyMn0gLz5cbiAgICAgICAgICAgIDxiPkdldCBwYWlkIGZvciB5b3VyIG9waW5pb248L2I+XG4gICAgICAgICAgICA8c3Bhbj5GcmVlIHRvIGpvaW4uIFJld2FyZHMgdmlhIFBheVBhbCwgQW1hem9uIEdpZnQgQ2FyZHMsIFdpcmUgXHUyMDE0IGFuZCBVUEkgaW4gSW5kaWEuPC9zcGFuPlxuICAgICAgICAgICAgPExpbmsgdG89XCIvam9pblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBidG4tc21cIj48c3BhbiBjbGFzc05hbWU9XCJidG4tbGFiZWxcIj5Kb2luIGZyZWU8L3NwYW4+PC9MaW5rPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2FzaWRlPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdC1ib2R5IHByb3NlXCI+XG4gICAgICAgICAge3Bvc3QgPyA8TWFya2Rvd24gYmxvY2tzPXtibG9ja3N9IC8+IDogPGRpdiBjbGFzc05hbWU9XCJwb3N0LXNrZWxldG9uXCIgYXJpYS1sYWJlbD1cIkxvYWRpbmcgYXJ0aWNsZVwiPjxpIC8+PGkgLz48aSAvPjxpIC8+PC9kaXY+fVxuXG4gICAgICAgICAge3Bvc3Q/LmZhcXM/Lmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicG9zdC1mYXFcIj5cbiAgICAgICAgICAgICAgPGgyIGlkPVwiZmFxc1wiPkZyZXF1ZW50bHkgYXNrZWQgcXVlc3Rpb25zPC9oMj5cbiAgICAgICAgICAgICAgPEFjY29yZGlvbiBpdGVtcz17cG9zdC5mYXFzfSBpZFByZWZpeD17YHBmLSR7c2x1Z31gfSBkZWZhdWx0T3Blbj17MH0gLz5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0LWN0YVwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgyPlJlYWR5IHRvIHR1cm4geW91ciBvcGluaW9ucyBpbnRvIHJld2FyZHM/PC9oMj5cbiAgICAgICAgICAgICAgPHA+Sm9pbiBNeUhlYWx0aE9waW5pb25zIGZyZWUgXHUyMDE0IGhlYWx0aGNhcmUgcHJvZmVzc2lvbmFscywgY2FyZWdpdmVycywgcGF0aWVudHMgYW5kIGNvbnN1bWVycyBpbiA1NSBjb3VudHJpZXMuPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8QnV0dG9uIHRvPVwiL2pvaW5cIiB2YXJpYW50PVwiZ29sZFwiPkNyZWF0ZSBmcmVlIGFjY291bnQ8L0J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdGlvbiBwb3N0LXJlbGF0ZWRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwicmVsYXRlZC10aXRsZVwiPktlZXAgcmVhZGluZzwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9nLWdyaWRcIj57cmVsYXRlZC5tYXAoKHAsIGkpID0+IDxCbG9nQ2FyZCBrZXk9e3Auc2x1Z30gcG9zdD17cH0gaT17aX0gLz4pfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICA8L2FydGljbGU+XG4gICk7XG59XG4iLCAiLy8gVGlueSwgc2FmZSBNYXJrZG93biByZW5kZXJlciBmb3IgYmxvZyBib2RpZXMgKG5vIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKS5cbi8vIFN1cHBvcnRzOiAjIyAvICMjIyBoZWFkaW5ncywgcGFyYWdyYXBocywgLSBsaXN0cywgMS4gbGlzdHMsID4gcXVvdGVzLCAqKmJvbGQqKiwgKml0YWxpYyosIFtsaW5rc10odXJsKS5cbi8vIEludGVybmFsIGxpbmtzIChzdGFydGluZyB3aXRoIFwiL1wiKSB1c2UgdGhlIGNsaWVudCByb3V0ZXI7IGV4dGVybmFsIGxpbmtzIG9wZW4gaW4gYSBuZXcgdGFiLlxuaW1wb3J0IHsgTGluayB9IGZyb20gJy4uL3JvdXRlci5qc3gnO1xuXG5leHBvcnQgY29uc3Qgc2x1Z2lmeSA9IChzKSA9PiBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15hLXowLTldKy9nLCAnLScpLnJlcGxhY2UoL14tfC0kL2csICcnKTtcblxuZnVuY3Rpb24gaW5saW5lKHRleHQsIGtleUJhc2UgPSAnaScpIHtcbiAgY29uc3Qgb3V0ID0gW107XG4gIGNvbnN0IHJ4ID0gLyhcXCpcXCooW14qXSspXFwqXFwqfFxcKihbXipcXHNdW14qXSo/KVxcKnxcXFsoW15cXF1dKylcXF1cXCgoW14pXFxzXSspXFwpKS9nO1xuICBsZXQgbGFzdCA9IDA7XG4gIGxldCBtO1xuICBsZXQgayA9IDA7XG4gIHdoaWxlICgobSA9IHJ4LmV4ZWModGV4dCkpKSB7XG4gICAgaWYgKG0uaW5kZXggPiBsYXN0KSBvdXQucHVzaCh0ZXh0LnNsaWNlKGxhc3QsIG0uaW5kZXgpKTtcbiAgICBpZiAobVsyXSkgb3V0LnB1c2goPHN0cm9uZyBrZXk9e2tleUJhc2UgKyBrKyt9PntpbmxpbmUobVsyXSwga2V5QmFzZSArIGsgKyAnYicpfTwvc3Ryb25nPik7XG4gICAgZWxzZSBpZiAobVszXSkgb3V0LnB1c2goPGVtIGtleT17a2V5QmFzZSArIGsrK30+e21bM119PC9lbT4pO1xuICAgIGVsc2UgaWYgKG1bNF0pIHtcbiAgICAgIGNvbnN0IGhyZWYgPSBtWzVdO1xuICAgICAgaWYgKGhyZWYuc3RhcnRzV2l0aCgnLycpKSBvdXQucHVzaCg8TGluayBrZXk9e2tleUJhc2UgKyBrKyt9IHRvPXtocmVmfT57bVs0XX08L0xpbms+KTtcbiAgICAgIGVsc2UgaWYgKC9eaHR0cHM6XFwvXFwvLy50ZXN0KGhyZWYpKVxuICAgICAgICBvdXQucHVzaChcbiAgICAgICAgICA8YSBrZXk9e2tleUJhc2UgKyBrKyt9IGhyZWY9e2hyZWZ9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBjbGFzc05hbWU9XCJleHRcIj5cbiAgICAgICAgICAgIHttWzRdfVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgKTtcbiAgICAgIGVsc2Ugb3V0LnB1c2gobVs0XSk7XG4gICAgfVxuICAgIGxhc3QgPSByeC5sYXN0SW5kZXg7XG4gIH1cbiAgaWYgKGxhc3QgPCB0ZXh0Lmxlbmd0aCkgb3V0LnB1c2godGV4dC5zbGljZShsYXN0KSk7XG4gIHJldHVybiBvdXQ7XG59XG5cbi8qKiBQYXJzZSB0aGUgYm9keSBpbnRvIGJsb2NrcyBvbmNlIChhbHNvIHVzZWQgZm9yIHRoZSB0YWJsZSBvZiBjb250ZW50cykuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VCbG9ja3MobWQpIHtcbiAgY29uc3QgbGluZXMgPSBtZC5yZXBsYWNlKC9cXHIvZywgJycpLnNwbGl0KCdcXG4nKTtcbiAgY29uc3QgYmxvY2tzID0gW107XG4gIGxldCBwYXJhID0gW107XG4gIGxldCBsaXN0ID0gbnVsbDtcbiAgY29uc3QgZmx1c2hQYXJhID0gKCkgPT4ge1xuICAgIGlmIChwYXJhLmxlbmd0aCkgYmxvY2tzLnB1c2goeyB0OiAncCcsIHRleHQ6IHBhcmEuam9pbignICcpIH0pO1xuICAgIHBhcmEgPSBbXTtcbiAgfTtcbiAgY29uc3QgZmx1c2hMaXN0ID0gKCkgPT4ge1xuICAgIGlmIChsaXN0KSBibG9ja3MucHVzaChsaXN0KTtcbiAgICBsaXN0ID0gbnVsbDtcbiAgfTtcbiAgZm9yIChjb25zdCByYXcgb2YgbGluZXMpIHtcbiAgICBjb25zdCBsaW5lID0gcmF3LnRyaW0oKTtcbiAgICBpZiAoIWxpbmUpIHtcbiAgICAgIGZsdXNoUGFyYSgpO1xuICAgICAgZmx1c2hMaXN0KCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgbGV0IG07XG4gICAgaWYgKChtID0gbGluZS5tYXRjaCgvXigjezIsM30pXFxzKyguKikkLykpKSB7XG4gICAgICBmbHVzaFBhcmEoKTtcbiAgICAgIGZsdXNoTGlzdCgpO1xuICAgICAgYmxvY2tzLnB1c2goeyB0OiBtWzFdLmxlbmd0aCA9PT0gMiA/ICdoMicgOiAnaDMnLCB0ZXh0OiBtWzJdLCBpZDogc2x1Z2lmeShtWzJdKSB9KTtcbiAgICB9IGVsc2UgaWYgKChtID0gbGluZS5tYXRjaCgvXlstKl1cXHMrKC4qKSQvKSkpIHtcbiAgICAgIGZsdXNoUGFyYSgpO1xuICAgICAgaWYgKCFsaXN0IHx8IGxpc3QudCAhPT0gJ3VsJykgeyBmbHVzaExpc3QoKTsgbGlzdCA9IHsgdDogJ3VsJywgaXRlbXM6IFtdIH07IH1cbiAgICAgIGxpc3QuaXRlbXMucHVzaChtWzFdKTtcbiAgICB9IGVsc2UgaWYgKChtID0gbGluZS5tYXRjaCgvXlxcZCtcXC5cXHMrKC4qKSQvKSkpIHtcbiAgICAgIGZsdXNoUGFyYSgpO1xuICAgICAgaWYgKCFsaXN0IHx8IGxpc3QudCAhPT0gJ29sJykgeyBmbHVzaExpc3QoKTsgbGlzdCA9IHsgdDogJ29sJywgaXRlbXM6IFtdIH07IH1cbiAgICAgIGxpc3QuaXRlbXMucHVzaChtWzFdKTtcbiAgICB9IGVsc2UgaWYgKChtID0gbGluZS5tYXRjaCgvXj5cXHM/KC4qKSQvKSkpIHtcbiAgICAgIGZsdXNoUGFyYSgpO1xuICAgICAgZmx1c2hMaXN0KCk7XG4gICAgICBibG9ja3MucHVzaCh7IHQ6ICdxdW90ZScsIHRleHQ6IG1bMV0gfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsdXNoTGlzdCgpO1xuICAgICAgcGFyYS5wdXNoKGxpbmUpO1xuICAgIH1cbiAgfVxuICBmbHVzaFBhcmEoKTtcbiAgZmx1c2hMaXN0KCk7XG4gIHJldHVybiBibG9ja3M7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1hcmtkb3duKHsgYmxvY2tzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge2Jsb2Nrcy5tYXAoKGIsIGkpID0+IHtcbiAgICAgICAgaWYgKGIudCA9PT0gJ2gyJykgcmV0dXJuIDxoMiBrZXk9e2l9IGlkPXtiLmlkfT57aW5saW5lKGIudGV4dCwgYGgke2l9YCl9PC9oMj47XG4gICAgICAgIGlmIChiLnQgPT09ICdoMycpIHJldHVybiA8aDMga2V5PXtpfSBpZD17Yi5pZH0+e2lubGluZShiLnRleHQsIGBoJHtpfWApfTwvaDM+O1xuICAgICAgICBpZiAoYi50ID09PSAndWwnKSByZXR1cm4gPHVsIGtleT17aX0+e2IuaXRlbXMubWFwKChpdCwgaikgPT4gPGxpIGtleT17an0+e2lubGluZShpdCwgYGwke2l9LSR7an1gKX08L2xpPil9PC91bD47XG4gICAgICAgIGlmIChiLnQgPT09ICdvbCcpIHJldHVybiA8b2wga2V5PXtpfT57Yi5pdGVtcy5tYXAoKGl0LCBqKSA9PiA8bGkga2V5PXtqfT57aW5saW5lKGl0LCBgbCR7aX0tJHtqfWApfTwvbGk+KX08L29sPjtcbiAgICAgICAgaWYgKGIudCA9PT0gJ3F1b3RlJykgcmV0dXJuIDxibG9ja3F1b3RlIGtleT17aX0+PHA+e2lubGluZShiLnRleHQsIGBxJHtpfWApfTwvcD48L2Jsb2NrcXVvdGU+O1xuICAgICAgICByZXR1cm4gPHAga2V5PXtpfT57aW5saW5lKGIudGV4dCwgYHAke2l9YCl9PC9wPjtcbiAgICAgIH0pfVxuICAgIDwvPlxuICApO1xufVxuIl0sCiAg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QUk7QUFBQSxZQUFFO0FBQUEsYUFBZ0M7QUFBQSxXQUN0RTtBQUFBLFNBQ0Y7QUFBQSxNQUNBLDZDQUFDLGFBQVUsTUFBTSxNQUFNLEtBQUcsTUFBQztBQUFBLE9BQzdCLEdBQ0Y7QUFBQSxJQUVBLDhDQUFDLFNBQUksV0FBVSx5QkFDYjtBQUFBLG9EQUFDLFdBQU0sV0FBVSxjQUNkO0FBQUEsWUFBSSxTQUFTLEtBQUssNkNBQUMsT0FBSSxPQUFPLEtBQUs7QUFBQSxRQUNwQyw4Q0FBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLHVEQUFDLFFBQUssTUFBSyxTQUFRLE1BQU0sSUFBSTtBQUFBLFVBQzdCLDZDQUFDLE9BQUUsdUNBQXlCO0FBQUEsVUFDNUIsNkNBQUMsVUFBSyxnR0FBNkU7QUFBQSxVQUNuRiw2Q0FBQyxRQUFLLElBQUcsU0FBUSxXQUFVLDBCQUF5Qix1REFBQyxVQUFLLFdBQVUsYUFBWSx1QkFBUyxHQUFPO0FBQUEsV0FDbEc7QUFBQSxTQUNGO0FBQUEsTUFFQSw4Q0FBQyxTQUFJLFdBQVUsbUJBQ1o7QUFBQSxlQUFPLDZDQUFDLFlBQVMsUUFBZ0IsSUFBSyw4Q0FBQyxTQUFJLFdBQVUsaUJBQWdCLGNBQVcsbUJBQWtCO0FBQUEsdURBQUMsT0FBRTtBQUFBLFVBQUUsNkNBQUMsT0FBRTtBQUFBLFVBQUUsNkNBQUMsT0FBRTtBQUFBLFVBQUUsNkNBQUMsT0FBRTtBQUFBLFdBQUU7QUFBQSxRQUV0SCxNQUFNLE1BQU0sU0FBUyxLQUNwQiw4Q0FBQyxhQUFRLFdBQVUsWUFDakI7QUFBQSx1REFBQyxRQUFHLElBQUcsUUFBTyx3Q0FBMEI7QUFBQSxVQUN4Qyw2Q0FBQyxhQUFVLE9BQU8sS0FBSyxNQUFNLFVBQVUsTUFBTSxJQUFJLElBQUksYUFBYSxHQUFHO0FBQUEsV0FDdkU7QUFBQSxRQUdGLDhDQUFDLFNBQUksV0FBVSxZQUNiO0FBQUEsd0RBQUMsU0FDQztBQUFBLHlEQUFDLFFBQUcsdURBQXlDO0FBQUEsWUFDN0MsNkNBQUMsT0FBRSw2SEFBMEc7QUFBQSxhQUMvRztBQUFBLFVBQ0EsNkNBQUMsVUFBTyxJQUFHLFNBQVEsU0FBUSxRQUFPLGlDQUFtQjtBQUFBLFdBQ3ZEO0FBQUEsU0FDRjtBQUFBLE9BQ0Y7QUFBQSxJQUVBLDZDQUFDLGFBQVEsV0FBVSx3QkFDakIsd0RBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSxtREFBQyxRQUFHLFdBQVUsaUJBQWdCLDBCQUFZO0FBQUEsTUFDMUMsNkNBQUMsU0FBSSxXQUFVLGFBQWEsa0JBQVEsSUFBSSxDQUFDLEdBQUcsTUFBTSw2Q0FBQyxZQUFzQixNQUFNLEdBQUcsS0FBakIsRUFBRSxJQUFxQixDQUFFLEdBQUU7QUFBQSxPQUM5RixHQUNGO0FBQUEsS0FDRjtBQUVKOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
