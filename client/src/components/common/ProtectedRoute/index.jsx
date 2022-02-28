import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import currentUserQuery from '../../Users/gqlQueries/currentUser';

const ProtectedRoute = ({ children }) => {
  const { loading, data } = useQuery(currentUserQuery);

  if (!loading && !data.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
