const Score = require('../models/Score');
const mongoose = require('mongoose');

class ScoreService {
  static async createScore(scoreData) {
    return Score.create(scoreData);
  }

  static async getPersonalBestScore(userId) {
    const bestScore = await Score.findOne({ userId })
      .sort({ score: -1 })
      .select('score')
      .lean();
    return bestScore?.score || 0;
  }

  static async getScoreHistory(userId, limit = 10) {
    return await Score.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('score createdAt')
      .lean();
  }

  static async getTopScores(limit = 10) {
    return await Score.find()
      .sort({ score: -1 })
      .limit(limit)
      .populate('userId', 'username accountName')
      .lean();
  }

  static async getUserStats(userId) {
    const stats = await Score.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalGames: { $sum: 1 },
          bestScore: { $max: '$score' },
          averageScore: { $avg: '$score' },
          totalDistance: { $sum: '$distance' },
          totalObstacles: { $sum: '$obstacles' }
        }
      }
    ]);
    return stats[0] || null;
  }
}

module.exports = ScoreService; 