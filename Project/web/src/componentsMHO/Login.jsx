import React, { startTransition } from "react";
import PopUp from "./PopUp";
import {
  Typography,
  Card,
  Collapse,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Fade,
  Grow,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  Facebook,
  GitHub,
  Google,
  LinkedIn,
  X,
  Apple,
  Microsoft,
  Login as LoginIcon,
  YouTube,
  Instagram,
} from "@mui/icons-material";
import { api, loadData, Page, submitWithAjax } from "@/util";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTelemetry } from "@/Context";
import { useToast } from "@/hooks";
import Captcha from "./Captcha";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);

const socialIcons = {
  linkedin: <LinkedIn sx={{ color: "#0077B5", fontSize: "28px" }} />,
  facebook: <Facebook sx={{ color: "#1877F2", fontSize: "28px" }} />,
  youtube: <YouTube sx={{ color: "#FF0000", fontSize: "28px" }} />,
  twitter: <X sx={{ color: "black", fontSize: "22px" }} />,
  x: <X sx={{ color: "black", fontSize: "22px" }} />,
  instagram: <Instagram sx={{ color: "#E4405F", fontSize: "28px" }} />,
};

function Login({ open, onClose, setOpenSignUp }) {
  const [cardType, setCardType] = React.useState("login");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [socials, setSocials] = React.useState([]);

  React.useEffect(() => {
    loadData(api.get("/api/v1/socials"), (resp) => setSocials(resp.data || []));
  }, []);

  const socialsData = socials
    .filter(
      (social) =>
        social?.url &&
        typeof social.url === "string" &&
        social.url.trim() !== "" &&
        socialIcons[social.platform?.toLowerCase()],
    )
    .map((social) => ({
      name: social.platform,
      link: social.url,
      icon: socialIcons[social.platform?.toLowerCase()],
    }));

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();

        const params = new URLSearchParams(searchParams.toString());
        params.delete("login");

        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        });
      }}
      slots={{ transition: Grow }}
      slotProps={{
        transition: {
          timeout: 250,
          onExited: () => setCardType("login"),
        },
      }}
      maxWidth={false}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "hidden",
          width: {
            xs: "96vw",
            sm: cardType === "login" ? 1200 : 500,
          },
          maxWidth: "96vw",
          maxHeight: "95vh",
          height: {
            xs: "95vh",
            md: "90vh",
          },
          margin: 0,
          borderRadius: 5,

          background:
            "linear-gradient(145deg,#ffffff 0%,#f8fbff 55%,#eef5ff 100%)",

          border: "1px solid rgba(255,255,255,.65)",

          boxShadow: `
        0 40px 100px rgba(0,0,0,.20),
        0 8px 30px rgba(1,35,98,.12)
      `,
        },
      }}
      BackdropProps={{
        sx: {
          background:
            "radial-gradient(circle at top, rgba(1,35,98,.18), rgba(0,0,0,.45))",

          backdropFilter: "blur(10px)",
        },
      }}
    >
      <AnimatePresence mode="wait">
        {cardType === "login" ? (
          <MotionBox
            key="login"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            <LoginCard
              onClose={() => {
                onClose();

                const params = new URLSearchParams(searchParams.toString());

                params.delete("login");

                router.replace(`${pathname}?${params.toString()}`, {
                  scroll: false,
                });
              }}
              setCardType={setCardType}
              setOpenSignUp={setOpenSignUp}
              socials={socialsData}
            />
          </MotionBox>
        ) : (
          <MotionBox
            key="forgot"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            <ForgotCard
              onClose={() => {
                onClose();

                const params = new URLSearchParams(searchParams.toString());

                params.delete("login");

                router.replace(`${pathname}?${params.toString()}`, {
                  scroll: false,
                });
              }}
              setCardType={setCardType}
              setOpenSignUp={setOpenSignUp}
            />
          </MotionBox>
        )}
      </AnimatePresence>
    </Dialog>
  );
}

export default Login;

