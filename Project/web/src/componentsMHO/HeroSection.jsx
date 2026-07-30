"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Grid,
  Avatar,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);
const MotionButton = motion.create(Button);
const BannerData = [
  {
    backgroundImg: "/images/home/banner/bg7.jpg",
    title:
      "Join our global Healthcare Professional Community and get rewarded for participating in Our Online Medical Market Research",
    caption: "More than 2 lakh Medical professionals registered with us.",
  },
  {
    backgroundImg: "/images/home/banner/bg8.jpg",
    title:
      "We are the one who offer the High Paid research opportunity to your inbox. Your Opinion Matters! Share your Expert opinion with us.",
    caption: "Your Opinion Matters! Share your Expert opinion with us.",
  },
  {
    backgroundImg: "/images/home/banner/bg9.jpg",
    title: "Expert Insights Matter: Share Your Professional Opinion",
    caption:
      "Your Expertise Counts, Participate in Our Medical Professional Survey",
  },
  {
    backgroundImg: "/images/home/banner/bg4.jpg",
    title: "Transforming Healthcare, One Opinion at a Time",
    caption: "Building a Patient-Centric Future: Participate in Our Survey",
  },
];

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
    filter: "blur(10px)",
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
    x: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const signupPanel = {
  hidden: {
    opacity: 0,
    x: 70,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      delayChildren: 0.45,
      staggerChildren: 0.12,
    },
  },
};

const arrow = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  hover: {
    x: 4,
    transition: { duration: 0.2 },
  },
};

