const UserService = require('../../../services/userService');
const User = require('../../../models/User');

describe('UserService', () => {
  let testUser;

  beforeEach(async () => {
    testUser = await User.create({
      accountName: 'testuser',
      username: 'Test User',
      password: 'password123'
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const user = await UserService.findById(testUser._id);
      expect(user).toHaveProperty('accountName', 'testuser');
    });
  });

  describe('updateUser', () => {
    it('should update user profile', async () => {
      const updatedUser = await UserService.updateUser(testUser._id, {
        username: 'Updated Name'
      });
      expect(updatedUser).toHaveProperty('username', 'Updated Name');
    });
  });
});
