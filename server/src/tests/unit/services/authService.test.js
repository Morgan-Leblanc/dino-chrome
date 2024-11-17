
import AuthService from '../../../services/authService';

describe('AuthService', () => {
  describe('register', () => {
    it('should create new user and return token', async () => {
      const userData = {
        accountName: 'testuser',
        username: 'Test User',
        password: 'password123'
      };

      const result = await AuthService.register(userData);

      expect(result).toHaveProperty('token');
      expect(result.user).toHaveProperty('accountName', userData.accountName);
      expect(result.user).not.toHaveProperty('password');
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await AuthService.register({
        accountName: 'testuser',
        username: 'Test User',
        password: 'password123'
      });
    });

    it('should login user with correct credentials', async () => {
      const result = await AuthService.login('testuser', 'password123');

      expect(result).toHaveProperty('token');
      expect(result.user).toHaveProperty('accountName', 'testuser');
    });
  });
});
