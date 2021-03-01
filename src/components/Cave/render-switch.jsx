import React from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const WorkoutSlider = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function setObject() {
    props.setActivity({
      ...props.activity,
      [props.name]: value,
    });
  }
  return (
    <React.Fragment>
      <Typography id="discrete-slider" gutterBottom>
        {props.name}
      </Typography>
      <Slider
        value={value}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={props.step}
        marks
        defaultValue={props.defaultValue}
        min={0}
        max={props.max}
        name={props.name}
        onChange={handleChange}
        onChangeCommitted={setObject}
        style={{ marginBottom: "20px" }}
      />
    </React.Fragment>
  );
};

export default function RenderSwitch(props) {
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
