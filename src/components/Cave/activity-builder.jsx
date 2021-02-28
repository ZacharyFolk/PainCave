import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";
import {
  FormControl,
  Button,
  makeStyles,
  Modal,
  ListItemText,
  Grid,
  MenuItem,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core/";
import RenderSwitch from "./render-switch";

import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ControlPointOutlinedIcon from "@material-ui/icons/ControlPointOutlined";

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
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
function ActivityBuilder(props) {
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

  const [modalStyle] = React.useState(getModalStyle);
  const {
    firebase,
    authUser,
    selectLabel,
    setLabel,
    handleDrawerToggle,
  } = props;
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
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [exerciseList, setList] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [groupValue, setGroup] = useState("");
  const [activity, setActivity] = useState({});

  useEffect(() => {
    console.log("Group value changed");
    console.log(groupValue);
    setActivity({
      ...activity,
      ["group"]: groupValue,
    });
  }, [groupValue]);

  useEffect(() => {
    console.log("Exercise title changed");
    console.log(exerciseTitle);
    console.log(activity);
    setActivity({
      ...activity,
      activity: {
        title: exerciseTitle,
        group: groupValue,
      },
    });
  }, [exerciseTitle]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setTitle(value);
    props.setActivity({
      ...activity,
      [name]: value,
    });
  }

  function addToWorkout() {
    props.setWorkout({
      ...props.workout,
      activities: [...props.workout.activities, props.activity],
    });
    // resetObject(workout);
  }

  const openExerciseOptions = (e) => {
    // set title state here and useEffect to listen to that
    console.log("what is group value in openExerciseOptions? " + groupValue);
    console.log("what is title (target.value)? " + e.currentTarget.value);
    setExerciseTitle(e.currentTarget.value);
    setActivity({
      ...activity,
      ["title"]: e.currentTarget.value,
    });
    handleOpen();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{exerciseTitle}</h2>
      <p id="simple-modal-description">
        {/* TODO: Add description field to exercise table? */}
      </p>
      <RenderSwitch
        value={groupValue}
        setActivity={setActivity}
        activity={activity}
      />
      <Button variant="outlined" onClick={addToWorkout}>
        Add Activity to Workout
      </Button>
    </div>
  );
  const selectChange = (e) => {
    const { name, value } = e.target;
    setGroup(value);
    // setActivity({
    //   ...activity,
    //   [name]: value,
    // });
    console.log(activity);
    createExerciseList(value);
  };
  // TODO : Need to move this up to index.. activites is a step behind here
  function createExerciseList(value) {
    let ref = firebase.db
      .ref()
      .child(`users/${authUser.uid}/exercises/groups/${value}/`);
    var exerciseArray = [];
    // const modalFooter = (
    //   <List component="nav" aria-label="secondary ">
    //     <ListItemLink href="#" onClick={handleDrawerToggle}>
    //       <ListItemText primary="Add new activity" />
    //     </ListItemLink>
    //   </List>
    // );

    ref.on("value", (snapshot) => {
      if (snapshot && snapshot.exists()) {
        console.log("WHAT IS IT HERE? " + value);
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

            // <option key={data.key} value={dataVal}>
            //   {dataVal}
            // </option>
          );
        });
        // exerciseArray.push(modalFooter);
        console.log(exerciseArray);
        setList(exerciseArray);
      }
    });

    console.log("Now what activities look like? ");
    console.log(value);
    console.log(activity);
  }

  return (
    <>
      <Grid container justify="center">
        <Grid container item xs={12} justify="center">
          <FormControl variant="outlined" className={classes.formControl}>
            <Select /* switch with NativeSelect? */
              name="group"
              displayEmpty
              className={classes.selectEmpty}
              onChange={selectChange}
              value={groupValue}
              inputProps={{
                name: "group",
                id: "activity-type",
              }}
            >
              <MenuItem value="" disabled>
                Select type:
              </MenuItem>
              <MenuItem value="cardio">Cardio</MenuItem>
              <MenuItem value="body">Body</MenuItem>
              <MenuItem value="weights">Weights</MenuItem>
              {/* <option value="cardio">Weights</option>
              <option value="body">Body</option>
              <option value="weights">Weights</option> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid container item xs={12} justify="center">
          {/* <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="activity-selector">{selectLabel}</InputLabel>
            <Select
              name="title"
              value={title}
              onChange={handleChange}
              inputProps={{
                name: "title",
                id: "activity-selector",
              }}
            >
              <option aria-label="None" value="" />
              {options}
            </Select>
          </FormControl> */}
          <List>{exerciseList}</List>
        </Grid>
      </Grid>
      {/* <RenderSwitch
        value={value}
        setActivity={props.setActivity}
        activity={props.activity}
      /> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}

export default withFirebase(ActivityBuilder);
