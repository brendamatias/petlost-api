import request from 'supertest';
import mongoose from 'mongoose';
import faker from 'faker';

import app from '../../../src/app';
import factory from '../../factories';
import shutdownRedis from '../../utils/shutdownRedis';

describe('Store user', () => {
  let userOne = null;
  let userTwo = null;

  beforeAll(async () => {
    userOne = await factory.create('User', { password: '123456' });
    userTwo = await factory.create('User', {
      email: 'email@teste.com',
      password: '123456',
    });
  });

  afterAll(async (done) => {
    await mongoose.disconnect();
    await shutdownRedis();
    done();
  });

  it('should update the user name successfully', async () => {
    const newName = faker.name.findName();

    const response = await request(app)
      .put(`/users/${userOne.id}`)
      .send({ name: newName })
      .set('Authorization', `Bearer ${userOne.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('name', newName);
  });

  it('should update the user email successfully', async () => {
    const response = await request(app)
      .put(`/users/${userOne.id}`)
      .send({ email: 'newemail@teste.com' })
      .set('Authorization', `Bearer ${userOne.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('email', 'newemail@teste.com');
  });

  it('should not update user with invalid id', async () => {
    const response = await request(app)
      .put(`/users/${userOne.id}1231231231`)
      .send({ email: userTwo.email })
      .set('Authorization', `Bearer ${userOne.generateToken()}`);

    expect(response.status).toBe(401);
  });

  it('should not update the user email with existing a email', async () => {
    const response = await request(app)
      .put(`/users/${userOne.id}`)
      .send({ email: userTwo.email })
      .set('Authorization', `Bearer ${userOne.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should update the user password successfully', async () => {
    const response = await request(app)
      .put(`/users/${userOne.id}`)
      .send({
        oldPassword: '123456',
        password: '123123',
        confirmPassword: '123123',
      })
      .set('Authorization', `Bearer ${userOne.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not update the user password with a password less than 6 characters', async () => {
    const response = await request(app)
      .put(`/users/${userTwo.id}`)
      .send({
        oldPassword: '123456',
        password: '123',
        confirmPassword: '123',
      })
      .set('Authorization', `Bearer ${userTwo.generateToken()}`);

    expect(response.status).toBe(401);
  });

  it('should not update the user password without oldPassword', async () => {
    const response = await request(app)
      .put(`/users/${userTwo.id}`)
      .send({
        password: '123',
        confirmPassword: '123',
      })
      .set('Authorization', `Bearer ${userTwo.generateToken()}`);

    expect(response.status).toBe(401);
  });

  it('should not update the user password with invalid oldPassword', async () => {
    const response = await request(app)
      .put(`/users/${userTwo.id}`)
      .send({
        oldPassword: '123456789',
        password: '1234567',
        confirmPassword: '1234567',
      })
      .set('Authorization', `Bearer ${userTwo.generateToken()}`);

    expect(response.status).toBe(401);
  });

  it('should not update the user password without confirmPassword', async () => {
    const response = await request(app)
      .put(`/users/${userTwo.id}`)
      .send({
        oldPassword: '123456',
        password: '1234567',
      })
      .set('Authorization', `Bearer ${userTwo.generateToken()}`);

    expect(response.status).toBe(401);
  });

  it('should not update the user password without password', async () => {
    const response = await request(app)
      .put(`/users/${userTwo.id}`)
      .send({
        oldPassword: '123456',
        confirmPassword: '1234567',
      })
      .set('Authorization', `Bearer ${userTwo.generateToken()}`);

    expect(response.status).toBe(401);
  });

  it('should not update the user password with different password than password confirmation', async () => {
    const response = await request(app)
      .put(`/users/${userTwo.id}`)
      .send({
        oldPassword: '123456',
        password: '123456789',
        confirmPassword: '1234567',
      })
      .set('Authorization', `Bearer ${userTwo.generateToken()}`);

    expect(response.status).toBe(401);
  });

  it('should not update a user that i dont have access', async () => {
    const response = await request(app)
      .put(`/users/${userOne.id}`)
      .send({
        name: faker.name.findName(),
      })
      .set('Authorization', `Bearer ${userTwo.generateToken()}`);

    expect(response.status).toBe(401);
  });
});
