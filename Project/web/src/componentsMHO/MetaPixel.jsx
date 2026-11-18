"use client";
// Meta (Facebook) Pixel for the member app (/member, /auth, /survey), matching the marketing site
// (Project/frontend-1/src/utils/helpers.js): same pixel, and it loads only after the visitor allowed
// analytics cookies in the site's cookie banner. Both apps run on the same domain, so the choice saved in
// localStorage["mho-consent"] by the banner applies here too. Admin pages are staff-only and are not tracked.
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "2241850863212660";

function hasAnalyticsConsent() {
  try {
    return Boolean(JSON.parse(window.localStorage.getItem("mho-consent") || "null")?.analytics);
  } catch {
    return false;
  }
}

function loadPixel() {
  if (window.fbq) return false; // already loaded (it sent its own PageView then)
  const fbq = function () {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
    else fbq.queue.push(arguments);
  };
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  fbq("init", PIXEL_ID);
  fbq("track", "PageView");
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  return true;
}

export default function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!PIXEL_ID || PIXEL_ID === "off" || pathname?.startsWith("/admin")) return;
    if (!hasAnalyticsConsent()) return;
    const justLoaded = loadPixel();
    // Client-side navigations: one PageView per page (the first one is sent by loadPixel).
    if (!justLoaded && !first.current) window.fbq("track", "PageView");
    first.current = false;
  }, [pathname]);

  return null;
}
