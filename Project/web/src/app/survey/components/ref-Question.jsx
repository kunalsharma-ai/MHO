
function hasOption(questionType) {
  return [
    "select",
    "multiselect",
    "checkbox",
    "radio"
  ].includes(questionType)
}



export default function Question({
  question,
  control,
  errors,
  watch,
  form,
  editMode = false,
}) => {
  // const [options, setOptions] = React.useState([]);
  const user = useMember();
  const [isMapVisible, setIsMapVisible] = React.useState(false);
  const isQuestionDisabled = question.disabled || editMode;
  const parentValue = question.parent ? watch(question.parent) : null;
  const fldValue = form.watch(question.name);
  const {
    data: { country, ip } = {}
  } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const resp = await api.get("/api/v1/get-country");
      resp.country = resp.country.toLowerCase().trim();
      return resp;
    },
  });
  const { data: options = [], isLoading, status } = useQuery({
    queryKey: [`${question.name}-options`, question?.name, parentValue, question?.parent],
    queryFn: async ({ queryKey }) => {
      if (!hasOption(question.type)) return [];
      if (question.parent) {
        if ([null, undefined, "", []].includes(parentValue)) throw new Error("Not Loaded");
        let resp = await api.post(`/api/v1/option/${question.name}`, {
          parentValue
        });
        return resp.data;
      }
      let resp = await api.get(`/api/v1/option/${question.name}`);
      return resp.data;
    },
    enabled: !Boolean(question.parent) || Boolean(parentValue)
  })

  const renderQuestion = () => {
    if (
      ![null, undefined, ""].includes(question.parent) &&
      ["phone", "select", "text", "multiselect", "radio", "checkbox"].includes(
        question.type,
      )
    ) {
      if ([null, undefined, ""].includes(parentValue)) {
        return null;
      }
      /*
      if (
        ["select", "multiselect", "radio", "checkbox"].includes(
          question.type,
        ) &&
        (!options || !(options instanceof Array) || !(options.length > 0))
      ) {
        return null;
      }
      if (
        ["phone"].includes(question.type) &&
        !parentValue.includes(question.name)
      ) {
        return null;
      }
      if (["text"].includes(question.type) && parentValue === "No") {
        return null;
      }
        //*/

    }
    if (question.name === "zipcode") {
      return (
        <Grid
          size={ { xs: 12, md: Number(question?.size) } }
          alignSelf="flex-end"
          sx={ { px: 2, py: 1 } }
        >
          <Form.Input
            { ...form.register(`${question.name}`) }
            control={ control }
            watch={ watch }
            api="zipcode"
            parent={ `${question.parent}` }
            surveyLabel={
              <Page.Text
                sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
              >
                { question.label }{ " " }
                {/* {question.required && (
                  <span style={{ color: "red", fontWeight: 600 }}>*</span>
                )} */}
              </Page.Text>
            }
          />
        </Grid>
      );
    }
    switch (question.type) {
      case "note":
        return (
          <Grid
            size={ { xs: 12, md: Number(question?.size) } }
            alignSelf="flex-end"
            sx={ { textAlign: "center", px: 2, py: 1 } }
          >
            <>
              <Page.Box
                component="div"
                sx={ {
                  textAlign: "justify",
                  p: 3,
                  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                } }
                dangerouslySetInnerHTML={ { __html: question.label } }
              />
            </>
          </Grid>
        );

      case "radio":
        return (
          <Grid
            size={ { xs: 12, md: Number(question?.size) } }
            alignSelf="flex-end"
            sx={ {
              px: 2,
              py: 1,
            } }
          >
            <FormControl
              component="fieldset"
              required={ question.required }
              fullWidth
              sx={ {
                "& .MuiFormControlLabel-label": {
                  fontSize: 13,
                },
              } }
            >
              <Page.Text
                sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
              >
                { question.label }{ " " }
                { question.required && (
                  <span style={ { color: "red", fontWeight: 600 } }>*</span>
                ) }
              </Page.Text>
              <Controller
                name={ question.name }
                control={ control }
                rules={ {
                  required: question.required
                    ? "This field is required"
                    : false,
                } }
                defaultValue=""
                render={ ({ field }) => (
                  <>
                    <RadioGroup { ...field } aria-label={ question.label }>
                      { options.map((option) => (
                        <FormControlLabel
                          key={
                            typeof option === "string" ? option : option.label
                          }
                          value={
                            typeof option === "string" ? option : option.label
                          }
                          control={
                            <Radio
                              disabled={ isQuestionDisabled }
                              sx={ {
                                "& .MuiSvgIcon-root": {
                                  color: "secondary.main",
                                },
                              } }
                            />
                          }
                          label={
                            typeof option === "string" ? option : option.label
                          }
                        />
                      )) }
                    </RadioGroup>
                    { errors[question.name] && (
                      <Page.Text
                        color="error"
                        variant="caption"
                        sx={ { fontWeight: "bold" } }
                      >
                        { errors[question.name].message }
                      </Page.Text>
                    ) }
                  </>
                ) }
              />
            </FormControl>
          </Grid>
        );

      case "checkbox":
        return (
          <Grid
            size={ { xs: 12, md: Number(question?.size) } }
            alignSelf="flex-end"
            sx={ {
              px: 2,
              py: 1,
            } }
          >
            <FormControl
              component="fieldset"
              required={ question.required }
              fullWidth
              sx={ {
                "& .MuiFormControlLabel-label": {
                  fontSize: 13,
                },
              } }
            >
              <Page.Text
                sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
              >
                { question.label }{ " " }
                { question.required && (
                  <span style={ { color: "red", fontWeight: 600 } }>*</span>
                ) }
              </Page.Text>

              <Controller
                name={ question.name }
                control={ control }
                rules={ {
                  required: question.required
                    ? "This field is required"
                    : false,
                } }
                defaultValue={ [] }
                render={ ({ field }) => {
                  const handleChange = (optionValue) => {
                    const currentValue = field.value || [];

                    if (currentValue.includes(optionValue)) {
                      // console.log(optionValue);
                      // Remove value
                      field.onChange(
                        currentValue.filter((v) => v !== optionValue),
                      );
                    } else {
                      // Add value
                      field.onChange([...currentValue, optionValue]);
                    }
                  };

                  return (
                    <>
                      <FormGroup>
                        { options.map((option) => {
                          const label =
                            typeof option === "string" ? option : option.label;
                          const value =
                            typeof option === "string" ? option : option.value;
                          return (
                            <FormControlLabel
                              key={ label }
                              control={
                                <Checkbox
                                  disabled={ isQuestionDisabled }
                                  checked={ field.value?.includes(value) }
                                  onChange={ () => handleChange(value) }
                                  sx={ {
                                    "& .MuiSvgIcon-root": {
                                      color: "secondary.main",
                                    },
                                  } }
                                />
                              }
                              label={ label }
                            />
                          );
                        }) }
                      </FormGroup>

                      { errors[question.name] && (
                        <Page.Text
                          color="error"
                          variant="caption"
                          sx={ { fontWeight: "500" } }
                        >
                          { errors[question.name].message }
                        </Page.Text>
                      ) }
                    </>
                  );
                } }
              />
            </FormControl>
          </Grid>
        );

      case "date":
        return (
          <Grid
            size={ { xs: 12, md: Number(question?.size) } }
            alignSelf="flex-end"
            sx={ {
              px: 2,
              py: 1,
            } }
          >
            <FormControl fullWidth required={ question.required }>
              <Page.Text
                sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
              >
                { question.label }{ " " }
                { question.required && (
                  <span style={ { color: "red", fontWeight: 600 } }>*</span>
                ) }
              </Page.Text>
              <Grid size={ 12 }>
                <Form.Date
                  { ...form.register(question.name) }
                  control={ form.control }
                  disabled={ isQuestionDisabled }
                  validations={ {
                    required: question.required
                      ? "This field is required"
                      : false,
                  } }
                  dateRange={ question.dateRange }
                  errors={ errors?.[question.name] }
                />
              </Grid>
            </FormControl>
          </Grid>
        );

      case "multiselect":
        return (
          <Grid
            size={ { xs: 12, md: Number(question?.size) } }
            alignSelf="flex-end"
            sx={ {
              px: 2,
              py: 1,
            } }
          >
            <Page.Text
              sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
            >
              { question.label }{ " " }
              { question.required && (
                <span style={ { color: "red", fontWeight: 600 } }>*</span>
              ) }
            </Page.Text>
            <Form.Select
              { ...form.register(question.name) }
              control={ control }
              watch={ watch }
              multiple={ true }
              isDisabled={ isQuestionDisabled }
              options={
                // options
                // question?.options &&
                // options instanceof Array &&
                options.map((opt) => {
                  if (typeof opt === "string")
                    return {
                      label: opt,
                      value: opt,
                    };
                  return {
                    label: opt.label,
                    value: opt.value
                  };
                })
              }
              parent={ question.parent }
              validations={ {
                required: question.required ? "This field is required" : false,
              } }
              errors={ errors?.[question.name] }
              sx={ {
                "& .MuiOutlinedInput-notchedOutline legend": {
                  width: 0,
                  visibilty: "hidden",
                },
              } }
            />
          </Grid>
        );
      case "select":
        return (
          (options && options instanceof Array && options.length > 0) ? <Grid
            size={ { xs: 12, md: Number(question?.size) } }
            alignSelf="flex-end"
            sx={ {
              px: 2,
              py: 1,
            } }
          >
            <Page.Text
              sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
            >
              { question.label }{ " " }
              { question.required && (
                <span style={ { color: "red", fontWeight: 600 } }>*</span>
              ) }
            </Page.Text>
            <Form.Select
              { ...form.register(question.name) }
              control={ control }
              watch={ watch }
              isDisabled={ isQuestionDisabled }
              options={ options.map((opt) => {
                if (typeof opt === "string")
                  return {
                    label: opt,
                    value: opt,
                  };
                if (opt.question === "jobrole") return {
                  label: opt.label,
                  value: opt.value.sluggify()
                }
                return {
                  label: opt.label,
                  value: opt.value
                };
              }) }
              // api={question.api}
              parent={ question.parent }
              validations={ {
                required: question.required ? "This field is required" : false,
              } }
              errors={ errors?.[question.name] }
              sx={ {
                "& .MuiOutlinedInput-notchedOutline legend": {
                  width: 0,
                  visibilty: "hidden",
                },
              } }
            />
          </Grid> : null
        );

      case "text":
        return (
          <Grid
            size={ { xs: 12, md: Number(question?.size) } }
            alignSelf="flex-end"
            sx={ {
              px: 2,
              py: 1,
            } }
          >
            <Page.Text
              sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
            >
              { question.label }{ " " }
              { question.required && (
                <span style={ { color: "red", fontWeight: 600 } }>*</span>
              ) }
            </Page.Text>
            <Form.Input
              { ...form.register(question.name) }
              control={ control }
              watch={ watch }
              disabled={ isQuestionDisabled }
              // parent={question.parent}
              validations={ {
                required: question.required ? "This field is required" : false,
              } }
              errors={ errors?.[question.name] }
              sx={ {
                "& label.MuiInputLabel-shrink": {
                  fontSize: "16px !important",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  px: 2,
                  ml: -1.5,
                },
              } }
            />
          </Grid>
        );

      case "textarea":
        return (
          <Grid
            size={ { xs: 12, md: Number(question?.size) } }
            alignSelf="flex-end"
            sx={ {
              px: 2,
              py: 1,
            } }
          >
            <Page.Text
              sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
            >
              { question.label }{ " " }
              { question.required && (
                <span style={ { color: "red", fontWeight: 600 } }>*</span>
              ) }
            </Page.Text>
            <Form.Input
              { ...form.register(question.name) }
              control={ control }
              watch={ watch }
              parent={ question.parent }
              disabled={ isQuestionDisabled }
              validations={ {
                required: question.required ? "This field is required" : false,
              } }
              errors={ errors?.[question.name] }
              multiline
              rows={ 4 }
              sx={ {
                "& label.MuiInputLabel-shrink": {
                  fontSize: "16px !important",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  px: 2,
                  ml: -1.5,
                },
              } }
            />
          </Grid>
        );

      case "editor":
        return (
          <Grid
            size={ { xs: 12, md: Number(question?.size) } }
            alignSelf="flex-end"
            sx={ {
              px: 2,
              py: 1,
            } }
          >
            <Page.Text
              sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
            >
              { question.label }{ " " }
              { question.required && (
                <span style={ { color: "red", fontWeight: 600 } }>*</span>
              ) }
            </Page.Text>
            <Form.TextEditor
              { ...form.register(question.name) }
              control={ control }
              watch={ watch }
              disabled={ isQuestionDisabled }
              validations={ {
                required: question.required ? "This field is required" : false,
              } }
              errors={ errors?.[question.name] }
            />
          </Grid>
        );

      case "document":
        return (
          <Grid
            size={ { xs: 12, md: Number(question?.size) } }
            alignSelf="flex-end"
            sx={ {
              px: 2,
              py: 1,
            } }
          >
            <FormControl fullWidth required={ question.required }>
              <Page.Text
                sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
              >
                { question.label }{ " " }
                { question.required && (
                  <span style={ { color: "red", fontWeight: 600 } }>*</span>
                ) }
              </Page.Text>
              <Form.Upload
                endpoint="/api/v1/upload/pdf"
                name={ question.name }
                control={ control }
                form={ form }
                rules={ {
                  required: question.required
                    ? "This field is required"
                    : false,
                } }
                accept="application/pdf"
              />
            </FormControl>
          </Grid>
        );

      case "address":
        function setCoordinates(coordinates) {
          form.setValue(`${question.name}.coordinates`, coordinates);
        }
        return (
          <Grid size={ 12 } container p={ 2 }>
            <Page.Text
              sx={ {
                fontWeight: 600,
                mb: 0.5,
                color: "secondary.main",
                width: "100%",
              } }
            >
              { question.label }{ " " }
              { question.required && (
                <span style={ { color: "red", fontWeight: 600 } }>*</span>
              ) }
            </Page.Text>

            <Grid
              size={ {
                xs: 12,
                md: watch(`${question.name}.consent`) === "Yes" ? 6 : 12,
              } }
              container
              direction="column"
              justifySelf="flex-start"
              spacing={ 1.5 }
              mt={ 1 }
            >
              <Grid size={ 12 } container direction="column" spacing={ 0 }>
                <Page.Text
                  sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
                >
                  Are you comfortable sharing your location on map?
                </Page.Text>
                <Controller
                  name={ `${question.name}.consent` }
                  control={ control }
                  rules={ "This field is required" }
                  defaultValue=""
                  render={ ({ field }) => (
                    <>
                      <RadioGroup
                        { ...field }
                        aria-label={ question.label }
                        onChange={ (e) => {
                          if (e.target.value === "Yes") setIsMapVisible(true);
                          field.onChange(e);
                        } }
                      >
                        { [
                          {
                            label: "Yes",
                            value: "Yes",
                          },
                          { label: "No", value: "No" },
                        ].map((option) => (
                          <FormControlLabel
                            key={
                              typeof option === "string" ? option : option.label
                            }
                            value={
                              typeof option === "string" ? option : option.label
                            }
                            control={
                              <Radio
                                sx={ {
                                  "& .MuiSvgIcon-root": {
                                    color: "secondary.main",
                                  },
                                } }
                              />
                            }
                            label={
                              typeof option === "string" ? option : option.label
                            }
                          />
                        )) }
                      </RadioGroup>
                      { errors[question.name] && (
                        <Page.Text
                          color="error"
                          variant="caption"
                          sx={ { fontWeight: "500" } }
                        >
                          { errors[question.name].message }
                        </Page.Text>
                      ) }
                    </>
                  ) }
                />
              </Grid>{ " " }
              <Grid size={ 12 } container direction="column" spacing={ 0 }>
                <Form.Input
                  { ...form.register(`${question.name}.line1`) }
                  control={ control }
                  watch={ watch }
                  labelText={ "Address Line 1" }
                />
              </Grid>
              <Grid size={ 12 } container direction="column" spacing={ 0 }>
                <Form.Input
                  { ...form.register(`${question.name}.line2`) }
                  control={ control }
                  watch={ watch }
                  labelText={ "Address Line 2" }
                />
              </Grid>{ " " }
              <Grid size={ 12 } container direction="column" spacing={ 0 }>
                <Form.Select
                  { ...form.register(`${question.name}.country`) }
                  control={ control }
                  watch={ watch }
                  option={ [] }
                  api="country"
                  labelText={ "Country" }
                />
              </Grid>
              <Grid size={ 12 } container direction="column" spacing={ 0 }>
                <Form.Select
                  { ...form.register(`${question.name}.state`) }
                  control={ control }
                  watch={ watch }
                  option={ [] }
                  parent={ `${question.name}.country` }
                  api="state"
                  labelText={ "State" }
                />
              </Grid>
              <Grid size={ 12 } container direction="column" spacing={ 0 }>
                <Form.Select
                  { ...form.register(`${question.name}.city`) }
                  control={ control }
                  watch={ watch }
                  option={ [] }
                  parent={ [
                    `${question.name}.country`,
                    `${question.name}.state`,
                  ] }
                  api="city"
                  labelText={ "City" }
                />
              </Grid>
              <Grid size={ 12 } container direction="column" spacing={ 0 }>
                <Form.Input
                  { ...form.register(`${question.name}.zipcode`) }
                  control={ control }
                  watch={ watch }
                  api="zipcode"
                  parent={ `${question.name}.country` }
                  labelText={ "Zipcode" }
                />
              </Grid>{ " " }
            </Grid>

            { isMapVisible && (
              <Grid
                size={ { xs: 12, md: 6 } }
                direction="column"
                container
                p={ 2 }
                display={
                  watch(`${question.name}.consent`) === "Yes" ? "flex" : "none"
                }
              >
                <Map setCoordinates={ setCoordinates } />
                <Page.Text fontStyle="italic" mt={ 1 }>
                  click on your location to place location marker
                </Page.Text>
              </Grid>
            ) }
          </Grid>
        );

      case "phone":
        return (
          <Grid
            size={ { xs: 12, md: Number(question?.size) } }
            alignSelf="flex-end"
            sx={ {
              px: 2,
              py: 1,
            } }
          >
            <Page.Text
              sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
            >
              { question.label }{ " " }
              { question.required && (
                <span style={ { color: "red", fontWeight: 600 } }>*</span>
              ) }
            </Page.Text>
            <Form.Phone
              name={ question.name }
              control={ control }
              disabled={ isQuestionDisabled && Boolean(user[question.name]) }
              validations={ {
                required: question.required ? "This field is required" : false,
              } }
              selectedCountry={ Boolean(user[question.name]) ? undefined : country }
              disableDropdown={ Boolean(country) }
              errors={ errors?.[question.name] }
            />
            <Controller
              name={ `${question.name}_whatsapp` }
              control={ control }
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
          </Grid>
        );

      default:
        return null;
    }
  };

  return <>{ renderQuestion() }</>;
};
