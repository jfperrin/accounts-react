import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client/react';
import { updateModaleEntity, updateModaleOpened } from '../../../redux/actions/ui/layout/modale';
import { listActionsBlock } from '../../../services/utils';
import mutation from '../gqlQueries/delete';
import query from '../gqlQueries/list';
import Amount from '../../common/Amount';

const keyForSorting = (year, month) =>
  parseInt(
    `${year}${month.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`,
    10,
  );

const PeriodsTable = ({ displayAction, tableSize, pageSize = 15 }) => {
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
        title: 'Période',
        dataIndex: 'display',
        key: 'id',
        render: (text, entity) => (
          <Link key={`link-${entity.id}`} to={`/period/${entity.id}`}>
            {text}
          </Link>
        ),
      },
      {
        title: 'Solde',
        dataIndex: 'balance',
        key: 'amount',
        width: 75,
        align: 'right',
        render: balance => <Amount key={`balance-${balance.id}`} amount={balance.banks + balance.operations} />,
      },
    ];

    if (displayAction) {
      columns.push(listActionsBlock({ deleteEntity, editEntity }));
    }

    return columns;
  };

  return <Table size={tableSize} rowKey={'id'} loading={loading} columns={getColumns()} dataSource={[...(data?.periods || [])].sort((a, b) => keyForSorting(b.year, b.month) - keyForSorting(a.year, a.month))} pagination={{ pageSize }} />;
};

export default PeriodsTable;
