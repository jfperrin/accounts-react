import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate, useLocation } from 'react-router';
import currentUserQuery from '../../Users/gqlQueries/currentUser';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { loading, data } = useQuery(currentUserQuery);

  if (!loading && !data?.user) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
