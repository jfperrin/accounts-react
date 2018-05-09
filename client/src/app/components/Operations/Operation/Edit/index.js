import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import query from '../../../Periods/gqlQueries/get';
import mutation from '../../gqlQueries/update';
import { Field, reduxForm } from 'redux-form';
import DoneIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import IconButton from 'material-ui/IconButton';
import { TextField, DatePicker } from 'redux-form-material-ui';
import { toggleEditForm as toggleEditFormAction } from '../../../../actions/ui/crud/updateForm';

class Edit extends Component {

  onSubmit(formObject, dispatch, props) {
    props.mutate({
      variables:  {
        label: formObject.label,
        dt: formObject.dt,
        amount: formObject.amount,
        id: props.operation.id
      },
      refetchQueries: [
        {
          query,
          variables: {
            id: props.idPeriod
          },
        },
      ]
    }).then(() => {
      props.cancel();
    });
  }

  render() {
    const { handleSubmit, cancel } = this.props;

    return (
      <form className="operation operation-form" onSubmit={handleSubmit(this.onSubmit)}>
        <div className="dt">
          <Field name="dt" component={DatePicker} fullWidth={true} />
        </div>
        <div className="label">
          <Field name="label" component={TextField} fullWidth={true} />
        </div>
        <div className="amount">
          <Field name="amount" component={TextField} fullWidth={true} />
        </div>
        <div className="actions">
          <IconButton type="submit"><DoneIcon /></IconButton>
          <IconButton onClick={cancel}><CancelIcon /></IconButton>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    cancel: () => {
      dispatch(toggleEditFormAction('operation', ownProps.operation.id));
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      label: ownProps.operation.label,
      amount: ownProps.operation.amount,
      dt: new Date(ownProps.operation.dt),
    },
    form: `operation${ownProps.operation.id}`,
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(Edit)));
