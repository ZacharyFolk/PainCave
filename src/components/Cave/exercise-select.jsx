import React, { useState, useEffect } from "react";
import { makeStyles, FormControl, MenuItem, Select } from "@material-ui/core/";

export default function ExerciseSelect(props) {
  const { exSelectChange, exType, activity } = props;
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
  const classes = useStyles();
  useEffect(() => {
    console.log("Exercise Select rendered: (exType) " + exType);
    console.log(
      "============ Exercise Select STATE OF ACTIVITY ================"
    );
    console.log(activity);
  });
  // const exSelectChange = (e) => {
  //   const { name, value } = e.target;
  //   setExerciseType(value);
  //   setActivity({
  //     ...activity,
  //     [name]: value,
  //   });

  //   // buildList(value);
  // };
  return (
    <>
      {console.log("From Ex-select (exType): " + exType)}
      <FormControl variant="outlined" className={classes.formControl}>
        <Select /* switch with NativeSelect? */
          name="group"
          displayEmpty
          className={classes.selectEmpty}
          onChange={exSelectChange}
          value={exType}
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
        </Select>
      </FormControl>
    </>
  );
}
