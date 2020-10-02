import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-apollo';
import { Card, Col, Row } from 'antd';
import current from '../Periods/gqlQueries/current';
import OperationList from '../Operations/List';
import { updateLayoutTitle } from '../../actions/ui/layout/title';
import { updateCurrentMenu } from '../../actions/ui/layout/menu';
import PeriodsList from '../Periods/List';
import Amount from '../common/Amount';

const Home = () => {
  const dispatch = useDispatch();
  const { data: dataCurrentPeriod, loading: loadingCurrentPeriod } = useQuery(current);

  useEffect(() => {
    dispatch(updateLayoutTitle(''));
    dispatch(updateCurrentMenu('0'));
  });

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
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <Link to={`/period/${dataCurrentPeriod.currentPeriod.id}`}>Solde</Link>
              </div>
              <div style={{ fontWeight: 'bold', textAlign: 'right' }}>
                <Amount amount={dataCurrentPeriod.currentPeriod.balance.banks + dataCurrentPeriod.currentPeriod.balance.operations} />
              </div>
            </div>
          </Card>
          <Card title={'Opérations non pointées'} style={{ marginTop: 15 }}>
            <OperationList showHeader={false} idPeriod={dataCurrentPeriod.currentPeriod.id} displayAction={false} pageSize={30} hidePointedOperations />
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
