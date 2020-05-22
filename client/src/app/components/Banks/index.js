import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import { useSelector, useDispatch } from 'react-redux';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import NewBank from './Bank/New';
import Bank from './Bank/index';
import query from './gqlQueries/list';
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from '../../actions/ui/crud/createForm';
import { updateLayoutTitle } from '../../actions/ui/layout/title';
import { getCrudCreateButtonState, getCrudCreateFormState } from '../../selectors/ui';
import Index from '../common/Button';

const Banks = () => {
  const dispatch = useDispatch();
  const { data, refetch, loading } = useQuery(query);
  const displayCreateForm = useSelector(state => getCrudCreateButtonState(state, { entity: 'bank' }));
  const displayCreateButton = useSelector(state => getCrudCreateFormState(state, { entity: 'bank' })) !== false;

  useEffect(() => {
    dispatch(updateLayoutTitle('Banques'));
  }, []);

  const toggleCreateForm = () => {
    dispatch(showCreateForm('bank'));
    dispatch(hideCreateButton('bank'));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.banks
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(bank => {
          return <Bank key={bank.id} bank={bank} refetch={refetch} />;
        })}

      {displayCreateForm && <NewBank />}

      {displayCreateButton && (
        <Index className="floating-right" size="small" onClick={toggleCreateForm}>
          <PlusOneIcon fontSize={'small'} />
        </Index>
      )}
    </div>
  );
};

export default Banks;
