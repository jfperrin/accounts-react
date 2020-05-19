import React from 'react';
import MaterialUiTextField from '@material-ui/core/TextField';

const TextField = ({ input, label, meta: { touched, error }, ...custom }) => <MaterialUiTextField hintText={label} floatingLabelText={label} errorText={touched && error} {...input} {...custom} />;

export default TextField;
