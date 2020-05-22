import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-apollo';
import { useForm } from 'react-hook-form';
import { TextField, IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import mutation from '../../gqlQueries/update';
import { toggleEditForm } from '../../../../actions/ui/crud/updateForm';
import query from '../../gqlQueries/list';

const Edit = ({ bank }) => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);

  const onSubmit = formObject => {
    mutate({
      variables: { label: formObject.label, id: bank.id },
      refetchQueries: [{ query }],
    }).then(() => {
      dispatch(toggleEditForm('bank', bank.id));
    });
  };

  return (
    <form className="bank bank-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField name="label" type="text" defaultValue={bank.label} error={!!errors.label} label="Label" inputRef={register} helperText={errors.label ? errors.label.message : ''} fullWidth />
      <div className="actions">
        <IconButton type="submit">
          <DoneIcon />
        </IconButton>
        <IconButton onClick={() => dispatch(toggleEditForm('bank', bank.id))}>
          <CancelIcon />
        </IconButton>
      </div>
    </form>
  );
};

export default Edit;
