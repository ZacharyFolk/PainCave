import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';

function AddActivitySelect(props) {
    const {firebase, authUser} = props;
    const [value, setValue] = React.useState('cardio');

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        console.log(name + ' ' + value);
        setValue(value);
        createSelect(value);
    };

    const handleDropdownChange = (e) => {
        this.setState({ selected: e.target.value, name: e.target.name});
        const { name, value } = e.target

        console.log( value)
    }

    function createSelect(value) {
        console.log('VALUE is passed to function : ' + value)
        function renderOptions(){
            let ref = firebase.db.ref().child(`users/${authUser.uid}/exercises/groups/${value}/`);
            ref.on("value", function(snapshot) {
                console.log(snapshot.val())
                return (
                    <MenuItem
                    label = "Select Exercise"
                    value={snapshot.val()}
                    name={snapshot.val()}
                    />
                )

              }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
              });
        }renderOptions();
      
        return (
            <div>
                <Select
                onChange={handleDropdownChange}>
                    {renderOptions()}
                </Select>
            </div>
        )
        

    };

    function RadioButtonsGroup() {
        return (
        <FormControl component="fieldset">
        <FormLabel component="legend">Types</FormLabel>
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
        </FormControl>
        );
    }
    return (
        <form noValidate onSubmit={(e) => e.preventDefault()}>
            <FormControl>
                <RadioButtonsGroup />
            </FormControl>
        </form>
    );  
}

export default withFirebase(AddActivitySelect);