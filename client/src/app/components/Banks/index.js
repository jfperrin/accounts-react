import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import NewBank from './Bank/New';
import Bank from './Bank/index';
import query, { CREATE_BANK_SUBSCRIPTION } from './gqlQueries/list';
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from '../../actions/ui/crud/createForm';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../actions/ui/layout/title';
import { getCrudCreateButtonState as getCrudCreateButtonStateSelector, getCrudCreateFormState as getCrudCreateFormStateSelector } from '../../selectors/ui';
import Button from '../common/Button';

class Banks extends Component {
  componentWillUnmount() {
    this.unsubscribe();
  }

  renderBanks() {
    const {
      data: { banks },
    } = this.props;

    return banks.map(bank => {
      return <Bank key={bank.id} id={bank.id} />;
    });
  }

  componentDidMount() {
    const {
      updateLayoutTitle,
      data: { subscribeToMore, refetch },
    } = this.props;

    updateLayoutTitle('Banques');
    this.unsubscribe = subscribeToMore({
      document: CREATE_BANK_SUBSCRIPTION,
      updateQuery: () => {
        refetch();
      },
    });
  }

  render() {
    const {
      data: { loading },
      showCreateForm,
      displayCreateButton,
      displayCreateForm,
    } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.renderBanks()}
        {displayCreateForm && <NewBank />}
        {displayCreateButton && (
          <Button className="floating-right" size="small" onClick={showCreateForm}>
            <PlusOneIcon fontSize={'small'} />
          </Button>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateLayoutTitle: title => {
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
