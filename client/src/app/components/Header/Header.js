import { useMutation, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Signup from '@material-ui/icons/PersonAdd';
import LockOpened from '@material-ui/icons/LockOpen';
import Lock from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import CustomButton from '../common/Button';
import { getLayoutTitle } from '../../selectors/ui';
import query from '../Users/gqlQueries/currentUser';
import mutation from '../Users/gqlQueries/logout';
import './stylesheet.css';
import logo from './logo.svg';
import client from '../../../apolloClient';

const Buttons = ({ loading, handleLogout, user }) => {
  if (loading) {
    return <div />;
  }

  if (user) {
    return (
      <div style={{ marginTop: '10px' }}>
        <CustomButton onClick={() => handleLogout()} style={{ marginRight: '15px' }}>
          <Lock />
        </CustomButton>
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: '10px' }}>
        <CustomButton style={{ marginRight: '15px' }} containerElement={<Link to="signup" />}>
          <Signup />
        </CustomButton>
        <CustomButton style={{ marginRight: '15px' }} containerElement={<Link to="login" />}>
          <LockOpened />
        </CustomButton>
      </div>
    );
  }
};

const Header = ({ history }) => {
  const layoutTitle = useSelector(getLayoutTitle);
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
      <div className="app-header">
        <div className="icon">
          <Link to={'/'}>
            <img src={logo} className="app-logo" alt="logo" />
          </Link>
        </div>
        <div className={'title'}>
          <Link to={'/'}>{data.user && data.user.nickname}@Re//Account</Link>
          {layoutTitle && `#${layoutTitle}`}
        </div>
        <div className={'login'}>
          <Buttons handleLogout={handleLogout} loading={data.loading} user={data.user} />
        </div>
      </div>
      {!data.loading && data.user && (
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: 'rgb(232, 232, 232)' }}>
            <Button component={Link} to="/periods">
              Périodes
            </Button>
            <Button component={Link} to="/banks">
              Banques
            </Button>
            <Button component={Link} to="/recurrent-operations">
              Opérations récurrentes
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default withRouter(Header);
