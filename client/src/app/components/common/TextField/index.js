import React from 'react';
import TextField from '@material-ui/core/TextField';

const CustomTextField = ({ input, label, meta: { touched, error }, ...custom }) => <TextField label={label} fullWidth error={touched && error} {...input} {...custom} />;

export default CustomTextField;
