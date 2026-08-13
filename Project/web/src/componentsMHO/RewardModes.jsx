"use client";

import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const heading = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const logo = {
  hover: {
    scale: 1.08,
    rotate: [-2, 2, -2, 0],
    transition: {
      duration: 0.45,
    },
  },
};

const modes = [
  {
    label: "PayPal",
    img: (
      <img
        src="/images/rewards/paypal.png"
        alt="PayPal"
        style={{
          width: "170px",
          height: "auto",
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    label: "UPI",
    img: (
      <img
        src="/images/rewards/upi.png"
        alt="UPI"
        style={{
          width: "170px",
          height: "auto",
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    label: "Wire Transfer",
    img: (
      <img
        src="/images/rewards/wire-transfer.png"
        alt="Wire Transfer"
        style={{
          width: "120px",
          height: "auto",
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    label: "Amazon Gift Card",
    img: (
      <img
        src="/images/rewards/amazon.png"
        alt="Amazon Gift Card"
        style={{
          width: "120px",
          height: "auto",
          objectFit: "contain",
        }}
      />
    ),
  },
  {
    label: "Medical Report",
    img: (
      <img
        src="/images/rewards/medicalreport.png"
        // src="/images/rewards/health-report.png"
        alt="Medical Report"
        style={{
          width: "85px",
          height: "auto",
          objectFit: "contain",
        }}
      />
    ),
  },
];

function RewardModes() {
  return (
    <MotionGrid
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      container
      justifyContent="center"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg,#FFF3E9 0%,#FFF9F4 100%)",
      }}
    >
      <Grid container size={10} direction="column">
        <MotionBox
          variants={heading}
          sx={{
            textAlign: "center",
            mb: 7,
            maxWidth: 720,
            mx: "auto",
          }}
        >
          <Typography
            sx={{
              color: "secondary.main",
              textTransform: "uppercase",
              letterSpacing: 2,
              fontWeight: 700,
              fontSize: 14,
              mb: 1,
            }}
          >
            Rewards
          </Typography>

          <Typography
            sx={{
              fontWeight: 800,
              fontSize: {
                xs: "2rem",
                md: "2.75rem",
              },
              color: "primary.dark",
              mb: 2,
            }}
          >
            Get Rewarded Your Way
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: {
                xs: 16,
                md: 18,
              },
              lineHeight: 1.8,
              maxWidth: 650,
              mx: "auto",
            }}
          >
            Receive your survey incentives through secure and convenient payment
            methods that suit your preferences.
          </Typography>
        </MotionBox>

        <Grid container spacing={4} justifyContent="center">
          {modes.map((mode, index) => (
            <Grid
              key={index}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 2.4,
              }}
            >
              <MotionBox
                variants={card}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                sx={{
                  height: 220,

                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  p: 4,

                  borderRadius: 5,

                  bgcolor: "white",

                  border: (theme) => `1px solid ${theme.palette.primary.light}`,

                  boxShadow: "0 12px 35px rgba(0,0,0,.06)",

                  transition: (theme) =>
                    theme.transitions.create(
                      ["transform", "box-shadow", "border-color"],
                      {
                        duration: theme.transitions.duration.standard,
                      },
                    ),

                  "&:hover": {
                    borderColor: "secondary.main",

                    boxShadow: (theme) => `
                      0 20px 45px ${theme.palette.secondary.main}20,
                      0 0 25px ${theme.palette.secondary.main}15
                    `,
                  },
                }}
              >
                <MotionBox
                  variants={logo}
                  whileHover="hover"
                  sx={{
                    height: 90,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    mb: 4,
                  }}
                >
                  {mode.img}
                </MotionBox>

                <MotionBox variants={heading}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 18,
                      textAlign: "center",
                      color: "primary.dark",
                    }}
                  >
                    {mode.label}
                  </Typography>
                </MotionBox>
              </MotionBox>
            </Grid>
          ))}
        </Grid>

        <MotionBox
          variants={heading}
          sx={{
            mt: 7,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 17,
              lineHeight: 1.8,
            }}
          >
            Every completed survey brings you closer to exciting rewards,
            securely delivered through your preferred payment method.
          </Typography>
        </MotionBox>
      </Grid>
    </MotionGrid>
  );
}

export default RewardModes;