function LoginCard({ onClose, setCardType, setOpenSignUp, socials }) {
  const [telemetry, router] = [useTelemetry(), useRouter()];
  const [country, setCountry] = React.useState("in");
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loginType, setLoginType] = React.useState("mail");
  const [phone, setPhone] = React.useState("");
  const [btnDisabled, setBtnDisabled] = React.useState(true);

  const [providers, setProviders] = React.useState([]);
  React.useEffect(() => {
    api.post("/api/v1/auth/socials", {}).then((resp) => {
      setProviders(resp?.data ?? []);
    });
  }, []);

  React.useEffect(() => {
    if (!telemetry) return;
    telemetry.ip().then((resp) => {
      if (resp.country) {
        setCountry(resp.country.toLowerCase());
      }
    });
  }, [telemetry]);

  const options = [
    { label: "Email", value: "mail" },
    { label: "Phone", value: "phone" },
  ];

  const providerIcons = {
    google: <Google />,
    github: <GitHub />,
    facebook: <Facebook />,
    linkedin: <LinkedIn />,
    twitter: <X />,
    x: <X />,
    apple: <Apple />,
    microsoft: <Microsoft />,
  };

  const authProviders = providers.map((provider) => ({
    label: `Continue with ${
      provider.name.charAt(0).toUpperCase() + provider.name.slice(1)
    }`,
    icon: providerIcons[provider.name?.toLowerCase()] || <LoginIcon />,
    href: provider.authUrl,
  }));

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1.05fr .95fr",
        },
        width: "100%",
        height: "100%",
        minHeight: 0,
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="/images/home/signup-image6.jpg"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scale(1.3)",
            objectPosition: "10px 50px",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,

            background:
              "linear-gradient(180deg,rgba(1,35,98,.12),rgba(1,35,98,.72))",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",

            p: 6,

            color: "#fff",
          }}
        >
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Box>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: 4,
                  py: 2.5,
                  borderRadius: 3,
                  backdropFilter: "blur(20px)",
                  background: "rgba(255,255,255,.88)",
                  border: "1px solid rgba(255,255,255,.95)",
                  boxShadow: `
0 8px 18px rgba(0,0,0,.12),
0 20px 45px rgba(1,35,98,.18)
`,
                  mb: 5,
                  width: "fit-content",
                }}
              >
                <Box
                  component="img"
                  src="/images/logo/My-Health-Opinions.png"
                  sx={{
                    height: 60,
                  }}
                />
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: 30, xl: 48 },
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              sx={{
                mt: { xs: 2, xl: 3 },
                fontSize: { lg: 15, xl: 18 },
                opacity: 0.92,
                lineHeight: 1.8,
              }}
            >
              Access your healthcare research dashboard, manage your profile,
              participate in surveys and earn rewards.
            </Typography>
          </MotionBox>

          <Grid container spacing={2}>
            {[
              {
                number: "30K+",
                label: "Members Worldwide",
              },
              {
                number: "40+",
                label: "Countries",
              },
              {
                number: "1000+",
                label: "Studies",
              },
              {
                number: "100%",
                label: "Secure",
              },
            ].map((item, index) => (
              <MotionGrid
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.45 + index * 0.08,
                }}
                size={6}
                key={item.label}
              >
                <Box
                  sx={{
                    py: { md: 1, xl: 2.5 },
                    px: 2.5,
                    borderRadius: 3,
                    bgcolor: "rgba(255,255,255,.04)",
                    backdropFilter: "blur(3px)",
                    border: "1px solid rgba(255,255,255,.18)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 28,
                      fontWeight: 800,
                    }}
                  >
                    {item.number}
                  </Typography>

                  <Typography
                    sx={{
                      opacity: 0.8,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              </MotionGrid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: 0,
          bgcolor: "#fff",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            py: 2,
            mb: 1,
            bgcolor: "rgba(255,255,255,.92)",
            backdropFilter: "blur(18px)",
            borderBottom: "1px solid #eef2f7",
          }}
        >
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 3,
            }}
          >
            <Box
              component="img"
              src="/images/logo/logo.png"
              sx={{
                display: { xs: "block", md: "none" },
                height: 50,
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 24,
                    xl: 28,
                  },
                  fontWeight: 700,
                  color: "primary.main",
                  lineHeight: 1.1,
                  mt: 1,
                  mb: 0.5,
                }}
              >
                Sign In
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  color: "text.secondary",
                  fontSize: { xs: 12, xl: 14 },
                }}
              >
                Welcome back. Sign in to continue participating in healthcare
                research.
              </Typography>
            </Box>
          </MotionBox>
          <motion.div
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            style={{ position: "absolute", top: 20, right: 30 }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                border: "1px solid #e3e8ef",
                bgcolor: "#fff",

                "&:hover": {
                  bgcolor: "#f8fafc",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </motion.div>
        </Box>
        <MotionBox
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          component="form"
          onSubmit={async (e) => {
            e.preventDefault();
            // console.log(e);
            // let resp = await submitWithAjax(e);
            // console.log(resp);

            setLoading(true);
            try {
              const resp = await submitWithAjax(e);
              switch (resp.status) {
                case "success":
                  router.replace("/member/dashboard");
                  break;

                default:
                  setErrorMessage(resp.message);
                  setLoading(false);
                  break;
              }
            } catch (error) {
              console.log({ error });
              setErrorMessage("Something went wrong.");
              setLoading(false);
            }
          }}
          method="post"
          action="/api/v1/user/login"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            overflowY: "auto",
            px: 4,
            py: 1,
            gap: 2,
            justifyContent: "flex-start",
            "&::-webkit-scrollbar": {
              width: 6,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#d6dde8",
              borderRadius: 10,
            },
          }}
        >
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "#fafbfc",
              }}
            >
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                Choose how you'd like to sign in
              </Typography>
              <Box
                sx={{
                  p: 0.5,
                  borderRadius: 3,
                  bgcolor: "#f3f6fb",
                  border: "1px solid #e4ebf3",
                }}
              >
                <ToggleButtonGroup
                  value={loginType}
                  exclusive
                  fullWidth
                  onChange={(_, value) => {
                    if (value) setLoginType(value);
                  }}
                  sx={{
                    gap: 0.5,
                    border: 0,

                    "& .MuiToggleButtonGroup-grouped": {
                      border: 0,
                      borderRadius: "10px !important",
                    },

                    "& .MuiToggleButton-root": {
                      flex: 1,
                      height: 48,
                      textTransform: "none",
                      fontWeight: 600,
                      color: "text.secondary",
                      position: "relative",
                      overflow: "hidden",
                      transition:
                        "background-color .35s ease, color .35s ease, transform .25s ease, box-shadow .35s ease",

                      "&:hover": {
                        bgcolor: "rgba(1,35,98,.05)",
                      },

                      "&.Mui-selected": {
                        color: "#fff",
                        background:
                          "linear-gradient(135deg,#012362 0%,#0b4bb3 100%)",
                        boxShadow: "0 8px 22px rgba(1,35,98,.18)",

                        "&:hover": {
                          background:
                            "linear-gradient(135deg,#001b55 0%,#063686 100%)",
                        },
                      },
                    },
                  }}
                >
                  {options.map((option) => (
                    <ToggleButton key={option.value} value={option.value}>
                      {option.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
            </Box>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "#e8edf5",
                bgcolor: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,.04)",
              }}
            >
              <Grid container direction="column" spacing={2.5}>
                {loginType === "mail" ? (
                  <Page.Input
                    label="E-Mail Address"
                    type="email"
                    name="mail"
                    variant="outlined"
                    size="normal"
                    required
                    autoFocus
                    onFocus={(e) => {
                      setErrorMessage(null);
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        background: "#fff",
                        transition: ".25s",
                        "&:hover": {
                          boxShadow: "0 3px 12px rgba(0,0,0,.04)",
                        },
                        "&.Mui-focused": {
                          boxShadow: "0 8px 24px rgba(1,35,98,.08)",
                        },
                      },
                    }}
                  />
                ) : (
                  <PhoneInput
                    country={country}
                    // onlyCountries={onlyCountries}
                    // disableDropdown={true}
                    name="phone"
                    // value={phone}
                    // onChange={(value) => setPhone(value)}
                    inputProps={{
                      name: "phone",
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "54px",
                      borderRadius: "12px",
                      background: "#fff",
                    }}
                    inputClass="custom-phone-font"
                    specialLabel={""}
                  />
                )}
                <Page.Input
                  onFocus={(e) => {
                    setErrorMessage(null);
                  }}
                  label="Password"
                  type="password"
                  name="password"
                  size="normal"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      // height: 54,
                      borderRadius: 3,
                      background: "#fff",
                      transition: ".25s",
                      "&:hover": {
                        boxShadow: "0 3px 12px rgba(0,0,0,.04)",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 8px 24px rgba(1,35,98,.08)",
                      },
                    },
                  }}
                />
              </Grid>
              <Box
                sx={{
                  mt: 2,
                  px: 1.5,
                  py: 1,
                  borderRadius: 3,
                  bgcolor: "#fff",
                  border: "1px solid",
                  borderColor: "#e8edf5",
                  boxShadow: "0 8px 24px rgba(0,0,0,.03)",
                  border: "1px solid",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Page.Input
                  label="Remember me"
                  type="checkbox"
                  name="remember"
                  size="medium"
                />
                <Page.MuiButton
                  color="secondary"
                  onClick={() => setCardType("forgot")}
                  sx={{
                    p: 0,
                    minWidth: 0,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: 14,
                    "&:hover": {
                      bgcolor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Page.MuiButton>
              </Box>
            </Box>
            <Collapse in={!!btnDisabled} sx={{ width: "100%" }}>
              <Box
                sx={{
                  px: 3,
                  py: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "#fff",
                  borderRadius: 3,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
                }}
              >
                <Captcha
                  onVerified={() => {
                    setBtnDisabled(false);
                  }}
                />
              </Box>
            </Collapse>
            {errorMessage && <Page.Error message={errorMessage} />}
          </Box>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Page.MuiButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={btnDisabled}
              loading={loading}
              loadingIndicator="Signing in..."
              sx={{
                height: 48,
                borderRadius: 3,
                fontSize: 16,
                fontWeight: 700,
                textTransform: "none",
                color: "#fff",
                background: "linear-gradient(135deg,#012362,#0b4bb3)",
                boxShadow: "0 12px 30px rgba(1,35,98,.20)",
                transition: ".3s",
                "&:hover": {
                  background: "linear-gradient(135deg,#001b55,#063686)",
                  boxShadow: "0 18px 40px rgba(1,35,98,.28)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
                "&:disabled": {
                  background: "#01236273",
                },
              }}
            >
              Sign In
            </Page.MuiButton>
          </motion.div>

          {authProviders.length > 0 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  my: 1,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    height: "1px",
                    minHeight: "1px",
                    alignSelf: "center",
                    bgcolor: "divider",
                  }}
                />

                <Typography
                  sx={{
                    px: 1,
                    fontSize: 13,
                    color: "text.secondary",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  or continue with
                </Typography>

                <Box
                  sx={{
                    flex: 1,
                    height: "1px",
                    minHeight: "1px",
                    alignSelf: "center",
                    bgcolor: "divider",
                  }}
                />
              </Box>

              <Grid container spacing={1.5}>
                {authProviders.map((provider, i) => (
                  <MotionGrid
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    key={i}
                    size={
                      authProviders.length <= 2
                        ? { xs: 12 }
                        : authProviders.length === 3
                          ? { xs: 12, sm: 4 }
                          : { xs: 6, sm: 3 }
                    }
                  >
                    <Page.MuiButton
                      component="a"
                      href={provider.href}
                      fullWidth
                      startIcon={provider.icon}
                      variant="outlined"
                      sx={{
                        height: 48,
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 600,
                        bgcolor: "#fff",
                        borderColor: "#d9e2ec",
                        color: "text.primary",

                        "&:hover": {
                          bgcolor: "#fff",
                          borderColor: "secondary.main",
                          transform: "translateY(-2px)",
                          boxShadow: "0 10px 22px rgba(0,0,0,.08)",
                        },
                      }}
                    >
                      {provider.name ??
                        provider.label.replace("Continue with ", "")}
                    </Page.MuiButton>
                  </MotionGrid>
                ))}
              </Grid>
            </>
          )}

          <Box
            sx={{
              pt: 2,
              // borderTop: "1px solid",
              // borderColor: "divider",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 14,
              }}
            >
              Don't have an account?
            </Typography>

            <Typography
              onClick={() => {
                onClose();
                setOpenSignUp(true);
              }}
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                cursor: "pointer",
                transition: ".2s",

                "&:hover": {
                  color: "secondary.dark",
                  textDecoration: "underline",
                },
              }}
            >
              Create Account
            </Typography>
          </Box>

          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={4}
            sx={{
              // position: "absolute",
              // bottom: 10,
              // left: 0,
              // right: 0,
              // zIndex: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              pt: 2,
              pb: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Page.Text sx={{ fontSize: "13px", color: "text.secondary" }}>
              Follow us on
            </Page.Text>
            <Page.Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",

                justifyContent: "center",
                alignItems: "center",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              {socials.map((social) => (
                <motion.div
                  key={social.name}
                  whileHover={{
                    y: -5,
                    scale: 1.15,
                    rotate: social.name === "twitter" ? 8 : 0,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 15,
                  }}
                >
                  <Page.Link
                    href={social.link}
                    underline="none"
                    target="_blank"
                    sx={{
                      width: 46,
                      height: 46,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      transition: "all .25s ease",
                      color: "inherit",

                      "&:hover": {
                        background: "rgba(1,35,98,.08)",
                        boxShadow: "0 8px 20px rgba(1,35,98,.15)",
                      },

                      "& svg": {
                        transition: "transform .25s ease",
                      },
                    }}
                  >
                    {social.icon}
                  </Page.Link>
                </motion.div>
              ))}
            </Page.Box>
          </Grid>
        </MotionBox>
      </Box>
    </Box>
  );
}

function ForgotCard({ onClose, setCardType, setOpenSignUp }) {
  const [stage, setStage] = React.useState("user"); //user,otp,password
  const [user, setUser] = React.useState("");
  const [timeout, updateTimeout] = React.useState(30);
  // const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      if (timeout <= 0) return;
      updateTimeout(timeout - 1);
    }, 1000);
  }, [timeout]);

  const form = useForm({});

  async function sendOTP(e) {
    const resp = await api.post(`/api/v1/forgot-password`, { user });
    useToast(resp);
    if (resp.status === "error") return;
    setStage("otp");
  }

  return (
    <Page.Card
      sx={{
        position: "relative",
        width: { xs: "95vw", md: "auto" },
        borderRadius: 4,
        overflow: "auto",
        boxShadow: "0 30px 70px rgba(0,0,0,.18)",
        bgcolor: "#fff",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 18,
          right: 18,
          zIndex: 5,
          border: "1px solid #e3e8ef",
          bgcolor: "rgba(255,255,255,.92)",
          backdropFilter: "blur(12px)",
          transition: ".3s",

          "&:hover": {
            bgcolor: "#fff",
            transform: "rotate(90deg)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          px: 4,
          py: 6,
          background: "linear-gradient(135deg,#012362 0%,#0b4bb3 100%)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,.14)",
            border: "1px solid rgba(255,255,255,.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
            backdropFilter: "blur(12px)",
          }}
        >
          <SendIcon sx={{ fontSize: 34 }} />
        </Box>

        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          Reset Password
        </Typography>

        <Typography
          sx={{
            mt: 1,
            opacity: 0.9,
            lineHeight: 1.7,
            fontSize: 15,
          }}
        >
          Enter your registered email address and we'll send you a secure
          password reset link.
        </Typography>
      </Box>
      <Page.Box
        component="form"
        action="/api/v1/forgot-password"
        method="put"
        onSubmit={(e) => {
          e.preventDefault();
          //   submitWithAjax(e);
        }}
        sx={{
          px: 4,
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Grid container flexDirection="column" gap={2} size={12}>
          {stage === "user" && (
            <>
              <Box>
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  Registered Email Address
                </Typography>
                <Page.Input
                  name="user"
                  // label="Registered E-mail"
                  onChange={(e) => setUser(e.target.value)}
                  control={form.control}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 54,
                      borderRadius: 3,
                      background: "#fff",
                      transition: ".25s",

                      "&:hover": {
                        boxShadow: "0 3px 12px rgba(0,0,0,.04)",
                      },

                      "&.Mui-focused": {
                        boxShadow: "0 8px 24px rgba(1,35,98,.08)",
                      },
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: "#f8fafc",
                  border: "1px solid #e8edf5",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "primary.main",
                  }}
                >
                  What happens next?
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.25,
                  }}
                >
                  {[
                    "We'll verify your email address.",
                    "A secure reset link will be sent.",
                    "Create your new password.",
                    "Sign back into your account.",
                  ].map((item) => (
                    <Box
                      key={item}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                      }}
                    >
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          bgcolor: "secondary.main",
                          flexShrink: 0,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "text.secondary",
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Page.MuiButton
                variant="contained"
                color="primary"
                disabled={!user}
                onClick={sendOTP}
                endIcon={<SendIcon />}
                sx={{
                  mt: 1,
                  height: 54,
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: "none",
                  color: "#fff",

                  background: "linear-gradient(135deg,#012362 0%,#0b4bb3 100%)",

                  boxShadow: "0 12px 30px rgba(1,35,98,.22)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#001b55 0%,#063686 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 18px 40px rgba(1,35,98,.30)",
                  },

                  "&.Mui-disabled": {
                    background: "#cbd5e1",
                    color: "#fff",
                  },
                }}
              >
                Send Reset Link
              </Page.MuiButton>
            </>
          )}

          {stage === "otp" && (
            <Box
              sx={{
                textAlign: "center",
                p: 4,
                borderRadius: 4,
                border: "1px solid #e8edf5",
                bgcolor: "#fff",
                boxShadow: "0 12px 35px rgba(0,0,0,.05)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                Reset Link Sent
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  color: "text.secondary",
                  lineHeight: 1.8,
                }}
              >
                We've sent a password reset link to your registered email
                address.
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  fontWeight: 700,
                  color: "secondary.main",
                  wordBreak: "break-word",
                }}
              >
                {user}
              </Typography>

              <Box
                sx={{
                  mt: 4,
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: "#f8fafc",
                  border: "1px solid #e5e7eb",
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  Next Steps
                </Typography>

                {[
                  "Check your Inbox.",
                  "If you don't see it, check your Spam or Junk folder.",
                  "Open the email and click the reset link.",
                  "Create your new password and sign in.",
                ].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 1.5,

                      "&:last-child": {
                        mb: 0,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "secondary.main",
                        flexShrink: 0,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "text.secondary",
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography
                sx={{
                  mt: 3,
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                Didn't receive the email?
              </Typography>

              <Page.MuiButton
                variant="text"
                color="secondary"
                disabled={timeout > 0}
                onClick={async () => {
                  await sendOTP();
                  updateTimeout(30);
                }}
                sx={{
                  mt: 0.5,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                {timeout > 0 ? `Resend in ${timeout}s` : "Resend Reset Link"}
              </Page.MuiButton>
            </Box>
          )}
        </Grid>
        <Grid>
          <Box
            sx={{
              pt: 3,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ArrowBackIcon
              sx={{
                fontSize: 18,
                color: "secondary.main",
              }}
            />

            <Typography
              onClick={() => setCardType("login")}
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                cursor: "pointer",

                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Back to Sign In
            </Typography>
          </Box>
          {stage !== "otp" && (
            <Box
              sx={{
                mt: 2,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                }}
              >
                Don't have an account?
              </Typography>

              <Typography
                onClick={() => {
                  onClose();
                  setCardType("login");
                  setOpenSignUp(true);
                }}
                sx={{
                  mt: 0.5,
                  color: "secondary.main",
                  fontWeight: 700,
                  cursor: "pointer",

                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Create Account
              </Typography>
            </Box>
          )}
        </Grid>
      </Page.Box>
    </Page.Card>
  );
}
