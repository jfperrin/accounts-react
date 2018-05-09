import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import RecurrentOperationsModel from '../../models/recurrentOperations';
import RecurrentOperationsType from '../types/recurrentOperationsType';


export default {
  recurrentOperations: {
    type: new GraphQLList(RecurrentOperationsType),
    resolve(parentValue, args, req) {
      return RecurrentOperationsModel.find({ user: req.user });
    },
  },
  recurrentOperation: {
    type: RecurrentOperationsType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parentValue, { id }, req) {
      return RecurrentOperationsModel.findOne({ _id: id, user: req.user });
    },
  },
};
