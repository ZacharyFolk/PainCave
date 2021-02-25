import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";
import {
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core/";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ControlPointOutlinedIcon from "@material-ui/icons/ControlPointOutlined";

export default function ExerciseList(props) {
  const { exList } = props;
  let listArray = [];

  function getList() {
    exList.map((v, i) => {
      console.log("V: " + v);
      console.log("I: " + i);
      listArray.push(
        <ListItem key={i}>
          <ListItemText primary={v} />
        </ListItem>
      );
    });
  }
  getList();
  console.log("ARGGH");
  console.log(listArray);
  return <List>{listArray}</List>;

  //   let ref = firebase.db
  //     .ref()
  //     .child(`users/${authUser.uid}/exercises/groups/${exType}/`);
  //   // const modalFooter = (
  //   //   <List component="nav" aria-label="secondary ">
  //   //     <ListItemLink href="#" onClick={handleDrawerToggle}>
  //   //       <ListItemText primary="Add new activity" />
  //   //     </ListItemLink>
  //   //   </List>
  //   // );

  //   ref.on("value", (snapshot) => {
  //     if (snapshot && snapshot.exists()) {
  //       snapshot.forEach((data) => {
  //         const dataVal = data.val();
  //         exList.push(
  //           <ListItem key={data.key}>
  //             <ListItemText primary={dataVal} />
  //             <ListItemSecondaryAction>
  //               <IconButton
  //                 edge="end"
  //                 aria-label="add"
  //                 // onClick={openExerciseOptions}
  //                 key={data.key}
  //                 value={dataVal}
  //               >
  //                 <ControlPointOutlinedIcon />
  //               </IconButton>
  //             </ListItemSecondaryAction>
  //           </ListItem>

  //           // <option key={data.key} value={dataVal}>
  //           //   {dataVal}
  //           // </option>
  //         );
  //       });
  //       // exerciseArray.push(modalFooter);

  //       setList(exList);
  //     }
  //  });
}
