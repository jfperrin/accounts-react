import {
  GraphQLString,
} from 'graphql';
import UserType from '../types/usersType';
import { signup, logout, login } from '../../services/auth';

export default {
  signup: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      nickname: { type: GraphQLString },
    },
    resolve(parentValue, { email, password, firstname, lastname, nickname }, req) {
      return signup({ email, password, firstname, lastname, nickname, req });
    },
  },
  logout: {
    type: UserType,
    resolve(parentValue, args, req) {
      return logout(req)
    },
  },
  login: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve(parentValue, { email, password }, req) {
      return login({ email, password, req });
    },
  }
};
