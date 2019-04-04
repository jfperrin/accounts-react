import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition, toIdValue } from 'apollo-utilities';
import { onError } from 'apollo-link-error';


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const GRAPHQL_URI = `://${window.location.host}/graphql`;
const GRAPHQL_URI_PREFIX = process.env.NODE_ENV !== 'production' ? 'http' : 'https';
const httpLink = new HttpLink({
  uri: GRAPHQL_URI_PREFIX + GRAPHQL_URI,
  credentials: 'same-origin',
});

// Create a WebSocket link:
console.log('window.location.host', window.location.host);
const GRAPHQL_ENDPOINT = `://${window.location.host}/graphql-subscription`;
const GRAPHQL_ENDPOINT_PREFIX = process.env.NODE_ENV !== 'production' ? 'ws' : 'wss';
const wsLink = new WebSocketLink({
  uri: GRAPHQL_ENDPOINT_PREFIX + GRAPHQL_ENDPOINT,
  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  errorLink.concat(wsLink),
  errorLink.concat(httpLink),
);

const cache = new InMemoryCache({
  cacheResolvers: {
    Query: {
      bank: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'BanksType', id: args.id })),
      period: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'PeriodsType', id: args.id })),
      balance: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'BalancesType', id: args.id })),
      operation: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'OperationsType', id: args.id })),
      recurrentOperation: (_, args) => toIdValue(cache.config.dataIdFromObject({
        __typename: 'RecurrentOperationsType',
        id: args.id
      })),
    }
  },
});

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
});

export default client;
