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

export default WorkoutSlider;
