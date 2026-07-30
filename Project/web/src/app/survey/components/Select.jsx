"use client";
import React from "react";
import { Page, getCurrency } from "@/util";
import { Form } from "@/components";
import TextElement from "./Text";

import { Grid } from "@mui/material";

export default function SelectElement({ question, form, options, disabled }) {
  const [showSpecify, setShowSpecify] = React.useState(false);
  const [describe, setDescribe] = React.useState("");
  const isQuestionDisabled = disabled || !(question.isEditable ?? true);
  const errors = form?.formState?.errors;
  // console.log({ [question.name]: options, showSpecify })

  function onChange(e, v) {
    setShowSpecify(v?.value === "others");
    let tempDescribe = [v].find((opt) => opt?.describeLabel !== "");
    if (tempDescribe) setDescribe(tempDescribe.describeLabel);
    else setDescribe("");
    question?.children.map((child) => {
      form.setValue(child, null);
    });
  }
  if (!options || options?.length === 0) return <></>;
  let formattedOptions = options;
  if (question.isMoney) {
    let country = form.watch("country");
    if (!country) return null;
    formattedOptions = options.sortRange("asc").map((range) => ({
      ...range,
      label: range.label.toMoneyRange(getCurrency(country), "en-IN"),
    }));
  }
  return (
    <>
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
        <Form.Select
          {...form.register(question.name)}
          control={form.control}
          watch={form.watch}
          isDisabled={isQuestionDisabled}
          options={formattedOptions.map((opt) => {
            if (typeof opt === "string")
              return {
                label: opt,
                value: opt,
              };
            return {
              label: opt.label,
              value: opt.value,
              isExclusive: opt.isExclusive,
              requiredDescribe: opt.describeLabel !== "",
              describeLabel: opt.describeLabel,
            };
          })}
          // api={question.api}
          parent={question.parent}
          validations={{
            required: question.required ? "This field is required" : false,
          }}
          errors={errors?.[question.name]}
          sx={{
            "& .MuiOutlinedInput-notchedOutline legend": {
              width: 0,
              visibilty: "hidden",
            },
          }}
          onChange={onChange}
          hasOthers={question.hasOthers}
        />
      </Grid>
      {(showSpecify || !["", null, undefined].includes(describe)) && (
        <TextElement
          form={form}
          question={{
            label: [null, undefined, ""].includes(describe)
              ? "Please Specify"
              : describe,
            name: `${question.name}_specify`,
            type: "text",
            isEditable: true,
            size: question.size,
          }}
        />
      )}
    </>
  );
}
