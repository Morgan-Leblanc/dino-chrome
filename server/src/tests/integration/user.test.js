const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');
const { generateToken } = require('../../services/authService');

describe('User Routes', () => {
  let token;
  let user;

  beforeEach(async () => {
    user = await User.create({
      accountName: 'testuser',
      username: 'Test User',
      password: 'password123'
    });
    token = generateToken(user._id);
  });

  describe('GET /api/users/me', () => {
    it('should get user profile', async () => {
      const response = await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.user).toHaveProperty('accountName', 'testuser');
    });
  });

  describe('PUT /api/users/profile', () => {
    it('should update user profile', async () => {
      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'Updated Name'
        });

      console.log('Response body:', response.body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('username', 'Updated Name');
    });
  });
});
