import React from "react";
import Box from "@material-ui/core/Box";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { mdiWeightLifter, mdiYoga, mdiBike } from "@mdi/js";
import Icon from "@mdi/react";
import { NearMe } from "@material-ui/icons";
import { isCompositeComponent } from "react-dom/test-utils";

export default function WorkoutBuild(props) {
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
    //     <Box
    //       id="workout_board"
    //       boxShadow={3}
    //       bgcolor="background.paper"
    //       m={1}
    //       p={1}
    //     >
    //       <h1>Workout Plan</h1>
    // <p></p>
    //       {props.activity.group !== "" && (
    //         <>
    //           <h2>Type : {props.activity.group} </h2>
    //         </>
    //       )}
    //       {props.activity.title !== "" && (
    //         <>
    //           <p>{props.activity.title}</p>
    //         </>
    //       )}
    //       {props.activity.duration !== "" && (
    //         <>
    //           <p>Duration : {props.activity.duration}</p>
    //         </>
    //       )}
    //       {props.activity.sets > 0 && (
    //         <>
    //           <p>Sets : {props.activity.sets}</p>
    //         </>
    //       )}

    //       {props.activity.reps > 0 && (
    //         <>
    //           <p>Reps : {props.activity.reps}</p>
    //         </>
    //       )}

    //       {props.activity.weights > 0 && (
    //         <>
    //           <p>Weights : {props.activity.weights}</p>
    //         </>
    //       )}
    //       <AddCircleIcon onClick={fetchActivities} />
    //     </Box>

    <>
      {props.workout.activities === "not set" ||
      props.workout.activities === null ? (
        <p>No activities added yet.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {Object.values(props.workout.activities).map((activity, i) => {
                let { name, type, duration } = activity;
                // console.log("what this?");
                // console.log(activity.name);

                if (name !== undefined) {
                  let ico = "";
                  switch (name) {
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
                      <TableCell>{activity.duration} mins</TableCell>

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
    </>
  );
}
