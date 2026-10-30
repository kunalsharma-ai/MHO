"use client";
import React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useMember } from "@/Context";
import { fetchRewardBalance } from "@/hooks/useRewardsRefresh";
import { AccountSettingsCard } from "./AccountSettingsCard.jsx";

const PAGE = "/member/account-actions/index.html";

export default function DeleteAccountSection() {
  const member = useMember();
  const router = useRouter();
  const [src, setSrc] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const close = React.useCallback(() => setSrc(null), []);

  const open = async () => {
    let points = 0;
    let usd = "";
    try {
      const balance = (await fetchRewardBalance(member))?.data;
      points = Number(balance?.totalPoints) || 0;
      usd = `$${(points * (Number(balance?.conversionRate) || 0.001)).toFixed(2)}`;
    } catch (e) {
      console.log(e);
    }
    const query = new URLSearchParams({ id: member?._id || "", theme: "light", points: String(points), usd });
    setLoaded(false);
    setSrc(`${PAGE}?${query}`);
  };

  React.useEffect(() => {
    if (!src) return undefined;
    const onMessage = (e) => {
      if (e.origin !== window.location.origin || e.data?.source !== "mho-account-actions") return;
      if (e.data.type === "close") close();
      if (e.data.type === "navigate") {
        close();
        if (e.data.key === "dashboard") router.push("/member/dashboard");
        if (e.data.key === "support") router.push("/member/support");
      }
    };
    const onKey = (e) => e.key === "Escape" && close();
    const scroll = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("message", onMessage);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = scroll;
      window.removeEventListener("message", onMessage);
      window.removeEventListener("keydown", onKey);
    };
  }, [src, close, router]);

  return (
    <>
      <div style={{ padding: "6px 0 10px" }}>
        <AccountSettingsCard
          status="active"
          href="#delete-account"
          onNavigate={(e) => {
            e.preventDefault();
            open();
          }}
        />
      </div>
      {src &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Account Care"
            style={{ position: "fixed", inset: 0, zIndex: 1500, background: "#FFFFFF" }}
          >
            {!loaded && (
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 14 }}>
                Loading…
              </div>
            )}
            <iframe
              title="Account Care"
              src={src}
              onLoad={() => setLoaded(true)}
              style={{ display: "block", width: "100%", height: "100%", border: 0, background: "transparent" }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
