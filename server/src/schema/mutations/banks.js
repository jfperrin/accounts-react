import { GraphQLString, GraphQLID } from 'graphql';
import BankType from '../types/banksType';
import BankModel from '../../models/banks';

export default {
  addBank: {
    type: BankType,
    args: {
      label: { type: GraphQLString },
    },
    resolve(parentValue, { label }, req) {
      return new BankModel({ label, user: req.user }).save();
    },
  },
  deleteBank: {
    type: BankType,
    args: { id: { type: GraphQLID } },
    resolve(parentValue, { id }, req) {
      return BankModel.remove({ _id: id, user: req.user }).then(() => {
        return { _id: id, id, isDeleted: true };
      });
    },
  },
  updateBank: {
    type: BankType,
    args: {
      id: { type: GraphQLID },
      label: { type: GraphQLString },
    },
    resolve(parentValue, args, req) {
      return BankModel.findOne({ _id: args.id, user: req.user }).then(bank => {
        Object.assign(bank, { label: args.label, user: req.user });
        bank.save();
        return bank;
      });
    },
  },
};
