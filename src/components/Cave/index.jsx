import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import {
  makeStyles,
  Modal,
  Grid,
  IconButton,
  Drawer,
  Button,
  Fab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core/";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import CloseIcon from "@material-ui/icons/Close";
import NavigationIcon from "@material-ui/icons/Navigation";
import AddExercise from "./add-exercise";
import CloseIcon from "@material-ui/icons/Close";
import NavigationIcon from "@material-ui/icons/Navigation";
// import WorkoutBoard from "./workout-board";
import ExerciseSelect from "./exercise-select";
import ControlPointOutlinedIcon from "@material-ui/icons/ControlPointOutlined";
import RenderSwitch from "./render-switch";

function Exercise(props) {
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [drawer, setDrawerState] = useState(false);
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [open, setOpen] = React.useState(false);

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

  useEffect(() => {
    if (activity.group !== "undefined") {
      CreateExerciseList();
    }
  }, [activity]);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const CreateExerciseList = () => {
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
        setList(exerciseArray);
      }
    });
  };

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
    setWorkout({
      ...workout,
      activities: [...workout.activities, activity],
    });
    resetObject(workout);
  }

  function viewWorkout() {
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
