import React, { useState, useEffect } from "react";
import { makeStyles, FormControl, MenuItem, Select } from "@material-ui/core/";

export default function ExerciseSelect(props) {
  const { activity, setActivity } = props;
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

  const [exType, setExerciseType] = useState("");
  function resetObject() {
    Object.keys(activity).forEach(function (key) {
      if (activity[key] !== "") {
        //console.log(activity[key]);
        activity[key] = "";
      }
    });
  }
  const exSelectChange = (e) => {
    resetObject();
    const { name, value } = e.target;
    setExerciseType(value);
    setActivity({
      ...activity,
      [name]: value,
    });
  };
  return (
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
  );
}
