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
import WorkoutBoard from '../WorkoutBoard';

function Exercise(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const defaultActivity = {
    name: '',
    group: '',
    date: selectedDate,
    distance: 0,
    duration: 0,
    reps: 0,
    sets: 0,
    type: 1,
    weight: 0,
}

  const classes = useStyles();
  const {authUser, firebase} = props;
  const uid = authUser.uid;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [exercises, setExercises] = useState(true);
  const [loading, setLoading] = useState([]);
  const [drawer, setDrawerState] = useState(false);
  const [activity, setActivity] = useState(defaultActivity);

  const [ values, buildPlan ] = useState(defaultActivity);

  const onDataChanged = (name, value) => {
    console.log('YOU DID SOMETHING')
    console.log(name + ':' + value);
    // activity[name] = value;
    console.log(defaultActivity);
    console.log(activity);

    // console.log(event.target.value)  
    // setSliderValue(value);
}
  function handleDrawerToggle(){
    setDrawerState(!drawer)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>

      <WorkoutBoard 
        activity={activity} 
      />
      </Grid>
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
          activity={activity}
          defaultActivity={defaultActivity}
          setActivity={setActivity}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          onDataChanged={onDataChanged}
          // setSliderValue={setSliderValue}
          // sliderValue={sliderValue}
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