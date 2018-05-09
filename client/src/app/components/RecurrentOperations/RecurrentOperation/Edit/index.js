import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import mutation from '../../gqlQueries/update';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';
import query from '../../gqlQueries/list';
import { toggleEditForm as toggleEditFormAction } from '../../../../actions/ui/crud/updateForm';


class Edit extends Component {

  onSubmit(formObject, dispatch, props) {
    props.mutate({
      variables:  {
        label: formObject.label,
        amount: formObject.amount,
        day: formObject.day,
        id: props.recurrentOperation.id,
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
        <div style={{ display: 'flex', marginBottom: '25px' }}>
          <div style={{ margin: 'auto 10px', paddingTop: '5px' }}>
            <Field name="day" component={TextField} floatingLabelText="Jours" fullWidth={true} />
          </div>
          <div style={{ flex: 1, fontWeight: 'bold', paddingTop: '5px' }}>
            <Field name="label" component={TextField} floatingLabelText="Label" fullWidth={true} />
          </div>
          <div style={{ margin: 'auto 10px', paddingTop: '5px' }}>
            <Field name="amount" component={TextField} floatingLabelText="Montant" fullWidth={true} />
          </div>
        </div>
        <div style={{ float: 'right' }}>
          <Button type="submit" primary={true} label={'Ok'} />
          <Button primary={false} label={'Cancel'} onClick={cancel} />
        </div>
      </form>
    );
  }
};

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
