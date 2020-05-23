import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
  name: 'UsersType',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    nickname: { type: GraphQLString },
  }),
});
