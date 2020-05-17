import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import query, { CREATE_BANK_SUBSCRIPTION } from './gqlQueries/list';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import FloatingActionButton from '@material-ui/core/Fab';
import NewBank from './Bank/New';
import Bank from './Bank/index';
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from "../../actions/ui/crud/createForm";
import { updateLayoutTitle as updateLayoutTitleAction } from '../../actions/ui/layout/title'
import {
  getCrudCreateButtonState as getCrudCreateButtonStateSelector,
  getCrudCreateFormState as getCrudCreateFormStateSelector
} from '../../selectors/ui'

class Banks extends Component {

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderBanks() {
    return this.props.data.banks.map((bank) => {
      return (
        <Bank key={bank.id} id={bank.id} />
      );
    });
  }

  componentDidMount() {
    this.props.updateLayoutTitle('Banques');
    this.unsubscribe = this.props.data.subscribeToMore({
      document: CREATE_BANK_SUBSCRIPTION,
      updateQuery: () => {
        this.props.data.refetch();
      },
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.renderBanks()}
        {this.props.displayCreateForm && <NewBank />}
        {this.props.displayCreateButton &&
        <FloatingActionButton className="floating-right" color="secondary" onClick={this.props.showCreateForm}>
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
      dispatch(showCreateForm('bank'));
      dispatch(hideCreateButton('bank'));
    },
  };
}

function mapStateToProps(state) {
  return {
    displayCreateForm: getCrudCreateFormStateSelector(state, { entity: 'bank' }),
    displayCreateButton: getCrudCreateButtonStateSelector(state, { entity: 'bank' }) !== false,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(query)(Banks));
