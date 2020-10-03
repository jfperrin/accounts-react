import 'antd/dist/antd.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout } from 'antd';
import HeaderAccount from './Header/Header';
import Banks from './Banks';
import Periods from './Periods';
import RecurrentOperations from './RecurrentOperations';
import Period from './Periods/Show';
import Home from './Home';
import Login from './Users/Login/Form';
import Signup from './Users/Signup/Form';
import AuthRequired from './Auth/Required';
import client from '../../apolloClient';
import './stylesheet.scss';

const { Header, Content } = Layout;

export default function () {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Header>
          <HeaderAccount />
        </Header>
        <Content>
          <Route exact path="/" component={AuthRequired(Home)} />
          <Route path="/banks" component={AuthRequired(Banks)} />
          <Route path="/periods" component={AuthRequired(Periods)} />
          <Route path="/period/:id" component={AuthRequired(Period)} />
          <Route path="/recurrent-operations" component={AuthRequired(RecurrentOperations)} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Content>
      </Layout>
    </ApolloProvider>
  );
}
