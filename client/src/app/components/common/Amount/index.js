import React from 'react';
import { Tag } from 'antd';

const Amount = ({ amount }) => {
  if (amount === 0) {
    return <Tag>{amount.toFixed(2)} €</Tag>;
  }

  return <Tag color={amount > 0 ? 'green' : 'red'}>{amount.toFixed(2)} €</Tag>;
};

export default Amount;
