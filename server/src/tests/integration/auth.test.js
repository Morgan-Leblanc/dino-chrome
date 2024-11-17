import request from 'supertest';
import app from '../../server';
import User from '../../models/UserModel';

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
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data.user).toHaveProperty('accountName', 'testuser');
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
