import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import BalanceIcon from '@material-ui/icons/AccountBalance';
import mutation from '../Periods/gqlQueries/initializeBankBalances';
import query from '../Periods/gqlQueries/get';
import Balance from './Balance/index';
import Index from '../common/Button';

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
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginTop: '13px' }}>Balances</h3>
        </div>
        <div style={{ width: '45px', paddingTop: '5px' }}>
          <Index size={'small'} onClick={() => handleInitializeBankBalances(idPeriod)}>
            <BalanceIcon />
          </Index>
        </div>
      </div>
      {data.period.balances.map(balance => (
        <Balance refetch={refetch} key={balance.id} balance={balance} />
      ))}
    </div>
  );
};

export default Balances;
