import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Menu, Space } from 'antd';
import { UserAddOutlined, LockOutlined, UnlockOutlined, HomeOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import query from '../Users/gqlQueries/currentUser';
import mutation from '../Users/gqlQueries/logout';
import { useNavigate } from 'react-router-dom';
import './stylesheet.css';
import logo from './logo.svg';
import client from '../../config/apolloClient';
import { getLayoutTitle, getSelectedMenu } from '../../redux/selectors/ui';

const Header = () => {
  const [, , removeCookie] = useCookies(['connect.sid']);
  const navigate = useNavigate();
  const layoutTitle = useSelector(getLayoutTitle);
  const selectedMenu = useSelector(getSelectedMenu);
  const { data } = useQuery(query);
  const [logout] = useMutation(mutation);

  const handleLogout = () => {
    logout({}).then(() => {
      removeCookie();
      client.resetStore();
      navigate('/login');
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
          <Menu.Item key="0" onClick={() => navigate('/')}>
            <HomeOutlined />
          </Menu.Item>
          <Menu.Item key="1" onClick={() => navigate('/periods')}>
            Périodes
          </Menu.Item>
          <Menu.Item key="2" onClick={() => navigate('/banks')}>
            Banques
          </Menu.Item>
          <Menu.Item key="3" onClick={() => navigate('/recurrent-operations')}>
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
                <Button onClick={() => navigate('/signup')} shape="circle" size={'large'} type={'primary'} icon={<UserAddOutlined />} />
                <Button onClick={() => navigate('/login')} shape="circle" size={'large'} type={'primary'} icon={<UnlockOutlined />} />
              </Space>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
