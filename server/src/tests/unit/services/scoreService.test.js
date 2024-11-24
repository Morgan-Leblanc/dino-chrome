import  ScoreService  from '../../../services/scoreService.js';
import  Score  from '../../../models/scoreModel.js';
import  User  from '../../../models/UserModel.js';

describe('ScoreService', () => {
  let testUser1, testUser2, testUser3;

  beforeEach(async () => {
    testUser1 = await User.create({
      accountName: 'testuser1',
      username: 'Test User 1',
      password: 'password123'
    });

    testUser2 = await User.create({
      accountName: 'testuser2',
      username: 'Test User 2',
      password: 'password123'
    });

    testUser3 = await User.create({
      accountName: 'testuser3',
      username: 'Test User 3',
      password: 'password123'
    });

    await Score.create([
      { userId: testUser1._id, score: 200 },
      { userId: testUser2._id, score: 150 },
      { userId: testUser3._id, score: 100 },
      { userId: testUser1._id, score: 50 }
    ]);
  });

  it('should get top scores', async () => {
    const topScores = await ScoreService.getTopThreeScores();
    expect(topScores).toBeDefined();
  });

  describe('getLeaderboard', () => {
    it('should return top 10 scores in descending order', async () => {
      const leaderboard = await ScoreService.getLeaderboard();
      
      expect(leaderboard).toBeDefined();
      expect(leaderboard).toHaveLength(4);
      expect(leaderboard[0].score).toBe(200);
      expect(leaderboard[1].score).toBe(150);
      expect(leaderboard[2].score).toBe(100);
      expect(leaderboard[3].score).toBe(50);
    });

    it('should include user information in leaderboard entries', async () => {
      const leaderboard = await ScoreService.getLeaderboard();
      
      expect(leaderboard[0].username).toBeDefined();
      expect(leaderboard[0].username).toBe('Test User 1');
    });
  });
});
