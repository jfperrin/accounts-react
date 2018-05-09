import {
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} from 'graphql';
import RecurrentOperationsType from '../types/recurrentOperationsType';
import RecurrentOperationsModel from '../../models/recurrentOperations';

export default {
  addRecurrentOperation: {
    type: RecurrentOperationsType,
    args: {
      label: { type: GraphQLString },
      amount: { type: GraphQLFloat },
      day: { type: GraphQLInt },
    },
    resolve(parentValue, { label, amount, day }, req) {
      return (new RecurrentOperationsModel({ label, amount, day, user: req.user })).save()
    }
  },
  deleteRecurrentOperation: {
    type: RecurrentOperationsType,
    args: {
      id: { type: GraphQLID },
      },
    resolve(parentValue, { id }, req) {
      return RecurrentOperationsModel.remove({ _id: id, user: req.user });
    }
  },
  updateRecurrentOperation: {
    type: RecurrentOperationsType,
    args: {
      id: { type: GraphQLID },
      label: { type: GraphQLString },
      amount: { type: GraphQLFloat },
      day: { type: GraphQLInt },
    },
    resolve(parentValue, { id, label, amount, day }, req) {
      return RecurrentOperationsModel.findOne({ _id: id, user: req.user }).then((recurrentOperation) => {
        Object.assign(recurrentOperation, { label, amount, day, user: req.user });
        recurrentOperation.save();
        return recurrentOperation;
      });
    }
  }
};
