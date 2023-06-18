import React from 'react';
import { Button as MuiButton } from '@material-ui/core';

function Button(props) {
    const { variant, text, size, color, onClick, type } = props;

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size}
            color={color}
            onClick={onClick}
            type={type || "submit"}
        >
            {text}
        </MuiButton>
    )
}

export default Button;
