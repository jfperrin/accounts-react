import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../../gqlQueries/create';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { TextField } from 'redux-form-material-ui';
import query from '../../gqlQueries/list';
import { showCreateButton as showCreateButtonAction } from '../../../../actions/ui/crud/createButton';
import { hideCreateForm as hideCreateButtonAction } from '../../../../actions/ui/crud/createForm';

class New extends Component {
  onSubmit(formObject, dispatch, props) {
    props.mutate({
      variables: { label: formObject.label },
      refetchQueries: [ { query } ]
    }).then(() => {
      props.cancelCreation();
    });
  }

  render() {
    const { handleSubmit, cancelCreation } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="label" component={TextField} floatingLabelText="Label" />
        <Button type="submit" primary={true} label={'Ok'} />
        <Button primary={false} label={'Cancel'} onClick={cancelCreation} />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cancelCreation: () => {
      dispatch(showCreateButtonAction('bank'));
      dispatch(hideCreateButtonAction('bank'));
    },
  };
}

function mapStateToProps() {
  return {
    form: 'newBank'
  };
}

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(reduxForm()(New)));
