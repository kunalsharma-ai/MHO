import { Grid, Typography } from "@mui/material";
import React from "react";

const modes = [
  {
    label: "Paypal",
    img: (
      <img
        src="/images/rewards/paypal.png"
        alt="paypal"
        style={{ aspectRatio: "500 / 132", width: "185px", height: "auto" }}
      />
    ),
  },
  {
    label: "UPI",
    img: (
      <img
        src="/images/rewards/upi.png"
        alt="upi"
        style={{ aspectRatio: "500 / 138", width: "185px", height: "auto" }}
      />
    ),
  },
  {
    label: "Wire Transfer",
    img: (
      <img
        src="/images/rewards/wire-transfer.png"
        alt="wire transfer"
        style={{ aspectRatio: "512 / 319", width: "120px", height: "auto" }}
      />
    ),
  },
  {
    label: "Medical Report",
    img: (
      <img
        src="/images/rewards/health-report.png"
        alt="medical report"
        style={{ height: "80px", width: "80px" }}
      />
    ),
  },
];

function RewardModes() {
  return (
    <Grid
      size={12}
      container
      justifyContent="center"
      alignItems="center"
      px={2}
      sx={{
        bgcolor: "#d5eeea",
        // background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
        minheight: "300px",
      }}
    >
      <Grid size={10} alignSelf="flex-start" py={3}>
        <Typography
          sx={{
            fontSize: { xs: "16px", md: "20px" },
            display: "inline-block",
            fontWeight: "bold",
            borderBottom: "3px solid #06923E",
            pb: 0.5,
            mt: 2,
          }}
        >
          Reward Mode
        </Typography>
        <Grid
          size={12}
          container
          spacing={3}
          my={4}
          justifyContent="center"
          alignItems="center"
        >
          {modes.map((mode, index) => {
            return (
              <Grid
                container
                size={{ xs: 12, md: 6, lg: 3 }}
                key={index}
                direction="column"
                alignItems="center"
                spacing={3}
                justifyContent="flex-end"
                sx={{
                  bgcolor: "#f1f4f9",
                  border: `2px solid white`,
                  borderRadius: 4,
                  p: 2,
                  minHeight: "190px",
                  textAlign: "center",
                }}
              >
                {mode?.img}

                <Typography sx={{ fontSize: "18px", height: "50px" }}>
                  {mode?.label}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RewardModes;
