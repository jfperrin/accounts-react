import wsurl from 'wsurl';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const GRAPHQL_URI = `://${window.location.host}/graphql`;
const GRAPHQL_URI_PREFIX = process.env.NODE_ENV !== 'production' ? 'http' : 'https';

const httpLink = new HttpLink({
  uri: GRAPHQL_URI_PREFIX + GRAPHQL_URI,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: wsurl(GRAPHQL_URI_PREFIX + GRAPHQL_URI),
    options: {
      reconnect: true,
      lazy: true,
    },
  }),
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    cacheRedirects: {
      Query: {
        bank: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'BanksType', id }),
        period: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'PeriodsType', id }),
        balance: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'BalancesType', id }),
        operation: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'OperationsType', id }),
        recurrentOperation: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'RecurrentOperationsType', id }),
      },
    },
  }),
});

export default client;
