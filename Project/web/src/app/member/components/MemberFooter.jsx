import { Box, Typography } from "@mui/material";
import React from "react";

function MemberFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: "3.5px",
        px: 2,
        textAlign: "center",

        bgcolor: "#f8fafc",
        borderTop: "1px solid #e5e7eb",

        color: "text.secondary",
        fontSize: 12,

        boxShadow: "0 -2px 12px rgba(0,0,0,.04)",
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: 12,
          color: "text.secondary",
        }}
      >
        Copyright © 2026{" "}
      </Typography>

      <Typography
        component="a"
        href="https://frequentresearch.com/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: "secondary.main",
          textDecoration: "none",
          transition: ".25s",

          "&:hover": {
            color: "secondary.dark",
            textDecoration: "underline",
          },
        }}
      >
        Frequent Research Fieldwork Solutions Pvt. Ltd.
      </Typography>

      <Typography
        component="span"
        sx={{
          fontSize: 12,
          color: "text.secondary",
        }}
      >
        {" "}
        (d/b/a MyHealthOpinions). All Rights Reserved.
      </Typography>
    </Box>
  );
}

export default MemberFooter;