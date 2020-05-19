import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Field, reduxForm } from 'redux-form';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '../../../common/TextField';
import mutation from '../../gqlQueries/update';
import { toggleEditForm as toggleEditFormAction } from '../../../../actions/ui/crud/updateForm';

class Edit extends Component {
  onSubmit(formObject, dispatch, props) {
    props
      .mutate({
        variables: { amount: formObject.amount, id: props.balance.id },
      })
      .then(() => {
        props.refetch();
        props.cancel();
      });
  }

  render() {
    const { handleSubmit, cancel, balance } = this.props;

    return (
      <form className="balance balance-form" onSubmit={handleSubmit(this.onSubmit)}>
        <div className="label">{balance.bank.label}</div>
        <div className="amount">
          <Field name="amount" component={TextField} />
        </div>
        <div className="actions">
          <IconButton type="submit">
            <DoneIcon />
          </IconButton>
          <IconButton onClick={cancel}>
            <CancelIcon />
          </IconButton>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    cancel: () => {
      dispatch(toggleEditFormAction('balance', ownProps.balance.id));
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      amount: ownProps.balance.amount,
    },
    form: `balance${ownProps.balance.id}`,
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(Edit)));
