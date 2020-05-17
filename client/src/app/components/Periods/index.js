import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import FloatingActionButton from '@material-ui/core/Fab';
import query from './gqlQueries/list';
import NewPeriod from './ListItem/New';
import Period from './ListItem/index';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../actions/ui/layout/title'
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from '../../actions/ui/crud/createForm';
import {
  getCrudCreateButtonState as getCrudCreateButtonStateSelector,
  getCrudCreateFormState as getCrudCreateFormStateSelector,
} from '../../selectors/ui';

class Periods extends Component {

  keyForSorting(period) {
    return parseInt(`${period.year}${period.month.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })}`, 10)
  }

  renderPeriods() {

    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    if (this.props.data.periods) {
      const periods = Object.assign([], this.props.data.periods);
      return periods.sort((a, b) => this.keyForSorting(a) < this.keyForSorting(b)).map((period) => {
        return (
          <Period refetch={this.props.data.refetch} key={period.id} period={period} />
        );
      });
    } else {
      return <div>Error</div>
    }
  }

  componentDidMount() {
    this.props.updateLayoutTitle('Périodes');
  }

  render() {

    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.renderPeriods()}
        {this.props.displayCreateForm && <NewPeriod />}
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
      dispatch(showCreateForm('period'));
      dispatch(hideCreateButton('period'));
    },
  };
}

function mapStateToProps(state) {
  return {
    displayCreateForm: getCrudCreateFormStateSelector(state, { entity: 'period' }),
    displayCreateButton: getCrudCreateButtonStateSelector(state, { entity: 'period' }) !== false,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(graphql(query)(Periods));
