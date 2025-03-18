import { GraphQLID, GraphQLFloat } from 'graphql';
import BalanceType from '../types/balancesType';
import BalanceModel from '../../models/balances';

export default {
  deleteBalance: {
    type: BalanceType,
    args: { id: { type: GraphQLID } },
    resolve(parentValue, { id }) {
      return BalanceModel.deleteOne({ _id: id });
    },
  },
  updateBalance: {
    type: BalanceType,
    args: {
      id: { type: GraphQLID },
      amount: { type: GraphQLFloat },
    },
    resolve(parentValue, args) {
      return BalanceModel.findOne({ _id: args.id }).then(balance => {
        Object.assign(balance, { amount: args.amount });
        balance.save();
        return balance;
      });
    },
  },
};
