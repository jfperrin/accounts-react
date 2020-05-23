import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { toIdValue } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      bank: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'BanksType', id: args.id })),
      period: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'PeriodsType', id: args.id })),
      balance: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'BalancesType', id: args.id })),
      operation: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'OperationsType', id: args.id })),
      recurrentOperation: (_, args) =>
        toIdValue(
          cache.config.dataIdFromObject({
            __typename: 'RecurrentOperationsType',
            id: args.id,
          }),
        ),
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
