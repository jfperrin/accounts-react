import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-apollo';
import { FormControl, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import query from '../../gqlQueries/list';
import mutation from '../../gqlQueries/create';
import { showCreateButton } from '../../../../actions/ui/crud/createButton';
import { hideCreateForm } from '../../../../actions/ui/crud/createForm';

const New = () => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);

  const cancelCreation = () => {
    dispatch(showCreateButton('period'));
    dispatch(hideCreateForm('period'));
  };

  const onSubmit = formObject => {
    mutate({
      variables: {
        year: parseInt(formObject.year, 10),
        month: parseInt(formObject.month, 10),
      },
      refetchQueries: [{ query }],
    }).then(() => {
      cancelCreation();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <TextField name="month" type="number" error={!!errors.month} label="Mois" inputRef={register} helperText={errors.month ? errors.month.message : ''} />
        <TextField name="year" type="number" error={!!errors.year} label="Année" inputRef={register} helperText={errors.year ? errors.year.message : ''} />
      </FormControl>
      <div style={{ marginTop: 15 }}>
        <Button type="submit" color="primary">
          Ok
        </Button>
        <Button onClick={cancelCreation}>Cancel</Button>
      </div>
    </form>
  );
};

export default New;
