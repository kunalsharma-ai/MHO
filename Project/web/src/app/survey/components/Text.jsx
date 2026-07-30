"use client";
import React from "react";
import { Page } from "@/util";
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

export default function TextElement({ question, form, disabled }) {
  const [hide, setHide] = React.useState(false);
  let isQuestionDisabled = disabled;
  let value = !question
    ? null
    : !("name" in question)
      ? null
      : form.getValues(question?.name);

  if (!isQuestionDisabled)
    isQuestionDisabled = [null, undefined, "", []].includes(value)
      ? false
      : !("isEditable" in question ? question.isEditable : false);
  const errors = form?.formState?.errors;

  return (
    <Grid
      size={{ xs: 12, md: Number(question?.size) }}
      alignSelf="flex-end"
      sx={{
        px: 2,
        py: 1,
        // backgroundColor:hide?"red":"green"
        visibility: hide ? "hidden" : "",
      }}
    >
      <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "primary.main" }}>
        {question.label}{" "}
        {question.required && (
          <span style={{ color: "red", fontWeight: 600 }}>*</span>
        )}
      </Page.Text>
      <Form.Input
        {...form.register(question.name)}
        control={form.control}
        watch={form.watch}
        disabled={isQuestionDisabled}
        parent={question.parent}
        api={question.name}
        validations={{
          required:
            question.required && !("parent" in question)
              ? "This field is required"
              : false,
        }}
        onHide={(e) => {
          setHide(e);
        }}
        errors={errors?.[question.name]}
        sx={{
          "& label.MuiInputLabel-shrink": {
            fontSize: "16px !important",
            backgroundColor: "white",
            borderRadius: "4px",
            px: 2,
            ml: -1.5,
          },
        }}
      />
    </Grid>
  );
}
