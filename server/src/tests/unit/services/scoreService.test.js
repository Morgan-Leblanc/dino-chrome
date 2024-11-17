import  ScoreService  from '../../../services/scoreService.js';
import  Score  from '../../../models/ScoreModel.js';
import  User  from '../../../models/UserModel.js';

describe('ScoreService', () => {
  let testUser;

  beforeEach(async () => {
    testUser = await User.create({
      accountName: 'testuser',
      username: 'Test User',
      password: 'password123'
    });

    await Score.create({
      userId: testUser._id,
      score: 100,
    });
  });

  it('should get top scores', async () => {
    const topScores = await ScoreService.getTopThreeScores();
    expect(topScores).toBeDefined();
  });
});
