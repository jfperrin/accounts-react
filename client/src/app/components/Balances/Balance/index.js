import React, { Component } from 'react';
import { connect } from 'react-redux';
import Show from './Show/index';
import Edit from './Edit/index';
import { getCrudEditState as getCrudEditStateSelector } from '../../../selectors/ui'
import './stylesheet.css';


class BalanceComponent extends Component {
  render() {
    const { balance, edit, refetch } = this.props;

    return (
      <div className="balance-container">
        {edit ? <Edit refetch={refetch} balance={balance} /> : <Show refetch={refetch} balance={balance} />}
      </div>
    )
  };
}

function mapStateToProps(state, ownProps) {
  return {
    edit: getCrudEditStateSelector(state, { entity: 'balance', id: ownProps.balance.id }),
  };
}

export default connect(mapStateToProps, null)(BalanceComponent);
