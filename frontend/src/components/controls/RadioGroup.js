import React from 'react';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup as MuiRadioGroup } from '@material-ui/core';

function RadioGroup(props) {
    const styles = {
        flexDirection: 'row',
        justifyContent: 'space-between',
    };

    const { name, label, value, onChange, items, error } = props;
    return (
        <FormControl
            {...(error && { error: true })}
        >
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row={true} style={styles}
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map((item, index) => (
                        <FormControlLabel key={item.id} value={item.value} control={<Radio />} label={item.value} />
                    ))

                }
            </MuiRadioGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default RadioGroup
