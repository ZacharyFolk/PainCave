import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('cardio');

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Types</FormLabel>
      <RadioGroup aria-label="group" name="group" value={value} onChange={handleChange}>
        <FormControlLabel value="cardio" control={<Radio />} label="Cardio 🚴" />
        <FormControlLabel value="body" control={<Radio />} label="Body 🤸‍♂️" />
        <FormControlLabel value="weights" control={<Radio />} label="Weights 🏋️" />
      </RadioGroup>
    </FormControl>
  );
}