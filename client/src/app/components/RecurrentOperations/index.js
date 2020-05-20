import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import query from './gqlQueries/list';
import NewRecurrentOperation from './RecurrentOperation/New';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../actions/ui/layout/title';
import RecurrentOperation from './RecurrentOperation/index';
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from '../../actions/ui/crud/createForm';
import { getCrudCreateButtonState as getCrudCreateButtonStateSelector, getCrudCreateFormState as getCrudCreateFormStateSelector } from '../../selectors/ui';
import Index from '../common/Button';

class RecurrentOperations extends Component {
  renderRecurrentOperations() {
    const { data } = this.props;
    const recurrentOperations = Object.assign([], data.recurrentOperations);
    return recurrentOperations
      .sort((a, b) => a.day - b.day)
      .map(recurrentOperation => {
        return <RecurrentOperation refetch={data.refetch} key={recurrentOperation.id} recurrentOperation={recurrentOperation} />;
      });
  }

  componentDidMount() {
    const { updateLayoutTitle } = this.props;

    updateLayoutTitle('Opérations#Mensuelles');
  }

  render() {
    const { data, displayCreateForm, showCreateForm, displayCreateButton } = this.props;
    if (data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.renderRecurrentOperations()}

        {displayCreateForm && <NewRecurrentOperation />}

        {displayCreateButton && (
          <Index className="floating-right" size="small" onClick={showCreateForm}>
            <PlusOneIcon fontSize={'small'} />
          </Index>
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
