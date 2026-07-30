"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Grid, Typography } from "@mui/material";
import { useMember, useQuery } from "@/Context";

import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { api, Page } from "@/util";
import { useToast } from "@/hooks";

export default function page() {
  const user = useMember();
  const router = useRouter();

  if (!user) return <LoadingOverlay />;
  return (
    <Grid container size={12}>
      <Panelists />
      {/* <Surveys /> */}
    </Grid>
  );
}

function Panelists() {
  const [statistics, setStatistics] = React.useState({});
  React.useEffect(() => {
    api
      .get(`/api/v1/user/summarize`)
      .then((resp) => {
        if (!resp.data) return useToast(resp);
        let data = resp.data;

        console.log(data);
        setStatistics(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  const stats = React.useMemo(() => {
    return [
      {
        label: "Total Panelist",
        value: statistics?.total ?? 0,
      },
      {
        label: "Healthcare Professionals",
        value: statistics?.dsjkljfklds ?? 0,
      },
      {
        label: "Patients",
        value: statistics?.points ?? 0,
      },

      {
        label: "Caregivers",
        value: statistics?.disqualified ?? 0,
      },
    ];
  }, [statistics]);

  return (
    <Grid
      container
      size={12}
      spacing={2.5}
      sx={{
        p: { xs: 2, md: 3 },
        bgcolor: "#fafafa",
        borderRadius: 3,
        border: "1px solid #ececec",
      }}
    >
      <Page.Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 700,
            color: "primary.main",
            mb: 1,
          }}
        >
          Panelists
        </Typography>
      </Page.Box>
      {Object.values(statistics)?.map((stat, index) => {
        return (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
            <Page.Box
              sx={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2.5,
                borderRadius: 3,
                bgcolor: "#fff",
                minHeight: 115,
                boxShadow: "0 6px 20px rgba(0,0,0,.08)",
                border: "1px solid rgba(0,0,0,.06)",
                transition: "all .25s ease",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,.12)",
                },

                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 6,
                  background: (theme) =>
                    `linear-gradient(180deg,
            ${theme.palette.primary.main},
            ${theme.palette.secondary.main})`,
                },
              }}
            >
              <Page.Box>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 13,
                    fontWeight: 500,
                    mb: 0.5,
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  {stat.label}
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: 30, lg: 36 },
                    fontWeight: 700,
                    color: "primary.main",
                    lineHeight: 1,
                  }}
                >
                  {Number(stat.value).toLocaleString("en-US")}
                </Typography>
              </Page.Box>

              <Page.Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  bgcolor: (theme) => `${theme.palette.primary.main}15`,
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  flexShrink: 0,
                }}
              >
                <i className="fa-solid fa-users" />
              </Page.Box>
            </Page.Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
function Surveys() {
  const [statistics, setStatistics] = React.useState({});
  React.useEffect(() => {
    api
      .get(`/api/v1/me/statistics`)
      .then((resp) => {
        if (!resp.data) return useToast(resp);
        let data = resp.data;
        setStatistics(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  const stats = React.useMemo(() => {
    return [
      {
        label: "Total Surveys",
        value: statistics?.total ?? 0,
      },
      {
        label: "MHO Surveys",
        value: statistics?.complete ?? 0,
      },
      {
        label: "Sampledge Surveys",
        value: statistics?.points ?? 0,
      },

      {
        label: "External Surveys",
        value: statistics?.disqualified ?? 0,
      },
      {
        label: "Completes",
        value: statistics?.total ?? 0,
      },
      {
        label: "Terminates",
        value: statistics?.complete ?? 0,
      },
      {
        label: "Overquotas",
        value: statistics?.points ?? 0,
      },

      {
        label: "Security",
        value: statistics?.disqualified ?? 0,
      },
    ];
  }, [statistics]);

  return (
    <Grid
      size={12}
      container
      spacing={2}
      mt={1}
      p={{ xs: 2, md: 3 }}
      justifyContent="center"
      sx={{ borderBottom: `1px solid #e0e0e0` }}
    >
      <Page.Box width="100%">
        <Typography
          sx={{
            fontSize: "16px",
            display: "inline-block",
            fontWeight: "600",
            borderBottom: "2px solid #59AC77",
            pb: 0.5,
            my: 2,
          }}
        >
          Surveys
        </Typography>
      </Page.Box>
      {stats.map((stat, index) => {
        return (
          <Grid
            container
            size={{ xs: 12, md: 6, lg: 3 }}
            key={index}
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            sx={{
              border: "1px solid rgba(89, 172, 119, 0.6)",
              bgcolor: "#ecfcf5",
              borderRadius: 4,
              px: { xs: 3, xl: 5 },
              py: 2,
              minHeight: "120px",
            }}
          >
            <Grid
              // size={6}
              direction="column"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Typography fontSize={16}>{stat?.label}</Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "24px", xl: "36px" },
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                }}
              >
                {stat.value.toLocaleString("en-US")}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
