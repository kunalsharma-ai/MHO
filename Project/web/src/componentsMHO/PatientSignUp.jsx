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
  "Email",
  "Address",
  "Work Profile",
  "Health Profile",
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
        backgroundColor: active ? "#06923E" : completed ? "#4caf50" : "#e0e0e0",
        color: "white",
        fontWeight: active ? "bold" : "normal",
        fontSize: "12px",
      }}
    >
      {completed ? <CheckCircle sx={{ fontSize: 16 }} /> : stepNumber}
    </div>
  );
}

// Reusable FormField component for rendering label and input
function FormField({ label, inputType, registerName, options, size = 12 }) {
  const { register, control } = useFormContext();
  const InputComponent = {
    Input,
    Select,
    Radio,
    Checkbox,
    Date,
  }[inputType];

  return (
    <Grid size={size} container direction="column" spacing={0.5} mb={1.5}>
      <Typography fontWeight={600}>{label}</Typography>
      <Grid sx={{ flex: 1, ...(size === 12 && { size: 12 }) }}>
        <InputComponent
          {...register(registerName)}
          control={control}
          {...(options && { options })}
        />
      </Grid>
    </Grid>
  );
}

// Reusable CheckboxWithText component for checkbox with text
function CheckboxWithText({
  registerName,
  label,
  children,
  alignItems = "flex-start",
  ml = -1.5,
}) {
  const { register, control } = useFormContext();
  return (
    <Grid size={12} container spacing={0} alignItems={alignItems} mt={3}>
      <Checkbox size="medium" {...register(registerName)} control={control} />
      <Typography sx={{ flex: 1, ml }}>
        {label}
        {children}
      </Typography>
    </Grid>
  );
}

export default function PatientSignUp({ onClose }) {
  const form = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 2) {
      handleSubmit(onSubmit)();
      setActiveStep(steps.length - 1);
    } else if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
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
            Patient Survey Form
          </Typography>
          <Typography textAlign={"center"} fontSize={"13px"}>
            Please fill out the survey to complete your application for Patient
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
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={(props) => <CustomStepIcon {...props} />}
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "12px",
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
          {activeStep === 5 && <FinalPage onClose={onClose} />}
        </Grid>
        {activeStep !== 5 && (
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
              endIcon={
                activeStep === steps.length - 2 ? undefined : (
                  <KeyboardArrowRight />
                )
              }
              onClick={handleNext}
              disabled={activeStep === 0 && !termsAccepted}
            >
              {activeStep === steps.length - 2 ? "Submit" : "Next"}
            </Button>
          </Grid>
        )}
      </Grid>
    </FormProvider>
  );
}

function PageOne() {
  return (
    <>
      <FormField
        label="First Name"
        inputType="Input"
        registerName="firstname"
      />
      <FormField label="Last Name" inputType="Input" registerName="lastname" />
      <FormField label="Date of Birth" inputType="Date" registerName="dob" />
      <FormField
        label="What is Your Gender?"
        inputType="Radio"
        registerName="gender"
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Others", value: "other" },
        ]}
      />
      <FormField
        label="What is Your Marital Status?"
        inputType="Select"
        registerName="maritalstatus"
        options={[
          { label: "Single", value: "Single" },
          { label: "Married", value: "Married" },
          { label: "Divorced", value: "Divorced" },
          { label: "Widow/Widower", value: "Widow/Widower" },
        ]}
      />
      <FormField
        label="Number of Children Below 18 in Your Household?"
        inputType="Select"
        registerName="children"
        options={[
          { label: "0", value: "0" },
          { label: "1-3", value: "1-3" },
          { label: "4-6", value: "4-6" },
          { label: "7-9", value: "7-9" },
          { label: "10+", value: "10+" },
        ]}
      />
      <CheckboxWithText registerName="terms">
        I agree for My Health Opinions Panel to use my information for the
        purposes of determining my eligibility and for contacting me in relation
        to participation in market research surveys. Also, I am agreeing to{" "}
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
      </CheckboxWithText>
    </>
  );
}

function PageTwo() {
  const { watch } = useFormContext();
  const differentEmail = watch("differentemail", false);

  return (
    <>
      <FormField
        label="Enter Your Email"
        inputType="Input"
        registerName="email"
      />
      <FormField
        label="Confirm Your Email"
        inputType="Input"
        registerName="cnfemail"
      />
      <CheckboxWithText
        registerName="differentemail"
        label="Please send my Incentive E-transfer to a different email address"
        alignItems="center"
        ml={-2}
      />
      <Collapse
        in={differentEmail}
        timeout="auto"
        unmountOnExit
        sx={{ width: "100%" }}
      >
        <>
          <FormField
            label="Provide Different Email"
            inputType="Input"
            registerName="email1"
          />
          <FormField
            label="Confirm Your Email"
            inputType="Input"
            registerName="cnfemail1"
          />
        </>
      </Collapse>
    </>
  );
}

function PageThree() {
  return (
    <>
      <FormField
        label="Select Your Country"
        inputType="Select"
        registerName="country"
      />
      <FormField
        label="Select Your State"
        inputType="Select"
        registerName="state"
      />
      <FormField
        label="Select Your City"
        inputType="Select"
        registerName="city"
      />
      <FormField
        label="Enter Your Zip/Pin Code"
        inputType="Input"
        registerName="zipcode"
      />
    </>
  );
}

