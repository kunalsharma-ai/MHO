"use client";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // Handle form submission
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Grid size={12} container justifyContent="center" mt={"80px"}>
      <Grid container size={{ xs: 11, md: 10 }} spacing={2} p={4} mt={2}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box
            sx={{
              height: "100%",
              p: 3,
              borderRadius: 4,
              bgcolor: "#fff",
              border: "1px solid",
              borderColor: "grey.200",
              boxShadow: "0 15px 35px rgba(0,0,0,.06)",
              transition: ".3s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 25px 50px rgba(0,0,0,.12)",
              },
            }}
          >
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                bgcolor: "secondary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <MailOutlineRoundedIcon
                sx={{
                  color: "#fff",
                  fontSize: 30,
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 700,
                mb: 1,
              }}
            >
              Email
            </Typography>

            <Typography
              component="a"
              href="mailto:support@myhealthopinions.com"
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                transition: ".25s",

                "&:hover": {
                  color: "secondary.main",
                },
              }}
            >
              support@myhealthopinions.com
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box
            sx={{
              height: "100%",
              p: 3,
              borderRadius: 4,
              bgcolor: "#fff",
              border: "1px solid",
              borderColor: "grey.200",
              boxShadow: "0 15px 35px rgba(0,0,0,.06)",
              transition: ".3s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 25px 50px rgba(0,0,0,.12)",
              },
            }}
          >
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                bgcolor: "secondary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <PhoneRoundedIcon
                sx={{
                  color: "#fff",
                  fontSize: 30,
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 700,
                mb: 1,
              }}
            >
              Phone
            </Typography>

            <Typography
              component="a"
              href="tel:+918130015743"
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                transition: ".25s",

                "&:hover": {
                  color: "secondary.main",
                },
              }}
            >
              +91 8130015743
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Box
            sx={{
              height: "100%",
              p: 3,
              borderRadius: 4,
              bgcolor: "#fff",
              border: "1px solid",
              borderColor: "grey.200",
              boxShadow: "0 15px 35px rgba(0,0,0,.06)",
              transition: ".3s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 25px 50px rgba(0,0,0,.12)",
              },
            }}
          >
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                bgcolor: "secondary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <LocationOnRoundedIcon
                sx={{
                  color: "#fff",
                  fontSize: 30,
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 700,
                mb: 1,
              }}
            >
              Address
            </Typography>

            <Typography
              component="a"
              href="//goo.gl/maps/omWW4BDscx5fZpFdA"
              target="_blank"
              rel="noreferrer"
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                transition: ".25s",

                "&:hover": {
                  color: "secondary.main",
                },
              }}
            >
              Mangolpur Kalan, New Delhi - 110085
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        size={{ xs: 11, md: 10 }}
        spacing={2}
        px={{ xs: 1, md: 4 }}
        py ={2}
        mb={3}
      >
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            sx={{
              borderRadius: 2,
              mb: { xs: 3, lg: 0 },
              p: { xs: 3, md: 5 },
              bgcolor: "#fff",
              borderRadius: 5,
              border: "1px solid",
              borderColor: "grey.200",
              boxShadow: "0 20px 50px rgba(0,0,0,.08)",
            }}
          >
            <Box mb={4}>
              <Typography
                sx={{
                  color: "secondary.main",
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Contact Us
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 34, md: 42 },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                We'd Love To Hear From You
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  maxWidth: 500,
                  lineHeight: 1.8,
                }}
              >
                Whether you have a question about surveys, rewards, membership,
                or partnership opportunities, our team is ready to help.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    size="small"
                    fullWidth
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    inputProps={{
                      pattern: "^[a-zA-Z]+$",
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        bgcolor: "#fafafa",

                        transition: ".3s",

                        "&:hover": {
                          bgcolor: "#fff",
                        },

                        "&.Mui-focused": {
                          bgcolor: "#fff",
                          boxShadow: (theme) =>
                            `0 0 0 4px ${theme.palette.primary.main}15`,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    size="small"
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    inputProps={{
                      pattern: "^[a-zA-Z]+$",
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        bgcolor: "#fafafa",

                        transition: ".3s",

                        "&:hover": {
                          bgcolor: "#fff",
                        },

                        "&.Mui-focused": {
                          bgcolor: "#fff",
                          boxShadow: (theme) =>
                            `0 0 0 4px ${theme.palette.primary.main}15`,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    size="small"
                    fullWidth
                    name="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        bgcolor: "#fafafa",

                        transition: ".3s",

                        "&:hover": {
                          bgcolor: "#fff",
                        },

                        "&.Mui-focused": {
                          bgcolor: "#fff",
                          boxShadow: (theme) =>
                            `0 0 0 4px ${theme.palette.primary.main}15`,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    size="small"
                    fullWidth
                    name="phone"
                    type="tel"
                    label="Contact No"
                    variant="outlined"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        bgcolor: "#fafafa",

                        transition: ".3s",

                        "&:hover": {
                          bgcolor: "#fff",
                        },

                        "&.Mui-focused": {
                          bgcolor: "#fff",
                          boxShadow: (theme) =>
                            `0 0 0 4px ${theme.palette.primary.main}15`,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    size="small"
                    fullWidth
                    name="message"
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        bgcolor: "#fafafa",

                        transition: ".3s",

                        "&:hover": {
                          bgcolor: "#fff",
                        },

                        "&.Mui-focused": {
                          bgcolor: "#fff",
                          boxShadow: (theme) =>
                            `0 0 0 4px ${theme.palette.primary.main}15`,
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.8,
                      borderRadius: 100,
                      fontWeight: 700,
                      fontSize: 16,
                      textTransform: "none",

                      background: (theme) =>
                        `linear-gradient(135deg,
                      ${theme.palette.primary.main},
                      ${theme.palette.secondary.main})`,

                      boxShadow: "0 15px 35px rgba(0,0,0,.18)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",

                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 25px 45px rgba(0,0,0,.22)",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            sx={{
              height: "100%",
              borderRadius: 5,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,.08)",
              border: "1px solid",
              borderColor: "grey.200",

              "& iframe": {
                width: "100%",
                height: "100%",
                minHeight: 520,
                border: 0,
                display: "block",
              },
            }}
          >
            <iframe
              src="//www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8222201626054!2d77.1112085!3d28.694964199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d055691b37e47%3A0xa652bd028161255c!2sFrequent%20Research%20Fieldwork%20Solutions%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1680177657397!5m2!1sen!2sin"
              style={{ border: 0, width: "100%", height: "400px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Frequent Research Fieldwork Solutions Location"
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;
