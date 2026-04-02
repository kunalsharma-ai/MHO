"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { usePathname } from "next/navigation";
import { useMember, useQuery } from "@/Context";
import { Page } from "@/util";

export default function Header({ sections = [], open, setOpen }) {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const [showLogin, setShowLogin] = React.useState(true);
  const user = useMember();
  const pathname = usePathname();
  const query = useQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!query) return;
    if (![null, undefined].includes(query.login)) {
      setOpen(true);
    }
  }, [query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = (ref) => {
    if (ref?.current) {
      const element = ref.current;
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 5);
    }
  };

  const handleNavigation = (path, sectionLabel = null) => {
    if (pathname === path) {
      // If already on the target page
      if (path === "/") {
        const scrollContainer = document.getElementById("scroll-container");
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
        }
        // Scroll to section if on home page
        if (sectionLabel) {
          const section = sections.find((s) => s.label === sectionLabel);
          if (section) handleScroll(section.ref);
        }
      }
      return;
    }

    // If navigating to home with a section
    if (path === "/" && sectionLabel) {
      router.push(`/?section=${encodeURIComponent(sectionLabel)}`);
    } else {
      router.push(path); // Regular navigation for other pages
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      const sectionLabel = searchParams.get("section");
      if (sectionLabel) {
        const section = sections.find(
          (s) => s.label === decodeURIComponent(sectionLabel)
        );
        if (section) {
          handleScroll(section.ref);
          router.replace("/", { scroll: false });
        }
      }
    }
  }, [pathname, searchParams, sections, router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const getNavigationItems = () => {
    if (pathname === "/") {
      // Home page - use sections with scroll functionality
      // Override "CONTACT" to navigate to /contact page
      return sections.map((section) => ({
        label: section.label, // Already uppercase
        onClick: () => {
          if (section.label === "CONTACT") {
            handleNavigation("/contact");
          } else {
            handleScroll(section.ref);
          }
          handleDrawerClose();
        },
        isExternalPage: section.label === "CONTACT",
        path: section.label === "CONTACT" ? "/contact" : "/",
      }));
    } else {
      // Other pages - navigate to home sections or other pages, with uppercase labels
      return [
        {
          label: "HOME",
          onClick: () => {
            handleNavigation("/", "HOME");
            handleDrawerClose();
          },
          path: "/",
          sectionLabel: "HOME",
        },
        {
          label: "ABOUT US",
          onClick: () => {
            handleNavigation("/", "ABOUT US");
            handleDrawerClose();
          },
          path: "/",
          sectionLabel: "ABOUT US",
        },
        {
          label: "OUR PROFESSIONALS",
          onClick: () => {
            handleNavigation("/", "OUR PROFESSIONALS");
            handleDrawerClose();
          },
          path: "/",
          sectionLabel: "OUR PROFESSIONALS",
        },
        {
          label: "OUR SPECIALTIES",
          onClick: () => {
            handleNavigation("/", "OUR SPECIALTIES");
            handleDrawerClose();
          },
          path: "/",
          sectionLabel: "OUR SPECIALTIES",
        },
        {
          label: "SOLUTIONS",
          onClick: () => {
            handleNavigation("/", "SOLUTIONS");
            handleDrawerClose();
          },
          path: "/",
          sectionLabel: "SOLUTIONS",
        },
        {
          label: "TESTIMONIALS",
          onClick: () => {
            handleNavigation("/", "TESTIMONIALS");
            handleDrawerClose();
          },
          path: "/",
          sectionLabel: "TESTIMONIALS",
        },
        {
          label: "CONTACT",
          onClick: () => {
            handleNavigation("/contact");
            handleDrawerClose();
          },
          path: "/contact",
          sectionLabel: null, // Not a home section
        },
      ];
    }
  };
  const navigationItems = getNavigationItems();

  const drawer = (
    <Box
      sx={ {
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        bgcolor: "#A8FBD3",
        color: "black",
        pt: 2,
        pb: 2,
        position: "relative",
      } }
    >
      <Box
        sx={ {
          px: 3,
          pb: 2,
          mb: 2,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        } }
      >
        <img
          src="/images/logo/My-Health-Opinions1500-500.png"
          alt="logo"
          height="60px"
          width="180px"
          style={ { cursor: "pointer" } }
          onClick={ () => {
            handleNavigation("/");
            handleDrawerClose();
          } }
        />
        <IconButton
          aria-label="close drawer"
          onClick={ handleDrawerClose }
          sx={ {
            color: "black",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
          } }
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={ {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        } }
      >
        <List>
          { navigationItems.map((item, index) => (
            <ListItem
              key={ index }
              onClick={ item.onClick }
              sx={ {
                cursor: "pointer",
                fontWeight: 500,

                px: 3,
                py: 1.5,
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                  borderRadius: 1,
                },
                position: "relative",
                // "&::after": {
                //   content: '""',
                //   position: "absolute",
                //   width: 0,
                //   height: "2px",
                //   bottom: 0,
                //   left: 24,
                //   bgcolor: "primary.main",
                //   transition: "width 0.3s ease",
                // },
                // "&:hover::after": {
                //   width: "calc(100% - 48px)",
                // },
              } }
            >
              <ListItemText
                primary={ item.label }
                primaryTypographyProps={ {
                  fontWeight: "bold",
                  fontSize: "16px",
                } }
              />
            </ListItem>
          )) }
        </List>

        <Box sx={ { px: 3, mt: 3 } } position="absolute" bottom="20px">
          {/* <Button
          fullWidth
          variant="outlined"
          color="black"
          onClick={() => {
            setOpen(!open);

            handleDrawerClose();
          }}
          sx={{
            fontSize: "16px",
            borderRadius: 1,
            fontWeight: "bold",
            height: "45px",
            "&:hover": {
              boxShadow: 12,
            },
          }}
        >
          Login
        </Button> */}
          { user === null ? (
            <Button
              variant="outlined"
              color="black"
              onClick={ () => {
                setOpen(!open);
              } }
              sx={ {
                boxShadow: 2,
                fontSize: "16px",
                borderRadius: 1,
                fontWeight: "bold",
                height: "36px",

                "&:hover": {
                  boxShadow: 5,
                },
              } }
            >
              Login
            </Button>
          ) : (
            <Box
              display={ "flex" }
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={ {
                    width: "40px",
                    height: "40px",
                    bgcolor: user?.profilePicture
                      ? "transparent"
                      : "primary.main",
                  } }
                  src={ user?.profilePicture || "" }
                  alt={ user?.name?.first ?? "U" }
                />
                <Typography
                  sx={ {
                    ml: 1,
                    fontSize: "16px",
                    fontWeight: "bold",
                  } }
                >
                  { user?.name?.first ?? "User" }
                </Typography>
              </Box>
              <Box display={ "flex" } alignItems="center" gap={ 2 } ml={ 3 }>
                <Tooltip
                  title="Dashboard"
                  enterTouchDelay={ 0 }
                  leaveTouchDelay={ 1500 }
                  placement="top"
                >
                  <IconButton
                    sx={ { fontSize: "26px", color: "black" } }
                    onClick={ () => {
                      handleNavigation("/member/dashboard");
                      handleDrawerClose();
                    } }
                  >
                    <DashboardIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Log Out"
                  enterTouchDelay={ 0 }
                  leaveTouchDelay={ 1500 }
                  placement="top"
                >
                  <IconButton
                    sx={ { fontSize: "26px", color: "black" } }
                    onClick={ async () => {
                      localStorage.removeItem("token");
                      user.Reload();
                      window.location.pathname = "/";
                      handleDrawerClose();
                    } }
                  >
                    <PowerSettingsNewIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ) }
        </Box>
      </Box>
    </Box>
  );
  // return <pre>{ JSON.stringify(user, null, 2) }</pre>
  return (
    <AppBar
      position="sticky"
      elevation={ 0 }
      sx={ {
        bgcolor: "#A8FBD3",
        color: "black",
        py: { xs: 0, lg: 0.5 },
        boxShadow: 3,
      } }
    >
      <Toolbar
        sx={ {
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
        } }
      >
        <img
          src="/images/logo/My-Health-Opinions.png"
          alt="logo"
          height="90px"
          width="225px"
          style={ {
            cursor: "pointer",
            scale: 1.1,
          } }
          onClick={ () => {
            handleNavigation("/");
          } }
        />

        <Box
          sx={ { display: { xs: "none", lg: "flex" }, gap: { xs: 2, xl: 4 } } }
        >
          { navigationItems.map((item, index) => (
            <Box
              component="button"
              tabIndex={ 0 }
              key={ index }
              className="hover-line"
              onClick={ item.onClick }
              sx={ {
                fontFamily: "inherit",
                bgcolor: "transparent",
                border: "none",

                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "2px",
                },
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: { xs: "12px", lg: "13px", xl: "14px" },
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width:
                    mounted && pathname === item.path && !item.isExternalPage
                      ? "100%"
                      : 0,
                  height: "2px",
                  bottom: -4,
                  left: 0,
                  bgcolor: "primary.main",
                  transition: "width 0.3s ease",
                },
                "&:hover": {
                  color: "secondary.main",
                  "&:after": {
                    width: "100%",
                  },
                },
              } }
            >
              { item.label }
            </Box>
          )) }
        </Box>

        <Box sx={ { display: { xs: "flex", lg: "none" }, alignItems: "center" } }>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={ handleDrawerToggle }
            sx={ { mx: 0.5 } }
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box
          sx={ {
            display: { xs: "none", lg: "block" },
            alignItems: "center",
            mr: 7,
            minWidth: "145px",
          } }
        >
          { showLogin &&
            (user === null ? (
              <Button
                variant="outlined"
                color="black"
                onClick={ () => {
                  setOpen(!open);
                } }
                sx={ {
                  boxShadow: 2,
                  fontSize: "16px",
                  borderRadius: 1,
                  fontWeight: "bold",
                  height: "36px",

                  "&:hover": {
                    boxShadow: 5,
                  },
                } }
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={ (event) => setProfileAnchorEl(event.currentTarget) }
                color="inherit"
                sx={ { textTransform: "none", px: 2 } }
              >
                <Avatar
                  sx={ {
                    width: "40px",
                    height: "40px",
                    bgcolor: user?.profilePicture
                      ? "transparent"
                      : "primary.main",
                  } }
                  src={ user?.profilePicture || "" }
                  alt={ "user photo" }
                />
                <Typography
                  sx={ {
                    display: { xs: "none", lg: "block" },
                    ml: 1,
                    fontSize: "16px",
                    fontWeight: "bold",
                  } }
                >
                  { user?.name?.first ?? "User" }
                </Typography>
              </Button>
            )) }
        </Box>
      </Toolbar>
      <Menu
        anchorEl={ profileAnchorEl }
        open={ Boolean(profileAnchorEl) }
        onClose={ () => setProfileAnchorEl(null) }
        transformOrigin={ { horizontal: "left", vertical: "top" } }
        anchorOrigin={ { horizontal: "left", vertical: "bottom" } }
        PaperProps={ {
          sx: {
            // bgcolor: "#016550",
            color: "white",
            boxShadow: 24,
            mt: 1.5,
            overflow: "visible",
            "::before": {
              content: '""',
              display: "block",
              position: "absolute",
              width: 10,
              height: 10,
              bgcolor: "white",
              transform: "rotate(45deg)",
              top: -5,
              left: 16,
              zIndex: 0,
            },
          },
        } }
      >
        { user?.navbar?.map(link => <MenuItem
          key={ link?.text }
          onClick={ () => {
            setProfileAnchorEl(null);
            router.replace(link?.link ?? "/");
          } }
          sx={ { gap: 1, px: 3, py: 1, color: "black", fontWeight: 500 } }
        >
          { link?.icon && <i className={ link.icon } /> }
          { link?.text }
        </MenuItem>) }
        <MenuItem
          onClick={ async () => {
            setProfileAnchorEl(null);
            localStorage.removeItem("token");
            user.Reload();
          } }
          sx={ {
            gap: 1,
            px: 3,
            py: 1,
            borderTop: "1px solid whitesmoke",
            color: "black",
            fontWeight: 500,
          } }
        >
          <i className="icon-power" />
          Logout
        </MenuItem>
      </Menu>

      <Drawer
        variant="temporary"
        open={ mobileOpen }
        onClose={ handleDrawerToggle }
        ModalProps={ {
          keepMounted: true,
        } }
        sx={ {
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            position: "relative",
          },
        } }
      >
        { drawer }
      </Drawer>
    </AppBar>
  );
}
