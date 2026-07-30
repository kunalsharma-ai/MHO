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

const professionals = [
  {
    id: 0,
    label: "Licensed Practical Nurse",
    img: "/images/Professional/licensed-practical-nurse.jpg",
  },
  {
    id: 1,
    label: "Nurse Practitioner",
    img: "/images/Professional/nurse-practitioner.jpg",
  },
  {
    id: 2,
    label: "Nursing Assistant",
    img: "/images/Professional/nursing-assistant.jpg",
  },
  {
    id: 3,
    label: "Therapist",
    img: "/images/Professional/therapist.jpg",
  },
  {
    id: 4,
    label: "Top Level Management Department Specialist",
    img: "/images/Professional/top-level-management-department-specialist.jpg",
  },
  {
    id: 5,
    label: "Pharmacy Department Specialist",
    img: "/images/Professional/pharmacy-department-specialist.jpg",
  },
  {
    id: 6,
    label: "Blood Circulation",
    img: "/images/Professional/blood-circulation.jpg",
  },
  {
    id: 7,
    label: "Maintenance Department Specialist",
    img: "/images/Professional/maintenance-department-specialist.jpg",
  },
  {
    id: 8,
    label: "Security Department Specialist",
    img: "/images/Professional/security-department-specialist.jpg",
  },
  {
    id: 9,
    label: "Personnel Department Specialist",
    img: "/images/Professional/personnel-department-specialist.jpg",
  },
  {
    id: 10,
    label: "Medical Record Department Specialist",
    img: "/images/Professional/medical-record-department-specialist.jpg",
  },
  {
    id: 11,
    label: "Central Sterile Supply Department",
    img: "/images/Professional/central-sterile-supply-department.jpg",
  },
  {
    id: 12,
    label: "Purchasing Department Specialist",
    img: "/images/Professional/purchasing-department-specialist.jpg",
  },
  {
    id: 13,
    label: "Non Professional Services",
    img: "/images/Professional/non-professional-services.jpg",
  },
  {
    id: 14,
    label: "Dietary Specialist",
    img: "/images/Professional/dietary-specialist.jpg",
  },
  {
    id: 15,
    label: "Radiology Department",
    img: "/images/Professional/radiology-department.jpg",
  },
  {
    id: 16,
    label: "Operation Theatre Complex",
    img: "/images/Professional/operation-theatre-complex.jpg",
  },
  {
    id: 17,
    label: "Physical Medicine & Rehabilitation",
    img: "/images/Professional/physical-medicine-and-rehabilitation-specialist.jpg",
  },
  {
    id: 18,
    label: "Paramedical Specialist",
    img: "/images/Professional/paramedical-specialist.jpg",
  },
  {
    id: 19,
    label: "Technical Specialist",
    img: "/images/Professional/technical-specialist.jpg",
  },
  {
    id: 20,
    label: "Support Specialist",
    img: "/images/Professional/support-specialist.jpg",
  },
  {
    id: 21,
    label: "Nursing Specialist",
    img: "/images/Professional/nursing-specialist.jpg",
  },
  {
    id: 22,
    label: "Clinical Specialist",
    img: "/images/Professional/clinical-specialist.jpg",
  },
  {
    id: 23,
    label: "Non-Medical Specialist",
    img: "/images/Professional/non-medical-specialist.jpg",
  },
  {
    id: 24,
    label: "Medical Specialist",
    img: "/images/Professional/medical-specialist.jpg",
  },
];

function HealthcareProfessionals() {
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
        background: "linear-gradient(180deg,#FFFFFF 0%,#FFF7EF 100%)",
      }}
    >
      <Grid container size={10} direction="column">
        <MotionBox variants={item}>
          <Box
            sx={{
              textAlign: "center",
              maxWidth: 760,
              mx: "auto",
              mb: 7,
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
              Healthcare Community
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
              Professionals We Work With
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
              Our healthcare panel includes physicians, nurses, therapists,
              pharmacists, clinical specialists, administrators and many other
              professionals whose expertise contributes to meaningful healthcare
              research around the world.
            </Typography>
          </Box>
        </MotionBox>

        <Carousel cardsData={professionals} />

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
                bgcolor: "primary.light",
                border: (theme) => `1px solid ${theme.palette.primary.main}22`,
                boxShadow: "0 8px 24px rgba(0,0,0,.05)",
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
                25+ Healthcare Professional Categories
              </Typography>
            </Box>
          </Box>
        </MotionBox>
      </Grid>
    </MotionGrid>
  );
}

export default HealthcareProfessionals;
