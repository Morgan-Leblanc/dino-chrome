import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { authService } from '../../services/authServices';

const Registration : React.FC  = () => {
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await authService.register(accountName, username, password);
      setMessage(response.message);
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration error";
      setMessage(errorMessage);
    }
  };

  return (
    <AuthLayout>
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
      </AuthLayout>
  );
};

export default Registration;
