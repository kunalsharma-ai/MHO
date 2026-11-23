"use client";
// Member dashboard. The panel (HCP, caregiver or patient) comes from the member's category; see studio/Dashboard.jsx.
// The previous dashboard is kept in page_legacy.jsx for reference.
import { useMember } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import Dashboard from "../../studio/Dashboard";

export default function Page() {
  const member = useMember();
  if (!member) return <LoadingOverlay />;
  return <Dashboard member={member} />;
}
