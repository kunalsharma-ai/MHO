"use client";

import React from "react";
import { Grid, Typography, Paper, Box, Avatar, Divider } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);
const MotionPaper = motion.create(Paper);
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
    scale: 0.95,
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

const Testimonialsdata = [
  {
    content:
      "I have participated in health survey, just having basic detail those I have observed after my fathers heart surgery and this is most important to have some extra in your pocket. Thanks you :)",
    user: "Patricia Garci",
    country: "USA",
  },
  {
    content:
      "I am under-graduate Nurse and usually spare some extra time to check the survey daily and now, I am addicted which is good for my extra bills. Much Appreciate.",
    user: "Edeline",
    country: "Germany",
  },
  {
    content:
      "I feel they offer great promotions and reward their users. Also have an amazing customer service with timely responses and great follow through. Thank you.",
    user: "James",
    country: "USA",
  },
  {
    content:
      "I'm a housewife with no work. I registered a few months ago and started participating in paid surveys. It helps with my household expenses and lets me treat my family occasionally. Thanks MyHealthOpinions!",
    user: "Wandy Doah",
    country: "Germany",
  },
  {
    content:
      "I participated last month. MyHealthOpinions provides valuable healthcare information while rewarding participants for their opinions.",
    user: "Dr Emma Noah",
    country: "New York",
  },
  {
    content:
      "Great platform to earn extra income. The support team responds quickly and I'm looking forward to more surveys.",
    user: "Danya Milch",
    country: "Moscow",
  },
  {
    content:
      "Appreciable work by the MyHealthOpinions team. These kinds of panels help doctors understand healthcare trends more efficiently.",
    user: "Anil Jain",
    country: "India",
  },
  {
    content:
      "Very responsive support team and quick reward redemption. Highly recommended.",
    user: "Charlie Charlotte",
    country: "London",
  },
  {
    content:
      "There were occasional survey delays initially, but the support team was extremely helpful and improvements have been noticeable.",
    user: "Fengge",
    country: "China",
  },
  // {
  //   content:
  //     "One of the few genuine survey websites. The reward threshold is easy to achieve and PayPal redemption is quick.",
  //   user: "Saada",
  //   country: "Thailand",
  // },
];

function Testimonial() {
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
        background: "linear-gradient(180deg,#FFF8F2 0%,#FFFFFF 100%)",
      }}
    >
      <Grid container size={10} direction="column">
        {/* Heading */}

        <MotionBox variants={item}>
          <Box
            sx={{
              textAlign: "center",
              maxWidth: 760,
              mx: "auto",
              mb: 6,
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
              Testimonials
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
              Hear From Our Community
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
              Thousands of healthcare professionals and participants trust
              MyHealthOpinions to share their experiences and contribute to
              meaningful healthcare research.
            </Typography>
          </Box>
        </MotionBox>
        {/* Rating */}
        <MotionBox variants={item}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 6,
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 100,
                bgcolor: "secondary.light",
                border: (theme) =>
                  `1px solid ${theme.palette.secondary.main}33`,
                boxShadow: "0 8px 24px rgba(0,0,0,.05)",
              }}
            >
              <Typography
                sx={{
                  color: "secondary.main",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                ★★★★★ Trusted by Healthcare Professionals Worldwide
              </Typography>
            </Box>
          </Box>
        </MotionBox>

        <MotionGrid container spacing={3} variants={container}>
          {Testimonialsdata.map((item, index) => (
            <Grid
              key={index}
              size={{
                xs: 12,
                md: 6,
                lg: 4,
              }}
            >
              <MotionPaper
                variants={card}
                sx={{
                  height: "100%",
                  minHeight: 320,

                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",

                  p: 4,
                  borderRadius: 5,
                  position: "relative",
                  overflow: "hidden",

                  bgcolor: "background.paper",

                  border: (theme) => `1px solid ${theme.palette.primary.light}`,

                  boxShadow: "0 14px 35px rgba(0,0,0,.06)",

                  transition: "all .35s ease",

                  "&::before": {
                    content: '"❝"',
                    position: "absolute",
                    top: 10,
                    right: 20,
                    fontSize: 72,
                    color: "secondary.light",
                    lineHeight: 1,
                    fontWeight: 700,
                    opacity: 0.8,
                  },

                  "&:hover": {
                    transform: "translateY(-10px)",
                    borderColor: "secondary.main",

                    boxShadow: (theme) => `
    0 22px 55px ${theme.palette.primary.main}20,
    0 0 30px ${theme.palette.secondary.main}10
  `,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    lineHeight: 1.9,
                    color: "text.secondary",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {item.content}
                </Typography>

                <Box>
                  <Divider sx={{ my: 3 }} />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <MotionBox
                      whileHover={{
                        scale: 1.08,
                        rotate: 6,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          mr: 2,
                          bgcolor: "primary.main",
                          fontWeight: 700,
                        }}
                      >
                        {item.user.charAt(0)}
                      </Avatar>
                    </MotionBox>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: "primary.dark",
                        }}
                      >
                        {item.user}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "text.secondary",
                        }}
                      >
                        {item.country}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </MotionPaper>
            </Grid>
          ))}
        </MotionGrid>
      </Grid>
    </MotionGrid>
  );
}

export default Testimonial;
