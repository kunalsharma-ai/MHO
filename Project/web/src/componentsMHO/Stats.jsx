"use client";

import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import Counter from "./Counter";
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
    y: 60,
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

const icon = {
  hover: {
    rotate: 12,
    scale: 1.08,
    transition: {
      duration: 0.25,
    },
  },
};

const stats = [
  {
    label: "Registered Panelists",
    value: 31240,
    icon: <PeopleAltRoundedIcon />,
  },
  {
    label: "Incentives this Month",
    value: 13890,
    prefix: "$",
    icon: <PaidRoundedIcon />,
  },
  {
    label: "Monthly Surveys",
    value: 44,
    icon: <QuizRoundedIcon />,
  },
  {
    label: "Completed Surveys",
    value: 1520,
    icon: <TaskAltRoundedIcon />,
  },
];

function Stats() {
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
      size={12}
      justifyContent="center"
      sx={{
        py: { xs: 8, md: 12 },
        background: "#fff",
      }}
    >
      <Grid container size={10} direction="column" alignItems="center">
        <MotionBox
          variants={heading}
          sx={{
            textAlign: "center",
            mb: 7,
            maxWidth: 800,
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
            Our Community
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
            Trusted by Thousands
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
            Every opinion contributes to better healthcare decisions worldwide.
            Join our growing network of healthcare professionals, patients and
            caregivers making a meaningful impact through research.
          </Typography>
        </MotionBox>

        {/* Cards */}
        <Grid size={12} container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <MotionGrid
              variants={card}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              key={index}
              size={{ xs: 12, sm: 6, lg: 3 }}
            >
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",

                  height: "100%",
                  minHeight: 240,

                  p: 4,

                  borderRadius: 5,

                  background: "linear-gradient(180deg,#ffffff 0%,#fdfefe 100%)",

                  border: (theme) => `1px solid ${theme.palette.primary.light}`,

                  boxShadow: "0 12px 35px rgba(0,0,0,.06)",

                  transition: (theme) =>
                    theme.transitions.create(["transform", "box-shadow"], {
                      duration: theme.transitions.duration.standard,
                    }),

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
                    boxShadow: (theme) =>
                      `0 20px 45px ${theme.palette.primary.main}22`,
                  },
                }}
              >
                <MotionBox
                  variants={icon}
                  whileHover="hover"
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",

                    background: (theme) =>
                      `linear-gradient(135deg,
                      ${theme.palette.primary.light},
                      #ffffff)`,

                    color: "primary.main",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    mb: 3,

                    "& svg": {
                      fontSize: 34,
                    },
                  }}
                >
                  {stat.icon}
                </MotionBox>

                <MotionBox variants={heading}>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: {
                        xs: 36,
                        md: 44,
                      },
                      color: "primary.dark",
                      lineHeight: 1,
                      mb: 1,
                    }}
                  >
                    <Counter value={stat.value} prefix={stat.prefix} />
                  </Typography>
                </MotionBox>

                <MotionBox variants={heading}>
                  <Typography
                    sx={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: "text.secondary",
                      lineHeight: 1.5,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </MotionBox>
              </Box>
            </MotionGrid>
          ))}
        </Grid>
      </Grid>
    </MotionGrid>
  );
}

export default Stats;
