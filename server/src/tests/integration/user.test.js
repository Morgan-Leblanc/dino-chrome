import request from 'supertest';
import app from '../../server';
import User from '../../models/UserModel.js';
import AuthService from '../../services/authService.js';

describe('User Routes', () => {
  let token;
  let testUser;

  beforeEach(async () => {
    testUser = await User.create({
      accountName: 'testuser',
      username: 'Test User',
      password: 'password123'
    });

    token = AuthService.generateToken(testUser._id);
  });

  describe('GET /api/users/me', () => {
    it('should get user profile', async () => {
      const response = await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`);
        
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('accountName', 'testuser');
      expect(response.body.user).toHaveProperty('username', 'Test User');
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });
});
