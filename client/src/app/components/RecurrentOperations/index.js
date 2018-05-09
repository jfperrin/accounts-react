import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import query from './gqlQueries/list'
import PlusOneIcon from 'material-ui/svg-icons/social/plus-one';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../actions/ui/layout/title'
import NewRecurrentOperation from './RecurrentOperation/New';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RecurrentOperation from './RecurrentOperation/index';
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from "../../actions/ui/crud/createForm";
import {
  getCrudCreateButtonState as getCrudCreateButtonStateSelector,
  getCrudCreateFormState as getCrudCreateFormStateSelector
} from '../../selectors/ui'

class RecurrentOperations extends Component {

  renderRecurrentOperations() {
    const recurrentOperations = Object.assign([], this.props.data.recurrentOperations);
    return recurrentOperations.sort((a, b) => a.day > b.day).map((recurrentOperation) => {
      return (
        <RecurrentOperation refetch={this.props.data.refetch} key={recurrentOperation.id}
                            recurrentOperation={recurrentOperation} />
      );
    });
  }

  componentWillMount() {
    this.props.updateLayoutTitle('Opérations#Mensuelles');
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.renderRecurrentOperations()}

        {this.props.displayCreateForm && <NewRecurrentOperation />}

        {this.props.displayCreateButton &&
        <FloatingActionButton className="floating-right" backgroundColor="red" onClick={this.props.showCreateForm}>
          <PlusOneIcon />
        </FloatingActionButton>}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateLayoutTitle: (title) => {
      dispatch(updateLayoutTitleAction(title));
    },
    showCreateForm: () => {
      dispatch(showCreateForm('recurrentOperation'));
      dispatch(hideCreateButton('recurrentOperation'));
    },
  };
}

function mapStateToProps(state) {
  return {
    displayCreateForm: getCrudCreateFormStateSelector(state, { entity: 'recurrentOperation' }),
    displayCreateButton: getCrudCreateButtonStateSelector(state, { entity: 'recurrentOperation' }) !== false,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(query)(RecurrentOperations));
