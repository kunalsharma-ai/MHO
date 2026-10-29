"use client";
import React from "react";
import { useMember } from "@/Context";
import { api } from "@/util";
import {
  bumpRewards,
  creditCardRewards,
  creditQualityScore,
  readPaidProfiles,
} from "@/hooks/useRewardsRefresh";

const BASE = "/mho-sections";
const SECTIONS = {
  patient: {
    folder: "patient",
    script: "embed/mho-patient-section.js",
    global: "MHOPatient",
  },
  "care giver": {
    folder: "caregiver",
    script: "mho-profile-section.js",
    style: "mho-profile-section.css",
    global: "MHOProfileSection",
  },
  "healthcare professional": {
    folder: "hcp",
    script: "mho-hcp-section.js",
    style: "mho-hcp-section.css",
    global: "MHOProfileSection",
  },
};

export const sectionOf = (category) => SECTIONS[category?.trim().toLowerCase()];

const SCREEN_OUT = {
  "care giver": {
    "caregiver-support": {
      values: ["No"],
      title: "Explore Our Other Research Communities!",
      paragraphs: [
        "Thank you for your interest in joining our research community.",
        "Since you selected **“No,”** you are not currently part of the caregiving community. No worries! You can still participate in exciting research opportunities through our other communities.",
      ],
      links: [
        {
          name: "Turn2Opinion",
          icon: "briefcase",
          logo: "https://www.turn2opinion.com/imagest2o/logo.png",
          text: "Connect with our Business Professional and Consumer research community and share your opinions through relevant research opportunities.",
          site: "turn2opinion.com",
          url: "https://www.turn2opinion.com/",
          button: "Explore Turn2Opinion",
        },
        {
          name: "MyFrequentRewards",
          icon: "gift",
          logo: "/images/brand/myfrequentrewards-logo.webp",
          text: "Join our rewards-based research community, participate in eligible surveys, and earn rewards for qualifying participation.",
          site: "myfrequentrewards.com",
          url: "https://www.myfrequentrewards.com/",
          button: "Explore MyFrequentRewards",
        },
      ],
      note: "Survey eligibility and rewards depend on the requirements of each research study.",
    },
  },
};

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const found = document.querySelector(`script[data-section="${src}"]`);
    if (found) {
      if (found.dataset.ready) return resolve();
      found.addEventListener("load", resolve);
      found.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.dataset.section = src;
    script.onload = () => {
      script.dataset.ready = "true";
      resolve();
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function loadStyle(href) {
  if (document.querySelector(`link[data-section="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.section = href;
  document.head.appendChild(link);
}

export default function ProfileSection({ view = "all", categories, onFail, onItems, handleRef }) {
  const user = useMember();
  const hostRef = React.useRef(null);
  const key = user?.category?.trim().toLowerCase();
  const section = categories && !categories.includes(key) ? undefined : sectionOf(key);

  React.useEffect(() => {
    if (!section || !hostRef.current) return undefined;
    let cancelled = false;
    let mounted = null;
    let offItems = null;
    const root = `${BASE}/${section.folder}/`;
    window.MHO_HOST = {
      category: user.category,
      screenOut: SCREEN_OUT[key],
      signOut: async (target) => {
        try {
          await api.delete("/api/v1/me");
        } catch (e) {
          console.log(e);
        }
        try {
          localStorage.clear();
        } catch (e) {
          console.log(e);
        }
        window.location.replace(target || "/");
      },
      progress: async () => {
        const paid = await readPaidProfiles(user);
        const now = Date.now();
        return {
          completed: Object.fromEntries(Object.keys(paid || {}).map((slug) => [slug, now])),
          points: paid || {},
        };
      },
      complete: async (slug, points, quality) => {
        const paid = await creditCardRewards(user, [{ slug, name: slug, points: points || 50 }]);
        const scored = await creditQualityScore(user, [slug], quality || 1);
        if (paid || scored) {
          bumpRewards();
          await user?.Reload?.();
        }
      },
    };
    if (section.style) loadStyle(root + section.style);
    loadScript(root + section.script)
      .then(async () => {
        if (cancelled) return;
        mounted = await window[section.global].mount(hostRef.current, {
          assetBase: root,
          view,
          sound: false,
          theme: "light",
          user: {
            firstName: user.firstname,
            id: user._id,
            email: user.mail,
          },
        });
        if (handleRef) handleRef.current = mounted;
        if (onItems) {
          offItems = mounted.subscribe(onItems);
          onItems(mounted.items());
        }
      })
      .catch((error) => {
        console.error("Failed to load section script:", error);
        onFail?.();
      })
      .finally(() => {
        if (cancelled && mounted) mounted.unmount();
      });
    return () => {
      cancelled = true;
      offItems?.();
      if (handleRef) handleRef.current = null;
      if (mounted) mounted.unmount();
    };
  }, [section?.folder, user?._id, view]);

  if (!section) return null;
  return <div ref={hostRef} />;
}
