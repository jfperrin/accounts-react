import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-apollo';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import mutation from '../../gqlQueries/update';
import query from '../../gqlQueries/list';
import { toggleEditForm } from '../../../../actions/ui/crud/updateForm';

const Edit = ({ period }) => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);

  const onSubmit = formObject => {
    mutate({
      variables: {
        year: parseInt(formObject.year, 10),
        month: parseInt(formObject.month, 10),
        id: period.id,
      },
      refetchQueries: [{ query }],
    }).then(() => {
      dispatch(toggleEditForm('period', period.id));
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 15 }}>
      <TextField
        name="month"
        style={{ marginBottom: 15 }}
        type="number"
        defaultValue={period.month}
        error={!!errors.month}
        label="Mois"
        inputRef={register}
        helperText={errors.month ? errors.month.message : ''}
        fullWidth
      />
      <TextField
        name="year"
        type="number"
        style={{ marginBottom: 15 }}
        defaultValue={period.year}
        error={!!errors.year}
        label="Année"
        inputRef={register}
        helperText={errors.year ? errors.year.message : ''}
        fullWidth
      />
      <div style={{ textAlign: 'right' }}>
        <Button onClick={() => dispatch(toggleEditForm('period', period.id))}>Cancel</Button>
        <Button type="submit" color="primary">
          Ok
        </Button>
      </div>
    </form>
  );
};

export default Edit;
