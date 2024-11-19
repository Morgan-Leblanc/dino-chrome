import api from './api';

export const authService = {
  login: async (accountName: string, password: string) => {
    const { data } = await api.post('/api/auth/login', {
      accountName,
      password
    });
    return data;
  },

  register: async (accountName: string, username: string, password: string) => {
    const { data } = await api.post('/api/auth/register', {
      accountName,
      username,
      password
    });
    return data;
  }
};