import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from '../../redis';

const limiter = new RateLimiterRedis({
  storeClient: redis,
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
