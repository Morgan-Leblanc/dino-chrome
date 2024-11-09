
const ScoreService = require('../../../services/scoreService');
const Score = require('../../../models/Score');
const User = require('../../../models/User');

describe('ScoreService', () => {
  let testUser;

  beforeEach(async () => {
    testUser = await User.create({
      accountName: 'testuser',
      username: 'Test User',
      email: 'test@test.com',
      password: 'password123'
    });

    await Score.create({
      userId: testUser._id,
      score: 100,
      distance: 1000,  
      duration: 60,    
      obstacles: 5
    });
  });

  it('should get top scores', async () => {
    const topScores = await ScoreService.getTopScores();
    expect(topScores).toBeDefined();
  });
});
