"use client";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { api, loadData } from "@/util";
const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);
const footerItem = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const socialIcons = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: XIcon,
  x: XIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
};

function Footer({ sections = [] }) {
  const [socials, setSocials] = React.useState([]);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    loadData(api.get("/api/v1/socials"), (resp) => setSocials(resp.data || []));
  }, []);

  const availableSocials = socials.filter(
    (social) =>
      social?.url &&
      typeof social.url === "string" &&
      social.url.trim() !== "" &&
      socialIcons[social.platform?.toLowerCase()],
  );

  // Handle scroll for home page sections
  const handleScroll = (ref) => {
    if (ref?.current) {
      const element = ref.current;
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 150);
    }
  };

  // Handle scrolling when arriving on home page with a section query
  useEffect(() => {
    if (pathname === "/") {
      const sectionLabel = searchParams.get("section");
      if (sectionLabel) {
        const section = sections.find(
          (s) => s.label === decodeURIComponent(sectionLabel),
        );
        if (section) {
          handleScroll(section.ref);
          // Clear the query parameter after scrolling
          router.replace("/", { scroll: false });
        }
      }
    }
  }, [pathname, searchParams, sections, router]);

  const handleKeyDown = (e, handler) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler();
    }
  };

  return (
    <Grid
      size={12}
      sx={{
        background: `
radial-gradient(circle at top left, rgba(255,255,255,.08) 0, transparent 22%),
radial-gradient(circle at bottom right, rgba(255,255,255,.06) 0, transparent 18%),
linear-gradient(135deg,#061B4A 0%,#0A2E73 35%,#12489D 70%,#1B59B5 100%)
`,
        position: "relative",
        overflow: "hidden",
        color: "white",
      }}
      container
      justifyContent="center"
    >
      <MotionBox
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          top: -120,
          left: -120,
          width: 280,
          height: 280,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,.04)",
        }}
      />

      <MotionBox
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          bottom: -100,
          right: -80,
          width: 220,
          height: 220,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,.04)",
        }}
      />
      <MotionBox
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
        sx={{
          position: "absolute",
          top: 80,
          right: "18%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,.06)",
        }}
      />
      <MotionBox
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        sx={{
          position: "absolute",
          left: "40%",
          bottom: 120,
          width: 26,
          height: 26,
          borderRadius: "50%",
          bgcolor: "secondary.main",
          opacity: 0.2,
        }}
      />
      <MotionBox
        animate={{
          x: [0, 15, 0],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        sx={{
          position: "absolute",
          right: "28%",
          bottom: 60,
          width: 140,
          height: 80,
          backgroundImage:
            "radial-gradient(circle,#fff 1.4px,transparent 1.4px)",
          backgroundSize: "14px 14px",
          opacity: 0.12,
        }}
      />
      <MotionBox
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        sx={{
          position: "absolute",
          left: "45%",
          top: -120,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,.12), transparent 70%)",
          filter: "blur(10px)",
        }}
      />
      <Grid
        size={{ xs: 12, md: 8 }}
        container
        justifyContent="center"
        maxWidth={1400}
        px={{ xs: 3, md: 5 }}
        py={7}
        spacing={6}
      >
        <MotionGrid
          variants={footerItem}
          size={{ xs: 12, sm: 6, lg: 4 }}
          container
          order={{ xs: 2, lg: 1 }}
          direction="column"
          spacing={2}
          py={{ xs: 2, lg: 4 }}
        >
          <Typography
            sx={{
              color: "secondary.main",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: 2,
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            QUICK LINKS
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            onClick={() => {
              const section = sections.find((s) => s.label === "ABOUT US");
              if (section) handleScroll(section.ref);
            }}
            onKeyDown={(e) =>
              handleKeyDown(e, () => {
                const section = sections.find((s) => s.label === "ABOUT US");
                if (section) handleScroll(section.ref);
              })
            }
            sx={{
              color: "rgba(255,255,255,.82)",
              transition: ".3s",
              position: "relative",

              "&:hover": {
                cursor: "pointer",
                color: "secondary.main",
                transform: "translateX(8px)",
              },

              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "secondary.dark",
                outlineOffset: "2px",
              },

              "&::before": {
                content: '""',
                position: "absolute",
                left: -18,
                top: "50%",
                width: 0,
                height: 2,
                bgcolor: "secondary.main",
                transition: ".3s",
              },

              "&:hover::before": {
                width: 10,
              },
            }}
          >
            About Us
          </Typography>

          {/* All other links - open in new tab */}
          {[
            {
              label: "Cookies Policy",
              href: "/cookies",
            },
            {
              label: "Terms of Use",
              href: "/terms",
            },
            {
              label: "Profiling and Quality Scoring",
              href: "/profiling",
            },
            {
              label: "Privacy Policy",
              href: "/privacy",
            },
            {
              label: "GDPR Compliance",
              href: "/gdpr",
            },
            {
              label: "Healthcare Panel Book",
              href: "https://panels.frequentresearch.com/",
            },
            {
              label: "FAQ",
              href: "/faq",
            },
          ].map((link) => (
            <Typography
              key={link.href}
              component="a"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "rgba(255,255,255,.82)",
                transition: ".3s",
                textDecoration: "none",
                position: "relative",

                "&:hover": {
                  cursor: "pointer",
                  color: "secondary.main",
                  transform: "translateX(8px)",
                },

                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "secondary.dark",
                  outlineOffset: "2px",
                },

                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: -18,
                  top: "50%",
                  width: 0,
                  height: 2,
                  bgcolor: "secondary.main",
                  transition: ".3s",
                },

                "&:hover::before": {
                  width: 10,
                },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </MotionGrid>

        <MotionGrid
          variants={footerItem}
          size={{ xs: 12, lg: 4 }}
          container
          order={{ xs: 1, lg: 3 }}
          justifyContent={{ sm: "center", md: "flex-start" }}
          direction={{ xs: "column", sm: "row", lg: "column" }}
          spacing={{ xs: 2, sm: 6, lg: 2 }}
          py={4}
        >
          <MotionBox
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Box
              component="img"
              src="/images/logo/My-Health-Opinions.png"
              alt="logo"
              width={{ xs: "240px", xl: "280px" }}
            />
          </MotionBox>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            mt={1}
            pl={1}
            flexWrap="wrap"
          >
            {availableSocials.map((social) => {
              const platform = social.platform?.toLowerCase();
              const Icon = socialIcons[platform];

              return (
                <MotionBox
                  key={social._id || platform}
                  whileHover={{
                    y: -6,
                    scale: 1.15,
                    rotate: 8,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <IconButton
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,.08)",
                      color: "white",
                      transition: ".35s",
                      "&:hover": {
                        bgcolor: "secondary.main",
                        color: "#fff",
                        transform: "translateY(-4px)",
                        boxShadow: (theme) =>
                          `0 0 18px ${theme.palette.secondary.main}88`,
                      },
                      "&:focus-visible": {
                        outline: "2px solid",
                        outlineColor: "secondary.dark",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize:
                          platform === "twitter" || platform === "x" ? 30 : 36,
                      }}
                    />
                  </IconButton>
                </MotionBox>
              );
            })}
          </Box>
        </MotionGrid>

        <MotionGrid
          variants={footerItem}
          size={{ xs: 12, sm: 6, lg: 4 }}
          order={3}
          container
          direction="column"
          spacing={2}
          py={{ xs: 2, lg: 4 }}
        >
          <Typography
            sx={{
              color: "secondary.main",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: 2,
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            CONTACT US
          </Typography>

          <Box
            display="flex"
            component="a"
            href="https://goo.gl/maps/omWW4BDscx5fZpFdA"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1.5,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,.04)",
              transition: ".3s",
              "&:hover": {
                bgcolor: "rgba(255,255,255,.08)",
                transform: "translateX(8px)",
                boxShadow: "0 12px 25px rgba(0,0,0,.15)",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "secondary.dark",
                outlineOffset: "2px",
              },
            }}
          >
            <LocationPinIcon
              sx={{
                mr: 2,
                mt: 0.5,
                color: "secondary.main",
                fontSize: { xs: "22px", xl: "26px" },
              }}
            />
            <Box>
              <Typography sx={{ fontSize: { xs: "14px", xl: "16px" } }}>
                Mangolpur Kalan,
              </Typography>
              <Typography sx={{ fontSize: { xs: "14px", xl: "16px" } }}>
                New Delhi - 110085
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            component="a"
            href="tel:+918130015743"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1.5,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,.04)",
              transition: ".3s",
              "&:hover": {
                bgcolor: "rgba(255,255,255,.08)",
                transform: "translateX(8px)",
                boxShadow: "0 12px 25px rgba(0,0,0,.15)",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "secondary.dark",
                outlineOffset: "2px",
              },
            }}
          >
            <CallIcon
              sx={{
                mr: 2,
                color: "secondary.main",
                fontSize: { xs: "22px", xl: "26px" },
              }}
            />
            <Typography sx={{ fontSize: { xs: "14px", xl: "16px" } }}>
              +918130015743
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            component="a"
            href="mailto:support@myhealthopinions.com"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1.5,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,.04)",
              transition: ".3s",
              "&:hover": {
                bgcolor: "rgba(255,255,255,.08)",
                transform: "translateX(8px)",
                boxShadow: "0 12px 25px rgba(0,0,0,.15)",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "secondary.dark",
                outlineOffset: "2px",
              },
            }}
          >
            <EmailIcon
              sx={{
                mr: 2,
                color: "secondary.main",
                fontSize: { xs: "22px", xl: "26px" },
              }}
            />
            <Typography sx={{ fontSize: { xs: "14px", xl: "16px" } }}>
              support@myhealthopinions.com
            </Typography>
          </Box>
        </MotionGrid>
      </Grid>
      <Grid
        size={12}
        sx={{
          textAlign: "center",
          borderTop: "1px solid #777",
          py: 0.5,
          background: `
linear-gradient(
90deg,
#041332 0%,
#061B4A 100%
)
`,
          color: "#ccc",
          fontWeight: 500,
          fontSize: 13,
        }}
      >
        Copyright 2026 ©{" "}
        <Typography
          component="a"
          href="https://frequentresearch.com/"
          target="_blank"
          rel="noopener noreferrer"
          color="secondary.main"
          fontWeight={700}
          fontSize={13}
          sx={{
            "&:hover": { textDecoration: "underline" },
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "secondary.dark",
              outlineOffset: "2px",
            },
          }}
        >
          Frequent Research Fieldwork Solutions Pvt. Ltd.
        </Typography>{" "}
        (d/b/a MyHealthOpinions). All Rights Reserved.
      </Grid>
    </Grid>
  );
}

export default Footer;
