import { Avatar, Grid, Typography, Box } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";

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
    label: "Security Department Sepecialist",
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
    label: "Dietry Specialist",
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
    label: "Physical Medicine and Rehabilitation Specialist",
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
    <Grid
      size={12}
      container
      justifyContent="center"
      alignItems="center"
      sx={{
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
          Healthcare Professionals Categories
        </Typography>
        <Typography sx={{ fontSize: "16px", my: 2 }}>
          Reach with our highly qualified healthcare professional profiles.
        </Typography>
        {/* <Grid size={12} container spacing={2} my={5}>
          {professionals.map((prof) => (
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
                src={prof?.img}
                alt={prof?.label}
                sx={{ height: "60px", width: "60px" }}
              />

              <Typography fontWeight="bold">{prof?.label}</Typography>
            </Grid>
          ))}
        </Grid> */}

        <Carousel cardsData={professionals} />
      </Grid>
    </Grid>
  );
}

export default HealthcareProfessionals;
