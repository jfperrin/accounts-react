import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID
} from 'graphql';

const GraphQLObject = new GraphQLObjectType({
  name: 'RecurrentOperationsType',
  fields: () => ({
    id: { type: GraphQLID },
    label: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    day: { type: GraphQLInt },
  })
});

export default GraphQLObject;
