import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import BalancesModel from '../../models/balances';
import BalancesType from '../types/balancesType';

export default {
  balances: {
    type: new GraphQLList(BalancesType),
    resolve(parentValue, args, req) {
      return BalancesModel.find({ user: req.user });
    },
  },
  balance: {
    type: BalancesType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parentValue, { id }, req) {
      return BalancesModel.findOne({ id, user: req.user });
    },
  },
};
