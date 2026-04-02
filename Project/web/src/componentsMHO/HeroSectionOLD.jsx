import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

function HeroSection() {
  return (
    <Grid sx={{ bgcolor: "#A8FBD3" }}>
      <Grid
        size={12}
        container
        spacing={6}
        justifyContent="center"
        sx={{ minHeight: "550px" }}
      >
        <Grid
          size={{ xs: 10, md: 5 }}
          container
          justifyContent="center"
          direction="column"
          px={4}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "26px" }}>
            MY Health Opinions
          </Typography>
          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              borderRadius: 2,
              width: "120px",
              fontWeight: "bold",
              height: "55px",
              px: 2,
              boxShadow: 5,
              fontSize: "14px",
            }}
          >
            JOIN NOW
          </Button>
        </Grid>
        <Grid
          size={{ md: 5 }}
          sx={{
            position: "relative",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: { xs: "relative", xl: "absolute" },
              bottom: { md: 0, xl: -30 },
              borderRadius: 10,
              height: { md: "300px", xl: "500px" },
              width: { md: "450px", xl: "750px" },
              overflow: "visible",
            }}
          >
            <img
              src="/images/home/banner/bg1.jpg"
              alt="image"
              height="100%"
              style={{ borderRadius: 30, boxShadow: 4, zIndex: 2, my: "auto" }}
            />
            <SvgElement />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HeroSection;

function SvgElement() {
  return (
    <Box
      sx={{
        display: { md: "none", xl: "block" },
        position: "absolute",
        bottom: 80,
        left: -39,
        zIndex: 200,
        pointerEvents: "none",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 161 161"
        width="161"
        height="161"
        style={{ display: "block" }}
      >
        {/* Outer border */}
        <rect x="0" y="0" width="161" height="161" stroke="black" fill="none" />

        {/* Vertical grid lines */}
        <line x1="40.25" y1="0" x2="40.25" y2="161" stroke="black" />
        <line x1="80.5" y1="0" x2="80.5" y2="161" stroke="black" />
        <line x1="120.75" y1="0" x2="120.75" y2="161" stroke="black" />

        {/* Horizontal grid lines */}
        <line x1="0" y1="40.25" x2="161" y2="40.25" stroke="black" />
        <line x1="0" y1="80.5" x2="161" y2="80.5" stroke="black" />
        <line x1="0" y1="120.75" x2="161" y2="120.75" stroke="black" />
      </svg>
    </Box>
  );
}