function PageFour() {
  return (
    <>
      <FormField
        label="What is Your Qualification?"
        inputType="Select"
        registerName="qualification"
        options={[
          { label: "Associate Degree", value: "Associate Degree" },
          { label: "Bachelor Degree", value: "Bachelor Degree" },
          { label: "Masters Degree", value: "Masters Degree" },
          { label: "Post Graduate", value: "Post Graduate" },
          { label: "Some High School", value: "SomeHigh School" },
          {
            label: "High School Diploma/GED",
            value: "High School Diploma/GED",
          },
          { label: "Some College", value: "Some College" },
        ]}
      />
      <FormField
        label="What is Your Current Employment Status?"
        inputType="Select"
        registerName="empstat"
        options={[
          {
            label: "Employed full time (40 or more hours per week)",
            value: "Employed full time",
          },
          {
            label: "Employed part time (up to 39 hours per week)",
            value: "Employed part time",
          },
          {
            label: "Unemployed and currently looking for work",
            value: "Unemployed looking",
          },
          {
            label: "Unemployed and not currently looking for work",
            value: "Unemployed not looking",
          },
          { label: "Student", value: "Student" },
          { label: "Retired", value: "Retired" },
          { label: "Homemaker", value: "Homemaker" },
          { label: "Self-employed", value: "Self-employed" },
          { label: "Unable to work", value: "Unable to work" },
        ]}
      />
      <FormField
        label="What is Your Profession?"
        inputType="Select"
        registerName="profession"
        options={[
          { label: "Accountant", value: "accountant" },
          { label: "Actor", value: "actor" },
          { label: "Actress", value: "actress" },
          { label: "Air Traffic Controller", value: "Air traffic controller" },
          {
            label: "American Football Player",
            value: "American football player",
          },
          { label: "Architect", value: "Architect" },
          { label: "Artist", value: "Artist" },
          { label: "Attorney", value: "Attorney" },
          { label: "Banker", value: "Banker" },
          { label: "Barber", value: "Barber" },
          { label: "Bartender", value: "Bartender" },
          { label: "Bookkeeper", value: "Bookkeeper" },
          { label: "Boxer", value: "Boxer" },
          { label: "Builder", value: "Builder" },
          { label: "Businessman", value: "Businessman" },
          { label: "Businessperson", value: "Businessperson" },
          { label: "Businesswoman", value: "Businesswoman" },
          { label: "Butcher", value: "Butcher" },
          { label: "Cameraman", value: "Cameraman" },
          { label: "Carpenter", value: "Carpenter" },
          { label: "Cashier", value: "Cashier" },
          { label: "Catholic Nun", value: "Catholic nun" },
          { label: "Chef", value: "Chef" },
          { label: "Clown", value: "Clown" },
          { label: "Coach", value: "Coach" },
          { label: "Construction Worker", value: "Construction worker" },
          { label: "Dental Hygienist", value: "Dental hygienist" },
          { label: "Dentist", value: "Dentist" },
          { label: "Designer", value: "Designer" },
          { label: "Detective", value: "Detective" },
          { label: "Developer", value: "Developer" },
          { label: "Dietician", value: "Dietician" },
          { label: "Diver", value: "Diver" },
          { label: "Doctor", value: "Doctor" },
          { label: "Doorman", value: "Doorman" },
          { label: "Economist", value: "Economist" },
          { label: "Editor", value: "Editor" },
          { label: "Electrician", value: "Electrician" },
          { label: "Engineer", value: "Engineer" },
          { label: "Farmer", value: "Farmer" },
          { label: "Filmmaker", value: "Filmmaker" },
          { label: "Fireman", value: "Fireman" },
          { label: "Fisherman", value: "Fisherman" },
          { label: "Flight Attendant", value: "Flight attendant" },
          { label: "Footballer", value: "Footballer" },
          { label: "Foreman", value: "Foreman" },
          { label: "Forest Ranger", value: "Forest ranger" },
          { label: "Gardener", value: "Gardener" },
          { label: "Geisha", value: "Geisha" },
          { label: "Housekeeper", value: "Housekeeper" },
          { label: "Housewife", value: "Housewife" },
          { label: "Jeweler", value: "jeweler" },
          { label: "Journalist", value: "Journalist" },
          { label: "Judge", value: "judge" },
          { label: "Lawyer", value: "lawyer" },
          { label: "Librarian", value: "Librarian" },
          { label: "Lifeguard", value: "Lifeguard" },
          { label: "Lunchroom Supervisor", value: "Lunchroom supervisor" },
          { label: "Magician", value: "Magician" },
          { label: "Mechanic", value: "mechanic" },
          { label: "Musician", value: "musician" },
          { label: "Nurse", value: "nurse" },
          { label: "Nutritionist", value: "nutritionist" },
          { label: "Optician", value: "optician" },
          { label: "Painter", value: "Painter" },
          { label: "Paramedic", value: "Paramedic" },
          { label: "Pharmacist", value: "Pharmacist" },
          { label: "Photographer", value: "Photographer" },
          { label: "Physician", value: "Physician" },
          { label: "Physician's Assistant", value: "Physicians assistant" },
          { label: "Pilot", value: "Pilot" },
          { label: "Pirate", value: "Pirate" },
          { label: "Plumber", value: "Plumber" },
          { label: "Police Officer", value: "Police officer" },
          { label: "Politician", value: "Politician" },
          { label: "Pope", value: "Pope" },
          { label: "Postman", value: "Postman" },
          { label: "Priest", value: "Priest" },
          { label: "Professor", value: "Professor" },
          { label: "Programmer", value: "Programmer" },
          { label: "Psychologist", value: "Psychologist" },
          { label: "Receptionist", value: "receptionist" },
          { label: "Repairman", value: "Repairman" },
          { label: "Reporter", value: "Reporter" },
          { label: "Salesman", value: "salesman" },
          { label: "Salesperson", value: "salesperson" },
          { label: "Saleswoman", value: "saleswoman" },
          { label: "Scientist", value: "Scientist" },
          { label: "Secretary", value: "secretary" },
          { label: "Singer", value: "singer" },
          { label: "Soldier", value: "Soldier" },
          { label: "Student", value: "Student" },
          { label: "Surgeon", value: "surgeon" },
          { label: "Teacher", value: "teacher" },
          { label: "Therapist", value: "therapist" },
          { label: "Train Conductor", value: "Train conductor" },
          { label: "Translator", value: "translator" },
          { label: "Undertaker", value: "undertaker" },
          { label: "Veterinarian", value: "veterinarian" },
          { label: "Videographer", value: "videographer" },
          { label: "Waiter", value: "waiter" },
          { label: "Waitress", value: "waitress" },
          { label: "Writer", value: "writer" },
          { label: "Other", value: "other" },
        ]}
      />
      <FormField
        label="What is Your Income (Annually)?"
        inputType="Select"
        registerName="income"
        options={[
          { label: "Less than $20,000", value: "Less than $20,000" },
          { label: "$20,000 to $34,999", value: "$20,000 to $34,999" },
          { label: "$35,000 to $49,999", value: "$35,000 to $49,999" },
          { label: "$50,000 to $74,999", value: "$50,000 to $74,999" },
          { label: "$75,000 to $99,999", value: "$75,000 to $99,999" },
          { label: "$100,000 to $149,999", value: "$100,000 to $149,999" },
          { label: "$150,000 to $199,999", value: "$150,000 to $199,999" },
          { label: "$200,000 or more", value: "$200,000 or more" },
        ]}
      />
    </>
  );
}

