import BalancesModel from '../../models/balances';
import BankType from './banksType';
import PeriodType from './periodsType';
import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

const GraphQLObject = new GraphQLObjectType({
  name: 'BalancesType',
  fields: {
    id: { type: GraphQLID },
    amount: { type: GraphQLFloat },
    bank: {
      type: BankType,
      resolve: (parentValue, args, req) => {
        return BalancesModel.findOne({ _id: parentValue, user: req.user}).populate('bank')
          .then(balance => {
            return balance.bank
          });
      }
    },
    period: {
      type: PeriodType,
      resolve(parentValue) {
        return BalancesModel.findOne({ _id: parentValue, user: req.user}).populate('period')
          .then(balance => {
            return balance.period;
          });
      },
    },
  }
});

export default GraphQLObject;
