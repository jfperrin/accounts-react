import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import BalanceIcon from '@material-ui/icons/AccountBalance';
import initializeBankBalances from '../Periods/gqlQueries/initializeBankBalances';
import query from '../Periods/gqlQueries/get';
import Balance from './Balance/index';
import Index from '../common/Button';

class Balances extends Component {
  initializeBankBalances(id) {
    const { initializeBankBalances, data } = this.props;
    initializeBankBalances({ variables: { id } }).then(() => data.refetch());
  }

  renderBalances() {
    const {
      data: { refetch, period },
    } = this.props;

    return period.balances.map(balance => {
      return <Balance refetch={refetch} key={balance.id} balance={balance} />;
    });
  }

  render() {
    const {
      data: { loading, period },
    } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginTop: '13px' }}>Balances</h3>
          </div>
          <div style={{ width: '45px', paddingTop: '5px' }}>
            <Index size={'small'} onClick={() => this.initializeBankBalances(period.id)}>
              <BalanceIcon />
            </Index>
          </div>
        </div>
        {this.renderBalances()}
      </div>
    );
  }
}

const mutations = compose(
  graphql(initializeBankBalances, {
    name: 'initializeBankBalances',
  }),
);

export default mutations(
  graphql(query, {
    options: props => {
      return { variables: { id: props.idPeriod } };
    },
  })(Balances),
);
