"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Grid,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMember } from "@/Context";
import { api, Page } from "@/util";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";
import ParentDetailsForm from "../password/ParentDetailsForm";
import { Terms } from "../terms/page";

export default function page() {
  return (
    <Grid
      size={12}
      container
      sx={{
        bgcolor: "primary.light",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
      justifyContent="center"
      alignItems="center"
      py={2}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={0}
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: 24,
          py: 3,
          px: { xs: 1, md: 4 },
          textAlign: "justify",
        }}
      >
        {" "}
        <Page.Box
          sx={{
            height: "67.44px",
            width: "240px",
          }}
        >
          <img
            src="/images/logo/My-Health-Opinions.png"
            alt="logo"
            height="100%"
            width="100%"
          />
        </Page.Box>
        <Terms />
      </Grid>
    </Grid>
  );
}
