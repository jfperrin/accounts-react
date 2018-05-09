import { GraphQLObjectType } from 'graphql';
import balancesMutations from './balances';
import bankMutations from './banks';
import periodMutations from './periods';
import operationMutations from './operations';
import userMutations from './users';
import recurrentOperationMutations from './recurrentOperations';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...bankMutations,
    ...periodMutations,
    ...recurrentOperationMutations,
    ...operationMutations,
    ...balancesMutations,
    ...userMutations,
  }
});
