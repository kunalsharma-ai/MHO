"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Avatar,
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
} from "@mui/icons-material";

import PopUp from "./PopUp";
import { Form, RequiredLabel } from "@/components";
import { api, Page } from "@/util";
import user from "@/validators/user";
import { useToast } from "@/hooks";
import { useMember, useQuery, useTelemetry } from "@/Context";
import MapComponent from "@/components/Map"; //Temporary Import
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

export default function SignUp({
  open,
  onClose,
  userType,
  setUserType,
  setOpenLogin,
}) {
  const [telemetry, router] = [useTelemetry(), useRouter()];
  const [status, setStatus] = React.useState("signup"); // signup, success, duplicate
  const [isLoading, setIsLoading] = React.useState(false);
  const [country, setCountry] = React.useState("");
  const [categoryOptions, setCategoryOptions] = React.useState([]);
  const [query, member] = [useQuery(), useMember()];
  const [isInvalidUser, setIsInvalidUser] = React.useState(false);

  const RESEND_SECONDS = 60;

  const [cooldown, setCooldown] = React.useState(0);

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
    defaultValues: {
      category: "",
      name: {
        salutation: "Mr.",
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
    formState: { errors, isDirty },
  } = form;

  const [providers, setProviders] = React.useState([]);
  React.useEffect(() => {
    api.post("/api/v1/auth/socials", {}).then((resp) => {
      setProviders(resp?.data ?? []);
    });
  }, []);

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
  let minDOB = new Date();
  minDOB.setFullYear(minDOB.getFullYear() - 120);
  let maxDOB = new Date();
  maxDOB.setFullYear(maxDOB.getFullYear() - 13);

  const onSubmit = async (userData) => {
    setIsLoading(true);
    try {
      let { agreedtoterms, ...data } = userData;
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
      const temp = await api.put("api/v1/user", data);
      if (temp?.status == "success") setStatus("success");
      else if (temp?.message?.includes("duplicate")) setStatus("duplicate");
    } catch (error) {
      console.error(error);
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
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [status]);

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
          bgcolor: "#a5f4ce",
          color: "white",
        }}
        DialogSx={{
          "& .MuiDialog-paper": {
            width: "100vw",
            margin: {
              xs: 1,
              sm: "32px",
            },
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
                  maxHeight: { xs: "90vh", lg: "75vh" },
                  overflow: "hidden",
                  border: 1.5,
                  borderColor: "#33aaca",
                }}
              >
                <Grid size={{ xs: 0, md: 7.5 }} container>
                  <img
                    width={"100%"}
                    // src="images/Professional/personnel-department-specialist.jpg"
                    src="images/home/signup-image5.jpg"
                    loading="eager"
                    alt=""
                    style={{
                      objectFit: "cover",
                      backgroundColor: "white",
                      filter: "brightness(85%)",
                    }}
                  />
                </Grid>
                <Grid
                  size={{ xs: 12, md: 4.5 }}
                  container
                  sx={{
                    maxHeight: { xs: "90vh", lg: "75vh" },
                    overflowY: "auto",
                    position: "relative",
                  }}
                >
                  <Grid
                    size={12}
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      position: "sticky",
                      bgcolor: "#f1f4f9",
                      zIndex: 4444,
                      top: 0,
                      right: 0,
                      px: 2,
                    }}
                  >
                    <Page.Box
                      sx={{
                        height: { xs: "60px", lg: "100px" },
                        width: { xs: "180px", lg: "300px" },
                      }}
                    >
                      <img
                        src="/images/logo/My-Health-Opinions1500-500.png"
                        alt="logo"
                        height="100%"
                        width="100%"
                      />
                    </Page.Box>
                    <IconButton
                      sx={{
                        "&:hover": { color: "red" },
                      }}
                      onClick={onClose}
                    >
                      <CloseIcon
                        sx={{ fontSize: { xs: "16px", md: "26px" } }}
                      />
                    </IconButton>
                  </Grid>
                  <Grid
                    component="form"
                    size={12}
                    container
                    direction="column"
                    alignItems="center"
                    onSubmit={handleSubmit(onSubmit, (errors) => {
                      console.log(errors);
                    })}
                    spacing={0}
                    sx={{
                      px: { xs: 2, md: 4 },
                      pb: 4,
                    }}
                  >
                    <Page.Text
                      sx={{
                        alignSelf: "flex-start",
                        textAlign: "center",
                        fontSize: { xs: "18px", md: "26px" },
                        fontWeight: 600,
                        color: "#016550",

                        my: 2,
                      }}
                    >
                      Signup
                    </Page.Text>
                    <Grid size={12} container direction="column" spacing={1.2}>
                      {!userType && (
                        <Grid size={12}>
                          <Page.Text
                            sx={{ fontWeight: 500, color: "#555", mb: 0.5 }}
                          >
                            Please select your identity{" "}
                            <span style={{ color: "red" }}>*</span>
                          </Page.Text>
                          <AccountTypeButtonGroup
                            control={control}
                            name="category"
                            errors={errors?.category}
                            validations={user.category}
                            options={categoryOptions}
                          />
                        </Grid>
                      )}
                      <Grid size={12}>
                        <Form.Select
                          {...register("name.salutation")}
                          control={control}
                          options={[
                            { value: "Mr.", label: "Mr." },
                            { value: "Ms.", label: "Ms." },
                            { value: "Mrs.", label: "Mrs." },
                            { value: "Dr.", label: "Dr." },
                            { value: "Prof.", label: "Prof." },
                            { value: "Mx. ", label: "Mx." },
                          ]}
                          labelText="Salutation"
                        />
                      </Grid>
                      <Grid size={12}>
                        <Form.Input
                          {...register("name.first")}
                          control={control}
                          labelText="First Name"
                          required={true}
                          errors={errors?.name?.first}
                          validations={user.name.first}
                        />
                      </Grid>
                      <Grid size={12}>
                        <Form.Input
                          {...register("name.last")}
                          control={control}
                          labelText="Last Name"
                          required={true}
                          errors={errors?.name?.last}
                          validations={user.name.last}
                        />
                      </Grid>
                      <GenderRadioGroup
                        name={"gender"}
                        control={control}
                        label="Gender"
                        errors={errors?.gender}
                        validations={user.gender}
                      />
                      <Grid size={12}>
                        <Form.Date
                          {...register("dob")}
                          control={control}
                          labelText="Date of Birth"
                          required={true}
                          dateRange={[minDOB, maxDOB]}
                          errors={errors?.dob}
                          validations={user.dob}
                        />
                      </Grid>
                      <Grid size={12}>
                        <Form.Input
                          {...register("mail")}
                          control={control}
                          labelText="Email"
                          required={true}
                          errors={errors?.mail}
                          validations={user.email}
                        />
                      </Grid>

                      <Grid size={12}>
                        <Form.Phone
                          {...register("phone")}
                          control={control}
                          labelText="Phone"
                          // onlyCountries={ [country] }
                          selectedCountry={country}
                          disableDropdown={Boolean(country)}
                          validations={user.phone}
                          errors={errors?.phone}
                          onBlur={(e) => {
                            console.log(form.getValues());
                          }}
                        />
                      </Grid>

                      <Grid
                        size={12}
                        container
                        spacing={0}
                        alignItems="flex-start"
                        mt={3}
                      >
                        <Form.Checkbox
                          size="medium"
                          {...register("agreedtoterms")}
                          control={control}
                        />
                        <Typography sx={{ flex: 1, ml: -1.5 }}>
                          I agree for My Health Opinions Panel to use my
                          information for the purposes of determining my
                          eligibility and for contacting me in relation to
                          participation in market research surveys. Also, I am
                          agreeing to{" "}
                          <Typography
                            component={"a"}
                            href="/terms"
                            target="_blank"
                            sx={{
                              textDecoration: "underline",
                              color: "#016550",
                            }}
                          >
                            Terms & Conditions
                          </Typography>{" "}
                          and{" "}
                          <Typography
                            component={"a"}
                            href="/privacy"
                            target="_blank"
                            sx={{
                              textDecoration: "underline",
                              color: "#016550",
                            }}
                          >
                            Privacy Policy.
                          </Typography>
                        </Typography>
                      </Grid>
                      <Page.MuiButton
                        type="submit"
                        variant="contained"
                        color="secondary"
                        loading={isLoading}
                        loadingIndicator="Signing Up..."
                        disabled={!Boolean(form.watch("agreedtoterms"))}
                        sx={{
                          bgcolor: "#016550",
                          mt: 2,
                          mb: 1,
                          p: 1,
                          fontSize: 14,
                          fontWeight: 600,
                          textTransform: "none",
                          color: "white",
                        }}
                      >
                        Sign Up
                      </Page.MuiButton>
                      {!query?.email && (
                        <>
                          {authProviders.length > 0 && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                my: 0.5,
                              }}
                            >
                              <Box
                                sx={{
                                  flex: 1,
                                  height: "1px",
                                  bgcolor: "divider",
                                }}
                              />

                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  fontSize: 13,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                or continue with
                              </Typography>

                              <Box
                                sx={{
                                  flex: 1,
                                  height: "1px",
                                  bgcolor: "divider",
                                }}
                              />
                            </Box>
                          )}
                          {authProviders.length <= 2 ? (
                            <Box display="flex" flexDirection="column" gap={1}>
                              {authProviders.map((provider, i) => (
                                <Page.MuiButton
                                  component={"a"}
                                  href={provider.href}
                                  key={i}
                                  fullWidth
                                  variant="outlined"
                                  color="primary"
                                  startIcon={provider.icon}
                                  sx={{
                                    borderRadius: "8px",
                                    padding: "9px",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    borderWidth: "1px",
                                    "&:hover": {
                                      borderWidth: "1px",
                                      backgroundColor: "transparent",
                                    },
                                  }}
                                >
                                  {provider.label}
                                </Page.MuiButton>
                              ))}
                            </Box>
                          ) : (
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              gap={{ xs: 0.8, sm: 1.5 }}
                              flexWrap="wrap"
                              mb={0.5}
                            >
                              {authProviders.map((provider, i) => (
                                <IconButton
                                  component={"a"}
                                  href={provider.href}
                                  onClick={provider.onClick}
                                  key={i}
                                  title={provider?.label}
                                  sx={{
                                    border: "1px solid",
                                    borderColor: "primary.main",
                                    color: "primary.main",
                                    width: 42,
                                    height: 42,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      backgroundColor: "action.hover",
                                      transform: "translateY(-1px)",
                                    },
                                  }}
                                >
                                  {provider.icon}
                                </IconButton>
                              ))}
                            </Box>
                          )}
                        </>
                      )}
                      <Grid
                        size={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                        mt={1}
                      >
                        <Page.Text>Already have an account?</Page.Text>
                        <Page.Text
                          sx={{
                            color: "secondary.main",
                            cursor: "pointer",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                          onClick={() => {
                            (onClose(), setOpenLogin(true));
                          }}
                        >
                          Log in
                        </Page.Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {status == "success" && (
              <Grid
                size={12}
                container
                alignItems="center"
                sx={{
                  minHeight: { xs: "90vh", lg: "80vh" },
                  p: { xs: 1, md: 6 },
                  border: 1.5,
                  borderColor: "#33aaca",
                }}
              >
                <Grid
                  size={12}
                  container
                  spacing={4}
                  alignItems="center"
                  direction="column"
                >
                  <CheckCircleIcon color="primary" sx={{ fontSize: "80px" }} />
                  <Page.Text
                    sx={{
                      fontSize: { xs: "18px", md: "26px" },
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    Thanks for signing up with{" "}
                    <Page.Text
                      component="span"
                      sx={{
                        color: "secondary.main",
                        fontSize: { xs: "18px", md: "26px" },
                        fontWeight: 600,
                      }}
                    >
                      MyHealthOpinions
                    </Page.Text>{" "}
                    - A Frequent Research Healthcare Panel Community.{" "}
                  </Page.Text>
                  <Page.Text
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      textAlign: "center",
                      borderRadius: 5,
                      bgcolor: "rgba(163, 243, 206, 0.21)",
                      border: "1px solid #f4f4f4",
                      p: 4,
                    }}
                  >
                    Please check your inbox/Spam and{" "}
                    <strong>click the verification link</strong> to confirm your
                    email and <strong>activate your account.</strong> Once
                    verified, you will be able to create your password and
                    access available surveys and research opportunities surveys
                    made just for you!
                  </Page.Text>
                  <Page.MuiButton
                    variant="contained"
                    color="secondary"
                    sx={{ fontWeight: "bold", mt: 2, color: "white" }}
                    onClick={onClose}
                  >
                    Go To Home
                  </Page.MuiButton>
                </Grid>
              </Grid>
            )}
            {status == "duplicate" && (
              <Grid
                size={12}
                container
                alignItems="center"
                sx={{
                  minHeight: { xs: "90vh", lg: "80vh" },
                  p: { xs: 1, md: 6 },
                  border: 1.5,
                  borderColor: "#33aaca",
                }}
              >
                <Grid
                  size={12}
                  container
                  spacing={4}
                  alignItems="center"
                  direction="column"
                >
                  <ErrorIcon color="primary" sx={{ fontSize: "80px" }} />
                  <Page.Text
                    component="span"
                    sx={{
                      color: "secondary.main",
                      fontSize: { xs: "18px", md: "26px" },
                      fontWeight: 600,
                    }}
                  >
                    Email Already Registered
                  </Page.Text>{" "}
                  <Page.Box
                    sx={{
                      textAlign: "center",
                      borderRadius: 5,
                      bgcolor: "rgba(163, 243, 206, 0.21)",
                      border: "1px solid #f4f4f4",
                      p: 4,
                    }}
                  >
                    <Page.Text
                      sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      Please check your inbox/Spam and{" "}
                      <strong>click the verification link</strong> to confirm
                      your email and <strong>activate your account.</strong>{" "}
                      Once verified, you will be able to create your password
                      and access available surveys and research opportunities
                      surveys made just for you!
                    </Page.Text>
                    <Page.Text
                      sx={{
                        mt: 2,
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      In case, verification link is expired, please request a
                      new one by clicking on{" "}
                      <strong>Resend Verification Email</strong> button below.
                    </Page.Text>
                  </Page.Box>
                  <Page.Box sx={{ display: "flex", gap: 2 }}>
                    <Page.MuiButton
                      variant="contained"
                      color="secondary"
                      disabled={cooldown > 0}
                      sx={{
                        position: "relative",
                        fontWeight: "bold",
                        mt: 2,
                        color: "white",
                        background:
                          cooldown > 0
                            ? `linear-gradient(to right,
                              #00c896 ${progress}%,
                              rgba(255,255,255,0.2) ${progress}%
                            )`
                            : undefined,
                        padding: "12px 24px",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          inset: 3,
                          backgroundColor: "#016550",
                          borderRadius: "999px",
                          zIndex: -1,
                        },
                        "& > span": {
                          position: "relative",
                          zIndex: 1,
                        },
                      }}
                      onClick={async () => {
                        let resp = await api.post(`/api/v1/user/resend`, {
                          ...form.watch(),
                          action: "resend-otp",
                        });
                        useToast(resp);
                        setCooldown(RESEND_SECONDS);
                      }}
                    >
                      {cooldown > 0
                        ? `Resend Email Again in ${cooldown}s`
                        : "Resend Verification Email"}
                    </Page.MuiButton>{" "}
                    <Page.MuiButton
                      variant="outlined"
                      color="secondary"
                      sx={{ fontWeight: "bold", mt: 2, borderWidth: 3 }}
                      onClick={onClose}
                    >
                      Go To Home
                    </Page.MuiButton>
                  </Page.Box>
                </Grid>
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
          <Grid size={12} container direction="column" spacing={0.5}>
            <Typography sx={{ fontWeight: 500, color: "#555" }}>
              {validations?.required ? <RequiredLabel label={label} /> : label}:
            </Typography>

            <RadioGroup
              row
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              sx={{
                display: "flex",
                gap: 1.5,
                minHeight: 36,
                alignItems: "center",
              }}
            >
              {options.map((option) => (
                <Page.Box
                  key={option.value}
                  sx={{
                    border:
                      field.value === option.value
                        ? "none"
                        : "2px solid #9fefc9",
                    backgroundColor:
                      field.value === option.value ? "#016550" : "transparent",
                    borderRadius: 1,
                    transition: "background-color 0.2s ease",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 32,
                    height: 32,
                    "&:hover": {
                      backgroundColor:
                        field.value === option.value
                          ? "primary.main"
                          : "action.hover",
                    },
                  }}
                >
                  <Tooltip title={option.label} placement="top">
                    <FormControlLabel
                      value={option.value}
                      control={
                        <Radio
                          checked={field.value === option.value}
                          icon={option.icon}
                          checkedIcon={option.icon}
                          aria-label={option.label}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 22,
                              color: hasError
                                ? "error.main"
                                : field.value === option.value
                                  ? "white"
                                  : "secondary.main",
                            },
                          }}
                        />
                      }
                      sx={{
                        m: 0,
                      }}
                    />
                  </Tooltip>
                </Page.Box>
              ))}
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
  isDisabled = false,
  options,
}) {
  const hasError = !!errors;
  const errorMessage = errors?.message;

  // const options = [
  //   { label: "Healthcare Professional", value: "Professional" },
  //   { label: "Patient", value: "Patient" },
  //   { label: "Caregiver", value: "Care Giver" },
  // ];

  return (
    <Controller
      name={name}
      control={control}
      rules={validations}
      render={({ field }) => (
        <FormControl fullWidth error={hasError} disabled={isDisabled}>
          <ToggleButtonGroup
            value={field.value || ""}
            size="small"
            exclusive
            onChange={(_, value) => {
              if (value !== null) field.onChange(value);
            }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "nowrap",
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: 13,
                px: 2,
                py: 0.5,
                color: errorMessage ? "red" : "secondary.main",
                borderColor: errorMessage ? "red" : "secondary.main",
              },
              "& .Mui-selected": {
                backgroundColor: "#016550 !important",
                color: "#fff !important",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },

              // xs only rounded corners
              "@media (max-width: 600px)": {
                "& .MuiToggleButton-root": {
                  borderRadius: 0,
                  flex: 1,
                  width: "100%",
                  justifyContent: "center",
                },
                "& .MuiToggleButton-root:first-of-type": {
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                },
                "& .MuiToggleButton-root:last-of-type": {
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                },
                "& .MuiToggleButton-root:not(:first-of-type)": {
                  borderTop: "none",
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

          {errorMessage && (
            <Page.Text sx={{ color: "red", fontSize: "11px" }}>
              {errorMessage}
            </Page.Text>
          )}
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
