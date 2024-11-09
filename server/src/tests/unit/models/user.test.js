const User = require('../../../models/User');

describe('User Model', () => {
  it('should validate required fields', async () => {
    try {
      await User.create({});
      fail('Should not create user without required fields');
    } catch (error) {
      expect(error.errors.accountName).toBeDefined();
      expect(error.errors.password).toBeDefined();
    }
  });

  it('should not allow duplicate accountNames', async () => {
    await User.create({
      accountName: 'testuser',
      username: 'Test User',
      password: 'password123'
    });

    try {
      await User.create({
        accountName: 'testuser',
        username: 'Another User',
        password: 'password123'
      });
      fail('Should not create user with duplicate accountName');
    } catch (error) {
      expect(error.code).toBe(11000);
    }
  });
});
