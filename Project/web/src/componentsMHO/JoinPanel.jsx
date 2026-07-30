"use client";

import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
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

const buttonVariant = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function JoinPanel({ open, setOpen }) {
  return (
    <MotionGrid
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3,
      }}
      container
      justifyContent="center"
      sx={{
        position: "relative",
        overflow: "hidden",

        py: { xs: 8, md: 10 },

        background: `
linear-gradient(
90deg,
#0C4EBA 0%,
#1F5EC2 55%,
#D06A24 100%
)
`,

        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
      }}
    >
      {/* Large soft blue blob */}
      <MotionBox
        animate={{
          x: [0, 15, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          top: -180,
          left: -180,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,.10) 0%, rgba(255,255,255,.04) 45%, transparent 72%)",
          filter: "blur(4px)",
        }}
      />

      {/* Orange glow */}
      <MotionBox
        animate={{
          x: [0, -20, 0],
          y: [0, 15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          right: -120,
          bottom: -120,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,136,0,.45) 0%, rgba(255,136,0,.15) 55%, transparent 78%)",
          filter: "blur(8px)",
        }}
      />

      {/* Thin outline circle */}
      <MotionBox
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        sx={{
          position: "absolute",
          right: "22%",
          top: 50,
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,.08)",
        }}
      />

      {/* Small filled circle */}
      <MotionBox
        animate={{
          y: [0, -14, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          left: "42%",
          bottom: 70,
          width: 70,
          height: 70,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,.05)",
        }}
      />

      {/* Tiny accent circle */}
      <MotionBox
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.15, 0.45, 0.15],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          top: 100,
          right: 140,
          width: 26,
          height: 26,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,.14)",
        }}
      />

      {/* Dotted decoration */}
      <MotionBox
        animate={{
          x: [0, 12, 0],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          left: "52%",
          bottom: 40,
          width: 140,
          height: 70,
          backgroundImage:
            "radial-gradient(circle, #fff 1.4px, transparent 1.4px)",
          backgroundSize: "14px 14px",
          opacity: 0.12,
        }}
      />

      <Grid
        container
        size={10}
        alignItems="center"
        justifyContent="space-between"
        spacing={5}
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1400,
        }}
      >
        {/* Left */}

        <MotionGrid
          variants={item}
          size={{
            xs: 12,
            lg: 8,
          }}
        >
          <Typography
            sx={{
              color: "secondary.main",
              textTransform: "uppercase",
              letterSpacing: 2,
              fontWeight: 700,
              fontSize: 14,
              mb: 2,
            }}
          >
            Join Our Healthcare Community
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 2,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Get Rewarded for Sharing
            <br />
            Your Healthcare Opinions
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,.85)",
              fontSize: {
                xs: 16,
                md: 18,
              },
              lineHeight: 1.8,
              maxWidth: 700,
            }}
          >
            Join thousands of healthcare professionals and participants helping
            improve healthcare worldwide while earning rewards for every
            completed survey.
          </Typography>
        </MotionGrid>

        {/* Right */}

        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
          sx={{
            display: "flex",
            justifyContent: {
              xs: "flex-start",
              lg: "flex-end",
            },
          }}
        >
          <MotionBox
            variants={buttonVariant}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Button
              variant="contained"
              endIcon={
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                  }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <ArrowForwardRoundedIcon />
                </motion.div>
              }
              onClick={() => setOpen(!open)}
              sx={{
                px: 5,
                py: 2,

                borderRadius: 100,

                bgcolor: "secondary.main",

                color: "#fff",

                fontWeight: 700,

                fontSize: 16,

                textTransform: "none",

                transition: ".35s",

                boxShadow: (theme) => `
                0 0 20px ${theme.palette.secondary.main}55,
                0 12px 30px rgba(0,0,0,.25)
              `,

                "&:hover": {
                  bgcolor: "secondary.main",

                  transform: "translateY(-6px) scale(1.05)",

                  boxShadow: (theme) => `
        0 0 40px ${theme.palette.secondary.main}99,
        0 25px 60px rgba(0,0,0,.35)
    `,
                },
              }}
            >
              Join Our Panel Today
            </Button>
          </MotionBox>
        </Grid>
      </Grid>
    </MotionGrid>
  );
}

export default JoinPanel;
