const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');
const { generateToken } = require('../../services/authService');

describe('Score Routes', () => {
  let token;
  let testUser;

  beforeEach(async () => {
    testUser = await User.create({
      accountName: 'testuser',
      username: 'Test User',
      password: 'password123',
    });

    token = generateToken(testUser._id );
  });

  it('should save new score', async () => {
    const scoreData = {
      score: 100,
      duration: 60,
      obstacles: 5,
      distance: 1000
    };

    const response = await request(app)
      .post('/api/scores')
      .set('Authorization', `Bearer ${token}`)
      .send(scoreData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('score', 100);
  });
});
