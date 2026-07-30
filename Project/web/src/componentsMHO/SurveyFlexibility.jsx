"use client";

import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const heading = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.94,
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

const image = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: 0.15,
    },
  },
};

const modes = [
  {
    label: "Account Dashboard",
    description: "Track surveys and rewards anytime.",
    // img: "/images/notify/dashboard.png",
    img: "/images/notify/daily.png",
    height: 125,
    width: 200,
  },
  {
    label: "SMS",
    description: "Receive instant survey alerts.",
    img: "/images/notify/sms2.png",
  },
  {
    label: "WhatsApp",
    description: "Get notifications directly on WhatsApp.",
    img: "/images/notify/whatsapp.png",
  },
  {
    label: "Email",
    description: "Detailed invitations delivered to your inbox.",
    img: "/images/notify/email.png",
  },
];

export default function SurveyFlexibility() {
  return (
    <MotionGrid
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.25,
      }}
      container
      justifyContent="center"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "white",
      }}
    >
      <Grid container size={10} direction="column">
        <MotionBox variants={heading}>
          <Box
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
              Survey Invitations
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
              Never Miss a Survey Opportunity
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 18,
                lineHeight: 1.8,
                maxWidth: 650,
                mx: "auto",
              }}
            >
              Choose the notification method that works best for you and stay
              updated whenever a new survey matching your profile becomes
              available.
            </Typography>
          </Box>
        </MotionBox>
        <Grid container spacing={4} justifyContent="center">
          {modes.map((mode) => (
            <Grid
              key={mode.label}
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <MotionBox
                variants={card}
                whileHover={{
                  y: -10,
                }}
                transition={{
                  duration: 0.25,
                }}
                sx={{
                  height: "100%",
                  px: 4,
                  pt: 3,
                  pb: 2,
                  textAlign: "center",
                  borderRadius: 5,
                  bgcolor: "background.paper",
                  border: (theme) => `1px solid ${theme.palette.primary.light}`,
                  boxShadow: "0 12px 35px rgba(0,0,0,.06)",

                  transition: ".35s",

                  "&:hover": {
                    borderColor: "secondary.main",
                    boxShadow: (theme) => `
            0 20px 45px ${theme.palette.secondary.main}22
          `,
                  },
                }}
              >
                <MotionBox
                  variants={image}
                  sx={{
                    height: 120,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 1,
                    mt: mode?.height ? 1 : 0,

                    "& img": {
                      maxHeight: mode?.height ?? 100,
                      maxWidth: mode?.width ?? 130,
                      objectFit: "contain",
                    },
                  }}
                >
                  <img src={mode.img} alt={mode.label} />
                </MotionBox>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "primary.dark",
                    fontSize: 20,
                    mb: 1,
                  }}
                >
                  {mode.label}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  {mode.description}
                </Typography>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </MotionGrid>
  );
}
