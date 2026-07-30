"use client";

import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
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
    y: 60,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const solutions = [
  {
    title: "Verified Recruitment",
    description:
      "Every participant is recruited through a secure double opt-in process, ensuring an authentic and highly engaged research panel.",
    icon: <VerifiedUserRoundedIcon fontSize="large" />,
  },
  {
    title: "Advanced Audience Targeting",
    description:
      "Reach precisely profiled healthcare audiences using demographics, specialties, decision-making roles, diseases, experience and more.",
    icon: <FilterAltRoundedIcon fontSize="large" />,
  },
  {
    title: "High-Quality Sample Data",
    description:
      "Continuous quality monitoring, fraud detection and panel verification help deliver reliable responses for every healthcare study.",
    icon: <FactCheckRoundedIcon fontSize="large" />,
  },
];

function Solutions() {
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
        background: "linear-gradient(180deg,#FFF7EF 0%, #FFFFFF 100%)",
      }}
    >
      <Grid container size={10} direction="column">
        {/* Heading */}

        <Box
          sx={{
            textAlign: "center",
            mb: 7,
            maxWidth: 760,
            mx: "auto",
          }}
        >
          <MotionBox variants={item}>
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
              Why Choose Us
            </Typography>

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: "2rem",
                  md: "2.8rem",
                },
                color: "primary.dark",
                mb: 2,
              }}
            >
              Reliable Healthcare Research Solutions
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: {
                  xs: 16,
                  md: 18,
                },
                lineHeight: 1.8,
              }}
            >
              We combine verified healthcare communities, intelligent audience
              targeting and rigorous quality control to deliver dependable
              insights for every healthcare research project.
            </Typography>
          </MotionBox>
        </Box>

        {/* Cards */}

        <MotionGrid
          container
          spacing={4}
          justifyContent="center"
          variants={container}
        >
          {solutions.map((item, index) => (
            <MotionGrid
              variants={card}
              key={index}
              size={{
                xs: 12,
                md: 6,
                lg: 4,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  p: 4,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                  bgcolor: "background.paper",
                  border: (theme) => `1px solid ${theme.palette.primary.light}`,
                  boxShadow: "0 12px 35px rgba(0,0,0,.06)",
                  transition: ".35s",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 5,
                    background: (theme) =>
                      `linear-gradient(90deg,
                        ${theme.palette.primary.main},
                        ${theme.palette.secondary.main})`,
                  },

                  "&:hover": {
                    transform: "translateY(-10px)",
                    borderColor: "secondary.main",
                    boxShadow: (theme) => `
    0 22px 50px ${theme.palette.primary.main}22,
    0 0 25px ${theme.palette.secondary.main}10
  `,
                  },
                }}
              >
                <MotionBox
                  whileHover={{
                    rotate: 8,
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    bgcolor: "primary.light",
                    color: "primary.main",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  {item.icon}
                </MotionBox>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 22,
                    color: "primary.dark",
                    mb: 2,
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.8,
                    fontSize: 16,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </MotionGrid>
          ))}
        </MotionGrid>
      </Grid>
    </MotionGrid>
  );
}

export default Solutions;
