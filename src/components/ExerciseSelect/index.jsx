import React, { Fragment, useState } from 'react';
import { withFirebase } from '../Firebase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Button, MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {   DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
 } from "@material-ui/pickers";
function AddActivitySelect(props) {

    const {firebase, authUser, drawer} = props;
    const [value, setValue] = React.useState('');
    const [enabled, setEnabled ] = React.useState( false );
    const [options, setOptions] = React.useState([]);
    const [exerciseName, setExercise ] =  React.useState('');
    const [selectedDate, handleDateChange] = useState(new Date());
    const optionArray = [];


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
       
                  //  exerciseArray.push(<option key={data.key} value={data.key}> { dataVal} </option>)

                  exerciseArray.push(<option key={data.key} value={dataVal}> { dataVal} </option>)
                })
                setOptions(exerciseArray);
            }})
    }


    function test(){
        console.log(exerciseName)
        
    }

    function renderSwitch( value ) {
        console.log('THIS IS THE VALUE : ' + value )
        switch(value){
            case 'cardio':
                return <p>THIS IS CARDIO</p>;
            case 'body':
                return <p>THIS IS BODY</p>;
            case 'weights':
                return <p>THIS IS WEIGHTS</p>
            default: 
            return <p>Choose a group</p>
        }
    }
 

    function getCardioComps(){

    }

    function getBodyComps(){

    }

    function getWeightsComps(){

    }

    function RadioButtonsGroup() {
        return (
            <RadioGroup 
                aria-label="group"
                name="group" 
                value={value} 
                onChange={handleRadioChange} 
                row
            >
            <FormControlLabel  
                name="group" 
                value="cardio" 
                control={<Radio />} 
                label="Cardio 🚴" 
            />
            <FormControlLabel  
                name="group" 
                value="body" 
                control={<Radio />} 
                label="Body 🤸‍♂️"
            />
            <FormControlLabel 
                name="group" 
                value="weights" 
                control={<Radio />} 
                label="Weights 🏋️" 
            />
            </RadioGroup>
          
        );
    }


    return (
        <>
        <form noValidate onSubmit={(e) => e.preventDefault()}>
            <FormControl>
                <RadioButtonsGroup />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker value={selectedDate} onChange={handleDateChange} />
      <TimePicker value={selectedDate} onChange={handleDateChange} />
      <DateTimePicker value={selectedDate} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
                <>
             <AddCircleIcon
             onClick={test}
             />
             </>
              <select onChange={handleChange}>
                  {options}
              </select>
            </FormControl>
        </form>
        <div>
            { renderSwitch(value)}

        </div>
        </>
    );  
}

export default withFirebase(AddActivitySelect);