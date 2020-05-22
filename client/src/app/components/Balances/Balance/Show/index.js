import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-apollo';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import mutation from '../../gqlQueries/delete';
import { toggleEditForm } from '../../../../actions/ui/crud/updateForm';

const iconStyle = { cursor: 'pointer' };

const BalanceShowComponent = ({ balance, refetch }) => {
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);

  const deleteBalance = () => {
    mutate({
      variables: { id: balance.id },
    }).then(() => refetch());
  };

  return (
    <div className="balance">
      <div className="label">{balance.bank.label}</div>
      <div className="amount">{balance.amount.toFixed(2)} €</div>
      <div className={'actions'}>
        <EditIcon fontSize="small" onClick={() => dispatch(toggleEditForm('balance', balance.id))} style={iconStyle} />
        <DeleteIcon fontSize="small" onClick={() => deleteBalance(balance)} style={iconStyle} />
      </div>
    </div>
  );
};

export default BalanceShowComponent;
