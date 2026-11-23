"use client";
import React from "react";
import { useMember } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import OldProfiles from "./page_old";
import ProfileSection, { sectionOf } from "../../components/ProfileSection";

export default function page() {
  const user = useMember();
  const [failed, setFailed] = React.useState(false);

  if (!user) return <LoadingOverlay />;
  if (!sectionOf(user.category) || failed) return <OldProfiles />;
  return <ProfileSection view="profiles" onFail={() => setFailed(true)} />;
}