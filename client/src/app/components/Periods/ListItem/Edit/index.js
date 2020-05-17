import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import mutation from '../../gqlQueries/update';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import TextField from '../../../common/TextField';
import query from '../../gqlQueries/list';
import { toggleEditForm as toggleEditFormAction } from '../../../../actions/ui/crud/updateForm';


class Edit extends Component {

  onSubmit(formObject, dispatch, props) {
    props.mutate({
      variables:  {
        year: parseInt(formObject.year),
        month: parseInt(formObject.month),
        id: props.period.id },
      refetchQueries: [ { query } ]
    }).then(() => {
      props.cancel();
    });
  }

  render() {
    const { handleSubmit, cancel } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="month" component={TextField} floatingLabelText="Mois" />
        <Field name="year" component={TextField} floatingLabelText="Année" />
        <Button type="submit" primary={true} label={'Ok'} />
        <Button primary={false} label={'Cancel'} onClick={cancel} />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    cancel: () => {
      dispatch(toggleEditFormAction('period', ownProps.period.id));
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      year: ownProps.period.year,
      month: ownProps.period.month,
    },
    form: `period${ownProps.period.id}`,
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(Edit)));
