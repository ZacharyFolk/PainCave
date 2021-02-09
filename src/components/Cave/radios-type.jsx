import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const RadioButtonsGroup = (props) => {
  return (
    <RadioGroup
      aria-label="group"
      name="group"
      value={props.value}
      onChange={props.handleRadioChange}
      row
    >
      <FormControlLabel
        name="group"
        value="cardio"
        control={<Radio />}
        label="Cardio 🚴"
      />
      <FormControlLabel
        name="group"
        value="body"
        control={<Radio />}
        label="Body 🤸‍♂️"
      />
      <FormControlLabel
        name="group"
        value="weights"
        control={<Radio />}
        label="Weights 🏋️"
      />
    </RadioGroup>
  );
};

export default RadioButtonsGroup;
