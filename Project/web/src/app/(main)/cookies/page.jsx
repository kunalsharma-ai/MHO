"use client";
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubHeader from "@/componentsMHO/SubHeader";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

const CookiePolicy = () => {
  return (
    <MotionGrid
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      size={12}
      container
      justifyContent={"center"}
      className="scroll-target"
    >
      <SubHeader title="Cookie Policy" pageName="Cookie Policy" />
      <Grid
        size={{ xs: 11, xl: 8 }}
        container
        justifyContent="center"
        py={{ xs: 6, md: 10 }}
        px={2}
        sx={{
          background: "linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)",
        }}
      >
        <Grid container spacing={4}>
          <MotionGrid size={12} variants={item}>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 4,
                p: { xs: 3, md: 5 },
                textAlign: "center",
                border: "1px solid",
                borderColor: "grey.200",
                boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
              }}
            >
              <Box
                mb={3}
                sx={{
                  width: 90,
                  height: 90,
                  mx: "auto",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "secondary.light",
                  border: (theme) =>
                    `2px solid ${theme.palette.secondary.main}`,
                }}
              >
                <img
                  src="/images/home/about/icon-review.png"
                  width="48"
                  alt="icon-review"
                />
              </Box>
              <Typography
                variant="h4"
                fontWeight={800}
                color="primary.main"
                mb={2}
              >
                Cookie Preferences
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  fontSize: 17,
                  maxWidth: 850,
                  mx: "auto",
                }}
              >
                We use different types of cookies to improve your browsing
                experience, provide essential website functionality, analyse
                traffic, and enhance our services. You can learn more about each
                cookie category below.
              </Typography>
            </Box>
          </MotionGrid>
        </Grid>

        {/* Accordion Section */}
        <MotionBox
          variants={item}
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%",
          }}
        >
          {/* Essentials */}
          <motion.div variants={item}>
            <Accordion
              disableGutters
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "grey.200",
                boxShadow: "0 10px 25px rgba(0,0,0,.06)",
                transition: ".25s",

                "&:before": {
                  display: "none",
                },

                "&.Mui-expanded": {
                  boxShadow: "0 18px 35px rgba(0,0,0,.08)",
                  borderColor: "secondary.main",
                },

                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: 30,
                    }}
                  />
                }
                sx={{
                  bgcolor: "grey.50",
                  minHeight: 72,

                  "&.Mui-expanded": {
                    bgcolor: "secondary.light",
                  },

                  "& .MuiAccordionSummary-content": {
                    my: 1.5,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "primary.main",
                  }}
                >
                  Essentials
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  bgcolor: "background.paper",
                  px: { xs: 2.5, md: 4 },
                  py: 3,
                }}
              >
                <Typography fontSize={"16px"} mb={1} mt={3}>
                  These cookies are necessary to the core functionality of our
                  website and some of its features, such as access to secure
                  areas.
                </Typography>
                <Typography fontSize={"16px"}>
                  Below full details for Essentials:
                </Typography>
                <TableContainer
                  component={motion.div}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  sx={{
                    overflow: "auto",
                    mt: 2,
                    minWidth: "100%",
                  }}
                >
                  <Table
                    sx={{
                      minWidth: 900,
                      borderCollapse: "separate",
                      borderSpacing: 0,

                      "& th": {
                        bgcolor: "primary.main",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 15,
                        whiteSpace: "nowrap",
                      },

                      "& td": {
                        fontSize: 15,
                        py: 2,
                        verticalAlign: "top",
                      },

                      "& tbody tr:nth-of-type(even)": {
                        bgcolor: "grey.50",
                      },

                      "& tbody tr:hover": {
                        bgcolor: "secondary.light",
                      },

                      "& td, & th": {
                        borderColor: "grey.300",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: "200px" }}>Name</TableCell>
                        <TableCell sx={{ width: "200px" }}>Purpose</TableCell>
                        <TableCell sx={{ width: "200px" }}>Type</TableCell>
                        <TableCell sx={{ width: "200px" }}>
                          Expires In
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>connection.sid</TableCell>
                        <TableCell>
                          Stores authentication and authorization of user after
                          login. This variable is used to provide personalized
                          user experience
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>30 days / Logout</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>twk_idm_key,</p>
                          <p>TawkConnectionTime,</p>
                          <p>twk_uuid_XXXX</p>
                        </TableCell>
                        <TableCell>
                          Used to provide chat support to the respondent live
                          while working. These cookies are set by a third party
                          but chat feature is totally dependent on this so it
                          cannot be ignored
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>Managed by third party (Tawk.to)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Google_RECAPTCHA</TableCell>
                        <TableCell>
                          Managed by Google for spam protection and robot
                          detection
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>Managed by third party (Google)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>VisitorInfo*</TableCell>
                        <TableCell>
                          Used by YouTube for video embedding and analytics
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>Managed by Third party (YouTube)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </motion.div>

          {/* Performance */}
          <motion.div variants={item}>
            {" "}
            <Accordion
              disableGutters
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "grey.200",
                boxShadow: "0 10px 25px rgba(0,0,0,.06)",
                transition: ".25s",

                "&:before": {
                  display: "none",
                },

                "&.Mui-expanded": {
                  boxShadow: "0 18px 35px rgba(0,0,0,.08)",
                  borderColor: "secondary.main",
                },

                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: 30,
                    }}
                  />
                }
                sx={{
                  bgcolor: "grey.50",
                  minHeight: 72,

                  "&.Mui-expanded": {
                    bgcolor: "secondary.light",
                  },

                  "& .MuiAccordionSummary-content": {
                    my: 1.5,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "primary.main",
                  }}
                >
                  Performance And Functionality
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  bgcolor: "background.paper",
                  px: { xs: 2.5, md: 4 },
                  py: 3,
                }}
              >
                <Typography fontSize={"16px"} mt={3} mb={1}>
                  These cookies are used to enhance the performance and
                  functionality of our websites but are nonessential to their
                  use. However, without these cookies, certain functionality
                  (like videos) may become unavailable.
                </Typography>
                <Typography fontSize={"16px"}>
                  Below full details for Performance and Functionality:
                </Typography>
                <TableContainer
                  component={motion.div}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  sx={{
                    overflow: "auto",
                    mt: 2,
                    minWidth: "100%",
                  }}
                >
                  <Table
                    sx={{
                      minWidth: 900,
                      borderCollapse: "separate",
                      borderSpacing: 0,

                      "& th": {
                        bgcolor: "primary.main",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 15,
                        whiteSpace: "nowrap",
                      },

                      "& td": {
                        fontSize: 15,
                        py: 2,
                        verticalAlign: "top",
                      },

                      "& tbody tr:nth-of-type(even)": {
                        bgcolor: "grey.50",
                      },

                      "& tbody tr:hover": {
                        bgcolor: "secondary.light",
                      },

                      "& td, & th": {
                        borderColor: "grey.300",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: "300px" }}>Name</TableCell>
                        <TableCell sx={{ width: "200px" }}>Purpose</TableCell>
                        <TableCell sx={{ width: "200px" }}>Type</TableCell>
                        <TableCell sx={{ width: "200px" }}>
                          Expires In
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <p>_hjSessionUser_XXXXXXX</p>
                          <p>_hjFirstSeen</p>
                          <p>_hjIncludedInSessionSample</p>
                          <p>_hjSession_XXXXXXXX</p>
                          <p>_hjIncludedInPageviewSample</p>
                          <p>_hjAbsoluteSessionInProgress</p>
                        </TableCell>
                        <TableCell>
                          Used for proactive tracking of issues in the website
                          and app before a visitor reports them.
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>Managed by Third party (Hotjar)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>_GA*</p>
                          <p>NID*</p>
                          <p>IDE*</p>
                          <p>ANID*</p>
                        </TableCell>
                        <TableCell>
                          Used by Google Analytics to provide information about
                          user’s behaviour.
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>Managed by Third party (Google)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </motion.div>

          {/* Social Networking */}
          <motion.div variants={item}>
            <Accordion
              disableGutters
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "grey.200",
                boxShadow: "0 10px 25px rgba(0,0,0,.06)",
                transition: ".25s",

                "&:before": {
                  display: "none",
                },

                "&.Mui-expanded": {
                  boxShadow: "0 18px 35px rgba(0,0,0,.08)",
                  borderColor: "secondary.main",
                },

                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: 30,
                    }}
                  />
                }
                sx={{
                  bgcolor: "grey.50",
                  minHeight: 72,

                  "&.Mui-expanded": {
                    bgcolor: "secondary.light",
                  },

                  "& .MuiAccordionSummary-content": {
                    my: 1.5,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "primary.main",
                  }}
                >
                  Social Networking
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  bgcolor: "background.paper",
                  px: { xs: 2.5, md: 4 },
                  py: 3,
                }}
              >
                <Typography fontSize={"16px"} py={3}>
                  These cookies enable you to share our website's content
                  through third-party social networks and other websites. They
                  may also be used for advertising.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </motion.div>

          {/* Unclassified */}
          <motion.div variants={item}>
            <Accordion
              disableGutters
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "grey.200",
                boxShadow: "0 10px 25px rgba(0,0,0,.06)",
                transition: ".25s",

                "&:before": {
                  display: "none",
                },

                "&.Mui-expanded": {
                  boxShadow: "0 18px 35px rgba(0,0,0,.08)",
                  borderColor: "secondary.main",
                },

                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "secondary.main",
                      fontSize: 30,
                    }}
                  />
                }
                sx={{
                  bgcolor: "grey.50",
                  minHeight: 72,

                  "&.Mui-expanded": {
                    bgcolor: "secondary.light",
                  },

                  "& .MuiAccordionSummary-content": {
                    my: 1.5,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "primary.main",
                  }}
                >
                  Unclassified
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  bgcolor: "background.paper",
                  px: { xs: 2.5, md: 4 },
                  py: 3,
                }}
              >
                <Typography fontSize={"16px"} py={3}>
                  These are cookies that have not yet been categorized. We are
                  in the process of classifying these cookies with the help of
                  their providers.
                </Typography>
                <TableContainer
                  component={motion.div}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  sx={{
                    overflow: "auto",
                    mt: 2,
                    minWidth: "100%",
                  }}
                >
                  <Table
                    sx={{
                      minWidth: 900,
                      borderCollapse: "separate",
                      borderSpacing: 0,

                      "& th": {
                        bgcolor: "primary.main",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 15,
                        whiteSpace: "nowrap",
                      },

                      "& td": {
                        fontSize: 15,
                        py: 2,
                        verticalAlign: "top",
                      },

                      "& tbody tr:nth-of-type(even)": {
                        bgcolor: "grey.50",
                      },

                      "& tbody tr:hover": {
                        bgcolor: "secondary.light",
                      },

                      "& td, & th": {
                        borderColor: "grey.300",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: "200px" }}>Name</TableCell>
                        <TableCell sx={{ width: "200px" }}>Purpose</TableCell>
                        <TableCell sx={{ width: "200px" }}>Type</TableCell>
                        <TableCell sx={{ width: "200px" }}>
                          Expires In
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Auth</TableCell>
                        <TableCell>
                          Auth token for autologin if user selects "remember me"
                        </TableCell>
                        <TableCell>html_local_storage</TableCell>
                        <TableCell>Persistent</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        </MotionBox>
      </Grid>
    </MotionGrid>
  );
};

export default CookiePolicy;
