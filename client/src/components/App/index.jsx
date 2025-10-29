import React from 'react';
import { Layout } from 'antd';
import { ApolloProvider } from '@apollo/client/react';
import { Route, Routes, BrowserRouter } from 'react-router';
import RecurrentOperations from '../RecurrentOperations';
import ProtectedRoute from '../common/ProtectedRoute';
import apolloClient from '../../config/apolloClient';
import HeaderAccount from '../Header/Header';
import Signup from '../Users/Signup/Form';
import Login from '../Users/Login/Form';
import Period from '../Periods/Show';
import Periods from '../Periods';
import Banks from '../Banks';
import Home from '../Home';
import './stylesheet.scss';

const { Header, Content } = Layout;

const App = () => (
  <Layout>
    <BrowserRouter>
      <Header>
        <HeaderAccount />
      </Header>
      <Content>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/banks"
            element={
              <ProtectedRoute>
                <Banks />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/periods"
            element={
              <ProtectedRoute>
                <Periods />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/period/:id"
            element={
              <ProtectedRoute>
                <Period />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/recurrent-operations"
            element={
              <ProtectedRoute>
                <RecurrentOperations />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Content>
    </BrowserRouter>
  </Layout>
);

const ProvidedApp = () => (
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);

export default ProvidedApp;
