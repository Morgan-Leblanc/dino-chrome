import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../lib/supabase.js';

const register = async (userData) => {
  const existingUsers = await supabase.select('users', {
    select: 'id',
    account_name: `eq.${userData.accountName}`,
    limit: '1'
  });

  if (existingUsers.length > 0) {
    throw new Error('Ce nom de compte existe deja');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const [user] = await supabase.insert('users', {
    account_name: userData.accountName,
    username: userData.username,
    password_hash: hashedPassword
  });

  const token = generateToken(user.id);
  return { user: sanitizeUser(user), token };
};

const login = async (accountName, password) => {
  const [user] = await supabase.select('users', {
    select: 'id,account_name,username,password_hash,created_at',
    account_name: `eq.${accountName}`,
    limit: '1'
  });

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error('Identifiants invalides');
  }

  const token = generateToken(user.id);
  return { user: sanitizeUser(user), token };
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const sanitizeUser = (user) => {
  return {
    id: user.id,
    _id: user.id,
    accountName: user.account_name,
    username: user.username,
    createdAt: user.created_at
  };
};

const AuthService = {
  register,
  login,
  generateToken,
  sanitizeUser
};

export default AuthService; 
