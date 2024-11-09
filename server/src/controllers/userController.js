const UserService = require('../services/userService');
const ScoreService = require('../services/scoreService');

class UserController {
  static async getProfile(req, res) {
    try {
      const user = await UserService.findById(req.user.id);
      const stats = await ScoreService.getUserStats(req.user.id);
      const recentScores = await ScoreService.getScoreHistory(req.user.id, 10);

      res.json({
        user,
        stats,
        recentScores
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const user = await UserService.updateUser(req.user.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController; 