import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { startGame, endGame } from '../redux/slices/gameSlice';
import { Card, Button, Title, Text } from '@mantine/core';

const Launcher: React.FC = () => {
  const dispatch = useAppDispatch();
  const score = useAppSelector((state) => state.game.score);
  const isRunning = useAppSelector((state) => state.game.isRunning);
  console.log(score);
  

  return (
    <Card style={{ textAlign: 'center', margin: 'auto', width: '50%' }} p={5} withBorder>
      <Title order={1} mb={4}>Dino Game</Title>
      <Text size="xl">Score: {score}</Text>
      {isRunning ? (
        <Button color="red" onClick={() => dispatch(endGame())}>End Game</Button>
      ) : (
        <Button color="green" onClick={() => dispatch(startGame())}>Start Game</Button>
      )}
    </Card>
  );
};

export default Launcher;
