import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Affix, Button } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../redux/actions/ui/layout/title';
import { updateCurrentMenu } from '../../redux/actions/ui/layout/menu';
import Form from './Form';
import List from './List';
import { updateModaleEntity, updateModaleOpened } from '../../redux/actions/ui/layout/modale';

const RecurrentOperations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCurrentMenu('3'));
    dispatch(updateLayoutTitleAction('Opérations#Mensuelles'));
  }, [dispatch]);

  const handleClick = () => {
    dispatch(updateModaleEntity(undefined));
    dispatch(updateModaleOpened(true));
  };

  return (
    <div style={{ padding: 15 }}>
      <Form />
      <List displayAction pageSize={30} />
      <Affix offsetBottom={15}>
        <div style={{ display: 'flex', paddingRight: 15, justifyContent: 'flex-end', width: '100%' }}>
          <Button type="primary" shape="circle" size={'large'} icon={<AppstoreAddOutlined />} onClick={handleClick} />
        </div>
      </Affix>
    </div>
  );
};

export default RecurrentOperations;
