import {
  publisher,
  updateBankChanel,
  createBankChanel,
  deleteBankChanel,
} from '../../redis';
import {
  GraphQLString,
  GraphQLID
} from 'graphql';
import BankType from '../types/banksType';
import BankModel from '../../models/banks';


export default {
  addBank: {
    type: BankType,
    args: {
      label: { type: GraphQLString }
    },
    resolve(parentValue, { label }, req) {
      const result = new BankModel({ label, user: req.user }).save();
      result.then((newBank) => {
        publisher.publish(createBankChanel, newBank);
      });
      return result;
    }
  },
  deleteBank: {
    type: BankType,
    args: { id: { type: GraphQLID } },
    resolve(parentValue, { id }, req) {
      return BankModel.remove({ _id: id, user: req.user }).then(() => {
        const deletedBank = { _id: id, id, isDeleted: true };
        publisher.publish(deleteBankChanel, JSON.stringify(deletedBank));
        return deletedBank;
      });
    }
  },
  updateBank: {
    type: BankType,
    args: {
      id: { type: GraphQLID },
      label: { type: GraphQLString }
    },
    resolve(parentValue, args, req) {
      return BankModel.findOne({ _id: args.id, user: req.user }).then((bank) => {
        Object.assign(bank, { label: args.label, user: req.user });
        bank.save();
        publisher.publish(updateBankChanel, JSON.stringify(bank.toObject()));
        return bank;
      });
    }
  }
};
