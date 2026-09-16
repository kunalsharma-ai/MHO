"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Grid,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMember } from "@/Context";
import { api, Page } from "@/util";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";
import ParentDetailsForm from "../password/ParentDetailsForm";
import MinorConsentPending from "./MinorConsentPending";

export default function page() {
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
        <Terms />
      </Grid>
    </Grid>
  );
}

export function Terms({
  width = { xs: "90vw", lg: "80vw", xl: "70vw" },
  hideLoading = false,
}) {
  const [user, router, pathName] = [useMember(), useRouter(), usePathname()];
  const [category, setCategory] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
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
  React.useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    if (
      pathName === "/auth/terms" &&
      user?.terms?.length > 0 &&
      (!user?.isMinor || user?.parent?.consentStatus === "approved")
    )
      router.push("/survey?name=welcome");
    setAcceptedTerms(user.terms);
    setInitialTerms(user.terms || []);
    api
      .post(`/api/v1/category`, {
        name: user.category,
      })
      .then((resp) => {
        if (resp.status === "success") {
          setCategory(resp.data[0] ?? null);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);
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
    let resp = api.put(`/api/v1/me`, {
      terms: acceptedTerms,
    });
    if (resp.status === "error") {
      useToast(resp);
      return;
    }
    if (pathName === "/auth/terms") router.push("/survey?name=welcome");
    if ("Reload" in user) user.Reload();
    else useToast(resp);
  };
  if (isLoading && !hideLoading) {
    return <LoadingOverlay />;
  }
  if (user?.isMinor && [null, undefined, ""].includes(user?.parent?.email)) {
    return (
      <form
        onSubmit={form.handleSubmit(async (data) => {
          let resp = await api.patch(`/api/v1/me/parent-details`, data);
          user.update(resp.data);
        })}
        style={{ padding: "16px" }}
      >
        <ParentDetailsForm form={form} submitLabel={"Submit"} />
      </form>
    );
  }
  if (
    user?.isMinor &&
    !user?.parent?.consentStatus ||
    user?.parent?.consentStatus === "pending"
  ) {
    return <MinorConsentPending />;
  }

  return (
    <>
      {/* <Page.Text
        sx={{
          fontSize: { xs: "24px", md: "32px" },
          fontWeight: 600,
          color: "secondary.main",
          my: { xs: 1, md: 2 },
        }}
      ></Page.Text> */}
      <Grid
        sx={{
          borderRadius: 2,
          bgcolor: "primary.light",
          border: (theme) => `1px solid ${theme.palette.secondary.light}`,
          py: 2,
          px: 2,
          width: width,
          maxHeight: "calc(100vh - 190px)",
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
              Accept
            </Page.MuiButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
