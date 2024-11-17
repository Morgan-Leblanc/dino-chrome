import  Score  from '../../../models/ScoreModel.js';
import mongoose from 'mongoose';

describe('Score Model', () => {

  it('should validate required fields', async () => {
    try {
      await Score.create({});
      fail('Should not create score without required fields');
    } catch (error) {
      expect(error.errors.userId).toBeDefined();
      expect(error.errors.score).toBeDefined();
    }
  });

  it('should create valid score', async () => {
    const scoreData = {
      userId: new mongoose.Types.ObjectId(),
      score: 100,
    };

    const score = await Score.create(scoreData);
    expect(score).toMatchObject(scoreData);
  });
});
