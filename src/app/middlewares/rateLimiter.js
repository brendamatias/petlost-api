import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

async function rateLimiter(req, res, next) {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch (err) {
    return res.status(429).json({ message: 'Too many Requests' });
  }
}

export default rateLimiter;
