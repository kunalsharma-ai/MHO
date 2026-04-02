"use client";
import { Grid, Typography, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const Testimonialsdata = [
  {
    content:
      "I have participated in health survey, just having basic detail those I have observed after my fathers heart surgery and this is most important to have some extra in your pocket. Thanks you :)",
    user: "Patricia Garci",
    country: "USA",
  },

  {
    content:
      "I am under-graduate Nurse and usually spare some extra time to check the survey daily and now, I am addicted which is good for my extra bills.Much Appreciate",
    user: "Edeline",
    country: "Germany",
  },
  {
    content:
      "I feel they offer great promotions and reward their users. Also have an amazing customer service with timely responses and great follow through. Thank you",
    user: "James",
    country: "USA",
  },
  {
    content:
      "I’m a housewife with no-work. I have registered myself just few couple of months back and start participating in paid online surveys and earn a little extra money and help to pay for my household expenses and to treat my family special things. Thanks my health opinion",
    user: "Wandy Doah",
    country: "Germany",
  },
  {
    content:
      "I pariticipate in last month.Health opinion panel have good source of information covering most of the healthcare policies till now.",
    user: "Dr Emma Noah",
    country: "New York",
  },
  {
    content:
      "Great platform to earn extra, great support team to assist quickly and Glad to have more survey soon.",
    user: "Danya Milch",
    country: "Moscow",
  },
  {
    content:
      "Appriciable work by My Health Opinion Team. These type of Panels helps doctor to read the analysis more efficiently.",
    user: "Anil Jain",
    country: "India",
  },
  {
    content:
      "Very quick response team to support, Quick reward redemption. Cheersssss",
    user: "Charlie Charlotte",
    country: "London",
  },

  {
    content:
      "Experience some downtime during surveys but it's great to have more survey done now. Health Opinion support team helps really quick. Much Appreciate health opinion site",
    user: "Fengge",
    country: "China",
  },
  {
    content:
      "This is one of the best site who offer the real money otherwise I was fade up with fake advertisements. Threshold reward is realy quick to achive and redeem it thru PayPal. Thank a lot support.",
    user: "Saada",
    country: "Thailand",
  },
];

const MotionPaper = motion.create(Paper);

function Testimonial() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      py={7}
      position="relative"
    >
      <Typography
        sx={{ fontSize: "26px", fontWeight: "bold", px: { xs: 2, md: 0 } }}
      >
        See What Our Customers Are Saying
      </Typography>
      <Typography sx={{ fontSize: "16px", mb: 4, px: { xs: 2, md: 0 } }}>
        Trusted by thousands of users worldwide, hear how MyHealthOpinions helps
        them financially.
      </Typography>

      <Grid
        size={10}
        sx={{
          columnCount: { xs: 1, sm: 2, md: 3 },
          columnGap: 1,
        }}
      >
        {Testimonialsdata.map((item, index) => (
          <MotionPaper
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true, amount: 0.2 }}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 3,
              boxShadow: 0,
              bgcolor: "#f4f6fa",
              border: `1px solid #a8fbd3`,
              display: "inline-block",
              width: "100%",
            }}
          >
            <Typography variant="body1" sx={{ mb: 2 }}>
              {item.content}
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold">
              {item.user}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.country}
            </Typography>
          </MotionPaper>
        ))}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "45%",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,1) 100%)",
            pointerEvents: "none",
            backdropFilter: "blur(1px)",
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Testimonial;
