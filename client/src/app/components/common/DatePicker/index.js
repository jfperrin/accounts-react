import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = ({ input, label, meta: { touched, error }, ...custom }) => (
  <KeyboardDatePicker disableToolbar variant="inline" label={label} format="dd/MM/yyyy" errorText={touched && error} {...input} {...custom} />
);

export default DatePicker;
