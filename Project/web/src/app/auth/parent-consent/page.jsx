"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Grid,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  Typography,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useForm } from "react-hook-form";
import { useMember, useQuery } from "@/Context";
import { api, Page, loadData } from "@/util";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";

export default function page() {
  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [User, setUser] = React.useState({});
  const query = useQuery();
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.post(`/api/v1/user/${query.user}`, {
        code: query.code,
        channel: "parent-consent",
      }),
      async (resp) => {
        setUser(resp?.data);
        setIsLoading(false);
      },
    );
  }, [query.user]);
  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (!User) {
    return <LinkExpired />;
  }
  if (submitted) {
    return (
      <Grid
        size={12}
        container
        sx={{
          bgcolor: "#f4f7fb",
          minHeight: "100vh",
          minWidth: "100vw",
        }}
        justifyContent="center"
        alignItems="center"
        py={2}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={0}
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            boxShadow: 24,
            py: 4,
            px: { xs: 2, md: 5 },
            width: { xs: "92vw", md: "70vw", lg: "50vw" },
            textAlign: "center",
          }}
        >
          <Page.Box sx={{ height: 60, mb: 3 }}>
            <img
              src="/images/logo/My-Health-Opinions.png"
              alt="My Health Opinions"
              height="100%"
            />
          </Page.Box>

          <Page.Box
            sx={{
              width: "100%",
              p: { xs: 3, md: 5 },
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              bgcolor: "#EAF3FF",
            }}
          >
            <Page.Text
              sx={{
                fontSize: { xs: 22, md: 28 },
                fontWeight: 700,
                color: "primary.main",
                mb: 2,
              }}
            >
              Consent Successfully Submitted
            </Page.Text>

            <Page.Text
              sx={{
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.7,
              }}
            >
              Thank you for reviewing and accepting the terms. Your consent has
              been successfully recorded.
            </Page.Text>

            <Page.Text
              sx={{
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.7,
                mt: 1.5,
              }}
            >
              Your child may now continue participating in MyHealthOpinions.
            </Page.Text>
          </Page.Box>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid
      size={12}
      container
      sx={{
        bgcolor: "primary.light",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
      justifyContent="center"
      alignItems="center"
      py={2}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={0}
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: 24,
          py: 3,
          px: { xs: 1, md: 4 },
          textAlign: "justify",
        }}
      >
        {" "}
        <Page.Box
          sx={{
            height: "67.44px",
            width: "240px",
            mb: 1,
          }}
        >
          <img
            src="/images/logo/My-Health-Opinions.png"
            alt="logo"
            height="100%"
            width="100%"
          />
        </Page.Box>
        <Page.Box
          sx={{
            width: { xs: "90vw", lg: "80vw", xl: "70vw" },
            mb: 2,
            p: { xs: 2, md: 3 },
            borderRadius: 2,
            bgcolor: "primary.light",
            border: (theme) => `1px solid ${theme.palette.secondary.light}`,
          }}
        >
          <Page.Text
            sx={{
              fontSize: { xs: 20, md: 26 },
              fontWeight: 700,
              color: "primary.main",
              mb: 1.5,
            }}
          >
            Your Child's Participation Has Been Approved
          </Page.Text>

          <Page.Text
            sx={{
              fontSize: { xs: 14, md: 16 },
              lineHeight: 1.7,
              mb: 1.5,
            }}
          >
            Thank you for confirming your approval for your child to participate
            in <strong>MyHealthOpinions</strong>, an online survey and market
            research panel operated by Frequent Research Fieldwork Solutions
            Pvt. Ltd.
          </Page.Text>

          <Page.Text
            sx={{
              fontSize: { xs: 14, md: 16 },
              lineHeight: 1.7,
              mb: 1.5,
            }}
          >
            As the parent or legal guardian, you are now requested to review the
            terms below and accept them on behalf of your child.
          </Page.Text>

          <Page.Text
            sx={{
              fontSize: { xs: 14, md: 16 },
              lineHeight: 1.7,
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            By selecting the required acceptance options, you confirm that you
            have reviewed and understood the applicable terms and agree to them
            on behalf of your child.
          </Page.Text>
        </Page.Box>
        <Terms
          maxHeight="calc(100vh - 500px)"
          setSubmitted={setSubmitted}
          User={User}
        />
      </Grid>
    </Grid>
  );
}

