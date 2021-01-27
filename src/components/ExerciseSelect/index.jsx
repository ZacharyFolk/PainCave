import React, { Fragment, useState } from 'react';
import { withFirebase } from '../Firebase';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import { ThemeProvider , createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {   DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import RadioButtonsGroup from '../forms/Radios'
import WorkoutSlider from '../forms/WorkoutSlider'
import { Work } from '@material-ui/icons';

function AddActivitySelect(props) {
    const {firebase, authUser, drawer} = props;
    const [value, setValue] = React.useState('');
    const [exerciseName, setExercise ] =  React.useState('');
    const [selectedDate, handleDateChange] = useState(new Date());
    
    const defaultActivity = {
        name: '',
        group: '',
        type: 1,
        duration: 0,
        distance: 0,
        weight: 0,
        date: selectedDate,
    }
  
    const [options, setOptions] = React.useState([]);

    const [activity, setActivity] = useState(defaultActivity);

    const onDataChanged = (value) => {
        console.log(value);
    }

    function handleChange(e){
        const { name, value } = e.target;
        setExercise(value);
        console.log( name + value)
    }

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setValue(value); 
        fetchOptions(value);
        };
    
    function fetchOptions(value) {
        let ref = firebase.db.ref().child(`users/${authUser.uid}/exercises/groups/${value}/`);
        var exerciseArray = []
        ref.on("value", snapshot => {
            if (snapshot && snapshot.exists()){
                snapshot.forEach(data => {
                  const dataVal = data.val()
                  exerciseArray.push(<option key={data.key} value={dataVal}> { dataVal} </option>)
                })
                setOptions(exerciseArray);
            }})
    }


    function test(){
        console.log(activity)
       
    }

    function RenderSwitch( value ) {
        switch(value.value){
            case 'cardio':
                return <WorkoutSlider
                activity={activity}
                onDataChanged={onDataChanged}
                step={10}
                max={50}
                name="Duration"
                />;
            case 'body':
                // add reps and sets
            case 'weights':
                return <WorkoutSlider
                activity={activity}
                onDataChanged={onDataChanged}
                step={5}
                max={350}
                name="Weights"
                />;
            default: 
            return <p>Choose a group</p>
        }
    }
 


    return (
        <>
        <form noValidate onSubmit={(e) => e.preventDefault()}>
            <FormControl>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker value={selectedDate} onChange={handleDateChange} />
                </MuiPickersUtilsProvider>

                <RadioButtonsGroup
                value={value} 
                handleRadioChange={handleRadioChange} />

        

              <select onChange={handleChange}>
                  {options}
              </select>

              <RenderSwitch value={value} />

<AddCircleIcon
onClick={test}
/>




 
            </FormControl>
        </form>
    
        </>
    );  
}

export default withFirebase(AddActivitySelect);