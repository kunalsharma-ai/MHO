"use client";
import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Collapse,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  MobileStepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  useForm,
  FormProvider,
  useFormContext,
  useController,
} from "react-hook-form";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { Input, Select, Radio, Checkbox, Date, Phone } from "@/components/Form";

const steps = [
  "Basic Details",
  "Email & Referral",
  "Basic Profile",
  "Professional Profile",
  "Professional Profile-II",
  "Education Profile",
  "Complete",
];

function CustomStepIcon(props) {
  const { active, completed, className } = props;
  const stepNumber = props.icon;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        borderRadius: "50%",
        backgroundColor: active
          ? "#06923E "
          : completed
          ? "#4caf50"
          : "#e0e0e0",
        color: "white",
        fontWeight: active ? "bold" : "normal",
        fontSize: "12px",
      }}
    >
      {completed ? <CheckCircle sx={{ fontSize: 16 }} /> : stepNumber}
    </div>
  );
}

export default function DoctorSignUp({ onClose }) {
  const form = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const termsAccepted = watch("terms", false);

  return (
    <FormProvider {...form}>
      <Grid
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        container
        size={12}
        py={1}
        spacing={2}
        alignSelf="flex-start"
        textAlign="justify"
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            color="secondary.main"
            fontSize={"18px"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            Doctor's Registration Form
          </Typography>
          <Typography textAlign={"center"} fontSize={"13px"}>
            Please fill out the survey to complete your application for Doctor
            Survey
          </Typography>
        </Box>
        {!isMobile ? (
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<StepConnector />}
            sx={{
              my: 1,
              width: "100%",
              // borderBottom: "1px solid #cfcfcf78",
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={(props) => <CustomStepIcon {...props} />}
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "12px",
                      // fontWeight: "bold",
                      "& .Mui-active": {
                        fontWeight: "bold",
                      },
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        ) : (
          <Grid size={12} container justifyContent={"center"}>
            <MobileStepper
              variant="dots"
              steps={steps.length}
              position="static"
              activeStep={activeStep}
              sx={{ my: 1 }}
            />
          </Grid>
        )}
        <Grid
          size={12}
          px={4}
          sx={{ maxHeight: "calc(95vh - 350px)", overflow: "auto" }}
        >
          {activeStep === 0 && <PageOne />}
          {activeStep === 1 && <PageTwo />}
          {activeStep === 2 && <PageThree />}
          {activeStep === 3 && <PageFour />}
          {activeStep === 4 && <PageFive />}
          {activeStep === 5 && <PageSix />}
          {activeStep === 6 && <FinalPage onClose={onClose} />}
        </Grid>
        {activeStep !== 6 && (
          <Grid
            size={12}
            container
            justifyContent={"space-between"}
            my={2}
            px={4}
          >
            <Button
              variant="outlined"
              color="secondary"
              sx={{ fontWeight: "bold", height: "33px" }}
              startIcon={<KeyboardArrowLeft />}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{ height: "33px", color: "white", fontWeight: "bold" }}
              endIcon={<KeyboardArrowRight />}
              onClick={handleNext}
              disabled={activeStep === 0 && !termsAccepted}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Grid>
        )}
      </Grid>
    </FormProvider>
  );
}

function PageOne() {
  const {
    form,
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          Do you work in Healthcare industry?
        </Typography>
        <Box>
          <Radio
            control={control}
            {...register("healthcare")}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Box>
      </Grid>{" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Are you a Clinician?</Typography>
        <Box>
          <Radio
            control={control}
            {...register("clinician")}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Box>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Choose Your Education</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select
            {...register("education")}
            control={control}
            options={[
              { label: "M.B.B.S", value: "M.B.B.S" },
              { label: "B.D.S", value: "B.D.S" },
              { label: "B.A.M.S", value: "B.A.M.S" },
              { label: "B.U.M.S", value: "B.U.M.S" },
              { label: "B.H.M.S", value: "B.H.M.S" },
              { label: "B.Y.N.S", value: "B.Y.N.S" },
              { label: "B.V.sc&AH", value: "B.V.sc&AH" },
              { label: "MBBCh", value: "MBBCh" },
              { label: "MBChC", value: "MBChC" },
              { label: "MD", value: "MD" },
              { label: "M.M,MMed", value: "M.M,MMed" },
              { label: "MCM", value: "MCM" },
            ]}
          />
        </Grid>
      </Grid>{" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Choose Your Specialisation</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select
            {...register("specialization")}
            control={control}
            options={[
              { label: "Allergy & Immunology", value: "Allergy & Immunology" },
              { label: "Anesthesia", value: "Anesthesia" },
              { label: "Aerospace Medicine", value: "Aerospace Medicine" },
              { label: "Bariatric Surgery", value: "Bariatric Surgery" },
              {
                label: "Cardiology- Interventional",
                value: "Cardiology- Interventional",
              },
              {
                label: "Cardiology - Non-Interventional",
                value: "Cardiology - Non-Interventional",
              },
              {
                label: "Cardiothoracic And Vascular Surgery",
                value: "Cardiothoracic And Vascular Surgery",
              },
              {
                label: "Centre For Spinal Diseases",
                value: "Centre For Spinal Diseases",
              },
              {
                label: "Clinical Hematology And BMT",
                value: "Clinical Hematology And BMT",
              },
              { label: "Corneal Transplant", value: "Corneal Transplant" },
              {
                label: "Critical Care Medicine",
                value: "Critical Care Medicine",
              },
              {
                label: "Dermatology and Cosmetology",
                value: "Dermatology and Cosmetology",
              },
              { label: "General Dentist", value: "General Dentist" },
              {
                label: "Pedodontics or Pediatric Dentist",
                value: "Pedodontics or Pediatric Dentist",
              },
              { label: "Orthodontist", value: "Orthodontist" },
              { label: "Periodontist", value: "Periodontist" },
              { label: "Endodontist", value: "Endodontist" },
              {
                label: "Oral Pathologist or Oral Surgeon",
                value: "Oral Pathologist or Oral Surgeon",
              },
              { label: "Prosthodontist", value: "Prosthodontist" },
              {
                label: "Ear Nose Throat Head And Neck Surgery",
                value: "Ear Nose Throat Head And Neck Surgery",
              },
              { label: "Emergency Medicine", value: "Emergency Medicine" },
              { label: "Endocrinology", value: "Endocrinology" },
              { label: "General Surgery", value: "General Surgery" },
              { label: "Infectious Diseases", value: "Infectious Diseases" },
              { label: "Internal Medicine", value: "Internal Medicine" },
              {
                label: "In-Vitro Fertilization (IVF)",
                value: "In-Vitro Fertilization (IVF)",
              },
              { label: "Laboratory Medicine", value: "Laboratory Medicine" },
              {
                label: "Liver Transplant & Hepatic Surgery",
                value: "Liver Transplant & Hepatic Surgery",
              },
              {
                label: "Maxillofacial Surgery",
                value: "Maxillofacial Surgery",
              },
              {
                label: "Medical Gastroenterology",
                value: "Medical Gastroenterology",
              },
              {
                label: "Medical Oncology & Clinical Hematology",
                value: "Medical Oncology & Clinical Hematology",
              },
              {
                label: "Minimally Invasive Gynecology",
                value: "Minimally Invasive Gynecology",
              },
              { label: "Medical Oncology", value: "Medical Oncology" },
              { label: "Neonatology", value: "Neonatology" },
              { label: "Nephrology", value: "Nephrology" },
              { label: "Neuro Modulation", value: "Neuro Modulation" },
              { label: "Neurosurgery", value: "Neurosurgery" },
              {
                label: "Obstetrics And Gynecology",
                value: "Obstetrics And Gynecology",
              },
              { label: "Ophthalmology", value: "Ophthalmology" },
              {
                label: "Orthopedics & Joint Replacement",
                value: "Orthopedics & Joint Replacement",
              },
              { label: "Pain Management", value: "Pain Management" },
              { label: "Pediatric Surgery", value: "Pediatric Surgery" },
              { label: "Physiotherapy", value: "Physiotherapy" },
              { label: "Plastic Surgery", value: "Plastic Surgery" },
              { label: "Psychiatry", value: "Psychiatry" },
              { label: "Pulmonology", value: "Pulmonology" },
              { label: "Diagnostic Radiology", value: "Diagnostic Radiology" },
              { label: "Renal Transplant", value: "Renal Transplant" },
              {
                label: "Reproductive Medicine & IVF",
                value: "Reproductive Medicine & IVF",
              },
              { label: "Rheumatology", value: "Rheumatology" },
              { label: "Robotic Surgery", value: "Robotic Surgery" },
              {
                label: "Colon and rectal surgery",
                value: "Colon and rectal surgery",
              },
              { label: "General surgery", value: "General surgery" },
              { label: "Gynecologic oncology", value: "Gynecologic oncology" },
              { label: "Gastroenterology", value: "Gastroenterology" },
              { label: "Neurological surgery", value: "Neurological surgery" },
              { label: "Ophthalmic surgery", value: "Ophthalmic surgery" },
              {
                label: "Oral and maxillofacial surgery",
                value: "Oral and maxillofacial surgery",
              },
              { label: "Orthopedic surgery", value: "Orthopedic surgery" },
              { label: "Otolaryngology", value: "Otolaryngology" },
              { label: "Otology neurotology", value: "Otology neurotology" },
              { label: "Pediatric surgery", value: "Pediatric surgery" },
              {
                label:
                  "Surgical Intensivists, specializing in critical care patients",
                value:
                  "Surgical Intensivists, specializing in critical care patients",
              },
              { label: "Thoracic Surgery", value: "Thoracic Surgery" },
              {
                label: "Vascular and endovascular surgery",
                value: "Vascular and endovascular surgery",
              },
              { label: "Pediatric urology", value: "Pediatric urology" },
              { label: "Urologic oncology", value: "Urologic oncology" },
              { label: "Male infertility", value: "Male infertility" },
              { label: "Female urology", value: "Female urology" },
              { label: "Neurology", value: "Neurology" },
            ]}
          />
        </Grid>
      </Grid>{" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          Which of the following best describe the setting you spend the
          majority of your practice time?
        </Typography>
        <Grid size={12}>
          <Select
            {...register("practicearea")}
            control={control}
            options={[
              {
                label: "Academic institution or teaching hospital",
                value: "Academic institution or teaching hospital",
              },
              { label: "Private clinic", value: "Private clinic" },
              { label: "Community clinic", value: "Community clinic" },
              { label: "University hospital", value: "University hospital" },
              { label: "General", value: "General" },
              { label: "National hospital", value: "National hospital" },
            ]}
          />
        </Grid>
      </Grid>{" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Select Your Country</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select
            {...register("address.country")}
            control={control}
            // api="country"
          />
        </Grid>
      </Grid>
      <Grid size={12} container spacing={0} alignItems="flex-start" mt={4}>
        <Checkbox size="medium" {...register("terms")} control={control} />

        <Typography sx={{ flex: 1, ml: -1.5 }}>
          I agree for My Health Opinions Panel to use my information for the
          purposes of determining my eligibility and for contacting me in
          relation to participation in market research surveys. Also, I am
          agreeing to{" "}
          <Typography
            component={"a"}
            href="/terms"
            target="_blank"
            color="secondary.main"
            sx={{ textDecoration: "underline" }}
          >
            Terms & Conditions
          </Typography>{" "}
          and{" "}
          <Typography
            component={"a"}
            href="/privacy"
            target="_blank"
            color="secondary.main"
            sx={{ textDecoration: "underline" }}
          >
            Privacy Policy.
          </Typography>{" "}
        </Typography>
      </Grid>{" "}
    </>
  );
}

function PageTwo() {
  const {
    form,
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const differentEmail = watch("differentemail", false);
  return (
    <>
      {" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Enter Your Email</Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("email")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Confirm Your Email</Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("confirmemail")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container spacing={0} alignItems={"center"} mb={2}>
        <Checkbox
          size="medium"
          {...register("differentemail")}
          control={control}
        />

        <Typography sx={{ flex: 1, ml: -2 }}>
          Please send my Incentive E-transfer to a different email address
        </Typography>
      </Grid>{" "}
      <Collapse
        in={differentEmail}
        timeout="auto"
        unmountOnExit
        sx={{ width: "100%" }}
      >
        <>
          <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
            <Typography fontWeight={600}>Provide Different Email</Typography>
            <Grid sx={{ flex: 1 }}>
              <Input {...register("email2")} control={control} />
            </Grid>
          </Grid>
          <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
            <Typography fontWeight={600}>Confirm Your Email</Typography>
            <Grid sx={{ flex: 1 }}>
              <Input {...register("confirmemail2")} control={control} />
            </Grid>
          </Grid>
        </>
      </Collapse>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          Would you be interested in referring patients to us for our research
          studies in return for a referral fee?
        </Typography>
        <Box>
          <Radio
            control={control}
            {...register("referral")}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Box>
      </Grid>{" "}
    </>
  );
}

function PageThree() {
  const {
    form,
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>First Name</Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("firstname")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Last Name</Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("lastname")} control={control} />
        </Grid>
      </Grid>{" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>What is your Gender?</Typography>
        <Box>
          <Radio
            control={control}
            {...register("gender")}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Others", value: "other" },
            ]}
          />
        </Box>
      </Grid>{" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          Please Enter Your Date of Birth
        </Typography>
        <Grid sx={{ flex: 1 }}>
          <Date {...register("dob")} control={control} />
        </Grid>
      </Grid>{" "}
      <Grid size={12} container spacing={0.5} my={3} alignItems={"center"}>
        <Typography fontWeight={600}>Your Selected Country:</Typography>
        <Typography fontWeight={600} color="secondary">
          COUNTRY NAME
        </Typography>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Select Your State</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select {...register("address.state")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Select Your City</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select {...register("address.city")} control={control} />
        </Grid>
      </Grid>{" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Enter Zip-code</Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("address.zipcode")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          Which language you prefer to take surveys?
        </Typography>
        <Grid size={12}>
          <Select
            {...register("language")}
            control={control}
            options={[
              { label: "English", value: "English" },
              { label: "Italian", value: "Italian" },
              { label: "French", value: "French" },
              { label: "German", value: "German" },
              { label: "Spanish", value: "Spanish" },
              { label: "Portuguese", value: "Portuguese" },
              { label: "Japanese", value: "Japanese" },
              { label: "Dutch", value: "Dutch" },
              {
                label: "Chinese - Traditional",
                value: "Chinese - Traditional",
              },
              { label: "Chinese - Simplified", value: "Chinese - Simplified" },
              { label: "Russian", value: "Russian" },
            ]}
          />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          Are you Spanish or Hispanic origin?
        </Typography>
        <Box>
          <Radio
            control={control}
            {...register("origin")}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Box>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>What is Your Ethnicity?</Typography>
        <Grid size={12}>
          <Select
            {...register("ethnicity")}
            control={control}
            options={[
              { label: "White", value: "White" },
              { label: "Hispanic or Latino", value: "Hispanic or Latino" },
              {
                label: "Black or African American",
                value: "Black or African American",
              },
              {
                label: "Native American Or American Indian",
                value: "Native American Or American Indian",
              },
              {
                label: "Asian/ Pacific Islander",
                value: "Asian/ Pacific Islander",
              },
              { label: "Arab", value: "Arab" },
              { label: "Other", value: "Other" },
            ]}
          />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>What is Your Marital Status?</Typography>
        <Grid size={12}>
          <Select
            {...register("maritalstatus")}
            control={control}
            options={[
              { label: "Single", value: "Single" },
              { label: "Married", value: "Married" },
              { label: "Divorced", value: "Divorced" },
              { label: "Widow/Widower", value: "Widow/Widower" },
            ]}
          />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          Number of children below 18 live in your household?
        </Typography>
        <Grid size={12}>
          <Select
            {...register("children")}
            control={control}
            options={[
              { label: "0", value: "0" },
              { label: "1-3", value: "1-3" },
              { label: "4-6", value: "4-6" },
              { label: "7+", value: "7+" },
            ]}
          />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          What is your total household income (Annually)?
        </Typography>
        <Grid size={12}>
          <Select
            {...register("incomerange")}
            control={control}
            options={[
              {
                label: "Rs.50,000 to 1,50,000",
                value: "Rs.50,000 to 1,50,000",
              },
              {
                label: "Rs. 2,00,000 to 3,50,000",
                value: "Rs. 2,00,000 to 3,50,000",
              },
              {
                label: "Rs. 4,00,000 to 6,00,000",
                value: "Rs. 4,00,000 to 6,00,000",
              },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
}

function PageFour() {
  const {
    form,
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Enter Professional Address</Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("addressline1")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Locality/Street Name</Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("addressline2")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Nearby Landmark</Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("landmark")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Select State</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select {...register("state")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Select City</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select {...register("city")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Enter Zip/Postal Code</Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("zipcode")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Enter Phone Number</Typography>
        <Grid sx={{ flex: 1 }}>
          <Phone {...register("phone")} control={control} />
        </Grid>
      </Grid>
    </>
  );
}

function PageFive() {
  const {
    form,
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {" "}
      <Grid size={12} container alignItems={"center"} spacing={0.5} mb={3}>
        <Typography fontWeight={600}>Your Selected Country:</Typography>
        <Typography fontWeight={600} color="secondary">
          COUNTRY NAME
        </Typography>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          Name of Employer (Hospital or Clinic)
        </Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("employer")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          Your Employer Address(Building/Flat no.)
        </Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("workaddress.addressline1")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Locality/Street Name</Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("workaddress.addressline2")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Nearby Landmark</Typography>
        <Grid sx={{ flex: 1 }}>
          <Input {...register("workaddress.landmark")} control={control} />
        </Grid>
      </Grid>{" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>What is Your Hospital/Clinic Bed Size?</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select
            {...register("clinicsize")}
            control={control}
            options={[
              {
                label: "Small hospital: Fewer than 100 beds",
                value: "Small hospital: Fewer than 100 beds",
              },
              {
                label: "Medium hospitals: 100 to 499 beds",
                value: "Medium hospitals: 100 to 499 beds",
              },
              {
                label: "Large hospitals: 500 or more beds",
                value: "Large hospitals: 500 or more beds",
              },
            ]}
          />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>What is Your Hospital Type?</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select
            {...register("clinictype")}
            control={control}
            options={[
              {
                label: "Small hospital: Fewer than 100 beds",
                value: "Small hospital: Fewer than 100 beds",
              },
              {
                label: "Medium hospitals: 100 to 499 beds",
                value: "Medium hospitals: 100 to 499 beds",
              },
              {
                label: "Large hospitals: 500 or more beds",
                value: "Large hospitals: 500 or more beds",
              },
            ]}
          />
        </Grid>
      </Grid>{" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>What is your Hospital Grade?</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select
            {...register("clinicgrade")}
            control={control}
            options={[
              { label: "HC-1 (Excellent)", value: "HC-1 (Excellent)" },
              { label: "HC-2 (Very Good)", value: "HC-2 (Very Good)" },
              { label: "HC-3 (Good)", value: "HC-3 (Good)" },
              { label: "HC-4 (Satisfactory)", value: "HC-4 (Satisfactory)" },
              { label: "HC-5 (Moderate)", value: "HC-5 (Moderate)" },
              {
                label: "HC-6 (Below Moderate)",
                value: "HC-6 (Below Moderate)",
              },
              { label: "HC-7 (Poor)", value: "HC-7 (Poor)" },
            ]}
          />
        </Grid>
      </Grid>{" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          What is total experience you have in your field?
        </Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select
            {...register("experience")}
            control={control}
            options={[
              { label: "1-5 Years", value: "1-5 Years" },
              { label: "6-10 Years", value: "6-10 Years" },
              { label: "11-15 Years", value: "11-15 Years" },
              { label: "16-20 Years", value: "16-20 Years" },
              { label: "20+ Years", value: "20+ Years" },
            ]}
          />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>What are your key speciality?</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Input {...register("speciality")} control={control} />
        </Grid>
      </Grid>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>
          When did you complete your post graduate medical trainings?
        </Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Input {...register("pg")} control={control} />
        </Grid>
      </Grid>{" "}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Please upload your Education Certificate</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Button
            variant="outlined"
            color="secondary"
            component="label"
            sx={{ height: "30px", fontWeight: "bold" }}
          >
            Upload File
            <input type="file" hidden multiple />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

function PageSix() {
  const {
    form,
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedDegree = watch("degree");

  const degreeOptions = {
    "Associate Degree": [
      "Healthcare Administration",
      "Clinical Medical Assisting",
      "Healthcare Management",
      "Health Services Administration",
      "Dental Assistant",
      "Massage Therapy",
      "Medical Administration",
      "Medical Billing and Coding",
      "Medical Office Administration",
      "Medical Office Transcribing",
    ],
    "Bachelor's Degree": [
      "Healthcare Administration",
      "Registered Nursing",
      "Health Information Systems",
      "Health Services Management",
      "Long Term Care",
      "Healthcare Management",
      "Systems Health Administration",
    ],
    "Master's Degree": [
      "Health Administration",
      "Health Administration Gerontology",
      "Health Administration Informatics",
      "Health Care Management (MBA)",
    ],
    "Doctoral's Degree": [
      "Community Health Promotion and Education (Ph.D.)",
      "Counseling Studies (Doctoral)",
      "Health Management and Policy (Ph.D.)",
      "Health Services (Ph.D.)",
      "Public Health (Ph.D.)",
      "Doctor of Health Education",
      "Doctor of Health Science",
      "Doctor of Occupational Therapy",
      "Transitional Doctor of Physical Therapy",
      "Health Care Administration (Doctoral)",
      "Management of Nonprofit Agencies (Doctoral)",
    ],
  };

  return (
    <>
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>Choose your Medical Degree</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select
            {...register("degree")}
            control={control}
            options={[
              { label: "Associate Degree", value: "Associate Degree" },
              { label: "Master's Degree", value: "Master's Degree" },
              { label: "Bachelor's Degree", value: "Bachelor's Degree" },
              { label: "Doctoral's Degree", value: "Doctoral's Degree" },
            ]}
          />
        </Grid>
      </Grid>{" "}
      {selectedDegree && (
        <Grid container direction="column" spacing={0.5} mb={1.5}>
          <Typography fontWeight={600}>{selectedDegree}</Typography>
          <Grid sx={{ flex: 1 }}>
            <Select
              {...register(
                selectedDegree === "Associate Degree"
                  ? "associatedegree"
                  : selectedDegree === "Bachelor's Degree"
                  ? "bdegree"
                  : selectedDegree === "Master's Degree"
                  ? "mdegree"
                  : "phd"
              )}
              control={control}
              options={degreeOptions[selectedDegree].map((deg) => ({
                label: deg,
                value: deg,
              }))}
            />
          </Grid>
        </Grid>
      )}
      <Grid size={12} container direction="column" spacing={0.5} mb={1.5}>
        <Typography fontWeight={600}>When did you complete your medical training?</Typography>
        <Grid size={12} sx={{ flex: 1 }}>
          <Select
            {...register("yearofpassing")}
            control={control}
            options={[
              { label: "1972", value: "1972" },
              { label: "1973", value: "1973" },
              { label: "1974", value: "1974" },
              { label: "1975", value: "1975" },
              { label: "1976", value: "1976" },
              { label: "1977", value: "1977" },
              { label: "1978", value: "1978" },
              { label: "1979", value: "1979" },
              { label: "1980", value: "1980" },
              { label: "1981", value: "1981" },
              { label: "1982", value: "1982" },
              { label: "1983", value: "1983" },
              { label: "1984", value: "1984" },
              { label: "1985", value: "1985" },
              { label: "1986", value: "1986" },
              { label: "1987", value: "1987" },
              { label: "1988", value: "1988" },
              { label: "1989", value: "1989" },
              { label: "1990", value: "1990" },
              { label: "1991", value: "1991" },
              { label: "1992", value: "1992" },
              { label: "1993", value: "1993" },
              { label: "1994", value: "1994" },
              { label: "1995", value: "1995" },
              { label: "1996", value: "1996" },
              { label: "1997", value: "1997" },
              { label: "1998", value: "1998" },
              { label: "1999", value: "1999" },
              { label: "2000", value: "2000" },
              { label: "2001", value: "2001" },
              { label: "2002", value: "2002" },
              { label: "2003", value: "2003" },
              { label: "2004", value: "2004" },
              { label: "2005", value: "2005" },
              { label: "2006", value: "2006" },
              { label: "2007", value: "2007" },
              { label: "2008", value: "2008" },
              { label: "2009", value: "2009" },
              { label: "2010", value: "2010" },
              { label: "2011", value: "2011" },
              { label: "2012", value: "2012" },
              { label: "2013", value: "2013" },
              { label: "2014", value: "2014" },
              { label: "2015", value: "2015" },
              { label: "2016", value: "2016" },
              { label: "2017", value: "2017" },
              { label: "2018", value: "2018" },
              { label: "2019", value: "2019" },
              { label: "2020", value: "2020" },
              { label: "2021", value: "2021" },
              { label: "2022", value: "2022" },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
}

function FinalPage({ onClose }) {
  const router = useRouter();
  return (
    <Grid size={12} container direction="column" spacing={3}>
      <Grid
        size={12}
        container
        spacing={2}
        alignSelf="flex-start"
        alignItems="center"
        direction="column"
        mt={5}
        mb={8}
      >
        <CheckCircle color="primary" sx={{ fontSize: "80px" }} />
        <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
          Thank You for your valuable time
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              width: { xs: "95%", lg: "75%" },
              textAlign: "center",
            }}
          >
            Please wait while we connect You via Email.
          </Typography>
          <Typography fontSize={"13px"} sx={{ color: "grey" }}>
            Check Your Email For Activation link
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{ fontWeight: "bold", mt: 2 }}
          onClick={() => {
            router.push("/");
            onClose();
          }}
        >
          Home
        </Button>
      </Grid>
    </Grid>
  );
}
