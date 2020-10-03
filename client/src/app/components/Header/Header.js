import { useMutation, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Menu, Space } from 'antd';
import { UserAddOutlined, LockOutlined, UnlockOutlined, HomeOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie';
import query from '../Users/gqlQueries/currentUser';
import mutation from '../Users/gqlQueries/logout';
import './stylesheet.css';
import logo from './logo.svg';
import client from '../../../apolloClient';
import { getLayoutTitle, getSelectedMenu } from '../../selectors/ui';

const Header = ({ history }) => {
  const layoutTitle = useSelector(getLayoutTitle);
  const selectedMenu = useSelector(getSelectedMenu);
  const { data } = useQuery(query);
  const [logout] = useMutation(mutation);

  const handleLogout = () => {
    const cookies = new Cookies();
    logout({}).then(() => {
      cookies.remove('connect.sid');
      client.resetStore();
      history.push('/login');
    });
  };

  if (!data) return null;

  return (
    <div className={'app-header-container'}>
      <div className="icon">
        <Link to={'/'}>
          <img src={logo} className="app-logo" alt="logo" />
        </Link>
      </div>
      {!data.user && (
        <div className={'title'}>
          <Link to={'/'}>{data.user && data.user.nickname}@Re//Account</Link>
          {layoutTitle && `#${layoutTitle}`}
        </div>
      )}
      {!data.loading && data.user && (
        <Menu theme="dark" mode="horizontal" selectedKeys={[selectedMenu]}>
          <Menu.Item key="0" onClick={() => history.push('/')}>
            <HomeOutlined />
          </Menu.Item>
          <Menu.Item key="1" onClick={() => history.push('/periods')}>
            Périodes
          </Menu.Item>
          <Menu.Item key="2" onClick={() => history.push('/banks')}>
            Banques
          </Menu.Item>
          <Menu.Item key="3" onClick={() => history.push('/recurrent-operations')}>
            Opérations récurrentes
          </Menu.Item>
        </Menu>
      )}
      <div className={'login'}>
        {!data.loading && (
          <>
            {data.user && <Button shape="circle" type={'primary'} size={'large'} icon={<LockOutlined />} onClick={() => handleLogout()} />}
            {!data.user && (
              <Space>
                <Button onClick={() => history.push('/signup')} shape="circle" size={'large'} type={'primary'} icon={<UserAddOutlined />} />
                <Button onClick={() => history.push('/login')} shape="circle" size={'large'} type={'primary'} icon={<UnlockOutlined />} />
              </Space>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
