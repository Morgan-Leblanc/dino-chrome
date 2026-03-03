import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Text, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '../../hooks/useAuth';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { register, loading, error } = useAuth();
  const [accountName, setAccountName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegistration = async () => {
    setSuccessMessage('');
    const ok = await register(accountName, username, password);
    if (ok) {
      setSuccessMessage(t('auth.register.success'));
      navigate('/login');
    }
  };

  const message = successMessage || error;
  const isSuccess = Boolean(successMessage);

  return (
    <AuthLayout>
      <Title order={2}>{t('auth.register.title')}</Title>
      <TextInput
        label={t('auth.register.accountName')}
        placeholder={t('auth.register.accountNamePlaceholder')}
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        required
        autoComplete="username"
        aria-describedby={message ? 'register-message' : undefined}
      />
      <TextInput
        label={t('auth.register.username')}
        placeholder={t('auth.register.usernamePlaceholder')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete="name"
      />
      <PasswordInput
        label={t('auth.register.password')}
        placeholder={t('auth.register.passwordPlaceholder')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <Button fullWidth mt="md" onClick={handleRegistration} loading={loading} disabled={loading}>
        {t('auth.register.submit')}
      </Button>
      {message && (
        <Text id="register-message" role="alert" c={isSuccess ? 'green' : 'red'} mt="md">
          {message}
        </Text>
      )}
      <Text size="sm" c="dimmed" mt="md">
        {t('auth.register.hasAccount')} <Link to="/login">{t('auth.register.loginLink')}</Link>
      </Text>
    </AuthLayout>
  );
};

export default Registration;
