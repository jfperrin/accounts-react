import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import RecurrentOperations from '../RecurrentOperations';
import ProtectedRoute from '../common/ProtectedRoute';
import apolloClient from '../../config/apolloClient';
import createStore from '../../config/store';
import HeaderAccount from '../Header/Header';
import Signup from '../Users/Signup/Form';
import Login from '../Users/Login/Form';
import Period from '../Periods/Show';
import Periods from '../Periods';
import Banks from '../Banks';
import Home from '../Home';
import './stylesheet.scss';

const { Header, Content } = Layout;
const store = createStore();

const App = () => (
  <Layout>
    <BrowserRouter>
      <Header>
        <HeaderAccount />
      </Header>
      <Content>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>

          <Route exact path="/banks" element={<ProtectedRoute />}>
            <Route exact path="/banks" element={<Banks />} />
          </Route>

          <Route exact path="/periods" element={<ProtectedRoute />}>
            <Route exact path="/periods" element={<Periods />} />
          </Route>

          <Route exact path="/period/:id" element={<ProtectedRoute />}>
            <Route exact path="/period/:id" element={<Period />} />
          </Route>

          <Route exact path="/recurrent-operations" element={<ProtectedRoute />}>
            <Route exact path="/recurrent-operations" element={<RecurrentOperations />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Content>
    </BrowserRouter>
  </Layout>
);

const ProvidedApp = () => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);

export default ProvidedApp;
