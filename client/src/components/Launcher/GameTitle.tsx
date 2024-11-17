import { Title } from '@mantine/core';

export const GameTitle: React.FC = () => (
  <Title 
    order={1} 
    ta="center"
    style={{
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      backgroundImage: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      fontWeight: 800,
      marginBottom: '3vh',
      width: '100%',
      textAlign: 'center',
      padding: '0 2vh'
    }}
  >
    Dino Game
  </Title>
);