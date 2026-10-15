import {
  PAGES
} from "/assets/chunk-VMMOAE2N.js";
import {
  BLOGS,
  findBlog
} from "/assets/chunk-P5UFEUM5.js";
import {
  SITE,
  SITE_URL
} from "/assets/chunk-JWSEDBGW.js";
import {
  AUDIENCE_FAQ
} from "/assets/chunk-GNLBIS5R.js";
import {
  FAQ_GROUPS
} from "/assets/chunk-EVZY7DYQ.js";
import {
  normalize
} from "/assets/chunk-LANM2SZF.js";
import {
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// src/data/blogs/postStore.js
init_define_import_meta_env();

// src/data/blogs/posts/index.js
init_define_import_meta_env();
var POST_LOADERS = {
  "earn-money-online-without-investment": () => import("/assets/earn-money-online-without-investment-KXOBNUEH.js"),
  "paid-surveys-for-money-beginners-guide": () => import("/assets/paid-surveys-for-money-beginners-guide-QMFBOPJH.js"),
  "legit-ways-to-make-money-online": () => import("/assets/legit-ways-to-make-money-online-WOV7GTZS.js"),
  "are-online-surveys-for-money-legit": () => import("/assets/are-online-surveys-for-money-legit-MUHZEB4K.js"),
  "get-paid-to-take-surveys-from-home": () => import("/assets/get-paid-to-take-surveys-from-home-L3KNCUEL.js"),
  "make-money-from-home-side-income-ideas": () => import("/assets/make-money-from-home-side-income-ideas-H3LAZWB5.js"),
  "paid-surveys-for-doctors": () => import("/assets/paid-surveys-for-doctors-P2DAMC4R.js"),
  "paid-surveys-for-nurses": () => import("/assets/paid-surveys-for-nurses-5RMNZ6YQ.js"),
  "caregiver-surveys-get-paid-for-your-opinion": () => import("/assets/caregiver-surveys-get-paid-for-your-opinion-WB7FIBL4.js"),
  "paid-health-surveys-for-patients": () => import("/assets/paid-health-surveys-for-patients-WSOSBA3C.js"),
  "paid-clinical-studies-vs-paid-surveys": () => import("/assets/paid-clinical-studies-vs-paid-surveys-R2YMDQZL.js"),
  "what-is-a-clinical-research-organization": () => import("/assets/what-is-a-clinical-research-organization-CMX4HMZS.js"),
  "randomised-clinical-trials-explained": () => import("/assets/randomised-clinical-trials-explained-WP6VUNTG.js"),
  "surveys-that-pay-via-paypal": () => import("/assets/surveys-that-pay-via-paypal-LME4IYQY.js"),
  "surveys-for-amazon-gift-cards": () => import("/assets/surveys-for-amazon-gift-cards-2JDSUBA6.js"),
  "upi-survey-rewards-earn-online-india": () => import("/assets/upi-survey-rewards-earn-online-india-UD32AQLO.js"),
  "best-paid-survey-sites-checklist": () => import("/assets/best-paid-survey-sites-checklist-XF2UPNXT.js"),
  "high-paying-surveys-what-sets-the-reward": () => import("/assets/high-paying-surveys-what-sets-the-reward-U6EIVKWM.js"),
  "online-jobs-for-students-without-investment": () => import("/assets/online-jobs-for-students-without-investment-VUENJZHL.js"),
  "side-hustle-for-healthcare-workers": () => import("/assets/side-hustle-for-healthcare-workers-H4PSVECU.js"),
  "make-money-from-your-phone-with-surveys": () => import("/assets/make-money-from-your-phone-with-surveys-Z7LDFV3T.js"),
  "why-you-get-screened-out-of-surveys": () => import("/assets/why-you-get-screened-out-of-surveys-AIEYZDWH.js"),
  "get-more-paid-survey-invitations": () => import("/assets/get-more-paid-survey-invitations-NHIJJGLL.js"),
  "online-focus-groups-paid": () => import("/assets/online-focus-groups-paid-TUE3NOVN.js"),
  "paid-online-market-research-explained": () => import("/assets/paid-online-market-research-explained-DD2AFUHM.js"),
  "survey-privacy-and-gdpr": () => import("/assets/survey-privacy-and-gdpr-VD3WP6NP.js"),
  "extra-income-ideas-for-pharmacists": () => import("/assets/extra-income-ideas-for-pharmacists-FC7NX45G.js"),
  "extra-income-from-home-for-retirees-and-homemakers": () => import("/assets/extra-income-from-home-for-retirees-and-homemakers-DCNSVWHG.js"),
  "surveys-that-pay-instantly-truth": () => import("/assets/surveys-that-pay-instantly-truth-EMUSKHYF.js"),
  "how-much-can-you-earn-from-paid-surveys": () => import("/assets/how-much-can-you-earn-from-paid-surveys-SDIJGL6F.js")
};

// src/data/blogs/postStore.js
var postCache = {};
async function loadPost(slug) {
  if (postCache[slug]) return postCache[slug];
  const loader = POST_LOADERS[slug];
  if (!loader) return null;
  postCache[slug] = (await loader()).default;
  return postCache[slug];
}
function readingTime(post) {
  if (!post) return 7;
  const words = post.body.split(/\s+/).length + post.faqs.reduce((n, f) => n + (f.q + " " + f.a).split(/\s+/).length, 0);
  return Math.max(3, Math.round(words / 220));
}

// src/seo/head.js
init_define_import_meta_env();
var OG_IMAGE = "/images/og-myhealthopinions.png";
var canonicalFor = (path) => SITE_URL + (path === "/" ? "/" : path + "/");
var ORG = {
  "@type": "Organization",
  "@id": SITE_URL + "/#organization",
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE_URL + "/",
  logo: SITE_URL + "/images/myhealthopinions-logo.png",
  email: SITE.email,
  telephone: SITE.phoneHref,
  foundingDate: String(SITE.foundingYear),
  address: { "@type": "PostalAddress", addressLocality: "Mangolpur Kalan, New Delhi", postalCode: "110085", addressCountry: "IN" },
  sameAs: SITE.socials.map((s) => s.url),
  contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: SITE.email, telephone: SITE.phoneHref, availableLanguage: ["English"] }]
};
function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: canonicalFor(it.path) }))
  };
}
function faqSchema(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };
}
function getMeta(rawPath, opts = {}) {
  const path = normalize(rawPath);
  const blogMatch = path.match(/^\/blog\/([a-z0-9-]+)$/);
  if (blogMatch) {
    const post = findBlog(blogMatch[1]);
    if (post) {
      const url = canonicalFor(path);
      return {
        path,
        title: post.metaTitle,
        description: post.metaDescription,
        canonical: url,
        robots: "index, follow, max-image-preview:large",
        ogType: "article",
        image: OG_IMAGE,
        keywords: [post.primary, ...post.secondary],
        jsonLd: [
          {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.date,
            dateModified: post.updated || post.date,
            author: { "@id": ORG["@id"] },
            publisher: { "@id": ORG["@id"] },
            mainEntityOfPage: url,
            image: SITE_URL + OG_IMAGE,
            keywords: [post.primary, ...post.secondary].join(", "),
            articleSection: post.category
          },
          ORG,
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blog" },
            { name: post.title, path }
          ]),
          ...opts.post?.faqs?.length ? [faqSchema(opts.post.faqs)] : []
        ]
      };
    }
  }
  const key = PAGES[path] ? path : "/404";
  const page = PAGES[key];
  const jsonLd = [];
  if (key === "/") {
    jsonLd.push(ORG, {
      "@type": "WebSite",
      "@id": SITE_URL + "/#website",
      name: SITE.name,
      url: SITE_URL + "/",
      publisher: { "@id": ORG["@id"] },
      inLanguage: "en"
    });
  } else if (key !== "/404") {
    if (key === "/about-us" || key === "/contact") jsonLd.push(ORG);
    jsonLd.push(breadcrumb([{ name: "Home", path: "/" }, { name: page.name, path: key }]));
    if (page.schema === "FAQPage") jsonLd.push(faqSchema(FAQ_GROUPS.flatMap((g) => g.items)));
    if (page.faqKey && AUDIENCE_FAQ[page.faqKey]) jsonLd.push(faqSchema(AUDIENCE_FAQ[page.faqKey]));
    if (page.schema === "ContactPage") jsonLd.push({ "@type": "ContactPage", name: page.title, url: canonicalFor(key), about: { "@id": ORG["@id"] } });
    if (key === "/blog")
      jsonLd.push({
        "@type": "Blog",
        name: "MyHealthOpinions Blog",
        url: canonicalFor("/blog"),
        blogPost: BLOGS.map((b) => ({ "@type": "BlogPosting", headline: b.title, url: canonicalFor("/blog/" + b.slug), datePublished: b.date }))
      });
  }
  return {
    path: key === "/404" ? path : key,
    title: page.title,
    description: page.description,
    canonical: key === "/404" ? null : canonicalFor(key),
    robots: page.robots || "index, follow, max-image-preview:large",
    ogType: "website",
    image: OG_IMAGE,
    keywords: page.primary ? [page.primary, ...page.secondary || []] : [],
    jsonLd,
    status: key === "/404" ? 404 : 200
  };
}
function ldString(meta) {
  if (!meta.jsonLd.length) return "";
  return JSON.stringify({ "@context": "https://schema.org", "@graph": meta.jsonLd }).replace(/</g, "\\u003c");
}
function applyHead(meta) {
  if (typeof document === "undefined") return;
  document.title = meta.title;
  const set = (selector, attr, create, value) => {
    let el = document.head.querySelector(selector);
    if (value == null) return el?.remove();
    if (!el) {
      el = document.createElement(create.tag);
      Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };
  const metaName = (n, v) => set(`meta[name="${n}"]`, "content", { tag: "meta", attrs: { name: n } }, v);
  const metaProp = (p, v) => set(`meta[property="${p}"]`, "content", { tag: "meta", attrs: { property: p } }, v);
  metaName("description", meta.description);
  metaName("robots", meta.robots);
  set('link[rel="canonical"]', "href", { tag: "link", attrs: { rel: "canonical" } }, meta.canonical);
  metaProp("og:title", meta.title);
  metaProp("og:description", meta.description);
  metaProp("og:type", meta.ogType);
  metaProp("og:url", meta.canonical);
  metaName("twitter:title", meta.title);
  metaName("twitter:description", meta.description);
  let ld = document.getElementById("ld-json");
  const json = ldString(meta);
  if (!json) return ld?.remove();
  if (!ld) {
    ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "ld-json";
    document.head.appendChild(ld);
  }
  ld.textContent = json;
}

export {
  postCache,
  loadPost,
  readingTime,
  getMeta,
  applyHead
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2RhdGEvYmxvZ3MvcG9zdFN0b3JlLmpzIiwgIi4uLy4uL3NyYy9kYXRhL2Jsb2dzL3Bvc3RzL2luZGV4LmpzIiwgIi4uLy4uL3NyYy9zZW8vaGVhZC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQmxvZyBhcnRpY2xlIGJvZGllczogY2FjaGVkIGFmdGVyIGZpcnN0IGRvd25sb2FkLiBUaGUgcHJlcmVuZGVyZXIgc2VlZHMgdGhlIGNhY2hlIHdpdGggZXZlcnkgcG9zdC5cbmltcG9ydCB7IFBPU1RfTE9BREVSUyB9IGZyb20gJy4vcG9zdHMvaW5kZXguanMnO1xuXG5leHBvcnQgY29uc3QgcG9zdENhY2hlID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWVkUG9zdHMobWFwKSB7XG4gIE9iamVjdC5hc3NpZ24ocG9zdENhY2hlLCBtYXApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFBvc3Qoc2x1Zykge1xuICBpZiAocG9zdENhY2hlW3NsdWddKSByZXR1cm4gcG9zdENhY2hlW3NsdWddO1xuICBjb25zdCBsb2FkZXIgPSBQT1NUX0xPQURFUlNbc2x1Z107XG4gIGlmICghbG9hZGVyKSByZXR1cm4gbnVsbDtcbiAgcG9zdENhY2hlW3NsdWddID0gKGF3YWl0IGxvYWRlcigpKS5kZWZhdWx0O1xuICByZXR1cm4gcG9zdENhY2hlW3NsdWddO1xufVxuXG4vKiogRXN0aW1hdGVkIHJlYWRpbmcgdGltZSBpbiBtaW51dGVzIChcdTIyNDgyMjAgd29yZHMgcGVyIG1pbnV0ZSkuICovXG5leHBvcnQgZnVuY3Rpb24gcmVhZGluZ1RpbWUocG9zdCkge1xuICBpZiAoIXBvc3QpIHJldHVybiA3O1xuICBjb25zdCB3b3JkcyA9IHBvc3QuYm9keS5zcGxpdCgvXFxzKy8pLmxlbmd0aCArIHBvc3QuZmFxcy5yZWR1Y2UoKG4sIGYpID0+IG4gKyAoZi5xICsgJyAnICsgZi5hKS5zcGxpdCgvXFxzKy8pLmxlbmd0aCwgMCk7XG4gIHJldHVybiBNYXRoLm1heCgzLCBNYXRoLnJvdW5kKHdvcmRzIC8gMjIwKSk7XG59XG4iLCAiLy8gTGF6eSBsb2FkZXJzIGZvciBibG9nIGJvZGllcyAoY2xpZW50KS4gR2VuZXJhdGVkIGxpc3QgXHUyMDE0IGtlZXAgaW4gc3luYyB3aXRoIC4uL2luZGV4LmpzXG5leHBvcnQgY29uc3QgUE9TVF9MT0FERVJTID0ge1xuICAnZWFybi1tb25leS1vbmxpbmUtd2l0aG91dC1pbnZlc3RtZW50JzogKCkgPT4gaW1wb3J0KCcuL2Vhcm4tbW9uZXktb25saW5lLXdpdGhvdXQtaW52ZXN0bWVudC5qcycpLFxuICAncGFpZC1zdXJ2ZXlzLWZvci1tb25leS1iZWdpbm5lcnMtZ3VpZGUnOiAoKSA9PiBpbXBvcnQoJy4vcGFpZC1zdXJ2ZXlzLWZvci1tb25leS1iZWdpbm5lcnMtZ3VpZGUuanMnKSxcbiAgJ2xlZ2l0LXdheXMtdG8tbWFrZS1tb25leS1vbmxpbmUnOiAoKSA9PiBpbXBvcnQoJy4vbGVnaXQtd2F5cy10by1tYWtlLW1vbmV5LW9ubGluZS5qcycpLFxuICAnYXJlLW9ubGluZS1zdXJ2ZXlzLWZvci1tb25leS1sZWdpdCc6ICgpID0+IGltcG9ydCgnLi9hcmUtb25saW5lLXN1cnZleXMtZm9yLW1vbmV5LWxlZ2l0LmpzJyksXG4gICdnZXQtcGFpZC10by10YWtlLXN1cnZleXMtZnJvbS1ob21lJzogKCkgPT4gaW1wb3J0KCcuL2dldC1wYWlkLXRvLXRha2Utc3VydmV5cy1mcm9tLWhvbWUuanMnKSxcbiAgJ21ha2UtbW9uZXktZnJvbS1ob21lLXNpZGUtaW5jb21lLWlkZWFzJzogKCkgPT4gaW1wb3J0KCcuL21ha2UtbW9uZXktZnJvbS1ob21lLXNpZGUtaW5jb21lLWlkZWFzLmpzJyksXG4gICdwYWlkLXN1cnZleXMtZm9yLWRvY3RvcnMnOiAoKSA9PiBpbXBvcnQoJy4vcGFpZC1zdXJ2ZXlzLWZvci1kb2N0b3JzLmpzJyksXG4gICdwYWlkLXN1cnZleXMtZm9yLW51cnNlcyc6ICgpID0+IGltcG9ydCgnLi9wYWlkLXN1cnZleXMtZm9yLW51cnNlcy5qcycpLFxuICAnY2FyZWdpdmVyLXN1cnZleXMtZ2V0LXBhaWQtZm9yLXlvdXItb3Bpbmlvbic6ICgpID0+IGltcG9ydCgnLi9jYXJlZ2l2ZXItc3VydmV5cy1nZXQtcGFpZC1mb3IteW91ci1vcGluaW9uLmpzJyksXG4gICdwYWlkLWhlYWx0aC1zdXJ2ZXlzLWZvci1wYXRpZW50cyc6ICgpID0+IGltcG9ydCgnLi9wYWlkLWhlYWx0aC1zdXJ2ZXlzLWZvci1wYXRpZW50cy5qcycpLFxuICAncGFpZC1jbGluaWNhbC1zdHVkaWVzLXZzLXBhaWQtc3VydmV5cyc6ICgpID0+IGltcG9ydCgnLi9wYWlkLWNsaW5pY2FsLXN0dWRpZXMtdnMtcGFpZC1zdXJ2ZXlzLmpzJyksXG4gICd3aGF0LWlzLWEtY2xpbmljYWwtcmVzZWFyY2gtb3JnYW5pemF0aW9uJzogKCkgPT4gaW1wb3J0KCcuL3doYXQtaXMtYS1jbGluaWNhbC1yZXNlYXJjaC1vcmdhbml6YXRpb24uanMnKSxcbiAgJ3JhbmRvbWlzZWQtY2xpbmljYWwtdHJpYWxzLWV4cGxhaW5lZCc6ICgpID0+IGltcG9ydCgnLi9yYW5kb21pc2VkLWNsaW5pY2FsLXRyaWFscy1leHBsYWluZWQuanMnKSxcbiAgJ3N1cnZleXMtdGhhdC1wYXktdmlhLXBheXBhbCc6ICgpID0+IGltcG9ydCgnLi9zdXJ2ZXlzLXRoYXQtcGF5LXZpYS1wYXlwYWwuanMnKSxcbiAgJ3N1cnZleXMtZm9yLWFtYXpvbi1naWZ0LWNhcmRzJzogKCkgPT4gaW1wb3J0KCcuL3N1cnZleXMtZm9yLWFtYXpvbi1naWZ0LWNhcmRzLmpzJyksXG4gICd1cGktc3VydmV5LXJld2FyZHMtZWFybi1vbmxpbmUtaW5kaWEnOiAoKSA9PiBpbXBvcnQoJy4vdXBpLXN1cnZleS1yZXdhcmRzLWVhcm4tb25saW5lLWluZGlhLmpzJyksXG4gICdiZXN0LXBhaWQtc3VydmV5LXNpdGVzLWNoZWNrbGlzdCc6ICgpID0+IGltcG9ydCgnLi9iZXN0LXBhaWQtc3VydmV5LXNpdGVzLWNoZWNrbGlzdC5qcycpLFxuICAnaGlnaC1wYXlpbmctc3VydmV5cy13aGF0LXNldHMtdGhlLXJld2FyZCc6ICgpID0+IGltcG9ydCgnLi9oaWdoLXBheWluZy1zdXJ2ZXlzLXdoYXQtc2V0cy10aGUtcmV3YXJkLmpzJyksXG4gICdvbmxpbmUtam9icy1mb3Itc3R1ZGVudHMtd2l0aG91dC1pbnZlc3RtZW50JzogKCkgPT4gaW1wb3J0KCcuL29ubGluZS1qb2JzLWZvci1zdHVkZW50cy13aXRob3V0LWludmVzdG1lbnQuanMnKSxcbiAgJ3NpZGUtaHVzdGxlLWZvci1oZWFsdGhjYXJlLXdvcmtlcnMnOiAoKSA9PiBpbXBvcnQoJy4vc2lkZS1odXN0bGUtZm9yLWhlYWx0aGNhcmUtd29ya2Vycy5qcycpLFxuICAnbWFrZS1tb25leS1mcm9tLXlvdXItcGhvbmUtd2l0aC1zdXJ2ZXlzJzogKCkgPT4gaW1wb3J0KCcuL21ha2UtbW9uZXktZnJvbS15b3VyLXBob25lLXdpdGgtc3VydmV5cy5qcycpLFxuICAnd2h5LXlvdS1nZXQtc2NyZWVuZWQtb3V0LW9mLXN1cnZleXMnOiAoKSA9PiBpbXBvcnQoJy4vd2h5LXlvdS1nZXQtc2NyZWVuZWQtb3V0LW9mLXN1cnZleXMuanMnKSxcbiAgJ2dldC1tb3JlLXBhaWQtc3VydmV5LWludml0YXRpb25zJzogKCkgPT4gaW1wb3J0KCcuL2dldC1tb3JlLXBhaWQtc3VydmV5LWludml0YXRpb25zLmpzJyksXG4gICdvbmxpbmUtZm9jdXMtZ3JvdXBzLXBhaWQnOiAoKSA9PiBpbXBvcnQoJy4vb25saW5lLWZvY3VzLWdyb3Vwcy1wYWlkLmpzJyksXG4gICdwYWlkLW9ubGluZS1tYXJrZXQtcmVzZWFyY2gtZXhwbGFpbmVkJzogKCkgPT4gaW1wb3J0KCcuL3BhaWQtb25saW5lLW1hcmtldC1yZXNlYXJjaC1leHBsYWluZWQuanMnKSxcbiAgJ3N1cnZleS1wcml2YWN5LWFuZC1nZHByJzogKCkgPT4gaW1wb3J0KCcuL3N1cnZleS1wcml2YWN5LWFuZC1nZHByLmpzJyksXG4gICdleHRyYS1pbmNvbWUtaWRlYXMtZm9yLXBoYXJtYWNpc3RzJzogKCkgPT4gaW1wb3J0KCcuL2V4dHJhLWluY29tZS1pZGVhcy1mb3ItcGhhcm1hY2lzdHMuanMnKSxcbiAgJ2V4dHJhLWluY29tZS1mcm9tLWhvbWUtZm9yLXJldGlyZWVzLWFuZC1ob21lbWFrZXJzJzogKCkgPT4gaW1wb3J0KCcuL2V4dHJhLWluY29tZS1mcm9tLWhvbWUtZm9yLXJldGlyZWVzLWFuZC1ob21lbWFrZXJzLmpzJyksXG4gICdzdXJ2ZXlzLXRoYXQtcGF5LWluc3RhbnRseS10cnV0aCc6ICgpID0+IGltcG9ydCgnLi9zdXJ2ZXlzLXRoYXQtcGF5LWluc3RhbnRseS10cnV0aC5qcycpLFxuICAnaG93LW11Y2gtY2FuLXlvdS1lYXJuLWZyb20tcGFpZC1zdXJ2ZXlzJzogKCkgPT4gaW1wb3J0KCcuL2hvdy1tdWNoLWNhbi15b3UtZWFybi1mcm9tLXBhaWQtc3VydmV5cy5qcycpLFxufTtcbiIsICIvLyBCdWlsZHMgdGhlIDxoZWFkPiBmb3IgYW55IHJvdXRlLiBVc2VkIGJ5IHRoZSBwcmVyZW5kZXJlciAoc3RyaW5nKSBhbmQgYnkgY2xpZW50LXNpZGUgbmF2aWdhdGlvbiAoRE9NKS5cbmltcG9ydCB7IFBBR0VTIH0gZnJvbSAnLi9wYWdlcy5qcyc7XG5pbXBvcnQgeyBTSVRFLCBTSVRFX1VSTCB9IGZyb20gJy4uL2NvbmZpZy9zaXRlLmpzJztcbmltcG9ydCB7IEJMT0dTLCBmaW5kQmxvZyB9IGZyb20gJy4uL2RhdGEvYmxvZ3MvaW5kZXguanMnO1xuaW1wb3J0IHsgRkFRX0dST1VQUyB9IGZyb20gJy4uL2RhdGEvZmFxcy5qcyc7XG5pbXBvcnQgeyBBVURJRU5DRV9GQVEgfSBmcm9tICcuLi9kYXRhL2F1ZGllbmNlcy5qcyc7XG5pbXBvcnQgeyBub3JtYWxpemUgfSBmcm9tICcuLi9yb3V0ZXIuanN4JztcblxuY29uc3QgT0dfSU1BR0UgPSAnL2ltYWdlcy9vZy1teWhlYWx0aG9waW5pb25zLnBuZyc7XG5cbmNvbnN0IGVzYyA9IChzID0gJycpID0+IFN0cmluZyhzKS5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7JykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuY29uc3QgY2Fub25pY2FsRm9yID0gKHBhdGgpID0+IFNJVEVfVVJMICsgKHBhdGggPT09ICcvJyA/ICcvJyA6IHBhdGggKyAnLycpO1xuXG5jb25zdCBPUkcgPSB7XG4gICdAdHlwZSc6ICdPcmdhbml6YXRpb24nLFxuICAnQGlkJzogU0lURV9VUkwgKyAnLyNvcmdhbml6YXRpb24nLFxuICBuYW1lOiBTSVRFLm5hbWUsXG4gIGxlZ2FsTmFtZTogU0lURS5sZWdhbE5hbWUsXG4gIHVybDogU0lURV9VUkwgKyAnLycsXG4gIGxvZ286IFNJVEVfVVJMICsgJy9pbWFnZXMvbXloZWFsdGhvcGluaW9ucy1sb2dvLnBuZycsXG4gIGVtYWlsOiBTSVRFLmVtYWlsLFxuICB0ZWxlcGhvbmU6IFNJVEUucGhvbmVIcmVmLFxuICBmb3VuZGluZ0RhdGU6IFN0cmluZyhTSVRFLmZvdW5kaW5nWWVhciksXG4gIGFkZHJlc3M6IHsgJ0B0eXBlJzogJ1Bvc3RhbEFkZHJlc3MnLCBhZGRyZXNzTG9jYWxpdHk6ICdNYW5nb2xwdXIgS2FsYW4sIE5ldyBEZWxoaScsIHBvc3RhbENvZGU6ICcxMTAwODUnLCBhZGRyZXNzQ291bnRyeTogJ0lOJyB9LFxuICBzYW1lQXM6IFNJVEUuc29jaWFscy5tYXAoKHMpID0+IHMudXJsKSxcbiAgY29udGFjdFBvaW50OiBbeyAnQHR5cGUnOiAnQ29udGFjdFBvaW50JywgY29udGFjdFR5cGU6ICdjdXN0b21lciBzdXBwb3J0JywgZW1haWw6IFNJVEUuZW1haWwsIHRlbGVwaG9uZTogU0lURS5waG9uZUhyZWYsIGF2YWlsYWJsZUxhbmd1YWdlOiBbJ0VuZ2xpc2gnXSB9XSxcbn07XG5cbmZ1bmN0aW9uIGJyZWFkY3J1bWIoaXRlbXMpIHtcbiAgcmV0dXJuIHtcbiAgICAnQHR5cGUnOiAnQnJlYWRjcnVtYkxpc3QnLFxuICAgIGl0ZW1MaXN0RWxlbWVudDogaXRlbXMubWFwKChpdCwgaSkgPT4gKHsgJ0B0eXBlJzogJ0xpc3RJdGVtJywgcG9zaXRpb246IGkgKyAxLCBuYW1lOiBpdC5uYW1lLCBpdGVtOiBjYW5vbmljYWxGb3IoaXQucGF0aCkgfSkpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBmYXFTY2hlbWEoZmFxcykge1xuICByZXR1cm4ge1xuICAgICdAdHlwZSc6ICdGQVFQYWdlJyxcbiAgICBtYWluRW50aXR5OiBmYXFzLm1hcCgoZikgPT4gKHsgJ0B0eXBlJzogJ1F1ZXN0aW9uJywgbmFtZTogZi5xLCBhY2NlcHRlZEFuc3dlcjogeyAnQHR5cGUnOiAnQW5zd2VyJywgdGV4dDogZi5hIH0gfSkpLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWV0YShyYXdQYXRoLCBvcHRzID0ge30pIHtcbiAgY29uc3QgcGF0aCA9IG5vcm1hbGl6ZShyYXdQYXRoKTtcbiAgY29uc3QgYmxvZ01hdGNoID0gcGF0aC5tYXRjaCgvXlxcL2Jsb2dcXC8oW2EtejAtOS1dKykkLyk7XG5cbiAgaWYgKGJsb2dNYXRjaCkge1xuICAgIGNvbnN0IHBvc3QgPSBmaW5kQmxvZyhibG9nTWF0Y2hbMV0pO1xuICAgIGlmIChwb3N0KSB7XG4gICAgICBjb25zdCB1cmwgPSBjYW5vbmljYWxGb3IocGF0aCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXRoLFxuICAgICAgICB0aXRsZTogcG9zdC5tZXRhVGl0bGUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBwb3N0Lm1ldGFEZXNjcmlwdGlvbixcbiAgICAgICAgY2Fub25pY2FsOiB1cmwsXG4gICAgICAgIHJvYm90czogJ2luZGV4LCBmb2xsb3csIG1heC1pbWFnZS1wcmV2aWV3OmxhcmdlJyxcbiAgICAgICAgb2dUeXBlOiAnYXJ0aWNsZScsXG4gICAgICAgIGltYWdlOiBPR19JTUFHRSxcbiAgICAgICAga2V5d29yZHM6IFtwb3N0LnByaW1hcnksIC4uLnBvc3Quc2Vjb25kYXJ5XSxcbiAgICAgICAganNvbkxkOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgJ0B0eXBlJzogJ0Jsb2dQb3N0aW5nJyxcbiAgICAgICAgICAgIGhlYWRsaW5lOiBwb3N0LnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHBvc3QubWV0YURlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZGF0ZVB1Ymxpc2hlZDogcG9zdC5kYXRlLFxuICAgICAgICAgICAgZGF0ZU1vZGlmaWVkOiBwb3N0LnVwZGF0ZWQgfHwgcG9zdC5kYXRlLFxuICAgICAgICAgICAgYXV0aG9yOiB7ICdAaWQnOiBPUkdbJ0BpZCddIH0sXG4gICAgICAgICAgICBwdWJsaXNoZXI6IHsgJ0BpZCc6IE9SR1snQGlkJ10gfSxcbiAgICAgICAgICAgIG1haW5FbnRpdHlPZlBhZ2U6IHVybCxcbiAgICAgICAgICAgIGltYWdlOiBTSVRFX1VSTCArIE9HX0lNQUdFLFxuICAgICAgICAgICAga2V5d29yZHM6IFtwb3N0LnByaW1hcnksIC4uLnBvc3Quc2Vjb25kYXJ5XS5qb2luKCcsICcpLFxuICAgICAgICAgICAgYXJ0aWNsZVNlY3Rpb246IHBvc3QuY2F0ZWdvcnksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBPUkcsXG4gICAgICAgICAgYnJlYWRjcnVtYihbXG4gICAgICAgICAgICB7IG5hbWU6ICdIb21lJywgcGF0aDogJy8nIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdCbG9ncycsIHBhdGg6ICcvYmxvZycgfSxcbiAgICAgICAgICAgIHsgbmFtZTogcG9zdC50aXRsZSwgcGF0aCB9LFxuICAgICAgICAgIF0pLFxuICAgICAgICAgIC4uLihvcHRzLnBvc3Q/LmZhcXM/Lmxlbmd0aCA/IFtmYXFTY2hlbWEob3B0cy5wb3N0LmZhcXMpXSA6IFtdKSxcbiAgICAgICAgXSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgY29uc3Qga2V5ID0gUEFHRVNbcGF0aF0gPyBwYXRoIDogJy80MDQnO1xuICBjb25zdCBwYWdlID0gUEFHRVNba2V5XTtcbiAgY29uc3QganNvbkxkID0gW107XG4gIGlmIChrZXkgPT09ICcvJykge1xuICAgIGpzb25MZC5wdXNoKE9SRywge1xuICAgICAgJ0B0eXBlJzogJ1dlYlNpdGUnLFxuICAgICAgJ0BpZCc6IFNJVEVfVVJMICsgJy8jd2Vic2l0ZScsXG4gICAgICBuYW1lOiBTSVRFLm5hbWUsXG4gICAgICB1cmw6IFNJVEVfVVJMICsgJy8nLFxuICAgICAgcHVibGlzaGVyOiB7ICdAaWQnOiBPUkdbJ0BpZCddIH0sXG4gICAgICBpbkxhbmd1YWdlOiAnZW4nLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKGtleSAhPT0gJy80MDQnKSB7XG4gICAgaWYgKGtleSA9PT0gJy9hYm91dC11cycgfHwga2V5ID09PSAnL2NvbnRhY3QnKSBqc29uTGQucHVzaChPUkcpO1xuICAgIGpzb25MZC5wdXNoKGJyZWFkY3J1bWIoW3sgbmFtZTogJ0hvbWUnLCBwYXRoOiAnLycgfSwgeyBuYW1lOiBwYWdlLm5hbWUsIHBhdGg6IGtleSB9XSkpO1xuICAgIGlmIChwYWdlLnNjaGVtYSA9PT0gJ0ZBUVBhZ2UnKSBqc29uTGQucHVzaChmYXFTY2hlbWEoRkFRX0dST1VQUy5mbGF0TWFwKChnKSA9PiBnLml0ZW1zKSkpO1xuICAgIGlmIChwYWdlLmZhcUtleSAmJiBBVURJRU5DRV9GQVFbcGFnZS5mYXFLZXldKSBqc29uTGQucHVzaChmYXFTY2hlbWEoQVVESUVOQ0VfRkFRW3BhZ2UuZmFxS2V5XSkpO1xuICAgIGlmIChwYWdlLnNjaGVtYSA9PT0gJ0NvbnRhY3RQYWdlJykganNvbkxkLnB1c2goeyAnQHR5cGUnOiAnQ29udGFjdFBhZ2UnLCBuYW1lOiBwYWdlLnRpdGxlLCB1cmw6IGNhbm9uaWNhbEZvcihrZXkpLCBhYm91dDogeyAnQGlkJzogT1JHWydAaWQnXSB9IH0pO1xuICAgIGlmIChrZXkgPT09ICcvYmxvZycpXG4gICAgICBqc29uTGQucHVzaCh7XG4gICAgICAgICdAdHlwZSc6ICdCbG9nJyxcbiAgICAgICAgbmFtZTogJ015SGVhbHRoT3BpbmlvbnMgQmxvZycsXG4gICAgICAgIHVybDogY2Fub25pY2FsRm9yKCcvYmxvZycpLFxuICAgICAgICBibG9nUG9zdDogQkxPR1MubWFwKChiKSA9PiAoeyAnQHR5cGUnOiAnQmxvZ1Bvc3RpbmcnLCBoZWFkbGluZTogYi50aXRsZSwgdXJsOiBjYW5vbmljYWxGb3IoJy9ibG9nLycgKyBiLnNsdWcpLCBkYXRlUHVibGlzaGVkOiBiLmRhdGUgfSkpLFxuICAgICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBhdGg6IGtleSA9PT0gJy80MDQnID8gcGF0aCA6IGtleSxcbiAgICB0aXRsZTogcGFnZS50aXRsZSxcbiAgICBkZXNjcmlwdGlvbjogcGFnZS5kZXNjcmlwdGlvbixcbiAgICBjYW5vbmljYWw6IGtleSA9PT0gJy80MDQnID8gbnVsbCA6IGNhbm9uaWNhbEZvcihrZXkpLFxuICAgIHJvYm90czogcGFnZS5yb2JvdHMgfHwgJ2luZGV4LCBmb2xsb3csIG1heC1pbWFnZS1wcmV2aWV3OmxhcmdlJyxcbiAgICBvZ1R5cGU6ICd3ZWJzaXRlJyxcbiAgICBpbWFnZTogT0dfSU1BR0UsXG4gICAga2V5d29yZHM6IHBhZ2UucHJpbWFyeSA/IFtwYWdlLnByaW1hcnksIC4uLihwYWdlLnNlY29uZGFyeSB8fCBbXSldIDogW10sXG4gICAganNvbkxkLFxuICAgIHN0YXR1czoga2V5ID09PSAnLzQwNCcgPyA0MDQgOiAyMDAsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGxkU3RyaW5nKG1ldGEpIHtcbiAgaWYgKCFtZXRhLmpzb25MZC5sZW5ndGgpIHJldHVybiAnJztcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgJ0Bjb250ZXh0JzogJ2h0dHBzOi8vc2NoZW1hLm9yZycsICdAZ3JhcGgnOiBtZXRhLmpzb25MZCB9KS5yZXBsYWNlKC88L2csICdcXFxcdTAwM2MnKTtcbn1cblxuLyoqIDxoZWFkPiBtYXJrdXAgZm9yIHByZXJlbmRlcmVkIEhUTUwuICovXG5leHBvcnQgZnVuY3Rpb24gaGVhZFN0cmluZyhtZXRhKSB7XG4gIGNvbnN0IGltZyA9IFNJVEVfVVJMICsgbWV0YS5pbWFnZTtcbiAgcmV0dXJuIFtcbiAgICBgPHRpdGxlPiR7ZXNjKG1ldGEudGl0bGUpfTwvdGl0bGU+YCxcbiAgICBgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIiR7ZXNjKG1ldGEuZGVzY3JpcHRpb24pfVwiIC8+YCxcbiAgICBgPG1ldGEgbmFtZT1cInJvYm90c1wiIGNvbnRlbnQ9XCIke21ldGEucm9ib3RzfVwiIC8+YCxcbiAgICBtZXRhLmNhbm9uaWNhbCA/IGA8bGluayByZWw9XCJjYW5vbmljYWxcIiBocmVmPVwiJHttZXRhLmNhbm9uaWNhbH1cIiAvPmAgOiAnJyxcbiAgICBgPG1ldGEgcHJvcGVydHk9XCJvZzpzaXRlX25hbWVcIiBjb250ZW50PVwiJHtTSVRFLm5hbWV9XCIgLz5gLFxuICAgIGA8bWV0YSBwcm9wZXJ0eT1cIm9nOnR5cGVcIiBjb250ZW50PVwiJHttZXRhLm9nVHlwZX1cIiAvPmAsXG4gICAgYDxtZXRhIHByb3BlcnR5PVwib2c6dGl0bGVcIiBjb250ZW50PVwiJHtlc2MobWV0YS50aXRsZSl9XCIgLz5gLFxuICAgIGA8bWV0YSBwcm9wZXJ0eT1cIm9nOmRlc2NyaXB0aW9uXCIgY29udGVudD1cIiR7ZXNjKG1ldGEuZGVzY3JpcHRpb24pfVwiIC8+YCxcbiAgICBtZXRhLmNhbm9uaWNhbCA/IGA8bWV0YSBwcm9wZXJ0eT1cIm9nOnVybFwiIGNvbnRlbnQ9XCIke21ldGEuY2Fub25pY2FsfVwiIC8+YCA6ICcnLFxuICAgIGA8bWV0YSBwcm9wZXJ0eT1cIm9nOmltYWdlXCIgY29udGVudD1cIiR7aW1nfVwiIC8+YCxcbiAgICBgPG1ldGEgcHJvcGVydHk9XCJvZzppbWFnZTp3aWR0aFwiIGNvbnRlbnQ9XCIxMjAwXCIgLz5gLFxuICAgIGA8bWV0YSBwcm9wZXJ0eT1cIm9nOmltYWdlOmhlaWdodFwiIGNvbnRlbnQ9XCI2MzBcIiAvPmAsXG4gICAgYDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmNhcmRcIiBjb250ZW50PVwic3VtbWFyeV9sYXJnZV9pbWFnZVwiIC8+YCxcbiAgICBgPG1ldGEgbmFtZT1cInR3aXR0ZXI6dGl0bGVcIiBjb250ZW50PVwiJHtlc2MobWV0YS50aXRsZSl9XCIgLz5gLFxuICAgIGA8bWV0YSBuYW1lPVwidHdpdHRlcjpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCIke2VzYyhtZXRhLmRlc2NyaXB0aW9uKX1cIiAvPmAsXG4gICAgYDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmltYWdlXCIgY29udGVudD1cIiR7aW1nfVwiIC8+YCxcbiAgICBtZXRhLmpzb25MZC5sZW5ndGggPyBgPHNjcmlwdCB0eXBlPVwiYXBwbGljYXRpb24vbGQranNvblwiIGlkPVwibGQtanNvblwiPiR7bGRTdHJpbmcobWV0YSl9PC9zY3JpcHQ+YCA6ICcnLFxuICBdXG4gICAgLmZpbHRlcihCb29sZWFuKVxuICAgIC5qb2luKCdcXG4gICAgJyk7XG59XG5cbi8qKiBVcGRhdGUgdGhlIGxpdmUgZG9jdW1lbnQgaGVhZCBhZnRlciBjbGllbnQtc2lkZSBuYXZpZ2F0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5SGVhZChtZXRhKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gIGRvY3VtZW50LnRpdGxlID0gbWV0YS50aXRsZTtcbiAgY29uc3Qgc2V0ID0gKHNlbGVjdG9yLCBhdHRyLCBjcmVhdGUsIHZhbHVlKSA9PiB7XG4gICAgbGV0IGVsID0gZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGVsPy5yZW1vdmUoKTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY3JlYXRlLnRhZyk7XG4gICAgICBPYmplY3QuZW50cmllcyhjcmVhdGUuYXR0cnMpLmZvckVhY2goKFtrLCB2XSkgPT4gZWwuc2V0QXR0cmlidXRlKGssIHYpKTtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIH1cbiAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICB9O1xuICBjb25zdCBtZXRhTmFtZSA9IChuLCB2KSA9PiBzZXQoYG1ldGFbbmFtZT1cIiR7bn1cIl1gLCAnY29udGVudCcsIHsgdGFnOiAnbWV0YScsIGF0dHJzOiB7IG5hbWU6IG4gfSB9LCB2KTtcbiAgY29uc3QgbWV0YVByb3AgPSAocCwgdikgPT4gc2V0KGBtZXRhW3Byb3BlcnR5PVwiJHtwfVwiXWAsICdjb250ZW50JywgeyB0YWc6ICdtZXRhJywgYXR0cnM6IHsgcHJvcGVydHk6IHAgfSB9LCB2KTtcbiAgbWV0YU5hbWUoJ2Rlc2NyaXB0aW9uJywgbWV0YS5kZXNjcmlwdGlvbik7XG4gIG1ldGFOYW1lKCdyb2JvdHMnLCBtZXRhLnJvYm90cyk7XG4gIHNldCgnbGlua1tyZWw9XCJjYW5vbmljYWxcIl0nLCAnaHJlZicsIHsgdGFnOiAnbGluaycsIGF0dHJzOiB7IHJlbDogJ2Nhbm9uaWNhbCcgfSB9LCBtZXRhLmNhbm9uaWNhbCk7XG4gIG1ldGFQcm9wKCdvZzp0aXRsZScsIG1ldGEudGl0bGUpO1xuICBtZXRhUHJvcCgnb2c6ZGVzY3JpcHRpb24nLCBtZXRhLmRlc2NyaXB0aW9uKTtcbiAgbWV0YVByb3AoJ29nOnR5cGUnLCBtZXRhLm9nVHlwZSk7XG4gIG1ldGFQcm9wKCdvZzp1cmwnLCBtZXRhLmNhbm9uaWNhbCk7XG4gIG1ldGFOYW1lKCd0d2l0dGVyOnRpdGxlJywgbWV0YS50aXRsZSk7XG4gIG1ldGFOYW1lKCd0d2l0dGVyOmRlc2NyaXB0aW9uJywgbWV0YS5kZXNjcmlwdGlvbik7XG4gIGxldCBsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZC1qc29uJyk7XG4gIGNvbnN0IGpzb24gPSBsZFN0cmluZyhtZXRhKTtcbiAgaWYgKCFqc29uKSByZXR1cm4gbGQ/LnJlbW92ZSgpO1xuICBpZiAoIWxkKSB7XG4gICAgbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBsZC50eXBlID0gJ2FwcGxpY2F0aW9uL2xkK2pzb24nO1xuICAgIGxkLmlkID0gJ2xkLWpzb24nO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGQpO1xuICB9XG4gIGxkLnRleHRDb250ZW50ID0ganNvbjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0FDQUE7QUFDTyxJQUFNLGVBQWU7QUFBQSxFQUMxQix3Q0FBd0MsTUFBTSxPQUFPLDBEQUEyQztBQUFBLEVBQ2hHLDBDQUEwQyxNQUFNLE9BQU8sNERBQTZDO0FBQUEsRUFDcEcsbUNBQW1DLE1BQU0sT0FBTyxxREFBc0M7QUFBQSxFQUN0RixzQ0FBc0MsTUFBTSxPQUFPLHdEQUF5QztBQUFBLEVBQzVGLHNDQUFzQyxNQUFNLE9BQU8sd0RBQXlDO0FBQUEsRUFDNUYsMENBQTBDLE1BQU0sT0FBTyw0REFBNkM7QUFBQSxFQUNwRyw0QkFBNEIsTUFBTSxPQUFPLDhDQUErQjtBQUFBLEVBQ3hFLDJCQUEyQixNQUFNLE9BQU8sNkNBQThCO0FBQUEsRUFDdEUsK0NBQStDLE1BQU0sT0FBTyxpRUFBa0Q7QUFBQSxFQUM5RyxvQ0FBb0MsTUFBTSxPQUFPLHNEQUF1QztBQUFBLEVBQ3hGLHlDQUF5QyxNQUFNLE9BQU8sMkRBQTRDO0FBQUEsRUFDbEcsNENBQTRDLE1BQU0sT0FBTyw4REFBK0M7QUFBQSxFQUN4Ryx3Q0FBd0MsTUFBTSxPQUFPLDBEQUEyQztBQUFBLEVBQ2hHLCtCQUErQixNQUFNLE9BQU8saURBQWtDO0FBQUEsRUFDOUUsaUNBQWlDLE1BQU0sT0FBTyxtREFBb0M7QUFBQSxFQUNsRix3Q0FBd0MsTUFBTSxPQUFPLDBEQUEyQztBQUFBLEVBQ2hHLG9DQUFvQyxNQUFNLE9BQU8sc0RB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
