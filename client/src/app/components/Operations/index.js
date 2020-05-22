import moment from 'moment';
import { sortBy } from 'lodash';
import React from 'react';
import { useQuery } from 'react-apollo';
import { useDispatch, useSelector } from 'react-redux';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import query from '../Periods/gqlQueries/get';
import NewOperation from './Operation/New/index';
import Operation from './Operation/index';
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from '../../actions/ui/crud/createForm';
import { getCrudCreateButtonState as getCrudCreateButtonStateSelector, getCrudCreateFormState as getCrudCreateFormStateSelector } from '../../selectors/ui';
import Index from '../common/Button';
import './stylesheet.css';

const Operations = ({ idPeriod }) => {
  const dispatch = useDispatch();
  const { data, loading, refetch } = useQuery(query, { variables: { id: idPeriod } });
  const displayCreateForm = useSelector(state => getCrudCreateFormStateSelector(state, { entity: 'operation' }));
  const displayCreateButton = useSelector(state => getCrudCreateButtonStateSelector(state, { entity: 'operation' })) !== false;

  const toggleCreateForm = () => {
    dispatch(showCreateForm('operation'));
    dispatch(hideCreateButton('operation'));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="operations">
      <div className="operations-items">
        {sortBy(data.period.operations, operation => new moment(operation.dt)).map(operation => (
          <Operation idPeriod={idPeriod} refetch={refetch} key={operation.id} operation={operation} />
        ))}
      </div>

      {displayCreateForm && <NewOperation id={idPeriod} />}
      {displayCreateButton && (
        <Index className="add" color="secondary" onClick={toggleCreateForm}>
          <PlusOneIcon fontSize={'small'} />
        </Index>
      )}
    </div>
  );
};

export default Operations;
