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
          label: formObject.label,
          amount: parseFloat(formObject.amount),
          day: parseInt(formObject.day, 10),
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
        <div style={{ display: 'flex', marginBottom: '25px' }}>
          <div style={{ margin: 'auto 10px', paddingTop: '5px' }}>
            <Field name="day" component={TextField} label="Jours" />
          </div>
          <div style={{ flex: 1, fontWeight: 'bold', paddingTop: '5px' }}>
            <Field name="label" component={TextField} label="Label" />
          </div>
          <div style={{ margin: 'auto 10px', paddingTop: '5px' }}>
            <Field name="amount" component={TextField} label="Montant" />
          </div>
        </div>
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
      dispatch(showCreateButtonAction('recurrentOperation'));
      dispatch(hideCreateButtonAction('recurrentOperation'));
    },
  };
}

function mapStateToProps() {
  return {
    form: 'newRecurrentOperation',
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(New)));