function PageFive() {
  return (
    <>
      <FormField
        label="Which Disease Have You or Anyone at Your Home Been Diagnosed With?"
        inputType="Select"
        registerName="disease"
        options={[
          { label: "Acne", value: "Acne" },
          { label: "Acute cholecystitis", value: "Acute cholecystitis" },
          {
            label: "Acute lymphoblastic leukaemia",
            value: "Acute lymphoblastic leukaemia",
          },
          {
            label: "Acute lymphoblastic leukaemia: Children",
            value: "Acute lymphoblastic leukaemia: Children",
          },
          {
            label: "Acute lymphoblastic leukaemia: Teenagers and young adults",
            value: "Acute lymphoblastic leukaemia: Teenagers and young adults",
          },
          {
            label: "Acute myeloid leukaemia",
            value: "Acute myeloid leukaemia",
          },
          {
            label: "Acute myeloid leukaemia: Children",
            value: "Acute myeloid leukaemia: Children",
          },
          {
            label: "Acute myeloid leukaemia: Teenagers and young adults",
            value: "Acute myeloid leukaemia: Teenagers and young adults",
          },
          { label: "Acute pancreatitis", value: "Acute pancreatitis" },
          { label: "Addison's disease", value: "Addison's disease" },
          {
            label: "Alcohol-related liver disease",
            value: "Alcohol-related liver disease",
          },
          { label: "Allergic rhinitis", value: "Allergic rhinitis" },
          { label: "Allergies", value: "Allergies" },
          { label: "Alzheimer's disease", value: "Alzheimer's disease" },
          { label: "Anal cancer", value: "Anal cancer" },
          { label: "Anaphylaxis", value: "Anaphylaxis" },
          { label: "Angioedema", value: "Angioedema" },
          { label: "Ankylosing spondylitis", value: "Ankylosing spondylitis" },
          { label: "Anorexia nervosa", value: "Anorexia nervosa" },
          { label: "Anxiety", value: "Anxiety" },
          { label: "Anxiety disorders", value: "Anxiety disorders" },
          {
            label: "Anxiety disorders in children",
            value: "Anxiety disorders in children",
          },
          { label: "Appendicitis", value: "Appendicitis" },
          { label: "Arthritis", value: "Arthritis" },
          { label: "Asbestosis", value: "Asbestosis" },
          { label: "Asthma", value: "Asthma" },
          { label: "Atopic eczema", value: "Atopic eczema" },
          {
            label: "Attention deficit hyperactivity disorder (ADHD)",
            value: "Attention deficit hyperactivity disorder (ADHD)",
          },
          {
            label: "Autistic spectrum disorder (ASD)",
            value: "Autistic spectrum disorder (ASD)",
          },
          { label: "Autoimmune diseases", value: "Autoimmune diseases" },
          { label: "Bacterial vaginosis", value: "Bacterial vaginosis" },
          {
            label: "Benign prostate enlargement",
            value: "Benign prostate enlargement",
          },
          {
            label: "Bile duct cancer (cholangiocarcinoma)",
            value: "Bile duct cancer (cholangiocarcinoma)",
          },
          { label: "Binge eating", value: "Binge eating" },
          { label: "Binge eating disorder", value: "Binge eating disorder" },
          { label: "Bipolar disorder", value: "Bipolar disorder" },
          { label: "Birth control methods", value: "Birth control methods" },
          { label: "Bladder cancer", value: "Bladder cancer" },
          { label: "Bladder control", value: "Bladder control" },
          {
            label: "Bladder pain syndrome (interstitial cystitis)",
            value: "Bladder pain syndrome (interstitial cystitis)",
          },
          { label: "Bleeding disorders", value: "Bleeding disorders" },
          {
            label: "Blood poisoning (sepsis)",
            value: "Blood poisoning (sepsis)",
          },
          { label: "Body image", value: "Body image" },
          { label: "Bone cancer", value: "Bone cancer" },
          {
            label: "Bone cancer: Teenagers and young adults",
            value: "Bone cancer: Teenagers and young adults",
          },
          { label: "Bowel cancer", value: "Bowel cancer" },
          { label: "Bowel incontinence", value: "Bowel incontinence" },
          { label: "Bowel polyps", value: "Bowel polyps" },
          { label: "Brain stem death", value: "Brain stem death" },
          { label: "Brain tumours", value: "Brain tumours" },
          {
            label: "Brain tumours: Children",
            value: "Brain tumours: Children",
          },
          {
            label: "Brain tumours: Teenagers and young adults",
            value: "Brain tumours: Teenagers and young adults",
          },
          { label: "Breast cancer", value: "Breast cancer" },
          { label: "Breast cancer (female)", value: "Breast cancer (female)" },
          { label: "Breast cancer (male)", value: "Breast cancer (male)" },
          {
            label: "Breast reconstruction after mastectomy",
            value: "Breast reconstruction after mastectomy",
          },
          { label: "Breastfeeding", value: "Breastfeeding" },
          { label: "Bronchiectasis", value: "Bronchiectasis" },
          { label: "Bronchitis", value: "Bronchitis" },
          { label: "Bulimia", value: "Bulimia" },
          { label: "Bulimia nervosa", value: "Bulimia nervosa" },
          { label: "Bunion", value: "Bunion" },
          { label: "Cancer", value: "Cancer" },
          {
            label: "Carcinoid syndrome and carcinoid tumours",
            value: "Carcinoid syndrome and carcinoid tumours",
          },
          { label: "Caregiver stress", value: "Caregiver stress" },
          { label: "Carpal tunnel syndrome", value: "Carpal tunnel syndrome" },
          { label: "Catarrh", value: "Catarrh" },
          { label: "Cellulitis", value: "Cellulitis" },
          { label: "Cervical cancer", value: "Cervical cancer" },
          { label: "Chest infection", value: "Chest infection" },
          { label: "Chest pain", value: "Chest pain" },
          { label: "Chickenpox", value: "Chickenpox" },
          { label: "Chilblains", value: "Chilblains" },
          { label: "Chlamydia", value: "Chlamydia" },
          {
            label: "Chronic fatigue syndrome",
            value: "Chronic fatigue syndrome",
          },
          {
            label:
              "Chronic fatigue syndrome/myalgic encephalomyelitis (ME/CFS)",
            value:
              "Chronic fatigue syndrome/myalgic encephalomyelitis (ME/CFS)",
          },
          { label: "Chronic kidney disease", value: "Chronic kidney disease" },
          {
            label: "Chronic lymphocytic leukaemia",
            value: "Chronic lymphocytic leukaemia",
          },
          {
            label: "Chronic myeloid leukaemia",
            value: "Chronic myeloid leukaemia",
          },
          {
            label: "Chronic obstructive pulmonary disease",
            value: "Chronic obstructive pulmonary disease",
          },
          {
            label: "Chronic obstructive pulmonary disease (COPD)",
            value: "Chronic obstructive pulmonary disease (COPD)",
          },
          { label: "Chronic pancreatitis", value: "Chronic pancreatitis" },
          { label: "Cirrhosis", value: "Cirrhosis" },
          { label: "Clostridium difficile", value: "Clostridium difficile" },
          { label: "Coeliac disease", value: "Coeliac disease" },
          { label: "Cold sore", value: "Cold sore" },
          { label: "Coma", value: "Coma" },
          { label: "Common cold", value: "Common cold" },
          {
            label: "Common heart conditions",
            value: "Common heart conditions",
          },
          {
            label: "Congenital heart disease",
            value: "Congenital heart disease",
          },
          { label: "Conjunctivitis", value: "Conjunctivitis" },
          { label: "Constipation", value: "Constipation" },
          { label: "Coronavirus (COVID-19)", value: "Coronavirus (COVID-19)" },
          { label: "Cough", value: "Cough" },
          { label: "Crohn's disease", value: "Crohn's disease" },
          { label: "Croup", value: "Croup" },
          { label: "Cystic fibrosis", value: "Cystic fibrosis" },
          { label: "Cystitis", value: "Cystitis" },
          { label: "Date rape drugs", value: "Date rape drugs" },
          { label: "Deafblindness", value: "Deafblindness" },
          { label: "Deep vein thrombosis", value: "Deep vein thrombosis" },
          { label: "Dehydration", value: "Dehydration" },
          { label: "Dementia", value: "Dementia" },
          {
            label: "Dementia with Lewy bodies",
            value: "Dementia with Lewy bodies",
          },
          { label: "Dental abscess", value: "Dental abscess" },
          { label: "Depression", value: "Depression" },
          {
            label: "Depression during and after pregnancy",
            value: "Depression during and after pregnancy",
          },
          {
            label: "Dermatitis herpetiformis",
            value: "Dermatitis herpetiformis",
          },
          { label: "Diabetes", value: "Diabetes" },
          { label: "Diarrhoea", value: "Diarrhoea" },
          { label: "Discoid eczema", value: "Discoid eczema" },
          {
            label: "Diverticular disease and diverticulitis",
            value: "Diverticular disease and diverticulitis",
          },
          {
            label: "Dizziness (Lightheadedness)",
            value: "Dizziness (Lightheadedness)",
          },
          {
            label: "Domestic violence/abuse",
            value: "Domestic violence/abuse",
          },
          { label: "Douching", value: "Douching" },
          { label: "Down's syndrome", value: "Down's syndrome" },
          { label: "Dry mouth", value: "Dry mouth" },
          {
            label: "Dysphagia (swallowing problems)",
            value: "Dysphagia (swallowing problems)",
          },
          { label: "Dystonia", value: "Dystonia" },
          { label: "Earache", value: "Earache" },
          { label: "Earwax build-up", value: "Earwax build-up" },
          { label: "Eating disorders", value: "Eating disorders" },
          { label: "Ebola virus disease", value: "Ebola virus disease" },
          { label: "Ectopic pregnancy", value: "Ectopic pregnancy" },
          {
            label: "Emergency birth control/emergency contraception",
            value: "Emergency birth control/emergency contraception",
          },
          { label: "Endometriosis", value: "Endometriosis" },
          { label: "Epilepsy", value: "Epilepsy" },
          {
            label: "Erectile dysfunction (impotence)",
            value: "Erectile dysfunction (impotence)",
          },
          {
            label: "Escherichia coli (E. coli) O157",
            value: "Escherichia coli (E. coli) O157",
          },
          { label: "Ewing sarcoma", value: "Ewing sarcoma" },
          {
            label: "Ewing sarcoma: Children",
            value: "Ewing sarcoma: Children",
          },
          { label: "Eye cancer", value: "Eye cancer" },
          { label: "Febrile seizures", value: "Febrile seizures" },
          {
            label: "Female genital mutilation or cutting (FGM/C)",
            value: "Female genital mutilation or cutting (FGM/C)",
          },
          { label: "Fever in adults", value: "Fever in adults" },
          { label: "Fever in children", value: "Fever in children" },
          { label: "Fibroids", value: "Fibroids" },
          { label: "Fibroids (uterine)", value: "Fibroids (uterine)" },
          { label: "Fibromyalgia", value: "Fibromyalgia" },
          { label: "Fitness", value: "Fitness" },
          { label: "Flatulence", value: "Flatulence" },
          { label: "Flu", value: "Flu" },
          {
            label: "Foetal alcohol syndrome",
            value: "Foetal alcohol syndrome",
          },
          { label: "Folic acid", value: "Folic acid" },
          { label: "Food poisoning", value: "Food poisoning" },
          { label: "Fungal nail infection", value: "Fungal nail infection" },
          { label: "Gallbladder cancer", value: "Gallbladder cancer" },
          { label: "Gallstones", value: "Gallstones" },
          { label: "Ganglion cyst", value: "Ganglion cyst" },
          {
            label: "Gastro-oesophageal reflux disease (GORD)",
            value: "Gastro-oesophageal reflux disease (GORD)",
          },
          { label: "Gastroenteritis", value: "Gastroenteritis" },
          { label: "Genital herpes", value: "Genital herpes" },
          { label: "Genital warts", value: "Genital warts" },
          { label: "Germ cell tumours", value: "Germ cell tumours" },
          { label: "Getting active", value: "Getting active" },
          { label: "Glandular fever", value: "Glandular fever" },
          { label: "Gonorrhea", value: "Gonorrhea" },
          { label: "Gonorrhoea", value: "Gonorrhoea" },
          { label: "Gout", value: "Gout" },
          { label: "Graves' disease", value: "Graves' disease" },
          { label: "Gum disease", value: "Gum disease" },
          { label: "Haemorrhoids (piles)", value: "Haemorrhoids (piles)" },
          { label: "Hairy cell leukaemia", value: "Hairy cell leukaemia" },
          {
            label: "Hand, foot and mouth disease",
            value: "Hand, foot and mouth disease",
          },
          { label: "Hashimoto's disease", value: "Hashimoto's disease" },
          { label: "Hay fever", value: "Hay fever" },
          { label: "Head and neck cancer", value: "Head and neck cancer" },
          { label: "Head lice and nits", value: "Head lice and nits" },
          { label: "Headaches", value: "Headaches" },
          {
            label:
              "Health Information Gateway (formerly Quick Health Data Online)",
            value:
              "Health Information Gateway (formerly Quick Health Data Online)",
          },
          { label: "Healthcare and women", value: "Healthcare and women" },
          { label: "Healthy eating", value: "Healthy eating" },
          { label: "Healthy living by age", value: "Healthy living by age" },
          { label: "Healthy weight", value: "Healthy weight" },
          { label: "Hearing loss", value: "Hearing loss" },
          { label: "Heart disease", value: "Heart disease" },
          { label: "Heart failure", value: "Heart failure" },
          { label: "Heart-healthy eating", value: "Heart-healthy eating" },
          { label: "Hepatitis", value: "Hepatitis" },
          { label: "Hepatitis A", value: "Hepatitis A" },
          { label: "Hepatitis B", value: "Hepatitis B" },
          { label: "Hepatitis C", value: "Hepatitis C" },
          { label: "Herpes", value: "Herpes" },
          { label: "Hiatus hernia", value: "Hiatus hernia" },
          { label: "High cholesterol", value: "High cholesterol" },
          { label: "HIV", value: "HIV" },
          { label: "HIV and AIDS", value: "HIV and AIDS" },
          { label: "Hodgkin lymphoma", value: "Hodgkin lymphoma" },
          {
            label: "Hodgkin lymphoma: Children",
            value: "Hodgkin lymphoma: Children",
          },
          {
            label: "Hodgkin lymphoma: Teenagers and young adults",
            value: "Hodgkin lymphoma: Teenagers and young adults",
          },
          {
            label: "Human papillomavirus (HPV)",
            value: "Human papillomavirus (HPV)",
          },
          { label: "Huntington's disease", value: "Huntington's disease" },
          {
            label: "Hyperglycaemia (high blood sugar)",
            value: "Hyperglycaemia (high blood sugar)",
          },
          { label: "Hyperhidrosis", value: "Hyperhidrosis" },
          {
            label: "Hypoglycaemia (low blood sugar)",
            value: "Hypoglycaemia (low blood sugar)",
          },
          { label: "Hysterectomy", value: "Hysterectomy" },
          {
            label: "Idiopathic pulmonary fibrosis",
            value: "Idiopathic pulmonary fibrosis",
          },
          { label: "Impetigo", value: "Impetigo" },
          { label: "Indigestion", value: "Indigestion" },
          { label: "Infertility", value: "Infertility" },
          {
            label: "Inflammatory bowel disease (IBD)",
            value: "Inflammatory bowel disease (IBD)",
          },
          { label: "Ingrown toenail", value: "Ingrown toenail" },
          {
            label: "Inherited heart conditions",
            value: "Inherited heart conditions",
          },
          { label: "Insomnia", value: "Insomnia" },
          {
            label: "Interstitial cystitis (bladder pain syndrome)",
            value: "Interstitial cystitis (bladder pain syndrome)",
          },
          {
            label: "Iron deficiency anaemia",
            value: "Iron deficiency anaemia",
          },
          { label: "Iron-deficiency anemia", value: "Iron-deficiency anemia" },
          {
            label: "Irritable bowel syndrome (IBS)",
            value: "Irritable bowel syndrome (IBS)",
          },
          { label: "Irritable hip", value: "Irritable hip" },
          { label: "Itching", value: "Itching" },
          { label: "Itchy bottom", value: "Itchy bottom" },
          { label: "Kaposi's sarcoma", value: "Kaposi's sarcoma" },
          { label: "Kidney cancer", value: "Kidney cancer" },
          { label: "Kidney infection", value: "Kidney infection" },
          { label: "Kidney stones", value: "Kidney stones" },
          { label: "Labyrinthitis", value: "Labyrinthitis" },
          { label: "Lactose intolerance", value: "Lactose intolerance" },
          {
            label: "Langerhans cell histiocytosis",
            value: "Langerhans cell histiocytosis",
          },
          {
            label: "Laryngeal (larynx) cancer",
            value: "Laryngeal (larynx) cancer",
          },
          { label: "Laryngitis", value: "Laryngitis" },
          { label: "Leg cramps", value: "Leg cramps" },
          { label: "Lichen planus", value: "Lichen planus" },
          { label: "Liver cancer", value: "Liver cancer" },
          { label: "Liver disease", value: "Liver disease" },
          { label: "Liver tumours", value: "Liver tumours" },
          { label: "Loss of libido", value: "Loss of libido" },
          { label: "Lung cancer", value: "Lung cancer" },
          { label: "Lupus", value: "Lupus" },
          { label: "Lyme disease", value: "Lyme disease" },
          { label: "Lymphoedema", value: "Lymphoedema" },
          {
            label: "Lymphogranuloma venereum (LGV)",
            value: "Lymphogranuloma venereum (LGV)",
          },
          { label: "Make the Call", value: "Make the Call" },
          { label: "Malaria", value: "Malaria" },
          {
            label: "Malignant brain tumour (cancerous)",
            value: "Malignant brain tumour (cancerous)",
          },
          { label: "Malnutrition", value: "Malnutrition" },
          { label: "Mammograms", value: "Mammograms" },
          { label: "Measles", value: "Measles" },
          { label: "Meniere's disease", value: "Meniere's disease" },
          { label: "Meningitis", value: "Meningitis" },
          { label: "Menopause", value: "Menopause" },
          { label: "Menstrual cycle", value: "Menstrual cycle" },
          { label: "Mental health", value: "Mental health" },
          { label: "Mesothelioma", value: "Mesothelioma" },
          {
            label: "Middle ear infection (otitis media)",
            value: "Middle ear infection (otitis media)",
          },
          { label: "Migraine", value: "Migraine" },
          { label: "Miscarriage", value: "Miscarriage" },
          {
            label: "Motor neurone disease (MND)",
            value: "Motor neurone disease (MND)",
          },
          { label: "Mouth cancer", value: "Mouth cancer" },
          { label: "Mouth ulcer", value: "Mouth ulcer" },
          { label: "Multiple myeloma", value: "Multiple myeloma" },
          {
            label: "Multiple sclerosis (MS)",
            value: "Multiple sclerosis (MS)",
          },
          { label: "Mumps", value: "Mumps" },
          {
            label:
              "Myalgic encephalomyelitis/chronic fatigue syndrome (ME/CFS)",
            value:
              "Myalgic encephalomyelitis/chronic fatigue syndrome (ME/CFS)",
          },
          { label: "Myasthenia gravis", value: "Myasthenia gravis" },
          { label: "Nasal and sinus cancer", value: "Nasal and sinus cancer" },
          { label: "Nasopharyngeal cancer", value: "Nasopharyngeal cancer" },
          {
            label: "National Women and Girls HIV/AIDS Awareness Day",
            value: "National Women and Girls HIV/AIDS Awareness Day",
          },
          {
            label: "National Women's Health Week",
            value: "National Women's Health Week",
          },
          {
            label: "Neonatal Abstinence Syndrome/Opioid Withdrawal in Infants",
            value: "Neonatal Abstinence Syndrome/Opioid Withdrawal in Infants",
          },
          { label: "Neuroblastoma", value: "Neuroblastoma" },
          {
            label: "Neuroblastoma: Children",
            value: "Neuroblastoma: Children",
          },
          { label: "Neuroendocrine tumours", value: "Neuroendocrine tumours" },
          {
            label: "Non-alcoholic fatty liver disease (NAFLD)",
            value: "Non-alcoholic fatty liver disease (NAFLD)",
          },
          { label: "Non-Hodgkin lymphoma", value: "Non-Hodgkin lymphoma" },
          {
            label: "Non-Hodgkin lymphoma: Children",
            value: "Non-Hodgkin lymphoma: Children",
          },
          { label: "Norovirus", value: "Norovirus" },
          { label: "Nosebleed", value: "Nosebleed" },
          {
            label: "Nursing (breastfeeding)",
            value: "Nursing (breastfeeding)",
          },
          { label: "Nutrition", value: "Nutrition" },
          { label: "Obesity", value: "Obesity" },
          {
            label: "Obsessive compulsive disorder (OCD)",
            value: "Obsessive compulsive disorder (OCD)",
          },
          {
            label: "Obstructive sleep apnoea",
            value: "Obstructive sleep apnoea",
          },
          { label: "Oesophageal cancer", value: "Oesophageal cancer" },
          { label: "Oral health", value: "Oral health" },
          { label: "Oral thrush in adults", value: "Oral thrush in adults" },
          { label: "Osteoarthritis", value: "Osteoarthritis" },
          { label: "Osteoporosis", value: "Osteoporosis" },
          { label: "Osteosarcoma", value: "Osteosarcoma" },
          { label: "Otitis externa", value: "Otitis externa" },
          { label: "Ovarian cancer", value: "Ovarian cancer" },
          {
            label: "Ovarian cancer: Teenagers and young adults",
            value: "Ovarian cancer: Teenagers and young adults",
          },
          { label: "Ovarian cyst", value: "Ovarian cyst" },
          { label: "Ovarian cysts", value: "Ovarian cysts" },
          {
            label: "Ovarian syndrome (PCOS or polycystic ovary syndrome)",
            value: "Ovarian syndrome (PCOS or polycystic ovary syndrome)",
          },
          { label: "Overactive thyroid", value: "Overactive thyroid" },
          {
            label: "Overweight, obesity, and weight loss",
            value: "Overweight, obesity, and weight loss",
          },
          { label: "Ovulation calculator", value: "Ovulation calculator" },
          {
            label: "Paget's disease of the nipple",
            value: "Paget's disease of the nipple",
          },
          { label: "Pancreatic cancer", value: "Pancreatic cancer" },
          { label: "Panic disorder", value: "Panic disorder" },
          { label: "Pap and HPV tests", value: "Pap and HPV tests" },
          { label: "Parkinson's disease", value: "Parkinson's disease" },
          {
            label: "Pelvic inflammatory disease",
            value: "Pelvic inflammatory disease",
          },
          {
            label: "Pelvic inflammatory disease (PID)",
            value: "Pelvic inflammatory disease (PID)",
          },
          { label: "Pelvic organ prolapse", value: "Pelvic organ prolapse" },
          { label: "Penile cancer", value: "Penile cancer" },
          { label: "Period (menstruation)", value: "Period (menstruation)" },
          { label: "Peripheral neuropathy", value: "Peripheral neuropathy" },
          { label: "Personality disorder", value: "Personality disorder" },
          {
            label: "Physical activity (exercise)",
            value: "Physical activity (exercise)",
          },
          { label: "Pleurisy", value: "Pleurisy" },
          { label: "Pneumonia", value: "Pneumonia" },
          {
            label: "Polycystic ovary syndrome (PCOS)",
            value: "Polycystic ovary syndrome (PCOS)",
          },
          { label: "Polymyalgia rheumatica", value: "Polymyalgia rheumatica" },
          {
            label: "Post-traumatic stress disorder (PTSD)",
            value: "Post-traumatic stress disorder (PTSD)",
          },
          { label: "Postnatal depression", value: "Postnatal depression" },
          { label: "Postpartum depression", value: "Postpartum depression" },
          { label: "Pregnancy", value: "Pregnancy" },
          { label: "Pregnancy and baby", value: "Pregnancy and baby" },
          {
            label: "Pregnancy and medicines",
            value: "Pregnancy and medicines",
          },
          { label: "Pregnancy tests", value: "Pregnancy tests" },
          {
            label: "Premenstrual syndrome (PMS)",
            value: "Premenstrual syndrome (PMS)",
          },
          { label: "Prenatal care", value: "Prenatal care" },
          { label: "Pressure ulcers", value: "Pressure ulcers" },
          { label: "Prostate cancer", value: "Prostate cancer" },
          { label: "Psoriasis", value: "Psoriasis" },
          { label: "Psoriatic arthritis", value: "Psoriatic arthritis" },
          { label: "Psychosis", value: "Psychosis" },
          { label: "Pubic lice", value: "Pubic lice" },
          { label: "Rare tumours", value: "Rare tumours" },
          { label: "Raynaud's phenomenon", value: "Raynaud's phenomenon" },
          { label: "Reactive arthritis", value: "Reactive arthritis" },
          { label: "Restless legs syndrome", value: "Restless legs syndrome" },
          { label: "Retinoblastoma", value: "Retinoblastoma" },
          {
            label: "Retinoblastoma: Children",
            value: "Retinoblastoma: Children",
          },
          { label: "Rhabdomyosarcoma", value: "Rhabdomyosarcoma" },
          { label: "Rheumatoid arthritis", value: "Rheumatoid arthritis" },
          {
            label: "Ringworm and other fungal infections",
            value: "Ringworm and other fungal infections",
          },
          { label: "Rosacea", value: "Rosacea" },
          { label: "Scabies", value: "Scabies" },
          { label: "Scarlet fever", value: "Scarlet fever" },
          { label: "Schizophrenia", value: "Schizophrenia" },
          { label: "Scoliosis", value: "Scoliosis" },
          {
            label: "Screening tests and vaccines",
            value: "Screening tests and vaccines",
          },
          { label: "Septic shock", value: "Septic shock" },
          { label: "Sexual assault", value: "Sexual assault" },
          {
            label: "Sexually transmitted infections (STDs, STIs)",
            value: "Sexually transmitted infections (STDs, STIs)",
          },
          {
            label:
              "Sexually transmitted infections (STIs), pregnancy, and breastfeeding",
            value:
              "Sexually transmitted infections (STIs), pregnancy, and breastfeeding",
          },
          { label: "Shingles", value: "Shingles" },
          { label: "Shortness of breath", value: "Shortness of breath" },
          { label: "Sickle cell disease", value: "Sickle cell disease" },
          { label: "Sinusitis", value: "Sinusitis" },
          { label: "Sjogren's syndrome", value: "Sjogren's syndrome" },
          { label: "Skin cancer (melanoma)", value: "Skin cancer (melanoma)" },
          {
            label: "Skin cancer (non-melanoma)",
            value: "Skin cancer (non-melanoma)",
          },
          { label: "Slapped cheek syndrome", value: "Slapped cheek syndrome" },
          { label: "Sleep and your health", value: "Sleep and your health" },
          { label: "Soft tissue sarcomas", value: "Soft tissue sarcomas" },
          {
            label: "Soft tissue sarcomas: Teenagers and young adults",
            value: "Soft tissue sarcomas: Teenagers and young adults",
          },
          { label: "Sore throat", value: "Sore throat" },
          {
            label: "Spider veins and varicose veins",
            value: "Spider veins and varicose veins",
          },
          {
            label: "Spleen problems and spleen removal",
            value: "Spleen problems and spleen removal",
          },
          { label: "Stillbirth", value: "Stillbirth" },
          {
            label: "Stomach ache and abdominal pain",
            value: "Stomach ache and abdominal pain",
          },
          { label: "Stomach cancer", value: "Stomach cancer" },
          { label: "Stomach ulcer", value: "Stomach ulcer" },
          { label: "Stress and your health", value: "Stress and your health" },
          {
            label: "Stress, anxiety and low mood",
            value: "Stress, anxiety and low mood",
          },
          { label: "Stroke", value: "Stroke" },
          {
            label: "Sudden infant death syndrome (SIDS)",
            value: "Sudden infant death syndrome (SIDS)",
          },
          { label: "Suicide", value: "Suicide" },
          { label: "Sunburn", value: "Sunburn" },
          { label: "Swollen glands", value: "Swollen glands" },
          { label: "Syphilis", value: "Syphilis" },
          { label: "Testicular cancer", value: "Testicular cancer" },
          {
            label: "Testicular cancer: Teenagers and young adults",
            value: "Testicular cancer: Teenagers and young adults",
          },
          {
            label: "Testicular lumps and swellings",
            value: "Testicular lumps and swellings",
          },
          { label: "Thirst", value: "Thirst" },
          { label: "Threadworms", value: "Threadworms" },
          { label: "Thrush", value: "Thrush" },
          { label: "Thrush in men", value: "Thrush in men" },
          { label: "Thyroid cancer", value: "Thyroid cancer" },
          {
            label: "Thyroid cancer: Teenagers and young adults",
            value: "Thyroid cancer: Teenagers and young adults",
          },
          { label: "Thyroid disease", value: "Thyroid disease" },
          { label: "Tinnitus", value: "Tinnitus" },
          { label: "Tonsillitis", value: "Tonsillitis" },
          { label: "Tooth decay", value: "Tooth decay" },
          { label: "Toothache", value: "Toothache" },
          {
            label: "Transient ischaemic attack (TIA)",
            value: "Transient ischaemic attack (TIA)",
          },
          { label: "Trichomonas infection", value: "Trichomonas infection" },
          { label: "Trichomoniasis", value: "Trichomoniasis" },
          { label: "Trigeminal neuralgia", value: "Trigeminal neuralgia" },
          { label: "Tuberculosis (TB)", value: "Tuberculosis (TB)" },
          { label: "Type 1 Diabetes", value: "Type 1 Diabetes" },
          { label: "Type 2 Diabetes", value: "Type 2 Diabetes" },
          { label: "Ulcerative colitis", value: "Ulcerative colitis" },
          { label: "Underactive thyroid", value: "Underactive thyroid" },
          { label: "Urinary incontinence", value: "Urinary incontinence" },
          {
            label: "Urinary tract infection (UTI)",
            value: "Urinary tract infection (UTI)",
          },
          {
            label: "Urinary tract infection (UTI) in children",
            value: "Urinary tract infection (UTI) in children",
          },
          { label: "Urticaria (hives)", value: "Urticaria (hives)" },
          { label: "Uterine cancer", value: "Uterine cancer" },
          { label: "Uterine fibroids", value: "Uterine fibroids" },
          { label: "Vaginal cancer", value: "Vaginal cancer" },
          { label: "Vaginal thrush", value: "Vaginal thrush" },
          {
            label: "Vaginal yeast infections",
            value: "Vaginal yeast infections",
          },
          { label: "Varicose eczema", value: "Varicose eczema" },
          {
            label: "Varicose veins and spider veins",
            value: "Varicose veins and spider veins",
          },
          { label: "Venous leg ulcer", value: "Venous leg ulcer" },
          { label: "Vertigo", value: "Vertigo" },
          { label: "Violence against women", value: "Violence against women" },
          { label: "Viral hepatitis", value: "Viral hepatitis" },
          {
            label: "Vitamin B12 or folate deficiency anaemia",
            value: "Vitamin B12 or folate deficiency anaemia",
          },
          { label: "Vomiting in adults", value: "Vomiting in adults" },
          { label: "Vulval cancer", value: "Vulval cancer" },
          { label: "Warts and verrucas", value: "Warts and verrucas" },
          {
            label: "Weight loss (and overweight and obesity)",
            value: "Weight loss (and overweight and obesity)",
          },
          { label: "Whooping cough", value: "Whooping cough" },
          { label: "Wilms’ tumour", value: "Wilms’ tumour" },
          { label: "Womb (uterus) cancer", value: "Womb (uterus) cancer" },
          { label: "Yeast infections", value: "Yeast infections" },
          { label: "Yellow fever", value: "Yellow fever" },
        ]}
      />
      <FormField
        label="How Often Do You or Anyone from Your Family Buy Non-Prescription Products?"
        inputType="Select"
        registerName="frequency"
        options={[
          { label: "At least once a month", value: "At least once a month" },
          { label: "Every 2-3 months", value: "Every 2-3 months" },
          { label: "Every 6 months", value: "Every 6 months" },
          { label: "Less frequently", value: "Less frequently" },
          { label: "Never", value: "Never" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="Do You or Anyone at Your Home Use Glasses or Contact Lenses?"
        inputType="Select"
        registerName="glasses"
        options={[
          { label: "Glasses", value: "Glasses" },
          { label: "Contact Lenses", value: "Contact Lenses" },
          { label: "Both Glasses and Contact Lenses", value: "Both" },
          { label: "I don’t use Glasses/Contact Lenses", value: "None" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="Do You or Anyone at Your Home Use a Hearing Aid?"
        inputType="Select"
        registerName="hearingaid"
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="Do you and anyone at your home currently suffer from any diseases?"
        inputType="Select"
        registerName="anyonepatient"
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]}
      />
      <FormField
        label="Do you or anyone from your family suffer from any hearing problems/hearing loss?"
        inputType="Select"
        registerName="hearingdisorder"
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
          { label: "Prefer Not Say", value: "Prefer Not Say" },
        ]}
      />
      <FormField
        label="Are you habituated to drugs and alcohol?"
        inputType="Select"
        registerName="alcohol"
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
          { label: "Prefer Not Say", value: "Prefer Not Say" },
        ]}
      />
      <FormField
        label="How often do you get a health checkup?"
        inputType="Select"
        registerName="healthcheckup"
        options={[
          { label: "Once in 3 Months", value: "Once in 3 Months" },
          { label: "Once in 6. Months", value: "Once in 6. Months" },
          { label: "Once in a Year", value: "Once in a Year" },
          { label: "Only when needed", value: "Only when needed" },
          { label: "Never get it done", value: "Never get it done" },
        ]}
      />
      <FormField
        label="If you stated that you or anyone from your family have been diagnosed with diabetes, can you define the type of diabetes?"
        inputType="Select"
        registerName="diabetes"
        options={[
          { label: "I don't have diabetes", value: "I dont have diabetes" },
          { label: "Diabetes Type 1", value: "Diabetes Type 1" },
          { label: "Diabetes Type 2", value: "Diabetes Type 2" },
          { label: "Diabetes Type 3", value: "Diabetes Type 3" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="If you stated that you or anyone from your family have been diagnosed with hepatitis, can you define the type of hepatitis?"
        inputType="Select"
        registerName="hepetitis"
        options={[
          { label: "I don't have hepatitis", value: "I dont have hepatitis" },
          { label: "Hepatitis A", value: "Hepatitis A" },
          { label: "Hepatitis B", value: "Hepatitis B" },
          { label: "Hepatitis C", value: "Hepatitis C" },
          { label: "Hepatitis - Other", value: "Hepatitis - Other" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="Have you or or anyone from your family been diagnosed with any of the following food allergies/food related conditions?"
        inputType="Select"
        registerName="allergies"
        options={[
          { label: "Lactose intolerance", value: "Lactose intolerance" },
          { label: "Coeliac disease", value: "Coeliac disease" },
          { label: "Milk allergy", value: "Milk allergy" },
          { label: "Egg allergy", value: "Egg allergy" },
          { label: "Fish allergy", value: "Fish allergy" },
          { label: "Nut allergy", value: "Nut allergy" },
          {
            label: "I don't have any food related allergies/conditions",
            value: "I dont have any food related allergies/conditions",
          },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="Have you been a participant in any clinical trial for cancer treatment in the last 3 years?"
        inputType="Select"
        registerName="cancer"
        options={[
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
          { label: "Prefer Not Say", value: "Prefer Not Say" },
        ]}
      />
      <FormField
        label="Do you or anyone from your family suffer from any of the following allergies?"
        inputType="Select"
        registerName="familyallergies"
        options={[
          {
            label: "Neither me nor anyone in my family have any allergies",
            value: "Neither me nor anyone in my family have any allergies",
          },
          { label: "Cosmetic allergies", value: "Cosmetic allergies" },
          { label: "Food allergies", value: "Food allergies" },
          {
            label: "Indoor allergies (dander, dust mites, etc.)",
            value: "Indoor allergies (dander, dust mites, etc.)",
          },
          { label: "Insect allergies", value: "Insect allergies" },
          { label: "Latex allergies", value: "Latex allergies" },
          {
            label: "Plant allergies (poison ivy, poison oak)",
            value: "Plant allergies (poison ivy, poison oak)",
          },
          {
            label: "Prescription/Medication allergies",
            value: "Prescription/Medication allergies",
          },
          {
            label: "Seasonal outdoor allergies (pollen, grass, etc.)",
            value: "Seasonal outdoor allergies (pollen, grass, etc.)",
          },
          {
            label: "Year-round allergies from pollution, smoke, etc.",
            value: "Year-round allergies from pollution, smoke, etc.",
          },
          {
            label: "Year-round allergies from weather or temperature",
            value: "Year-round allergies from weather or temperature",
          },
          {
            label: "Year-round allergies to dust and/or mold",
            value: "Year-round allergies to dust and/or mold",
          },
          {
            label: "Year-round allergies to pets",
            value: "Year-round allergies to pets",
          },
          { label: "Other", value: "Other" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="Have you or anyone from your family ever had the following cardiovascular procedures?"
        inputType="Select"
        registerName="cardiovascuar"
        options={[
          {
            label: "Have not had a cardiovascular procedure",
            value: "Have not had a cardiovascular procedure",
          },
          { label: "Percutaneous", value: "Percutaneous" },
          {
            label:
              "Coronary Intervention / Angioplasty Bypass surgery / Coronary Artery Bypass Graft",
            value:
              "Coronary Intervention / AngioplastyBypass surgery / Coronary Artery Bypass Graft",
          },
          {
            label: "Cardiac Catheterization",
            value: "Cardiac Catheterization",
          },
          {
            label: "Can't recall type of procedure",
            value: "Cant recall type of procedure",
          },
          { label: "Other", value: "Other" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="Which types of surgery / procedure have you or anyone from your family had in the past 12 months?"
        inputType="Select"
        registerName="surgery"
        options={[
          {
            label: "None in the past 12 months",
            value: "None in the past 12 months",
          },
          {
            label: "Abdominal surgery / biopsy",
            value: "Abdominal surgery / biopsy",
          },
          {
            label: "Cardiac (heart) surgery",
            value: "Cardiac (heart) surgery",
          },
          { label: "Colonoscopy", value: "Colonoscopy" },
          {
            label: "Cosmetic, plastic, or reconstructive surgery",
            value: "Cosmetic, plastic, or reconstructive surgery",
          },
          {
            label: "Dental surgery (tooth extraction, root canal)",
            value: "Dental surgery (tooth extraction, root canal)",
          },
          { label: "Endoscopy", value: "Endoscopy" },
          {
            label: "Eye surgery (glaucoma filtration, cataract, Lasik)",
            value: "Eye surgery (glaucoma filtration, cataract, Lasik)",
          },
          {
            label: "Gastric bypass or lapband surgery",
            value: "Gastric bypass or lapband surgery",
          },
          { label: "Gynecological surgery", value: "Gynecological surgery" },
          {
            label: "Injection (epidural, steroid, cortisone, hormone)",
            value: "Injection (epidural, steroid, cortisone, hormone)",
          },
          {
            label: "Neurosurgery (brain surgery)",
            value: "Neurosurgery (brain surgery)",
          },
          {
            label: "Non-surgical facial treatments",
            value: "Non-surgical facial treatments",
          },
          {
            label: "Orthopedic (spinal, bone or joint) surgery",
            value: "Orthopedic (spinal, bone or joint) surgery",
          },
          { label: "Skin related procedure", value: "Skin related procedure" },
          {
            label: "Surgery involving a stent being inserted",
            value: "Surgery involving a stent being inserted",
          },
          {
            label: "Surgery related to cancer diagnosis",
            value: "Surgery related to cancer diagnosis",
          },
          {
            label: "Thoracic (chest and lung) surgery",
            value: "Thoracic (chest and lung) surgery",
          },
          { label: "Transplant surgery", value: "Transplant surgery" },
          { label: "Other", value: "Other" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="Which of the following traditional healthcare providers have you or anyone from your family visited in the past 12 months?"
        inputType="Select"
        registerName="traditionalHealthcare"
        options={[
          {
            label: "None in the past 12 months",
            value: "None in the past 12 months",
          },
          {
            label: "General Practitioner/Family Practitioner",
            value: "General Practitioner/Family Practitioner",
          },
          { label: "Internist", value: "Internist" },
          { label: "Allergist", value: "Allergist" },
          { label: "Cardiologist", value: "Cardiologist" },
          { label: "Dentist", value: "Dentist" },
          { label: "Endocrinologist", value: "Endocrinologist" },
          { label: "Gastroenterologist", value: "Gastroenterologist" },
          { label: "Gynecologist", value: "Gynecologist" },
          { label: "Hepatologist", value: "Hepatologist" },
          { label: "Infectious Disease", value: "Infectious Disease" },
          {
            label: "Specialist/Infectologist",
            value: "Specialist/Infectologist",
          },
          { label: "Neurologist", value: "Neurologist" },
          { label: "Nephrologist", value: "Nephrologist" },
          {
            label: "Nurse Practitioner/Physician Assistant",
            value: "Nurse Practitioner/Physician Assistant",
          },
          { label: "Obstetrician", value: "Obstetrician" },
          { label: "Oncologist", value: "Oncologist" },
          { label: "Ophthalmologist", value: "Ophthalmologist" },
          { label: "Orthopedist", value: "Orthopedist" },
          {
            label: "Otolaryngologist (Ears, Nose, and Throat)",
            value: "Otolaryngologist (Ears, Nose, and Throat)",
          },
          { label: "Plastic Surgeon", value: "Plastic Surgeon" },
          { label: "Podiatrist", value: "Podiatrist" },
          { label: "Psychiatrist", value: "Psychiatrist" },
          {
            label: "Psychologist / Therapist",
            value: "Psychologist / Therapist",
          },
          {
            label: "Pulmonologist (Lung specialist)",
            value: "Pulmonologist (Lung specialist)",
          },
          { label: "Respiratory Therapist", value: "Respiratory Therapist" },
          { label: "Rheumatologist", value: "Rheumatologist" },
          { label: "Urologist", value: "Urologist" },
          {
            label: "Other medical specialist",
            value: "Other medical specialist",
          },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="What kind of health insurance do you or anyone from your family have?"
        inputType="Select"
        registerName="insurance"
        options={[
          { label: "None", value: "None" },
          {
            label: "Insurance coverage through employer",
            value: "Insurance coverage through employer",
          },
          {
            label: "Insurance coverage through spouses employer",
            value: "Insurance coverage through spouses employer",
          },
          {
            label: "Insurance coverage through a healthcare exchange",
            value: "Insurance coverage through a healthcare exchange",
          },
          {
            label: "Directly purchased insurance plan",
            value: "Directly purchased insurance plan",
          },
          {
            label: "Medicaid / MediCal Medicare",
            value: "Medicaid / MediCal Medicare",
          },
          {
            label: "Veterans administration (VA)/CHAMPUS",
            value: "Veterans administration (VA)/CHAMPUS",
          },
          { label: "Tricare", value: "Tricare" },
          { label: "Not sure", value: "Not sure" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="Are you currently caring for an adult relative with any of the following conditions?"
        inputType="Select"
        registerName="diseaseCaringNow"
        options={[
          { label: "AIDS", value: "AIDS" },
          { label: "Alzheimers Disease", value: "Alzheimers Disease" },
          { label: "Angina", value: "Angina" },
          { label: "Ankylosing Spondylitis", value: "Ankylosing Spondylitis" },
          { label: "Arrhythmia", value: "Arrhythmia" },
          { label: "Atrial fibrillation", value: "Atrial fibrillation" },
          {
            label: "Attention Deficit Hyperactivity Disorder",
            value: "Attention Deficit Hyperactivity Disorder",
          },
          {
            label: "Attention Deficit Disorder (ADD)",
            value: "Attention Deficit Disorder (ADD)",
          },
          {
            label: "Osteoarthritis Rheumatoid Arthritis",
            value: "Osteoarthritis Rheumatoid Arthritis",
          },
          {
            label: "BPH (benign prostatic hyperplasia)",
            value: "BPH (benign prostatic hyperplasia)",
          },
          { label: "Bipolar disorder", value: "Bipolar disorder" },
          { label: "Breast cancer Dementia", value: "Breast cancer Dementia" },
          {
            label: "Depression Fibromyalgia",
            value: "Depression Fibromyalgia",
          },
          {
            label: "Obsessive Compulsive Disorder (OCD)",
            value: "Obsessive Compulsive Disorder (OCD)",
          },
          {
            label: "Post-Traumatic Stress Disorder (PTSD)",
            value: "Post-Traumatic Stress Disorder (PTSD)",
          },
          { label: "Restless Legs Syndrome", value: "Restless Legs Syndrome" },
          {
            label: "Social anxiety disorder",
            value: "Social anxiety disorder",
          },
          { label: "Cervical cancer", value: "Cervical cancer" },
          {
            label: "Chronic obstructive pulmonary disease (COPD)",
            value: "Chronic obstructive pulmonary disease (COPD)",
          },
          {
            label: "Chronic Kidney disease on dialysis",
            value: "Chronic Kidney disease on dialysis",
          },
          { label: "Colorectal cancer", value: "Colorectal cancer" },
          {
            label: "Congestive heart failure",
            value: "Congestive heart failure",
          },
          { label: "Crohn Disease", value: "Crohn Disease" },
          { label: "Type 1 Diabetes", value: "Type 1 Diabetes" },
          { label: "Type 2 Diabetes", value: "Type 2 Diabetes" },
          { label: "Epilepsy", value: "Epilepsy" },
          { label: "Heart attack", value: "Heart attack" },
          { label: "Hepatitis A", value: "Hepatitis A" },
          { label: "Hepatitis B", value: "Hepatitis B" },
          { label: "Hepatitis C", value: "Hepatitis C" },
          {
            label: "High blood pressure (Hypertension)",
            value: "High blood pressure (Hypertension)",
          },
          { label: "High cholesterol", value: "High cholesterol" },
          { label: "HIV Leukemia", value: "HIV Leukemia" },
          {
            label: "Lupus Multiple Sclerosis",
            value: "Lupus Multiple Sclerosis",
          },
          {
            label: "Non-Small Cell Lung cancer",
            value: "Non-Small Cell Lung cancer",
          },
          { label: "Osteoporosis", value: "Osteoporosis" },
          { label: "Ovarian cancer", value: "Ovarian cancer" },
          { label: "Paget disease", value: "Paget disease" },
          { label: "Parkinson disease", value: "Parkinson disease" },
          { label: "Prostate cancer", value: "Prostate cancer" },
          { label: "Schizophrenia", value: "Schizophrenia" },
          { label: "Small Cell Lung cancer", value: "Small Cell Lung cancer" },
          { label: "Stroke", value: "Stroke" },
          { label: "Ulcerative Colitis", value: "Ulcerative Colitis" },
          { label: "Uterine cancer", value: "Uterine cancer" },
          { label: "None of these", value: "None of these" },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="Are you the custodial parent or legal guardian of a child under age 18 with any of the following conditions?"
        inputType="Select"
        registerName="custodialStatus"
        options={[
          {
            label: "I am not a custodial parent or legal guardian",
            value: "I am not a custodial parent or legal guardian",
          },
          { label: "ADHD", value: "ADHD" },
          { label: "Anxiety Depression", value: "Anxiety Depression" },
          { label: "Asthma", value: "Asthma" },
          {
            label: "Autism / Asperger syndrome",
            value: "Autism / Asperger syndrome",
          },
          { label: "Bipolar Disorder", value: "Bipolar Disorder" },
          { label: "Cancer", value: "Cancer" },
          { label: "Celiac Disease", value: "Celiac Disease" },
          { label: "Cystic Fibrosis", value: "Cystic Fibrosis" },
          { label: "Diabetes (Type I)", value: "Diabetes (Type I)" },
          { label: "Eczema", value: "Eczema" },
          { label: "Epilepsy", value: "Epilepsy" },
          { label: "Food Related Allergies", value: "Food Related Allergies" },
          { label: "GERD", value: "GERD" },
          { label: "IBS", value: "IBS" },
          { label: "Insomnia", value: "Insomnia" },
          {
            label: "ITP (platelet disorder)",
            value: "ITP (platelet disorder)",
          },
          { label: "Muscular Dystrophy", value: "Muscular Dystrophy" },
          { label: "Obesity", value: "Obesity" },
          { label: "Other condition", value: "Other condition" },
          { label: "Psoriasis", value: "Psoriasis" },
          { label: "Rheumatoid Arthritis", value: "Rheumatoid Arthritis" },
          {
            label: "Seasonal Allergies/Hay Fever",
            value: "Seasonal Allergies/Hay Fever",
          },
          {
            label: "My child(ren) do not have any of these conditions",
            value: "My child(ren) do not have any of these conditions",
          },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
      <FormField
        label="Do you or anyone from your family currently consume any form of dietary supplement?"
        inputType="Select"
        registerName="dietrySuppliment"
        options={[
          {
            label: "Yes, mainly Western health supplements",
            value: "Yes, mainly Western health supplements",
          },
          {
            label: "Yes, mainly Chinese / oriental health supplements",
            value: "Yes, mainly Chinese / oriental health supplements",
          },
          {
            label:
              "Neither I nor anyone from my family do not consume any health supplements",
            value:
              "Neither I nor anyone from my family do not consume any health supplements",
          },
          { label: "Prefer not to say", value: "Prefer not to say" },
        ]}
      />
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
        mt={6}
        mb={12}
      >
        <CheckCircle color="primary" sx={{ fontSize: "80px" }} />
        <Typography sx={{ fontSize: "32px", textAlign: "center" }}>
          Thank You for Your Valuable Time
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
            Please wait while we connect you via email.
          </Typography>
          <Typography fontSize={"13px"} sx={{ color: "grey" }}>
            Check Your Email for Activation Link
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
