import React from "react";
import Box from "@material-ui/core/Box";

export default function WorkoutBuild(props) {
  function shouldRender(value) {
    return value > 0;
  }
  return (
    <Box
      id="workout_board"
      boxShadow={3}
      bgcolor="background.paper"
      m={1}
      p={1}
    >
      <h1>Workout Plan</h1>

      {props.activity.group !== "" && (
        <>
          <h2>Type : {props.activity.group} </h2>
        </>
      )}
      {props.activity.title !== "" && (
        <>
          <p>{props.activity.title}</p>
        </>
      )}
      {props.activity.duration !== "" && (
        <>
          <p>Duration : {props.activity.duration}</p>
        </>
      )}
      {props.activity.sets > 0 && (
        <>
          <p>Sets : {props.activity.sets}</p>
        </>
      )}

      {props.activity.reps > 0 && (
        <>
          <p>Reps : {props.activity.reps}</p>
        </>
      )}

      {props.activity.weights > 0 && (
        <>
          <p>Weights : {props.activity.weights}</p>
        </>
      )}
    </Box>
  );
}
