import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import FormControl from "@material-ui/core/FormControl";
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
  const { firebase, authUser } = props;
  const [value, setValue] = useState("");

  const [options, setOptions] = useState([]);
  function handleChange(e) {
    const { name, value } = e.target;
    props.setActivity({
      ...props.activity,
      [name]: value,
    });
  }

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setValue(value);

    //  resetObject(props);

    props.setActivity({
      ...props.activity,
      name: value,
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
            <option>Choose an activity</option>
            {options}
          </select>

          <RenderSwitch
            value={value}
            setActivity={props.setActivity}
            activity={props.activity}
          />
        </FormControl>
      </form>
    </>
  );
}

export default withFirebase(AddActivitySelect);
