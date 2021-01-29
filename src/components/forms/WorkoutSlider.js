import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const WorkoutSlider = (props) => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    //   console.log('newValue : ' + newValue);
     // props.onDataChanged(props.name.toLowerCase(), newValue);
    };
    return (
    <React.Fragment>
        <Typography id="discrete-slider" gutterBottom>
            { props.name }
        </Typography>        
        <Slider
            value={value}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={props.step}
            marks
            min={0}
            max={ props.max }
            name={ props.name }
            onChange={handleChange}
           // onChangeCommitted={setThatBitch}
            style={{marginBottom: '20px'}}
        />
    </React.Fragment>
    )
}

export default WorkoutSlider;
