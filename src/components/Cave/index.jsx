import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import {
  Grid,
  IconButton,
  Drawer,
  Button,
  Fab,
  Modal,
} from "@material-ui/core/";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import CloseIcon from "@material-ui/icons/Close";
import NavigationIcon from "@material-ui/icons/Navigation";
import AddExercise from "./add-exercise";
import useStyles from "../../config/theme.exercise";
import ActivityBuilder from "./activity-builder";
import WorkoutBoard from "./workout-board";

function Exercise(props) {
  let defaultDate = useState(new Date().getFullYear());
  const [open, setOpen] = React.useState(false);

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
  const [group, setGroup] = useState("");
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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  function viewWorkout() {
    console.log(activity);
    console.log(workout);
  }

  return (
    <Grid container justify="center">
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
      <Grid item xs={12}>
        <Grid container justify="center">
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
            setGroup={setGroup}
            selectedDate={selectedDate}
            // setSliderValue={setSliderValue}
            // sliderValue={sliderValue}
          />

          {/* <p>Test Submit </p>
          <AddCircleIcon onClick={handleSubmit} /> */}
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={addActivity}
            // disabled={isValid}
          >
            Add Activity
          </Button> */}
        </Grid>
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
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <>
          <WorkoutBoard activity={activity} workout={workout} />
        </>
      </Modal>

      <Fab variant="extended" onClick={handleOpen}>
        {/* viewWorkout handleOpen */}
        <NavigationIcon className={classes.extendedIcon} />
        View Progress
      </Fab>
    </Grid>
  );
}

export default withRouter(withFirebase(Exercise));
