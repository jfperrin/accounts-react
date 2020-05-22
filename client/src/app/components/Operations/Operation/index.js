import React from 'react';
import { useSelector } from 'react-redux';
import { getCrudEditState } from '../../../selectors/ui';
import Show from './Show/index';
import Edit from './Edit/index';

const Operation = ({ operation, idPeriod, hideAction }) => {
  const edit = useSelector(state => getCrudEditState(state, { entity: 'operation', id: operation.id }));

  if (edit) return <Edit idPeriod={idPeriod} operation={operation} />;

  return <Show hideAction={hideAction} idPeriod={idPeriod} operation={operation} />;
};

export default Operation;
