import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

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

const leftImage = {
  hidden: {
    opacity: 0,
    x: -80,
    rotate: -4,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rightContent = {
  hidden: {
    opacity: 0,
    x: 70,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15,
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

function AboutUs() {
  return (
    <MotionGrid
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.25,
      }}
      size={12}
      container
      spacing={6}
      justifyContent="center"
      alignItems="center"
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <MotionGrid
        variants={leftImage}
        container
        size={{ xs: 12, lg: 5 }}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <MotionBox
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: "relative",
            height: { xs: "170px", lg: "350px" },
            width: { xs: "255px", lg: "550px" },
            overflow: "visible",
            isolation: "isolate",
          }}
        >
          <Image
            src="/images/home/banner/bg4.jpg"
            alt="About Us"
            fill
            sizes="(max-width:900px) 255px, 550px"
            style={{
              zIndex: 2,
              objectFit: "cover",
              borderRadius: "16px",
              border: "6px solid white",
              boxShadow:
                "0 18px 45px rgba(0,0,0,.18),0 6px 16px rgba(0,0,0,.12)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              pointerEvents: "none",

              "&::before": {
                content: '""',
                position: "absolute",
                bottom: { xs: -18, lg: -28 },
                left: { xs: -18, lg: -28 },
                width: { xs: "92%", lg: "92%" },
                height: { xs: "88%", lg: "88%" },
                borderRadius: 5,
                background: (theme) =>
                  `linear-gradient(
          135deg,
          ${theme.palette.secondary.main},
          ${theme.palette.secondary.dark}
        )`,
                boxShadow: (theme) => `
        0 20px 45px ${theme.palette.secondary.main}40,
        0 8px 18px rgba(0,0,0,.18)
      `,
              },

              "&::after": {
                content: '""',
                position: "absolute",
                top: { xs: -18, lg: -24 },
                right: { xs: -18, lg: -24 },
                width: { xs: 90, lg: 150 },
                height: { xs: 90, lg: 150 },
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,.22) 0%, rgba(255,255,255,0) 70%)",
                filter: "blur(4px)",
              },
            }}
          />
        </MotionBox>
      </MotionGrid>
      <MotionGrid
        variants={rightContent}
        size={{ xs: 10, lg: 5 }}
        container
        justifyContent="center"
        direction="column"
      >
        <Grid container direction="column" spacing={4}>
          <Box>
            <MotionBox variants={item}>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "secondary.main",
                  mb: 1,
                }}
              >
                About Us
              </Typography>
            </MotionBox>

            <MotionBox variants={item}>
              <Typography
                sx={{
                  fontSize: { xs: "2rem", md: "2.75rem" },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: "text.primary",
                  mb: 3,
                }}
              >
                Welcome to{" "}
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: "2rem", md: "2.75rem" },
                    color: "primary.main",
                    fontWeight: 900,
                  }}
                >
                  MyHealth
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: "2rem", md: "2.75rem" },
                    color: "secondary.main",
                    fontWeight: 900,
                  }}
                >
                  Opinions
                </Typography>
              </Typography>
            </MotionBox>

            <MotionBox variants={item}>
              <Typography
                sx={{
                  fontSize: { xs: 16, md: 18 },
                  lineHeight: 1.9,
                  color: "text.secondary",
                  textAlign: "justify",
                  maxWidth: { lg: 650 },
                }}
              >
                MyHealthOpinions is a specialized healthcare research community
                powered by{" "}
                <Typography
                  component="a"
                  href="https://www.frequentresearch.com/"
                  target="_blank"
                  sx={{
                    display: "inline",
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: "inherit",
                    textDecoration: "none",

                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Frequent Research
                </Typography>
                . We connect physicians, healthcare professionals, patients,
                caregivers, and consumer health audiences with leading
                pharmaceutical and healthcare organizations through trusted
                online research studies.
                <br />
                <br />
                By sharing your experiences and professional expertise, you help
                shape future healthcare innovations while earning rewards for
                your valuable participation.
              </Typography>
            </MotionBox>
          </Box>
        </Grid>
      </MotionGrid>
    </MotionGrid>
  );
}

export default AboutUs;
