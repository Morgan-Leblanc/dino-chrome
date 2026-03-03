import api from './api';
import type { AuthResponse } from '../types/user';

export const authService = {
  login: async (accountName: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/api/auth/login', {
      accountName,
      password
    });
    return data;
  },

  register: async (
    accountName: string,
    username: string,
    password: string
  ): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/api/auth/register', {
      accountName,
      username,
      password
    });
    return data;
  }
};