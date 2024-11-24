import { Modal, Text, Stack, Title, Box, Loader } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { scoreService } from '../../services/scoreService';
import { Score } from '../../types/score';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal = ({ isOpen, onClose }: LeaderboardModalProps) => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const leaderboard = await scoreService.getLeaderboard();
      
      setScores(leaderboard);
    } catch (err) {
      setError("Can't get the leaderboard");
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
    }
  }, [isOpen, fetchLeaderboard]);

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<Title order={2}>Global Leaderboard</Title>}
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
              <Text>
                #{index + 1} - {score.score} points
                {score && (
                  <Text span ml="md" fw={400}>
                    by {score.username}
                  </Text>
                )}
              </Text>
              <Text></Text>
              <Text size="sm" c="dimmed">
                {new Date(score.createdAt).toLocaleDateString()}
              </Text>
            </Box>
          ))
        ) : (
          <Text ta="center" c="dimmed" size="lg">
            No scores yet!
          </Text>
        )}
      </Stack>
    </Modal>
  );
};