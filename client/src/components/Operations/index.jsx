import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Row } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { updateLayoutTitle } from '../../redux/actions/ui/layout/title';
import { updateCurrentMenu } from '../../redux/actions/ui/layout/menu';
import { updateModaleEntity, updateModaleOpened } from '../../redux/actions/ui/layout/modale';
import List from './List';

const Operations = ({ idPeriod }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateLayoutTitle('Périodes'));
    dispatch(updateCurrentMenu('1'));
  }, [dispatch]);

  const handleClick = () => {
    dispatch(updateModaleEntity(undefined));
    dispatch(updateModaleOpened('operations'));
  };

  return (
    <div style={{ padding: 15 }}>
      <List idPeriod={idPeriod} pageSize={50} displayAction />
      <Row>
        <Col style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button type="primary" shape="circle" size={'large'} icon={<AppstoreAddOutlined />} onClick={handleClick} />
        </Col>
      </Row>
    </div>
  );
};

export default Operations;
