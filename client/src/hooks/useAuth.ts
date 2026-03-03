import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout as logoutAction } from '../redux/slices/userSlice';
import { authService } from '../services/authServices';
import type { ApiError } from '../types/api';
import type { RootState } from '../redux/store';

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (accountName: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const res = await authService.login(accountName, password);
        const { token, user: userData } = res.data;
        localStorage.setItem('token', token);
        dispatch(
          setUser({
            id: userData.id,
            accountName: userData.accountName,
            username: userData.username,
            token
          })
        );
        return true;
      } catch (err) {
        const apiErr = err as ApiError;
        setError(
          apiErr.details?.error ?? (typeof apiErr.message === 'string' ? apiErr.message : 'Connection error')
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (accountName: string, username: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await authService.register(accountName, username, password);
        return true;
      } catch (err) {
        const apiErr = err as ApiError;
        setError(
          apiErr.details?.error ?? (typeof apiErr.message === 'string' ? apiErr.message : 'Registration error')
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    dispatch(logoutAction());
  }, [dispatch]);

  return { user, login, register, logout, loading, error, setError };
}
