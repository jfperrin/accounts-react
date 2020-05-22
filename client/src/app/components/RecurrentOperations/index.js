import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-apollo';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import query from './gqlQueries/list';
import NewRecurrentOperation from './RecurrentOperation/New';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../actions/ui/layout/title';
import RecurrentOperation from './RecurrentOperation/index';
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from '../../actions/ui/crud/createForm';
import { getCrudCreateButtonState as getCrudCreateButtonStateSelector, getCrudCreateFormState as getCrudCreateFormStateSelector } from '../../selectors/ui';
import Index from '../common/Button';

const RecurrentOperations = () => {
  const dispatch = useDispatch();
  const { data, refetch, loading } = useQuery(query);
  const displayCreateForm = useSelector(state => getCrudCreateFormStateSelector(state, { entity: 'recurrentOperation' }));
  const displayCreateButton = useSelector(state => getCrudCreateButtonStateSelector(state, { entity: 'recurrentOperation' })) !== false;

  useEffect(() => {
    dispatch(updateLayoutTitleAction('Opérations#Mensuelles'));
  }, [dispatch]);

  const toggleCreateForm = () => {
    dispatch(showCreateForm('recurrentOperation'));
    dispatch(hideCreateButton('recurrentOperation'));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.recurrentOperations
        .sort((a, b) => a.day - b.day)
        .map(recurrentOperation => {
          return <RecurrentOperation refetch={refetch} key={recurrentOperation.id} recurrentOperation={recurrentOperation} />;
        })}

      {displayCreateForm && <NewRecurrentOperation />}

      {displayCreateButton && (
        <Index className="floating-right" size="small" onClick={toggleCreateForm}>
          <PlusOneIcon fontSize={'small'} />
        </Index>
      )}
    </div>
  );
};

export default RecurrentOperations;
