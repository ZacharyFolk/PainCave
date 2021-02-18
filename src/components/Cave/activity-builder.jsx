import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { Link, FormControl } from "@material-ui/core/";
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
            defaultValue={3}
            step={1}
            max={15}
            name="sets"
          />

          <WorkoutSlider
            activity={props.activity}
            setActivity={props.setActivity}
            step={1}
            defaultValue={10}
            max={30}
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
            defaultValue={3}
            max={10}
            name="sets"
          />

          <WorkoutSlider
            activity={props.activity}
            setActivity={props.setActivity}
            step={1}
            defaultValue={10}
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

  const selectChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setValue(value);
    props.setActivity({
      ...props.activity,
      name: value,
    });
    setLabel("Choose " + value + " activity");
    fetchOptions(value);
  };

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
        <Paper className={classes.paper}>
          <Grid
            container
            spacing={2}
            container
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="activity-type">{selectLabel}</InputLabel>
                <Select
                  name="group"
                  onChange={selectChange}
                  inputProps={{
                    name: "group",
                    id: "activity-type",
                  }}
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT" disabled>
                    Choose a salutation ...
                  </option>
                  <option aria-label="None" value="cardio">
                    Cardio
                  </option>
                  <option aria-label="None" value="body">
                    Body
                  </option>
                  <option aria-label="None" value="weights">
                    Weights
                  </option>
                </Select>

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
            </Grid>
            <Grid item>
              <Link href="#" onClick={handleDrawerToggle}>
                Add new activity
              </Link>
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
