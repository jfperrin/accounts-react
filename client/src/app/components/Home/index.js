import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import query from '../Periods/gqlQueries/list';
import current from '../Periods/gqlQueries/current';
import Period from '../Periods/ListItem';
import Operation from '../Operations/Operation';
import { Link } from 'react-router-dom';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../actions/ui/layout/title'


class PeriodComponent extends Component {

  renderOperations() {
    return this.props.current.currentPeriod.operations.filter((operation) => (!operation.pointedAt)).map((operation) => {
      return (
        <Operation hideAction={true} idPeriod={this.props.current.currentPeriod.id} refetch={this.props.current.refetch}
                   key={operation.id}
                   operation={operation} />
      );
    });
  }

  renderPeriods() {
    return this.props.query.periods.map((period) => {
      return (
        <Period refetch={this.props.query.refetch} key={period.id} period={period} />
      );
    });
  }

  componentWillMount() {
    this.props.updateLayoutTitle('');
  }

  render() {
    if (this.props.query.loading || this.props.current.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div style={{ display: 'flex' }}>
        {this.props.current.currentPeriod &&
        <div style={{ width: '50%' }}>
          <div style={{ margin: '15px', border: 'solid 1px #F1F1F1' }}>
            <div style={{ padding: '10px', fontStyle: 'italic', backgroundColor: '#333', color: '#F1F1F1' }}>
              Période courante {this.props.current.currentPeriod.display}
            </div>
            <div style={{ padding: '10px 5px', display: 'flex' }}>
              <div style={{ flex: 1 }}>
                Solde
              </div>
              <div style={{ fontWeight: 'bold', textAlign: 'right' }}>
                <Link to={ `/period/${this.props.current.currentPeriod.id}` }>
                {(this.props.current.currentPeriod.balance.banks + this.props.current.currentPeriod.balance.operations).toFixed(2)}
                €
                </Link>
              </div>
            </div>
            <div style={{ margin: '15px 0 0' }}>
              <div style={{ padding: '10px 5px', borderBottom: 'solid 5px #F1F1F1' }}>
                Opérations non pointées
              </div>
              {this.renderOperations()}
            </div>
          </div>
        </div>}

        <div style={{ width: '50%' }}>
          <div style={{ margin: '15px', border: 'solid 1px #F1F1F1' }}>
            <div style={{ padding: '10px', fontStyle: 'italic', backgroundColor: '#333', color: '#F1F1F1' }}>
              Périodes
            </div>
            {this.renderPeriods()}
          </div>
        </div>
      </div>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLayoutTitle: (title) => {
      dispatch(updateLayoutTitleAction(title));
    },
  };
}

const queries = compose(
  graphql(query, {
    name: "query"
  }),
  graphql(current, {
    name: "current"
  }),
);

export default connect(null, mapDispatchToProps)(queries(PeriodComponent));

