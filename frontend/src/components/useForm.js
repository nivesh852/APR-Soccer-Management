import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

export function useForm(initialFValues, isValidationRequired = true, validateOnChange = false, validate) {
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value

        });

        if (isValidationRequired && validateOnChange) {
            validate({ [name]: value });
        }
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '0.3rem',
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1),
        }
    }
}))


export function Form(props) {
    const classes = useStyles();

    const { children, autoComplete, ...other } = props;
    return (
        <form className={classes.root} autoComplete={autoComplete} {...other}>
            {props.children}
        </form>
    )
}
