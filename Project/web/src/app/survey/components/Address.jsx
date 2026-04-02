"use client";
import { Form } from "@/components";
import { Grid, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import Map from "@/components/Map";
import { Page } from "@/util";

export default function AddressElement({ question, form, disabled }) {
  function setCoordinates(coordinates) {
    form.setValue(`${question.name}.coordinates`, coordinates);
  }
  return (
    <Grid size={12} container p={2}>
      <Page.Text
        sx={{
          fontWeight: 600,
          mb: 0.5,
          color: "secondary.main",
          width: "100%",
        }}
      >
        {question.label}{" "}
        {question.required && (
          <span style={{ color: "red", fontWeight: 600 }}>*</span>
        )}
      </Page.Text>

      <Grid
        size={{
          xs: 12,
          md: watch(`${question.name}.consent`) === "Yes" ? 6 : 12,
        }}
        container
        direction="column"
        justifySelf="flex-start"
        spacing={1.5}
        mt={1}
      >
        <Grid size={12} container direction="column" spacing={0}>
          <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "secondary.main" }}>
            Are you comfortable sharing your location on map?
          </Page.Text>
          <Controller
            name={`${question.name}.consent`}
            control={control}
            rules={"This field is required"}
            defaultValue=""
            render={({ field }) => (
              <>
                <RadioGroup
                  {...field}
                  aria-label={question.label}
                  onChange={(e) => {
                    if (e.target.value === "Yes") setIsMapVisible(true);
                    field.onChange(e);
                  }}
                >
                  {[
                    {
                      label: "Yes",
                      value: "Yes",
                    },
                    { label: "No", value: "No" },
                  ].map((option) => (
                    <FormControlLabel
                      key={typeof option === "string" ? option : option.label}
                      value={typeof option === "string" ? option : option.label}
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              color: "secondary.main",
                            },
                          }}
                        />
                      }
                      label={typeof option === "string" ? option : option.label}
                    />
                  ))}
                </RadioGroup>
                {errors[question.name] && (
                  <Page.Text
                    color="error"
                    variant="caption"
                    sx={{ fontWeight: "500" }}
                  >
                    {errors[question.name].message}
                  </Page.Text>
                )}
              </>
            )}
          />
        </Grid>{" "}
        <Grid size={12} container direction="column" spacing={0}>
          <Form.Input
            {...form.register(`${question.name}.line1`)}
            control={control}
            watch={watch}
            labelText={"Address Line 1"}
          />
        </Grid>
        <Grid size={12} container direction="column" spacing={0}>
          <Form.Input
            {...form.register(`${question.name}.line2`)}
            control={control}
            watch={watch}
            labelText={"Address Line 2"}
          />
        </Grid>{" "}
        <Grid size={12} container direction="column" spacing={0}>
          <Form.Select
            {...form.register(`${question.name}.country`)}
            control={control}
            watch={watch}
            option={[]}
            api="country"
            labelText={"Country"}
          />
        </Grid>
        <Grid size={12} container direction="column" spacing={0}>
          <Form.Select
            {...form.register(`${question.name}.state`)}
            control={control}
            watch={watch}
            option={[]}
            parent={`${question.name}.country`}
            api="state"
            labelText={"State"}
          />
        </Grid>
        <Grid size={12} container direction="column" spacing={0}>
          <Form.Select
            {...form.register(`${question.name}.city`)}
            control={control}
            watch={watch}
            option={[]}
            parent={[`${question.name}.country`, `${question.name}.state`]}
            api="city"
            labelText={"City"}
          />
        </Grid>
        <Grid size={12} container direction="column" spacing={0}>
          <Form.Input
            {...form.register(`${question.name}.zipcode`)}
            control={control}
            watch={watch}
            api="zipcode"
            parent={`${question.name}.country`}
            labelText={"Zipcode"}
          />
        </Grid>{" "}
      </Grid>

      {isMapVisible && (
        <Grid
          size={{ xs: 12, md: 6 }}
          direction="column"
          container
          p={2}
          display={
            watch(`${question.name}.consent`) === "Yes" ? "flex" : "none"
          }
        >
          <Map setCoordinates={setCoordinates} />
          <Page.Text fontStyle="italic" mt={1}>
            click on your location to place location marker
          </Page.Text>
        </Grid>
      )}
    </Grid>
  );
}
