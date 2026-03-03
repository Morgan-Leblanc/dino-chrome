import api from './api';

export const scoreService = {
  saveScore: async (score: number) => {
    const { data } = await api.post('/api/scores/savescore', { score });
    return data;
  },

  getTopScores: async () => {
    const { data } = await api.get('/api/scores/topscore');
    return data;
  },

  getLeaderboard: async () => {
    const { data } = await api.get('/api/scores/leaderboard');
    return data.data;
  }
};
