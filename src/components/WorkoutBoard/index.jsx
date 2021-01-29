import React from 'react';
import Box from '@material-ui/core/Box';

export default function WorkoutBuild(props) {

  function shouldRender(value) {
    return (value > 0) 
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

        <h2>Type : {props.activity.group} </h2>

        {props.activity.duration > 0 &&
        <>
          <p>Duration : {props.activity.duration}</p>
        </>
        }

      </Box>

  );
}