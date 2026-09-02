"use client";

import React from "react";
import {
  Box,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

import SurveyPointsSidebar from "./SurveyPointsSidebar";
import CurrentUser from "./CurrentUser";
import { Page } from "@/util";
import { motion } from "framer-motion";
import OnboardingTour from "./OnboardingTour";
import { useMember } from "@/Context"

const MotionBox = motion.create(Box);
const sidebarVariants = {
  hidden: {
    x: -40,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
};

const menuItemVariants = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sidebarItems = [
  { icon: "icon-drawer", label: "Dashboard", link: "/member/dashboard", tourId: "nav-dashboard" },
  { icon: "icon-user", label: "My Account", link: "/member/myaccount", tourId: "nav-myaccount" },
  { icon: "icon-people", label: "Profiles", link: "/member/profiles", tourId: "nav-profiles" },
  { icon: "icon-docs", label: "Surveys", link: "/member/surveys", tourId: "nav-surveys" },
  { icon: "icon-wallet", label: "Rewards", link: "/member/rewards", tourId: "nav-rewards" },
  { icon: "icon-share-alt", label: "Referrals", link: "/member/referrals", tourId: "nav-referrals" },
  { icon: "icon-settings", label: "Settings", link: "/member/settings", tourId: "nav-settings" },
  { icon: "icon-support", label: "Help & Support", link: "/member/support", tourId: "nav-support" },
];
export default function MemberSidebar({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const member = useMember();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return (
   <Box display="flex">
      <OnboardingTour member ={member} greeting={greeting} userName={member?.name?.first} />
      {/* Sidebar */}
      <MotionBox
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        sx={{
          position: "relative",
          width: { xs: 72, lg: 290 },
          height: {
            xs: "calc(100vh - 122px)",
            sm: "calc(100vh - 104px)",
          },
          mt: "78px",
          bgcolor: "#ffffff",
          borderRight: "1px solid #eef2f7",
          px: { xs: 1, lg: 2 },
          py: 2,
          overflowY: "auto",
          flexShrink: 0,

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          overflow: "hidden",

          "&::before": {
            content: '""',
            position: "absolute",
            top: -120,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,122,0,.22) 0%, rgba(255,122,0,.10) 40%, transparent 75%)",
            filter: "blur(45px)",
            pointerEvents: "none",
            zIndex: 0,
          },

          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -180,
            right: -140,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(13,92,199,.12) 0%, transparent 75%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          },

          "& > *": {
            position: "relative",
            zIndex: 1,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `
    radial-gradient(circle at 10% 8%, rgba(255,122,0,.22), transparent 28%),
    radial-gradient(circle at 85% 35%, rgba(255,122,0,.10), transparent 24%),
    radial-gradient(circle at 40% 100%, rgba(255,122,0,.08), transparent 35%)
  `,
            filter: "blur(40px)",
            pointerEvents: "none",
          },
        }}
      >
        {/* Menu */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            flex: 1,
            overflow: "auto",
          }}
        >
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.link;

            const content = (
              <MotionBox
                key={index}
                data-tour={item.tourId}
                variants={menuItemVariants}
                role="button"
                tabIndex={0}
                onClick={() => {
                  console.log(router);
                  router.replace(item.link);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.replace(item.link);
                  }
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "flex-start" },
                  gap: 2,
                  px: { xs: 0, lg: 2.2 },
                  height: 54,
                  borderRadius: "16px",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "#ffffff" : "#667085",
                  "&:hover": {
                    bgcolor: isActive ? "secondary.main" : "#f5f3ff",
                    color: isActive ? "#ffffff" : "secondary.main",
                  },
                }}
              >
                <i
                  className={item.icon}
                  style={{
                    fontSize: "20px",
                  }}
                />

                <Typography
                  sx={{
                    display: { xs: "none", lg: "block" },
                    fontSize: 15,
                    fontWeight: isActive ? 700 : 600,
                    letterSpacing: "-0.1px",
                  }}
                >
                  {item.label}
                </Typography>
              </MotionBox>
            );

            return isLgUp ? (
              content
            ) : (
              <Tooltip key={index} title={item.label} placement="right">
                {content}
              </Tooltip>
            );
          })}
        </Box>

        {/* Bottom Section */}
        <MotionBox
          variants={menuItemVariants}
          sx={{
            mt: 2,
            display: { xs: "none", lg: "flex" },
            flexDirection: { lg: "column" },
            gap: { lg: 2 },
          }}
        >
          <SurveyPointsSidebar onUpdate={() => {}} />

          <CurrentUser />
        </MotionBox>
      </MotionBox>

      {/* Main Content */}
      <MotionBox
        key={pathname}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        sx={{
          width: {
            xs: "calc(100vw - 72px)",
            lg: "calc(100vw - 290px)",
          },
          height: {
            xs: "calc(100vh - 122px)",
            sm: "calc(100vh - 104px)",
          },
          mt: "78px",
          overflow: "auto",
          bgcolor: "#f8fafc",
        }}
      >
        {children}
      </MotionBox>
    </Box>
  );
}
