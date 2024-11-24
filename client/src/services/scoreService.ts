import api from './api';


export const scoreService = {
  saveScore: async (score: number, userId: string) => {
    const { data } = await api.post('/api/scores/savescore', {
      score,
      userId
    });
    return data;
  },

  getTopScores: async (userId: string) => {
    const { data } = await api.get(`/api/scores/topscore/${userId}`);
    return data;
  },

  getLeaderboard: async () => {
    const { data } = await api.get('api/scores/leaderboard');
    return data.data;
  },

};