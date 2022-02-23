import { Button, Popconfirm, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';

export const dateFormat = 'DD/MM/yyyy';
export const formatDate = dt => moment(new Date(dt)).format(dateFormat);

export const listActionsBlock = ({ editEntity, deleteEntity }) => ({
  title: 'Actions',
  key: 'action',
  width: 100,
  render: entity => (
    <Space size="middle">
      <Button size={'small'} shape={'circle'} type="primary" icon={<EditOutlined />} onClick={() => editEntity(entity)} />
      <Popconfirm title="Are you sure delete this entity?" onConfirm={() => deleteEntity(entity.id)} okText="Yes" cancelText="No">
        <Button size={'small'} danger shape={'circle'} type="primary" icon={<DeleteOutlined />} />
      </Popconfirm>
    </Space>
  ),
});
