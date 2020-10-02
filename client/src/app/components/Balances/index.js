import React from 'react';
import { Button, Card } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from 'react-apollo';
import mutation from '../Periods/gqlQueries/initializeBankBalances';
import query from '../Periods/gqlQueries/get';
import Balance from './Balance/index';
import Edit from './Balance/Edit';

const Balances = ({ idPeriod }) => {
  const [initializeBankBalances] = useMutation(mutation);
  const { refetch, data, loading } = useQuery(query, { variables: { id: idPeriod } });

  const handleInitializeBankBalances = async id => {
    await initializeBankBalances({ variables: { id } });
    await refetch();
  };

  if (!data) return null;
  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 15 }}>
      <Edit refetch={refetch} />
      <Card
        title={
          <>
            <h3 style={{ float: 'left', paddingTop: 8, marginBottom: 0 }}>Balances</h3>
            <Button style={{ float: 'right' }} size={'large'} shape={'circle'} type={'primary'} icon={<BankOutlined />} onClick={() => handleInitializeBankBalances(idPeriod)} />
          </>
        }
        bordered
      >
        {data.period.balances.map(balance => (
          <Balance refetch={refetch} key={`idx-${balance.id}`} balance={balance} />
        ))}
      </Card>
    </div>
  );
};

export default Balances;
