import PeriodModel from '../../models/periods';
import OperationType from './operationsType';
import BalanceType from './balancesType';
import GraphQLDate from 'graphql-date';

const {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat,
} = require('graphql');

const GraphQLBalance = new GraphQLObjectType({
  name: 'GraphQLBalance',
  fields: () => ({
    banks: { type: GraphQLFloat },
    operations: { type: GraphQLFloat },
  }),
});

const GraphQLObject = new GraphQLObjectType({
  name: 'PeriodsType',
  fields: () => ({
    id: { type: GraphQLID },
    month: { type: GraphQLInt },
    year: { type: GraphQLInt },
    archivedAt: { type: GraphQLDate },
    balance: {
      type: GraphQLBalance,
      resolve(parentValue, args, req) {
        return PeriodModel.periodBalance(parentValue.id, req.user);
      },
    },
    display: {
      type: GraphQLString,
      resolve(parentValue) {
        return `${parentValue.month}-${parentValue.year}`;
      },
    },
    operations: {
      type: new GraphQLList(OperationType),
      resolve(parentValue, args, req) {
        return PeriodModel.findOperations(parentValue.id, req.user);
      }
    },
    balances: {
      type: new GraphQLList(BalanceType),
      resolve(parentValue, args, req) {
        return PeriodModel.findBalances(parentValue.id, req.user);
      }
    }
  })
});

export default GraphQLObject;
