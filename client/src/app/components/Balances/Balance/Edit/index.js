import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-apollo';
import { useForm } from 'react-hook-form';
import { TextField, IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import mutation from '../../gqlQueries/update';
import { toggleEditForm } from '../../../../actions/ui/crud/updateForm';

const Edit = ({ balance, refetch }) => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);

  const onSubmit = formObject => {
    mutate({
      variables: { amount: formObject.amount, id: balance.id },
    }).then(() => {
      refetch();
      dispatch(toggleEditForm('balance', balance.id));
    });
  };

  return (
    <form className="balance balance-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="label">{balance.bank.label}</div>
      <div className="amount">
        <TextField
          name="amount"
          type="number"
          defaultValue={balance.amount}
          error={!!errors.amount}
          label="Montant"
          inputRef={register}
          helperText={errors.amount ? errors.amount.message : ''}
          fullWidth
        />
      </div>
      <div className="actions">
        <IconButton type="submit">
          <DoneIcon />
        </IconButton>
        <IconButton onClick={() => dispatch(toggleEditForm('balance', balance.id))}>
          <CancelIcon />
        </IconButton>
      </div>
    </form>
  );
};

export default Edit;
