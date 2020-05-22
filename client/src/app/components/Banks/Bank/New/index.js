import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import mutation from '../../gqlQueries/create';
import query from '../../gqlQueries/list';
import { showCreateButton } from '../../../../actions/ui/crud/createButton';
import { hideCreateForm } from '../../../../actions/ui/crud/createForm';

const New = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm();
  const [mutate] = useMutation(mutation);

  const cancelCreation = () => {
    dispatch(showCreateButton('bank'));
    dispatch(hideCreateForm('bank'));
  };

  const onSubmit = formObject => {
    mutate({
      variables: { label: formObject.label },
      refetchQueries: [{ query }],
    }).then(() => {
      cancelCreation();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField name="label" type="text" error={!!errors.label} label="Label" inputRef={register} helperText={errors.label ? errors.label.message : ''} fullWidth />
      <Button type="submit" color="primary">
        Ok
      </Button>
      <Button onClick={cancelCreation}>Cancel</Button>
    </form>
  );
};

export default New;
