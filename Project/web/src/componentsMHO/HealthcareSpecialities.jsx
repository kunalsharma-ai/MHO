"use client";

import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Carousel from "./Carousel";
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

const badge = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 25,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const specialists = [
  {
    id: "1",
    label: "Blood Circulation",
    img: "/images/Specialist/blood-circulation.jpg",
  },
  {
    id: "2",
    label: "Musculoskeletal",
    img: "/images/Specialist/musculoskeletal.jpg",
  },
  {
    id: "3",
    label: "Bariatric Surgery",
    img: "/images/Specialist/bariatric-surgery.jpg",
  },
  {
    id: "4",
    label: "Skin, Nails & Hair Disorders",
    img: "/images/Specialist/skin-nails-hair-disorders.jpg",
  },
  {
    id: "5",
    label: "Digestive System",
    img: "/images/Specialist/digestive-system.jpg",
  },
  {
    id: "6",
    label: "Eye, Ear, Nose & Throat",
    img: "/images/Specialist/eye-ear-nose-throat.jpg",
  },
  {
    id: "7",
    label: "Cancer",
    img: "/images/Specialist/cancer.jpg",
  },
  {
    id: "8",
    label: "Allergy & Immunology",
    img: "/images/Specialist/allergy-immunology.jpg",
  },
  {
    id: "9",
    label: "Psychology",
    img: "/images/Specialist/psychology.jpg",
  },
  {
    id: "10",
    label: "Other Specialties",
    img: "/images/Specialist/others.jpg",
  },
];

function HealthcareSpecialities() {
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
        background: "linear-gradient(180deg,#FFFFFF 0%,#FFF8F2 100%)",
      }}
    >
      <Grid container size={10} direction="column">
        {/* Heading */}

        <MotionBox variants={item}>
          <Box
            sx={{
              textAlign: "center",
              mb: 7,
              maxWidth: 760,
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
              Areas of Expertise
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
              Healthcare Specialties We Cover
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
              Access insights across a broad spectrum of medical specialties,
              helping healthcare organizations conduct targeted research with
              the right professionals and patient communities.
            </Typography>
          </Box>
        </MotionBox>

        <Carousel cardsData={specialists} />

        <MotionBox variants={badge}>
          <Box
            sx={{
              mt: 7,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                px: 5,
                py: 2,
                borderRadius: 100,
                background: (theme) =>
                  `linear-gradient(90deg,
                  ${theme.palette.primary.light},
                  #ffffff)`,

                border: (theme) => `1px solid ${theme.palette.primary.main}22`,

                boxShadow: "0 8px 25px rgba(0,0,0,.06)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "primary.dark",
                  fontSize: {
                    xs: 16,
                    md: 18,
                  },
                }}
              >
                10+ Medical Specialty Categories
              </Typography>
            </Box>
          </Box>
        </MotionBox>
      </Grid>
    </MotionGrid>
  );
}

export default HealthcareSpecialities;
