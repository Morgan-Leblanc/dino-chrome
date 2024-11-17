import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Text, Box, Title } from '@mantine/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountName, setAccountName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    try {
      const { data: { data: { token, user } } } = await axios.post(
        'http://localhost:5001/api/auth/login',
        { accountName, password }
      );
  
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      dispatch(setUser({
        id: user._id,
        accountName: user.accountName,
        username: user.username,
        bestScores: user.bestScores ?? [],
        token
      }));
  
      setMessage('Login successful');
      navigate('/launcher');
  
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message ?? "Connection error"
        : "Unexpected connection error";
        
      setMessage(errorMessage);
      console.error('Login error:', error);
    }
  };

  const handleAccountNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAccountName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <Box style={{ maxWidth: 400 }} mx="auto">
      <Title order={2}>Login</Title>
      <form onSubmit={handleLogin}>
        <TextInput
          label="Account name"
          placeholder="Your account name"
          value={accountName}
          onChange={handleAccountNameChange}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <Button type="submit" fullWidth mt="md">
          Login
        </Button>
        {message && <Text c={message === 'Login successful' ? 'green' : 'red'} mt="md">{message}</Text>}
      </form>
    </Box>
  );
};

export default Login;


