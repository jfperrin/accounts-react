import moment from 'moment';
import { useDispatch } from 'react-redux';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { useMutation, useQuery } from 'react-apollo';
import query from '../../Periods/gqlQueries/get';
import Form from '../Form';
import { updateModaleEntity, updateModaleOpened } from '../../../actions/ui/layout/modale';
import pointOperationMutation from '../gqlQueries/point';
import deleteOperationMutation from '../../Periods/gqlQueries/deleteOperation';
import Amount from '../../common/Amount';
import { formatDate } from '../../../services/utils';
import './stylesheet.scss';

const List = ({ idPeriod, showHeader, pageSize = 15, displayAction, hidePointedOperations }) => {
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
        width: 120,
        key: 'dt',
        render: dt => formatDate(dt),
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
        width: 120,
        align: 'right',
        render: amount => <Amount amount={amount} />,
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
    <div className={'operations'}>
      <Form idPeriod={idPeriod} refetch={refetch} />
      <Table
        rowKey={'id'}
        rowClassName={record => record.pointedAt && 'pointed'}
        showHeader={showHeader}
        loading={loading}
        columns={getColumns()}
        dataSource={data?.period?.operations?.filter(data => (hidePointedOperations ? !data.pointedAt : true)).sort((a, b) => moment(a.dt) - moment(b.dt))}
        pagination={{ pageSize }}
      />
    </div>
  );
};

export default List;
