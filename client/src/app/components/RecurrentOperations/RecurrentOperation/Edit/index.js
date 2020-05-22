import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-apollo';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import mutation from '../../gqlQueries/update';
import query from '../../gqlQueries/list';
import { toggleEditForm as toggleEditFormAction } from '../../../../actions/ui/crud/updateForm';

const Edit = ({ recurrentOperation }) => {
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = formObject => {
    mutate({
      variables: {
        label: formObject.label,
        amount: parseFloat(formObject.amount),
        day: parseInt(formObject.day, 10),
        id: recurrentOperation.id,
      },
      refetchQueries: [{ query }],
    }).then(() => {
      dispatch(toggleEditFormAction('recurrentOperation', recurrentOperation.id));
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 15 }}>
      <div
        style={{
          display: 'flex',
          marginBottom: 15,
        }}
      >
        <div
          style={{
            margin: 'auto 10px',
            paddingTop: 5,
          }}
        >
          <TextField
            name="day"
            type="number"
            defaultValue={recurrentOperation.day}
            error={!!errors.day}
            label="Jours"
            inputRef={register}
            helperText={errors.day ? errors.day.message : ''}
            fullWidth
          />
        </div>
        <div
          style={{
            flex: 1,
            fontWeight: 'bold',
            paddingTop: '5px',
          }}
        >
          <TextField name="label" defaultValue={recurrentOperation.label} error={!!errors.label} label="Label" inputRef={register} helperText={errors.label ? errors.label.message : ''} fullWidth />
        </div>
        <div
          style={{
            margin: 'auto 10px',
            paddingTop: '5px',
          }}
        >
          <TextField
            name="amount"
            type="number"
            defaultValue={recurrentOperation.amount}
            error={!!errors.label}
            label="Montant"
            inputRef={register}
            helperText={errors.amount ? errors.amount.message : ''}
            fullWidth
          />
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={() => dispatch(toggleEditFormAction('recurrentOperation', recurrentOperation.id))}>Cancel</Button>
        <Button type="submit" color="primary">
          Ok
        </Button>
      </div>
    </form>
  );
};

export default Edit;
