import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import query from '../../gqlQueries/list';
import mutation from '../../gqlQueries/create';
import { showCreateButton as showCreateButtonAction } from '../../../../actions/ui/crud/createButton';
import { hideCreateForm as hideCreateButtonAction } from '../../../../actions/ui/crud/createForm';

class New extends Component {
  onSubmit(formObject, dispatch, props) {
    props.mutate({
      variables: {
        label: formObject.label,
        amount: formObject.amount,
        day: formObject.day,
      },
      refetchQueries: [ { query } ]
    }).then(() => {
      props.cancelCreation();
    });
  }

  render() {
    const { handleSubmit, cancelCreation } = this.props;

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
          <Button primary={false} label={'Cancel'} onClick={cancelCreation} />
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cancelCreation: () => {
      dispatch(showCreateButtonAction('recurrentOperation'));
      dispatch(hideCreateButtonAction('recurrentOperation'));
    },
  };
}

function mapStateToProps() {
  return {
    form: 'newRecurrentOperation'
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(New)));
