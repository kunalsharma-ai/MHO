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
      direction={"column"}
      justifyContent="center"
      alignItems={"center"}
      sx={{
        color: "white",
        background:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(./images/home/banner/bg5.jpg)",
        height: "260px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Typography
        fontSize={{ xs: "26px", md: "40px" }}
        fontWeight={"bold"}
        textAlign={"center"}
      >
        {title}
      </Typography>
      <Box
        display={"flex"}
        sx={{ gap: 1, mt: 2 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography
          onClick={() => {
            router.push("/");
          }}
          sx={{
            fontSize: "16px",
            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          Home
        </Typography>
        <ArrowForwardIosIcon fontSize="small" />{" "}
        <Typography fontSize="16px">{pageName}</Typography>
      </Box>
    </Grid>
  );
}

export default SubHeader;
