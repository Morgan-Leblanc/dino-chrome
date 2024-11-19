import { Box, Container, Text, Button } from '@mantine/core';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginView = location.pathname === '/login';

  const handleSwitch = () => {
    navigate(isLoginView ? '/register' : '/login');
  };

  return (
    <Container 
      size="xs" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: '25vh'
      }}
    >
      <Box mx="auto" style={{ width: '100%', maxWidth: 400 }}>
        {children}
        <Text ta="center" mt="md">
          {isLoginView ? "Not registered yet? " : "Already have an account? "}
          <Button 
            variant="subtle" 
            onClick={handleSwitch}
            px={5}
          >
            {isLoginView ? "Register" : "Login"}
          </Button>
        </Text>
      </Box>
    </Container>
  );
};