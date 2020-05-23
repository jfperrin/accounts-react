import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';

const GraphQLObject = new GraphQLObjectType({
  name: 'BanksType',
  fields: () => ({
    id: { type: GraphQLID },
    label: { type: GraphQLString },
    isDeleted: { type: GraphQLBoolean },
  }),
});

export default GraphQLObject;
