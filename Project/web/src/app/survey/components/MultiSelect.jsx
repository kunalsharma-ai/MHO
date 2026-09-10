"use client";
import React from "react";
import { Page } from "@/util";
import { Form } from "@/components";
import { Grid } from "@mui/material";
import TextElement from "./Text";
export default function MultiSelectElement({
  question,
  form,
  options,
  disabled,
  pageFields,
}) {
  const [describe, setDescribe] = React.useState("");
  const isQuestionDisabled = disabled || !(question.isEditable ?? true);
  const errors = form?.formState?.errors;
  const value = form.watch(question.name);

  function onChange(e, v) {
    let tempDescribe = v.find((opt) => opt?.describeLabel !== "");
    if (tempDescribe) setDescribe(tempDescribe.describeLabel);
    else setDescribe("");
    question?.children.map((child) => {
      form.setValue(child, null);
    });

    // ✅ NAYA
    if (pageFields) {
      const index = pageFields.indexOf(question.name);
      if (index !== -1) {
        pageFields.slice(index + 1).forEach((fieldName) => {
          form.setValue(fieldName, null);
        });
      }
    }
  }

  if (!options || options?.length === 0) return <></>;
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
          multiple={true}
          maxSelections={question?.maxSelections}
          isDisabled={isQuestionDisabled}
          options={options.map((opt) => {
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
          hasNone={question.hasNone}
          hasSkip={question.hasSkip}
        />
      </Grid>
      {!["", null, undefined].includes(describe) && (
        <TextElement
          form={form}
          question={{
            label: describe,
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
