import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

// import {
//     FormControl,
//     FormLabel,
//     FormControlLabel,
//     Radio,
//     RadioGroup
//   } from "@material-ui/core";

function AddExercise(props) {
  const { authUser, firebase, setOpenSnackbar, setSnackbarMsg } = props;
  const uid = authUser.uid;

  const defaultExercise = {
    title: "",
    group: "",
  };

  const [exercise, setExercise] = useState(defaultExercise);
  const [value, setValue] = React.useState("");
  const isValid = exercise.title === "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name + " :::: " + value);
    setExercise({
      ...exercise,
      [name]: value,
    });
  };
  const handleRadioChange = (e) => {
    console.log(exercise);
    const { name, value } = e.target;
    setValue(value);
    setExercise({
      ...exercise,
      [name]: value,
    });
  };

  //   const handleRadioChange = (e) => {
  //     const { name, value } = e.target;
  //     console.log(name + value);
  //     setExercise({
  //       ...exercise,
  //       [name]: value,
  //     });
  //     setValue(value);

  //     console.log(exercise);
  //   };

  const handleSubmit = () => {
    console.log("EXERCISE : ");
    console.log(exercise);
    if (authUser) {
      firebase.addExercise(uid, exercise);
      setExercise(defaultExercise);
      console.log("openSnack");
      // setSnackbarMsg('Added exercise');
      // setTimeout(() => {
      //     setOpenSnackbar(false)
      // }, 30000)
    }
  };

  function RadioButtonsGroup() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Types</FormLabel>
        <RadioGroup
          aria-label="group"
          name="group"
          value={value}
          onChange={handleRadioChange}
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
      </FormControl>
    );
  }

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FormControl>
        <RadioButtonsGroup />
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Exercise name"
          value={exercise.title}
          name="title"
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isValid}
        >
          Add activity
        </Button>
      </FormControl>
    </form>
  );
}

export default withFirebase(AddExercise);
