import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import {
  CssBaseline,
  Paper,
  Grid,
  IconButton,
  Drawer,
  Button,
} from "@material-ui/core/";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import AddExercise from "./add-exercise";
import useStyles from "../../config/theme.exercise";
import ActivityBuilder from "./activity-builder";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import WorkoutBoard from "./workout-board";

function Exercise(props) {
  let defaultDate = useState(new Date().getFullYear());

  const [selectedDate, handleDateChange] = useState(new Date());

  const defaultActivity = {
    id: null,
    title: "",
    group: "",
    distance: 0,
    duration: 0,
    reps: 0,
    sets: 0,
    type: 1,
    weight: 0,
  };

  const session = {
    date: selectedDate,
    start: "some",
    end: "thing",
    activities: [{}],
  };

  const [activity, setActivity] = useState({});
  const [workout, setWorkout] = useState(session);

  const classes = useStyles();
  const { authUser, firebase } = props;
  const uid = authUser.uid;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [exercises, setExercises] = useState(true);
  const [loading, setLoading] = useState([]);
  const [drawer, setDrawerState] = useState(false);

  const onDataChanged = (name, value) => {
    // console.log(event.target.value)
    // setSliderValue(value);
  };
  function handleDrawerToggle() {
    setDrawerState(!drawer);
  }
  function resetObject(workout) {
    var obj = workout.activities;
    Object.keys(obj).forEach(function (key) {
      if (obj[key] !== "") {
        obj[key] = "";
      }
    });
  }
  const handleSubmit = () => {
    console.log(workout);
    // if (authUser) {
    //   // firebase.addWorkout(uid, workout);
    //   setWorkout(session);
    //   // console.log("openSnack");
    //   // setSnackbarMsg('Added exercise');
    //   // setTimeout(() => {
    //   //     setOpenSnackbar(false)
    //   // }, 30000)
    // }
  };

  function addActivity() {
    setWorkout({
      ...workout,
      activities: [...workout.activities, activity],
    });
    resetObject(workout);
  }

  function test3() {
    if (authUser) {
      firebase.addWorkout(uid, workout);
      setWorkout(session);
      // console.log("openSnack");
      // setSnackbarMsg("Added exercise");
      // setTimeout(() => {
      //   setOpenSnackbar(false);
      // }, 30000);
    }
  }

  function test4() {
    console.log(workout);
  }

  return (
    <Grid
      container
      component={Paper}
      className={classes.root}
      elevation={6}
      square
    >
      {/* <CssBaseline /> */}

      <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Create session for : "
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <ActivityBuilder
            exercises={exercises}
            authUser={props.authUser}
            activity={activity}
            defaultActivity={defaultActivity}
            setActivity={setActivity}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            onDataChanged={onDataChanged}
            handleDrawerToggle={handleDrawerToggle}
            workout={workout}
            setWorkout={setWorkout}
            // setSliderValue={setSliderValue}
            // sliderValue={sliderValue}
          />

          {/* <p>Test Submit </p>
          <AddCircleIcon onClick={handleSubmit} /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={addActivity}
            // disabled={isValid}
          >
            Add Activity
          </Button>

          <Drawer anchor="right" open={drawer}>
            <AddExercise
              authUser={props.authUser}
              setOpenSnackbar={setOpenSnackbar}
              setSnackbarMsg={setSnackbarMsg}
            />
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
          </Drawer>
        </div>
      </Grid>

      <WorkoutBoard activity={activity} workout={workout} />
    </Grid>
  );
}

export default withRouter(withFirebase(Exercise));
