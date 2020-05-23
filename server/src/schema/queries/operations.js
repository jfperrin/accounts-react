import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import OperationsModel from '../../models/operations';
import OperationsType from '../types/operationsType';

export default {
  operations: {
    type: new GraphQLList(OperationsType),
    resolve(parentValue, args, req) {
      return OperationsModel.find({ user: req.user });
    },
  },
  operation: {
    type: OperationsType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parentValue, { id }, req) {
      return OperationsModel.findOne({ id, user: req.user });
    },
  },
};
