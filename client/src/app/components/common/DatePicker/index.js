import { DatePicker, LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React, { memo } from 'react';
import { fr } from 'date-fns/locale';
import { TextField } from '@material-ui/core';

const CustomDatePicker = ({ id, name, label, onChange, value }) => {
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils} locale={fr}>
      <DatePicker autoOk id={id} name={name} label={label} format="DD/MM/YYYY" value={value} onChange={onChange} renderInput={p => <TextField {...p} />} />
    </LocalizationProvider>
  );
};

export default memo(CustomDatePicker);
