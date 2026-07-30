"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  LinearProgress,
} from "@mui/material";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import { api, loadData } from "@/util";

export default function SurveyPoints({ onUpdate }) {
  const router = useRouter();
  const [points, setPoints] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [conversionRate, setConversionRate] = React.useState(null);
  const [threshold, setThreshold] = React.useState(null);
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.get(`/api/v1/me/points`),
      (resp) => {
        // if (resp.status === "error") router.replace("/survey?name=welcome");
        let data = resp.data;
        setPoints(data?.totalPoints ?? 0);
        setThreshold(data?.threshold ?? 0);
        setConversionRate(data?.conversionRate ?? 0);
      },
      () => {
        setIsLoading(false);
      },
    );
  }, []);
  React.useEffect(() => {
    onUpdate({
      threshold,
      conversionRate,
    });
  }, [threshold, conversionRate]);
  return isLoading ? null : (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      sx={{ width: "100%" }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          px: 2,
          py: 1.5,
          color: "#fff",

          background:
            "linear-gradient(135deg,#FFB15C 0%,#FF8E21 55%,#E66400 100%)",

          boxShadow: "0 8px 18px rgba(0,0,0,.18)",

          background:
            "linear-gradient(145deg,#0D5CC7 0%,#0A4DA5 70%,#083E86 100%)",

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
          },

          "&::after": {
            content: '""',
            position: "absolute",
            width: 120,
            height: 120,
            bottom: -50,
            left: -40,
            borderRadius: "50%",
            background: "rgba(255,255,255,.08)",
            filter: "blur(15px)",
          },
        }}
      >
        <AccountBalanceWalletRoundedIcon
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: 50,
            color: "rgba(255,255,255,.06)",
          }}
        />
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            color: "rgba(255,255,255,.65)",
          }}
        >
          Reward Balance
        </Typography>
        <Typography
          sx={{
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: -1,
            color: "#fff",
          }}
        >
          {points.toLocaleString()} pts
        </Typography>
        <Typography
          sx={{
            display: "inline-flex",
            alignItems: "center",
            px: 1,
            py: 0.2,
            borderRadius: 5,
            bgcolor: "rgba(255,255,255,.12)",
            border: "1px solid rgba(255,176,76,.6)",
            color: "#FFD79C",
            backdropFilter: "blur(8px)",
            fontWeight: 700,
            fontSize: 12,
            lineHeight: 1.2,
          }}
        >
          Worth ≈ {(Number(points) * Number(conversionRate)).toMoney("USD")}
        </Typography>

        {threshold > points ? (
          <Box sx={{ mt: 2 }}>
            <Typography
              sx={{
                mb: 0.8,
                fontSize: 12,
                fontWeight: 700,
                color: "secondary.light",
              }}
            >
              {(threshold - points).toLocaleString()} points until redemption
            </Typography>
            <LinearProgress
              variant="determinate"
              color="secondary"
              value={(points / threshold) * 100}
              sx={{
                height: 6,
                borderRadius: 20,
                bgcolor: "rgba(255,255,255,.12)",
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(90deg,#FFB15C,#FF8E21)",
                  borderRadius: 10,
                },
              }}
            />
          </Box>
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              // open redeem
            }}
            sx={{
              mt: 2,
              height: 38,
              borderRadius: 2.5,
              fontSize: 13,
              fontWeight: 700,

              bgcolor: "secondary.main",
              color: "#fff",

              boxShadow: "0 10px 25px rgba(255,122,0,.35)",

              "&:hover": {
                bgcolor: "secondary.dark",
                transform: "translateY(-2px)",
                boxShadow: "0 16px 35px rgba(255,122,0,.45)",
              },
            }}
          >
            Redeem Points
          </Button>
        )}
      </Box>
    </Grid>
  );
}
