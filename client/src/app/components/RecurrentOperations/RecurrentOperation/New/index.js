import React from 'react';
import { useMutation } from 'react-apollo';
import { TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import query from '../../gqlQueries/list';
import mutation from '../../gqlQueries/create';
import { showCreateButton } from '../../../../actions/ui/crud/createButton';
import { hideCreateForm } from '../../../../actions/ui/crud/createForm';

const New = () => {
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);
  const { handleSubmit, register, errors } = useForm();

  const cancelCreation = () => {
    dispatch(showCreateButton('recurrentOperation'));
    dispatch(hideCreateForm('recurrentOperation'));
  };

  const onSubmit = formObject => {
    mutate({
      variables: {
        label: formObject.label,
        amount: parseFloat(formObject.amount),
        day: parseInt(formObject.day, 10),
      },
      refetchQueries: [{ query }],
    }).then(() => {
      cancelCreation();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 15 }}>
      <div style={{ display: 'flex', marginBottom: 15 }}>
        <div style={{ margin: 'auto 10px', paddingTop: '5px' }}>
          <TextField type="number" name="day" error={!!errors.day} label="Jours" inputRef={register} helperText={errors.day ? errors.day.message : ''} fullWidth />
        </div>
        <div style={{ flex: 1, fontWeight: 'bold', paddingTop: '5px' }}>
          <TextField name="label" error={!!errors.label} label="Label" inputRef={register} helperText={errors.label ? errors.label.message : ''} fullWidth />
        </div>
        <div style={{ margin: 'auto 10px', paddingTop: '5px' }}>
          <TextField type="number" name="amount" error={!!errors.amount} label="Montant" inputRef={register} helperText={errors.amount ? errors.amount.message : ''} fullWidth />
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={cancelCreation}>Cancel</Button>
        <Button type="submit" color="primary">
          Ok
        </Button>
      </div>
    </form>
  );
};

export default New;
