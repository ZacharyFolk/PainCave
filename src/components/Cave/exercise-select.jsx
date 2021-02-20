import React, { useState } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core/";
const ExerciseSelect = (props) => {
  const [groupValue, setGroup] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup(value);
    props.setActivity({
      ...props.activity,
      [name]: value,
    });
    // setLabel("Choose " + value + " activity");
    // ExerciseList(value);
  };

  return (
    <FormControl variant="outlined">
      <Select /* switch with NativeSelect? */
        name="group"
        displayEmpty
        onChange={handleChange}
        //onChangeCommitted={setObject}
        value={groupValue}
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
};

export default ExerciseSelect;
