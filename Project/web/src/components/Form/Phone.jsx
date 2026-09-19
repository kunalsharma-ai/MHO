"use client";
import React from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumber } from "libphonenumber-js";
import "react-phone-input-2/lib/material.css";
import { Page } from "@/util";

// Library boundary par hi sanitize karo — yahan se aage kuch bhi non-string nahi jaana chahiye
function safeString(val, fallback = "") {
  return typeof val === "string" ? val : fallback;
}

function safeCountryCode(val, fallback = "us") {
  const cleaned = safeString(val).trim().toLowerCase();
  return /^[a-z]{2}$/.test(cleaned) ? cleaned : fallback;
}

function safeCountryList(list) {
  if (!Array.isArray(list)) return undefined;
  const filtered = list.filter((c) => typeof c === "string" && c.trim().length > 0);
  return filtered.length > 0 ? filtered : undefined;
}

export default function Phone({
  control,
  errors,
  name,
  label,
  labelText,
  required,
  validations,
  onlyCountries,
  disableDropdown,
  disabled = false,
  selectedCountry,
  sx = {},
}) {
  const [defaultCountry, setDefaultCountry] = React.useState("us");

  const safeOnlyCountries = safeCountryList(onlyCountries);

  React.useEffect(() => {
    if (safeOnlyCountries && safeOnlyCountries.length > 0) {
      setDefaultCountry(safeCountryCode(safeOnlyCountries[0]));
    }
  }, [safeOnlyCountries]);

  React.useEffect(() => {
    if (selectedCountry) {
      setDefaultCountry(safeCountryCode(selectedCountry));
    }
  }, [selectedCountry]);

  return (
    <>
      {labelText && (
        <Page.Text sx={{ fontWeight: 500, color: "#555" }}>
          {labelText}
          {required && <span style={{ color: "red", fontWeight: 600 }}>*</span>}
        </Page.Text>
      )}
      <Controller
        name={name}
        control={control}
        rules={
          disabled
            ? {}
            : {
                ...validations,
                validate: (val) => {
                  if (!val || String(val).trim() === "") return;
                  if (String(val).length < 4) return;
                  try {
                    const parsedPhone = parsePhoneNumber("+" + val);
                    return parsedPhone.isValid() || "Invalid phone number";
                  } catch (err) {
                    return "Invalid phone number";
                  }
                },
              }
        }
        render={({ field }) => (
          <PhoneInput
            country={safeCountryCode(defaultCountry)}
            onlyCountries={safeOnlyCountries}
            disableDropdown={disabled || disableDropdown}
            disabled={disabled}
            value={safeString(field.value)}
            onChange={(value) => field.onChange(safeString(value))}
            countryCodeEditable={!Boolean(selectedCountry)}
            inputProps={{
              name: name,
              autoFocus: false,
              disabled: disabled,
            }}
            inputStyle={{
              width: "100%",
              height: "34px",
              color: "grey",
              fontSize: "14px",
              borderColor: errors?.message ? "red" : " #0000003b",
              ...sx.inputStyle,
            }}
            buttonStyle={{
              ...sx.buttonStyle,
            }}
            inputClass="custom-phone-font"
            specialLabel={""}
          />
        )}
      />

      {errors && <small style={{ color: "red" }}>{errors.message}</small>}
    </>
  );
}