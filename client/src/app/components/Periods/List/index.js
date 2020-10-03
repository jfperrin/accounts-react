import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { useMutation, useQuery } from 'react-apollo';
import Form from '../Form';
import query from '../gqlQueries/list';
import mutation from '../gqlQueries/delete';
import { updateModaleEntity, updateModaleOpened } from '../../../actions/ui/layout/modale';
import { listActionsBlock } from '../../../services/utils';
import Amount from '../../common/Amount';

const keyForSorting = (year, month) =>
  parseInt(
    `${year}${month.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`,
    10,
  );

const PeriodsTable = ({ displayAction, pageSize = 15 }) => {
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

  return (
    <>
      <Form />
      <Table loading={loading} columns={getColumns()} dataSource={data?.periods?.sort((a, b) => keyForSorting(b.year, b.month) - keyForSorting(a.year, a.month))} pagination={{ pageSize }} />
    </>
  );
};

export default PeriodsTable;
