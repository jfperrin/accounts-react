import { Button, Card, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ImportOutlined } from '@ant-design/icons';
import Operations from '../../Operations';
import Balances from '../../Balances';
import addRecurrentOperationsMutation from '../gqlQueries/addRecurrentOperations';
import { updateLayoutTitle } from '../../../actions/ui/layout/title';
import get from '../gqlQueries/get';
import Amount from '../../common/Amount';

const styleAmount = { width: 110, display: 'flex', justifyContent: 'flex-end' };
const styleLabel = { flex: 1 };
const styleSolde = {
  display: 'flex',
  flexFlow: 'row',
  padding: '15px 5px',
};
const Period = ({ match }) => {
  const dispatch = useDispatch();
  const [addRecurrentOperations] = useMutation(addRecurrentOperationsMutation);
  const { loading, data, refetch } = useQuery(get, { variables: { id: match.params.id } });

  useEffect(() => {
    if (data && !loading) {
      dispatch(updateLayoutTitle(`Operations#${data.period.display}`));
    }
  }, [loading, data, dispatch]);

  if (!data) return null;

  const handleAddRecurrentOperations = async () => {
    await addRecurrentOperations({ variables: { id: match.params.id } });
    await refetch();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row>
        <Col span={12}>
          <Balances idPeriod={match.params.id} />
        </Col>
        <Col span={12} style={{ padding: 15 }}>
          <Card
            bordered
            title={
              <>
                <h3 style={{ float: 'left', paddingTop: 8, marginBottom: 0 }}>Solde</h3>
                <Button style={{ float: 'right' }} size={'large'} shape={'circle'} type={'primary'} icon={<ImportOutlined />} onClick={handleAddRecurrentOperations} />
              </>
            }
          >
            <div style={styleSolde}>
              <div style={styleLabel}>Opérations</div>
              <div style={styleAmount}>
                <Amount amount={data.period.balance.operations} />
              </div>
            </div>
            <div style={styleSolde}>
              <div style={styleLabel}>Banque</div>
              <div style={styleAmount}>
                <Amount amount={data.period.balance.banks} />
              </div>
            </div>
            <div style={styleSolde}>
              <div style={styleLabel}>Solde</div>
              <div style={styleAmount}>
                <Amount amount={data.period.balance.operations + data.period.balance.banks} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Operations idPeriod={match.params.id} />
        </Col>
      </Row>
    </>
  );
};

export default Period;
