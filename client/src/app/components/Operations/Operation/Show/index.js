import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-apollo';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import StarRounded from '@material-ui/icons/StarRounded';
import CheckIcon from '@material-ui/icons/Check';
import Cancelcon from '@material-ui/icons/Cancel';
import query from '../../../Periods/gqlQueries/get';
import deleteOperationMutation from '../../../Periods/gqlQueries/deleteOperation';
import pointOperationMutation from '../../gqlQueries/point';
import { toggleEditForm } from '../../../../actions/ui/crud/updateForm';
import { stylePointed, stylePointedactions, stylePointedTexts } from './styles';
import '../stylesheet.css';

const Show = ({ operation, idPeriod, hideAction }) => {
  const dispatch = useDispatch();
  const [mutatePointOperation] = useMutation(pointOperationMutation);
  const [mutateDeleteOperation] = useMutation(deleteOperationMutation);

  const pointOperation = (id, idPeriod) => {
    mutatePointOperation({
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
  };

  const deleteOperation = (idOperation, idPeriod) => {
    mutateDeleteOperation({
      variables: {
        id: idPeriod,
        idOperation,
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
  };

  return (
    <div className="operation" style={stylePointed(operation)}>
      <div className="dt" style={stylePointedTexts(operation)}>
        {moment(operation.dt).format('DD-MM-YYYY')}
      </div>
      <div className="label" style={stylePointedTexts(operation)}>
        {operation.label}
      </div>
      <div className="amount" style={stylePointedTexts(operation)}>
        {operation.amount && operation.amount.toFixed(2)} €
      </div>
      {!hideAction && (
        <div className="actions" style={stylePointedactions(operation)}>
          {!operation.pointedAt && (
            <div style={{ display: 'flex' }}>
              <IconButton size={'small'} onClick={() => pointOperation(operation.id, idPeriod)}>
                {operation.pointedAt && <Cancelcon fontSize="small" />}
                {operation.pointedAt === null && <CheckIcon fontSize="small" />}
              </IconButton>
              <IconButton size={'small'} onClick={() => dispatch(toggleEditForm('operation', operation.id))}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size={'small'} onClick={() => deleteOperation(operation.id, idPeriod)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
              {operation.isRecurrent && (
                <StarRounded
                  style={{
                    paddingTop: 16,
                    paddingLeft: 5,
                    color: 'rgba(0, 0, 0, 0.54)',
                  }}
                  fontSize="small"
                />
              )}
            </div>
          )}
          {operation.pointedAt && (
            <IconButton size={'small'} onClick={() => pointOperation(operation.id, idPeriod)}>
              <Cancelcon fontSize="small" />
            </IconButton>
          )}
        </div>
      )}
    </div>
  );
};

export default Show;
