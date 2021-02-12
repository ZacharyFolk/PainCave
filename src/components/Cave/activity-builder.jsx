import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import RadioButtonsGroup from "./radios-type";
import WorkoutSlider from "./workout-slider";
import { Paper, Grid, MenuItem } from "@material-ui/core/";
import Select from "@material-ui/core/Select";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function RenderSwitch(props) {
  switch (props.value) {
    case "cardio":
      return (
        <WorkoutSlider
          activity={props.activity}
          setActivity={props.setActivity}
          step={1}
          max={120}
          name="duration"
        />
      );
    case "body":
      return (
        <>
          <WorkoutSlider
            activity={props.activity}
            setActivity={props.setActivity}
            step={1}
            max={10}
            name="sets"
          />

          <WorkoutSlider
            activity={props.activity}
            setActivity={props.setActivity}
            step={1}
            max={20}
            name="reps"
          />
        </>
      );

    case "weights":
      return (
        <>
          <WorkoutSlider
            activity={props.activity}
            setActivity={props.setActivity}
            step={5}
            max={350}
            name="weights"
          />

          <WorkoutSlider
            activity={props.activity}
            setActivity={props.setActivity}
            step={1}
            max={10}
            name="sets"
          />

          <WorkoutSlider
            activity={props.activity}
            setActivity={props.setActivity}
            step={1}
            max={20}
            name="reps"
          />
        </>
      );
    default:
      return null;
  }
}

function ActivityBuilder(props) {
  const classes = useStyles();

  const { firebase, authUser, handleDrawerToggle } = props;
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [selectLabel, setLabel] = useState("Choose a type");

  const [options, setOptions] = useState([]);

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
    setLabel("Choose " + value + " activity");
    fetchOptions(value);
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

            // <option key={data.key} value={dataVal}>
            //   {dataVal}
            // </option>
          );
        });
        setOptions(exerciseArray);
      }
    });
  }

  return (
    <>
      <form noValidate onSubmit={(e) => e.preventDefault()}>
        <FormControl>
          <p>Create Workout for </p>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={props.selectedDate}
              onChange={props.handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </FormControl>

        <RadioButtonsGroup
          value={value}
          handleRadioChange={handleRadioChange}
        />

        {/* <select name="title" onChange={handleChange}>
            <option>Choose an activity</option>
            {options}
          </select> */}
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={false} xs={12}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="activity-selector">
                  {selectLabel}
                </InputLabel>

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
              </FormControl>
              <AddCircleIcon onClick={handleDrawerToggle} />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container>
            <RenderSwitch
              value={value}
              setActivity={props.setActivity}
              activity={props.activity}
            />
          </Grid>
        </Paper>
      </form>
    </>
  );
}

export default withFirebase(ActivityBuilder);
