"use client";
import { Form } from "@/components";
import { Page } from "@/util";
import { Grid, FormControl } from "@mui/material";

export default function DocumentElement({ question, form }) {
  return (
    <Grid
      size={{ xs: 12, md: Number(question?.size) }}
      alignSelf="flex-end"
      sx={{
        px: 2,
        py: 1,
      }}
    >
      <FormControl fullWidth required={question.required}>
        <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "secondary.main" }}>
          {question.label}{" "}
          {question.required && (
            <span style={{ color: "red", fontWeight: 600 }}>*</span>
          )}
        </Page.Text>
        <Form.Upload
          endpoint="/api/v1/upload/pdf"
          name={question.name}
          control={form.control}
          form={form}
          rules={{
            required: question.required ? "This field is required" : false,
          }}
          accept="application/pdf"
        />
      </FormControl>
    </Grid>
  );
}
