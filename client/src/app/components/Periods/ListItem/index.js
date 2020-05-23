import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-apollo';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { toggleEditForm } from '../../../actions/ui/crud/updateForm';
import mutation from '../gqlQueries/delete';
import { getCrudEditState } from '../../../selectors/ui';
import Show from './Show/index';
import Edit from './Edit/index';
import './stylesheet.css';

const iconStyle = { cursor: 'pointer' };

const Period = ({ period, refetch, hideAction }) => {
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);
  const edit = useSelector(state => getCrudEditState(state, { entity: 'period', id: period.id }));

  const deletePeriod = () => {
    mutate({
      variables: { id: period.id },
    }).then(() => refetch());
  };

  const periodView = edit ? <Edit period={period} /> : <Show entity={period} />;

  return (
    <div className="period">
      <div className="label">{periodView}</div>
      {!hideAction && !edit && (
        <div className={'actions'}>
          <EditIcon onClick={() => dispatch(toggleEditForm('period', period.id))} fontSize={'small'} style={iconStyle} />
          <DeleteIcon onClick={() => deletePeriod(period)} fontSize={'small'} style={iconStyle} />
        </div>
      )}
    </div>
  );
};

export default Period;
