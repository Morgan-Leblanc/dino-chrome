import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';

const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const { data: user, error } = await supabase
    .from('users')
    .insert({
      account_name: userData.accountName,
      username: userData.username,
      password: hashedPassword
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('Ce nom de compte existe déjà');
    }
    throw new Error(error.message);
  }

  const token = generateToken(user.id);
  return { user: sanitizeUser(user), token };
};

const login = async (accountName, password) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('account_name', accountName)
    .single();

  if (error || !user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Identifiants invalides');
  }

  const token = generateToken(user.id);
  return { user: sanitizeUser(user), token };
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const sanitizeUser = (user) => {
  const { password, account_name, created_at, updated_at, ...rest } = user;
  return {
    ...rest,
    accountName: account_name,
    createdAt: created_at,
    updatedAt: updated_at
  };
};

const AuthService = {
  register,
  login,
  generateToken,
  sanitizeUser
};

export default AuthService;
