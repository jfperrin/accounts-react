import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import PeriodsModel from '../../models/periods';
import PeriodsType from '../types/periodsType';

export default {
  periods: {
    type: new GraphQLList(PeriodsType),
    resolve(parentValue, args, req) {
      return PeriodsModel.find({ user: req.user });
    },
  },
  period: {
    type: PeriodsType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parentValue, { id }, req) {
      return PeriodsModel.findOne({ _id: id, user: req.user });
    },
  },
  currentPeriod: {
    type: PeriodsType,
    resolve(parentValue, args, req) {
      return PeriodsModel.findOne({ user: req.user, month: new Date().getMonth() + 1, year: new Date().getFullYear() });
    },
  },
};
