const User = require('../models/User');

class UserService {
  static async findById(userId) {
    return User.findById(userId).select('-password');
  }

  static async updateUser(userId, updateData) {
    const { password, ...safeUpdateData } = updateData;
    return User.findByIdAndUpdate(
      userId,
      { $set: safeUpdateData },
      { new: true, runValidators: true }
    ).select('-password');
  }
}

module.exports = UserService;
