import OperationModel from '../../models/operations';
import PeriodType from './periodsType';
import GraphQLDate from 'graphql-date';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';

const GraphQLObject = new GraphQLObjectType({
  name: 'OperationsType',
  fields: () => ({
    id: { type: GraphQLID },
    label: { type: GraphQLString },
    dt: { type: GraphQLDate },
    pointedAt: { type: GraphQLDate },
    amount: { type: GraphQLFloat },
    isRecurrent: { type: GraphQLBoolean },
    period: {
      type: PeriodType,
      resolve(parentValue, args, req) {
        return OperationModel.findOne({ _id: parentValue, user: req.user}).populate('period')
          .then(operation => {
            return operation.period;
          });
      }
    }
  })
});

export default GraphQLObject;