const HeroSection = ({ open, setOpen, setUserType }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BannerData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentBanner = BannerData[currentSlide];

  const handleDoctorClick = () => {
    setOpen(true);
    setUserType("healthcare professional");
  };

  const handlePatientClick = () => {
    setOpen(true);
    setUserType("patient");
  };

  const handleCaregiverClick = () => {
    setOpen(true);
    setUserType("care giver");
  };

  const handleKeyDown = (e, handler) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler();
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        bgcolor: "primary.main",
      }}
    >
      {BannerData.map((banner, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
            scale: index === currentSlide ? 1.09 : 1.08,
            x: index === currentSlide ? -15 : 0,
            y: index === currentSlide ? -8 : 0,
          }}
          transition={{
            opacity: {
              duration: 1.2,
              ease: "easeInOut",
            },
            scale: {
              duration: 8,
              ease: "linear",
            },
            x: {
              duration: 8,
              ease: "linear",
            },
            y: {
              duration: 8,
              ease: "linear",
            },
          }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <Image
            src={banner.backgroundImg}
            alt=""
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </motion.div>
      ))}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: `linear-gradient(
      135deg,
      ${theme.palette.primary.main}CC 0%,
      ${theme.palette.primary.main}99 45%,
      ${theme.palette.secondary.main}88 100%
    )`,
        }}
      />

      <MotionGrid
        size={10}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        sx={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-start",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          px: { xs: 2, sm: 4 },
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={container}
            initial="hidden"
            animate="visible"
            exit={{
              opacity: 0,
              y: -20,
              filter: "blur(8px)",
              transition: {
                duration: 0.35,
              },
            }}
          >
            <motion.div variants={item}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: {
                    xs: "1.75rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                  },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 2,
                  pr: { md: 4 },
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  maxWidth: isMobile ? "100%" : "800px",
                }}
              >
                {currentBanner.title}
              </Typography>
            </motion.div>

            <motion.div variants={item}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  fontWeight: 400,
                  lineHeight: 1.5,
                  mb: { xs: 3, md: 4 },
                  color: "rgba(255,255,255,0.9)",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  maxWidth: { xs: "100%", md: "600px" },
                }}
              >
                {currentBanner.caption}
              </Typography>
            </motion.div>
            <motion.div variants={item}>
              <Box
                display="flex"
                sx={{ width: "100%" }}
                justifyContent={isMobile ? "center" : "flex-start"}
              >
                <MotionButton
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  variant="contained"
                  color="secondary"
                  onClick={() => setOpen(!open)}
                  sx={{
                    bgcolor: "secondary.dark",
                    color: "common.white",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 600,
                    px: { xs: 3, md: 4 },
                    py: { xs: 1, md: 1.5 },
                    borderRadius: 2,
                    textTransform: "none",
                    boxShadow: 4,
                    transition: (theme) =>
                      theme.transitions.create(
                        ["background-color", "transform", "box-shadow"],
                        {
                          duration: theme.transitions.duration.shorter,
                          easing: theme.transitions.easing.easeInOut,
                        },
                      ),
                    "&:hover": {
                      bgcolor: "secondary.main",
                      boxShadow: (theme) => `
                        0 8px 20px ${theme.palette.secondary.main}55,
                        0 0 20px ${theme.palette.secondary.main}66,
                        0 0 40px ${theme.palette.secondary.main}88,
                        0 0 70px ${theme.palette.secondary.main}44
                        `,
                    },
                  }}
                >
                  Join Now
                </MotionButton>
              </Box>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </MotionGrid>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,

          right: "2vw",
          zIndex: 20,
          display: { xs: "none", lg: "flex" },
          width: { lg: 340, xl: 450 },
          justifyContent: "flex-end",
          alignItems: "center",
          px: { lg: "1vw", xl: "4vw" },
          pt: { lg: "80px", xl: "40px" },
        }}
      >
        <MotionBox
          variants={signupPanel}
          initial="hidden"
          animate="visible"
          sx={{
            position: "absolute",
            zIndex: 20,

            width: { lg: 340, xl: 450 },

            display: { xs: "none", lg: "flex" },
            flexDirection: "column",

            p: { lg: 2, xl: 4 },

            borderRadius: 5,

            background: "rgba(255,255,255,0.14)",

            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",

            border: "1px solid rgba(255,255,255,0.32)",

            boxShadow: `
    0 12px 40px rgba(0,0,0,.18),
    inset 0 1px 0 rgba(255,255,255,.45),
    inset 0 -1px 0 rgba(255,255,255,.08)
  `,

            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: `
      linear-gradient(
        135deg,
        rgba(255,255,255,.14) 0%,
        rgba(255,255,255,.05) 40%,
        rgba(255,255,255,.02) 100%
      )
    `,
              pointerEvents: "none",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: "rgba(8,18,45,.12)",
              pointerEvents: "none",
            },
          }}
        >
          <MotionBox variants={card}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: { lg: 25, xl: 30 },
                fontWeight: 800,
                textAlign: "center",
                letterSpacing: 0.3,
                textShadow: "0 3px 12px rgba(0,0,0,.5)",
              }}
            >
              Ready to Join?
            </Typography>
          </MotionBox>

          <MotionBox variants={card}>
            <Typography
              sx={{
                color: "rgba(255,255,255,.92)",
                textShadow: "0 2px 6px rgba(0,0,0,.4)",
                textAlign: "center",
                fontSize: { lg: 13, xl: 15 },
                lineHeight: 1.8,
                mt: 1.5,
                mb: 4,
                px: 1,
              }}
            >
              Select your profile and become part of our global healthcare
              research community.
            </Typography>
          </MotionBox>

          {[
            {
              title: "Healthcare Professional",
              subtitle: "Doctors, Nurses & Allied Health Professionals",
              image: "/images/home/forms/doctor-type.png",
              onClick: handleDoctorClick,
            },
            {
              title: "Patient",
              subtitle: "Share your experience",
              image: "/images/home/forms/patient-type.png",
              onClick: handlePatientClick,
            },
            {
              title: "Caregiver",
              subtitle: "Family & Care Support",
              image: "/images/home/forms/caregiver.png",
              onClick: handleCaregiverClick,
            },
          ].map((item) => (
            <MotionBox
              key={item.title}
              variants={card}
              whileHover={{
                x: 8,
              }}
              transition={{
                x: { duration: 0.2 },
              }}
              role="button"
              tabIndex={0}
              onClick={item.onClick}
              onKeyDown={(e) => handleKeyDown(e, item.onClick)}
              sx={{
                display: "flex",
                alignItems: "center",

                p: 2,

                mb: { lg: 1.5, xl: 2 },

                borderRadius: 3,

                cursor: "pointer",

                bgcolor: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.10)",

                transition:
                  "background-color .35s, border-color .35s, box-shadow .35s",

                "&:last-child": {
                  mb: 0,
                },

                "&:hover": {
                  bgcolor: "rgba(255,255,255,.12)",
                  borderColor: "secondary.main",

                  boxShadow: (theme) =>
                    `0 12px 30px ${theme.palette.secondary.main}40`,
                },
              }}
            >
              <MotionBox
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar
                  src={item.image}
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2,
                    // border: "1px solid rgba(255,255,255,.9)",
                    // filter: "drop-shadow(0 20px 30px #999)",
                  }}
                />
              </MotionBox>

              <Box flex={1}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: { lg: 16, xl: 18 },
                    textShadow: "0 2px 6px rgba(0,0,0,.4)",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,.82)",

                    textShadow: "0 2px 6px rgba(0,0,0,.3)",
                    fontSize: { lg: 12, xl: 13 },
                    mt: 0.5,
                    lineHeight: 1.5,
                  }}
                >
                  {item.subtitle}
                </Typography>
              </Box>

              <MotionBox
                variants={arrow}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  bgcolor: "secondary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  transition: ".3s",
                }}
              >
                <ArrowForwardIcon fontSize="small" />
              </MotionBox>
            </MotionBox>
          ))}
        </MotionBox>
      </Box>
    </Box>
  );
};

export default HeroSection;
