import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      bank: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'BanksType', id }),
      period: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'PeriodsType', id }),
      balance: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'BalancesType', id }),
      operation: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'OperationsType', id }),
      recurrentOperation: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'RecurrentOperationsType', id }),
    },
  },
});

const GRAPHQL_URI = `://${window.location.host}/graphql`;
const GRAPHQL_URI_PREFIX = process.env.NODE_ENV !== 'production' ? 'http' : 'https';
const httpLink = new HttpLink({
  uri: GRAPHQL_URI_PREFIX + GRAPHQL_URI,
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link: ApolloLink.from([onErrorLink, httpLink]),
  cache,
});

export default client;
