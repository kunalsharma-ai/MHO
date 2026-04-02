"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Grid,
  Avatar,
} from "@mui/material";

const BannerData = [
  {
    backgroundImg: "/images/home/banner/bg1.jpg",
    title:
      "Join our global Healthcare Professional Community and get rewarded for participating in Our Online Medical Market Research",
    caption: "More than 2 lakh Medical professionals registered with us.",
  },
  {
    backgroundImg: "/images/home/banner/bg2.jpg",
    title:
      "We are the one who offer the High Paid research opportunity to your inbox. Your Opinion Matters! Share your Expert opinion with us.",
    caption: "Your Opinion Matters! Share your Expert opinion with us.",
  },
  {
    backgroundImg: "/images/home/banner/bg3.jpg",
    title: "Expert Insights Matter: Share Your Professional Opinion",
    caption:
      "Your Expertise Counts,Participate in Our Medical Professional Survey",
  },
  {
    backgroundImg: "/images/home/banner/bg4.jpg",
    title: "Transforming Healthcare, One Opinion at a Time",
    caption: "Building a Patient-Centric Future: Participate in Our Survey",
  },
];

const HeroSection = ({ open, setOpen, setUserType }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    BannerData.forEach((banner) => {
      const img = new Image();
      img.src = banner.backgroundImg;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BannerData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % BannerData.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + BannerData.length) % BannerData.length,
    );
  };

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  const currentBanner = BannerData[currentSlide];

  const primaryGradient = `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`;
  const primaryHoverGradient = `linear-gradient(45deg, ${
    theme.palette.primary.dark || theme.palette.primary.main
  } 30%, ${theme.palette.secondary.dark || theme.palette.secondary.main} 90%)`;

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
        height: { xs: "calc(100vh - 70px)", lg: "calc(100vh - 78px)" },
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${currentBanner.backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}
        />
      </AnimatePresence> */}

      {BannerData.map((banner, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${banner.backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
          zIndex: 2,
        }}
      />

      <Grid
        size={10}
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
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
            <Box
              display="flex"
              sx={{ width: "100%" }}
              justifyContent={isMobile ? "center" : "flex-start"}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setOpen(!open);
                }}
                sx={{
                  bgcolor: "#04662b",
                  color: "white",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 600,
                  px: { xs: 3, md: 4 },
                  py: { xs: 1, md: 1.5 },
                  borderRadius: 2,
                  boxShadow: 2,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "secondary.main",
                  },
                }}
              >
                Join Now
              </Button>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Grid>

      <Box
        sx={{
          position: "absolute",
          zIndex: 20,
          right: { lg: "5vw", xl: "10vw" },
          borderRadius: 4,
          px: 6,
          pt: 4,
          pb: 6,
          minWidth: { xl: "365px" },
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "20px", xl: "22px" },
            fontWeight: "500",
            mb: { lg: 2, xl: 3 },
            color: "whitesmoke",
            textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
          }}
        >
          Ready to Join Our Panel
        </Typography>
        <Typography
          sx={{
            color: "whitesmoke",
            fontSize: { lg: "14px", xl: "16px" },
            color: "rgba(255,255,255,1)",
            textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
          }}
        >
          Please select your Identity
        </Typography>
        <Box
          role="button"
          tabIndex={0}
          onClick={handleDoctorClick}
          onKeyDown={(e) => handleKeyDown(e, handleDoctorClick)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            my: 3,
          }}
        >
          <Avatar
            src={"./images/home/forms/doctor-type.png"}
            alt="doctor logo"
            sx={{
              height: { lg: "60px", xl: "80px" },
              width: { lg: "60px", xl: "80px" },
              border: 2,
              borderColor: "white",
              "&:hover": {
                cursor: "pointer",
                borderColor: "secondary.main",
              },
            }}
          />
          <Typography
            fontWeight="500"
            color="whitesmoke"
            fontSize={{ lg: "13px", xl: "16px" }}
            sx={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Doctor
          </Typography>
        </Box>
        <Box
          role="button"
          tabIndex={0}
          onClick={handlePatientClick}
          onKeyDown={(e) => handleKeyDown(e, handlePatientClick)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={"./images/home/forms/patient-type.png"}
            alt="patient logo"
            sx={{
              height: { lg: "60px", xl: "80px" },
              width: { lg: "60px", xl: "80px" },
              border: 2,
              borderColor: "white",
              "&:hover": {
                cursor: "pointer",
                borderColor: "secondary.main",
              },
            }}
          />
          <Typography
            fontWeight="500"
            color="whitesmoke"
            fontSize={{ lg: "13px", xl: "16px" }}
            sx={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Patient
          </Typography>
        </Box>{" "}
        <Box
          role="button"
          tabIndex={0}
          onClick={handleCaregiverClick}
          onKeyDown={(e) => handleKeyDown(e, handleCaregiverClick)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={"./images/home/forms/caregiver.png"}
            alt="caregiver logo"
            sx={{
              height: { lg: "60px", xl: "80px" },
              width: { lg: "60px", xl: "80px" },
              border: 2,
              borderColor: "white",
              "&:hover": {
                cursor: "pointer",
                borderColor: "secondary.main",
              },
            }}
          />
          <Typography
            fontWeight="500"
            color="whitesmoke"
            fontSize={{ lg: "13px", xl: "16px" }}
            sx={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Caregiver
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
