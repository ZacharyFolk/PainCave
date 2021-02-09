import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import {
  CssBaseline,
  Paper,
  Grid,
  IconButton,
  Drawer,
} from "@material-ui/core/";
import AddExercise from "../AddExercise";
import useStyles from "../../config/theme.exercise";
import ExerciseSelect from "../ExerciseSelect";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import WorkoutBoard from "../WorkoutBoard";

function Exercise(props) {
  let defaultDate = useState(new Date().getFullYear());
  console.log("date");
  console.log(defaultDate);
  console.log(defaultDate.year);
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

  function test2() {
    setWorkout({
      ...workout,
      activities: [...workout.activities, activity],
    });
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        <WorkoutBoard activity={activity} workout={workout} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <>
            <AddCircleIcon onClick={handleDrawerToggle} />
          </>

          <ExerciseSelect
            exercises={exercises}
            authUser={props.authUser}
            activity={activity}
            defaultActivity={defaultActivity}
            setActivity={setActivity}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            onDataChanged={onDataChanged}
            workout={workout}
            setWorkout={setWorkout}
            // setSliderValue={setSliderValue}
            // sliderValue={sliderValue}
          />

          <p>Test Submit </p>
          <AddCircleIcon onClick={handleSubmit} />

          <p>Set Workout State</p>
          <AddCircleIcon onClick={test2} />

          <p>Set Workout DB</p>
          <AddCircleIcon onClick={test3} />

          <p>Log Workout</p>
          <AddCircleIcon onClick={test4} />

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
    </Grid>
  );
}

export default withRouter(withFirebase(Exercise));
