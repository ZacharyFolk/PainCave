import React from 'react';


export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('cardio');
  
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const fetchExercise = (exercises) => {
    console.log('click');
    const retrieveData = () => {

        let ref = firebase.db.ref().child(`users/${authUser.uid}/exercises/groups/weights/`);
        ref.on("value", function(snapshot) {
            console.log(snapshot.val());
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
     

    };

    retrieveData();
}


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