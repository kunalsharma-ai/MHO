"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LanguageSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    if (document.getElementById("mho-translate-script")) return;
    const script = document.createElement("script");
    script.id = "mho-translate-script";
    script.src = "/member/mho-translate.js";
    script.async = true;
    document.body.appendChild(script);
  }, [pathname]);

  return null;
}
