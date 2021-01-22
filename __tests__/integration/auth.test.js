import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';

import factory from '../factories';

describe('Authentication', () => {
  let user = null;

  beforeAll(async () => {
    user = await factory.create('User', { password: '123456' });
  });

  afterAll(async (done) => {
    await mongoose.disconnect();
    done();
  });

  it('should receive JWT token when authenticated with valid credentials', async () => {
    const response = await request(app).post('/auth').send({
      email: user.email,
      password: '123456',
    });

    expect(response.status).toBe(201);
  });

  it('should not authenticated with invalid credentials', async () => {
    const response = await request(app)
      .post('/auth')
      .send({ email: user.email, password: '123123' });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const response = await request(app)
      .post('/auth')
      .send({ email: user.email, password: '123456' });

    expect(response.body.data).toHaveProperty('token');
  });

  it('should be able to access private routes when authenticated', async () => {
    const response = await request(app)
      .get('/pets')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app).get('/pets');

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const response = await request(app)
      .get('/adresses')
      .set('Authorization', 'Bearer 123123');

    expect(response.status).toBe(401);
  });
});
