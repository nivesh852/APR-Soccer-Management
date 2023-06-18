import React from 'react';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

const convertToDefaultParameter = (name, value) => ({
    target: {
        name, value
    }
});

function CheckBox(props) {
    const { name, label, value, onChange } = props;
    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefaultParameter(name, e.target.checked))}
                />} label={label}></FormControlLabel>
        </FormControl>
    )
}

export default CheckBox
