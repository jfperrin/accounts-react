import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import mutation from '../../gqlQueries/create';
import TextField from '../../../common/TextField';
import query from '../../gqlQueries/list';
import { showCreateButton as showCreateButtonAction } from '../../../../actions/ui/crud/createButton';
import { hideCreateForm as hideCreateButtonAction } from '../../../../actions/ui/crud/createForm';

class New extends Component {
  onSubmit(formObject, dispatch, props) {
    props
      .mutate({
        variables: { label: formObject.label },
        refetchQueries: [{ query }],
      })
      .then(() => {
        props.cancelCreation();
      });
  }

  render() {
    const { handleSubmit, cancelCreation } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="label" component={TextField} label="Label" />
        <Button type="submit" color="primary">
          Ok
        </Button>
        <Button onClick={cancelCreation}>Cancel</Button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cancelCreation: () => {
      dispatch(showCreateButtonAction('bank'));
      dispatch(hideCreateButtonAction('bank'));
    },
  };
}

function mapStateToProps() {
  return {
    form: 'newBank',
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(New)));
