import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const DurationSlider = (props) => {
    const [value, setValue] = React.useState();
    const handleChange = (event, newValue) => {
      setValue(newValue);
      props.onDataChanged(value);
    };
    return (
    <React.Fragment>
        <Typography id="discrete-slider" gutterBottom>
             Duration
        </Typography>        
        <Slider
            value={value}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={5}
            marks
            min={0}
            max={300}
            name="duration"
            onChange={handleChange}
            style={{marginBottom: '20px'}}
        />
    </React.Fragment>
    )
}

export default DurationSlider;
