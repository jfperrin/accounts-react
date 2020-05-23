import { GraphQLID, GraphQLString, GraphQLFloat } from 'graphql';
import GraphQLDate from 'graphql-date';
import OperationType from '../types/operationsType';
import OperationModel from '../../models/operations';

export default {
  updateOperation: {
    type: OperationType,
    args: {
      id: { type: GraphQLID },
      amount: { type: GraphQLFloat },
      label: { type: GraphQLString },
      dt: { type: GraphQLDate },
    },
    resolve(parentValue, args, req) {
      return OperationModel.findOne({ _id: args.id, user: req.user }).then(operation => {
        Object.assign(operation, { label: args.label, amount: args.amount, dt: args.dt, user: req.user });
        return operation.save().then(operation => operation);
      });
    },
  },
  pointOperation: {
    type: OperationType,
    args: {
      id: { type: GraphQLID },
    },
    resolve(parentValue, { id }, req) {
      return OperationModel.findOne({ _id: id, user: req.user }).then(operation => {
        if (operation.pointedAt) {
          operation.pointedAt = null;
        } else {
          operation.pointedAt = new Date();
        }
        return operation.save().then(operation => operation);
      });
    },
  },
};
