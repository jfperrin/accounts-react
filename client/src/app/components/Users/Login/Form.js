import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import mutation from '../gqlQueries/login';
import query from '../gqlQueries/currentUser';
import { getLoginErrors } from '../../../selectors/ui';
import { updateLoginErrors } from '../../../actions/ui/login/errors';
import client from '../../../../apolloClient';
import './stylesheet.css';

const Login = ({ history }) => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const [loginMutate] = useMutation(mutation);
  const { data } = useQuery(query);
  const loginErrors = useSelector(getLoginErrors);

  useLayoutEffect(() => {
    if (data && data.user) {
      history.push('/');
    }
  }, [data, history]);

  if (!data) return null;

  const onSubmit = data => {
    client.resetStore();

    loginMutate({
      variables: {
        email: data.email,
        password: data.password,
      },
      refetchQueries: [{ query }],
    })
      .then(() => {
        history.push('/');
      })
      .catch(res => {
        dispatch(updateLoginErrors(res.graphQLErrors.map(error => error.message)));
      });
  };

  return (
    <div className={'login-container'}>
      <div className={'login'}>
        <div className={'title'}>Identification requise</div>
        <form onSubmit={handleSubmit(onSubmit)} className="col s6">
          <div className="input-field">
            <TextField name="email" error={!!errors.email} label="Email" inputRef={register} helperText={errors.email ? errors.email.message : ''} type="text" fullWidth />
          </div>
          <div className="input-field">
            <TextField name="password" error={!!errors.password} label="Password" inputRef={register} helperText={errors.password ? errors.password.message : ''} type="password" fullWidth />
          </div>
          <div className="errors">{loginErrors}</div>
          <div className="actions">
            <Button type="submit" color="primary">
              Ok
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
