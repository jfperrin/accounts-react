// TODO replace moment by dayjs
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import React from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { useMutation, useQuery } from 'react-apollo';
import query from '../../Periods/gqlQueries/get';
import Form from '../Form';
import { updateModaleEntity, updateModaleOpened } from '../../../actions/ui/layout/modale';
import pointOperationMutation from '../gqlQueries/point';
import deleteOperationMutation from '../../Periods/gqlQueries/deleteOperation';

const List = ({ idPeriod, pageSize = 15, displayAction }) => {
  const dispatch = useDispatch();
  const { data, loading, refetch } = useQuery(query, { variables: { id: idPeriod } });
  const [mutatePointOperation] = useMutation(pointOperationMutation);
  const [mutateDeleteOperation] = useMutation(deleteOperationMutation);

  const deleteEntity = idOperation => {
    mutateDeleteOperation({
      variables: {
        id: idPeriod,
        idOperation,
      },
    }).then(() => refetch());
  };

  const pointEntity = id => {
    mutatePointOperation({
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
        title: 'Date',
        dataIndex: 'dt',
        key: 'dt',
        render: dt => format(new Date(dt), 'dd/MM/yyyy'),
      },
      {
        title: 'Label',
        dataIndex: 'label',
        key: 'label',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
    ];

    if (displayAction) {
      columns.push({
        title: 'Actions',
        key: 'action',
        width: 120,
        render: entity => (
          <Space size="middle">
            <Button size={'small'} shape={'circle'} type={entity.pointedAt ? 'primary' : ''} icon={<CheckCircleOutlined />} onClick={() => pointEntity(entity.id)} />
            <Button size={'small'} shape={'circle'} type="primary" icon={<EditOutlined />} onClick={() => editEntity(entity)} />
            <Popconfirm title="Are you sure delete this entity?" onConfirm={() => deleteEntity(entity.id)} okText="Yes" cancelText="No">
              <Button size={'small'} danger shape={'circle'} type="primary" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      });
    }
    return columns;
  };

  return (
    <>
      <Form idPeriod={idPeriod} refetch={refetch} />
      <Table loading={loading} columns={getColumns()} dataSource={data?.period?.operations?.sort((a, b) => moment(a.dt) - moment(b.dt))} pagination={{ pageSize }} />
    </>
  );
};

export default List;
