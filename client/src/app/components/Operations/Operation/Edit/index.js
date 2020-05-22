import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-apollo';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import query from '../../../Periods/gqlQueries/get';
import mutation from '../../gqlQueries/update';
import CustomDatePicker from '../../../common/DatePicker';
import { toggleEditForm as toggleEditFormAction } from '../../../../actions/ui/crud/updateForm';

const Edit = ({ idPeriod, operation }) => {
  const { handleSubmit, register, errors } = useForm();
  const [selectedDate, setSelectedDate] = useState(operation.dt);
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);

  const onSubmit = formObject => {
    mutate({
      variables: {
        label: formObject.label,
        dt: selectedDate,
        amount: parseFloat(formObject.amount),
        id: operation.id,
      },
      refetchQueries: [
        {
          query,
          variables: { id: idPeriod },
        },
      ],
    }).then(() => {
      dispatch(toggleEditFormAction('operation', operation.id));
    });
  };

  return (
    <form className="operation operation-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="dt">
        <CustomDatePicker label="Date" name="dt" id="dt" value={selectedDate} onChange={setSelectedDate} />
      </div>
      <div className="label">
        <TextField name="label" type="text" defaultValue={operation.label} error={!!errors.label} label="Label" inputRef={register} helperText={errors.label ? errors.label.message : ''} fullWidth />
      </div>
      <div className="amount">
        <TextField
          name="amount"
          type="text"
          defaultValue={operation.amount}
          error={!!errors.amount}
          label="Montant"
          inputRef={register}
          helperText={errors.label ? errors.label.amount : ''}
          fullWidth
        />
      </div>
      <div className="actions">
        <IconButton type="submit">
          <DoneIcon />
        </IconButton>
        <IconButton onClick={() => dispatch(toggleEditFormAction('operation', operation.id))}>
          <CancelIcon />
        </IconButton>
      </div>
    </form>
  );
};

export default Edit;
