import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import {
  CssBaseline,
  Paper,
  makeStyles,
  Modal,
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
// import WorkoutBoard from "./workout-board";
import ExerciseSelect from "./exercise-select";
// import ExerciseList from "./exercise-list";
import { ListItemText, ListItemSecondaryAction } from "@material-ui/core/";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ControlPointOutlinedIcon from "@material-ui/icons/ControlPointOutlined";
import RenderSwitch from "./render-switch";

function Exercise(props) {
  let defaultDate = useState(new Date().getFullYear());
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
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
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [open, setOpen] = React.useState(false);

  const [exType, setExerciseType] = useState("");
  const [exerciseList, setList] = useState([]);
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const [modalStyle] = React.useState(getModalStyle);

  const exerciseDetails = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{exerciseTitle}</h2>
      <p id="simple-modal-description">
        {/* TODO: Add description field to exercise table? */}
      </p>
      <RenderSwitch
        value={activity.group}
        setActivity={setActivity}
        activity={activity}
      />
      <Button variant="outlined" onClick={addToWorkout}>
        Add Activity to Workout
      </Button>
    </div>
  );
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // useEffect(() => {
  //   console.log("Index rendered");
  //   console.log("From Index (exType) : " + exType);
  //   console.log("============ INDEX STATE OF ACTIVITY ================");
  //   console.log(activity);
  // }, []);

  useEffect(() => {
    // console.log("Activity value changed");
    // console.log(activity);
    // console.log(activity.group);
    if (activity.group != "undefined") {
      CreateExerciseList();
    }
  }, [activity]);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  function CreateExerciseList() {
    let ref = firebase.db
      .ref()
      .child(`users/${authUser.uid}/exercises/groups/${activity.group}/`);
    var exerciseArray = [];
    const modalFooter = (
      <List component="nav" aria-label="secondary " key="extra_001">
        <ListItem>
          <ListItemLink href="#" onClick={handleDrawerToggle}>
            <ListItemText primary="Add new activity" />
          </ListItemLink>
        </ListItem>
      </List>
    );

    ref.on("value", (snapshot) => {
      if (snapshot && snapshot.exists()) {
        console.log("WHAT IS IT HERE? " + activity.group);
        snapshot.forEach((data) => {
          const dataVal = data.val();
          exerciseArray.push(
            <ListItem key={data.key}>
              <ListItemText primary={dataVal} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="add"
                  onClick={openExerciseOptions}
                  key={data.key}
                  value={dataVal}
                >
                  <ControlPointOutlinedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        });
        exerciseArray.push(modalFooter);
        console.log(exerciseArray);
        setList(exerciseArray);
      }
    });
  }

  const openExerciseOptions = (e) => {
    setExerciseTitle(e.currentTarget.value);
    setActivity({
      ...activity,
      ["title"]: e.currentTarget.value,
    });
    handleOpen();
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

  function addToWorkout() {
    console.log("Activity when add to workout");
    console.log(activity);

    setWorkout({
      ...workout,
      activities: [...workout.activities, activity],
    });
    resetObject(workout);
  }
  function viewWorkout() {
    console.log("======================(exerciseList)======================");
    console.log(exerciseList);
    console.log("======================(activity)======================");
    console.log(activity);
    console.log("======================(workout)======================");
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
          <Grid container item xs={12} justify="center">
            <ExerciseSelect setActivity={setActivity} activity={activity} />
          </Grid>
          <Grid container item xs={12} justify="center">
            <List>{exerciseList}</List>
          </Grid>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {exerciseDetails}
          </Modal>
          {/* <ActivityBuilder
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
          /> */}
          {/* <p>Test Submit </p>
          <AddCircleIcon onClick={handleSubmit} /> */}
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
