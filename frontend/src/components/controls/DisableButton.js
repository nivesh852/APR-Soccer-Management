import React from 'react';
import { Button as MuiButton } from '@material-ui/core';

function DisableButton(props) {
    const { variant, text, size, color, onClick, type, disabled } = props;

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size}
            color={color}
            onClick={onClick}
            type={type || "submit"}
            disabled={disabled === undefined ? "false" : disabled}
        >
            {text}
        </MuiButton>
    )
}

export default DisableButton;