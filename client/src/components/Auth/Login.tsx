import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { AuthLayout } from './AuthLayout';
import { authService } from '../../services/authServices';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountName, setAccountName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleLogin = async () => {
    try {
      const { data: { token, user } } = await authService.login(accountName, password);
      
      localStorage.setItem('token', token);
      
      dispatch(setUser({
        id: user._id,
        accountName: user.accountName,
        username: user.username,
        token
      }));

      setMessage('Login successful');
      navigate('/launcher');

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Connection error";
      setMessage(errorMessage);
    }
  };


  return (
    <AuthLayout>
      <Title order={2}>Login</Title>
      <TextInput
        label="Account name"
        placeholder="Your account name"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        required
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button 
        fullWidth 
        mt="md" 
        onClick={handleLogin}
      >
        Login
      </Button>
      {message && (
        <Text 
          c={message === 'Login successful' ? 'green' : 'red'} 
          mt="md"
        >
          {message}
        </Text>
      )}
   </AuthLayout>
  );
};

export default Login;


