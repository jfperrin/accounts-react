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
        <div style={{ display: 'flex', marginBottom: '25px' }}>
          <div style={{ margin: 'auto 10px', paddingTop: '5px' }}>
            <Field name="day" component={TextField} floatingLabelText="Jours" />
          </div>
          <div style={{ flex: 1, fontWeight: 'bold', paddingTop: '5px' }}>
            <Field name="label" component={TextField} floatingLabelText="Label" />
          </div>
          <div style={{ margin: 'auto 10px', paddingTop: '5px' }}>
            <Field name="amount" component={TextField} floatingLabelText="Montant" />
          </div>
        </div>
        <div style={{ float: 'right' }}>
          <Button type="submit" primary label={'Ok'} />
          <Button primary={false} label={'Cancel'} onClick={cancel} />
        </div>
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
