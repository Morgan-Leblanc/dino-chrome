import React from 'react';
import Login from '../components/Auth/Login';
import Registration from '../components/Auth/Registration';
import { useLocation } from 'react-router-dom';

const AuthSwitcher: React.FC = () => {
  const location = useLocation();
  const isLoginView = location.pathname === '/login';

  return isLoginView ? <Login /> : <Registration />;
};

export default AuthSwitcher; 