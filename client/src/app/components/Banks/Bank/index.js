import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-apollo';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import mutation from '../gqlQueries/delete';
import { toggleEditForm } from '../../../actions/ui/crud/updateForm';
import { getCrudEditState } from '../../../selectors/ui';
import Show from './Show/index';
import Edit from './Edit/index';
import './stylesheet.css';

const iconStyle = { cursor: 'pointer' };

const Bank = ({ refetch, bank }) => {
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);
  const edit = useSelector(state => getCrudEditState(state, { entity: 'bank', id: bank.id }));

  const deleteBank = () => {
    mutate({
      variables: { id: bank.id },
    }).then(() => refetch());
  };

  const bankView = edit ? <Edit bank={bank} /> : <Show bank={bank} />;

  return (
    <div className="bank">
      <div className="label">{bankView}</div>
      {!edit && (
        <div className={'actions'}>
          <EditIcon fontSize="small" onClick={() => dispatch(toggleEditForm('bank', bank.id))} style={iconStyle} />
          <DeleteIcon fontSize="small" onClick={() => deleteBank(bank)} style={iconStyle} />
        </div>
      )}
    </div>
  );
};

export default Bank;
