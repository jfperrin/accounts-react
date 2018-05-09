import moment from 'moment';
import _ from 'lodash';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import PlusOneIcon from 'material-ui/svg-icons/social/plus-one';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import query from '../Periods/gqlQueries/get';
import NewOperation from './Operation/New/index';
import Operation from './Operation/index';
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from '../../actions/ui/crud/createForm';
import {
  getCrudCreateButtonState as getCrudCreateButtonStateSelector,
  getCrudCreateFormState as getCrudCreateFormStateSelector,
} from '../../selectors/ui';
import mutation from '../Periods/gqlQueries/addRecurrentOperations';
import './stylesheet.css';

class Operations extends Component {
  renderOperations() {
    const operations = Object.assign([], this.props.data.period.operations);

    return _.sortBy(operations, (operation) => (new moment(operation.dt))).map((operation) => {
        return (
          <Operation idPeriod={this.props.idPeriod} refetch={this.props.data.refetch} key={operation.id}
                     operation={operation} />
        );
      });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="operations">
        {
          this.props.data.period.operations.length > 0 &&
          <div className="operations-items">
            {this.renderOperations()}
          </div>
        }
        {this.props.displayCreateForm && <NewOperation id={this.props.idPeriod} />}
        {this.props.displayCreateButton &&
        <FloatingActionButton className="add" backgroundColor="red" onClick={this.props.showCreateForm}>
          <PlusOneIcon />
        </FloatingActionButton>
        }
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

export default graphql(mutation)(connect(mapStateToProps, mapDispatchToProps)(graphql(query, {
  options: (props) => {
    return { variables: { id: props.idPeriod } };
  },
})(Operations)));
