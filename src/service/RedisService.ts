import {createClient, RedisClientType} from 'redis';

export const redisClient: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});

export const redisConnect = () => {
  if (!redisClient.isOpen) {
    redisClient.connect();
  }
};
