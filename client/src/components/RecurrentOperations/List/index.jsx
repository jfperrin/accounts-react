import React from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import query from '../gqlQueries/list';
import mutation from '../gqlQueries/delete';
import { updateModaleEntity, updateModaleOpened } from '../../../redux/actions/ui/layout/modale';
import { listActionsBlock } from '../../../services/utils';
import Amount from '../../common/Amount';

const RecurrentOperationsTable = ({ displayAction, pageSize = 15 }) => {
  const { data, loading, refetch } = useQuery(query);
  const [mutate] = useMutation(mutation);
  const dispatch = useDispatch();
  const deleteEntity = id => {
    mutate({
      variables: { id },
    }).then(() => refetch());
  };

  const editEntity = entity => {
    dispatch(updateModaleEntity(entity));
    dispatch(updateModaleOpened(true));
  };

  const getColumns = () => {
    const columns = [
      {
        title: 'Jours',
        dataIndex: 'day',
        key: 'day',
        width: 75,
      },
      {
        title: 'Libellé',
        dataIndex: 'label',
        key: 'label',
      },
      {
        title: 'Montant',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        width: 75,
        render: amount => <Amount amount={amount} />,
      },
    ];

    if (displayAction) {
      columns.push(listActionsBlock({ deleteEntity, editEntity }));
    }

    return columns;
  };

  return <Table size={'small'} rowKey={'id'} loading={loading} columns={getColumns()} dataSource={[...(data?.recurrentOperations || [])].sort((a, b) => a.day - b.day)} pagination={{ pageSize }} />;
};

export default RecurrentOperationsTable;
