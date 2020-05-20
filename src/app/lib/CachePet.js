import Redis from 'ioredis';
import cacheConfig from '../../config/cache';

const client = new Redis(cacheConfig.config.redis);

class CachePet {
  async save(key, value) {
    await client.set(key, JSON.stringify(value));
  }

  async recover(key) {
    const data = await client.get(key);
    const parsedData = JSON.parse(data);

    return parsedData;
  }

  async invalidatePrefix(prefix) {
    const keys = await client.keys(`${prefix}`);
    const pipeline = client.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

export default new CachePet();
