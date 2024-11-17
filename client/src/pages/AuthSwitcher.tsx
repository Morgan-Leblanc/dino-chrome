import React from 'react';
import Login from '../components/Auth/Login';
import Registration from '../components/Auth/Registration';
import { Text, Button, Box, Container } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthSwitcher: React.FC = () => {
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
      <Box>
        {isLoginView ? <Login /> : <Registration />}
        <Text ta="center" mt="md">
          {isLoginView ? "Not registered yet? " : "Already have an account? "}
          <Button 
            variant="subtle" 
            onClick={handleSwitch}
          >
            {isLoginView ? "Register" : "Login"}
          </Button>
        </Text>
      </Box>
    </Container>
  );
};

export default AuthSwitcher; 