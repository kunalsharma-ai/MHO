"use client";
import { Grid, Typography } from "@mui/material";
import Counter from "./Counter";

const stats = [
  { label: "Registered Panellist", value: 31240 },
  { label: "Incentives this Month", value: 13890, prefix: "$" },
  { label: "Monthly Surveys", value: 44 },
  { label: "Completed Surveys", value: 1520 },
];

function Stats() {
  return (
    <Grid
      size={12}
      container
      justifyContent="center"
      alignItems="center"
      sx={{ borderTop: `1px solid #e0e0e0` }}
    >
      <Grid
        size={10}
        container
        spacing={3}
        px={2}
        py={12}
        justifyContent="center"
      >
        {stats.map((stat, index) => {
          return (
            <Grid
              container
              size={{ xs: 12, md: 6, lg: 3 }}
              key={index}
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{
                bgcolor: "#f1f4f9",
                border: `1px solid #a8fbd3`,
                borderRadius: 4,
                py: 2,
                minHeight: "190px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "36px",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                }}
              >
                <Counter value={stat.value} prefix={stat?.prefix} />
              </Typography>
              <Typography sx={{ fontSize: { xs: "16px", xl: "18px" } }}>
                {stat?.label}
              </Typography>
            </Grid>
          );
        })}
      </Grid>{" "}
    </Grid>
  );
}

export default Stats;
