import UserType from '../types/usersType';

export default {
  user: {
    type: UserType,
    resolve(parentValue, args, req) {
      return req.user;
    },
  },
};
