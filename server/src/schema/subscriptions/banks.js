import { withFilter } from 'graphql-subscriptions';
import {
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';
import {
  graphQLPubsub,
  updateBankChanel,
  createBankChanel,
  deleteBankChanel,
} from '../../redis';

import BankType from '../types/banksType';

export default {
  createBank: {
    type: BankType,
    resolve: (payload) => {
      return payload;
    },
    subscribe: () => graphQLPubsub.asyncIterator(createBankChanel),
  },
  deleteBank: {
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    type: BankType,
    resolve: (payload) => {
      return payload;
    },
    subscribe: withFilter(() => graphQLPubsub.asyncIterator(deleteBankChanel), (bank, variables) => {
      return bank._id === variables.id;
    }),
  },
  updateBank: {
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    type: BankType,
    resolve: (payload) => {
      payload.id = payload._id;
      return payload;
    },
    subscribe: withFilter(() => graphQLPubsub.asyncIterator(updateBankChanel), (bank, variables) => {
      return bank._id === variables.id;
    }),
  },
};
