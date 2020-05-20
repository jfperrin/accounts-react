import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import query from './gqlQueries/list';
import NewPeriod from './ListItem/New';
import Period from './ListItem/index';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../actions/ui/layout/title';
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from '../../actions/ui/crud/createForm';
import { getCrudCreateButtonState as getCrudCreateButtonStateSelector, getCrudCreateFormState as getCrudCreateFormStateSelector } from '../../selectors/ui';
import Button from '../common/Button';

class Periods extends Component {
  keyForSorting(period) {
    return parseInt(
      `${period.year}${period.month.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`,
      10,
    );
  }

  renderPeriods() {
    const { data } = this.props;

    if (data.loading) {
      return <div>Loading...</div>;
    }

    if (data.periods) {
      const periods = Object.assign([], data.periods);
      return periods
        .sort((a, b) => this.keyForSorting(b) - this.keyForSorting(a))
        .map(period => {
          return <Period refetch={data.refetch} key={period.id} period={period} />;
        });
    }

    return <div>Error</div>;
  }

  componentDidMount() {
    const { updateLayoutTitle } = this.props;

    updateLayoutTitle('Périodes');
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
        {this.renderPeriods()}
        {displayCreateForm && <NewPeriod />}
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
