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

const getLeaderboard = async () => {
  try {
    const topScores = await Score.find()
      .sort({ score: -1 })
      .limit(10)
      .populate({
        path: 'userId',
        select: 'username'
      })
      .select('score createdAt userId')
      .lean();

    const formattedScores = topScores.map(score => ({
      score: score.score,
      createdAt: score.createdAt,
      username: score.userId?.username || 'Unknown Player'
    }));

    return formattedScores; 
  } catch (error) {
    console.error('Error in getLeaderboard:', error);
    throw new Error(`Error fetching leaderboard: ${error.message}`);
  }
};

const ScoreService = {
  createScore,
  getTopThreeScores,
  getLeaderboard
};

export default ScoreService; 