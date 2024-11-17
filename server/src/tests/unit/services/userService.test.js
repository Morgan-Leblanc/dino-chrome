import  UserService  from '../../../services/userService.js';
import  User  from '../../../models/UserModel.js';

describe('UserService', () => {
  let testUser;

  beforeEach(async () => {
    testUser = await User.create({
      username: 'Test User',
      accountName: 'testuser',
      password: 'password123'
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const user = await UserService.findById(testUser._id);
      expect(user).toHaveProperty('accountName', 'testuser');
    });
  });
});
