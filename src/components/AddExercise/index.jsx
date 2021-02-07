import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import RadioButtonsGroup from "../forms/Radios";

// import {
//     FormControl,
//     FormLabel,
//     FormControlLabel,
//     Radio,
//     RadioGroup
//   } from "@material-ui/core";

function AddExercise(props) {
  const { authUser, firebase } = props;
  const uid = authUser.uid;

  const defaultExercise = {
    title: "",
    group: "",
  };

  const [exercise, setExercise] = useState(defaultExercise);
  const [exName, setExerciseName] = useState("");
  const [value, setValue] = React.useState("cardio");
  const isValid = exercise.title === "";

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = () => {
    console.log("EXERCISE : ");
    console.log(exercise);
    if (authUser) {
      firebase.addExercise(uid, exercise);
      setExercise({ ...exercise, ["title"]: "" });
      setValue(exercise.group);
      console.log("openSnack");
      // setSnackbarMsg('Added exercise');
      // setTimeout(() => {
      //     setOpenSnackbar(false)
      // }, 30000)
    }
  };

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FormControl>
        <RadioButtonsGroup
          value={exercise.group}
          handleRadioChange={handleRadioChange}
        />
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
