"use client";
import React from "react";
import { Grid, Typography, Button, Container, IconButton } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      size={12}
      sx={{
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(90deg, #ffffff 0%, #c8fee9ff 100%)",
      }}
    >
      <Container maxWidth="lg">
        <IconButton disabled>
          <ErrorIcon sx={{ color: "primary.main", fontSize: 120 }} />
        </IconButton>

        <Typography
          sx={{
            my: 6,
            fontSize: 48,
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.2,
            mt: 2,
            color: "black",
          }}
        >
          The Page you are looking is not available or has been removed.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.5,
            mt: 4,
            mb: 2,
            color: "#777",
          }}
        >
          Go to home page using button below
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.replace("/")}
          sx={{
            height: 58,

            borderRadius: 20,
            fontSize: 16,
            fontWeight: 700,
            padding: "18px 40px",
          }}
        >
          Go to Home Page
        </Button>
      </Container>
    </Grid>
  );
}
