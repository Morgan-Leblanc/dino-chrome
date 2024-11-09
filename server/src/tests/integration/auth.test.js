const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');

describe('Auth Routes', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          accountName: 'testuser',
          username: 'Test User',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('accountName', 'testuser');
    });

    it('should not register user with existing accountName', async () => {
      await User.create({
        accountName: 'testuser',
        username: 'Test User',
        password: 'password123'
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          accountName: 'testuser',
          username: 'Another User',
          password: 'password123'
        });

      expect(response.status).toBe(400);
    });
  });
});
