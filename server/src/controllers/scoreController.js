const ScoreService = require('../services/scoreService');

class ScoreController {
  static async saveScore(req, res) {
    try {
      const scoreData = { ...req.body, userId: req.user.id };
      const score = await ScoreService.createScore(scoreData);
      res.status(201).json(score);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getTopScores(req, res) {
    try {
      const scores = await ScoreService.getTopScores();
      res.json(scores);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserScores(req, res) {
    try {
      const scores = await ScoreService.getUserScores(req.user.id);
      res.json(scores);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ScoreController; 