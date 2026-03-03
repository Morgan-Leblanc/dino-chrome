import { Box, Container } from '@mantine/core';
import React from 'react';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <Container
    size="xs"
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingTop: 'clamp(2rem, 25vh, 8rem)',
      paddingLeft: '1rem',
      paddingRight: '1rem',
    }}
  >
    <Box style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
      <LanguageSwitcher />
    </Box>
    <Box mx="auto" style={{ width: '100%', maxWidth: '22rem' }}>
      {children}
    </Box>
  </Container>
);