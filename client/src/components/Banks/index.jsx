import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Row } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { updateLayoutTitle as updateLayoutTitleAction } from '../../redux/actions/ui/layout/title';
import { updateCurrentMenu } from '../../redux/actions/ui/layout/menu';
import Form from './Form';
import List from './List';
import { updateModaleEntity, updateModaleOpened } from '../../redux/actions/ui/layout/modale';

const RecurrentOperations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCurrentMenu('2'));
    dispatch(updateLayoutTitleAction('Banques'));
  }, [dispatch]);

  const handleClick = () => {
    dispatch(updateModaleEntity(undefined));
    dispatch(updateModaleOpened(true));
  };

  return (
    <div style={{ padding: 15 }}>
      <Form />
      <List displayAction pageSize={50} />
      <Row>
        <Col style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button type="primary" shape="circle" size={'large'} icon={<AppstoreAddOutlined />} onClick={handleClick} />
        </Col>
      </Row>
    </div>
  );
};

export default RecurrentOperations;
