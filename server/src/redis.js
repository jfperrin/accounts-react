import Redis from 'redis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const port = process.env.REDIS_PORT || '6379';
const host = process.env.REDIS_URI || 'localhost';
const password = process.env.REDIS_PWD;

const client = Redis.createClient({ host, password, port });

const pubSubClient = new RedisPubSub({
  connection: { host, password, port },
});

export const graphQLPubsub = pubSubClient;
export const publisher = client;

export const deleteBankChanel = `deleteBank${process.env.NODE_ENV}`;
export const updateBankChanel = `updateBank${process.env.NODE_ENV}`;
export const createBankChanel = `createBank${process.env.NODE_ENV}`;

