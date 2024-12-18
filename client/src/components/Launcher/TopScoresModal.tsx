import { Modal, Text, Stack, Title, Box, Loader } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { scoreService } from '../../services/scoreService';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import {Score} from '../../types/score'

interface TopScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TopScoresModal = ({ isOpen, onClose }: TopScoresModalProps) => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userId = useSelector((state: RootState) => state.user.id);

  const fetchTopScores = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const scores = await scoreService.getTopScores(userId);
      setScores(scores);
    } catch (err) {
      setError("Can't get the scores");
      console.error('Error fetching scores:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isOpen) {
      fetchTopScores();
    }
  }, [isOpen, fetchTopScores]);

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<Title order={2}>My Top Scores</Title>}
    >
      <Stack>
        {loading ? (
          <Box style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <Loader color="blue" />
          </Box>
        ) : error ? (
          <Text c="red" ta="center">{error}</Text>
        ) : scores.length > 0 ? (
          scores.map((score, index) => (
            <Box
              key={index}
              style={{
                padding: '20px 15px',
                borderRadius: 8,
                backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                color: '#000',
                width: 'auto',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <Text 
              >
                #{index + 1} - {score.score} points
              </Text>
              <Text>
                {new Date(score.createdAt).toLocaleDateString()}
              </Text>
            </Box>
          ))
        ) : (
          <Text ta="center" c="dimmed" size="lg">
            No score registered !
          </Text>
        )}
      </Stack>
    </Modal>
  );
};