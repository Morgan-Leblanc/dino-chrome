const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
  static async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });
    const token = AuthService.generateToken(user._id);
    return { user: AuthService.sanitizeUser(user), token };
  }

  static async login(accountName, password) {
    const user = await User.findOne({ accountName });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Identifiants invalides');
    }
    const token = AuthService.generateToken(user._id);
    return { user: AuthService.sanitizeUser(user), token };
  }

  static generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
  }

  static sanitizeUser(user) {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
  }
}

module.exports = AuthService; 