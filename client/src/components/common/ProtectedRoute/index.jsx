import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate, Outlet } from 'react-router-dom';
import currentUserQuery from '../../Users/gqlQueries/currentUser';

const ProtectedRoute = () => {
  const { loading, data } = useQuery(currentUserQuery);

  return !loading && !data.user ? <Navigate to={'/login'} /> : <Outlet />;
};

export default ProtectedRoute;
