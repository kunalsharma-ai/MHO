"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useMember, useQuery } from "@/Context";

export default function Header({ sections = [], open, setOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const query = useQuery();
  const user = useMember();

  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const [showLogin, setShowLogin] = useState(true);

  const [scrolled, setScrolled] = useState(false);

  const [activeSection, setActiveSection] = React.useState("HOME");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!query) return;

    if (![null, undefined].includes(query.login)) {
      setOpen(true);
    }
  }, [query]);

  useEffect(() => {
    const container = document.getElementById("scroll-container") || window;

    const handleScrollEvent = () => {
      const y = container === window ? window.scrollY : container.scrollTop;

      setScrolled(y > 20);
    };

    handleScrollEvent();

    container.addEventListener("scroll", handleScrollEvent);

    return () => container.removeEventListener("scroll", handleScrollEvent);
  }, []);

  const handleScroll = (ref, label) => {
    if (!ref?.current) return;

    setActiveSection(label);

    setTimeout(() => {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleNavigation = (path, sectionLabel = null) => {
    if (pathname === path) {
      if (path === "/") {
        const scrollContainer = document.getElementById("scroll-container");

        scrollContainer?.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        if (sectionLabel) {
          const section = sections.find((s) => s.label === sectionLabel);

          if (section) handleScroll(section.ref, section.label);
        }
      }

      return;
    }

    if (path === "/" && sectionLabel) {
      router.push(`/?section=${encodeURIComponent(sectionLabel)}`);
    } else {
      router.push(path);
    }
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionLabel = searchParams.get("section");

    if (!sectionLabel) return;

    const section = sections.find(
      (s) => s.label === decodeURIComponent(sectionLabel),
    );

    if (section) {
      handleScroll(section.ref, section.label);

      router.replace("/", {
        scroll: false,
      });
    }
  }, [pathname, searchParams, sections]);

  const handleDrawerToggle = () => setMobileOpen((v) => !v);

  const handleDrawerClose = () => setMobileOpen(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const observers = [];

    sections.forEach((section) => {
      if (!section.ref?.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.label);
          }
        },
        {
          threshold: 0.2,
          rootMargin: "-120px 0px -45% 0px",
        },
      );

      observer.observe(section.ref.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [pathname, sections]);

  const getNavigationItems = () => {
    if (pathname === "/") {
      return sections.map((section) => ({
        label: section.label,

        onClick: () => {
          if (section.label === "CONTACT") {
            handleNavigation("/contact");
          } else {
            handleScroll(section.ref, section.label);
          }

          handleDrawerClose();
        },

        isExternalPage: section.label === "CONTACT",

        path: section.label === "CONTACT" ? "/contact" : "/",
      }));
    }

    return [
      {
        label: "HOME",
        onClick: () => {
          handleNavigation("/", "HOME");
          handleDrawerClose();
        },
        path: "/",
      },
      {
        label: "ABOUT US",
        onClick: () => {
          handleNavigation("/", "ABOUT US");
          handleDrawerClose();
        },
        path: "/",
      },
      {
        label: "OUR PROFESSIONALS",
        onClick: () => {
          handleNavigation("/", "OUR PROFESSIONALS");

          handleDrawerClose();
        },
        path: "/",
      },
      {
        label: "OUR SPECIALTIES",
        onClick: () => {
          handleNavigation("/", "OUR SPECIALTIES");

          handleDrawerClose();
        },
        path: "/",
      },
      {
        label: "SOLUTIONS",
        onClick: () => {
          handleNavigation("/", "SOLUTIONS");
          handleDrawerClose();
        },
        path: "/",
      },
      {
        label: "TESTIMONIALS",
        onClick: () => {
          handleNavigation("/", "TESTIMONIALS");

          handleDrawerClose();
        },
        path: "/",
      },
      {
        label: "CONTACT",
        onClick: () => {
          handleNavigation("/contact");
          handleDrawerClose();
        },
        path: "/contact",
      },
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          pt: 2,
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1400,
            width: "100%",
            mx: "auto",
            px: { xs: 2, lg: 5 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 68,

              px: 3,

              borderRadius: 100,

              bgcolor: "rgba(255,255,255,.96)",

              backdropFilter: "blur(18px)",

              border: "1px solid rgba(255,255,255,.6)",

              boxShadow: `
          0 12px 35px rgba(0,0,0,.08),
          0 3px 12px rgba(0,0,0,.05)
        `,

              display: "flex",

              alignItems: "center",

              justifyContent: "space-between",
            }}
          >
            {/* Logo */}

            <Box
              component="img"
              src="/images/logo/My-Health-Opinions.png"
              sx={{
                width: 175,
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/")}
            />

            {/* Desktop Nav */}

            <Box
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },

                gap: 4,

                alignItems: "center",
              }}
            >
              {navigationItems.map((item) => {
                const active =
                  pathname === "/"
                    ? item.label === "CONTACT"
                      ? false
                      : activeSection === item.label
                    : pathname === item.path;

                return (
                  <Box
                    key={item.label}
                    component="button"
                    onClick={item.onClick}
                    sx={{
                      border: 0,
                      bgcolor: active ? "secondary.main" : "transparent",

                      color: active ? "#fff" : "primary.dark",

                      px: active ? 2.8 : 0.5,

                      py: active ? 1 : 0,

                      borderRadius: 100,

                      fontWeight: 700,

                      fontSize: { md: 12, xl: 14 },

                      cursor: "pointer",

                      transition: ".3s",

                      position: "relative",

                      "&::after": active
                        ? {}
                        : {
                            content: '""',
                            position: "absolute",
                            bottom: -8,
                            left: 0,
                            width: 0,
                            height: 2,
                            backgroundColor: "secondary.main",
                            transition: ".3s",
                          },

                      "&:hover::after": active
                        ? {}
                        : {
                            width: "100%",
                          },

                      "&:hover": {
                        color: active ? "#fff" : "secondary.main",
                      },
                    }}
                  >
                    {item.label}
                  </Box>
                );
              })}
            </Box>

            {/* Right */}

            <Box
              sx={{
                display: {
                  xs: "none",
                  lg: "block",
                },
              }}
            >
              {user == null ? (
                <Button
                  variant="outlined"
                  onClick={() => setOpen(true)}
                  sx={{
                    borderRadius: 100,
                    px: 4,
                    py: 0.7,
                    fontSize: 16,
                    textTransform: "none",
                    fontWeight: 700,
                    borderWidth: 2,
                    borderColor: "secondary.main",
                    color: "secondary.main",
                    "&:hover": {
                      borderWidth: 2,
                      bgcolor: "secondary.main",
                      color: "#fff",
                    },
                  }}
                >
                  Sign in
                </Button>
              ) : (
                <Button
                  onClick={(e) => setProfileAnchorEl(e.currentTarget)}
                  sx={{
                    borderRadius: 100,

                    px: 1,

                    textTransform: "none",

                    color: "primary.dark",

                    "&:hover": {
                      bgcolor: "primary.light",
                    },
                  }}
                >
                  <Avatar
                    src={user?.profilePicture || ""}
                    sx={{
                      width: 42,
                      height: 42,
                      mr: 1.2,
                    }}
                  />

                  <Typography fontWeight={700}>
                    {user?.name?.first ?? "User"}
                  </Typography>
                </Button>
              )}
            </Box>

            {/* Mobile */}

            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                display: {
                  xs: "flex",
                  lg: "none",
                },

                color: "primary.main",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={() => setProfileAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 240,
            borderRadius: 4,
            overflow: "visible",
            bgcolor: "#fff",
            boxShadow: "0 25px 60px rgba(0,0,0,.18)",

            "&:before": {
              content: '""',
              position: "absolute",
              top: -8,
              right: 26,
              width: 16,
              height: 16,
              bgcolor: "#fff",
              transform: "rotate(45deg)",
            },
          },
        }}
      >
        {user?.navbar?.map((link) => (
          <MenuItem
            key={link.text}
            onClick={() => {
              setProfileAnchorEl(null);
              router.replace(link.link ?? "/");
            }}
            sx={{
              py: 1.4,
              px: 2.5,
              gap: 1.5,
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              fontWeight: 600,

              "&:hover": {
                bgcolor: "primary.light",
              },
            }}
          >
            {link.icon && <i className={link.icon} />}
            {link.text}
          </MenuItem>
        ))}

        <MenuItem
          onClick={async () => {
            setProfileAnchorEl(null);
            await user.Logout();
          }}
          sx={{
            mt: 1,

            borderTop: "1px solid",

            borderColor: "grey.200",

            py: 1.5,
            px: 2.5,
            mx: 1,
            gap: 1.5,

            color: "error.main",

            fontWeight: 700,
          }}
        >
          <i className="icon-power" />
          Sign out
        </MenuItem>
      </Menu>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        sx={{
          display: {
            xs: "block",
            lg: "none",
          },

          "& .MuiDrawer-paper": {
            width: 330,

            borderTopLeftRadius: 28,

            borderBottomLeftRadius: 28,

            overflow: "hidden",

            background:
              "linear-gradient(180deg,#0C4EBA 0%,#184FBB 65%,#D06A24 100%)",

            color: "#fff",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Header */}

          <Box
            sx={{
              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              px: 3,

              py: 3,
            }}
          >
            <Box
              component="img"
              src="/images/logo/My-Health-Opinions.png"
              sx={{
                width: 175,
              }}
            />

            <IconButton
              onClick={handleDrawerClose}
              sx={{
                color: "#fff",
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          {/* Navigation */}

          <List sx={{ px: 2 }}>
            {navigationItems.map((item) => (
              <ListItem
                key={item.label}
                onClick={item.onClick}
                sx={{
                  borderRadius: 3,

                  mb: 0.5,

                  cursor: "pointer",

                  transition: ".3s",

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,.12)",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Box flexGrow={1} />

          {/* Bottom */}

          <Box
            sx={{
              p: 3,
            }}
          >
            {user == null ? (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setOpen(true);
                  handleDrawerClose();
                }}
                sx={{
                  borderRadius: 100,

                  py: 1.5,

                  bgcolor: "secondary.main",

                  fontWeight: 700,

                  color: "#fff",

                  "&:hover": {
                    bgcolor: "secondary.main",
                  },
                }}
              >
                Sign in
              </Button>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Avatar
                    src={user?.profilePicture || ""}
                    sx={{
                      width: 52,
                      height: 52,
                      mr: 2,
                    }}
                  />

                  <Typography fontWeight={700}>
                    {user?.name?.first ?? "User"}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  startIcon={<DashboardRoundedIcon />}
                  onClick={() => {
                    handleNavigation("/member/dashboard");
                    handleDrawerClose();
                  }}
                  sx={{
                    justifyContent: "flex-start",
                    color: "#fff",
                    mb: 1,
                  }}
                >
                  Dashboard
                </Button>

                <Button
                  fullWidth
                  startIcon={<PowerSettingsNewIcon />}
                  onClick={async(e) => {
                    e.preventDefault();
                    console.log("Logout in progress....")
                    await user.Logout();
                    console.log("Logout ho gaya bye bye")
                    handleDrawerClose();
                  }}
                  sx={{
                    justifyContent: "flex-start",
                    color: "#fff",
                  }}
                >
                  
                  Sign out
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
