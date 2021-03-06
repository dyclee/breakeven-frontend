import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const InputField = ({id, type, placeholder, value, onChange, required}) => {
    return (
        <TextField
            autoFocus
            id={id}
            label={id}
            variant="filled"
            color="secondary"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
      />
    )
}

export default InputField;
