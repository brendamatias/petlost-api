import redis from '../src/redis';

export default async () => {
  await new Promise((resolve) => {
    redis.quit(() => {
      resolve();
    });
  });

  await new Promise((resolve) => setImmediate(resolve));
};
