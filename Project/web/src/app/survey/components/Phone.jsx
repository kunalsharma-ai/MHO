"use client";
import { useQuery } from "@tanstack/react-query";
import { api, Page } from "@/util";
import { Form } from "@/components";
import { Controller } from "react-hook-form";
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Select,
  MenuItem,
  Grid,
  Chip,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  MobileStepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";



function sanitizeCountry(raw) {
  if (typeof raw !== "string") return null;
  const cleaned = raw.trim().toLowerCase();
  return /^[a-z]{2}$/.test(cleaned) ? cleaned : null;
}

export default function PhoneElement({ question, form, disabled }) {
  const isQuestionDisabled = disabled || !(question.isEditable ?? true);
  const errors = form?.formState?.errors;
  const rawValue = form.watch(question.name);
  const rawCountry = form.watch("country");
 
/*
  const { data: { country, ip } = {} } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const resp = await api.get("/api/v1/get-country");
      resp.country = resp.country.toLowerCase().trim();
      return resp;
    },
    enabled: [undefined, null].includes(value),
  });
  //*/
  const value = typeof rawValue === "string" ? rawValue : "";

  // country hamesha valid 2-letter code, nahi toh fallback "us"
  const country = sanitizeCountry(rawCountry) || "us";
  let validations = {};
  if (question.required) validations["required"] = "This field is required";
  let lockCountry = {
    disableDropdown: !Boolean(value),
  };
 if (!country || country.length !== 2) return <></>;

  if (!value) {
    lockCountry.selectedCountry = country.toLowerCase().trim();
    lockCountry.disableDropdown = Boolean(country);
  }
  return (
    <Grid
      size={{ xs: 12, md: Number(question?.size) }}
      alignSelf="flex-end"
      sx={{
        px: 2,
        py: 1,
      }}
    >
      <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "primary.main" }}>
        {question.label}{" "}
        {question.required && (
          <span style={{ color: "red", fontWeight: 600 }}>*</span>
        )}
      </Page.Text>
      <Form.Phone
        name={question.name}
        control={form.control}
        disabled={isQuestionDisabled && Boolean(value)}
        validations={validations}
        // {...lockCountry}
        selectedCountry={country}
        errors={errors?.[question.name]}
      />
      {/* {
      Boolean(value) &&
      !Boolean(errors[question.name]) &&
      <Controller
        name={ `${question.name}-whatsapp` }
        control={ form.control }
        defaultValue={ false }
        render={ ({ field }) => (
          <FormControlLabel
            sx={ { mt: 1, display: "flex", alignItems: "flex-start" } }
            control={
              <Checkbox
                { ...field }
                checked={ Boolean(field.value) }
                sx={ {
                  py: 0,
                  "& .MuiSvgIcon-root": {
                    color: "secondary.main",
                  },
                } }
              />
            }
            label="I agree to receive updates, alerts, and support messages on WhatsApp from My Frequent Rewards"
          />
        ) }
      />
    } */}
    </Grid>
  );
}
