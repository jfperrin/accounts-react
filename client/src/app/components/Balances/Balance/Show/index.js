import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import mutation from '../../gqlQueries/delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { toggleEditForm } from '../../../../actions/ui/crud/updateForm';

class BalanceShowComponent extends Component {

  constructor() {
    super();

    this.iconStyle = { cursor: 'pointer'};
  }

  deleteBalance(balance) {
    this.props.mutate({
      variables: { id: balance.id }
    }).then(() => this.props.refetch());
  }

  render() {
    const { balance, toggleEdit } = this.props;

    return (
      <div className="balance">
        <div className="label">
          {balance.bank.label}
        </div>
        <div className="amount">
          {balance.amount.toFixed(2)} €
        </div>
        <div className={'actions'}>
          <EditIcon onClick={() => toggleEdit(balance.id)} style={this.iconStyle} />
          <DeleteIcon onClick={() => this.deleteBalance(balance)} style={this.iconStyle} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleEdit: (id) => {
      dispatch(toggleEditForm('balance', id));
    },
  };
}

export default graphql(mutation)(connect(null, mapDispatchToProps)(BalanceShowComponent));
