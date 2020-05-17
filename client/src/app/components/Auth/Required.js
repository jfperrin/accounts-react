import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../Users/gqlQueries/currentUser';
import { withRouter } from "react-router-dom";

export default (WrappedComponent) => {
  class AuthRequired extends Component {
    componentDidUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(withRouter(AuthRequired));
};
