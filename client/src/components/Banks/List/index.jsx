import React from 'react';
import { useDispatch } from 'react-redux';
import { Table } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import Form from '../Form';
import query from '../gqlQueries/list';
import mutation from '../gqlQueries/delete';
import { updateModaleEntity, updateModaleOpened } from '../../../redux/actions/ui/layout/modale';
import { listActionsBlock } from '../../../services/utils';

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
        title: 'Nom',
        dataIndex: 'label',
        key: 'label',
      },
    ];

    if (displayAction) {
      columns.push(listActionsBlock({ deleteEntity, editEntity }));
    }

    return columns;
  };

  return (
    <>
      <Form />
      <Table rowKey={'id'} loading={loading} columns={getColumns()} dataSource={[...(data?.banks || [])].sort((a, b) => b.day - a.day)} pagination={{ pageSize }} />
    </>
  );
};

export default RecurrentOperationsTable;
