import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import {
  Link,
  FormControl,
  Button,
  FormHelperText,
  makeStyles,
  NativeSelect,
  Modal,
  ListItemText,
} from "@material-ui/core/";
import RenderSwitch from "./render-switch";
import {
  Paper,
  Grid,
  MenuItem,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core/";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {
  mdiWeightLifter,
  mdiYoga,
  mdiBike,
  mdiScriptTextKeyOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import ControlPointOutlinedIcon from "@material-ui/icons/ControlPointOutlined";
import Divider from "@material-ui/core/Divider";

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
  const { firebase, authUser, handleDrawerToggle } = props;
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [selectLabel, setLabel] = useState("Choose a type");
  const [options, setOptions] = useState([]);
  const [exerciseList, setList] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [groupValue, setGroup] = useState("");

  const handleOpen = () => {
    setOpen(true);
    // console.log("WHAT IS " + exerciseTitle);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setTitle(value);
    props.setActivity({
      ...props.activity,
      [name]: value,
    });
  }
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setValue(value);

    props.setActivity({
      ...props.activity,
      name: value,
    });
    fetchOptions(value);
  };
  function addToWorkout() {
    console.log("ACTIVITY");
    console.log(exerciseTitle);

    props.setActivity({
      ...props.activity,
      ["title"]: exerciseTitle,
    });
    props.setWorkout({
      ...props.workout,
      activities: [...props.workout.activities, props.activity],
    });
    // resetObject(workout);
  }

  const openExerciseOptions = (e) => {
    // console.log(props.activity);
    console.log(e.currentTarget.value);
    setExerciseTitle(e.currentTarget.value);
    console.log(exerciseTitle);
    // console.log("ACTIVITY AFTER");
    // console.log(props.activity);
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
        setActivity={props.setActivity}
        activity={props.activity}
      />
      <Button variant="outlined" onClick={addToWorkout}>
        Add Activity to Workout
      </Button>
    </div>
  );

  const selectChange = (e) => {
    const { name, value } = e.target;
    setGroup(value);
    props.setActivity({
      ...props.activity,
      [name]: value,
    });
    // setLabel("Choose " + value + " activity");
    ExerciseList(value);
  };

  function fetchOptions(value) {
    let ref = firebase.db
      .ref()
      .child(`users/${authUser.uid}/exercises/groups/${value}/`);
    var exerciseArray = [];
    ref.on("value", (snapshot) => {
      if (snapshot && snapshot.exists()) {
        snapshot.forEach((data) => {
          const dataVal = data.val();
          exerciseArray.push(
            <option key={data.key} value={dataVal}>
              {dataVal}
            </option>
          );
        });
        setOptions(exerciseArray);
      }
    });
  }

  function ExerciseList(value) {
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
        //exerciseArray.push(modalFooter);

        setList(exerciseArray);
      }
    });
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
