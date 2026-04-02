import { Grid, Typography, Button, Box } from "@mui/material";
import React from "react";

function AboutUs() {
  return (
    <Grid
      size={12}
      container
      spacing={6}
      justifyContent="center"
      alignItems="center"
      sx={{ height: "550px", mt: { xs: 2, lg: 0 } }}
    >
      <Grid
        container
        size={{ xs: 12, lg: 5 }}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            position: "relative",
            height: { xs: "170px", lg: "350px" },
            width: { xs: "255px", lg: "550px" },
            overflow: "visible",
          }}
        >
          <img
            src="/images/home/banner/bg4.jpg"
            alt="image"
            height="100%"
            style={{ borderRadius: 30, boxShadow: 4 }}
          />
          <Box
            sx={{
              bgcolor: "#A8FBD3",
              position: "absolute",
              bottom: { xs: -20, lg: -30 },
              left: { xs: -20, lg: -30 },
              borderRadius: 10,
              height: { xs: "150px", lg: "300px" },
              width: { xs: "250px", lg: "450px" },
              zIndex: -1,
            }}
          />
        </Box>
      </Grid>
      <Grid
        size={{ xs: 10, lg: 5 }}
        container
        justifyContent="center"
        direction="column"
      >
        <Grid container direction="column" spacing={4}>
          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "16px", md: "20px" },
                display: "inline",
                fontWeight: "bold",
                borderBottom: "3px solid #06923E",
                pb: 0.5,
              }}
            >
              About Us
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "18px", mb: 2 }}>
              Welcome to My Health Opinions
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              A healthcare community of Frequent Research which covers solely
              healthcare audiences responses which is used by us for healthcare
              sponsors and other pharmaceutical research purpose only including
              Physicians, Healthcare Professionals and Consumer Ailments.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AboutUs;
