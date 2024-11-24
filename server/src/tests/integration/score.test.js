import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../server.js';
import User from '../../models/UserModel.js';
import Score from '../../models/ScoreModel.js';
import AuthService from '../../services/authService.js';
const { generateToken } = AuthService;


describe('Score Routes', () => {
  let token;
  let testUser;

  beforeEach(async () => {
    await User.deleteMany({});
    await Score.deleteMany({});

    testUser = await User.create({
      accountName: 'testuser',
      username: 'Test User',
      password: 'password123'
    });

    token = generateToken(testUser._id);
  });

  describe('POST /api/scores/savescore', () => {
    it('should save a new score', async () => {
      const scoreData = {
        score: 100,
        userId: testUser._id
      };

      const response = await request(app)
        .post('/api/scores/savescore')
        .set('Authorization', `Bearer ${token}`)
        .send(scoreData);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('score', 100);
      expect(response.body.data).toHaveProperty('userId', testUser._id.toString());
    });

    it('should return a 400 error if data is missing', async () => {
      const response = await request(app)
        .post('/api/scores/savescore')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
    });

    it('should return a 401 error without token', async () => {
      const scoreData = {
        score: 100,
        userId: testUser._id
      };

      const response = await request(app)
        .post('/api/scores/savescore')
        .send(scoreData);

      expect(response.status).toBe(401);
    });
  });
});
