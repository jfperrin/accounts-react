import { GraphQLObjectType } from 'graphql';
import BankQueries from './banks';
import BankPeriodBalanceQueries from './balances';
import PeriodQueries from './periods';
import OperationsQueries from './operations';
import RecurrentOperationsQueries from './recurrentOperations';
import UserQueries from './users';

export default new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...BankQueries,
    ...BankPeriodBalanceQueries,
    ...PeriodQueries,
    ...OperationsQueries,
    ...RecurrentOperationsQueries,
    ...UserQueries,
  },
});
