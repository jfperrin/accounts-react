import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-apollo';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import query from './gqlQueries/list';
import NewPeriod from './ListItem/New';
import Period from './ListItem/index';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../actions/ui/layout/title';
import { hideCreateButton } from '../../actions/ui/crud/createButton';
import { showCreateForm } from '../../actions/ui/crud/createForm';
import { getCrudCreateButtonState, getCrudCreateFormState } from '../../selectors/ui';
import Index from '../common/Button';

const keyForSorting = (year, month) =>
  parseInt(
    `${year}${month.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`,
    10,
  );

const Periods = () => {
  const dispatch = useDispatch();
  const { data, loading, refetch } = useQuery(query);
  const displayCreateForm = useSelector(state => getCrudCreateFormState(state, { entity: 'period' }));
  const displayCreateButton = useSelector(state => getCrudCreateButtonState(state, { entity: 'period' })) !== false;

  useEffect(() => {
    dispatch(updateLayoutTitleAction('Périodes'));
  }, []);

  const toggleCreateForm = () => {
    dispatch(showCreateForm('period'));
    dispatch(hideCreateButton('period'));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.periods
        .sort((a, b) => keyForSorting(b.year, b.month) - keyForSorting(a.year, a.month))
        .map(period => {
          return <Period refetch={refetch} key={period.id} period={period} />;
        })}
      {displayCreateForm && <NewPeriod />}
      {displayCreateButton && (
        <Index className="floating-right" size="small" onClick={toggleCreateForm}>
          <PlusOneIcon fontSize={'small'} />
        </Index>
      )}
    </div>
  );
};

export default Periods;
