import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Text, Box, Title } from '@mantine/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../redux/slices/userSlice';


const Login : React.FC  = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { accountName, password });
      localStorage.setItem('token', response.data.token);
      dispatch(setUser({
        id: response.data._id,
        accountName: response.data.accountName,
        username: response.data.username,
        bestScores: response.data.bestScores
      }));

      localStorage.setItem('token', response.data.token);

      setMessage(response.data.message);
      navigate('/launcher');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message || "Connection error");
      } else {
        setMessage("Connection error");
      }
    }
  };



  return (
    <Box style={{ maxWidth: 400 }} mx="auto">
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
      <Button fullWidth mt="md" onClick={handleLogin}>
        Login
      </Button>
      {message && <Text c="red" mt="md" component="p">{message}</Text>}
    </Box>
  );
};

export default Login;
