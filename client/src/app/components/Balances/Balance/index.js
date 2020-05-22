import React from 'react';
import { useSelector } from 'react-redux';
import Show from './Show/index';
import Edit from './Edit/index';
import { getCrudEditState } from '../../../selectors/ui';
import './stylesheet.css';

const BalanceComponent = ({ balance, refetch }) => {
  const edit = useSelector(state => getCrudEditState(state, { entity: 'balance', id: balance.id }));
  return <div className="balance-container">{edit ? <Edit refetch={refetch} balance={balance} /> : <Show refetch={refetch} balance={balance} />}</div>;
};

export default BalanceComponent;
