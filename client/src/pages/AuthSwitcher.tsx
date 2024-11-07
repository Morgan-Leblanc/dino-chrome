import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Registration from '../components/Auth/Registration';
import { Text, Button, Box, Container } from '@mantine/core';

const AuthSwitcher : React.FC  = () => {
  const [isLogin, setIsLogin] = useState(true); 
  
  const toggleForm = () => {
    setIsLogin(!isLogin); 
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
        {isLogin ? <Login /> : <Registration />}
        <Text mt="md" style={{textAlign: 'center'}}>
          {isLogin ? "Not registered yet? " : "Already have an account? "}
          <Button variant="link" onClick={toggleForm}>
            {isLogin ? "Register" : "Login"}
          </Button>
        </Text>
      </Box>
    </Container>
  );
};

export default AuthSwitcher; 