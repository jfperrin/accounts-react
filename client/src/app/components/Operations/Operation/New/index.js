import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../../../Periods/gqlQueries/createOperation';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import TextField from '../../../common/TextField';
import DatePicker from '../../../common/DatePicker';
import { showCreateButton as showCreateButtonAction } from '../../../../actions/ui/crud/createButton';
import { hideCreateForm as hideCreateButtonAction } from '../../../../actions/ui/crud/createForm';

class New extends Component {
  onSubmit(formObject, dispatch, props) {
    props.mutate({
      variables: {
        label: formObject.label,
        dt: formObject.dt,
        amount: parseFloat(formObject.amount),
        periodId: props.id
      }
    }).then(() => {
      props.cancelCreation();
    });
  }

  render() {
    const { handleSubmit, cancelCreation } = this.props;

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
          <div style={{ flex: 1 }} />
          <IconButton type="submit" style={{ width: '40px' }}><DoneIcon /></IconButton>
          <IconButton onClick={cancelCreation} style={{ width: '40px', marginRight: '15px' }}><CancelIcon /></IconButton>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cancelCreation: () => {
      dispatch(showCreateButtonAction('operation'));
      dispatch(hideCreateButtonAction('operation'));
    },
  };
}

function mapStateToProps() {
  return {
    initialValues: {
      dt: new Date(),
    },
    form: 'newOperation'
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(New)));
