"use client";
import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";

function JoinPanel({ open, setOpen }) {
  return (
    <Grid
      size={12}
      container
      spacing={3}
      px={2}
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor: "#A8FBD3", minHeight: "200px" }}
    >
      <Grid
        size={{ xs: 12, md: 8 }}
        justifyContent="space-between"
        alignItems="center"
        container
        py={8}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            Get Paid to take Survey Online.
          </Typography>
          <Typography sx={{ fontSize: "16px" }}>
            Join Today and you will get Free Reward for basic Profile Questions.
          </Typography>
        </Box>
        <Button
          onClick={() => {
            setOpen(!open);
          }}
          variant="contained"
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: 2,

            fontWeight: "bold",
            height: "55px",
            px: 2,
            boxShadow: 5,
            fontSize: "14px",
          }}
        >
          JOIN OUR PANEL NOW
        </Button>
      </Grid>
    </Grid>
  );
}

export default JoinPanel;
