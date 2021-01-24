import React from 'react';
import { withFirebase } from  '../Firebase';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function ExerciseList(props) {
    const {firebase, authUser} = props;
    const {loading, exercises} = props;


    const fetchExercise = (exercises) => {
        console.log('click');

        const retrieveData = () => {
            let ref = firebase.db.ref().child(`users/${authUser.uid}/exercises/groups/weights/`);
            ref.on("value", function(snapshot) {
                console.log(snapshot.val());
              }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
              });
         

        };

        retrieveData();


    }

    const deleteExercise = (i) => {
       const exerciseKey = Object.keys(exercises)[i];
       // Connect to our firebase API
       const emptyExercise = {
            name: null,
            group: null,
       };

    props.firebase.updateExercise(props.authUser.uid, emptyExercise, exerciseKey);

       // Show notification
    //    setOpenSnackbar(true);
    //    setSnackbarMsg('Deleted exercise');
    //    setTimeout(() => {
    //     setOpenSnackbar(false)
    //    }, 3000)

       // stop editing
      // setEditing(false);
    }

    return (
        <>
            { 
              loading === true 
                    ? <p>loading...  </p>
                    : ''
            }
            
            {
                exercises === 'not set' || exercises === null
                    ? <p>No exercises added yet.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>
                                    <AddCircleIcon
                                        onClick={e => fetchExercise(exercises)}
                                    />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
    
                                Object.values(exercises).map((exercise, i) => {
                                    let {name, group} = exercise;
                                    {    
                                        console.log('Exercise List');
                                        console.log(exercise.name);
                                    }

                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{group}</TableCell>
                                            <TableCell>
                                                <DeleteIcon 
                                                    onClick={e => deleteExercise(i)}
                                                />
                                             
                                    
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
};

export default withFirebase(ExerciseList);