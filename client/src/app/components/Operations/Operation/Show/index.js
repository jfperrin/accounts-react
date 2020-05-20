import moment from 'moment';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import StarRounded from '@material-ui/icons/StarRounded';
import CheckIcon from '@material-ui/icons/Check';
import Cancelcon from '@material-ui/icons/Cancel';
import query from '../../../Periods/gqlQueries/get';
import deleteOperation from '../../../Periods/gqlQueries/deleteOperation';
import pointOperation from '../../gqlQueries/point';
import { toggleEditForm } from '../../../../actions/ui/crud/updateForm';
import '../stylesheet.css';

class ShowComponent extends Component {
  constructor() {
    super();

    this.iconStyle = { cursor: 'pointer' };
  }

  pointOperation(id, idPeriod) {
    const { pointOperation } = this.props;

    pointOperation({
      variables: {
        id,
      },
      refetchQueries: [
        {
          query,
          variables: {
            id: idPeriod,
          },
        },
      ],
    });
  }

  deleteOperation(idOperation, idPeriod) {
    const { deleteOperation } = this.props;
    deleteOperation({
      variables: {
        id: idPeriod,
        idOperation,
      },
    });
  }

  stylePointed(operation) {
    if (operation.pointedAt) {
      return {
        backgroundColor: '#666',
        color: '#AAA',
        fontSize: '10px',
        fontStyle: 'italic',
        cursor: 'pointer',
      };
    }
    return {};
  }

  stylePointedTexts(operation) {
    if (operation.pointedAt) {
      return {
        padding: '12px 7px',
      };
    }
    return {};
  }

  stylePointedactions(operation) {
    if (operation.pointedAt) {
      return {
        padding: '5px',
      };
    }
    return {};
  }

  render() {
    const { operation, toggleEdit, idPeriod, hideAction } = this.props;

    return (
      <div className="operation" style={this.stylePointed(operation)}>
        <div className="dt" style={this.stylePointedTexts(operation)}>
          {moment(operation.dt).format('DD-MM-YYYY')}
        </div>
        <div className="label" style={this.stylePointedTexts(operation)}>
          {operation.label}
        </div>
        <div className="amount" style={this.stylePointedTexts(operation)}>
          {operation.amount && operation.amount.toFixed(2)} €
        </div>
        {!hideAction && (
          <div className="actions" style={this.stylePointedactions(operation)}>
            {!operation.pointedAt && (
              <div style={{ display: 'flex' }}>
                <IconButton size={'small'} onClick={() => this.pointOperation(operation.id, idPeriod)}>
                  {operation.pointedAt && <Cancelcon fontSize="small" />}
                  {operation.pointedAt === null && <CheckIcon fontSize="small" />}
                </IconButton>
                <IconButton size={'small'} onClick={() => toggleEdit(operation.id)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size={'small'} onClick={() => this.deleteOperation(operation.id, idPeriod)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
                {operation.isRecurrent && <StarRounded style={{ paddingTop: 18, paddingLeft: 5, color: 'rgba(0, 0, 0, 0.54)' }} fontSize="small" />}
              </div>
            )}
            {operation.pointedAt && (
              <IconButton size={'small'} onClick={() => this.pointOperation(operation.id, idPeriod)}>
                <Cancelcon fontSize="small" />
              </IconButton>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleEdit: id => {
      dispatch(toggleEditForm('operation', id));
    },
  };
}

const mutations = compose(
  graphql(deleteOperation, {
    name: 'deleteOperation',
  }),
  graphql(pointOperation, {
    name: 'pointOperation',
  }),
);

export default mutations(connect(null, mapDispatchToProps)(ShowComponent));
