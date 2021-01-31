import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import FormControl from "@material-ui/core/FormControl";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import RadioButtonsGroup from "../forms/Radios";
import WorkoutSlider from "../forms/WorkoutSlider";

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
      return <p>Choose a group</p>;
  }
}
function resetObject(props) {
  var obj = props.activity;
  Object.keys(obj).forEach(function (key) {
    if (obj[key] !== "") {
      obj[key] = "";
    }
  });
}

function AddActivitySelect(props) {
  const { firebase, authUser, workout } = props;
  const [value, setValue] = React.useState("");
  const [exerciseName, setExercise] = React.useState("");

  const [options, setOptions] = React.useState([]);
  function handleChange(e) {
    const { name, value } = e.target;
    console.log("HANDLE SELECT CHANGE");
    console.log(name + value);
    props.setActivity({
      ...props.activity,
      [name]: value,
    });
  }

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setValue(value);

    resetObject(props);

    props.setActivity({
      ...props.activity,
      ["group"]: value,
    });
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
          console.log("DATA VAL");
          console.log(data.val);
          console.log("DATA KEY");
          console.log(data.key);

          const dataVal = data.val();
          exerciseArray.push(
            <option key={data.key} value={dataVal}>
              {dataVal}
            </option>
          );
        });
        setOptions(exerciseArray);
        console.log(options);
      }
    });
  }

  function test() {
    console.log(props.activity);
    //  console.log(props.defaultActivity);
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

          <RadioButtonsGroup
            value={value}
            handleRadioChange={handleRadioChange}
          />

          <select name="title" onChange={handleChange}>
            <option selected="selected">Choose an activity</option>
            {options}
          </select>

          <RenderSwitch
            value={value}
            setActivity={props.setActivity}
            activity={props.activity}
          />

          <AddCircleIcon onClick={test} />
        </FormControl>
      </form>
    </>
  );
}

export default withFirebase(AddActivitySelect);
