import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Affix, Button } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { updateLayoutTitle } from '../../redux/actions/ui/layout/title';
import { updateCurrentMenu } from '../../redux/actions/ui/layout/menu';
import { updateModaleEntity, updateModaleOpened } from '../../redux/actions/ui/layout/modale';
import List from './List';
import Form from './Form';

const Periods = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateLayoutTitle('Périodes'));
    dispatch(updateCurrentMenu('1'));
  }, [dispatch]);

  const handleClick = () => {
    dispatch(updateModaleEntity(undefined));
    dispatch(updateModaleOpened(true));
  };

  return (
    <div style={{ padding: 15 }}>
      <Form />
      <List tableSize={'small'} displayAction pageSize={30} />
      <Affix offsetBottom={15}>
        <div style={{ display: 'flex', paddingRight: 15, justifyContent: 'flex-end', width: '100%' }}>
          <Button type="primary" shape="circle" size={'large'} icon={<AppstoreAddOutlined />} onClick={handleClick} />
        </div>
      </Affix>
    </div>
  );
};

export default Periods;
