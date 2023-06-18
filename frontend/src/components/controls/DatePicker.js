import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFrnsUtils from '@date-io/date-fns';

const convertToDefaultParameter = (name, value) => ({
    target: {
        name, value
    }
});

function DatePicker(props) {
    const { variant, inputVariant, formate, name, label, value, onChange } = props;
    return (
        <MuiPickersUtilsProvider utils={DateFrnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant={variant || "inline"}
                inputVariant={inputVariant || "outlined"}
                label={label}
                formate={formate}
                name={name}
                value={value}
                onChange={date => onChange(convertToDefaultParameter(name, date))}
            />
        </MuiPickersUtilsProvider>
    )
}

export default DatePicker
