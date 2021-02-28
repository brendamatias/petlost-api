import request from 'supertest';

import { v4 as uuidv4 } from 'uuid';
import app from '../../../src/app';
import factory from '../../factories';
import shutdownRedis from '../../utils/shutdownRedis';

describe('Show user', () => {
  let user = null;
  let token = null;

  beforeAll(async () => {
    user = await factory.create('User', { password: '123456' });
    token = user.generateToken();
  });

  afterAll(async (done) => {
    await shutdownRedis();
    done();
  });

  it('should show user successfully', async () => {
    const response = await request(app)
      .get(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('email', user.email);
  });

  it('should not show user with invalid id', async () => {
    const uuid = uuidv4();
    const response = await request(app)
      .get(`/users/${uuid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it('should not show user without jwt token', async () => {
    const response = await request(app)
      .get(`/users/${user.id}`)
      .set('Authorization', 'Bearer 123123');

    expect(response.status).toBe(401);
  });

  it('should not show user with invalid jwt token', async () => {
    const response = await request(app)
      .get(`/users/${user.id}`)
      .set('Authorization', 'Bearer 123123');

    expect(response.status).toBe(401);
  });
});
