import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-apollo';
import list from '../Periods/gqlQueries/list';
import current from '../Periods/gqlQueries/current';
import Period from '../Periods/ListItem';
import Operation from '../Operations/Operation';
import { updateLayoutTitle } from '../../actions/ui/layout/title';

const Home = () => {
  const dispatch = useDispatch();
  const { data: dataPeriods, refetch: refetchPeriods, loading: loadingPeriod } = useQuery(list);
  const { data: dataCurrentPeriod, refetch: refetchCurrentPeriod, loading: loadingCurrentPeriod } = useQuery(current);

  useEffect(() => {
    dispatch(updateLayoutTitle(''));
  });

  const renderOperations = () => {
    return dataCurrentPeriod.currentPeriod.operations
      .filter(operation => !operation.pointedAt)
      .map(operation => {
        return <Operation hideAction idPeriod={dataCurrentPeriod.currentPeriod.id} refetch={refetchCurrentPeriod} key={operation.id} operation={operation} />;
      });
  };

  const renderPeriods = () => {
    return dataPeriods.periods.map(period => {
      return <Period refetch={refetchPeriods} key={period.id} period={period} />;
    });
  };

  if (loadingPeriod || loadingCurrentPeriod) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex' }}>
      {dataCurrentPeriod.currentPeriod && (
        <div style={{ width: '50%' }}>
          <div style={{ margin: '15px', border: 'solid 1px #F1F1F1' }}>
            <div style={{ padding: '10px', fontStyle: 'italic', backgroundColor: '#333', color: '#F1F1F1' }}>Période courante {dataCurrentPeriod.currentPeriod.display}</div>
            <div style={{ padding: '10px 5px', display: 'flex' }}>
              <div style={{ flex: 1 }}>Solde</div>
              <div style={{ fontWeight: 'bold', textAlign: 'right' }}>
                <Link to={`/period/${dataCurrentPeriod.currentPeriod.id}`}>{(dataCurrentPeriod.currentPeriod.balance.banks + dataCurrentPeriod.currentPeriod.balance.operations).toFixed(2)}€</Link>
              </div>
            </div>
            <div style={{ margin: '15px 0 0' }}>
              <div style={{ padding: '10px 5px', borderBottom: 'solid 5px #F1F1F1' }}>Opérations non pointées</div>
              {renderOperations()}
            </div>
          </div>
        </div>
      )}
      {dataPeriods.periods && (
        <div style={{ width: '50%' }}>
          <div style={{ margin: 15, border: 'solid 1px #F1F1F1' }}>
            <div style={{ padding: 10, fontStyle: 'italic', backgroundColor: '#333', color: '#F1F1F1' }}>Périodes</div>
            {renderPeriods()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
