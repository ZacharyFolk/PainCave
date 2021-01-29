import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import FormControl from '@material-ui/core/FormControl';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import RadioButtonsGroup from '../forms/Radios'
import WorkoutSlider from '../forms/WorkoutSlider'

function AddActivitySelect(props) {
    const {firebase, authUser, workout} = props;
    const [value, setValue] = React.useState('');
    const [exerciseName, setExercise ] =  React.useState('');

    const [options, setOptions] = React.useState([]);
    function handleChange(e){
        const { name, value } = e.target;
        setExercise(value);
        console.log( name + value)
    }

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        console.log('yo')
        setValue(value);
      // props.setActivity(props.defaultActivity)
        props.setActivity({
            ...props.activity, ['group']: value,
        }) 
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
        console.log(props.activity)
       
    }

    function RenderSwitch( value ) {
        switch(value.value){
            case 'cardio':
                return <WorkoutSlider
                aria_id={'duration'}
                value={props.activity.duration}
                activity={props.activity}
                onDataChanged={props.onDataChanged}

                step={1}
                max={120}
                name="Duration"
                />;
            case 'body':
                return  (
                <>
                    <WorkoutSlider
                    aria_id={'sets'}
                    value={props.sliderValue}
                    activity={props.activity}
                    onDataChanged={props.onDataChanged}

                    step={1}
                    max={10}
                    name="Sets"
                    />
                    <WorkoutSlider                                    
                    aria_id={'reps'}
                    value={props.activity.duration}
                    activity={props.activity}
                    onDataChanged={props.onDataChanged}

                    step={1}
                    max={20}
                    name="Reps"
                    />
                </>
                )

            case 'weights':
                return  (
                <> 
                <WorkoutSlider
                aria_id={'weights'}
                value={props.activity.duration}
                activity={props.activity}
                onDataChanged={props.onDataChanged}

                step={5}
                max={350}
                name="Weights"
                />

                <WorkoutSlider
                aria_id={'sets'}
                value={props.sliderValue}
                activity={props.activity}
                onDataChanged={props.onDataChanged}

                step={1}
                max={10}
                name="Sets"
                />

                <WorkoutSlider
                aria_id={'reps'}
                value={props.activity.duration}
                activity={props.activity}
                onDataChanged={props.onDataChanged}

                step={1}
                max={20}
                name="Reps"
                />

                </>
                )
            default: 
            return <p>Choose a group</p>
        }
    }
 
    return (
        <>
        <form noValidate onSubmit={(e) => e.preventDefault()}>
            <FormControl>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker 
                        value={props.selectedDate} 
                        onChange={props.handleDateChange}
                    />
                </MuiPickersUtilsProvider>

                <RadioButtonsGroup
                value={value} 
                handleRadioChange={handleRadioChange} />

                <select onChange={handleChange}>
                  {options}
                </select>

              <RenderSwitch value={value} />
            
              <AddCircleIcon onClick={test} />

            </FormControl>
        </form>
    
        </>
    );  
}

export default withFirebase(AddActivitySelect);
