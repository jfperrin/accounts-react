import {
  GraphQLObjectType,
} from 'graphql';
import BankSubscription from './banks';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...BankSubscription,
  }
});
