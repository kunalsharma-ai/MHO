import { Grid, Box, Typography } from "@mui/material";
import React from "react";

const modes = [
  {
    label: "Account Dashboard",
    bgcolor: "#d5eeea",
    color: "#005353",
    img: (
      <Box
        component="img"
        // src="/images/notify/acc-dashboard.jpg"
        src="/images/notify/dashboard.png"
        alt="dashboard"
        sx={{
          // aspectRatio: "324 / 288",
          // width: "200px",
          width: "auto",
          // height: "auto",
          height: { xs: "100px", md: "130px" },
        }}
      />
    ),
  },
  {
    label: "SMS",
    bgcolor: "#dfebf9",
    color: "#002388",

    img: (
      <img
        src="/images/notify/sms2.png"
        alt="sms"
        style={{ height: "130px", width: "130px" }}
      />
    ),
  },
  {
    label: "WhatsApp",

    bgcolor: "#d5eeea",
    color: "#005353",
    img: (
      <img
        src="/images/notify/whatsapp.png"
        alt="WhatsApp"
        style={{ aspectRatio: "216 / 228", width: "100px", height: "auto" }}
      />
    ),
  },
  {
    label: "Email",
    bgcolor: "#F5EFE6",
    color: "#c88c00ff",
    img: (
      <img
        src="/images/notify/email.png"
        alt="email"
        style={{ height: "100px", width: "100px" }}
      />
    ),
  },
];

function SurveyFlexibility() {
  return (
    <Grid
      size={12}
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        //  bgcolor: "#d5eeea",
        minheight: "400px",
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
            mt: 3,
          }}
        >
          Survey Opinion Flexibility
        </Typography>
        <Grid size={12} container spacing={3} my={6} justifyContent="center">
          {modes.map((mode, index) => {
            return (
              <Grid
                container
                size={{ xs: 12, md: 6, xl: 3 }}
                key={index}
                direction="column"
                alignItems="center"
                spacing={0}
                sx={{
                  // bgcolor: mode?.bgcolor,
                  color: mode?.color,
                  bgcolor: "#f1f4f9",
                  border: `1px solid ${mode?.color}`,
                  borderRadius: 4,
                  py: 2,
                  px: 2,
                  minHeight: "150px",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: "20px", height: "50px", fontWeight: "bold" }}
                >
                  {mode?.label}
                </Typography>
                {mode?.img}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SurveyFlexibility;
