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
        label: formObject.label,
        id: props.bank.id
      },
      refetchQueries: [ { query } ]
    }).then(() => {
      props.cancel();
    });
  }

  render() {
    const { handleSubmit, cancel } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="label" component={TextField} floatingLabelText="Label" />
        <Button type="submit" primary={true} label={'Ok'} />
        <Button primary={false} label={'Cancel'} onClick={cancel} />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    cancel: () => {
      dispatch(toggleEditFormAction('bank', ownProps.bank.id));
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      label: ownProps.bank.label,
    },
    form: `bank${ownProps.bank.id}`,
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(Edit)));