export function Terms({
  width = { xs: "90vw", lg: "80vw", xl: "70vw" },
  hideLoading = false,
  maxHeight = "calc(100vh - 190px)",
  setSubmitted,
  User,
}) {
  const [category, setCategory] = React.useState({});
  React.useEffect(() => {
    console.log({ User });
    loadData(
      api.post(`/api/v1/category`, {
        name: User?.category,
      }),
      async (resp) => {
        setCategory(resp?.data?.[0]);
      },
    );
  }, [User.category]);
  const [termOptions, setTermsOptions] = React.useState([
    { label: "I Accept all", value: "accept_all", required: false },
  ]);
  const form = useForm();

  const [acceptedTerms, setAcceptedTerms] = React.useState([]);
  const [initialTerms, setInitialTerms] = React.useState([]);

  React.useEffect(() => {
    if (!category?.terms) return;
    setTermsOptions([
      termOptions[0],
      ...category.terms.map((term) => {
        return {
          label: <div dangerouslySetInnerHTML={{ __html: term.body }} />,
          value: term.name,
          required: term.isRequired ?? false,
        };
      }),
    ]);
  }, [category]);
  const handleCheckboxChange = (value) => {
    setAcceptedTerms((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleAcceptAll = () => {
    const allOtherValues = termOptions
      .filter((t) => t.value !== "accept_all")
      .map((t) => t.value);

    const allChecked = allOtherValues.every((v) => acceptedTerms?.includes(v));

    if (allChecked) {
      setAcceptedTerms([]);
    } else {
      setAcceptedTerms(allOtherValues);
    }
  };

  const allRequiredSelected = termOptions.reduce((a, c) => {
    return c.required ? a && acceptedTerms?.includes(c.value) : a;
  }, true);

  const isTermsChanged = React.useMemo(() => {
    if (!acceptedTerms) return false;
    const sortArr = (arr) => [...arr].sort();
    return (
      JSON.stringify(sortArr(initialTerms)) !==
      JSON.stringify(sortArr(acceptedTerms))
    );
  }, [initialTerms, acceptedTerms]);

  const isAllChecked = termOptions
    .filter((t) => t.value !== "accept_all")
    .every((t) => acceptedTerms?.includes(t.value));

  const handleSubmit = async () => {
    let resp = await api.put(`/api/v1/user/parent-consent/${User._id}`, {
      terms: acceptedTerms,
    });
    // if (pathName === "/auth/terms") router.push("/survey?name=welcome");
    // if ("Reload" in user) user.Reload();
    // else
    useToast({
      status: "success",
      message: "Terms acceptance updated successfully",
    });
    setSubmitted(true);
  };
  return (
    <>
      <Grid
        sx={{
          borderRadius: 2,
          bgcolor: "primary.light",
          border: (theme) => `1px solid ${theme.palette.secondary.light}`,
          py: 2,
          px: 2,
          width: width,
          maxHeight: { md: maxHeight },
          overflow: "auto",
        }}
      >
        <Page.Box fontSize={15} py={2}>
          <div
            dangerouslySetInnerHTML={{
              __html: category?.termsMessage ?? "",
            }}
          />
          {/* todo: deleted once flow is finalized
          
           By applying to join,{" "}
            <Page.Text component="span" color="secondary" fontWeight={600}>
              MyHealthOpinions
            </Page.Text>
            , you agree to these Terms and Conditions and Privacy Notice, which
            govern your participation as a <b>Caregiver</b> in healthcare market
            research activities conducted by Frequent Research and its trusted
            partners. */}
        </Page.Box>
        {/* todo: deleted once flow is finalized
          
          <Page.Text fontSize={15} pb={2}>
            Your participation helps share real-life caregiving experiences that
            support improvements in healthcare services, patient support, and
            product design.
          </Page.Text> */}
        {/* todo: deleted once flow is finalized
          
           <Page.Text fontSize={15} fontWeight={600}>
            Eligibility and Identity Verification
          </Page.Text> */}

        <Grid
          size={12}
          container
          direction={"column"}
          mt={2}
          gap={0}
          sx={{
            "& ul": {
              pl: 3,
              my: 1,
            },
          }}
        >
          {termOptions.map((option, index) => (
            <Page.Box
              key={index}
              className={option.required ? "required" : "not-required"}
              sx={{
                borderBottom: "4px solid #fcfcfc",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    checked={
                      option.value === "accept_all"
                        ? isAllChecked
                        : acceptedTerms?.includes(option.value)
                    }
                    onChange={() =>
                      option.value === "accept_all"
                        ? handleAcceptAll()
                        : handleCheckboxChange(option.value)
                    }
                  />
                }
                label={option.label}
                sx={{
                  alignItems: "flex-start",
                  "& .MuiFormControlLabel-label": {
                    my: "6px",
                  },
                }}
              />
            </Page.Box>
          ))}

          <Page.Text pt={3}>
            <em>
              Your data will be stored securely and used solely for market
              research and opinion analysis purposes in compliance with
              applicable data protection laws (such as GDPR and relevant local
              regulations)
            </em>
          </Page.Text>
          <Page.Text mt={1}>
            <em>
              {" "}
              You may withdraw your consent or deactivate your account at any
              time by contacting{" "}
              <Page.Text
                component="a"
                href="mailto:support@myhealthopinions.com"
                sx={{ color: "secondary.main", fontWeight: 600 }}
              >
                support@myhealthopinions.com
              </Page.Text>
              . Upon withdrawal, your profile and data will be deleted or
              anonymized per our data retention policy.
            </em>
          </Page.Text>

          <Grid size={12} container justifyContent={"flex-end"} my={2}>
            <Page.MuiButton
              onClick={handleSubmit}
              disabled={!allRequiredSelected || !isTermsChanged}
              variant="contained"
              color="secondary"
              sx={{
                ml: 1,
                fontWeight: 600,
                color: "white",
                px: 2,
              }}
            >
              Accept and allow {User?.name?.first} to use this panel
            </Page.MuiButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

function LinkExpired() {
  const router = useRouter();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      size={12}
      sx={{
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(90deg, #fff 0, #9fb0caff 100%)",
      }}
    >
      <Container maxWidth="lg">
        <IconButton disabled>
          <ErrorIcon sx={{ color: "info.main", fontSize: 120 }} />
        </IconButton>

        <Typography
          sx={{
            my: 6,
            fontSize: 48,
            fontWeight: "bold",
            background:
              "linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Link Expired
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.2,
            mt: 2,
            color: "black",
          }}
        >
          This parent consent link is no longer valid.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.5,
            mt: 4,
            mb: 2,
            color: "#777",
          }}
        >
          The link may have expired or already been used. Please contact My
          Health Opinions support if you still need to complete the parent
          consent process.
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            router.replace("/");
          }}
          sx={{
            height: 58,
            background:
              "linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)",
            color: "white",
            borderRadius: 20,
            fontSize: 16,
            fontWeight: 700,
            padding: "18px 40px",
            "&:hover": {
              background:
                "linear-gradient(to right, #0082c8, #0082c8, #667db6, #667db6)",
            },
          }}
        >
          Go to Home Page
        </Button>
      </Container>
    </Grid>
  );
}
