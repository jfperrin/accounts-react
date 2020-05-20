import moment from 'moment';
import { sortBy } from 'lodash';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import query from '../Periods/gqlQueries/get';
import NewOperation from './Operation/New/index';
import Operation from './Operation/index';
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from '../../actions/ui/crud/createForm';
import { getCrudCreateButtonState as getCrudCreateButtonStateSelector, getCrudCreateFormState as getCrudCreateFormStateSelector } from '../../selectors/ui';
import mutation from '../Periods/gqlQueries/addRecurrentOperations';
import Index from '../common/Button';
import './stylesheet.css';

class Operations extends Component {
  renderOperations() {
    const {
      idPeriod,
      data: { period, refetch },
    } = this.props;

    const operations = Object.assign([], period.operations);

    // eslint-disable-next-line new-cap
    return sortBy(operations, operation => new moment(operation.dt)).map(operation => {
      return <Operation idPeriod={idPeriod} refetch={refetch} key={operation.id} operation={operation} />;
    });
  }

  render() {
    const {
      data: { period, loading },
      showCreateForm,
      displayCreateForm,
      displayCreateButton,
      idPeriod,
    } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="operations">
        {period.operations.length > 0 && <div className="operations-items">{this.renderOperations()}</div>}
        {displayCreateForm && <NewOperation id={idPeriod} />}
        {displayCreateButton && (
          <Index className="add" color="secondary" onClick={showCreateForm}>
            <PlusOneIcon fontSize={'small'} />
          </Index>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showCreateForm: () => {
      dispatch(showCreateForm('operation'));
      dispatch(hideCreateButton('operation'));
    },
  };
}

function mapStateToProps(state) {
  return {
    displayCreateForm: getCrudCreateFormStateSelector(state, { entity: 'operation' }),
    displayCreateButton: getCrudCreateButtonStateSelector(state, { entity: 'operation' }) !== false,
  };
}

export default graphql(mutation)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    graphql(query, {
      options: props => {
        return { variables: { id: props.idPeriod } };
      },
    })(Operations),
  ),
);
