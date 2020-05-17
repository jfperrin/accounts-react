import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import BalanceIcon from '@material-ui/icons/AccountBalance';
import FloatingActionButton from '@material-ui/core/Fab';
import initializeBankBalances from '../Periods/gqlQueries/initializeBankBalances';
import query from '../Periods/gqlQueries/get';
import Balance from './Balance/index';

class Balances extends Component {

  initializeBankBalances(id) {
    this.props.initializeBankBalances({
      variables: {
        id,
      },
    }).then(() => this.props.data.refetch());
  }

  renderBalances() {
    return this.props.data.period.balances.map((balance) => {
      return (
        <Balance refetch={this.props.data.refetch} key={balance.id} balance={balance} />
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginTop: '13px' }}>
              Balances
            </h3>
          </div>
          <div style={{ width: '45px', paddingTop: '5px' }}>
            <FloatingActionButton size={"small"} onClick={() => this.initializeBankBalances(this.props.data.period.id)} >
              <BalanceIcon />
            </FloatingActionButton>
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


export default mutations(graphql(query, {
  options: (props) => {
    return { variables: { id: props.idPeriod } };
  },
})(Balances));
