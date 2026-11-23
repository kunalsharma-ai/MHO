"use client";
// Member dashboard home, designed per panel (HCP, caregiver, patient): see mx/pages/Home.jsx.
// Earlier versions are kept in page_legacy.jsx and page_old.jsx for reference.
import { useMember } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import Home from "../../mx/pages/Home";

export default function Page() {
  const member = useMember();
  if (!member) return <LoadingOverlay />;
  return <Home />;
}
