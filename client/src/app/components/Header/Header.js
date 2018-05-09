import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { graphql } from 'react-apollo';
import Signup from 'material-ui/svg-icons/social/person-add';
import LockOpened from 'material-ui/svg-icons/action/lock-open';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Button from 'material-ui/FlatButton';
import { getLayoutTitle as getLayoutTitleSelector } from '../../selectors/ui'
import Lock from 'material-ui/svg-icons/action/lock';
import query from '../Users/gqlQueries/currentUser';
import mutation from '../Users/gqlQueries/logout';
import './stylesheet.css';
import logo from './logo.svg';
import client from '../../../apolloClient';

class HeaderComponent extends Component {

  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <div style={{ marginTop: '10px' }}>
          <FloatingActionButton onClick={() => (this.handleLogout())} style={{ marginRight: '15px' }}>
            <Lock />
          </FloatingActionButton>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: '10px' }}>
          <FloatingActionButton secondary={true}
                                style={{ marginRight: '15px' }}
                                containerElement={<Link to="signup" />}>
            <Signup />
          </FloatingActionButton>
          <FloatingActionButton style={{ marginRight: '15px' }}
                                containerElement={<Link to="login" />}>
            <LockOpened />
          </FloatingActionButton>
        </div>
      );
    }
  }

  handleLogout() {
    const cookies = new Cookies();
    this.props.mutate({}).then(() => {
      cookies.remove('connect.sid');
      client.resetStore();
    });
  }

  render() {
    const { layoutTitle, data } = this.props;

    return (
      <div className={'app-header-container'}>
        <div className="app-header">
          <div className="icon">
            <Link to={'/'}>
              <img src={logo} className="app-logo" alt="logo" />
            </Link>
          </div>
          <div className={'title'}>
            <Link to={'/'}>{data.user && data.user.nickname}@Re//Account</Link>{layoutTitle && `#${layoutTitle}`}
          </div>
          <div className={'login'}>
            {this.renderButtons()}
          </div>
        </div>

        {!data.loading && data.user &&
        <Toolbar>
          <ToolbarGroup>
            <Button label="Périodes" containerElement={<Link to="/periods" />} />
            <Button label="Banques" containerElement={<Link to="/banks" />} />
            <Button label="Opérations récurrentes" containerElement={<Link to="/recurrent-operations" />} />
          </ToolbarGroup>
        </Toolbar>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    layoutTitle: getLayoutTitleSelector(state),
  };
}

export default connect(mapStateToProps, null)(graphql(mutation)(graphql(query)(HeaderComponent)));

