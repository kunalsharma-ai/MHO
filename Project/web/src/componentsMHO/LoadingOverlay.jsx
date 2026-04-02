"use client";
import React from "react";
import { keyframes } from "@mui/system";
import { Page } from "@/util";

// Define rotation animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

function LoadingOverlay({ zIndex = 9998 }) {
  return (
    <Page.Box
      sx={{
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(15px)",
        zIndex: zIndex,
      }}
    >
      <Page.Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: zIndex + 1,
          width: "300px",
        }}
      >
        <Page.Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Page.Box
            component="img"
            alt="Rotating Logo"
            src="/images/logo/logo.png"
            sx={{
              height: "160px",
              width: "160px",
              animation: `${spin} 2s linear infinite`,
              transformOrigin: "center center",
            }}
          />
        </Page.Box>
      </Page.Box>
    </Page.Box>
  );
}

export default LoadingOverlay;
