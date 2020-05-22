import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CustomDatePicker from '../../../common/DatePicker';
import mutation from '../../../Periods/gqlQueries/createOperation';
import { showCreateButton } from '../../../../actions/ui/crud/createButton';
import { hideCreateForm } from '../../../../actions/ui/crud/createForm';

const New = ({ id }) => {
  const { handleSubmit, register, errors } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);

  const cancelCreation = () => {
    dispatch(showCreateButton('operation'));
    dispatch(hideCreateForm('operation'));
  };

  const onSubmit = formObject => {
    mutate({
      variables: {
        label: formObject.label,
        dt: selectedDate,
        amount: parseFloat(formObject.amount),
        periodId: id,
      },
    }).then(() => {
      cancelCreation();
    });
  };

  return (
    <form className="operation operation-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="dt">
        <CustomDatePicker label="Date" name="dt" id="dt" value={selectedDate} onChange={setSelectedDate} />
      </div>
      <div className="label">
        <TextField name="label" type="text" error={!!errors.label} label="Label" inputRef={register} helperText={errors.label ? errors.label.message : ''} fullWidth />
      </div>
      <div className="amount">
        <TextField name="amount" type="text" error={!!errors.amount} label="Montant" inputRef={register} helperText={errors.label ? errors.label.amount : ''} fullWidth />
      </div>
      <div className="actions">
        <div style={{ flex: 1 }} />
        <IconButton type="submit" style={{ width: '40px' }}>
          <DoneIcon />
        </IconButton>
        <IconButton onClick={cancelCreation} style={{ width: '40px', marginRight: '15px' }}>
          <CancelIcon />
        </IconButton>
      </div>
    </form>
  );
};

export default New;
