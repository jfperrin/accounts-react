import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Row } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { updateLayoutTitle } from '../../actions/ui/layout/title';
import { updateCurrentMenu } from '../../actions/ui/layout/menu';
import { updateModaleEntity, updateModaleOpened } from '../../actions/ui/layout/modale';
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
      <List displayAction pageSize={30} />
      <Row>
        <Col style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button type="primary" shape="circle" size={'large'} icon={<AppstoreAddOutlined />} onClick={handleClick} />
        </Col>
      </Row>
    </div>
  );
};

export default Periods;
