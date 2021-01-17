import React from 'react';


export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('cardio');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Types</FormLabel>
      <RadioGroup aria-label="group" name="group" value={value} onChange={handleRadioChange}>
        <FormControlLabel value="cardio" control={<Radio />} label="Cardio 🚴" />
        <FormControlLabel value="body" control={<Radio />} label="Body 🤸‍♂️" />
        <FormControlLabel value="weights" control={<Radio />} label="Weights 🏋️" />
      </RadioGroup>
    </FormControl>
  );
}