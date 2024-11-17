import Score from '../models/ScoreModel.js';

const createScore = async ({ score, userId }) => {
  const newScore = new Score({ score, userId });
  return await newScore.save();
};

const getTopThreeScores = async (userId) => {
  try {
    const topScores = await Score.find({ userId })
      .sort({ score: -1 }) 
      .limit(3) 
      .select('score createdAt') 
      .lean(); 

    return topScores;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

const ScoreService = {
  createScore,
  getTopThreeScores
};

export default ScoreService; 