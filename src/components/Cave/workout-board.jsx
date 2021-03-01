import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core/";
import { mdiWeightLifter, mdiYoga, mdiBike } from "@mdi/js";
import Icon from "@mdi/react";

export default function WorkoutBuild(props) {
  return (
    <div style={modalStyle} className={classes.paper}>
      <>
        {console.log("LOG ACTIVITY")}
        {console.log(props.activity)}
        {console.log("LOG WORKOUT")}
        {console.log(props.workout)}
      </>
      <h1>Plan for</h1>
      {props.workout.activities === "not set" ||
      props.workout.activities === null ? (
        <p>No activities added yet.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {Object.values(props.workout.activities).map((activity, i) => {
                let { name } = activity;
                if (name !== undefined) {
                  let ico = "";
                  switch (group) {
                    case "weights":
                      ico = mdiWeightLifter;
                      break;
                    case "body":
                      ico = mdiYoga;
                      break;
                    case "cardio":
                      ico = mdiBike;
                      break;
                    default:
                      ico = null;
                  }
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <Icon
                          path={ico}
                          title="User Profile"
                          size={1}
                          horizontal
                          vertical
                          rotate={90}
                          color="red"
                          spin
                        />
                      </TableCell>
                      <TableCell>{activity.title}</TableCell>
                      {activity.weights !== undefined && (
                        <>
                          <TableCell>{activity.weights} lbs </TableCell>
                        </>
                      )}
                      {activity.duration !== undefined && (
                        <>
                          <TableCell>{activity.duration} mins</TableCell>
                        </>
                      )}
                      {activity.sets !== undefined && (
                        <>
                          <TableCell>{activity.sets} sets</TableCell>
                        </>
                      )}
                      {activity.reps !== undefined && (
                        <>
                          <TableCell>{activity.reps} reps</TableCell>
                        </>
                      )}
                      {/* <TableCell>
                      <DeleteIcon onClick={(e) => deleteActivity(i)} />
                      <EditIcon
                        onClick={(e) => editActivity(activity, i)}
                        style={{ marginLeft: "20px" }}
                      />
                    </TableCell> */}
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
