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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Footer({ sections = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

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

  // Handle navigation
  const handleNavigation = (path, sectionLabel = null) => {
    if (pathname === path) {
      // If already on the target page
      if (path === "/" && sectionLabel) {
        const section = sections.find((s) => s.label === sectionLabel);
        if (section) handleScroll(section.ref);
      }
      return;
    }

    // If navigating to home with a section
    if (path === "/" && sectionLabel) {
      router.push(`/?section=${encodeURIComponent(sectionLabel)}`);
    } else {
      router.push(path);
    }
  };

  // Handle scrolling when arriving on home page with a section query
  useEffect(() => {
    if (pathname === "/") {
      const sectionLabel = searchParams.get("section");
      if (sectionLabel) {
        const section = sections.find(
          (s) => s.label === decodeURIComponent(sectionLabel)
        );
        if (section) {
          handleScroll(section.ref);
          // Clear the query parameter after scrolling
          router.replace("/", { scroll: false });
        }
      }
    }
  }, [pathname, searchParams, sections, router]);

  // Handle external navigation
  const handleExternalNavigation = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e, handler) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler();
    }
  };

  const aboutSection = sections?.find((s) => s.label === "ABOUT US");

  return (
    <Grid
      size={12}
      sx={{ bgcolor: "#111111", color: "white" }}
      container
      justifyContent="center"
      px={3}
    >
      <Grid
        size={{ xs: 12, md: 8 }}
        container
        justifyContent="center"
        spacing={3}
      >
        <Grid
          size={{ xs: 12, sm: 6, lg: 4 }}
          container
          order={{ xs: 2, lg: 1 }}
          direction="column"
          spacing={2}
          py={{ xs: 2, lg: 4 }}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: "18px", color: "#888" }}
          >
            QUICK LINKS
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            onClick={() => {
              handleNavigation("/", "ABOUT US");
            }}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleNavigation("/", "ABOUT US"))
            }
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: "primary.main",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            About Us
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            onClick={() => handleNavigation("/cookies")}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleNavigation("/cookies"))
            }
            sx={{
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            Cookies Policy
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            onClick={() => handleNavigation("/terms")}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleNavigation("/terms"))
            }
            sx={{
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            Terms of Use
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            onClick={() => handleNavigation("/profiling")}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleNavigation("/profiling"))
            }
            sx={{
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            Profiling and Quality Scoring
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            onClick={() => handleNavigation("/privacy")}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleNavigation("/privacy"))
            }
            sx={{
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            Privacy Policy
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            onClick={() => handleNavigation("/gdpr")}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigation("/gdpr"))}
            sx={{
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            GDPR Compliance
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            onClick={() =>
              handleExternalNavigation("//panels.frequentresearch.com/")
            }
            onKeyDown={(e) =>
              handleKeyDown(e, () =>
                handleExternalNavigation("//panels.frequentresearch.com/")
              )
            }
            sx={{
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            Healthcare Panel Book
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            onClick={() => handleNavigation("/faq")}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigation("/faq"))}
            sx={{
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            FAQ
          </Typography>
        </Grid>

        <Grid
          size={{ xs: 12, lg: 4 }}
          container
          order={{ xs: 1, lg: 3 }}
          justifyContent={{ sm: "center", md: "flex-start" }}
          direction={{ xs: "column", sm: "row", lg: "column" }}
          spacing={{ xs: 2, sm: 6, lg: 2 }}
          py={4}
        >
          <img src="/images/logo/mho-logo-white.png" alt="logo" width="250px" />
          <Box display="flex" alignItems="center" gap={2} mt={1} pl={1}>
            <IconButton
              component="a"
              href="https://in.linkedin.com/company/frequentresearch"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="linkedin"
              sx={{
                color: "white",
                "&:hover": { color: "primary.main" },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "2px",
                },
              }}
            >
              <LinkedInIcon sx={{ fontSize: 36 }} />
            </IconButton>
            <IconButton
              component="a"
              target="_blank"
              href="https://www.facebook.com/frequentrfs/"
              rel="noopener noreferrer"
              aria-label="facebook"
              sx={{
                color: "white",
                "&:hover": { color: "primary.main" },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "2px",
                },
              }}
            >
              <FacebookIcon
                sx={{
                  fontSize: "36px",
                }}
              />
            </IconButton>
            <IconButton
              component="a"
              target="_blank"
              href="https://twitter.com/frequentrfs"
              rel="noopener noreferrer"
              aria-label="twitter"
              sx={{
                color: "white",
                "&:hover": { color: "primary.main" },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "2px",
                },
              }}
            >
              <XIcon
                sx={{
                  fontSize: "30px",
                }}
              />
            </IconButton>

            <IconButton
              component="a"
              target="_blank"
              href="https://www.youtube.com/channel/UCLxmn2kq4aACAHaL2eT6QIQ"
              rel="noopener noreferrer"
              aria-label="youtube"
              sx={{
                color: "white",
                "&:hover": { color: "primary.main" },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "2px",
                },
              }}
            >
              <YouTubeIcon
                sx={{
                  fontSize: "36px",
                }}
              />
            </IconButton>
          </Box>
        </Grid>

        <Grid
          size={{ xs: 12, sm: 6, lg: 4 }}
          order={3}
          container
          direction="column"
          spacing={2}
          py={{ xs: 2, lg: 4 }}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: "18px", color: "#888" }}
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
              "&:hover": {
                color: "primary.main",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
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
            href="tel:+919810459700"
            sx={{
              "&:hover": {
                color: "primary.main",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
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
              +919810459700
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            component="a"
            href="mailto:support@frequentresearch.com"
            sx={{
              "&:hover": {
                color: "primary.main",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
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
              support@frequentresearch.com
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        size={12}
        sx={{
          textAlign: "center",
          borderTop: "1px solid #333",
          py: 0.5,
          color: "#888",
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
          color="primary.main"
          fontSize={13}
          sx={{
            "&:hover": { textDecoration: "underline" },
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.main",
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
