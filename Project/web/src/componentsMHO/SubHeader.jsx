"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Grid, Typography, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function SubHeader({ title = "Title", pageName = "name" }) {
  const router = useRouter();
 return (
  <Grid
    container
    size={12}
    justifyContent="center"
    alignItems="center"
    direction="column"
    sx={{
      position: "relative",
      overflow: "hidden",
      height: { xs: 360, md: 420 },

      // backgroundImage: "url(/images/home/banner/bg5.jpg)",
      backgroundImage: "url(/images/home/banner/subheader.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "0% 85%",
      backgroundRepeat: "no-repeat",

      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: (theme) => `
          linear-gradient(
            135deg,
            ${theme.palette.primary.main}E6 0%,
            rgba(0,0,0,.55) 45%,
            ${theme.palette.secondary.main}AA 100%
          )
        `,
      },

      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at top right, rgba(255,255,255,.12), transparent 45%)",
      },
    }}
  >
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 34, md: 54 },
          fontWeight: 800,
          color: "#fff",
          letterSpacing: 1,
          textShadow: "0 8px 25px rgba(0,0,0,.35)",
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: "inline-flex",
          alignItems: "center",
          gap: 1.25,
          px: 3,
          py: 1,
          borderRadius: 100,
          bgcolor: "rgba(255,255,255,.12)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,.2)",
        }}
      >
        <Typography
          onClick={() => router.push("/")}
          sx={{
            color: "rgba(255,255,255,.9)",
            fontWeight: 600,
            cursor: "pointer",
            transition: ".25s",

            "&:hover": {
              color: "secondary.main",
            },
          }}
        >
          Home
        </Typography>

        <ArrowForwardIosIcon
          sx={{
            fontSize: 14,
            color: "rgba(255,255,255,.6)",
          }}
        />

        <Typography
          sx={{
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {pageName}
        </Typography>
      </Box>
    </Box>

    <Box
      sx={{
        position: "absolute",
        bottom: -70,
        left: "50%",
        transform: "translateX(-50%)",
        width: 220,
        height: 220,
        borderRadius: "50%",
        bgcolor: "rgba(255,255,255,.06)",
        filter: "blur(10px)",
      }}
    />
  </Grid>
);
}

export default SubHeader;
