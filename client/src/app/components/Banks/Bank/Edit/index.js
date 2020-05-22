import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-apollo';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
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
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 15 }}>
      <TextField
        name="label"
        style={{ marginBottom: 15 }}
        type="text"
        defaultValue={bank.label}
        error={!!errors.label}
        label="Label"
        inputRef={register}
        helperText={errors.label ? errors.label.message : ''}
        fullWidth
      />
      <div style={{ textAlign: 'right' }}>
        <Button onClick={() => dispatch(toggleEditForm('bank', bank.id))}>Cancel</Button>
        <Button type="submit" color="primary">
          Ok
        </Button>
      </div>
    </form>
  );
};

export default Edit;
