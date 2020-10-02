import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-apollo';
import { Card, Col, Row } from 'antd';
import current from '../Periods/gqlQueries/current';
import Operation from '../Operations/Operation';
import { updateLayoutTitle } from '../../actions/ui/layout/title';
import { updateCurrentMenu } from '../../actions/ui/layout/menu';
import PeriodsList from '../Periods/List';

const Home = () => {
  const dispatch = useDispatch();
  const { data: dataCurrentPeriod, refetch: refetchCurrentPeriod, loading: loadingCurrentPeriod } = useQuery(current);

  useEffect(() => {
    dispatch(updateLayoutTitle(''));
    dispatch(updateCurrentMenu('0'));
  });

  const renderOperations = () => {
    return dataCurrentPeriod.currentPeriod.operations
      .filter(operation => !operation.pointedAt)
      .map(operation => {
        return <Operation hideAction idPeriod={dataCurrentPeriod.currentPeriod.id} refetch={refetchCurrentPeriod} key={operation.id} operation={operation} />;
      });
  };

  if (loadingCurrentPeriod) {
    return (
      <Row>
        <Col>Loading...</Col>
      </Row>
    );
  }

  return (
    <Row>
      {dataCurrentPeriod.currentPeriod && (
        <Col span={12} style={{ padding: 15 }}>
          <Card title={`Période courante ${dataCurrentPeriod.currentPeriod.display}`}>
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
          </Card>
        </Col>
      )}
      <Col span={12} style={{ padding: 15 }}>
        <PeriodsList showHeader={false} pagination={{ pageSize: 20 }} />
      </Col>
    </Row>
  );
};

export default Home;
