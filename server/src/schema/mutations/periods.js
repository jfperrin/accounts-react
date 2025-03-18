import { GraphQLInt, GraphQLID, GraphQLString, GraphQLFloat } from 'graphql';
import PeriodType from '../types/periodsType';
import PeriodModel from '../../models/periods';

export default {
  addPeriod: {
    type: PeriodType,
    args: {
      month: { type: GraphQLInt },
      year: { type: GraphQLInt },
    },
    resolve(parentValue, { month, year }, req) {
      return new PeriodModel({ month, year, user: req.user }).save();
    },
  },
  deletePeriod: {
    type: PeriodType,
    args: {
      id: { type: GraphQLID },
    },
    resolve(parentValue, { id }, req) {
      return PeriodModel.deleteOne({ _id: id, user: req.user });
    },
  },
  updatePeriod: {
    type: PeriodType,
    args: {
      id: { type: GraphQLID },
      month: { type: GraphQLInt },
      year: { type: GraphQLInt },
    },
    resolve(parentValue, args, req) {
      return PeriodModel.findOne({ _id: args.id }).then(period => {
        Object.assign(period, { month: args.month, year: args.year, user: req.user });
        period.save();
        return period;
      });
    },
  },
  addOperation: {
    type: PeriodType,
    args: {
      label: { type: GraphQLString },
      dt: { type: GraphQLString },
      amount: { type: GraphQLFloat },
      periodId: { type: GraphQLID },
    },
    resolve(parentValue, { periodId, label, dt, amount }, req) {
      return PeriodModel.addOperation(periodId, label, dt, amount, req.user);
    },
  },
  deleteOperation: {
    type: PeriodType,
    args: {
      id: { type: GraphQLID },
      idOperation: { type: GraphQLID },
    },
    resolve(parentValue, { id, idOperation }, req) {
      console.log('deleteOperation',id, idOperation)
      return PeriodModel.deleteOperation(id, idOperation, req.user);
    },
  },
  importRecurrentOperations: {
    type: PeriodType,
    args: {
      id: { type: GraphQLID },
    },
    resolve(parentValue, { id }, req) {
      return PeriodModel.importRecurrentOperations(id, req.user);
    },
  },
  initializeBankBalances: {
    type: PeriodType,
    args: {
      id: { type: GraphQLID },
    },
    resolve(parentValue, { id }, req) {
      return PeriodModel.initializeBankBalances(id, req.user);
    },
  },
};
