import BanksModel from '../../models/banks';
import BanksType from '../types/banksType';
import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';

export default {
  banks: {
    type: new GraphQLList(BanksType),
    resolve(parentValue, args, req) {
      return BanksModel.find({ user: req.user });
    },
  },
  bank: {
    type: BanksType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parentValue, { id }, req) {
      return BanksModel.findOne({ _id: id, user: req.user });
    },
  },
};
