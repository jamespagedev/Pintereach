const request = require('supertest');
const authRouter = require('../authRouter.js');
const server = require('../../server.js');

describe('authRouter.js', () => {
  it('POST /auth/login', async () => {
    const user = {
      username: 'jamespage',
      password: 'pass123'
    };
    let response = await request(server)
      .post('/auth/login')
      .send(user);

    expect(response.status).toBe(201);
  });
});
