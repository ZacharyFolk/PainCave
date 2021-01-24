import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddExercise from '../AddExercise';
import ExerciseList from '../ExerciseList';
import useStyles from '../../config/theme.exercise';
import ExerciseSelect from '../ExerciseSelect';
import Modal from '@material-ui/core/Modal';
import Drawer from '@material-ui/core/Drawer';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

function Exercise(props) {
  const classes = useStyles();
  const {authUser, firebase} = props;
  const uid = authUser.uid;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [exercises, setExercises] = useState(true);
  const [loading, setLoading] = useState([]);
  const [drawer, setDrawerState] = useState(false);

  function handleDrawerToggle(){
    setDrawerState(!drawer)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
    
        <>
             <AddCircleIcon
             onClick={handleDrawerToggle}
             />
             </>
        
        <ExerciseSelect
          exercises={exercises}
          authUser={props.authUser}
        />
        <Drawer anchor='right' open={drawer} >
        <AddExercise 
        authUser={props.authUser}
        setOpenSnackbar={setOpenSnackbar}
        setSnackbarMsg={setSnackbarMsg}
        />
           <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon/>
              </IconButton>
          </Drawer>
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(withFirebase(Exercise));