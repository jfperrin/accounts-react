import React from 'react';
import { Button, Popconfirm, Space } from 'antd';
import { useMutation } from 'react-apollo';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import mutation from '../gqlQueries/delete';
import { updateModaleEntity, updateModaleOpened } from '../../../actions/ui/layout/modale';
import './stylesheet.scss';
import Amount from '../../common/Amount';

const BalanceComponent = ({ balance, refetch }) => {
  const dispatch = useDispatch();
  const [mutate] = useMutation(mutation);

  const deleteBalance = () => {
    mutate({
      variables: { id: balance.id },
    }).then(() => refetch());
  };

  const editEntity = entity => {
    dispatch(updateModaleEntity(entity));
    dispatch(updateModaleOpened('balance'));
  };

  return (
    <div className="balance">
      <div className="label">{balance.bank.label}</div>
      <div className="amount">
        <Amount amount={balance.amount} />
      </div>
      <div className={'actions'}>
        <Space direction={'horizontal'}>
          <Button size={'small'} type={'primary'} shape={'circle'} onClick={() => editEntity(balance)} icon={<EditOutlined />} />
          <Popconfirm title="Are you sure delete this entity?" onConfirm={() => deleteBalance(balance)} okText="Yes" cancelText="No">
            <Button size={'small'} danger type={'primary'} shape={'circle'} icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      </div>
    </div>
  );
};

export default BalanceComponent;
