import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function RadioButtonsGroup(props) {
  const { authUser, firebase } = props;
  const [value, setValue] = React.useState("cardio");

  console.log("What is this? " + value);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    //   CreateExerciseSelect();
  };

  function CreateExerciseSelect() {
    console.log("VALUE " + value);
    let ref = firebase.db
      .ref()
      .child(`users/${authUser.uid}/exercises/groups/weights/`);
    ref.on(
      "value",
      function (snapshot) {
        console.log(snapshot.val());
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Types</FormLabel>
      <RadioGroup
        aria-label="group"
        name="group"
        value={value}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value="cardio"
          control={<Radio />}
          label="Cardio 🚴"
        />
        <FormControlLabel value="body" control={<Radio />} label="Body 🤸‍♂️" />
        <FormControlLabel
          value="weights"
          control={<Radio />}
          label="Weights 🏋️"
        />
      </RadioGroup>
    </FormControl>
  );
}

function AddActivity(props) {
  const classes = useStyles();

  const {
    authUser,
    firebase,
    selectedDay,
    setOpenSnackbar,
    setSnackbarMsg,
  } = props;
  const uid = authUser.uid;

  // Set query date for updating database
  selectedDay.year = new Date().getFullYear();
  let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

  // Set default activity object
  const defaultActivity = {
    name: "",
    group: "cardio",
    type: 1,
    duration: 0,
    distance: 0,
    weight: 0,
    date: queryDate,
  };

  const [activity, setActivity] = useState(defaultActivity);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({
      ...activity,
      date: queryDate,
      [name]: value,
    });
  };

  const handleSlider = (name) => (e, value) => {
    setActivity({
      ...activity,
      [name]: value,
    });
    // const duration = e.target.getAttribute('aria-valuenow');
    // setActivity({...activity, duration: duration});
  };

  const handleWeightSlider = (e) => {
    const weight = e.target.getAttribute("aria-valuenow");
    setActivity({ ...activity, weight: weight });
  };
  const isValid = activity.name === "";

  // Add the activity to firebase via the API made in this app
  const handleSubmit = () => {
    if (authUser) {
      firebase.addActivity(uid, activity);
      setActivity(defaultActivity);
      // Show notification
      setOpenSnackbar(true);
      setSnackbarMsg("Added activity");
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }
  };

  const ExerciseSelect = () => {
    return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={activity.type}
        style={{ minWidth: "100%" }}
        name="type"
        onChange={handleChange}
      >
        <MenuItem value={1}>Lifting Weights</MenuItem>
        <MenuItem value={2}>Running</MenuItem>
        <MenuItem value={3}>Cycling</MenuItem>
      </Select>
    );
  };
  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FormControl className={classes.formControl}>
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Activity name"
          value={activity.name}
          name="name"
          onChange={handleChange}
        />
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Typography id="discrete-slider" gutterBottom>
            Type
          </Typography>

          <RadioButtonsGroup authUser={props.authUser} />

          <ExerciseSelect />
        </div>
        <Typography id="discrete-slider" gutterBottom>
          Duration
        </Typography>
        <Slider
          value={activity.duration}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={120}
          name="duration"
          onChange={handleSlider("duration")}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Distance"
          value={activity.distance}
          name="distance"
          onChange={handleChange}
        />
        <Typography id="discrete-slider" gutterBottom>
          Weight
        </Typography>
        <Slider
          value={activity.weight}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={5}
          marks
          min={0}
          max={300}
          name="weight"
          onChange={handleSlider("weight")}
          style={{ marginBottom: "20px" }}
        />
      </FormControl>
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
    </form>
  );
}

export default withFirebase(AddActivity);
