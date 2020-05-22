import React, { useLayoutEffect } from 'react';
import { useQuery } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import currentUserQuery from '../Users/gqlQueries/currentUser';

export default WrappedComponent => {
  const AuthRequired = props => {
    const { loading, data } = useQuery(currentUserQuery);

    useLayoutEffect(() => {
      if (!loading && !data.user) {
        props.history.push('/login');
      }
    });

    return <WrappedComponent {...props} />;
  };

  return withRouter(AuthRequired);
};
