import React from 'react';
import { Button, Card } from 'antd';
import { BankOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import mutation from '../Periods/gqlQueries/initializeBankBalances';
import query from '../Periods/gqlQueries/get';
import Balance from './Balance';
import Edit from './Balance/Edit';

const Balances = ({ idPeriod }) => {
  const [initializeBankBalances] = useMutation(mutation);
  const { refetch, data } = useQuery(query, { variables: { id: idPeriod } });

  const handleInitializeBankBalances = async id => {
    await initializeBankBalances({ variables: { id } });
    await refetch();
  };

  if (!data) return null;

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
        variant={'outlined'}
      >
        {data.period.balances.map(balance => (
          <Balance refetch={refetch} key={`idx-${balance.id}`} balance={balance} />
        ))}
      </Card>
    </div>
  );
};

export default Balances;
