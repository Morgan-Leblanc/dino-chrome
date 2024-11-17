import React, { useState } from 'react';
import { Card, Box, Container, Stack, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { startGame } from '../redux/slices/gameSlice';
import { logout } from '../redux/slices/userSlice';
import { HeaderButtons } from '../components/Launcher/HeaderButtons';
import { GameTitle } from '../components/Launcher/GameTitle';
import { WelcomeSection } from '../components/Launcher/WelcomeSection';
import { StartGameButton } from '../components/Launcher/StartGameButton';
import CharacterSelector from '../components/CharacterSelector/CharacterList';
import { TopScoresModal } from '../components/Launcher/TopScoresModal';

const Launcher: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const score = useSelector((state: RootState) => state.game.score);
  const username = useSelector((state: RootState) => state.user.username);
  const characterSelected = useSelector((state: RootState) => state.user.selectedCharacter);

  const handleStartGame = () => {
    dispatch(startGame());
    navigate('/game');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Container 
      size="xl" 
      h="100vh"
      p="2vh"
      display="flex"
      style={{ 
        alignItems: 'center'
      }}
    >
      <Card 
        w="100%"
        h={{ base: '95vh', md: '90vh' }}
        radius="lg"
        withBorder
        shadow="xl"
        padding="4vh"
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'auto'
        }} 
      >
        <HeaderButtons 
          onLogout={handleLogout}
          onOpenScores={() => setIsModalOpen(true)}
        />

        <Stack 
          justify="space-between" 
          h="100%"
          gap="4vh"
        >
          <Box mt="8vh">
            <GameTitle />
            <WelcomeSection username={username || ''} score={score} />
          </Box>

          <Center style={{ flex: 1 }}>
            <CharacterSelector />
          </Center>

          <Center mb="2vh">
            <StartGameButton 
              disabled={characterSelected === null}
              onClick={handleStartGame}
            />
          </Center>
        </Stack>

        <TopScoresModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Card>
    </Container>
  );
};

export default Launcher;