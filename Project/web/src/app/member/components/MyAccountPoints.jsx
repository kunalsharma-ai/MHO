"use client";

import React from "react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  Collapse,
} from "@mui/material";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import { api, loadData } from "@/util";
import { useRouter } from "next/navigation";

export default function MyAccountPoints() {
  const router = useRouter();

  const [points, setPoints] = React.useState(0);
  const [threshold, setThreshold] = React.useState(15000);
  const [conversionRate, setConversionRate] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);

    loadData(
      api.get("/api/v1/me/points"),
      (resp) => {
        if (resp.status === "error") {
          return;
        }

        const data = resp.data;

        setPoints(data?.totalPoints ?? 0);
        setThreshold(data?.threshold ?? 15000);
        setConversionRate(data?.conversionRate ?? 0);
      },
      () => {
        setIsLoading(false);
      },
    );
  }, []);

  const percentage = Math.min((points / threshold) * 100, 100);
  const rewardAmount = Number(points) * Number(conversionRate);

  return (
    <Collapse
      in={!isLoading}
      timeout={500}
      unmountOnExit
      sx={{ width: "100%" }}
    >
      <Box
      data-tour="myaccount-current-rewards"
        sx={{
          width: "100%",
          borderRadius: "22px",
          overflow: "hidden",
          position: "relative",
          px: { xs: 2, md: 4 },
          py: { xs: 2.5, md: 3 },
          background: "linear-gradient(180deg,#FFFFFF 0%,#FFF8F1 100%)",
          border: "1px solid rgba(0,27,102,.08)",

          boxShadow: "0 8px 24px rgba(0,27,102,.08)",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: "linear-gradient(#FE7E00,#FFB347)",
          },
        }}
      >
        {/* Decorative Pattern */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
  linear-gradient(120deg, transparent 0%, transparent 48%, #A9C8FF 49%, transparent 50%),
  linear-gradient(60deg, transparent 0%, transparent 48%, #A9C8FF 49%, transparent 50%)
`,
            opacity: 0.035,
            backgroundSize: "180px 180px",
            pointerEvents: "none",
          }}
        />

        {/* Glow Effects */}
        <Box
          sx={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(0,27,102,.06)",
            filter: "blur(90px)",
            top: -120,
            right: -80,
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: -100,
            bottom: -120,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "rgba(255,255,255,.08)",
            filter: "blur(90px)",
          }}
        />

        <Grid
          container
          spacing={3}
          alignItems="center"
          position="relative"
          zIndex={2}
        >
          {/* Left Section */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              sx={{
                color: "#5C6B84",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              Current Rewards:
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: { xs: 42, md: 54, xl: 68 },
                lineHeight: 0.95,
                fontWeight: 900,
                color: "#0A47C9",
                letterSpacing: "-2px",
                textShadow: "0 2px 12px rgba(255,255,255,.15)",
              }}
            >
              {points.toLocaleString()} pts
            </Typography>

            <Typography
              sx={{
                mt: 0.75,
                color: "#6B7280",
                fontWeight: 700,
                letterSpacing: 0.3,
                fontSize: { xs: "15px", md: "18px" },
              }}
            >
              ({rewardAmount.toMoney("USD")})
            </Typography>
            <Stack direction="row" spacing={2} mt={2}>
              <Typography
                sx={{
                  color: "#6B7280",
                  fontWeight: 600,
                }}
              >
                {percentage.toFixed(0)}% Complete
              </Typography>

              <Typography
                sx={{
                  color: "#6B7280",
                }}
              >
                •
              </Typography>

              <Typography
                sx={{
                  color: "#6B7280",
                  fontWeight: 600,
                }}
              >
                {threshold - points > 0
                  ? `${(threshold - points).toLocaleString()} pts remaining`
                  : "Ready for payout"}
              </Typography>
            </Stack>
          </Grid>

          {/* Center Trophy */}
          <Grid
            size={{ xs: 12, md: 2 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "rgba(0,60,180,.14)",
                filter: "blur(80px)",
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                width: 105,
                height: 105,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
                border: "1px solid #EDF2F7",
                boxShadow: "0 12px 35px rgba(0,27,102,.08)",
              }}
            >
              <EmojiEventsRoundedIcon
                sx={{
                  fontSize: 68,
                  color: "#0A47C9",
                  animation: "float 4s ease-in-out infinite",

                  "@keyframes float": {
                    "0%": {
                      transform: "translateY(0px)",
                    },
                    "50%": {
                      transform: "translateY(-8px)",
                    },
                    "100%": {
                      transform: "translateY(0px)",
                    },
                  },
                }}
              />
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: { xs: "14px", md: "16px" },
                  letterSpacing: 0.2,
                }}
              >
                Next Payout
              </Typography>

              <FlagRoundedIcon
                sx={{
                  color: "primary.main",
                  fontSize: 28,
                }}
              />
            </Stack>

            <Box sx={{ position: "relative" }}>
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                  height: 20,
                  borderRadius: "999px",

                  overflow: "hidden",
                  backgroundColor: "#E7EDF7",
                  boxShadow: "inset 0 2px 6px rgba(0,0,0,.12)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    background: "linear-gradient(90deg,#0A47C9,#2A74FF)",
                  },
                }}
              />

              <Box
                sx={{
                  mt: 1.25,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "secondary.main",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {points.toLocaleString()} / {threshold.toLocaleString()} pts
                </Typography>

                <Typography
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {percentage.toFixed(0)}%
                </Typography>
              </Box>
            </Box>

            {points >= threshold && (
              <Button
                variant="contained"
                sx={{
                  mt: 2.5,
                  borderRadius: 999,
                  px: 3,
                  py: 1,
                  fontWeight: 800,
                  textTransform: "none",
                  background:
                    "linear-gradient(90deg, #001B66 0%, #0037A6 100%)",
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(0,27,102,.28)",

                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #00154d 0%, #002d85 100%)",
                  },
                  animation: "pulse 2s infinite",

                  "@keyframes pulse": {
                    "0%": {
                      boxShadow: "0 0 0 0 rgba(0,27,102,.35)",
                    },
                    "70%": {
                      boxShadow: "0 0 0 12px rgba(0,27,102,0)",
                    },
                    "100%": {
                      boxShadow: "0 0 0 0 rgba(0,27,102,0)",
                    },
                  },
                }}
              >
                Redeem Now
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  );
}
