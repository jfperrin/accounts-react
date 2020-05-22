import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-apollo';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import mutation from '../gqlQueries/signup';
import query from '../gqlQueries/currentUser';
import { getLoginErrors } from '../../../selectors/ui';
import { updateLoginErrors } from '../../../actions/ui/login/errors';
import './stylesheet.css';

const SignupForm = ({ history }) => {
  const dispatch = useDispatch();
  const { data, loading } = useQuery(query);
  const [mutate] = useMutation(mutation);
  const errors = useSelector(getLoginErrors);
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    if (!loading && data.user) {
      history.push('/');
    }
  }, []);

  const onSubmit = formObject => {
    mutate({
      variables: {
        email: formObject.email,
        password: formObject.password,
        firstname: formObject.firstname,
        lastname: formObject.lastname,
        nickname: formObject.nickname,
      },
      refetchQueries: [{ query }],
    }).catch(res => {
      dispatch(updateLoginErrors(res.graphQLErrors.map(error => error.message)));
    });
  };

  if (loading) return <div>Loading ....</div>;

  return (
    <div className={'signup-container'}>
      <div className={'signup'}>
        <div className={'title'}>Inscription</div>
        <form onSubmit={handleSubmit(onSubmit)} className="col s6">
          <div className="input-field">
            <TextField name="email" type="email" label="Email" inputRef={register} />
          </div>
          <div className="input-field">
            <TextField name="password" type="password" label="Mot de passe" inputRef={register} />
          </div>
          <div className="input-field">
            <TextField name="firstname" label="Prénom" inputRef={register} />
          </div>
          <div className="input-field">
            <TextField name="lastname" label="Nom de famille" inputRef={register} />
          </div>
          <div className="input-field">
            <TextField name="nickname" label="Surnom" inputRef={register} />
          </div>
          <div className="errors">{errors}</div>
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

export default withRouter(SignupForm);
