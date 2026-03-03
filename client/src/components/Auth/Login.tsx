import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Text, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, loading, error } = useAuth();
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    setSuccessMessage('');
    const ok = await login(accountName, password);
    if (ok) {
      setSuccessMessage(t('auth.login.success'));
      navigate('/launcher');
    }
  };

  const message = successMessage || error;
  const isSuccess = Boolean(successMessage);

  return (
    <AuthLayout>
      <Title order={2}>{t('auth.login.title')}</Title>
      <TextInput
        label={t('auth.login.accountName')}
        placeholder={t('auth.login.accountNamePlaceholder')}
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        required
        autoComplete="username"
        aria-describedby={message ? 'login-message' : undefined}
      />
      <PasswordInput
        label={t('auth.login.password')}
        placeholder={t('auth.login.passwordPlaceholder')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <Button fullWidth mt="md" onClick={handleLogin} loading={loading} disabled={loading}>
        {t('auth.login.submit')}
      </Button>
      {message && (
        <Text id="login-message" role="alert" c={isSuccess ? 'green' : 'red'} mt="md">
          {message}
        </Text>
      )}
      <Text size="sm" c="dimmed" mt="md">
        {t('auth.login.noAccount')} <Link to="/register">{t('auth.login.registerLink')}</Link>
      </Text>
    </AuthLayout>
  );
};

export default Login;
