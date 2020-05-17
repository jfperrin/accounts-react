import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import mutation from '../gqlQueries/delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { toggleEditForm } from '../../../actions/ui/crud/updateForm';
import { getCrudEditState as getCrudEditStateSelector } from '../../../selectors/ui'
import Show from './Show/index';
import Edit from './Edit/index';
import './stylesheet.css';
import query, { UPDATE_BANK_SUBSCRIPTION } from '../gqlQueries/get';
import { DELETE_BANK_SUBSCRIPTION } from '../gqlQueries/delete';


class BankComponent extends Component {

  constructor() {
    super();

    this.iconStyle = { cursor: 'pointer' };
  }

  deleteBank(bank) {
    this.props.mutate({
      variables: { id: bank.id }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    const subscriptions = [];

    subscriptions.push(this.props.data.subscribeToMore({
      document: UPDATE_BANK_SUBSCRIPTION,
      variables: {
        id: this.props.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev, subscriptionData);

        return Object.assign({}, prev, { bank: subscriptionData.data.updateBank });
      },
    }));

    subscriptions.push(this.props.data.subscribeToMore({
      document: DELETE_BANK_SUBSCRIPTION,
      variables: {
        id: this.props.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        return Object.assign({}, prev, { bank: subscriptionData.data.deleteBank });
      },
    }));

    this.unsubscribe = () => {
      subscriptions.forEach((unsubscribe) => {
        unsubscribe();
      })
    }
  }

  render() {
    const { edit, toggleEdit, data, id} = this.props;

    if (data.loading) {
      return <div>Loading...</div>;
    }

    const bank = data.bank;

    if (bank.isDeleted) {
      return <div />
    }

    const bankView = edit ? <Edit bank={bank} /> : <Show bank={bank} />;

    return (
      <div className="bank">
        <div className="label">
          {bankView}
        </div>
        {!edit && <div className={'actions'}>
          <EditIcon onClick={() => toggleEdit(id)} style={this.iconStyle} />
          <DeleteIcon onClick={() => this.deleteBank(bank)} style={this.iconStyle} />
        </div>
        }
      </div>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleEdit: (id) => {
      dispatch(toggleEditForm('bank', id));
    },
  };
}

function mapStateToProps(state, ownProps) {
  return {
    edit: getCrudEditStateSelector(state, { entity: 'bank', id: ownProps.id }),
  };
}

export default graphql(mutation)(graphql(query, {
  options: (props) => {
    return { variables: { id: props.id } };
  },
})(connect(mapStateToProps, mapDispatchToProps)(BankComponent)));
