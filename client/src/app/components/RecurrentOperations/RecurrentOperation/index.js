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

const RecurrentOperation = ({ refetch, recurrentOperation }) => {
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);
  const edit = useSelector(state => getCrudEditState(state, { entity: 'recurrentOperation', id: recurrentOperation.id }));

  const deleteRecurrentOperation = () => {
    mutate({
      variables: { id: recurrentOperation.id },
    }).then(() => refetch());
  };

  const recurrentOperationView = edit ? <Edit recurrentOperation={recurrentOperation} /> : <Show recurrentOperation={recurrentOperation} />;

  return (
    <div className="recurrentOperation">
      <div className="label">{recurrentOperationView}</div>
      {!edit && (
        <div className={'actions'}>
          <EditIcon fontSize="small" onClick={() => dispatch(toggleEditForm('recurrentOperation', recurrentOperation.id))} style={iconStyle} />
          <DeleteIcon fontSize="small" onClick={() => deleteRecurrentOperation(recurrentOperation)} style={iconStyle} />
        </div>
      )}
    </div>
  );
};

export default RecurrentOperation;
