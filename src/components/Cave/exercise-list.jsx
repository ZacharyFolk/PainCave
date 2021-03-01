import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core/";
import Icon from "@mdi/react";
import ControlPointOutlinedIcon from "@material-ui/icons/ControlPointOutlined";
function getExerciseList(value) {}
const ExerciseList = (props) => {
  const { firebase, authUser, activity } = props;
  const [exerciseList, setList] = useState([]);

  let value = activity.group;

  // Instead always try and buld exerciseList and check instad if that is empty
  // Check out useEffect and set up an async function for data fetching
  // Add empty array as second argument to avoid activating it on component updates
  // Then it will only activate on mounting of component

  if (value !== "") {
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
        snapshot.forEach((data) => {
          const dataVal = data.val();
          exerciseArray.push(
            <ListItem key={data.key}>
              <ListItemText primary={dataVal} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="add"
                  // onClick={openExerciseOptions}
                  key={data.key}
                  value={dataVal}
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
        //exerciseArray.push(modalFooter);

        setList(exerciseArray);
      }
    });

    return <List>{exerciseList}</List>;
  } else {
    return <h3>Choose a group</h3>;
  }
};

export default ExerciseList;
