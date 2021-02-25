import React, { useState, useEffect } from "react";

export default function CreateExerciseList(value) {
  let ref = firebase.db
    .ref()
    .child(`users/${authUser.uid}/exercises/groups/${value}/`);
  var exerciseArray = [];
  // const modalFooter = (
  //   <List component="nav" aria-label="secondary ">
  //     <ListItemLink href="#" onClick={handleDrawerToggle}>
  //       <ListItemText primary="Add new activity" />
  //     </ListItemLink>
  //   </List>
  // );

  ref.on("value", (snapshot) => {
    if (snapshot && snapshot.exists()) {
      console.log("WHAT IS IT HERE? " + value);
      snapshot.forEach((data) => {
        const dataVal = data.val();
        exerciseArray.push(
          <ListItem key={data.key}>
            <ListItemText primary={dataVal} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="add"
                onClick={openExerciseOptions}
                key={data.key}
                value={value}
              >
                <ControlPointOutlinedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          // <option key={data.key} value={dataVal}>
          //   {dataVal}
          // </option>
        );
      });
      // exerciseArray.push(modalFooter);
      console.log(exerciseArray);
      setList(exerciseArray);
    }
  });

  console.log("Now what activities look like? ");
  console.log(value);
  console.log(props.activity);
}
