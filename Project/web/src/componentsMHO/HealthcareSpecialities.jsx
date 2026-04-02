import { Avatar, Grid, Typography, Box } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";

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
    label: "Skin Nails Hair Disorders",
    img: "/images/Specialist/skin-nails-hair-disorders.jpg",
  },
  {
    id: "5",
    label: "Digestive System",
    img: "/images/Specialist/digestive-system.jpg",
  },
  {
    id: "6",
    label: "Eye Ear Nose Throat",
    img: "/images/Specialist/eye-ear-nose-throat.jpg",
  },
  {
    id: "7",
    label: "Cancer",
    img: "/images/Specialist/cancer.jpg",
  },
  {
    id: "8",
    label: "Allergy Imunnology",
    img: "/images/Specialist/allergy-immunology.jpg",
  },
  {
    id: "9",
    label: "Psychology",
    img: "/images/Specialist/psychology.jpg",
  },
  {
    id: "10",
    label: "Others",
    img: "/images/Specialist/others.jpg",
  },
];
function HealthcareSpecialities() {
  return (
    <Grid
      size={12}
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        // border: `1px solid #e0e0e0`,
        bgcolor: "#d5eeea",
        minheight: "400px",
        pb: 4,
      }}
    >
      <Grid size={10} alignSelf="flex-start" py={3}>
        <Typography
          sx={{
            fontSize: { xs: "16px", md: "20px" },
            display: "inline-block",
            fontWeight: "bold",
            borderBottom: "3px solid #06923E",
            pb: 0.5,
            mt: 3,
          }}
        >
          Healthcare Specialities Categories
        </Typography>
        <Typography sx={{ fontSize: "16px", my: 2 }}>
          Reach with our highly qualified healthcare speciality profiles.
        </Typography>

        <Carousel cardsData={specialists} />
        {/* <Grid size={12} container spacing={2} my={5}>
          {specialists.map((spec) => (
            <Grid
              size={4}
              container
              alignItems="center"
              sx={{
                borderRadius: 3,
                p: 2,
                border: 1,
                borderColor: "transparent",
                borderColor: "#e0e0e0",
                "&:hover": {
                  bgcolor: "#f9f9f9",
                },
              }}
            >
              <Avatar
                src={spec?.img}
                alt={spec?.label}
                sx={{ height: "60px", width: "60px" }}
              />

              <Typography fontWeight="bold">{spec?.label}</Typography>
            </Grid>
          ))}
        </Grid> */}
      </Grid>
    </Grid>
  );
}

export default HealthcareSpecialities;
