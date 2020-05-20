import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import TextField from '../../../common/TextField';
import query from '../../gqlQueries/list';
import mutation from '../../gqlQueries/create';
import { showCreateButton as showCreateButtonAction } from '../../../../actions/ui/crud/createButton';
import { hideCreateForm as hideCreateButtonAction } from '../../../../actions/ui/crud/createForm';

class New extends Component {
  onSubmit(formObject, dispatch, props) {
    props
      .mutate({
        variables: {
          year: parseInt(formObject.year, 10),
          month: parseInt(formObject.month, 10),
        },
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
        <Field name="month" component={TextField} label="Mois" />
        <Field name="year" component={TextField} label="Année" />
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
      dispatch(showCreateButtonAction('period'));
      dispatch(hideCreateButtonAction('period'));
    },
  };
}

function mapStateToProps() {
  return {
    form: 'newPeriod',
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(New)));
