"use client";
import React from "react";
import {
  Grid,
  Box,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useRouter, usePathname } from "next/navigation";

const sidebarItems = [
  {
    icon: "icon-drawer",
    label: "Dashboard",
    link: "/admin/dashboard",
    hasNotification: false,
  },
  {
    icon: "icon-user",
    label: "Panellists",
    link: "/admin/panelists",
    hasNotification: true,
  },
  {
    icon: "icon-wallet",
    label: "Redemptions",
    link: "/admin/redemptions",
    hasNotification: true,
  },
  {
    icon: "icon-people",
    label: "Profiles",
    link: "/admin/profiles",
    hasNotification: false,
  },
  {
    icon: "icon-notebook",
    label: "Surveys",
    link: "/admin/surveys",
    hasNotification: true,
  },
  {
    icon: "icon-support",
    label: "Support",
    link: "/admin/support",
    hasNotification: true,
  },
  // {
  //   icon: "icon-speech",
  //   label: "Chat",
  //   link: "/admin/chat",
  // },
  {
    icon: "icon-settings",
    label: "Categories",
    link: "/admin/category",
    hasNotification: false,
  },
];
export default function AdminSidebar({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box display="flex">
      <Grid
        container
        sx={{
          width: { xs: "50px", lg: "110px" },
          flexDirection: "column",
          height: "calc(100vh - 78px)",
          mt: "78px",
          display: "flex",
          justifyContent: "space-between",
          overflow: "auto",
          flexWrap: "nowrap",
          borderRadius: "0 0.75rem 0.75rem 0",
          borderLeft: "1px solid #f3f3f3",
          boxShadow: "0 3px 30px rgba(0,0,0,0.1), 0 3px 20px rgba(0,0,0,0.1)",
        }}
      >
        {sidebarItems.map((item, index) => {
          const isActive = pathname === item.link;

          const content = (
            <Box
              role="button"
              tabIndex={0}
              onClick={() => router.push(item.link)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(item.link);
                }
              }}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #e0e0e0",
                color: isActive ? "secondary.main" : "inherit",
                bgcolor: isActive ? "primary.light" : "transparent",
                gap: 0.5,
                "&:hover": {
                  cursor: "pointer",
                  color: "secondary.dark",
                  bgcolor: "secondary.light",
                },
              }}
            >
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <i className={item.icon} style={{ fontSize: "26px" }} />

                {item.hasNotification && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 2,
                      right: -2,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "error.main",
                    }}
                  />
                )}
              </Box>

              <Typography
                sx={{
                  display: {
                    xs: "none",
                    lg: "inline",
                  },
                  fontWeight: 500,
                  fontSize: { xs: 12, xl: 14 },
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );

          return isLgUp ? (
            <React.Fragment key={index}>{content}</React.Fragment>
          ) : (
            <Tooltip
              key={index}
              title={item.label}
              placement="right"
              enterTouchDelay={0}
              leaveTouchDelay={1000}
            >
              {content}
            </Tooltip>
          );
        })}
      </Grid>
      <Grid
        sx={{
          width: { xs: "calc(100vw - 50px)", lg: "calc(100vw - 110px)" },
          height: "calc(100vh - 78px)",
          mt: "78px",
          overflow: "auto",
        }}
      >
        {children}
      </Grid>
    </Box>
  );
}
