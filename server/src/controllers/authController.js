const AuthService = require('../services/authService');

class AuthController {
  static async register(req, res) {
    try {
      const { accountName, username, password } = req.body;
      const result = await AuthService.register({ accountName, username, password });
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { accountName, password } = req.body;
      const result = await AuthService.login(accountName, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController; 