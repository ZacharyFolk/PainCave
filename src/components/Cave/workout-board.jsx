import React, { useState } from "react";

import { Table, makeStyles } from "@material-ui/core/";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { mdiWeightLifter, mdiYoga, mdiBike } from "@mdi/js";
import Icon from "@mdi/react";
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
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function WorkoutBuild(props) {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  function fetchActivities() {
    let act = props.workout.activities;

    Object.values(act).map((activity, i) => {
      let { name, group } = activity;
      {
        //   console.log(props.activity);
      }
    });
  }

  function shouldRender(value) {
    return value > 0;
  }
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
                let { group, type, duration } = activity;
                console.log("what this?");
                console.log(activity);

                if (group !== undefined) {
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
