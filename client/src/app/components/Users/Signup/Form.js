import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '../../common/TextField';
import mutation from '../gqlQueries/signup';
import query from '../gqlQueries/currentUser';
import { getLoginErrors as getLoginErrorsSelector } from '../../../selectors/ui';
import { updateLoginErrors as updateLoginErrorsAction } from '../../../actions/ui/login/errors';
import './stylesheet.css';

class SignupForm extends Component {
  componentDidUpdate(nextProps) {
    const { history, data } = this.props;

    if (nextProps.data.user && !data.user) {
      history.push('/');
    }
  }

  onSubmit(formObject, dispatch, props) {
    props
      .mutate({
        variables: {
          email: formObject.email,
          password: formObject.password,
          firstname: formObject.firstname,
          lastname: formObject.lastname,
          nickname: formObject.nickname,
        },
        refetchQueries: [{ query }],
      })
      .catch(res => {
        dispatch(props.updateLoginErrors(res.graphQLErrors.map(error => error.message)));
      });
  }

  render() {
    const { handleSubmit, errors } = this.props;

    return (
      <div className={'signup-container'}>
        <div className={'signup'}>
          <div className={'title'}>Inscription</div>
          <form onSubmit={handleSubmit(this.onSubmit)} className="col s6">
            <div className="input-field">
              <Field name="email" component={TextField} label="Email" />
            </div>
            <div className="input-field">
              <Field type="password" name="password" component={TextField} label="Mot de passe" />
            </div>
            <div className="input-field">
              <Field name="firstname" component={TextField} label="Prénom" />
            </div>
            <div className="input-field">
              <Field name="lastname" component={TextField} label="Nom de famille" />
            </div>
            <div className="input-field">
              <Field name="nickname" component={TextField} label="Surnom" />
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
  }
}

function mapStateToProps(state) {
  return {
    form: 'login',
    errors: getLoginErrorsSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLoginErrors: errors => {
      dispatch(updateLoginErrorsAction(errors));
    },
  };
}

export default withRouter(graphql(query)(graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(SignupForm)))));
