import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await User.create({
    ...userData,
    password: hashedPassword
  });
  const token = generateToken(user._id);
  return { user: sanitizeUser(user), token };
};

const login = async (accountName, password) => {
  const user = await User.findOne({ accountName });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Identifiants invalides');
  }
  const token = generateToken(user._id);
  return { user: sanitizeUser(user), token };
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const sanitizeUser = (user) => {
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

const AuthService = {
  register,
  login,
  generateToken,
  sanitizeUser
};

export default AuthService; 