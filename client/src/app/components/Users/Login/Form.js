import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import { graphql } from 'react-apollo';
import { withRouter } from "react-router-dom";
import TextField from '../../common/TextField';
import mutation from '../gqlQueries/login';
import query from '../gqlQueries/currentUser';
import { getLoginErrors as getLoginErrorsSelector } from '../../../selectors/ui';
import { updateLoginErrors as updateLoginErrorsAction } from '../../../actions/ui/login/errors'
import './stylesheet.css';
import client from '../../../../apolloClient';

class LoginForm extends Component {

  componentDidUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push('/');
    }
  }

  onSubmit(formObject, dispatch, props) {
    client.resetStore();
    props.mutate({
      variables: {
        email: formObject.email,
        password: formObject.password
      },
      refetchQueries: [{ query }]
    }).catch(res => {
      dispatch(props.updateLoginErrors(res.graphQLErrors.map(error => error.message)));
    });
  }

  render() {
    const { handleSubmit, errors } = this.props;

    return (
      <div className={'login-container'}>
        <div className={'login'}>
          <div className={'title'}>
            Identification requise
          </div>
          <form onSubmit={handleSubmit(this.onSubmit)} className="col s6">
            <div className="input-field">
              <Field name="email" component={TextField} floatingLabelText="Email" />
            </div>
            <div className="input-field">
              <Field type="password" name="password" component={TextField} floatingLabelText="Password" />
            </div>
            <div className="errors">
              {errors}
            </div>
            <div className="actions">
              <Button type="submit" primary={true} label={'Ok'} />
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
    updateLoginErrors: (errors) => {
      dispatch(updateLoginErrorsAction(errors));
    },
  };
}


export default withRouter(graphql(query)(graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(LoginForm)))));
