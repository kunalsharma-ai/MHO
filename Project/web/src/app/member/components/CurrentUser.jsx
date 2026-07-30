"use client";

import React from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useMember } from "@/Context";

const maskEmail = (email) => {
  if (!email) return "";

  const [name, domain] = email.split("@");
  if (!domain) return "xxxx";

  return `${name.slice(0, 2)}xxxx@${domain}`;
};

export default function CurrentUser() {
  const [user] = [useMember()];
  // todo: change profile picture
  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      container
      alignItems={"center"}
      justifyContent={{ xs: "center", md: "flex-start" }}
      spacing={2}
      pb={{ xs: 2, md: 0 }}
      mb={{ xs: 2, md: 0 }}
      borderBottom={{ xs: `1px solid #e0e0e0`, md: "none" }}
      sx={(theme) => ({
        position: "relative",
        overflow: "hidden",

        [theme.breakpoints.up("lg")]: {
          background:
            "linear-gradient(145deg,#0D5CC7 0%,#0A4DA5 70%,#083E86 100%)",
          borderRadius: 3,
          px: 2,
          py: 1.6,
          boxShadow: "0 8px 18px rgba(0,0,0,.18)",

          "&::before": {
            content: '""',
            position: "absolute",
            width: 110,
            height: 110,
            top: -40,
            right: -35,
            background:
              "radial-gradient(circle, rgba(255,122,0,.45) 0%, rgba(255,122,0,.12) 65%, transparent 100%)",
            filter: "blur(18px)",
            pointerEvents: "none",
          },

          "&::after": {
            content: '""',
            position: "absolute",
            width: 80,
            height: 80,
            bottom: -30,
            left: -25,
            borderRadius: "50%",
            background: "rgba(255,255,255,.06)",
            filter: "blur(12px)",
            pointerEvents: "none",
          },
        },
      })}
    >
      <Avatar
        src={user?.profilePicture || ""}
        alt={user?.name?.first ?? "U"}
        sx={{
          height: { xs: 50, lg: 50 },
          width: { xs: 50, lg: 50 },
          fontSize: { xs: 22, lg: 18 },

          bgcolor: user?.profilePicture
            ? "transparent"
            : { xs: "primary.main", lg: "secondary.main" },

          border: {
            lg: "2px solid rgba(255,255,255,.18)",
          },

          boxShadow: {
            lg: "0 8px 18px rgba(0,0,0,.2)",
          },

          zIndex: 1,
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "flex-start" },
          zIndex: 1,
          minWidth: 0,
          flex: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1.2,
            color: { xs: "primary.main", lg: "#fff" },
          }}
        >
          {user?.fullName}
        </Typography>

        <Typography
          sx={{
            mt: 0.25,
            fontSize: { xs: 14, lg: 12 },
            color: {
              xs: "text.primary",
              lg: "rgba(255,255,255,.72)",
            },
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: { xs: 270, lg: 150 },
          }}
        >
          {maskEmail(user?.mail)}
        </Typography>

        <Box
          sx={{
            mt: 0.9,
            width: "fit-content",

            px: 1,
            py: 0.25,

            borderRadius: 5,

            bgcolor: "rgba(255,176,76,.16)",
            border: "1px solid rgba(255,176,76,.4)",

            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 700,
              color: {xs:"secondary.dark",md:"#FFD79C"},
              textTransform: "capitalize",
            }}
          >
            {user?.role}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
