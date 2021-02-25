import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import {
  CssBaseline,
  Paper,
  Grid,
  IconButton,
  Drawer,
  Button,
  Fab,
} from "@material-ui/core/";
import NavigationIcon from "@material-ui/icons/Navigation";

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
import ExerciseSelect from "./exercise-select";
import ExerciseList from "./exercise-list";
import { ListItemText, ListItemSecondaryAction } from "@material-ui/core/";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ControlPointOutlinedIcon from "@material-ui/icons/ControlPointOutlined";
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
  const [selectLabel, setLabel] = useState("Choose a type");

  const classes = useStyles();
  const { authUser, firebase } = props;
  const uid = authUser.uid;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [exercises, setExercises] = useState(true);
  const [loading, setLoading] = useState([]);
  const [drawer, setDrawerState] = useState(false);

  const [exType, setExerciseType] = useState("");
  const [exList, setList] = useState([]);

  useEffect(() => {
    console.log("Index rendered");
    console.log("From Index (exType) : " + exType);
    console.log("============ INDEX STATE OF ACTIVITY ================");
    console.log(activity);
  }, []);

  const exSelectChange = (e) => {
    const { name, value } = e.target;
    setExerciseType(value);
    setActivity({
      ...activity,
      [name]: value,
    });

    // buildList(value);
  };

  function buildList() {
    let exArray = firebase.fetchExercise(uid, exType);
    console.log("buildList (exType) (exArray)");
    console.log(exType);
    console.log(exArray);
    // var i;
    // for (i = 0; i < exArray.length; i++) {
    //   console.log("uhh");
    //   console.log(exArray[i]);
    // }
    exArray.map((v, i) => {
      console.log("V: " + v);
      console.log("I: " + i);
      // listArray.push(
      //   <ListItem key={i}>
      //     <ListItemText primary={v} />
      //   </ListItem>
      // );
    });

    // setList(listArray);
  }

  function fetchActivities() {
    console.log("exType : " + exType);
  }

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
    console.log(exList);
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
          <ExerciseSelect
            exSelectChange={exSelectChange}
            exType={exType}
            buildList={buildList}
            activity={activity}
          />
          {/* <Grid container item xs={12} justify="center">
            <List>{exList}</List>
          </Grid> */}
          <ActivityBuilder
            exercises={exercises}
            authUser={props.authUser}
            activity={activity}
            defaultActivity={defaultActivity}
            setActivity={setActivity}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            handleDrawerToggle={handleDrawerToggle}
            workout={workout}
            setWorkout={setWorkout}
            selectLabel={selectLabel}
            setLabel={setLabel}
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

      <WorkoutBoard activity={activity} workout={workout} />
      <>
        <Fab variant="extended" onClick={viewWorkout}>
          <NavigationIcon className={classes.extendedIcon} />
          View Progress
        </Fab>
      </>
    </Grid>
  );
}

export default withRouter(withFirebase(Exercise));
