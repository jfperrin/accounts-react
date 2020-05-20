import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
// eslint-disable-next-line import/no-extraneous-dependencies
import frLocale from 'date-fns/locale/fr';
import { TextField } from '@material-ui/core';
import { DatePicker, LocalizationProvider } from '@material-ui/pickers';

const CustomDatePicker = props => {
  const { input } = props;
  const [selectedDate, setSelectedDate] = useState(input.value);

  const handleDateChange = date => {
    setSelectedDate(date);
    if (Date.parse(date)) {
      input.onChange(date.toISOString());
    } else {
      input.onChange(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils} locale={frLocale}>
      <DatePicker value={selectedDate} onChange={handleDateChange} renderInput={props => <TextField {...props} />} />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
