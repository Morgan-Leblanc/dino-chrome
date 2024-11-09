const Score = require('../../../models/Score');
const mongoose = require('mongoose');

describe('Score Model', () => {

  it('should validate required fields', async () => {
    try {
      await Score.create({});
      fail('Should not create score without required fields');
    } catch (error) {
      expect(error.errors.userId).toBeDefined();
      expect(error.errors.score).toBeDefined();
      expect(error.errors.duration).toBeDefined();
      expect(error.errors.distance).toBeDefined();
    }
  });

  it('should create valid score', async () => {
    const scoreData = {
      userId: new mongoose.Types.ObjectId(),
      score: 100,
      duration: 60,
      obstacles: 5,
      distance: 1000
    };

    const score = await Score.create(scoreData);
    expect(score).toMatchObject(scoreData);
  }, 10000);
});
