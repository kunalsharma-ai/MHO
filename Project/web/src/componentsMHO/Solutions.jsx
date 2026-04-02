import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const solutions = [
  {
    label: "Verified Recruitment",
    value:
      "Every Recruitment takes place in double optin process to verify every panelist",
  },
  {
    label: "Advance Targeting",
    value:
      "Panelist Targeting with more profiling questions i.e. Decision Making, Job Position, Diseases spacialization etc",
  },
  {
    label: "Quality Data Sample",
    value:
      "Occasinally verified panel to remove bad response and provide only quality survey responses",
  },
];
function Solutions() {
  return (
    <Grid
      size={12}
      container
      spacing={3}
      justifyContent="center"
      // sx={{ border: `1px solid #e0e0e0` }}
    >
      <Grid size={10} alignSelf="flex-start" py={3}>
        <Typography
          sx={{
            fontSize: { xs: "16px", md: "20px" },
            display: "inline-block",
            fontWeight: "bold",
            borderBottom: "3px solid #06923E",
            pb: 0.5,
            mt: 3,
          }}
        >
          Solutions
        </Typography>
        <Grid size={12} container spacing={2} my={5}>
          {solutions.map((sol, index) => {
            return (
              <Grid
                size={{ xs: 12, lg: 4 }}
                key={index}
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={3}
                sx={{
                  bgcolor: "#f1f4f9",
                  border: `1px solid #a8fbd3`,
                  borderRadius: 4,
                  py: 4,
                  px: 3,
                  minHeight: "190px",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    whiteSpace: "normal",
                  }}
                >
                  {sol?.label}
                </Typography>
                <Typography sx={{ fontSize: "18px" }}>{sol?.value}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Solutions;
