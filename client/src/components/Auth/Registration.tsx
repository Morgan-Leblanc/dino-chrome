
import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Text, Box, Title } from '@mantine/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration : React.FC  = () => {
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        accountName,
        username,
        password
      });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message || "Registration error");
      } else {
        setMessage("Registration error");
      }
    }
  };

  return (
    <Box style={{ maxWidth: 400 }} mx="auto">
      <Title order={2}>Registration</Title>
      <TextInput
        label="Account name"
        placeholder="Enter your account name"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        required
      />
      <TextInput
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button fullWidth mt="md" onClick={handleRegistration}>
        Register
      </Button>
      {message && <Text c="red" mt="md" component="p">{message}</Text>}
    </Box>
  );
};

export default Registration;
