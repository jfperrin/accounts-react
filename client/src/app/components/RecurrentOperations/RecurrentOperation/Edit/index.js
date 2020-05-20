import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import mutation from '../../gqlQueries/update';
import TextField from '../../../common/TextField';
import query from '../../gqlQueries/list';
import { toggleEditForm as toggleEditFormAction } from '../../../../actions/ui/crud/updateForm';

class Edit extends Component {
  onSubmit(formObject, dispatch, props) {
    props
      .mutate({
        variables: {
          label: formObject.label,
          amount: parseFloat(formObject.amount),
          day: parseInt(formObject.day, 10),
          id: props.recurrentOperation.id,
        },
        refetchQueries: [{ query }],
      })
      .then(() => {
        props.cancel();
      });
  }

  render() {
    const { handleSubmit, cancel } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div
          style={{
            display: 'flex',
            marginBottom: 25,
          }}
        >
          <div
            style={{
              margin: 'auto 10px',
              paddingTop: 5,
            }}
          >
            <Field name="day" component={TextField} label="Jours" />
          </div>
          <div
            style={{
              flex: 1,
              fontWeight: 'bold',
              paddingTop: '5px',
            }}
          >
            <Field name="label" component={TextField} label="Label" />
          </div>
          <div
            style={{
              margin: 'auto 10px',
              paddingTop: '5px',
            }}
          >
            <Field name="amount" component={TextField} label="Montant" />
          </div>
        </div>
        <Button type="submit" color="primary">
          Ok
        </Button>
        <Button onClick={cancel}>Cancel</Button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    cancel: () => {
      dispatch(toggleEditFormAction('recurrentOperation', ownProps.recurrentOperation.id));
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      day: ownProps.recurrentOperation.day,
      label: ownProps.recurrentOperation.label,
      amount: ownProps.recurrentOperation.amount,
    },
    form: `recurrentOperation${ownProps.recurrentOperation.id}`,
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(Edit)));
