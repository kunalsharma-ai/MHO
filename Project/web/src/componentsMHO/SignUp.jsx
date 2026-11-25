"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Stack,
  Box,
  IconButton,
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  Tooltip,
  Collapse,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  Male as MaleIcon,
  Female as FemaleIcon,
  Transgender as OtherIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
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
import { motion, AnimatePresence } from "framer-motion";
import PopUp from "./PopUp";
import { Form, RequiredLabel } from "@/components";
import SocialSignIn from "./SocialSignIn";
import { api, loadData, Page } from "@/util";
import user from "@/validators/user";
import { useToast } from "@/hooks";
import { useMember, useQuery, useTelemetry } from "@/Context";
import MapComponent from "@/components/Map"; //Temporary Import
import HumanCheck from "@/components/HumanCheck";
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

function capitalizeName(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(/(\W+)/) // split but keep delimiters (spaces, -, ', etc.)
    .map((part) => {
      // capitalize only word parts
      if (/^\w/.test(part)) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      }
      return part;
    })
    .join("");
}
const today = new Date();
const socials = [
  {
    name: "linkedin",
    link: "https://www.linkedin.com/company/my-health-opinions/",
    icon: <LinkedIn sx={{ color: "#0077B5", fontSize: "28px" }} />,
  },
  {
    name: "facebook",
    link: "https://www.facebook.com/frequentrfs/",
    icon: <Facebook sx={{ color: "#1877F2", fontSize: "28px" }} />,
  },
  {
    name: "youtube",
    link: "https://www.youtube.com/channel/UCLxmn2kq4aACAHaL2eT6QIQ",
    icon: <YouTube sx={{ color: "#FF0000", fontSize: "28px" }} />,
  },
  {
    name: "twitter",
    link: "https://twitter.com/frequentrfs",
    icon: <X sx={{ color: "black", fontSize: "22px" }} />,
  },
];
const SALUTATION_OPTIONS = [
  { label: "Mr.", value: "Mr." },
  { label: "Mrs.", value: "Mrs." },
  { label: "Ms.", value: "Ms." },
  { label: "Mx.", value: "Mx." },
  { label: "Dr.", value: "Dr." },
  { label: "Prof.", value: "Prof." },
];
export default function SignUp({
  open,
  onClose,
  userType,
  setUserType,
  setOpenLogin,
  emailUnverified,
}) {
  const [telemetry, router] = [useTelemetry(), useRouter()];
  const [status, setStatus] = React.useState("signup"); // signup, success, duplicate
  const [isLoading, setIsLoading] = React.useState(false);
  const [country, setCountry] = React.useState("");
  const [categoryOptions, setCategoryOptions] = React.useState([]);
  const [query, member] = [useQuery(), useMember()];
  const [isInvalidUser, setIsInvalidUser] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const [captchaTries, setCaptchaTries] = React.useState(0);
  const human = React.useRef(null);
  const [salutationChange, setSalutationchange] = React.useState(false);
  const RESEND_SECONDS = 60;
  const [cooldown, setCooldown] = React.useState(0);
  const [socials, setSocials] = React.useState([]);
  React.useEffect(() => {
    loadData(api.get(`/api/v1/socials`), (resp) => {
      setSocials(
        resp.data
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
          })),
      );
    });
  }, []);
  const GENDER_SALUTATION_MAP = {
    Male: ["Mr.", "Dr.", "Prof."],
    Female: ["Ms.", "Mrs.", "Dr.", "Prof."],
    Other: ["Mx.", "Dr.", "Prof."],
  };
  React.useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);
  const progress = ((RESEND_SECONDS - cooldown) / RESEND_SECONDS) * 100;
  React.useEffect(() => {
    api
      .post(`/api/v1/category`, {
        showOnRegistration: true,
      })
      .then((resp) => {
        if (resp.status === "error") return useToast(resp);
        setCategoryOptions(
          resp.data.map((cat) => {
            return {
              label: capitalizeName(cat.name),
              value: cat.name,
              age: cat.age,
            };
          }),
        );
      });
  }, []);
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      marketingOptIn: false,
      category: "",
      name: {
        salutation: "",
        first: "",
        last: "",
      },
      gender: "",
      timezone: "",
      dob: "",
      mail: "",
      phone: "",
      address: [
        {
          tag: "home",
          country: "in",
        },
      ],
    },
  });
  const {
    control,
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isDirty },
  } = form;
  React.useEffect(() => {
    if (emailUnverified) {
      setStatus("unverified");
    }
  }, [emailUnverified]);

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
  React.useEffect(() => {
    let userInfo = form.getValues();
    if ("name" in query) {
      let name = query?.name.split(" ");
      switch (name.length) {
        case 1:
          userInfo.name.first = name[0];
          break;
        case 2:
          userInfo.name.first = name[0];
          userInfo.name.last = name[1];
          break;
        case 3:
          userInfo.name.first = name[0];
          userInfo.name.middle = name[1];
          userInfo.name.last = name[2];
          break;
        default:
          userInfo.name.first = name[0] ?? "";
          userInfo.name.last = name.at(-1) ?? "";
      }
    }
    if ("email" in query) userInfo.mail = query?.email;
    form.reset(userInfo);
  }, [query]);
  
  React.useEffect(() => {
    if (!telemetry) return;
    telemetry.timezone().then((timezone) => {
      form.setValue("timezone", timezone);
    });
    telemetry.ip().then((resp) => {
      if (resp.country) {
        form.setValue("address.0.country", resp.country.toLowerCase());
        setCountry(resp.country.toLowerCase());
      }
    });
  }, [telemetry]);
  React.useEffect(() => {
    form.setValue("category", userType);
  }, [userType]);

  const genderValue = form.watch("gender");
  const salutation = form.watch("name.salutation");

  React.useEffect(() => {
    if (!genderValue) return;
    const validSalutations = GENDER_SALUTATION_MAP[genderValue] || [];
    if (salutation && !validSalutations.includes(salutation)){
      form.setValue("name.salutation", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
      setFocus("name.salutation");
      return;
    }
    if (!salutation) {
    form.trigger("name.salutation"); 
    setFocus("name.salutation");
  }
   const selectedSalutation = SALUTATION_OPTIONS.find(
      (option) => option.value === salutation,
    );
    if (!selectedSalutation?.genderBased) return;
    if (!validSalutations.includes(salutation)) {
      setFocus("name.salutation");
    }
  }, [genderValue]);

  let minDOB = new Date();
  minDOB.setFullYear(minDOB.getFullYear() - 120);
  let maxDOB = new Date();
  maxDOB.setFullYear(maxDOB.getFullYear() - 13);
  const onSubmit = async (userData) => {
    setIsLoading(true);
    try {
      let { agreedtoterms, marketingOptIn, ...data } = userData;
      // "Send me news and offers": unticked by default; only a tick opts in
      data.marketingOptIn = marketingOptIn === true;
      if (Boolean(query?.ref) && query.ref !== "") data.referredBy = query.ref;
      let selectedCategory = categoryOptions.find(
        (cat) => cat.value === data.category,
      );
      if (Boolean(selectedCategory)) {
        let dob = data.dob;
        let newCategory = checkElligibility(dob, selectedCategory);
        if (newCategory === "terminate") {
          setIsInvalidUser(true);
          throw new Error("Invalid request");
        }
        data.category = newCategory;
      }
      data.captcha = human.current;
      const temp = await api.put("api/v1/user", data);
      if (temp?.status != "success") setCaptchaTries((n) => n + 1); // the check is spent
      if (temp?.status == "success") setStatus("success");
      else if (temp?.message?.includes("duplicate")) setStatus("duplicate");
    } catch (error) {
      console.error(error); setCaptchaTries((n) => n + 1);
      useToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  const category = form.watch("category");
  React.useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        onClose();
        router.replace("/");
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [status]);
  // return <pre>{ JSON.stringify(socials, null, 2) }</pre>
  return (
    <>
      <PopUp
        open={open}
        onExited={() => {
          setUserType(null);
        }}
        onClose={() => {
          onClose();
        }}
        hideTitle={true}
        noBorder={true}
        sx={{
          width: "100vw",
          height: "100vh",
          // bgcolor: "#a5f4ce",
          bgcolor: "transparent",
          color: "white",
        }}
        DialogSx={{
          "& .MuiDialog-paper": {
            width: "min(1320px,96vw)",
            // height: { md: "88vh" },
            maxHeight: "98vh",
            margin: 0,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 35px 80px rgba(0,0,0,.25)",
          },
        }}
        maxWidth={status !== "signup" ? "md" : "xl"}
        children={
          <>
            {status == "signup" && (
              <Grid
                size={12}
                container
                sx={{
                  width: "100%",
                  height: { xs: "90vh", lg: "88vh" },
                  overflow: "hidden",
                  bgcolor: "#fff",
                  borderRadius: 4,
                }}
              >
                <MotionGrid
                  initial={{
                    opacity: 0,
                    x: -40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  size={{ xs: 0, md: 7 }}
                  sx={{
                    display: { xs: "none", md: "block" },
                    position: "relative",
                    overflow: "hidden",
                    background: `
                                            linear-gradient(
                                            180deg,
                                            rgba(1,35,98,.25) 0%,
                                            rgba(1,35,98,.45) 35%,
                                            rgba(1,35,98,.82) 100%
                                            )
                                            `,
                  }}
                >
                  <Box
                    component="img"
                    src="/images/home/signup-image5.jpg"
                    alt=""
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg,rgba(1,35,98,.35),rgba(1,35,98,.82))",
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
                      py: 4,
                      color: "#fff",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: 30, xl: 48 },
                            fontWeight: 800,
                            lineHeight: 1.15,
                            maxWidth: 660,
                          }}
                        >
                          Your Voice Shapes the Future of Healthcare
                        </Typography>
                        <Typography
                          sx={{
                            mt: { xs: 2, xl: 3 },
                            fontSize: { lg: 15, xl: 18 },
                            lineHeight: 1.8,
                            maxWidth: 520,
                            opacity: 0.92,
                          }}
                        >
                          Join a global community of healthcare professionals,
                          patients and caregivers contributing to research that
                          improves lives while earning rewards for every
                          completed study.
                        </Typography>
                      </Box>
                    </Box>
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
                          label: "Research Studies",
                        },
                        {
                          number: "100%",
                          label: "Confidential",
                        },
                      ].map((item, index) => (
                        <MotionGrid
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.5 + index * 0.08,
                          }}
                          key={item.label}
                          size={6}
                        >
                          <Box
                            sx={{
                              py: { md: 1, xl: 2.5 },
                              px: 2.5,
                              borderRadius: 3,
                              bgcolor: "rgba(255,255,255,.04)",
                              backdropFilter: "blur(2px)",
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
                </MotionGrid>
                <Grid
                  size={{ xs: 12, md: 5 }}
                  container
                  sx={{
                    height: "100%",
                    borderLeft: "1px solid #eef2f7",
                    bgcolor: "#fff",
                    overflowY: "auto",
                    overflowX: "hidden",
                    position: "relative",
                  }}
                >
                  <Grid
                    size={12}
                    container
                    sx={{
                      position: "sticky",
                      top: 0,
                      zIndex: 20,
                      px: 4,
                      py: 2,
                      mb: 1,
                      bgcolor: "rgba(255,255,255,.92)",
                      backdropFilter: "blur(16px)",
                      borderBottom: "1px solid #eef2f7",
                    }}
                  >
                    {" "}
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
                          Create your account
                        </Typography>
                        <Typography
                          sx={{
                            mt: 0.5,
                            color: "text.secondary",
                            fontSize: { xs: 12, xl: 14 },
                          }}
                        >
                          Create your free account to start participating in
                          paid healthcare research.
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
                  </Grid>
                  <MotionGrid
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                    }}
                    component="form"
                    size={12}
                    container
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                      flex: 1,
                      overflowY: "auto",
                      overflowX: "hidden",
                      px: { xs: 3, md: 4 },
                      pb: 4,
                      pt: 2,
                    }}
                  >
                    <Grid container size={12} spacing={2.5}>
                      {!userType && (
                        <Grid size={12}>
                          <Typography
                            sx={{
                              mb: 1,
                              fontWeight: 600,
                              color: "text.primary",
                            }}
                          >
                            Select your profile
                          </Typography>
                          <AccountTypeButtonGroup
                            control={control}
                            name="category"
                            errors={errors?.category}
                            validations={user.category}
                            options={categoryOptions}
                          />
                        </Grid>
                      )}
                      <Grid size={{ xs: 12, md: 3 }}>
                        <Form.Select
                          {...register("name.salutation")}
                          control={control}
                          options={
                            genderValue
                              ? SALUTATION_OPTIONS.filter((option) =>
                                  GENDER_SALUTATION_MAP[genderValue]?.includes(
                                    option.value,
                                  ),
                                )
                              : SALUTATION_OPTIONS
                          }
                          labelText="Sal."
                          errors={errors?.name?.salutation}
                          validations={user.name.salutation}
                          required={true}
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
                      </Grid>
                      <Grid size={{ xs: 12, md: 4.5 }}>
                        <Form.Input
                          {...register("name.first")}
                          control={control}
                          labelText="First Name"
                          required={true}
                          errors={errors?.name?.first}
                          validations={user.name.first}
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
                      </Grid>
                      <Grid size={{ xs: 12, md: 4.5 }}>
                        <Form.Input
                          {...register("name.last")}
                          control={control}
                          labelText="Last Name"
                          required={true}
                          errors={errors?.name?.last}
                          validations={user.name.last}
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
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Form.Input
                          {...register("mail")}
                          control={control}
                          labelText="Email"
                          required={true}
                          errors={errors?.mail}
                          validations={user.email}
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
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Form.Phone
                          {...register("phone")}
                          control={control}
                          labelText="Phone"
                          onlyCountries={[country]}
                          selectedCountry={country}
                          disableDropdown={Boolean(country)}
                          validations={user.phone}
                          errors={errors?.phone}
                          onBlur={(e) => {
                            console.log(form.getValues());
                          }}
                          sx={{
                            inputStyle: {
                              height: "54px",
                              borderRadius: "12px",
                              background: "#fff",
                              transition: ".25s",
                              boxShadow: "none",
                            },
                            buttonStyle: {
                              borderTopLeftRadius: "12px",
                              borderBottomLeftRadius: "12px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Form.Date
                          {...register("dob")}
                          control={control}
                          labelText="Date of Birth"
                          required
                          dateRange={[minDOB, maxDOB]}
                          errors={errors?.dob}
                          validations={user.dob}
                          sx={{
                            "& .MuiPickersInputBase-root": {
                              height: 54,
                              borderRadius: 3,
                              backgroundColor: "#fff",
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
                      <Grid size={{ xs: 12, md: 6 }}>
                        <GenderRadioGroup
                          name={"gender"}
                          control={control}
                          label="Gender"
                          errors={errors?.gender}
                          validations={user.gender}
                        />
                      </Grid>

                      <Grid
                        sx={{
                          py: 1,
                          my: 1,
                          px: 2,
                          border: "1px solid",
                          borderColor: "divider",
                          bgcolor: "#fff",
                          borderRadius: 2,
                        }}
                        size={12}
                        container
                        direction="row"
                        alignItems="center"
                      >
                        <HumanCheck resetKey={captchaTries} onChange={(v) => { human.current = v; setBtnDisabled(!v); }} />
                      </Grid>

                      <Grid size={12} mt={1}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                            p: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                            bgcolor: "#fafbfc",
                            transition: ".25s",
                            "&:hover": {
                              borderColor: "secondary.light",
                              bgcolor: "#fff",
                            },
                          }}
                        >
                          <Form.Checkbox
                            size="medium"
                            {...register("agreedtoterms")}
                            control={control}
                            sx={{
                              mt: 0.25,
                            }}
                          />
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 14,
                              color: "text.secondary",
                              lineHeight: 1.8,
                            }}
                          >
                            I agree for{" "}
                            <Typography
                              component="span"
                              sx={{
                                fontWeight: 600,
                                color: "primary.main",
                              }}
                            >
                              MyHealth
                            </Typography>
                            <Typography
                              component="span"
                              sx={{
                                fontWeight: 600,
                                color: "secondary.main",
                              }}
                            >
                              Opinions
                            </Typography>{" "}
                            to use my information for determining my eligibility
                            and contacting me regarding market research surveys.
                            I also agree to the{" "}
                            <Typography
                              component="a"
                              href="/terms"
                              target="_blank"
                              sx={{
                                color: "secondary.main",
                                fontWeight: 600,
                                textDecoration: "none",
                                "&:hover": {
                                  textDecoration: "underline",
                                },
                              }}
                            >
                              Terms & Conditions
                            </Typography>{" "}
                            and{" "}
                            <Typography
                              component="a"
                              href="/privacy"
                              target="_blank"
                              sx={{
                                color: "secondary.main",
                                fontWeight: 600,
                                textDecoration: "none",
                                "&:hover": {
                                  textDecoration: "underline",
                                },
                              }}
                            >
                              Privacy Policy
                            </Typography>
                            .
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={12}>
                        <Form.Checkbox
                          size="medium"
                          name="marketingOptIn"
                          control={control}
                          label="Send me news and offers (optional)"
                        />
                      </Grid>
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ width: "100%" }}
                      >
                        <Page.MuiButton
                          fullWidth
                          type="submit"
                          variant="contained"
                          color="primary"
                          loading={isLoading}
                          loadingIndicator="Creating your account..."
                          disabled={btnDisabled || !form.watch("agreedtoterms")}
                          sx={{
                            mt: 3,
                            height: 56,
                            borderRadius: 3,
                            fontSize: 16,
                            fontWeight: 700,
                            textTransform: "none",
                            color: "#fff",
                            background:
                              "linear-gradient(135deg,#012362 0%,#0b4bb3 100%)",
                            boxShadow: "0 12px 30px rgba(1,35,98,.22)",
                            transition: ".3s",
                            "&:hover": {
                              background:
                                "linear-gradient(135deg,#001b55 0%,#063686 100%)",
                              transform: "translateY(-2px)",
                              boxShadow: "0 18px 40px rgba(1,35,98,.30)",
                            },
                            "&:active": {
                              transform: "translateY(0)",
                            },
                            "&.Mui-disabled": {
                              color: "#fff",
                              background: "#cbd5e1",
                              boxShadow: "none",
                            },
                          }}
                        >
                          Sign Up
                        </Page.MuiButton>
                      </motion.div>
                      {!query?.email && (
                        <>
                          <Grid size={12}><SocialSignIn label="Or sign up with" /></Grid>
                        </>
                      )}
                      <Grid size={12} mt={2}>
                        <Box
                          sx={{
                            py: 2.5,
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
                            Already have an account?
                          </Typography>
                          <Typography
                            onClick={() => {
                              onClose();
                              setOpenLogin(true);
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
                            Sign In
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      size={12}
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
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Page.Text
                        sx={{ fontSize: "13px", color: "text.secondary" }}
                      >
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
                  </MotionGrid>
                </Grid>
              </Grid>
            )}
            {status == "success" && (
              <Grid
                size={12}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: "100%",
                    // maxWidth: 720,
                    textAlign: "center",
                    p: { xs: 3, md: 5 },
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "#e8edf5",
                    boxShadow: "0 20px 60px rgba(0,0,0,.08)",
                    bgcolor: "#fff",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 90,
                      height: 90,
                      bgcolor: "#eafaf2",
                      color: "#1ba96b",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 54 }} />
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: { xs: 28, md: 34 },
                      fontWeight: 700,
                      color: "primary.main",
                    }}
                  >
                    Registration Successful!
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: 17,
                      color: "text.secondary",
                    }}
                  >
                    Welcome to{" "}
                    <Box
                      component="span"
                      sx={{
                        color: "secondary.main",
                        fontWeight: 700,
                      }}
                    >
                      My Health Opinions
                    </Box>
                  </Typography>
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
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
                      What's next?
                    </Typography>
                    <Stack spacing={2}>
                      {[
                        "Check your Inbox or Spam folder.",
                        "Click the verification link in the email.",
                        "Create your password.",
                        "Start participating in paid healthcare surveys.",
                      ].map((item) => (
                        <Box
                          key={item}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              color: "secondary.main",
                              fontSize: 20,
                            }}
                          />
                          <Typography>{item}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                  <Page.MuiButton
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                    sx={{
                      mt: 4,
                      px: 5,
                      height: 54,
                      borderRadius: 3,
                      fontWeight: 700,
                      textTransform: "none",
                      color: "#fff",
                    }}
                  >
                    Go to Home
                  </Page.MuiButton>
                  <Typography
                    sx={{
                      mt: 3,
                      fontSize: 13,
                      color: "text.secondary",
                    }}
                  >
                    This window will automatically close in 30 seconds.
                  </Typography>
                </Box>
              </Grid>
            )}
            {status == "duplicate" && (
              <Grid
                size={12}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: "100%",
                    p: { xs: 3, md: 5 },
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "#e8edf5",
                    boxShadow: "0 20px 60px rgba(0,0,0,.08)",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 90,
                      height: 90,
                      mx: "auto",
                      mb: 3,
                      bgcolor: "#fff7e6",
                      color: "#fe7e00",
                    }}
                  >
                    <ErrorIcon sx={{ fontSize: 52 }} />
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: { xs: 28, md: 34 },
                      fontWeight: 700,
                      color: "primary.main",
                    }}
                  >
                    Email Already Registered
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1,
                      color: "text.secondary",
                      fontSize: 16,
                      lineHeight: 1.8,
                    }}
                  >
                    We found an account associated with this email address.
                  </Typography>
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      borderRadius: 3,
                      bgcolor: "#fafbfc",
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
                      What should you do?
                    </Typography>
                    <Stack spacing={2}>
                      <Box display="flex" gap={1.5}>
                        <CheckCircleIcon color="secondary" />
                        <Typography>
                          Check your Inbox or Spam folder for your verification
                          email.
                        </Typography>
                      </Box>
                      <Box display="flex" gap={1.5}>
                        <CheckCircleIcon color="secondary" />
                        <Typography>
                          If the verification link has expired, request a new
                          verification email below.
                        </Typography>
                      </Box>
                      <Box display="flex" gap={1.5}>
                        <CheckCircleIcon color="secondary" />
                        <Typography>
                          Once verified, you'll be able to create your password
                          and sign in.
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                    mt={4}
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Page.MuiButton
                        variant="contained"
                        color="secondary"
                        disabled={cooldown > 0}
                        onClick={async () => {
                          let resp = await api.post(`/api/v1/user/resend`, {
                            ...form.watch(),
                            mail: emailUnverified || form.watch("mail"),
                            action: "resend-otp",
                          });
                          useToast(resp);
                          setCooldown(RESEND_SECONDS);
                        }}
                        sx={{
                          minWidth: 260,
                          height: 54,
                          borderRadius: 3,
                          color: "#fff",
                          fontWeight: 700,
                          textTransform: "none",
                        }}
                      >
                        {cooldown > 0
                          ? `Resend in ${cooldown}s`
                          : "Resend Verification Email"}
                      </Page.MuiButton>
                    </motion.div>
                    <Page.MuiButton
                      variant="outlined"
                      color="primary"
                      onClick={onClose}
                      sx={{
                        minWidth: 180,
                        height: 54,
                        borderRadius: 3,
                        fontWeight: 700,
                        textTransform: "none",
                      }}
                    >
                      Go Home
                    </Page.MuiButton>
                  </Stack>
                  {cooldown > 0 && (
                    <Typography
                      sx={{
                        mt: 2,
                        color: "text.secondary",
                        fontSize: 13,
                      }}
                    >
                      You can request another verification email once the
                      countdown finishes.
                    </Typography>
                  )}
                </Box>
              </Grid>
            )}
            {status == "unverified" && (
              <Grid
                size={12}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: "100%",
                    p: { xs: 3, md: 5 },
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "#e8edf5",
                    boxShadow: "0 20px 60px rgba(0,0,0,.08)",
                    textAlign: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 90,
                      height: 90,
                      mx: "auto",
                      mb: 3,
                      bgcolor: "#fff7e6",
                      color: "#fe7e00",
                    }}
                  >
                    <ErrorIcon sx={{ fontSize: 52 }} />
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: { xs: 28, md: 34 },
                      fontWeight: 700,
                      color: "primary.main",
                    }}
                  >
                    Almost There! Let's Get You Started
                  </Typography>

                  <Box
                    sx={{
                      mt: 1,
                      p: 3,
                      borderRadius: 3,
                      bgcolor: "#fafbfc",
                      border: "1px solid #e5e7eb",
                      textAlign: "left",
                    }}
                  >
                    <Stack spacing={2}>
                      <Box display="flex" gap={1.5}>
                        <Typography>
                          Welcome! We're excited to have you. To make sure your
                          account is secure and ready for surveys, you just need
                          to verify your email address.
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                        }}
                      >
                        What should you do?
                      </Typography>
                      <Box display="flex" gap={1.5} sx={{ mt: 1 }}>
                        <CheckCircleIcon color="secondary" />
                        <Typography>
                          Please check your inbox (and Spam folder) for your
                          unique verification link.
                        </Typography>
                      </Box>
                      <Box display="flex" gap={1.5}>
                        <CheckCircleIcon color="secondary" />
                        <Typography>
                          Clicking this link will activate your account,
                          allowing you to create a password and start accessing
                          opportunities right away!
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                    mt={4}
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Page.MuiButton
                        variant="contained"
                        color="secondary"
                        disabled={cooldown > 0}
                        onClick={async () => {
                          let resp = await api.post(`/api/v1/user/resend`, {
                            ...form.watch(),
                            mail: emailUnverified || form.watch("mail"),
                            action: "resend-otp",
                          });
                          useToast(resp);
                          setCooldown(RESEND_SECONDS);
                        }}
                        sx={{
                          minWidth: 260,
                          height: 54,
                          borderRadius: 3,
                          color: "#fff",
                          fontWeight: 700,
                          textTransform: "none",
                        }}
                      >
                        {cooldown > 0
                          ? `Resend in ${cooldown}s`
                          : "Resend Verification Email"}
                      </Page.MuiButton>
                    </motion.div>
                    <Page.MuiButton
                      variant="outlined"
                      color="primary"
                      onClick={onClose}
                      sx={{
                        minWidth: 180,
                        height: 54,
                        borderRadius: 3,
                        fontWeight: 700,
                        textTransform: "none",
                      }}
                    >
                      Go Home
                    </Page.MuiButton>
                  </Stack>
                  {cooldown > 0 && (
                    <Typography
                      sx={{
                        mt: 2,
                        color: "text.secondary",
                        fontSize: 13,
                      }}
                    >
                      You can request another verification email once the
                      countdown finishes.
                    </Typography>
                  )}
                </Box>
              </Grid>
            )}
          </>
        }
      />
      <InvalidUserPopup
        open={isInvalidUser}
        onClose={() => {
          setIsInvalidUser(false);
        }}
      />
    </>
  );
}
function GenderRadioGroup({
  name,
  errors,
  control,
  label = "Gender",
  validations,
  isDisabled = false,
}) {
  const hasError = !!errors;
  const errorMessage = errors?.message;
  const options = [
    { label: "Male", value: "Male", icon: <MaleIcon /> },
    { label: "Female", value: "Female", icon: <FemaleIcon /> },
    { label: "Other", value: "Other", icon: <OtherIcon /> },
  ];
  return (
    <Controller
      name={name}
      control={control}
      rules={validations}
      render={({ field }) => (
        <FormControl
          component="fieldset"
          error={hasError}
          disabled={isDisabled}
          fullWidth
          sx={{
            display: "flex",
          }}
        >
          <Grid size={12} container direction="column" spacing={0}>
            <Typography sx={{ fontWeight: 500, color: "#555" }}>
              {validations?.required ? <RequiredLabel label={label} /> : label}:
            </Typography>
            <RadioGroup
              row
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1.5,
                width: "100%",
              }}
            >
              {options.map((option) => {
                const selected = field.value === option.value;
                return (
                  <Box
                    key={option.value}
                    onClick={() => field.onChange(option.value)}
                    sx={{
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <Radio
                      value={option.value}
                      checked={selected}
                      sx={{ display: "none" }}
                    />
                    <Tooltip title={option.value} placement="top">
                      <Box
                        sx={{
                          height: 54,
                          width: "100%",
                          borderRadius: 2,
                          border: (theme) =>
                            `1px solid ${
                              selected
                                ? theme.palette.secondary.main
                                : theme.palette.secondary.light
                            }`,
                          bgcolor: selected ? "secondary.dark" : "#fff",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: ".25s",
                          "&:hover": {
                            borderColor: "secondary.main",
                            bgcolor: selected
                              ? "secondary.main"
                              : "secondary.light",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            color: selected ? "#fff" : "secondary.main",
                            "& svg": {
                              fontSize: 28,
                            },
                          }}
                        >
                          {option.icon}
                        </Box>
                        {/* <Typography
                        sx={{
                          mt: 0.5,
                          fontWeight: 600,
                          fontSize: 13,
                          color: selected ? "#fff" : "text.primary",
                          }}
                          >
                          {option.label}
                      </Typography> */}
                      </Box>
                    </Tooltip>
                  </Box>
                );
              })}
            </RadioGroup>
          </Grid>
          {hasError && errorMessage && (
            <FormHelperText sx={{ fontSize: "12px", mx: 0 }}>
              {errorMessage}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
function AccountTypeButtonGroup({
  name = "category",
  control,
  validations,
  errors,
  options,
  isDisabled = false,
}) {
  const hasError = !!errors;
  const icons = {
    "healthcare professional": "/images/home/forms/doctor-type.png",
    patient: "/images/home/forms/patient-type.png",
    caregiver: "/images/home/forms/caregiver.png",
    "care giver": "/images/home/forms/caregiver.png",
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={validations}
      render={({ field }) => (
        <FormControl fullWidth error={hasError} disabled={isDisabled}>
          <Grid container spacing={2}>
            {options.map((option) => {
              const selected = field.value === option.value;
              return (
                <Grid key={option.value} size={{ xs: 12, lg: 4 }}>
                  <MotionBox
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() => field.onChange(option.value)}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 3,
                      border: selected ? "2px solid" : "1px solid",
                      borderColor: selected ? "secondary.main" : "#e5e7eb",
                      bgcolor: selected ? "rgba(254,126,0,.08)" : "#fff",
                      transition: ".3s",
                      p: 2.5,
                      height: "100%",
                      "&:hover": {
                        borderColor: "secondary.main",
                        transform: "translateY(-3px)",
                        boxShadow: "0 12px 35px rgba(0,0,0,.08)",
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Avatar
                        src={icons[option.value.toLowerCase()]}
                        sx={{
                          width: 58,
                          height: 58,
                          bgcolor: "#fff",
                        }}
                      />
                      {selected && <CheckCircleIcon color="secondary" />}
                    </Box>
                    <Typography mt={2} fontWeight={700} fontSize={17}>
                      {option.label}
                    </Typography>
                    <Typography
                      mt={0.5}
                      color="text.secondary"
                      fontSize={13}
                      lineHeight={1.6}
                    >
                      {option.value.toLowerCase().includes("professional")
                        ? "Participate as a medical professional."
                        : option.value.toLowerCase().includes("patient")
                          ? "Share your healthcare experience."
                          : "Provide valuable caregiver insights."}
                    </Typography>
                  </MotionBox>
                </Grid>
              );
            })}
          </Grid>
          {errors?.message && <FormHelperText>{errors.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
function checkElligibility(dob, selectedCategory) {
  if (!dob) return;
  if (!selectedCategory) return;
  let tempDate = dob.toDate();
  let age = new Date().getFullYear() - tempDate.getFullYear();
  if (selectedCategory?.age?.min > age)
    return selectedCategory?.age?.underfall ?? "terminate";
  if (selectedCategory?.age?.max < age)
    return selectedCategory?.age?.overfall ?? "terminate";
  return selectedCategory.value;
}
function InvalidUserPopup({ open, onClose }) {
  return (
    <PopUp
      open={open}
      onClose={onClose}
      DialogSx={{ zIndex: 9999 }}
      hideTitle={true}
      maxWidth={"md"}
    >
      <Grid size={12} container direction="column" alignItems="center" p={3}>
        <Page.Text color="error" variant="h6" p={2} fontWeight={600}>
          Access Denied – Professional Registration Not Allowed
        </Page.Text>
        <Page.Box>
          <Page.Text sx={{ mb: 2 }}>
            We appreciate your interest in joining our healthcare professional
            panel.
          </Page.Text>
          <Page.Text sx={{ mb: 2 }}>
            However, based on the information provided, you do not meet the
            minimum age requirement to register as a verified healthcare
            professional on this platform.
          </Page.Text>
          <Page.Text sx={{ mb: 1 }}>
            To ensure compliance with legal, ethical, and professional
            standards, only individuals who:
          </Page.Text>
          <Page.Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <Page.Text component="li">Are 18 years or older, and</Page.Text>
            <Page.Text component="li">
              Hold valid medical qualifications and certifications,
            </Page.Text>
          </Page.Box>
          <Page.Text sx={{ mb: 2 }}>
            Are permitted to register and access this panel.
          </Page.Text>
          <Page.Text
            sx={{
              color: "#d9534f",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Your registration process has been safely terminated, and no account
            has been created.
          </Page.Text>
          <Page.Text sx={{ mb: 1 }}>
            For more information, visit our policy page:
          </Page.Text>
          <Page.Link
            href="https://www.myhealthopinions.com/privacy"
            target="_blank"
            rel="noopener"
            sx={{ display: "block", mb: 2, color: "#0c5adb" }}
          >
            https://www.myhealthopinions.com/privacy
          </Page.Link>
          <Page.Text sx={{ mb: 1 }}>This policy helps us:</Page.Text>
          <Page.Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Page.Text>
                Maintain trust and authenticity within the healthcare community
              </Page.Text>
            </li>
            <li>
              <Page.Text>Ensure patient safety and data protection</Page.Text>
            </li>
            <li>
              <Page.Text>
                Comply with applicable laws and medical regulations
              </Page.Text>
            </li>
          </Page.Box>
          <Page.Box sx={{ mt: 3 }}>
            <Page.Text sx={{ fontWeight: "bold", mb: 1 }} color="secondary">
              Need Help?
            </Page.Text>
            <Page.Text sx={{ mb: 1 }}>
              If you believe this restriction has been applied in error or have
              any questions, please contact our support team:
            </Page.Text>
            <Page.Text>
              Email us:{" "}
              <Page.Link
                href="mailto:support@myhealthopinions.com"
                sx={{ color: "#0c5adb" }}
              >
                support@myhealthopinions.com
              </Page.Link>
            </Page.Text>
          </Page.Box>
        </Page.Box>
        <Page.MuiButton
          variant="contained"
          color="secondary"
          onClick={onClose}
          size="large"
          sx={{ my: 2, fontWeight: 600 }}
        >
          OK
        </Page.MuiButton>
      </Grid>
    </PopUp>
  );
}
